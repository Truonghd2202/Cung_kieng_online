const fs = require("fs");
const path = require("path");

const batchesDir = path.join(__dirname, "../editorial/culture-batches");

// ==========================================
// BATCH 013: Ẩm thực truyền thống, Y học cổ truyền & Tiết khí
// ==========================================
const b13Path = path.join(batchesDir, "batch-013.json");
const b13 = JSON.parse(fs.readFileSync(b13Path, "utf8"));

// 1. van-hoa-uong-tra-nguoi-viet
b13[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Tùy bút 'Vang bóng một thời' (Nguyễn Tuân) & 'Thương nhớ mười hai' (Vũ Bằng)",
  sourceAuthor: "Nguyễn Tuân; Vũ Bằng; Hiệp hội Chè Việt Nam",
  bibliography: "Nguyễn Tuân, 'Vang bóng một thời' (truyện Chén trà trong sương sớm, NXB Văn học); Vũ Bằng, 'Thương nhớ mười hai' (NXB Văn hóa, 1971); Hiệp hội Chè Việt Nam, Tuyển tập 'Văn hóa Trà Việt Nam'.",
  sourceLocator: "Nguyễn Tuân: Cảnh cụ ấm thưởng trà lúc sớm mai, nghệ thuật ướp sen cảnh ngọc Tây Hồ bằng gạo sen bách diệp; Vũ Bằng (1971): Tháng Chạp và cái thú uống trà mạn ấm áp bên bếp than hoa ngày đông Bắc Bộ.",
  localCommunity: "Nghệ nhân ướp trà sen phường Quảng An (Tây Hồ, Hà Nội) và người sành trà Việt Nam"
};

// 2. tri-thuc-nau-pho-ha-noi-nam-dinh
b13[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2326/QĐ-BVHTTDL & Tùy bút ẩm thực Hà Nội",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Thạch Lam; Nguyễn Tuân",
  bibliography: "Bộ VHTTDL, Quyết định số 2326/QĐ-BVHTTDL ngày 09/08/2024 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghệ thuật nấu Phở Hà Nội & Tri thức dân gian nghề nấu Phở Nam Định); Thạch Lam, 'Hà Nội băm sáu phố phường' (NXB Đời Nay, 1943); Nguyễn Tuân, Tùy bút 'Phở' (NXB Văn học).",
  sourceLocator: "Quyết định số 2326/QĐ-BVHTTDL; Thạch Lam (1943): Đoạn văn kinh điển về bát phở cổ truyền Hà Nội gánh rong; Nguyễn Tuân: Nghệ thuật ninh xương bò lấy nước dùng trong veo, vị ngọt tủy và thảo mộc hoa hồi, quế chi, thảo quả.",
  localCommunity: "Các nghệ nhân, chủ quán phở gia truyền tại Hà Nội và làng phở Giao Cù, Vân Cù (huyện Nam Trực, Nam Định)"
};

// 3. tri-thuc-lam-mam-tom-hau-loc
b13[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ bảo hộ nhãn hiệu tập thể Mắm tôm Hậu Lộc & 'Miếng ngon Hà Nội'",
  sourceAuthor: "Cục Sở hữu Trí tuệ; Vũ Bằng; Sở Nông nghiệp và PTNT tỉnh Thanh Hóa",
  bibliography: "Cục Sở hữu Trí tuệ, Hồ sơ bảo hộ nhãn hiệu tập thể 'Mắm tôm Hậu Lộc, tỉnh Thanh Hóa'; Vũ Bằng, 'Miếng ngon Hà Nội' (mục Gia vị chấm mắm tôm nồng nàn, NXB Văn học); Sở NN&PTNT Thanh Hóa, Đề án phát triển nghề chế biến thủy hải sản truyền thống.",
  sourceLocator: "Hồ sơ bảo hộ nhãn hiệu: Tiêu chuẩn con moi tươi (khuyết biển) đánh bắt từ vịnh Bắc Bộ ủ với muối hạt tinh khiết theo tỷ lệ gia truyền; Quy trình phơi nắng, khuấy đảo thùng chượp bằng gỗ và kỹ thuật lọc mắm tôm màu hoa cà sánh mịn.",
  localCommunity: "Cộng đồng nhân dân các xã vùng biển Ngư Lộc, Hải Lộc, Đa Lộc, huyện Hậu Lộc, tỉnh Thanh Hóa"
};

// 4. nghe-lam-com-lang-vong
b13[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 446/QĐ-BVHTTDL & Tùy bút 'Cốm Vòng' (Thạch Lam)",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Thạch Lam; Băng Sơn",
  bibliography: "Bộ VHTTDL, Quyết định số 446/QĐ-BVHTTDL ngày 29/01/2019 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề làm cốm Mễ Trì, quận Nam Từ Liêm, Hà Nội); Thạch Lam, 'Hà Nội băm sáu phố phường' (bài Cốm Vòng, NXB Đời Nay); Băng Sơn, 'Thú ăn chơi người Hà Nội'.",
  sourceLocator: "Quyết định số 446/QĐ-BVHTTDL; Thạch Lam (1943): Lời văn bất hủ 'Cốm là thức quà riêng biệt của đất nước, là thức dâng của những cánh đồng lúa bát ngát xanh'; Kỹ thuật rang lúa nếp non bằng chảo gang củi gỗ và giã chày tay nhịp nhàng.",
  localCommunity: "Cộng đồng người làm cốm tại phường Dịch Vọng Hậu (Làng Vòng, Cầu Giấy) và phường Mễ Trì (Nam Từ Liêm), Hà Nội"
};

// 5. tri-thuc-lam-banh-dau-xanh-hai-duong
b13[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Chỉ dẫn địa lý 'Bánh đậu xanh Hải Dương' & Địa chí Hải Dương",
  sourceAuthor: "Cục Sở hữu Trí tuệ; Sở Công thương tỉnh Hải Dương; Ban Địa chí Hải Dương",
  bibliography: "Cục Sở hữu Trí tuệ, Giấy chứng nhận đăng ký chỉ dẫn địa lý Bánh đậu xanh Hải Dương; 'Địa chí Hải Dương' (Tập Làng nghề truyền thống, NXB Chính trị Quốc gia); Hiệp hội Bánh đậu xanh Hải Dương.",
  sourceLocator: "Chỉ dẫn địa lý Cục Sở hữu Trí tuệ: Tiêu chuẩn đậu xanh lòng vàng rang chín tới, tách vỏ, nghiền bột mịn phối trộn mỡ lợn thắng sạch và đường kính trắng; Kỹ thuật gói giấy thiếc khối vuông và câu chuyện vua Bảo Đại ban thưởng sắc tứ hoa rồng năm 1932.",
  localCommunity: "Cộng đồng các cơ sở làm bánh đậu xanh truyền thống tại thành phố Hải Dương, tỉnh Hải Dương"
};

