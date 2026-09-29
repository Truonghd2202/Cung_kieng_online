export type RitualOccasionKey =
  | "all"
  | "Rằm"
  | "Mùng một"
  | "Tết Nguyên Đán"
  | "Dịp gia đình";

export type RitualRegionKey =
  | "all"
  | "Bắc Bộ"
  | "Trung Bộ"
  | "Nam Bộ"
  | "Thích ứng đa vùng";

export interface RitualChecklistItem {
  id: string;
  label: string;
  completed?: boolean;
}

export interface RitualOfferingItem {
  id: string;
  name: string;
  subname?: string;
  desc: string;
  isCustomizable?: boolean;
}

export interface RitualStep {
  stepNumber: string;
  title: string;
  desc: string;
}

export interface RitualRegionalDetail {
  region: string;
  desc: string;
}

export interface RitualDetailContent {
  fullTitle: string;
  subtitle: string;
  heroImage: string;
  heroCaption: string;
  heroArtCredit: string;
  meaningTitle: string;
  meaningParagraphs: string[];
  meaningQuote: string;
  checklists: RitualChecklistItem[];
  safetyTip: string;
  offeringAdvice: string;
  offerings: RitualOfferingItem[];
  steps: RitualStep[];
  regionalDetails: RitualRegionalDetail[];
  fireSafetyRules: string[];
  closingQuote: string;
}

export interface RitualGuideItem {
  id: string;
  title: string;
  badge?: string;
  badgeType?: "featured" | "occasion" | "family";
  subBadgeOccasion?: string;
  tagOnImage: string;
  stepsCount: string;
  timeEstimate: string;
  desc: string;
  image: string;
  tagPill: string;
  actionText: string;
  occasion: RitualOccasionKey;
  region: RitualRegionKey;
  detail?: RitualDetailContent;
}

