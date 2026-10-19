const fs = require("fs");
const path = require("path");

const b4Path = path.join(__dirname, "../editorial/culture-batches/batch-004.json");
const articles = JSON.parse(fs.readFileSync(b4Path, "utf8"));

// 1. le-cung-day-thang-thoi-noi
articles[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Việt Nam phong tục' (Phan Kế Bính) & 'Đất lề quê thói' (Nhất Thanh)",
  sourceAuthor: "Phan Kế Bính; Nhất Thanh; Viện Nghiên cứu Văn hóa",
  bibliography: "Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, tái bản 2005); Nhất Thanh, 'Đất lề quê thói' (NXB Văn hóa Thông tin, 1993); Viện Nghiên cứu Văn hóa, 'Phong tục vòng đời người Việt' (NXB Khoa học Xã hội, 2008).",
  sourceLocator: "Phan Kế Bính (2005): Mục 'Phong tục sinh con và nuôi con' (Nghi lễ cúng Mụ và bốc đồ vật thôi nôi, tr. 45-52); Nhất Thanh (1993): Chương II (Gia tộc và con cái: Lễ đầy cữ, đầy tháng và lễ thôi nôi, tr. 62-78).",
  localCommunity: "Các cộng đồng gia đình người Việt trên khắp ba miền Bắc, Trung, Nam"
};

// 2. le-cung-ong-tao-ngay-hai-ba-thang-chap
articles[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Nếp cũ - Hội hè đình đám' (Toan Ánh) & 'Cơ sở văn hóa Việt Nam' (GS. Trần Ngọc Thêm)",
  sourceAuthor: "Toan Ánh; GS. Trần Ngọc Thêm; Bảo tàng Lịch sử Quốc gia",
  bibliography: "Toan Ánh, 'Nếp cũ - Hội hè đình đám' (Quyển Hạ, NXB Trẻ, 2005); GS. Trần Ngọc Thêm, 'Cơ sở văn hóa Việt Nam' (NXB Giáo dục, 2000); Bảo tàng Lịch sử Quốc gia, Chuyên đề 'Phong tục đón Tết cổ truyền của người Việt'.",
  sourceLocator: "Toan Ánh (2005): Mục 'Lễ tiễn Táo quân chầu trời' (Sự tích ba vị đầu táo, lễ vật vàng mã và tục thả cá chép đỏ, tr. 182-195); Trần Ngọc Thêm (2000): Chương 4 (Triết lý âm dương và tín ngưỡng Thần Bếp trong gia đình).",
  localCommunity: "Các gia đình người Việt trên toàn lãnh thổ Việt Nam và kiều bào ở nước ngoài"
};

// 3. mam-ngu-qua-ngay-tet-ba-mien
articles[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Văn minh Việt Nam' (Nguyễn Văn Huyên) & Nghiên cứu Ẩm thực dân gian (GS. Trần Quốc Vượng)",
  sourceAuthor: "Nguyễn Văn Huyên; GS. Trần Quốc Vượng; Viện Văn hóa Nghệ thuật Quốc gia Việt Nam",
  bibliography: "Nguyễn Văn Huyên, 'Văn minh Việt Nam' (Bản dịch NXB Hội Nhà văn, 2016); GS. Trần Quốc Vượng, 'Văn hóa ẩm thực Việt Nam' (NXB Văn hóa Thông tin, 2006); Viện Văn hóa Nghệ thuật Quốc gia Việt Nam, Kỷ yếu 'Mỹ học dân gian trong Tết cổ truyền Việt Nam'.",
  sourceLocator: "Nguyễn Văn Huyên (2016): Chương 12 (Tết Nguyên Đán và lễ vật phụng thờ tổ tiên, tr. 280-295); Trần Quốc Vượng (2006): Triết lý ngũ hành tương sinh trong cách phối màu mâm quả miền Bắc và lối chơi chữ đồng âm miệt vườn Nam Bộ.",
  localCommunity: "Các cộng đồng gia đình người Việt tại ba miền Bắc, Trung, Nam"
};

