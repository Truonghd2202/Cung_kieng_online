const test = require("node:test");
const assert = require("node:assert/strict");
const repository = require("../src/repositories/content.repository");
const contentService = require("../src/services/content.service");
const { editorialContentHash } = require("../src/services/editorial-content-hash");

function publishedRitual(imageUrl) {
  return {
    id: "ritual-1",
    title: "Ritual guide",
    slug: "ritual-guide",
    description: "A published guide",
    occasion: "Family occasion",
    region: "NATIONWIDE",
    image_url: imageUrl,
    source: "",
    editorial_status: "PUBLISHED",
    checklists: [{ id: "prepare", label: "Prepare materials" }],
    content_provenance: {
      contentType: "GROUP_AUTHORED",
      authorOrOrganization: "Editorial team",
      scope: "Flexible family guidance",
      contentRightsBasis: "Written by the team",
      ...(imageUrl ? {
        imageCaption: "Ritual table",
        imageCredit: "Photo by Editorial team",
        imageSource: "https://example.org/photo",
        imageRightsBasis: "Original project image",
      } : {}),
    },
    verified: true,
    active: true,
    created_at: new Date("2026-10-01T00:00:00.000Z"),
    updated_at: new Date("2026-10-02T00:00:00.000Z"),
    ritual_steps: [],
    ritual_offerings: [],
    prayers: [],
  };
}

async function withPublishedRitual(context, ritual) {
  const originalFindRitual = repository.findRitual;
  const originalRitualLogs = repository.findRitualReviewLogs;
  const contentRecord = { ...ritual };
  delete contentRecord.ritual_steps;
  delete contentRecord.ritual_offerings;
  delete contentRecord.prayers;
  const approvedContentHash = editorialContentHash(contentRecord);
  repository.findRitual = async () => ritual;
  repository.findRitualReviewLogs = async () => [{
    target_id: ritual.id,
    details: {
      after: { verified: true },
      rightsConfirmed: true,
      imageRightsConfirmed: Boolean(ritual.image_url),
      reviewNote: "Checked current ritual version",
      approvedContentHash,
    },
    created_at: new Date("2026-10-03T00:00:00.000Z"),
    users: { full_name: "Reviewer" },
  }];
  context.after(() => {
    repository.findRitual = originalFindRitual;
    repository.findRitualReviewLogs = originalRitualLogs;
  });
}

test("public ritual API returns the image and complete profile for the approved content hash", async (context) => {
  const ritual = publishedRitual("https://cdn.example.org/ritual.jpg");
  await withPublishedRitual(context, ritual);

  const response = await contentService.getRitual(ritual.slug);
  assert.equal(response.imageUrl, ritual.image_url);
  assert.deepEqual(response.imageMetadata, {
    approved: true,
    imageCaption: "Ritual table",
    imageCredit: "Photo by Editorial team",
    imageSource: "https://example.org/photo",
    imageRightsBasis: "Original project image",
  });
});

test("public ritual API hides changed or unprofiled images and keeps no-image rituals available", async (context) => {
  const changed = publishedRitual("https://cdn.example.org/ritual.jpg");
  await withPublishedRitual(context, changed);
  changed.image_url = "https://cdn.example.org/changed.jpg";
  const changedResponse = await contentService.getRitual(changed.slug);
  assert.equal(changedResponse.imageUrl, "");
  assert.equal(changedResponse.imageMetadata, null);
  assert.equal("imageCaption" in changedResponse.contentProvenance, false);

  const noImage = publishedRitual(null);
  await withPublishedRitual(context, noImage);
  const noImageResponse = await contentService.getRitual(noImage.slug);
  assert.equal(noImageResponse.imageUrl, "");
  assert.equal(noImageResponse.title, noImage.title);
});
