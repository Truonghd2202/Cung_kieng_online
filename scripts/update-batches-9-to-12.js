const fs = require("fs");
const path = require("path");

const batchesDir = path.join(__dirname, "../editorial/culture-batches");

// ==========================================
// BATCH 009: Tín ngưỡng dân gian & Làng nghề Nam Bộ
// ==========================================
const b9Path = path.join(batchesDir, "batch-009.json");
const b9 = JSON.parse(fs.readFileSync(b9Path, "utf8"));

// 1. tin-nguong-tho-ong-dia-than-tai-nam-bo
b9[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Tín ngưỡng dân gian Nam Bộ' & 'Nói về miền Nam'",
  sourceAuthor: "Huỳnh Ngọc Trảng; Sơn Nam; Viện Khoa học Xã hội Vùng Nam Bộ",
  bibliography: "Huỳnh Ngọc Trảng, 'Tín ngưỡng dân gian Nam Bộ' (NXB Văn hóa - Văn nghệ, 2012); Sơn Nam, 'Nói về miền Nam' (NXB Trẻ, 2005); Viện KHXH Vùng Nam Bộ, Chuyên đề 'Tín ngưỡng Thần Tài - Thổ Địa trong đời sống cư dân Nam Bộ'.",
  sourceLocator: "Huỳnh Ngọc Trảng (2012): Chương 'Tín ngưỡng Thần Tài - Thổ Địa trong văn hóa thị dân và nông nghiệp phương Nam', tr. 145-178; Sơn Nam (2005): Mục Sự hòa đồng tín ngưỡng Việt - Hoa trong phong tục lập bàn thờ dưới đất.",
  localCommunity: "Các gia đình và hộ kinh doanh buôn bán tại TP. Hồ Chí Minh và các tỉnh Tây Nam Bộ"
};

// 2. chua-ba-thien-hau-cho-lon
b9[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 43-VH/QĐ & Địa chí cổ 'Gia Định thành thông chí'",
  sourceAuthor: "Bộ Văn hóa - Thông tin; Trịnh Hoài Đức; Huỳnh Ngọc Trảng",
  bibliography: "Bộ VHTT, Quyết định số 43-VH/QĐ ngày 07/01/1993 xếp hạng Di tích kiến trúc nghệ thuật cấp quốc gia Chùa Bà Thiên Hậu (Hội quán Tuệ Thành, số 710 Nguyễn Trãi, Quận 5, TP.HCM); Trịnh Hoài Đức, 'Gia Định thành thông chí' (Bản dịch Viện Sử học, NXB Giáo dục, 1998); Huỳnh Ngọc Trảng, 'Kiến trúc và điêu khắc đền miếu người Hoa ở Nam Bộ' (NXB Mỹ thuật, 2003).",
  sourceLocator: "Quyết định số 43-VH/QĐ; 'Gia Định thành thông chí': Mục Phong tục thành Gia Định; 'Kiến trúc và điêu khắc đền miếu người Hoa ở Nam Bộ': Nghệ thuật gốm phù điêu nung men màu Bửu Nguyên thế kỷ XIX trên bờ mái miếu, tr. 65-88.",
  localCommunity: "Cộng đồng người Hoa nhóm ngôn ngữ Quảng Đông và cư dân Chợ Lớn, Quận 5, TP. Hồ Chí Minh"
};

// 3. le-hoi-ky-yen-dinh-than-nam-bo
b9[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Khảo luận 'Đình miếu và lễ hội dân gian miền Nam' & 'Đình Nam Bộ xưa và nay'",
  sourceAuthor: "Sơn Nam; Huỳnh Ngọc Trảng; Trương Ngọc Tường",
  bibliography: "Sơn Nam, 'Đình miếu và lễ hội dân gian miền Nam' (NXB Trẻ, 2004); Huỳnh Ngọc Trảng, Trương Ngọc Tường, 'Đình Nam Bộ xưa và nay' (NXB Đồng Nai, 1999); Bảo tàng Lịch sử TP. Hồ Chí Minh.",
  sourceLocator: "Sơn Nam (2004): Chương 'Lễ Kỳ Yên ở đình làng Nam Bộ: Nghi thức Tế Tiền hiền, Hậu hiền, Xây chầu và hát bội Thần yết', tr. 82-120; Huỳnh Ngọc Trảng (1999): Quy chuẩn cấu trúc lễ tế xuân thu nhị kỳ tại đình thần Nam Bộ.",
  localCommunity: "Cộng đồng nhân dân tại các thôn ấp có đình làng ở Nam Bộ (Đình Bình Hòa, Đình Thông Tây Hội, Đình Long Tuyền...)"
};

// 4. le-hoi-nghinh-ong-can-gio
b9[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Hồ sơ di sản văn hóa phi vật thể Lễ hội Nghinh Ông Cần Giờ",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sở Văn hóa và Thể thao TP Hồ Chí Minh",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia đợt 1 (Lễ hội Nghinh Ông Cần Giờ, thị trấn Cần Thạnh, huyện Cần Giờ, TP.HCM); Bảo tàng Lịch sử TP.HCM, 'Tín ngưỡng thờ Cá Ông duyên hải Nam Bộ'; Thạch Phương, Lê Trung Vũ, 'Lễ hội dân gian Việt Nam'.",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL; Hồ sơ di sản quốc gia Lễ hội Nghinh Ông Cần Giờ: Đoàn thuyền hoa rước kiệu Nam Hải Tướng Quân xuất phát từ Lăng Ông Thủy Tướng ra khơi ngày rằm tháng Tám âm lịch.",
  localCommunity: "Cộng đồng ngư dân và vạn chài thị trấn Cần Thạnh, huyện Cần Giờ, TP. Hồ Chí Minh"
};

// 5. van-hoa-cho-noi-cai-rang
b9[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 829/QĐ-BVHTTDL & Chuyên khảo 'Chợ nổi đồng bằng sông Cửu Long'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Nhà nghiên cứu Nhâm Hùng",
  bibliography: "Bộ VHTTDL, Quyết định số 829/QĐ-BVHTTDL ngày 10/03/2016 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Văn hóa Chợ nổi Cái Răng, quận Cái Răng, thành phố Cần Thơ); Nhâm Hùng, 'Chợ nổi đồng bằng sông Cửu Long' (NXB Trẻ, 2009); Sở VHTTDL TP Cần Thơ.",
  sourceLocator: "Quyết định số 829/QĐ-BVHTTDL; Nhâm Hùng (2009): Tri thức bản địa dựng cây bẹo (bẹo hàng nông sản, bẹo hình thức, bẹo lá lợp) và tập quán sinh hoạt thương hồ ghe xuồng trên ngã ba sông Cần Thơ, tr. 45-82.",
  localCommunity: "Thương hồ và cộng đồng cư dân sông nước tại chợ nổi Cái Răng, quận Cái Răng, thành phố Cần Thơ"
};

