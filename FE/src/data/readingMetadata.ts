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
    ...createDemoMetadata(),

    // Chuyển thông tin nguồn cũ sang cấu trúc dùng chung.
    // Không tự tạo URL hay coi annotation là vị trí trích dẫn.
    sources: article.sources.map((source, index) => ({
      id: `${article.id}-source-${index + 1}`,
      title: source.title,
      authorOrOrganization: source.author,
    })),

    editorialNote:
      article.editorialNote ||
      "Nội dung mẫu chưa hoàn tất đối chiếu nguồn và duyệt biên tập.",
  };
}

export function getRitualMetadata(
  ritual: RitualGuideItem
): ContentMetadata {
  return (
    ritual.metadata ?? {
      ...createDemoMetadata(),
      editorialNote:
        "Hướng dẫn trong bản thử nghiệm chưa hoàn tất đối chiếu nguồn. Cách thực hành có thể khác giữa gia đình và địa phương.",
    }
  );
}
