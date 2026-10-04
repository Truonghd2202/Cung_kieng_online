/**
 * Horoscope & Folk Symbolism Rule Engine
 * Chuyển đổi ngày giờ sinh thành các biểu tượng văn hóa ngũ hành dân gian nhất quán,
 * phục vụ đối thoại nội tâm và tự soi chiếu, không mang tính phán xét bói toán.
 */

import { convertSolar2Lunar, getCanChiYear } from "./calendarData";

export type ElementType = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export interface HoroscopeCalculationResult {
  solarDate: string;
  lunarDate: string;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  canChiYear: string;
  napAm: string;
  element: ElementType;
  elementMeaning: string;
  elementTitle: string;
  seasonName: string;
  seasonDetail: string;
  hourName: string;
  hourDetail: string;
  regionName: string;
  regionDetail: string;
  supportElement: string;
  supportAdvice: string;
  coreStrength: string;
  innerWatchout: string;
  philosophicalQuote: string;
  selfInquiryQuestion: string;
}

const NAP_AM_MAP: Record<
  string,
  { napAm: string; element: ElementType; meaning: string }
> = {
  "Giáp Tý": {
    napAm: "Hải Trung Kim",
    element: "Kim",
    meaning: "Vàng chìm đáy biển • Tiềm ẩn tài năng, cần thời gian mài giũa để tỏ rạng",
  },
  "Ất Sửu": {
    napAm: "Hải Trung Kim",
    element: "Kim",
    meaning: "Vàng chìm đáy biển • Điềm đạm, trầm tích, nội lực thâm sâu",
  },
  "Bính Dần": {
    napAm: "Lư Trung Hỏa",
    element: "Hỏa",
    meaning: "Lửa trong lò • Nhiệt huyết, bền bỉ, cần tôi luyện qua khó khăn",
  },
  "Đinh Mão": {
    napAm: "Lư Trung Hỏa",
    element: "Hỏa",
    meaning: "Lửa trong lò • Ấm áp, kiên trì, nuôi dưỡng ước vọng chân thành",
  },
  "Mậu Thìn": {
    napAm: "Đại Lâm Mộc",
    element: "Mộc",
    meaning: "Cây rừng lớn • Tán rộng che chở, tấm lòng nhân hậu, vị tha",
  },
  "Kỷ Tỵ": {
    napAm: "Đại Lâm Mộc",
    element: "Mộc",
    meaning: "Cây rừng lớn • Vững vàng trước phong ba, giàu chí tiến thủ",
  },
  "Canh Ngọ": {
    napAm: "Lộ Bàng Thổ",
    element: "Thổ",
    meaning: "Đất ven đường • Bao dung, chịu khó, kết nối và đón nhận muôn người",
  },
  "Tân Mùi": {
    napAm: "Lộ Bàng Thổ",
    element: "Thổ",
    meaning: "Đất ven đường • Chân thành, kiên nhẫn, điểm tựa bình yên cho người khác",
  },
  "Nhâm Thân": {
    napAm: "Kiếm Phong Kim",
    element: "Kim",
    meaning: "Vàng mũi kiếm • Sắc bén, cương trực, dứt khoát và chuộng công lý",
  },
  "Quý Dậu": {
    napAm: "Kiếm Phong Kim",
    element: "Kim",
    meaning: "Vàng mũi kiếm • Tinh anh, khí phách, không chịu khuất phục nghịch cảnh",
  },
  "Giáp Tuất": {
    napAm: "Sơn Đầu Hỏa",
    element: "Hỏa",
    meaning: "Lửa trên núi • Tỏa sáng từ xa, có tầm nhìn rộng và tâm hồn khoáng đạt",
  },
  "Ất Hợi": {
    napAm: "Sơn Đầu Hỏa",
    element: "Hỏa",
    meaning: "Lửa trên núi • Ấm áp lan tỏa, giàu cảm xúc và năng lượng sáng tạo",
  },
  "Bính Tý": {
    napAm: "Giản Hạ Thủy",
    element: "Thủy",
    meaning: "Nước dưới khe • Mềm mại, len lỏi vượt chướng ngại, nội tâm sâu sắc",
  },
  "Đinh Sửu": {
    napAm: "Giản Hạ Thủy",
    element: "Thủy",
    meaning: "Nước dưới khe • Tĩnh lặng, nhẫn nại, tích tiểu thành đại",
  },
  "Mậu Dần": {
    napAm: "Thành Đầu Thổ",
    element: "Thổ",
    meaning: "Đất trên thành • Vững chãi như thành lũy, kiên định bảo bọc mọi người",
  },
  "Kỷ Mão": {
    napAm: "Thành Đầu Thổ",
    element: "Thổ",
    meaning: "Đất trên thành • Chắc chắn, đáng tin cậy, nguyên tắc và trật tự",
  },
  "Canh Thìn": {
    napAm: "Bạch Lạp Kim",
    element: "Kim",
    meaning: "Vàng trong nến • Thanh khiết, đã qua tôi luyện ngọn lửa, sáng trong",
  },
  "Tân Tỵ": {
    napAm: "Bạch Lạp Kim",
    element: "Kim",
    meaning: "Vàng trong nến • Trí tuệ tinh tường, tính tình ngay thẳng, trọng tình nghĩa",
  },
  "Nhâm Ngọ": {
    napAm: "Dương Liễu Mộc",
    element: "Mộc",
    meaning: "Gỗ cây liễu • Mềm mại thích ứng, uyển chuyển trước gió bão cuộc đời",
  },
  "Quý Mùi": {
    napAm: "Dương Liễu Mộc",
    element: "Mộc",
    meaning: "Gỗ cây liễu • Tế nhị, giàu lòng cảm thông, dĩ hòa vi quý",
  },
  "Giáp Thân": {
    napAm: "Tuyền Trung Thủy",
    element: "Thủy",
    meaning: "Nước trong giếng • Nguồn trong trẻo bất tận, nuôi dưỡng sự sống vô tư",
  },
  "Ất Dậu": {
    napAm: "Tuyền Trung Thủy",
    element: "Thủy",
    meaning: "Nước trong giếng • Tĩnh tại, sáng suốt, thấu tỏ nhân tình thế thái",
  },
  "Bính Tuất": {
    napAm: "Ốc Thượng Thổ",
    element: "Thổ",
    meaning: "Đất trên mái nhà • Che mưa chắn gió, tinh thần trách nhiệm gia đình cao",
  },
  "Đinh Hợi": {
    napAm: "Ốc Thượng Thổ",
    element: "Thổ",
    meaning: "Đất trên mái nhà • Vững tâm trước biến cố, làm chỗ dựa tin cậy",
  },
  "Mậu Tý": {
    napAm: "Tích Lịch Hỏa",
    element: "Hỏa",
    meaning: "Lửa sấm sét • Nhanh nhạy, quyết liệt, dám đột phá lối mòn cũ",
  },
  "Kỷ Sửu": {
    napAm: "Tích Lịch Hỏa",
    element: "Hỏa",
    meaning: "Lửa sấm sét • Mạnh mẽ, bộc trực, hành động dứt khoát vì lẽ phải",
  },
  "Canh Dần": {
    napAm: "Tùng Bách Mộc",
    element: "Mộc",
    meaning: "Gỗ tùng bách • Hiên ngang giữa mùa đông, kiên cường bất khuất",
  },
  "Tân Mão": {
    napAm: "Tùng Bách Mộc",
    element: "Mộc",
    meaning: "Gỗ tùng bách • Trực tính, giữ gìn danh tiết, ý chí quật cường",
  },
  "Nhâm Thìn": {
    napAm: "Trường Lưu Thủy",
    element: "Thủy",
    meaning: "Nước chảy dài ra biển • Tầm nhìn xa rộng, liên tục phát triển và học hỏi",
  },
  "Quý Tỵ": {
    napAm: "Trường Lưu Thủy",
    element: "Thủy",
    meaning: "Nước chảy dài ra biển • Kiên trì bền bỉ, hướng về đại dương bao la",
  },
  "Giáp Ngọ": {
    napAm: "Sa Trung Kim",
    element: "Kim",
    meaning: "Vàng trong cát • Cần sự kiên tâm đãi lọc, khiêm nhường nhưng quý giá",
  },
  "Ất Mùi": {
    napAm: "Sa Trung Kim",
    element: "Kim",
    meaning: "Vàng trong cát • Không phô trương, chân chất, càng về sau càng rực rỡ",
  },
  "Bính Thân": {
    napAm: "Sơn Hạ Hỏa",
    element: "Hỏa",
    meaning: "Lửa dưới chân núi • Ấm áp lúc hoàng hôn, giàu tình cảm gia đình",
  },
  "Đinh Dậu": {
    napAm: "Sơn Hạ Hỏa",
    element: "Hỏa",
    meaning: "Lửa dưới chân núi • Gần gũi, thấu hiểu, mang lại bình an cho xung quanh",
  },
  "Mậu Tuất": {
    napAm: "Bình Địa Mộc",
    element: "Mộc",
    meaning: "Gỗ đồng bằng • Dễ sinh sôi, chan hòa với vạn vật, sức sống bền bỉ",
  },
  "Kỷ Hợi": {
    napAm: "Bình Địa Mộc",
    element: "Mộc",
    meaning: "Gỗ đồng bằng • Lành tính, bao dung, gắn bó mật thiết với cộng đồng",
  },
  "Canh Tý": {
    napAm: "Bích Thượng Thổ",
    element: "Thổ",
    meaning: "Đất trên tường • Giữ gìn gia phong, trật tự kỷ cương, đáng tin cậy",
  },
  "Tân Sửu": {
    napAm: "Bích Thượng Thổ",
    element: "Thổ",
    meaning: "Đất trên tường • Kiên cố, cẩn trọng, làm việc có phương pháp",
  },
  "Nhâm Dần": {
    napAm: "Kim Bạch Kim",
    element: "Kim",
    meaning: "Vàng pha bạc • Tinh xảo, quý phái, trọng sự hoàn mỹ và phẩm giá",
  },
  "Quý Mão": {
    napAm: "Kim Bạch Kim",
    element: "Kim",
    meaning: "Vàng pha bạc • Nhã nhặn, thông tuệ, phong thái nhẹ nhàng ung dung",
  },
  "Giáp Thìn": {
    napAm: "Phúc Đăng Hỏa",
    element: "Hỏa",
    meaning: "Lửa ngọn đèn dầu • Soi sáng đêm tối, mang lại sự ấm cúng và trí tuệ",
  },
  "Ất Tỵ": {
    napAm: "Phúc Đăng Hỏa",
    element: "Hỏa",
    meaning: "Lửa ngọn đèn dầu • Nhẫn nại, âm thầm cống hiến, tâm sáng hướng thiện",
  },
  "Bính Ngọ": {
    napAm: "Thiên Hà Thủy",
    element: "Thủy",
    meaning: "Nước trên trời • Mưa tưới tắm muôn loài, hào sảng, vô tư cống hiến",
  },
  "Đinh Mùi": {
    napAm: "Thiên Hà Thủy",
    element: "Thủy",
    meaning: "Nước trên trời • Rộng lượng, mang lại sinh khí tốt lành cho người khác",
  },
  "Mậu Thân": {
    napAm: "Đại Trạch Thổ",
    element: "Thổ",
    meaning: "Đất đầm lầy lớn • Màu mỡ trù phú, biến chuyển linh hoạt nuôi dưỡng mùa màng",
  },
  "Kỷ Dậu": {
    napAm: "Đại Trạch Thổ",
    element: "Thổ",
    meaning: "Đất đầm lầy lớn • Thích nghi cao, giàu lòng nâng đỡ những người yếu thế",
  },
  "Canh Tuất": {
    napAm: "Thoa Xuyến Kim",
    element: "Kim",
    meaning: "Vàng trang sức • Tinh tế, trau chuốt, yêu chuộng cái đẹp và sự tao nhã",
  },
  "Tân Hợi": {
    napAm: "Thoa Xuyến Kim",
    element: "Kim",
    meaning: "Vàng trang sức • Lương thiện, thanh nhã, tạo dựng hòa khí trong mọi mối quan hệ",
  },
  "Nhâm Tý": {
    napAm: "Tang Đố Mộc",
    element: "Mộc",
    meaning: "Gỗ cây dâu • Cống hiến thiết thực, mang lại giá trị nhân sinh lâu dài",
  },
  "Quý Sửu": {
    napAm: "Tang Đố Mộc",
    element: "Mộc",
    meaning: "Gỗ cây dâu • Cần mẫn, siêng năng, âm thầm vun đắp thành quả",
  },
  "Giáp Dần": {
    napAm: "Đại Khê Thủy",
    element: "Thủy",
    meaning: "Nước khe lớn • Chảy cuồn cuộn không ngừng, sức sống mãnh liệt và dồi dào",
  },
  "Ất Mão": {
    napAm: "Đại Khê Thủy",
    element: "Thủy",
    meaning: "Nước khe lớn • Hào sảng, tích cực, không ngại gian khó chông gai",
  },
  "Bính Thìn": {
    napAm: "Sa Trung Thổ",
    element: "Thổ",
    meaning: "Đất pha cát • Rộng mở, dễ hòa nhập, đa dạng góc nhìn trong cuộc sống",
  },
  "Đinh Tỵ": {
    napAm: "Sa Trung Thổ",
    element: "Thổ",
    meaning: "Đất pha cát • Linh hoạt, ứng biến khéo léo, tự do tự tại",
  },
  "Mậu Ngọ": {
    napAm: "Thiên Thượng Hỏa",
    element: "Hỏa",
    meaning: "Lửa trên trời (Ánh mặt trời) • Quang minh chính đại, công tâm, chiếu rọi khắp nơi",
  },
  "Kỷ Mùi": {
    napAm: "Thiên Thượng Hỏa",
    element: "Hỏa",
    meaning: "Lửa trên trời (Ánh mặt trời) • Chan hòa, độ lượng, truyền cảm hứng sống tích cực",
  },
  "Canh Thân": {
    napAm: "Thạch Lựu Mộc",
    element: "Mộc",
    meaning: "Gỗ cây thạch lựu • Cứng cáp, kiên cường sinh sôi trên vách đá khô cằn",
  },
  "Tân Dậu": {
    napAm: "Thạch Lựu Mộc",
    element: "Mộc",
    meaning: "Gỗ cây thạch lựu • Ý chí đanh thép, hoa thơm quả ngọt sau thử thách",
  },
  "Nhâm Tuất": {
    napAm: "Đại Hải Thủy",
    element: "Thủy",
    meaning: "Nước biển lớn • Dung chứa vạn sông suối, lòng dạ bao la khoáng đạt",
  },
  "Quý Hợi": {
    napAm: "Đại Hải Thủy",
    element: "Thủy",
    meaning: "Nước biển lớn • Trầm lắng thâm sâu, thấu hiểu quy luật tự nhiên của cuộc đời",
  },
};

