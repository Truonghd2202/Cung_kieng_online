const test = require("node:test");
const assert = require("node:assert/strict");
const { schemas } = require("../src/validators/content-editor.validator");
const { hasUsableChecklist } = require("../src/services/ritual-publication");

test("ritual draft accepts source fields and ordered instructions", () => {
  const result = schemas.rituals.safeParse({
    title: "Ritual draft",
    slug: "ritual-draft",
    description: "Draft description",
    occasion: "Home observance",
    calendar: "LUNAR",
    region: "NATIONWIDE",
    source: "",
    editorialStatus: "DRAFT",
    reviewNote: "Initial editorial draft",
    steps: [{ title: "Prepare", description: "Draft step description" }],
    checklists: [{ id: "item-one", label: "Prepare clean water" }],
  });

  assert.equal(result.success, true);
  assert.deepEqual(result.data.checklists, [{ id: "item-one", label: "Prepare clean water" }]);
  assert.equal(schemas.rituals.safeParse({ ...result.data, checklists: [{ id: "dup", label: "One" }, { id: "dup", label: "Two" }] }).success, false);
});

test("a newly slugged ritual can be saved with BE-owned checklist IDs", () => {
  const result = schemas.rituals.safeParse({
    slug: "new-family-ritual",
    title: "New family ritual",
    description: "A new guide",
    occasion: "Family occasion",
    region: "NATIONWIDE",
    source: "",
    editorialStatus: "DRAFT",
    reviewNote: "Initial ritual draft",
    steps: [{ title: "Begin", description: "Start here" }],
    checklists: [{ id: "stable-item", label: "Prepare materials" }],
  });
  assert.equal(result.success, true);
});

test("ritual publication requires at least one non-empty checklist label", () => {
  assert.equal(hasUsableChecklist([]), false);
  assert.equal(hasUsableChecklist([{ id: "empty", label: " " }]), false);
  assert.equal(hasUsableChecklist([{ id: "ready", label: "Prepare materials" }]), true);
});

test("prayer draft permits an unlinked ritual and requires the content body", () => {
  const result = schemas.prayers.safeParse({
    title: "Prayer draft",
    content: "Draft prayer content",
    language_style: "NOM",
    ritual_id: "",
    region: "NATIONWIDE",
    source: "",
    editorialStatus: "DRAFT",
    reviewNote: "Initial editorial draft",
  });

  assert.equal(result.success, true);
  assert.equal(result.data.ritual_id, null);
  assert.equal(schemas.prayers.safeParse({ ...result.data, content: "" }).success, false);
});

test("culture submission persists structured provenance and requires a content type", () => {
  const result = schemas.culture.safeParse({
    region: "NATIONWIDE",
    source: "",
    editorialStatus: "IN_REVIEW",
    reviewNote: "Submit article for review",
    provenance: {
      contentType: "GROUP_AUTHORED",
      sourceTitle: "",
      sourceAuthor: "",
      bibliography: "",
      sourceLocator: "",
      localCommunity: "",
      imageCaption: "A family offering table",
      imageSource: "Photographed by the project team",
      imageRightsBasis: "Original project photograph",
    },
    slug: "group-authored-article",
    title: "Group authored article",
    category: "Culture",
    excerpt: "An editorial summary",
    image_url: "/images/example.jpg",
    sections: [{ heading: "Context", body: "A sufficiently detailed article body." }],
  });
  assert.equal(result.success, true);
  assert.equal(result.data.provenance.contentType, "GROUP_AUTHORED");
  assert.equal(schemas.culture.safeParse({ ...result.data, provenance: undefined }).success, false);
});

test("calendar editing uses updated_at as a compare-and-set version", async (context) => {
  const prisma = require("../src/config/prisma");
  const repository = require("../src/repositories/content-editor.repository");
  const originalTransaction = prisma.$transaction;
  const updatedAt = new Date("2026-10-19T10:00:00.000Z");
  let where;
  prisma.$transaction = async (callback) => callback({
    calendar_events: {
      findUnique: async () => ({ id: "event-1", updated_at: updatedAt }),
      updateMany: async (args) => { where = args.where; return { count: 1 }; },
    },
    admin_audit_logs: { create: async () => ({ id: "audit-1" }) },
  });
  context.after(() => { prisma.$transaction = originalTransaction; });

  await repository.save("calendar", "event-1", "admin-1", {
    expectedUpdatedAt: updatedAt.toISOString(), editorialStatus: "DRAFT", reviewNote: "Edit calendar event",
    title: "Event", description: "Description", category: "Culture", calendar: "LUNAR", day: 1, month: 1,
    region: "NATIONWIDE", source: "",
  });
  assert.deepEqual(where.updated_at, { gte: updatedAt, lt: new Date(updatedAt.getTime() + 1) });
});
