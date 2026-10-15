import assert from "node:assert/strict";
import {
  getAuspiciousHoursForDay,
  getCanChiDay,
  getCanChiMonth,
  getReliableLunarDate,
} from "../src/data/calendarData";

const sampleDate = new Date(2026, 9, 13);
const lunar = getReliableLunarDate(13, 10, 2026);

assert.deepEqual(getCanChiDay(sampleDate), { name: "Canh Thân", can: "Canh", chi: "Thân" });
assert.equal(getCanChiMonth(lunar.lunarMonth, lunar.lunarYear), "Mậu Tuất");
assert.deepEqual([lunar.lunarDay, lunar.lunarMonth, lunar.lunarYear], [4, 9, 2026]);
assert.deepEqual(getAuspiciousHoursForDay("Thân"), [
  "Tý (23–01)", "Sửu (01–03)", "Thìn (07–09)", "Tỵ (09–11)", "Mùi (13–15)", "Tuất (19–21)",
]);

console.log("Calendar facts passed for 2026-10-13 (Vietnam UTC+7).");
