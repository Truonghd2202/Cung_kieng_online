const test = require("node:test");
const assert = require("node:assert/strict");
const inventory = require("../prisma/seed/data/dsvh-national-inventory.json");
const calendarEvents = require("../prisma/seed/data/verified-calendar-events.json");
const guanyinLots = require("../prisma/seed/data/ctc-guanyin-100.json");
const { listQuerySchema } = require("../src/validators/content.validator");
process.env.NODE_ENV = "test";
process.env.DATABASE_URL ||= "postgresql://test:test@127.0.0.1:1/test";
process.env.JWT_ACCESS_SECRET ||= "unit-test-only-access-secret-32chars";
const contentRepository = require("../src/repositories/content.repository");
const contentService = require("../src/services/content.service");
const { cultureContentHash } = require("../src/services/culture-publication");

test("official heritage inventory provides more than 200 uniquely addressable seed entries", () => {
  assert.ok(inventory.length > 200);
  assert.equal(new Set(inventory.map((item) => item.sourceRow)).size, inventory.length);
  assert.ok(inventory.every((item) => item.title && item.decision));
});

test("verified calendar entries have source URLs and valid Vietnamese lunar dates", () => {
  assert.ok(calendarEvents.length >= 10);
  assert.ok(calendarEvents.every((event) =>
    event.source.startsWith("https://") &&
    event.day >= 1 && event.day <= 30 &&
    event.month >= 1 && event.month <= 12
  ));
});

test("the cited Guanyin source supplies every lot number from 1 through 100", () => {
  const numbers = guanyinLots.map((lot) => lot.stickNumber).sort((a, b) => a - b);
  assert.equal(guanyinLots.length, 100);
  assert.deepEqual(numbers, Array.from({ length: 100 }, (_, index) => index + 1));
  assert.ok(guanyinLots.every((lot) => lot.storyTitle && lot.sourceUrl.startsWith("https://")));
});

test("culture catalogue pagination permits traversal beyond the first API page", () => {
  assert.deepEqual(listQuerySchema.parse({ limit: "100", offset: "400" }), {
    limit: 100,
    offset: 400,
    preview: false,
  });
  assert.equal(listQuerySchema.safeParse({ offset: "5001" }).success, false);
  assert.equal(listQuerySchema.parse({ preview: "true" }).preview, true);
  assert.equal(listQuerySchema.parse({ preview: "false" }).preview, false);
  assert.equal(listQuerySchema.safeParse({ preview: "yes" }).success, false);
});

test("ritual pages continue past records that fail review eligibility", async (context) => {
  const originalList = contentRepository.listRituals;
  const originalRitualLogs = contentRepository.findRitualReviewLogs;
  const records = Array.from({ length: 102 }, (_, index) => ({
    id: `ritual-${index}`,
    slug: `ritual-${index}`,
    title: `Ritual ${index}`,
    active: true,
    verified: index >= 100,
    editorial_status: index >= 100 ? "PUBLISHED" : "DRAFT",
    content_provenance: { contentType: "GROUP_AUTHORED", contentRightsBasis: "Written by the team" },
    checklists: [{ id: "stable-item", label: "Prepare materials" }],
    prayers: [],
    ritual_steps: [],
    ritual_offerings: [],
  }));
  const offsets = [];
  contentRepository.listRituals = async ({ offset, limit }) => {
    offsets.push(offset);
    return records.slice(offset, offset + limit);
  };
  contentRepository.findRitualReviewLogs = async (ids) => ids
    .filter((id) => id === "ritual-100" || id === "ritual-101")
    .map((target_id) => ({
      target_id,
      created_at: new Date("2026-10-19T00:00:00.000Z"),
      users: { full_name: "Reviewer thật" },
      details: { after: { verified: true }, rightsConfirmed: true, reviewNote: "Đã rà nội dung" },
    }));
  context.after(() => {
    contentRepository.listRituals = originalList;
    contentRepository.findRitualReviewLogs = originalRitualLogs;
  });

  const page = await contentService.listRitualsPage({ limit: 1, offset: 0, preview: false });
  assert.deepEqual(offsets, [0, 100]);
  assert.equal(page.items[0].slug, "ritual-100");
  assert.equal(page.items[0].reviewMetadata.reviewedBy, "Reviewer thật");
  assert.equal(page.nextOffset, 101);
});

test("public ritual repository scopes both guides and prayers to published state", async () => {
  let guideArgs;
  let prayerWhere;
  const client = {
    rituals: {
      findMany: async (args) => { guideArgs = args; return []; },
      findFirst: async (args) => { guideArgs = args; return null; },
    },
  };
  await contentRepository.listRituals({ limit: 10, offset: 0, preview: false }, client);
  assert.equal(guideArgs.where.editorial_status, "PUBLISHED");
  assert.equal(guideArgs.include.prayers.where.editorial_status, "PUBLISHED");
  await contentRepository.findRitual("guide", client, false);
  assert.equal(guideArgs.where.editorial_status, "PUBLISHED");
  prayerWhere = guideArgs.include.prayers.where;
  assert.equal(prayerWhere.editorial_status, "PUBLISHED");
});

test("culture pages continue past records that fail publication eligibility", async (context) => {
  const originalList = contentRepository.listArticles;
  const content = {
    contentKind: "article",
    sections: [{ heading: "Section", body: "A published article section with enough content to meet the structural requirement and explain the subject clearly for readers." }],
    provenance: { contentType: "GROUP_AUTHORED", contentRightsBasis: "Written by the team" },
  };
  const records = Array.from({ length: 100 }, (_, index) => ({
    id: `draft-${index}`, slug: `draft-${index}`, title: `Draft ${index}`, active: false, verified: false,
    editorial_status: "DRAFT", members_only: false, image_url: null, content,
  }));
  const published = {
    id: "article-100", slug: "article-100", title: "Published article", active: true, verified: true,
    editorial_status: "PUBLISHED", members_only: false, image_url: null,
    content: {
      ...content,
      review: { reviewerName: "Reviewer thật", reviewedOn: "2026-10-19", note: "Đã rà đúng phiên bản", rightsConfirmed: true, usageRights: "confirmed" },
    },
  };
  published.content.review.versionHash = cultureContentHash({ content: published.content, imageUrl: null });
  records.push(published);
  const offsets = [];
  contentRepository.listArticles = async ({ offset, limit }) => {
    offsets.push(offset);
    return records.slice(offset, offset + limit);
  };
  context.after(() => { contentRepository.listArticles = originalList; });

  const page = await contentService.listArticlesPage({ limit: 1, offset: 0 });
  assert.deepEqual(offsets, [0, 100]);
  assert.equal(page.items[0].slug, "article-100");
  assert.equal(page.nextOffset, 101);
});