// 6. nghe-chieu-dinh-yen-dong-thap
b9[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Hồ sơ khoa học di sản Nghề dệt chiếu Định Yên",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sở Văn hóa, Thể thao và Du lịch tỉnh Đồng Tháp",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề dệt chiếu Định Yên, xã Định Yên và Định An, huyện Lấp Vò, tỉnh Đồng Tháp); Huỳnh Minh, 'Định Tường xưa và nay'; Tạp chí Di sản Văn hóa.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Hồ sơ di sản quốc gia: Kỹ thuật chọn cây lác ven cồn bãi sông Hậu, nhuộm phẩm màu hoa văn vảy ốc, hoa mai và lịch sử phiên 'chợ chiếu ma' họp lúc nửa đêm trước sân đình Định Yên.",
  localCommunity: "Cộng đồng làng nghề dệt chiếu xã Định Yên và thị trấn Định An, huyện Lấp Vò, tỉnh Đồng Tháp"
};

// 7. nghe-lam-banh-trang-my-long
b9[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 3757/QĐ-BVHTTDL & Khảo cứu 'Địa chí Bến Tre'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Thạch Phương; Sở VHTTDL tỉnh Bến Tre",
  bibliography: "Bộ VHTTDL, Quyết định số 3757/QĐ-BVHTTDL ngày 30/10/2018 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề làm bánh tráng Mỹ Lồng, xã Mỹ Thạnh, huyện Giồng Trôm, tỉnh Bến Tre); Thạch Phương, 'Địa chí Bến Tre' (NXB Khoa học Xã hội, 1991).",
  sourceLocator: "Quyết định số 3757/QĐ-BVHTTDL; 'Địa chí Bến Tre': Kỹ thuật xay gạo sỏi nàng Keo, phối trộn nước cốt dừa nạo béo đậm, tráng bánh bằng gáo dừa trên màng vải hơi nước và phơi vỉ đan lá dừa nước, tr. 320-338.",
  localCommunity: "Cộng đồng các hộ làm bánh tráng truyền thống tại xã Mỹ Thạnh, huyện Giồng Trôm, tỉnh Bến Tre"
};

// 8. nghe-son-mai-tuong-binh-hiep
b9[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Chuyên khảo 'Mỹ thuật sơn mài Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Họa sĩ Quang Phòng; Sở VHTTDL tỉnh Bình Dương",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề sơn mài Tương Bình Hiệp, phường Tương Bình Hiệp, thành phố Thủ Dầu Một, tỉnh Bình Dương); Quang Phòng, 'Mỹ thuật sơn mài Việt Nam' (NXB Mỹ thuật, 1993).",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL; Quang Phòng (1993): Kỹ thuật bó vóc bằng vải màn đất phù sa và keo da trâu, mài nước bằng đá mài và lá chuối khô, nghệ thuật cẩn vỏ trứng và cẩn ốc xà cừ óng ánh, tr. 88-124.",
  localCommunity: "Nghệ nhân và thợ thủ công làng sơn mài Tương Bình Hiệp, thành phố Thủ Dầu Một, tỉnh Bình Dương"
};

// 9. nghe-lam-gom-lai-thieu
b9[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ Di sản văn hóa phi vật thể quốc gia Nghề gốm Bình Dương & Khảo luận 'Gốm Lái Thiêu'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Huỳnh Ngọc Trảng; Sở VHTTDL tỉnh Bình Dương",
  bibliography: "Bộ VHTTDL, Quyết định công bố Danh mục di sản văn hóa phi vật thể quốc gia Nghề gốm Bình Dương (Gốm Lái Thiêu, Tân Phước Khánh); Huỳnh Ngọc Trảng, 'Gốm Lái Thiêu' (NXB Mỹ thuật, 2004); Tạp chí Gốm sứ Nam Bộ.",
  sourceLocator: "Hồ sơ di sản văn hóa phi vật thể quốc gia; Huỳnh Ngọc Trảng (2004): Kỹ thuật men độc bản (men da bưởi, men lam, men xanh rêu), hình tượng con gà trống hoa cúc Nam Bộ trên bát đĩa và chiếc lu da lươn trữ nước ngọt miền Tây, tr. 40-75.",
  localCommunity: "Cộng đồng thợ gốm và nghệ nhân các lò gốm Lái Thiêu, thành phố Thuận An, tỉnh Bình Dương"
};

// 10. le-cung-trang-chol-chnam-thmay
b9[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Khảo cứu 'Người Việt gốc Miên' & Chuyên khảo 'Tìm hiểu văn hóa Khmer Nam Bộ'",
  sourceAuthor: "Lê Hương; Sơn Nam; Bảo tàng Văn hóa Dân tộc Khmer tỉnh Trà Vinh",
  bibliography: "Lê Hương, 'Người Việt gốc Miên' (Sài Gòn, 1969); Sơn Nam, 'Tìm hiểu văn hóa Khmer Nam Bộ' (NXB Văn hóa Dân tộc, 1985); Sở VHTTDL tỉnh Trà Vinh và Sóc Trăng, Tài liệu giới thiệu lễ hội cổ truyền dân tộc Khmer.",
  sourceLocator: "Lê Hương (1969): Nghi thức rước đại lịch Maha Songkran ngày thứ nhất, tục đắp núi cát (Val Puon Phno) tại sân chùa ngày thứ hai tích phúc đức và lễ tắm Phật (Sra Preah) ngày thứ ba, tr. 110-145.",
  localCommunity: "Đồng bào phật tử Khmer Nam Tông tại các tỉnh Trà Vinh, Sóc Trăng, An Giang, Kiên Giang và Bạc Liêu"
};

fs.writeFileSync(b9Path, JSON.stringify(b9, null, 2), "utf8");
console.log("Updated Batch 009 successfully!");

