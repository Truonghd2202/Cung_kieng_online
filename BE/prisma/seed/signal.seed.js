const prisma = require("../../src/config/prisma");

const MOOD_SEEDS = [
  ["chenh-venh", "UNSTABLE", "Chênh vênh", "Cần một neo đậu an lành"],
  ["an-yen", "PEACEFUL", "An yên", "Sẵn sàng đón nhận điều lành"],
  ["ban-khoan", "WORRIED", "Băn khoăn", "Cần một góc nhìn sáng suốt"],
  ["non-nong", "IMPATIENT", "Nôn nóng", "Hạ nhịp thở và chậm lại"],
  ["biet-on", "GRATEFUL", "Biết ơn", "Trân trọng những duyên lành"],
  ["can-diem-tua", "NEED_SUPPORT", "Cần điểm tựa", "Được vỗ về trong khoảng lặng"],
];

function signalContent(moodLabel, moodDescription, index) {
  return {
    moodDesc: moodDescription,
    badge: "BƯỚC 4 / 4 • CHIÊM NGHIỆM TRỌN VẸN",
    poem: {
      line1: `${moodLabel} lắng nghe nhịp thở hiền hòa`,
      line2: "Một niềm an tĩnh nở trong tâm.",
      subtext: "Nội dung biên soạn minh họa",
    },
    research: {
      title: "VÙNG 2 • TƯ LIỆU THAM KHẢO",
      source: "Tin Lâm Tâm Linh",
      region: "Không gian văn hóa truyền thống Việt Nam",
      note: "Nội dung gợi ý chiêm nghiệm, không thay thế tư vấn chuyên môn.",
    },
    reflection: {
      title: "VÙNG 3 • Góc Nhìn Soi Tỏ Tâm Thức",
      highlightWord: moodLabel.toLowerCase(),
      content: `Hãy để cảm xúc ${moodLabel.toLowerCase()} được hiện diện mà không cần phán xét. Một khoảng dừng ngắn có thể mở ra góc nhìn dịu dàng hơn cho bạn.`,
      advice: "Gợi ý tiếp nhận: đặt tay lên ngực và thở chậm ba lần",
      signalNumber: `Chiêm nghiệm máy chủ #${index}`,
    },
    action: {
      title: "Trở về với một hơi thở",
      duration: "2 PHÚT",
      description: "Ngồi yên, hít vào chậm và thở ra dài hơn một chút.",
      buttonLabel: "Đánh dấu đã thực hiện hành động này ✓",
      tag: "VÙNG 4 • HÀNH ĐỘNG NUÔI TÂM",
    },
    artwork: {
      tag: "Không gian an trú",
      image: "/images/tea_bowl.jpg",
      caption: "Một khoảng lặng để trở về với chính mình",
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
  let index = 1000;
  for (const [prefix, mood, moodLabel, moodDescription] of MOOD_SEEDS) {
    for (let variant = 1; variant <= 2; variant += 1) {
      const source = `${prefix}-${variant}`;
      const content = signalContent(moodLabel, moodDescription, index++);
      const existing = await prisma.signals.findFirst({ where: { source } });

      if (existing) {
        await prisma.signals.update({
          where: { id: existing.id },
          data: { content: JSON.stringify(content), mood, title: `${moodLabel} · ${variant}`, advice: content.reflection.advice, active: true },
        });
      } else {
        await prisma.signals.create({
          data: { source, mood, title: `${moodLabel} · ${variant}`, content: JSON.stringify(content), advice: content.reflection.advice, category: "daily", active: true },
        });
      }
    }
  }
}

module.exports = { seedSignals };
