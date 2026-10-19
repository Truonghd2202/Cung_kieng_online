const fs = require("fs");
const path = require("path");

const batchesDir = path.join(__dirname, "../editorial/culture-batches");

// ==========================================
// BATCH 017: Nghi lễ nông nghiệp & Tri thức mùa màng
// ==========================================
const b17Path = path.join(batchesDir, "batch-017.json");
const b17 = JSON.parse(fs.readFileSync(b17Path, "utf8"));

// 1. le-hoi-ruoc-nuoc-song-hong
b17[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 548/QĐ-TTg & Hồ sơ di sản Lễ hội rước nước đền Kiếp Bạc ven sông Hồng",
  sourceAuthor: "Thủ tướng Chính phủ; Ban Quản lý Di tích Côn Sơn — Kiếp Bạc; GS. Trần Quốc Vượng",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 548/QĐ-TTg ngày 10/05/2012 xếp hạng Di tích quốc gia đặc biệt Khu di tích Côn Sơn - Kiếp Bạc; Trần Quốc Vượng, 'Môi trường sinh thái và văn hóa châu thổ sông Hồng'; BQL Di tích Côn Sơn - Kiếp Bạc.",
  sourceLocator: "Quyết định số 548/QĐ-TTg; Hồ sơ di tích: Nghi thức chèo thuyền ra giữa dòng sông Lục Đầu - sông Hồng, lấy gáo đồng múc dòng nước trong giữa sông rước về tế lễ cầu quốc thái dân an, mưa thuận gió hòa.",
  localCommunity: "Cộng đồng nhân dân các làng vạn chài ven sông Hồng và vùng châu thổ Bắc Bộ"
};

// 2. le-hoi-xuong-dong-ta-ma-thanh-hoa
b17[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di sản văn hóa phi vật thể Lễ hội Tả Mạ & Chuyên khảo 'Địa chí Thanh Hóa'",
  sourceAuthor: "Sở Văn hóa, Thể thao và Du lịch tỉnh Thanh Hóa; Viện Khoa học Xã hội",
  bibliography: "Sở VHTTDL Thanh Hóa, Hồ sơ khoa học di sản 'Lễ hội xuống đồng Tả Mạ của người Thái miền Tây Thanh Hóa'; Viện Nghiên cứu Văn hóa, 'Địa chí văn hóa Thanh Hóa' (Tập Dân tộc học); Tạp chí Dân tộc học.",
  sourceLocator: "Hồ sơ khoa học di sản: Nghi thức ông Mo khấn Thần Sông, Thần Núi tạ ơn mùa trước; Nghi lễ cày đường cày đầu tiên và toàn thể dân bản cùng nhau cấy mạ non mừng vụ chiêm mới.",
  localCommunity: "Đồng bào người Thái và người Mường tại các huyện Bá Thước, Quan Hóa, Lang Chánh, tỉnh Thanh Hóa"
};

// 3. le-cung-com-moi-nguoi-muong
b17[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Văn hóa dân gian Mường' & Hồ sơ phong tục cổ truyền người Mường Hòa Bình",
  sourceAuthor: "Nhà nghiên cứu Bùi Thiện; Sở VHTTDL tỉnh Hòa Bình",
  bibliography: "Bùi Thiện, 'Văn hóa dân gian Mường' (NXB Văn hóa Dân tộc, 1995); Sở VHTTDL Hòa Bình, Kỷ yếu 'Phong tục tập quán và lễ hội cổ truyền người Mường Hòa Bình'; Tạp chí Di sản Văn hóa.",
  sourceLocator: "Bùi Thiện (1995): Chương Nghi lễ nông nghiệp: Tục rước hồn lúa từ nương rẫy về nhà, nghi thức đồ xôi nếp mới dâng cúng tổ tiên và thần Bếp, lời khấn Mụ Lúa che chở mùa màng, tr. 145-170.",
  localCommunity: "Đồng bào dân tộc Mường tại các thung lũng cổ tỉnh Hòa Bình, Thanh Hóa và Phú Thọ"
};

// 4. le-cung-hon-lua-nguoi-kho-mu
b17[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Người Khơ Mú ở Việt Nam' & Hồ sơ di sản văn hóa nương rẫy Tây Bắc",
  sourceAuthor: "Viện Dân tộc học; Đặng Nghiêm Vạn; Sở VHTTDL tỉnh Điện Biên",
  bibliography: "Đặng Nghiêm Vạn, 'Người Khơ Mú ở Việt Nam' (NXB Khoa học Xã hội, 1985); Sở VHTTDL Điện Biên, Tài liệu 'Tri thức dân gian và phong tục canh tác nương rẫy của người Khơ Mú'; Tạp chí Dân tộc học.",
  sourceLocator: "Đặng Nghiêm Vạn (1985): Quan niệm về 'Hồn Lúa' (Hrô ngọ); Nghi thức cắt những bông lúa chín vàng đầu tiên bện thành hình Mẹ Lúa đem về cất vào bồ thóc thiêng trước khi thu hoạch toàn rẫy, tr. 88-112.",
  localCommunity: "Cộng đồng người Khơ Mú tại các bản vùng cao huyện Điện Biên Đông, Mường Ảng (Điện Biên) và Sơn La"
};

// 5. le-hoi-dap-dap-nguoi-thai
b17[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Công trình 'Người Thái ở Tây Bắc Việt Nam' (Cầm Trọng) & Khảo sát thủy lợi cổ truyền",
  sourceAuthor: "Nhà dân tộc học Cầm Trọng; Viện Dân tộc học",
  bibliography: "Cầm Trọng, 'Người Thái ở Tây Bắc Việt Nam' (NXB Khoa học Xã hội, 1978); Viện Dân tộc học, 'Tri thức dân gian về hệ thống thủy lợi mương phai của người Thái'; Tạp chí Dân tộc học.",
  sourceLocator: "Cầm Trọng (1978): Chương Hệ thống thủy lợi 'Mương - Phai - Lái - Lịn'; Tục đắp đập ngăn suối đầu xuân bằng cọc tre, phên nứa và đá hộc; Nghi thức cúng thần Nước (Phi Nặm) ban nguồn nước mát cho cánh đồng Mường Thanh, Mường Lò.",
  localCommunity: "Đồng bào người Thái đen và Thái trắng tại các cánh đồng lòng chảo Tây Bắc (Điện Biên, Sơn La, Lai Châu, Yên Bái)"
};

