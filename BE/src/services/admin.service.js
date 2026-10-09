const repository = require("../repositories/admin.repository");
const ApiError = require("../utils/api-error");

async function updateReview(model, id, actorId, input) {
  const patch = {};
  if (input.active !== undefined) patch.active = input.active;
  if (input.verified !== undefined) patch.verified = input.verified;
  const result = await repository.updateReview({ model, id, actorId, patch, reviewNote: input.reviewNote });
  if (!result) throw new ApiError(404, "Content record not found");
  if (result.sourceRequired) throw new ApiError(422, "A verified HTTPS source is required before marking this item verified");
  if (result.contentRequired) throw new ApiError(422, "Cần biên tập bài viết có nội dung và hình ảnh trước khi duyệt. Mục danh mục di sản chưa phải bài đã thẩm định.");
  return result.updated;
}

module.exports = {
  getOverview: repository.getOverview,
  listArticles: repository.listArticles,
  listCalendarEvents: repository.listCalendarEvents,
  listXamLots: repository.listXamLots,
  listMembershipInterests: repository.listMembershipInterests,
  listAuditLogs: repository.listAuditLogs,
  updateArticleReview: (id, actorId, input) => updateReview("culture_articles", id, actorId, input),
  updateCalendarReview: (id, actorId, input) => updateReview("calendar_events", id, actorId, input),
  updateXamReview: (id, actorId, input) => updateReview("xin_xam", id, actorId, input),
};
