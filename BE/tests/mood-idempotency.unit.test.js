const test = require("node:test");
const assert = require("node:assert/strict");

process.env.NODE_ENV = "test";
process.env.DATABASE_URL ||= "postgresql://test:test@127.0.0.1:1/test";
process.env.JWT_ACCESS_SECRET ||= "unit-test-only-access-secret-32chars";

const moodRepository = require("../src/repositories/mood.repository");
const signalRepository = require("../src/repositories/signal.repository");
const signalService = require("../src/services/signal.service");
const moodService = require("../src/services/mood.service");
const horoscopeService = require("../src/services/horoscope.service");
const prisma = require("../src/config/prisma");
const { signalContentHash } = require("../src/services/signal-publication");

test("mood history repository scopes records to owner and Vietnam period before pagination", async () => {
  const calls = [];
  const client = {
    mood_checkins: {
      count: async (query) => { calls.push(["count", query]); return 1; },
      findMany: async (query) => { calls.push(["findMany", query]); return []; },
      groupBy: async (query) => { calls.push(["groupBy", query]); return [{ mood: "PEACEFUL", _count: { _all: 2 } }]; },
    },
    $queryRaw: async (strings, ...values) => { calls.push(["daily", strings.join("?"), values]); return [{ day: "2026-10-19", count: 2 }]; },
  };
  const result = await moodRepository.historyForUser("owner-id", {
    start: new Date("2026-10-18T17:00:00Z"), end: new Date("2026-10-25T17:00:00Z"), mood: "PEACEFUL", skip: 20, take: 20,
  }, client);
  assert.equal(result.total, 1);
  assert.equal(calls[0][1].where.user_id, "owner-id");
  assert.equal(calls[0][1].where.mood, "PEACEFUL");
  assert.equal(calls[1][1].skip, 20);
  assert.equal(calls[2][1].where.mood, undefined);
  assert.match(calls[3][1], /Asia\/Ho_Chi_Minh/);
});

test("mood history service calculates a Monday-based Vietnam week and summarizes before page slicing", async () => {
  const original = moodRepository.historyForUser;
  let query;
  moodRepository.historyForUser = async (_userId, input) => {
    query = input;
    return {
      total: 1,
      items: [],
      byMood: [{ mood: "PEACEFUL", _count: { _all: 3 } }, { mood: "WORRIED", _count: { _all: 1 } }],
      byDay: [{ day: "2026-10-19", count: 4 }],
    };
  };
  try {
    const result = await moodService.history("owner-id", { period: "week", anchor: "2026-10-21", page: 2, pageSize: 1 });
    assert.equal(query.start.toISOString(), "2026-10-18T17:00:00.000Z");
    assert.equal(query.end.toISOString(), "2026-10-25T17:00:00.000Z");
    assert.equal(query.skip, 1);
    assert.equal(result.summary.total, 4);
    assert.deepEqual(result.summary.byDay, [{ day: "2026-10-19", count: 4 }]);
    assert.deepEqual(result.range, { start: "2026-10-19", end: "2026-10-25" });
    assert.equal(result.scope, "all_check_ins");
    const monthly = await moodService.history("owner-id", { period: "month", anchor: "2026-10-21", page: 1, pageSize: 20 });
    assert.equal(query.start.toISOString(), "2026-09-30T17:00:00.000Z");
    assert.equal(query.end.toISOString(), "2026-10-31T17:00:00.000Z");
    assert.deepEqual(monthly.range, { start: "2026-10-01", end: "2026-10-31" });
  } finally {
    moodRepository.historyForUser = original;
  }
});

test("yearly AI usage reports rolling attempt and occupied reading quotas from account rows", async () => {
  const original = prisma.horoscope_readings.findMany;
  const now = Date.now();
  prisma.horoscope_readings.findMany = async ({ where, orderBy }) => {
    assert.equal(where.user_id, "owner-id");
    assert.equal(orderBy.created_at, "asc");
    return ["PENDING", "SUCCEEDED", "FAILED", "SUCCEEDED", "FAILED"].map((status, index) => ({
      created_at: new Date(now - (5 - index) * 60_000), status,
    }));
  };
  try {
    const usage = await horoscopeService.getYearlyUsage("owner-id");
    assert.equal(usage.attemptsUsed, 5);
    assert.equal(usage.attemptsRemaining, 0);
    assert.equal(usage.successfulUsed, 2);
    assert.equal(usage.successfulRemaining, 0);
    assert.ok(Date.parse(usage.nextUsableAt) > now);
  } finally {
    prisma.horoscope_readings.findMany = original;
  }
});