// ==========================================
// BATCH 010: Đạo hiếu, Gia phả, Nghề biển & Tri thức dân gian
// ==========================================
const b10Path = path.join(batchesDir, "batch-010.json");
const b10 = JSON.parse(fs.readFileSync(b10Path, "utf8"));

// 1. tuc-tho-cung-to-tien-trong-nha
b10[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Việt Nam phong tục' (Phan Kế Bính) & 'Nếp cũ - Tín ngưỡng Việt Nam' (Toan Ánh)",
  sourceAuthor: "Phan Kế Bính; Toan Ánh; Viện Nghiên cứu Gia đình và Giới",
  bibliography: "Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, tái bản 2005); Toan Ánh, 'Nếp cũ - Tín ngưỡng Việt Nam' (NXB Trẻ, 2005); Viện Nghiên cứu Gia đình và Giới, Chuyên đề 'Bàn thờ gia tiên và sự gắn kết gia đình Việt Nam'.",
  sourceLocator: "Phan Kế Bính (2005): Thiên thứ nhất (Phong tục trong gia tộc: Mục Thờ phụng tổ tiên, ngày giỗ chạp và ý nghĩa bài vị gia tiên, tr. 15-38); Toan Ánh (2005): Cấu trúc bàn thờ gia tiên ba gian và lễ nghi cúng giỗ truyền thống.",
  localCommunity: "Các gia đình người Việt trên toàn quốc và cộng đồng người Việt định cư ở nước ngoài"
};

// 2. gia-pha-va-viec-ghi-chep-dong-ho
b10[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Khảo luận 'Gia phả - Khảo luận và thực hành' & Tuyển tập Hội Khoa học Lịch sử Việt Nam",
  sourceAuthor: "Dã Lan Nguyễn Đức Dụ; Hội Khoa học Lịch sử Việt Nam",
  bibliography: "Dã Lan Nguyễn Đức Dụ, 'Gia phả - Khảo luận và thực hành' (NXB Văn hóa Dân tộc, 1992); Hội Khoa học Lịch sử Việt Nam, 'Phương pháp nghiên cứu và biên soạn Gia phả' (NXB Văn hóa Thông tin, 1998); Trung tâm Nghiên cứu Gia phả TP.HCM.",
  sourceLocator: "Nguyễn Đức Dụ (1992): Chương I & II (Cấu trúc gia phổ, tông chi, thế phả, tộc ước và quy tắc ghi chép thế thứ đích thứ, công trạng tổ tiên, tr. 35-72).",
  localCommunity: "Các dòng họ, hội đồng gia tộc trên khắp ba miền Bắc, Trung, Nam"
};

// 3. tuc-goi-banh-chung-ngay-tet
b10[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Sách cổ 'Lĩnh Nam chích quái' (Truyện Bánh chưng) & 'Việt Nam phong tục'",
  sourceAuthor: "Trần Thế Pháp; Phan Kế Bính; Bảo tàng Lịch sử Quốc gia",
  bibliography: "Trần Thế Pháp, 'Lĩnh Nam chích quái' (Bản dịch Lê Hữu Mục, NXB Văn học); Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, 2005); Bảo tàng Lịch sử Quốc gia, Chuyên khảo 'Biểu tượng bánh chưng bánh giầy trong văn hóa thời Hùng Vương'.",
  sourceLocator: "Lĩnh Nam chích quái (Truyện Bánh chưng: Tích Lang Liêu dâng bánh vuông bánh tròn biểu trưng Trời đất bao la che chở muôn loài); Phan Kế Bính (2005): Tục gói bánh chưng lá dong trước đêm 30 Tết Nguyên Đán, tr. 102-108.",
  localCommunity: "Cộng đồng người Việt trên toàn lãnh thổ Việt Nam"
};

// 4. tuc-xin-chu-dau-nam-van-mieu
b10[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1954/QĐ-TTg & Tùy bút 'Hà Nội băm sáu phố phường'",
  sourceAuthor: "Thủ tướng Chính phủ; Thạch Lam; Trung tâm Hoạt động VHKH Văn Miếu — Quốc Tử Giám",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 1954/QĐ-TTg ngày 10/05/2012 xếp hạng Di tích quốc gia đặc biệt Văn Miếu - Quốc Tử Giám; Thạch Lam, 'Hà Nội băm sáu phố phường' (NXB Đời Nay, 1943); Trung tâm HĐVHKH Văn Miếu - Quốc Tử Giám, Kỷ yếu 'Hội chữ Xuân Văn Miếu'.",
  sourceLocator: "Quyết định số 1954/QĐ-TTg; Kỷ yếu Hội chữ Xuân Văn Miếu: Phong tục tôn sư trọng đạo, nghệ thuật thư pháp chữ Hán và chữ Quốc ngữ, ý nghĩa các chữ Tâm, Phúc, Đức, An, tr. 25-48.",
  localCommunity: "Nhân dân Thủ đô Hà Nội và đồng bào cả nước trẩy hội du xuân Văn Miếu"
};

// 5. tuc-le-xem-tuoi-xay-nha
b10[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Việt Nam phong tục' & 'Nhà ở cổ truyền các dân tộc Việt Nam'",
  sourceAuthor: "Phan Kế Bính; Nguyễn Khắc Tụng; Viện Kiến trúc Quốc gia",
  bibliography: "Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, tái bản 2005); Nguyễn Khắc Tụng, 'Nhà ở cổ truyền các dân tộc Việt Nam' (NXB Xây Dựng, 1993); Viện Kiến trúc Quốc gia, Chuyên đề 'Văn hóa ở và kiến trúc truyền thống Việt Nam'.",
  sourceLocator: "Phan Kế Bính (2005): Mục 'Làm nhà' (Tục kiêng Kim Lâu, Hoang Ốc, Tam Tai và lễ động thổ đặt đá đầu tiên, tr. 70-76); Nguyễn Khắc Tụng (1993): Tri thức dân gian hướng gió và phong thủy vi khí hậu phương Nam.",
  localCommunity: "Các gia đình người Việt chuẩn bị xây dựng nhà ở dân dụng trên toàn quốc"
};

