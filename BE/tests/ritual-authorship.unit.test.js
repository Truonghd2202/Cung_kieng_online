const test = require("node:test");
const assert = require("node:assert/strict");
const { ritualApprovalIssue, hasUsableChecklist, ritualImageProfileIssues, isRitualImagePubliclyApproved } = require("../src/services/ritual-publication");
const { editorialContentHash } = require("../src/services/editorial-content-hash");

test("a group-authored ritual needs real authorship, scope, rights and checklist but no outside URL", () => {
  const ritual = {
    content_provenance: {
      contentType: "GROUP_AUTHORED", authorOrOrganization: "Nhóm biên soạn",
      scope: "Gợi ý linh hoạt cho gia đình, không phải chuẩn chung", contentRightsBasis: "Do nhóm tự viết",
    },
    source: "", checklists: [{ id: "prepare", label: "Chuẩn bị vừa sức" }],
  };
  assert.equal(ritualApprovalIssue(ritual, { source: "", sourceLocator: "", usageRights: "unknown" }), null);
  assert.equal(hasUsableChecklist(ritual.checklists), true);
  assert.equal(ritualApprovalIssue({ ...ritual, content_provenance: { ...ritual.content_provenance, scope: "" } }, {}), "groupAuthorshipRequired");
  assert.equal(hasUsableChecklist([{ id: "x", label: " " }]), false);
});

test("a ritual based on source material still requires HTTPS, a locator and confirmed usage rights", () => {
  const ritual = { content_provenance: { contentType: "FACT" }, source: "" };
  assert.equal(ritualApprovalIssue(ritual, { source: "", sourceLocator: "", usageRights: "unknown" }), "sourceRequired");
  assert.equal(ritualApprovalIssue(ritual, { source: "https://example.org/book", sourceLocator: "Chapter 2", usageRights: "confirmed" }), null);
  assert.equal(ritualApprovalIssue(ritual, { source: "https://example.org/book", sourceLocator: "", usageRights: "confirmed" }), "provenanceRequired");
});

test("a ritual image requires a complete profile and a separate admin rights confirmation", () => {
  const ritual = {
    content_provenance: {
      contentType: "GROUP_AUTHORED",
      authorOrOrganization: "Editorial team",
      scope: "Flexible family guidance",
      contentRightsBasis: "Written by the team",
      imageCaption: "Ritual table",
      imageCredit: "Photo by Editorial team",
      imageSource: "https://example.org/photo",
      imageRightsBasis: "Original project image",
    },
    image_url: "https://cdn.example.org/ritual.jpg",
  };
  assert.deepEqual(ritualImageProfileIssues({ ...ritual, content_provenance: { ...ritual.content_provenance, imageCredit: "" } }), ["imageCreditRequired"]);
  assert.equal(ritualApprovalIssue(ritual, { imageRightsConfirmed: false }), "imageRightsConfirmationRequired");
  assert.equal(ritualApprovalIssue(ritual, { imageRightsConfirmed: true }), null);
  assert.equal(ritualApprovalIssue({ ...ritual, image_url: null }, {}), null);
});

test("a ritual image is public only for a complete profile with the current approved content hash", () => {
  const ritual = {
    image_url: "https://cdn.example.org/ritual.jpg",
    content_provenance: {
      imageCaption: "Ritual table",
      imageCredit: "Photo by Editorial team",
      imageSource: "https://example.org/photo",
      imageRightsBasis: "Original project image",
    },
  };
  const currentHash = editorialContentHash(ritual);
  const reviewMetadata = { imageRightsConfirmed: true };
  assert.equal(isRitualImagePubliclyApproved(ritual, { reviewMetadata, approvedContentHash: currentHash, currentContentHash: currentHash }), true);
  assert.equal(isRitualImagePubliclyApproved(ritual, { reviewMetadata: {}, approvedContentHash: currentHash, currentContentHash: currentHash }), false);
  assert.equal(isRitualImagePubliclyApproved(ritual, { reviewMetadata, approvedContentHash: currentHash, currentContentHash: editorialContentHash({ ...ritual, image_url: "https://cdn.example.org/new.jpg" }) }), false);
  assert.notEqual(currentHash, editorialContentHash({ ...ritual, content_provenance: { ...ritual.content_provenance, imageRightsBasis: "Changed" } }));
});
