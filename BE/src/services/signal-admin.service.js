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
  return client.$transaction(async (tx) => {
    const existing = id ? await repository.findById(id, tx) : null;
    if (id && !existing) return null;
    if (existing && input.source !== existing.source) {
      throw new ApiError(422, "Signal source key is stable and cannot be changed.");
    }
    if (!existing && await repository.findBySource(input.source, tx)) {
      throw new ApiError(409, "Signal source key already exists.");
    }

    const content = normalizeContent(input.content);
    const data = {
      source: input.source,
      title: input.title,
      mood: input.mood,
      context_key: input.contextKey,
      category: input.category || "editorial",
      content: JSON.stringify(content),
      advice: content.reflection.advice,
      editorial_status: input.editorialStatus,
      active: false,
      reviewed_by: null,
      reviewed_at: null,
      approved_content_hash: null,
      updated_at: new Date(),
    };
    const record = existing
      ? await tx.signals.update({ where: { id }, data })
      : await tx.signals.create({ data: { ...data, region: null } });
    await tx.admin_audit_logs.create({ data: {
      actor_id: actorId,
      action: existing ? "CONTENT_EDITED" : "CONTENT_CREATED",
      target_type: repository.TARGET,
      target_id: record.id,
      details: {
        before: existing ? { editorial_status: existing.editorial_status, active: existing.active } : null,
        after: { editorial_status: record.editorial_status, active: record.active },
        reviewNote: input.reviewNote,
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
    const approvalCurrent = hasCurrentApproval(before);
    const workflowBefore = {
      verified: approvalCurrent,
      active: before.active,
      editorial_status: before.editorial_status,
    };
    const nextWorkflow = stateAfterReview(workflowBefore, input);
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
      updated_at: new Date(),
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

    const updated = await tx.signals.update({ where: { id }, data });
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
