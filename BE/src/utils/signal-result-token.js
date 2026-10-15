const jwt = require("jsonwebtoken");
const env = require("../config/env");
const ApiError = require("./api-error");

const ISSUER = "tin-lam-tam-linh-api";
const AUDIENCE = "tin-lam-tam-linh-signal-result";

// Chỉ chứa kết quả công khai, không chứa ghi chú hay tài khoản.
function issueResult(signal) {
  const { resultToken: _old, ...snapshot } = signal;

  const resultToken = jwt.sign(
    { snapshot },
    env.JWT_ACCESS_SECRET,
    {
      algorithm: "HS256",
      issuer: ISSUER,
      audience: AUDIENCE,
      expiresIn: "24h",
    },
  );

  return { ...snapshot, resultToken };
}

function readResult(token) {
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET, {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ["HS256"],
    });

    const snapshot = payload.snapshot;

    if (
      !snapshot ||
      typeof snapshot !== "object" ||
      !snapshot.id ||
      !snapshot.dbId ||
      !snapshot.poem ||
      typeof snapshot.poem.line1 !== "string" ||
      typeof snapshot.poem.line2 !== "string" ||
      !snapshot.action ||
      typeof snapshot.action.title !== "string"
    ) {
      throw new Error("Invalid snapshot");
    }

    return snapshot;
  } catch {
    throw new ApiError(
      422,
      "Kết quả không hợp lệ hoặc đã quá 24 giờ. Hãy nhận lại lời chiêm nghiệm trước khi lưu.",
    );
  }
}

module.exports = { issueResult, readResult };
