const env = require("../config/env");
const nodemailer = require("nodemailer");

function isConfigured() {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
}

async function sendPasswordResetCodeEmail(email, code) {
  if (!isConfigured()) return false;
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  await transporter.sendMail({
    from: env.SMTP_FROM_EMAIL || env.SMTP_USER,
    to: email,
    subject: "Mã xác minh đặt lại mật khẩu Tin Lắm Tâm Linh",
    text: `Mã xác minh đặt lại mật khẩu của bạn là ${code}. Mã có hiệu lực trong 10 phút. Nếu bạn không yêu cầu, hãy bỏ qua email này.`,
    html: `<p>Bạn vừa yêu cầu đặt lại mật khẩu.</p><p>Mã xác minh của bạn là:</p><p style="font-size:28px;font-weight:bold;letter-spacing:8px">${code}</p><p>Mã có hiệu lực trong 10 phút. Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>`,
  });
  return true;
}

module.exports = { isConfigured, sendPasswordResetCodeEmail };
