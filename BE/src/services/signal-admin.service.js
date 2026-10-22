const prisma = require("../config/prisma");
const repository = require("../repositories/signal-admin.repository");
const { stateAfterEdit, stateAfterReview } = require("./editorial-workflow");
const { reviewAuditAction } = require("./content-review-metadata");
const {
  parseSignalContent,
  removeLegacyEditorialState,
  hasPublishableProvenance,
  signalContentHash,
} = require("./signal-publication");
const ApiError = require("../utils/api-error");
const { ensureDifferentReviewer } = require("./content-review-guard");

function hasCurrentApproval(row) {
  return Boolean(row?.reviewed_by
    && row.reviewed_at
    && row.approved_content_hash === signalContentHash(row)
    && ["APPROVED", "PUBLISHED", "HIDDEN"].includes(row.editorial_status));
}

function publicAdminRecord(row) {
  if (!row) return row;
  const content = removeLegacyEditorialState(parseSignalContent(row.content));
  return { ...row, content, verified: hasCurrentApproval(row) };
}

function normalizeContent(input) {
  return removeLegacyEditorialState(input);
}

async function list(params, actorIdOrClient = null, client = prisma) {
  const actorId = typeof actorIdOrClient === "string" ? actorIdOrClient : null;
  const db = actorIdOrClient && typeof actorIdOrClient === "object" ? actorIdOrClient : client;
  return repository.list(params, db, actorId);
}

async function get(id, includeAuditLogs = true, client = prisma, actorId = null) {
  if (actorId && !(await client.admin_audit_logs.findFirst({
    where: { actor_id: actorId, target_type: repository.TARGET, target_id: id, action: { in: ["CONTENT_CREATED", "CONTENT_EDITED"] } },
    select: { id: true },
  }))) return null;
  const record = await repository.findById(id, client);
  if (!record) return null;
  const auditLogs = await repository.listAuditLogs(id, client);
  const submission = auditLogs.find((log) => ["CONTENT_CREATED", "CONTENT_EDITED"].includes(log.action));
  const editorialFeedback = auditLogs.find((log) => ["CONTENT_CHANGES_REQUESTED", "CONTENT_APPROVAL_REVOKED"].includes(log.action));
  const editorialContext = {
    submitted_by: submission?.users?.full_name || null,
    editor_feedback: editorialFeedback?.details?.reviewNote || null,
    editor_feedback_meta: editorialFeedback ? {
      note: editorialFeedback.details?.reviewNote || "",
      reviewerName: editorialFeedback.users?.full_name || "Quản trị viên",
      createdAt: editorialFeedback.created_at,
      feedbackKind: editorialFeedback.action === "CONTENT_APPROVAL_REVOKED" ? "approval-revoked" : "changes-requested",
      isPreviousRound: Boolean(submission && submission.created_at > editorialFeedback.created_at),
    } : null,
  };
  if (!includeAuditLogs) return { ...publicAdminRecord(record), ...editorialContext };
  return { ...publicAdminRecord(record), ...editorialContext, auditLogs };
}

