import test from "node:test";
import assert from "node:assert/strict";
import { adaptRemoteRitual } from "../src/data/ritualData.ts";
import { getContentCardCategory, getContentCardStatus } from "../src/admin/contentCardPresentation.ts";

test("a matching local slug cannot replace BE steps, checklist, or removed prayers", () => {
  const ritual = adaptRemoteRitual({
    id: "chuan-bi-ngay-ram",
    slug: "chuan-bi-ngay-ram",
    title: "Ritual from BE",
    desc: "Description from BE",
    verified: true,
    checklists: [],
    steps: [{ stepNumber: "1", title: "Only BE step", desc: "Only BE detail" }],
    offerings: [],
    prayers: [],
  });

  assert.deepEqual(ritual.detail?.checklists, []);
  assert.deepEqual(ritual.detail?.steps.map((step) => step.title), ["Only BE step"]);
  assert.deepEqual(ritual.detail?.prayers, []);
  assert.equal(ritual.title, "Ritual from BE");
});

test("a new ritual slug keeps BE checklist IDs and ordering", () => {
  const ritual = adaptRemoteRitual({
    id: "family-ritual-v2",
    slug: "family-ritual-v2",
    title: "New ritual",
    verified: true,
    checklists: [
      { id: "stable-first", label: "First item" },
      { id: "stable-second", label: "Second item" },
    ],
    steps: [],
    offerings: [],
    prayers: [],
  });

  assert.deepEqual(ritual.detail?.checklists, [
    { id: "stable-first", label: "First item" },
    { id: "stable-second", label: "Second item" },
  ]);
});

test("a published original ritual adapts its real approval without requiring a fake source URL", () => {
  const ritual = adaptRemoteRitual({
    id: "new-original-ritual",
    title: "Hướng dẫn nguyên bản",
    verified: true,
    contentProvenance: {
      contentType: "GROUP_AUTHORED",
      authorOrOrganization: "Nhóm biên soạn",
      scope: "Tham khảo, tùy nếp từng gia đình",
      contentRightsBasis: "Nội dung nguyên bản do nhóm tạo",
    },
    reviewMetadata: {
      rightsConfirmed: true,
      reviewedBy: "Reviewer thật",
      reviewedOn: "2026-10-14",
      reviewNote: "Đã rà checklist và phạm vi áp dụng",
    },
    checklists: [{ id: "stable-1", label: "Chuẩn bị an toàn" }],
    steps: [], offerings: [], prayers: [],
  });
  assert.equal(ritual.metadata?.editorialStatus, "published");
  assert.equal(ritual.metadata?.contentAuthor, "Nhóm biên soạn");
  assert.equal(ritual.metadata?.scope, "Tham khảo, tùy nếp từng gia đình");
  assert.equal(ritual.metadata?.contentRightsBasis, "Nội dung nguyên bản do nhóm tạo");
  assert.equal(ritual.metadata?.reviewedBy, "Reviewer thật");
  assert.equal(ritual.metadata?.reviewedOn, "2026-10-14");
  assert.deepEqual(ritual.metadata?.sources, []);
});

test("remote ritual image is shown only with content approval metadata and keeps its full credit profile", () => {
  const hidden = adaptRemoteRitual({
    slug: "ritual-with-image",
    title: "Ritual with image",
    imageUrl: "https://cdn.example.org/ritual.jpg",
    image: "https://cdn.example.org/ritual.jpg",
    contentProvenance: { imageCaption: "Caption that has not been approved" },
    checklists: [{ id: "check", label: "Check" }],
    steps: [], offerings: [], prayers: [],
  });
  assert.equal(hidden.image, "");
  assert.equal(hidden.detail?.heroImage, "");

  const visible = adaptRemoteRitual({
    slug: "ritual-with-image",
    title: "Ritual with image",
    imageUrl: "https://cdn.example.org/ritual.jpg",
    imageMetadata: {
      approved: true,
      imageCaption: "Caption",
      imageCredit: "Photographer",
      imageSource: "https://example.org/source",
      imageRightsBasis: "Permission granted",
    },
    checklists: [{ id: "check", label: "Check" }],
    steps: [], offerings: [], prayers: [],
  });
  assert.equal(visible.image, "https://cdn.example.org/ritual.jpg");
  assert.equal(visible.detail?.heroArtCredit, "Photographer");
  assert.equal(visible.detail?.heroSourceUrl, "https://example.org/source");
});

test("ritual admin card keeps occasion and category distinct and does not call a pending draft hidden", () => {
  assert.equal(getContentCardCategory("rituals", { occasion: "Before construction ceremony" }), "");
  assert.equal(getContentCardCategory("rituals", { occasion: "Before construction ceremony", category: "Buddhist ritual" }), "Buddhist ritual");
  assert.deepEqual(getContentCardStatus({ editorial_status: "IN_REVIEW", verified: false, active: false }), {
    label: "Chờ duyệt",
    variant: "pending",
  });
  assert.deepEqual(getContentCardStatus({ editorial_status: "HIDDEN", verified: true, active: false }), {
    label: "Đã ẩn",
    variant: "hidden",
  });
});