// 6. tuc-le-cuoi-hoi-truyen-thong
b10[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Việt Nam phong tục' & 'Đất lề quê thói' (Mục Hôn nhân)",
  sourceAuthor: "Phan Kế Bính; Nhất Thanh; Bảo tàng Phụ nữ Nam Bộ",
  bibliography: "Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, 2005); Nhất Thanh, 'Đất lề quê thói' (NXB Văn hóa Thông tin, 1993); Bảo tàng Phụ nữ Nam Bộ, Chuyên đề 'Hôn nhân và gia đình người Việt truyền thống'.",
  sourceLocator: "Phan Kế Bính (2005): Thiên thứ nhất: Mục Hôn lễ (Quy trình Lục lễ cổ truyền tinh giản thành Chạm ngõ, Ăn hỏi và Đón dâu; Ý nghĩa mâm trầu cau kết tóc xe duyên, tr. 52-68).",
  localCommunity: "Các thế hệ gia đình và đôi lứa kết hôn trên khắp ba miền Việt Nam"
};

// 7. tuc-le-mung-sinh-nhat-nguoi-xua
b10[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Luật Người cao tuổi năm 2009 (Điều 21) & Chuyên khảo 'Việt Nam phong tục'",
  sourceAuthor: "Quốc hội nước CHXHCN Việt Nam; Phan Kế Bính; Toan Ánh",
  bibliography: "Quốc hội nước CHXHCN Việt Nam, Luật Người cao tuổi năm 2009 (Luật số 39/2009/QH12, Điều 21: Chúc thọ, mừng thọ người cao tuổi); Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, 2005); Toan Ánh, 'Nếp cũ - Đời người' (NXB Trẻ, 2005).",
  sourceLocator: "Luật Người cao tuổi 2009 Điều 21: Quy định thẩm quyền và độ tuổi chúc thọ người cao tuổi 70, 80, 90, 100 tuổi trở lên; Phan Kế Bính (2005): Lễ mừng thọ lục tuần (60 tuổi), thất tuần (70 tuổi), bát tuần (80 tuổi), chữ Thọ treo gian giữa, tr. 80-86.",
  localCommunity: "Các gia đình, dòng họ và chính quyền địa phương trên toàn quốc"
};

// 8. le-cung-cau-ngu-o-mien-tay
b10[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 3995/QĐ-BVHTTDL & Hồ sơ di sản Lễ hội Nghinh Ông Sông Đốc",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sở VHTTDL tỉnh Cà Mau",
  bibliography: "Bộ VHTTDL, Quyết định số 3995/QĐ-BVHTTDL ngày 04/12/2020 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội Nghinh Ông Sông Đốc, thị trấn Sông Đốc, huyện Trần Văn Thời, tỉnh Cà Mau); Thạch Phương, 'Văn hóa dân gian Nam Bộ' (NXB Khoa học Xã hội, 1992).",
  sourceLocator: "Quyết định số 3995/QĐ-BVHTTDL; Hồ sơ di sản quốc gia Lễ hội Nghinh Ông Sông Đốc: Nghi thức thỉnh linh Thần Nam Hải trên hàng trăm tàu cá ra biển Tây và đại lễ tế tại Lăng Ông Thủy Tướng Cà Mau ngày 15 tháng 2 âm lịch.",
  localCommunity: "Cộng đồng ngư dân vạn chài thị trấn Sông Đốc, huyện Trần Văn Thời và ven biển Cà Mau, Kiên Giang"
};

// 9. tuc-tho-ba-chua-ngoc-nam-bo
b10[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Khảo luận 'Hát Bóng Rỗi - Diễn xướng nghi lễ Nam Bộ' & 'Đạo Mẫu ở Việt Nam'",
  sourceAuthor: "Huỳnh Ngọc Trảng; GS. Ngô Đức Thịnh; Viện KHXH Vùng Nam Bộ",
  bibliography: "Huỳnh Ngọc Trảng, 'Hát Bóng Rỗi - Diễn xướng nghi lễ Nam Bộ' (NXB Văn hóa Dân tộc, 1997); Ngô Đức Thịnh, 'Đạo Mẫu ở Việt Nam' (NXB Tri thức, 2009); Viện KHXH Vùng Nam Bộ, Chuyên đề 'Tín ngưỡng Nữ thần và Mẫu thần ở Nam Bộ'.",
  sourceLocator: "Huỳnh Ngọc Trảng (1997): Nghi lễ thờ Bà Chúa Ngọc (sự tiếp biến Thiên Y A Na của người Chăm vào hệ thống thần linh Nam Bộ), nghệ thuật múa mâm vàng, múa bông hoa và hát rỗi phụng vụ ngày vía Bà, tr. 52-89.",
  localCommunity: "Cộng đồng tín đồ và người dân sùng bái Bà Chúa Ngọc tại các miếu dinh khắp vùng đất Nam Bộ"
};

// 10. nghe-lam-luoi-danh-ca-bien
b10[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Văn hóa biển đảo miền Trung' & Bộ sưu tập Bảo tàng Hải dương học",
  sourceAuthor: "Nguyễn Thanh Lợi; Bảo tàng Hải dương học Nha Trang; Hội Nghề cá Việt Nam",
  bibliography: "Nguyễn Thanh Lợi, 'Văn hóa biển đảo miền Trung' (NXB Văn hóa - Văn nghệ, 2014); Bảo tàng Hải dương học Nha Trang, Bộ sưu tập 'Ngư cụ truyền thống của ngư dân ven biển Việt Nam'; Hội Nghề cá Việt Nam.",
  sourceLocator: "Nguyễn Thanh Lợi (2014): Kỹ thuật đan lưới chài, chọn sợi gai, sợi cước, kỹ thuật đan mắt lưới theo kích cỡ cá và tri thức bản địa bảo quản lưới bằng vỏ cây dà ngập mặn chịu mặn, tr. 110-135.",
  localCommunity: "Các làng chài ven biển từ Quảng Ninh, miền Trung đến Phú Quốc và vịnh Thái Lan"
};

fs.writeFileSync(b10Path, JSON.stringify(b10, null, 2), "utf8");
console.log("Updated Batch 010 successfully!");

// ==========================================
// BATCH 011: Lễ hội tưởng niệm anh hùng dân tộc
// ==========================================
const b11Path = path.join(batchesDir, "batch-011.json");
const b11 = JSON.parse(fs.readFileSync(b11Path, "utf8"));