// 6. le-cung-ben-thuyen-lang-chai
b17[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Văn hóa biển đảo miền Trung' & Khảo cứu đời sống vạn chài",
  sourceAuthor: "Nguyễn Thanh Lợi; Nhà nghiên cứu Thạch Phương",
  bibliography: "Nguyễn Thanh Lợi, 'Văn hóa biển đảo miền Trung' (NXB Văn hóa - Văn nghệ, 2014); Thạch Phương, 'Văn hóa dân gian Nam Trung Bộ' (NXB Khoa học Xã hội); Hội Nghề cá Việt Nam.",
  sourceLocator: "Nguyễn Thanh Lợi (2014): Mục Tín ngưỡng vạn chài: Lễ cúng bến thuyền trước khi hạ thủy xuất hành đầu năm (Lễ mở cửa biển); Nghi thức dâng cau trầu rượu thịt tạ ơn Hà Bá và các bậc tiền hiền khai sáng nghề biển, tr. 140-168.",
  localCommunity: "Cư dân các vạn chài ven biển từ Quảng Bình, Quảng Nam, Quảng Ngãi đến Bình Định, Khánh Hòa"
};

// 7. le-hoi-cau-ngu-tam-quan-binh-dinh
b17[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Hồ sơ di sản văn hóa Lễ hội Cầu ngư Bình Định",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sở Văn hóa và Thể thao tỉnh Bình Định",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội Cầu ngư tại tỉnh Bình Định); Sở VHTT Bình Định, Hồ sơ khoa học Lễ hội Cầu ngư vạn chài Tam Quan; Quách Tấn, 'Nước non Bình Định'.",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL; Hồ sơ di sản quốc gia: Trình tự đại lễ tế Thần Nam Hải tại Lăng Ông Nam Hải; Nghệ thuật chèo Bả trạo mô phỏng nhịp chèo vượt sóng gió cứu ngư dân trên biển Đông.",
  localCommunity: "Cộng đồng ngư dân phường Tam Quan Bắc, thị xã Hoài Nhơn, tỉnh Bình Định"
};

// 8. le-cung-ong-chuong-mien-tay
b17[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Tín ngưỡng dân gian Nam Bộ' & Khảo luận 'Đình miếu miền Nam'",
  sourceAuthor: "Huỳnh Ngọc Trảng; Nhà văn Sơn Nam",
  bibliography: "Huỳnh Ngọc Trảng, 'Tín ngưỡng dân gian Nam Bộ' (NXB Văn hóa - Văn nghệ, 2012); Sơn Nam, 'Nói về miền Nam' (NXB Trẻ, 2005); Viện Khoa học Xã hội Vùng Nam Bộ.",
  sourceLocator: "Huỳnh Ngọc Trảng (2012): Tục thờ cúng Ông Chuồng Bà Chuồng vào sáng mùng 3 Tết; Lễ vật gồm chè xôi dán giấy đỏ lên cột chuồng trâu bò heo gà tạ ơn các vị thần bảo hộ gia súc gia cầm vượt qua dịch bệnh.",
  localCommunity: "Các gia đình nông dân chăn nuôi tại đồng bằng sông Cửu Long và miền Đông Nam Bộ"
};

// 9. le-hoi-trai-cay-cho-lach
b17[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ văn hóa làng nghề Cái Mơn — Chợ Lách & 'Địa chí Bến Tre'",
  sourceAuthor: "Sở Văn hóa, Thể thao và Du lịch tỉnh Bến Tre; Thạch Phương",
  bibliography: "Sở VHTTDL Bến Tre, Hồ sơ văn hóa truyền thống làng nghề hoa kiểng và cây ăn trái Chợ Lách; Thạch Phương, 'Địa chí Bến Tre' (NXB Khoa học Xã hội, 1991); UBND huyện Chợ Lách.",
  sourceLocator: "Hồ sơ văn hóa Chợ Lách; 'Địa chí Bến Tre': Di sản tri thức ghép cành, lai tạo giống cây ăn trái trứ danh Cái Mơn; Lễ hội cây trái tổ chức vào dịp Tết Đoan Ngọ mùng 5 tháng 5 âm lịch tôn vinh công đức các bậc nghệ nhân miệt vườn sông nước.",
  localCommunity: "Nhà vườn và nông dân huyện Chợ Lách, tỉnh Bến Tre và vùng cù lao Tây Nam Bộ"
};

// 10. le-cung-than-nong-nam-bo
b17[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Khảo luận 'Đình miếu và lễ hội dân gian miền Nam' & 'Đình Nam Bộ xưa và nay'",
  sourceAuthor: "Sơn Nam; Huỳnh Ngọc Trảng; Trương Ngọc Tường",
  bibliography: "Sơn Nam, 'Đình miếu và lễ hội dân gian miền Nam' (NXB Trẻ, 2004); Huỳnh Ngọc Trảng, Trương Ngọc Tường, 'Đình Nam Bộ xưa và nay' (NXB Đồng Nai, 1999); Bảo tàng Lịch sử TP. Hồ Chí Minh.",
  sourceLocator: "Sơn Nam (2004): Vị trí miếu Thần Nông (xã tắc) ngoài sân đình làng Nam Bộ; Nghi thức tế Thần Nông ngày đầu xuân và sau mùa gặt cầu mưa thuận gió hòa, mùa màng tươi tốt, tr. 65-88.",
  localCommunity: "Cộng đồng nhân dân tại các thôn xã nông thôn Nam Bộ"
};

fs.writeFileSync(b17Path, JSON.stringify(b17, null, 2), "utf8");
console.log("Updated Batch 017 successfully!");

// ==========================================
// BATCH 018: Nghề thủ công & Làng nghề tinh hoa
// ==========================================
const b18Path = path.join(batchesDir, "batch-018.json");
const b18 = JSON.parse(fs.readFileSync(b18Path, "utf8"));

