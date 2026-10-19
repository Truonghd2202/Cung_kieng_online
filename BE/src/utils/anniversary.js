const { convertSolar2Lunar } = require("../../../shared/lunar-calendar.mjs");
function anniversaryMatches(anniversary, date) {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  if (anniversary.calendar === "SOLAR") {
    if (anniversary.month !== month) return false;

    if (
      !anniversary.repeat_yearly &&
      anniversary.year !== year
    ) {
      return false;
    }

    // Tránh cách Date.UTC xử lý đặc biệt năm từ 0 đến 99.
    const monthEnd = new Date(date);
    monthEnd.setUTCMonth(month, 0);

    const lastDay = monthEnd.getUTCDate();

    const observedDay = anniversary.repeat_yearly
      ? Math.min(anniversary.day, lastDay)
      : anniversary.day;

    return observedDay === day;
  }

  const [lunarDay, lunarMonth, lunarYear, leap] =
    convertSolar2Lunar(day, month, year);

  if (
    leap ||
    lunarMonth !== anniversary.month ||
    (
      !anniversary.repeat_yearly &&
      anniversary.year !== lunarYear
    )
  ) {
    return false;
  }

  if (lunarDay === anniversary.day) return true;

  if (anniversary.day !== 30 || lunarDay !== 29) {
    return false;
  }

  const tomorrow = new Date(date.getTime() + 86400000);

  const [nextLunarDay] = convertSolar2Lunar(
    tomorrow.getUTCDate(),
    tomorrow.getUTCMonth() + 1,
    tomorrow.getUTCFullYear()
  );

  return nextLunarDay === 1;
}
function threeDaysFromVietnamToday(now = new Date()) {
  const localDate = new Date(now.getTime() + 7 * 3600000).toISOString().slice(0, 10);
  return new Date(new Date(`${localDate}T00:00:00Z`).getTime() + 3 * 86400000);
}
module.exports = { anniversaryMatches, threeDaysFromVietnamToday };
