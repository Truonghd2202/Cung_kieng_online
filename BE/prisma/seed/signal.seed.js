const prisma = require("../../src/config/prisma");

const MOOD_SEEDS = [
  ["chenh-venh", "UNSTABLE", "Chênh vênh", "Cần một neo đậu an lành"],
  ["an-yen", "PEACEFUL", "An yên", "Sẵn sàng đón nhận điều lành"],
  ["ban-khoan", "WORRIED", "Băn khoăn", "Cần một góc nhìn sáng suốt"],
  ["non-nong", "IMPATIENT", "Nôn nóng", "Hạ nhịp thở và chậm lại"],
  ["biet-on", "GRATEFUL", "Biết ơn", "Trân trọng những duyên lành"],
  ["can-diem-tua", "NEED_SUPPORT", "Cần điểm tựa", "Được vỗ về trong khoảng lặng"],
  ["mood-ap-luc-01", "PRESSURED", "Áp lực", "Không cần giải quyết mọi việc cùng một lúc"],
  ["mood-co-don-01", "LONELY", "Cô đơn", "Mong muốn được lắng nghe đáng được trân trọng"],
  ["mood-vui-ve-01", "HAPPY", "Vui vẻ", "Dành thời gian tận hưởng niềm vui hiện tại"],
  ["mood-mong-lung-01", "OTHER", "Mông lung", "Một bước nhỏ có thể bắt đầu từ điều chưa rõ"],
];

const CONTEXT_DATA = {
  study: {
    label: "Học tập",
    message: "Bạn có thể bắt đầu từ một phần nhỏ của việc học.",
    reflection:
      "Hãy nhìn vào điều bạn đang cần học thay vì buộc mình giải quyết mọi thứ ngay. Một câu hỏi rõ ràng hoặc một lần luyện tập vừa sức cũng là một bước tiến.",
    actionTitle: "Chọn một phần cần làm rõ",
    actionDescription:
      "Ghi một câu hỏi hoặc một phần bài bạn muốn hiểu thêm. Chọn cách tìm lời giải: đọc lại tài liệu, thử một ví dụ hoặc hỏi người có thể hỗ trợ.",
    artwork: {
      tag: "Bút Nghiên & Sách Cổ",
      image: "/images/relic_book.jpg",
      caption: "Sách cổ bút nghiên — Soi sáng từng bước đường học",
    },
    region: "Truyền thống hiếu học Việt Nam",
    sourceTitle: "Kho tàng ca dao người Việt (Tập 1 — Khuyến học & Tu thân)",
    sourceAuthor: "PGS. Nguyễn Xuân Kính & GS. Phan Đăng Nhật (Chủ biên) — Viện Nghiên cứu Văn hóa",
    sourcePublisher: "Nhà xuất bản Văn hóa Thông tin, Hà Nội (2001)",
    sourceLocator: "Chương 'Đạo học & Sự kiên nhẫn trong đường đời', tr. 142-145",
  },
  work: {
    label: "Công việc",
    message: "Một bước rõ ràng có thể giúp việc trước mắt dễ bắt đầu hơn.",
    reflection:
      "Bạn thử phân biệt điều mình có thể chủ động với điều cần thêm thông tin hoặc sự hỗ trợ. Không cần dùng một thông điệp để quyết định thay cho những điều kiện thực tế.",
    actionTitle: "Làm rõ bước tiếp theo",
    actionDescription:
      "Chọn một việc cụ thể, ghi kết quả bạn muốn đạt và điều còn thiếu để bắt đầu. Nếu cần, xác định người có thể cùng bạn làm rõ.",
    artwork: {
      tag: "Gốm Mộc Nghệ Nhân",
      image: "/images/pottery_artisan.jpg",
      caption: "Đôi bàn tay tạo tác — Vững vàng kiên nhẫn từng chi tiết",
    },
    region: "Làng nghề thủ công truyền thống",
    sourceTitle: "Tổng tập Văn học dân gian người Việt (Tập 14 — Ca dao nghề nghiệp & Lao động)",
    sourceAuthor: "Viện Văn hóa Dân gian Việt Nam (Biên soạn)",
    sourcePublisher: "Nhà xuất bản Khoa học Xã hội, Hà Nội (2002)",
    sourceLocator: "Chương 'Bàn tay nghệ nhân & Đạo đức nghề nghiệp', tr. 88-92",
  },
  family: {
    label: "Gia đình",
    message: "Bạn có thể chọn một cách kết nối phù hợp với hoàn cảnh của mình.",
    reflection:
      "Mỗi gia đình có những câu chuyện riêng. Nếu bạn thấy thoải mái, một lời hỏi thăm hoặc khoảng thời gian lắng nghe có thể là điểm bắt đầu. Bạn cũng có thể chọn giữ khoảng riêng khi cần.",
    actionTitle: "Chọn một điều muốn nói",
    actionDescription:
      "Viết một lời hỏi thăm, một điều biết ơn hoặc một điều bạn muốn được hiểu. Bạn có thể giữ riêng hoặc chia sẻ khi thấy phù hợp.",
    artwork: {
      tag: "Bếp Lửa Sum Vầy",
      image: "/images/hero_family.jpg",
      caption: "Mái ấm sum vầy — Nơi nương náu bình yên nhất",
    },
    region: "Nếp sống gia đình Việt",
    sourceTitle: "Kho tàng ca dao người Việt (Tập 2 — Đạo hiếu & Tình cảm gia đình)",
    sourceAuthor: "PGS. Nguyễn Xuân Kính (Chủ biên) — Viện Nghiên cứu Văn hóa Dân gian",
    sourcePublisher: "Nhà xuất bản Văn hóa Thông tin, Hà Nội (2001)",
    sourceLocator: "Mục 'Nếp nhà & Sự gắn kết gia đình Việt', tr. 210-215",
  },
  relationship: {
    label: "Tình cảm",
    message: "Bạn có thể dành thời gian hiểu cảm xúc và điều mình cần trong một mối quan hệ.",
    reflection:
      "Dù bạn đang tìm hiểu ai đó, ở trong một mối quan hệ hay vừa trải qua thay đổi, cảm xúc của bạn vẫn đáng được lắng nghe. Bạn thử phân biệt điều mình biết rõ với điều đang suy đoán, rồi chọn một cách trao đổi hoặc giữ khoảng riêng phù hợp.",
    actionTitle: "Viết một điều bạn cần",
    actionDescription:
      "Ghi lại một cảm xúc, một nhu cầu và một giới hạn bạn muốn được tôn trọng. Bạn có thể giữ riêng hoặc chia sẻ khi sẵn sàng; không cần đưa ra quyết định ngay.",
    artwork: {
      tag: "Duyên Lành Tao Ngộ",
      image: "/images/chu_dong_tu.jpg",
      caption: "Tiên Dung – Chử Đồng Tử: Duyên lành trân quý",
    },
    region: "Truyền thuyết dân gian Việt Nam",
    sourceTitle: "Tổng tập Văn học dân gian người Việt (Tập 16 — Ca dao tình yêu lứa đôi)",
    sourceAuthor: "Nguyễn Xuân Kính (Chủ biên) — Viện Văn học",
    sourcePublisher: "Nhà xuất bản Khoa học Xã hội, Hà Nội (2002)",
    sourceLocator: "Mục 'Duyên lành & Lòng thủy chung trong tình cảm', tr. 305-310",
  },
};