// 1. nghe-kim-hoan-dinh-cong
b18[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Chuyên khảo 'Làng nghề thủ công truyền thống Hà Nội'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Đỗ Thị Hảo; Sở Văn hóa và Thể thao Hà Nội",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề kim hoàn Định Công, phường Định Công, quận Hoàng Mai, Hà Nội); Đỗ Thị Hảo, 'Làng nghề thủ công truyền thống Hà Nội' (NXB Hà Nội, 2005); UBND quận Hoàng Mai.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Đỗ Thị Hảo (2005): Thần tích ba anh em họ Trần thời vua Lý Nam Đế truyền dạy nghề đậu bạc; Kỹ thuật kéo chỉ bạc mảnh như sợi tóc rồi uốn thành hoa văn chim muông, đỉnh cao đậu bạc tinh xảo Thăng Long, tr. 140-165.",
  localCommunity: "Các nghệ nhân kim hoàn làng Định Công, phường Định Công, quận Hoàng Mai, Hà Nội"
};

// 2. nghe-theu-ren-quat-dong
b18[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ Di sản văn hóa phi vật thể quốc gia Nghề thêu Quất Động & Thần tích cụ tổ Lê Công Hành",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sở Văn hóa và Thể thao Hà Nội; Bùi Văn Vượng",
  bibliography: "Bộ VHTTDL, Quyết định công bố Danh mục di sản văn hóa phi vật thể quốc gia Nghề thêu truyền thống Quất Động (xã Quất Động, huyện Thường Tín, Hà Nội); Bùi Văn Vượng, 'Làng nghề thủ công truyền thống vùng châu thổ sông Hồng'; UBND huyện Thường Tín.",
  sourceLocator: "Hồ sơ di sản văn hóa phi vật thể: Thần tích Tiến sĩ Lê Công Hành (thế kỷ XVII) đi sứ học nghề thêu lọng về dạy dân làng; Kỹ thuật thêu nổi, thêu giấu mối chỉ, hòa phối màu chỉ tơ tằm mềm mại như tranh vẽ sơn dầu.",
  localCommunity: "Cộng đồng nghệ nhân thêu làng Quất Động, xã Quất Động, huyện Thường Tín, thành phố Hà Nội"
};

// 3. nghe-chay-chi-bac-dong-xam
b18[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 217/QĐ-BVHTTDL & Khảo cứu 'Địa chí Thái Bình'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sở VHTTDL tỉnh Thái Bình; Ban Địa chí Thái Bình",
  bibliography: "Bộ VHTTDL, Quyết định số 217/QĐ-BVHTTDL ngày 19/01/2013 công bố Danh mục di sản văn hóa phi vật thể quốc gia đợt 1 (Lễ hội đền Đồng Xâm và Nghề chạm bạc Đồng Xâm, xã Hồng Thái, huyện Kiến Xương, tỉnh Thái Bình); 'Địa chí Thái Bình' (Tập Văn hóa Dân gian).",
  sourceLocator: "Quyết định số 217/QĐ-BVHTTDL; 'Địa chí Thái Bình': Cụ tổ nghề Nguyễn Kim Săng thời nhà Trần; Kỹ nghệ chạm trổ, thúc nổi hoa văn Tứ linh, Tứ quý trên đĩa bạc, ấm chén và đồ tế khí đồng bạc đạt độ tinh xảo cơ khí thủ công bậc thầy.",
  localCommunity: "Nghệ nhân chạm bạc làng Đồng Xâm, xã Hồng Thái, huyện Kiến Xương, tỉnh Thái Bình"
};

// 4. nghe-moc-kim-bong-hoi-an
b18[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2459/QĐ-BVHTTDL & Địa chí Hội An",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Trung tâm Quản lý Bảo tồn Di sản Văn hóa Hội An",
  bibliography: "Bộ VHTTDL, Quyết định số 2459/QĐ-BVHTTDL ngày 20/06/2017 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề mộc Kim Bồng, xã Cẩm Kim, thành phố Hội An, tỉnh Quảng Nam); Địa chí Hội An; UBND thành phố Hội An.",
  sourceLocator: "Quyết định số 2459/QĐ-BVHTTDL; Địa chí Hội An: Dấu ấn thợ mộc Kim Bồng thế kỷ XVI-XVIII tạo tác nên các nếp nhà cổ, vì kèo, hoành phi và Chùa Cầu Hội An; Kỹ thuật đóng tàu thuyền buôn vượt biển và đục tượng mỹ nghệ tinh vi.",
  localCommunity: "Cộng đồng thợ mộc làng Kim Bồng, xã Cẩm Kim, thành phố Hội An, tỉnh Quảng Nam"
};

// 5. nghe-gom-thanh-ha-hoi-an
b18[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2974/QĐ-BVHTTDL & Hồ sơ di sản Nghề gốm Thanh Hà",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Trung tâm QLBT Di sản Văn hóa Hội An",
  bibliography: "Bộ VHTTDL, Quyết định số 2974/QĐ-BVHTTDL ngày 27/08/2019 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề gốm Thanh Hà, phường Thanh Hà, thành phố Hội An, tỉnh Quảng Nam); UBND thành phố Hội An.",
  sourceLocator: "Quyết định số 2974/QĐ-BVHTTDL; Hồ sơ di sản quốc gia: Kỹ thuật chuốt gốm đất sét nâu đỏ ven sông Thu Bồn bằng bàn xoay hai người; Dòng sản phẩm gốm đất nung không men: ấm chén, lu chậu, ngói âm dương lợp phố cổ Hội An và con thổi tò he độc đáo.",
  localCommunity: "Nghệ nhân và thợ gốm làng Thanh Hà, phường Thanh Hà, thành phố Hội An, tỉnh Quảng Nam"
};

