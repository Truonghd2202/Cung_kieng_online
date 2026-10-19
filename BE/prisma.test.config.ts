import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({
  path: ".env.test",
  override: true,
});

const testUrl = process.env.TEST_DATABASE_URL;

if (!testUrl) {
  throw new Error("Thiếu TEST_DATABASE_URL trong .env.test.");
}

const parsed = new URL(testUrl);

if (
  parsed.protocol !== "postgresql:" ||
  parsed.hostname !== "127.0.0.1" ||
  parsed.port !== "55432" ||
  parsed.pathname !== "/tin_lam_test"
) {
  throw new Error(
    "Config này chỉ cho phép database test local 127.0.0.1:55432/tin_lam_test."
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: testUrl,
  },
});