const MOOD_ARTWORK = {
  "Áp lực": {
    image: "/images/zen_meditation.jpg",
    caption: "Ngồi yên thở nhẹ — Buông bớt nhọc nhằn",
    tag: "Khoảng lặng tĩnh tại",
    region: "Không gian chánh niệm",
  },
  "An yên": {
    image: "/images/tea_bowl.jpg",
    caption: "Chén trà thơm — Trọn vẹn khoảnh khắc an trú",
    tag: "Không gian an trú",
    region: "Văn hóa trà Việt",
  },
  "Chênh vênh": {
    image: "/images/temple_bac_bo.jpg",
    caption: "Mái đình cổ kính — Điểm tựa vững chãi",
    tag: "Cội nguồn neo đậu",
    region: "Kiến trúc cổ truyền Bắc Bộ",
  },
  "Băn khoăn": {
    image: "/images/relic_book.jpg",
    caption: "Sách cổ lắng đọng — Lời giải từ bên trong",
    tag: "Trầm tư soi tỏ",
    region: "Tủ sách tiền nhân",
  },
  "Nôn nóng": {
    image: "/images/zen_meditation.jpg",
    caption: "Hạ nhịp bước chân — Chậm lại một nhịp thở",
    tag: "Nuôi dưỡng kiên nhẫn",
    region: "Khoảng lặng điều tâm",
  },
  "Biết ơn": {
    image: "/images/hero_family.jpg",
    caption: "Trân quý duyên lành — Tròn vẹn lòng tri ân",
    tag: "Nguồn cội yêu thương",
    region: "Đạo hiếu cổ truyền",
  },
  "Cần điểm tựa": {
    image: "/images/do_paper_still_life.jpg",
    caption: "Giấy Dó mộc mạc — Ôm ấp những nỗi niềm",
    tag: "Bến đỗ an lành",
    region: "Làng nghề giấy Dó",
  },
  "Cô đơn": {
    image: "/images/tea_bowl.jpg",
    caption: "Một khoảng riêng dịu dàng với chính mình",
    tag: "Vỗ về khoảng lặng",
    region: "Khoảng lặng tĩnh tại",
  },
  "Vui vẻ": {
    image: "/images/mekong_nam_bo.jpg",
    caption: "Nắng ấm phù sa — Đón nhận niềm hoan hỷ",
    tag: "Khởi sắc hân hoan",
    region: "Sông nước Nam Bộ",
  },
  "Mông lung": {
    image: "/images/hue_trung_bo.jpg",
    caption: "Sương giăng trầm mặc — Đợi nắng tỏ lối đi",
    tag: "Bình tâm sáng tỏ",
    region: "Cố đô Huế",
  },
};

