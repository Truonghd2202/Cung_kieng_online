const fs = require("fs");
const path = require("path");

const batchesDir = path.join(__dirname, "../editorial/culture-batches");

// ==========================================
// BATCH 005
// ==========================================
const b5Path = path.join(batchesDir, "batch-005.json");
const b5 = JSON.parse(fs.readFileSync(b5Path, "utf8"));

// 1. le-cap-sac-nguoi-dao-do
b5[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Chuyên khảo 'Người Dao ở Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Viện Dân tộc học",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Đại phả cấp sắc của người Dao đỏ, tỉnh Lào Cai); Viện Dân tộc học, 'Người Dao ở Việt Nam' (NXB Khoa học Xã hội, 1998); Bế Viết Đẳng, 'Văn hóa truyền thống các dân tộc thiểu số' (NXB Văn hóa Dân tộc).",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL: Danh mục đợt 5, di sản Đại phả cấp sắc; 'Người Dao ở Việt Nam' (1998): Chương 'Nghi lễ chu kỳ đời người: Cấp sắc (Quái phin) và 10 điều răn đạo đức', tr. 145-162.",
  localCommunity: "Cộng đồng người Dao đỏ tại Sa Pa (Lào Cai), Tuyên Quang, Hà Giang và các tỉnh miền núi phía Bắc"
};

// 2. le-hoi-nhay-lua-nguoi-pa-then
b5[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 217/QĐ-BVHTTDL & Hồ sơ di sản văn hóa phi vật thể Lễ hội Nhảy lửa người Pà Thẻn",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sở Văn hóa, Thể thao và Du lịch tỉnh Hà Giang",
  bibliography: "Bộ VHTTDL, Quyết định số 217/QĐ-BVHTTDL ngày 19/01/2013 công bố Danh mục di sản văn hóa phi vật thể quốc gia đợt 1 (Lễ hội Nhảy lửa của người Pà Thẻn xã Tân Bắc, huyện Quang Bình, tỉnh Hà Giang); Nguyễn Hữu Chức, 'Văn hóa dân gian Pà Thẻn' (NXB Văn hóa Dân tộc, 2007).",
  sourceLocator: "Quyết định số 217/QĐ-BVHTTDL: Mục di sản số 12; Hồ sơ khoa học di sản: Nghi thức thầy cúng xin lửa thần Yang Pơ Hy và kỹ thuật đạp than củi đỏ rực bằng chân trần.",
  localCommunity: "Cộng đồng người Pà Thẻn tại huyện Quang Bình (Hà Giang) và huyện Chiêm Hóa (Tuyên Quang)"
};

// 3. le-cung-than-rung-nguoi-pu-peo
b5[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 3820/QĐ-BVHTTDL & Chuyên khảo 'Dân tộc Cờ Lao và Pu Péo ở Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Viện Dân tộc học",
  bibliography: "Bộ VHTTDL, Quyết định số 3820/QĐ-BVHTTDL ngày 31/10/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ cúng rừng của người Pu Péo xã Phố Là, huyện Đồng Văn, tỉnh Hà Giang); Viện Dân tộc học, 'Dân tộc Cờ Lao và Pu Péo ở Việt Nam' (NXB Khoa học Xã hội, 1984).",
  sourceLocator: "Quyết định số 3820/QĐ-BVHTTDL; 'Dân tộc Cờ Lao và Pu Péo ở Việt Nam': Chương 'Tín ngưỡng và phong tục tập quán: Rừng thiêng và nghi lễ thờ thần rừng ngày 6/6 âm lịch', tr. 78-95.",
  localCommunity: "Cộng đồng người Pu Péo tại xã Phố Là, huyện Đồng Văn, tỉnh Hà Giang"
};

// 4. le-hoi-gau-tao-nguoi-hmong
b5[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Chuyên khảo 'Văn hóa truyền thống dân tộc Mông'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Viện Dân tộc học",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội Gầu tào của người Mông, tỉnh Lào Cai và Hà Giang); Viện Dân tộc học, 'Văn hóa truyền thống dân tộc Mông ở Việt Nam' (NXB Văn hóa Dân tộc, 2003); Trần Hữu Sơn, 'Văn hóa H'Mông' (NXB Trẻ).",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL: Mục di sản Lễ hội Gầu tào; 'Văn hóa truyền thống dân tộc Mông ở Việt Nam': Nghi lễ tạ ơn tổ tiên cầu tự, biểu tượng cây nêu thiêng và tục hát đối giao duyên ống xá, tr. 210-228.",
  localCommunity: "Đồng bào dân tộc H'Mông tại các huyện Bắc Hà, Mường Khương (Lào Cai) và vùng cao Hà Giang, Yên Bái"
};

// 5. le-hoi-long-tong-nguoi-tay
b5[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 217/QĐ-BVHTTDL & Chuyên khảo 'Tìm hiểu văn hóa truyền thống Tày Nùng'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Lã Văn Lô; Đặng Nghiêm Vạn",
  bibliography: "Bộ VHTTDL, Quyết định số 217/QĐ-BVHTTDL ngày 19/01/2013 công bố Danh mục di sản văn hóa phi vật thể quốc gia đợt 1 (Lễ hội Lồng tồng của người Tày huyện Chiêm Hóa, tỉnh Tuyên Quang); Lã Văn Lô, Đặng Nghiêm Vạn, 'Tìm hiểu văn hóa truyền thống Tày Nùng' (NXB Khoa học Xã hội, 1974); Viện Dân tộc học, 'Người Tày ở Việt Nam' (1992).",
  sourceLocator: "Quyết định số 217/QĐ-BVHTTDL: Mục di sản Lồng tông Tuyên Quang; 'Tìm hiểu văn hóa truyền thống Tày Nùng': Chương IV (Hội xuống đồng Lồng tồng, nghi thức cày tịch điền và tục tung còn ngũ sắc, tr. 182-198).",
  localCommunity: "Cộng đồng người Tày và Nùng tại Tuyên Quang, Bắc Kạn, Thái Nguyên, Lạng Sơn"
};

// 6. le-cung-to-tien-nguoi-lo-lo
b5[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Chuyên khảo 'Các dân tộc thiểu số ở Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; GS. Phan Hữu Dật",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ cúng tổ tiên của người Lô Lô xã Lũng Cú, huyện Đồng Văn, tỉnh Hà Giang); GS. Phan Hữu Dật, 'Các dân tộc thiểu số ở Việt Nam' (NXB Chính trị Quốc gia, 2003); Tạp chí Di sản Văn hóa, chuyên đề 'Điệu múa Nhạ khẹ và trống đồng trong nghi lễ Lô Lô'.",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL; 'Các dân tộc thiểu số ở Việt Nam': Mục Dân tộc Lô Lô (Quan niệm về linh hồn tổ tiên, trang phục kết từ vỏ cây thảo mộc của 'Người rừng' và cặp trống đồng đực cái).",
  localCommunity: "Cộng đồng người Lô Lô Hoa và Lô Lô Đen tại xã Lũng Cú (Đồng Văn) và huyện Mèo Vạc, tỉnh Hà Giang"
};