// 6. tri-thuc-lam-me-xung-hue
b13[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ nhãn hiệu chứng nhận Mè xửng Huế & Chuyên khảo 'Trò ăn thức uống đất Cố đô'",
  sourceAuthor: "Sở Khoa học và Công nghệ tỉnh Thừa Thiên Huế; TS. Trần Đức Anh Sơn; Hoàng Thị Kim Cúc",
  bibliography: "Sở KH&CN Thừa Thiên Huế, Hồ sơ nhãn hiệu chứng nhận 'Mè xửng Huế'; Trần Đức Anh Sơn, 'Trò ăn thức uống đất Cố đô' (NXB Thuận Hóa, 2002); Hoàng Thị Kim Cúc, 'Món ăn xứ Huế' (NXB Thuận Hóa).",
  sourceLocator: "Hồ sơ nhãn hiệu: Tỷ lệ phối trộn bột gạo, đường mạch nha, mè trắng rang thơm và đậu phộng béo bùi; Trần Đức Anh Sơn (2002): Kỹ thuật thắng mạch nha bằng chảo đồng lửa liu riu (xửng) và nét văn hóa ẩm thực tao nhã ăn kẹo mè dẻo uống nước trà cung đình Huế.",
  localCommunity: "Các gia đình nghệ nhân làm kẹo mè xửng tại thành phố Huế, tỉnh Thừa Thiên Huế"
};

// 7. van-hoa-mam-ca-chau-doc
b13[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2974/QĐ-BVHTTDL & Tập văn 'Hương rừng Cà Mau' (Sơn Nam)",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Nhà văn Sơn Nam; Sở VHTTDL tỉnh An Giang",
  bibliography: "Bộ VHTTDL, Quyết định số 2974/QĐ-BVHTTDL ngày 27/08/2019 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề làm mắm Châu Đốc, thành phố Châu Đốc, tỉnh An Giang); Sơn Nam, 'Hương rừng Cà Mau' (mục Mùa nước nổi, NXB Trẻ); Thạch Phương, 'Văn hóa dân gian An Giang'.",
  sourceLocator: "Quyết định số 2974/QĐ-BVHTTDL; Sơn Nam: Tập quán đón nguồn lợi cá đồng mùa nước nổi sông Mekong (cá linh, cá lóc, cá sặc); Quy trình ủ chượp ba giai đoạn: ướp muối, thính gạo rang vàng và chao đường thốt nốt thơm lừng tạo nên thương hiệu 'Thủ phủ mắm Châu Đốc'.",
  localCommunity: "Cộng đồng các hộ làm mắm cá truyền thống tại thành phố Châu Đốc, tỉnh An Giang"
};

// 8. nghe-lam-duong-thot-not-an-giang
b13[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 3757/QĐ-BVHTTDL & Khảo cứu 'Tìm hiểu văn hóa Khmer Nam Bộ'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sơn Nam; Sở VHTTDL tỉnh An Giang",
  bibliography: "Bộ VHTTDL, Quyết định số 3757/QĐ-BVHTTDL ngày 30/10/2018 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề nấu đường thốt nốt của người Khmer huyện Tri Tôn và thị xã Tịnh Biên, tỉnh An Giang); Sơn Nam, 'Tìm hiểu văn hóa Khmer Nam Bộ' (NXB Văn hóa Dân tộc).",
  sourceLocator: "Quyết định số 3757/QĐ-BVHTTDL; Sơn Nam: Kỹ thuật trèo cây thốt nốt cao vút bằng thang tre của đàn ông Khmer, thao tác kẹp cuống hoa lấy mật ngọt hứng bằng ống tre và quy trình ngào đường trên chảo gang củi trấu tạo thành bánh đường vàng óng.",
  localCommunity: "Đồng bào dân tộc Khmer tại các xã vùng Bảy Núi thuộc huyện Tri Tôn và thị xã Tịnh Biên, An Giang"
};

// 9. tri-thuc-thuoc-nam-tue-tinh
b13[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Tác phẩm y học cổ truyền 'Nam dược thần hiệu' & Chuyên khảo Danh y Tuệ Tĩnh",
  sourceAuthor: "Đại danh y Tuệ Tĩnh; Viện Nghiên cứu Đông y; Lê Trần Đức",
  bibliography: "Đại danh y Thiền sư Tuệ Tĩnh, 'Nam dược thần hiệu' (Bản dịch Viện Nghiên cứu Đông y, NXB Y học, 1972) & 'Hồng Nghĩa giác tư y thư'; Lê Trần Đức, 'Thân thế và sự nghiệp đại danh y Tuệ Tĩnh' (NXB Y học, 1982); Hội Nam y Việt Nam.",
  sourceLocator: "Tuệ Tĩnh (1972): Tuyên ngôn y học bất hủ 'Nam dược trị Nam nhân' (Thuốc Nam chữa bệnh cho người phương Nam); Hệ thống 580 vị thuốc cây cỏ bản địa quanh vườn nhà, kết hợp phương châm phòng bệnh hơn chữa bệnh và rèn luyện thân thể tĩnh tâm dưỡng khí.",
  localCommunity: "Các lương y, hội đồng Nam y và nhân dân trên toàn quốc phụng dưỡng nền y dược cổ truyền dân tộc"
};

// 10. kinh-nghiem-xem-thoi-tiet-dan-gian
b13[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Khảo cứu 'Việt Nam văn hóa sử cương' & Tuyển tập 'Tục ngữ ca dao thời tiết nông nghiệp'",
  sourceAuthor: "Đào Duy Anh; Viện Nghiên cứu Văn hóa Dân gian",
  bibliography: "Đào Duy Anh, 'Việt Nam văn hóa sử cương' (Bản in NXB Bốn Phương, tái bản NXB Văn hóa Thông tin); Viện Nghiên cứu Văn hóa Dân gian, 'Tục ngữ ca dao Việt Nam về thời tiết và nông nghiệp' (NXB Khoa học Xã hội, 1995); Tạp chí Khí tượng Thủy văn.",
  sourceLocator: "Đào Duy Anh: Chương Kinh tế nông nghiệp và tri thức thích ứng thiên nhiên; 'Tục ngữ ca dao về thời tiết': Phân tích các câu châm ngôn quan sát khí tượng chuẩn xác ('Chuồn chuồn bay thấp thì mưa', 'Cơn đằng Đông vừa trông vừa chạy', 'Trăng quầng thì hạn trăng tán thì mưa').",
  localCommunity: "Cư dân nông nghiệp nông thôn vùng châu thổ sông Hồng và sông Cửu Long"
};

