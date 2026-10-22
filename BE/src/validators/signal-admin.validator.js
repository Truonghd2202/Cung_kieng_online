const { z } = require("zod");
const checkInCatalog = require("../../../shared/checkin-catalog.json");
const { listSchema, idParamsSchema } = require("./admin.validator");

const moods = z.enum(checkInCatalog.moods.map(({ key }) => key));
const contexts = z.enum(checkInCatalog.contexts.map(({ key }) => key));
const text = z.string().trim();
const source = z.object({
  id: text.max(100).optional(),
  title: text.min(1).max(300),
  authorOrOrganization: text.max(300).optional(),
  url: text.url().refine((value) => /^https:\/\//i.test(value), "Source must use HTTPS"),
  bibliographicReference: text.max(1000).optional(),
  locator: text.min(1).max(500),
  accessedOn: text.max(30).optional(),
}).strict();

const content = z.object({
  metadata: z.object({
    contentKind: z.enum(["editorial", "folk"]),
    contentType: z.enum(["GROUP_AUTHORED", "QUOTATION"]),
    contentAuthor: text.max(300).optional().default(""),
    contentRightsBasis: text.max(1000).optional().default(""),
    originCommunity: text.max(300).optional().default(""),
    sources: z.array(source).max(20).default([]),
    quotationVerified: z.boolean().default(false),
    editorialNote: text.max(1000).optional().default(""),
  }).passthrough().superRefine((metadata, context) => {
    if (["editorialStatus", "reviewedBy", "reviewedOn"].some((key) => Object.hasOwn(metadata, key))) {
      context.addIssue({ code: "custom", message: "Editorial state and reviewer data are controlled by the review workflow." });
    }
    if (metadata.contentKind === "editorial" && metadata.contentType !== "GROUP_AUTHORED") {
      context.addIssue({ code: "custom", message: "Original group content must use GROUP_AUTHORED." });
    }
    if (metadata.contentKind === "folk" && metadata.contentType !== "QUOTATION") {
      context.addIssue({ code: "custom", message: "Folk quotations must use QUOTATION." });
    }
    if (metadata.contentKind === "editorial" && metadata.quotationVerified) {
      context.addIssue({ code: "custom", message: "Original group content cannot be marked as a verified folk quotation." });
    }
  }),
  moodDesc: text.max(2000).optional().default(""),
  badge: text.max(255).optional().default(""),
  poem: z.object({ line1: text.max(1000).optional().default(""), line2: text.max(1000).optional().default(""), subtext: text.max(1000).optional().default("") }).passthrough().optional().default({}),
  research: z.object({ title: text.max(300).optional().default(""), source: text.max(500).optional().default(""), region: text.max(120).optional().default(""), note: text.max(1000).optional().default("") }).passthrough().optional().default({}),
  reflection: z.object({ title: text.min(1).max(255), highlightWord: text.max(120).optional().default(""), content: text.min(1).max(10000), advice: text.min(1).max(3000), signalNumber: text.max(255).optional().default("") }).passthrough(),
  action: z.object({ title: text.min(1).max(255), duration: text.max(120).optional().default(""), description: text.min(1).max(3000), buttonLabel: text.max(120).optional().default(""), tag: text.max(120).optional().default("") }).passthrough(),
}).passthrough();

const signalDraftSchema = z.object({
  expectedUpdatedAt: z.iso.datetime().optional(),
  source: text.min(3).max(120).regex(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/),
  title: text.min(1).max(255),
  mood: moods,
  contextKey: contexts,
  category: text.max(100).optional().default("editorial"),
  content,
  editorialStatus: z.enum(["DRAFT", "IN_REVIEW"]),
  reviewNote: text.min(8).max(500),
}).strict();

const signalListSchema = listSchema.extend({
  status: z.enum(["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED", "HIDDEN", "REVOKED"]).optional(),
  mood: moods.optional(),
  contextKey: contexts.optional(),
});

const reviewSchema = z.object({
  expectedUpdatedAt: z.iso.datetime(),
  active: z.boolean().optional(),
  verified: z.boolean().optional(),
  rightsConfirmed: z.boolean().optional(),
  requestChanges: z.boolean().optional(),
  reviewNote: text.min(8).max(500),
}).strict().refine((value) => value.requestChanges === true || value.active !== undefined || value.verified !== undefined, {
  message: "Choose at least one workflow transition",
});

module.exports = { signalDraftSchema, signalListSchema, reviewSchema, idParamsSchema };