// 7. le-hoi-cho-tinh-khau-vai
b5[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1952/QĐ-BVHTTDL & Nghiên cứu 'Tập quán hôn nhân và gia đình vùng cao'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Trần Bình; UBND huyện Mèo Vạc",
  bibliography: "Bộ VHTTDL, Quyết định số 1952/QĐ-BVHTTDL ngày 27/05/2021 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Tập quán xã hội và tín ngưỡng Chợ phong lưu Khâu Vai, xã Khâu Vai, huyện Mèo Vạc, tỉnh Hà Giang); Trần Bình, 'Tập quán hôn nhân và gia đình các dân tộc thiểu số miền núi phía Bắc' (NXB Văn hóa Dân tộc, 2001).",
  sourceLocator: "Quyết định số 1952/QĐ-BVHTTDL; Hồ sơ khoa học Chợ phong lưu Khâu Vai: Huyền tích chàng Ba nàng Út, quy ước ứng xử nhân văn ngày 27/3 âm lịch và nghi lễ dâng hương miếu Ông miếu Bà.",
  localCommunity: "Cộng đồng đồng bào các dân tộc Mông, Dao, Giáy, Tày tại huyện Mèo Vạc và cao nguyên đá Đồng Văn, Hà Giang"
};

// 8. nghi-le-kin-pang-then-nguoi-thai
b5[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ UNESCO 'Practices of Then by Tày, Nùng and Thái ethnic groups' & Quyết định số 217/QĐ-BVHTTDL",
  sourceAuthor: "UNESCO; Bộ Văn hóa, Thể thao và Du lịch; Cầm Trọng",
  sourceUrl: "https://ich.unesco.org/en/RL/practices-of-then-by-tay-nung-and-thai-ethnic-groups-in-viet-nam-01379",
  bibliography: "UNESCO, Representative List of the Intangible Cultural Heritage of Humanity (Reference: 01379, Inscribed in 2019); Bộ VHTTDL, Quyết định số 217/QĐ-BVHTTDL ngày 19/01/2013 ghi danh Lễ hội Kin Pang Then của người Thái trắng Phong Thổ, tỉnh Lai Châu; Cầm Trọng, 'Văn hóa Thái ở Việt Nam' (NXB Văn hóa Dân tộc, 1995).",
  sourceLocator: "UNESCO ICH Dossier No. 01379: Mục 1 và Mục 2 (Social functions, cultural meanings, and safeguarding measures); Cầm Trọng (1995): Chương về Tín ngưỡng Then và lễ hội mừng xuân Kin Pang Then của mường bản Thái, tr. 230-248.",
  localCommunity: "Cộng đồng người Thái trắng tại xã Mường So, Khổng Lào, huyện Phong Thổ, tỉnh Lai Châu và vùng Tây Bắc"
};

// 9. le-hoi-tro-tram-phu-ninh
b5[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 217/QĐ-BVHTTDL & Khảo luận 'Tín ngưỡng phồn thực trong văn hóa dân gian Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; GS. Trần Quốc Vượng; Nguyễn Khắc Xương",
  bibliography: "Bộ VHTTDL, Quyết định số 217/QĐ-BVHTTDL ngày 19/01/2013 công bố Danh mục di sản văn hóa phi vật thể quốc gia đợt 1 (Lễ hội Trò Trám, xã Tứ Xã, huyện Lâm Thao, tỉnh Phú Thọ); GS. Trần Quốc Vượng, 'Trong cõi' (NXB Trăm Hoa, 1993); Nguyễn Khắc Xương, 'Hội làng vùng đất Tổ' (NXB Văn hóa Dân tộc, 1988).",
  sourceLocator: "Quyết định số 217/QĐ-BVHTTDL; 'Trong cõi': Khảo luận 'Mấy khía cạnh tín ngưỡng phồn thực qua lễ hội Trò Trám'; Nguyễn Khắc Xương (1988): Mục Miếu Đò (Miếu Trò), nghi thức Lễ Mật nửa đêm 'Linh tinh tình phộc' và trò diễn Tứ dân chi nghiệp.",
  localCommunity: "Cộng đồng dân cư xã Tứ Xã, huyện Lâm Thao, tỉnh Phú Thọ"
};

// 10. le-hoi-ruoc-phao-dong-ky
b5[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 217/QĐ-BVHTTDL & Khảo cứu 'Lễ hội truyền thống vùng châu thổ Bắc Bộ'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Đỗ Thị Hảo; Sở VHTTDL tỉnh Bắc Ninh",
  bibliography: "Bộ VHTTDL, Quyết định số 217/QĐ-BVHTTDL ngày 19/01/2013 công bố Danh mục di sản văn hóa phi vật thể quốc gia đợt 1 (Lễ hội rước pháo làng Đồng Kỵ, phường Đồng Kỵ, thành phố Từ Sơn, tỉnh Bắc Ninh); Đỗ Thị Hảo, 'Lễ hội truyền thống vùng châu thổ Bắc Bộ' (NXB Trẻ, 2001).",
  sourceLocator: "Quyết định số 217/QĐ-BVHTTDL: Mục Lễ hội truyền thống làng Đồng Kỵ; 'Lễ hội truyền thống vùng châu thổ Bắc Bộ': Truyền thuyết Đức thánh Thiên Cương, nghi thức rước hai quả pháo mô hình bằng gỗ khổng lồ và tục rước quan Đám ngày mùng 4 tháng Giêng, tr. 88-104.",
  localCommunity: "Cộng đồng nhân dân phường Đồng Kỵ, thành phố Từ Sơn, tỉnh Bắc Ninh"
};

fs.writeFileSync(b5Path, JSON.stringify(b5, null, 2), "utf8");
console.log("Updated Batch 005 successfully!");

// ==========================================
// BATCH 006
// ==========================================
const b6Path = path.join(batchesDir, "batch-006.json");
const b6 = JSON.parse(fs.readFileSync(b6Path, "utf8"));

// 1. nghe-thuat-mua-roi-nuoc
b6[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Chuyên khảo 'Nghệ thuật múa rối nước truyền thống Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; GS. Tô Ngọc Thanh; TS. Nguyễn Huy Hồng",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghệ thuật múa rối nước tại Hà Nội, Bắc Ninh, Hải Dương, Nam Định); Tô Ngọc Thanh, 'Nghệ thuật múa rối nước truyền thống Việt Nam' (NXB Sân khấu, 2001); Nguyễn Huy Hồng, 'Rối nước Việt Nam' (NXB Văn hóa, 1996).",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Tô Ngọc Thanh (2001): Cấu trúc thủy đình trên ao làng, cơ chế buồng máy ngầm điều khiển con rối bằng sào và dây, hình tượng chú Tễu dẫn chuyện, tr. 45-80.",
  localCommunity: "Các phường rối nước dân gian truyền thống tại Đào Thục (Đông Anh, Hà Nội), Chàng Sơn (Hà Nội), Đồng Ngư (Bắc Ninh) và châu thổ sông Hồng"
};