// 1. le-hoi-den-hai-ba-trung-me-linh
b11[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1954/QĐ-TTg & Biên niên sử 'Đại Việt sử ký toàn thư' (Kỷ Trưng Nữ Vương)",
  sourceAuthor: "Thủ tướng Chính phủ; Ngô Sĩ Liên; Sở Văn hóa và Thể thao Hà Nội",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 1954/QĐ-TTg ngày 10/05/2012 xếp hạng Di tích quốc gia đặc biệt Đền Hai Bà Trưng (xã Mê Linh, huyện Mê Linh, thành phố Hà Nội); Ngô Sĩ Liên, 'Đại Việt sử ký toàn thư' (Kỷ Trưng Nữ Vương, NXB Khoa học Xã hội); Đỗ Thị Hảo, 'Các nữ tướng thời Hai Bà Trưng'.",
  sourceLocator: "Quyết định số 1954/QĐ-TTg; Đại Việt sử ký toàn thư: Khởi nghĩa Hai Bà Trưng năm 40 sau Công nguyên giành lại 65 thành trì; Nghi lễ rước kiệu giao kiệu ngày mùng 6 tháng Giêng tại đền Mê Linh.",
  localCommunity: "Cộng đồng nhân dân xã Mê Linh, huyện Mê Linh, thành phố Hà Nội và đồng bào cả nước"
};

// 2. le-hoi-den-kiep-bac-hai-duong
b11[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 548/QĐ-TTg & Biên niên sử 'Đại Việt sử ký toàn thư' (Kỷ nhà Trần)",
  sourceAuthor: "Thủ tướng Chính phủ; Ngô Sĩ Liên; Ban Quản lý Di tích Côn Sơn — Kiếp Bạc",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 548/QĐ-TTg ngày 10/05/2012 xếp hạng Di tích quốc gia đặc biệt Khu di tích Côn Sơn - Kiếp Bạc (thành phố Chí Linh, tỉnh Hải Dương); Ngô Sĩ Liên, 'Đại Việt sử ký toàn thư' (Kỷ nhà Trần); Phan Huy Chú, 'Lịch triều hiến chương loại chí'.",
  sourceLocator: "Quyết định số 548/QĐ-TTg; Đại Việt sử ký toàn thư: Ba lần đại phá quân Nguyên Mông của Quốc công Tiết chế Hưng Đạo Đại Vương Trần Quốc Tuấn; Đại lễ tế Đức Thánh Trần và nghi lễ diễn xướng hội quân trên sông Lục Đầu ngày 20/8 âm lịch.",
  localCommunity: "Nhân dân thành phố Chí Linh, tỉnh Hải Dương và hàng vạn khách hành hương thập phương"
};

// 3. le-hoi-den-ba-trieu-thanh-hoa
b11[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2408/QĐ-TTg & Biên niên sử 'Đại Việt sử ký toàn thư' (Kỷ Triệu Nhụy Nương)",
  sourceAuthor: "Thủ tướng Chính phủ; Ngô Sĩ Liên; Sở VHTTDL tỉnh Thanh Hóa",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 2408/QĐ-TTg ngày 31/12/2014 xếp hạng Di tích quốc gia đặc biệt Khu di tích kiến trúc nghệ thuật Đền Bà Triệu (xã Triệu Lộc, huyện Hậu Lộc, tỉnh Thanh Hóa); Ngô Sĩ Liên, 'Đại Việt sử ký toàn thư' (Kỷ Triệu Nhụy Nương); Khâm định Việt sử thông giám cương mục.",
  sourceLocator: "Quyết định số 2408/QĐ-TTg; Đại Việt sử ký toàn thư: Lời tuyên ngôn hào hùng 'Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông' (năm 248); Trình tự nghi thức rước kiệu Bát cống và đại lễ tế nữ anh hùng dân tộc ngày 22/2 âm lịch.",
  localCommunity: "Cộng đồng nhân dân làng Phú Điền, xã Triệu Lộc, huyện Hậu Lộc, tỉnh Thanh Hóa"
};

// 4. le-hoi-dong-da-ha-noi
b11[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2408/QĐ-TTg & Sử liệu 'Hoàng Lê nhất thống chí' (Hồi thứ 14)",
  sourceAuthor: "Thủ tướng Chính phủ; Ngô gia văn phái; GS. Phan Huy Lê",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 2408/QĐ-TTg ngày 24/12/2018 xếp hạng Di tích quốc gia đặc biệt Địa điểm Chiến thắng Ngọc Hồi - Đống Đa (quận Đống Đa, Hà Nội); Ngô gia văn phái, 'Hoàng Lê nhất thống chí' (Hồi thứ 14, NXB Văn học); Phan Huy Lê, 'Chiến thắng Ngọc Hồi - Đống Đa năm 1789'.",
  sourceLocator: "Quyết định số 2408/QĐ-TTg; 'Hoàng Lê nhất thống chí': Cuộc hành quân thần tốc và chiến thắng quét sạch 29 vạn quân Mãn Thanh mùng 5 Tết Kỷ Dậu 1789; Nghi thức rước rồng lửa Thăng Long và lễ cầu siêu nghĩa sĩ tại gò Đống Đa.",
  localCommunity: "Nhân dân quận Đống Đa, nhân dân Thủ đô Hà Nội và đồng bào cả nước"
};

// 5. le-hoi-den-do-bac-ninh
b11[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2408/QĐ-TTg & Biên niên sử 'Đại Việt sử ký toàn thư' (Kỷ nhà Lý)",
  sourceAuthor: "Thủ tướng Chính phủ; Ngô Sĩ Liên; Sở VHTTDL tỉnh Bắc Ninh",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 2408/QĐ-TTg ngày 31/12/2014 xếp hạng Di tích quốc gia đặc biệt Khu lăng mộ và đền thờ các vị vua triều Lý (Đền Đô, phường Đình Bảng, thành phố Từ Sơn, tỉnh Bắc Ninh); Ngô Sĩ Liên, 'Đại Việt sử ký toàn thư' (Bản kỷ toàn thư - Kỷ nhà Lý).",
  sourceLocator: "Quyết định số 2408/QĐ-TTg; Đại Việt sử ký toàn thư: Công đức sáng lập vương triều và Chiếu dời đô của vua Lý Thái Tổ năm 1010; Nghi thức rước kiệu bát vị hoàng đế triều Lý từ chùa Cổ Pháp về Đền Đô ngày 15/3 âm lịch.",
  localCommunity: "Nhân dân phường Đình Bảng, thành phố Từ Sơn, tỉnh Bắc Ninh"
};