test("a signal awaiting editorial approval is not eligible for public check-in delivery", () => {
  const signal = {
    active: true,
    editorial_status: "IN_REVIEW",
    reviewed_by: null,
    reviewed_at: null,
    approved_content_hash: null,
    id: "signal-1", source: "signal-1", mood: "PEACEFUL", context_key: "general", title: "T", category: "editorial", advice: "Bước nhỏ", region: null,
    content: JSON.stringify({ metadata: { contentKind: "editorial", contentType: "GROUP_AUTHORED", contentAuthor: "Nhóm", contentRightsBasis: "Tự biên soạn", quotationVerified: false } }),
  };
  assert.equal(signalRepository.isPublishable(signal), false);
  const approved = { ...signal, editorial_status: "PUBLISHED", reviewed_by: "admin-1", reviewed_at: new Date("2026-10-15T00:00:00Z") };
  approved.approved_content_hash = signalContentHash(approved);
  assert.equal(signalRepository.isPublishable(approved), true);
  assert.equal(signalRepository.isPublishable({ ...approved, editorial_status: "HIDDEN", active: false }), false);
  assert.equal(signalRepository.isPublishable({ ...approved, editorial_status: "REVOKED", active: false, reviewed_by: null, reviewed_at: null, approved_content_hash: null }), false);
  assert.equal(signalRepository.isPublishable({ ...approved, content: JSON.stringify({ metadata: { editorialStatus: "approved" } }) }), false);
});

test("changing a check-in signal includes the real reviewer projection", async () => {
  let query;
  const reviewer = { full_name: "Reviewer thật" };
  const next = {
    id: "next", source: "next", mood: "PEACEFUL", context_key: "general", title: "T", category: "editorial", advice: "Bước nhỏ", region: null,
    active: true, editorial_status: "PUBLISHED", reviewed_by: "admin-1", reviewed_at: new Date("2026-10-15T00:00:00Z"), reviewer,
    content: JSON.stringify({ metadata: { contentKind: "editorial", contentType: "GROUP_AUTHORED", contentAuthor: "Nhóm", contentRightsBasis: "Tự biên soạn", quotationVerified: false } }),
  };
  next.approved_content_hash = signalContentHash(next);
  const selected = await signalRepository.findNextForMoodContext(
    "PEACEFUL",
    "general",
    "current",
    { signals: { findMany: async (input) => { query = input; return [next]; } } },
  );

  assert.deepEqual(query.include, { reviewer: { select: { full_name: true } } });
  assert.equal(selected.reviewer.full_name, "Reviewer thật");
});

test("check-in snapshot keeps its content while publication status and reviewer come from the real signal row", () => {
  const current = {
    id: "db-id", source: "stable-id", mood: "PEACEFUL", context_key: "general", title: "T", category: "editorial", advice: "Advice", region: null,
    active: true, editorial_status: "PUBLISHED", reviewed_by: "reviewer-id", reviewed_at: new Date("2026-10-14T00:00:00.000Z"), reviewer: { full_name: "Reviewer thật" },
    content: JSON.stringify({ poem: { line1: "Current", line2: "Current content" }, metadata: { contentKind: "editorial", contentType: "GROUP_AUTHORED", contentAuthor: "Nhóm", contentRightsBasis: "Original", quotationVerified: false } }),
  };
  const dto = signalService.toCheckInSignal({
    signals: current,
    mood: "PEACEFUL",
    context_key: "general",
    signal_snapshot: { ...signalSnapshot, poem: { line1: "Saved", line2: "Saved snapshot" }, metadata: { contentKind: "editorial", editorialStatus: "draft", reviewedBy: "made-up", reviewedOn: "2000-01-01" } },
  });
  assert.equal(dto.poem.line2, "Saved snapshot");
  assert.equal(dto.metadata.editorialStatus, "published");
  assert.equal(dto.metadata.reviewedBy, "Reviewer thật");
  assert.equal(dto.metadata.reviewedOn, "2026-10-14");
});

