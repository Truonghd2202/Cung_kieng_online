const fs = require("node:fs");
const path = require("node:path");

const plan = [
  // BATCH 001: Di sản Văn hóa UNESCO & Tín ngưỡng Cội nguồn (Bắc Bộ & Toàn quốc)
  {
    id: 1,
    slug: "tin-nguong-tho-cung-hung-vuong-phu-tho",
    title: "Tín ngưỡng thờ cúng Hùng Vương: Đạo lý nhớ nguồn và không gian núi Nghĩa Lĩnh",
    category: "Tín ngưỡng dân gian",
    region: "NORTH",
    intendedSource: "UNESCO — Worship of Hùng kings in Phú Thọ, hồ sơ 00735; Quyết định 7.COM 11.36",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },
  {
    id: 2,
    slug: "tho-mau-tam-phu-nguoi-viet",
    title: "Tín ngưỡng thờ Mẫu Tam phủ: Triết lý Mẹ thiên nhiên và sự gắn kết cộng đồng",
    category: "Tín ngưỡng dân gian",
    region: "NATIONWIDE",
    intendedSource: "UNESCO — Practices related to the Viet beliefs in the Mother Goddesses of Three Realms, hồ sơ 01064",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },
  {
    id: 3,
    slug: "quan-ho-bac-ninh-tuc-ket-cha",
    title: "Dân ca Quan họ Bắc Ninh: Nét đẹp tục kết chạ và lề lối ứng xử người quan họ",
    category: "Nghệ thuật dân gian",
    region: "NORTH",
    intendedSource: "UNESCO — Quan Họ Bắc Ninh folk songs, hồ sơ 00183; Sở VHTTDL Bắc Ninh",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },
  {
    id: 4,
    slug: "don-ca-tai-tu-nam-bo-nghe-thuat-ngau-hung",
    title: "Đờn ca tài tử Nam Bộ: Nghệ thuật tri âm và phong cách tài tử sông nước",
    category: "Nghệ thuật dân gian",
    region: "SOUTH",
    intendedSource: "UNESCO — Art of Đờn ca tài tử music and song in southern Viet Nam, hồ sơ 00733",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },
  {
    id: 5,
    slug: "nghe-thuat-bai-choi-trung-bo",
    title: "Nghệ thuật Bài Chòi Trung Bộ: Trò chơi dân gian gắn với câu hò và diễn xướng",
    category: "Nghệ thuật dân gian",
    region: "CENTRAL",
    intendedSource: "UNESCO — The art of Bài Chòi in Central Viet Nam, hồ sơ 01222",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },
  {
    id: 6,
    slug: "khong-gian-van-hoa-cong-chieng-tay-nguyen",
    title: "Không gian văn hóa Cồng chiêng Tây Nguyên: Tiếng nói thần linh giữa đại ngàn",
    category: "Nghệ thuật dân gian",
    region: "CENTRAL",
    intendedSource: "UNESCO — Space of gong culture, hồ sơ 00120; Viện Văn hóa Nghệ thuật Quốc gia",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },
  {
    id: 7,
    slug: "nha-nhac-cung-dinh-hue",
    title: "Nhã nhạc cung đình Huế: Hệ thống bài bản và giá trị lễ nhạc cung đình",
    category: "Nghệ thuật dân gian",
    region: "CENTRAL",
    intendedSource: "UNESCO — Nha Nhac, Vietnamese court music, hồ sơ 00074; Trung tâm Bảo tồn Di tích Cố đô Huế",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },
  {
    id: 8,
    slug: "hat-xoan-phu-tho-le-nghi-cua-dinh",
    title: "Hát Xoan Phú Thọ: Nguồn gốc hát thờ nơi cửa đình và lề lối canh xoan",
    category: "Nghệ thuật dân gian",
    region: "NORTH",
    intendedSource: "UNESCO — Xoan singing of Phú Thọ Province, hồ sơ 01260; Bảo tàng Hùng Vương",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },
  {
    id: 9,
    slug: "hat-ca-tru-thanh-am-co-truyen",
    title: "Hát Ca trù: Sự tinh tế của phách đách, tiếng đàn đáy và nghệ thuật thưởng thức",
    category: "Nghệ thuật dân gian",
    region: "NORTH",
    intendedSource: "UNESCO — Ca trù singing, hồ sơ 00309; Viện Âm nhạc Việt Nam",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },
  {
    id: 10,
    slug: "dan-ca-vi-giam-nghe-tinh",
    title: "Dân ca Ví, Giặm Nghệ Tĩnh: Lời ca lao động trên sông nước và đồng bãi xứ Nghệ",
    category: "Nghệ thuật dân gian",
    region: "CENTRAL",
    intendedSource: "UNESCO — Ví and Giặm folk songs of Nghệ Tĩnh, hồ sơ 01008; Sở VHTT Nghệ An & Hà Tĩnh",
    status: "COMPLETED",
    batchFile: "batch-001.json"
  },

  // BATCH 002: Lễ hội tiêu biểu & Nghi lễ cộng đồng ba miền
  {
    id: 11,
    slug: "hoi-giong-phu-dong-va-den-soc",
    title: "Hội Gióng đền Phù Đổng và đền Sóc: Kịch trường dân gian tái hiện hào khí dân tộc",
    category: "Lễ hội truyền thống",
    region: "NORTH",
    intendedSource: "UNESCO — Gióng festival of Phù Đổng and Sóc temples, hồ sơ 00443; Ban Quản lý Di tích Đền Sóc",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },
  {
    id: 12,
    slug: "le-hoi-keo-co-truyen-thong",
    title: "Nghi lễ và trò chơi kéo co: Biểu tượng cầu mùa và tinh thần gắn kết cộng đồng",
    category: "Lễ hội truyền thống",
    region: "NATIONWIDE",
    intendedSource: "UNESCO — Tugging rituals and games, hồ sơ 01080; Cục Di sản Văn hóa",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },
  {
    id: 13,
    slug: "nghi-le-then-tay-nung-thai",
    title: "Thực hành Then của người Tày, Nùng, Thái: Cầu an và thế giới quan tâm linh vùng cao",
    category: "Tín ngưỡng dân gian",
    region: "NORTH",
    intendedSource: "UNESCO — Practices of Then by Tày, Nùng and Thái ethnic groups in Viet Nam, hồ sơ 01379",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },
  {
    id: 14,
    slug: "le-hoi-via-ba-chua-xu-nui-sam",
    title: "Lễ hội Vía Bà Chúa Xứ Núi Sam: Nghi thức tắm Bà và đức tin Nam Bộ",
    category: "Lễ hội truyền thống",
    region: "SOUTH",
    intendedSource: "UNESCO — Festival of Bà Chúa Xứ Goddess at Sam Mountain, hồ sơ 01999; Ban Quản lý Lăng Miếu Núi Sam",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },
  {
    id: 15,
    slug: "nghe-lam-gom-nguoi-cham",
    title: "Nghệ thuật làm gốm của người Chăm: Kỹ thuật nặn tay không bàn xoay tại Bàu Trúc",
    category: "Tri thức dân gian & Nghề thủ công",
    region: "CENTRAL",
    intendedSource: "UNESCO — Art of pottery-making of Chăm people, hồ sơ 01574; Sở VHTTDL Ninh Thuận",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },
  {
    id: 16,
    slug: "le-hoi-cau-ngu-khanh-hoa",
    title: "Lễ hội Cầu Ngư và tục thờ Cá Ông: Tín ngưỡng che chở của ngư dân duyên hải",
    category: "Tín ngưỡng dân gian",
    region: "CENTRAL",
    intendedSource: "Cục Di sản Văn hóa — Quyết định ghi danh DSVH phi vật thể quốc gia; Cổng TTĐT tỉnh Khánh Hòa",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },
  {
    id: 17,
    slug: "tuc-tho-thanh-hoang-dinh-lang-bac-bo",
    title: "Tục thờ Thành hoàng đình làng Bắc Bộ: Vị thần bảo hộ và biểu tượng cội nguồn làng xã",
    category: "Tín ngưỡng dân gian",
    region: "NORTH",
    intendedSource: "Tạp chí Di sản Văn hóa — Cục Di sản Văn hóa; Luận án TS Trần Thị Hà Giang (Học viện CTQG HCM)",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },
  {
    id: 18,
    slug: "le-hoi-dien-hon-chen-hue",
    title: "Lễ hội Điện Hòn Chén: Không gian giao thoa giữa tín ngưỡng Mẫu và văn hóa Huế",
    category: "Lễ hội truyền thống",
    region: "CENTRAL",
    intendedSource: "Sở Văn hóa và Thể thao Thừa Thiên Huế — Hồ sơ di tích Điện Huệ Nam",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },
  {
    id: 19,
    slug: "le-via-ba-linh-son-thanh-mau-tay-ninh",
    title: "Lễ vía Bà Linh Sơn Thánh Mẫu Núi Bà Đen: Điểm tựa tâm linh trên đỉnh núi thiêng Tây Ninh",
    category: "Tín ngưỡng dân gian",
    region: "SOUTH",
    intendedSource: "Ban Quản lý Khu du lịch Quốc gia Núi Bà Đen; Cục Di sản Văn hóa",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },
  {
    id: 20,
    slug: "le-hoi-ok-om-bok-tra-vinh-soc-trang",
    title: "Lễ hội Ok Om Bok của người Khmer: Nghi thức cúng trăng tạ ơn mùa màng bội thu",
    category: "Lễ hội truyền thống",
    region: "SOUTH",
    intendedSource: "Sở VHTTDL tỉnh Trà Vinh & Sóc Trăng; Hồ sơ Di sản văn hóa phi vật thể quốc gia",
    status: "COMPLETED",
    batchFile: "batch-002.json"
  },

  // BATCH 003: Không gian đình, đền, chùa và kiến trúc tín ngưỡng cổ truyền
  {
    id: 21,
    slug: "kien-truc-dinh-tay-dang-ha-noi",
    title: "Đình Tây Đằng: Đỉnh cao nghệ thuật điêu khắc gỗ dân gian thế kỷ XVI",
    category: "Tín ngưỡng dân gian",
    region: "NORTH",
    intendedSource: "Cục Di sản Văn hóa — Di tích kiến trúc nghệ thuật đình Tây Đằng, Ba Vì, Hà Nội",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },
  {
    id: 22,
    slug: "den-tran-nam-dinh-hao-khi-dong-a",
    title: "Đền Trần Nam Định: Di tích lịch sử tưởng niệm các vua Trần và hào khí Đông A",
    category: "Lễ hội truyền thống",
    region: "NORTH",
    intendedSource: "Cổng Thông tin điện tử tỉnh Nam Định — Hồ sơ Di tích Quốc gia đặc biệt Đền Trần",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },
  {
    id: 23,
    slug: "phu-tay-ho-ha-noi",
    title: "Phủ Tây Hồ: Nơi gửi gắm ước nguyện và huyền tích Mẫu Liễu Hạnh giữa lòng Hà Nội",
    category: "Tín ngưỡng dân gian",
    region: "NORTH",
    intendedSource: "Ban Quản lý Di tích Phủ Tây Hồ; Cục Di sản Văn hóa",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },
  {
    id: 24,
    slug: "chua-mot-cot-bieu-tuong-hoa-sen",
    title: "Chùa Một Cột: Tác phẩm kiến trúc độc nhất và biểu tượng đóa sen nghìn năm",
    category: "Tín ngưỡng dân gian",
    region: "NORTH",
    intendedSource: "Khu Di tích Lịch sử Ba Đình; Bảo tàng Lịch sử Quốc gia",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },
  {
    id: 25,
    slug: "chua-dau-trung-tam-phat-giao-co",
    title: "Chùa Dâu Bắc Ninh: Khởi nguồn trung tâm Phật giáo cổ và hệ thống Tứ Pháp",
    category: "Tín ngưỡng dân gian",
    region: "NORTH",
    intendedSource: "Sở VHTTDL Bắc Ninh — Hồ sơ Di tích Quốc gia đặc biệt Chùa Dâu",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },
  {
    id: 26,
    slug: "chua-thien-mu-hue-bieu-tuong-co-do",
    title: "Chùa Thiên Mụ: Tháp Phước Duyên soi bóng Hương Giang và huyền tích dựng chùa",
    category: "Tín ngưỡng dân gian",
    region: "CENTRAL",
    intendedSource: "Trung tâm Bảo tồn Di tích Cố đô Huế; Hồ sơ Quần thể Di tích Cố đô Huế",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },
  {
    id: 27,
    slug: "chua-keo-thai-binh-kien-truc-go",
    title: "Chùa Keo Thái Bình: Nghệ thuật kết cấu gỗ và gác chuông độc đáo vùng đồng bằng",
    category: "Tín ngưỡng dân gian",
    region: "NORTH",
    intendedSource: "Cục Di sản Văn hóa — Di tích Quốc gia đặc biệt Chùa Keo",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },
  {
    id: 28,
    slug: "nha-ruong-xu-hue-tri-thuc-dung-nha",
    title: "Nhà rường xứ Huế: Sự hòa quyện giữa không gian sống, phong thủy và nếp nhà",
    category: "Tri thức dân gian & Nghề thủ công",
    region: "CENTRAL",
    intendedSource: "Bảo tàng Văn hóa Huế; Tạp chí Khoa học Đại học Huế",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },
  {
    id: 29,
    slug: "nha-san-truyen-thong-tay-bac",
    title: "Nhà sàn truyền thống của người Mường, Thái: Không gian sinh hoạt và triết lý trời tròn đất vuông",
    category: "Tri thức dân gian & Nghề thủ công",
    region: "NORTH",
    intendedSource: "Bảo tàng Dân tộc học Việt Nam; Viện Dân tộc học",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },
  {
    id: 30,
    slug: "chua-ong-hoi-an-giao-luu-van-hoa",
    title: "Chùa Ông Hội An: Dấu ấn giao lưu thương mại và tinh thần cộng cư phố cổ",
    category: "Tín ngưỡng dân gian",
    region: "CENTRAL",
    intendedSource: "Trung tâm Quản lý Bảo tồn Di sản Văn hóa Hội An",
    status: "COMPLETED",
    batchFile: "batch-003.json"
  },

  // BATCH 004: Phong tục vòng đời, đạo hiếu & Ký ức gia đình
  {
    id: 31,
    slug: "le-cung-day-thang-thoi-noi",
    title: "Lễ cúng đầy tháng, thôi nôi: Lời chúc phúc bình an cho sinh linh bé nhỏ",
    category: "Phong tục & Nghi lễ",
    region: "NATIONWIDE",
    intendedSource: "Viện Nghiên cứu Văn hóa; Tư liệu phong tục gia đình người Việt",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  },
  {
    id: 32,
    slug: "le-cung-ong-tao-ngay-hai-ba-thang-chap",
    title: "Tục cúng ông Công ông Táo: Nếp nghĩ ấm áp về gian bếp và đạo làm người",
    category: "Phong tục & Nghi lễ",
    region: "NATIONWIDE",
    intendedSource: "Cục Di sản Văn hóa; Bảo tàng Lịch sử Quốc gia",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  },
  {
    id: 33,
    slug: "mam-ngu-qua-ngay-tet-ba-mien",
    title: "Mâm ngũ quả ngày Tết ba miền: Khát vọng sung túc và sắc thái văn hóa từng vùng",
    category: "Phong tục & Nghi lễ",
    region: "NATIONWIDE",
    intendedSource: "Viện Văn hóa Nghệ thuật Quốc gia Việt Nam",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  },
  {
    id: 34,
    slug: "tiet-thanh-minh-va-tuc-tao-mo",
    title: "Tiết Thanh minh và tục tảo mộ: Nét đẹp phụng dưỡng tiền nhân của người Việt",
    category: "Phong tục & Nghi lễ",
    region: "NATIONWIDE",
    intendedSource: "Tạp chí Văn hóa Dân gian; Viện Hàn lâm Khoa học Xã hội Việt Nam",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  },
  {
    id: 35,
    slug: "le-vu-lan-va-tuc-bao-hieu",
    title: "Đại lễ Vu Lan: Ý nghĩa mùa báo hiếu và văn hóa tri ân cha mẹ trong đời sống",
    category: "Phong tục & Nghi lễ",
    region: "NATIONWIDE",
    intendedSource: "Tạp chí Nghiên cứu Tôn giáo; Giáo hội Phật giáo Việt Nam",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  },
  {
    id: 36,
    slug: "tuc-xong-dat-dau-nam-moi",
    title: "Tục xông đất đầu năm: Niềm tin khởi đầu thuận buồm xuôi gió của gia đình Việt",
    category: "Phong tục & Nghi lễ",
    region: "NATIONWIDE",
    intendedSource: "Bảo tàng Phụ nữ Việt Nam; Tư liệu phong tục Tết truyền thống",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  },
  {
    id: 37,
    slug: "tuc-an-trau-va-mieng-trau-dau-cau-chuyen",
    title: "Tục ăn trầu thuốc: Từ biểu tượng tình nghĩa đến nghi lễ giao tiếp truyền thống",
    category: "Phong tục & Nghi lễ",
    region: "NATIONWIDE",
    intendedSource: "Bảo tàng Dân tộc học Việt Nam; Chuyên khảo phong tục trầu cau",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  },
  {
    id: 38,
    slug: "le-cung-gio-chap-trong-gia-dinh",
    title: "Nghi lễ ngày giỗ chạp: Sợi dây kết nối quá khứ và sự sum vầy của con cháu",
    category: "Ký ức gia đình",
    region: "NATIONWIDE",
    intendedSource: "Viện Xã hội học; Báo cáo nghiên cứu quan hệ thế hệ gia đình",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  },
  {
    id: 39,
    slug: "tuc-mung-tho-nguoi-cao-tuoi",
    title: "Tục mừng thọ đầu xuân: Tôn vinh bậc cao niên và đạo hiếu trong cộng đồng",
    category: "Phong tục & Nghi lễ",
    region: "NATIONWIDE",
    intendedSource: "Hội Người cao tuổi Việt Nam; Cục Văn hóa Cơ sở",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  },
  {
    id: 40,
    slug: "tuc-buoc-chi-co-tay-nguoi-thai",
    title: "Tục buộc chỉ cổ tay của người Thái, Lào: Lời chúc lành và gìn giữ phần hồn",
    category: "Phong tục & Nghi lễ",
    region: "NORTH",
    intendedSource: "Bảo tàng Văn hóa các Dân tộc Việt Nam (Thái Nguyên)",
    status: "COMPLETED",
    batchFile: "batch-004.json"
  }
];

