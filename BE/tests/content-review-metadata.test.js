const test = require("node:test");
const assert = require("node:assert/strict");
const { resolveReviewMetadata, reviewAuditAction } = require("../src/services/content-review-metadata");

const approvedLog = {
  target_id: "ritual-1",
  created_at: new Date("2026-10-15T08:00:00.000Z"),
  users: { full_name: "Reviewer" },
  details: {
    after: { verified: true },
    rightsConfirmed: true,
    sourceLocator: "Chapter 2, page 10",
    usageRights: "public-domain",
    reviewNote: "Source and usage rights reviewed",
  },
};

test("hiding and showing an approved ritual keeps its approval metadata", () => {
  // Visibility changes use CONTENT_VISIBILITY_UPDATED and are intentionally
  // absent from the review-log query consumed by this resolver.
  const metadata = resolveReviewMetadata([approvedLog], true);
  assert.equal(metadata.reviewedBy, "Reviewer");
  assert.equal(metadata.sourceLocator, "Chapter 2, page 10");
  assert.equal(metadata.usageRights, "public-domain");
});

test("visibility-only changes are written outside the approval history", () => {
  assert.equal(reviewAuditAction({ active: false }), "CONTENT_VISIBILITY_UPDATED");
  assert.equal(reviewAuditAction({ verified: false, active: false }), "CONTENT_REVIEW_UPDATED");
});

test("legacy visibility logs do not replace an approval profile", () => {
  const legacyHideLog = {
    ...approvedLog,
    details: {
      before: { active: true, verified: true },
      after: { active: false, verified: true },
      reviewNote: "Hidden temporarily",
    },
  };
  assert.equal(resolveReviewMetadata([legacyHideLog, approvedLog], true).sourceLocator, "Chapter 2, page 10");
});

test("a later revocation clears old approval metadata", () => {
  const revoked = {
    ...approvedLog,
    created_at: new Date("2026-10-15T09:00:00.000Z"),
    details: { after: { verified: false }, reviewNote: "Approval withdrawn" },
  };
  assert.equal(resolveReviewMetadata([revoked, approvedLog], false), null);
});

test("editing a previously approved ritual invalidates its old approval metadata", () => {
  assert.equal(resolveReviewMetadata([approvedLog], false), null);
});

test("original group-authored ritual approval needs real authoring rights and reviewer but no external locator", () => {
  const provenance = {
    contentType: "GROUP_AUTHORED",
    authorOrOrganization: "Nhóm biên soạn",
    scope: "Tham khảo theo hoàn cảnh gia đình",
    contentRightsBasis: "Nội dung nguyên bản do nhóm tạo",
  };
  const log = {
    ...approvedLog,
    details: { before: { verified: false }, after: { verified: true }, rightsConfirmed: true, reviewNote: "Reviewed" },
  };
  const review = resolveReviewMetadata([log], true, { provenance });
  assert.equal(review.reviewedBy, "Reviewer");
  assert.equal(review.reviewedOn, "2026-10-15");
  assert.equal(review.sourceLocator, undefined);
  assert.equal(review.usageRights, undefined);
  assert.equal(resolveReviewMetadata([log], true, { provenance: { ...provenance, contentRightsBasis: "" } }), null);
});

test("source-backed ritual still requires a locator and a later revocation wins", () => {
  const sourceApproval = { ...approvedLog, details: { ...approvedLog.details, before: { verified: false } } };
  const withoutLocator = { ...sourceApproval, details: { ...sourceApproval.details, sourceLocator: undefined } };
  assert.equal(resolveReviewMetadata([withoutLocator], true, { provenance: { contentType: "FACT" } }), null);
  assert.equal(resolveReviewMetadata([sourceApproval], true, { provenance: { contentType: "FACT" } }).sourceLocator, "Chapter 2, page 10");
  const revoked = { ...approvedLog, created_at: new Date("2026-10-16T00:00:00.000Z"), details: { before: { verified: true }, after: { verified: false } } };
  assert.equal(resolveReviewMetadata([revoked, sourceApproval], true, { provenance: { contentType: "FACT" } }), null);
});

test("public ritual DTO carries provenance and actual group-authored review metadata", async () => {
  const repository = require("../src/repositories/content.repository");
  const contentService = require("../src/services/content.service");
  const priorFind = repository.findRitual;
  const priorLogs = repository.findRitualReviewLogs;
  const priorPrayerLogs = repository.findPrayerReviewLogs;
  repository.findRitual = async () => ({
    id: "ritual-db-id", slug: "original-ritual", title: "Original", description: "Description",
    occasion: "Rằm", region: "NATIONWIDE", source: null, verified: true, active: true,
    content_provenance: { contentType: "GROUP_AUTHORED", authorOrOrganization: "Nhóm", scope: "Tùy gia đình", contentRightsBasis: "Nguyên bản của nhóm" },
    checklists: [{ id: "stable", label: "An toàn" }], ritual_steps: [], ritual_offerings: [], prayers: [],
  });
  repository.findRitualReviewLogs = async () => [{ ...approvedLog, target_id: "ritual-db-id", details: { before: { verified: false }, after: { verified: true }, rightsConfirmed: true, reviewNote: "Đã duyệt" } }];
  repository.findPrayerReviewLogs = async () => [];
  try {
    const dto = await contentService.getRitual("original-ritual");
    assert.deepEqual(dto.contentProvenance, { contentType: "GROUP_AUTHORED", authorOrOrganization: "Nhóm", scope: "Tùy gia đình", contentRightsBasis: "Nguyên bản của nhóm" });
    assert.equal(dto.reviewMetadata.reviewedBy, "Reviewer");
    assert.equal(dto.reviewMetadata.reviewedOn, "2026-10-15");
    assert.equal(dto.reviewMetadata.sourceLocator, undefined);
  } finally {
    repository.findRitual = priorFind;
    repository.findRitualReviewLogs = priorLogs;
    repository.findPrayerReviewLogs = priorPrayerLogs;
  }
});