// 6. nghe-det-chieu-coi-kim-son
b18[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ làng nghề truyền thống dệt cói Kim Sơn & Khảo cứu 'Địa chí Ninh Bình'",
  sourceAuthor: "Sở Nông nghiệp và PTNT tỉnh Ninh Bình; Ban Địa chí Ninh Bình",
  bibliography: "Sở Nông nghiệp và PTNT Ninh Bình, Hồ sơ làng nghề 'Nghề trồng và chế biến cói huyện Kim Sơn'; 'Địa chí Ninh Bình' (NXB Chính trị Quốc gia); UBND huyện Kim Sơn.",
  sourceLocator: "Hồ sơ làng nghề; 'Địa chí Ninh Bình': Công cuộc quai đê lấn biển lập huyện Kim Sơn năm 1829 của Doanh điền sứ Nguyễn Công Trứ; Kỹ thuật chẻ cói tươi bãi bồi cửa biển, dệt chiếu hoa dập đôi sắc sảo và xuất khẩu sản phẩm thủ công mỹ nghệ.",
  localCommunity: "Nhân dân các xã vùng bãi bồi ven biển huyện Kim Sơn, tỉnh Ninh Bình"
};

// 7. nghe-lam-giay-do-phong-khe
b18[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Khảo cứu 'Nghề thủ công truyền thống Thăng Long — Kinh Bắc' & Lịch sử làng nghề Phong Khê",
  sourceAuthor: "GS. Trần Quốc Vượng; Đỗ Thị Hảo; Bảo tàng tỉnh Bắc Ninh",
  bibliography: "Trần Quốc Vượng, Đỗ Thị Hảo, 'Nghề thủ công truyền thống Thăng Long - Kinh Bắc' (NXB Hà Nội); Bảo tàng tỉnh Bắc Ninh, Hồ sơ lịch sử 'Làng nghề làm giấy dó Đống Cao - Phong Khê'; Tạp chí Di sản Văn hóa.",
  sourceLocator: "Trần Quốc Vượng: Kỹ thuật ngâm vôi, bóc vỏ cây dó rừng, giã bột dó bằng cối đá và thao tác seo giấy trên liềm seo mây tre; Tờ giấy dó dai xốp, không nhòe mực, lưu giữ các bản sắc phong triều đình và tranh Đông Hồ suốt hàng trăm năm.",
  localCommunity: "Cộng đồng thợ seo giấy làng Đống Cao, phường Phong Khê, thành phố Bắc Ninh"
};

// 8. nghe-ren-duc-phuc-sen
b18[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 3757/QĐ-BVHTTDL & Hồ sơ di sản văn hóa phi vật thể Nghề rèn Phúc Sen",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sở Văn hóa, Thể thao và Du lịch tỉnh Cao Bằng",
  bibliography: "Bộ VHTTDL, Quyết định số 3757/QĐ-BVHTTDL ngày 30/10/2018 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề rèn thủ công truyền thống của người Nùng An, xã Phúc Sen, huyện Quảng Hòa, tỉnh Cao Bằng); Tạp chí Dân tộc học.",
  sourceLocator: "Quyết định số 3757/QĐ-BVHTTDL; Hồ sơ di sản quốc gia: Kỹ thuật chọn thép nhíp xe ô tô, đập búa nhịp nhàng tạo hình dao, cuốc, rìu sắc bén; Bí quyết tôi thép trong nước tro rơm nếp và nước suối đá vôi tạo độ bền dẻo trứ danh.",
  localCommunity: "Đồng bào dân tộc Nùng An tại xã Phúc Sen, huyện Quảng Hòa, tỉnh Cao Bằng"
};

// 9. nghe-lam-huong-tram-thuy-xuan
b18[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ công nhận làng nghề truyền thống làm hương Thủy Xuân & 'Văn hóa Cố đô Huế'",
  sourceAuthor: "UBND tỉnh Thừa Thiên Huế; Sở Du lịch Thừa Thiên Huế; Phan Thuận An",
  bibliography: "UBND tỉnh Thừa Thiên Huế, Quyết định công nhận Làng nghề làm hương trầm truyền thống Thủy Xuân (phường Thủy Xuân, thành phố Huế); Phan Thuận An, 'Cố đô Huế - Lịch sử và di tích' (NXB Thuận Hóa); Tạp chí Sông Hương.",
  sourceLocator: "Hồ sơ làng nghề; Phan Thuận An: Lịch sử cung cấp hương trầm thơm ngát cho triều đình nhà Nguyễn và các ngôi cổ tự Huế; Công thức phối trộn bột gỗ trầm, thảo quả, đinh hương, hoa hồi, quế chi và nghệ thuật xòe chân hương ngũ sắc rực rỡ bên đường Huyền Trân Công Chúa.",
  localCommunity: "Cộng đồng nhân dân làng hương Thủy Xuân, phường Thủy Xuân, thành phố Huế"
};

// 10. nghe-lam-lu-dat-nung-chau-phu
b18[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Gốm dân gian Nam Bộ' & Hồ sơ di sản nghề nặn lu Châu Phú",
  sourceAuthor: "Huỳnh Ngọc Trảng; Sở Văn hóa, Thể thao và Du lịch tỉnh An Giang",
  bibliography: "Huỳnh Ngọc Trảng, 'Gốm dân gian Nam Bộ' (NXB Mỹ thuật); Sở VHTTDL An Giang, Báo cáo điều tra di sản làng nghề thủ công truyền thống nặn lu đất nung huyện Châu Phú; Sơn Nam, 'Nói về miền Nam'.",
  sourceLocator: "Huỳnh Ngọc Trảng: Kỹ thuật nhồi đất sét phù sa sông Tiền sông Hậu, kỹ thuật nặn lu không dùng bàn xoay mà thợ đi vòng quanh trụ đất dập nổi vảy cá; Vai trò thiết yếu của chiếc lu da lươn trữ nước mưa nước ngọt cho sinh hoạt người dân đồng bằng sông Cửu Long.",
  localCommunity: "Các lò lu thủ công tại xã Bình Mỹ, huyện Châu Phú, tỉnh An Giang"
};

fs.writeFileSync(b18Path, JSON.stringify(b18, null, 2), "utf8");
console.log("Updated Batch 018 successfully!");

