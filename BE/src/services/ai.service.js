const env = require("../config/env");
const logger = require("../utils/logger");

const FORBIDDEN_CLAIMS = /tai nạn đẫm máu|chết chóc|vong bám|tam tai tán gia|giải hạn tiền triệu|chắc chắn sẽ|chẩn đoán|bệnh lý/i;

function parseGeneratedText(payload) {
  const text = payload?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();
  if (!text) return null;

  try {
    const value = JSON.parse(text);
    if (
      typeof value.reflection !== "string" ||
      typeof value.actionTitle !== "string" ||
      typeof value.actionDescription !== "string"
    ) return null;

    const fields = [value.reflection, value.actionTitle, value.actionDescription];
    if (fields.some((field) => field.length > 700 || FORBIDDEN_CLAIMS.test(field))) return null;
    return {
      reflection: value.reflection,
      actionTitle: value.actionTitle,
      actionDescription: value.actionDescription,
    };
  } catch {
    return null;
  }
}

async function enrichSignal(signal, { mood, contextKey }) {
  if (!env.GEMINI_API_KEY || contextKey === "general") {
    return { signal, aiUsed: false };
  }

  const contextLabel = {
    study: "học tập",
    work: "công việc",
    family: "gia đình",
    relationship: "tình cảm",
  }[contextKey];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.GEMINI_MODEL)}:generateContent`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": env.GEMINI_API_KEY,
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Viết lời gợi mở tinh thần bằng tiếng Việt cho người chọn cảm xúc "${mood}" và chủ đề "${contextLabel}". Chỉ dựa vào hai lựa chọn này; không đưa ra lời tiên đoán, chẩn đoán sức khỏe, phán xét, ép buộc hay yêu cầu chi tiền. Không giả làm ca dao hoặc trích dẫn dân gian. Trả đúng JSON với ba chuỗi reflection, actionTitle, actionDescription. reflection tối đa 450 ký tự; actionTitle tối đa 80; actionDescription tối đa 240.`,
            }],
          }],
          generationConfig: { responseMimeType: "application/json", temperature: 0.5 },
        }),
      },
    );
    if (!response.ok) return { signal, aiUsed: false };
    const generated = parseGeneratedText(await response.json());
    if (!generated) return { signal, aiUsed: false };

    return {
      aiUsed: true,
      signal: {
        ...signal,
        aiExplanation: {
          provider: "gemini",
          reflection: generated.reflection,
          action: {
            title: generated.actionTitle,
            description: generated.actionDescription,
          },
        },
      },
    };
  } catch (error) {
    logger.warn("Gemini mood enrichment unavailable; using curated signal", {
      reason: error.name === "AbortError" ? "timeout" : "provider_error",
    });
    return { signal, aiUsed: false };
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = { enrichSignal, parseGeneratedText, FORBIDDEN_CLAIMS };
