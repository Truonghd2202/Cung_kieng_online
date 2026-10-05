import type { ContentMetadata } from "./contentMetadata";

export type RegionKey = "Bắc Bộ" | "Trung Bộ" | "Nam Bộ";

export type CultureCategoryKey =
  | "Không gian tín ngưỡng"
  | "Điển tích xưa"
  | "Lễ hội truyền thống"
  | "Phong tục & Nghi lễ"
  | "Sinh hoạt văn hóa";

export interface PracticalCard {
  title: string;
  desc: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  quote?: string;
  practicalCards?: PracticalCard[];
}

export interface CultureSource {
  title: string;
  author: string;
  sourceType:
    | "Tác phẩm kinh điển"
    | "Di sản Quốc gia / UNESCO"
    | "Khảo cứu học thuật"
    | "Thông tin cơ quan / đơn vị";
  annotation: string;
}

export interface CultureArticle {
  id: string;
  title: string;
  subtitle: string;
  region: RegionKey;
  category: CultureCategoryKey;
  image: string;
  caption: string;
  readingTime: string;
  excerpt: string;
  sections: ArticleSection[];
  editorialNote: string;
  sources: CultureSource[];
  metadata?: ContentMetadata;
  audioRecordingIds?: string[];
}

export const CULTURE_ARTICLES: CultureArticle[] = [
  {
    id: "dinh-lang-bac-bo",
    title: "Căn cốt đình làng Bắc Bộ & Tục thờ Thành hoàng",
    subtitle:
      "Biểu tượng linh hồn làng quê xứ Bắc, nơi bảo lưu ký ức cộng đồng, tôn vinh bậc tiền hiền có công mở cõi và nuôi dưỡng điểm tựa tinh thần gắn kết xóm giềng qua bao thế hệ.",
    region: "Bắc Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/temple_bac_bo.jpg",
    caption:
      "Nơi lưu giữ ký ức xóm giềng - Không gian gắn kết người già người trẻ cùng tề tựu trong tiếng trống hội làng.",
    readingTime: "~5 phút",
    excerpt:
      "Biểu tượng linh hồn làng quê xứ Bắc, nơi bảo lưu ký ức cộng đồng, tôn vinh bậc tiền hiền có công mở cõi và nuôi dưỡng điểm tựa tinh thần gắn kết xóm giềng qua bao thế hệ.",
    sections: [
      {
        id: "dinh-lang-trong-doi-song",
        title: "01. Đình làng trong đời sống cộng đồng",
        paragraphs: [
          "Trong cấu trúc làng quê truyền thống đồng bằng Bắc Bộ, ngôi đình luôn được đặt ở vị trí trung tâm phong thủy và đời sống. Khác với ngôi chùa là nơi quy hướng các giá trị tâm linh thoát tục, mái đình cổ kính lại là nơi neo đậu những giá trị thế tục gắn chặt với nếp sống văn hóa, hành chính của làng xã, nơi diễn ra các buổi họp hương ước, các nghi thức tế lễ và hội hè của muôn người.",
          "Bước vào sân đình, người ta dễ dàng cảm nhận được sự thoáng đạt qua kiến trúc tòa Đại Bái. Mái đình xòe rộng như cánh chim xòe bóng che chở, bốn góc đao uốn cong thanh thoát như vươn tới mây trời, rồng mây ẩn hiện uốn lượn nhịp nhàng. Không gian mở của đình vừa trang nghiêm tôn kính nơi thâm nghiêm hậu cung, vừa gần gũi chan hòa với khoảng sân gạch rêu phong và giếng nước đầu làng.",
          "Trong tâm khảm dân gian, ngôi đình vượt lên trên ý nghĩa của một công trình kiến trúc gỗ cổ; ấy là biểu tượng quy tụ ký ức cộng đồng, gắn kết bền chặt các thế hệ làng xã qua thăng trầm thời gian.",
        ],
      },
      {
        id: "tuc-tho-thanh-hoang",
        title: "02. Tục thờ Thành hoàng - Điểm tựa đức tin",
        paragraphs: [
          "Theo quan niệm tín ngưỡng dân gian thuần khiết, chữ \"Thành\" nghĩa là thành lũy, \"Hoàng\" là hào nước bao quanh. Vị Thành hoàng ban đầu tượng trưng cho vị thần bảo hộ công sự phòng thủ, sau dần được người Việt dung hòa và bản địa hóa sâu sắc thành đấng bảo trợ tâm linh cho toàn thể dân làng: che chở mùa màng tốt tươi, xua đuổi dịch bệnh và mang lại cuộc sống bình an.",
          "Thành hoàng làng rất đa dạng: Nhiên thần (như Thần Sông, Thần Núi gắn với công cuộc khai phá thiên nhiên), Nhân thần (các nhân vật lịch sử có công đánh giặc cứu nước, các vị tiền hiền khai hoang lập ấp, các vị tổ nghề truyền dạy nghề cho dân làng). Dù xuất thân từ đâu, Thành hoàng phản ánh đạo lý \"Uống nước nhớ nguồn\" thâm trầm trong tâm thức người Việt.",
        ],
        quote:
          "Lễ hội đình làng vào dịp xuân thu nhị kỳ không chỉ đơn thuần là nghi thức cúng tế linh thiêng, mà là không gian mở để mọi người con đi xa trở về, tìm lại nhịp cầu gắn kết với nguồn cội xóm làng một cách chân thành nhất.",
      },
      {
        id: "dieu-nguoi-tre-tim-hieu",
        title: "03. Điều người trẻ có thể tìm hiểu hôm nay",
        paragraphs: [
          "Trong nhịp sống hiện đại hối hả, tìm về mái đình xưa không phải là sự hoài cổ thụ động hay sa đà vào mê tín dị đoan, mà là hành trình tiếp nhận nguồn năng lượng tĩnh tại và hiểu sâu sắc hơn về nhân sinh quan mộc mạc của cha ông:",
        ],
        practicalCards: [
          {
            title: "Mỹ học dân gian độc bản",
            desc: "Quan sát nghệ thuật chạm khắc hoa văn rồng mây, cảnh sinh hoạt phóng khoáng trên xà, cốn, bẩy đình làng. Đây là nguồn cảm hứng thực thụ khơi gợi tình yêu mỹ thuật, thời trang và nghệ thuật đương đại.",
          },
          {
            title: "Thực hành khoảng lặng an trú",
            desc: "Một buổi chiều dạo bước quanh sân đình cổ kính, lắng nghe tiếng chuông gió dưới bóng đa trăm tuổi là một thực nghiệm chiêm nghiệm tự nhiên, giúp tâm trí tìm lại sự thảnh thơi sau chuỗi ngày bận rộn.",
          },
          {
            title: "Trân quý ký ức xóm làng bản địa",
            desc: "Hiểu được cội nguồn và các vị tiền hiền giúp người trẻ trân trọng các giá trị cộng đồng bền vững, gìn giữ nếp sống tương thân tương ái giữa dòng chảy đô thị hóa.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết đang được biên soạn cho bản thử nghiệm. Danh sách tài liệu là đầu mối tham khảo, chưa hoàn tất đối chiếu từng nhận định với bản xuất bản và vị trí trích dẫn cụ thể.",
    sources: [
      {
        title: "Việt Nam Phong Tục",
        author: "Phan Kế Bính",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Chương khảo cứu sâu sắc về hương ước, thể chế làng xã và nghi thức phụng nghinh Thành hoàng bản thổ.",
      },
      {
        title: "Nếp Cũ: Hội hè đình đám",
        author: "Toan Ánh",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Tư liệu toàn diện về nghi thức tế tự, rước sắc phong và không gian lễ hội đình làng xứ Bắc.",
      },
      {
        title: "Kiến trúc Đình làng Việt Nam",
        author: "Viện Bảo tồn Di tích (Bộ VHTTDL)",
        sourceType: "Khảo cứu học thuật",
        annotation: "Khảo sát thực địa về kết cấu kiến trúc gỗ cổ, nghệ thuật chạm khắc dân gian thế kỷ XVI - XVIII.",
      },
    ],
  },
  {
    id: "tien-dung-chu-dong-tu",
    title: "Huyền tích Tiên Dung - Chử Đồng Tử: Đạo hiếu & Chân tình",
    subtitle:
      "Một trong Tứ Bất Tử Việt Nam, biểu tượng của tấm lòng hiếu thuận tột cùng và khát vọng tự do vượt trên định kiến giai cấp ngàn đời.",
    region: "Bắc Bộ",
    category: "Điển tích xưa",
    image: "/images/chu_dong_tu.jpg",
    caption:
      "Duyên lành bãi Tự Nhiên - Cuộc hội ngộ định mệnh giữa công chúa Tiên Dung và chàng trai nghèo Chử Đồng Tử bên dòng sông Hồng.",
    readingTime: "~4 phút",
    excerpt:
      "Một trong Tứ Bất Tử Việt Nam, biểu tượng của tấm lòng hiếu thuận tột cùng và khát vọng tự do, tình yêu chân phương vượt qua ranh giới thân phận.",
    sections: [
      {
        id: "dao-hieu-thuan-tot-cung",
        title: "01. Tấm lòng hiếu tử lay động trời đất",
        paragraphs: [
          "Chử Đồng Tử và cha là Chử Cù Vân sống cảnh bần hàn bên bãi sông Hồng, nghèo đến mức hai cha con chỉ có chung một mảnh khố. Khi cha lâm bệnh nặng, ông trăng trối dặn con giữ lại chiếc khố mà mặc, nhưng Chử Đồng Tử đã dành tấm khố duy nhất chôn cất cha, còn mình chịu cảnh trần trọi.",
          "Chính lòng hiếu thảo chí thành ấy là cội nguồn sức mạnh đạo đức, mở lối cho những kỳ duyên kỳ ngộ sau này, biến chàng trai nghèo thành một bậc thánh nhân trong tâm thức người Việt.",
        ],
      },
      {
        id: "khat-vong-tu-do-nhan-ban",
        title: "02. Khát vọng chân tình vượt mọi ranh giới",
        paragraphs: [
          "Cuộc gặp gỡ kỳ lạ giữa công chúa Tiên Dung lá ngọc cành vàng và Chử Đồng Tử nơi bãi lau sậy Tự Nhiên là một áng ca dao tình yêu đẹp nhất thời mở nước. Tiên Dung nhận ra duyên trời định, vượt qua đẳng cấp quý tộc để kết duyên cùng chàng trai nghèo.",
          "Họ cùng nhân dân lập chợ búa, phát triển giao thương đường sông, học đạo cứu nhân độ thế và hóa sinh bất tử, để lại bài học ngàn đời về sự bình đẳng và tình yêu trong sáng.",
        ],
        quote:
          "Tình yêu đích thực không phân biệt giàu nghèo hay xuất thân, mà khởi nguồn từ tấm lòng chân thành và sự tôn trọng phẩm giá con người.",
      },
      {
        id: "chue-dong-tu-today",
        title: "03. Lắng đọng cùng người trẻ thời nay",
        paragraphs: [
          "Câu chuyện Tiên Dung - Chử Đồng Tử không chỉ là huyền thoại thần tiên, mà là thông điệp nhân văn về sự tử tế, đạo làm con và dũng khí sống thật với tiếng gọi của con tim.",
        ],
        practicalCards: [
          {
            title: "Trân quý chữ Hiếu trong gia đình",
            desc: "Dành thời gian lắng nghe và phụng dưỡng cha mẹ từ những cử chỉ bình dị hằng ngày.",
          },
          {
            title: "Khởi tâm chân thành trong các mối quan hệ",
            desc: "Đối xử với tha nhân bằng sự cảm thông, không để vật chất làm hoen mờ chân tình.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết đang được biên soạn cho bản thử nghiệm. Danh sách tài liệu là đầu mối tham khảo, chưa hoàn tất đối chiếu từng nhận định với bản xuất bản và vị trí trích dẫn cụ thể.",
    sources: [
      {
        title: "Lĩnh Nam Chích Quái (Truyện Dạ Trạch Vương)",
        author: "Trần Thế Pháp (Vũ Quỳnh & Kiều Phú hiệu đính)",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Ghi chép cổ xưa nhất về huyền tích Tiên Dung - Chử Đồng Tử nơi bãi Tự Nhiên và đầm Dạ Trạch.",
      },
      {
        title: "Việt Điện U Linh Tập",
        author: "Lý Tế Xuyên",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Khảo cứu chư vị thần linh tối tú của non sông đất Việt và tấm gương đại hiếu thuần hậu.",
      },
      {
        title: "Đại Việt Sử Ký Toàn Thư (Kỷ Hồng Bàng Thị)",
        author: "Ngô Sĩ Liên & Sử quán triều Hậu Lê",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Biên niên sử chính thống ghi chép về thời đại Hùng Vương thứ ba và cuộc gặp gỡ bến sông.",
      },
    ],
  },
  {
    id: "den-hung",
    title: "Hội Đền Hùng & Tín ngưỡng thờ cúng Hùng Vương",
    subtitle:
      "Di sản văn hóa phi vật thể của nhân loại, điểm tựa gắn kết tinh thần đoàn kết máu thịt của bách gia trăm họ qua mấy ngàn năm lịch sử.",
    region: "Bắc Bộ",
    category: "Lễ hội truyền thống",
    image: "/images/den_hung.jpg",
    caption:
      "Đoàn rước kiệu thiêng lên đỉnh núi Nghĩa Lĩnh trong ngày Giỗ Tổ mùng mười tháng Ba âm lịch.",
    readingTime: "~6 phút",
    excerpt:
      "Di sản văn hóa phi vật thể đại diện của nhân loại, điểm tựa tinh thần cội nguồn nuôi dưỡng ý thức đồng bào 'bọc trăm trứng' linh thiêng.",
    sections: [
      {
        id: "y-nghia-coi-nguon",
        title: "01. Ý niệm cội nguồn và nghĩa 'Đồng bào'",
        paragraphs: [
          "Hiếm có dân tộc nào trên thế giới có chung một vị Quốc Tổ và cùng hướng về ngày Giỗ Tổ như người Việt Nam. Tín ngưỡng thờ cúng Hùng Vương bắt nguồn từ tâm thức thờ cúng tổ tiên gia đình, dòng họ, được nâng lên thành tín ngưỡng của cả quốc gia dân tộc.",
          "Hai tiếng 'Đồng bào' gợi nhắc huyền thoại bọc trăm trứng của Mẹ Âu Cơ và Cha Lạc Long Quân, nhắc nhở con dân đất Việt dù ở miền ngược hay miền xuôi, trong nước hay hải ngoại đều chung một dòng máu Lạc Hồng.",
        ],
      },
      {
        id: "nghi-thuc-den-hung",
        title: "02. Khói trầm Nghĩa Lĩnh & Nếp sống tri an",
        paragraphs: [
          "Mỗi độ tháng Ba âm lịch, hàng triệu bước chân hành hương về đỉnh núi Nghĩa Lĩnh thiêng liêng. Nén hương dâng lên trước đền Hạ, đền Trung, đền Thượng là lời hứa giữ gìn non sông gấm vóc mà tiền nhân đã dày công khai phá.",
        ],
        quote:
          "\"Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng Ba\" - Lời ca dao mộc mạc như tiếng gọi nguồn cội khắc sâu trong tâm khảm mỗi người Việt.",
      },
    ],
    editorialNote:
      "Bài viết đang được biên soạn cho bản thử nghiệm. Danh sách tài liệu là đầu mối tham khảo, chưa hoàn tất đối chiếu từng nhận định với bản xuất bản và vị trí trích dẫn cụ thể.",
    sources: [
      {
        title: "Hồ sơ đệ trình UNESCO: Tín ngưỡng Thờ cúng Hùng Vương tại Phú Thọ",
        author: "Bộ Văn hóa, Thể thao và Du lịch Việt Nam / UNESCO",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation: "Văn bản công nhận Di sản Văn hóa Phi vật thể đại diện của Nhân loại (Paris, 06/12/2012).",
      },
      {
        title: "Hùng Vương Ngọc Phả Cổ Truyền (1470)",
        author: "Hàn Lâm Viện Đông Các Đại Học Sĩ Nguyễn Cố",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Tư liệu thư tịch Hán Nôm cổ nhất lưu trữ tại Khu Di tích Lịch sử Đền Hùng.",
      },
      {
        title: "Việt Sử Thông Giám Cương Mục",
        author: "Quốc Sử Quán Triều Nguyễn",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Chính sử triều Nguyễn ghi chép điển lệ tế lễ Quốc Tổ tại vùng đất Phong Châu cổ.",
      },
    ],
  },
  {
    id: "dien-hon-chen",
    title: "Nét trầm mặc điện Hòn Chén & Lễ Mẹ Thiên Y A Na",
    subtitle:
      "Giao thoa tín ngưỡng Chăm – Việt bên dòng sông Hương, ngợi ca vị nữ thần dạy dân trồng trọt, dệt vải và nuôi dưỡng phong thái an định.",
    region: "Trung Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/hue_trung_bo.jpg",
    caption:
      "Điện Huệ Nam (Điện Hòn Chén) uy nghiêm soi bóng xuống dòng Hương Giang bảng lảng khói sương.",
    readingTime: "~5 phút",
    excerpt:
      "Giao thoa tín ngưỡng Chăm – Việt bên dòng sông Hương, ngợi ca vị nữ thần dạy dân trồng trọt, dệt lụa và bao dung chở che xóm làng.",
    sections: [
      {
        id: "giao-thoa-cham-viet",
        title: "01. Bản hòa ca văn hóa Chăm - Việt xứ Huế",
        paragraphs: [
          "Điện Hòn Chén (Huệ Nam Điện) tọa lạc trên sườn núi Ngọc Trản, soi bóng xuống dòng sông Hương thơ mộng. Đây là minh chứng tiêu biểu cho quá trình giao lưu, tiếp biến văn hóa đặc sắc giữa người Việt và người Chăm trong tiến trình lịch sử.",
          "Nữ thần Po Nagar của người Chăm khi hòa vào tâm thức người Việt đã trở thành Thánh Mẫu Thiên Y A Na - người mẹ nhân hậu ban phát mùa màng, dạy dân cấy cày, se sợi dệt vải.",
        ],
      },
      {
        id: "sac-mau-song-huong",
        title: "02. Nhịp chèo rước Thánh Mẫu trên dòng sông Hương",
        paragraphs: [
          "Vào tháng Ba và tháng Bảy âm lịch, lễ hội rước Mẫu trên sông Hương diễn ra với hàng chục chiếc bằng (thuyền đôi ghép lại) lộng lẫy cờ hoa, tiếng đàn ca nhã nhạc hòa cùng câu hát chầu văn rộn ràng non nước Cố Đô.",
        ],
      },
    ],
    editorialNote:
      "Bài viết đang được biên soạn cho bản thử nghiệm. Danh sách tài liệu là đầu mối tham khảo, chưa hoàn tất đối chiếu từng nhận định với bản xuất bản và vị trí trích dẫn cụ thể.",
    sources: [
      {
        title: "Nghi lễ & Hội hè Xứ Huế",
        author: "Bửu Ý & Trần Đức Anh Sơn",
        sourceType: "Khảo cứu học thuật",
        annotation: "Khảo cứu chi tiết về không gian tế tự Huệ Nam Điện và phong tục nghinh rước Thánh Mẫu trên sông Hương.",
      },
      {
        title: "Tín ngưỡng Thờ Mẫu Thiên Y A Na tại Thừa Thiên Huế",
        author: "Phân viện Văn hóa Nghệ thuật Quốc gia Việt Nam tại Huế",
        sourceType: "Khảo cứu học thuật",
        annotation: "Nghiên cứu về tiến trình giao lưu tiếp biến văn hóa tâm linh Chăm - Việt tại dải đất miền Trung.",
      },
      {
        title: "Đại Nam Nhất Thống Chí (Tập Thừa Thiên Phủ)",
        author: "Quốc Sử Quán Triều Nguyễn",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Địa chí triều Nguyễn ghi chép về di tích đền Ngọc Trản và sắc tứ phong tặng của vua Đồng Khánh.",
      },
    ],
  },
  {
    id: "le-hoi-cau-ngu",
    title: "Lễ hội Cầu Ngư & Tục thờ Cá Ông của ngư dân biển",
    subtitle:
      "Khúc tráng ca của vạn chài miền Trung, gửi gắm ước nguyện sóng yên biển lặng và tri ân đấng hộ mệnh bao dung nơi đầu sóng ngọn gió.",
    region: "Trung Bộ",
    category: "Phong tục & Nghi lễ",
    image: "/images/cau_ngu.jpg",
    caption:
      "Đoàn thuyền hoa rực rỡ cờ ngũ sắc trong lễ nghinh Ông của ngư dân vùng biển duyên hải miền Trung.",
    readingTime: "~5 phút",
    excerpt:
      "Khúc tráng ca của vạn chài miền Trung, gửi gắm ước nguyện sóng yên biển lặng và tấm lòng tri ân sâu nặng với biển cả bao dung.",
    sections: [
      {
        id: "ong-nam-hai",
        title: "01. Điểm tựa tâm linh của người đi biển",
        paragraphs: [
          "Đối với người ngư dân bám biển miền Trung, biển cả vừa là nguồn sống hào phóng, vừa ẩn chứa muôn vàn hiểm nguy bão táp. Tục thờ Cá Ông (Đại Càn Quốc Gia Nam Hải) phản ánh lòng biết ơn chân thành đối với loài cá voi hiền lành thường cứu giúp thuyền bè hoạn nạn.",
          "Khi Cá Ông lụy (dạt vào bờ), người ngư dân đầu tiên trông thấy sẽ để tang như cha mẹ ruột, cả vạn chài cùng nhau tổ chức lễ an táng trang nghiêm tại lăng Ông.",
        ],
      },
      {
        id: "dieu-hat-ba-trao",
        title: "02. Điệu hát Bả Trạo và nhịp thở đại dương",
        paragraphs: [
          "Lễ hội Cầu Ngư không thể thiếu điệu múa hát Bả Trạo - hình thức diễn xướng dân gian mô phỏng động tác chèo thuyền vượt sóng gió. Tiếng trống giục, mái chèo khua nhịp nhàng thể hiện tinh thần đoàn kết, lạc quan của cư dân miền biển.",
        ],
      },
    ],
    editorialNote:
      "Bài viết đang được biên soạn cho bản thử nghiệm. Danh sách tài liệu là đầu mối tham khảo, chưa hoàn tất đối chiếu từng nhận định với bản xuất bản và vị trí trích dẫn cụ thể.",
    sources: [
      {
        title: "Tục thờ Cá Ông của Cư dân Ven biển Miền Trung",
        author: "Huỳnh Ngọc Trảng & Trương Ngọc Tường",
        sourceType: "Khảo cứu học thuật",
        annotation: "Chuyên khảo công phu về nguồn gốc lịch sử, nghi thức tế thần Nam Hải và văn khấn vạn chài.",
      },
      {
        title: "Hồ sơ Di sản Văn hóa Phi vật thể Quốc gia: Lễ hội Cầu Ngư miền Trung",
        author: "Bộ Văn hóa, Thể thao và Du lịch",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation: "Quyết định công nhận di sản cấp quốc gia cho chuỗi lễ hội cầu ngư tại Đà Nẵng, Bình Định, Khánh Hòa.",
      },
      {
        title: "Văn hóa Dân gian Cư dân Vùng biển Duyên hải Nam Trung Bộ",
        author: "Viện Nghiên cứu Văn hóa (Viện Hàn lâm KHXH Việt Nam)",
        sourceType: "Khảo cứu học thuật",
        annotation: "Nghiên cứu về diễn xướng hát múa Bả Trạo và tâm thức cộng đồng ngư dân Việt trước biển cả.",
      },
    ],
  },
  {
    id: "mieu-ba-chua-xu",
    title: "Miếu Bà Chúa Xứ Núi Sam & Tâm thức bao dung Tây Nam Bộ",
    subtitle:
      "Trung tâm sinh hoạt văn hóa tinh thần lớn bậc nhất phương Nam, nơi hội tụ lòng từ bi, sự chở che và khí chất hào sảng miền sông nước.",
    region: "Nam Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/mekong_nam_bo.jpg",
    caption:
      "Miếu Bà Chúa Xứ núi Sam lộng lẫy dưới ánh hoàng hôn vùng biên viễn Châu Đốc, An Giang.",
    readingTime: "~5 phút",
    excerpt:
      "Trung tâm sinh hoạt văn hóa tinh thần lớn bậc nhất phương Nam, nơi hội tụ lòng từ bi và hào sảng của vùng đất phù sa trù phú.",
    sections: [
      {
        id: "tam-thuc-ba-chua-xu",
        title: "01. Đất lành chở che tiền nhân mở cõi",
        paragraphs: [
          "Tọa lạc dưới chân núi Sam huyền bí (Châu Đốc, An Giang), Miếu Bà Chúa Xứ gắn liền với quá trình khai hoang mở đất phương Nam của lưu dân người Việt, người Chăm, người Hoa và người Khmer.",
          "Bà Chúa Xứ tượng trưng cho đấng Mẫu nghi bao dung, chở che cho người dân vượt qua bệnh tật, trộm cướp và thiên tai nơi rừng thiêng nước độc thuở mới lập nghiệp.",
        ],
      },
      {
        id: "le-tam-ba",
        title: "02. Nghi thức Tắm Bà và triết lý sống hào sảng",
        paragraphs: [
          "Lễ hội Vía Bà Chúa Xứ (22 đến 27 tháng Tư âm lịch) với nghi thức Tắm Bà, thay áo mão thu hút hàng triệu lượt khách hành hương. Người phương Nam đến với Bà bằng tấm lòng thành kính, cầu mong quốc thái dân an, gia đạo thuận hòa.",
        ],
      },
    ],
    editorialNote:
      "Bài viết đang được biên soạn cho bản thử nghiệm. Danh sách tài liệu là đầu mối tham khảo, chưa hoàn tất đối chiếu từng nhận định với bản xuất bản và vị trí trích dẫn cụ thể.",
    sources: [
      {
        title: "Gia Định Thành Thông Chí (Sơn Xuyên Chí)",
        author: "Trịnh Hoài Đức",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Tư liệu địa chí sớm nhất chép về núi Sam, sự hiển linh của pho tượng cổ và quá trình khai khẩn đất Thoại Sơn.",
      },
      {
        title: "Lễ hội Vía Bà Chúa Xứ Núi Sam",
        author: "Bộ Văn hóa, Thể thao và Du lịch",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation: "Quyết định số 268/QĐ-BVHTTDL công nhận Lễ hội Vía Bà là Di sản Văn hóa Phi vật thể Quốc gia.",
      },
      {
        title: "Lịch sử Khai phá Vùng đất Nam Bộ & Văn hóa Dân gian",
        author: "Sơn Nam",
        sourceType: "Khảo cứu học thuật",
        annotation: "Phân tích tâm thức tôn kính người Mẹ bảo trợ xứ sở của lưu dân và đức tính phóng khoáng vùng sông nước.",
      },
    ],
  },
  {
    id: "le-via-ba-linh-son-thanh-mau",
    title: "Lễ Vía Bà Linh Sơn Thánh Mẫu tại núi Bà Đen",
    subtitle: "Một góc nhìn về tín ngưỡng và lễ hội ở Tây Ninh",
    region: "Nam Bộ",
    category: "Lễ hội truyền thống",
    image: "/images/mekong_nam_bo.jpg",
    caption:
      "Ảnh minh họa vùng Nam Bộ, không phải ảnh núi Bà Đen.",
    readingTime: "2 phút",
    excerpt:
      "Tìm hiểu đối tượng được tưởng nhớ, hoạt động lễ hội và cách đọc tư liệu về Lễ Vía Bà tại núi Bà Đen.",

    sections: [
      {
        id: "ba-den-gioi-thieu",
        title: "Lễ hội tưởng nhớ ai?",
        paragraphs: [
          "Theo Cổng thông tin du lịch Tây Ninh, Lễ Vía Bà tại núi Bà Đen gắn với việc tưởng nhớ Linh Sơn Thánh Mẫu. Tư liệu địa phương trình bày hình tượng Bà trong đời sống tín ngưỡng Nam Bộ.",
        ],
      },
      {
        id: "ba-den-hoat-dong",
        title: "Những hoạt động được giới thiệu",
        paragraphs: [
          "Nguồn giới thiệu các hoạt động như tắm Bà, dâng hương và cúng vía, cùng hoạt động văn hóa. Bài cũng nhấn mạnh sự kết hợp giữa tín ngưỡng dân gian và văn hóa Phật giáo.",
        ],
      },
      {
        id: "ba-den-doc-tu-lieu",
        title: "Đọc tư liệu và tìm hiểu thêm",
        paragraphs: [
          "Khi đọc chuyện kể về Bà, hãy phân biệt truyền thuyết với thông tin lịch sử. Nếu muốn tham dự lễ hội, kiểm tra thông báo của năm đó thay vì dùng lại lịch từ một bài cũ.",
        ],
      },
    ],

    editorialNote:
      "Bản giới thiệu ngắn dựa trên tư liệu địa phương. Chưa hoàn tất duyệt biên tập và chưa bổ sung ảnh đúng địa điểm.",
    sources: [],

    metadata: {
      contentKind: "editorial",
      editorialStatus: "in-review",
      quotationVerified: false,
      sources: [
        {
          id: "tay-ninh-le-via-ba",
          title:
            "Lễ Vía Bà Linh Sơn Thánh Mẫu tại núi Bà Đen – Nét đẹp văn hoá tâm linh của Nam Bộ",
          authorOrOrganization:
            "Cổng thông tin du lịch Tây Ninh",
          url:
            "https://dulich.tayninh.gov.vn/tin-tuc/le-via-ba-linh-son-thanh-mau-tai-nui-ba-den-net-dep-van-hoa-tam-linh-cua-nam-bo-1620",
          locator:
            "Phần Mô tả: đối tượng tưởng nhớ, hoạt động lễ hội và mối liên hệ tín ngưỡng dân gian – Phật giáo",
          accessedOn: "2026-10-05",
        },
      ],
      editorialNote:
        "Đã bổ sung nguồn để đối chiếu. Chưa xác nhận toàn bộ nội dung qua quy trình duyệt của nhóm; ảnh hiện là minh họa.",
    },
  },
  {
    id: "tin-nguong-tho-mau-tam-phu",
    title: "Tìm hiểu tín ngưỡng thờ Mẫu Tam phủ",
    subtitle:
      "Một thực hành văn hóa gắn với ký ức cộng đồng và sự trân trọng vai trò của người phụ nữ.",
    region: "Bắc Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/do_paper_still_life.jpg",
    caption:
      "Ảnh minh họa cho bài đọc; không phải ảnh tư liệu của nghi lễ thờ Mẫu.",
    readingTime: "~2 phút",
    excerpt:
      "Tìm hiểu ba miền trong tín ngưỡng thờ Mẫu, những người gìn giữ thực hành và ý nghĩa của việc bảo vệ di sản.",
    sections: [
      {
        id: "ba-mien-trong-tin-nguong",
        title: "01. Tam phủ trong hồ sơ di sản",
        paragraphs: [
          "Hồ sơ UNESCO mô tả tín ngưỡng thờ các Mẫu của ba miền: trời, nước, núi rừng. Những thực hành liên quan được ghi danh vào Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại năm 2016.",
          "Bài đọc này giới thiệu phạm vi Tam phủ theo hồ sơ đó. Nội dung về Tứ phủ cần được tìm hiểu riêng, không nên xem hai tên gọi là hoàn toàn đồng nhất.",
        ],
      },
      {
        id: "nguoi-gin-giu-thuc-hanh",
        title: "02. Một thực hành có cộng đồng gìn giữ",
        paragraphs: [
          "Các thực hành được mô tả gồm thờ phụng thường ngày, nghi lễ lên đồng và lễ hội. Âm nhạc, múa và trang phục góp phần thể hiện ký ức văn hóa trong những thực hành này.",
          "Người gìn giữ và truyền dạy bao gồm người trông coi đền, người thực hành nghi lễ, thanh đồng, người phụ giúp và nhạc công. Kiến thức được trao truyền bằng lời nói và qua việc tham gia thực hành.",
        ],
      },
      {
        id: "gia-tri-va-bao-ve-di-san",
        title: "03. Hiểu di sản từ giá trị cộng đồng",
        paragraphs: [
          "Hồ sơ ghi danh nhấn mạnh lòng nhân ái, sự gắn kết và việc trân trọng vai trò của người phụ nữ. Quyết định của UNESCO cũng đề cập đến ký ức lịch sử, bản sắc văn hóa và sự tôn trọng đa dạng.",
          "Quyết định ghi danh lưu ý nguy cơ thương mại hóa quá mức. Vì vậy, tìm hiểu di sản cũng cần quan tâm đến người thực hành và cách cộng đồng gìn giữ ý nghĩa của nghi lễ.",
        ],
        practicalCards: [
          {
            title: "Đọc cùng nguồn",
            desc:
              "Mở hồ sơ UNESCO bên dưới để đối chiếu thông tin và tìm hiểu thêm.",
          },
          {
            title: "Quan sát với sự tôn trọng",
            desc:
              "Khi đến một không gian tín ngưỡng, tìm hiểu nội quy và xin phép trước khi ghi hình người tham gia.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài giới thiệu được diễn giải từ nguồn UNESCO. Phân loại Bắc Bộ phục vụ điều hướng trong ứng dụng, không có nghĩa thực hành chỉ tồn tại ở miền Bắc. Bài chưa thay thế nội dung chuyên sâu về Tứ phủ, hầu đồng hoặc chầu văn.",
    sources: [
      {
        title: "Hồ sơ UNESCO về thực hành tín ngưỡng thờ Mẫu Tam phủ",
        author: "UNESCO",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation:
          "Đối chiếu phần mô tả ba miền, thực hành, người gìn giữ và giá trị cộng đồng.",
      },
      {
        title: "Quyết định ghi danh 11.COM 10.b.37",
        author: "Ủy ban Liên chính phủ UNESCO",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation:
          "Đối chiếu việc ghi danh, giá trị văn hóa và lưu ý về thương mại hóa quá mức.",
      },
    ],
    metadata: {
      contentKind: "editorial",
      editorialStatus: "in-review",
      quotationVerified: false,
      editorialNote:
        "Nội dung diễn giải, không sử dụng trích dẫn nguyên văn. Chờ duyệt biên tập.",
      sources: [
        {
          id: "unesco-mother-goddesses-three-realms",
          title: "Hồ sơ di sản tín ngưỡng thờ Mẫu Tam phủ",
          authorOrOrganization: "UNESCO",
          url:
            "https://ich.unesco.org/en/RL/practices-related-to-the-viet-beliefs-in-the-mother-goddesses-of-three-realms-01064",
          locator: "Phần mô tả di sản và thông tin ghi danh",
          accessedOn: "2026-10-05",
        },
        {
          id: "unesco-decision-11-com-10-b-37",
          title: "Quyết định ghi danh 11.COM 10.b.37",
          authorOrOrganization: "UNESCO",
          url: "https://ich.unesco.org/en/Decisions/11.COM/10.b.37",
          locator: "Các tiêu chí R.1–R.3 và quyết định ghi danh",
          accessedOn: "2026-10-05",
        },
      ],
    },
  },
  {
    id: "phu-tay-ho",
    title: "Phủ Tây Hồ và tín ngưỡng thờ Mẫu",
    subtitle:
      "Một điểm tìm hiểu văn hóa tín ngưỡng tại Hà Nội, gắn với việc thờ Mẫu Liễu Hạnh.",
    region: "Bắc Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/do_paper_still_life.jpg",
    caption:
      "Ảnh minh họa cho bài đọc; không phải ảnh chụp Phủ Tây Hồ.",
    readingTime: "~2 phút",
    excerpt:
      "Tìm hiểu đối tượng thờ phụng tại Phủ Tây Hồ và cách đọc những câu chuyện truyền tụng quanh di tích.",
    sections: [
      {
        id: "phu-tay-ho-tho-ai",
        title: "01. Phủ Tây Hồ thờ ai?",
        paragraphs: [
          "Theo thông tin của Sở Văn hóa và Thể thao Hà Nội, Phủ Tây Hồ là nơi thờ Mẫu Liễu Hạnh. Đây là một địa điểm để người đọc tiếp cận tín ngưỡng thờ Mẫu thông qua một không gian cụ thể.",
          "Bài giới thiệu này tập trung vào thông tin nền về di tích. Những khác biệt giữa các hệ thống thờ phụng hoặc nghi thức tại từng nơi cần được tìm hiểu bằng tài liệu chuyên sâu.",
        ],
      },
      {
        id: "doc-truyen-thuyet",
        title: "02. Đọc truyền thuyết đúng cách",
        paragraphs: [
          "Nguồn giới thiệu của Sở kể câu chuyện về nguồn gốc Liễu Hạnh dưới dạng truyền thuyết. Khi đọc, cần giữ cách gọi này để phân biệt câu chuyện tín ngưỡng với sự kiện lịch sử đã được chứng minh.",
          "Bạn có thể ghi lại điều mình muốn tìm hiểu thêm: câu chuyện được kể bởi ai, xuất hiện trong tài liệu nào và có những dị bản nào.",
        ],
      },
      {
        id: "tim-hieu-phu-tay-ho",
        title: "03. Gợi ý khi tìm hiểu",
        paragraphs: [
          "Một chuyến tìm hiểu có thể bắt đầu bằng việc đọc thông tin giới thiệu tại di tích và quan sát cách không gian được tổ chức.",
        ],
        practicalCards: [
          {
            title: "Tôn trọng không gian thờ phụng",
            desc:
              "Đọc nội quy, giữ lối đi thông thoáng và xin phép trước khi ghi hình người đang thực hành nghi lễ.",
          },
          {
            title: "Đối chiếu thông tin",
            desc:
              "Phân biệt nội dung trên bảng giới thiệu, lời kể của người tham gia và thông tin từ tài liệu nghiên cứu.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài giới thiệu ngắn có nguồn đối chiếu. Không cung cấp lịch lễ, giờ mở cửa hoặc hướng dẫn thực hành nghi lễ.",
    sources: [
      {
        title: "Thông tin kiểm tra di tích và lễ hội Phủ Tây Hồ",
        author: "Sở Văn hóa và Thể thao Hà Nội",
        sourceType: "Thông tin cơ quan / đơn vị",
        annotation:
          "Đối chiếu đối tượng thờ phụng và cách nguồn trình bày truyền thuyết về Liễu Hạnh.",
      },
    ],
    metadata: {
      contentKind: "editorial",
      editorialStatus: "in-review",
      quotationVerified: false,
      editorialNote:
        "Nội dung diễn giải từ nguồn được dẫn; chờ duyệt biên tập.",
      sources: [
        {
          id: "hanoi-phu-tay-ho",
          title: "Thông tin về di tích và lễ hội Phủ Tây Hồ",
          authorOrOrganization: "Sở Văn hóa và Thể thao Hà Nội",
          url:
            "https://sovhtt.hanoi.gov.vn/kiem-tra-di-tich-va-le-hoi-phu-tay-ho/",
          locator:
            "Đoạn giới thiệu đối tượng thờ phụng và truyền thuyết",
          accessedOn: "2026-10-05",
        },
      ],
    },
  },
  {
    id: "den-tran-nam-dinh",
    title: "Đền Trần: không gian tưởng nhớ nhà Trần",
    subtitle:
      "Tìm hiểu ba công trình chính và ý nghĩa tưởng nhớ trong không gian di tích.",
    region: "Bắc Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/do_paper_still_life.jpg",
    caption:
      "Ảnh minh họa cho bài đọc; không phải ảnh chụp Đền Trần.",
    readingTime: "~2 phút",
    excerpt:
      "Phân biệt Thiên Trường, Cố Trạch và Trùng Hoa trước khi tìm hiểu những hoạt động lễ hội tại Đền Trần.",
    sections: [
      {
        id: "ba-cong-trinh-den-tran",
        title: "01. Ba công trình trong cụm di tích",
        paragraphs: [
          "Tài liệu giới thiệu trên cổng thông tin Nam Định mô tả Đền Trần gồm ba công trình kiến trúc chính: đền Thiên Trường, đền Cố Trạch và đền Trùng Hoa.",
          "Trong đó, đền Cố Trạch là nơi thờ Trần Hưng Đạo, gia đình và gia tướng. Nhận biết từng công trình giúp việc tìm hiểu cụm di tích cụ thể hơn.",
        ],
      },
      {
        id: "tuong-nho-va-tri-an",
        title: "02. Tưởng nhớ và tri an",
        paragraphs: [
          "Bản tin về lễ Khai ấn năm 2023 ghi nhận hoạt động dâng hương tưởng nhớ các vua Trần và Trần Quốc Tuấn. Nguồn này nhấn mạnh ý nghĩa tri ân và tiếp nối truyền thống.",
          "Bài đọc sử dụng bản tin để giới thiệu ý nghĩa của hoạt động. Lịch tổ chức của năm 2023 không được dùng làm lịch lễ hiện tại.",
        ],
      },
      {
        id: "tim-hieu-den-tran",
        title: "03. Gợi ý khi tìm hiểu",
        paragraphs: [
          "Bạn có thể bắt đầu bằng tên từng đền, đối tượng được thờ và thông tin giới thiệu tại chỗ, sau đó đối chiếu với tài liệu.",
        ],
        practicalCards: [
          {
            title: "Ghi lại tên công trình",
            desc:
              "Phân biệt Thiên Trường, Cố Trạch và Trùng Hoa khi đọc hoặc tham quan.",
          },
          {
            title: "Kiểm tra lịch từng năm",
            desc:
              "Nếu muốn tham dự lễ hội, xem thông báo mới của đơn vị tổ chức thay vì dùng lịch trong bài tư liệu cũ.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài giới thiệu văn hóa, không phải lịch lễ hội hoặc dịch vụ xin ấn. Tên Đền Trần Nam Định dùng để nhận diện di tích trong tài liệu.",
    sources: [
      {
        title: "Tài liệu giới thiệu kiến trúc và lịch sử Đền Trần",
        author: "Cổng thông tin điện tử Nam Định",
        sourceType: "Thông tin cơ quan / đơn vị",
        annotation:
          "Đối chiếu ba công trình chính và đối tượng thờ tại đền Cố Trạch.",
      },
      {
        title: "Bản tin lễ Khai ấn Đền Trần năm 2023",
        author: "Cổng thông tin Hội đồng nhân dân tỉnh Nam Định",
        sourceType: "Thông tin cơ quan / đơn vị",
        annotation:
          "Đối chiếu hoạt động tưởng nhớ, tri ân; không sử dụng lịch năm 2023 làm lịch hiện tại.",
      },
    ],
    metadata: {
      contentKind: "editorial",
      editorialStatus: "in-review",
      quotationVerified: false,
      editorialNote:
        "Nội dung diễn giải từ nguồn được dẫn; chờ duyệt biên tập.",
      sources: [
        {
          id: "nam-dinh-den-tran-kien-truc",
          title: "Tài liệu giới thiệu Đền Trần",
          authorOrOrganization: "Cổng thông tin điện tử Nam Định",
          url:
            "https://namdinh.gov.vn/portal/VanBan/2023-01/46d10d777eea9a0dND-05---2-144-full.pdf",
          locator:
            "Bài giới thiệu Đền Trần; đoạn mô tả Thiên Trường, Cố Trạch và Trùng Hoa",
          accessedOn: "2026-10-05",
        },
        {
          id: "nam-dinh-khai-an-2023",
          title: "Bản tin lễ Khai ấn Đền Trần năm 2023",
          authorOrOrganization:
            "Cổng thông tin Hội đồng nhân dân tỉnh Nam Định",
          url:
            "https://hdnd.namdinh.gov.vn/portal/pages/2023-2-6/le-hoi-khai-an-den-tran-xuan-quy-mao-2023dfzst9.aspx",
          locator:
            "Đoạn mô tả hoạt động dâng hương tưởng nhớ các vua Trần và Trần Quốc Tuấn",
          accessedOn: "2026-10-05",
        },
      ],
    },
  },
  {
    id: "bai-choi-hoi-an",
    title: "Bài chòi ở Hội An: nghe hát, gặp người giữ nghề",
    subtitle:
      "Một hướng khám phá văn hóa Quảng Nam qua diễn xướng và sự tương tác với người thưởng thức.",
    region: "Trung Bộ",
    category: "Sinh hoạt văn hóa",
    image: "/images/do_paper_still_life.jpg",
    caption:
      "Ảnh minh họa cho bài đọc; không phải ảnh tư liệu biểu diễn bài chòi.",
    readingTime: "~2 phút",
    excerpt:
      "Tìm hiểu bài chòi ở Hội An từ người hô hát đến hoạt động truyền dạy trong cộng đồng.",
    sections: [
      {
        id: "bai-choi-la-gi",
        title: "01. Một nghệ thuật kết hợp nhiều hình thức",
        paragraphs: [
          "Theo hồ sơ UNESCO, nghệ thuật bài chòi ở Trung Bộ kết hợp âm nhạc, thơ ca, diễn xuất, hội họa và văn học. Di sản được ghi danh vào Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại năm 2017.",
          "Bài đọc chọn Hội An làm điểm tiếp cận. Bài chòi thuộc không gian văn hóa Trung Bộ rộng hơn, không chỉ riêng Hội An hay Quảng Nam.",
        ],
      },
      {
        id: "nguoi-ho-hat",
        title: "02. Người hô hát và người tham gia",
        paragraphs: [
          "Nguồn giới thiệu trên website di sản Hội An mô tả anh hiệu, chị hiệu là những người hô hát, dẫn dắt cuộc chơi bằng lời ca liên quan đến tên các quân bài.",
          "Sự tương tác với khán giả và khả năng ứng biến là những điều đáng chú ý khi tìm hiểu hình thức diễn xướng này.",
        ],
      },
      {
        id: "truyen-day-bai-choi",
        title: "03. Di sản được tiếp nối bởi con người",
        paragraphs: [
          "Bài viết về Hội An ghi nhận nghệ nhân tham gia truyền dạy bài chòi tại trường học và trong khu phố cổ. Việc gìn giữ di sản vì thế gắn với cả biểu diễn và đào tạo người tiếp nối.",
        ],
        practicalCards: [
          {
            title: "Lắng nghe người dẫn cuộc chơi",
            desc:
              "Khi có dịp thưởng thức, chú ý cách người hô hát dùng lời ca và tương tác với người tham gia.",
          },
          {
            title: "Tìm hiểu người giữ nghề",
            desc:
              "Đọc thêm về nghệ nhân, nhạc công và những lớp truyền dạy thay vì chỉ xem tiết mục biểu diễn.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài giới thiệu một khía cạnh của văn hóa Quảng Nam. Không cung cấp lịch biểu diễn hiện tại hoặc bản ghi âm.",
    sources: [
      {
        title: "Hồ sơ UNESCO về nghệ thuật bài chòi Trung Bộ",
        author: "UNESCO",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation:
          "Đối chiếu đặc điểm kết hợp các hình thức nghệ thuật và thông tin ghi danh.",
      },
      {
        title: "Thông tin bảo tồn và truyền dạy bài chòi tại Hội An",
        author: "Website Phố cổ Hội An – Di sản văn hóa thế giới",
        sourceType: "Thông tin cơ quan / đơn vị",
        annotation:
          "Đối chiếu vai trò người hô hát và hoạt động truyền dạy tại Hội An.",
      },
    ],
    metadata: {
      contentKind: "editorial",
      editorialStatus: "in-review",
      quotationVerified: false,
      editorialNote:
        "Diễn giải từ nguồn được dẫn; chờ duyệt biên tập.",
      sources: [
        {
          id: "unesco-bai-choi",
          title: "Hồ sơ nghệ thuật bài chòi Trung Bộ",
          authorOrOrganization: "UNESCO",
          url:
            "https://ich.unesco.org/en/RL/the-art-of-bai-choi-in-central-viet-nam-01222",
          locator: "Phần mô tả di sản và thông tin ghi danh",
          accessedOn: "2026-10-05",
        },
        {
          id: "hoi-an-bai-choi-truyen-day",
          title: "Thông tin bảo tồn bài chòi tại Hội An",
          authorOrOrganization:
            "Website Phố cổ Hội An – Di sản văn hóa thế giới",
          url:
            "https://www.hoianworldheritage.org.vn/vi/news/Van-hoa-nghe-thuat/huong-di-hieu-qua-cua-quang-nam-trong-viec-bao-ton-va-phat-huy-nghe-thuat-bai-choi-o-hoi-an-2464.hwh",
          locator:
            "Các đoạn về anh hiệu, chị hiệu và hoạt động truyền dạy",
          accessedOn: "2026-10-05",
        },
      ],
    },
  },
  {
    id: "neak-ta-khmer-nam-bo",
    title: "Néak Tà trong đời sống người Khmer Nam Bộ",
    subtitle:
      "Tìm hiểu một tín ngưỡng gắn với đất đai, nơi cư trú và ký ức cộng đồng.",
    region: "Nam Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/do_paper_still_life.jpg",
    caption:
      "Ảnh minh họa cho bài đọc; không phải ảnh miếu hoặc vật thờ Néak Tà.",
    readingTime: "~2 phút",
    excerpt:
      "Một góc tiếp cận chủ đề Ông Tà qua nghiên cứu về tín ngưỡng Néak Tà của người Khmer Nam Bộ.",
    sections: [
      {
        id: "neak-ta-va-noi-cu-tru",
        title: "01. Tín ngưỡng gắn với nơi cư trú",
        paragraphs: [
          "Nghiên cứu của Phan Anh Tú mô tả tín ngưỡng Néak Tà của người Khmer Nam Bộ trong mối liên hệ với môi trường tự nhiên, hoạt động nông nghiệp và nơi cư trú.",
          "Trong quan niệm được nghiên cứu, Néak Tà gắn với việc cai quản đất đai, xóm làng. Đây là cách cộng đồng hình dung vai trò của vị thần trong đời sống tín ngưỡng.",
        ],
      },
      {
        id: "vat-tho-va-bien-doi",
        title: "02. Vật thờ và sự biến đổi",
        paragraphs: [
          "Tác giả ghi nhận hình thức thờ bằng đá thiêng và sự xuất hiện của hình tượng nhân dạng tại các địa bàn khảo sát. Nghiên cứu dựa trên thực địa ở Trà Vinh và Bình Phước vào tháng 3 năm 2020.",
          "Những ghi nhận này giúp thấy thực hành tín ngưỡng có thể biến đổi. Không nên dùng một mẫu miếu hoặc vật thờ để mô tả mọi cộng đồng.",
        ],
      },
      {
        id: "tim-hieu-tu-cong-dong",
        title: "03. Tìm hiểu từ cộng đồng cụ thể",
        paragraphs: [
          "Khi tiếp cận chủ đề Ông Tà, hãy ghi rõ địa phương, cộng đồng và nguồn tài liệu. Bài này tập trung vào Néak Tà của người Khmer, chưa khảo cứu toàn bộ các hình thức thờ Ông Tà tại Nam Bộ.",
        ],
        practicalCards: [
          {
            title: "Hỏi trước khi ghi hình",
            desc:
              "Tìm hiểu quy ước tại miếu và xin phép người quản lý trước khi chụp ảnh không gian thờ phụng.",
          },
          {
            title: "Giữ vật thờ tại chỗ",
            desc:
              "Tôn trọng vật thờ của cộng đồng; không di chuyển hoặc mang về làm đồ lưu niệm.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài giới thiệu dựa trên một nghiên cứu có phạm vi khảo sát cụ thể. Không cung cấp bài cúng, lễ vật hoặc quy trình nghi lễ.",
    sources: [
      {
        title: "Nghiên cứu về biến đổi tín ngưỡng Néak Tà",
        author: "Phan Anh Tú",
        sourceType: "Khảo cứu học thuật",
        annotation:
          "Nghiên cứu Ấn Độ và Châu Á, số 10 (107), năm 2021, trang 40–47; đối chiếu phần tóm tắt và mục 1–2.",
      },
    ],
    metadata: {
      contentKind: "editorial",
      editorialStatus: "in-review",
      quotationVerified: false,
      editorialNote:
        "Diễn giải từ nghiên cứu được dẫn; chờ duyệt biên tập.",
      sources: [
        {
          id: "phan-anh-tu-neak-ta-2021",
          title: "Nghiên cứu về biến đổi tín ngưỡng Néak Tà",
          authorOrOrganization: "Phan Anh Tú",
          url:
            "https://hcmussh.edu.vn/static/document/BiendoitinnguongNeakTaKhmerNamBo.pdf",
          bibliographicReference:
            "Phan Anh Tú (2021). Biến đổi tín ngưỡng Néak Tà của người Khmer Nam Bộ: Sự trở lại của hình tượng Rishi và thần Shiva trong đạo Bà La Môn. Nghiên cứu Ấn Độ và Châu Á, 10(107), 40–47.",
          locator:
            "Trang 40–42: tóm tắt, nguồn gốc và biến đổi của tín ngưỡng",
          accessedOn: "2026-10-05",
        },
      ],
    },
  },
  {
    id: "hau-dong-chau-van",
    audioRecordingIds: [],
    title: "Hầu đồng và chầu văn trong tín ngưỡng thờ Mẫu",
    subtitle:
      "Tìm hiểu mối liên hệ giữa nghi lễ, lời ca và những người gìn giữ thực hành.",
    region: "Bắc Bộ",
    category: "Phong tục & Nghi lễ",
    image: "/images/do_paper_still_life.jpg",
    caption:
      "Ảnh minh họa cho bài đọc; không phải ảnh tư liệu nghi lễ hầu đồng.",
    readingTime: "~2 phút",
    excerpt:
      "Một bài giới thiệu giúp phân biệt nghi thức hầu đồng với hình thức ca hát chầu văn gắn với nghi thức này.",
    sections: [
      {
        id: "hau-dong-va-chau-van",
        title: "01. Hai khái niệm có liên hệ",
        paragraphs: [
          "Thông tin trên cổng Bộ Văn hóa, Thể thao và Du lịch mô tả hát văn, hát chầu văn là loại hình ca hát cổ truyền gắn với nghi thức hầu đồng trong tín ngưỡng thờ Mẫu.",
          "Khi tìm hiểu, cần phân biệt nghi thức hầu đồng với phần ca hát chầu văn gắn với nghi thức. Hai khái niệm có liên hệ nhưng không nên dùng thay thế cho nhau.",
        ],
      },
      {
        id: "nguoi-thuc-hanh",
        title: "02. Những người tham gia thực hành",
        paragraphs: [
          "Hồ sơ UNESCO về thực hành tín ngưỡng thờ Mẫu Tam phủ đề cập đến người trông coi đền, người thực hành nghi lễ, thanh đồng, người phụ giúp và nhạc công.",
          "Trang phục, âm nhạc và múa là những thành tố xuất hiện trong các thực hành được mô tả. Tìm hiểu di sản cần quan tâm đến cả con người và bối cảnh thực hành.",
        ],
      },
      {
        id: "nghi-le-va-trinh-dien",
        title: "03. Chú ý bối cảnh khi xem",
        paragraphs: [
          "Bản tin về liên hoan tại Thanh Hóa năm 2022 ghi nhận cả tiết mục hát văn và trình diễn trích đoạn giá hầu. Một chương trình giới thiệu trên sân khấu cần được đọc trong bối cảnh của chương trình đó.",
        ],
        practicalCards: [
          {
            title: "Đọc tên và bối cảnh",
            desc:
              "Khi xem một bản ghi, tìm thông tin về người biểu diễn, địa điểm và việc đó là nghi lễ hay chương trình giới thiệu.",
          },
          {
            title: "Tôn trọng người tham gia",
            desc:
              "Xin phép trước khi ghi hình và tuân theo hướng dẫn của người quản lý không gian thờ phụng.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài giới thiệu có nguồn đối chiếu, chưa phải hướng dẫn nghi lễ. Phân loại Bắc Bộ phục vụ điều hướng, không giới hạn thực hành vào riêng miền Bắc. Chưa cung cấp bản ghi âm chầu văn.",
    sources: [
      {
        title: "Thông tin liên hoan hát văn, hát chầu văn tại Thanh Hóa",
        author: "Cổng Bộ Văn hóa, Thể thao và Du lịch; theo Báo Thanh Hóa",
        sourceType: "Thông tin cơ quan / đơn vị",
        annotation:
          "Đối chiếu mối liên hệ với hầu đồng và các hình thức trình diễn tại liên hoan năm 2022.",
      },
      {
        title: "Hồ sơ UNESCO về thực hành tín ngưỡng thờ Mẫu Tam phủ",
        author: "UNESCO",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation:
          "Đối chiếu người gìn giữ và các thành tố văn hóa trong thực hành.",
      },
    ],
    metadata: {
      contentKind: "editorial",
      editorialStatus: "in-review",
      quotationVerified: false,
      editorialNote:
        "Nội dung diễn giải từ nguồn được dẫn; chờ duyệt biên tập.",
      sources: [
        {
          id: "chau-van-thanh-hoa-2022",
          title: "Thông tin liên hoan hát văn, hát chầu văn năm 2022",
          authorOrOrganization:
            "Cổng Bộ Văn hóa, Thể thao và Du lịch; theo Báo Thanh Hóa",
        url:
          "https://bvhttdl.gov.vn/Pages/chi-tiet.aspx?url=/lien-hoan-hat-van-hat-chau-van-tinh-thanh-hoa-lan-thu-nhat-20221228090051414.htm",
          locator:
            "Các đoạn giới thiệu hát văn, hát chầu văn và hình thức trình diễn tại liên hoan",
          accessedOn: "2026-10-05",
        },
        {
          id: "unesco-tho-mau-thuc-hanh",
          title: "Hồ sơ thực hành tín ngưỡng thờ Mẫu Tam phủ",
          authorOrOrganization: "UNESCO",
          url:
            "https://ich.unesco.org/en/RL/practices-related-to-the-viet-beliefs-in-the-mother-goddesses-of-three-realms-01064",
          locator:
            "Phần mô tả thực hành và người gìn giữ di sản",
          accessedOn: "2026-10-05",
        },
      ],
    },
  },
  {
    id: "hoa-dang-ninh-kieu",
    title: "Hoa đăng Ninh Kiều: một góc văn hóa sông nước",
    subtitle:
      "Tìm hiểu hoạt động hoa đăng trong một ngày hội văn hóa – du lịch tại Cần Thơ.",
    region: "Nam Bộ",
    category: "Sinh hoạt văn hóa",
    image: "/images/do_paper_still_life.jpg",
    caption:
      "Ảnh minh họa cho bài đọc; không phải ảnh hoa đăng Ninh Kiều.",
    readingTime: "~2 phút",
    excerpt:
      "Một trường hợp cụ thể để khám phá hoa đăng và không gian sinh hoạt bên sông tại Nam Bộ.",
    sections: [
      {
        id: "hoa-dang-trong-ngay-hoi",
        title: "01. Hoa đăng trong một ngày hội",
        paragraphs: [
          "Thông tin về Ngày hội Du lịch – Đêm Hoa đăng Ninh Kiều năm 2023 nêu mục tiêu tạo điểm nhấn du lịch cho Ninh Kiều và Cần Thơ, trong đó có du lịch sông nước.",
          "Bài đọc tiếp cận hoa đăng trong bối cảnh sự kiện văn hóa – du lịch này. Nguồn được dẫn không đủ để kết luận đây là một nghi lễ cổ truyền chung của toàn Nam Bộ.",
        ],
      },
      {
        id: "mo-hinh-hoa-dang",
        title: "02. Hoạt động có cộng đồng tham gia",
        paragraphs: [
          "Thông tin của Công đoàn Cần Thơ ghi nhận hơn 80 mô hình hoa đăng đã được hạ thủy trong đợt tổ chức năm 2023 và sự tham gia của Liên đoàn Lao động quận Ninh Kiều.",
          "Các mô hình trong một sự kiện có tổ chức cần được phân biệt với việc cá nhân tự thả đèn xuống sông.",
        ],
      },
      {
        id: "tim-hieu-hoa-dang",
        title: "03. Gợi ý khi tìm hiểu",
        paragraphs: [
          "Bạn có thể bắt đầu từ cách mô hình được tạo hình, đơn vị tham gia và vai trò của không gian ven sông trong hoạt động.",
        ],
        practicalCards: [
          {
            title: "Xem thông báo mới",
            desc:
              "Nếu muốn tham dự, kiểm tra thông báo của đơn vị tổ chức cho năm hiện tại. Bài này sử dụng tư liệu năm 2023.",
          },
          {
            title: "Quan sát theo hướng dẫn",
            desc:
              "Tuân theo khu vực tham quan và hướng dẫn của ban tổ chức; không tự thả vật dụng xuống sông.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài tư liệu về sự kiện văn hóa – du lịch năm 2023, không phải lịch hiện tại hoặc hướng dẫn nghi lễ. Chưa khảo cứu toàn bộ văn hóa hoa đăng tại Nam Bộ.",
    sources: [
      {
        title: "Thông tin tổ chức ngày hội hoa đăng Ninh Kiều năm 2023",
        author: "Cổng Bộ Văn hóa, Thể thao và Du lịch",
        sourceType: "Thông tin cơ quan / đơn vị",
        annotation:
          "Đối chiếu mục tiêu văn hóa – du lịch và phạm vi sự kiện.",
      },
      {
        title: "Thông tin tham gia mô hình hoa đăng năm 2023",
        author: "Công đoàn Cần Thơ",
        sourceType: "Thông tin cơ quan / đơn vị",
        annotation:
          "Đối chiếu việc hạ thủy mô hình và sự tham gia của đơn vị địa phương.",
      },
    ],
    metadata: {
      contentKind: "editorial",
      editorialStatus: "in-review",
      quotationVerified: false,
      editorialNote:
        "Nội dung diễn giải từ tư liệu năm 2023; chờ duyệt biên tập.",
      sources: [
        {
          id: "ninh-kieu-hoa-dang-2023",
          title: "Thông tin tổ chức ngày hội hoa đăng Ninh Kiều",
          authorOrOrganization:
            "Cổng Bộ Văn hóa, Thể thao và Du lịch",
          url:
            "https://bvhttdl.gov.vn/to-chuc-ngay-hoi-du-lich-dem-hoa-dang-ninh-kieu-can-tho-lan-thu-vi-nam-2023-20231121101920099.htm",
          locator:
            "Phần giới thiệu mục tiêu và kế hoạch tổ chức năm 2023",
          accessedOn: "2026-10-05",
        },
        {
          id: "cong-doan-can-tho-hoa-dang-2023",
          title: "Thông tin tham gia mô hình hoa đăng",
          authorOrOrganization: "Công đoàn Cần Thơ",
          url:
            "https://congdoan.cantho.gov.vn/lien-doan-lao-dong-quan-ninh-kieu-tham-gia-mo-hinh-hoa-dang-nam-2023-ky-niem-20-nam-thanh-lap-thanh-pho-can-tho-truc-thuoc-trung-uong-va-thanh-lap-quan-ninh-kieu-01012004-01012024",
          locator:
            "Đoạn thông tin về các mô hình hoa đăng năm 2023",
          accessedOn: "2026-10-05",
        },
      ],
    },
  },
];

export const getCultureArticleById = (
  id: string
): CultureArticle | undefined => {
  return CULTURE_ARTICLES.find((article) => article.id === id);
};

export const getRelatedArticles = (
  currentId: string,
  limit = 3
): CultureArticle[] => {
  const current = getCultureArticleById(currentId);

  const candidates = CULTURE_ARTICLES.filter(
    (article) => article.id !== currentId
  );

  const sameRegion = candidates.filter(
    (article) => article.region === current?.region
  );

  const otherRegions = candidates.filter(
    (article) => article.region !== current?.region
  );

  return [...sameRegion, ...otherRegions].slice(
    0,
    Math.max(0, limit)
  );
};
