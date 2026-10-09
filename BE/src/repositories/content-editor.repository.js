const prisma = require("../config/prisma");
const models = { culture: "culture_articles", calendar: "calendar_events", xam: "xin_xam" };
function find(kind, id) { return prisma[models[kind]].findUnique({ where: { id } }); }
async function save(kind, id, actorId, input) {
  const { reviewNote, ...data } = input;
  if (kind === "culture") {
    data.content = { sections: data.sections, contentKind: "article" };
    delete data.sections;
  }
  // Any editorial change must be reviewed and published again.
  data.verified = false;
  data.active = false;
  return prisma.$transaction(async (tx) => {
    if (id && !await tx[models[kind]].findUnique({ where: { id }, select: { id: true } })) return null;
    const record = id ? await tx[models[kind]].update({ where: { id }, data }) : await tx[models[kind]].create({ data });
    await tx.admin_audit_logs.create({ data: { actor_id: actorId, action: id ? "CONTENT_EDITED" : "CONTENT_CREATED", target_type: models[kind], target_id: record.id, details: { reviewNote, fields: Object.keys(data) } } });
    return record;
  });
}
module.exports = { find, save };
