import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ContentProvenance } from "../src/components/ContentProvenance.tsx";

const require = createRequire(import.meta.url);
const { toPublicSignal } = require("../../BE/src/services/signal.service.js");

test("real published signal DTO renders its source kind, author, rights and actual reviewer", () => {
  const reviewedAt = new Date("2026-10-14T12:00:00.000Z");
  const dto = toPublicSignal({
    id: "db-signal",
    source: "stable-source-id",
    mood: "PEACEFUL",
    context_key: "general",
    title: "Reflection",
    category: "Original",
    content: JSON.stringify({ metadata: {
      contentKind: "editorial",
      contentType: "GROUP_AUTHORED",
      contentAuthor: "Nhóm biên soạn",
      contentRightsBasis: "Nội dung nguyên bản của nhóm",
      editorialStatus: "draft",
      reviewedBy: "invented stale value",
      reviewedOn: "2000-01-01",
      quotationVerified: false,
      sources: [],
    } }),
    editorial_status: "PUBLISHED",
    reviewed_by: "reviewer-id",
    reviewed_at: reviewedAt,
    reviewer: { full_name: "Reviewer thật" },
  });
  const html = renderToStaticMarkup(React.createElement(ContentProvenance, { metadata: dto.metadata }));
  assert.match(html, /Đang phát hành/);
  assert.match(html, /Nhóm biên soạn/);
  assert.match(html, /Nội dung nguyên bản của nhóm/);
  assert.match(html, /Reviewer thật/);
  assert.match(html, /14\/10\/2026|2026-10-14/);
  assert.doesNotMatch(html, /Bản nháp|invented stale value|2000-01-01/);
});
