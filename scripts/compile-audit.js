const fs = require("fs");
const path = require("path");
const { getCultureReviewStatus } = require("./culture-review-status");

const batchesDir = path.join(__dirname, "../editorial/culture-batches");
const files = fs.readdirSync(batchesDir).filter(f => f.endsWith(".json")).sort();

const countWords = (text) => text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

let totalArticles = 0;
let sourceIdentifiedCount = 0;
let sourceCheckedCount = 0;
let contentReviewedCount = 0;

const batchDetails = [];

files.forEach((file, bIdx) => {
  const content = JSON.parse(fs.readFileSync(path.join(batchesDir, file), "utf8"));
  const articles = [];

  content.forEach((a, aIdx) => {
    totalArticles++;
    const bodyWords = (a.sections || []).reduce((acc, s) => acc + countWords(s.body), 0);
    const headingsWords = (a.sections || []).reduce((acc, s) => acc + countWords(s.heading), 0);
    const totalWords = countWords(a.title) + countWords(a.excerpt) + headingsWords + bodyWords;

    const url = a.provenance?.sourceUrl;
    let isSpecific = false;
    let urlType = "NONE";
    if (url) {
      try {
        const u = new URL(url);
        if (u.pathname === "/" || u.pathname === "" || u.pathname === "/vi" || u.pathname === "/en" || u.pathname === "/vi/" || u.pathname === "/en/") {
          urlType = "HOMEPAGE";
        } else {
          urlType = "SPECIFIC";
          isSpecific = true;
        }
      } catch {
        urlType = "INVALID";
      }
    }

    const reviewStatus = getCultureReviewStatus(a);
    if (reviewStatus.sourceIdentified) sourceIdentifiedCount++;
    if (reviewStatus.sourceChecked) sourceCheckedCount++;
    if (reviewStatus.contentReviewed) contentReviewedCount++;

    // Analysis of supported content & unverified points
    let supportedContent = "";
    let unverifiedPoints = "";

    if (bIdx === 0) {
      // UNESCO Batch 1
      supportedContent = "Hồ sơ di sản đại diện nhân loại UNESCO: Tiêu chí ghi danh, không gian địa lý di sản, chủ thể cộng đồng thực hành và các biện pháp bảo tồn cam kết quốc tế.";
      unverifiedPoints = "Các huyền tích khởi nguyên dân tộc, truyền thuyết thời Hùng Vương, thế giới quan Tam phủ/Tứ phủ mang tính niềm tin đức tin dân gian, cần phân định với sự kiện lịch sử xác thực.";
    } else if (bIdx === 1) {
      // Batch 2: Lễ hội ba miền
      supportedContent = "Hồ sơ UNESCO (Gióng, Kéo co, Then, Bà Chúa Xứ, Gốm Chăm) và Hồ sơ di sản quốc gia (QĐ 5079 Cầu ngư Khánh Hòa, QĐ 2970 Núi Bà Đen, QĐ 2680 Ok Om Bok, luận án Thành hoàng làng): Lịch sử lễ hội, nghi thức tế tự chính, diễn xướng dân gian.";
      unverifiedPoints = "Huyền tích hiển linh của các vị thần (Thánh Gióng bay về trời, Lý Thị Thiên Hương hiển thánh, Cá Ông hiển linh cứu nạn); các biến thể diễn xướng giữa các thôn giáp chưa đồng nhất.";
    } else if (bIdx === 2) {
      // Batch 3: Kiến trúc cổ
      supportedContent = "Hồ sơ Di tích quốc gia đặc biệt (Đình Tây Đằng 2979, Đền Trần QĐ 1272, Chùa Một Cột, Chùa Dâu QĐ 2408, Chùa Keo QĐ 1419), Di sản thế giới UNESCO (Chùa Thiên Mụ 678, Chùa Ông Hội An 948): Niên đại kiến trúc, kỹ thuật mộng giằng gỗ, kết cấu mặt bằng và bảo vật quốc gia.";
      unverifiedPoints = "Giấc chiêm bao của vua Lý Thái Tông dựng Chùa Một Cột, truyền thuyết bà lão áo đỏ chùa Thiên Mụ, sự tích Man Nương Phật Mẫu là huyền thoại dân gian/Phật giáo mang tính biểu tượng.";
    } else {
      // Batches 4 to 20
      supportedContent = `Tài liệu sơ thảo ghi nhận: ${a.provenance?.sourceTitle || a.title}. Đã có khung phân tích 4 phần theo schema.`;
      unverifiedPoints = `Link nguồn hiện tại (${url || 'chưa có'}) là trang chủ/nguồn chưa xác minh cụ thể trang sách/văn bản. Chưa đối chiếu từng nhận định chi tiết, cần người duyệt đọc trực tiếp tài liệu gốc.`;
    }

    articles.push({
      id: totalArticles,
      batchFile: file,
      batchIndex: aIdx + 1,
      slug: a.slug,
      title: a.title,
      sourceTitle: a.provenance?.sourceTitle || "",
      sourceAuthor: a.provenance?.sourceAuthor || "",
      sourceUrl: url || "",
      urlType,
      isSpecific,
      bibliography: a.provenance?.bibliography || "",
      sourceLocator: a.provenance?.sourceLocator || "",
      bodyWords,
      totalWords,
      status: reviewStatus,
      supportedContent: "Chưa có đối chiếu từng claim; người duyệt cần xác minh nội dung với tài liệu gốc.",
      unverifiedPoints: "Chưa có hồ sơ xác nhận nguồn hoặc nội dung cho phiên bản này."
    });
  });

  batchDetails.push({
    file,
    batchNum: bIdx + 1,
    articles
  });
});

console.log({ totalArticles, sourceIdentifiedCount, sourceCheckedCount, contentReviewedCount });