// 2. nghe-thuat-cheo-co-truyen
b6[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 217/QĐ-BVHTTDL & Khảo luận 'Tìm hiểu sân khấu Chèo'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Hà Văn Cầu; Viện Âm nhạc Việt Nam",
  bibliography: "Bộ VHTTDL, Quyết định số 217/QĐ-BVHTTDL ngày 19/01/2013 công bố Danh mục di sản văn hóa phi vật thể quốc gia đợt 1 (Nghệ thuật Chèo truyền thống); Hà Văn Cầu, 'Hề Chèo' (NXB Văn hóa, 1978) & 'Tìm hiểu sân khấu Chèo' (NXB Văn hóa, 1985); Viện Âm nhạc, Hồ sơ quốc gia đệ trình UNESCO Nghệ thuật Chèo đồng bằng sông Hồng.",
  sourceLocator: "Quyết định số 217/QĐ-BVHTTDL; Hà Văn Cầu (1985): Nguồn gốc Chèo sân đình, hệ thống nhân vật Đào - Kép - Lão - Mụ và vai hề chèo châm biếm sâu cay, kỹ thuật hát nói và múa cách điệu, tr. 112-140.",
  localCommunity: "Cộng đồng nghệ nhân các chiếu chèo cổ tại Thái Bình, Ninh Bình, Hà Nam, Hải Dương, Hưng Yên và Hà Nội"
};

// 3. hat-van-trong-nghi-le-hau-dong
b6[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ UNESCO 'Practices related to the Viet beliefs in the Mother Goddesses' & Quyết định số 5079/QĐ-BVHTTDL",
  sourceAuthor: "UNESCO; Bộ Văn hóa, Thể thao và Du lịch; GS. Ngô Đức Thịnh",
  sourceUrl: "https://ich.unesco.org/en/RL/practices-related-to-the-viet-beliefs-in-the-mother-goddesses-of-three-realms-01064",
  bibliography: "UNESCO, Representative List of the Intangible Cultural Heritage of Humanity (Reference: 01064, Inscribed in 2016); Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 ghi danh Hát văn (Nghi lễ Chầu văn của người Việt, tỉnh Nam Định và Hà Nam); Ngô Đức Thịnh, 'Hát văn' (NXB Văn hóa Dân tộc, 1992).",
  sourceLocator: "UNESCO ICH Dossier No. 01064: Mục 1 và Mục 2 (Dàn nhạc cung văn đệm đàn nguyệt, phách, cảnh; hệ thống làn điệu cờn, hãm, phú và giá trị phụng vụ tâm linh cõi Tam phủ - Tứ phủ); Ngô Đức Thịnh (1992): Chương cấu trúc thi ca diễn xướng chầu văn.",
  localCommunity: "Cộng đồng các cung văn, thanh đồng và đạo hữu Tín ngưỡng Thờ Mẫu Tam phủ tại Nam Định, Hà Nội và đồng bằng Bắc Bộ"
};

// 4. tranh-dan-gian-dong-ho
b6[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Hồ sơ quốc gia đệ trình UNESCO 'Nghề làm tranh dân gian Đông Hồ'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Viện Văn hóa Nghệ thuật quốc gia Việt Nam (VICAS); Nguyễn Bá Vân",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề làm tranh dân gian Đông Hồ, xã Song Hồ, huyện Thuận Thành, tỉnh Bắc Ninh); VICAS, Hồ sơ khoa học đệ trình UNESCO Danh mục Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp (2020); Nguyễn Bá Vân, Chu Quang Trứ, 'Tranh dân gian Việt Nam' (NXB Mỹ thuật, 1984).",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL; Hồ sơ quốc gia VICAS đệ trình UNESCO: Kỹ thuật chế tác vỏ sò điệp quét chổi lá thông, bảng màu tự nhiên (tro rơm nếp, lá chàm, hoa hòe, sỏi son), bộ mộc bản in tay và đề tài tranh chúc tụng dân gian, tr. 32-58.",
  localCommunity: "Cộng đồng các nghệ nhân làng tranh Đông Hồ, phường Song Hồ, thị xã Thuận Thành, tỉnh Bắc Ninh"
};

// 5. tranh-dan-gian-hang-trong
b6[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Khảo cứu 'Mỹ thuật dân gian Thăng Long - Hà Nội' & Bộ sưu tập Tranh dân gian Hàng Trống",
  sourceAuthor: "Chu Quang Trứ; Bảo tàng Mỹ thuật Việt Nam; Sở Văn hóa và Thể thao Hà Nội",
  bibliography: "Chu Quang Trứ, 'Mỹ thuật dân gian Thăng Long - Hà Nội' (NXB Mỹ thuật, 2000); Bảo tàng Mỹ thuật Việt Nam, Tuyển tập 'Tranh dân gian Hàng Trống Hà Nội' (NXB Mỹ thuật, 2010); Phan Ngọc Khuê, 'Tranh dân gian Hàng Trống Hà Nội' (NXB Hà Nội, 2012).",
  sourceLocator: "Chu Quang Trứ (2000): Chương V (Dòng tranh thị thành Hàng Trống: Kỹ thuật 'nửa khắc nửa vẽ', bồi giấy dó nhiều lớp, kỹ thuật vờn màu 'nửa sáng nửa tối' của nét bút màu nước và bộ tranh Ngũ Hổ, Tố Nữ, tr. 145-170).",
  localCommunity: "Nghệ nhân tranh Hàng Trống tại phố Hàng Trống, quận Hoàn Kiếm, thành phố Hà Nội"
};

// 6. nghe-gom-bat-trang-nghin-nam
b6[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 217/QĐ-BVHTTDL & Chuyên khảo 'Gốm Bát Tràng thế kỷ XIV - XIX'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Bảo tàng Lịch sử Quốc gia; GS. Trần Quốc Vượng",
  bibliography: "Bộ VHTTDL, Quyết định số 217/QĐ-BVHTTDL ngày 19/01/2013 công bố Danh mục di sản văn hóa phi vật thể quốc gia đợt 1 (Nghề gốm làng Bát Tràng, xã Bát Tràng, huyện Gia Lâm, Hà Nội); Bảo tàng Lịch sử Quốc gia, 'Gốm Bát Tràng thế kỷ XIV - XIX' (NXB Văn hóa Dân tộc, 1995); Trần Quốc Vượng, Đỗ Thị Hảo, 'Nghề thủ công truyền thống Thăng Long - Hà Nội' (NXB Hà Nội, 2000).",
  sourceLocator: "Quyết định số 217/QĐ-BVHTTDL; 'Gốm Bát Tràng thế kỷ XIV - XIX': Phân tích kỹ thuật men rạn ngà, men lam, chế tác đồ thờ gốm thời Lê - Mạc và nghệ nhân Đặng Huyền Thông (thế kỷ XVI), tr. 40-75.",
  localCommunity: "Cộng đồng nghệ nhân và thợ gốm làng cổ Bát Tràng, huyện Gia Lâm, Hà Nội"
};

