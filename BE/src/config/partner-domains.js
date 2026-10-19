// Chỉ thêm tên miền thật sau khi nhóm xác nhận đối tác.
// Ghi hostname, không ghi https:// hoặc đường dẫn.
// www.example.com và example.com là hai hostname riêng.
const PARTNER_HOSTS = new Set([
  // "ten-mien-doi-tac.vn",
]);

function isAllowedPartnerUrl(value) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      PARTNER_HOSTS.has(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

module.exports = { isAllowedPartnerUrl };
