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
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Breadcrumb Nav */}
        <div className="flex items-center gap-2 text-xs text-[#8c7a72] mb-6">
          <button
            onClick={onBackToCulture}
            className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
          >
            Khám phá văn hóa
          </button>
          <span>›</span>
          <span>{article.region}</span>
          <span>›</span>
          <span className="text-[#9e3b2e] font-semibold truncate max-w-[280px] sm:max-w-none">
            {article.title}
          </span>
        </div>

        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge
            variant="terracotta"
            className="px-3 py-0.5 text-xs font-semibold uppercase tracking-wider bg-[#faede2] text-[#9e3b2e] border-[#ebd7c8]"
          >
            {article.region}
          </Badge>

          <Badge
            variant="secondary"
            className="px-3 py-0.5 text-xs font-medium bg-[#fbf5ee] text-[#715f57] border-[#ecd9cb]"
          >
            {article.category}
          </Badge>

          <div className="flex items-center gap-1.5 text-xs text-[#8c7a72] ml-1">
            <span>•</span>
            <Clock className="w-3.5 h-3.5 text-[#9e3b2e]" />
            <span>Thời lượng đọc: {article.readingTime}</span>
          </div>
        </div>

        {/* Article Title & Subtitle */}
        <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#2a211e] leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#685750] leading-relaxed max-w-3xl mb-8">
          {article.subtitle}
        </p>

        {/* Hero Artwork Image with Frame */}
        <div className="rounded-3xl overflow-hidden bg-white border border-[#eddcd0] shadow-sm mb-10">
          <div className="relative h-72 sm:h-96 md:h-[420px] overflow-hidden bg-[#faede2]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#882f23] uppercase tracking-wider border border-[#e8cbba] shadow-xs">
                Nội dung minh họa • Chờ kiểm chứng
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-[#faf4ed] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#7c6a62] border-t border-[#f0ded1]">
            <span className="italic">{article.caption}</span>
            <span className="font-medium text-[#9e3b2e] flex-shrink-0">
              Bản quyền tư liệu Tin Lắm Tâm Linh
            </span>
          </div>
        </div>

        {/* Two Column Layout: Main Body & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Article Content (8 columns) */}
          <div className="lg:col-span-8 space-y-10">
            {article.sections.map((section, idx) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                <h2 className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-[26px] text-[#2c2220] leading-snug pb-2 border-b border-[#f1e3d6]">
                  {section.title}
                </h2>

                <div className="space-y-4 text-base sm:text-[17px] text-[#4f423d] leading-[1.8] font-normal">
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Highlight Quote Box */}
                {section.quote && (
                  <div className="my-6 p-6 rounded-2xl bg-[#faf1e8] border-l-4 border-[#9e3b2e] border-y border-r border-[#ecd5c4] shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-2">
                      <Flower2 className="w-3.5 h-3.5" />
                      <span>Điểm nhấn văn hóa dân gian</span>
                    </div>
                    <blockquote className="font-['Noto_Serif',serif] italic font-semibold text-base sm:text-lg text-[#2e2320] leading-relaxed">
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
                        className="p-5 rounded-2xl bg-white border border-[#eddcd0] hover:border-[#dfc3af] transition-all shadow-2xs"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#9e3b2e]" />
                          <h4 className="font-['Noto_Serif',serif] font-bold text-base text-[#2c211f]">
                            {card.title}
                          </h4>
                        </div>
                        <p className="text-sm text-[#6c5b54] leading-relaxed pl-4">
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Editorial Principle Disclaimer Callout */}
            <div className="p-5 rounded-2xl bg-[#fbece1]/80 border border-[#ecd5c4] flex items-start gap-3.5 shadow-2xs">
              <ShieldAlert className="w-5 h-5 text-[#9e3b2e] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#73615a] leading-relaxed">
                <div className="font-bold text-[#8d2f23] mb-1 flex items-center justify-between">
                  <span>Nguồn & Tính trung thực tư liệu</span>
                  <span className="font-normal text-[11px] text-[#9a867e]">
                    Bản quyền nội dung Tin Lắm Tâm Linh
                  </span>
                </div>
                <p>{article.editorialNote}</p>
              </div>
            </div>

            {/* Navigation Action Buttons Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#eddcd0]">
              <Button
                variant="outline"
                size="pill"
                onClick={onBackToCulture}
                className="w-full sm:w-auto gap-2 text-sm border-[#e4ccba] text-[#786760] hover:text-[#9e3b2e]"
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
              <Card className="p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span>Mục lục bài viết</span>
                </div>

                <nav className="space-y-2.5">
                  {article.sections.map((section, idx) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left text-sm text-[#6a5953] hover:text-[#9e3b2e] py-1.5 px-2.5 rounded-xl hover:bg-[#faede2] transition-colors flex items-start gap-2 cursor-pointer font-medium"
                    >
                      <span className="text-[#9e3b2e] font-mono text-xs mt-0.5">
                        {idx + 1}.
                      </span>
                      <span>{section.title.replace(/^\d+\.\s*/, "")}</span>
                    </button>
                  ))}
                </nav>
              </Card>

              {/* Recommendation Callout Box */}
              <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#faf0e6] to-[#faece1] border border-[#ebd5c3] shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>GỢI Ý TÍN HIỆU DÀNH CHO BẠN</span>
                </div>

                <p className="text-xs sm:text-sm text-[#6f5d56] leading-relaxed mb-4">
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
        <div className="pt-12 border-t border-[#eddcd0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#938279] font-semibold mb-1">
                TẬP TUYỂN THƯ TỊCH DÂN GIAN
              </div>
              <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220]">
                Khám phá tiếp các nét thiêng dân gian
              </h3>
            </div>

            <button
              onClick={onBackToCulture}
              className="text-xs font-semibold text-[#9e3b2e] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
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
                className="rounded-3xl overflow-hidden bg-white border border-[#eddcd0] hover:border-[#dfc3af] hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-[#faede2]">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-semibold text-white">
                        {rel.region}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] text-white/90">
                        {rel.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] leading-snug line-clamp-2 group-hover:text-[#9e3b2e] transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#705f58] line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-[#f4e8dc] flex items-center justify-between text-xs text-[#8c7a72]">
                  <span className="text-[11px] italic text-[#998880]">Nội dung minh họa</span>
                  <span className="text-[#9e3b2e] font-semibold flex items-center gap-1">
                    <span>Tìm hiểu</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Classical Serif Motto */}
        <div className="text-center pt-14 border-t border-[#eddcd0] mt-16">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-lg sm:text-xl text-[#9e3b2e] mb-1.5">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ.”
          </p>
          <div className="text-xs uppercase tracking-widest text-[#938279] font-medium">
            Thông điệp của Tin Lắm Tâm Linh
          </div>
        </div>
      </main>
    </div>
  );
};
