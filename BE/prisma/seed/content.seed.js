const prisma = require("../../src/config/prisma");

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
  ["Lễ hội Katê", 1, 7, "Lễ hội truyền thống"],
  ["Tết Trùng Cửu", 9, 9, "Phong tục dân gian"],
  ["Hội Chùa Keo mùa thu", 15, 9, "Lễ hội truyền thống"],
  ["Lễ Sóc Vọng ngày Rằm", 15, 9, "Phong tục dân gian"],
];

const xamCards = [
  [1, "Bình an", "NORTH"], [2, "Gia đình", "NORTH"], [3, "Học tập", "NORTH"], [4, "Công việc", "NORTH"],
  [5, "Bình an", "CENTRAL"], [6, "Gia đình", "CENTRAL"], [7, "Học tập", "CENTRAL"], [8, "Công việc", "CENTRAL"],
  [9, "Bình an", "SOUTH"], [10, "Gia đình", "SOUTH"], [11, "Học tập", "SOUTH"], [12, "Công việc", "SOUTH"],
];

const xamInterpretations = {
  1: ["Đại Cát", "Vận hội rộng mở, có nhiều điều kiện thuận lợi để khởi sự.", "Tiến hành từng bước, giữ khiêm nhường và kiểm tra nguồn lực thực tế."],
  2: ["Thượng Cát", "Xu hướng tốt, dễ nhận được sự hỗ trợ hoặc đồng thuận.", "Chủ động kết nối, nhưng không nên phụ thuộc hoàn toàn vào may mắn."],
  3: ["Trung Cát", "Có thuận lợi xen lẫn thử thách; kết quả phụ thuộc nhiều vào sự chuẩn bị.", "Lập kế hoạch rõ ràng và dành phương án dự phòng."],
  4: ["Tiểu Cát", "Có tín hiệu tích cực ở quy mô nhỏ, thích hợp tiến chậm và quan sát.", "Ưu tiên một bước thử nghiệm ít rủi ro trước khi mở rộng."],
  5: ["Bình", "Tình thế tương đối cân bằng, chưa có dấu hiệu nghiêng hẳn về thuận hay nghịch.", "Giữ nhịp ổn định và thu thập thêm dữ kiện trước quyết định lớn."],
  6: ["Hạ Xăm", "Điều kiện hiện tại còn hạn chế, cần thêm thời gian hoặc nguồn lực.", "Giảm kỳ vọng ngắn hạn, củng cố nền tảng rồi mới tiến tiếp."],
  7: ["Hung", "Có dấu hiệu rủi ro hoặc xung đột cần được nhận diện sớm.", "Tạm hoãn việc khó đảo ngược và xin ý kiến người có chuyên môn."],
  8: ["Đại Hung", "Cảnh báo mạnh về rủi ro nếu hành động vội vàng hoặc thiếu thông tin.", "Không dùng thẻ xăm để tự gây sợ hãi; hãy dừng, kiểm chứng thực tế và tìm hỗ trợ phù hợp."],
  9: ["Thượng Cát", "Có cơ hội thuận lợi nếu giữ đúng mục tiêu và cách làm minh bạch.", "Nắm cơ hội nhưng vẫn đặt giới hạn về thời gian, tài chính và trách nhiệm."],
  10: ["Trung Cát", "Kết quả có thể tốt khi kiên trì, song tiến độ không nhất thiết nhanh.", "Chia mục tiêu thành các mốc nhỏ để theo dõi và điều chỉnh."],
  11: ["Bình", "Tình thế đang chuyển tiếp, phù hợp với quan sát hơn là phán đoán.", "Không ép một câu trả lời có–không; cân nhắc nhiều phương án."],
  12: ["Hung", "Có yếu tố bất lợi cần xử lý trước khi tiếp tục.", "Ưu tiên an toàn, tránh cam kết lớn và kiểm tra lại giả định ban đầu."],
};

async function seedContent() {
  for (const [slug, title, region, category, image_url] of articles) {
    await prisma.culture_articles.upsert({
      where: { slug },
      create: { slug, title, region, category, image_url, excerpt: title, content: { sections: [], disclaimer: "Tư liệu văn hóa dùng để tham khảo và chiêm nghiệm." }, source: "Tư liệu biên tập nội bộ", verified: false },
      update: { title, region, category, image_url },
    });
  }
  for (const [slug, title, occasion, region] of rituals) {
    const ritual = await prisma.rituals.upsert({
      where: { slug },
      create: { slug, title, occasion, region, description: title, source: "Tư liệu thực hành văn hóa gia đình", verified: false },
      update: { title, occasion, region },
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
  for (const [stick_number, xam_type, region] of xamCards) {
    const [fortune_level, meaning, advice] = xamInterpretations[stick_number];
    const poem = `Thẻ số ${String(stick_number).padStart(2, "0")} nhắc người hỏi giữ tâm sáng, xét việc kỹ và hành động có trách nhiệm.`;
    const source = "Nội dung biên tập theo hướng chiêm nghiệm văn hóa; không phải dự đoán tương lai";
    await prisma.xin_xam.upsert({
      where: { xam_type_stick_number: { xam_type: `${region}:${xam_type}`, stick_number } },
      create: { stick_number, xam_type: `${region}:${xam_type}`, region, category: xam_type, fortune_level, poem, meaning, advice, source, verified: false },
      update: { region, category: xam_type, fortune_level, poem, meaning, advice, source },
    });
  }
}

module.exports = { seedContent };