const HOUR_MAP: Record<string, { name: string; detail: string }> = {
  ty: {
    name: "Giờ Tý (23:00 - 01:00)",
    detail: "Canh một sâu thẳm • Thời khắc giao hòa âm dương, tâm trí sâu sắc thiên về nội quán.",
  },
  suu: {
    name: "Giờ Sửu (01:00 - 03:00)",
    detail: "Đêm lạnh chuyển mình • Tính kiên nhẫn, bền bỉ, thích hợp sự trầm tĩnh và tích lũy.",
  },
  dan: {
    name: "Giờ Dần (03:00 - 05:00)",
    detail: "Hừng đông thức giấc • Khí thế tiên phong, dồi dào sức sống mới và tầm nhìn sáng rõ.",
  },
  mao: {
    name: "Giờ Mão (05:00 - 07:00)",
    detail: "Bình minh rạng ngời • Nhã nhặn, cởi mở, lan tỏa sự ấm áp chan hòa với xung quanh.",
  },
  thin: {
    name: "Giờ Thìn (07:00 - 09:00)",
    detail: "Ánh nắng ấm áp • Tràn đầy năng lượng hành động, quyết đoán và trọng nghĩa tình.",
  },
  ty_day: {
    name: "Giờ Tỵ (09:00 - 11:00)",
    detail: "Mặt trời soi tỏ • Tinh anh, khéo léo, linh hoạt trong ứng biến cuộc sống.",
  },
  ngo: {
    name: "Giờ Ngọ (11:00 - 13:00)",
    detail: "Giữa trưa rực rỡ • Nhiệt huyết bừng sáng, thẳng thắn, tâm hồn rộng mở chân thành.",
  },
  mui: {
    name: "Giờ Mùi (13:00 - 15:00)",
    detail: "Nắng dịu chiều về • Ôn hòa, giàu cảm thông, gìn giữ nét thuận hòa dung dị.",
  },
  than: {
    name: "Giờ Thân (15:00 - 17:00)",
    detail: "Gió thoảng chiều tà • Tinh tế, nhạy bén, khả năng thích nghi và học hỏi cao.",
  },
  dau: {
    name: "Giờ Dậu (17:00 - 19:00)",
    detail: "Hoàng hôn buông rèm • Tỉ mỉ, chu đáo, hướng về tổ ấm và sự an bài mực thước.",
  },
  tuat: {
    name: "Giờ Tuất (19:00 - 21:00)",
    detail: "Nếp nhà lên đèn • Trọng chữ tín, giàu lòng trung thực và tinh thần bảo bọc.",
  },
  hoi: {
    name: "Giờ Hợi (21:00 - 23:00)",
    detail: "Đêm về yên nghỉ • Khoáng đạt, an nhiên, biết buông bỏ phiền não giữa đời.",
  },
};

