import React, { useEffect, useState, useMemo } from "react";
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
import { DiscoveryNav } from "../components/DiscoveryNav";
import { loadCultureArticles } from "../data/contentService";

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

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
  const [visibleCount, setVisibleCount] = useState(4);
  const [articles, setArticles] = useState(CULTURE_ARTICLES);

  useEffect(() => {
    void loadCultureArticles().then((remote) => {
      setArticles(CULTURE_ARTICLES.map((local) => {
        const item = remote.find((candidate) => candidate.id === local.id);
        return item ? { ...local, title: String(item.title || local.title), excerpt: String(item.excerpt || local.excerpt) } : local;
      }));
    }).catch(() => {});
  }, []);

  const REGIONS = [
    { key: "all", label: "Tất cả" },
    { key: "Bắc Bộ", label: "Bắc Bộ" },
    { key: "Trung Bộ", label: "Trung Bộ" },
    { key: "Nam Bộ", label: "Nam Bộ" },
  ];

  const CATEGORIES = [
    { key: "all", label: "Tất cả" },
    {
      key: "Lễ hội truyền thống",
      label: "Lễ hội",
    },
    {
      key: "Phong tục & Nghi lễ",
      label: "Phong tục & nghi lễ",
    },
    {
      key: "Điển tích xưa",
      label: "Điển tích",
    },
    {
      key: "Không gian tín ngưỡng",
      label: "Không gian tín ngưỡng",
    },
  ];

  const filteredArticles = useMemo(() => {
    const query = normalizeSearchText(searchQuery);

    return articles.filter((article) => {
      const matchesRegion =
        selectedRegion === "all" ||
        article.region === selectedRegion;

      const matchesCategory =
        selectedCategory === "all" ||
        article.category === selectedCategory;

      const searchableText = normalizeSearchText(
        [
          article.title,
          article.subtitle,
          article.excerpt,
          article.region,
          article.category,
        ].join(" ")
      );

      const matchesSearch =
        !query || searchableText.includes(query);

      return (
        matchesRegion &&
        matchesCategory &&
        matchesSearch
      );
    });
  }, [articles, selectedRegion, selectedCategory, searchQuery]);

  const isDefaultView =
    selectedRegion === "all" && selectedCategory === "all" && !searchQuery.trim();

  // Cover story for magazine layout
  const featuredArticle = isDefaultView ? filteredArticles[0] : null;
  const catalogArticles = isDefaultView ? filteredArticles.slice(1) : filteredArticles;
  const visibleArticles = catalogArticles.slice(
    0,
    visibleCount
  );

  const hasMoreArticles =
    visibleArticles.length < catalogArticles.length;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setSelectedCategory("all");
    setVisibleCount(4);
  };

  const handleArticleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    articleId: string
  ) => {
    // Giữ cách mở tab mới bằng Ctrl/Cmd/Shift.
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    onSelectArticle(articleId);
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
            <span>CÂU CHUYỆN VĂN HÓA VIỆT</span>
          </div>
        </div>


        {/* Editorial Masthead Opening */}
        <div className="discovery-masthead culture-masthead mb-8">
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
              Khám phá văn hóa Việt
            </h1>

            <p className="text-sm sm:text-base text-ink leading-relaxed">
              Tìm hiểu câu chuyện, phong tục và không gian văn hóa
              Bắc, Trung, Nam. Chọn vùng hoặc chủ đề bạn muốn khám phá.
            </p>
          </div>
          <img
            src="/images/hue_trung_bo.jpg"
            alt="Kiến trúc truyền thống xứ Huế"
            className="discovery-masthead__image"
          />
        </div>

        <DiscoveryNav
          current="culture"
          onGoToRituals={onGoToRituals}
          onGoToCalendar={onGoToCalendar}
          onGoToPlan={onGoToGoodDays}
          onGoToMap={onGoToMap}
        />

        {/* Search & Filter Toolbar */}
        <div className="py-6 border-y border-line/70 mb-10 space-y-4">
          {/* Search Input Box */}
          <div className="relative">
            <input
              type="search"
              aria-label="Tìm kiếm chuyên đề văn hóa"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(4);
              }}
              placeholder="Tìm bài viết, phong tục, lễ hội..."
              className="w-full pl-11 pr-4 py-3 rounded-panel bg-surface/70 border border-line text-base text-ink placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-accent transition-all"
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
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedRegion(r.key);
                      setVisibleCount(4);
                    }}
                    className={`min-h-11 px-3.5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
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
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedCategory(c.key);
                      setVisibleCount(4);
                    }}
                    className={`min-h-11 px-3.5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
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
              <span role="status" aria-live="polite" aria-atomic="true">
                Tìm thấy <strong>{filteredArticles.length}</strong> bài viết
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
          <section className="mb-8 sm:mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>CHUYÊN ĐỀ TÂM ĐIỂM KỲ NÀY</span>
            </div>

            <article
              className="group rounded-card overflow-hidden bg-surface border border-line shadow-xs hover:shadow-card transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 relative h-48 sm:h-72 lg:h-full overflow-hidden bg-surface-soft">
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
                    <a
                      href={`/culture-detail?articleId=${encodeURIComponent(
                        featuredArticle.id
                      )}`}
                      onClick={(event) =>
                        handleArticleLinkClick(event, featuredArticle.id)
                      }
                      className="rounded-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {featuredArticle.title}
                    </a>
                  </h2>

                  <p className="line-clamp-3 text-sm leading-relaxed text-muted sm:line-clamp-none sm:text-base">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-line/70 flex items-center justify-between">
                  <span className="text-xs text-muted italic">
                    Di sản & Không gian tín ngưỡng
                  </span>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() => onSelectArticle(featuredArticle.id)}
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
          <>
            <div
              id="culture-article-list"
              className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-3"
            >
              {visibleArticles.map((article) => (
                <article
                  key={article.id}
                  className="group border-b border-line pb-5 md:flex md:flex-col md:pb-6"
                >
                  <div className="flex items-start gap-4 md:block">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-soft md:mb-4 md:h-auto md:w-full md:aspect-16/10">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 motion-reduce:transition-none md:group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="mb-1.5 text-xs font-medium text-accent">
                        {article.region}
                        <span aria-hidden="true"> · </span>
                        {article.readingTime}
                      </p>

                      <h3 className="mb-2 font-display text-base font-bold leading-snug text-ink md:text-xl">
                        <a
                          href={`/culture-detail?articleId=${encodeURIComponent(
                            article.id
                          )}`}
                          onClick={(event) =>
                            handleArticleLinkClick(
                              event,
                              article.id
                            )
                          }
                          className="rounded-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {article.title}
                        </a>
                      </h3>

                      <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 md:mt-auto md:pt-4">
                    <span className="min-w-0 text-xs text-muted">
                      {article.category}
                    </span>

                    <a
                      href={`/culture-detail?articleId=${encodeURIComponent(
                        article.id
                      )}`}
                      onClick={(event) =>
                        handleArticleLinkClick(
                          event,
                          article.id
                        )
                      }
                      aria-label={`Đọc bài: ${article.title}`}
                      className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Đọc bài
                      <ArrowRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mb-10 mt-6 flex flex-col items-center gap-3">
              <p
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="text-sm text-muted"
              >
                Đang hiển thị {visibleArticles.length} /{" "}
                {catalogArticles.length} bài
                {featuredArticle
                  ? " trong danh sách, ngoài bài nổi bật."
                  : "."}
              </p>

              {catalogArticles.length > 4 && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={!hasMoreArticles}
                  aria-controls="culture-article-list"
                  onClick={() =>
                    setVisibleCount((count) => count + 4)
                  }
                  className="min-h-11 w-full sm:w-auto"
                >
                  {hasMoreArticles
                    ? `Xem thêm ${Math.min(
                        4,
                        catalogArticles.length -
                          visibleArticles.length
                      )} bài`
                    : "Đã hiển thị tất cả"}
                </Button>
              )}
            </div>
          </>
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
                Nội dung được giới thiệu theo góc nhìn văn hóa.
                Bạn có thể xem tài liệu tham khảo trong từng bài;
                các nguồn cần tiếp tục được đối chiếu trước khi phát hành chính thức.
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

