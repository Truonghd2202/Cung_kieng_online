export type RegionKey = "Bắc Bộ" | "Trung Bộ" | "Nam Bộ";

export type CultureCategoryKey =
  | "Không gian tín ngưỡng"
  | "Điển tích xưa"
  | "Lễ hội truyền thống"
  | "Phong tục & Nghi lễ";

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
      "Nội dung minh họa, đang kiểm chứng tư liệu trước khi công bố. Các nội dung truyền tải mang tính định hướng tiếp cận văn hóa và khơi mở chiêm nghiệm tinh thần, không đại diện cho các khảo cứu lịch sử hay học thuật độc lập.",
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
      "Nội dung biên soạn minh họa từ kho tàng truyện cổ dân gian Việt Nam. Chờ kiểm chứng tư liệu học thuật trước khi xuất bản bản in.",
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
        title: "02. Khói trầm Nghĩa Lĩnh & Nếp sống tri ân",
        paragraphs: [
          "Mỗi độ tháng Ba âm lịch, hàng triệu bước chân hành hương về đỉnh núi Nghĩa Lĩnh thiêng liêng. Nén hương dâng lên trước đền Hạ, đền Trung, đền Thượng là lời hứa giữ gìn non sông gấm vóc mà tiền nhân đã dày công khai phá.",
        ],
        quote:
          "\"Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng Ba\" - Lời ca dao mộc mạc như tiếng gọi nguồn cội khắc sâu trong tâm khảm mỗi người Việt.",
      },
    ],
    editorialNote:
      "Nội dung minh họa mang tính giáo dục lòng yêu nước và ý thức di sản, đang chờ rà soát niên đại lịch sử từ Viện Nghiên cứu Văn hóa.",
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
      "Tư liệu biên soạn dựa trên các khảo cứu văn hóa dân gian Thừa Thiên Huế. Đang tiếp tục kiểm chứng cùng các nhà nghiên cứu địa phương.",
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
      "Nội dung minh họa thực hành di sản văn hóa phi vật thể quốc gia miền Trung. Đang đối chiếu tài liệu điền dã vạn chài.",
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
      "Nội dung biên soạn minh họa từ kho tàng văn hóa dân gian Nam Bộ. Chờ kiểm chứng tư liệu học thuật trước khi xuất bản bản in.",
  },
];

export const getCultureArticleById = (id: string): CultureArticle => {
  const found = CULTURE_ARTICLES.find((a) => a.id === id);
  return found || CULTURE_ARTICLES[0];
};

export const getRelatedArticles = (currentId: string, limit = 3): CultureArticle[] => {
  return CULTURE_ARTICLES.filter((a) => a.id !== currentId).slice(0, limit);
};