fs.writeFileSync(b13Path, JSON.stringify(b13, null, 2), "utf8");
console.log("Updated Batch 013 successfully!");

// ==========================================
// BATCH 014: Nhạc cụ cổ truyền độc đáo các dân tộc
// ==========================================
const b14Path = path.join(batchesDir, "batch-014.json");
const b14 = JSON.parse(fs.readFileSync(b14Path, "utf8"));

// 1. dan-bau-thanh-am-hon-viet
b14[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Âm nhạc truyền thống Việt Nam' (Trần Văn Khê) & Giáo trình Viện Âm nhạc",
  sourceAuthor: "GS.TS. Trần Văn Khê; Viện Âm nhạc Việt Nam; Học viện Âm nhạc Quốc gia Việt Nam",
  bibliography: "Trần Văn Khê, 'Âm nhạc truyền thống Việt Nam' (mục Độc huyền cầm, NXB Trẻ, 2001); Viện Âm nhạc, Chuyên khảo 'Cây Đàn Bầu Việt Nam' (NXB Âm nhạc, 1995); Tạp chí Nghiên cứu Âm nhạc.",
  sourceLocator: "Trần Văn Khê (2001): Nguyên lý phát âm bồi (harmonic) độc nhất vô nhị chỉ với một dây căng trên cần đàn bằng sừng trâu mềm mại; Kỹ thuật gảy que kết hợp ngón tay rung uốn tạo nên âm sắc u hoài ví như tiếng thở than của hồn quê đất Việt, tr. 180-210.",
  localCommunity: "Cộng đồng các nghệ sĩ, nghệ nhân đàn bầu trên khắp ba miền Việt Nam và sân khấu quốc tế"
};

// 2. dan-tranh-tieng-to-dong-viet-nam
b14[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Tài liệu 'Học đờn tranh cổ nhạc miền Nam' & Khảo cứu Âm nhạc truyền thống châu Á",
  sourceAuthor: "Nhạc sư Nguyễn Vĩnh Bảo; GS.TS. Trần Văn Khê; Viện Âm nhạc Việt Nam",
  bibliography: "Nguyễn Vĩnh Bảo, 'Học đờn tranh cổ nhạc miền Nam' (Sài Gòn, 1970); Trần Văn Khê, 'Vị trí của đàn tranh trong âm nhạc truyền thống châu Á' (NXB Trẻ); Viện Âm nhạc, Giáo trình 'Nghệ thuật đàn tranh Việt Nam'.",
  sourceLocator: "Nguyễn Vĩnh Bảo (1970): Kỹ thuật rung, mổ, vỗ, bấm của bàn tay trái trên các phạn (con nhạn) của cây đàn thập lục; Sự khác biệt giữa ngón đờn Tranh tài tử Nam Bộ và lối chơi thính phòng ca Huế tao nhã.",
  localCommunity: "Nghệ sĩ Đờn ca tài tử Nam Bộ, Ca Huế thính phòng và các dàn nhạc dân tộc Việt Nam"
};

// 3. dan-nguyet-cay-dan-kim-san-khau
b14[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Giáo trình 'Phương pháp diễn tấu Đàn Kìm / Đàn Nguyệt' & Khảo luận Nhạc khí cổ truyền",
  sourceAuthor: "Nhạc viện TP Hồ Chí Minh; Nhạc sĩ Bùi Xương Thất; Viện Âm nhạc",
  bibliography: "Nhạc viện TP.HCM, Giáo trình 'Phương pháp diễn tấu Đàn Kìm / Đàn Nguyệt' (NXB Âm nhạc); Bùi Xương Thất, 'Tìm hiểu tính năng nhạc khí cổ truyền Đàn Nguyệt' (1986); Tạp chí Âm nhạc.",
  sourceLocator: "Giáo trình Nhạc viện TP.HCM: Cấu tạo thùng đàn tròn như vầng trăng rằm, cần đàn dài với 10 phím bấm cao tạo độ rung luyến biến hóa khôn lường; Vai trò 'nhạc trưởng' lĩnh xướng của cây đàn kìm trong dàn nhạc tài tử và đàn nguyệt trong hát văn hầu đồng.",
  localCommunity: "Cung văn hát chầu văn Bắc Bộ, nghệ nhân Ca trù và tài tử đờn ca Nam Bộ"
};

// 4. dan-da-tay-nguyen-thanh-am-thoi-tien-su
b14[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Công trình 'Le Lithophone préhistorique de Ndut Lieng Krak' & Khảo cổ học Tây Nguyên",
  sourceAuthor: "Georges Condominas; Viện Khảo cổ học Việt Nam; Bảo tàng tỉnh Lâm Đồng",
  bibliography: "Georges Condominas, 'Le Lithophone préhistorique de Ndut Lieng Krak' (Bản tin Trường Viễn Đông Bác Cổ EFEO, Paris, 1952); Viện Khảo cổ học, 'Khảo cổ học tiền sử Tây Nguyên' (NXB Khoa học Xã hội, 1988); Bảo tàng Lịch sử Quốc gia.",
  sourceLocator: "G. Condominas (1952): Phát hiện bộ đàn đá tiền sử hơn 3.000 năm tuổi tại Đắk R'lấp (Ndut Lieng Krak); Giám định khảo cổ học về dấu vết ghè đẽo tạo thang âm ngũ cung trên thanh đá ryolit và âm sắc vang vọng như tiếng sấm ngàn đại ngàn.",
  localCommunity: "Đồng bào các dân tộc M'nông, Mạ, Ba Na tại vùng Nam Tây Nguyên (Đắk Nông, Lâm Đồng)"
};

// 5. ken-saranai-hon-nhac-nguoi-cham
b14[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Văn hóa và âm nhạc Chăm' & Hồ sơ di sản âm nhạc dân tộc Chăm",
  sourceAuthor: "Sakaya (Phan Quốc Anh); Trung tâm Nghiên cứu Văn hóa Chăm Ninh Thuận",
  bibliography: "Sakaya, 'Văn hóa và âm nhạc Chăm' (NXB Văn hóa Dân tộc, 2005); Sở VHTTDL Ninh Thuận, Hồ sơ khoa học di sản 'Nghệ thuật âm nhạc dân gian của người Chăm'; Tạp chí Dân tộc học.",
  sourceLocator: "Sakaya (2005): Cấu tạo biểu tượng kèn Saranai gồm chuông kèn bằng gỗ quý, thân kèn có 7 lỗ bấm tượng trưng 7 tầng trời và dăm kèn bằng lá buông; Kỹ thuật lấy hơi vòng (ngậm miệng thổi liên tục không đứt quãng) ngân vang réo rắt trên đền tháp Chăm.",
  localCommunity: "Cộng đồng người Chăm tại các làng Palei Chăm tỉnh Ninh Thuận và Bình Thuận"
};