const signalSnapshot = {
  id: "signal-public-id",
  dbId: "00000000-0000-4000-8000-000000000001",
  mood: "An yên",
  contextKey: "general",
  poem: { line1: "Một câu", line2: "Một câu nữa" },
  reflection: { content: "Diễn giải đã nhận", advice: "Lời khuyên" },
  action: { title: "Một hành động", duration: "2 phút", description: "Thở chậm" },
  metadata: { contentKind: "editorial", editorialStatus: "approved", sources: [] },
};

test("repeating a timed-out authenticated check-in returns its first snapshot without another row", async (context) => {
  const original = {
    findByIdempotencyKey: moodRepository.findByIdempotencyKey,
    create: moodRepository.create,
    analyzeForMood: signalService.analyzeForMood,
  };
  context.after(() => Object.assign(moodRepository, { findByIdempotencyKey: original.findByIdempotencyKey, create: original.create }));
  context.after(() => { signalService.analyzeForMood = original.analyzeForMood; });

  let stored = null;
  let creates = 0;
  let analyses = 0;
  moodRepository.findByIdempotencyKey = async (userId, key) => userId === "user-a" && key === "00000000-0000-4000-8000-000000000011" ? stored : null;
  moodRepository.create = async (data) => {
    creates += 1;
    stored = {
      ...data,
      id: "00000000-0000-4000-8000-000000000012",
      created_at: new Date("2026-01-01T00:00:00Z"),
      saved_at: null,
      signals: { id: signalSnapshot.dbId, source: signalSnapshot.id, mood: "PEACEFUL", context_key: null, title: "T", content: "{}", active: true },
    };
    return stored;
  };
  signalService.analyzeForMood = async () => { analyses += 1; return { signal: signalSnapshot }; };

  const request = { mood: "An yên", contextKey: "general", note: "ghi chú", idempotencyKey: "00000000-0000-4000-8000-000000000011" };
  const first = await moodService.createCheckIn("user-a", request);
  const retry = await moodService.createCheckIn("user-a", request);

  assert.equal(creates, 1);
  assert.equal(analyses, 1);
  assert.equal(first.checkIn.id, retry.checkIn.id);
  assert.equal(retry.signal.id, signalSnapshot.id);
  assert.equal(retry.signal.poem.line2, signalSnapshot.poem.line2);
  await assert.rejects(
    moodService.createCheckIn("user-a", { ...request, note: "ghi chú khác" }),
    (error) => error.statusCode === 409,
  );
});

test("saved result snapshot lookup is scoped to its owner and includes the stored AI response", async (context) => {
  const original = {
    findByIdForUser: moodRepository.findByIdForUser,
    isPublishable: signalRepository.isPublishable,
  };
  context.after(() => { moodRepository.findByIdForUser = original.findByIdForUser; });
  context.after(() => { signalRepository.isPublishable = original.isPublishable; });

  let requestedOwner;
  moodRepository.findByIdForUser = async (id, userId) => {
    requestedOwner = userId;
    if (id !== "saved-id" || userId !== "user-a") return null;
    return {
      id,
      user_id: userId,
      mood: "PEACEFUL",
      context_key: "general",
      note: "riêng tư",
      action_done: true,
      created_at: new Date("2026-01-01T00:00:00Z"),
      saved_at: new Date("2026-01-01T00:00:01Z"),
      signal_snapshot: { ...signalSnapshot, aiExplanation: { reflection: "AI trong snapshot", action: { title: "Hành động AI", description: "Mô tả" } } },
      signals: { id: signalSnapshot.dbId, source: signalSnapshot.id, mood: "PEACEFUL", context_key: null, title: "T", content: "{}", active: true },
    };
  };
  signalRepository.isPublishable = () => true;

  const saved = await signalService.getSavedSignal("user-a", "saved-id");
  assert.equal(requestedOwner, "user-a");
  assert.equal(saved.item.journal, "riêng tư");
  assert.equal(saved.signal.aiExplanation.reflection, "AI trong snapshot");
  assert.equal(saved.contentStatus, "available");
  await assert.rejects(signalService.getSavedSignal("user-b", "saved-id"), (error) => error.statusCode === 404);
});
