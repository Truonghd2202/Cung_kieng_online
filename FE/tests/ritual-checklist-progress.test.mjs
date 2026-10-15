import test from "node:test";
import assert from "node:assert/strict";
import { reconcileChecklistProgress, updateChecklistProgress } from "../src/data/ritualChecklistProgress.ts";

test("c1 progress maps to c-1 only when the checklist meaning matches", () => {
  const oldItems = [{ id: "c1", label: "Chuẩn bị nước sạch" }];
  const newItems = [{ id: "c-1", label: "Chuẩn bị nước sạch" }];
  assert.deepEqual(reconcileChecklistProgress(["c1"], oldItems, newItems), {
    checkedIds: ["c-1"], unmatchedIds: [],
  });
  assert.deepEqual(updateChecklistProgress(["c1"], [], oldItems, newItems), []);
});

test("unmatched historical progress is retained but excluded from completion", () => {
  const current = [{ id: "new-1", label: "Khác nghĩa" }];
  const result = reconcileChecklistProgress(["legacy-id"], [], current);
  assert.deepEqual(result, { checkedIds: [], unmatchedIds: ["legacy-id"] });
  assert.deepEqual(updateChecklistProgress(["legacy-id"], ["new-1"], [], current), ["legacy-id", "new-1"]);
});