// 6. le-hoi-tich-dien-doi-son
b11[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2459/QĐ-BVHTTDL & Biên niên sử 'Đại Việt sử ký toàn thư' (Kỷ Tiền Lê)",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Ngô Sĩ Liên; Sở VHTTDL tỉnh Hà Nam",
  bibliography: "Bộ VHTTDL, Quyết định số 2459/QĐ-BVHTTDL ngày 20/06/2017 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội Tịch điền Đọi Sơn, xã Tiên Sơn, thị xã Duy Tiên, tỉnh Hà Nam); Ngô Sĩ Liên, 'Đại Việt sử ký toàn thư' (Kỷ nhà Tiền Lê).",
  sourceLocator: "Quyết định số 2459/QĐ-BVHTTDL; Đại Việt sử ký toàn thư: Vua Lê Đại Hành cày ruộng tịch điền năm Đinh Hợi (987) dưới chân núi Đọi; Nghi thức hóa thân nguyên thủ đi đường cày đầu xuân khuyến nông và rước kiệu Thần Nông mùng 7 tháng Giêng.",
  localCommunity: "Cộng đồng nhân dân xã Tiên Sơn, thị xã Duy Tiên, tỉnh Hà Nam"
};

// 7. le-hoi-yen-the-bac-giang
b11[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 548/QĐ-TTg & Chuyên khảo lịch sử 'Khởi nghĩa Yên Thế'",
  sourceAuthor: "Thủ tướng Chính phủ; TS. Khổng Đức Thiêm; Bảo tàng tỉnh Bắc Giang",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 548/QĐ-TTg ngày 10/05/2012 xếp hạng Di tích quốc gia đặc biệt Những địa điểm Khởi nghĩa Yên Thế (tỉnh Bắc Giang); Khổng Đức Thiêm, 'Khởi nghĩa Yên Thế' (NXB Quân đội Nhân dân, 2013); Tạp chí Lịch sử Quân sự.",
  sourceLocator: "Quyết định số 548/QĐ-TTg; Khổng Đức Thiêm (2013): 30 năm trường kỳ kháng Pháp oanh liệt của nghĩa quân Hoàng Hoa Thám (Đề Thám); Nghi lễ tế cờ nghĩa quân, hội thi bắn nỏ, cưỡi ngựa ngày 16/3 dương lịch tại đồn Phồn Xương.",
  localCommunity: "Nhân dân các dân tộc huyện Yên Thế, Tân Yên, Yên Dũng, tỉnh Bắc Giang"
};

// 8. le-hoi-co-loa-ha-noi
b11[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1954/QĐ-TTg & Công trình 'Khảo cổ học Cổ Loa'",
  sourceAuthor: "Thủ tướng Chính phủ; Viện Khảo cổ học; Trung tâm Bảo tồn Di sản Thăng Long — Hà Nội",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 1954/QĐ-TTg ngày 10/05/2012 xếp hạng Di tích quốc gia đặc biệt Khu di tích Cổ Loa (xã Cổ Loa, huyện Đông Anh, Hà Nội); Viện Khảo cổ học, 'Khảo cổ học Cổ Loa' (NXB Khoa học Xã hội); Lĩnh Nam chích quái (Truyện Rùa vàng).",
  sourceLocator: "Quyết định số 1954/QĐ-TTg; 'Khảo cổ học Cổ Loa': Phát hiện hàng vạn mũi tên đồng Cầu Vực và kết cấu ba vòng thành đất xoáy trôn ốc thời Âu Lạc thế kỷ III trước Công nguyên; Nghi thức tế lễ Bát xã Loa Thành ngày mùng 6 tháng Giêng tưởng niệm vua An Dương Vương.",
  localCommunity: "Cộng đồng cư dân Bát xã Loa Thành, huyện Đông Anh, Hà Nội"
};

// 9. le-hoi-den-con-nghe-an
b11[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 217/QĐ-BVHTTDL & Địa chí 'Đại Nam nhất thống chí' (Tỉnh Nghệ An)",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Quốc sử quán triều Nguyễn; Sở VHTT tỉnh Nghệ An",
  bibliography: "Bộ VHTTDL, Quyết định số 217/QĐ-BVHTTDL ngày 19/01/2013 công bố Danh mục di sản văn hóa phi vật thể quốc gia đợt 1 (Lễ hội Đền Cờn, phường Quỳnh Phương, thị xã Hoàng Mai, tỉnh Nghệ An); Quốc sử quán triều Nguyễn, 'Đại Nam nhất thống chí' (mục Đền miếu tỉnh Nghệ An); Ninh Viết Giao, 'Kho tàng vè xứ Nghệ'.",
  sourceLocator: "Quyết định số 217/QĐ-BVHTTDL; 'Đại Nam nhất thống chí': Sự tích Tứ vị Thánh Nương hiển linh cứu nạn trên biển thời Trần ('Nhất Cờn, nhì Quả, tam Bạch Mã, tứ Chiêu Trưng'); Trình tự nghi lễ chạy ó trên bãi biển và rước kiệu vượt sông Mai Giang ngày 21 tháng Giêng.",
  localCommunity: "Cộng đồng ngư dân phường Quỳnh Phương, thị xã Hoàng Mai và vùng duyên hải xứ Nghệ"
};

// 10. le-hoi-den-qua-son-nghe-an
b11[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Biên niên sử 'Đại Việt sử ký toàn thư' (Kỷ nhà Lý)",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Ngô Sĩ Liên; Bùi Dương Lịch",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội Đền Quả Sơn, xã Bồi Sơn, huyện Đô Lương, tỉnh Nghệ An); Ngô Sĩ Liên, 'Đại Việt sử ký toàn thư' (Kỷ nhà Lý); Bùi Dương Lịch, 'Nghệ An ký' (NXB Khoa học Xã hội).",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL; 'Đại Việt sử ký toàn thư': Công trạng của Uy Minh Vương Lý Nhật Quang (hoàng tử thứ 8 vua Lý Thái Tổ) khai phá và củng cố phên dậu Nghệ An; Nghi thức rước thủy bộ từ đền Quả Sơn về chùa Bà Bụt tạ ơn ngày 20 tháng Giêng.",
  localCommunity: "Nhân dân xã Bồi Sơn, huyện Đô Lương và đồng bào các huyện lân cận tỉnh Nghệ An"
};

fs.writeFileSync(b11Path, JSON.stringify(b11, null, 2), "utf8");
console.log("Updated Batch 011 successfully!");

