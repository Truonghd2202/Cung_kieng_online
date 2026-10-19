const express = require("express");
const prisma = require("../config/prisma");
const authenticate = require("../middleware/auth.middleware");
const { getMembership } = require("../services/payment.service");
const ApiError = require("../utils/api-error");
const { sendSuccess } = require("../utils/response");
const { isCultureArticlePublished } = require("../services/culture-publication");

const router = express.Router();

router.use(authenticate);

router.use(async (req, _res, next) => {
  try {
    const membership = await getMembership(req.user.id);

    if (!membership.subscription) {
      throw new ApiError(
        403,
        "Cần hội viên Tâm An đang hoạt động để đọc thư viện này."
      );
    }

    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  const offset = Number(req.query.offset ?? 0);

  if (!Number.isSafeInteger(offset) || offset < 0) {
    throw new ApiError(422, "Vị trí phân trang không hợp lệ.");
  }

  const rows = await prisma.culture_articles.findMany({
    where: {
      members_only: true,
      active: true,
      verified: true,
      editorial_status: "PUBLISHED",
    },
    orderBy: [
      { created_at: "desc" },
      { id: "asc" },
    ],
    skip: offset,
    take: 21,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      image_url: true,
      content: true,
      members_only: true,
      active: true,
      verified: true,
      editorial_status: true,
    },
  });

  const hasMore = rows.length > 20;
  const items = rows.slice(0, 20)
    .filter((row) => isCultureArticlePublished(row, { membersOnly: true }))
    .map(({ slug, title, excerpt }) => ({ slug, title, excerpt }));

  return sendSuccess(res, {
    data: {
      items,
      nextOffset: hasMore ? offset + 20 : null,
    },
  });
});

router.get("/:slug", async (req, res) => {
  const row = await prisma.culture_articles.findFirst({
    where: {
      slug: req.params.slug,
      members_only: true,
      active: true,
      verified: true,
      editorial_status: "PUBLISHED",
    },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      source: true,
      content: true,
      image_url: true,
      members_only: true,
      active: true,
      verified: true,
      editorial_status: true,
    },
  });

  if (!row || !isCultureArticlePublished(row, { membersOnly: true })) {
    throw new ApiError(
      404,
      "Bài không tồn tại hoặc hiện không được phát hành."
    );
  }

  return sendSuccess(res, {
    data: {
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      source: row.source,
      sections: Array.isArray(row.content?.sections)
        ? row.content.sections
        : [],
      provenance: row.content?.provenance ?? null,
    },
  });
});

module.exports = router;