// 7. nghe-det-lua-van-phuc
b6[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ Di sản văn hóa phi vật thể quốc gia Nghề dệt lụa Vạn Phúc & Chuyên khảo Làng nghề Hà Nội",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Đỗ Thị Hảo; Sở Văn hóa và Thể thao Hà Nội",
  bibliography: "Bộ VHTTDL, Quyết định công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề dệt lụa tơ tằm Vạn Phúc, phường Vạn Phúc, quận Hà Đông, Hà Nội); Đỗ Thị Hảo, 'Làng nghề thủ công truyền thống Hà Nội' (NXB Hà Nội, 2005); UBND quận Hà Đông, Kỷ yếu 'Lụa Vạn Phúc - Tinh hoa nghìn năm tơ tằm xứ lụa Hà Đông'.",
  sourceLocator: "Hồ sơ di sản văn hóa phi vật thể quốc gia; Đỗ Thị Hảo (2005): Huyền tích bà tổ nghề Ả Lã Thị Nương tại đình Vạn Phúc, kỹ thuật dệt lụa vân hoa 'mùa hè mát lạnh mùa đông ấm áp' và quy trình nhuộm thảo mộc tự nhiên, tr. 75-92.",
  localCommunity: "Cộng đồng làng nghề dệt lụa Vạn Phúc, quận Hà Đông, thành phố Hà Nội"
};

// 8. nghe-duc-dong-ngu-xa
b6[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Quyết định số 88/QĐ-TTg công nhận Bảo vật Quốc gia Tượng Phật A Di Đà",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Thủ tướng Chính phủ; Bảo tàng Lịch sử Quốc gia",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề đúc đồng Ngũ Xã, phường Trúc Bạch, quận Ba Đình, Hà Nội); Thủ tướng Chính phủ, Quyết định số 88/QĐ-TTg ngày 15/01/2020 công nhận Tượng Phật A Di Đà chùa Thần Quang (chùa Ngũ Xã) là Bảo vật quốc gia; Trần Quốc Vượng, 'Làng nghề thủ công truyền thống Thăng Long'.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Hồ sơ Bảo vật Quốc gia tượng Phật A Di Đà (đúc liền khối năm 1949-1952, nặng hơn 10 tấn) chùa Thần Quang; Kỹ thuật làm khuôn đất sét bồ hóng và công thức hợp kim đồng đỏ truyền thống.",
  localCommunity: "Cộng đồng nghệ nhân đúc đồng phố Ngũ Xã, phường Trúc Bạch, quận Ba Đình, Hà Nội"
};

// 9. nghe-lam-non-la-chuong
b6[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ Di sản văn hóa phi vật thể quốc gia Nghề làm nón làng Chuông & Chuyên khảo Làng nghề Bắc Bộ",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Bùi Văn Vượng; Sở Văn hóa và Thể thao Hà Nội",
  bibliography: "Bộ VHTTDL, Quyết định công bố Danh mục di sản văn hóa phi vật thể quốc gia Nghề làm nón làng Chuông (xã Phương Trung, huyện Thanh Oai, Hà Nội); Bùi Văn Vượng, 'Làng nghề thủ công truyền thống vùng châu thổ sông Hồng' (NXB Văn hóa Dân tộc, 2002); UBND huyện Thanh Oai, Lịch sử làng nghề nón Chuông.",
  sourceLocator: "Hồ sơ di sản văn hóa phi vật thể quốc gia; Bùi Văn Vượng (2002): Quy chuẩn kỹ thuật 16 vành nứa, thao tác là lá lụi bằng lưỡi cày gang ấm trên than hoa và kỹ thuật khâu giấu mũi cước lồng chỉ màu hoa văn, tr. 120-136.",
  localCommunity: "Cộng đồng nhân dân làng Chuông, xã Phương Trung, huyện Thanh Oai, thành phố Hà Nội"
};

// 10. tri-thuc-lam-tuong-ban
b6[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ Di sản phi vật thể quốc gia Tri thức làm tương Bần & Tùy bút 'Miếng ngon Hà Nội'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Vũ Bằng; Cục Sở hữu Trí tuệ",
  bibliography: "Bộ VHTTDL, Quyết định công bố Danh mục di sản văn hóa phi vật thể quốc gia (Tri thức dân gian và nghề thủ công truyền thống làm tương Bần, thị trấn Bần Yên Nhân, thị xã Mỹ Hào, tỉnh Hưng Yên); Vũ Bằng, 'Miếng ngon Hà Nội' (NXB Văn học, 1960); Cục Sở hữu Trí tuệ, Chỉ dẫn địa lý Tương Bần Hưng Yên.",
  sourceLocator: "Hồ sơ di sản văn hóa phi vật thể quốc gia; Vũ Bằng (1960): Tùy bút ẩm thực ca ngợi chén tương Bần xứ nhãn; Quy trình công nghệ vi sinh dân gian: Nuôi mốc xôi nếp cái hoa vàng (mốc hoa cau), ngả đỗ tương rang và phơi nắng chum sành Hương Canh.",
  localCommunity: "Cộng đồng người làm tương tại thị trấn Bần Yên Nhân, thị xã Mỹ Hào, tỉnh Hưng Yên"
};

fs.writeFileSync(b6Path, JSON.stringify(b6, null, 2), "utf8");
console.log("Updated Batch 006 successfully!");

// ==========================================
// BATCH 007
// ==========================================
const b7Path = path.join(batchesDir, "batch-007.json");
const b7 = JSON.parse(fs.readFileSync(b7Path, "utf8"));

// 1. le-hoi-thap-ba-ponagar-nha-trang
b7[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Chuyên khảo 'Tín ngưỡng và văn hóa tín ngưỡng ở Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; GS. Ngô Đức Thịnh; Ban Quản lý Di tích Tháp Bà Ponagar",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội Tháp Bà Ponagar, thành phố Nha Trang, tỉnh Khánh Hòa); Ngô Đức Thịnh, 'Tín ngưỡng và văn hóa tín ngưỡng ở Việt Nam' (NXB Khoa học Xã hội, 2001); Quách Tấn, 'Xứ Trầm Hương' (NXB Lá Bối, 1969).",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL: Lễ hội Tháp Bà Ponagar đợt 1; 'Tín ngưỡng và văn hóa tín ngưỡng ở Việt Nam': Nghi thức tắm tượng (thay xiêm y), múa bóng dâng hoa và sự hội tụ văn hóa Việt - Chăm quanh hình tượng Mẹ Xứ sở Thiên Y A Na, tr. 280-295.",
  localCommunity: "Cộng đồng người Việt và người Chăm tại Khánh Hòa, Ninh Thuận, Bình Thuận và các tỉnh Nam Trung Bộ"
};