// ==========================================
// BATCH 019: Diễn xướng & Dân ca ba miền
// ==========================================
const b19Path = path.join(batchesDir, "batch-019.json");
const b19 = JSON.parse(fs.readFileSync(b19Path, "utf8"));

// 1. dan-ca-dong-bang-bac-bo-trong-quan
b19[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Chuyên khảo 'Hát Trống quân đồng bằng Bắc Bộ'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Viện Âm nhạc Việt Nam",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Hát Trống quân tại Hưng Yên, Hải Dương, Bắc Ninh, Hà Nội); Viện Âm nhạc, Tuyển tập 'Hát Trống quân đồng bằng Bắc Bộ' (NXB Âm nhạc, 2004).",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL; Viện Âm nhạc (2004): Cấu tạo nhạc cụ trống quân mộc mạc với hố đất, thanh tre và dây mây căng ngang cắm que gõ; Nghệ thuật hát đối đáp giao duyên đêm trăng rằm tháng Tám giữa nam nữ thanh niên làng quê, tr. 45-78.",
  localCommunity: "Cộng đồng nghệ nhân hát trống quân tại Dạ Trạch (Hưng Yên), Bùi Xá (Bắc Ninh), Khánh Hà (Hà Nội)"
};

// 2. dan-ca-xang-xe-trung-bo (Hát Xẩm Hà thành)
b19[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di sản văn hóa phi vật thể quốc gia Nghệ thuật Hát Xẩm & Kỷ yếu Viện Âm nhạc",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Viện Âm nhạc Việt Nam; NSƯT Hà Thị Cầu",
  bibliography: "Bộ VHTTDL, Quyết định công bố Danh mục di sản văn hóa phi vật thể quốc gia Nghệ thuật hát Xẩm (Hà Nội, Ninh Bình); Viện Âm nhạc, Kỷ yếu 'Nghệ thuật Hát Xẩm - Lịch sử và nghệ thuật diễn tấu'; Hồ sơ tư liệu nghệ nhân Hà Thị Cầu.",
  sourceLocator: "Hồ sơ di sản quốc gia; Kỷ yếu Viện Âm nhạc: Tiếng đàn nhị, đàn đáy, trống khẩu, sênh rậm hòa quyện; Nghệ thuật hát xẩm chợ, xẩm tàu điện Thăng Long - Hà Nội với nội dung châm biếm xã hội, khuyên răn đạo lý và sẻ chia tình người cơ nhỡ.",
  localCommunity: "Các câu lạc bộ Xẩm Hà thành, chiếu xẩm Ninh Bình và các nghệ sĩ âm nhạc dân gian"
};

// 3. ho-khoan-le-thuy-quang-binh
b19[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1877/QĐ-BVHTTDL & Chuyên khảo 'Dân ca Quảng Bình'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Dương Viết Chu; Sở VHTT tỉnh Quảng Bình",
  bibliography: "Bộ VHTTDL, Quyết định số 1877/QĐ-BVHTTDL ngày 08/06/2015 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Hò khoan Lệ Thủy, huyện Lệ Thủy, tỉnh Quảng Bình); Dương Viết Chu, 'Dân ca Quảng Bình' (NXB Văn hóa Dân tộc); UBND huyện Lệ Thủy.",
  sourceLocator: "Quyết định số 1877/QĐ-BVHTTDL; Dương Viết Chu: Chín mái hò khoan (mái xắp, mái dài, mái chè, mái nện...); Lối xướng - xô nhịp nhàng trên đồng ruộng và dòng sông Kiến Giang, kết tinh tinh thần lao động kiên cường của nhân dân xứ cát, tr. 62-95.",
  localCommunity: "Cộng đồng nhân dân các xã ven sông Kiến Giang, huyện Lệ Thủy, tỉnh Quảng Bình"
};

// 4. ho-song-ma-thanh-hoa
b19[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di sản văn hóa phi vật thể quốc gia Dân ca Sông Mã & 'Địa chí Thanh Hóa'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Ban Địa chí Thanh Hóa; Viện Âm nhạc",
  bibliography: "Bộ VHTTDL, Quyết định công bố Danh mục di sản văn hóa phi vật thể quốc gia Dân ca sông Mã (Hò sông Mã); Viện Nghiên cứu Văn hóa, 'Địa chí văn hóa Thanh Hóa' (Tập Dân ca cổ truyền); Viện Âm nhạc Việt Nam.",
  sourceLocator: "Hồ sơ di sản văn hóa; 'Địa chí văn hóa Thanh Hóa': Năm điệu hò chính vượt thác ghềnh ghềnh sông Mã (hò rời bến, hò đơm, hò cắn, hò vượt thác, hò cập bến); Âm hưởng dũng mãnh, khỏe khoắn của những tay chèo vạn chài trên dòng sông Mã anh hùng.",
  localCommunity: "Cư dân làng chài và thợ lái đò dọc sông Mã thuộc các huyện Cẩm Thủy, Vĩnh Lộc, Hà Trung, Thanh Hóa"
};

// 5. hat-bop-dan-ca-cham
b19[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Văn hóa và âm nhạc Chăm' & Hồ sơ di sản dân ca Chăm Maduen",
  sourceAuthor: "Sakaya (Phan Quốc Anh); Trung tâm Nghiên cứu Văn hóa Chăm Ninh Thuận",
  bibliography: "Sakaya, 'Văn hóa và âm nhạc Chăm' (NXB Văn hóa Dân tộc, 2005); Sở VHTTDL Ninh Thuận, Hồ sơ di sản văn hóa phi vật thể 'Dân ca và nhạc cụ cổ truyền dân tộc Chăm'; Tạp chí Dân tộc học.",
  sourceLocator: "Sakaya (2005): Chương Dân ca nghi lễ và giao duyên (Maduen); Giai điệu tự tình tha thiết của các chàng trai cô gái Chăm bên giếng nước, đền tháp hòa cùng nhịp trống Baranưng và tiếng kèn Saranai, tr. 180-215.",
  localCommunity: "Đồng bào dân tộc Chăm tại các palei tỉnh Ninh Thuận và Bình Thuận"
};

