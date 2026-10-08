const repository = require("../repositories/xin-keo.repository");
const ApiError = require("../utils/api-error");
const { pickVerifiedProverb, toProverbDto } = require("./proverb.service");

const OUTCOMES = {
  YES: { type: "nhat-am-nhat-duong", title: "Nhất Âm Nhất Dương", statusLabel: "Được keo · Hòa hợp", meaning: "Một mặt âm và một mặt dương biểu trưng cho thế cân bằng.", guidance: "Có thể tiến thêm một bước nhỏ, đồng thời vẫn cân nhắc dữ kiện thực tế." },
  UNCLEAR: { type: "nhi-duong", title: "Nhị Dương", statusLabel: "Khoan vội", meaning: "Hai mặt dương được xem như tín hiệu chưa rõ ràng.", guidance: "Nên dừng lại, làm rõ câu hỏi và kiểm tra thêm thông tin trước khi quyết định." },
  NO: { type: "nhi-am", title: "Nhị Âm", statusLabel: "Cần tĩnh xét", meaning: "Hai mặt âm gợi ý việc đang hỏi chưa thuận ở thời điểm này.", guidance: "Không nên ép kết quả; hãy xem lại mục tiêu, rủi ro và lời khuyên từ người đáng tin cậy." },
};

const PROVERB_CATEGORIES = {
  YES: ["Đức tính", "Tình cảm"],
  UNCLEAR: ["Bài học cuộc sống"],
  NO: ["Bài học cuộc sống"],
};

function castPieces(random = Math.random) {
  const left = random() < 0.5 ? "am" : "duong";
  const right = random() < 0.5 ? "am" : "duong";
  const result = left !== right ? "YES" : left === "duong" ? "UNCLEAR" : "NO";
  return { left, right, result };
}

function toPublicThrow(item) {
  return { id: item.id, throwNumber: item.throw_number, piece1: item.left_side, piece2: item.right_side, result: item.result, ...OUTCOMES[item.result], proverb: toProverbDto(item.proverbs), disclaimer: "Kết quả chỉ dùng để chiêm nghiệm văn hóa, không phải dự đoán hay quyết định thay bạn." };
}

function toPublicSession(session) {
  return { id: session.id, question: session.question, finalResult: session.final_result, createdAt: session.created_at, throws: session.xin_keo_throws.map(toPublicThrow) };
}

async function createSession(userId, question) {
  return toPublicSession(await repository.createSession({ user_id: userId, question }));
}

async function throwKeo(userId, sessionId) {
  const session = await repository.findSession(sessionId, userId);
  if (!session) throw new ApiError(404, "Xin keo session not found");
  if (session.xin_keo_throws.length >= 3) throw new ApiError(409, "A xin keo session is limited to three throws");
  const cast = castPieces();
  const proverb = await pickVerifiedProverb({
    categories: PROVERB_CATEGORIES[cast.result],
    excludeIds: session.xin_keo_throws.map((item) => item.proverb_id).filter(Boolean),
  });
  return toPublicThrow(await repository.createThrowAndUpdateSession(session, {
    session_id: session.id,
    throw_number: session.xin_keo_throws.length + 1,
    left_side: cast.left,
    right_side: cast.right,
    result: cast.result,
    proverb_id: proverb?.id || null,
  }));
}

async function listSessions(userId) { return (await repository.listSessions(userId)).map(toPublicSession); }

module.exports = { OUTCOMES, castPieces, createSession, throwKeo, listSessions };
