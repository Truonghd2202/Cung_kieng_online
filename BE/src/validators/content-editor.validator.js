const { z } = require("zod");
const text = z.string().trim();
const common = {
  source: text.max(2000).refine((value) => !value || /^https:\/\//i.test(value), "Nguồn phải là URL HTTPS"),
  region: z.enum(["NORTH", "CENTRAL", "SOUTH", "NATIONWIDE"]),
  reviewNote: text.min(8).max(500),
};
const section = z.object({ heading: text.min(1).max(200), body: text.min(1).max(20000) }).strict();
const schemas = {
  culture: z.object({ ...common, slug: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160), title: text.min(1).max(255), category: text.max(100), excerpt: text.max(2000), image_url: text.max(2000).refine((value) => !value || /^https:\/\//i.test(value) || /^\/images\/[\w./-]+$/.test(value)), sections: z.array(section).min(1).max(30) }).strict(),
  calendar: z.object({ ...common, title: text.min(1).max(255), description: text.max(10000), category: text.max(100), calendar: z.enum(["LUNAR", "SOLAR"]), day: z.number().int().min(1).max(31), month: z.number().int().min(1).max(12) }).strict().refine((v) => v.day <= (v.calendar === "LUNAR" ? 30 : [31,29,31,30,31,30,31,31,30,31,30,31][v.month - 1]), "Ngày không hợp lệ"),
  xam: z.object({ ...common, stick_number: z.number().int().min(1).max(100), xam_type: text.min(1).max(100), category: text.max(100), name: text.max(255), fortune_level: z.enum(["Thượng Cát", "Trung Cát", "Hạ Bình", "Bình"]), poem: text.max(10000), meaning: text.min(1).max(20000), advice: text.max(10000) }).strict(),
};
module.exports = { schemas };