const REGION_MAP: Record<string, { name: string; detail: string }> = {
  bac: {
    name: "Bắc Bộ",
    detail: "Tứ thời luân chuyển rõ nét, nôi văn hóa phù sa sông Hồng đọng nét mực thước và tình làng.",
  },
  trung: {
    name: "Trung Bộ",
    detail: "Nắng gió Trường Sơn kiên cường, biển sâu bồi đắp đức tính cần kiệm, kiên định vượt thử thách.",
  },
  nam: {
    name: "Nam Bộ",
    detail: "Phù sa Cửu Long trù phú, tính cách hào sảng, phóng khoáng, bao dung và thuận hòa tự nhiên.",
  },
};

const ELEMENT_ATTRIBUTES: Record<
  ElementType,
  {
    title: string;
    coreStrength: string;
    innerWatchout: string;
    supportElement: string;
    supportAdvice: string;
    quote: string;
    selfInquiry: string;
  }
> = {
  Kim: {
    title: "Kim luyện • Tinh khôi, sắc bén, trọng nghĩa khí",
    coreStrength: "Nguyên tắc rõ ràng, phẩm chất thanh cao, ý chí sắc bén vượt nghịch cảnh",
    innerWatchout: "Đôi khi quá khắt khe, cầu toàn hoặc cứng nhắc với người xung quanh",
    supportElement: "Thổ sinh Kim (Đất dưỡng vàng)",
    supportAdvice: "Nên tìm về sự trầm tĩnh, bao dung của Đất để làm mềm bớt góc nhọn sắc sảo",
    quote: "“Vàng qua lửa đỏ mới hay vàng mười. Lòng giữ nghĩa khí thì trước sau như một, chẳng ngại phong sương.”",
    selfInquiry: "Liệu tiêu chuẩn khắt khe của mình có đang vô tình tạo áp lực lên những người mình thương yêu nhất?",
  },
  Mộc: {
    title: "Mộc sinh • Nhân ái, vươn cao, chở che vạn vật",
    coreStrength: "Giàu lòng trắc ẩn, tính phát triển bền vững, hướng về ánh sáng và tri thức",
    innerWatchout: "Dễ nhạy cảm, ôm đồm lo lắng việc thiên hạ hoặc tổn thương khi bị hiểu lầm",
    supportElement: "Thủy sinh Mộc (Nước tưới cây xanh)",
    supportAdvice: "Cần học tính mềm mại, buông xả của Nước để nuôi dưỡng nguồn sinh khí dồi dào",
    quote: "“Cây muốn vươn cao đón nắng ấm, rễ phải bám sâu vào lòng đất mẹ. Tâm an thì cành lá tự xanh tươi.”",
    selfInquiry: "Mình có đang mải miết vươn cành che mưa cho người khác mà quên tưới tắm bồi dưỡng cho chính tâm hồn mình?",
  },
  Thủy: {
    title: "Thủy nguồn • Mềm mại, thích nghi, bao dung như biển lớn",
    coreStrength: "Trí tuệ linh hoạt, trực giác nhạy bén, khả năng lắng nghe và đồng cảm sâu sắc",
    innerWatchout: "Dễ bị cảm xúc dao động cuốn trôi, đôi khi thiếu tính quyết đoán dứt khoát",
    supportElement: "Kim sinh Thủy (Suối nguồn tinh khiết)",
    supportAdvice: "Nên rèn luyện tính kỷ luật, nguyên tắc của Kim để dòng nước chảy có phương hướng rõ ràng",
    quote: "“Nước đi muôn ngả vẫn tìm về biển cả. Mềm mại không phải yếu hèn, mà là đỉnh cao của sự thích nghi.”",
    selfInquiry: "Sự mềm dẻo của mình đã có đủ bờ đê nguyên tắc để bảo vệ bản thân khỏi những cảm xúc tiêu cực chưa?",
  },
  Hỏa: {
    title: "Hỏa chiếu • Nhiệt huyết, bừng sáng, ấm áp chan hòa",
    coreStrength: "Tràn đầy nhiệt huyết, giàu tinh thần dấn thân, lan tỏa cảm hứng và sự chân thành",
    innerWatchout: "Nóng vội, thiếu kiên nhẫn khi sự việc không theo ý mình, dễ bùng cháy rồi hao mòn",
    supportElement: "Mộc sinh Hỏa (Củi nuôi ngọn lửa)",
    supportAdvice: "Cần nuôi dưỡng sự điềm đạm, lắng nghe của Mộc để giữ ngọn lửa ấm bền lâu thay vì bùng cháy vội vã",
    quote: "“Lửa sưởi ấm gian nhà cũng có thể thiêu rụi nếp rơm. Giữ than ấm âm ỉ quý hơn ngọn lửa bùng phát bất ngờ.”",
    selfInquiry: "Ngọn lửa nhiệt thành của mình có đang vô tình đốt cháy lòng kiên nhẫn trong các cuộc chuyện trò hàng ngày?",
  },
  Thổ: {
    title: "Thổ dưỡng • Bền bỉ, vững chãi, nuôi dưỡng muôn loài",
    coreStrength: "Đáng tin cậy, kiên định, giàu lòng bao dung và khả năng làm điểm tựa vững vàng",
    innerWatchout: "Dễ chần chừ, ngại thay đổi hoặc giữ khư khư thành kiến trong lòng",
    supportElement: "Hỏa sinh Thổ (Tro tàn thành đất tốt)",
    supportAdvice: "Cần tiếp nạp thêm năng lượng tươi mới, tinh thần lạc quan của Hỏa để đất không bị khô cằn",
    quote: "“Mảnh đất lành nuôi dưỡng muôn hoa mà không hề đòi hỏi đền đáp. Tâm vững như núi thì sóng gió đời cũng hóa nhẹ tênh.”",
    selfInquiry: "Sự kiên định của mình có đang biến thành sự cố chấp, khiến mình khó mở lòng đón nhận những góc nhìn mới mẻ?",
  },
};

