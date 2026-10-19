const prisma = require("../src/config/prisma");
const {
  hasPublishableCultureContent,
} = require("../src/services/culture-publication");

async function main() {
  const articles = await prisma.$transaction(
    async (tx) => {
      // PostgreSQL chặn thao tác ghi trong transaction này.
      await tx.$executeRaw`SET TRANSACTION READ ONLY`;

      return tx.culture_articles.findMany({
        select: {
          slug: true,
          title: true,
          editorial_status: true,
          verified: true,
          active: true,
          members_only: true,
          image_url: true,
          content: true,
        },
        orderBy: { slug: "asc" },
      });
    },
    { timeout: 30_000 }
  );

  const statuses = {};
  const ready = [];
  const needsReview = [];

  for (const article of articles) {
    const status = article.editorial_status;
    statuses[status] = (statuses[status] ?? 0) + 1;

    const contentValid = hasPublishableCultureContent({
      content: article.content,
      imageUrl: article.image_url,
    });

    const publishedFlags =
      status === "PUBLISHED" &&
      article.verified &&
      article.active;

    if (publishedFlags && contentValid) {
      ready.push(article);
    } else {
      const reasons = [];

      if (status !== "PUBLISHED") {
        reasons.push(`Trạng thái ${status}`);
      }

      if (!article.verified) {
        reasons.push("Chưa xác minh");
      }

      if (!article.active) {
        reasons.push("Đang ẩn");
      }

      if (!contentValid) {
        reasons.push("Chưa đạt điều kiện nội dung/nguồn/ảnh hiện có");
      }

      needsReview.push({
        slug: article.slug,
        title: article.title,
        reasons: reasons.join("; "),
      });
    }
  }

  const publicCount = ready.filter(
    (article) => !article.members_only
  ).length;

  const memberCount = ready.filter(
    (article) => article.members_only
  ).length;

  console.log("\nKIỂM KÊ BÀI VĂN HÓA");
  console.table({
    "Tổng bản ghi trong DB": articles.length,
    "Đạt cờ xuất bản và điều kiện nội dung hiện có": ready.length,
    "Trong đó: bài công khai": publicCount,
    "Trong đó: bài dành cho hội viên": memberCount,
    "Cần rà soát": needsReview.length,
    "Còn thiếu so với 200 bài đạt điều kiện kỹ thuật": Math.max(
      0,
      200 - ready.length
    ),
  });

  console.log("\nSỐ LƯỢNG THEO TRẠNG THÁI");
  console.table(
    Object.entries(statuses).map(([status, count]) => ({
      status,
      count,
    }))
  );

  console.log("\nTỐI ĐA 30 BÀI CẦN RÀ SOÁT");
  console.table(needsReview.slice(0, 30));

  console.log(
    "\nLưu ý: đây là kiểm kê kỹ thuật, không chứng nhận " +
    "chất lượng biên tập, tính chính xác hoặc quyền sử dụng."
  );
}

main()
  .catch(() => {
    console.error(
      "Không hoàn tất kiểm kê. Kiểm tra kết nối DB, migration " +
      "và phiên bản Prisma Client. Không có thao tác ghi được yêu cầu."
    );
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
