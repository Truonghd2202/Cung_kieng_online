const test = require("node:test");
const assert = require("node:assert/strict");

process.env.NODE_ENV = "test";
process.env.DATABASE_URL ||= "postgresql://test:test@127.0.0.1:1/test";
process.env.JWT_ACCESS_SECRET ||= "unit-test-only-access-secret-32chars";

const { parseGeneratedText } = require("../src/services/ai.service");

test("accepts a bounded contextual reflection response", () => {
  const result = parseGeneratedText({
    candidates: [{ content: { parts: [{ text: JSON.stringify({
      reflection: "Bạn có thể chia việc thành một bước nhỏ.",
      actionTitle: "Chọn một việc",
      actionDescription: "Ghi lại việc có thể làm trong hôm nay.",
    }) }] } }],
  });

  assert.equal(result.actionTitle, "Chọn một việc");
});

test("rejects unsafe claims and malformed output", () => {
  const unsafe = JSON.stringify({
    reflection: "Tai nạn đẫm máu chắc chắn sẽ xảy ra.",
    actionTitle: "Làm lễ",
    actionDescription: "Hãy chi tiền để giải hạn.",
  });
  assert.equal(parseGeneratedText({ candidates: [{ content: { parts: [{ text: unsafe }] } }] }), null);
  assert.equal(parseGeneratedText({ candidates: [] }), null);
});