// 6. khen-hmong-tieng-long-chang-trai-mong
b14[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Chuyên khảo 'Văn hóa H'Mông ở Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; PGS.TS. Trần Bình; Bảo tàng Dân tộc học Việt Nam",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghệ thuật múa Khèn của người Mông tỉnh Hà Giang); Trần Bình, 'Văn hóa H'Mông ở Việt Nam' (NXB Văn hóa Dân tộc); Tạp chí Văn hóa Dân gian.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Trần Bình: Kỹ thuật ghép 6 ống trúc qua bầu khèn gỗ thông pơ mu, gắn lam đồng (lưỡi gà) tạo âm thanh bè trầm bổng; Các vũ điệu khèn nhào lộn, quay chân vắt vẻo của chàng trai Mông trong hội xuân và tang ma.",
  localCommunity: "Đồng bào dân tộc H'Mông trên rẻo cao Hà Giang, Lào Cai, Lai Châu, Sơn La và Điện Biên"
};

// 7. dan-tinh-tieng-hat-then-tay-nung
b14[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ UNESCO 'Practices of Then by Tày, Nùng and Thái' & Kỹ thuật chế tác Đàn Tính",
  sourceAuthor: "UNESCO; Bộ Văn hóa, Thể thao và Du lịch; Nhà nghiên cứu Nông Viết Toại",
  sourceUrl: "https://ich.unesco.org/en/RL/practices-of-then-by-tay-nung-and-thai-ethnic-groups-in-viet-nam-01379",
  bibliography: "UNESCO, Representative List of the Intangible Cultural Heritage of Humanity (Reference: 01379, Inscribed in 2019); Sở VHTTDL tỉnh Cao Bằng, Tài liệu 'Kỹ thuật chế tác đàn tính và làn điệu Then'; Nông Viết Toại, 'Dân ca Then Tày Nùng' (NXB Văn hóa).",
  sourceLocator: "UNESCO ICH Dossier No. 01379; Hồ sơ di sản Cao Bằng: Cấu tạo quả bầu khô cắt đáy bọc gỗ vông mỏng, cần đàn bằng gỗ dâu uốn cong hình đầu rồng; Âm sắc ấm áp thanh thoát đệm cho lời ca hát then đưa đường dẫn lối các thần linh về bản.",
  localCommunity: "Nghệ nhân then và bà con các dân tộc Tày, Nùng, Thái tại Cao Bằng, Lạng Sơn, Bắc Kạn, Tuyên Quang"
};

// 8. trong-com-nhip-dieu-dan-da
b14[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Tuyển tập 'Nhạc cụ cổ truyền các dân tộc Việt Nam' & 'Nghệ thuật múa và nhạc cụ dân gian'",
  sourceAuthor: "Viện Âm nhạc Việt Nam; GS.TS. Lê Ngọc Canh",
  bibliography: "Viện Âm nhạc, Tuyển tập 'Nhạc cụ cổ truyền các dân tộc Việt Nam' (NXB Âm nhạc, 1998); Lê Ngọc Canh, 'Nghệ thuật múa và nhạc cụ dân gian' (NXB Sân khấu); Tạp chí Nghiên cứu Âm nhạc.",
  sourceLocator: "Viện Âm nhạc (1998): Cấu tạo thân trống tròn bằng gỗ tiện hình quả nhót thon hai đầu bịt da trâu; Đặc tính âm học độc đáo: Kỹ thuật miết một nắm cơm nếp dẻo vào giữa mặt trống để làm chùng âm vực, tạo nên tiếng 'bùng, bình' trầm ấm tình tứ trong hội làng.",
  localCommunity: "Các phường chèo, đoàn ca múa nhạc dân gian và dàn nhạc cổ đồng bằng Bắc Bộ"
};

// 9. dan-klong-put-tieng-vo-tay-nong-nghiep
b14[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di sản văn hóa 'Nhạc cụ tre nứa Bắc Tây Nguyên' & Chuyên khảo 'Pơtao'",
  sourceAuthor: "Sở Văn hóa, Thể thao và Du lịch tỉnh Kon Tum; Jacques Dournes",
  bibliography: "Sở VHTTDL Kon Tum, Hồ sơ di sản văn hóa phi vật thể 'Nhạc cụ tre nứa của các dân tộc Bắc Tây Nguyên'; Jacques Dournes, 'Pơtao - Một lý thuyết về quyền lực ở người Gia Rai' (NXB Tri thức); Tạp chí Dân tộc học.",
  sourceLocator: "Hồ sơ di sản Kon Tum: Cấu tạo gồm dàn ống nứa dài ngắn xếp trên giá ngang; Nguyên lý kích âm hoàn toàn không chạm tay vào ống mà dùng đôi bàn tay phụ nữ vỗ vào không khí cách miệng ống 10-15cm để luồng gió dội vào ống phát ra âm thanh rì rào cầu mùa lúa bội thu.",
  localCommunity: "Phụ nữ các dân tộc Xơ Đăng, Ba Na, Gia Rai tại tỉnh Kon Tum và Gia Lai"
};

// 10. chieng-muong-thanh-am-xu-muong
b14[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Chuyên khảo 'Văn hóa dân gian Mường'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Bùi Thiện; Sở VHTTDL tỉnh Hòa Bình",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghệ thuật Cồng chiêng của người Mường tỉnh Hòa Bình); Bùi Thiện, 'Văn hóa dân gian Mường' (NXB Văn hóa Dân tộc, 1995); Tạp chí Di sản Văn hóa.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Bùi Thiện (1995): Cấu trúc bộ chiêng Mường gồm 12 chiếc tượng trưng cho 12 tháng bốn mùa trong năm; Nghệ thuật hòa tấu chiêng đực chiêng cái và dàn chiêng diễu hành trong nghi lễ Sắc bùa chúc phúc đầu xuân.",
  localCommunity: "Đồng bào dân tộc Mường tại bốn vùng Mường cổ (Bi, Vang, Thàng, Động) tỉnh Hòa Bình và Thanh Hóa"
};

fs.writeFileSync(b14Path, JSON.stringify(b14, null, 2), "utf8");
console.log("Updated Batch 014 successfully!");

// ==========================================
// BATCH 015: Thần thoại, Truyền thuyết lịch sử & Tứ bất tử
// ==========================================
const b15Path = path.join(batchesDir, "batch-015.json");
const b15 = JSON.parse(fs.readFileSync(b15Path, "utf8"));