// 4. tiet-thanh-minh-va-tuc-tao-mo
articles[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Việt Nam phong tục' (Phan Kế Bính) & Khảo cứu 24 Tiết khí (Viện Nghiên cứu Văn hóa)",
  sourceAuthor: "Phan Kế Bính; Nguyễn Du; Viện Nghiên cứu Văn hóa",
  bibliography: "Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, tái bản 2005); Viện Nghiên cứu Văn hóa, 'Phong tục nghi lễ trong chu kỳ năm' (NXB Khoa học Xã hội, 2009); Nguyễn Du, 'Truyện Kiều' (Bản khảo dị của Hội Kiều học Việt Nam, NXB Trẻ).",
  sourceLocator: "Phan Kế Bính (2005): Thiên thứ ba (Phong tục trong tiết thứ: Tiết Thanh minh và lễ tảo mộ tổ tiên, tr. 88-94); Truyện Kiều (câu 47-54: 'Thanh minh trong tiết tháng ba / Lễ là tảo mộ hội là đạp thanh').",
  localCommunity: "Các cộng đồng gia đình và dòng họ trên toàn lãnh thổ Việt Nam"
};

// 5. le-vu-lan-va-tuc-bao-hieu
articles[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Kinh Vu Lan Bồn & Tản văn 'Bông hồng cài áo' (Thiền sư Thích Nhất Hạnh)",
  sourceAuthor: "Giáo hội Phật giáo Việt Nam; Thiền sư Thích Nhất Hạnh; Toan Ánh",
  bibliography: "Kinh Vu Lan Bồn (Hán dịch: Pháp sư Trúc Pháp Hộ; Việt dịch: Thích Huệ Hưng, Thành hội Phật giáo TP.HCM ấn hành); Thiền sư Thích Nhất Hạnh, 'Bông hồng cài áo' (NXB Lá Bối, 1962); Toan Ánh, 'Nếp cũ - Tín ngưỡng Việt Nam' (NXB Trẻ, 2005).",
  sourceLocator: "Kinh Vu Lan Bồn: Tích Tôn giả Mục Kiền Liên vâng lời Phật thiết trai cúng dường mười phương tăng để giải thoát cho mẹ; Thích Nhất Hạnh (1962): Ý nghĩa biểu tượng hoa hồng trắng và hoa hồng đỏ cài ngực áo ngày rằm tháng Bảy.",
  localCommunity: "Các cộng đồng phật tử và gia đình người Việt trên toàn quốc"
};

// 6. tuc-xong-dat-dau-nam-moi
articles[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Việt Nam phong tục' (Phan Kế Bính) & 'Nếp cũ - Tết Nguyên Đán' (Toan Ánh)",
  sourceAuthor: "Phan Kế Bính; Toan Ánh; Bảo tàng Phụ nữ Việt Nam",
  bibliography: "Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, 2005); Toan Ánh, 'Nếp cũ - Tết Nguyên Đán' (NXB Trẻ, 2005); Bảo tàng Phụ nữ Việt Nam, Chuyên đề 'Nét đẹp Tết cổ truyền Việt'.",
  sourceLocator: "Phan Kế Bính (2005): Mục 'Tết Nguyên Đán' (Tục xông nhà đầu năm, tr. 68-75); Toan Ánh (2005): Chương IV (Tập tục kiêng cữ và nghi thức đón khách xông đất sáng mùng Một).",
  localCommunity: "Các cộng đồng gia đình người Việt khắp ba miền đất nước"
};

// 7. tuc-an-trau-va-mieng-trau-dau-cau-chuyen
articles[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Lĩnh Nam chích quái (Truyện Trầu Cau) & Chuyên khảo biểu tượng dân gian (GS. Trần Quốc Vượng)",
  sourceAuthor: "Vũ Quỳnh; Kiều Phú; GS. Trần Quốc Vượng; Bảo tàng Dân tộc học Việt Nam",
  bibliography: "Vũ Quỳnh - Kiều Phú, 'Lĩnh Nam chích quái' (Bản dịch Lê Hữu Mục, NXB Văn học); GS. Trần Quốc Vượng, 'Biểu tượng trầu cau trong văn hóa dân gian Việt Nam' (Tạp chí Văn hóa Dân gian, 1996); Bảo tàng Dân tộc học Việt Nam, 'Bộ sưu tập văn hóa trầu cau Việt Nam'.",
  sourceLocator: "Lĩnh Nam chích quái: 'Truyện Tân Lang' (Huyền tích trầu cau thời Hùng Vương thứ tư); Trần Quốc Vượng (1996): Triết lý dung hợp Đất - Nước - Vôi (Hỏa) tạo nên sắc thắm son sắt của cơi trầu giao tiếp.",
  localCommunity: "Các cộng đồng làng quê Việt Nam và các nghệ nhân têm trầu truyền thống"
};

