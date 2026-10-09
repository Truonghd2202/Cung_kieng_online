const prisma = require("../../src/config/prisma");
const dsvhInventory = require("./data/dsvh-national-inventory.json");
const verifiedCalendarEvents = require("./data/verified-calendar-events.json");
const ctcGuanyinLots = require("./data/ctc-guanyin-100.json");

const DSVH_INVENTORY_URL = "https://dsvh.gov.vn/danh-muc-di-san-van-hoa-phi-vat-the-quoc-gia-1789";

const articles = [
  ["dinh-lang-bac-bo", "Căn cốt đình làng Bắc Bộ & Tục thờ Thành hoàng", "NORTH", "Không gian tín ngưỡng", "/images/temple_bac_bo.jpg"],
  ["tien-dung-chu-dong-tu", "Tiên Dung và Chử Đồng Tử", "NORTH", "Điển tích xưa", "/images/tien_dung_chu_dong_tu.jpg"],
  ["den-hung", "Đền Hùng và đạo lý nhớ nguồn", "NORTH", "Lễ hội truyền thống", "/images/den_hung.jpg"],
  ["dien-hon-chen", "Điện Hòn Chén và giao thoa văn hóa", "CENTRAL", "Không gian tín ngưỡng", "/images/dien_hon_chen.jpg"],
  ["le-hoi-cau-ngu", "Lễ hội Cầu Ngư", "CENTRAL", "Lễ hội truyền thống", "/images/sea_prayer.jpg"],
  ["mieu-ba-chua-xu", "Miếu Bà Chúa Xứ Núi Sam", "SOUTH", "Phong tục & Nghi lễ", "/images/mieu_ba_chua_xu.jpg"],
];

const rituals = [
  ["chuan-bi-ngay-ram", "Chuẩn bị ngày rằm tại nhà", "Rằm", "NATIONWIDE"],
  ["mung-mot-thanh-tinh", "Mùng một thanh tịnh", "Mùng một", "NATIONWIDE"],
  ["tuong-nho-gia-dinh", "Tưởng nhớ gia đình", "Dịp gia đình", "NATIONWIDE"],
  ["phong-tuc-dau-nam", "Phong tục đầu năm", "Tết Nguyên Đán", "NATIONWIDE"],
  ["cung-gio-mien-nam", "Cúng giỗ miền Nam", "Dịp gia đình", "SOUTH"],
  ["ta-on-nha-moi", "Tạ ơn nhà mới", "Dịp gia đình", "NATIONWIDE"],
];

const calendarEvents = [
  ["Mùng một tháng Chín", 1, 9, "Phong tục dân gian"],
  ["Lễ Sóc Vọng ngày Rằm", 15, 9, "Phong tục dân gian"],
];


