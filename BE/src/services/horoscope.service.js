const env = require("../config/env");
const prisma = require("../config/prisma");
const { getMembership } = require("./payment.service");
const ApiError = require("../utils/api-error");
const { FORBIDDEN_CLAIMS } = require("./ai.service");
function parseYearlyReading(payload) {
  try {
    const raw = payload?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("");
    const result = JSON.parse(raw);
    if (!Array.isArray(result.sections) || result.sections.length < 3 || result.sections.length > 8) return null;
    if (result.sections.some((section) => typeof section.title !== "string" || typeof section.body !== "string" || !section.title.trim() || section.title.length > 120 || section.body.length < 30 || section.body.length > 1500 || FORBIDDEN_CLAIMS.test(`${section.title} ${section.body}`))) return null;
    return { sections: result.sections.map(({ title, body }) => ({ title, body })), disclaimer: "Diễn giải AI để tự suy ngẫm theo năm; không phải lá số tử vi được tính toán hay dự báo chắc chắn tương lai." };
  } catch { return null; }
}
async function generateYearly(userId, input) {
  if (!(await getMembership(userId)).subscription) throw new ApiError(403, "Cần hội viên Tâm An đang hoạt động để nhận diễn giải theo năm.");
  if (!env.GEMINI_API_KEY) throw new ApiError(503, "Dịch vụ diễn giải AI chưa được cấu hình.");
  const target = new Date(Date.UTC(input.year, 0, 1));
  // Limit paid provider calls per account independently from general API quotas.
  const reservation = await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM users WHERE id = ${userId}::uuid FOR UPDATE`;
    if (await tx.horoscope_readings.count({ where: { user_id: userId, period_type: "YEARLY", created_at: { gte: new Date(Date.now() - 86400000) } } }) >= 3) throw new ApiError(429, "Bạn đã dùng đủ 3 lượt tạo trong 24 giờ. Hãy đọc lại những bản đã lưu.");
    return tx.horoscope_readings.create({ data: { user_id: userId, period_type: "YEARLY", target_date: target, content: "{}", model: env.GEMINI_MODEL, prompt_version: "yearly-reflection-pending" } });
  });
  let response;
  try {
    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.GEMINI_MODEL)}:generateContent`, {
      method: "POST", headers: { "content-type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY }, signal: AbortSignal.timeout(15000),
      body: JSON.stringify({ contents: [{ parts: [{ text: `Viết lời chiêm nghiệm tiếng Việt theo năm ${input.year}, dành cho người sinh ngày ${input.birthDate}. Trả JSON {sections:[{title,body}]} gồm 4 phần về học tập/công việc, quan hệ, chăm sóc bản thân và việc thiện. Dùng ngôn ngữ gợi mở thực tế; không tự nhận đã tính lá số, không dự đoán vận hạn hay khẳng định tính cách từ ngày sinh, không chẩn đoán y tế, không tư vấn đầu tư, không hù dọa hoặc ép trả tiền. Mỗi phần tối đa 1000 ký tự.` }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.4 } }),
    });
  } catch { throw new ApiError(503, "Dịch vụ AI đang bận, vui lòng thử lại sau."); }
  if (!response.ok) throw new ApiError(503, "Dịch vụ AI tạm thời chưa sẵn sàng.");
  const reading = parseYearlyReading(await response.json());
  if (!reading) throw new ApiError(503, "Bản diễn giải chưa đạt kiểm tra nội dung. Vui lòng thử lại sau.");
  const record = await prisma.horoscope_readings.update({ where: { id: reservation.id }, data: { content: JSON.stringify(reading), prompt_version: "yearly-reflection-v1" } });
  return { id: record.id, year: input.year, ...reading };
}
async function listYearly(userId) {
  const rows = await prisma.horoscope_readings.findMany({ where: { user_id: userId, prompt_version: "yearly-reflection-v1" }, orderBy: { created_at: "desc" }, take: 20 });
  return rows.map((row) => ({ id: row.id, year: row.target_date.getUTCFullYear(), ...JSON.parse(row.content) }));
}
module.exports = { generateYearly, listYearly, parseYearlyReading };
