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

async function list(params, client = prisma) {
  return repository.list(params, client);
}

async function get(id, client = prisma) {
  const record = await repository.findById(id, client);
  if (!record) return null;
  const auditLogs = await repository.listAuditLogs(id, client);
  return { ...publicAdminRecord(record), auditLogs };
}

async function save(id, actorId, input, client = prisma) {
  const { expectedUpdatedAt, ...draft } = input;
  return client.$transaction(async (tx) => {
    const existing = id ? await repository.findById(id, tx) : null;
    if (id && !existing) return null;
    if (id && (!expectedUpdatedAt || new Date(expectedUpdatedAt).getTime() !== existing.updated_at.getTime())) {
      throw new ApiError(409, "Signal changed after it was opened. Reload before saving.");
    }
    if (existing && draft.source !== existing.source) {
      throw new ApiError(422, "Signal source key is stable and cannot be changed.");
    }
    if (!existing && await repository.findBySource(draft.source, tx)) {
      throw new ApiError(409, "Signal source key already exists.");
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
      if (result.count !== 1) throw new ApiError(409, "Signal changed after it was opened. Reload before saving.");
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
      throw new ApiError(409, "Signal changed after it was opened. Reload before reviewing.");
    }
    const approvalCurrent = hasCurrentApproval(before);
    const workflowBefore = {
      verified: approvalCurrent,
      active: before.active,
      editorial_status: before.editorial_status,
    };
    const nextWorkflow = stateAfterReview(workflowBefore, input);
    if (nextWorkflow.reviewRequired) throw new ApiError(422, "Submit the signal for review before approving it.");
    if (nextWorkflow.reviewAndPublishInOneStep) throw new ApiError(422, "Approve the signal first, then publish it in a separate action.");
    if (nextWorkflow.approvalRequired) throw new ApiError(422, "Approve the current signal version before publishing it.");

    if (input.verified === true) {
      if (before.editorial_status !== "IN_REVIEW") {
        throw new ApiError(422, "Submit the signal for review before approving it.");
      }
      const content = normalizeContent(parseSignalContent(before.content));
      const candidate = { ...before, content: JSON.stringify(content) };
      if (input.rightsConfirmed !== true) throw new ApiError(422, "Confirm actual content use rights before approval.");
      if (!hasPublishableProvenance(candidate)) throw new ApiError(422, "Complete the provenance required for this content type before approval.");
    }

    if (input.active === true && !approvalCurrent && input.verified !== true) {
      throw new ApiError(422, "A current approval is required before publication.");
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
    if (updateResult.count !== 1) throw new ApiError(409, "Signal changed after it was opened. Reload before reviewing.");
    const updated = await repository.findById(id, tx);
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: reviewAuditAction(input),
      target_type: repository.TARGET,
      target_id: id,
      details: {
        before: { active: before.active, editorial_status: before.editorial_status, reviewed_by: before.reviewed_by, approved_content_hash: before.approved_content_hash },
        after: { active: updated.active, editorial_status: updated.editorial_status, reviewed_by: updated.reviewed_by, reviewed_at: updated.reviewed_at },
        reviewNote: input.reviewNote,
        ...(input.verified === true ? { rightsConfirmed: true } : {}),
      },
    } });
    return publicAdminRecord(updated);
  });
}

async function logs(id, client = prisma) {
  return repository.listAuditLogs(id, client);
}

module.exports = { hasCurrentApproval, publicAdminRecord, list, get, save, review, logs };
