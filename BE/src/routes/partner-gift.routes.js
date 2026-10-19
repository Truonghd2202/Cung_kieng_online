const router = require("express").Router();
const { z } = require("zod");

const prisma = require("../config/prisma");
const authenticate = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin.middleware");
const validate = require("../middleware/validation.middleware");
const ApiError = require("../utils/api-error");
const { sendSuccess } = require("../utils/response");
const {
  isAllowedPartnerUrl,
} = require("../config/partner-domains");

const pagination = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
});

const idSchema = z.object({
  id: z.string().uuid(),
});

const giftFields = {
  name: z.string().trim().min(3).max(200),
  description: z.string().trim().min(30).max(5000),
  partner_name: z.string().trim().min(2).max(200),
  purchase_url: z.string().trim().max(2000).refine(
    isAllowedPartnerUrl,
    "Liên kết phải dùng HTTPS và thuộc tên miền đối tác được phép."
  ),
};

const createSchema = z.object(giftFields).strict();

const updateSchema = z.object({
  ...giftFields,
  active: z.boolean(),
  version: z.number().int().min(1),
}).strict();

const publicSelect = {
  id: true,
  name: true,
  description: true,
  partner_name: true,
  purchase_url: true,
};

// Khách chỉ nhận sản phẩm đang hiển thị và URL còn được phép.
// Không phân trang ở API công khai vì đây là danh mục đối tác nhỏ;
// giới hạn tối đa 100 sản phẩm đang hiển thị.
router.get("/", async (_req, res) => {
  const rows = await prisma.partner_gifts.findMany({
    where: { active: true },
    select: publicSelect,
    orderBy: [{ created_at: "desc" }, { id: "asc" }],
    take: 100,
  });

  return sendSuccess(res, {
    data: {
      items: rows.filter((row) =>
        isAllowedPartnerUrl(row.purchase_url)
      ),
    },
  });
});

// Tất cả API bên dưới yêu cầu ADMIN.
router.use(authenticate, requireAdmin);

router.get(
  "/admin",
  validate(pagination, "query"),
  async (req, res) => {
    const page = req.validated.query.page;
    const pageSize = 20;

    const [items, total] = await prisma.$transaction([
      prisma.partner_gifts.findMany({
        orderBy: [{ created_at: "desc" }, { id: "asc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.partner_gifts.count(),
    ]);

    return sendSuccess(res, {
      data: { items, total, page, pageSize },
    });
  }
);

router.post(
  "/admin",
  validate(createSchema),
  async (req, res) => {
    const result = await prisma.$transaction(async (tx) => {
      const gift = await tx.partner_gifts.create({
        data: {
          ...req.body,
          active: false,
        },
      });

      await tx.admin_audit_logs.create({
        data: {
          actor_id: req.user.id,
          action: "PARTNER_GIFT_CREATED",
          target_type: "partner_gifts",
          target_id: gift.id,
          details: {
            name: gift.name,
            partnerName: gift.partner_name,
          },
        },
      });

      return gift;
    });

    return sendSuccess(res, {
      statusCode: 201,
      data: result,
    });
  }
);

router.patch(
  "/admin/:id",
  validate(idSchema, "params"),
  validate(updateSchema),
  async (req, res) => {
    const { version, ...fields } = req.body;
    const id = req.params.id;

    const result = await prisma.$transaction(async (tx) => {
      const current = await tx.partner_gifts.findUnique({
        where: { id },
      });

      if (!current) {
        throw new ApiError(404, "Không tìm thấy hộp quà.");
      }

      const changed = await tx.partner_gifts.updateMany({
        where: { id, version },
        data: {
          ...fields,
          version: { increment: 1 },
          updated_at: new Date(),
        },
      });

      if (changed.count !== 1) {
        throw new ApiError(
          409,
          "Sản phẩm vừa được cập nhật. Hãy tải lại trước khi sửa."
        );
      }

      await tx.admin_audit_logs.create({
        data: {
          actor_id: req.user.id,
          action: "PARTNER_GIFT_UPDATED",
          target_type: "partner_gifts",
          target_id: id,
          details: {
            previousVersion: current.version,
            nextVersion: version + 1,
            previousActive: current.active,
            nextActive: fields.active,
          },
        },
      });

      return tx.partner_gifts.findUniqueOrThrow({
        where: { id },
      });
    });

    return sendSuccess(res, { data: result });
  }
);

module.exports = router;
