const ApiError = require("../utils/api-error");

async function ensureDifferentReviewer(tx, targetType, targetId, reviewerId) {
  const lastSubmission = await tx.admin_audit_logs.findFirst({
    where: {
      target_type: targetType,
      target_id: targetId,
      action: { in: ["CONTENT_CREATED", "CONTENT_EDITED"] },
    },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    select: { actor_id: true },
  });

  if (lastSubmission?.actor_id === reviewerId) {
    throw new ApiError(422, "Bạn không thể duyệt nội dung do chính mình gửi. Hãy nhờ Admin còn lại rà soát.");
  }
}

module.exports = { ensureDifferentReviewer };
