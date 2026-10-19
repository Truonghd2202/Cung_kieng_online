const prisma = require("../config/prisma");
const env = require("../config/env");
const ApiError = require("../utils/api-error");
const {
  encodedParams,
  signature,
  verifyCallback,
  vietnamTimestamp,
} = require("../utils/vnpay");
const {
  isSePayConfigured,
} = require("../config/sepay");
const {
  createSePayCheckout,
} = require("./sepay-checkout.service");
const {
  assertPaymentEnvironment,
} = require("./payment-environment.service");
const {
  DIGITAL_ITEMS,
} = require("../constants/digital-items");

const ITEM = DIGITAL_ITEMS.ROYAL_LANTERN;

function configured() {
  return Boolean(
    env.VNPAY_TMN_CODE &&
    env.VNPAY_HASH_SECRET &&
    env.VNPAY_RETURN_URL
  );
}

function catalog() {
  return {
    items: Object.values(DIGITAL_ITEMS)
      .filter((item) => item.saleEnabled && item.price !== null)
      .map(({ code, name, kind, description, price, quantity }) => ({
        code,
        name,
        kind,
        description,
        price,
        quantity,
      })),
    currency: "VND",
    checkoutAvailable:
      env.DIGITAL_SALES_ENABLED === true &&
      isSePayConfigured(),
  };
}