// ==========================================
// BATCH 012: Thắng cảnh, Thể thao dân gian & Ven biển
// ==========================================
const b12Path = path.join(batchesDir, "batch-012.json");
const b12 = JSON.parse(fs.readFileSync(b12Path, "utf8"));

// 1. le-hoi-chua-thay-ha-noi
b12[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2408/QĐ-TTg & Tác phẩm thiền tông cổ 'Thiền uyển tập anh'",
  sourceAuthor: "Thủ tướng Chính phủ; Khuyết danh; GS. Trần Lâm Biền",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 2408/QĐ-TTg ngày 31/12/2014 xếp hạng Di tích quốc gia đặc biệt Di tích kiến trúc nghệ thuật Chùa Thầy và khu vực núi đá Sài Sơn (xã Sài Sơn, huyện Quốc Oai, Hà Nội); 'Thiền uyển tập anh' (Bản dịch Lê Mạnh Thát, NXB TP.HCM); Trần Lâm Biền, 'Chùa Việt' (NXB Văn hóa Thông tin).",
  sourceLocator: "Quyết định số 2408/QĐ-TTg; 'Thiền uyển tập anh': Tiểu sử Thiền sư Từ Đạo Hạnh thời Lý; Hồ sơ di tích: Kiến trúc chữ Tam, nhà thủy đình múa rối nước trên hồ Long Trì và lễ tắm tượng ngày mùng 7 tháng 3 âm lịch.",
  localCommunity: "Nhân dân xã Sài Sơn, huyện Quốc Oai, Hà Nội và khách hành hương Phật tử thập phương"
};

// 2. le-hoi-chua-tay-phuong
b12[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2408/QĐ-TTg & Quyết định Bảo vật quốc gia Bộ tượng Phật Chùa Tây Phương",
  sourceAuthor: "Thủ tướng Chính phủ; Chu Quang Trứ; Nguyễn Du Chi",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 2408/QĐ-TTg ngày 31/12/2014 xếp hạng Di tích quốc gia đặc biệt Di tích kiến trúc nghệ thuật Chùa Tây Phương (xã Thạch Xá, huyện Thạch Thất, Hà Nội); Thủ tướng Chính phủ, Quyết định số 53/QĐ-TTg ngày 14/01/2015 công nhận Bộ tượng Phật thời Tây Sơn tại chùa Tây Phương là Bảo vật quốc gia; Chu Quang Trứ, 'Tượng Phật chùa Tây Phương' (NXB Mỹ thuật).",
  sourceLocator: "Quyết định số 2408/QĐ-TTg; Quyết định số 53/QĐ-TTg (Bảo vật quốc gia Đợt 3); Chu Quang Trứ: Nghệ thuật điêu khắc gỗ mít sơn thếp tuyệt tác thế kỷ XVIII (tượng Tuyết Sơn, Bát bộ Kim Cương, 18 vị La Hán biểu cảm nội tâm thâm trầm), tr. 45-89.",
  localCommunity: "Nhân dân xã Thạch Xá, huyện Thạch Thất, Hà Nội và du khách thập phương"
};

// 3. le-hoi-chua-huong-ha-noi
b12[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2082/QĐ-TTg & Thi phẩm 'Hương Sơn phong cảnh ca' (Chu Mạnh Trinh)",
  sourceAuthor: "Thủ tướng Chính phủ; Chu Mạnh Trinh; GS. Trần Quốc Vượng",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 2082/QĐ-TTg ngày 25/12/2017 xếp hạng Di tích quốc gia đặc biệt Quần thể danh lam thắng cảnh Hương Sơn (xã Hương Sơn, huyện Mỹ Đức, Hà Nội); Chu Mạnh Trinh, 'Hương Sơn phong cảnh ca' (1900); Trần Quốc Vượng, 'Địa danh và huyền tích chùa Hương' (NXB Văn hóa).",
  sourceLocator: "Quyết định số 2082/QĐ-TTg; Hồ sơ danh lam thắng cảnh Hương Sơn: Hành trình chèo thuyền suối Yến, động Hương Tích ('Nam thiên đệ nhất động'), chùa Thiên Trù và lễ khai hội ngày mùng 6 tháng Giêng.",
  localCommunity: "Nhân dân xã Hương Sơn, huyện Mỹ Đức, Hà Nội và phật tử hành hương cả nước"
};

// 4. le-hoi-phao-dat-hai-duong
b12[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Khảo cứu 'Địa chí Hải Dương'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Ban Địa chí Hải Dương",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Trò chơi dân gian Pháo đất tỉnh Hải Dương, huyện Ninh Giang và Tứ Kỳ); 'Địa chí Hải Dương' (Tập Văn hóa Dân gian, NXB Chính trị Quốc gia, 2008); Tạp chí Di sản Văn hóa.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Hồ sơ di sản phi vật thể quốc gia: Kỹ thuật nhào luyện đất sét dẻo quánh, tạo hình thân pháo hình bầu dục nặng từ 50-80kg, kỹ thuật bấm mép manh pháo và thao tác gieo pháo úp sấm vang dội ngày hội xuân.",
  localCommunity: "Cộng đồng pháo thủ các xã Nghĩa An, Tân Hương (Ninh Giang), Đại Hợp (Tứ Kỳ), tỉnh Hải Dương"
};

// 5. le-hoi-vat-lang-mai-dong
b12[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di tích Đình - Đền Mai Động & Địa chí 'Đại Nam nhất thống chí' (Tỉnh Hà Nội)",
  sourceAuthor: "Quốc sử quán triều Nguyễn; Sở Văn hóa và Thể thao Hà Nội",
  bibliography: "Sở VHTT Hà Nội, Hồ sơ di tích lịch sử đình - đền Mai Động (phường Mai Động, quận Hoàng Mai, Hà Nội); Quốc sử quán triều Nguyễn, 'Đại Nam nhất thống chí' (mục Tỉnh Hà Nội); Tạp chí Thể thao, chuyên đề 'Đặc trưng đòn thế sới vật Mai Động'.",
  sourceLocator: "Hồ sơ di tích đình Mai Động: Tưởng niệm tướng quân Tam Trinh thời Hai Bà Trưng dạy võ lập sới vật kén quân; Kỹ thuật các miếng đòn vật dân tộc (ngáng, bốc, sườn, quăng) và tinh thần thượng võ sới vật đầu xuân từ mùng 4 đến mùng 6 tháng Giêng.",
  localCommunity: "Cộng đồng nhân dân làng Mai Động, phường Mai Động, quận Hoàng Mai, Hà Nội"
};