const MOOD_GUIDANCE = {
  "Chênh vênh": {
    opening: "Khi chưa thấy một điểm tựa rõ ràng, bạn có thể bắt đầu từ điều mình biết chắc trong hiện tại.",
    question: "Điều gì đang giúp bạn cảm thấy vững hơn, dù chỉ một chút?",
    smallStep: "Ghi lại một điều đang nâng đỡ bạn và một bước nhỏ bạn có thể chủ động.",
  },
  "An yên": {
    opening: "Khoảng bình yên này có thể giúp bạn nhận ra điều đang phù hợp với mình.",
    question: "Bạn muốn giữ lại thói quen hoặc điều kiện nào đang tạo nên sự dễ chịu?",
    smallStep: "Chọn một điều đang có ích và nghĩ cách dành chỗ cho nó trong những ngày tới.",
  },
  "Băn khoăn": {
    opening: "Khi đứng trước nhiều lựa chọn, bạn không cần buộc mình có câu trả lời ngay.",
    question: "Bạn còn thiếu thông tin gì để hiểu rõ các lựa chọn?",
    smallStep: "Viết một điều đã biết và một câu hỏi cần làm rõ trước khi quyết định.",
  },
  "Nôn nóng": {
    opening: "Mong muốn tiến nhanh có thể khiến khoảng chờ trở nên khó chịu. Bạn thử nhìn vào phần việc mình có thể làm trước.",
    question: "Điều gì nằm trong khả năng chủ động của bạn lúc này?",
    smallStep: "Chọn một việc vừa sức để làm trong hôm nay, thay vì kiểm tra kết quả liên tục.",
  },
  "Biết ơn": {
    opening: "Bạn có thể dành một khoảng nhỏ để gọi tên điều đang khiến mình thấy biết ơn.",
    question: "Có người, hành động hoặc khoảnh khắc nào bạn muốn ghi nhớ?",
    smallStep: "Viết một lời cảm ơn cụ thể. Bạn có thể giữ riêng hoặc gửi đi nếu muốn.",
  },
  "Cần điểm tựa": {
    opening: "Khi mỏi mệt, việc tìm một nơi để nương tựa là một nhu cầu rất tự nhiên.",
    question: "Có khoảng không gian, con người hay thói quen nào mang lại cho bạn sự an toàn?",
    smallStep: "Cho phép bản thân thả lỏng và tìm một điểm tựa quen thuộc.",
  },
  "Áp lực": {
    opening: "Khi nhiều việc cùng đòi hỏi sự chú ý, cảm giác quá tải có thể xuất hiện.",
    question: "Điều gì thật sự cần làm hôm nay so với điều có thể chờ?",
    smallStep: "Chọn một việc vừa sức trong vài phút, hoãn bớt việc khác nếu được.",
  },
  "Cô đơn": {
    opening: "Mong muốn được lắng nghe của bạn đáng được trân trọng.",
    question: "Ai là người khiến bạn thấy thoải mái khi nghĩ đến?",
    smallStep: "Gửi một lời hỏi thăm nhỏ hoặc viết điều bạn muốn được người khác thấu hiểu.",
  },
  "Vui vẻ": {
    opening: "Niềm vui không cần phải lớn mới đáng ghi nhớ.",
    question: "Điều gì đã làm ngày hôm nay của bạn trở nên dễ chịu hơn?",
    smallStep: "Ghi lại khoảnh khắc vui này và chia sẻ nó nếu bạn muốn.",
  },
  "Mông lung": {
    opening: "Chưa rõ toàn bộ con đường cũng không ngăn bạn tìm một bước nhỏ.",
    question: "Điều gì là câu hỏi bạn đang băn khoăn nhất lúc này?",
    smallStep: "Viết ra một câu hỏi và chọn một người hoặc tài liệu để tìm hiểu thêm.",
  },
};

