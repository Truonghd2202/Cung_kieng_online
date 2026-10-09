const test = require("node:test");
const assert = require("node:assert/strict");
const { encryptPrivateText, decryptPrivateText } = require("../src/utils/private-text");
const key = "ab".repeat(32);
test("private text uses randomized authenticated encryption bound to the account", () => {
  const plaintext = "Điều ước riêng tư của tôi";
  const encrypted = encryptPrivateText(plaintext, "owner", key);
  assert.equal(encrypted.includes(plaintext), false);
  assert.notEqual(encrypted, encryptPrivateText(plaintext, "owner", key));
  assert.equal(decryptPrivateText(encrypted, "owner", key), plaintext);
  assert.throws(() => decryptPrivateText(encrypted, "another-user", key));
  assert.throws(() => decryptPrivateText(encrypted, "owner", "cd".repeat(32)));
  const tampered = Buffer.from(encrypted.slice(7), "base64"); tampered[tampered.length - 1] ^= 1;
  assert.throws(() => decryptPrivateText(`enc:v1:${tampered.toString("base64")}`, "owner", key));
});
test("missing key fails closed for writes; legacy reads remain recoverable", () => {
  assert.throws(() => encryptPrivateText("private", "owner", ""), { statusCode: 503 });
  assert.equal(decryptPrivateText("legacy plaintext", "owner", key), "legacy plaintext");
  assert.equal(encryptPrivateText(null, "owner", ""), null);
});