async function seedContent() {
  for (const [slug, title, region, category, image_url] of articles) {
    await prisma.culture_articles.upsert({
      where: { slug },
      create: { slug, title, region, category, image_url, excerpt: title, content: { sections: [], disclaimer: "Tư liệu văn hóa dùng để tham khảo và chiêm nghiệm." }, source: "Tư liệu biên tập nội bộ", verified: false },
      update: {},
    });
  }
  for (const [slug, title, occasion, region] of rituals) {
    const ritual = await prisma.rituals.upsert({
      where: { slug },
      create: { slug, title, occasion, region, description: title, source: "Tư liệu thực hành văn hóa gia đình", verified: false },
      update: {},
    });
    await prisma.ritual_steps.upsert({
      where: { ritual_id_step_number: { ritual_id: ritual.id, step_number: 1 } },
      create: { ritual_id: ritual.id, step_number: 1, title: "Chuẩn bị", description: "Giữ không gian sạch sẽ, an toàn và thực hành với sự thành kính, giản dị." },
      update: {},
    });
  }
  for (const [title, day, month, category] of calendarEvents) {
    const existing = await prisma.calendar_events.findFirst({ where: { title, day, month } });
    if (!existing) await prisma.calendar_events.create({ data: { title, day, month, category, description: title, source: "Tư liệu lịch văn hóa Việt Nam", verified: false } });
  }
  for (const event of verifiedCalendarEvents) {
    const existing = await prisma.calendar_events.findFirst({ where: { title: event.title, day: event.day, month: event.month } });
    const data = {
      title: event.title,
      day: event.day,
      month: event.month,
      calendar: "LUNAR",
      region: event.region,
      category: event.category,
      description: event.description,
      source: event.source,
      verified: true,
      active: true,
    };
    if (!existing) await prisma.calendar_events.create({ data });
  }

  for (const item of dsvhInventory) {
    const slug = `dsvh-quoc-gia-${String(item.sourceRow).padStart(3, "0")}`;
    const category = item.category || null;
    const location = item.location || "Chưa nêu trong dòng danh mục được thu thập";
    const excerpt = ["Di sản văn hóa phi vật thể quốc gia", category, location]
      .filter(Boolean)
      .join(" · ");
    const content = {
      sections: [{
        heading: "Thông tin trong danh mục chính thức",
        body: [
          `Tên di sản: ${item.title}.`,
          category ? `Loại hình được ghi: ${category}.` : "Danh mục không hiển thị loại hình trong dòng dữ liệu này.",
          `Địa điểm được ghi: ${location}.`,
          `Quyết định: ${item.decision}.`,
          `Số thứ tự trong bản danh mục đã đối chiếu: ${item.sourceNumber}.`,
        ].join(" "),
      }],
      disclaimer: "Hồ sơ này chỉ xác nhận metadata được công bố trong danh mục của Cục Di sản văn hóa; không thay thế hồ sơ khoa học, không suy diễn nghi lễ, lịch thực hành hoặc quan điểm của cộng đồng chủ thể.",
      provenance: {
        organization: "Cục Di sản văn hóa, Bộ Văn hóa, Thể thao và Du lịch",
        sourceUrl: DSVH_INVENTORY_URL,
        accessedOn: "2026-10-09",
        sourceRow: item.sourceRow,
      },
    };

    await prisma.culture_articles.upsert({
      where: { slug },
      create: {
        slug,
        title: item.title,
        excerpt,
        category,
        region: "NATIONWIDE",
        content,
        source: DSVH_INVENTORY_URL,
        verified: false,
      },
      // Existing records belong to editors; a seed must not republish or rewrite them.
      update: {},
    });
  }

  const xamRegions = ["NORTH", "CENTRAL", "SOUTH"];
  const xamTopics = ["Bình an", "Gia đình", "Học tập", "Công việc"];
  const gradeLabels = { "上籤": "Thượng Cát", "中籤": "Trung Cát", "下籤": "Hạ Bình" };
  for (const region of xamRegions) {
    for (const topic of xamTopics) {
      for (const lot of ctcGuanyinLots) {
        const xam_type = `${region}:${topic}`;
        const data = {
          stick_number: lot.stickNumber,
          xam_type,
          region,
          category: topic,
          fortune_level: gradeLabels[lot.sourceGrade] || "Bình",
          poem: null,
          meaning: `Hệ tham khảo: Quan Âm Linh Xăm do Hoa nhân miếu vụ ủy ban (Hong Kong) công bố. Điển tích gốc: ${lot.storyTitle}. Bản diễn giải tiếng Việt chưa được biên tập và thẩm định.`,
          advice: "Chỉ dùng như tư liệu chiêm nghiệm; hãy đối chiếu với thực tế và không dựa riêng vào thẻ để quyết định việc quan trọng.",
          source: lot.sourceUrl,
          verified: false,
          active: true,
        };
        await prisma.xin_xam.upsert({
          where: { xam_type_stick_number: { xam_type, stick_number: lot.stickNumber } },
          create: data,
          update: {},
        });
      }
    }
  }
}

module.exports = { seedContent };