// 6. le-hoi-dua-thuyen-tren-song-han
b12[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Kỷ yếu Lễ hội Đua thuyền sông Hàn & Chuyên khảo 'Văn hóa dân gian xứ Quảng'",
  sourceAuthor: "Sở Văn hóa và Thể thao thành phố Đà Nẵng; Nguyễn Sinh Duy",
  bibliography: "Sở VHTT TP Đà Nẵng, Kỷ yếu 'Lễ hội đua thuyền truyền thống trên sông Hàn'; Nguyễn Sinh Duy, 'Văn hóa dân gian xứ Quảng' (NXB Đà Nẵng, 2003); Tạp chí Non Nước, bài 'Hào khí đua thuyền sông Hàn Đà Nẵng'.",
  sourceLocator: "Kỷ yếu Sở VHTT Đà Nẵng: Lịch sử lễ hội đua thuyền cầu an, cầu mùa cá thuận buồm xuôi gió của ngư dân ven vịnh Đà Nẵng; Thể thức thi đấu thuyền rồng trên sông Hàn và nhịp chèo dũng mãnh của ngư dân miền Trung.",
  localCommunity: "Cộng đồng ngư dân và nhân dân các quận Liên Chiểu, Sơn Trà, Hải Châu, Ngũ Hành Sơn, thành phố Đà Nẵng"
};

// 7. le-hoi-ruoc-muc-dong-da-nang
b12[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ phục dựng lễ hội truyền thống Rước Mục Đồng & 'Lễ hội nông nghiệp miền Trung'",
  sourceAuthor: "Bảo tàng Đà Nẵng; Huỳnh Ngọc Trảng; Hội đồng Chư tộc Làng Phong Lệ",
  bibliography: "Bảo tàng Đà Nẵng, Hồ sơ phục dựng di sản văn hóa phi vật thể 'Lễ hội Rước Mục Đồng làng Phong Lệ' (xã Hòa Phước, huyện Hòa Vang, TP Đà Nẵng); Huỳnh Ngọc Trảng, 'Lễ hội nông nghiệp miền Trung' (NXB Văn hóa Dân tộc); Tạp chí Di sản Văn hóa.",
  sourceLocator: "Hồ sơ phục dựng di sản Bảo tàng Đà Nẵng: Huyền tích cồn Thần làng Phong Lệ tôn vinh trẻ chăn trâu (mục đồng); Trình tự đám rước mục đồng từ cồn Thần về đình làng ngày cuối tháng Ba âm lịch với trang phục áo dài khăn đóng mộc mạc.",
  localCommunity: "Cộng đồng nhân dân làng cổ Phong Lệ, xã Hòa Phước, huyện Hòa Vang, thành phố Đà Nẵng"
};

// 8. le-hoi-bap-non-hoi-an
b12[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1765/QĐ-BVHTTDL & Hồ sơ di sản Nghề trồng rau truyền thống Trà Quế",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Trung tâm QLBT Di sản Văn hóa Hội An",
  bibliography: "Bộ VHTTDL, Quyết định số 1765/QĐ-BVHTTDL ngày 27/05/2021 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề trồng rau truyền thống Trà Quế, xã Cẩm Hà, thành phố Hội An, tỉnh Quảng Nam); Địa chí Hội An; UBND thành phố Hội An.",
  sourceLocator: "Quyết định số 1765/QĐ-BVHTTDL; Hồ sơ di sản quốc gia: Nghi thức Lễ Cầu bông mùng 7 tháng Giêng tạ ơn tiền hiền khai hoang làng rau; Kỹ thuật bón rong vớt từ đầm Trà Quế tạo nên hương vị cay nồng thanh nhẹ đặc trưng của rau thơm Hội An.",
  localCommunity: "Cộng đồng nông dân làng rau Trà Quế, xã Cẩm Hà, thành phố Hội An, tỉnh Quảng Nam"
};

// 9. le-hoi-katun-nguoi-raglai
b12[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Chuyên khảo 'Văn hóa Raglai ở Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Phan Xuân Biên; Bảo tàng tỉnh Khánh Hòa",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghệ thuật diễn tấu Mã la của người Raglai huyện Khánh Sơn, tỉnh Khánh Hòa); Phan Xuân Biên, 'Văn hóa Raglai ở Việt Nam' (NXB Khoa học Xã hội, 1998); Tạp chí Dân tộc học.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; 'Văn hóa Raglai ở Việt Nam': Nghi lễ tạ ơn Yang lúa (Katun), cấu trúc bộ chiêng đồng Mã la không núm và điệu múa cúng mừng mùa rẫy bội thu trên triền núi Khánh Sơn, tr. 140-175.",
  localCommunity: "Đồng bào dân tộc Raglai tại các xã vùng cao huyện Khánh Sơn và Khánh Vĩnh, tỉnh Khánh Hòa"
};

// 10. le-hoi-dinh-co-long-hai
b12[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 266/QĐ-BVHTTDL & Khảo cứu 'Lễ hội dân gian Nam Bộ'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Thạch Phương; Ban Quản lý Di tích Dinh Cô",
  bibliography: "Bộ VHTTDL, Quyết định số 266/QĐ-BVHTTDL ngày 04/02/2022 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội truyền thống Dinh Cô, thị trấn Long Hải, huyện Long Điền, tỉnh Bà Rịa - Vũng Tàu); Thạch Phương, 'Lễ hội dân gian Nam Bộ' (NXB Khoa học Xã hội, 1992); Tạp chí Văn hóa Nam Bộ.",
  sourceLocator: "Quyết định số 266/QĐ-BVHTTDL; Hồ sơ di sản quốc gia: Huyền tích cô gái Lê Thị Hồng Thủy (Cô Chiêm) trôi dạt vào bờ biển Long Hải thế kỷ XVIII; Trình tự nghi lễ Nghinh Cô trên biển rạng sáng ngày 12 tháng 2 âm lịch của vạn chài miền Đông.",
  localCommunity: "Cộng đồng ngư dân thị trấn Long Hải, huyện Long Điền và tỉnh Bà Rịa - Vũng Tàu"
};

fs.writeFileSync(b12Path, JSON.stringify(b12, null, 2), "utf8");
console.log("Updated Batch 012 successfully!");