// 1. truyen-thuyet-son-tinh-thuy-tinh
b15[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Tác phẩm cổ 'Lĩnh Nam chích quái' (Truyện Sơn Tinh Thủy Tinh) & Khảo cứu Địa lý văn hóa",
  sourceAuthor: "Trần Thế Pháp; GS. Trần Quốc Vượng; Viện Văn học",
  bibliography: "Trần Thế Pháp, 'Lĩnh Nam chích quái' (Bản dịch Lê Hữu Mục, NXB Văn học); GS. Trần Quốc Vượng, 'Môi trường sinh thái và văn hóa châu thổ sông Hồng' (NXB Văn hóa); Viện Văn học, 'Kho tàng thần thoại và truyền thuyết Việt Nam'.",
  sourceLocator: "Lĩnh Nam chích quái (Truyện Sơn Tinh Thủy Tinh); Trần Quốc Vượng: Giải mã cuộc chiến Sơn Tinh - Thủy Tinh dưới góc nhìn sinh thái học: Khát vọng đắp đê ngăn lũ dữ sông Đà và sông Hồng của cư dân Văn Lang thời các vua Hùng dựng nước.",
  localCommunity: "Cư dân châu thổ Bắc Bộ và vùng chân núi Ba Vì, tỉnh Phú Thọ và thành phố Hà Nội"
};

// 2. truyen-thuyet-chu-dong-tu-tien-dung
b15[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2408/QĐ-TTg & Tác phẩm cổ 'Lĩnh Nam chích quái' (Truyện Chử Đồng Tử)",
  sourceAuthor: "Thủ tướng Chính phủ; Trần Thế Pháp; Sở VHTTDL tỉnh Hưng Yên",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 2408/QĐ-TTg ngày 31/12/2014 xếp hạng Di tích quốc gia đặc biệt Khu di tích Đền Đa Hòa - Dạ Trạch (huyện Khoái Châu, tỉnh Hưng Yên); Trần Thế Pháp, 'Lĩnh Nam chích quái' (Truyện Nhất Dạ Trạch, NXB Văn học).",
  sourceLocator: "Quyết định số 2408/QĐ-TTg; Lĩnh Nam chích quái: Mối duyên kỳ ngộ bên bãi cát ven sông giữa chàng trai nghèo Chử Đồng Tử và công chúa Tiên Dung; Biểu tượng vị thần buôn bán thương nghiệp và cây gậy nón tiên mở đầu Phật giáo cổ.",
  localCommunity: "Nhân dân hai xã Dạ Trạch, Bình Minh, huyện Khoái Châu, tỉnh Hưng Yên"
};

// 3. truyen-thuyet-thanh-giong
b15[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ UNESCO 'Gióng festival of Phù Ðổng and Sóc temples' & 'Đại Việt sử ký toàn thư'",
  sourceAuthor: "UNESCO; Ngô Sĩ Liên; Viện Nghiên cứu Hán Nôm",
  sourceUrl: "https://ich.unesco.org/en/RL/giong-festival-of-phu-dong-and-soc-temples-00443",
  bibliography: "UNESCO, Representative List of the Intangible Cultural Heritage of Humanity (Reference: 00443, Inscribed in 2010); Ngô Sĩ Liên, 'Đại Việt sử ký toàn thư' (Kỷ Hùng Vương); Viện Nghiên cứu Hán Nôm, Tuyển tập 'Văn bia và thần tích Phù Đổng Thiên Vương'.",
  sourceLocator: "UNESCO ICH Dossier No. 00443: Diễn xướng lễ hội mô phỏng trận đánh giặc Ân của chú bé làng Gióng cưỡi ngựa sắt, vung roi sắt; Biểu tượng sức mạnh trường tồn của khối đại đoàn kết toàn dân giữ gìn độc lập non sông.",
  localCommunity: "Cộng đồng nhân dân làng Phù Đổng (Gia Lâm) và đền Sóc (huyện Sóc Sơn), thành phố Hà Nội"
};

// 4. huyen-tich-ba-chua-kho-bac-ninh
b15[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 226/VH-QĐ & Thần tích làng Cổ Mễ thời nhà Lý",
  sourceAuthor: "Bộ Văn hóa; Bảo tàng tỉnh Bắc Ninh; Sở VHTTDL tỉnh Bắc Ninh",
  bibliography: "Bộ Văn hóa, Quyết định số 226/VH-QĐ ngày 05/02/1989 xếp hạng Di tích lịch sử Đền Bà Chúa Kho (núi Kho, phường Vũ Ninh, thành phố Bắc Ninh); Thần tích làng Cổ Mễ thờ người phụ nữ trông coi kho lương thời Lý; Tạp chí Di sản Văn hóa.",
  sourceLocator: "Quyết định số 226/VH-QĐ; Thần tích làng Cổ Mễ: Tưởng niệm người phụ nữ anh hùng có công tổ chức tích trữ, phân phối quân lương phục vụ kháng chiến chống quân Tống (1077); Phân định rõ giá trị lịch sử giữ kho với biến tướng 'vay vốn cầu tài' thương mại hóa ngày nay.",
  localCommunity: "Cộng đồng nhân dân làng Cổ Mễ, phường Vũ Ninh, thành phố Bắc Ninh và du khách hành hương"
};

// 5. huyen-tich-an-duong-vuong-my-chau
b15[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Công trình 'Khảo cổ học Cổ Loa' & Sách cổ 'Lĩnh Nam chích quái' (Truyện Rùa Vàng)",
  sourceAuthor: "Viện Khảo cổ học Việt Nam; Trần Thế Pháp; Bảo tàng Lịch sử Quốc gia",
  bibliography: "Viện Khảo cổ học, 'Khảo cổ học Cổ Loa' (NXB Khoa học Xã hội); Trần Thế Pháp, 'Lĩnh Nam chích quái' (Truyện Rùa Vàng, NXB Văn học); Ngô Sĩ Liên, 'Đại Việt sử ký toàn thư' (Kỷ Thục phán An Dương Vương).",
  sourceLocator: "Lĩnh Nam chích quái: Bi kịch tình yêu Mỵ Châu - Trọng Thủy và chiếc lẫy nỏ thần trao lầm giặc; 'Khảo cổ học Cổ Loa': Phát hiện hàng vạn mũi tên đồng ba cạnh và cấu trúc ba vòng thành đất Cổ Loa khẳng định dấu ấn nhà nước Âu Lạc thế kỷ III TCN.",
  localCommunity: "Nhân dân xã Cổ Loa, huyện Đông Anh (Hà Nội) và xã Diễn An, huyện Diễn Châu (Nghệ An)"
};

