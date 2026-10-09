const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.test") });

if (!process.env.TEST_DATABASE_URL) {
  throw new Error("TEST_DATABASE_URL is required. Copy .env.test.example to .env.test and use a dedicated test database.");
}

process.env.NODE_ENV = "test";
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.JWT_ACCESS_SECRET ||= "unit-test-only-access-secret-32chars";
