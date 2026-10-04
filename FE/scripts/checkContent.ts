import { ALL_SIGNALS } from "../src/data/demoSignals";
import { CULTURE_ARTICLES } from "../src/data/cultureData";
import { XIN_XAM_RESULTS } from "../src/data/xinXamData";
import {
  TRADITIONAL_XAM_COLLECTIONS,
  TRADITIONAL_XAM_STICKS,
} from "../src/data/traditionalXamData";
import { validateTraditionalXam } from "../src/data/validateTraditionalXam";
import { getPublishableTraditionalSticks } from "../src/data/traditionalXamEligibility";

const errors = validateTraditionalXam(
  TRADITIONAL_XAM_COLLECTIONS,
  TRADITIONAL_XAM_STICKS
);

const articleIds = new Set(
  CULTURE_ARTICLES.map((article) => article.id)
);

for (const signal of ALL_SIGNALS) {
  if (!signal.metadata) {
    errors.push(`${signal.id}: thiếu metadata.`);
  }
}

for (const [key, result] of Object.entries(XIN_XAM_RESULTS)) {
  if (!result.metadata) {
    errors.push(`${key}: thiếu metadata.`);
  }

  if (!articleIds.has(result.relatedArticleId)) {
    errors.push(
      `${key}: bài liên quan không tồn tại — ${result.relatedArticleId}`
    );
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Dữ liệu và liên kết nội bộ: hợp lệ.");
  console.log(
    "Thẻ Quan Thánh đủ điều kiện cho chủ đề Bình an:",
    getPublishableTraditionalSticks("quan-thanh", "Bình an").length
  );
}
