import React, { useState, useMemo } from "react";
import {
  Search,
  Compass,
  Tag,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  CULTURE_ARTICLES,
  RegionKey,
  CultureCategoryKey,
} from "../data/cultureData";

interface CultureScreenProps {
  onSelectArticle: (id: string) => void;
  onGoToHome: () => void;
  onGoToRituals?: () => void;
  onGoToCalendar?: () => void;
  onGoToGoodDays?: () => void;
  onGoToMap?: () => void;
}

export const CultureScreen: React.FC<CultureScreenProps> = ({
  onSelectArticle,
  onGoToHome,
  onGoToRituals,
  onGoToCalendar,
  onGoToGoodDays,
  onGoToMap,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const REGIONS: { key: string; label: string }[] = [
    { key: "all", label: "Tất cả vùng miền" },
    { key: "Bắc Bộ", label: "Bắc Bộ (Đình làng, Quan họ, Tứ Phủ)" },
    { key: "Trung Bộ", label: "Trung Bộ (Xứ Huế, Miền biển, Cầu Ngư)" },
    { key: "Nam Bộ", label: "Nam Bộ (Phù sa sông nước, Bà Chúa Xứ)" },
  ];

  const CATEGORIES: { key: string; label: string }[] = [
    { key: "all", label: "Tất cả chủ đề" },
    { key: "Lễ hội truyền thống", label: "Lễ hội truyền thống" },
    { key: "Phong tục & Nghi lễ", label: "Phong tục & Nghi lễ tập quán" },
    { key: "Điển tích xưa", label: "Điển tích & Tích xưa" },
    { key: "Không gian tín ngưỡng", label: "Không gian tín ngưỡng (Đình, Đền, Miếu)" },
  ];

  const filteredArticles = useMemo(() => {
    return CULTURE_ARTICLES.filter((article) => {
      // Region filter
      if (selectedRegion !== "all" && article.region !== selectedRegion) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "all" && article.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = article.title.toLowerCase().includes(q);
        const matchSubtitle = article.subtitle.toLowerCase().includes(q);
        const matchExcerpt = article.excerpt.toLowerCase().includes(q);
        const matchRegion = article.region.toLowerCase().includes(q);
        return matchTitle || matchSubtitle || matchExcerpt || matchRegion;
      }
      return true;
    });
  }, [selectedRegion, selectedCategory, searchQuery]);

  const isDefaultView =
    selectedRegion === "all" && selectedCategory === "all" && !searchQuery.trim();

  // Cover story for magazine layout
  const featuredArticle = isDefaultView ? filteredArticles[0] : null;
  const catalogArticles = isDefaultView ? filteredArticles.slice(1) : filteredArticles;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setSelectedCategory("all");
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-7xl">
        {/* Breadcrumb & Top Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Trang chủ
            </button>
            <span>›</span>
            <span className="text-accent font-semibold">Khám phá văn hóa</span>
          </div>

          <div className="flex items-center gap-2 uppercase font-medium tracking-wider text-xs text-muted">
            <span className="text-accent">✦</span>
            <span>TẬP SAN DÂN GIAN • HỒN VIỆT ĐƯƠNG ĐẠI & ĐỜI SỐNG TÂM THỨC</span>
          </div>
        </div>

        {/* Khám phá Sub-tabs */}
        <div className="flex items-center gap-2.5 mb-8 flex-wrap">
          <button className="px-5 py-2.5 rounded-full bg-action text-white text-xs font-semibold shadow-sm">
            Di sản & Điển tích dân gian
          </button>
          {onGoToRituals && (
            <button
              onClick={onGoToRituals}
              className="px-5 py-2.5 rounded-full bg-surface/95 border border-line text-ink hover:border-accent hover:text-accent text-xs font-medium transition-all cursor-pointer shadow-2xs hover:shadow-xs"
            >
              Cẩm nang nghi lễ tại gia
            </button>
          )}
          {onGoToCalendar && (
            <button
              onClick={onGoToCalendar}
              className="px-5 py-2.5 rounded-full bg-surface/95 border border-line text-ink hover:border-accent hover:text-accent text-xs font-medium transition-all cursor-pointer shadow-2xs hover:shadow-xs"
            >
              Lịch văn hóa & Tiết khí
            </button>
          )}
          {onGoToGoodDays && (
            <button
              onClick={onGoToGoodDays}
              className="px-5 py-2.5 rounded-full bg-surface/95 border border-line text-ink hover:border-accent hover:text-accent text-xs font-medium transition-all cursor-pointer shadow-2xs hover:shadow-xs"
            >
              Tra cứu ngày lành
            </button>
          )}
          {onGoToMap && (
            <button
              onClick={onGoToMap}
              className="px-5 py-2.5 rounded-full bg-surface/95 border border-line text-ink hover:border-accent hover:text-accent text-xs font-medium transition-all cursor-pointer shadow-2xs hover:shadow-xs"
            >
              Bản đồ văn hóa 3 miền
            </button>
          )}
        </div>

        {/* Editorial Masthead Opening */}
        <div className="discovery-masthead mb-8">
          <div className="relative max-w-2xl">
            <div className="mb-3">
              <Badge
                variant="terracotta"
                className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider bg-surface text-accent border-line"
              >
                ✦ Tuyển tập di sản ba miền
              </Badge>
            </div>

            <h1 className="page-title mb-4">
              Khám phá phong thổ & nét thiêng dân gian
            </h1>

            <p className="text-sm sm:text-base text-ink leading-relaxed">
              Tìm hiểu chiều sâu tập tục, huyền tích và không gian tín ngưỡng ba miền dưới
              góc nhìn văn hóa, nhân bản và lịch sử thuần khiết của người Việt.
            </p>
          </div>
          <img
            src="/images/hue_trung_bo.jpg"
            alt="Kiến trúc truyền thống xứ Huế"
            className="discovery-masthead__image"
          />
        </div>

        {/* Search & Filter Toolbar */}
        <div className="py-6 border-y border-line/70 mb-10 space-y-4">
          {/* Search Input Box */}
          <div className="relative">
            <input
              type="text"
              aria-label="Tìm kiếm chuyên đề văn hóa"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm lễ hội, phong tục, điển tích dân gian, đền miếu xưa..."
              className="w-full pl-11 pr-4 py-3 rounded-panel bg-surface/70 border border-line text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-accent transition-all"
            />
            <Search className="w-5 h-5 text-muted absolute left-3.5 top-3.5" />
          </div>

          {/* Region Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-line/50">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted min-w-[130px]">
              <Compass className="w-4 h-4 text-accent" />
              <span>Vùng miền:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {REGIONS.map((r) => {
                const isActive = selectedRegion === r.key;
                return (
                  <button
                    key={r.key}
                    onClick={() => setSelectedRegion(r.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-action text-white shadow-2xs font-semibold"
                        : "bg-surface text-ink border border-line hover:border-accent/40"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-line/50">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted min-w-[130px]">
              <Tag className="w-4 h-4 text-accent" />
              <span>Chủ đề:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((c) => {
                const isActive = selectedCategory === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => setSelectedCategory(c.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-action text-white shadow-2xs font-semibold"
                        : "bg-surface text-ink border border-line hover:border-accent/40"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-line/50 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-action"></span>
              <span>
                Hiển thị <strong>{filteredArticles.length}</strong> chuyên đề di sản tuyển chọn
              </span>
            </div>

            {(selectedRegion !== "all" || selectedCategory !== "all" || searchQuery.trim()) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-accent font-semibold hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại bộ lọc</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= EDITORIAL COVER STORY (When browsing default) ================= */}
        {featuredArticle && (
          <section className="mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>CHUYÊN ĐỀ TÂM ĐIỂM KỲ NÀY</span>
            </div>

            <article
              onClick={() => onSelectArticle(featuredArticle.id)}
              className="group cursor-pointer rounded-card overflow-hidden bg-surface border border-line shadow-xs hover:shadow-card transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full overflow-hidden bg-surface-soft">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-xs font-bold text-accent border border-line shadow-xs">
                    {featuredArticle.region}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-action text-white text-xs font-semibold shadow-xs">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted mb-3">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>Thời gian đọc {featuredArticle.readingTime}</span>
                    <span>•</span>
                    <span className="italic text-accent">Khảo cứu văn hóa</span>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight mb-4 group-hover:text-accent transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm sm:text-base text-ink/90 leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-2.5 first-letter:float-left first-letter:text-accent first-letter:leading-none">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-line/70 flex items-center justify-between">
                  <span className="text-xs text-muted italic">
                    Di sản & Không gian tín ngưỡng
                  </span>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2 bg-action text-white shadow-xs group-hover:shadow-card cursor-pointer"
                  >
                    <span>Đọc chuyên đề</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Section Heading for Catalog Grid */}
        {filteredArticles.length > 0 && (
          <div className="flex items-center justify-between gap-4 mb-6 pb-2 border-b border-line/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-action rounded-full"></span>
              <h2 className="font-display font-bold text-lg sm:text-xl text-ink">
                {isDefaultView ? "Các chuyên đề di sản chọn lọc" : "Kết quả tra cứu"}
              </h2>
            </div>
            <span className="text-xs text-muted">
              {catalogArticles.length} chuyên đề
            </span>
          </div>
        )}

        {/* Articles Grid or Empty State */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center rounded-card bg-surface border border-line max-w-lg mx-auto shadow-xs my-10">
            <div className="w-14 h-14 mx-auto rounded-full bg-surface-soft text-accent flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-ink mb-2">
              Chưa tìm thấy chuyên đề phù hợp
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Không có bài viết nào khớp với từ khóa hoặc bộ lọc hiện tại. Bạn có thể thử tìm
              từ khóa khác hoặc đặt lại bộ lọc.
            </p>
            <Button variant="default" size="pill" onClick={handleResetFilters}>
              Đặt lại tất cả bộ lọc
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {catalogArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article.id)}
                className="group cursor-pointer flex flex-col justify-between border-b lg:border-b-0 pb-6 lg:pb-0"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-16/10 rounded-panel overflow-hidden bg-surface-soft mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 text-xs font-semibold text-white/90 drop-shadow-sm">
                      {article.region}
                    </div>
                  </div>

                  {/* Kicker Category */}
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-1.5">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span className="text-muted font-normal">{article.readingTime}</span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink leading-snug mb-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-ink/80 leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer read link */}
                <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs">
                  <span className="text-muted italic">Khảo cứu văn hóa</span>
                  <span className="text-accent font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Khám phá</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Editorial Principles Callout Banner */}
        <div className="p-6 sm:p-8 rounded-card bg-surface border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-panel bg-surface-soft border border-line flex items-center justify-center text-accent shrink-0">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-1">
                Thông điệp của Tin Lắm Tâm Linh
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
                NGUYÊN TẮC BIÊN TẬP & BẢO TỒN DI SẢN
              </div>
              <p className="text-sm text-ink/80 leading-relaxed max-w-2xl">
                Tổng hợp từ góc nhìn dân tộc học, văn hóa học và di sản tập tục dân gian Việt Nam.
                Mỗi bài viết đều được đối chiếu từ các công trình khảo cứu uy tín, trân trọng nét đẹp
                thuần khiết của người xưa.
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-full bg-surface-soft border border-line text-xs font-semibold text-accent shrink-0 self-start sm:self-auto shadow-2xs">
            Bảo tồn văn hóa phi vật thể
          </div>
        </div>
      </main>
    </div>
  );
};

