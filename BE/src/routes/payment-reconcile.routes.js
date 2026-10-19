const router = require("express").Router();
const { z } = require("zod");
const prisma = require("../config/prisma");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { sendSuccess } = require("../utils/response");
const {
  reconcileSePayOrder,
} = require("../services/sepay-reconcile.service");

router.post(
  "/sepay/orders/:id/reconcile",
  authenticate,
  validate(
    z.object({
      id: z.string().regex(
        /^(?:[a-f0-9]{32}|DI[a-f0-9]{30})$/i
      ),
    }),
    "params"
  ),
  async (req, res) => {
    const data = await reconcileSePayOrder(
      req.user.id,
      req.params.id
    );

    return sendSuccess(res, { data });
  }
);

router.get(
  "/orders",
  authenticate,
  validate(
    z.object({
      kind: z.enum(["membership", "digital"])
        .default("membership"),
      page: z.coerce.number().int().min(1).max(10000)
        .default(1),
    }),
    "query"
  ),
  async (req, res) => {
    const { kind, page } = req.validated.query;
    const pageSize = 20;
    const model = kind === "digital"
      ? "digital_orders"
      : "payment_orders";

    // Không nhận userId từ query: chỉ đọc đơn của phiên đăng nhập.
    const where = { user_id: req.user.id };

    const [rows, total] = await prisma.$transaction([
      prisma[model].findMany({
        where,
        orderBy: [
          { created_at: "desc" },
          { id: "asc" },
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          amount: true,
          status: true,
          payment_provider: true,
          payment_environment: true,
          created_at: true,
          expires_at: true,
          paid_at: true,
          ...(kind === "digital"
            ? {
                item_code: true,
                quantity: true,
                payment_review_status: true,
              }
            : {
                membership_plans: {
                  select: { name: true },
                },
              }),
        },
      }),
      prisma[model].count({ where }),
    ]);

    const { DIGITAL_ITEMS } =
      require("../constants/digital-items");

    const items = rows.map((row) => ({
      id: row.id,
      amount: row.amount,
      status: row.status,
      paymentProvider: row.payment_provider,
      paymentEnvironment: row.payment_environment,
      createdAt: row.created_at,
      paidAt: row.paid_at,
      paymentWindowExpired:
        new Date(row.expires_at).getTime() <= Date.now(),
      name: kind === "digital"
        ? DIGITAL_ITEMS[row.item_code]?.name ?? row.item_code
        : row.membership_plans.name,
      paymentReviewStatus:
        kind === "digital"
          ? row.payment_review_status
          : "NONE",
    }));

    return sendSuccess(res, {
      data: { items, total, page, pageSize },
    });
  }
);

module.exports = router;