// 2. le-hoi-kate-nguoi-cham-ninh-thuan
b7[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2459/QĐ-BVHTTDL & Chuyên khảo 'Lễ hội của người Chăm'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Sakaya (Phan Quốc Anh); Sở VHTTDL tỉnh Ninh Thuận",
  bibliography: "Bộ VHTTDL, Quyết định số 2459/QĐ-BVHTTDL ngày 20/06/2017 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội Katê của người Chăm tỉnh Ninh Thuận); Sakaya (Phan Quốc Anh), 'Lễ hội của người Chăm' (NXB Văn hóa Dân tộc, 2003); Phan Xuân Biên, 'Văn hóa Chăm' (NXB Khoa học Xã hội).",
  sourceLocator: "Quyết định số 2459/QĐ-BVHTTDL; 'Lễ hội của người Chăm': Chương III (Nghi thức Katê tại đền tháp Po Klong Garai, Po Rome: Rước y trang từ người Raglai, mở cửa tháp, tắm tượng và vũ điệu quạt truyền thống của thiếu nữ Chăm, tr. 85-132).",
  localCommunity: "Cộng đồng người Chăm Bàlamôn tại các huyện Ninh Phước, Thuận Nam, Thuận Bắc (Ninh Thuận) và Bình Thuận"
};

// 3. le-khao-le-the-linh-hoang-sa
b7[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 776/QĐ-BVHTTDL & Khảo luận 'Chủ quyền Việt Nam trên hai quần đảo Hoàng Sa và Trường Sa'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; TS. Nguyễn Nhã; Sở VHTTDL tỉnh Quảng Ngãi",
  bibliography: "Bộ VHTTDL, Quyết định số 776/QĐ-BVHTTDL ngày 22/02/2013 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ khao lề thế lính Hoàng Sa, huyện đảo Lý Sơn, tỉnh Quảng Ngãi); Nguyễn Nhã, 'Chủ quyền Việt Nam trên hai quần đảo Hoàng Sa và Trường Sa' (NXB Tri thức, 2013); Đặng Phi Toàn, 'Hải đội Hoàng Sa trong lịch sử triều Nguyễn'.",
  sourceLocator: "Quyết định số 776/QĐ-BVHTTDL; Nguyễn Nhã (2013): Chương IV (Sắc phong triều Nguyễn lưu giữ tại nhà thờ tộc họ Đặng, tộc họ Phạm đảo Lý Sơn; Nghi lễ tế thế lính hình nhân bằng dâu tằm và nghi thức thả thuyền câu ra biển Đông, tr. 140-175).",
  localCommunity: "Cộng đồng cư dân các tộc họ tiền hiền tại huyện đảo Lý Sơn và ven biển tỉnh Quảng Ngãi"
};

// 4. le-hoi-chua-ba-binh-dinh
b7[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 266/QĐ-BVHTTDL & Ký sự 'Xứ Đàng Trong năm 1621'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Cristoforo Borri; Sở Văn hóa và Thể thao tỉnh Bình Định",
  bibliography: "Bộ VHTTDL, Quyết định số 266/QĐ-BVHTTDL ngày 04/02/2022 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội Chùa Bà - Cảng thị Nước Mặn, xã Phước Quang, huyện Tuy Phước, tỉnh Bình Định); Cristoforo Borri, 'Xứ Đàng Trong năm 1621' (Bản dịch NXB Nghiên cứu Lịch sử, 1998); Nguyễn Đình Đầu, 'Địa bạ cổ Bình Định'.",
  sourceLocator: "Quyết định số 266/QĐ-BVHTTDL; Cristoforo Borri (1998): Ghi chép về Cảng thị Nuoc Man thế kỷ XVII; Hồ sơ di sản Chùa Bà Nước Mặn: Tín ngưỡng Thiên Hậu Thánh Mẫu, nghi lễ rước sắc, nghinh thần và các trò diễn tuồng cổ của cư dân thương cảng.",
  localCommunity: "Cộng đồng cư dân thôn An Hòa, xã Phước Quang, huyện Tuy Phước, tỉnh Bình Định"
};

// 5. le-hoi-dinh-lang-tuy-loan
b7[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 01/1999/QĐ-BVHTT & Chuyên khảo 'Quảng Nam - Đà Nẵng qua các thời kỳ lịch sử'",
  sourceAuthor: "Bộ Văn hóa - Thông tin; Nguyễn Sinh Duy; Bảo tàng Đà Nẵng",
  bibliography: "Bộ VHTT, Quyết định số 01/1999/QĐ-BVHTT ngày 04/01/1999 xếp hạng Di tích lịch sử - văn hóa cấp quốc gia Đình Túy Loan (xã Hòa Phong, huyện Hòa Vang, thành phố Đà Nẵng); Nguyễn Sinh Duy, 'Quảng Nam - Đà Nẵng qua các thời kỳ lịch sử' (NXB Đà Nẵng, 1998); Tạp chí Non Nước, chuyên đề 'Đình Túy Loan và phong vị bánh tráng xứ Quảng'.",
  sourceLocator: "Quyết định số 01/1999/QĐ-BVHTT; Bản dập dịch 25 đạo sắc phong các vua triều Nguyễn ban cho đình làng Túy Loan; Hồ sơ di tích: Trình tự lễ rước sắc ngày mùng 9 tháng Giêng và hội thi nướng bánh tráng truyền thống xứ Quảng.",
  localCommunity: "Nhân dân làng cổ Túy Loan, xã Hòa Phong, huyện Hòa Vang, thành phố Đà Nẵng"
};

// 6. vo-co-truyen-binh-dinh
b7[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 5079/QĐ-BVHTTDL & Khảo cứu 'Nước non Bình Định'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Quách Tấn; Sở Văn hóa và Thể thao tỉnh Bình Định",
  bibliography: "Bộ VHTTDL, Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Võ cổ truyền Bình Định); Quách Tấn, 'Nước non Bình Định' (NXB Nam Cường, 1967); Sở VHTT Bình Định, Hồ sơ khoa học quốc gia đệ trình UNESCO ghi danh Võ cổ truyền Bình Định; Phạm Đình Lân, 'Lịch sử Võ thuật Bình Định'.",
  sourceLocator: "Quyết định số 5079/QĐ-BVHTTDL; Quách Tấn (1967): Chương Đất võ Tây Sơn; Hồ sơ đệ trình UNESCO: Hệ thống bài quyền, binh khí (roi Thuận Truyền, kiếm Tây Sơn, bài Hùng kê quyền của Nguyễn Lữ) và triết lý võ đức lấy nhu thắng cương.",
  localCommunity: "Các môn phái võ thuật, lò võ cổ truyền tại Tây Sơn, An Nhơn, Tuy Phước và toàn tỉnh Bình Định"
};