async function save(id, actorId, input, client = prisma, enforceOwnership = false) {
  const { expectedUpdatedAt, ...draft } = input;
  return client.$transaction(async (tx) => {
    const existing = id ? await repository.findById(id, tx) : null;
    if (id && !existing) return null;
    if (id && enforceOwnership && !(await tx.admin_audit_logs.findFirst({
      where: { actor_id: actorId, target_type: repository.TARGET, target_id: id, action: { in: ["CONTENT_CREATED", "CONTENT_EDITED"] } },
      select: { id: true },
    }))) return null;
    if (id && enforceOwnership && existing.editorial_status !== "DRAFT") {
      throw new ApiError(409, "Chỉ bản nháp mới có thể chỉnh sửa. Hãy đưa lời chiêm nghiệm về bản nháp trước.");
    }
    if (id && (!expectedUpdatedAt || new Date(expectedUpdatedAt).getTime() !== existing.updated_at.getTime())) {
      throw new ApiError(409, "Dữ liệu lời chiêm nghiệm đã thay đổi. Hãy tải lại rồi thử lưu.");
    }
    if (existing && draft.source !== existing.source) {
      throw new ApiError(422, "Mã nguồn lời chiêm nghiệm được giữ cố định và không thể thay đổi.");
    }
    if (!existing && await repository.findBySource(draft.source, tx)) {
      throw new ApiError(409, "Mã nguồn lời chiêm nghiệm đã được sử dụng. Hãy chọn mã khác.");
    }

    const content = normalizeContent(draft.content);
    const data = {
      source: draft.source,
      title: draft.title,
      mood: draft.mood,
      context_key: draft.contextKey,
      category: draft.category || "editorial",
      content: JSON.stringify(content),
      advice: content.reflection.advice,
      editorial_status: draft.editorialStatus,
      active: false,
      reviewed_by: null,
      reviewed_at: null,
      approved_content_hash: null,
      updated_at: new Date(Math.max(Date.now(), (existing?.updated_at?.getTime() || 0) + 1)),
    };
    let record;
    if (existing) {
      const versionStart = new Date(expectedUpdatedAt);
      const result = await tx.signals.updateMany({
        where: { id, updated_at: { gte: versionStart, lt: new Date(versionStart.getTime() + 1) } },
        data,
      });
      if (result.count !== 1) throw new ApiError(409, "Dữ liệu lời chiêm nghiệm đã thay đổi. Hãy tải lại rồi thử lưu.");
      record = await repository.findById(id, tx);
    } else {
      record = await tx.signals.create({ data: { ...data, region: null } });
    }
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: existing ? "CONTENT_EDITED" : "CONTENT_CREATED",
      target_type: repository.TARGET,
      target_id: record.id,
      details: {
        before: existing ? { editorial_status: existing.editorial_status, active: existing.active } : null,
        after: { editorial_status: record.editorial_status, active: record.active },
        reviewNote: draft.reviewNote,
        previousVersion: expectedUpdatedAt || null,
        version: record.updated_at?.toISOString?.() || null,
        fields: ["title", "mood", "context_key", "content", "editorial_status"],
      },
    } });
    return publicAdminRecord(record);
  });
}

