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
  region: string;
  category: string;
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
      "Di sản văn hóa phi vật thể của nhân loại, điểm tựa gắn kết tinh thần đoàn kết máu thịt của bách gia trăm họ qua mấy ngàn năm dựng nước và giữ nước.",
    region: "Bắc Bộ",
    category: "Lễ hội truyền thống",
    image: "/images/den_hung.jpg",
    caption:
      "Đoàn rước kiệu thiêng uy nghiêm tiến lên đỉnh núi Nghĩa Lĩnh trong ngày Giỗ Tổ mùng mười tháng Ba âm lịch.",
    readingTime: "~6 phút",
    excerpt:
      "Di sản văn hóa phi vật thể đại diện của nhân loại, điểm tựa tinh thần cội nguồn nuôi dưỡng ý thức đồng bào 'bọc trăm trứng' linh thiêng.",
    sections: [
      {
        id: "y-nghia-coi-nguon",
        title: "01. Ý niệm cội nguồn và nghĩa 'Đồng bào' thiêng liêng",
        paragraphs: [
          "Hiếm có dân tộc nào trên thế giới có chung một vị Quốc Tổ và cùng hướng về một ngày Giỗ Tổ như người Việt Nam. Tín ngưỡng thờ cúng Hùng Vương bắt nguồn từ tâm thức thờ cúng tổ tiên gia đình, dòng họ, được bồi đắp qua hàng ngàn năm để nâng lên thành tín ngưỡng của toàn thể quốc gia dân tộc.",
          "Hai tiếng 'Đồng bào' gợi nhắc huyền thoại bọc trăm trứng của Mẹ Âu Cơ và Cha Lạc Long Quân. Năm mươi người con theo cha xuống biển, năm mươi người con theo mẹ lên non, cùng nhau khai phá đất đai, đắp đê ngăn lũ, tạo dựng bờ cõi non sông gấm vóc. Huyền thoại ấy nhắc nhở con dân đất Việt dù ở miền ngược hay miền xuôi, trong nước hay phương trời hải ngoại, đều chung một dòng máu Lạc Hồng, chia ngọt sẻ bùi.",
        ],
      },
      {
        id: "nghi-thuc-den-hung",
        title: "02. Khói trầm Nghĩa Lĩnh & Hệ thống Đền thiêng qua các thời đại",
        paragraphs: [
          "Tọa lạc trên đỉnh núi Nghĩa Lĩnh hùng vĩ giữa vùng đất Phong Châu cổ (Phú Thọ), quần thể di tích Đền Hùng bao gồm Đền Hạ, Đền Trung, Đền Thượng, Lăng Hùng Vương và Đền Giếng. Mỗi ngôi đền ghi dấu một giai thoại mở cõi hào hùng từ thời các Vua Hùng dựng nước Văn Lang.",
          "Mỗi độ tháng Ba âm lịch, hàng triệu bước chân con Lạc cháu Hồng hành hương về non thiêng. Nghi lễ rước kiệu hoa rực rỡ sắc màu, tiếng trống đồng giục giã âm vang sông núi. Lễ vật dâng lên Tổ tiên không thể thiếu Bánh Chưng vuông tượng trưng cho Đất, Bánh Giầy tròn tượng trưng cho Trời — đúc kết đạo lý hiếu nghĩa sâu nặng của chàng hoàng tử Lang Liêu thuở xưa.",
        ],
        quote:
          "Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng Ba / Dù ai buôn bán gần xa / Nhớ ngày Giỗ Tổ tháng Ba mùng mười.",
      },
      {
        id: "nguoi-tre-voi-coi-nguon",
        title: "03. Nếp sống tri ân & Thực hành tại gia cho người trẻ hôm nay",
        paragraphs: [
          "Giỗ Tổ Hùng Vương không chỉ là một nghi lễ hành hương xa xôi, mà là cơ hội để mỗi người trẻ chiêm nghiệm sâu sắc về cội nguồn, nếp nhà và lòng tự tôn dân tộc:",
        ],
        practicalCards: [
          {
            title: "Tưởng niệm Quốc Tổ tại bàn thờ gia tiên",
            desc: "Vào ngày mùng 10 tháng 3 âm lịch, thắp nén hương thơm thanh tịnh trước bàn thờ gia đình, dâng đĩa bánh chưng hoặc hoa quả tươi thể hiện tấm lòng tri ân công đức tổ tiên khai sáng non sông.",
          },
          {
            title: "Tìm hiểu gia phả & Cội nguồn dòng họ",
            desc: "Dành thời gian trò chuyện cùng ông bà, cha mẹ về cội nguồn quê quán, ghi chép lại phả hệ gia đình để gìn giữ nếp nhà qua các thế hệ.",
          },
          {
            title: "Trân quý tinh thần đoàn kết đồng bào",
            desc: "Nuôi dưỡng tinh thần tương thân tương ái, sẵn sàng sẻ chia giúp đỡ đồng bào gặp khó khăn thiên tai, giữ gìn danh dự người Việt trong môi trường học tập và làm việc quốc tế.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết được biên soạn theo hồ sơ di sản chính thống UNESCO và tư liệu khảo cứu của Khu Di tích Lịch sử Quốc gia đặc biệt Đền Hùng.",
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
          "Điện Hòn Chén (Huệ Nam Điện) tọa lạc trên sườn núi Ngọc Trản, soi bóng xuống dòng sông Hương thơ mộng. Đây là minh chứng tiêu biểu bậc nhất cho quá trình giao lưu, tiếp biến văn hóa sâu sắc giữa người Việt và người Chăm trong tiến trình lịch sử mở cõi phương Nam.",
          "Nữ thần Po Nagar (Mẹ Xứ Sở) của người Chăm khi hòa vào tâm thức người Việt đã được tôn xưng thành Thánh Mẫu Thiên Y A Na - người mẹ bao dung ban phát mưa thuận gió hòa, dạy dân cày cấy, ươm tơ dệt lụa và chữa bệnh cứu người. Triều Nguyễn sau này đã sắc phong Bà là 'Hoằng Huệ Phổ Tế Linh Cảm Diệu Ứng Thiên Y A Na Diễn Ngọc Phi'.",
        ],
      },
      {
        id: "sac-mau-song-huong",
        title: "02. Nhịp chèo rước Thánh Mẫu trên dòng sông Hương",
        paragraphs: [
          "Hằng năm vào tháng Ba và tháng Bảy âm lịch, lễ hội rước Mẫu trên sông Hương diễn ra tưng bừng và huyền ảo. Hàng chục chiếc 'bằng' (thuyền đôi ghép lại) trang hoàng cờ lọng ngũ sắc, hương hoa rực rỡ nối đuôi nhau xuôi ngược dòng Hương từ Thánh đường Thiên Tiên Thánh Giáo lên đến Huệ Nam Điện.",
          "Tiếng đàn nguyệt réo rắt, câu hát chầu văn hòa cùng nhã nhạc cung đình và tiếng sóng nước vỗ mạn thuyền tạo nên một không gian văn hóa tâm linh đặc sắc, vừa linh thiêng vừa đậm đà phong vị sông nước Cố Đô.",
        ],
        quote:
          "Sông Hương lững lờ chở bao trầm tích / Mái điện Hòn Chén neo giữ đức bao dung và ân tình của Người Mẹ non sông.",
      },
      {
        id: "tram-tich-va-nguoi-tre",
        title: "03. Trầm tích di sản & Không gian tĩnh tại người trẻ tìm về",
        paragraphs: [
          "Điện Hòn Chén mang đến cho người trẻ hôm nay một lăng kính sâu sắc về sự hòa hợp đa văn hóa và triết lý sống thiện lương, bao dung của tiền nhân:",
        ],
        practicalCards: [
          {
            title: "Học hỏi tinh thần dung nạp văn hóa",
            desc: "Hiểu được cách tiền nhân người Việt trân trọng di sản Chămpa để cùng chung sống hòa bình, bài học quý giá về tinh thần cởi mở và tôn trọng sự khác biệt trong xã hội đương đại.",
          },
          {
            title: "Thưởng thức nghệ thuật diễn xướng Cố Đô",
            desc: "Lắng nghe làn điệu chầu văn Huế và âm hưởng nhã nhạc để cảm nhận vẻ đẹp mỹ cảm tinh tế, vừa trang nghiêm vừa phóng khoáng của âm nhạc truyền thống miền Trung.",
          },
          {
            title: "Thực hành lắng đọng tâm hồn bên dòng Hương",
            desc: "Dành một khoảng lặng ngắm nhìn non nước Hương Giang bảng lảng khói sương, hít thở sâu và gột rửa những âu lo thường nhật để tìm lại tâm an tĩnh tại.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết khảo cứu dựa trên tài liệu thực địa Huệ Nam Điện và công trình nghiên cứu di sản văn hóa xứ Huế của các học giả chuyên ngành.",
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
        title: "01. Điểm tựa tâm linh của người đi biển & Ân tình với Cá Ông",
        paragraphs: [
          "Đối với người ngư dân bám biển miền Trung, đại dương vừa là nguồn sống hào phóng nuôi dưỡng bao thế hệ, vừa ẩn chứa muôn vàn trắc trở hiểm nguy trước cuồng phong bão táp. Tục thờ Cá Ông (Đại Càn Quốc Gia Nam Hải Cự Tộc Ngọc Lân Thần) phản ánh lòng biết ơn chân thành đối với loài cá voi hiền lành, thông minh thường che chở, nâng đỡ thuyền bè hoạn nạn.",
          "Khi Cá Ông lụy (dạt vào bờ), người ngư dân đầu tiên trông thấy sẽ chịu tang như cha mẹ ruột. Cả vạn chài cùng nhau tổ chức lễ an táng trang nghiêm, sau ba năm làm lễ thượng ngọc cốt đưa vào lăng Ông phụng thờ đời đời. Mối quan hệ thiêng liêng ấy là biểu tượng tuyệt đẹp của đạo nghĩa tri ân giữa con người và thiên nhiên.",
        ],
      },
      {
        id: "dieu-hat-ba-trao",
        title: "02. Điệu hát Bả Trạo và nhịp thở đại dương quật cường",
        paragraphs: [
          "Lễ hội Cầu Ngư không thể thiếu điệu múa hát Bả Trạo (chèo thuyền biểu diễn) - một hình thức diễn xướng dân gian độc đáo kết hợp giữa ca kịch và múa nghi lễ. Đội hình gồm Tổng lái, Tổng mũi, Tổng khoang và các bạn chèo tay cầm mái dầm sơn đen trắng uyển chuyển theo từng câu hò.",
          "Tiếng trống giục, mái chèo khua nhịp nhàng mô phỏng cảnh vượt sóng dữ, tạ ơn thần linh và cầu mong 'phong điều vũ thuận, quốc thái dân an, biển nhiều tôm cá'. Đó là khúc tráng ca thể hiện tinh thần đoàn kết, kiên cường và lòng yêu biển thiết tha của người dân duyên hải.",
        ],
        quote:
          "Sóng cả không ngã tay chèo / Ơn biển mẹ nuôi sống vạn chài ngàn đời vững chí vươn khơi.",
      },
      {
        id: "bai-hoc-bien-ca",
        title: "03. Bài học đạo hiếu với đại dương & Trách nhiệm thế hệ trẻ",
        paragraphs: [
          "Từ nét đẹp văn hóa vạn chài, người trẻ hôm nay nhận ra trách nhiệm thiêng liêng trong việc bảo vệ đại dương và trân trọng nguồn sống tự nhiên:",
        ],
        practicalCards: [
          {
            title: "Bảo vệ môi trường biển & Sinh thái đại dương",
            desc: "Ý thức giữ gìn sự trong lành của biển cả, từ chối xả rác thải nhựa nơi bờ biển và ủng hộ các sản phẩm đánh bắt hải sản bền vững có trách nhiệm.",
          },
          {
            title: "Nuôi dưỡng ý chí kiên định vượt khó",
            desc: "Học hỏi tinh thần can trường của những người con vạn chài trước sóng gió ngàn trùng để giữ vững niềm tin, kiên định vượt qua những thử thách trong cuộc sống.",
          },
          {
            title: "Chiêm nghiệm lời cầu bình an từ biển",
            desc: "Thực hành gởi gắm lời nguyện an lành cho những người đang ngày đêm bám biển giữ gìn chủ quyền thiêng liêng của Tổ quốc nơi đầu sóng ngọn gió.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết tổng hợp từ hồ sơ Di sản Văn hóa Phi vật thể Quốc gia của Bộ Văn hóa, Thể thao và Du lịch cùng các công trình nghiên cứu văn hóa dân gian miền Trung.",
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
        title: "01. Đất lành chở che tiền nhân mở cõi phương Nam",
        paragraphs: [
          "Tọa lạc dưới chân núi Sam huyền bí (thành phố Châu Đốc, An Giang), Miếu Bà Chúa Xứ gắn liền với quá trình khai hoang mở đất phương Nam của lưu dân các dân tộc Kinh, Chăm, Hoa, Khmer. Pho tượng Bà bằng đá sa thạch cổ từ thế kỷ VI mang dáng dấp nghệ thuật quý phái, là chứng nhân văn hóa rực rỡ của nền văn minh Phù Nam xưa.",
          "Khi danh thần Thoại Ngọc Hầu chỉ huy đào kênh Vĩnh Tế ngăn giặc giữ yên bờ cõi, phu nhân Châu Thị Vĩnh Tế đã hết lòng cầu nguyện Bà phù hộ cho dân binh bình an, công trình hoàn thành thắng lợi. Từ đó, Bà Chúa Xứ trở thành đấng Mẫu nghi bao dung, vị phúc thần chở che cho nhân dân khỏi dịch bệnh, thiên tai và ban phát sự ấm no trên vùng đất mới.",
        ],
      },
      {
        id: "le-tam-ba",
        title: "02. Nghi thức Tắm Bà & Lễ hội di sản văn hóa phi vật thể",
        paragraphs: [
          "Lễ hội Vía Bà Chúa Xứ Núi Sam diễn ra trang trọng từ ngày 22 đến 27 tháng Tư âm lịch, thu hút hàng triệu lượt khách thập phương hành hương chiêm bái. Đúng 23 giờ đêm 23 tháng Tư rạng sáng 24, nghi thức Tắm Bà (mộc dục) diễn ra tôn nghiêm sau bức màn the khép kín.",
          "Nước tắm Bà được nấu công phu từ các loài hoa thơm thảo mộc như hoa lài, quế chi, hoa sen. Sau khi tắm sạch, pho tượng Bà được khoác lên tấm áo bào thêu chỉ vàng lộng lẫy do bá tánh thành tâm dâng cúng. Dòng người hành hương xin nước thơm và lộc áo Bà mang về nhà để cầu mong gia quyến an khang, tai qua nạn khỏi.",
        ],
        quote:
          "Người phương Nam đến với Bà bằng tấm lòng thảo thơm chân chất, cầu mong quốc thái dân an và sẵn sàng san sẻ hạt gạo nghĩa tình cùng tha nhân.",
      },
      {
        id: "khi-chat-nam-bo",
        title: "03. Khí chất hào sảng miền Tây & Bài học tri ân cho thế hệ trẻ",
        paragraphs: [
          "Hình tượng Bà Chúa Xứ Núi Sam đúc kết khí chất hào sảng, trọng nghĩa khinh tài và tinh thần đoàn kết keo sơn của người dân Nam Bộ:",
        ],
        practicalCards: [
          {
            title: "Hành hương với tâm thái hướng thiện thuần khiết",
            desc: "Đến với đền miếu bằng tấm lòng biết ơn và nguyện ước sống lương thiện, tránh xa các biểu hiện thương mại hóa mê tín dị đoan để giữ trọn vẻ đẹp linh thiêng.",
          },
          {
            title: "Nuôi dưỡng tinh thần thảo thơm nghĩa hiệp",
            desc: "Học tập lối sống phóng khoáng, trọng chữ tình và tinh thần sẵn sàng cứu giúp người hoạn nạn đặc trưng của con người miền Tây sông nước.",
          },
          {
            title: "Trân trọng công lao tiền nhân mở cõi",
            desc: "Ghi nhớ công đức của các bậc tiền hiền như Thoại Ngọc Hầu và những người dân đã đổ mồ hôi xương máu kiến tạo vùng đồng bằng trù phú hôm nay.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết dựa trên tư liệu địa chí Nam Bộ cổ truyền và hồ sơ Di sản Văn hóa Phi vật thể Quốc gia được Bộ Văn hóa, Thể thao và Du lịch công nhận.",
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
    title: "Huyền tích Linh Sơn Thánh Mẫu & Lễ Vía Bà núi Bà Đen",
    subtitle:
      "Biểu tượng tâm linh chở che vùng đất phương Nam, điểm tựa đức tin vượt qua gian khó và bài học về lòng kiên trinh, hướng thiện qua bao thế hệ.",
    region: "Nam Bộ",
    category: "Lễ hội truyền thống",
    image: "/images/mekong_nam_bo.jpg",
    caption:
      "Núi Bà Đen hùng vĩ ẩn hiện trong biển mây bồng bềnh, nóc nhà Nam Bộ ngát hương khói chiêm bái.",
    readingTime: "~5 phút",
    excerpt:
      "Biểu tượng tâm linh chở che vùng đất phương Nam, điểm tựa đức tin vượt qua gian khó và bài học về lòng kiên trinh, hướng thiện qua bao thế hệ.",
    sections: [
      {
        id: "ba-den-gioi-thieu",
        title: "01. Đệ nhất danh sơn & Huyền tích nàng Thiên Hương kiên trinh",
        paragraphs: [
          "Núi Bà Đen (Tây Ninh) cao gần 1.000 mét, sừng sững giữa đồng bằng bạt ngàn, từ lâu đã được tôn xưng là 'Đệ nhất danh sơn' phương Nam. Nơi đây gắn liền với huyền tích nàng Lý Thị Thiên Hương — người con gái tài sắc vẹn toàn, một lòng thờ mẹ kính cha, giữ trọn chữ trinh với người yêu Lê Sĩ Triệt.",
          "Khi bị kẻ xấu vây hãm, nàng đã gieo mình xuống vực sâu tuẫn tiết để bảo toàn khí tiết. Cảm kích trước tấm lòng kiên trinh trong sáng, linh hồn nàng hiển thánh, báo mộng giúp quan quân dẹp giặc, ban mưa thuận gió hòa và chữa lành bệnh tật cho muôn dân. Vua Gia Long sau này đã sắc phong là 'Linh Sơn Thánh Mẫu'.",
        ],
      },
      {
        id: "ba-den-hoat-dong",
        title: "02. Lễ Vía Bà mùng năm tháng Năm & Nghi thức Tắm Bà",
        paragraphs: [
          "Lễ Vía Bà Linh Sơn Thánh Mẫu diễn ra từ ngày mùng 4 đến mùng 6 tháng Năm âm lịch hằng năm, được công nhận là Di sản Văn hóa Phi vật thể Quốc gia. Đêm mùng 4 rạng sáng mùng 5, nghi thức Mộc Dục (Tắm Bà) diễn ra tôn nghiêm sau bức màn che bằng nước nấu từ các loài hoa thơm thanh khiết.",
          "Sau lễ tắm, pho tượng Bà được khoác lên xiêm y gấm hoa rực rỡ. Hàng vạn người hành hương từ khắp nơi đổ về đỉnh núi dâng hương hoa tươi, thắp hoa đăng nguyện cầu quốc thái dân an, gia đạo thuận hòa, công việc hanh thông.",
        ],
        quote:
          "Linh Sơn Thánh Mẫu chở che bách tính / Đức kiên trinh sáng tựa mây ngàn đỉnh núi thiêng.",
      },
      {
        id: "ba-den-doc-tu-lieu",
        title: "03. Ý niệm hướng thiện & Nếp sống cho người trẻ hôm nay",
        paragraphs: [
          "Hành hương về đỉnh núi Bà Đen không chỉ là chuyến thưởng ngoạn cảnh sắc kỳ vĩ, mà là cơ hội bồi đắp nhân cách và tinh thần an định cho thế hệ trẻ:",
        ],
        practicalCards: [
          {
            title: "Hành hương với tâm thái trong sáng, tôn nghiêm",
            desc: "Đến với đền chùa bằng lòng tri ân và ước nguyện sống chân chính; giữ trọn sự tôn nghiêm, không chen lấn xô đẩy hay mê tín cầu tài vô lối.",
          },
          {
            title: "Noi theo tấm gương kiên định và chính trực",
            desc: "Học hỏi tinh thần kiên trung trước nghịch cảnh của tiền nhân để giữ vững đạo đức, danh dự và lòng tự trọng trong cuộc sống hiện đại.",
          },
          {
            title: "Gìn giữ cảnh quan sinh thái đỉnh núi thiêng",
            desc: "Ý thức bảo vệ môi trường, không xả rác và tôn trọng thiên nhiên rừng núi hoang sơ của nóc nhà Đông Nam Bộ.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết khảo cứu dựa trên hồ sơ Di sản Văn hóa Phi vật thể Quốc gia và tư liệu nghiên cứu văn hóa dân gian Nam Bộ của Phân viện Văn hóa Nghệ thuật.",
    sources: [
      {
        title: "Lễ Vía Bà Linh Sơn Thánh Mẫu tại núi Bà Đen",
        author: "Bộ Văn hóa, Thể thao và Du lịch",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation: "Quyết định công nhận Lễ Vía Bà là Di sản Văn hóa Phi vật thể Quốc gia.",
      },
      {
        title: "Gia Định Thành Thông Chí (Sơn Xuyên Chí)",
        author: "Trịnh Hoài Đức",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Tư liệu địa chí ghi chép sớm nhất về cảnh sắc núi Bà Đen và sự linh ứng phù trợ của Thánh Mẫu.",
      },
    ],
  },
  {
    id: "tin-nguong-tho-mau-tam-phu",
    title: "Căn cốt Tín ngưỡng Thờ Mẫu Tam Phủ — Di sản văn hóa nhân loại",
    subtitle:
      "Đỉnh cao của đạo lý 'Uống nước nhớ nguồn', tôn vinh Người Mẹ tự nhiên chở che ba cõi Trời - Đất - Nước và dung hòa tinh hoa văn hóa đa dân tộc.",
    region: "Bắc Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/temple_bac_bo.jpg",
    caption:
      "Điện thờ Tứ Phủ uy nghiêm, rực rỡ sắc màu tượng trưng cho ba cõi non sông đất nước.",
    readingTime: "~6 phút",
    excerpt:
      "Di sản văn hóa phi vật thể đại diện của nhân loại được UNESCO vinh danh, biểu tượng của lòng nhân ái và sự trân trọng cội nguồn thiên nhiên.",
    sections: [
      {
        id: "ba-mien-trong-tin-nguong",
        title: "01. Ý niệm Tam Phủ & Ba cõi vũ trụ trong tâm thức Việt",
        paragraphs: [
          "Tín ngưỡng Thờ Mẫu Tam Phủ của người Việt là một thực hành tín ngưỡng dân gian thuần khiết, được UNESCO vinh danh là Di sản Văn hóa Phi vật thể đại diện của nhân loại vào năm 2016. Tam Phủ tượng trưng cho ba miền vũ trụ mà con người sinh sống và nương tựa:",
          "Thiên phủ (miền trời, gắn với sắc đỏ, do Mẫu Thượng Thiên cai quản), Nhạc phủ (miền rừng núi, gắn với sắc xanh, do Mẫu Thượng Ngàn cai quản) và Thoải phủ (miền sông nước, gắn với sắc trắng, do Mẫu Thoải cai quản). Tín ngưỡng khởi nguồn từ sự tôn kính Mẹ Tự Nhiên bao dung nuôi dưỡng muôn loài.",
        ],
      },
      {
        id: "nguoi-gin-giu-thuc-hanh",
        title: "02. Hệ thống thần linh dung nạp & Đạo lý tôn vinh tiền nhân",
        paragraphs: [
          "Khác với các hệ thống tôn giáo khác, tín ngưỡng Thờ Mẫu của người Việt tôn vinh các nhân vật lịch sử có công lao to lớn với đất nước và xóm làng: từ các vị Quan lớn đánh giặc giữ nước, các vị Chầu bà, Quan Hoàng mở mang bờ cõi đến các vị Tiên cô, Thánh cậu cứu tế nhân dân.",
          "Đây cũng là nơi dung hợp văn hóa tuyệt đẹp giữa người Kinh và các dân tộc anh em như Tày, Nùng, Mường, Dao (điển hình qua hình tượng Mẫu Thượng Ngàn, Cô Đôi Thượng Ngàn, Cô Chín Sòng Sơn).",
        ],
        quote:
          "Tháng Tám giỗ Cha, tháng Ba giỗ Mẹ / Đạo hiếu non sông muôn đời khắc ghi.",
      },
      {
        id: "gia-tri-va-bao-ve-di-san",
        title: "03. Bảo vệ tính thiêng & Thực hành di sản văn minh",
        paragraphs: [
          "UNESCO ghi nhận tín ngưỡng Thờ Mẫu vì những giá trị nhân văn sâu sắc: đề cao vai trò của người phụ nữ, nuôi dưỡng lòng nhân ái và tinh thần khoan dung cộng đồng:",
        ],
        practicalCards: [
          {
            title: "Phân biệt di sản đích thực và biến tướng thương mại",
            desc: "Hiểu đúng giá trị tinh thần của việc thờ Mẫu, bài trừ các hành vi buôn thần bán thánh, mê tín dị đoan làm hoen ố nét đẹp văn hóa truyền thống.",
          },
          {
            title: "Trân trọng tính đa dạng văn hóa các dân tộc",
            desc: "Tín ngưỡng Thờ Mẫu minh chứng cho sự bình đẳng, đoàn kết giữa các dân tộc Kinh, Tày, Nùng, Mường cùng chung sống trên dải đất Việt Nam.",
          },
          {
            title: "Tìm về cội nguồn phụng sự người Mẹ",
            desc: "Thực hành đạo làm con hiếu thảo với mẹ cha ruột thịt trước khi hướng tâm cầu nguyện nơi cửa Mẫu linh thiêng.",
          },
        ],
      },
    ],
    editorialNote:
      "Biên soạn dựa trên hồ sơ đệ trình UNESCO Di sản Văn hóa Phi vật thể đại diện của Nhân loại và nghiên cứu của GS.TS Ngô Đức Thịnh.",
    sources: [
      {
        title: "Hồ sơ UNESCO: Thực hành Tín ngưỡng Thờ Mẫu Tam Phủ của người Việt",
        author: "UNESCO / Viện Văn hóa Nghệ thuật Quốc gia Việt Nam",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation: "Quyết định 11.COM 10.b.37 ghi danh di sản tại Addis Ababa (Ethiopia, 01/12/2016).",
      },
      {
        title: "Đạo Mẫu Việt Nam (Tập 1 & 2)",
        author: "GS.TS Ngô Đức Thịnh",
        sourceType: "Khảo cứu học thuật",
        annotation: "Công trình nghiên cứu nền tảng và toàn diện nhất về nguồn gốc, thần điện và nghi thức Đạo Mẫu.",
      },
    ],
  },
  {
    id: "phu-tay-ho",
    title: "Hương trầm Phủ Tây Hồ & Huyền tích Mẫu Liễu Hạnh",
    subtitle:
      "Chốn linh thiêng bên sóng nước hồ Tây, nơi hội tụ huyền tích giáng trần của Thánh Mẫu Liễu Hạnh và thi khúc Tao Đàn vang vọng ngàn xưa.",
    region: "Bắc Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/temple_bac_bo.jpg",
    caption:
      "Phủ Tây Hồ nghiêng bóng xuống mặt nước mênh mông, chốn an yên tĩnh tại giữa lòng thủ đô.",
    readingTime: "~5 phút",
    excerpt:
      "Chốn linh thiêng bên sóng nước hồ Tây, nơi hội tụ huyền tích giáng trần của Thánh Mẫu Liễu Hạnh và thi khúc Tao Đàn ngàn năm văn hiến.",
    sections: [
      {
        id: "phu-tay-ho-tho-ai",
        title: "01. Bán đảo Tây Hồ & Đệ nhất Thánh Mẫu Liễu Hạnh",
        paragraphs: [
          "Tọa lạc trên bán đảo nhô ra giữa sóng nước mênh mông của hồ Tây (phường Quảng An, Tây Hồ, Hà Nội), Phủ Tây Hồ là một trong những chốn linh thiêng bậc nhất xứ kinh kỳ. Nơi đây phụng thờ Mẫu Liễu Hạnh — một trong Tứ Bất Tử của tín ngưỡng dân gian Việt Nam.",
          "Theo truyền tích, Mẫu là con gái thứ hai của Ngọc Hoàng, vì lỡ tay làm vỡ chén ngọc mà phải giáng trần. Trải qua ba lần giáng thế giúp dân mở đất, dạy ươm tơ dệt lụa, trừ gian diệt ác, Mẫu được triều đình sắc phong là 'Mã Hoàng Công Chúa' và nhân dân suy tôn là Thánh Mẫu tối cao.",
        ],
      },
      {
        id: "doc-truyen-thuyet",
        title: "02. Cuộc tao ngộ thi ca giữa Mẫu Liễu & Trạng Bùng",
        paragraphs: [
          "Một trong những giai thoại đẹp nhất gắn liền với Phủ Tây Hồ là cuộc gặp gỡ xướng họa thi ca giữa Mẫu Liễu Hạnh và Trạng Bùng Phùng Khắc Khoan bên bờ hồ Tây. Khách văn nhân tao nhã đối ẩm cùng bậc thần tiên, để lại những vần thơ bất hủ về cảnh sắc hồ sen và tình người xứ Bắc.",
          "Sự hòa quyện giữa vẻ đẹp tâm linh huyền ảo và chất thơ bác học đã biến Phủ Tây Hồ thành một biểu tượng văn hóa thanh lịch, tao nhã của đất Thăng Long ngàn năm văn hiến.",
        ],
        quote:
          "Hồ Tây bảng lảng khói sương / Hương trầm Phủ Mẫu vấn vương lòng người.",
      },
      {
        id: "tim-hieu-phu-tay-ho",
        title: "03. Nếp sống chiêm bái văn minh của người trẻ hôm nay",
        paragraphs: [
          "Đến với Phủ Tây Hồ hôm nay, người trẻ tìm thấy một không gian an trú tâm hồn và chiêm nghiệm nếp sống tao nhã của người Tràng An xưa:",
        ],
        practicalCards: [
          {
            title: "Chiêm bái với tâm thái thanh tịnh",
            desc: "Dâng nén hương thơm, cành hoa tươi với lòng thành kính; cầu bình an cho cha mẹ, gia đình thay vì tham lam cầu xin tiền tài danh vọng.",
          },
          {
            title: "Giữ gìn sự trang nghiêm và lối sống văn minh",
            desc: "Trang phục chỉnh tề lịch sự, giữ trật tự nơi cửa Mẫu, không rải tiền lẻ bừa bãi và chung tay bảo vệ cảnh quan hồ Tây trong lành.",
          },
          {
            title: "Cảm nhận chiều sâu thi ca di sản",
            desc: "Dành thời gian ngắm nhìn mặt nước hồ Tây lúc hoàng hôn, lắng lòng đọc lại những áng thơ xướng họa của tiền nhân để nuôi dưỡng tâm hồn.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết tổng hợp dựa trên thư tịch cổ Hà Nội và tài liệu khảo cứu di tích lịch sử - văn hóa Phủ Tây Hồ.",
    sources: [
      {
        title: "Vân Cát Thần Nữ Truyện (Truyền Kỳ Tân Phả)",
        author: "Đoàn Thị Điểm",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Tác phẩm văn học cổ điển ghi chép trọn vẹn huyền tích giáng trần và sự tích gặp gỡ giữa Mẫu Liễu Hạnh và Phùng Khắc Khoan.",
      },
      {
        title: "Thăng Long - Hà Nội: Di tích và Thắng cảnh",
        author: "Sở Văn hóa và Thể thao Hà Nội",
        sourceType: "Khảo cứu học thuật",
        annotation: "Khảo cứu kiến trúc, văn bia và giá trị lịch sử của cụm di tích Phủ Tây Hồ.",
      },
    ],
  },
  {
    id: "den-tran-nam-dinh",
    title: "Hào khí Đông A chốn Đền Trần Nam Định",
    subtitle:
      "Cội nguồn sức mạnh ba lần đại thắng Nguyên Mông, nơi hội tụ tinh thần 'Vua tôi đồng lòng, anh em hòa thuận, cả nước góp sức' của vương triều Trần rực rỡ.",
    region: "Bắc Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/ancestor_portrait.jpg",
    caption:
      "Đền Trần Nam Định uy nghiêm, nơi lưu giữ hồn thiêng sông núi và hào khí Đông A bất diệt.",
    readingTime: "~6 phút",
    excerpt:
      "Cội nguồn sức mạnh ba lần đại thắng Nguyên Mông, nơi hội tụ tinh thần đoàn kết bách tính của vương triều nhà Trần rực rỡ trong trang sử Việt.",
    sections: [
      {
        id: "ba-cong-trinh-den-tran",
        title: "01. Ba ngôi đền thiêng trên đất phát tích Thiên Trường",
        paragraphs: [
          "Khu Di tích Lịch sử Đền Trần tọa lạc tại phường Lộc Vượng (thành phố Nam Định), nguyên là hành cung Thiên Trường xưa — kinh đô thứ hai của nhà Trần sau Thăng Long. Cụm di tích gồm ba công trình kiến trúc gỗ bề thế:",
          "Đền Thiên Trường (thờ 14 vị vua Trần), đền Trùng Hoa (nơi các vua Trần tham vấn ý kiến các bậc Thái thượng hoàng) và đền Cố Trạch (thờ Quốc công Tiết chế Hưng Đạo Đại Vương Trần Quốc Tuấn cùng gia quyến và các tướng lĩnh thân cận).",
        ],
      },
      {
        id: "tuong-nho-va-tri-an",
        title: "02. Hào khí Đông A & Tấm gương trung nghĩa Quốc Công Tiết Chế",
        paragraphs: [
          "Vương triều Trần là một trong những triều đại rực rỡ nhất trong lịch sử dân tộc với ba lần đánh tan đạo quân Nguyên Mông hùng mạnh bậc nhất thế giới thời bấy giờ. Sức mạnh làm nên kỳ tích ấy chính là 'Hào khí Đông A' — kết tinh từ sự đoàn kết keo sơn của toàn dân tộc:",
          "'Vua tôi đồng lòng, anh em hòa thuận, cả nước góp sức' cùng Hội nghị Diên Hồng vang dội tiếng hô 'Đánh!'. Đức Thánh Trần Quốc Tuấn với bài 'Hịch Tướng Sĩ' bất hủ đã trở thành biểu tượng cao đẹp của lòng yêu nước và đạo trung hiếu muôn đời.",
        ],
        quote:
          "Vua tôi đồng lòng, anh em hòa thuận, cả nước góp sức / Non sông ngàn thuở vững âu vàng.",
      },
      {
        id: "tim-hieu-den-tran",
        title: "03. Ý niệm 'Tích Phúc Vô Cương' & Bài học cho người trẻ",
        paragraphs: [
          "Mỗi dịp đầu xuân, Lễ Khai Ấn Đền Trần diễn ra trang trọng vào đêm 14 rạng sáng 15 tháng Giêng. Bốn chữ trên lá ấn 'Tích Phúc Vô Cương' mang ý nghĩa nhân văn sâu sắc:",
        ],
        practicalCards: [
          {
            title: "Hiểu đúng ý nghĩa 'Tích Phúc Vô Cương'",
            desc: "Bốn chữ nhắc nhở con người muốn được phúc lộc bền lâu thì phải không ngừng tu tâm dưỡng tính, tích đức làm việc thiện; không phải lá bùa thăng quan tiến chức mù quáng.",
          },
          {
            title: "Nuôi dưỡng tinh thần đoàn kết, đồng lòng",
            desc: "Học tập tinh thần Hào khí Đông A để biết hợp tác, sẻ chia và đặt lợi ích cộng đồng, quốc gia lên trên cái tôi cá nhân nhỏ hẹp.",
          },
          {
            title: "Tri ân sâu nặng với tiền nhân giữ nước",
            desc: "Dâng nén hương tưởng nhớ công lao các vua Trần và Đức Thánh Trần để tự nhắc nhở bản thân sống có trách nhiệm với non sông hôm nay.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết dựa trên chính sử Đại Việt Sử Ký Toàn Thư và hồ sơ Di tích Quốc gia Đặc biệt Đền Trần Nam Định.",
    sources: [
      {
        title: "Đại Việt Sử Ký Toàn Thư (Bản Kỷ Toàn Thư - Kỷ Nhà Trần)",
        author: "Ngô Sĩ Liên & Sử quán triều Hậu Lê",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Biên niên sử ghi chép chi tiết về ba lần kháng chiến chống Nguyên Mông và hành cung Thiên Trường.",
      },
      {
        title: "Hồ sơ Di tích Quốc gia Đặc biệt Đền Trần - Chùa Phổ Minh",
        author: "Bộ Văn hóa, Thể thao và Du lịch",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation: "Quyết định công nhận Khu Di tích Lịch sử và Kiến trúc Nghệ thuật Đền Trần là Di tích Quốc gia Đặc biệt.",
      },
    ],
  },
  {
    id: "bai-choi-hoi-an",
    title: "Nghệ thuật Bài Chòi Hội An — Nhịp thở dân gian đất Quảng",
    subtitle:
      "Di sản văn hóa phi vật thể của nhân loại, khúc ca dao rộn rã gắn kết cộng đồng nơi phố cổ rêu phong và bài học ứng xử mộc mạc, hóm hỉnh của tiền nhân.",
    region: "Trung Bộ",
    category: "Sinh hoạt văn hóa",
    image: "/images/hue_trung_bo.jpg",
    caption:
      "Sân chơi Bài Chòi rộn rã tiếng cười bên dòng sông Hoài thơ mộng, hồn cốt dân gian phố cổ Hội An.",
    readingTime: "~5 phút",
    excerpt:
      "Di sản văn hóa phi vật thể của nhân loại được UNESCO vinh danh, khúc ca dao rộn rã gắn kết tình làng nghĩa xóm giữa lòng phố cổ rêu phong.",
    sections: [
      {
        id: "bai-choi-la-gi",
        title: "01. Trò chơi dân gian kết hợp đa nghệ thuật độc bản",
        paragraphs: [
          "Nghệ thuật Bài Chòi Trung Bộ được UNESCO vinh danh là Di sản Văn hóa Phi vật thể đại diện của nhân loại vào năm 2017. Nơi phố cổ Hội An, không gian Bài Chòi bên bờ sông Hoài luôn là điểm hẹn văn hóa rộn ràng, cuốn hút mọi lứa tuổi.",
          "Bài Chòi là sự kết hợp tài tình giữa âm nhạc dân ca, thơ phú, diễn xuất kịch nghệ, hội họa dân gian và văn học truyền miệng. Mười chiếc chòi tre đơn sơ dựng lên vòng cung, người chơi ngồi trên chòi lắng nghe và chờ đợi từng quân bài may mắn.",
        ],
      },
      {
        id: "nguoi-ho-hat",
        title: "02. Tài nghệ ứng biến dí dỏm của Anh Hiệu, Chị Hiệu",
        paragraphs: [
          "Linh hồn của hội Bài Chòi chính là 'Anh Hiệu, Chị Hiệu' — người vừa đóng vai quản trò, vừa là nghệ sĩ dân gian tài hoa. Mỗi khi rút một quân bài từ ống thẻ, Hiệu không xướng ngay tên bài mà ứng tác một câu thai, câu hò ca dao hóm hỉnh đầy ẩn ý:",
          "'Đi đâu mang nón đi giày / Đem gương đi tỉa đôi mày cho thanh...' — để rồi người chơi vỗ tay reo hò khi nhận ra đó là con 'Bát Bồng' hay 'Cửu Điểu'. Lời hô hát đậm đà phong vị ca dao đất Quảng, ca ngợi tình yêu quê hương, răn dạy đạo lý làm người.",
        ],
        quote:
          "Gió đưa gió đẩy về rẫy ăn còng / Về sông ăn cá về đồng ăn cua / Đêm rằm phố Hội trẩy hội Bài Chòi.",
      },
      {
        id: "truyen-day-bai-choi",
        title: "03. Di sản sống & Tinh thần kết nối người trẻ hôm nay",
        paragraphs: [
          "Bài Chòi Hội An tồn tại và phát triển mạnh mẽ chính nhờ sự tiếp nối bền bỉ qua các thế hệ nghệ nhân và tình yêu say mê của công chúng trẻ:",
        ],
        practicalCards: [
          {
            title: "Trải nghiệm trò chơi dân gian lành mạnh",
            desc: "Bài Chòi không mang tính sát phạt cờ bạc mà là một không gian giải trí tao nhã, gắn kết nụ cười và rèn luyện sự nhanh nhạy, yêu thích văn học dân gian.",
          },
          {
            title: "Học hỏi nghệ thuật giao tiếp dí dỏm, chân phương",
            desc: "Cách Anh Hiệu, Chị Hiệu dẫn dắt cuộc chơi là bài học quý về sự hóm hỉnh, duyên dáng và khả năng gắn kết mọi người trong các hoạt động cộng đồng.",
          },
          {
            title: "Chung tay bảo tồn nghệ thuật cổ truyền",
            desc: "Lắng nghe, tìm hiểu và chia sẻ những câu hò điệu lý Bài Chòi trên các nền tảng số để di sản tiếp tục ngân vang cùng thời đại.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết tổng hợp dựa trên hồ sơ đệ trình UNESCO Nghệ thuật Bài Chòi Trung Bộ và tư liệu nghiên cứu của Trung tâm Bảo tồn Di sản Văn hóa Hội An.",
    sources: [
      {
        title: "Hồ sơ UNESCO: Nghệ thuật Bài Chòi ở Trung Bộ Việt Nam",
        author: "UNESCO / Viện Âm nhạc Quốc gia Việt Nam",
        sourceType: "Di sản Quốc gia / UNESCO",
        annotation: "Quyết định ghi danh Nghệ thuật Bài Chòi vào Danh sách Di sản Văn hóa Phi vật thể đại diện của Nhân loại (2017).",
      },
      {
        title: "Dân ca Bài Chòi Quảng Nam",
        author: "Sở Văn hóa, Thể thao và Du lịch tỉnh Quảng Nam",
        sourceType: "Khảo cứu học thuật",
        annotation: "Tập hợp các điệu lý, câu thai, lối diễn xướng và chân dung các nghệ nhân Bài Chòi đất Quảng.",
      },
    ],
  },
  {
    id: "neak-ta-khmer-nam-bo",
    title: "Tín ngưỡng Néak Tà & Tình làng nghĩa xóm người Khmer Nam Bộ",
    subtitle:
      "Vị thần bảo hộ xóm ấp (Phum Sóc), biểu tượng của sự hòa hợp giữa con người với đất đai màu mỡ và giao lưu văn hóa Kinh - Khmer - Hoa bền chặt.",
    region: "Nam Bộ",
    category: "Không gian tín ngưỡng",
    image: "/images/pottery_artisan.jpg",
    caption:
      "Miếu Néak Tà mộc mạc nép dưới bóng thốt nốt, điểm tựa bình yên cho đời sống phum sóc người Khmer.",
    readingTime: "~5 phút",
    excerpt:
      "Vị phúc thần bảo hộ xóm ấp của đồng bào Khmer Nam Bộ, biểu tượng của sự hòa hợp thiên nhiên và gắn kết keo sơn ba dân tộc Kinh - Khmer - Hoa.",
    sections: [
      {
        id: "neak-ta-va-noi-cu-tru",
        title: "01. Vị phúc thần cai quản đất đai phum sóc",
        paragraphs: [
          "Trong đời sống tâm linh của đồng bào Khmer Tây Nam Bộ, bên cạnh đức tin sâu sắc nơi ngôi chùa Phật giáo Nam tông, tín ngưỡng Néak Tà (Ông Tà) giữ một vai trò đặc biệt gần gũi trong đời sống thường nhật.",
          "Néak Tà là vị thần bảo hộ xóm làng (phum sóc), cai quản đất đai, nguồn nước, đồng ruộng và che chở cho con người khỏi ốm đau, thú dữ và tai ương. Ngôi miếu Néak Tà thường được dựng đơn sơ dưới gốc cây cổ thụ đầu làng hoặc ngã ba sông râm mát.",
        ],
      },
      {
        id: "vat-tho-va-bien-doi",
        title: "02. Hòn đá thiêng tròn nhẵn & Đạo lý hòa hợp tự nhiên",
        paragraphs: [
          "Điểm độc đáo bậc nhất của tín ngưỡng Néak Tà là vật thờ thường không phải là pho tượng tạc cầu kỳ, mà là những hòn đá cuội tròn nhẵn được tìm thấy dưới lòng sông, suối hoặc đồng ruộng. Hòn đá thiêng tượng trưng cho sự vững chãi, vĩnh cửu của đất mẹ hiền từ.",
          "Mỗi dịp đầu mùa mưa hoặc sau mùa gặt, bà con trong phum sóc lại cùng nhau tổ chức Lễ Cúng Néak Tà. Mọi người quây quần dâng cốm dẹp, trái cây, bánh tét, cùng nhau trò chuyện chia sẻ mùa màng và cầu chúc mưa thuận gió hòa.",
        ],
        quote:
          "Đất lành che chở phum sóc / Hòn đá thiêng ngàn năm ấp ủ tình làng nghĩa xóm.",
      },
      {
        id: "tim-hieu-tu-cong-dong",
        title: "03. Biểu tượng đoàn kết Kinh - Khmer - Hoa tại Nam Bộ",
        paragraphs: [
          "Trải qua quá trình cộng cư lâu đời tại vùng đồng bằng sông Cửu Long, tín ngưỡng Néak Tà đã trở thành biểu tượng giao lưu văn hóa độc đáo:",
        ],
        practicalCards: [
          {
            title: "Trân trọng sự giao lưu văn hóa đa dân tộc",
            desc: "Người Kinh và người Hoa tại miền Tây cũng thành kính gọi là 'Ông Tà', cùng nhau dâng hương viếng miếu; minh chứng cho tinh thần hòa hợp, tôn trọng lẫn nhau.",
          },
          {
            title: "Lòng biết ơn với đất đai màu mỡ",
            desc: "Nhắc nhở con người sống hòa thuận với thiên nhiên, trân trọng từng tấc đất phù sa mà thiên nhiên và tiền nhân đã ban tặng.",
          },
          {
            title: "Ứng xử văn minh khi đến phum sóc",
            desc: "Tôn trọng các hòn đá thờ và phong tục tại miếu; xin phép người dân trước khi chụp ảnh và giữ gìn sự sạch sẽ cho không gian thờ tự.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết dựa trên các công trình nghiên cứu điền dã dân tộc học của các học giả chuyên ngành văn hóa Khmer Nam Bộ.",
    sources: [
      {
        title: "Biến đổi tín ngưỡng Néak Tà của người Khmer Nam Bộ",
        author: "TS. Phan Anh Tú (Trường ĐHKHXH&NV - ĐHQG TP.HCM)",
        sourceType: "Khảo cứu học thuật",
        annotation: "Nghiên cứu Ấn Độ và Châu Á (2021); phân tích cấu trúc, biểu tượng hòn đá thiêng và chức năng xã hội của tín ngưỡng.",
      },
      {
        title: "Văn hóa Người Khmer Vùng Đồng Bằng Sông Cửu Long",
        author: "Viện Dân tộc học (Viện Hàn lâm KHXH Việt Nam)",
        sourceType: "Khảo cứu học thuật",
        annotation: "Khảo sát toàn diện về phong tục tập quán, nghi lễ vòng đời và tín ngưỡng dân gian phum sóc.",
      },
    ],
  },
  {
    id: "hau-dong-chau-van",
    audioRecordingIds: [],
    title: "Hầu đồng & Diễn xướng Chầu Văn — Đỉnh cao nghệ thuật thiêng Việt Nam",
    subtitle:
      "Bản hòa tấu tráng lệ giữa âm nhạc, vũ đạo, trang phục dân tộc và đức tin thánh thiện tôn vinh các anh hùng mở nước, chở che vận mệnh non sông.",
    region: "Bắc Bộ",
    category: "Phong tục & Nghi lễ",
    image: "/images/zen_meditation.jpg",
    caption:
      "Chiếu hầu linh thiêng trong tiếng đàn nguyệt réo rắt, nghệ thuật diễn xướng độc bản của Đạo Mẫu Việt Nam.",
    readingTime: "~6 phút",
    excerpt:
      "Nghệ thuật trình diễn nghi lễ đỉnh cao kết hợp âm nhạc Chầu Văn, vũ đạo và trang phục dân tộc tái hiện hào khí tiền nhân trong Đạo Mẫu.",
    sections: [
      {
        id: "hau-dong-va-chau-van",
        title: "01. Mối giao hòa giữa Nghi lễ Hầu Đồng & Âm nhạc Chầu Văn",
        paragraphs: [
          "Trong tín ngưỡng Thờ Mẫu Tam Phủ, Hầu Đồng (lên đồng) là nghi lễ nhập hồn thiêng của các vị thần linh vào thân xác ông đồng, bà đồng; còn Hát Chầu Văn (hát văn) là hình thức âm nhạc tâm linh độc bản dẫn dắt toàn bộ diễn trình nghi lễ ấy.",
          "Chầu Văn sử dụng thể thơ lục bát, song thất lục bát giàu vần điệu, kết hợp nhịp đàn nguyệt, phách, trống bản rộn rã. Lời ca ngợi ca công lao mở đất, đánh giặc cứu nước và phong thái uy nghi, hào sảng của các vị thần linh, đưa người tham dự vào một không gian mê đắm, thoát tục.",
        ],
      },
      {
        id: "nguoi-thuc-hanh",
        title: "02. 36 giá đồng & Bảo tàng sống của trang phục truyền thống",
        paragraphs: [
          "Mỗi giá hầu tái hiện một nhân vật lịch sử hoặc huyền thoại thiêng liêng: Giá Quan Lớn uy nghiêm trong sắc áo bào đỏ, xanh, trắng; Giá Chầu Bà thanh tao nơi núi rừng; Giá Ông Hoàng Bảy, Ông Hoàng Mười hào hoa phong nhã; Giá Cô Đôi Thượng Ngàn duyên dáng múa mồi soi sáng đường rừng.",
          "Mỗi giá đồng là một bức tranh sống động về văn hóa trang phục, vũ điệu kiếm, đao, mồi, chèo đò... của các dân tộc Kinh, Tày, Mường, Nùng, tạo nên một 'bảo tàng sống' rực rỡ của nghệ thuật cổ truyền Việt Nam.",
        ],
        quote:
          "Tay cầm mồi lửa soi đường / Đàn nguyệt réo rắt dẫn đường thánh nhân giáng trần.",
      },
      {
        id: "nghi-le-va-trinh-dien",
        title: "03. Gạn đục khơi trong — Trân quý di sản phi vật thể",
        paragraphs: [
          "Được UNESCO vinh danh, nghệ thuật Hầu Đồng và Chầu Văn đòi hỏi sự trân trọng và bảo tồn chuẩn mực từ thế hệ trẻ:",
        ],
        practicalCards: [
          {
            title: "Thưởng thức với con mắt mỹ học và văn hóa",
            desc: "Cảm nhận chiều sâu của làn điệu âm nhạc, nghệ thuật hát ca trù - chầu văn và trang phục gấm thêu truyền thống độc bản của người Việt.",
          },
          {
            title: "Phê phán các biểu hiện mê tín và phô trương tài lộc",
            desc: "Không cổ xúy các hiện tượng hầu đồng thương mại hóa, đua đòi vàng mã xa hoa hay phát lộc vô độ làm mất đi vẻ tôn nghiêm thánh thiện của nghi lễ.",
          },
          {
            title: "Trải nghiệm nghe Chầu Văn tĩnh tâm",
            desc: "Lắng nghe các bản thu Chầu Văn cổ để cảm nhận năng lượng hào sảng, lạc quan và tinh thần yêu đời của văn hóa dân gian xứ Bắc.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết khảo cứu chuyên sâu theo tài liệu đệ trình UNESCO và các công trình nghiên cứu âm nhạc dân gian của Viện Âm nhạc Quốc gia.",
    sources: [
      {
        title: "Hát Văn - Âm Nhạc Tín Ngưỡng Dân Gian Người Việt",
        author: "Viện Âm nhạc (Học viện Âm nhạc Quốc gia Việt Nam)",
        sourceType: "Khảo cứu học thuật",
        annotation: "Khảo cứu kỹ thuật đàn nguyệt, thang âm điệu thức và các làn điệu Chầu Văn cổ truyền.",
      },
      {
        title: "Lên Đồng: Hành Trình Tâm Linh và Nghệ Thuật Diễn Xướng",
        author: "GS.TS Ngô Đức Thịnh & Nguyễn Thị Hiền",
        sourceType: "Khảo cứu học thuật",
        annotation: "Phân tích cấu trúc 36 giá hầu, biểu tượng trang phục và tâm thức văn hóa cộng đồng.",
      },
    ],
  },
  {
    id: "hoa-dang-ninh-kieu",
    title: "Đêm Hoa đăng Ninh Kiều & Khúc vọng phù sa đất Tây Đô",
    subtitle:
      "Ánh sáng lung linh trên dòng sông Hậu, gửi gắm ước nguyện bình an, thịnh vượng và tôn vinh nét đẹp văn minh miệt vườn trù phú của đồng bằng sông Cửu Long.",
    region: "Nam Bộ",
    category: "Sinh hoạt văn hóa",
    image: "/images/mekong_nam_bo.jpg",
    caption:
      "Bến Ninh Kiều huyền ảo trong đêm hội hoa đăng, hàng ngàn ngọn nến soi bóng xuống dòng sông Hậu hiền hòa.",
    readingTime: "~5 phút",
    excerpt:
      "Ánh sáng lung linh trên dòng sông Hậu chở nặng phù sa, gửi gắm ước nguyện bình an và tri ân dòng nước mẹ hiền hòa của đất phương Nam.",
    sections: [
      {
        id: "hoa-dang-trong-ngay-hoi",
        title: "01. Bến Ninh Kiều lung linh dòng ánh sáng ước nguyện",
        paragraphs: [
          "Bến Ninh Kiều (thành phố Cần Thơ) tọa lạc ngay ngã ba sông Hậu và sông Cần Thơ, từ lâu đã là biểu tượng thơ mộng của miền Tây Đô trù phú: 'Cần Thơ gạo trắng nước trong / Ai đi đến đó lòng không muốn về'.",
          "Mỗi dịp ngày hội hoa đăng, dòng sông Hậu bừng sáng huyền ảo với hàng ngàn đóa hoa đăng trôi lững lờ theo dòng nước. Ánh nến lung linh soi bóng dòng sông chở nặng phù sa, tạo nên một không gian văn hóa lễ hội đậm chất trữ tình sông nước miệt vườn.",
        ],
      },
      {
        id: "mo-hinh-hoa-dang",
        title: "02. Triết lý tri ân dòng nước mẹ của người phương Nam",
        paragraphs: [
          "Đối với cư dân đồng bằng sông Cửu Long, dòng sông không chỉ là tuyến giao thương huyết mạch mà là 'Mẹ thiên nhiên' hào phóng bồi đắp phù sa, tôm cá đầy ghe và tưới mát những vườn cây trái xum xuê trĩu quả.",
          "Thả hoa đăng xuống bến sông là nghi thức gửi gắm lòng tri ân sâu nặng với dòng nước mẹ hiền hòa, đồng thời gửi lời nguyện cầu cho mùa màng bội thu, mưa thuận gió hòa, quốc thái dân an và gia đình sum vầy hạnh phúc.",
        ],
        quote:
          "Sông Hậu êm đềm xuôi sóng nước / Hoa đăng soi sáng vạn niềm tin yêu.",
      },
      {
        id: "tim-hieu-hoa-dang",
        title: "03. Thực hành thả hoa đăng văn minh & Bảo vệ môi trường",
        paragraphs: [
          "Đón nhận nét đẹp văn hóa hoa đăng hôm nay, người trẻ cần chung tay gìn giữ sự trong lành của dòng sông quê hương:",
        ],
        practicalCards: [
          {
            title: "Ưu tiên hoa đăng từ vật liệu sinh học tự phân hủy",
            desc: "Lựa chọn hoa đăng làm từ lá cây, bột giấy hữu cơ hoặc bánh mì tự tan; kiên quyết nói không với hoa đăng làm bằng xốp nhựa hoặc kim loại gây ô nhiễm nguồn nước.",
          },
          {
            title: "Gửi gắm ước nguyện hướng thiện chân thành",
            desc: "Khi thả đèn trôi sông, hướng tâm về sự bình an cho gia đạo và tha nhân, giữ tâm tĩnh lặng thay vì ồn ào xô bồ.",
          },
          {
            title: "Kết nối Không gian 3D Sông nước Nam Bộ",
            desc: "Thực hành thả hoa đăng ảo trong [Không gian 3D Sông nước Nam Bộ] của ứng dụng — một cách trải nghiệm hiện đại, giàu cảm xúc mà bảo vệ trọn vẹn môi trường.",
          },
        ],
      },
    ],
    editorialNote:
      "Bài viết khảo cứu dựa trên các tư liệu lễ hội sông nước miền Tây và đề án du lịch văn hóa bền vững thành phố Cần Thơ.",
    sources: [
      {
        title: "Văn Hóa Sông Nước Miền Tây Nam Bộ",
        author: "Nhà văn Sơn Nam",
        sourceType: "Tác phẩm kinh điển",
        annotation: "Tác phẩm kinh điển phân tích tập quán bến sông, thuyền bè và tâm thức tri ân nguồn nước của lưu dân phương Nam.",
      },
      {
        title: "Tài liệu Lễ hội Hoa đăng Ninh Kiều và Du lịch sinh thái Cần Thơ",
        author: "Sở Văn hóa, Thể thao và Du lịch Cần Thơ",
        sourceType: "Thông tin cơ quan / đơn vị",
        annotation: "Khảo cứu lịch sử hình thành không gian văn hóa bến Ninh Kiều và các kỳ ngày hội hoa đăng du lịch.",
      },
    ],
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
