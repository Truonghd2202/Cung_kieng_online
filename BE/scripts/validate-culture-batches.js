const fs = require("node:fs");
const path = require("node:path");
const { z } = require("zod");

// Importer schema
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

const batchesDir = path.resolve(__dirname, "../../editorial/culture-batches");

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function calculateArticleWordCount(article) {
  let count = countWords(article.title) + countWords(article.excerpt);
  for (const s of article.sections) {
    count += countWords(s.heading) + countWords(s.body);
  }
  return count;
}

const forbiddenPhrases = [
  /chữa\s+(khỏi|dứt\s+điểm)\s+bệnh/i,
  /chắc\s+chắn\s+(phát\s+tài|giàu\s+có|thành\s+công)/i,
  /thay\s+đổi\s+(vận\s+mệnh|số\s+phận)\s+ngay/i,
  /linh\s+ứng\s+100%/i,
  /bảo\s+đảm\s+tai\s+qua\s+nạn\s+khỏi/i,
];

function main() {
  if (!fs.existsSync(batchesDir)) {
    console.error("Thư mục editorial/culture-batches chưa tồn tại.");
    process.exitCode = 1;
    return;
  }

  const files = fs.readdirSync(batchesDir)
    .filter((f) => f.startsWith("batch-") && f.endsWith(".json"))
    .sort();

  console.log(`Tìm thấy ${files.length} file batch.`);

  const allSlugs = new Set();
  const allTitles = new Set();
  let totalArticles = 0;
  let validationErrors = 0;
  const wordCountReports = [];
  const superstitionWarnings = [];

  for (const file of files) {
    const filePath = path.join(batchesDir, file);
    let raw;
    try {
      raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error(`Lỗi cú pháp JSON trong ${file}:`, err.message);
      validationErrors++;
      continue;
    }

    if (!Array.isArray(raw)) {
      console.error(`${file} không phải là JSON array.`);
      validationErrors++;
      continue;
    }

    if (raw.length > 10) {
      console.error(`${file} chứa ${raw.length} bài (vượt quá giới hạn tối đa 10 bài/file).`);
      validationErrors++;
    }

    const parseResult = z.array(articleSchema).safeParse(raw);
    if (!parseResult.success) {
      console.error(`Lỗi schema trong ${file}:`);
      for (const issue of parseResult.error.issues) {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      }
      validationErrors += parseResult.error.issues.length;
      continue;
    }

    for (const article of parseResult.data) {
      totalArticles++;

      // Check slug duplicate
      if (allSlugs.has(article.slug)) {
        console.error(`Trùng slug toàn cục: ${article.slug} trong file ${file}`);
        validationErrors++;
      }
      allSlugs.add(article.slug);

      // Check title duplicate
      if (allTitles.has(article.title)) {
        console.error(`Trùng tiêu đề: "${article.title}" trong file ${file}`);
        validationErrors++;
      }
      allTitles.add(article.title);

      // Word count
      const wordCount = calculateArticleWordCount(article);
      wordCountReports.push({
        file,
        slug: article.slug,
        title: article.title.slice(0, 35) + "...",
        sections: article.sections.length,
        words: wordCount,
        status: wordCount >= 600 && wordCount <= 1200 ? "OK" : (wordCount < 600 ? "NGẮN (<600 từ)" : "DÀI (>1200 từ)")
      });

      // Superstition check
      const fullText = [
        article.title,
        article.excerpt,
        ...article.sections.map((s) => s.heading + " " + s.body)
      ].join(" ");

      for (const pattern of forbiddenPhrases) {
        if (pattern.test(fullText)) {
          superstitionWarnings.push({
            file,
            slug: article.slug,
            matched: pattern.toString()
          });
        }
      }
    }
  }

  console.log("\n================ KẾT QUẢ KIỂM TRA BATCHES ================");
  console.log(`- Tổng số file batch: ${files.length}`);
  console.log(`- Tổng số bài viết đã nạp: ${totalArticles}`);
  console.log(`- Lỗi schema / trùng lặp: ${validationErrors}`);
  console.log(`- Cảnh báo mê tín / hứa hẹn tâm linh: ${superstitionWarnings.length}`);

  if (superstitionWarnings.length > 0) {
    console.table(superstitionWarnings);
  }

  const shortArticles = wordCountReports.filter((r) => r.words < 600);
  console.log(`- Số bài đạt độ dài khuyến nghị (>=600 từ): ${wordCountReports.length - shortArticles.length}/${totalArticles}`);
  if (shortArticles.length > 0) {
    console.log(`- Danh sách bài ngắn cần rà soát thêm: ${shortArticles.length}`);
    console.table(shortArticles.slice(0, 10));
  }

  if (validationErrors > 0) {
    process.exitCode = 1;
  }
}

main();