async function review(id, actorId, input, client = prisma) {
  return client.$transaction(async (tx) => {
    const before = await repository.findById(id, tx);
    if (!before) return null;
    if (!input.expectedUpdatedAt || new Date(input.expectedUpdatedAt).getTime() !== before.updated_at.getTime()) {
      throw new ApiError(409, "Dữ liệu lời chiêm nghiệm đã thay đổi. Hãy tải lại rồi thử duyệt.");
    }
    if (input.requestChanges === true) {
      if (!["IN_REVIEW", "REVOKED"].includes(before.editorial_status)) {
        throw new ApiError(422, "Chỉ lời chiêm nghiệm đang chờ duyệt hoặc đã thu hồi duyệt mới có thể trả về chỉnh sửa.");
      }
      const versionStart = new Date(input.expectedUpdatedAt);
      const updatedAt = new Date(Math.max(Date.now(), before.updated_at.getTime() + 1));
      const result = await tx.signals.updateMany({
        where: { id, updated_at: { gte: versionStart, lt: new Date(versionStart.getTime() + 1) } },
        data: { editorial_status: "DRAFT", active: false, reviewed_by: null, reviewed_at: null, approved_content_hash: null, updated_at: updatedAt },
      });
      if (result.count !== 1) throw new ApiError(409, "Dữ liệu lời chiêm nghiệm đã thay đổi. Hãy tải lại rồi thử duyệt.");
      const updated = await repository.findById(id, tx);
      await tx.admin_audit_logs.create({ data: {
        actor_id: actorId,
        action: "CONTENT_CHANGES_REQUESTED",
        target_type: repository.TARGET,
        target_id: id,
        details: { before: { editorial_status: before.editorial_status, active: before.active, updated_at: before.updated_at.toISOString() }, after: { editorial_status: updated.editorial_status, active: updated.active, updated_at: updated.updated_at.toISOString() }, reviewNote: input.reviewNote },
      } });
      return publicAdminRecord(updated);
    }
    if (input.verified === false) {
      throw new ApiError(422, "Dùng thao tác thu hồi duyệt để đưa nội dung đã duyệt về bản nháp.");
    }
    const approvalCurrent = hasCurrentApproval(before);
    const workflowBefore = {
      verified: approvalCurrent,
      active: before.active,
      editorial_status: before.editorial_status,
    };
    const nextWorkflow = stateAfterReview(workflowBefore, input);
    if (nextWorkflow.reviewRequired) throw new ApiError(422, "Hãy gửi lời chiêm nghiệm chờ duyệt trước khi duyệt nội dung.");
    if (nextWorkflow.reviewAndPublishInOneStep) throw new ApiError(422, "Hãy duyệt lời chiêm nghiệm trước, sau đó dùng thao tác công khai.");
    if (nextWorkflow.approvalRequired) throw new ApiError(422, "Hãy duyệt phiên bản hiện tại trước khi công khai.");

    if (input.verified === true) {
      await ensureDifferentReviewer(tx, repository.TARGET, id, actorId);
      if (!["IN_REVIEW", "REVOKED"].includes(before.editorial_status)) {
        throw new ApiError(422, "Hãy gửi lời chiêm nghiệm chờ duyệt trước khi duyệt nội dung.");
      }
      const content = normalizeContent(parseSignalContent(before.content));
      const candidate = { ...before, content: JSON.stringify(content) };
      if (input.rightsConfirmed !== true) throw new ApiError(422, "Hãy xác nhận quyền sử dụng nội dung trước khi duyệt.");
      if (!hasPublishableProvenance(candidate)) throw new ApiError(422, "Hãy hoàn thiện hồ sơ nguồn và quyền sử dụng trước khi duyệt.");
    }

    if (input.active === true && !approvalCurrent && input.verified !== true) {
      throw new ApiError(422, "Cần có lượt duyệt hợp lệ cho phiên bản hiện tại trước khi công khai.");
    }

    const data = {
      active: nextWorkflow.active,
      editorial_status: nextWorkflow.editorial_status,
      updated_at: new Date(Math.max(Date.now(), before.updated_at.getTime() + 1)),
    };
    if (input.verified === true) {
      data.reviewed_by = actorId;
      data.reviewed_at = new Date();
      const currentContent = normalizeContent(parseSignalContent(before.content));
      const approvalVersion = {
        ...before,
        ...data,
        content: JSON.stringify(currentContent),
      };
      data.approved_content_hash = signalContentHash(approvalVersion);
    } else if (input.verified === false) {
      data.reviewed_by = null;
      data.reviewed_at = null;
      data.approved_content_hash = null;
    }

    const versionStart = new Date(input.expectedUpdatedAt);
    const updateResult = await tx.signals.updateMany({
      where: { id, updated_at: { gte: versionStart, lt: new Date(versionStart.getTime() + 1) } },
      data,
    });
    if (updateResult.count !== 1) throw new ApiError(409, "Dữ liệu lời chiêm nghiệm đã thay đổi. Hãy tải lại rồi thử duyệt.");
    const updated = await repository.findById(id, tx);
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: reviewAuditAction(input),
      target_type: repository.TARGET,
      target_id: id,
      details: {
        before: { active: before.active, editorial_status: before.editorial_status, reviewed_by: before.reviewed_by, approved_content_hash: before.approved_content_hash, updated_at: before.updated_at.toISOString() },
        after: { active: updated.active, editorial_status: updated.editorial_status, reviewed_by: updated.reviewed_by, reviewed_at: updated.reviewed_at, updated_at: updated.updated_at.toISOString() },
        reviewNote: input.reviewNote,
        ...(input.verified === true ? { rightsConfirmed: true } : {}),
      },
    } });
    return publicAdminRecord(updated);
  });
}