// Helper to fill remaining slots up to 200 items cleanly
const categories = [
  "Tín ngưỡng dân gian",
  "Lễ hội truyền thống",
  "Nghệ thuật dân gian",
  "Phong tục & Nghi lễ",
  "Tri thức dân gian & Nghề thủ công",
  "Ký ức gia đình"
];

// We define all topics 41 to 200 systematically with rigorous historical/cultural authenticity
const remainingTopics = [
  // BATCH 005: Lễ hội và nghi lễ vùng cao Tây Bắc, Đông Bắc (41-50)
  ["le-cap-sac-nguoi-dao-do", "Nghi lễ Cấp sắc của người Dao đỏ: Bước ngoặt trưởng thành và bổn phận đạo đức", "Phong tục & Nghi lễ", "NORTH", "Hồ sơ Di sản văn hóa phi vật thể quốc gia; Cục Di sản Văn hóa"],
  ["le-hoi-nhay-lua-nguoi-pa-then", "Lễ hội Nhảy lửa của người Pà Thẻn: Khát vọng xua tan u ám và rước may mắn", "Lễ hội truyền thống", "NORTH", "Sở VHTTDL tỉnh Hà Giang; Cục Di sản Văn hóa"],
  ["le-cung-than-rung-nguoi-pu-peo", "Lễ cúng thần rừng của người Pu Péo: Đạo lý giữ màu xanh nơi vách đá cao nguyên", "Tín ngưỡng dân gian", "NORTH", "Bảo tàng tỉnh Hà Giang; Quyết định công nhận DSVH quốc gia"],
  ["le-hoi-gau-tao-nguoi-hmong", "Lễ hội Gầu tào của người H'Mông: Lễ hội cầu con, cầu mùa bên sườn non", "Lễ hội truyền thống", "NORTH", "Sở VHTTDL tỉnh Lào Cai; Quyết định công nhận DSVH quốc gia"],
  ["le-hoi-long-tong-nguoi-tay", "Lễ hội Lồng tông của người Tày: Tiếng chiêng xuống đồng đầu xuân đón vụ mùa mới", "Lễ hội truyền thống", "NORTH", "Sở VHTTDL tỉnh Tuyên Quang; Cục Di sản Văn hóa"],
  ["le-cung-to-tien-nguoi-lo-lo", "Lễ cúng tổ tiên của người Lô Lô: Nghệ thuật hóa trang bằng cỏ cây và bài học cội rễ", "Tín ngưỡng dân gian", "NORTH", "Sở VHTTDL tỉnh Hà Giang; Cục Di sản Văn hóa"],
  ["le-hoi-cho-tinh-khau-vai", "Chợ phong lưu Khâu Vai: Nơi hò hẹn đầy nhân văn của những mối tình dang dở", "Lễ hội truyền thống", "NORTH", "UBND huyện Mèo Vạc; Cổng TTĐT tỉnh Hà Giang"],
  ["nghi-le-kin-pang-then-nguoi-thai", "Lễ hội Kin Pang Then của người Thái trắng: Tri ân thầy then và sự hòa hợp xóm bản", "Tín ngưỡng dân gian", "NORTH", "Sở VHTTDL tỉnh Lai Châu; Cục Di sản Văn hóa"],
  ["le-hoi-tro-tram-phu-ninh", "Lễ hội Trò Trám Tứ Xã: Trò diễn cổ xua tà và khát vọng phồn thực nguyên sơ", "Lễ hội truyền thống", "NORTH", "Bảo tàng Hùng Vương; Cổng TTĐT tỉnh Phú Thọ"],
  ["le-hoi-ruoc-phao-dong-ky", "Lễ hội rước pháo Đồng Kỵ: Tinh thần thượng võ và hào khí ngày hội xứ Kinh Bắc", "Lễ hội truyền thống", "NORTH", "Sở VHTTDL tỉnh Bắc Ninh; Cục Di sản Văn hóa"],

  // BATCH 006: Nghệ thuật diễn xướng & Tri thức dân gian miền Bắc (51-60)
  ["nghe-thuat-mua-roi-nuoc", "Múa rối nước truyền thống: Sân khấu mặt nước lung linh của người nông dân Bắc Bộ", "Nghệ thuật dân gian", "NORTH", "Nhà hát Múa rối Quốc gia; Viện Âm nhạc Việt Nam"],
  ["nghe-thuat-cheo-co-truyen", "Nghệ thuật Chèo cổ: Hồn cốt kịch hát dân gian thấu cảm số phận người phụ nữ", "Nghệ thuật dân gian", "NORTH", "Viện Âm nhạc Việt Nam; Nhà hát Chèo Việt Nam"],
  ["hat-van-trong-nghi-le-hau-dong", "Hát Văn trong diễn xướng chầu văn: Lời ca tôn vinh thần thánh và nhịp phách tâm linh", "Nghệ thuật dân gian", "NORTH", "Hồ sơ đệ trình UNESCO Thờ Mẫu; Viện Âm nhạc"],
  ["tranh-dan-gian-dong-ho", "Tranh dân gian Đông Hồ: Gam màu tự nhiên từ vỏ sò, lá chàm in trên giấy điệp", "Tri thức dân gian & Nghề thủ công", "NORTH", "Hồ sơ đệ trình UNESCO Tranh Đông Hồ; Cục Di sản Văn hóa"],
  ["tranh-dan-gian-hang-trong", "Tranh Hàng Trống: Nét vẽ vờn màu thanh nhã của chốn kinh kỳ thăng hoa", "Tri thức dân gian & Nghề thủ công", "NORTH", "Bảo tàng Mỹ thuật Việt Nam"],
  ["nghe-gom-bat-trang-nghin-nam", "Nghề gốm Bát Tràng: Men ngọc tro trấu và tinh hoa đất nung ven sông Hồng", "Tri thức dân gian & Nghề thủ công", "NORTH", "Hiệp hội Gốm sứ Bát Tràng; Cục Di sản Văn hóa"],
  ["nghe-det-lua-van-phuc", "Nghề dệt lụa Vạn Phúc: Tấm the mỏng nhẹ và tay nghề thoi dệt lụa Hà Đông", "Tri thức dân gian & Nghề thủ công", "NORTH", "Sở Du lịch Hà Nội; Hiệp hội Làng nghề Việt Nam"],
  ["nghe-duc-dong-ngu-xa", "Nghề đúc đồng Ngũ Xã: Kỹ thuật rót đồng nguyên khối tạo tác chuông đồng, tượng phật", "Tri thức dân gian & Nghề thủ công", "NORTH", "Bảo tàng Lịch sử Quốc gia; UBND quận Ba Đình"],
  ["nghe-lam-non-la-chuong", "Nghề làm nón làng Chuông: Từng đường kim mũi chỉ tạo nên nét duyên nón lá Việt", "Tri thức dân gian & Nghề thủ công", "NORTH", "Cổng TTĐT huyện Thanh Oai; Tạp chí Di sản Văn hóa"],
  ["tri-thuc-lam-tuong-ban", "Tri thức làm tương Bần Hưng Yên: Nghệ thuật lên men từ xôi nếp cái và đậu tương", "Tri thức dân gian & Nghề thủ công", "NORTH", "Sở Nông nghiệp và PTNT tỉnh Hưng Yên; Cục Sở hữu Trí tuệ"],

  // BATCH 007: Lễ hội & Tín ngưỡng miền Trung (61-70)
  ["le-hoi-thap-ba-ponagar-nha-trang", "Lễ hội Tháp Bà Ponagar: Điểm hẹn văn hóa của đồng bào Chăm và Việt tại Nha Trang", "Lễ hội truyền thống", "CENTRAL", "Ban Quản lý Di tích Tháp Bà Ponagar; Sở VHTTDL Khánh Hòa"],
  ["le-hoi-kate-nguoi-cham-ninh-thuan", "Lễ hội Katê của người Chăm Bàlamôn: Tiếng kèn Saranai và vũ điệu dâng tháp", "Lễ hội truyền thống", "CENTRAL", "Sở VHTTDL tỉnh Ninh Thuận; Quyết định công nhận DSVH quốc gia"],
  ["le-khao-le-the-linh-hoang-sa", "Lễ Khao lề thế lính Hoàng Sa: Nghi lễ tri ân những người mở cõi bảo vệ biển đảo", "Lễ hội truyền thống", "CENTRAL", "UBND huyện Lý Sơn; Cục Di sản Văn hóa"],
  ["le-hoi-chua-ba-binh-dinh", "Lễ hội Chùa Bà Nước Mặn: Dấu ấn thương cảng cổ và sự hòa hợp tín ngưỡng", "Lễ hội truyền thống", "CENTRAL", "Bảo tàng tỉnh Bình Định; Sở VHTTDL Bình Định"],
  ["le-hoi-dinh-lang-tuy-loan", "Lễ hội đình làng Túy Loan: Nét đẹp rước sắc phong và phong vị bánh tráng quê hương", "Lễ hội truyền thống", "CENTRAL", "Sở VHTTDL TP Đà Nẵng; Hồ sơ Di tích Quốc gia Đình Túy Loan"],
  ["vo-co-truyen-binh-dinh", "Võ cổ truyền Bình Định: Tinh thần thượng võ, đường roi thế quyền hào hùng đất võ", "Nghệ thuật dân gian", "CENTRAL", "Trung tâm Võ thuật Cổ truyền Bình Định; Cục Di sản Văn hóa"],
  ["nghe-thuat-tuong-xu-quang", "Hát Bội xứ Quảng: Sắc màu mặt nạ và tiếng trống chầu rộn rã sân đình", "Nghệ thuật dân gian", "CENTRAL", "Nhà hát Tuồng Nguyễn Hiển Dĩnh Đà Nẵng; Viện Sân khấu"],
  ["ca-hue-tren-song-huong", "Ca Huế trên sông Hương: Không gian tao nhã thính phòng giữa làn nước Hương Giang", "Nghệ thuật dân gian", "CENTRAL", "Sở VHTT Thừa Thiên Huế; Cục Di sản Văn hóa"],
  ["nghe-cham-khac-da-non-nuoc", "Nghề điêu khắc đá mỹ nghệ Non Nước: Bàn tay tài hoa đục đẽo linh hồn vào đá hoa cương", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "UBND quận Ngũ Hành Sơn; Cục Di sản Văn hóa"],
  ["nghe-lam-nuoc-mam-nam-o", "Nghề làm nước mắm Nam Ô: Vị mặn mòi hạt muối biển ngâm ủ cá cơm than", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "Sở Công thương TP Đà Nẵng; Cục Di sản Văn hóa"],

  // BATCH 008: Văn hóa Tây Nguyên & Duyên hải Nam Trung Bộ (71-80)
  ["su-thi-dam-san-tay-nguyen", "Sử thi Đăm Săn của người Êđê: Khúc tráng ca ngợi ca ý chí chinh phục thiên nhiên", "Nghệ thuật dân gian", "CENTRAL", "Viện Văn học; Bộ sách Sử thi Tây Nguyên"],
  ["le-hoi-dam-trau-tay-nguyen", "Lễ đâm trâu tạ ơn thần linh trong truyền thống: Góc nhìn nhân học và sự biến đổi hôm nay", "Lễ hội truyền thống", "CENTRAL", "Bảo tàng Đắk Lắk; Tạp chí Dân tộc học"],
  ["nha-rong-tay-nguyen-trai-tim-buon-lang", "Nhà rông Ba Na, Gia Rai: Trái tim của buôn làng và ngọn lửa gắn kết cộng đồng", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "Bảo tàng Dân tộc học Việt Nam"],
  ["nghe-det-tho-cam-nguoi-ede", "Nghề dệt thổ cẩm Êđê: Kỹ thuật luồn sợi dệt hoa văn hình học giàu biểu tượng", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "Bảo tàng Đắk Lắk; Sở VHTTDL Đắk Lắk"],
  ["le-bo-ma-nguoi-gia-rai", "Lễ bỏ mả Pơthi của người Gia Rai: Lễ hội tống tiễn người đã khuất về miền vĩnh hằng", "Tín ngưỡng dân gian", "CENTRAL", "Bảo tàng tỉnh Gia Lai; Cục Di sản Văn hóa"],
  ["le-cung-ben-nuoc-tay-nguyen", "Lễ cúng bến nước buôn làng: Tấm lòng tri ân mẹ nguồn nước trong veo mát lành", "Tín ngưỡng dân gian", "CENTRAL", "Sở VHTTDL tỉnh Kon Tum; Cục Di sản Văn hóa"],
  ["le-hoi-dua-voi-buon-don", "Lễ hội đua voi Buôn Đôn: Nét đẹp thuần dưỡng voi rừng và tình yêu thiên nhiên đại ngàn", "Lễ hội truyền thống", "CENTRAL", "Trung tâm Bảo tồn Du lịch Bản Đôn; Sở VHTTDL Đắk Lắk"],
  ["nghe-lam-chieu-nga-son", "Nghề dệt chiếu cói Nga Sơn: Tấm chiếu hoa bền đẹp dệt nên từ ngọn cói ven đầm", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "UBND huyện Nga Sơn; Cục Di sản Văn hóa"],
  ["tuc-tho-ba-thuy-long-phu-quoc", "Tín ngưỡng thờ Thủy Long Thánh Mẫu Phú Quốc: Nữ thần sông nước che chở đảo ngọc", "Tín ngưỡng dân gian", "SOUTH", "Ban Quản lý Dinh Cậu Phú Quốc; Sở VHTTDL Kiên Giang"],
  ["le-hoi-chua-ong-dia-sai-gon", "Lễ hội miếu Ông Địa quận Gò Vấp: Nét sinh hoạt văn hóa dân dã của người Sài Gòn xưa", "Tín ngưỡng dân gian", "SOUTH", "UBND quận Gò Vấp; Sở VHTT TP Hồ Chí Minh"],

  // BATCH 009: Văn hóa Nam Bộ & Sông nước miệt vườn (81-90)
  ["tin-nguong-tho-ong-dia-than-tai-nam-bo", "Tục thờ Thần Tài - Thổ Địa ở Nam Bộ: Tinh thần dung dị và khát vọng an cư lập nghiệp", "Tín ngưỡng dân gian", "SOUTH", "Viện Khoa học Xã hội Vùng Nam Bộ; Tạp chí Phát triển KH&CN"],
  ["chua-ba-thien-hau-cho-lon", "Chùa Bà Thiên Hậu Chợ Lớn: Nơi gửi gắm niềm tin vượt biển của cộng đồng Hoa - Việt", "Tín ngưỡng dân gian", "SOUTH", "Ban Quản trị Hội quán Tuệ Thành; Sở VHTT TP.HCM"],
  ["le-hoi-ky-yen-dinh-than-nam-bo", "Lễ hội Kỳ Yên đình thần Nam Bộ: Lễ cúng cầu an xóm làng sau mùa thu hoạch lúa", "Lễ hội truyền thống", "SOUTH", "Bảo tàng Lịch sử TP Hồ Chí Minh; Cục Di sản Văn hóa"],
  ["le-hoi-nghinh-ong-can-gio", "Lễ hội Nghinh Ông Cần Giờ: Đoàn tàu rước cá voi rộn rã cửa biển phương Nam", "Lễ hội truyền thống", "SOUTH", "UBND huyện Cần Giờ; Sở VHTT TP Hồ Chí Minh"],
  ["van-hoa-cho-noi-cai-rang", "Văn hóa chợ nổi Cái Răng: Cây bẹo dựng đầu ghe và nhịp thở giao thương sông nước", "Tri thức dân gian & Nghề thủ công", "SOUTH", "Sở VHTTDL TP Cần Thơ; Cục Di sản Văn hóa"],
  ["nghe-chieu-dinh-yen-dong-thap", "Nghề dệt chiếu Định Yên: Nét độc đáo của chợ chiếu ma huyền thoại bên sông Hậu", "Tri thức dân gian & Nghề thủ công", "SOUTH", "UBND huyện Lấp Vò; Cục Di sản Văn hóa"],
  ["nghe-lam-banh-trang-my-long", "Nghề làm bánh tráng Mỹ Lồng Bến Tre: Vị béo thơm nước cốt dừa trên vỉ bánh nướng", "Tri thức dân gian & Nghề thủ công", "SOUTH", "Sở Công thương tỉnh Bến Tre; Cục Di sản Văn hóa"],
  ["nghe-son-mai-tuong-binh-hiep", "Nghề sơn mài Tương Bình Hiệp Bình Dương: Lớp vỏ trứng sơn ta óng ánh qua hàng thế kỷ", "Tri thức dân gian & Nghề thủ công", "SOUTH", "Bảo tàng tỉnh Bình Dương; Cục Di sản Văn hóa"],
  ["nghe-lam-gom-lai-thieu", "Gốm Lái Thiêu Bình Dương: Bình dị men xanh bông mai gắn bó đời sống cư dân Nam Bộ", "Tri thức dân gian & Nghề thủ công", "SOUTH", "Chi hội Gốm sứ Bình Dương; Sở VHTTDL Bình Dương"],
  ["le-cung-trang-chol-chnam-thmay", "Tết Chol Chnam Thmay của người Khmer: Lễ đắp núi cát và mừng năm mới rộn ràng", "Lễ hội truyền thống", "SOUTH", "Bảo tàng Văn hóa Khmer Trà Vinh; Cục Di sản Văn hóa"],

  // BATCH 010: Phong tục nếp nhà & Đạo lý cội nguồn (91-100)
  ["tuc-tho-cung-to-tien-trong-nha", "Bàn thờ gia tiên trong ngôi nhà Việt: Trục tâm linh hướng thiện và bài học tri ân", "Ký ức gia đình", "NATIONWIDE", "Viện Nghiên cứu Gia đình và Giới; Tạp chí Văn hóa Nghệ thuật"],
  ["gia-pha-va-viec-ghi-chep-dong-ho", "Ý nghĩa của việc lập gia phả dòng họ: Giữ gìn nguồn cội và lời răn dạy cháu con", "Ký ức gia đình", "NATIONWIDE", "Hội Khoa học Lịch sử Việt Nam; Trung tâm Nghiên cứu Gia phả"],
  ["tuc-goi-banh-chung-ngay-tet", "Tục gói bánh chưng, bánh tét ngày Tết: Triết lý vuông tròn gói trọn tình thân sum vầy", "Phong tục & Nghi lễ", "NATIONWIDE", "Bảo tàng Lịch sử Quốc gia"],
  ["tuc-xin-chu-dau-nam-van-mieu", "Tục xin chữ đầu xuân nơi Văn Miếu: Trọng chữ, hiếu học và khát vọng trí tuệ", "Phong tục & Nghi lễ", "NORTH", "Trung tâm Hoạt động VHKH Văn Miếu - Quốc Tử Giám"],
  ["tuc-le-xem-tuoi-xay-nha", "Tục xem hướng và chọn tuổi cất nhà: Tâm lý cầu an và tri thức kinh nghiệm dân gian", "Phong tục & Nghi lễ", "NATIONWIDE", "Viện Kiến trúc Quốc gia; Tạp chí Kiến trúc"],
  ["tuc-le-cuoi-hoi-truyen-thong", "Nghi lễ cưới hỏi truyền thống: Từ dạm ngõ đến rước dâu và ý nghĩa trầu cau kết tóc", "Phong tục & Nghi lễ", "NATIONWIDE", "Bảo tàng Phụ nữ Nam Bộ; Tư liệu nếp cưới xưa"],
  ["tuc-le-mung-sinh-nhat-nguoi-xua", "Lễ chúc thọ và quan niệm về tuổi tác của tiền nhân: Kính lão đắc thọ", "Ký ức gia đình", "NATIONWIDE", "Viện Triết học; Tạp chí Nghiên cứu Con người"],
  ["le-cung-cau-ngu-o-mien-tay", "Tín ngưỡng thờ Cá Ông tại Kiên Giang và Cà Mau: Niềm tin chở che bão tố phương Nam", "Tín ngưỡng dân gian", "SOUTH", "Bảo tàng tỉnh Kiên Giang; Cục Di sản Văn hóa"],
  ["tuc-tho-ba-chua-ngoc-nam-bo", "Tín ngưỡng thờ Bà Chúa Ngọc (Thiên Y A Na) ở Nam Bộ: Dấu ấn giao thoa Việt - Chăm", "Tín ngưỡng dân gian", "SOUTH", "Viện KHXH Vùng Nam Bộ; Tạp chí Dân tộc học"],
  ["nghe-lam-luoi-danh-ca-bien", "Nghề đan lưới vá chài của ngư dân ven biển: Bàn tay kiên nhẫn trước sóng gió đại dương", "Tri thức dân gian & Nghề thủ công", "NATIONWIDE", "Bảo tàng Hải dương học Nha Trang; Hội Nghề cá Việt Nam"],

  // BATCH 011: Lễ hội lịch sử & Tưởng niệm tiền nhân (101-110)
  ["le-hoi-den-hai-ba-trung-me-linh", "Lễ hội Đền Hai Bà Trưng Mê Linh: Khí phách nữ tướng anh hùng mở đầu trang sử độc lập", "Lễ hội truyền thống", "NORTH", "Ban Quản lý Di tích Đền Hai Bà Trưng; Cục Di sản Văn hóa"],
  ["le-hoi-den-kiep-bac-hai-duong", "Lễ hội Kiếp Bạc: Tưởng niệm Quốc công Tiết chế Hưng Đạo Đại Vương Trần Quốc Tuấn", "Lễ hội truyền thống", "NORTH", "Ban Quản lý Di tích Côn Sơn - Kiếp Bạc; Sở VHTTDL Hải Dương"],
  ["le-hoi-den-ba-trieu-thanh-hoa", "Lễ hội Đền Bà Triệu: Khí phách 'cưỡi cơn gió mạnh đạp luồng sóng dữ' đất Cửu Chân", "Lễ hội truyền thống", "CENTRAL", "Sở VHTTDL tỉnh Thanh Hóa; Di tích Quốc gia đặc biệt"],
  ["le-hoi-dong-da-ha-noi", "Lễ hội gò Đống Đa: Khúc ca khải hoàn đại phá quân Thanh của Hoàng đế Quang Trung", "Lễ hội truyền thống", "NORTH", "Trung tâm Văn hóa Thông tin quận Đống Đa; Cục Di sản Văn hóa"],
  ["le-hoi-den-do-bac-ninh", "Lễ hội Đền Đô: Nơi hội tụ anh linh bát vị Hoàng đế triều Lý rực rỡ văn minh", "Lễ hội truyền thống", "NORTH", "Ban Quản lý Di tích Đền Đô; Sở VHTTDL Bắc Ninh"],
  ["le-hoi-tich-dien-doi-son", "Lễ hội Tịch điền Đọi Sơn: Đường cày đầu xuân khuyến nông của bậc minh quân", "Lễ hội truyền thống", "NORTH", "Sở VHTTDL tỉnh Hà Nam; Cục Di sản Văn hóa"],
  ["le-hoi-yen-the-bac-giang", "Lễ hội Yên Thế: Tinh thần bất khuất của nghĩa quân Hoàng Hoa Thám giữa rừng thiêng", "Lễ hội truyền thống", "NORTH", "Bảo tàng tỉnh Bắc Giang; Cục Di sản Văn hóa"],
  ["le-hoi-co-loa-ha-noi", "Lễ hội Cổ Loa: Huyền tích nỏ thần thành ốc và bài học giữ nước của vua An Dương Vương", "Lễ hội truyền thống", "NORTH", "Trung tâm Bảo tồn Di sản Thăng Long - Hà Nội"],
  ["le-hoi-den-con-nghe-an", "Lễ hội Đền Cờn Nghệ An: Tứ vị Thánh Nương bảo hộ sông biển và câu tục ngữ 'Nhất Cờn'", "Lễ hội truyền thống", "CENTRAL", "UBND thị xã Hoàng Mai; Sở VHTT Nghệ An"],
  ["le-hoi-den-qua-son-nghe-an", "Lễ hội Đền Quả Sơn: Tưởng nhớ công đức Uy Minh Vương Lý Nhật Quang khai phá xứ Nghệ", "Lễ hội truyền thống", "CENTRAL", "UBND huyện Đô Lương; Sở VHTT Nghệ An"],

  // BATCH 012: Tín ngưỡng nông nghiệp & Lễ hội sông nước (111-120)
  ["le-hoi-chua-thay-ha-noi", "Lễ hội Chùa Thầy: Dấu ấn Thiền sư Từ Đạo Hạnh và cái nôi nghệ thuật múa rối nước", "Lễ hội truyền thống", "NORTH", "Ban Quản lý Di tích Chùa Thầy; UBND huyện Quốc Oai"],
  ["le-hoi-chua-tay-phuong", "Lễ hội Chùa Tây Phương: Tuyệt tác pho tượng La Hán và triết lý Phật giáo thâm trầm", "Lễ hội truyền thống", "NORTH", "Ban Quản lý Di tích Chùa Tây Phương; Huyện Thạch Thất"],
  ["le-hoi-chua-huong-ha-noi", "Lễ hội Chùa Hương: Hành trình trẩy hội suối Yến tìm về miền đất Phật thanh tịnh", "Lễ hội truyền thống", "NORTH", "Ban Tổ chức Lễ hội Chùa Hương; Huyện Mỹ Đức"],
  ["le-hoi-phao-dat-hai-duong", "Trò chơi pháo đất Hải Dương: Sức mạnh đôi tay của người nông dân đắp bồi bờ cõi", "Nghệ thuật dân gian", "NORTH", "Sở VHTTDL tỉnh Hải Dương; Cục Di sản Văn hóa"],
  ["le-hoi-vat-lang-mai-dong", "Hội vật Mai Động: Đòn miếng thượng võ của các đô vật đất Thăng Long", "Lễ hội truyền thống", "NORTH", "UBND quận Hoàng Mai; Trung tâm Thể thao Hà Nội"],
  ["le-hoi-dua-thuyen-tren-song-han", "Lễ hội đua thuyền truyền thống Đà Nẵng: Nhịp chèo dũng mãnh của ngư dân miền Trung", "Lễ hội truyền thống", "CENTRAL", "Sở VHTTDL TP Đà Nẵng; Hội Văn nghệ Dân gian Đà Nẵng"],
  ["le-hoi-ruoc-muc-dong-da-nang", "Lễ hội Rước Mục Đồng Phong Lệ: Ngày hội độc đáo tôn vinh trẻ chăn trâu xứ Quảng", "Lễ hội truyền thống", "CENTRAL", "Bảo tàng Đà Nẵng; Hội đồng Làng Phong Lệ"],
  ["le-hoi-bap-non-hoi-an", "Lễ hội Cầu bông Trà Quế: Tạ ơn trời đất ban tặng hương rau thơm nức tiếng Hội An", "Lễ hội truyền thống", "CENTRAL", "UBND TP Hội An; Hợp tác xã Nông nghiệp Trà Quế"],
  ["le-hoi-katun-nguoi-raglai", "Nghi lễ tạ ơn Yang của người Raglai: Tiếng mã la ngân vang nơi sườn núi Khánh Hòa", "Tín ngưỡng dân gian", "CENTRAL", "Sở VHTTDL tỉnh Khánh Hòa; Cục Di sản Văn hóa"],
  ["le-hoi-dinh-co-long-hai", "Lễ hội Dinh Cô Long Hải: Đức tin của ngư dân miền Đông Nam Bộ bên sóng biển Bà Rịa", "Tín ngưỡng dân gian", "SOUTH", "Ban Quản lý Di tích Dinh Cô; Sở VHTTDL Bà Rịa - Vũng Tàu"],

  // BATCH 013: Tri thức dân gian ẩm thực & Ứng xử với tự nhiên (121-130)
  ["van-hoa-uong-tra-nguoi-viet", "Nghệ thuật thưởng trà Việt: Từ chén trà ướp sen Tây Hồ đến triết lý hòa ái nhân sinh", "Tri thức dân gian & Nghề thủ công", "NATIONWIDE", "Hiệp hội Chè Việt Nam; Tạp chí Nghiên cứu Văn hóa"],
  ["tri-thuc-nau-pho-ha-noi-nam-dinh", "Nghệ thuật nấu Phở: Tinh hoa nước dùng hầm xương và hương vị quốc hồn quốc túy", "Tri thức dân gian & Nghề thủ công", "NORTH", "Hồ sơ đề cử Di sản văn hóa phi vật thể; Hiệp hội Văn hóa Ẩm thực VN"],
  ["tri-thuc-lam-mam-tom-hau-loc", "Tri thức ủ mắm tôm Hậu Lộc Thanh Hóa: Hương vị nồng nàn chắt chiu từ moi biển tươi", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "Sở Nông nghiệp & PTNT Thanh Hóa; Cục Sở hữu Trí tuệ"],
  ["nghe-lam-com-lang-vong", "Nghề làm cốm làng Vòng: Hạt ngọc xanh mùa thu gói trọn hương thơm lá sen", "Tri thức dân gian & Nghề thủ công", "NORTH", "UBND quận Cầu Giấy; Sở Du lịch Hà Nội"],
  ["tri-thuc-lam-banh-dau-xanh-hai-duong", "Bánh đậu xanh Hải Dương: Món quà thanh ngọt tao nhã bên chén trà mạn ấm nóng", "Tri thức dân gian & Nghề thủ công", "NORTH", "Hiệp hội Bánh đậu xanh Hải Dương; Sở Công thương"],
  ["tri-thuc-lam-me-xung-hue", "Mè xửng xứ Huế: Miếng kẹo dẻo thơm hạt mè gắn bó hoài niệm đất Cố đô", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "Sở Công thương Thừa Thiên Huế; Hội Nghề truyền thống Huế"],
  ["van-hoa-mam-ca-chau-doc", "Văn hóa làm mắm cá Châu Đốc: 'Thủ phủ mắm' miệt vườn đất An Giang", "Tri thức dân gian & Nghề thủ công", "SOUTH", "Sở Công thương tỉnh An Giang; Bảo tàng tỉnh An Giang"],
  ["nghe-lam-duong-thot-not-an-giang", "Nghề nấu đường thốt nốt Bảy Núi: Vị ngọt lành từ ngọn cây của người Khmer", "Tri thức dân gian & Nghề thủ công", "SOUTH", "UBND thị xã Tịnh Biên; Cục Di sản Văn hóa"],
  ["tri-thuc-thuoc-nam-tue-tinh", "Tri thức y học cổ truyền Nam dược: Triết lý 'Nam dược trị Nam nhân' của Tuệ Tĩnh", "Tri thức dân gian & Nghề thủ công", "NATIONWIDE", "Viện Y Dược học Dân tộc; Hội Nam y Việt Nam"],
  ["kinh-nghiem-xem-thoi-tiet-dan-gian", "Kinh nghiệm trông trời nhìn mây của nhà nông: Tri thức quan sát đúc kết nghìn năm", "Tri thức dân gian & Nghề thủ công", "NATIONWIDE", "Viện Hàn lâm Khoa học Xã hội; Viện Văn học Dân gian"],

  // BATCH 014: Âm nhạc & Nhạc cụ truyền thống các dân tộc (131-140)
  ["dan-bau-thanh-am-hon-viet", "Đàn bầu: Cung thanh cung trầm từ một dây đàn rung động tâm hồn người Việt", "Nghệ thuật dân gian", "NATIONWIDE", "Học viện Âm nhạc Quốc gia Việt Nam; Viện Âm nhạc"],
  ["dan-tranh-tieng-to-dong-viet-nam", "Đàn tranh 16 dây: Tiếng tơ thanh thoát trong dàn nhạc cổ truyền và ca tài tử", "Nghệ thuật dân gian", "NATIONWIDE", "Viện Âm nhạc Việt Nam"],
  ["dan-nguyet-cay-dan-kim-san-khau", "Đàn nguyệt: Cây đàn kim định hình giai điệu chầu văn, ca trù và đờn ca", "Nghệ thuật dân gian", "NATIONWIDE", "Khoa Âm nhạc Truyền thống - Nhạc viện TP.HCM"],
  ["dan-da-tay-nguyen-thanh-am-thoi-tien-su", "Đàn đá Tây Nguyên: Thanh âm vang vọng nghìn năm từ lòng đất bazan", "Nghệ thuật dân gian", "CENTRAL", "Bảo tàng Lịch sử Quốc gia; Bảo tàng Lâm Đồng"],
  ["ken-saranai-hon-nhac-nguoi-cham", "Kèn Saranai: Tiếng kèn réo rắt linh thiêng trong ngày hội của người Chăm", "Nghệ thuật dân gian", "CENTRAL", "Trung tâm Nghiên cứu Văn hóa Chăm Ninh Thuận"],
  ["khen-hmong-tieng-long-chang-trai-mong", "Khèn Mông: Nhạc cụ cất lên tiếng lòng, lời tỏ tình và bước nhảy vách núi", "Nghệ thuật dân gian", "NORTH", "Bảo tàng Dân tộc học Việt Nam; Sở VHTTDL Hà Giang"],
  ["dan-tinh-tieng-hat-then-tay-nung", "Đàn tính: Chiếc bầu tròn rung lên cung đàn kết nối con người với cõi then", "Nghệ thuật dân gian", "NORTH", "Hồ sơ Di sản UNESCO Thực hành Then; Sở VHTT Cao Bằng"],
  ["trong-com-nhip-dieu-dan-da", "Trống cơm: Âm sắc ấm áp vui tươi trong khúc ca giao duyên Bắc Bộ", "Nghệ thuật dân gian", "NORTH", "Viện Âm nhạc; Nhà hát Ca Múa Nhạc Dân gian"],
  ["dan-klong-put-tieng-vo-tay-nong-nghiep", "Đàn Klông-pút của phụ nữ Tây Nguyên: Tiếng vỗ tay gọi lúa trổ bông trĩu hạt", "Nghệ thuật dân gian", "CENTRAL", "Bảo tàng tỉnh Kon Tum; Sở VHTTDL Gia Lai"],
  ["chieng-muong-thanh-am-xu-muong", "Cồng chiêng người Mường: Hệ thống 12 chiếc chiêng tượng trưng 12 tháng bốn mùa", "Nghệ thuật dân gian", "NORTH", "Sở VHTTDL tỉnh Hòa Bình; Bảo tàng Không gian Văn hóa Mường"],

  // BATCH 015: Truyền thuyết dân gian & Di tích lịch sử (141-150)
  ["truyen-thuyet-son-tinh-thuy-tinh", "Truyền thuyết Sơn Tinh - Thủy Tinh: Bài ca ngự thủy hào hùng của cư dân lúa nước", "Tín ngưỡng dân gian", "NORTH", "Viện Văn học; Tạp chí Văn hóa Dân gian"],
  ["truyen-thuyet-chu-dong-tu-tien-dung", "Truyền thuyết Chử Đồng Tử - Tiên Dung: Bản tình ca vượt giai cấp và đạo hiếu vẹn tròn", "Tín ngưỡng dân gian", "NORTH", "Cổng thông tin Sở VHTTDL Hưng Yên; Lễ hội Đền Đa Hòa"],
  ["truyen-thuyet-thanh-giong", "Huyền thoại Thánh Gióng: Biểu tượng sức mạnh quật cường bảo vệ giang sơn bờ cõi", "Tín ngưỡng dân gian", "NORTH", "Viện Nghiên cứu Hán Nôm; Hội đồng Di sản Văn hóa Quốc gia"],
  ["huyen-tich-ba-chua-kho-bac-ninh", "Huyền tích Bà Chúa Kho Bắc Ninh: Thực hư chuyện 'vay vốn' và bài học giữ gìn kho lương", "Tín ngưỡng dân gian", "NORTH", "Ban Quản lý Di tích Đền Bà Chúa Kho; Báo Bắc Ninh"],
  ["huyen-tich-an-duong-vuong-my-chau", "Truyện An Dương Vương và Mỵ Châu: Nỗi niềm cảnh giác trước họa xâm lăng", "Tín ngưỡng dân gian", "NORTH", "Bảo tàng Lịch sử Quốc gia; Viện Khảo cổ học"],
  ["huyen-tich-da-trach-da-hoa", "Đầm Dạ Trạch và đền Dạ Hòa: Khúc ca bi tráng thời khởi nghĩa Triệu Quang Phục", "Lễ hội truyền thống", "NORTH", "UBND huyện Khoái Châu; Bảo tàng tỉnh Hưng Yên"],
  ["huyen-tich-ong-hoang-muoi-nghe-an", "Huyền tích Ông Hoàng Mười: Vị quan văn võ toàn tài chở che nhân dân xứ Nghệ", "Tín ngưỡng dân gian", "CENTRAL", "Ban Quản lý Di tích Đền Ông Hoàng Mười; Huyện Hưng Nguyên"],
  ["huyen-tich-ong-hoang-bay-bao-ha", "Huyền tích Ông Hoàng Bảy Bảo Hà: Vị tướng trấn ải biên cương bảo vệ bờ cõi", "Tín ngưỡng dân gian", "NORTH", "Ban Quản lý Di tích Đền Bảo Hà; Tỉnh Lào Cai"],
  ["huyen-tich-thien-y-a-na-khanh-hoa", "Huyền tích Mẹ Xứ Sở Po Ino Nagar: Người khai sơn lập địa dạy dân trồng cấy dệt vải", "Tín ngưỡng dân gian", "CENTRAL", "Bảo tàng Khánh Hòa; Sở VHTTDL tỉnh Khánh Hòa"],
  ["huyen-tich-tho-than-nui-tan-vien", "Huyền tích Tản Viên Sơn Thánh: Đệ nhất phúc thần trong Tứ bất tử của người Việt", "Tín ngưỡng dân gian", "NORTH", "Khu Di tích Đền Thượng Ba Vì; Viện Văn hóa Nghệ thuật"],

  // BATCH 016: Không gian làng nghề & Kiến trúc cảnh quan (151-160)
  ["lang-co-duong-lam-da-ong", "Làng cổ Đường Lâm: Vẻ đẹp trầm mặc đá ong và nếp nhà rêu phong xứ Đoài", "Tri thức dân gian & Nghề thủ công", "NORTH", "Ban Quản lý Di tích Làng cổ Đường Lâm; Thị xã Sơn Tây"],
  ["pho-co-dong-van-ha-giang", "Phố cổ Đồng Văn: Dấu ấn kiến trúc tường trình trình đất giữa lòng cao nguyên đá", "Tri thức dân gian & Nghề thủ công", "NORTH", "Ban Quản lý Công viên Địa chất Toàn cầu Cao nguyên đá Đồng Văn"],
  ["kien-truc-thap-cham-my-son", "Thánh địa Mỹ Sơn: Nghệ thuật xếp gạch không dùng vữa kỳ diệu của người Chăm", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "Ban Quản lý Di sản Văn hóa Mỹ Sơn; UNESCO World Heritage"],
  ["chua-tam-chuc-ha-nam", "Chùa Tam Chúc: Sự kết hợp giữa cảnh quan non nước và không gian tâm linh hiện đại", "Tín ngưỡng dân gian", "NORTH", "Ban Quản lý Khu du lịch Quốc gia Tam Chúc; Tỉnh Hà Nam"],
  ["chua-bai-dinh-ninh-binh", "Chùa Bái Đính cổ và mới: Hành trình tìm về không gian Phật giáo giữa lòng Cố đô Hoa Lư", "Tín ngưỡng dân gian", "NORTH", "Sở Du lịch tỉnh Ninh Bình; Giáo hội Phật giáo VN tỉnh Ninh Bình"],
  ["thien-vien-truc-lam-yen-tu", "Thiền phái Trúc Lâm Yên Tử: Triết lý Phật giáo nhập thế của Phật hoàng Trần Nhân Tông", "Tín ngưỡng dân gian", "NORTH", "Ban Quản lý Di tích Yên Tử; Tỉnh Quảng Ninh"],
  ["kien-truc-chua-khmer-nam-bo", "Kiến trúc chùa Khmer Nam Bộ: Tháp nhọn Prang vươn cao và bích họa đời đức Phật", "Tín ngưỡng dân gian", "SOUTH", "Bảo tàng Văn hóa Dân tộc Khmer Sóc Trăng; Viện Dân tộc học"],
  ["chua-doi-soc-trang", "Chùa Dơi Sóc Trăng: Ngôi chùa cổ Mahatup và sự bao dung che chở đàn dơi tự nhiên", "Tín ngưỡng dân gian", "SOUTH", "Ban Quản trị Chùa Mahatup; Sở VHTTDL tỉnh Sóc Trăng"],
  ["chua-hang-tra-vinh", "Chùa Hang Trà Vinh: Không gian chim muông trú ngụ và nghệ thuật điêu khắc rễ cây", "Tín ngưỡng dân gian", "SOUTH", "Ban Quản trị Chùa Kompong Chray; Tỉnh Trà Vinh"],
  ["toa-thanh-tay-ninh-dao-cao-dai", "Tòa thánh Tây Ninh: Kiến trúc độc đáo và triết lý dung hợp của đạo Cao Đài", "Tín ngưỡng dân gian", "SOUTH", "Hội thánh Cao Đài Tòa thánh Tây Ninh; Bảo tàng Tây Ninh"],

  // BATCH 017: Nghi lễ chu kỳ mùa vụ & Sinh hoạt dân gian (161-170)
  ["le-hoi-ruoc-nuoc-song-hong", "Nghi thức rước nước sông Hồng: Khát vọng mưa thuận gió hòa của cư dân lúa nước", "Lễ hội truyền thống", "NORTH", "Bảo tàng Hưng Yên; Lễ hội Đền Chử Đồng Tử"],
  ["le-cung-com-moi-nguoi-muong", "Lễ mừng cơm mới của người Mường: Bát cơm dẻo đầu mùa dâng cúng tổ tiên", "Tín ngưỡng dân gian", "NORTH", "Sở VHTTDL tỉnh Hòa Bình; Viện Văn hóa Dân gian"],
  ["tuc-ruoc-cay-bong-nguoi-thai", "Tục rước cây bông trong lễ hội xên bản của người Thái: Ước vọng hoa thơm trái ngọt", "Lễ hội truyền thống", "NORTH", "Bảo tàng tỉnh Sơn La; Cục Di sản Văn hóa"],
  ["le-hoi-chua-ba-chua-xu-vinh-te", "Lễ hội miếu Bà Chúa Xứ Vĩnh Tế: Tưởng nhớ công đức Thoại Ngọc Hầu đào kênh", "Lễ hội truyền thống", "SOUTH", "Ban Quản lý Di tích Thoại Ngọc Hầu; TP Châu Đốc"],
  ["le-cung-bien-my-long-tra-vinh", "Lễ hội cúng Biển Mỹ Long: Ba ngày hội nghinh ông cầu sóng yên biển lặng đất Trà Vinh", "Lễ hội truyền thống", "SOUTH", "UBND huyện Cầu Ngang; Sở VHTTDL Trà Vinh"],
  ["tuc-tha-hoa-dang-ngay-ram-thang-bay", "Tục thả hoa đăng rằm tháng Bảy: Ngọn nến lung linh cầu siêu độ và bình an cho muôn loài", "Phong tục & Nghi lễ", "NATIONWIDE", "Ban Trị sự Phật giáo; Tạp chí Văn hóa Phật giáo"],
  ["le-hoi-trang-an-ninh-binh", "Lễ hội Tràng An: Rước nước tế thánh trên dòng sông Sào Khê di sản", "Lễ hội truyền thống", "NORTH", "Ban Quản lý Quần thể Danh thắng Tràng An; UNESCO"],
  ["le-hoi-dinh-bang-bac-ninh", "Lễ hội đình Đình Bảng: Ngôi đình gỗ bề thế và ngày hội rước thánh của người xứ Kinh Bắc", "Lễ hội truyền thống", "NORTH", "Ban Quản lý Di tích Đình Đình Bảng; Thị xã Từ Sơn"],
  ["le-hoi-cho-go-binh-dinh", "Chợ Gò Bình Định: Phiên chợ mùng Một Tết mua may bán rủi rộn rã nụ cười", "Lễ hội truyền thống", "CENTRAL", "UBND huyện Tuy Phước; Báo Bình Định"],
  ["le-hoi-vat-cau-bun-bac-giang", "Lễ hội vật cầu bùn làng Vân: Trò chơi dân gian độc nhất vô nhị tạ ơn thần linh", "Lễ hội truyền thống", "NORTH", "UBND huyện Việt Yên; Cục Di sản Văn hóa"],

  // BATCH 018: Tri thức trang phục & Nghệ thuật biểu diễn dân gian (171-180)
  ["ao-dai-truyen-thong-viet-nam", "Áo dài truyền thống: Dáng hình thanh tao và hành trình lịch sử qua các thời kỳ", "Tri thức dân gian & Nghề thủ công", "NATIONWIDE", "Bảo tàng Áo dài TP.HCM; Viện Nghiên cứu Trang phục Việt"],
  ["ao-ba-ba-nam-bo", "Chiếc áo bà ba và khăn rằn Nam Bộ: Nét mộc mạc thủy chung của người dân sông nước", "Tri thức dân gian & Nghề thủ công", "SOUTH", "Bảo tàng Phụ nữ Nam Bộ"],
  ["trang-phuc-phu-nu-cham", "Trang phục truyền thống phụ nữ Chăm: Tấm khăn Matra duyên dáng và dải thắt lưng hoa văn", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "Trung tâm Trưng bày Văn hóa Chăm Bình Thuận"],
  ["trang-phuc-tho-cam-nguoi-hmong", "Váy hoa thổ cẩm người H'Mông hoa: Kỹ thuật vẽ sáp ong và thêu tay rực rỡ vùng cao", "Tri thức dân gian & Nghề thủ công", "NORTH", "Bảo tàng Dân tộc học Việt Nam"],
  ["nghe-thuat-hat-boi-binh-dinh", "Hát Bội Bình Định: Kỹ xảo múa võ, liếc mắt và khí phách trung quân ái quốc", "Nghệ thuật dân gian", "CENTRAL", "Nhà hát Nghệ thuật Truyền thống Bình Định"],
  ["nghe-thuat-hat-sam-ha-thanh", "Hát Xẩm Hà Thành: Tiếng đàn nhị và lời ca tự tình của người hát rong đất kinh kỳ", "Nghệ thuật dân gian", "NORTH", "Viện Âm nhạc; Trung tâm Phát triển Nghệ thuật Âm nhạc VN"],
  ["nghe-thuat-cai-luong-nam-bo", "Nghệ thuật Cải lương Nam Bộ: Sân khấu đổi mới dung hòa âm nhạc tài tử và kịch nghệ", "Nghệ thuật dân gian", "SOUTH", "Hội Nghệ sĩ Sân khấu Việt Nam; Nhà hát Cải lương Trần Hữu Trang"],
  ["dieu-mua-xoe-thai-tay-bac", "Nghệ thuật Xòe Thái Tây Bắc: Vòng xòe hoa gắn kết muôn người bên bếp lửa bản làng", "Nghệ thuật dân gian", "NORTH", "UNESCO — Art of Xòe dance of the Tày people, hồ sơ 01575"],
  ["mua-bong-roi-nam-bo", "Múa bóng rỗi Nam Bộ: Nghệ thuật diễn xướng dân gian dâng lễ các Bà ở đình miếu", "Nghệ thuật dân gian", "SOUTH", "Bảo tàng Lịch sử TP.HCM; Tạp chí Văn hóa Dân gian"],
  ["nghe-thuat-hat-dum-hai-phong", "Hát Đúm Thủy Nguyên: Câu hát giao duyên tháo khăn bịt mặt đầu xuân xứ biển", "Nghệ thuật dân gian", "NORTH", "Sở VHTT TP Hải Phòng; Cục Di sản Văn hóa"],

  // BATCH 019: Đạo nghĩa thầy trò, chữ nghĩa & Danh nhân văn hóa (181-190)
  ["dao-nghia-thay-tro-ngay-xua", "Đạo nghĩa thầy trò xưa: Truyền thống tôn sư trọng đạo và tinh thần hiếu học của người Việt", "Ký ức gia đình", "NATIONWIDE", "Viện Nghiên cứu Hán Nôm; Hội Khuyến học Việt Nam"],
  ["thay-giao-chu-van-an-tam-guong-khi-tiet", "Người thầy muôn đời Chu Văn An: Tấm gương tiết tháo và ngôi đền thờ bên núi Phượng Hoàng", "Ký ức gia đình", "NORTH", "Khu Di tích Đền thờ Chu Văn An Chí Linh; Sở VHTTDL Hải Dương"],
  ["dai-thi-hao-nguyen-du-va-truyen-kieu", "Đại thi hào Nguyễn Du và Truyện Kiều: Tiếng kêu thương đứt ruột và di sản văn học nhân loại", "Ký ức gia đình", "CENTRAL", "Khu Di tích Quốc gia đặc biệt Đại thi hào Nguyễn Du; UNESCO"],
  ["danh-nhan-nguyen-trai-uc-trai-thi-tap", "Danh nhân văn hóa Nguyễn Trãi: Tấm lòng ưu ái vì dân vì nước bên dòng suối Côn Sơn", "Ký ức gia đình", "NORTH", "Ban Quản lý Di tích Côn Sơn - Kiếp Bạc; UNESCO"],
  ["phat-hoang-tran-nhan-tong-tu-tuong-hoa-quang", "Phật hoàng Trần Nhân Tông: Từ bậc vua anh minh đến vị tổ thiền phái Trúc Lâm thanh thoát", "Tín ngưỡng dân gian", "NORTH", "Học viện Phật giáo Việt Nam; Ban Quản lý Di tích Yên Tử"],
  ["danh-y-hai-thuong-lan-ong", "Đại danh y Hải Thượng Lãn Ông Lê Hữu Trác: Y đức sáng ngời và bộ sách Y tông tâm lĩnh", "Tri thức dân gian & Nghề thủ công", "CENTRAL", "Khu Di tích Hải Thượng Lãn Ông Hà Tĩnh; UNESCO ghi danh 2024"],
  ["trang-trinh-nguyen-binh-khiem", "Trạng Trình Nguyễn Bỉnh Khiêm: Bậc hiền triết dự báo thời cuộc và triết lý an nhàn", "Ký ức gia đình", "NORTH", "Khu Di tích Đền thờ Trạng Trình Vĩnh Bảo; Hải Phòng"],
  ["nha-bac-hoc-le-quy-don", "Nhà bác học Lê Quý Đôn: Tấm gương đọc sách uyên bác và bộ tác phẩm bách khoa toàn thư", "Ký ức gia đình", "NORTH", "Bảo tàng tỉnh Thái Bình; Viện Sử học"],
  ["nha-tho-nguyen-dinh-chieu-luc-van-tien", "Nhà thơ yêu nước Nguyễn Đình Chiểu: Ngòi bút đâm gian chở đạo và tấm lòng son sắt đất Ba Tri", "Ký ức gia đình", "SOUTH", "Khu Di tích Mộ và Khu lưu niệm Nguyễn Đình Chiểu Bến Tre; UNESCO"],
  ["nu-si-ho-xuan-huong-tieng-tho-doc-dao", "Nữ sĩ Hồ Xuân Hương: Tiếng thơ độc đáo bênh vực nữ quyền và bản sắc thơ Nôm", "Ký ức gia đình", "NORTH", "Khu lưu niệm Nữ sĩ Hồ Xuân Hương Nghệ An; UNESCO"],

  // BATCH 020: Đạo lý gia đình & Gìn giữ di sản thế hệ trẻ (191-200)
  ["luu-giu-ky-uc-gia-dinh-tu-mot-cau-chuyen", "Lưu giữ ký ức gia đình từ một câu chuyện: Khởi đầu giản dị để kết nối thế hệ", "Ký ức gia đình", "NATIONWIDE", "Tủ sách Gia đình & Giáo dục nhân cách; Nhóm biên tập TLTL", "GROUP_AUTHORED"],
  ["thong-nhat-viec-tuong-nho-nguoi-than-trong-gia-dinh", "Cùng gia đình thống nhất việc tưởng nhớ người thân: Không biến nghi lễ thành gánh nặng", "Ký ức gia đình", "NATIONWIDE", "Tủ sách Gia đình & Giáo dục nhân cách; Nhóm biên tập TLTL", "GROUP_AUTHORED"],
  ["nhip-song-tre-va-khoang-lang-tam-linh", "Người trẻ tìm khoảng lặng: Nhìn nhận tín ngưỡng như điểm tựa tinh thần tích cực", "Ký ức gia đình", "NATIONWIDE", "Tạp chí Thanh niên; Đề án Văn hóa Tinh thần Khởi nghiệp FPTU", "GROUP_AUTHORED"],
  ["ung-xu-khi-di-le-chua-den-mieu", "Văn hóa ứng xử nơi đền chùa: Tôn trọng chốn tôn nghiêm và tránh lãng phí lễ vật", "Phong tục & Nghi lễ", "NATIONWIDE", "Ban Tôn giáo Chính phủ; Cục Văn hóa Cơ sở"],
  ["phan-biet-tin-nguong-va-me-tin-di-doan", "Phân biệt tín ngưỡng thuần hậu và tệ nạn mê tín dị đoan: Giữ tâm sáng trước nỗi sợ hãi", "Tín ngưỡng dân gian", "NATIONWIDE", "Viện Nghiên cứu Tôn giáo; Tạp chí Tuyên giáo"],
  ["van-hoa-thap-nhang-an-toan-tai-gia", "Văn hóa thắp nhang an toàn: Nén hương lòng thanh tịnh và phòng ngừa hỏa hoạn", "Phong tục & Nghi lễ", "NATIONWIDE", "Cục Cảnh sát PCCC; Thông điệp Ban Trị sự Phật giáo"],
  ["ung-dung-cong-nghe-so-bao-ton-di-san", "Số hóa di sản văn hóa: Cầu nối đưa giá trị truyền thống đến gần hơn với thế hệ trẻ", "Tri thức dân gian & Nghề thủ công", "NATIONWIDE", "Cục Di sản Văn hóa; Đề tài Chuyển đổi số Di sản Quốc gia"],
  ["giu-gin-tieng-viet-qua-ca-dao-tuc-ngu", "Gìn giữ tiếng Việt qua ca dao, tục ngữ: Vốn quý ngôn từ và bài học làm người của cha ông", "Nghệ thuật dân gian", "NATIONWIDE", "Viện Ngôn ngữ học; Tạp chí Ngôn ngữ & Đời sống"],
  ["nghe-thuat-song-cham-va-chanh-niem-dan-gian", "Nghệ thuật sống chậm trong nếp nhà xưa: Học cách buông bỏ muộn phiền từ lời răn tiền nhân", "Ký ức gia đình", "NATIONWIDE", "Tạp chí Tâm lý học Việt Nam; Đề án Mental Wellness TLTL", "GROUP_AUTHORED"],
  ["trai-nghiem-van-hoa-dia-phuong-khi-di-xa", "Tìm hiểu văn hóa bản địa khi du lịch: Lắng nghe người địa phương bằng sự tôn trọng và chân thành", "Phong tục & Nghi lễ", "NATIONWIDE", "Viện Nghiên cứu Phát triển Du lịch; Hiệp hội Du lịch Việt Nam"]
];

for (let i = 0; i < remainingTopics.length; i++) {
  const item = remainingTopics[i];
  const id = 41 + i;
  const batchNum = Math.ceil(id / 10);
  const batchFile = `batch-${String(batchNum).padStart(3, "0")}.json`;
  plan.push({
    id,
    slug: item[0],
    title: item[1],
    category: item[2],
    region: item[3],
    intendedSource: item[4],
    status: id <= 40 ? "COMPLETED" : "PLANNED",
    batchFile
  });
}

// Verify 200 items
console.log("Total topics:", plan.length);

const slugs = new Set();
for (const item of plan) {
  if (slugs.has(item.slug)) {
    throw new Error("Duplicate slug: " + item.slug);
  }
  slugs.add(item.slug);
}

fs.writeFileSync(
  path.resolve(__dirname, "../../editorial/culture-plan-200.json"),
  JSON.stringify(plan, null, 2),
  "utf8"
);
console.log("Written editorial/culture-plan-200.json successfully!");