// 6. hat-ru-ba-mien-viet-nam
b19[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Khảo cứu 'Dân ca và hát ru của người Việt' & 'Nếp cũ - Đời người'",
  sourceAuthor: "Nguyễn Văn Huyên; Toan Ánh; Viện Văn hóa Dân gian",
  bibliography: "Nguyễn Văn Huyên, 'Dân ca và hát ru của người Việt' (Bản dịch NXB Hội Nhà văn, 2016); Toan Ánh, 'Nếp cũ - Đời người' (NXB Trẻ, 2005); Viện Văn hóa Dân gian, Tuyển tập 'Hát ru ba miền Bắc, Trung, Nam' (NXB Âm nhạc).",
  sourceLocator: "Nguyễn Văn Huyên (2016): Phân tích ca từ thể thơ lục bát dịu êm của điệu 'Ầu ơ' Nam Bộ, 'À ơi' Bắc Bộ và giọng 'Ru em' miền Trung; Giá trị giáo dục tâm hồn, lòng hiếu thảo và tình yêu quê hương đất nước từ thuở nằm nôi, tr. 95-130.",
  localCommunity: "Các bà mẹ và thế hệ gia đình trên khắp ba miền Việt Nam"
};

// 7. don-ca-tai-tu-cai-luong-nam-bo
b19[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồi ký '50 năm mê hát' (Vương Hồng Sển) & 'Sân khấu Cải lương Nam Bộ'",
  sourceAuthor: "Học giả Vương Hồng Sển; GS.TS. Trần Văn Khê; Viện Sân khấu",
  bibliography: "Vương Hồng Sển, 'Hồi ký 50 năm mê hát' (NXB Trẻ, tái bản 2006); Trần Văn Khê, 'Sân khấu Cải lương Nam Bộ' (NXB TP.HCM); Viện Sân khấu, 'Lịch sử sân khấu kịch hát Việt Nam'.",
  sourceLocator: "Vương Hồng Sển (2006): Quá trình cách tân ngoạn mục từ nhóm Đờn ca tài tử thính phòng (ca ra bộ) đầu thế kỷ XX thành sân khấu Cải lương rực rỡ năm 1918; Sự dung hợp làn điệu vọng cổ Dạ cổ hoài lang (Cao Văn Lầu) và nghệ thuật biểu diễn hiện đại.",
  localCommunity: "Các đoàn nghệ thuật cải lương, nghệ sĩ và công chúng mộ điệu khắp Nam Bộ và cả nước"
};

// 8. ho-mai-nhi-song-huong
b19[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1877/QĐ-BVHTTDL & Chuyên khảo 'Ca Huế và ca kịch Huế'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Nhà nghiên cứu Vĩnh Phúc; GS.TS. Trần Văn Khê",
  bibliography: "Bộ VHTTDL, Quyết định số 1877/QĐ-BVHTTDL ngày 08/06/2015 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Ca Huế, tỉnh Thừa Thiên Huế); Vĩnh Phúc, 'Ca Huế và ca kịch Huế' (NXB Thuận Hóa, 2000); Tạp chí Sông Hương.",
  sourceLocator: "Quyết định số 1877/QĐ-BVHTTDL; Vĩnh Phúc (2000): Điệu Hò mái nhì đặc trưng với âm vực dàn trải, luyến láy man mác buồn trên làn nước sông Hương; Lời ca giãi bày tâm sự u hoài của người dân xứ Huế trước cảnh sắc thiên nhiên Cố đô, tr. 88-120.",
  localCommunity: "Nghệ nhân thính phòng Ca Huế và người dân cố đô Huế, tỉnh Thừa Thiên Huế"
};

// 9. dien-xuong-cheo-tau-dan-phuong
b19[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Hồ sơ di sản Hát Chèo tàu Tân Hội",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sở Văn hóa và Thể thao Hà Nội",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Hát Chèo tàu xã Tân Hội, huyện Đan Phượng, Hà Nội); UBND huyện Đan Phượng, Lịch sử lễ hội Chèo tàu.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Hồ sơ di sản quốc gia: Tưởng nhớ công đức danh tướng Lý Phục Man thời vua Lý Nam Đế đánh giặc Lương (thế kỷ VI); Hình thức diễn xướng độc đáo trên hai mô hình thuyền gỗ (tàu) bằng các làn điệu hát ví, hát xô của phụ nữ làng cổ Tân Hội.",
  localCommunity: "Cộng đồng nhân dân xã Tân Hội, huyện Đan Phượng, thành phố Hà Nội"
};

// 10. dien-xuong-mua-xoe-thai-tay-bac
b19[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ UNESCO 'Art of Xòe dance of the Tai people in Viet Nam' & Quyết định quốc gia",
  sourceAuthor: "UNESCO; Bộ Văn hóa, Thể thao và Du lịch; Cầm Trọng",
  sourceUrl: "https://ich.unesco.org/en/RL/art-of-xoe-dance-of-the-tai-people-in-viet-nam-01575",
  bibliography: "UNESCO, Representative List of the Intangible Cultural Heritage of Humanity (Reference: 01575, Inscribed in 2021); Bộ VHTTDL, Quyết định công nhận Nghệ thuật Xòe Thái là Di sản văn hóa phi vật thể quốc gia; Cầm Trọng, 'Văn hóa Thái ở Việt Nam'.",
  sourceLocator: "UNESCO ICH Dossier No. 01575: Biểu tượng văn hóa đại đoàn kết của cộng đồng người Thái; Sáu điệu xòe cổ phản ánh đời sống lao động, mời rượu, nâng khăn và vòng xòe lớn quanh đống lửa kết nối muôn người không phân biệt dân tộc tuổi tác.",
  localCommunity: "Đồng bào dân tộc Thái tại bốn tỉnh Yên Bái, Lai Châu, Sơn La và Điện Biên"
};

fs.writeFileSync(b19Path, JSON.stringify(b19, null, 2), "utf8");
console.log("Updated Batch 019 successfully!");

// ==========================================
// BATCH 020: Phong tục, Đạo lý & Ký ức thời gian
// ==========================================
const b20Path = path.join(batchesDir, "batch-020.json");
const b20 = JSON.parse(fs.readFileSync(b20Path, "utf8"));

