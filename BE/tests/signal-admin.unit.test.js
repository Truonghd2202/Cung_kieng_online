const test = require("node:test");
const assert = require("node:assert/strict");

process.env.NODE_ENV = "test";
process.env.DATABASE_URL ||= "postgresql://test:test@127.0.0.1:1/test";

const catalog = require("../../shared/checkin-catalog.json");
const drafts = require("../../editorial/mvp-review-drafts");
const { signalDraftSchema } = require("../src/validators/signal-admin.validator");
const { signalContentHash, isPublishable } = require("../src/services/signal-publication");
const { buildCoverage } = require("../src/repositories/signal-admin.repository");
const signalAdminService = require("../src/services/signal-admin.service");
const signalRepository = require("../src/repositories/signal.repository");
const signalService = require("../src/services/signal.service");
const { toSavedSignal } = signalService;

function validSignal(overrides = {}) {
  const row = {
    id: "signal-id", source: "signal-one", mood: "PEACEFUL", context_key: "general",
    title: "Lời nhắc", category: "editorial", advice: "Hãy dừng lại", region: null,
    active: true, editorial_status: "PUBLISHED", reviewed_by: "admin-id",
    reviewed_at: new Date("2026-10-15T00:00:00.000Z"), approved_content_hash: null,
    content: JSON.stringify({
      metadata: { contentKind: "editorial", contentType: "GROUP_AUTHORED", contentAuthor: "Nhóm biên soạn", contentRightsBasis: "Nội dung do nhóm tự viết", quotationVerified: false },
      reflection: { title: "Một câu hỏi", content: "Nội dung hiện hành", advice: "Hãy dừng lại" },
      action: { title: "Thở chậm", description: "Thử nếu thấy phù hợp" },
    }),
  };
  const withOverrides = { ...row, ...overrides };
  withOverrides.approved_content_hash ??= signalContentHash(withOverrides);
  return withOverrides;
}

function fakeClient(initial) {
  let row = { ...initial };
  const logs = [];
  const tx = {
    signals: {
      findUnique: async () => ({ ...row }),
      update: async ({ data }) => { row = { ...row, ...data }; return { ...row }; },
    },
    admin_audit_logs: { create: async ({ data }) => { logs.push(data); return data; } },
  };
  return {
    $transaction: async (callback) => callback(tx),
    get row() { return row; },
    logs,
  };
}

test("signal workflow holds one approval across hide/show and delivers only after publication", async (context) => {
  const client = fakeClient({ ...validSignal(), active: false, editorial_status: "IN_REVIEW", reviewed_by: null, reviewed_at: null, approved_content_hash: null });
  const approved = await signalAdminService.review("signal-id", "admin-id", { verified: true, rightsConfirmed: true, reviewNote: "Đã rà nội dung và quyền" }, client);
  assert.equal(approved.editorial_status, "APPROVED");
  const published = await signalAdminService.review("signal-id", "admin-id", { active: true, reviewNote: "Phát hành bản đã duyệt" }, client);
  assert.equal(isPublishable(published), true);
  const originalFindForMoodContext = signalRepository.findForMoodContext;
  context.after(() => { signalRepository.findForMoodContext = originalFindForMoodContext; });
  signalRepository.findForMoodContext = async () => isPublishable(client.row) ? client.row : null;
  const checkInResult = await signalService.analyzeForMood({ mood: "An yên", contextKey: "general" });
  assert.equal(checkInResult.signal.id, "signal-one");
  const approvalHash = client.row.approved_content_hash;
  await signalAdminService.review("signal-id", "admin-id", { active: false, reviewNote: "Ẩn trong thời gian rà soát" }, client);
  assert.equal(client.row.approved_content_hash, approvalHash);
  await signalAdminService.review("signal-id", "admin-id", { active: true, reviewNote: "Hiện lại bản đã duyệt" }, client);
  assert.equal(client.row.approved_content_hash, approvalHash);
  assert.equal(isPublishable(client.row), true);
  await signalAdminService.review("signal-id", "admin-id", { verified: false, reviewNote: "Thu hồi do phát hiện sai sót" }, client);
  assert.equal(client.row.editorial_status, "REVOKED");
  assert.equal(client.row.active, false);
  assert.equal(client.row.approved_content_hash, null);
  await assert.rejects(
    signalAdminService.review("signal-id", "admin-id", { active: true, reviewNote: "Không được phát hành lại" }, client),
    (error) => error.statusCode === 422,
  );
  await assert.rejects(
    signalService.analyzeForMood({ mood: "An yên", contextKey: "general" }),
    (error) => error.statusCode === 503,
  );
  assert.equal(client.logs.length, 5);
});

