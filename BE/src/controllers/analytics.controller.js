const repository = require("../repositories/analytics.repository");
const { ROLE } = require("../constants/role.constant");
const { sendSuccess } = require("../utils/response");
const ApiError = require("../utils/api-error");

async function record(req, res) {
  const event = req.body;
  await repository.recordEvents([{
    client_event_id: event.clientEventId,
    user_id: req.user?.id || null,
    anonymous_id: event.anonymousId,
    event_name: event.eventName,
    campaign_source: event.campaignSource || null,
  }]);
  return sendSuccess(res, { statusCode: 202, message: "Analytics event accepted" });
}

async function summary(req, res) {
  if (req.user?.role !== ROLE.ADMIN) throw new ApiError(403, "Administrator access required");
  return sendSuccess(res, { message: "Product analytics summary retrieved", data: await repository.getSummary() });
}

module.exports = { record, summary };