// 6. huyen-tich-da-trach-da-hoa
b15[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2408/QĐ-TTg & Biên niên sử 'Đại Việt sử ký toàn thư' (Kỷ Tiền Lý)",
  sourceAuthor: "Thủ tướng Chính phủ; Ngô Sĩ Liên; GS. Phan Huy Lê",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 2408/QĐ-TTg ngày 31/12/2014 xếp hạng Di tích quốc gia đặc biệt Khu di tích Đa Hòa - Dạ Trạch (huyện Khoái Châu, tỉnh Hưng Yên); Ngô Sĩ Liên, 'Đại Việt sử ký toàn thư' (Kỷ Tiền Lý - Triệu Việt Vương); Phan Huy Lê, 'Các trận đánh tiêu biểu trong lịch sử'.",
  sourceLocator: "Quyết định số 2408/QĐ-TTg; Đại Việt sử ký toàn thư: Triệu Quang Phục dùng chiến thuật phục kích bí mật trong lau sậy đầm Dạ Trạch (Dạ Trạch Vương) đánh tan quân xâm lược nhà Lương năm 550 giành quyền tự chủ non sông.",
  localCommunity: "Nhân dân xã Dạ Trạch, huyện Khoái Châu, tỉnh Hưng Yên"
};

// 7. huyen-tich-ong-hoang-muoi-nghe-an
b15[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di tích Đền Ông Hoàng Mười & Chuyên khảo 'Đạo Mẫu ở Việt Nam'",
  sourceAuthor: "Sở Văn hóa và Thể thao tỉnh Nghệ An; GS. Ngô Đức Thịnh; Ninh Viết Giao",
  bibliography: "Sở VHTT Nghệ An, Hồ sơ di tích lịch sử - văn hóa Đền Ông Hoàng Mười (làng Mỏ Hạc, xã Hưng Thịnh, huyện Hưng Nguyên); Ngô Đức Thịnh, 'Đạo Mẫu ở Việt Nam' (NXB Tri thức); Ninh Viết Giao, 'Giai thoại lịch sử xứ Nghệ' (NXB Nghệ An).",
  sourceLocator: "Hồ sơ di tích Nghệ An; Ngô Đức Thịnh: Vị thế Quan Hoàng Mười trong Tứ phủ thánh hoàng (hóa thân danh tướng Lê Khôi thời Lê sơ hoặc tướng quân Nguyễn Xí); Hình tượng phúc thần tài hoa, yêu nước thương dân chở che thuyền bè qua sông Lam.",
  localCommunity: "Nhân dân huyện Hưng Nguyên, tỉnh Nghệ An và các thanh đồng, tín đồ Tín ngưỡng Thờ Mẫu cả nước"
};

// 8. huyen-tich-ong-hoang-bay-bao-ha
b15[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di tích quốc gia Đền Bảo Hà & Sử liệu Biên cương thời Hậu Lê",
  sourceAuthor: "Sở Văn hóa và Thể thao tỉnh Lào Cai; GS. Ngô Đức Thịnh; Bảo tàng tỉnh Lào Cai",
  bibliography: "Sở VHTT Lào Cai, Hồ sơ di tích lịch sử - văn hóa quốc gia Đền Bảo Hà (xã Bảo Hà, huyện Bảo Yên); Ngô Đức Thịnh, 'Đạo Mẫu ở Việt Nam' (mục Thập vị Quan Hoàng); Tạp chí Lịch sử Quân sự, 'Các trận đánh giữ ải biên giới thời Hậu Lê'.",
  sourceLocator: "Hồ sơ di tích Đền Bảo Hà; Tạp chí Lịch sử Quân sự: Thần tích danh tướng Nguyễn Hoàng Bảy thời Cảnh Hưng (thế kỷ XVIII) chỉ huy nghĩa binh vùng cao dẹp loạn giặc cỏ phương Bắc bảo vệ đồng bào biên giới Lào Cai - Yên Bái.",
  localCommunity: "Cộng đồng nhân dân xã Bảo Hà, huyện Bảo Yên, tỉnh Lào Cai và đạo hữu tín ngưỡng Tứ phủ"
};

// 9. huyen-tich-thien-y-a-na-khanh-hoa
b15[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2408/QĐ-TTg & Văn bia Thiên Y A Na soạn năm 1856 (Phan Thanh Giản)",
  sourceAuthor: "Thủ tướng Chính phủ; Kinh lược sứ Phan Thanh Giản; Quách Tấn",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 2408/QĐ-TTg ngày 31/12/2014 xếp hạng Di tích quốc gia đặc biệt Tháp Bà Ponagar (thành phố Nha Trang, tỉnh Khánh Hòa); Phan Thanh Giản, Văn bia Thiên Y A Na Thánh Mẫu khắc tại tháp chính năm Tự Đức thứ 9 (1856); Quách Tấn, 'Xứ Trầm hương' (NXB Văn học).",
  sourceLocator: "Quyết định số 2408/QĐ-TTg; Văn bia Phan Thanh Giản (1856): Huyền tích Mẹ Xứ Sở Po Ino Nagar giáng trần tại núi Đại Điền (Diên Khánh), dạy dân cày cấy, dệt vải, khai hoang lập ấp; Sự tiếp biến hòa hợp tín ngưỡng sâu sắc giữa người Chăm và người Việt.",
  localCommunity: "Đồng bào Chăm và Việt tại thành phố Nha Trang và các tỉnh duyên hải Nam Trung Bộ"
};

// 10. huyen-tich-tho-than-nui-tan-vien
b15[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Tác phẩm thiêng 'Việt điện u linh tập' (Lý Tế Xuyên)",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Lý Tế Xuyên; Nguyễn Khắc Xương",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Tục thờ Tản Viên Sơn Thánh, huyện Ba Vì, Hà Nội); Lý Tế Xuyên, 'Việt điện u linh tập' (chuyện Tản Viên Sơn Thánh, NXB Văn học); Nguyễn Khắc Xương, 'Truyền thuyết Hùng Vương'.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; 'Việt điện u linh tập': Đệ nhất phúc thần trong Tứ bất tử của văn hóa Việt Nam; Huyền tích ba ngọn núi Ba Vì thiêng liêng và công tích trị thủy, khai khẩn ruộng nương mở cõi đất trời xứ Đoài.",
  localCommunity: "Nhân dân các xã vùng ven núi Ba Vì (Hà Nội) và các huyện Thanh Sơn, Tam Nông (Phú Thọ)"
};

fs.writeFileSync(b15Path, JSON.stringify(b15, null, 2), "utf8");
console.log("Updated Batch 015 successfully!");

// ==========================================
// BATCH 016: Kiến trúc cổ, Di sản thế giới & Danh lam tôn giáo
// ==========================================
const b16Path = path.join(batchesDir, "batch-016.json");
const b16 = JSON.parse(fs.readFileSync(b16Path, "utf8"));