test("editing a reviewed signal clears the old approval and public delivery rejects stale hashes", async () => {
  const client = fakeClient(validSignal());
  const nextContent = JSON.parse(client.row.content);
  nextContent.reflection.content = "Nội dung được sửa";
  const edited = await signalAdminService.save("signal-id", "admin-id", {
    source: "signal-one", title: "Lời nhắc", mood: "PEACEFUL", contextKey: "general",
    category: "editorial", editorialStatus: "IN_REVIEW", reviewNote: "Cập nhật nội dung",
    content: nextContent,
  }, client);
  assert.equal(edited.editorial_status, "IN_REVIEW");
  assert.equal(edited.active, false);
  assert.equal(edited.reviewed_by, null);
  assert.equal(edited.approved_content_hash, null);
  assert.equal(isPublishable(edited), false);
  assert.equal(isPublishable({ ...validSignal(), content: JSON.stringify(nextContent) }), false);
});

test("a saved draft must be submitted for review before approval", async () => {
  const client = fakeClient({ ...validSignal(), active: false, editorial_status: "DRAFT", reviewed_by: null, reviewed_at: null, approved_content_hash: null });
  await assert.rejects(
    signalAdminService.review("signal-id", "admin-id", { verified: true, rightsConfirmed: true, reviewNote: "Duyệt trực tiếp bản nháp" }, client),
    (error) => error.statusCode === 422 && /Submit the signal for review/.test(error.message),
  );
  assert.equal(client.logs.length, 0);
});

test("saved check-in snapshot survives later signal withdrawal without substituting sample content", () => {
  const withdrawnSignal = validSignal({ active: false, editorial_status: "REVOKED", reviewed_by: null, reviewed_at: null, approved_content_hash: null, content: JSON.stringify({ reflection: { content: "Phiên bản mới không được thay snapshot" }, action: { title: "Hành động mới" } }) });
  const originalSnapshot = { id: "signal-one", mood: "An yên", contextKey: "general", poem: { line1: "Câu cũ", line2: "Câu tiếp" }, reflection: { content: "Nội dung nhận lúc lưu" }, action: { title: "Bước đã lưu" } };
  const saved = toSavedSignal({
    id: "checkin-id", signals: withdrawnSignal, signal_snapshot: originalSnapshot,
    mood: "PEACEFUL", context_key: "general", action_done: false,
    created_at: new Date("2026-10-15T00:00:00Z"), saved_at: new Date("2026-10-15T00:01:00Z"),
  });
  assert.equal(saved.contentStatus, "withdrawn");
  assert.deepEqual(saved.signalSnapshot.reflection, originalSnapshot.reflection);
  assert.deepEqual(saved.signalSnapshot.action, originalSnapshot.action);
});

test("the full coverage matrix only counts currently publishable signals", () => {
  const covered = validSignal();
  const matrix = buildCoverage([
    covered,
    { ...covered, id: "hidden", editorial_status: "HIDDEN", active: false },
    { ...covered, id: "stale", content: JSON.stringify({ reflection: { content: "edited" } }) },
    { ...covered, id: "unmapped", mood: "NOT_IN_CATALOG", context_key: "other" },
  ]);
  assert.equal(matrix.PEACEFUL.general, 1);
  assert.equal(matrix.PEACEFUL.study, 0);
  assert.equal(Object.keys(matrix).length, catalog.moods.length);
});

test("all 50 review drafts use mood and context values accepted by the API", () => {
  const moods = new Set(catalog.moods.map(({ key }) => key));
  const contexts = new Set(catalog.contexts.map(({ key }) => key));
  assert.equal(drafts.signals.length, 50);
  for (const draft of drafts.signals) {
    assert.ok(moods.has(draft.mood));
    assert.ok(contexts.has(draft.context_key));
    assert.ok(signalDraftSchema.safeParse({
      source: draft.source, title: draft.title, mood: draft.mood, contextKey: draft.context_key,
      category: "editorial", content: { ...draft.content, metadata: { ...draft.content.metadata, contentAuthor: "Nhóm biên soạn", contentRightsBasis: "Bản thảo nguyên bản" } },
      editorialStatus: "DRAFT", reviewNote: "Bản thảo chờ nhóm rà soát",
    }).success);
  }
});

test("USER is denied before every signal admin API route", () => {
  const requireAdmin = require("../src/middleware/requireAdmin.middleware");
  const router = require("../src/routes/admin.routes");
  let denied;
  requireAdmin({ user: { role: "USER" } }, {}, (error) => { denied = error; });
  assert.equal(denied.statusCode, 403);
  assert.equal(router.stack[0].handle.name, "authenticate");
  assert.equal(router.stack[1].handle, requireAdmin);
  assert.ok(router.stack.slice(2).filter((layer) => layer.route?.path?.startsWith("/signals")).length >= 5);
});