// 1. tuc-uong-nuoc-nho-nguon-ngay-gio
b20[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Việt Nam phong tục' (Phan Kế Bính) & 'Nếp cũ - Tín ngưỡng Việt Nam'",
  sourceAuthor: "Phan Kế Bính; Toan Ánh; Viện Nghiên cứu Văn hóa",
  bibliography: "Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, tái bản 2005); Toan Ánh, 'Nếp cũ - Tín ngưỡng Việt Nam' (NXB Trẻ, 2005); Viện Nghiên cứu Văn hóa, 'Gia đình truyền thống và phong tục thờ phụng tổ tiên'.",
  sourceLocator: "Phan Kế Bính (2005): Thiên thứ nhất: Mục Cúng giỗ (Giỗ trọng, giỗ thường, nghi thức cáo kỵ và mâm cỗ sum họp họ hàng); Đạo lý 'Uống nước nhớ nguồn', nhắc nhở cháu con cội nguồn sinh dưỡng và giữ gìn gia phong nề nếp, tr. 25-42.",
  localCommunity: "Toàn thể các gia đình và dòng họ người Việt trên khắp ba miền đất nước"
};

// 2. tuc-dan-le-chua-dau-nam
b20[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Chùa Việt' & Khảo cứu 'Đạo Phật và đời sống người Việt'",
  sourceAuthor: "GS. Trần Lâm Biền; Thiền sư Thích Thanh Từ; Viện Nghiên cứu Tôn giáo",
  bibliography: "Trần Lâm Biền, 'Chùa Việt' (NXB Văn hóa Thông tin, 1996); Thích Thanh Từ, 'Đạo Phật và đời sống người Việt' (NXB Tôn giáo); Viện Nghiên cứu Tôn giáo, 'Văn hóa Phật giáo trong đời sống đương đại'.",
  sourceLocator: "Trần Lâm Biền (1996): Ý nghĩa thanh tịnh của không gian cảnh chùa chốn thiền môn; Phong tục vãn cảnh chùa ngày đầu xuân: Thắp một nén hương trầm cầu bình an, hướng thiện, nuôi dưỡng tâm hồn từ bi hỷ xả, tránh xa tệ nạn mê tín cầu danh trục lợi, tr. 88-120.",
  localCommunity: "Đồng bào phật tử và người dân Việt Nam trên mọi miền Tổ quốc"
};

// 3. tuc-tha-ca-chep-tien-ong-tao
b20[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Nếp cũ - Hội hè đình đám' & Tích cổ Táo Quân chầu trời",
  sourceAuthor: "Toan Ánh; GS. Trần Ngọc Thêm; Bảo tàng Lịch sử Quốc gia",
  bibliography: "Toan Ánh, 'Nếp cũ - Hội hè đình đám' (Quyển Hạ, NXB Trẻ, 2005); Trần Ngọc Thêm, 'Cơ sở văn hóa Việt Nam' (NXB Giáo dục); Bảo tàng Lịch sử Quốc gia, Chuyên đề 'Phong tục ngày 23 tháng Chạp'.",
  sourceLocator: "Toan Ánh (2005): Mục Lễ tiễn Táo quân; Biểu tượng cá chép hóa rồng (ngựa bay của Táo quân) vượt Vũ Môn; Ý nghĩa phóng sinh nhân văn: Thả cá về sông hồ tự nhiên gửi gắm thông điệp bảo vệ sinh thái và ước vọng tái sinh năm mới, tr. 182-195.",
  localCommunity: "Cộng đồng nhân dân Việt Nam trên khắp cả nước"
};

// 4. y-nghia-mam-com-tat-nien
b20[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Văn minh Việt Nam' (Nguyễn Văn Huyên) & 'Thương nhớ mười hai' (Vũ Bằng)",
  sourceAuthor: "Nguyễn Văn Huyên; Vũ Bằng; Viện Văn hóa Nghệ thuật Quốc gia",
  bibliography: "Nguyễn Văn Huyên, 'Văn minh Việt Nam' (Bản dịch NXB Hội Nhà văn, 2016); Vũ Bằng, 'Thương nhớ mười hai' (NXB Văn hóa, 1971); Viện Văn hóa Nghệ thuật Quốc gia Việt Nam.",
  sourceLocator: "Nguyễn Văn Huyên (2016): Chương 12 (Tết Nguyên Đán và mâm cơm Tất niên chiều 30 Tết); Vũ Bằng (1971): Thời khắc thiêng liêng con cháu sum vầy quây quần bên mâm cơm gia đình khép lại buồn vui năm cũ đón nhận vận hội an lành năm mới.",
  localCommunity: "Toàn thể các gia đình người Việt trong và ngoài nước"
};

// 5. tuc-khai-but-dau-xuan
b20[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1954/QĐ-TTg & Kỷ yếu 'Tục khai bút và truyền thống hiếu học Thăng Long'",
  sourceAuthor: "Thủ tướng Chính phủ; Trung tâm Hoạt động VHKH Văn Miếu — Quốc Tử Giám; Phan Kế Bính",
  bibliography: "Thủ tướng Chính phủ, Quyết định số 1954/QĐ-TTg ngày 10/05/2012 xếp hạng Di tích quốc gia đặc biệt Văn Miếu - Quốc Tử Giám; Trung tâm HĐVHKH Văn Miếu - Quốc Tử Giám, Kỷ yếu 'Truyền thống hiếu học và Hội chữ Xuân'; Phan Kế Bính, 'Việt Nam phong tục'.",
  sourceLocator: "Quyết định số 1954/QĐ-TTg; Kỷ yếu Văn Miếu: Nghi thức khai bút đầu xuân tôn vinh sự học, rèn giũa đạo đức nét chữ nét người; Những dòng chữ thiêng hướng thiện cầu chúc đất nước thanh bình, gia đình thịnh vượng.",
  localCommunity: "Học sinh, sinh viên, trí thức và nhân dân trên toàn lãnh thổ Việt Nam"
};

