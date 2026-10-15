import test from "node:test";
import assert from "node:assert/strict";
import { toCultureArticle } from "../src/data/cultureAdapter.ts";

test("published culture adapter uses backend sections and provenance without inventing missing quotes", () => {
  const article = toCultureArticle({
    id: "backend-story",
    title: "Backend title",
    verified: true,
    image: "/images/backend.jpg",
    contentKind: "article",
    sections: [{ heading: "Backend heading", body: "Backend text" }],
    provenance: {
      contentType: "GROUP_AUTHORED",
      sourceTitle: "",
      sourceAuthor: "",
      bibliography: "",
      sourceLocator: "",
      imageCaption: "Backend caption",
      imageSource: "Project photograph",
      imageRightsBasis: "Original work",
    },
    review: { reviewerName: "Reviewer", reviewedOn: "2026-10-15", quotationVerified: false },
  });

  assert.equal(article.title, "Backend title");
  assert.equal(article.sections[0].title, "Backend heading");
  assert.deepEqual(article.metadata.sources, []);
  assert.equal(article.metadata.contentType, "GROUP_AUTHORED");
  assert.equal(article.metadata.reviewedBy, "Reviewer");
  assert.equal(article.caption, "Backend caption");
});

test("a BE article without artwork stays text-only instead of inheriting a local image", () => {
  const article = toCultureArticle({
    id: "dinh-lang-bac-bo",
    slug: "dinh-lang-bac-bo",
    title: "Current BE draft title",
    verified: false,
    contentKind: "article",
    sections: [{ heading: "Current section", body: "Current BE text" }],
    provenance: { contentType: "GROUP_AUTHORED" },
  });

  assert.equal(article.title, "Current BE draft title");
  assert.equal(article.image, "");
  assert.equal(article.sections[0].paragraphs[0], "Current BE text");
});
