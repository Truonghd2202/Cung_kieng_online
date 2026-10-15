const test = require("node:test");
const assert = require("node:assert/strict");
const { hasPublishableCultureContent } = require("../src/services/culture-publication");

const authoredDraft = {
  content: {
    contentKind: "article",
    sections: [{ body: "A sufficiently long original article section that meets the current minimum text length for a published culture article without quoting an external work." }],
    provenance: { contentType: "GROUP_AUTHORED" },
  },
  imageUrl: null,
};

test("group-authored culture copy can publish without a fictional source or image", () => {
  assert.equal(hasPublishableCultureContent(authoredDraft), true);
});

test("culture publication requires an image rights record when an image is attached", () => {
  assert.equal(hasPublishableCultureContent({ ...authoredDraft, imageUrl: "/images/unreviewed.jpg" }), false);
  assert.equal(hasPublishableCultureContent({
    ...authoredDraft,
    imageUrl: "/images/approved.jpg",
    content: { ...authoredDraft.content, provenance: { contentType: "GROUP_AUTHORED", imageCaption: "Caption", imageSource: "Project photo", imageRightsBasis: "Created by the project team" } },
  }), true);
});

test("sourced or quoted culture content still requires a locator", () => {
  assert.equal(hasPublishableCultureContent({
    ...authoredDraft,
    content: { ...authoredDraft.content, provenance: { contentType: "FACT", sourceTitle: "A source", bibliography: "A bibliography" } },
  }), false);
  assert.equal(hasPublishableCultureContent({
    ...authoredDraft,
    content: { ...authoredDraft.content, provenance: { contentType: "QUOTATION", sourceTitle: "A source", bibliography: "A bibliography", sourceLocator: "Page 12" } },
  }), true);
});
