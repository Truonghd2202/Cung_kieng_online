const repository = require("../repositories/admin.repository");
const ApiError = require("../utils/api-error");

async function updateReview(model, id, actorId, input) {
  const patch = {};
  if (input.active !== undefined) patch.active = input.active;
  if (input.verified !== undefined) patch.verified = input.verified;
  const result = await repository.updateReview({ model, id, actorId, patch, reviewNote: input.reviewNote, rightsConfirmed: input.rightsConfirmed, source: input.source, sourceLocator: input.sourceLocator, usageRights: input.usageRights });
  if (!result) throw new ApiError(404, "Content record not found");
  if (result.sourceRequired) throw new ApiError(422, "A verified HTTPS source is required before marking this item verified");
  if (result.rightsConfirmationRequired) throw new ApiError(422, "Người duyệt phải xác nhận đã kiểm tra quyền sử dụng nguồn trước khi xác minh quẻ.");
  if (result.provenanceRequired) throw new ApiError(422, "Văn khấn/nghi lễ cần locator cụ thể và căn cứ quyền sử dụng trước khi xác minh.");
  if (result.sourceInvalid) throw new ApiError(422, "Nguồn văn khấn/nghi lễ phải là liên kết HTTPS hợp lệ.");
  if (result.xamContentRequired) throw new ApiError(422, "Quẻ cần đủ 4 dòng thơ và phần luận giải trước khi xác minh. Người duyệt cần kiểm tra nội dung và quyền sử dụng nguồn.");
  if (result.contentRequired) throw new ApiError(422, "Cần biên tập bài viết có nội dung và hình ảnh trước khi duyệt. Mục danh mục di sản chưa phải bài đã thẩm định.");
  return result.updated;
}

module.exports = {
  getOverview: repository.getOverview,
  listArticles: repository.listArticles,
  listCalendarEvents: repository.listCalendarEvents,
  listXamLots: repository.listXamLots,
  listRituals: repository.listRituals,
  listPrayers: repository.listPrayers,
  listMembershipInterests: repository.listMembershipInterests,
  listAuditLogs: repository.listAuditLogs,
  updateArticleReview: (id, actorId, input) => updateReview("culture_articles", id, actorId, input),
  updateCalendarReview: (id, actorId, input) => updateReview("calendar_events", id, actorId, input),
  updateXamReview: (id, actorId, input) => updateReview("xin_xam", id, actorId, input),
  updateRitualReview: (id, actorId, input) => updateReview("rituals", id, actorId, input),
  updatePrayerReview: (id, actorId, input) => updateReview("prayers", id, actorId, input),
};
