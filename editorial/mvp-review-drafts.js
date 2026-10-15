// Unpublished editorial material. No source, quotation, reviewer, or image is asserted.
const culture = [
  {
    slug: "mvp-dinh-lang-va-khong-gian-cong-dong",
    title: "Đình làng: một không gian chung",
    region: "NORTH",
    category: "Không gian tín ngưỡng",
    excerpt: "Bản thảo ngắn về cách một không gian chung có thể lưu giữ ký ức và nếp sinh hoạt của cộng đồng.",
    sections: [
      { heading: "Không chỉ là một điểm đến", body: "Khi tìm hiểu một ngôi đình, ta có thể bắt đầu bằng những câu hỏi gần gũi: người dân địa phương gọi nơi ấy là gì, ai thường lui tới, và những dịp nào khiến mọi người cùng có mặt? Câu trả lời có thể khác nhau giữa từng làng." },
      { heading: "Đọc bằng sự tôn trọng", body: "Một bài giới thiệu nên phân biệt điều có tư liệu xác nhận với ký ức, truyền thuyết và cách diễn giải của người viết. Bản thảo này chưa gắn với một di tích cụ thể; nhóm cần bổ sung nguồn định vị và nhờ người am hiểu địa phương rà lại trước khi duyệt." },
    ],
  },
  {
    slug: "mvp-le-hoi-va-ky-uc-cong-dong",
    title: "Lễ hội và ký ức cộng đồng",
    region: "NATIONWIDE",
    category: "Lễ hội truyền thống",
    excerpt: "Một góc nhìn biên soạn về ký ức, sự tham gia và khác biệt giữa các lễ hội.",
    sections: [
      { heading: "Mỗi lễ hội có câu chuyện riêng", body: "Tên gọi, thời điểm, người tham gia và hoạt động của lễ hội cần được tìm hiểu trong bối cảnh cụ thể. Một mô tả về một địa phương không đại diện cho mọi vùng; truyền thuyết cũng cần được ghi là truyền thuyết, không kể như sự kiện lịch sử đã xác minh." },
      { heading: "Điều người đọc có thể tự hỏi", body: "Ta có thể đọc một lễ hội qua những câu hỏi: cộng đồng nào đang gìn giữ thực hành này, điều gì đã thay đổi theo thời gian, và tiếng nói của người tại chỗ được thể hiện ra sao? Đây là gợi ý biên tập nguyên bản, chưa phải kết luận nghiên cứu. Cần nguồn cụ thể và người am hiểu cộng đồng rà soát." },
    ],
  },
  {
    slug: "mvp-nep-nha-va-su-da-dang-thuc-hanh",
    title: "Nếp nhà và sự đa dạng trong thực hành",
    region: "NATIONWIDE",
    category: "Phong tục & Nghi lễ",
    excerpt: "Bản thảo nhắc người đọc tìm hiểu phong tục trong đúng gia đình và địa phương.",
    sections: [
      { heading: "Không có một khuôn mẫu cho mọi nhà", body: "Cùng một dịp, các gia đình có thể chọn cách tưởng nhớ và chuẩn bị khác nhau. Điều kiện sống, ký ức gia đình, niềm tin và tập quán địa phương đều có thể ảnh hưởng đến lựa chọn ấy. Bài viết không đặt ra một nghi thức bắt buộc." },
      { heading: "Tìm hiểu trước khi thực hành", body: "Nếu muốn tìm hiểu một phong tục, hãy hỏi người thân hoặc người thực hành tại địa phương, đồng thời đối chiếu tư liệu phù hợp. Bản thảo này do nhóm biên soạn; chưa có nguồn định vị cho nhận định văn hóa cụ thể và cần được người am hiểu rà lại." },
    ],
  },
];