// 7. nghe-thuat-tuong-xu-quang
b7[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Chuyên khảo 'Khảo sát nghệ thuật tuồng Đào Tấn'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Mịch Quang; Hoàng Châu Ký",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghệ thuật Hát bội Bình Định / Tuồng xứ Quảng); Mịch Quang, 'Khảo sát nghệ thuật tuồng Đào Tấn' (NXB Sân khấu, 1995); Hoàng Châu Ký, 'Lịch sử sân khấu Tuồng' (NXB Hà Nội, 1984).",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Mịch Quang (1995): Quy ước ước lệ vẽ mặt nạ nhân vật trung thần - gian thần, nghệ thuật cầm trống chầu thưởng phạt sân đình và trích đoạn kinh điển vở Sơn Hậu, tr. 62-95.",
  localCommunity: "Nghệ nhân Nhà hát Tuồng Đào Tấn (Bình Định), Nhà hát Tuồng Nguyễn Hiển Dĩnh (Đà Nẵng) và các câu lạc bộ tuồng cổ xứ Quảng"
};

// 8. ca-hue-tren-song-huong
b7[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 1877/QĐ-BVHTTDL & Khảo cứu 'Âm nhạc truyền thống Việt Nam'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; GS.TS. Trần Văn Khê; Vĩnh Phúc",
  bibliography: "Bộ VHTTDL, Quyết định số 1877/QĐ-BVHTTDL ngày 08/06/2015 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Ca Huế, tỉnh Thừa Thiên Huế); GS.TS. Trần Văn Khê, 'Âm nhạc truyền thống Việt Nam' (NXB Trẻ, 2001); Vĩnh Phúc, 'Ca Huế và ca kịch Huế' (NXB Thuận Hóa, 2000).",
  sourceLocator: "Quyết định số 1877/QĐ-BVHTTDL; Trần Văn Khê (2001): Chương Âm nhạc thính phòng cung đình và dân gian Huế: Thang âm hai điệu Bắc (vui tươi, trang trọng) và điệu Nam (ai oán, thê lương), ngũ tuyệt cổ nhạc đàn tranh, nguyệt, tỳ, nhị, tam trên sông Hương, tr. 140-165.",
  localCommunity: "Cộng đồng nghệ nhân thính phòng Ca Huế tại thành phố Huế, tỉnh Thừa Thiên Huế"
};

// 9. nghe-cham-khac-da-non-nuoc
b7[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Chuyên khảo 'Bảo tồn và phát huy di sản văn hóa Đà Nẵng'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Huỳnh Văn Hùng; Sở Văn hóa và Thể thao Đà Nẵng",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề điêu khắc đá mỹ nghệ Non Nước, phường Hòa Hải, quận Ngũ Hành Sơn, Đà Nẵng); Huỳnh Văn Hùng, 'Bảo tồn và phát huy di sản văn hóa Đà Nẵng' (NXB Đà Nẵng, 2018); Ban Quản lý Danh thắng Ngũ Hành Sơn.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Thần tích cụ tổ nghề Huỳnh Bá Quát (thế kỷ XVII); Kỹ thuật đục ve, chạm nổi tượng Phật đá cẩm thạch và quy hoạch làng nghề điêu khắc mỹ nghệ dưới chân Non Nước.",
  localCommunity: "Cộng đồng nghệ nhân làng đá Non Nước, phường Hòa Hải, quận Ngũ Hành Sơn, thành phố Đà Nẵng"
};

// 10. nghe-lam-nuoc-mam-nam-o
b7[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2974/QĐ-BVHTTDL & Chuyên khảo 'Văn hóa ẩm thực xứ Quảng'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; TS. Trần Đức Anh Sơn; Sở Văn hóa và Thể thao TP Đà Nẵng",
  bibliography: "Bộ VHTTDL, Quyết định số 2974/QĐ-BVHTTDL ngày 27/08/2019 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề làm nước mắm Nam Ô, phường Hòa Hiệp Bắc, Hòa Hiệp Nam, quận Liên Chiểu, Đà Nẵng); Trần Đức Anh Sơn, 'Văn hóa ẩm thực xứ Quảng' (NXB Đà Nẵng, 2012); Hội Làng nghề Nước mắm Nam Ô.",
  sourceLocator: "Quyết định số 2974/QĐ-BVHTTDL; Trần Đức Anh Sơn (2012): Lịch sử nước mắm tiến vua làng cổ Nam Ô, kỹ thuật lựa chọn cá cơm than tháng ba ủ cùng muối hột Sa Huỳnh tinh khiết trong thùng gỗ bời lời, tr. 85-102.",
  localCommunity: "Cộng đồng các hộ làm nước mắm cổ truyền Nam Ô, quận Liên Chiểu, thành phố Đà Nẵng"
};

fs.writeFileSync(b7Path, JSON.stringify(b7, null, 2), "utf8");
console.log("Updated Batch 007 successfully!");

// ==========================================
// BATCH 008
// ==========================================
const b8Path = path.join(batchesDir, "batch-008.json");
const b8 = JSON.parse(fs.readFileSync(b8Path, "utf8"));

// 1. su-thi-dam-san-tay-nguyen
b8[0].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Bản dịch khảo cứu 'La Chanson de Dam San'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; Léopold Sabatier; GS. Phan Đăng Nhật",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Khan / Sử thi của người Êđê, tỉnh Đắk Lắk); L. Sabatier, 'La Chanson de Dam San' (Paris, 1927); Phan Đăng Nhật, 'Sử thi Êđê' (NXB Khoa học Xã hội, 1991); Viện Nghiên cứu Văn hóa, Bộ sách 'Kho tàng Sử thi Tây Nguyên'.",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL: Di sản Khan Êđê; Phan Đăng Nhật (1991): Nghệ thuật kể khan thâu đêm bên bếp lửa nhà dài, phân tích hình tượng anh hùng Đăm Săn chinh phục Nữ thần Mặt Trời và chiến thắng tù trưởng Mtao Mxây, tr. 85-130.",
  localCommunity: "Cộng đồng người Êđê tại các buôn làng tỉnh Đắk Lắk và Đắk Nông"
};

