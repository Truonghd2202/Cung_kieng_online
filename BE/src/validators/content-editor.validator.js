const { z } = require("zod");
const text = z.string().trim();
const common = {
  source: text.max(2000).refine((value) => !value || /^https:\/\//i.test(value), "Nguồn phải là URL HTTPS"),
  region: z.enum(["NORTH", "CENTRAL", "SOUTH", "NATIONWIDE"]),
  reviewNote: text.min(8).max(500),
};
const section = z.object({ heading: text.min(1).max(200), body: text.min(1).max(20000) }).strict();
const checklistItem = z.object({
  id: z.string().trim().min(1).max(100).regex(/^[A-Za-z0-9_-]+$/),
  label: text.min(1).max(500),
}).strict();
const articleProvenance = z.object({
  contentType: z.enum(["GROUP_AUTHORED", "FACT", "LEGEND", "QUOTATION"]),
  sourceTitle: text.max(300),
  sourceAuthor: text.max(300),
  bibliography: text.max(1000),
  sourceLocator: text.max(500),
  localCommunity: text.max(300),
  imageCaption: text.max(500),
  imageSource: text.max(1000),
  imageRightsBasis: text.max(1000),
}).strict();
const ritualProvenance = z.object({
  contentType: z.enum(["GROUP_AUTHORED", "FACT", "LEGEND", "QUOTATION"]).optional(),
  authorOrOrganization: text.max(300),
  scope: text.max(500),
  sourceTitle: text.max(300),
  sourceAuthor: text.max(300),
  bibliography: text.max(1000),
  sourceLocator: text.max(500),
  localCommunity: text.max(300),
  contentRightsBasis: text.max(1000),
}).strict();
const workflowStatus = z.enum(["DRAFT", "IN_REVIEW"]);
const schemas = {
  culture: z.object({ ...common, editorialStatus: workflowStatus, provenance: articleProvenance, slug: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160), title: text.min(1).max(255), category: text.max(100), excerpt: text.max(2000), image_url: text.max(2000).refine((value) => !value || /^https:\/\//i.test(value) || /^\/images\/[\w./-]+$/.test(value)), sections: z.array(section).min(1).max(30) }).strict(),
  calendar: z.object({ ...common, editorialStatus: workflowStatus, title: text.min(1).max(255), description: text.max(10000), category: text.max(100), calendar: z.enum(["LUNAR", "SOLAR"]), day: z.number().int().min(1).max(31), month: z.number().int().min(1).max(12) }).strict().refine((v) => v.day <= (v.calendar === "LUNAR" ? 30 : [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][v.month - 1]), "Ngày không hợp lệ"),
  xam: z.object({ ...common, editorialStatus: workflowStatus, stick_number: z.number().int().min(1).max(100), xam_type: text.min(1).max(100), category: text.max(100), name: text.max(255), fortune_level: z.enum(["Thượng Cát", "Trung Cát", "Hạ Bình", "Bình"]), poem: text.max(10000), meaning: text.min(1).max(20000), advice: text.max(10000) }).strict(),
  rituals: z.object({
    ...common,
    editorialStatus: workflowStatus,
    slug: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(255),
    title: text.min(1).max(255),
    description: text.max(10000),
    occasion: text.max(150),
    calendar: z.enum(["LUNAR", "SOLAR"]).optional().nullable(),
    steps: z.array(z.object({ title: text.min(1).max(255), description: text.min(1).max(10000) }).strict()).min(1).max(50),
    checklists: z.array(checklistItem).max(100).refine((items) => new Set(items.map((item) => item.id)).size === items.length, "ID checklist phải duy nhất").optional(),
    provenance: ritualProvenance.optional(),
  }).strict(),
  prayers: z.object({
    ...common,
    editorialStatus: workflowStatus,
    title: text.min(1).max(255),
    content: text.min(1).max(50000),
    language_style: text.max(100),
    ritual_id: z.preprocess((value) => value === "" ? null : value, z.string().uuid().nullable().optional()),
  }).strict(),
};
module.exports = { schemas };