const rituals = [
  {
    slug: "mvp-tuong-nho-nguoi-than-tai-nha",
    title: "Một khoảng tưởng nhớ người thân tại nhà",
    description: "Gợi ý thực hành linh hoạt, có thể điều chỉnh theo nếp nhà, điều kiện và mong muốn của gia đình.",
    occasion: "Dịp gia đình",
    region: "NATIONWIDE",
    steps: [
      { title: "Thống nhất cách thực hiện", description: "Hỏi ý người trong nhà về cách tưởng nhớ phù hợp. Không cần làm theo hướng dẫn này nếu gia đình có nếp riêng." },
      { title: "Chuẩn bị vừa sức", description: "Nếu gia đình muốn, dọn gọn một góc yên tĩnh và chuẩn bị vật dụng sẵn có. Không cần mua sắm hay bày biện quá khả năng." },
      { title: "Dành thời gian nhớ lại", description: "Có thể kể một kỷ niệm, nói lời tri ân hoặc ngồi yên trong ít phút. Không có một lời khấn chung áp dụng cho mọi nhà." },
      { title: "Thu dọn an toàn", description: "Nếu có lửa, nến hoặc hương, luôn trông coi và dập tắt an toàn. Gia đình có thể chọn cách tưởng nhớ không dùng lửa." },
    ],
    checklists: [
      { id: "agree-on-family-way", label: "Thống nhất cách tưởng nhớ phù hợp với gia đình" },
      { id: "prepare-within-means", label: "Chuẩn bị không gian và vật dụng sẵn có, vừa sức" },
      { id: "share-a-memory", label: "Dành ít phút kể kỷ niệm hoặc gửi lời tri ân" },
      { id: "check-fire-safety", label: "Kiểm tra an toàn và thu dọn sau khi kết thúc" },
    ],
  },
  {
    slug: "mvp-khoang-lang-ngay-ram-tai-nha",
    title: "Một khoảng lắng ngày rằm tại nhà",
    description: "Bản hướng dẫn tham khảo cho gia đình muốn dành thời gian tĩnh tâm; không quy định mâm lễ hay cách hành lễ chung.",
    occasion: "Rằm",
    region: "NATIONWIDE",
    steps: [
      { title: "Chọn mục đích giản dị", description: "Gia đình có thể chọn nghỉ ngơi, tưởng nhớ hoặc trò chuyện. Không cần coi đây là yêu cầu bắt buộc của ngày rằm." },
      { title: "Sắp xếp nơi sinh hoạt", description: "Dọn gọn khu vực sẽ sử dụng. Nếu gia đình có thực hành riêng, hãy theo hướng dẫn của người thân hoặc người am hiểu tại địa phương." },
      { title: "Dành thời gian theo khả năng", description: "Có thể dùng nước sạch, hoa quả sẵn có hoặc không chuẩn bị lễ vật. Chọn cách phù hợp với hoàn cảnh gia đình." },
      { title: "Kết thúc và kiểm tra", description: "Thu dọn gọn gàng; nếu dùng nến hoặc hương thì không để cháy khi rời khỏi phòng." },
    ],
    checklists: [
      { id: "choose-purpose", label: "Chọn hoạt động phù hợp với mong muốn của gia đình" },
      { id: "tidy-space", label: "Dọn gọn khu vực sinh hoạt" },
      { id: "prepare-optional-items", label: "Chỉ chuẩn bị vật dụng sẵn có nếu gia đình muốn" },
      { id: "finish-safely", label: "Thu dọn và kiểm tra an toàn trước khi rời đi" },
    ],
  },
];

const moods = [
  ["PEACEFUL", "An yên", "Điều gì đang giúp bạn thấy dễ chịu?", "Ghi lại một điều muốn tiếp tục dành chỗ trong ngày mai."],
  ["UNSTABLE", "Chênh vênh", "Điều nào bạn biết chắc trong hiện tại?", "Chọn một việc nhỏ nằm trong khả năng của mình."],
  ["WORRIED", "Băn khoăn", "Bạn cần thêm thông tin gì trước khi quyết định?", "Viết ra một câu hỏi cần được làm rõ."],
  ["IMPATIENT", "Nôn nóng", "Bước nào có thể làm trước mà không cần chờ kết quả?", "Thử dành năm phút cho bước tiếp theo."],
  ["GRATEFUL", "Biết ơn", "Khoảnh khắc hoặc sự giúp đỡ nào bạn muốn ghi nhớ?", "Viết một lời cảm ơn; gửi đi nếu bạn thấy phù hợp."],
  ["NEED_SUPPORT", "Cần điểm tựa", "Ai hoặc điều gì khiến bạn cảm thấy an toàn hơn?", "Nhắn một người bạn tin cậy nếu bạn muốn được lắng nghe."],
  ["PRESSURED", "Áp lực", "Việc nào cần làm hôm nay, việc nào có thể chờ?", "Chọn một việc vừa sức và tạm gác một việc chưa cần."],
  ["LONELY", "Cô đơn", "Ai khiến bạn thấy thoải mái khi nghĩ đến?", "Gửi một lời hỏi thăm ngắn hoặc chọn một hoạt động bạn thích."],
  ["HAPPY", "Vui vẻ", "Bạn muốn lưu giữ điều gì trong niềm vui này?", "Chụp ảnh hoặc ghi một dòng về khoảnh khắc, nếu muốn."],
  ["OTHER", "Mông lung", "Điều gì vẫn chưa rõ và có thể để đó thêm một lúc?", "Viết một bước thử nhỏ, chưa cần quyết định toàn bộ."],
];

