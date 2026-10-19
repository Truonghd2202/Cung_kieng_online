const router = require("express").Router();
const { z } = require("zod");
const prisma = require("../config/prisma");
const authenticate = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin.middleware");
const validate = require("../middleware/validation.middleware");
const ApiError = require("../utils/api-error");
const { sendSuccess } = require("../utils/response");
const {
  reconcileSePayOrder,
} = require("../services/sepay-reconcile.service");

router.use(authenticate, requireAdmin);

const listSchema = z.object({
  kind: z.enum(["membership", "digital"]).default("membership"),
  page: z.coerce.number().int().min(1).max(10000).default(1),
  q: z.string().trim().max(200).default(""),
  status: z.enum([
    "ALL",
    "PENDING",
    "PAID",
    "FAILED",
    "CANCELLED",
    "ABANDONED",
    "EXPIRED",
  ]).default("ALL"),
});

router.get(
  "/",
  validate(listSchema, "query"),
  async (req, res) => {
    const { kind, page, q, status } = req.validated.query;
    const model =
      kind === "digital" ? "digital_orders" : "payment_orders";

    const where = {
      ...(status === "ALL" ? {} : { status }),
      ...(q
        ? {
            OR: [
              { id: { contains: q, mode: "insensitive" } },
              {
                users: {
                  email: { contains: q, mode: "insensitive" },
                },
              },
            ],
          }
        : {}),
    };

    const [rows, total] = await prisma.$transaction([
      prisma[model].findMany({
        where,
        orderBy: [
          { created_at: "desc" },
          { id: "asc" },
        ],
        skip: (page - 1) * 20,
        take: 20,
        select: {
          id: true,
          amount: true,
          status: true,
          payment_provider: true,
          payment_environment: true,
          transaction_no: true,
          created_at: true,
          expires_at: true,
          paid_at: true,
          users: {
            select: { email: true },
          },
          ...(kind === "digital"
            ? {
                item_code: true,
                quantity: true,
                payment_review_status: true,
                payment_review_note: true,
              }
            : {
                membership_plans: {
                  select: { code: true, name: true },
                },
              }),
        },
      }),
      prisma[model].count({ where }),
    ]);

    return sendSuccess(res, {
      data: {
        items: rows,
        total,
        page,
        pageSize: 20,
      },
    });
  }
);

router.post(
  "/:id/reconcile",
  validate(
    z.object({
      id: z.string().regex(
        /^(?:[a-f0-9]{32}|DI[a-f0-9]{30})$/i
      ),
    }),
    "params"
  ),
  async (req, res) => {
    const { id } = req.params;
    const model = id.startsWith("DI")
      ? "digital_orders"
      : "payment_orders";

    const order = await prisma[model].findUnique({
      where: { id },
      select: { user_id: true },
    });

    if (!order) {
      throw new ApiError(404, "Không tìm thấy đơn.");
    }

    // Ghi nhận yêu cầu quản trị trước khi thực hiện.
    await prisma.admin_audit_logs.create({
      data: {
        actor_id: req.user.id,
        action: "PAYMENT_RECONCILE_REQUEST",
        target_type: model,
        target_id: order.user_id,
        details: { orderId: id },
      },
    });

    const result = await reconcileSePayOrder(
      order.user_id,
      id
    );

    return sendSuccess(res, { data: result });
  }
);

router.patch(
  "/:id/review-resolution",
  validate(
    z.object({
      id: z.string().regex(/^DI[a-f0-9]{30}$/i),
    }),
    "params"
  ),
  validate(
    z.object({
      note: z.string().trim().min(20).max(1500),
    }).strict()
  ),
  async (req, res) => {
    await prisma.$transaction(async (tx) => {
      const changed = await tx.digital_orders.updateMany({
        where: {
          id: req.params.id,
          payment_review_status: "OPEN",
        },
        data: {
          payment_review_status: "RESOLVED",
          payment_review_note: req.body.note,
        },
      });

      if (changed.count !== 1) {
        throw new ApiError(
          409,
          "Không tìm thấy cảnh báo đang mở. Hãy tải lại danh sách."
        );
      }

      const order = await tx.digital_orders.findUniqueOrThrow({
        where: { id: req.params.id },
        select: { user_id: true },
      });

      await tx.admin_audit_logs.create({
        data: {
          actor_id: req.user.id,
          action: "PAYMENT_REVIEW_RESOLVED",
          target_type: "digital_orders",
          target_id: order.user_id,
          details: {
            orderId: req.params.id,
            resolutionNote: req.body.note,
          },
        },
      });
    });

    return sendSuccess(res, {
      data: { payment_review_status: "RESOLVED" },
    });
  }
);

router.get(
  "/alerts",
  validate(
    z.object({
      page: z.coerce.number().int().min(1).max(10000)
        .default(1),
      status: z.enum(["OPEN", "RESOLVED"]).default("OPEN"),
    }),
    "query"
  ),
  async (req, res) => {
    const { page, status } = req.validated.query;

    const [items, total] = await prisma.$transaction([
      prisma.payment_alerts.findMany({
        where: { status },
        orderBy: [
          { created_at: "desc" },
          { id: "asc" },
        ],
        skip: (page - 1) * 20,
        take: 20,
      }),
      prisma.payment_alerts.count({ where: { status } }),
    ]);

    return sendSuccess(res, {
      data: { items, total, page, pageSize: 20 },
    });
  }
);

router.patch(
  "/alerts/:id/resolve",
  validate(
    z.object({
      id: z.string().regex(/^[a-f0-9]{64}$/),
    }),
    "params"
  ),
  validate(
    z.object({
      note: z.string().trim().min(20).max(2000),
    }).strict()
  ),
  async (req, res) => {
    await prisma.$transaction(async (tx) => {
      const alert = await tx.payment_alerts.findUnique({
        where: { id: req.params.id },
      });

      if (!alert) {
        throw new ApiError(404, "Không tìm thấy cảnh báo.");
      }

      const changed = await tx.payment_alerts.updateMany({
        where: {
          id: alert.id,
          status: "OPEN",
        },
        data: {
          status: "RESOLVED",
          resolution_note: req.body.note,
          resolved_at: new Date(),
        },
      });

      if (changed.count !== 1) {
        throw new ApiError(
          409,
          "Cảnh báo đã được xử lý. Hãy tải lại."
        );
      }

      await tx.admin_audit_logs.create({
        data: {
          actor_id: req.user.id,
          action: "PAYMENT_ALERT_RESOLVED",
          target_type: "payment_alerts",
          target_id: alert.user_id,
          details: {
            alertId: alert.id,
            orderId: alert.order_id,
            note: req.body.note,
          },
        },
      });
    });

    return sendSuccess(res, {
      data: { status: "RESOLVED" },
    });
  }
);

module.exports = router;