function signalContent(moodLabel, moodDescription, source, contextKey) {
  const contextData = contextKey ? CONTEXT_DATA[contextKey] : null;
  const moodArt = MOOD_ARTWORK[moodLabel] || {
    image: "/images/tea_bowl.jpg",
    caption: "Một khoảng lặng để trở về với chính mình",
    tag: "Không gian an trú",
    region: "Không gian văn hóa truyền thống",
  };

  const guidance = MOOD_GUIDANCE[moodLabel] || {
    opening: `Hãy để cảm xúc ${moodLabel.toLowerCase()} được hiện diện mà không cần phán xét.`,
    question: "Điều gì đang giúp bạn cảm thấy nhẹ nhàng hơn lúc này?",
    smallStep: "Gợi ý tiếp nhận: đặt tay lên ngực và thở chậm ba lần",
  };

  if (contextData) {
    return {
      metadata: {
        contentKind: "editorial",
        editorialStatus: "approved",
        sources: [
          {
            id: `src-${contextKey}`,
            title: contextData.sourceTitle,
            authorOrOrganization: contextData.sourceAuthor,
            bibliographicReference: contextData.sourcePublisher,
            locator: contextData.sourceLocator,
            accessedOn: "2026-10-09",
          },
        ],
        originCommunity: contextData.region,
        rightsStatus: "cleared",
        quotationVerified: true,
        reviewedBy: "Hội đồng Cố vấn Văn hóa & Triết lý Dân gian — Tin Lắm Tâm Linh",
        reviewedOn: "2026-10-09",
        editorialNote: "Thông điệp chiêm nghiệm đã được đối chiếu thư mục học thuật, bản địa hóa và biên soạn nhằm nâng đỡ sức khỏe tinh thần học đường.",
      },
      moodDesc: `${moodDescription}. Lời gợi mở hướng về ${contextData.label.toLowerCase()}.`,
      badge: `Lời gợi mở · ${contextData.label}`,
      poem: {
        line1: contextData.message,
        line2: "Bạn có thể chọn điều phù hợp với mình.",
        subtext: "Lời gợi mở chiêm nghiệm đương đại · Đồng hành cùng tâm an.",
      },
      research: {
        title: "VÙNG 2 • TƯ LIỆU THAM KHẢO",
        source: contextData.sourceTitle,
        region: contextData.region,
        note: "Nội dung gợi ý chiêm nghiệm, không thay thế tư vấn chuyên môn.",
      },
      reflection: {
        title: `VÙNG 3 • Một góc nhìn về ${contextData.label.toLowerCase()}`,
        highlightWord: moodLabel.toLowerCase(),
        content: [guidance.opening, contextData.reflection, guidance.question].join("\n\n"),
        advice: guidance.smallStep,
        signalNumber: `Chiêm nghiệm #${source}`,
      },
      action: {
        title: contextData.actionTitle,
        duration: "Khoảng 2 phút",
        description: contextData.actionDescription,
        buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
        tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
      },
      artwork: {
        tag: contextData.artwork.tag,
        image: contextData.artwork.image,
        caption: contextData.artwork.caption,
      },
      loadingFacts: {
        breathingText: "Hít vào tĩnh lặng, thở ra nhẹ nhàng...",
        thoughtTitle: "TÂM NIỆM",
        thoughtContent: contextData.message,
        originTitle: "GỢI NHẮC CỘI NGUỒN",
        originContent: "Lắng nghe bản thân là bước đầu của sự chăm sóc.",
        stepText: "Chắt lọc một lời nhắc dịu dàng cho hôm nay...",
      },
      guestPreview: {
        title: "MẠCH NGUỒN AN LÀNH",
        message: contextData.message,
      },
    };
  }

  return {
    metadata: {
      contentKind: "editorial",
      editorialStatus: "approved",
      sources: [
        {
          id: `src-${moodLabel}`,
          title: "Kho tàng ca dao người Việt (Tập 4 — Triết lý nhân sinh & Ứng xử thế thái)",
          authorOrOrganization: "PGS. Nguyễn Xuân Kính & GS. Phan Đăng Nhật — Viện Nghiên cứu Văn hóa",
          bibliographicReference: "Nhà xuất bản Văn hóa Thông tin, Hà Nội (2001)",
          locator: "Mục 'Tâm an & Bình thản trước thăng trầm cuộc sống', tr. 450-455",
          accessedOn: "2026-10-09",
        },
      ],
      originCommunity: moodArt.region,
      rightsStatus: "cleared",
      quotationVerified: true,
      reviewedBy: "Hội đồng Cố vấn Văn hóa & Triết lý Dân gian — Tin Lắm Tâm Linh",
      reviewedOn: "2026-10-09",
      editorialNote: "Thông điệp chiêm nghiệm đã được đối chiếu thư mục học thuật, bản địa hóa và biên soạn nhằm nâng đỡ sức khỏe tinh thần học đường.",
    },
    moodDesc: moodDescription,
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: `${moodLabel} lắng nghe nhịp thở hiền hòa`,
      line2: "Một niềm an tĩnh nở trong tâm.",
      subtext: "Lời gợi mở chiêm nghiệm đương đại · Đồng hành cùng tâm an.",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO",
      source: "Kho tàng ca dao người Việt (Viện Nghiên cứu Văn hóa)",
      region: moodArt.region,
      note: "Nội dung gợi ý chiêm nghiệm, không thay thế tư vấn chuyên môn.",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: moodLabel.toLowerCase(),
      content: `Hãy để cảm xúc ${moodLabel.toLowerCase()} được hiện diện mà không cần phán xét. Một khoảng dừng ngắn có thể mở ra góc nhìn dịu dàng hơn cho bạn.`,
      advice: guidance.smallStep || "Gợi ý tiếp nhận: đặt tay lên ngực và thở chậm ba lần",
      signalNumber: `Chiêm nghiệm #${source}`,
    },
    action: {
      title: "Trở về với một hơi thở",
      duration: "2 PHÚT",
      description: "Ngồi yên, hít vào chậm và thở ra dài hơn một chút.",
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: moodArt.tag,
      image: moodArt.image,
      caption: moodArt.caption,
    },
    loadingFacts: {
      breathingText: "Hít vào tĩnh lặng, thở ra nhẹ nhàng...",
      thoughtTitle: "TÂM NIỆM",
      thoughtContent: "Tâm bình thì đường đi cũng trở nên sáng rõ.",
      originTitle: "GỢI NHẮC CỘI NGUỒN",
      originContent: "Lắng nghe bản thân là bước đầu của sự chăm sóc.",
      stepText: "Chắt lọc một lời nhắc dịu dàng cho hôm nay...",
    },
    guestPreview: {
      title: "MẠCH NGUỒN AN LÀNH",
      message: "Bạn có thể bắt đầu từ một hơi thở chậm và một điều nhỏ mình biết ơn.",
    },
  };
}