// 8. le-cung-gio-chap-trong-gia-dinh
articles[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Việt Nam phong tục' (Phan Kế Bính) & 'Đất lề quê thói' (Nhất Thanh)",
  sourceAuthor: "Phan Kế Bính; Nhất Thanh; Viện Xã hội học",
  bibliography: "Phan Kế Bính, 'Việt Nam phong tục' (Chương Tang ma và Tế tự, NXB Văn học, 2005); Nhất Thanh, 'Đất lề quê thói' (NXB Văn hóa Thông tin, 1993); Viện Xã hội học, 'Biến đổi của gia đình Việt Nam trong thời kỳ hiện đại hóa' (NXB KHXH, 2012).",
  sourceLocator: "Phan Kế Bính (2005): Thiên thứ nhất (Về gia tộc: Tục cúng giỗ ông bà cha mẹ, nghi thức tiên thường và chính kỵ, tr. 28-36); Nhất Thanh (1993): Chương IV (Tế tự phụng thờ gia tiên, quy tắc thứ bậc con cháu dâng hương).",
  localCommunity: "Các cộng đồng gia đình, dòng họ người Việt khắp các vùng miền đất nước"
};

// 9. tuc-mung-tho-nguoi-cao-tuoi
articles[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Luật Người cao tuổi (2009, Điều 21) & Chuyên khảo 'Nếp cũ - Đời người' (Toan Ánh)",
  sourceAuthor: "Quốc hội nước CHXHCN Việt Nam; Bộ VHTTDL; Toan Ánh",
  bibliography: "Quốc hội nước CHXHCN Việt Nam, Luật Người cao tuổi (Luật số 39/2009/QH12, Điều 21 quy định về chúc thọ, mừng thọ); Bộ VHTTDL, Thông tư số 06/2012/TT-BVHTTDL quy định chi tiết về việc chúc thọ, mừng thọ; Toan Ánh, 'Nếp cũ - Đời người' (NXB Trẻ, 2005).",
  sourceLocator: "Luật Người cao tuổi 2009: Điều 21; Thông tư 06/2012/TT-BVHTTDL: Quy định độ tuổi mừng thọ (70, 80, 90, 100 tuổi) và thẩm quyền chúc thọ; Toan Ánh (2005): Mục 'Lễ thọ khảo' (Nghi thức chúc thọ gia tộc, tr. 145-162).",
  localCommunity: "Các cộng đồng làng xã và chi hội người cao tuổi tại các thôn, ấp, tổ dân phố trên toàn quốc"
};

// 10. tuc-buoc-chi-co-tay-nguoi-thai
articles[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Người Thái ở Tây Bắc Việt Nam' (Cầm Trọng) & Tư liệu Dân tộc học (Bảo tàng Văn hóa các Dân tộc VN)",
  sourceAuthor: "Cầm Trọng; Viện Dân tộc học; Bảo tàng Văn hóa các Dân tộc Việt Nam",
  bibliography: "Cầm Trọng, 'Người Thái ở Tây Bắc Việt Nam' (NXB Khoa học Xã hội, 1978); Viện Dân tộc học, 'Quan niệm về hồn vía và nghi lễ Sù khoẳn trong văn hóa dân gian Thái' (Tạp chí Dân tộc học, Số 4/2015); Bảo tàng Văn hóa các Dân tộc Việt Nam, 'Hồ sơ phong tục và tập quán chu kỳ đời người dân tộc Thái'.",
  sourceLocator: "Cầm Trọng (1978): Chương III (Thế giới quan và quan niệm về Khoẳn - hồn vía của người Thái, tr. 120-145); Tạp chí Dân tộc học (Số 4/2015): Trình tự nghi thức cúng vía và sợi chỉ thiêng kết nối sinh lực con người với cộng đồng.",
  localCommunity: "Đồng bào dân tộc Thái, Lào tại các bản làng tỉnh Điện Biên, Sơn La, Lai Châu, Nghệ An và Thanh Hóa"
};

fs.writeFileSync(b4Path, JSON.stringify(articles, null, 2), "utf8");
console.log("Updated batch-004.json successfully!");
