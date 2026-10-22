const repository = require("../repositories/admin.repository");
const ApiError = require("../utils/api-error");

async function updateReview(model, id, actorId, input) {
  const patch = {};
  if (input.active !== undefined) patch.active = input.active;
  if (input.verified !== undefined) patch.verified = input.verified;
  const result = await repository.updateReview({ model, id, actorId, patch, expectedUpdatedAt: input.expectedUpdatedAt, reviewNote: input.reviewNote, rightsConfirmed: input.rightsConfirmed, source: input.source, sourceLocator: input.sourceLocator, usageRights: input.usageRights });
  if (!result) throw new ApiError(404, "Content record not found");
  if (result.sourceRequired) throw new ApiError(422, "A verified HTTPS source is required before marking this item verified");
  if (result.rightsConfirmationRequired) throw new ApiError(422, "Người duyệt cần xác nhận đã đối chiếu căn cứ quyền sử dụng nội dung và hình ảnh.");
  if (result.approvalRequired) throw new ApiError(422, "Chỉ nội dung đã được duyệt mới có thể chuyển sang trạng thái xuất bản.");
  if (result.reviewRequired) throw new ApiError(422, "Chỉ bản IN_REVIEW mới được duyệt. Hãy gửi bản thảo chờ duyệt trước.");
  if (result.reviewAndPublishInOneStep) throw new ApiError(422, "Cần duyệt nội dung trước, sau đó mới phát hành ở thao tác riêng.");
  if (result.reviewerRequired) throw new ApiError(422, "Tài khoản người duyệt cần có tên hồ sơ trước khi xác nhận.");
  if (result.versionConflict) throw new ApiError(409, "Nội dung đã được thay đổi sau khi bạn mở. Tải lại rồi thử lại.");
  if (result.provenanceRequired) throw new ApiError(422, "Văn khấn/nghi lễ cần locator cụ thể và căn cứ quyền sử dụng trước khi xác minh.");
  if (result.groupAuthorshipRequired) throw new ApiError(422, "Hướng dẫn nguyên bản cần khai báo người/nhóm biên soạn, phạm vi áp dụng và căn cứ quyền thực tế trước khi xác minh.");
  if (result.sourceInvalid) throw new ApiError(422, "Nguồn văn khấn/nghi lễ phải là liên kết HTTPS hợp lệ.");
  if (result.xamContentRequired) throw new ApiError(422, "Quẻ cần đủ 4 dòng thơ và phần luận giải trước khi xác minh. Người duyệt cần kiểm tra nội dung và quyền sử dụng nguồn.");
  if (result.contentRequired) throw new ApiError(422, "Cần bổ sung hồ sơ nguồn phù hợp loại nội dung và vị trí nguồn; nếu có ảnh thì cần chú thích, nguồn ảnh và căn cứ quyền trước khi duyệt.");
  if (result.checklistRequired) throw new ApiError(422, "Nghi lễ cần ít nhất một mục checklist hợp lệ trước khi xuất bản.");
  return result.updated;
}

module.exports = {
  getOverview: repository.getOverview,
  listArticles: (params, actorId) => repository.listArticles(params, actorId),
  listCalendarEvents: (params, actorId) => repository.listCalendarEvents(params, actorId),
  listXamLots: (params, actorId) => repository.listXamLots(params, actorId),
  listRituals: (params, actorId) => repository.listRituals(params, actorId),
  listPrayers: (params, actorId) => repository.listPrayers(params, actorId),
  listMembershipInterests: repository.listMembershipInterests,
  listAuditLogs: repository.listAuditLogs,
  updateArticleReview: (id, actorId, input) => updateReview("culture_articles", id, actorId, input),
  updateCalendarReview: (id, actorId, input) => updateReview("calendar_events", id, actorId, input),
  updateXamReview: (id, actorId, input) => updateReview("xin_xam", id, actorId, input),
  updateRitualReview: (id, actorId, input) => updateReview("rituals", id, actorId, input),
  updatePrayerReview: (id, actorId, input) => updateReview("prayers", id, actorId, input),
};