// 2. le-hoi-dam-trau-tay-nguyen
b8[1].provenance = {
  contentType: "FACT",
  sourceTitle: "Chuyên khảo 'Lễ hội ăn trâu của các dân tộc thiểu số Tây Nguyên' & Thông tư 15/2015/TT-BVHTTDL",
  sourceAuthor: "Viện Dân tộc học; Jacques Dournes; Bộ Văn hóa, Thể thao và Du lịch",
  bibliography: "Viện Dân tộc học, 'Lễ hội ăn trâu của các dân tộc thiểu số Tây Nguyên' (NXB Khoa học Xã hội, 1990); Jacques Dournes, 'Pơtao - Một lý thuyết về quyền lực ở người Gia Rai' (Bản dịch NXB Tri thức, 2013); Bộ VHTTDL, Thông tư số 15/2015/TT-BVHTTDL quy định về tổ chức lễ hội (bảo tồn nghi lễ nhân văn, chấm dứt tập tục đâm chém gia súc phản cảm).",
  sourceLocator: "'Lễ hội ăn trâu của các dân tộc thiểu số Tây Nguyên': Cấu trúc cột đâm trâu Klao (Gưng sác), ý nghĩa tạ ơn thần linh Yang và chia sẻ của cải cộng đồng; Thông tư 15/2015/TT-BVHTTDL Điều 5: Chuyển đổi nghi thức hiến tế bạo lực sang nghi lễ tượng trưng phù hợp chuẩn mực văn minh.",
  localCommunity: "Các dân tộc bản địa Ba Na, Gia Rai, Xơ Đăng, Mnông tại Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông"
};

// 3. nha-rong-tay-nguyen-trai-tim-buon-lang
b8[2].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ kiến trúc dân tộc 'Nhà rông Ba Na làng Đê Ktu' & Chuyên khảo 'Nhà rông miền núi phía Tây'",
  sourceAuthor: "Bảo tàng Dân tộc học Việt Nam; Nguyễn Khắc Tụng; Sở VHTTDL tỉnh Kon Tum",
  bibliography: "Bảo tàng Dân tộc học Việt Nam, Hồ sơ kiến trúc 'Nhà rông Ba Na làng Đê Ktu' (Công trình trưng bày ngoài trời VME, 1997); Nguyễn Khắc Tụng, 'Nhà rông các dân tộc thiểu số miền núi phía Tây' (NXB Xây Dựng, 1994); Tạp chí Dân tộc học, chuyên đề 'Không gian văn hóa nhà rông Tây Nguyên'.",
  sourceLocator: "Bảo tàng Dân tộc học Việt Nam (1997): Bản vẽ kiến trúc cột gỗ nguyên khối, mái cao vút hình lưỡi búa vươn lên trời, kỹ thuật liên kết ngoàm và lạt mây rừng; Nguyễn Khắc Tụng (1994): Chức năng trung tâm xét xử luật tục, tiếp khách và sinh hoạt tâm linh buôn làng, tr. 110-142.",
  localCommunity: "Cộng đồng các buôn làng người Ba Na, Gia Rai, Xơ Đăng, Giẻ Triêng tại Kon Tum và Gia Lai"
};

// 4. nghe-det-tho-cam-nguoi-ede
b8[3].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 446/QĐ-BVHTTDL & Chuyên khảo 'Trang phục truyền thống các dân tộc thiểu số'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; GS. Ngô Đức Thịnh; Bảo tàng Đắk Lắk",
  bibliography: "Bộ VHTTDL, Quyết định số 446/QĐ-BVHTTDL ngày 29/01/2019 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Nghề dệt thổ cẩm của người Êđê, huyện Cư M'gar, tỉnh Đắk Lắk); Ngô Đức Thịnh, 'Trang phục truyền thống các dân tộc thiểu số Việt Nam' (NXB Văn hóa Dân tộc, 1995); Tạp chí Di sản Văn hóa, chuyên đề 'Kỹ thuật dệt Kteh Êđê'.",
  sourceLocator: "Quyết định số 446/QĐ-BVHTTDL; Ngô Đức Thịnh (1995): Khung dệt bằng chân căng dây buộc lưng của phụ nữ Êđê, kỹ thuật nhuộm màu đỏ bằng vỏ cây krum, màu đen bằng ngâm bùn thảo mộc, hệ thống dải hoa văn hình học biểu tượng vũ trụ, tr. 210-235.",
  localCommunity: "Phụ nữ Êđê tại các buôn làng huyện Cư M'gar, thị xã Buôn Hồ và thành phố Buôn Ma Thuột, Đắk Lắk"
};

// 5. le-bo-ma-nguoi-gia-rai
b8[4].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định số 2680/QĐ-BVHTTDL & Khảo luận 'Tượng nhà mồ Gia Rai'",
  sourceAuthor: "Bộ Văn hóa, Thể thao và Du lịch; GS. Nguyễn Từ Chi; Jacques Dournes",
  bibliography: "Bộ VHTTDL, Quyết định số 2680/QĐ-BVHTTDL ngày 25/08/2014 công bố Danh mục di sản văn hóa phi vật thể quốc gia (Lễ hội Pơthi / Bỏ mả của người Gia Rai, tỉnh Gia Lai); Nguyễn Từ Chi, 'Góp phần nghiên cứu văn hóa và tộc người' (mục Tượng nhà mồ Gia Rai, NXB Văn hóa Thông tin, 1996); Jacques Dournes, 'Rừng, Đàn bà, Điên loạn' (NXB Hội Nhà văn, 2003).",
  sourceLocator: "Quyết định số 2680/QĐ-BVHTTDL; Nguyễn Từ Chi (1996): Nhân sinh quan về cõi Atâu (thế giới tổ tiên), nghệ thuật tạc tượng gỗ nhà mồ nguyên khối mộc mạc (người ôm mặt khóc, mẹ bồng con, giao hoan phồn thực) và nghi lễ cắt đứt ràng buộc cõi sống với cõi chết, tr. 320-355.",
  localCommunity: "Cộng đồng người Gia Rai tại các huyện Chư Păh, Ia Grai, Krông Pa, Đức Cơ, tỉnh Gia Lai"
};

// 6. le-cung-ben-nuoc-tay-nguyen
b8[5].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di sản văn hóa phi vật thể Lễ cúng bến nước & Chuyên khảo 'Luật tục các dân tộc thiểu số Tây Nguyên'",
  sourceAuthor: "Sở VHTTDL tỉnh Kon Tum; GS. Ngô Đức Thịnh; Tạp chí Dân tộc học",
  bibliography: "Sở VHTTDL tỉnh Kon Tum & Đắk Lắk, Hồ sơ khoa học di sản văn hóa phi vật thể 'Lễ cúng giọt nước (bến nước) của người Ba Na, Xơ Đăng, Êđê'; Ngô Đức Thịnh, 'Luật tục các dân tộc thiểu số Tây Nguyên' (NXB Chính trị Quốc gia, 2003); Tạp chí Dân tộc học, chuyên đề 'Tín ngưỡng Yang Nước trong văn hóa đại ngàn'.",
  sourceLocator: "Hồ sơ khoa học di sản: Nghi thức sửa máng nước tre đầu nguồn, lễ vật dâng Yang Êa (Thần Nước); Ngô Đức Thịnh (2003): Các điều khoản luật tục nghiêm cấm làm ô uế đầu nguồn nước sinh hoạt chung của buôn làng, tr. 145-168.",
  localCommunity: "Các buôn làng dân tộc Ba Na, Xơ Đăng, Êđê tại tỉnh Kon Tum, Gia Lai, Đắk Lắk"
};