export const RITUAL_GUIDES: RitualGuideItem[] = [
  {
    id: "chuan-bi-ngay-ram",
    title: "Chuẩn bị ngày rằm tại nhà",
    badge: "Tiêu điểm",
    badgeType: "featured",
    subBadgeOccasion: "Ngày Rằm (15 Âm lịch)",
    tagOnImage: "Đa vùng thích ứng",
    stepsCount: "4 bước chuẩn bị",
    timeEstimate: "15 - 20 phút",
    desc: "Cách bày biện chén nước thanh tịnh, nén hương mộc và đĩa quả tươi theo nếp sống tinh gọn nơi căn hộ hoặc nhà phố.",
    image: "/images/ritual_ram.jpg",
    tagPill: "TÂM THÀNH THANH TỊNH",
    actionText: "Xem hướng dẫn",
    occasion: "Rằm",
    region: "Thích ứng đa vùng",
    detail: {
      fullTitle: "Chuẩn bị ngày rằm tại nhà: Tinh giản, trang trọng và lắng đọng tâm tư",
      subtitle:
        "Lấy tâm niệm vững chãi, bình tâm làm gốc. Hướng dẫn này giúp bạn chuẩn bị ngày rằm định kỳ, kiêng khem nghi thức phức tạp, chu toàn tình thảo nơi căn hộ tân thời hay nhà phố nhỏ mà không áp lực gánh nặng nghi lễ cồng kềnh.",
      heroImage: "/images/ritual_ram.jpg",
      heroCaption:
        "Góc thờ tự ngày Rằm: Dĩa hoa quả tươi trang thanh khiết, chung nước lọc thanh tịnh và nén hương thơm mộc.",
      heroArtCredit: "Tranh: Hồn Việt Xưa - Tinh tuyển nguồn dân gian",
      meaningTitle: "Ý nghĩa của việc dành thời gian tưởng nhớ và giữ nếp nhà",
      meaningParagraphs: [
        "Trong nếp sinh hoạt truyền thống của người Việt, ngày sóc vọng (mùng một và ngày rằm) định kỳ mỗi tháng là khoảng lặng quý giá để người trong gia đình cùng nhìn lại mình, lắng đọng sau những bộn bề công việc và thể hiện lòng tri ân sâu xa tới cội nguồn, tổ tiên.",
        "Đối với người trẻ, sinh sống nơi đô thị hoặc trong các căn hộ chung cư hiện đại, nghi thức không đòi hỏi mâm cao cỗ đầy hay những thủ tục rườm rà cầu kỳ. Điều cốt tủy nằm ở sự thanh tịnh, sạch sẽ và cái tâm tĩnh lặng. Đó là dịp để làm mới không gian sống, mở toang khung cửa đón gió lành và dành vài phút đứng trước hương án chiêm nghiệm lại chính mình.",
      ],
      meaningQuote:
        "“Nén bánh lên trang, lễ vật tùy nghi. Đốt đuốc trong coi lại dạ người, nếp ấm gia đình làm nơi chặc phục.”",
      checklists: [
        { id: "c1", label: "Dọn sạch bụi mờ trên mặt bàn thờ" },
        { id: "c2", label: "Thay ly nước sạch (nước tinh khiết mát lành)" },
        { id: "c3", label: "Đĩa quả hoặc cành hoa tươi theo mùa (Tùy nghi)" },
        { id: "c4", label: "1 hoặc 3 nén hương trầm mộc tự nhiên" },
        { id: "c5", label: "Dành 3 - 5 phút tĩnh tâm & hướng tâm an lành" },
      ],
      safetyTip:
        "Gợi ý dùng trầm nụ kèm đĩa kim loại/gốm sứ sâu lòng hoặc chỉ thắp 1 nén hương ngắn để không làm chuông báo khói kêu tại chung cư.",
      offeringAdvice:
        "Lời khuyên: “Thực vật theo thời, bày biện tuỳ tâm, quý sạch không quý sang”. Người trẻ không bắt buộc phải đầy đủ mâm cao cỗ đầy nếu không đủ thời gian; sự chỉn chu và tâm niệm hướng thiện là điều quý giá nhất.",
      offerings: [
        {
          id: "o1",
          name: "Chén nước lọc thanh tịnh",
          subname: "(hoặc ấm trà ngụ ý nhã hương đặc)",
          desc: "Tượng trưng cho tâm sáng trong suốt, không vướng bụi trần. Thay nước vào buổi sáng sớm bằng nước sạch tinh khiết.",
        },
        {
          id: "o2",
          name: "Đĩa quả nhỏ sạch theo mùa",
          subname: "(trái cây tươi quê nhà)",
          desc: "Khoảng một vài trái chín mọng theo mùa (chuối chín, táo, ổi, quýt, bưởi...); sạch sẽ và còn nguyên cuống tươi.",
        },
        {
          id: "o3",
          name: "Bình hoa mộc mạc thơm dịu",
          subname: "(sen, cúc, huệ, nhài)",
          desc: "Loài hoa quen thuộc mộc mạc như hoa cúc vàng, hoa sen, hoa huệ tây, hoa nhài... Tránh dùng hoa giả hay hoa quá sặc sỡ mùi nồng gắt.",
        },
        {
          id: "o4",
          name: "Nén hương thơm tự nhiên",
          subname: "(Hương trầm sạch / Hương tăm mộc)",
          desc: "Khuyên dùng hương thảo mộc tự nhiên không tẩm hóa chất tạo cuốn tàn; chỉ thắp 1 nén để thanh tịnh và bảo vệ hệ hô hấp cho cả nhà.",
        },
        {
          id: "o5",
          name: "Đèn dầu chuyên dụng sạch sẽ",
          subname: "(Đèn gốm sứ / Đèn dầu thực vật)",
          desc: "Nếu dùng nến thơm hoặc đèn dầu, để nơi vững chãi, cách xa vật liệu dễ cháy; nên thổi tắt khi không có người ở nhà.",
        },
      ],
      steps: [
        {
          stepNumber: "01",
          title: "Chuẩn bị không gian & Thân tâm an định",
          desc: "Mở rộng then cửa sổ hoặc kéo rèm để đón gió tươi buổi sớm và ánh sáng tự nhiên vào căn nhà. Rửa sạch đôi tay bằng nước ấm, chỉnh trang y phục gọn gàng, sạch sẽ và trang nhã. Tạm thời tắt thông báo điện thoại từ 15-20 phút, giữ cho một bầu không khí mang lại cảm giác bình thản mộc mạc trước khi bước vào sửa soạn.",
        },
        {
          stepNumber: "02",
          title: "Sắp xếp vật phẩm trang trọng, tinh tươm",
          desc: "Dùng khăn sạch lau nhẹ bụi mờ trên bàn thờ/kệ thờ. Thay nước mới vào chén lưu ly, sắp đĩa hoa quả ngay ngắn chính giữa; bình hoa đặt gọn phía tay trái (tả hữu tương hợp) nếu có không gian. Mọi thao tác chậm rãi, trân trọng như đang nâng niu bình an của chính mình.",
        },
        {
          stepNumber: "03",
          title: "Dành thời gian tưởng niệm tĩnh lặng",
          desc: "Thắp một nén hương (hoặc nụ trầm) cắm thẳng thắn vào bát hương; hướng ánh nhìn trang nghiêm, mắt mở hé nhìn vào ngọn trầm cháy. Giữ tư thế ngay ngắn, hai bàn tay chắp nhẹ trước ngực, thả lỏng trán và vai; dành từ 3 đến 5 phút hướng tâm niệm thiện lành tới ông bà tổ tiên hoặc vạn vật tốt đẹp quanh mình. Không cầu xin tiền tài hay phép màu, chỉ xin được lòng an tịnh và sự thấu suốt trước sóng gió cuộc đời.",
        },
        {
          stepNumber: "04",
          title: "Thu dọn an toàn & Thưởng thức lộc lành",
          desc: "Kiểm tra kỹ nén hương đã tàn hoàn toàn hay đặt nắp đĩa sứ an toàn trước khi rời khỏi khu vực thờ. Nước sạch và hoa quả sau đó có thể chia sẻ cùng người thân trong gia đình như một thức lộc lành khởi sắc cho một ngày an vui, trọn vẹn lòng biết ơn và sự kết nối.",
        },
      ],
      regionalDetails: [
        {
          region: "Bắc Bộ",
          desc: "Chú trọng nếp trang nghiêm, chén nước chè tươi thơm ngát hoặc nước trong, đĩa trầu cau têm cánh phượng và nụ hoa ngâu/hoa cúc vàng tươi thắm.",
        },
        {
          region: "Trung Bộ",
          desc: "Chắt chiu dung dị, thường chuộng nén trầm xứ Quảng thơm đượm, mâm ngũ quả thanh đạm theo mùa, nếp cúng hiếu đễ thâm trầm hướng cội nguồn sâu lắng.",
        },
        {
          region: "Nam Bộ",
          desc: "Phóng khoáng, tự nhiên; nải chuối sứ vàng ươm, trái mãng cầu, dừa tươi, đu đủ và xoài (ngụ ý “cầu vừa đủ xài”); chuộng nhang thơm nhẹ nhàng lan tỏa.",
        },
      ],
      fireSafetyRules: [
        "Chỉ thắp một nén hương mộc ngắn hoặc nụ trầm trên đĩa gốm; không cắm que hương cháy dở vào chân tường hay gần rèm cửa.",
        "Tuyệt đối không dùng nến thơm có bấc quá dài cạnh đồ gỗ; đặt nến trong cốc thủy tinh hoặc đĩa gốm sứ cách nhiệt vững chãi.",
        "Trước khi đi làm hoặc đi ngủ, luôn kiểm tra tắt tàn hương/nến. Không thắp hương quá muộn sau 21h nếu không có người canh chừng.",
      ],
      closingQuote:
        "“Hương trầm một nén kết nối tâm tình muôn thuở, lòng an một khắc mở lối vạn sự hanh thông.”",
    },
  },
  {
    id: "mung-mot-thanh-tinh",
    title: "Nghi thức mùng một thanh tịnh",
    badge: "Mùng Một (Đầu tháng)",
    badgeType: "occasion",
    tagOnImage: "Bắc Bộ & Trung Bộ",
    stepsCount: "4 bước giản dị",
    timeEstimate: "10 - 15 phút",
    desc: "Khởi đầu tháng mới với tâm thế an hòa, dọn gọn không gian thờ tự và thắp nén trầm an trú.",
    image: "/images/tea_bowl.jpg",
    tagPill: "TỰ TẠI THÂN TÂM",
    actionText: "Xem hướng dẫn",
    occasion: "Mùng một",
    region: "Bắc Bộ",
    detail: {
      fullTitle: "Nghi thức mùng một đầu tháng: Khởi tâm an định & Đón sinh khí mới",
      subtitle:
        "Mùng một sớm mai mang ý nghĩa khởi đầu. Bằng những việc làm nhỏ giản dị: dọn dẹp hương án, dâng chén nước tinh khiết và nén trầm thơm, hướng tâm tới sự thuận hòa, tươi mới cho cả tháng.",
      heroImage: "/images/tea_bowl.jpg",
      heroCaption: "Tĩnh lặng sớm mùng một: Chén trà thơm ấm và nén trầm thanh khiết.",
      heroArtCredit: "Tranh: Trà Đạo & Không Gian Thiền Tự Việt",
      meaningTitle: "Ý nghĩa của ngày sóc (mùng một) trong nếp sống",
      meaningParagraphs: [
        "Ngày mùng một âm lịch (ngày Sóc) đánh dấu chu kỳ tuần hoàn mới của vầng trăng và vạn vật. Trong truyền thống người Việt, đây là thời khắc chuyển hóa năng lượng, là dịp để mỗi người dọn sạch những muộn phiền tháng cũ và mở lòng đón nhận những điều lành tháng mới.",
        "Nghi thức mùng một không nhằm cầu xin tài lộc tức thời, mà là một khoảng lặng thiêng liêng để ta nhắc nhở chính mình sống chánh niệm, nói lời hòa ái và nuôi dưỡng tâm từ bi trong từng hành động hàng ngày.",
      ],
      meaningQuote: "“Khởi đầu ngày mới bằng tâm sáng, cả tháng trôi qua trong an định và thuận hòa.”",
      checklists: [
        { id: "mm-1", label: "Quét dọn gian phòng và bàn thờ sạch sẽ, trang nghiêm" },
        { id: "mm-2", label: "Rửa sạch chén thờ, thay nước trong hoặc pha ấm trà ấm mới" },
        { id: "mm-3", label: "Dâng đĩa hoa tươi (hoa cúc, hoa huệ hoặc hoa sen)" },
        { id: "mm-4", label: "Thắp 1 nén hương mộc tự nhiên hoặc nụ trầm trên đĩa gốm" },
        { id: "mm-5", label: "Dành 3 phút tĩnh tâm, gửi lời chúc an lành tới gia đình và muôn người" },
      ],
      safetyTip: "Nên thắp hương vào buổi sáng sớm khi nhà cửa thông thoáng; chỉ thắp 1 nén để không gian trong lành.",
      offeringAdvice: "Ưu tiên lễ vật thanh đạm: chén nước suối trong, đĩa quả mùa tươi ngon, ấm trà mộc.",
      offerings: [
        {
          id: "mm-off-1",
          name: "Chén nước trong thanh tịnh",
          subname: "Thủy tinh khiết",
          desc: "Tượng trưng cho tâm sáng không vướng bụi trần, soi tỏ lòng thành và sự an định.",
        },
        {
          id: "mm-off-2",
          name: "Đĩa hoa tươi thơm ngát",
          subname: "Hoa cúc / Hoa sen / Hoa ngâu",
          desc: "Hương hoa tự nhiên biểu hiện của lòng tôn kính và sự tươi mới của sự sống.",
        },
        {
          id: "mm-off-3",
          name: "Nén hương mộc hoặc nụ trầm",
          subname: "Trầm hương tự nhiên",
          desc: "Khói thơm lan tỏa kết nối tâm thức hiện tại với nguồn cội bình yên.",
        },
      ],
      steps: [
        {
          stepNumber: "01",
          title: "Đón nắng sớm & Tĩnh lặng thân tâm",
          desc: "Mở cửa đón gió sớm, rửa sạch đôi bàn tay và gương mặt. Giữ cho tâm trạng nhẹ nhõm, không vội vã.",
        },
        {
          stepNumber: "02",
          title: "Sắp đặt hoa nước trang nghiêm",
          desc: "Lau nhẹ bàn thờ, dâng chén nước sạch và đĩa hoa quả thơm tho ngay ngắn trước ban thờ.",
        },
        {
          stepNumber: "03",
          title: "Thắp nén tâm hương đầu tháng",
          desc: "Thắp một nén hương mộc, chắp tay ngay ngắn, hướng tâm niệm thiện lành và bao dung cho cả tháng mới.",
        },
        {
          stepNumber: "04",
          title: "Khởi đầu ngày mới trong an hòa",
          desc: "Uống một ngụm trà ấm trong chánh niệm, mỉm cười với người thân và bắt đầu công việc với niềm vui.",
        },
      ],
      regionalDetails: [
        {
          region: "Bắc Bộ",
          desc: "Thường dâng ấm trà sen hoặc trà lài thơm ngát, đĩa trầu cau têm cánh phượng và nụ cúc vàng tinh khôi.",
        },
        {
          region: "Trung Bộ",
          desc: "Đốt nén trầm xứ Quảng đượm hương, dâng hoa cúc vàng hoặc hoa sen Huế trang nhã và thâm trầm.",
        },
        {
          region: "Nam Bộ",
          desc: "Đĩa hoa huệ trắng thơm lừng, trái dừa tươi mát lành và nén nhang nhẹ nhàng lan tỏa sinh khí.",
        },
      ],
      fireSafetyRules: [
        "Chỉ thắp 1 nén hương mộc ngắn hoặc nụ trầm trên đĩa gốm cách nhiệt an toàn.",
        "Không thắp hương sát rèm cửa, giấy thờ hay các vật liệu dễ bắt lửa.",
        "Đảm bảo tàn nhang đã nguội hoàn toàn trước khi rời khỏi nhà đi làm.",
      ],
      closingQuote: "“Sáng mùng một tâm an, vạn nẻo đường đời đều thênh thang rạng rỡ.”",
    },
  },
  {
    id: "tuong-nho-gia-dinh",
    title: "Không gian tưởng nhớ gia đình",
    badge: "Dịp gia đình • Tưởng nhớ",
    badgeType: "family",
    tagOnImage: "Truyền thống chung",
    stepsCount: "4 bước ý niệm",
    timeEstimate: "30 phút",
    desc: "Gợi ý sắp đặt góc kỷ niệm tổ tiên ấm cúng, chuẩn bị mâm cơm gia đình sum vầy mà không áp lực lễ nghi rườm rà.",
    image: "/images/ancestor_portrait.jpg",
    tagPill: "GẮN KẾT CỘI NGUỒN",
    actionText: "Xem hướng dẫn",
    occasion: "Dịp gia đình",
    region: "Thích ứng đa vùng",
    detail: {
      fullTitle: "Không gian tưởng nhớ gia đình: Gắn kết cội nguồn & Nuôi dưỡng ân tình",
      subtitle:
        "Bàn thờ gia tiên là trái tim của ngôi nhà Việt. Bằng sự chu toàn mộc mạc, hướng dẫn này gợi ý cách chăm chút góc kỷ niệm tổ tiên ấm áp, nơi con cháu cùng hướng về công đức cội nguồn.",
      heroImage: "/images/ancestor_portrait.jpg",
      heroCaption: "Góc thờ gia tiên ấm cúng: Nơi lưu giữ ký ức và tình thương của bao thế hệ.",
      heroArtCredit: "Tư liệu: Mỹ học đời sống gia đình Việt",
      meaningTitle: "Uống nước nhớ nguồn — Gốc rễ của đạo làm người",
      meaningParagraphs: [
        "Tập tục thờ phụng tổ tiên của người Việt không phải là sự kính sợ thần linh trừu tượng, mà là sự tiếp nối tình cảm hiếu đễ đối với những người đã sinh thành và dưỡng dục mình. Ngay cả trong nhịp sống chung cư bận rộn, một góc tưởng niệm nhỏ xinh cũng đủ làm ấm lòng người đi xa trở về.",
        "Mỗi dịp giỗ chạp hay kỷ niệm, việc sum vầy bên mâm cơm gia đình chính là sợi dây vô hình kết nối các thế hệ, nhắc nhở con cháu về nếp nhà và cội nguồn yêu thương.",
      ],
      meaningQuote: "“Cây có gốc mới nở cành xanh ngọn, nước có nguồn mới biển rộng sông sâu.”",
      checklists: [
        { id: "tn-1", label: "Dùng khăn mềm sạch lau bụi quanh khung ảnh và kỷ vật gia tiên" },
        { id: "tn-2", label: "Chuẩn bị mâm cơm gia đình ấm cúng với những món người xưa yêu thích" },
        { id: "tn-3", label: "Dâng đĩa hoa tươi thanh nhã và chén nước trong" },
        { id: "tn-4", label: "Thắp nén hương tưởng nhớ, mời gia tiên về chứng tri lòng thảo" },
        { id: "tn-5", label: "Cả nhà cùng quây quần dùng bữa, chia sẻ kỷ niệm và bài học của người đi trước" },
      ],
      safetyTip: "Nếu bàn thờ đặt trên kệ treo tường chung cư, chú ý khoảng cách trần để khói hương không làm ố trần nhà.",
      offeringAdvice: "Mâm cơm cúng gia đình chuộng sự ấm cúng, món ăn nấu nướng vừa đủ, tránh lãng phí thực phẩm.",
      offerings: [
        {
          id: "tn-off-1",
          name: "Mâm cơm gia đình sum vầy",
          subname: "Các món ăn nếp nhà",
          desc: "Những món ăn thân thuộc gợi nhớ hương vị bàn tay mẹ nấu ngày xưa, chan chứa tình thảo.",
        },
        {
          id: "tn-off-2",
          name: "Trái cây theo mùa",
          subname: "Hoa thơm quả ngọt",
          desc: "Lòng thành dâng những thức quả tươi sạch theo mùa tỏ lòng biết ơn trời đất và tiền nhân.",
        },
      ],
      steps: [
        {
          stepNumber: "01",
          title: "Chăm chút góc tưởng niệm",
          desc: "Lau dọn khung ảnh, bát hương gọn gàng; bày biện hoa tươi và chén nước trong tĩnh tươm.",
        },
        {
          stepNumber: "02",
          title: "Chuẩn bị mâm cơm thảo thơm",
          desc: "Nấu mâm cơm ấm cúng với sự chung tay của các thành viên trong gia đình.",
        },
        {
          stepNumber: "03",
          title: "Phút giây tưởng niệm tĩnh lặng",
          desc: "Thắp nén hương thơm, dành vài phút lặng im nhớ về công lao, lời dạy và nụ cười của tiền nhân.",
        },
        {
          stepNumber: "04",
          title: "Bữa cơm gắn kết yêu thương",
          desc: "Cùng người thân quây quần thưởng thức bữa cơm, kể cho con trẻ nghe chuyện cội nguồn xưa.",
        },
      ],
      regionalDetails: [
        { region: "Bắc Bộ", desc: "Mâm cơm truyền thống với đĩa gà luộc, đĩa xôi gấc đỏ tươi, canh măng miến ấm nồng." },
        { region: "Trung Bộ", desc: "Đậm đà tình thảo với đĩa thịt luộc tôm chua, canh cá đồng và bánh tét đậm vị quê hương." },
        { region: "Nam Bộ", desc: "Thảo thơm hào sảng với nồi thịt kho hột vịt, tô canh khổ qua nhồi thịt và dĩa dưa giá giòn ngọt." },
      ],
      fireSafetyRules: [
        "Sử dụng tấm chống ám khói hoặc gắn kính cách nhiệt phía trên trần bàn thờ.",
        "Tắt hết nến và kiểm tra hương tàn trước khi rời khỏi khu vực ăn uống.",
      ],
      closingQuote: "“Nhớ ơn tổ tiên xây nền đắp móng, con cháu muôn đời giữ trọn hiếu ân.”",
    },
  },
  {
    id: "phong-tuc-dau-nam",
    title: "Tìm hiểu phong tục đầu năm",
    badge: "Tết Nguyên Đán",
    badgeType: "occasion",
    tagOnImage: "Bắc - Trung - Nam",
    stepsCount: "4 giai đoạn",
    timeEstimate: "Mùa lễ hội",
    desc: "Giải mã ý nghĩa tục tiễn ông Táo, dọn nhà đón Tết và nghi thức giao thừa hướng tới ước nguyện an khang, hòa thuận.",
    image: "/images/hero_family.jpg",
    tagPill: "KHỞI SẮC TÂN NIÊN",
    actionText: "Xem hướng dẫn",
    occasion: "Tết Nguyên Đán",
    region: "Thích ứng đa vùng",
    detail: {
      fullTitle: "Phong tục Tết Nguyên Đán: Tiễn Táo Quân, Đón Giao Thừa & Khởi Sắc Tân Niên",
      subtitle:
        "Tết Nguyên Đán là điểm chạm linh thiêng nhất trong dòng chảy văn hóa Việt. Từ ngày 23 tháng Chạp đến đêm trừ tịch, mỗi nếp tục đều hướng tới sự đoàn viên, xóa bỏ hiềm khích và đón chào vận hội mới.",
      heroImage: "/images/hero_family.jpg",
      heroCaption: "Sum vầy ngày Tết: Nồi bánh chưng xanh, cành đào thắm và nụ cười rạng rỡ của cả gia đình.",
      heroArtCredit: "Tranh: Nếp Tết Xưa & Nay - Bộ sưu tập Tinh hoa Văn hóa",
      meaningTitle: "Tết là sự trở về và khởi sinh của tình thân",
      meaningParagraphs: [
        "Tết không chỉ là thời điểm chuyển giao giữa năm cũ và năm mới, mà là dịp tống cựu nghinh tân: dọn sạch những bụi bặm âu lo của năm cũ để mở lòng đón nhận vạn sự hanh thông. Từ mâm cơm cúng Táo quân giản dị đến mâm ngũ quả ngày Tết, tất cả đều gửi gắm ước nguyện về một mái ấm no đủ, thuận hòa.",
        "Trong không gian đô thị ngày nay, việc giữ gìn nghi thức Tết tinh gọn, không rườm rà giúp gia đình có thêm thời gian thực sự thảnh thơi trò chuyện, gắn kết bên nhau.",
      ],
      meaningQuote: "“Tết ấm không tại mâm cao cỗ đầy, mà tại lòng người hướng về nhau trong hòa ái.”",
      checklists: [
        { id: "tet-1", label: "Dọn dẹp trang hoàng nhà cửa, quét dọn bàn thờ đón Tết" },
        { id: "tet-2", label: "Chuẩn bị mâm lễ tiễn ông Táo chầu trời (23 tháng Chạp)" },
        { id: "tet-3", label: "Bày biện mâm ngũ quả và cành hoa đào / hoa mai tươi thắm" },
        { id: "tet-4", label: "Nghi thức cúng Tất niên chiều 30 Tết và cúng Giao Thừa lúc nửa đêm" },
        { id: "tet-5", label: "Mừng tuổi ông bà cha mẹ, chúc nhau một năm mới an khang thịnh vượng" },
      ],
      safetyTip: "Đêm Giao Thừa không đốt vàng mã nhiều; chỉ thắp 1 nén hương thơm để bảo vệ không khí trong lành.",
      offeringAdvice: "Mâm ngũ quả lựa chọn quả tươi ngon, màu sắc hài hòa theo ngũ hành (Kim - Mộc - Thủy - Hỏa - Thổ).",
      offerings: [
        {
          id: "tet-off-1",
          name: "Mâm ngũ quả ngày Tết",
          subname: "Ngũ phúc lâm môn",
          desc: "Đại diện cho năm ước nguyện lớn: Phú, Quý, Thọ, Khang, Ninh.",
        },
        {
          id: "tet-off-2",
          name: "Bánh chưng / Bánh tét",
          subname: "Hồn cốt ẩm thực Tết",
          desc: "Tượng trưng cho Đất - Trời và sự đùm bọc yêu thương của gia đình người Việt.",
        },
      ],
      steps: [
        {
          stepNumber: "01",
          title: "Tống cựu nghinh tân (Dọn nhà đón Tết)",
          desc: "Cả nhà cùng nhau lau dọn, sửa sang nhà cửa và sắp đặt lại không gian sống tươi tắn.",
        },
        {
          stepNumber: "02",
          title: "Bày biện mâm ngũ quả & hoa xuân",
          desc: "Đặt mâm ngũ quả chính giữa bàn thờ, bình hoa tươi bên tả, tạo sinh khí rực rỡ đón xuân.",
        },
        {
          stepNumber: "03",
          title: "Khoảnh khắc Giao Thừa thiêng liêng",
          desc: "Đúng thời khắc chuyển giao, thắp nén hương thơm, hướng tâm niệm bình an cho quê hương, gia đình.",
        },
        {
          stepNumber: "04",
          title: "Khởi sắc đầu xuân",
          desc: "Mở rộng cửa đón gió xuân, trao nhau những lời chúc mừng đầu năm ấm áp chân thành.",
        },
      ],
      regionalDetails: [
        { region: "Bắc Bộ", desc: "Cành đào phai/đào bích thắm, mâm ngũ quả chuối xanh bưởi vàng, nồi bánh chưng vuông vức." },
        { region: "Trung Bộ", desc: "Bánh tét truyền thống, dưa món đậm đà, cành mai vàng rực rỡ và nếp chúc tụng hiếu đễ sâu sắc." },
        { region: "Nam Bộ", desc: "Mâm ngũ quả 'Cầu - Dừa - Đủ - Xoài', cành mai vàng óng ả, nồi thịt kho trứng ấm tình phương Nam." },
      ],
      fireSafetyRules: [
        "Tuyệt đối không đốt vàng mã tại hành lang, ban công hay gần lối thoát hiểm chung cư.",
        "Cắm hương chắc chắn vào bát hương, tránh để chân hương quá dày gây bốc hỏa.",
      ],
      closingQuote: "“Đón xuân mới trong lòng an tịnh, vạn sự cát tường tự khắc đến bên.”",
    },
  },
  {
    id: "cung-gio-mien-nam",
    title: "Tập tục cúng giỗ truyền thống miền Nam",
    badge: "Dịp gia đình",
    badgeType: "family",
    tagOnImage: "Nam Bộ đặc trưng",
    stepsCount: "4 bước nếp nhà",
    timeEstimate: "Nửa ngày",
    desc: "Nét thảo thơm phóng khoáng của mâm cơm giỗ phương Nam: canh khổ qua, thịt kho rệu và tấm lòng thảo hiếu đãi đằng chòm xóm.",
    image: "/images/mekong_nam_bo.jpg",
    tagPill: "TÌNH LÀNG NGHĨA XÓM",
    actionText: "Xem hướng dẫn",
    occasion: "Dịp gia đình",
    region: "Nam Bộ",
    detail: {
      fullTitle: "Tập tục cúng giỗ phương Nam: Thảo thơm nếp nhà & Đượm tình chòm xóm",
      subtitle:
        "Cúng giỗ ở Nam Bộ mang phong vị phóng khoáng, nghĩa tình. Đó không chỉ là ngày nhớ ơn người đã khuất, mà còn là ngày sum họp của đại gia đình và thắt chặt tình nghĩa xóm giềng đầm ấm.",
      heroImage: "/images/mekong_nam_bo.jpg",
      heroCaption: "Hương vị đám giỗ miền Tây: Nồi thịt kho nước dừa, đĩa bánh tét và tình làng nghĩa xóm sum vầy.",
      heroArtCredit: "Ảnh: Nếp sống văn hóa sông nước miền Tây",
      meaningTitle: "Ăn giỗ phương Nam — Ngày hội của tình thân",
      meaningParagraphs: [
        "Người phương Nam quan niệm 'sống sao chết vậy'. Ngày giỗ là ngày mời người xưa về ăn bữa cơm thân mật cùng con cháu. Mâm cỗ giỗ không câu nệ sự kiểu cách mà đề cao sự hào sảng, tươi ngon và bàn tay chăm chút của các thế hệ.",
        "Sau khi cúng gia tiên, mâm cỗ được dọn ra đãi đằng bà con họ hàng, lối xóm. Mọi người ngồi lại cùng nhau hỏi thăm mùa màng, công việc, chia sẻ ngọt bùi với tinh thần trượng nghĩa, bao dung.",
      ],
      meaningQuote: "“Bát canh khổ qua gửi gắm ước mong qua hết nhọc nhằn, đón trọn an vui.”",
      checklists: [
        { id: "cg-1", label: "Chuẩn bị các món đặc trưng: thịt kho tàu hột vịt, canh khổ qua, cá lóc nướng/kho" },
        { id: "cg-2", label: "Dọn dẹp bàn thờ gia tiên sạch sẽ, dâng hoa huệ trắng và nải chuối vàng" },
        { id: "cg-3", label: "Dâng mâm cơm cúng lên bàn thờ trước giờ ngọ (trước 12h trưa)" },
        { id: "cg-4", label: "Thắp hương bái tạ, tưởng nhớ công đức dưỡng dục của tiền nhân" },
        { id: "cg-5", label: "Mời bà con, chòm xóm cùng tề tựu dùng bữa sum vầy" },
      ],
      safetyTip: "Khi nấu nướng lượng lớn món ăn ngày giỗ, chú ý an toàn gas và thông gió bếp.",
      offeringAdvice: "Mâm cỗ có đủ bốn món truyền thống Nam Bộ: món kho, món canh, món xào và món gỏi luộc.",
      offerings: [
        {
          id: "cg-off-1",
          name: "Thịt heo kho nước dừa (thịt kho rệu)",
          subname: "Miếng thịt vuông trứng tròn",
          desc: "Tượng trưng cho sự vuông tròn, vẹn toàn và sung túc trong gia đạo.",
        },
        {
          id: "cg-off-2",
          name: "Tô canh khổ qua dồn thịt",
          subname: "Hương vị dân dã",
          desc: "Ý niệm cầu mong mọi điều khổ ải, gian khó trong đời trôi qua, nhường chỗ cho sự ngọt lành.",
        },
      ],
      steps: [
        {
          stepNumber: "01",
          title: "Sửa soạn nguyên liệu thảo thơm",
          desc: "Chợ sớm lựa chọn thịt tươi, rau củ và trái ngọt; cả nhà cùng quây quần sơ chế, nấu nướng.",
        },
        {
          stepNumber: "02",
          title: "Bày biện mâm cúng trang trọng",
          desc: "Bày các món ăn lên đĩa sạch, sắp xếp ngay ngắn trên bàn thờ cùng chén nước trong và đĩa hoa tươi.",
        },
        {
          stepNumber: "03",
          title: "Thắp nén hương thành kính",
          desc: "Đại diện gia đình thắp hương, khấn nguyện mời gia tiên về thụ hưởng và phù hộ độ trì cho con cháu.",
        },
        {
          stepNumber: "04",
          title: "Đãi đằng sum họp chòm xóm",
          desc: "Hạ mâm cỗ, dọn bàn mời họ hàng và lối xóm cùng chung vui, gắn kết nghĩa tình bền chặt.",
        },
      ],
      regionalDetails: [
        { region: "Tây Nam Bộ", desc: "Đám giỗ thường có thêm bánh tét lá cẩm, bánh ít trần và đĩa cá lóc đồng thơm phức." },
        { region: "Đông Nam Bộ", desc: "Kết hợp hài hòa món cuốn bánh tráng, gỏi ngó sen tôm thịt thanh mát, đậm đà tình thân." },
      ],
      fireSafetyRules: [
        "Kiểm tra khóa van bình gas cẩn thận sau khi nấu nướng phục vụ đám giỗ đông người.",
        "Bát hương sau khi thắp nhiều nén cần theo dõi để không cháy lan sang giấy tờ.",
      ],
      closingQuote: "“Uống miếng nước ngọt lành phương Nam, lòng nhớ mãi ơn người mở cõi gầy dựng cơ đồ.”",
    },
  },
  {
    id: "ta-on-nha-moi",
    title: "Nghi thức tạ ơn và chuyển về nhà mới",
    badge: "Dịp gia đình • An cư",
    badgeType: "family",
    tagOnImage: "Thích ứng đô thị",
    stepsCount: "4 bước an tâm",
    timeEstimate: "45 phút",
    desc: "Các bước nhóm bếp ấm, đun siêu nước sôi và gửi gắm tâm niệm bình an khi bắt đầu nếp sống tại nơi ở mới.",
    image: "/images/hue_trung_bo.jpg",
    tagPill: "KHỞI ĐẦU HANH THÔNG",
    actionText: "Xem hướng dẫn",
    occasion: "Dịp gia đình",
    region: "Thích ứng đa vùng",
    detail: {
      fullTitle: "Nghi thức nhập trạch nhà mới: Khởi đầu an cư & Đón vượng khí cát tường",
      subtitle:
        "Chuyển về nơi ở mới là cột mốc quan trọng của đời người. Bằng những hành động tượng trưng ấm áp: mang bếp lửa, đun ấm nước sôi và dâng nén trầm an trú, hướng dẫn này giúp bạn vững tâm bắt đầu nếp sống mới.",
      heroImage: "/images/hue_trung_bo.jpg",
      heroCaption: "Không gian tổ ấm mới: Ánh sáng chan hòa, gian bếp ấm cúng và sự an tâm nơi chốn đi về.",
      heroArtCredit: "Tranh: An Cư Lạc Nghiệp - Không Gian Sống Người Việt",
      meaningTitle: "An cư lạc nghiệp — Thổi hồn cho mái ấm",
      meaningParagraphs: [
        "Người xưa dạy 'An cư mới lạc nghiệp'. Nghi thức chuyển về nhà mới (nhập trạch) về bản chất là việc đánh thức sinh khí cho ngôi nhà, xua đi sự lạnh lẽo của công trình xây dựng và mang lại hơi ấm của sự sống con người.",
        "Không cần mâm cao cỗ đầy hay thầy cúng phức tạp, chính tâm niệm yêu thương, trân trọng tổ ấm của gia chủ cùng ngọn lửa bếp ấm và lời chúc lành của người thân là nguồn năng lượng phong thủy tốt đẹp nhất.",
      ],
      meaningQuote: "“Nhà là nơi bão dừng sau cánh cửa, tâm là chốn bình an giữa cuộc đời.”",
      checklists: [
        { id: "nm-1", label: "Mang bếp lửa (hoặc ấm đun nước) và gạo, muối vào nhà đầu tiên" },
        { id: "nm-2", label: "Mở rộng tất cả cửa sổ và bật sáng các bóng đèn để đón sinh khí" },
        { id: "nm-3", label: "Đun một siêu nước sôi reo trên bếp, tượng trưng cho ấm no và tài lộc dồi dào" },
        { id: "nm-4", label: "Dâng đĩa ngũ quả, hoa tươi và chén nước sạch tạ ơn trời đất, tiền chủ" },
        { id: "nm-5", label: "Thắp nén trầm thơm thanh lọc không gian, cầu chúc gia đạo an khang" },
      ],
      safetyTip: "Khi đun nước và thắp hương tại căn hộ chung cư mới, lưu ý kiểm tra hệ thống báo khói tự động.",
      offeringAdvice: "Lễ vật tinh gọn: đĩa hoa tươi, đĩa ngũ quả, chén muối gạo, ấm nước đun sôi và nén hương mộc.",
      offerings: [
        {
          id: "nm-off-1",
          name: "Hũ gạo & Hũ muối đầy",
          subname: "No đủ & Trong lành",
          desc: "Tượng trưng cho sự no ấm, thanh sạch và vững bền không bao giờ thiếu thốn.",
        },
        {
          id: "nm-off-2",
          name: "Ấm nước đun sôi reo",
          subname: "Khởi sinh nhiệt huyết",
          desc: "Âm thanh nước sôi và hơi ấm mang ý nghĩa sinh sôi nảy nở, khai thông may mắn.",
        },
      ],
      steps: [
        {
          stepNumber: "01",
          title: "Đem lửa ấm vào nhà",
          desc: "Gia chủ mang bếp hoặc ấm đun nước vào nhà đầu tiên, bật bếp đun ấm nước sôi thể hiện ngọn lửa nếp nhà bắt đầu cháy sáng.",
        },
        {
          stepNumber: "02",
          title: "Mở rộng cửa & Đón dưỡng khí",
          desc: "Mở các cánh cửa sổ, bật quạt thoang thoảng để khí tươi lưu chuyển khắp các ngõ ngách căn hộ.",
        },
        {
          stepNumber: "03",
          title: "Dâng lễ tạ ơn mộc mạc",
          desc: "Đặt mâm hoa quả, chén nước trong lên bàn thờ/kệ trang nghiêm, thắp nén trầm thơm tạ ơn và khởi tâm an cư.",
        },
        {
          stepNumber: "04",
          title: "Ngồi lại thưởng trà ấm",
          desc: "Rót chén nước ấm vừa đun mời các thành viên cùng uống, cảm nhận niềm hạnh phúc dưới mái nhà thân yêu.",
        },
      ],
      regionalDetails: [
        { region: "Bắc Bộ", desc: "Chú trọng giờ hoàng đạo nhập trạch, mang chiếu hoặc đệm mới vào trước, dâng hương trầm thơm ngát." },
        { region: "Trung Bộ", desc: "Đun siêu nước sôi sùng sục, rắc một chút muối gạo quanh góc nhà xua tan khí lạnh cũ." },
        { region: "Nam Bộ", desc: "Phóng khoáng, chuộng mua chậu hoa mai/vạn thọ đặt trước cửa, bật nhạc êm dịu tạo cảm giác rộn ràng ấm áp." },
      ],
      fireSafetyRules: [
        "Luôn có người túc trực bên bếp khi đun nước lần đầu ở căn nhà mới.",
        "Bố trí bình cứu hỏa mini ở vị trí dễ thấy trong gian bếp gia đình.",
      ],
      closingQuote: "“Đất lành chim đậu, lòng an nhà ắt thành tổ ấm thiêng liêng.”",
    },
  },
];

export function getRitualById(id: string): RitualGuideItem | undefined {
  return RITUAL_GUIDES.find((item) => item.id === id);
}
