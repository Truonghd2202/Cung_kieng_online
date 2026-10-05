import assert from "node:assert/strict";

import {
  TRADITIONAL_XAM_COLLECTIONS,
  TRADITIONAL_XAM_STICKS,
} from "../src/data/traditionalXamData";

import type { ContentMetadata } from "../src/data/contentMetadata";

import {
  getPublishableTraditionalSticks,
} from "../src/data/traditionalXamEligibility";

import {
  saveTraditionalXam,
  deleteTraditionalXam,
  getTraditionalXamStorageKey,
} from "../src/data/savedTraditionalXam";

// Kho giả dành riêng cho script, không dùng localStorage trình duyệt.
const memory = new Map<string, string>();

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => {
      memory.set(key, value);
    },
    removeItem: (key: string) => {
      memory.delete(key);
    },
  },
});

Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: new EventTarget(),
});

const originalCollections = [...TRADITIONAL_XAM_COLLECTIONS];
const originalSticks = [...TRADITIONAL_XAM_STICKS];

const metadata = (): ContentMetadata => ({
  contentKind: "editorial",
  editorialStatus: "approved",
  quotationVerified: true,
  reviewedBy: "TEST FIXTURE — không phải duyệt tư liệu thật",
  reviewedOn: "2026-10-05",
  sources: [
    {
      id: "test-source",
      title: "Nguồn giả chỉ dùng kiểm thử",
      bibliographicReference: "TEST FIXTURE",
      locator: "Bản ghi kiểm thử số 1",
    },
  ],
});

const accountA = "a@example.test";
const accountB = "b@example.test";
const stickId = "test-stick-001";

const readSaved = (email: string) => {
  const raw = memory.get(getTraditionalXamStorageKey(email));
  return JSON.parse(raw ?? "[]") as Array<{
    id: string;
    topic: string;
    reflection: string;
  }>;
};

try {
  TRADITIONAL_XAM_COLLECTIONS.splice(
    0,
    TRADITIONAL_XAM_COLLECTIONS.length,
    {
      id: "quan-am",
      title: "Bộ kiểm thử",
      editionLabel: "TEST FIXTURE",
      metadata: metadata(),
    },
  );

  TRADITIONAL_XAM_STICKS.splice(
    0,
    TRADITIONAL_XAM_STICKS.length,
    {
      id: stickId,
      collectionId: "quan-am",
      stickNumber: "1",
      originalLines: ["Test 1", "Test 2", "Test 3", "Test 4"],
      translation: {
        lines: ["Dịch 1", "Dịch 2", "Dịch 3", "Dịch 4"],
        attribution: "Bản dịch giả phục vụ kiểm thử",
        metadata: metadata(),
      },
      reflectionByTopic: {
        "Bình an": "Lời kiểm thử bình an",
        "Học tập": "Lời kiểm thử học tập",
      },
      documentedRegions: [],
      metadata: metadata(),
    },
  );

  // 1. Thẻ đủ dữ liệu được chọn đúng theo chủ đề.
  assert.equal(
    getPublishableTraditionalSticks("quan-am", "Bình an").length,
    1,
  );

  // 2. Chủ đề chưa có nội dung không được rút.
  assert.equal(
    getPublishableTraditionalSticks("quan-am", "Gia đình").length,
    0,
  );

  // 3. Khách chưa có tài khoản không lưu được.
  assert.equal(
    saveTraditionalXam("", "quan-am", "Bình an", stickId),
    false,
  );

  // 4. Lưu hợp lệ.
  assert.equal(
    saveTraditionalXam(accountA, "quan-am", "Bình an", stickId),
    true,
  );
  assert.equal(readSaved(accountA).length, 1);

  // 5. Lưu lại cùng thẻ và chủ đề không tạo bản trùng.
  assert.equal(
    saveTraditionalXam(accountA, "quan-am", "Bình an", stickId),
    true,
  );
  assert.equal(readSaved(accountA).length, 1);

  // 6. Cùng thẻ nhưng khác chủ đề được lưu riêng.
  assert.equal(
    saveTraditionalXam(accountA, "quan-am", "Học tập", stickId),
    true,
  );
  assert.equal(readSaved(accountA).length, 2);

  // 7. Tài khoản khác không nhìn thấy dữ liệu của A.
  assert.equal(readSaved(accountB).length, 0);

  assert.equal(
    saveTraditionalXam(accountB, "quan-am", "Bình an", stickId),
    true,
  );
  assert.equal(readSaved(accountB).length, 1);

  // 8. Xóa của A không ảnh hưởng B.
  const entryId = readSaved(accountA)[0].id;

  assert.equal(deleteTraditionalXam(accountA, entryId), true);
  assert.equal(readSaved(accountA).length, 1);
  assert.equal(readSaved(accountB).length, 1);

  // 9. Kho lỗi phải được giữ nguyên, không ghi đè.
  const keyA = getTraditionalXamStorageKey(accountA);
  memory.set(keyA, "{broken-json");

  assert.equal(
    saveTraditionalXam(accountA, "quan-am", "Bình an", stickId),
    false,
  );
  assert.equal(memory.get(keyA), "{broken-json");

  // 10. Thẻ bản nháp bị khóa lại.
  TRADITIONAL_XAM_STICKS[0].metadata.editorialStatus = "draft";

  assert.equal(
    getPublishableTraditionalSticks("quan-am", "Bình an").length,
    0,
  );

  assert.equal(
    saveTraditionalXam(accountB, "quan-am", "Bình an", stickId),
    false,
  );

  console.log("Đạt: 10 kiểm tra logic xăm truyền thống.");
} finally {
  TRADITIONAL_XAM_COLLECTIONS.splice(
    0,
    TRADITIONAL_XAM_COLLECTIONS.length,
    ...originalCollections,
  );

  TRADITIONAL_XAM_STICKS.splice(
    0,
    TRADITIONAL_XAM_STICKS.length,
    ...originalSticks,
  );
}