const contexts = [
  ["general", "general", "", ""],
  ["study", "study", "việc học", "Chọn một câu hỏi hoặc phần bài cần làm rõ."],
  ["work", "work", "công việc", "Xác định bước kế tiếp và điều kiện còn thiếu."],
  ["family", "family", "gia đình", "Chọn một lời hỏi thăm hoặc khoảng lắng nghe phù hợp."],
  ["relationship", "relationship", "mối quan hệ", "Ghi lại nhu cầu và ranh giới bạn muốn được tôn trọng."],
];

const signals = moods.flatMap(([mood, label, question, action]) => contexts.map(([contextKey, contextSlug, contextLabel, contextAction]) => {
  const source = `mvp-draft-${String(mood).toLowerCase()}-${contextSlug}`;
  const focus = contextLabel ? ` trong ${contextLabel}` : "";
  const response = contextAction || action;
  const content = {
    metadata: {
      contentKind: "editorial",
      contentType: "GROUP_AUTHORED",
      contentAuthor: "",
      contentRightsBasis: "",
      sources: [],
      quotationVerified: false,
      editorialNote: "Bản thảo nguyên bản do nhóm biên soạn; không phải trích dẫn dân gian hay tư vấn chuyên môn. Chưa được duyệt.",
    },
    moodDesc: `Một lời gợi mở cho cảm xúc ${String(label).toLowerCase()}.`,
    badge: "BẢN THẢO CHỜ NHÓM RÀ SOÁT",
    poem: { line1: `Một lời nhắc dành cho ${String(label).toLowerCase()}`, line2: "Bạn có thể chọn điều phù hợp với mình.", subtext: "Lời biên soạn nội bộ, không phải câu trích dẫn." },
    research: { title: "NỘI DUNG NGUYÊN BẢN", source: "Nhóm biên soạn", region: "", note: "Không phải ca dao, câu trích dân gian hay tư vấn chuyên môn." },
    reflection: { title: "Một câu hỏi để tự suy ngẫm", highlightWord: String(label).toLowerCase(), content: `Bạn đang cảm thấy ${String(label).toLowerCase()}${focus}. ${question}`, advice: response, signalNumber: source },
    action: { title: "Một việc nhỏ tùy chọn", duration: "Tùy bạn", description: response, buttonLabel: "Đánh dấu đã thực hiện", tag: "GỢI Ý TỰ NGUYỆN" },
    artwork: { tag: "Không dùng ảnh", caption: "Nội dung chữ nguyên bản; chưa gắn tài sản hình ảnh." },
    loadingFacts: { breathingText: "Dừng lại trong ít phút nếu thấy phù hợp.", thoughtTitle: "GỢI MỞ", thoughtContent: question, originTitle: "GHI CHÚ BIÊN TẬP", originContent: "Bản thảo nguyên bản của nhóm, đang chờ rà soát.", stepText: response },
    guestPreview: { title: "LỜI GỢI MỞ", message: "Bạn có thể bỏ qua gợi ý nếu nó không phù hợp với mình." },
  };
  return { source, mood, title: `Bản thảo · ${label}${contextLabel ? ` · ${contextLabel}` : ""}`, category: "editorial-draft", context_key: contextKey, content };
}));

module.exports = { culture, rituals, signals };
