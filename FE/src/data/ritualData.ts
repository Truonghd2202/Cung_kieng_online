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
    stepsCount: "3 bước giản dị",
    timeEstimate: "10 phút",
    desc: "Khởi đầu tháng mới với tâm thế an hòa, dọn gọn không gian thờ tự và thắp nén trầm an trú.",
    image: "/images/tea_bowl.jpg",
    tagPill: "TỰ TẠI THÂN TÂM",
    actionText: "Xem hướng dẫn",
    occasion: "Mùng một",
    region: "Bắc Bộ",
  },
  {
    id: "tuong-nho-gia-dinh",
    title: "Không gian tưởng nhớ gia đình",
    badge: "Dịp gia đình • Tưởng nhớ",
    badgeType: "family",
    tagOnImage: "Truyền thống chung",
    stepsCount: "5 bước ý niệm",
    timeEstimate: "30 phút",
    desc: "Gợi ý sắp đặt góc kỷ niệm tổ tiên ấm cúng, chuẩn bị mâm cơm gia đình sum vầy mà không áp lực lễ nghi rườm rà.",
    image: "/images/ancestor_portrait.jpg",
    tagPill: "GẮN KẾT CỘI NGUỒN",
    actionText: "Xem hướng dẫn",
    occasion: "Dịp gia đình",
    region: "Thích ứng đa vùng",
  },
  {
    id: "phong-tuc-dau-nam",
    title: "Tìm hiểu phong tục đầu năm",
    badge: "Tết Nguyên Đán",
    badgeType: "occasion",
    tagOnImage: "Bắc - Trung - Nam",
    stepsCount: "6 giai đoạn",
    timeEstimate: "Mùa lễ hội",
    desc: "Giải mã ý nghĩa tục tiễn ông Táo, dọn nhà đón Tết và nghi thức giao thừa hướng tới ước nguyện an khang, hòa thuận.",
    image: "/images/hero_family.jpg",
    tagPill: "KHỞI SẮC TÂN NIÊN",
    actionText: "Xem hướng dẫn",
    occasion: "Tết Nguyên Đán",
    region: "Thích ứng đa vùng",
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
  },
];

export function getRitualById(id: string): RitualGuideItem | undefined {
  return RITUAL_GUIDES.find((item) => item.id === id);
}
