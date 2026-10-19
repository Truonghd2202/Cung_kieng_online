const router = require("express").Router();
const { z } = require("zod");
const prisma = require("../config/prisma");
const authenticate = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin.middleware");
const validate = require("../middleware/validation.middleware");
const ApiError = require("../utils/api-error");
const { sendSuccess } = require("../utils/response");

router.use(authenticate);

router.post(
  "/",
  validate(z.object({
    requestId: z.string().uuid(),
    organization: z.string().trim().min(1).max(200),
    message: z.string().trim().min(20).max(3000),
  }).strict()),
  async (req, res) => {
    const { requestId, organization, message } = req.body;

    const checkExisting = (row) => {
      if (
        row.user_id !== req.user.id ||
        row.organization !== organization ||
        row.message !== message
      ) {
        throw new ApiError(
          409,
          "Mã gửi đã được dùng cho yêu cầu khác."
        );
      }

      return row;
    };

    let row = await prisma.partnership_requests.findUnique({
      where: { id: requestId },
    });

    if (row) {
      row = checkExisting(row);
    } else {
      try {
        row = await prisma.partnership_requests.create({
          data: {
            id: requestId,
            user_id: req.user.id,
            organization,
            message,
          },
        });
      } catch (error) {
        if (error.code !== "P2002") throw error;

        row = checkExisting(
          await prisma.partnership_requests.findUniqueOrThrow({
            where: { id: requestId },
          })
        );
      }
    }

    return sendSuccess(res, { data: row });
  }
);

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
});

async function listPartnerships(req, res, admin) {
  const page = req.validated.query.page;
  const pageSize = 20;
  const where = admin ? {} : { user_id: req.user.id };

  const [items, total] = await prisma.$transaction([
    prisma.partnership_requests.findMany({
      where,
      orderBy: [
        { created_at: "desc" },
        { id: "asc" },
      ],
      skip: (page - 1) * pageSize,
      take: pageSize,
      ...(admin
        ? {
            include: {
              users: {
                select: { email: true },
              },
            },
          }
        : {}),
    }),
    prisma.partnership_requests.count({ where }),
  ]);

  return sendSuccess(res, {
    data: { items, total, page, pageSize },
  });
}

router.get(
  "/",
  validate(paginationSchema, "query"),
  (req, res) => listPartnerships(req, res, false)
);

router.get(
  "/admin",
  requireAdmin,
  validate(paginationSchema, "query"),
  (req, res) => listPartnerships(req, res, true)
);

router.patch(
  "/admin/:id",
  requireAdmin,
  validate(z.object({
    id: z.string().uuid(),
  }), "params"),
  validate(z.object({
    status: z.enum(["NEW", "REVIEWING", "CLOSED"]),
  }).strict()),
  async (req, res) => {
    const id = req.params.id;
    const nextStatus = req.body.status;

    const result = await prisma.$transaction(async (tx) => {
      const current = await tx.partnership_requests.findUnique({
        where: { id },
      });

      if (!current) {
        throw new ApiError(404, "Không tìm thấy đề xuất.");
      }

      if (current.status === nextStatus) {
        return { status: current.status };
      }

      const changed = await tx.partnership_requests.updateMany({
        where: {
          id,
          status: current.status,
          updated_at: current.updated_at,
        },
        data: {
          status: nextStatus,
          updated_at: new Date(),
        },
      });

      if (changed.count !== 1) {
        throw new ApiError(
          409,
          "Đề xuất vừa được cập nhật. Hãy tải lại danh sách."
        );
      }

      await tx.admin_audit_logs.create({
        data: {
          actor_id: req.user.id,
          action: "PARTNERSHIP_STATUS_CHANGED",
          target_type: "partnership_requests",
          target_id: id,
          details: {
            previousStatus: current.status,
            nextStatus,
          },
        },
      });

      return { status: nextStatus };
    });

    return sendSuccess(res, { data: result });
  }
);

module.exports = router;