// 1. lang-co-duong-lam-da-ong
b16[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 69/2005/QĐ-BVHTT & Chuyên khảo 'Văn minh làng xã Việt Nam'",
  sourceAuthor: "Bộ Văn hóa - Thông tin; Họa sĩ Phan Cẩm Thượng; Viện Kiến trúc Quốc gia",
  bibliography: "Bộ VHTT, Quyết định số 69/2005/QĐ-BVHTT ngày 28/11/2005 xếp hạng Di tích kiến trúc nghệ thuật quốc gia Làng cổ Đường Lâm (thị xã Sơn Tây, Hà Nội); Phan Cẩm Thượng, 'Văn minh làng xã Việt Nam' (NXB Tri thức, 2011); Viện Kiến trúc, Chuyên khảo 'Kiến trúc nhà cổ Đường Lâm'.",
  sourceLocator: "Quyết định số 69/2005/QĐ-BVHTT; Phan Cẩm Thượng (2011): Nghệ thuật khai thác đá ong đào từ lòng đất làm cổng làng Mông Phụ, tường rào, nhà ngói năm gian; Không gian 'Đất hai vua' (Phùng Hưng và Ngô Quyền) với nếp sống thuần hậu xứ Đoài.",
  localCommunity: "Cộng đồng nhân dân làng Mông Phụ, Đông Sàng, Cam Thịnh thuộc xã Đường Lâm, thị xã Sơn Tây, Hà Nội"
};

// 2. pho-co-dong-van-ha-giang
b16[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ Di tích kiến trúc nghệ thuật Khu phố cổ Đồng Văn & Địa chí Hà Giang",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Ban Quản lý Công viên Địa chất Đồng Văn; UBND huyện Đồng Văn",
  bibliography: "Bộ VHTTDL, Quyết định xếp hạng Di tích kiến trúc nghệ thuật quốc gia Khu phố cổ Đồng Văn (thị trấn Đồng Văn, huyện Đồng Văn, tỉnh Hà Giang); Ban Quản lý Công viên Địa chất Toàn cầu Cao nguyên đá Đồng Văn, Kỷ yếu di sản; Địa chí Hà Giang.",
  sourceLocator: "Hồ sơ di tích quốc gia: Quần thể 40 nếp nhà trình đất sét vàng lợp ngói âm dương có tuổi đời từ đầu thế kỷ XX; Không gian giao thương đa văn hóa giữa người Hoa, người Mông, người Tày bên chợ cổ Đồng Văn xây bằng đá xanh.",
  localCommunity: "Cư dân thị trấn Đồng Văn, huyện Đồng Văn, tỉnh Hà Giang"
};

// 3. kien-truc-thap-cham-my-son
b16[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ Di sản Thế giới UNESCO 'My Son Sanctuary' & Công trình khảo cứu Henri Parmentier",
  sourceAuthor: "UNESCO; Henri Parmentier; PGS.TS. Ngô Văn Doanh",
  sourceUrl: "https://whc.unesco.org/en/list/949",
  bibliography: "UNESCO, World Heritage List (Reference: 949, Inscribed in 1999); Henri Parmentier, 'L'Inventaire descriptif des monuments Chams de l'Annam' (EFEO, Paris, 1909); Ngô Văn Doanh, 'Thánh địa Mỹ Sơn' (NXB Trẻ, 2003).",
  sourceLocator: "UNESCO World Heritage Inscription No. 949; H. Parmentier (1909): Khảo tả 70 công trình đền tháp từ thế kỷ IV đến thế kỷ XIII; Ngô Văn Doanh (2003): Kỹ thuật xếp gạch không dùng vữa mạ (liên kết bằng nhựa cây ô dước) và nghệ thuật chạm khắc hoa văn trực tiếp trên tường gạch tháp Chăm.",
  localCommunity: "Ban Quản lý Di sản Văn hóa Mỹ Sơn và cộng đồng nhân dân xã Duy Phú, huyện Duy Xuyên, tỉnh Quảng Nam"
};

// 4. chua-tam-chuc-ha-nam
b16[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Kỷ yếu Đại lễ Phật đản Liên Hợp Quốc Vesak 2019 & Hồ sơ Quy hoạch Khu du lịch Tam Chúc",
  sourceAuthor: "Giáo hội Phật giáo Việt Nam; Sở VHTTDL tỉnh Hà Nam; Ban Quản lý Khu du lịch Tam Chúc",
  bibliography: "Giáo hội Phật giáo Việt Nam, Kỷ yếu 'Đại lễ Phật đản Liên Hợp Quốc Vesak 2019 tại Trung tâm Văn hóa Phật giáo Tam Chúc'; Sở VHTTDL Hà Nam, Hồ sơ quy hoạch tổng thể Khu du lịch quốc gia Tam Chúc (thị trấn Ba Sao, huyện Kim Bảng); Tạp chí Nghiên cứu Phật học.",
  sourceLocator: "Kỷ yếu Vesak 2019: Cảnh quan 'Tiền Lục Nhạc, Hậu Thất Tinh' bên hồ nước tự nhiên rộng hơn 600ha; Điện Tam Thế, Điện Pháp Chủ với hàng vạn bức phù điêu tạc từ đá dung nham núi lửa Indonesia ghi lại cuộc đời đức Phật Thích Ca.",
  localCommunity: "Tăng ni, phật tử tỉnh Hà Nam và hàng vạn du khách hành hương cả nước"
};

// 5. chua-bai-dinh-ninh-binh
b16[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ Di sản Thế giới UNESCO 'Quần thể danh thắng Tràng An' & 'Đại Nam nhất thống chí'",
  sourceAuthor: "UNESCO; Quốc sử quán triều Nguyễn; Ban Trị sự Giáo hội Phật giáo Việt Nam tỉnh Ninh Bình",
  bibliography: "UNESCO, World Heritage List 'Tràng An Landscape Complex' (Reference: 1438, Inscribed in 2014); Quốc sử quán triều Nguyễn, 'Đại Nam nhất thống chí' (mục Đền miếu tỉnh Ninh Bình); Giáo hội Phật giáo Việt Nam tỉnh Ninh Bình, 'Lịch sử Chùa Bái Đính'.",
  sourceLocator: "Hồ sơ UNESCO Quần thể danh thắng Tràng An; 'Đại Nam nhất thống chí': Lịch sử Chùa Bái Đính cổ nằm trong hang đá núi Đính do Thiền sư Nguyễn Minh Không thời Lý sáng lập năm 1136; Khu chùa Bái Đính mới với bảo tháp 13 tầng và tượng Phật đồng dát vàng.",
  localCommunity: "Nhân dân xã Gia Sinh, huyện Gia Viễn, tỉnh Ninh Bình và phật tử thập phương"
};

