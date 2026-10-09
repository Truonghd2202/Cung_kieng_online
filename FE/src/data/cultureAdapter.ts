import { CULTURE_ARTICLES, type CultureArticle } from "./cultureData";
import type { RemoteContentItem } from "./contentService";

export function toCultureArticle(item: RemoteContentItem): CultureArticle {
  const local = CULTURE_ARTICLES.find((article) => article.id === item.id);
  const sections = Array.isArray(item.sections) ? item.sections.flatMap((value, index) => {
    if (!value || typeof value !== "object") return [];
    const section = value as Record<string, unknown>;
    const body = section.paragraphs ?? section.body;
    const paragraphs = Array.isArray(body) ? body.filter((p): p is string => typeof p === "string") : typeof body === "string" ? [body] : [];
    return [{ id: `${item.id}-section-${index}`, title: String(section.title ?? section.heading ?? "Tư liệu"), paragraphs }];
  }) : [];
  const source = typeof item.source === "string" && /^https?:\/\//.test(item.source) ? item.source : undefined;
  const review = item.review && typeof item.review === "object" ? item.review as Record<string, unknown> : undefined;
  const approved = item.verified === true && item.contentKind === "article" && typeof review?.reviewedBy === "string" && typeof review?.reviewedOn === "string";
  return {
    id: item.id, title: item.title, subtitle: String(item.subtitle ?? local?.subtitle ?? "Tư liệu văn hóa"),
    excerpt: String(item.excerpt ?? local?.excerpt ?? ""),
    region: String(item.region ?? "Toàn quốc"), category: String(item.category ?? "Sinh hoạt văn hóa"),
    image: String(item.image || local?.image || "/images/do_paper_still_life.jpg"),
    caption: item.image ? String(item.caption ?? "") : "Hình minh họa, không phải ảnh của di sản.",
    readingTime: local?.readingTime ?? "1 phút", sections: sections.length ? sections : local?.sections ?? [],
    editorialNote: String(item.disclaimer ?? "Tư liệu tham khảo; trạng thái nguồn không thay thế thẩm định nội dung."),
    sources: local?.sources ?? [], audioRecordingIds: local?.audioRecordingIds,
    metadata: {
      contentKind: "editorial", editorialStatus: approved ? "approved" : "in-review", quotationVerified: false,
      reviewedBy: approved ? String(review?.reviewedBy) : undefined,
      reviewedOn: approved ? String(review?.reviewedOn) : undefined,
      sources: source ? [{ id: `${item.id}-source`, title: "Nguồn tham chiếu", url: source }] : [],
      editorialNote: String(item.disclaimer ?? "Đang chờ thẩm định nội dung."),
    },
  };
}
