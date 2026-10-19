const fs = require("node:fs");
const path = require("node:path");
const { z } = require("zod");

const articleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(255),
  title: z.string().trim().min(5).max(255),
  excerpt: z.string().trim().min(20).max(2000),
  category: z.string().trim().min(2).max(120),
  region: z.enum(["NORTH", "CENTRAL", "SOUTH", "NATIONWIDE"]),
  members_only: z.boolean().default(false),

  sections: z.array(
    z.object({
      heading: z.string().trim().min(2).max(255),
      body: z.string().trim().min(120).max(20000),
    }).strict()
  ).min(1).max(30),

  provenance: z.object({
    contentType: z.enum([
      "GROUP_AUTHORED",
      "FACT",
      "LEGEND",
      "QUOTATION",
    ]),
    sourceTitle: z.string().trim().max(2000).default(""),
    sourceAuthor: z.string().trim().max(2000).default(""),
    sourceUrl: z.string().url().optional(),
    bibliography: z.string().trim().max(10000).default(""),
    sourceLocator: z.string().trim().max(2000).default(""),
    localCommunity: z.string().trim().max(2000).default(""),
  }).strict(),
}).strict().superRefine((article, context) => {
  if (article.provenance.contentType === "GROUP_AUTHORED") {
    return;
  }

  const source = article.provenance;

  if (
    !source.sourceTitle ||
    !(source.sourceUrl || source.bibliography) ||
    !source.sourceLocator
  ) {
    context.addIssue({
      code: "custom",
      message:
        "Bài dựa trên nguồn cần tên nguồn, URL hoặc thư mục, và vị trí tham chiếu.",
    });
  }
});

async function main() {
  const args = process.argv.slice(2);
  const fileArg = args[0];

  if (
    !fileArg ||
    fileArg.startsWith("--") ||
    args.slice(1).some((arg) => arg !== "--apply") ||
    args.filter((arg) => arg === "--apply").length > 1
  ) {
    throw new Error(
      "Dùng: node scripts/import-culture-batch.js <file.json> [--apply]"
    );
  }

  const raw = JSON.parse(
    fs.readFileSync(path.resolve(fileArg), "utf8")
  );

  const result = z.array(articleSchema).min(1).max(200).safeParse(raw);

  if (!result.success) {
    console.error("File chưa đúng định dạng:");
    for (const issue of result.error.issues.slice(0, 20)) {
      console.error(`${issue.path.join(".")}: ${issue.message}`);
    }
    process.exitCode = 1;
    return;
  }

  const articles = result.data;
  const slugs = new Set();

  for (const article of articles) {
    if (slugs.has(article.slug)) {
      throw new Error(`Trùng slug trong file: ${article.slug}`);
    }
    slugs.add(article.slug);
  }

  if (!args.includes("--apply")) {
    console.table(
      articles.map((article) => ({
        slug: article.slug,
        title: article.title,
        sections: article.sections.length,
        audience: article.members_only ? "Hội viên" : "Công khai",
      }))
    );

    console.log(
      `Đã kiểm tra ${articles.length} bài. Chưa kết nối hoặc ghi DB.`
    );
    console.log(
      "Thêm --apply để nhập nháp vào DB ứng dụng trong .env. " +
      "Slug đã tồn tại sẽ được bỏ qua."
    );
    return;
  }

  // Chỉ load kết nối DB khi người chạy chủ động dùng --apply.
  const prisma = require("../src/config/prisma");

  let created = 0;
  let skipped = 0;

  try {
    for (const article of articles) {
      const inserted = await prisma.$transaction(async (tx) => {
        // Đồng bộ các lần chạy cùng công cụ trên cùng slug.
        await tx.$queryRaw`
          SELECT 1 AS locked
          FROM pg_advisory_xact_lock(
            hashtextextended(${`culture-import:${article.slug}`}, 0)
          )
        `;

        const existing = await tx.culture_articles.findUnique({
          where: { slug: article.slug },
          select: { id: true },
        });

        if (existing) return false;

        await tx.culture_articles.create({
          data: {
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            category: article.category,
            region: article.region,
            members_only: article.members_only,
            image_url: null,
            source: article.provenance.sourceUrl ?? null,
            content: {
              contentKind: "article",
              sections: article.sections,
              provenance: {
                ...article.provenance,
                imageCaption: "",
                imageSource: "",
                imageRightsBasis: "",
              },
              review: null,
            },
            editorial_status: "DRAFT",
            verified: false,
            active: false,
          },
        });

        return true;
      }, { maxWait: 10000, timeout: 30000 });

      if (inserted) created += 1;
      else skipped += 1;
    }
  } finally {
    console.log({ created, skipped });
    await prisma.$disconnect();
  }
}

main().catch(() => {
  console.error(
    "Import chưa hoàn tất. Kiểm tra file, kết nối và migration. " +
    "Các bài đã nhập trước lỗi vẫn được giữ; chạy lại sẽ bỏ qua slug đã có."
  );
  process.exitCode = 1;
});