export function validateBirthDate(
  day: number,
  month: number,
  year: number
): string | null {
  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year) ||
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return "Ngày sinh chưa hợp lệ.";
  }

  const birthDate = new Date(0);
  birthDate.setHours(0, 0, 0, 0);
  birthDate.setFullYear(year, month - 1, day);

  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return "Ngày này không tồn tại. Bạn hãy kiểm tra lại ngày, tháng và năm sinh.";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (birthDate.getTime() > today.getTime()) {
    return "Ngày sinh không thể nằm trong tương lai.";
  }

  return null;
}

/**
 * Tính toán kết quả chiêm nghiệm văn hóa nhất quán dựa trên đầu vào
 */
export function calculateHoroscope({
  day,
  month,
  year,
  hourCanh,
  noHour,
  region,
}: {
  day: number;
  month: number;
  year: number;
  hourCanh: string;
  noHour: boolean;
  region: string;
}): HoroscopeCalculationResult {
  const dateError = validateBirthDate(day, month, year);

  if (dateError) {
    throw new Error(dateError);
  }

  // 1. Chuyển đổi sang Âm lịch và Can Chi
  const [
    lunarDay,
    lunarMonth,
    lunarYear,
    isLeapMonth,
  ] = convertSolar2Lunar(day, month, year);
  const canChiYear = getCanChiYear(lunarYear);

  // 2. Tra Nạp Âm Ngũ Hành theo Can Chi
  const napAmInfo = NAP_AM_MAP[canChiYear] || {
    napAm: "Bản Mệnh Dân Gian",
    element: "Thổ" as ElementType,
    meaning: "Hài hòa ngũ hành, tâm tính bình hòa",
  };

  const elementAttrs = ELEMENT_ATTRIBUTES[napAmInfo.element];

  // 3. Mùa sinh theo tháng âm lịch
  let seasonName = "Mùa Xuân";
  let seasonDetail = "Khí Mộc sinh sôi, nảy lộc đâm chồi, khởi đầu thanh khiết.";
  if (lunarMonth >= 4 && lunarMonth <= 6) {
    seasonName = "Mùa Hạ";
    seasonDetail = "Khí Hỏa nồng đượm, nhiệt thành, hoa trái vươn mình rực rỡ.";
  } else if (lunarMonth >= 7 && lunarMonth <= 9) {
    seasonName = "Mùa Thu";
    seasonDetail = "Khí Kim thanh lương, thu liễm tĩnh tại, mùa gặt và đúc kết chiêm nghiệm.";
  } else if (lunarMonth >= 10 && lunarMonth <= 12) {
    seasonName = "Mùa Đông";
    seasonDetail = "Khí Thủy sâu lắng, tĩnh mịch dưỡng nguyên, tích tụ nội lực chờ xuân.";
  }

  // 4. Giờ sinh
  const hourData = noHour
    ? {
        name: "Giờ tự nhiên (Không cố định canh)",
        detail: "Thuận theo tự nhiên • Lấy nhịp điệu ngày và mùa làm chỗ nương tựa, tâm thế tự do khoáng đạt.",
      }
    : HOUR_MAP[hourCanh] || {
        name: "Giờ Canh",
        detail: "Giao hòa nhịp điệu thời gian dân gian.",
      };

  // 5. Phương vị vùng sinh
  const regionData = REGION_MAP[region] || {
    name: "Đất Mẹ Việt Nam",
    detail: "Gắn kết cội nguồn văn hóa truyền thống ngàn đời.",
  };

  return {
    solarDate: `${day}/${month}/${year}`,
    lunarDate:
      `${lunarDay}/${lunarMonth}/${lunarYear} ` +
      (isLeapMonth
        ? "(Âm lịch — tháng nhuận)"
        : "(Âm lịch)"),
    lunarDay,
    lunarMonth,
    lunarYear,
    canChiYear,
    napAm: napAmInfo.napAm,
    element: napAmInfo.element,
    elementMeaning: napAmInfo.meaning,
    elementTitle: elementAttrs.title,
    seasonName,
    seasonDetail,
    hourName: hourData.name,
    hourDetail: hourData.detail,
    regionName: regionData.name,
    regionDetail: regionData.detail,
    supportElement: elementAttrs.supportElement,
    supportAdvice: elementAttrs.supportAdvice,
    coreStrength: elementAttrs.coreStrength,
    innerWatchout: elementAttrs.innerWatchout,
    philosophicalQuote: elementAttrs.quote,
    selfInquiryQuestion: elementAttrs.selfInquiry,
  };
}
