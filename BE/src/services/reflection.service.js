const xinXamRepository = require("../repositories/xin-xam.repository");
const wishRepository = require("../repositories/wish.repository");
const ApiError = require("../utils/api-error");
const { pickVerifiedProverb, toProverbDto } = require("./proverb.service");

const REGION_TO_DB = {
  "Bắc Bộ": "NORTH",
  "Trung Bộ": "CENTRAL",
  "Nam Bộ": "SOUTH",
};

const DB_TO_REGION = { NORTH: "Bắc Bộ", CENTRAL: "Trung Bộ", SOUTH: "Nam Bộ", NATIONWIDE: "Toàn quốc" };

function fortuneGroup(level) {
  if (["Đại Cát", "Thượng Cát", "Trung Cát", "Tiểu Cát"].includes(level)) return "CAT";
  if (["Hung", "Đại Hung"].includes(level)) return "CAUTION";
  return "NEUTRAL";
}

function fortuneRank(level) {
  if (["Đại Cát", "Thượng Cát"].includes(level)) return "Thượng Xăm";
  if (["Trung Cát", "Tiểu Cát", "Bình"].includes(level)) return "Trung Xăm";
  return "Hạ Xăm";
}

function proverbCategoriesForFortune(level) {
  if (fortuneGroup(level) === "CAT") return ["Đức tính", "Bài học cuộc sống"];
  if (fortuneGroup(level) === "CAUTION") return ["Bài học cuộc sống"];
  return ["Bài học cuộc sống", "Đức tính"];
}

function toXamItem(draw) {
  const classification = draw.xin_xam.fortune_level || "Bình";
  const warning = fortuneGroup(classification) === "CAUTION"
    ? "Đây là lời nhắc thận trọng, không phải dự báo tai họa. Không đưa ra quyết định sức khỏe, pháp lý, tài chính hoặc an toàn chỉ dựa trên thẻ xăm."
    : "Hãy đối chiếu lời luận với hoàn cảnh thực tế và không xem kết quả là lời phán quyết.";
  return {
    id: draw.id,
    drawId: draw.id,
    stickNumber: String(draw.xin_xam.stick_number).padStart(2, "0"),
    fortuneType: classification,
    classification,
    rank: fortuneRank(classification),
    classificationGroup: fortuneGroup(classification),
    category: draw.xin_xam.category || draw.xin_xam.xam_type,
    region: DB_TO_REGION[draw.xin_xam.region] || draw.xin_xam.region,
    quote: draw.xin_xam.poem || draw.xin_xam.meaning || "",
    meaning: draw.xin_xam.meaning || "",
    advice: draw.xin_xam.advice || "",
    interpretation: {
      summary: draw.xin_xam.meaning || "",
      recommendation: draw.xin_xam.advice || "",
      warning,
    },
    proverb: toProverbDto(draw.proverbs),
    source: draw.xin_xam.source,
    verified: draw.xin_xam.verified,
    disclaimer: "Thông tin chỉ dùng để tham khảo và chiêm nghiệm văn hóa; không cổ súy mê tín, không dự đoán chắc chắn tương lai.",
    date: new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }).format(draw.created_at),
    createdAt: draw.created_at.getTime(),
    starred: draw.starred,
  };
}

function toWishItem(wish) {
  return {
    id: wish.id,
    category: wish.category || "Khác",
    content: wish.content,
    date: new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }).format(wish.created_at),
    createdAt: wish.created_at.getTime(),
    sealed: wish.is_sealed,
    starred: wish.starred,
  };
}

async function saveXamDraw(userId, input) {
  if (input.drawId) {
    const existing = await xinXamRepository.findDraw(input.drawId, userId);
    if (!existing) throw new ApiError(404, "Xin xam draw not found");
    return toXamItem(existing);
  }
  const region = REGION_TO_DB[input.region] || "NATIONWIDE";
  const catalog = await xinXamRepository.upsertCatalog({
    stick_number: input.stickNumber,
    xam_type: input.xamType,
    region,
    category: input.category || input.xamType,
    fortune_level: input.fortuneType || "Thượng Cát",
    poem: input.quote || null,
    meaning: input.quote || null,
    verified: false,
    active: true,
  });
  const proverb = await pickVerifiedProverb({ categories: proverbCategoriesForFortune(catalog.fortune_level) });
  const draw = await xinXamRepository.createDraw({
    user_id: userId,
    xin_xam_id: catalog.id,
    proverb_id: proverb?.id || null,
    question: input.question || null,
  });
  return toXamItem(draw);
}

async function drawXam(userId, input) {
  const region = REGION_TO_DB[input.region];
  const cards = await xinXamRepository.listCatalog(`${region}:${input.topic}`, region);
  if (cards.length === 0) throw new ApiError(404, "No xin xam card is available for this selection");
  const card = cards[Math.floor(Math.random() * cards.length)];
  const proverb = await pickVerifiedProverb({ categories: proverbCategoriesForFortune(card.fortune_level) });
  const draw = await xinXamRepository.createDraw({ user_id: userId, xin_xam_id: card.id, proverb_id: proverb?.id || null, question: input.question || null, ai_explanation: card.advice });
  return {
    ...toXamItem(draw),
  };
}

async function listSavedXam(userId) {
  return (await xinXamRepository.listDraws(userId)).map(toXamItem);
}

async function updateXamStar(userId, id, starred) {
  const updated = await xinXamRepository.updateStar(id, userId, starred);
  if (updated.count !== 1) throw new ApiError(404, "Saved xin xam not found");
  return toXamItem(await xinXamRepository.findDraw(id, userId));
}

async function deleteXam(userId, id) {
  const deleted = await xinXamRepository.remove(id, userId);
  if (deleted.count !== 1) throw new ApiError(404, "Saved xin xam not found");
}

async function listWishes(userId) {
  return (await wishRepository.listForUser(userId)).map(toWishItem);
}

async function createWish(userId, input) {
  return toWishItem(await wishRepository.create({ user_id: userId, content: input.content, category: input.category || null }));
}

async function updateWishStar(userId, id, starred) {
  const updated = await wishRepository.update(id, userId, { starred });
  if (updated.count !== 1) throw new ApiError(404, "Saved wish not found");
  return toWishItem(await wishRepository.findForUser(id, userId));
}

async function deleteWish(userId, id) {
  const deleted = await wishRepository.remove(id, userId);
  if (deleted.count !== 1) throw new ApiError(404, "Saved wish not found");
}

module.exports = { drawXam, saveXamDraw, listSavedXam, updateXamStar, deleteXam, listWishes, createWish, updateWishStar, deleteWish };
