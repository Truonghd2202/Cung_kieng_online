const prisma = require("../config/prisma");
const { stateAfterEdit } = require("../services/editorial-workflow");
const models = { culture: "culture_articles", calendar: "calendar_events", xam: "xin_xam", rituals: "rituals", prayers: "prayers" };
async function find(kind, id) {
  const include = kind === "rituals" ? { ritual_steps: { orderBy: { step_number: "asc" } } } : undefined;
  const record = await prisma[models[kind]].findUnique({ where: { id }, ...(include ? { include } : {}) });
  if (!record || kind !== "culture" || record.content?.provenance) return record;
  const latestEdit = await prisma.admin_audit_logs.findFirst({
    where: { target_type: models[kind], target_id: id, action: { in: ["CONTENT_CREATED", "CONTENT_EDITED"] } },
    orderBy: { created_at: "desc" },
    select: { details: true },
  });
  const note = typeof latestEdit?.details?.reviewNote === "string" ? latestEdit.details.reviewNote : "";
  const legacyProvenance = {
    sourceTitle: legacyNoteValue(note, "Tài liệu"),
    sourceLocator: legacyNoteValue(note, "Vị trí"),
    localCommunity: legacyNoteValue(note, "Địa phương"),
    imageCaption: legacyNoteValue(note, "Ảnh"),
    imageSource: "",
    imageRightsBasis: legacyNoteValue(note, "Quyền ảnh"),
  };
  return { ...record, legacyProvenance };
}

function legacyNoteValue(note, label) {
  const match = note.match(new RegExp(`\\[${label}: ([^\\]]+)\\]`, "i"));
  return match?.[1]?.trim() || "";
}
async function save(kind, id, actorId, input) {
  const { reviewNote, editorialStatus, provenance, expectedUpdatedAt, ...data } = input;
  if (kind === "culture") {
    data.content = { sections: data.sections, contentKind: "article", provenance, review: null };
    delete data.sections;
  }
  if (kind === "rituals") {
    data.ritual_steps = data.steps;
    if (provenance !== undefined) data.content_provenance = provenance;
    delete data.steps;
  }
  if (kind === "prayers" && !data.ritual_id) data.ritual_id = null;
  // Any editorial change must be reviewed and published again.
  Object.assign(data, stateAfterEdit(editorialStatus === "IN_REVIEW"));
  return prisma.$transaction(async (tx) => {
    if (id) {
      const before = await tx[models[kind]].findUnique({ where: { id }, select: { id: true, updated_at: true } });
      if (!before) return null;
      if (!expectedUpdatedAt || new Date(expectedUpdatedAt).getTime() !== before.updated_at.getTime()) return { versionConflict: true };
      data.updated_at = new Date(Math.max(Date.now(), before.updated_at.getTime() + 1));
    }
    const { ritual_steps: steps, ...recordData } = data;
    let record;
    if (id) {
      const versionStart = new Date(expectedUpdatedAt);
      const result = await tx[models[kind]].updateMany({
        where: { id, updated_at: { gte: versionStart, lt: new Date(versionStart.getTime() + 1) } },
        data: recordData,
      });
      if (result.count !== 1) return { versionConflict: true };
      record = await tx[models[kind]].findUnique({ where: { id } });
    } else {
      record = await tx[models[kind]].create({ data: recordData });
    }
    if (kind === "rituals") {
      await tx.ritual_steps.deleteMany({ where: { ritual_id: record.id } });
      await tx.ritual_steps.createMany({ data: steps.map((step, index) => ({ ritual_id: record.id, step_number: index + 1, title: step.title, description: step.description })) });
    }
    await tx.admin_audit_logs.create({ data: { actor_id: actorId, action: id ? "CONTENT_EDITED" : "CONTENT_CREATED", target_type: models[kind], target_id: record.id, details: { reviewNote, editorialStatus, fields: Object.keys(data) } } });
    return record;
  });
}
module.exports = { find, save };
