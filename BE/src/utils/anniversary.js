const { convertSolar2Lunar } = require("../../../shared/lunar-calendar.mjs");
function anniversaryMatches(anniversary, date) {
  const day = date.getUTCDate(), month = date.getUTCMonth() + 1, year = date.getUTCFullYear();
  if (anniversary.calendar === "SOLAR") return anniversary.day === day && anniversary.month === month && (anniversary.repeat_yearly || anniversary.year === year);
  const [lunarDay, lunarMonth, lunarYear, leap] = convertSolar2Lunar(day, month, year);
  if (leap || lunarMonth !== anniversary.month || (!anniversary.repeat_yearly && anniversary.year !== lunarYear)) return false;
  if (lunarDay === anniversary.day) return true;
  const tomorrow = new Date(date.getTime() + 86400000);
  return anniversary.day === 30 && lunarDay === 29 && convertSolar2Lunar(tomorrow.getUTCDate(), tomorrow.getUTCMonth() + 1, tomorrow.getUTCFullYear())[0] === 1;
}
function threeDaysFromVietnamToday(now = new Date()) {
  const localDate = new Date(now.getTime() + 7 * 3600000).toISOString().slice(0, 10);
  return new Date(new Date(`${localDate}T00:00:00Z`).getTime() + 3 * 86400000);
}
module.exports = { anniversaryMatches, threeDaysFromVietnamToday };
