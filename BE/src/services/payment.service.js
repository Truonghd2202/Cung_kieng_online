const { randomBytes } = require("node:crypto");
const env = require("../config/env");
const prisma = require("../config/prisma");
const ApiError = require("../utils/api-error");
const { encodedParams, signature, verifyCallback, vietnamTimestamp, addMembershipMonth } = require("../utils/vnpay");
const PRICE = 29000;

function isConfigured() { return Boolean(env.VNPAY_TMN_CODE && env.VNPAY_HASH_SECRET && env.VNPAY_RETURN_URL); }
async function getMembership(userId) {
  const subscription = userId ? await prisma.subscriptions.findFirst({
    where: { user_id: userId, status: "ACTIVE", expires_at: { gt: new Date() }, membership_plans: { code: "TAM_AN_MONTHLY" } },
    orderBy: { expires_at: "desc" }, select: { id: true, started_at: true, expires_at: true },
  }) : null;
  return { subscription, price: PRICE, currency: "VND", checkoutAvailable: isConfigured() && Boolean(env.GEMINI_API_KEY) };
}
async function checkout(userId, ip) {
  if (!isConfigured() || !env.GEMINI_API_KEY) throw new ApiError(503, "Thanh toán hoặc dịch vụ hội viên chưa được cấu hình. Vui lòng quay lại sau.");
  const id = randomBytes(16).toString("hex");
  const now = new Date();
  const expires = new Date(now.getTime() + 15 * 60000);
  const plan = await prisma.membership_plans.upsert({ where: { code: "TAM_AN_MONTHLY" }, update: {}, create: {
    code: "TAM_AN_MONTHLY", name: "Tâm An", price_monthly: PRICE, features: ["Chiêm nghiệm định hướng trọn năm"],
  } });
  if (!plan.active) throw new ApiError(503, "Gói hội viên đang tạm ngừng đăng ký.");
  await prisma.payment_orders.create({ data: { id, user_id: userId, plan_id: plan.id, amount: PRICE, expires_at: expires } });
  const params = {
    vnp_Version: "2.1.0", vnp_Command: "pay", vnp_TmnCode: env.VNPAY_TMN_CODE,
    vnp_Amount: String(PRICE * 100), vnp_CurrCode: "VND", vnp_TxnRef: id,
    vnp_OrderInfo: `Thanh toan Tam An ${id}`, vnp_OrderType: "other", vnp_Locale: "vn",
    vnp_ReturnUrl: env.VNPAY_RETURN_URL, vnp_IpAddr: ip?.replace(/^::ffff:/, "") || "127.0.0.1",
    vnp_CreateDate: vietnamTimestamp(now), vnp_ExpireDate: vietnamTimestamp(expires),
  };
  return { orderId: id, paymentUrl: `${env.VNPAY_PAYMENT_URL}?${encodedParams(params)}&vnp_SecureHash=${signature(params, env.VNPAY_HASH_SECRET)}` };
}
async function processIpn(query, client = prisma) {
  const reply = (RspCode, Message) => ({ RspCode, Message });
  if (!isConfigured() || !verifyCallback(query, env.VNPAY_HASH_SECRET) || query.vnp_TmnCode !== env.VNPAY_TMN_CODE) return reply("97", "Invalid signature");
  const order = await client.payment_orders.findUnique({ where: { id: query.vnp_TxnRef || "" } });
  if (!order) return reply("01", "Order not found");
  if (!/^\d+$/.test(query.vnp_Amount) || Number(query.vnp_Amount) !== order.amount * 100) return reply("04", "Invalid amount");
  const paid = query.vnp_ResponseCode === "00" && query.vnp_TransactionStatus === "00";
  if (paid && !/^\d{1,15}$/.test(query.vnp_TransactionNo || "")) return reply("99", "Invalid transaction");
  return client.$transaction(async (tx) => {
    // Serialize all payments for one account, including two different successful renewals.
    await tx.$queryRaw`SELECT id FROM users WHERE id = ${order.user_id}::uuid FOR UPDATE`;
    const changed = await tx.payment_orders.updateMany({ where: { id: order.id, status: "PENDING" }, data: {
      status: paid ? "PAID" : "FAILED", transaction_no: paid ? query.vnp_TransactionNo : null,
      response_code: query.vnp_ResponseCode, paid_at: paid ? new Date() : null,
    } });
    if (!changed.count) return reply("02", "Order already confirmed");
    if (paid) {
      const existing = await tx.subscriptions.findFirst({ where: { user_id: order.user_id, plan_id: order.plan_id, status: "ACTIVE" }, orderBy: { expires_at: "desc" } });
      const now = new Date();
      const expires = addMembershipMonth(existing?.expires_at && existing.expires_at > now ? existing.expires_at : now);
      if (existing) await tx.subscriptions.update({ where: { id: existing.id }, data: { expires_at: expires, updated_at: now } });
      else await tx.subscriptions.create({ data: { user_id: order.user_id, plan_id: order.plan_id, expires_at: expires, provider: "VNPAY", provider_subscription_id: order.id } });
    }
    return reply("00", "Confirm Success");
  });
}
async function getOrder(userId, id) {
  const order = await prisma.payment_orders.findFirst({ where: { id, user_id: userId }, select: { id: true, status: true, amount: true, expires_at: true } });
  if (!order) throw new ApiError(404, "Không tìm thấy giao dịch.");
  return order;
}
module.exports = { checkout, processIpn, getOrder, getMembership };