// 6. thien-vien-truc-lam-yen-tu
b16[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1954/QĐ-TTg & Tác phẩm thiền tông cổ 'Tam Tổ thực lục'",
  sourceAuthor: "Thủ tướng Chính phủ; Thiền phái Trúc Lâm; Thiền sư Thích Thanh Từ",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 1954/QĐ-TTg ngày 10/05/2012 xếp hạng Di tích quốc gia đặc biệt Khu di tích lịch sử và danh lam thắng cảnh Yên Tử (thành phố Uông Bí, tỉnh Quảng Ninh); 'Tam Tổ thực lục' (Bản dịch Thích Phước Sơn, Viện Nghiên cứu Phật học Việt Nam); Thích Thanh Từ, 'Thiền phái Trúc Lâm Yên Tử' (NXB Tôn giáo).",
  sourceLocator: "Quyết định số 1954/QĐ-TTg; 'Tam Tổ thực lục': Cuộc đời và tư tưởng thiền học của Phật hoàng Trần Nhân Tông sau khi nhường ngôi lên núi Yên Tử tu hành (năm 1299); Hệ thống chùa Hoa Yên, tượng Phật đồng An Kỳ Sinh và Chùa Đồng đỉnh non thiêng Yên Tử.",
  localCommunity: "Ban Quản lý Di tích và Rừng quốc gia Yên Tử, tăng ni phật tử thiền phái Trúc Lâm trên toàn quốc"
};

// 7. kien-truc-chua-khmer-nam-bo
b16[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 226/VH-QĐ & Chuyên khảo 'Văn hóa Khmer Nam Bộ'",
  sourceAuthor: "Bộ Văn hóa; Phan Xuân Biên; Bảo tàng Văn hóa Dân tộc Khmer tỉnh Sóc Trăng",
  bibliography: "Bộ Văn hóa, Quyết định số 226/VH-QĐ ngày 05/02/1989 xếp hạng Di tích kiến trúc nghệ thuật quốc gia Chùa Kh'leang (thành phố Sóc Trăng); Phan Xuân Biên, 'Văn hóa Khmer Nam Bộ' (NXB Khoa học Xã hội); Tạp chí Mỹ thuật, 'Đặc trưng điêu khắc và bích họa chùa Khmer'.",
  sourceLocator: "Quyết định số 226/VH-QĐ; Phan Xuân Biên: Cấu trúc chánh điện mái ba tầng chồng diêm uốn cong hình đuôi rắn Naga, ngọn tháp Prang vươn thẳng lên trời và hệ thống bích họa tường rực rỡ tái hiện cuộc đời đức Phật Thích Ca Mâu Ni.",
  localCommunity: "Đồng bào dân tộc Khmer Nam Tông tại các tỉnh Sóc Trăng, Trà Vinh, An Giang và Bạc Liêu"
};

// 8. chua-doi-soc-trang
b16[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 43-VH/QĐ & Khảo cứu sinh thái học văn hóa Chùa Mahatup",
  sourceAuthor: "Bộ Văn hóa - Thông tin; Thạch Phương; Viện Sinh thái và Tài nguyên Sinh vật",
  bibliography: "Bộ VHTT, Quyết định số 43-VH/QĐ ngày 07/01/1993 xếp hạng Di tích kiến trúc nghệ thuật quốc gia Chùa Mahatup (Chùa Dơi, số 73 đường Mai Ánh Đào, Phường 3, TP Sóc Trăng); Thạch Phương, 'Văn hóa Khmer Sóc Trăng' (NXB Khoa học Xã hội); Viện Sinh thái và TNSV, Báo cáo bảo tồn loài dơi ngựa.",
  sourceLocator: "Quyết định số 43-VH/QĐ; Thạch Phương: Lịch sử ngôi chùa cổ hơn 400 năm tuổi; Hiện tượng tự nhiên kỳ thú hàng vạn con dơi ngựa quý hiếm về cư ngụ thanh bình trên những tán cây cổ thụ trong khuôn viên chùa dưới triết lý từ bi bác ái Phật giáo.",
  localCommunity: "Chư tăng và đồng bào phật tử Chùa Mahatup, phường 3, thành phố Sóc Trăng"
};

// 9. chua-hang-tra-vinh
b16[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di tích Chùa Kompong Chray & Khảo cứu 'Địa chí Trà Vinh'",
  sourceAuthor: "Sở Văn hóa, Thể thao và Du lịch tỉnh Trà Vinh; Thạch Phương",
  bibliography: "Sở VHTTDL Trà Vinh, Hồ sơ di tích lịch sử - văn hóa cấp tỉnh Chùa Kompong Chray (Chùa Hang, thị trấn Châu Thành, huyện Châu Thành); Thạch Phương, 'Địa chí Trà Vinh' (NXB Khoa học Xã hội); Tạp chí Mỹ thuật, bài 'Nghệ thuật điêu khắc gỗ rễ cây chùa Hang'.",
  sourceLocator: "Hồ sơ di tích Chùa Kompong Chray: Cổng phụ độc đáo xây vòm sâu như một hang đá cổ dẫn lối vào rừng cây rậm rạp; Nghệ thuật đục đẽo gốc rễ cây sao, cây dầu cổ thụ thành các tác phẩm điêu khắc muông thú sống động của các sư sãi Khmer.",
  localCommunity: "Chư tăng và bà con phật tử chùa Kompong Chray, huyện Châu Thành, tỉnh Trà Vinh"
};

// 10. toa-thanh-tay-ninh-dao-cao-dai
b16[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Đạo Cao Đài ở Việt Nam' & Khảo cứu Kiến trúc Tòa thánh Tây Ninh",
  sourceAuthor: "Ban Tôn giáo Chính phủ; Nhà nghiên cứu Nguyễn Văn Hầu; Bảo tàng tỉnh Tây Ninh",
  bibliography: "Ban Tôn giáo Chính phủ, 'Đạo Cao Đài ở Việt Nam' (NXB Tôn giáo, 2012); Nguyễn Văn Hầu, 'Sự hình thành và phát triển của Đạo Cao Đài' (Sài Gòn, 1974); Tạp chí Nghiên cứu Tôn giáo, chuyên đề 'Kiến trúc và biểu tượng Tòa thánh Tây Ninh'.",
  sourceLocator: "Ban Tôn giáo Chính phủ (2012): Sự dung hợp tam giáo (Nho - Phật - Đạo) và triết lý Đại đạo Tam kỳ Phổ độ; Kiến trúc Tòa thánh Tây Ninh: Hai lầu chuông trống Hiệp Thiên Đài, Cửu Trùng Đài 9 bậc cấp và biểu tượng Thiên Nhãn tỏa hào quang soi rọi muôn loài.",
  localCommunity: "Toàn thể tín đồ, chức sắc Đạo Cao Đài Tây Ninh trên toàn quốc và hải ngoại"
};

fs.writeFileSync(b16Path, JSON.stringify(b16, null, 2), "utf8");
console.log("Updated Batch 016 successfully!");
