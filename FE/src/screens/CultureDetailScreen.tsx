import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  Flower2,
  Compass,
  ShieldAlert,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  getCultureArticleById,
  getRelatedArticles,
  CultureArticle,
} from "../data/cultureData";

interface CultureDetailScreenProps {
  articleId?: string;
  onBackToCulture: () => void;
  onSelectRelatedArticle: (id: string) => void;
  onGoToExperience: () => void;
  onGoToMood: () => void;
}

export const CultureDetailScreen: React.FC<CultureDetailScreenProps> = ({
  articleId = "dinh-lang-bac-bo",
  onBackToCulture,
  onSelectRelatedArticle,
  onGoToExperience,
  onGoToMood,
}) => {
  const article: CultureArticle = getCultureArticleById(articleId);
  const relatedArticles = getRelatedArticles(article.id, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [articleId]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        {/* Breadcrumb Nav */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted mb-6">
          <button
            onClick={onBackToCulture}
            className="hover:text-accent cursor-pointer transition-colors"
          >
            Khám phá văn hóa
          </button>
          <span>›</span>
          <span>{article.region}</span>
          <span>›</span>
          <span className="text-accent font-semibold min-w-0 break-words">
            {article.title}
          </span>
        </div>

        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge
            variant="terracotta"
            className="px-3 py-0.5 text-xs font-semibold uppercase tracking-wider bg-surface text-accent border-line"
          >
            {article.region}
          </Badge>

          <Badge
            variant="secondary"
            className="px-3 py-0.5 text-xs font-medium bg-surface text-ink border-line"
          >
            {article.category}
          </Badge>

          <div className="flex items-center gap-1.5 text-xs text-muted ml-1">
            <span>•</span>
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>Thời lượng đọc: {article.readingTime}</span>
          </div>
        </div>

        {/* Article Title & Subtitle */}
        <h1 className="page-title mb-4">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-ink leading-relaxed max-w-3xl mb-8">
          {article.subtitle}
        </p>

        {/* Hero Artwork Image with Frame */}
        <div className="rounded-card overflow-hidden bg-surface border border-line shadow-sm mb-10">
          <div className="relative h-72 sm:h-96 md:h-[420px] overflow-hidden bg-surface">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="p-4 sm:p-5 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted border-t border-line">
            <span className="italic">{article.caption}</span>
            <div className="flex items-center gap-3 text-xs font-medium text-muted flex-shrink-0">
              <span>Tư liệu Tin Lắm Tâm Linh</span>
              <span>•</span>
              <span className="text-muted/80">Khảo cứu văn hóa dân gian</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Main Body & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Article Content (8 columns) */}
          <div className="lg:col-span-8 space-y-10">
            {article.sections.map((section, idx) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                <h2 className="section-title text-2xl sm:text-[26px] leading-snug pb-2 border-b border-line">
                  {section.title}
                </h2>

                <div className="space-y-4 text-base sm:text-[17px] text-ink leading-[1.8] font-normal">
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Highlight Quote Box */}
                {section.quote && (
                  <div className="my-8 pl-6 border-l-2 border-gold">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-2">
                      <Flower2 className="w-3.5 h-3.5" />
                      <span>Điểm nhấn văn hóa dân gian</span>
                    </div>
                    <blockquote className="font-display italic font-semibold text-base sm:text-lg text-ink leading-relaxed">
                      “{section.quote}”
                    </blockquote>
                  </div>
                )}

                {/* Practical Interactive Cards for Section 03 */}
                {section.practicalCards && section.practicalCards.length > 0 && (
                  <div className="space-y-3.5 mt-6">
                    {section.practicalCards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="py-5 border-t border-line"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-2 h-2 rounded-full bg-action" />
                          <h4 className="font-display font-bold text-base text-ink">
                            {card.title}
                          </h4>
                        </div>
                        <p className="text-sm text-ink leading-relaxed pl-4">
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Editorial Principle & Verified Scholarly Citations Section */}
            <div className="p-6 rounded-card bg-surface border border-line shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-surface text-accent flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-ink">
                    Nguồn tư liệu & Căn cứ khảo cứu
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mt-0.5">
                    {article.editorialNote}
                  </p>
                </div>
              </div>

              {/* Citations List */}
              {article.sources && article.sources.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-line">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tài liệu tham khảo & trích dẫn chính thức</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {article.sources.map((src, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-panel bg-surface/70 border border-line flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-xs sm:text-sm text-ink">
                              {src.title}
                            </span>
                            <span className="text-xs text-muted">
                              — {src.author}
                            </span>
                          </div>
                          <p className="text-sm text-ink leading-relaxed">
                            {src.annotation}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="shrink-0 text-xs uppercase font-semibold text-accent border-line bg-surface self-start"
                        >
                          {src.sourceType}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Action Buttons Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line">
              <Button
                variant="outline"
                size="pill"
                onClick={onBackToCulture}
                className="w-full sm:w-auto gap-2 text-sm border-line text-muted hover:text-accent"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Khám phá</span>
              </Button>

              <Button
                variant="default"
                size="pill"
                onClick={onGoToExperience}
                className="w-full sm:w-auto gap-2 text-sm shadow-xs"
              >
                <span>Trải nghiệm với các chủ đề</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Sticky Sidebar (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents Card */}
              <Card className="p-6 rounded-card bg-surface border border-line shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span>Mục lục bài viết</span>
                </div>

                <nav className="space-y-2.5">
                  {article.sections.map((section, idx) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left text-sm text-ink hover:text-accent py-1.5 px-2.5 rounded-xl hover:bg-surface transition-colors flex items-start gap-2 cursor-pointer font-medium"
                    >
                      <span className="text-accent font-sans tabular-nums text-xs mt-0.5">
                        {idx + 1}.
                      </span>
                      <span>{section.title.replace(/^\d+\.\s*/, "")}</span>
                    </button>
                  ))}
                </nav>
              </Card>

              {/* Recommendation Callout Box */}
              <Card className="p-6 rounded-card bg-surface-soft border border-line shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>GỢI Ý TÍN HIỆU DÀNH CHO BẠN</span>
                </div>

                <p className="text-sm text-ink leading-relaxed mb-4">
                  Chiêm nghiệm quẻ phù trợ cho tâm trạng hôm nay của bạn, xem lại lời dặn của
                  cổ nhân để tìm thấy an định.
                </p>

                <Button
                  variant="default"
                  size="pill"
                  onClick={onGoToMood}
                  className="w-full text-xs font-semibold shadow-2xs"
                >
                  Nhận tín hiệu chiêm nghiệm
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom Related Articles Section */}
        <div className="pt-12 border-t border-line">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-1">
                TẬP TUYỂN THƯ TỊCH DÂN GIAN
              </div>
              <h3 className="font-display font-bold text-2xl text-ink">
                Khám phá tiếp các nét thiêng dân gian
              </h3>
            </div>

            <button
              onClick={onBackToCulture}
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Xem tất cả chuyên đề</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Card
                key={rel.id}
                onClick={() => onSelectRelatedArticle(rel.id)}
                className="rounded-card overflow-hidden bg-surface border border-line hover:border-line hover:shadow-card transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-surface">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-black/60 text-xs font-semibold text-white">
                        {rel.region}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 text-xs text-white/90">
                        {rel.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-display font-bold text-base text-ink leading-snug line-clamp-2 group-hover:text-accent transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-sm text-ink line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-line flex items-center justify-between text-xs text-muted">
                  <span className="text-xs italic text-muted">Nội dung minh họa</span>
                  <span className="text-accent font-semibold flex items-center gap-1">
                    <span>Tìm hiểu</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