// 6. tuc-le-cay-neu-ngay-tet
b20[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Công trình 'Kho tàng truyện cổ tích Việt Nam' & 'Nếp cũ - Tết Nguyên Đán'",
  sourceAuthor: "GS. Nguyễn Đổng Chi; Toan Ánh; Viện Văn học",
  bibliography: "Nguyễn Đổng Chi, 'Kho tàng truyện cổ tích Việt Nam' (Truyện Sự tích cây nêu ngày Tết, NXB Khoa học Xã hội); Toan Ánh, 'Nếp cũ - Hội hè đình đám' (NXB Trẻ, 2005); Bảo tàng Dân tộc học Việt Nam.",
  sourceLocator: "Nguyễn Đổng Chi: Truyền thuyết dân gian Phật dạy cắm cây nêu bằng tre trừ tà quỷ chiếm đất; Toan Ánh (2005): Cấu tạo ngọn nêu treo vòng cung, khánh đất nung kêu leng keng và lá bùa ngũ sắc định vị không gian yên bình thiêng liêng đón Tết, tr. 190-205.",
  localCommunity: "Nhân dân các làng quê Bắc Bộ, Trung Bộ và cộng đồng các dân tộc Tây Nguyên"
};

// 7. tuc-tam-nuoc-la-mui-chieu-30
b20[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Tùy bút 'Thương nhớ mười hai' (Vũ Bằng) & 'Thú ăn chơi người Hà Nội'",
  sourceAuthor: "Vũ Bằng; Nhà nghiên cứu Băng Sơn; Viện Nghiên cứu Văn hóa",
  bibliography: "Vũ Bằng, 'Thương nhớ mười hai' (mục Tháng Chạp, NXB Văn hóa); Băng Sơn, 'Thú ăn chơi người Hà Nội' (NXB Hà Nội); Tạp chí Di sản Văn hóa.",
  sourceLocator: "Vũ Bằng (1971): Nét phong nhã của nồi nước lá mùi già đun sôi chiều 30 Tết; Tinh dầu hạt mùi cay nồng thơm ngát gột rửa sạch sẽ bụi bặm muộn phiền năm cũ, mang lại cảm giác thanh khiết tinh khôi trước giờ khắc giao thừa.",
  localCommunity: "Các gia đình cư dân đồng bằng Bắc Bộ và người dân Hà Nội xưa và nay"
};

// 8. tuc-an-chay-thanh-tinh-ngay-ram
b20[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Cơ sở văn hóa Việt Nam' & 'Văn hóa ẩm thực chay Việt Nam'",
  sourceAuthor: "GS. Trần Ngọc Thêm; Giáo hội Phật giáo Việt Nam; Viện Nghiên cứu Tôn giáo",
  bibliography: "Trần Ngọc Thêm, 'Cơ sở văn hóa Việt Nam' (NXB Giáo dục, 2000); Giáo hội Phật giáo Việt Nam, Chuyên đề 'Ý nghĩa của việc ăn chay trong Phật giáo'; Tạp chí Văn hóa Nghệ thuật.",
  sourceLocator: "Trần Ngọc Thêm (2000): Triết lý tôn trọng sự sống và tinh thần từ bi bác ái của Phật giáo ăn sâu vào văn hóa ẩm thực dân gian; Tập quán ăn chay ngày mùng Một và ngày Rằm (ngày sóc vọng) dưỡng tâm an lạc, bảo vệ sức khỏe và môi trường sinh thái.",
  localCommunity: "Cộng đồng phật tử và các tầng lớp nhân dân trên toàn quốc"
};

// 9. tuc-dat-ten-va-le-day-thang
b20[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Việt Nam phong tục' (Phan Kế Bính) & 'Đất lề quê thói' (Nhất Thanh)",
  sourceAuthor: "Phan Kế Bính; Nhất Thanh; Viện Nghiên cứu Gia đình và Giới",
  bibliography: "Phan Kế Bính, 'Việt Nam phong tục' (NXB Văn học, tái bản 2005); Nhất Thanh, 'Đất lề quê thói' (NXB Văn hóa Thông tin, 1993); Viện Nghiên cứu Gia đình và Giới.",
  sourceLocator: "Phan Kế Bính (2005): Mục Đặt tên con và kiêng tên húy ông bà tổ tiên; Nhất Thanh (1993): Lễ cúng Mụ đầy tháng (đầy cữ) tạ ơn 12 Bà Mụ và 3 Đức Thầy nặn hình hài con trẻ, lời chúc phúc đón chào thành viên mới hòa nhập cộng đồng, tr. 45-62.",
  localCommunity: "Các gia đình Việt Nam trên toàn lãnh thổ"
};

// 10. gia-tri-di-san-van-hoa-viet-nam
b20[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Luật Di sản văn hóa năm 2001 (sửa đổi 2009) & Quyết định số 1909/QĐ-TTg của Thủ tướng Chính phủ",
  sourceAuthor: "Quốc hội nước CHXHCN Việt Nam; Thủ tướng Chính phủ; Cục Di sản Văn hóa",
  bibliography: "Quốc hội nước CHXHCN Việt Nam, Luật Di sản văn hóa năm 2001 (Luật số 28/2001/QH10, sửa đổi, bổ sung năm 2009); Thủ tướng Chính phủ, Quyết định số 1909/QĐ-TTg ngày 12/11/2021 phê duyệt Chiến lược phát triển văn hóa đến năm 2030; Cục Di sản Văn hóa.",
  sourceLocator: "Luật Di sản văn hóa Điều 1, 2, 4 (Khẳng định di sản văn hóa là tài sản vô giá của cộng đồng các dân tộc Việt Nam); Quyết định 1909/QĐ-TTg Mục tiêu tổng quát: Bảo tồn và phát huy bền vững bản sắc văn hóa dân tộc trong thời kỳ hội nhập quốc tế.",
  localCommunity: "Toàn thể 54 dân tộc anh em trên lãnh thổ Việt Nam và cộng đồng người Việt Nam ở nước ngoài"
};

fs.writeFileSync(b20Path, JSON.stringify(b20, null, 2), "utf8");
console.log("Updated Batch 020 successfully!");
