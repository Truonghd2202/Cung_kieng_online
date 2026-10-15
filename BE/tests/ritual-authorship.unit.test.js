const test = require("node:test");
const assert = require("node:assert/strict");
const { ritualApprovalIssue, hasUsableChecklist } = require("../src/services/ritual-publication");

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
