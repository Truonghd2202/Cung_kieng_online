import {
  createDemoMetadata,
  type ContentMetadata,
} from "./contentMetadata";
import type { CultureArticle } from "./cultureData";
import type { RitualGuideItem } from "./ritualData";

export function getCultureMetadata(
  article: CultureArticle
): ContentMetadata {
  if (article.metadata) return article.metadata;

  return {
    contentKind: "editorial",
    editorialStatus: "in-review",
    quotationVerified: false,
    sources: article.sources.map((source, index) => ({
      id: `${article.id}-source-${index + 1}`,
      title: source.title,
      authorOrOrganization: source.author,
      bibliographicReference: source.sourceType,
      locator: source.annotation,
    })),
    editorialNote:
      article.editorialNote ||
      "Tư liệu tham khảo đang chờ đối chiếu nguồn và thẩm định nội dung.",
  };
}

export function getRitualMetadata(
  ritual: RitualGuideItem
): ContentMetadata {
  if (ritual.metadata) return ritual.metadata;

  return {
    contentKind: "editorial",
    editorialStatus: "in-review",
    quotationVerified: false,
    sources: [
      {
        id: `${ritual.id}-source-1`,
        title: "Việt Nam Phong Tục & Nếp Cũ Gia Tộc",
        authorOrOrganization: "Phan Kế Bính & Toan Ánh",
      },
    ],
    editorialNote:
      "Hướng dẫn nghi thức chuẩn mực tại gia, kết hợp triết lý tâm thành và nguyên tắc an toàn PCCC hiện đại.",
  };
}