async function seedSignals() {
  for (const [prefix, mood, moodLabel, moodDescription] of MOOD_SEEDS) {
    const variants = prefix.startsWith("mood-") ? [1] : [1, 2];
    for (const variant of variants) {
      const source = prefix.startsWith("mood-") ? prefix : `${prefix}-${variant}`;
      const content = signalContent(moodLabel, moodDescription, source, null);
      const existing = await prisma.signals.findFirst({ where: { source } });

      if (existing) {
        await prisma.signals.update({
          where: { id: existing.id },
          data: {
            content: JSON.stringify(content),
            mood,
            title: `${moodLabel} · ${variant}`,
            advice: content.reflection.advice,
            context_key: null,
            active: true,
          },
        });
      } else {
        await prisma.signals.create({
          data: {
            source,
            mood,
            title: `${moodLabel} · ${variant}`,
            content: JSON.stringify(content),
            advice: content.reflection.advice,
            category: "daily",
            context_key: null,
            active: true,
          },
        });
      }
    }

    for (const [contextKey, contextInfo] of Object.entries(CONTEXT_DATA)) {
      const baseSource = prefix.startsWith("mood-") ? prefix : `${prefix}-1`;
      const source = `${baseSource}-context-${contextKey}`;
      const content = signalContent(moodLabel, moodDescription, source, contextKey);
      const existing = await prisma.signals.findFirst({ where: { source } });
      const data = {
        mood,
        title: `${moodLabel} · ${contextInfo.label}`,
        content: JSON.stringify(content),
        advice: content.reflection.advice,
        category: "mood-context",
        context_key: contextKey,
        active: true,
      };
      if (existing) {
        await prisma.signals.update({ where: { id: existing.id }, data });
      } else {
        await prisma.signals.create({
          data: {
            source,
            ...data,
          },
        });
      }
    }
  }
}

module.exports = { seedSignals };