async function withdrawToDraft(id, actorId, input, client = prisma) {
  return client.$transaction(async (tx) => {
    const owned = await tx.admin_audit_logs.findFirst({
      where: { actor_id: actorId, target_type: repository.TARGET, target_id: id, action: { in: ["CONTENT_CREATED", "CONTENT_EDITED"] } },
      select: { id: true },
    });
    if (!owned) return null;
    const before = await repository.findById(id, tx);
    if (!before) return null;
    if (!input.expectedUpdatedAt || new Date(input.expectedUpdatedAt).getTime() !== before.updated_at.getTime()) throw new ApiError(409, "Dữ liệu lời chiêm nghiệm đã thay đổi. Hãy tải lại rồi thử rút khỏi hàng chờ.");
    if (before.editorial_status !== "IN_REVIEW") throw new ApiError(409, "Bạn chỉ có thể rút lời chiêm nghiệm đang chờ duyệt.");
    const versionStart = new Date(input.expectedUpdatedAt);
    const updatedAt = new Date(Math.max(Date.now(), before.updated_at.getTime() + 1));
    const result = await tx.signals.updateMany({
      where: { id, updated_at: { gte: versionStart, lt: new Date(versionStart.getTime() + 1) } },
      data: { editorial_status: "DRAFT", active: false, reviewed_by: null, reviewed_at: null, approved_content_hash: null, updated_at: updatedAt },
    });
    if (result.count !== 1) throw new ApiError(409, "Dữ liệu lời chiêm nghiệm đã thay đổi. Hãy tải lại rồi thử rút khỏi hàng chờ.");
    const updated = await repository.findById(id, tx);
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: "CONTENT_WITHDRAWN_TO_DRAFT",
      target_type: repository.TARGET,
      target_id: id,
      details: { before: { editorial_status: before.editorial_status, active: before.active, updated_at: before.updated_at.toISOString() }, after: { editorial_status: updated.editorial_status, active: updated.active, updated_at: updated.updated_at.toISOString() }, reviewNote: input.reviewNote },
    } });
    return publicAdminRecord(updated);
  });
}

async function revokeApprovalToDraft(id, actorId, input, client = prisma) {
  return client.$transaction(async (tx) => {
    const before = await repository.findById(id, tx);
    if (!before) return null;
    if (!input.expectedUpdatedAt || new Date(input.expectedUpdatedAt).getTime() !== before.updated_at.getTime()) {
      throw new ApiError(409, "Dữ liệu lời chiêm nghiệm đã thay đổi. Hãy tải lại rồi thử thu hồi duyệt.");
    }
    if (!hasCurrentApproval(before)) {
      throw new ApiError(409, "Chỉ nội dung đã duyệt, đang công khai hoặc đã ẩn mới có thể thu hồi duyệt để chỉnh sửa.");
    }
    const versionStart = new Date(input.expectedUpdatedAt);
    const updatedAt = new Date(Math.max(Date.now(), before.updated_at.getTime() + 1));
    const result = await tx.signals.updateMany({
      where: { id, updated_at: { gte: versionStart, lt: new Date(versionStart.getTime() + 1) } },
      data: { editorial_status: "DRAFT", active: false, reviewed_by: null, reviewed_at: null, approved_content_hash: null, updated_at: updatedAt },
    });
    if (result.count !== 1) throw new ApiError(409, "Dữ liệu lời chiêm nghiệm đã thay đổi. Hãy tải lại rồi thử thu hồi duyệt.");
    const updated = await repository.findById(id, tx);
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: "CONTENT_APPROVAL_REVOKED",
      target_type: repository.TARGET,
      target_id: id,
      details: {
        before: { editorial_status: before.editorial_status, active: before.active, verified: before.verified, updated_at: before.updated_at.toISOString(), approved_content_hash: before.approved_content_hash },
        after: { editorial_status: updated.editorial_status, active: updated.active, verified: updated.verified, updated_at: updated.updated_at.toISOString() },
        reviewNote: input.reviewNote,
      },
    } });
    return publicAdminRecord(updated);
  });
}

async function logs(id, client = prisma) {
  return repository.listAuditLogs(id, client);
}

module.exports = { hasCurrentApproval, publicAdminRecord, list, get, save, review, withdrawToDraft, revokeApprovalToDraft, logs };