async function checkout(userId, requestId, ip, itemCode) {
  if (!catalog().checkoutAvailable) {
    throw new ApiError(503, "Cửa hàng chưa mở bán.");
  }

  if (
    typeof requestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      requestId
    )
  ) {
    throw new ApiError(422, "Mã yêu cầu không hợp lệ.");
  }

  const item =
    typeof itemCode === "string" &&
    Object.hasOwn(DIGITAL_ITEMS, itemCode)
      ? DIGITAL_ITEMS[itemCode]
      : null;

  if (!item || item.price === null) {
    throw new ApiError(422, "Vật phẩm không được bán riêng.");
  }

  await assertPaymentEnvironment();

  const id =
    "DI" +
    requestId.replace(/-/g, "").toLowerCase().slice(0, 30);

  const order = await prisma.$transaction(async (tx) => {
    // Cùng khóa với IPN cấp quyền:
    // không để hai yêu cầu mua cùng vật phẩm vĩnh viễn
    // vượt qua kiểm tra sở hữu cùng lúc.
    await tx.$queryRaw`
      SELECT id FROM users
      WHERE id = ${userId}::uuid
      FOR UPDATE
    `;

    const existing = await tx.digital_orders.findUnique({
      where: { id },
    });

    if (existing) {
      if (
        existing.user_id !== userId ||
        existing.item_code !== item.code ||
        existing.payment_provider !== "SEPAY" ||
        existing.payment_environment !== env.SEPAY_ENV
      ) {
        throw new ApiError(
          409,
          "Mã yêu cầu đã được dùng cho đơn khác."
        );
      }

      // Thử lại cùng yêu cầu dùng lại đúng đơn đã tạo.
      return existing;
    }

    if (!item.saleEnabled) {
      throw new ApiError(
        503,
        "Vật phẩm hiện chưa mở bán."
      );
    }

    if (item.kind === "PERMANENT") {
      const owned = await tx.digital_inventory.findUnique({
        where: {
          user_id_item_code: {
            user_id: userId,
            item_code: item.code,
          },
        },
      });

      if (owned && owned.quantity > 0) {
        throw new ApiError(
          409,
          "Bạn đã sở hữu vật phẩm này. Không cần mua thêm."
        );
      }

      const pending = await tx.digital_orders.findFirst({
        where: {
          user_id: userId,
          item_code: item.code,
          status: "PENDING",
          payment_provider: "SEPAY",
          payment_environment: env.SEPAY_ENV,
        },
        orderBy: { created_at: "desc" },
        select: { id: true },
      });

      if (pending) {
        throw new ApiError(
          409,
          `Vật phẩm đang có đơn chưa được giải quyết: ${pending.id}. Hãy kiểm tra đơn cũ trước khi mua tiếp.`
        );
      }
    }

    return tx.digital_orders.create({
      data: {
        id,
        user_id: userId,
        item_code: item.code,
        quantity: item.quantity,
        amount: item.price,
        payment_provider: "SEPAY",
        payment_environment: env.SEPAY_ENV,
        expires_at: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
  });

  return createSePayCheckout(
    order,
    `Thanh toan ${item.name}`
  );
}

async function getOrder(userId, id) {
  const row = await prisma.digital_orders.findFirst({
    where: { id, user_id: userId },
    select: {
      id: true,
      status: true,
      item_code: true,
      quantity: true,
      amount: true,
      expires_at: true,
      payment_provider: true,
      payment_environment: true,
      payment_review_status: true,
    },
  });

  if (!row) {
    throw new ApiError(404, "Không tìm thấy đơn vật phẩm.");
  }

  const item = DIGITAL_ITEMS[row.item_code];

  return {
    ...row,
    itemName: item?.name ?? row.item_code,
    itemKind: item?.kind ?? "UNKNOWN",
    paymentWindowExpired:
      row.status === "PENDING" &&
      row.expires_at.getTime() <= Date.now(),
  };
}

async function processIpn(query, client = prisma) {
  const reply = (RspCode, Message) => ({
    RspCode,
    Message,
  });

  if (
    !configured() ||
    !verifyCallback(query, env.VNPAY_HASH_SECRET) ||
    query.vnp_TmnCode !== env.VNPAY_TMN_CODE
  ) {
    return reply("97", "Invalid signature");
  }

  const order = await client.digital_orders.findUnique({
    where: { id: query.vnp_TxnRef || "" },
  });

  if (!order) return reply("01", "Order not found");
  if (order.payment_provider !== "VNPAY") {
    return reply("01", "Order belongs to another provider");
  }

  if (
    !/^\d+$/.test(query.vnp_Amount) ||
    Number(query.vnp_Amount) !== order.amount * 100
  ) {
    return reply("04", "Invalid amount");
  }

  if (order.item_code !== ITEM.code) {
    return reply("99", "Unsupported item");
  }

  const paid =
    query.vnp_ResponseCode === "00" &&
    query.vnp_TransactionStatus === "00";

  if (
    paid &&
    !/^\d{1,15}$/.test(query.vnp_TransactionNo || "")
  ) {
    return reply("99", "Invalid transaction");
  }

  return client.$transaction(async (tx) => {
    await tx.$queryRaw`
      SELECT id FROM users
      WHERE id = ${order.user_id}::uuid
      FOR UPDATE
    `;

    const changed = await tx.digital_orders.updateMany({
      where: {
        id: order.id,
        status: "PENDING",
      },
      data: {
        status: paid ? "PAID" : "FAILED",
        transaction_no: paid
          ? query.vnp_TransactionNo
          : null,
        paid_at: paid ? new Date() : null,
      },
    });

    if (!changed.count) {
      return reply("02", "Order already confirmed");
    }

    if (paid) {
      await tx.digital_inventory.upsert({
        where: {
          user_id_item_code: {
            user_id: order.user_id,
            item_code: order.item_code,
          },
        },
        create: {
          user_id: order.user_id,
          item_code: order.item_code,
          quantity: order.quantity,
        },
        update: {
          quantity: { increment: order.quantity },
          updated_at: new Date(),
        },
      });
    }

    return reply("00", "Confirm Success");
  });
}

async function abandonAttempt(userId, requestId, itemCode) {
  const item = Object.hasOwn(DIGITAL_ITEMS, itemCode)
    ? DIGITAL_ITEMS[itemCode]
    : null;

  if (!item || item.price === null) {
    throw new ApiError(422, "Vật phẩm không hợp lệ.");
  }

  await assertPaymentEnvironment();

  const id =
    "DI" +
    requestId.replace(/-/g, "").toLowerCase().slice(0, 30);

  return prisma.$transaction(async (tx) => {
    // Cùng khóa với checkout: tạo đơn và bỏ yêu cầu
    // không thể vượt qua nhau.
    await tx.$queryRaw`
      SELECT id FROM users
      WHERE id = ${userId}::uuid
      FOR UPDATE
    `;

    const existing = await tx.digital_orders.findUnique({
      where: { id },
    });

    if (existing) {
      if (
        existing.user_id !== userId ||
        existing.item_code !== item.code ||
        existing.payment_provider !== "SEPAY" ||
        existing.payment_environment !== env.SEPAY_ENV
      ) {
        throw new ApiError(409, "Mã yêu cầu thuộc đơn khác.");
      }

      if (existing.status === "ABANDONED") {
        return { orderId: id, abandoned: true };
      }

      throw new ApiError(
        409,
        "Đơn đã được tạo. Hãy kiểm tra trạng thái đơn trước khi tiếp tục."
      );
    }

    // Bản ghi chặn request checkout cũ đến muộn.
    await tx.digital_orders.create({
      data: {
        id,
        user_id: userId,
        item_code: item.code,
        quantity: item.quantity,
        amount: item.price,
        payment_provider: "SEPAY",
        payment_environment: env.SEPAY_ENV,
        status: "ABANDONED",
        expires_at: new Date(),
      },
    });

    return { orderId: id, abandoned: true };
  });
}

async function closeExpiredWindow(userId, id) {
  await assertPaymentEnvironment();

  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`
      SELECT id FROM users
      WHERE id = ${userId}::uuid
      FOR UPDATE
    `;

    const order = await tx.digital_orders.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!order) {
      throw new ApiError(404, "Không tìm thấy đơn.");
    }

    if (
      order.payment_provider !== "SEPAY" ||
      order.payment_environment !== env.SEPAY_ENV
    ) {
      throw new ApiError(
        409,
        "Đơn thuộc cổng hoặc môi trường khác."
      );
    }

    // Gửi lại cùng thao tác không thay đổi thêm dữ liệu.
    if (order.status === "EXPIRED") return;

    if (order.status !== "PENDING") {
      throw new ApiError(
        409,
        "Trạng thái đơn đã thay đổi. Hãy kiểm tra lại."
      );
    }

    if (order.expires_at.getTime() > Date.now()) {
      throw new ApiError(
        409,
        "Đơn vẫn còn thời hạn mở thanh toán."
      );
    }

    const changed = await tx.digital_orders.updateMany({
      where: {
        id,
        user_id: userId,
        status: "PENDING",
        payment_provider: "SEPAY",
        payment_environment: env.SEPAY_ENV,
      },
      data: {
        status: "EXPIRED",
      },
    });

    if (changed.count !== 1) {
      throw new ApiError(
        409,
        "Đơn đang được cập nhật. Hãy kiểm tra lại."
      );
    }
  });

  return getOrder(userId, id);
}

module.exports = {
  abandonAttempt,
  catalog,
  checkout,
  closeExpiredWindow,
  getOrder,
  processIpn,
};