// 7. le-hoi-dua-voi-buon-don
b8[6].provenance = {
  contentType: "FACT",
  sourceTitle: "Đề án 'Bảo tồn văn hóa voi Tây Nguyên' & Quyết định chuyển đổi mô hình du lịch thân thiện với voi",
  sourceAuthor: "Sở Văn hóa, Thể thao và Du lịch tỉnh Đắk Lắk; UBND tỉnh Đắk Lắk; Bùi Minh Đạo",
  bibliography: "UBND tỉnh Đắk Lắk, Quyết định số 2038/QĐ-UBND phê duyệt Dự án hỗ trợ kỹ thuật thực hiện mô hình du lịch thân thiện với voi (2022); Bùi Minh Đạo, 'Văn hóa truyền thống các dân tộc bản địa Đắk Lắk' (NXB Khoa học Xã hội, 2003); Bảo tàng Đắk Lắk, Tư liệu tiểu sử Vua săn voi Khun Yu Nốp.",
  sourceLocator: "Bùi Minh Đạo (2003): Cội nguồn thuần dưỡng voi rừng Buôn Đôn, nghi lễ cúng sức khỏe cầu an cho voi bên sông Sêrêpôk, tr. 180-205; Quyết định 2038/QĐ-UBND: Cam kết lộ trình chuyển đổi từ cưỡi voi và đua voi tốc độ cao sang mô hình quan sát và tương tác thân thiện nhân đạo.",
  localCommunity: "Cộng đồng người Mnông, Êđê, Lào tại buôn Đôn, xã Krông Na, huyện Buôn Đôn, tỉnh Đắk Lắk"
};

// 8. nghe-lam-chieu-nga-son
b8[7].provenance = {
  contentType: "FACT",
  sourceTitle: "Hồ sơ di sản làng nghề dệt chiếu Nga Sơn & Địa chí văn hóa Thanh Hóa",
  sourceAuthor: "Sở VHTTDL tỉnh Thanh Hóa; Viện Khoa học Xã hội; UBND huyện Nga Sơn",
  bibliography: "Sở VHTTDL Thanh Hóa, Hồ sơ khoa học làng nghề 'Nghề dệt chiếu cói truyền thống Nga Sơn'; Viện Nghiên cứu Văn hóa, 'Địa chí văn hóa Thanh Hóa' (Tập IV, NXB Thanh Hóa, 2005); Tạp chí Di sản Văn hóa, bài 'Kỹ thuật chẻ cói và dệt chiếu hoa Nga Sơn'.",
  sourceLocator: "'Địa chí văn hóa Thanh Hóa' (Tập IV, 2005): Mục Làng nghề chiếu cói ven đầm bãi bồi cửa biển, kỹ thuật chọn sợi đay giăng khung cửi và thao tác dập đôi hai người nhịp nhàng, in hoa văn chữ Thọ sắc nét, tr. 420-438.",
  localCommunity: "Cộng đồng nhân dân các xã Nga Thanh, Nga Liên, Nga Tiến, huyện Nga Sơn, tỉnh Thanh Hóa"
};

// 9. tuc-tho-ba-thuy-long-phu-quoc
b8[8].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định xếp hạng Di tích lịch sử - văn hóa Dinh Bà Thủy Long & Khảo cứu 'Nghiên cứu về Hà Tiên và Phú Quốc'",
  sourceAuthor: "UBND tỉnh Kiên Giang; Nhà nghiên cứu Trương Minh Đạt; Thạch Phương",
  bibliography: "UBND tỉnh Kiên Giang, Quyết định xếp hạng Di tích lịch sử - văn hóa cấp tỉnh Dinh Bà Thủy Long Thánh Mẫu (xã Cửa Cạn và thị trấn Dương Đông, thành phố Phú Quốc); Trương Minh Đạt, 'Nghiên cứu về Hà Tiên và Phú Quốc' (NXB Trẻ, 2001); Thạch Phương, 'Văn hóa dân gian Nam Bộ' (NXB Khoa học Xã hội, 1992).",
  sourceLocator: "Quyết định xếp hạng di tích Kiên Giang; Trương Minh Đạt (2001): Thần tích bà Kim Giao (dòng dõi hoàng tộc Chân Lạp có công khai khẩn đảo ngọc thời Mạc Cửu), nghi lễ tế xuân rằm tháng Giêng của ngư dân vạn chài Phú Quốc, tr. 185-210.",
  localCommunity: "Cộng đồng ngư dân và vạn chài tại xã Cửa Cạn và phường Dương Đông, thành phố Phú Quốc, tỉnh Kiên Giang"
};

// 10. le-hoi-chua-ong-dia-sai-gon
b8[9].provenance = {
  contentType: "FACT",
  sourceTitle: "Quyết định xếp hạng Di tích kiến trúc nghệ thuật Miếu Ông Địa & Chuyên khảo 'Tín ngưỡng dân gian Nam Bộ'",
  sourceAuthor: "UBND Thành phố Hồ Chí Minh; Huỳnh Ngọc Trảng; Sơn Nam",
  bibliography: "UBND Thành phố Hồ Chí Minh, Quyết định xếp hạng Di tích kiến trúc nghệ thuật Miếu Ông Địa (số 125 Lê Lợi, Phường 3, quận Gò Vấp); Huỳnh Ngọc Trảng, 'Tín ngưỡng dân gian Nam Bộ' (NXB Văn hóa - Văn nghệ, 2012); Sơn Nam, 'Bến Nghé xưa' (NXB Trẻ, 2001).",
  sourceLocator: "Quyết định xếp hạng di tích kiến trúc nghệ thuật TP.HCM; Huỳnh Ngọc Trảng (2012): Pho tượng gốm đất nung men nhiều màu hình Thổ Địa thế kỷ XIX, nghi lễ tế xuân mùng 2 tháng Hai âm lịch, nghệ thuật biểu diễn lân sư rồng và nghệ thuật múa bóng rỗi chầu thần, tr. 115-142.",
  localCommunity: "Cộng đồng nhân dân lao động cư ngụ quanh chợ Gò Vấp và Phường 3, quận Gò Vấp, Thành phố Hồ Chí Minh"
};

fs.writeFileSync(b8Path, JSON.stringify(b8, null, 2), "utf8");
console.log("Updated Batch 008 successfully!");
