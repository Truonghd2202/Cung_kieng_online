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
import { toCultureArticle } from "../data/cultureAdapter";

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
      setArticles(remote.map(toCultureArticle));
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
    {
      key: "Sinh hoạt văn hóa",
      label: "Sinh hoạt văn hóa",
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
        <div className="discovery-masthead culture-masthead mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Introduction & Heritage Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between py-1 space-y-5">
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-400/40 rounded-full"
                >
                  ✦ Tuyển tập di sản ba miền
                </Badge>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  · Khảo cứu & Gìn giữ nếp xưa
                </span>
              </div>

              <h1
                tabIndex={-1}
                className="page-title font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-ink outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border-0 leading-tight"
              >
                Khám phá văn hóa Việt
              </h1>

              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                Hành trình tìm về câu chuyện, phong tục và không gian tín ngưỡng ba miền Bắc — Trung — Nam.
                Mỗi miền đất là một nét trầm tích dân gian, đọng lại trong nếp sống và nếp thờ tự của người Việt.
              </p>
            </div>

            {/* Philosophy Quote Box */}
            <div className="p-3.5 sm:p-4 rounded-xl border-l-2 border-amber-600 bg-amber-500/5 dark:bg-amber-500/10 border border-line/60">
              <p className="font-display italic text-xs sm:text-sm text-ink leading-relaxed">
                “Đất có lề, quê có thói — Hiểu nếp xưa để thêm thương dáng hình hiện tại.”
              </p>
            </div>

            {/* Heritage Highlights Counter Bar */}
            <div className="pt-3 flex items-center justify-between sm:justify-start sm:gap-10 border-t border-line/60 text-xs text-stone-600 dark:text-stone-400">
              <div>
                <strong className="font-display text-xl sm:text-2xl font-bold text-ink block">3</strong>
                <span>Miền di sản</span>
              </div>
              <div className="w-px h-8 bg-line"></div>
              <div>
                <strong className="font-display text-xl sm:text-2xl font-bold text-ink block">{CULTURE_ARTICLES.length}+</strong>
                <span>Chuyên đề khảo cứu</span>
              </div>
              <div className="w-px h-8 bg-line"></div>
              <div>
                <strong className="font-display text-xl sm:text-2xl font-bold text-ink block">5</strong>
                <span>Nhóm chủ đề lễ tục</span>
              </div>
            </div>
          </div>

          {/* Right Column: Heritage Visual Canvas */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-2xl shadow-md border border-line bg-surface-soft h-72 sm:h-80 lg:h-full min-h-[300px]">
              <img
                src="/images/hue_trung_bo.jpg"
                alt="Kiến trúc truyền thống xứ Huế bên hồ sen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute top-3.5 left-3.5">
                <Badge
                  variant="outline"
                  className="px-3 py-1 bg-surface/90 backdrop-blur-md text-[11px] font-bold text-amber-800 dark:text-amber-300 border-amber-400/40 shadow-xs"
                >
                  ✦ DI SẢN CỐ ĐÔ HUẾ
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                  KIẾN TRÚC TRUYỀN THỐNG VIỆT
                </span>
                <p className="font-display text-xs sm:text-sm font-medium leading-snug drop-shadow-sm text-stone-100">
                  Mặt nước hồ sen nghiêng bóng lầu son — Nơi thời gian dừng lại cùng nếp cúng tế ngàn xưa
                </p>
              </div>
            </div>
          </div>
        </div>

        <DiscoveryNav
          current="culture"
          onGoToRituals={onGoToRituals}
          onGoToCalendar={onGoToCalendar}
          onGoToPlan={onGoToGoodDays}
          onGoToMap={onGoToMap}
        />

        {/* Search & Filter Toolbar */}
        <Card className="p-5 sm:p-7 rounded-2xl border-line bg-surface/90 backdrop-blur-sm shadow-xs mb-10 space-y-5">
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
              placeholder="Tìm bài viết, phong tục, lễ hội, điển tích xưa..."
              className="w-full pl-11 pr-4 min-h-12 rounded-xl bg-surface-soft/60 focus:bg-surface border border-line text-base text-ink placeholder:text-stone-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
            <Search className="w-5 h-5 text-stone-500 absolute left-3.5 top-3.5" />
          </div>

          {/* Region Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-3 border-t border-line/50">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 min-w-[120px]">
              <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
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
                    className={`min-h-10 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 text-white font-semibold shadow-xs"
                        : "bg-surface-soft/60 text-stone-700 dark:text-stone-300 border border-line hover:border-amber-500/40 hover:text-amber-800 dark:hover:text-amber-300"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-3 border-t border-line/50">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 min-w-[120px]">
              <Tag className="w-4 h-4 text-amber-600 dark:text-amber-400" />
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
                    className={`min-h-10 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 text-white font-semibold shadow-xs"
                        : "bg-surface-soft/60 text-stone-700 dark:text-stone-300 border border-line hover:border-amber-500/40 hover:text-amber-800 dark:hover:text-amber-300"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-line/50 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              <span role="status" aria-live="polite" aria-atomic="true">
                Tìm thấy <strong className="text-ink">{filteredArticles.length}</strong> chuyên đề di sản
              </span>
            </div>

            {(selectedRegion !== "all" || selectedCategory !== "all" || searchQuery.trim()) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại bộ lọc</span>
              </button>
            )}
          </div>
        </Card>

        {/* ================= EDITORIAL COVER STORY (When browsing default) ================= */}
        {featuredArticle && (
          <section className="mb-10 sm:mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>CHUYÊN ĐỀ TÂM ĐIỂM KỲ NÀY</span>
            </div>

            <article className="group rounded-2xl overflow-hidden bg-surface/95 border border-amber-500/30 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-56 sm:h-72 lg:h-full overflow-hidden bg-surface-soft">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="px-3 py-1 bg-surface/90 backdrop-blur-md text-xs font-bold text-amber-800 dark:text-amber-300 border-amber-400/40 shadow-xs"
                  >
                    {featuredArticle.region}
                  </Badge>
                  <Badge className="px-3 py-1 bg-amber-700 text-white text-xs font-semibold shadow-xs">
                    {featuredArticle.category}
                  </Badge>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-9 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-3">
                    <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Thời gian đọc {featuredArticle.readingTime}</span>
                    <span>•</span>
                    <span className="italic text-amber-700 dark:text-amber-400 font-medium">Khảo cứu văn hóa</span>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight mb-4 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                    <a
                      href={`/culture-detail?articleId=${encodeURIComponent(
                        featuredArticle.id
                      )}`}
                      onClick={(event) =>
                        handleArticleLinkClick(event, featuredArticle.id)
                      }
                      className="rounded-sm hover:text-amber-800 dark:hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      {featuredArticle.title}
                    </a>
                  </h2>

                  <p className="line-clamp-3 text-sm sm:text-base leading-relaxed text-stone-600 dark:text-stone-300">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs text-stone-500 italic">
                    Di sản & Không gian tín ngưỡng
                  </span>
                  <Button
                    type="button"
                    onClick={() => onSelectArticle(featuredArticle.id)}
                    className="gap-2 min-h-11 px-5 rounded-xl bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-semibold shadow-md cursor-pointer"
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
          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-line">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-gradient-to-b from-red-800 to-amber-600 rounded-full"></span>
              <h2 className="font-display font-bold text-lg sm:text-xl text-ink">
                {isDefaultView ? "Các chuyên đề di sản chọn lọc" : "Kết quả tra cứu"}
              </h2>
            </div>
            <span className="text-xs font-medium text-stone-500">
              {catalogArticles.length} chuyên đề
            </span>
          </div>
        )}

        {/* Articles Grid or Empty State */}
        {filteredArticles.length === 0 ? (
          <Card className="p-12 text-center rounded-2xl bg-surface/95 border-line max-w-lg mx-auto shadow-xs my-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-ink mb-2">
              Chưa tìm thấy chuyên đề phù hợp
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
              Không có bài viết nào khớp với từ khóa hoặc bộ lọc hiện tại. Bạn có thể thử tìm
              từ khóa khác hoặc đặt lại bộ lọc.
            </p>
            <Button
              type="button"
              onClick={handleResetFilters}
              className="min-h-11 px-6 rounded-xl bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 text-white font-semibold cursor-pointer shadow-md"
            >
              Đặt lại tất cả bộ lọc
            </Button>
          </Card>
        ) : (
          <>
            <div
              id="culture-article-list"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10"
            >
              {visibleArticles.map((article) => (
                <Card
                  key={article.id}
                  className="group rounded-2xl border-line bg-surface/95 hover:bg-surface-soft/80 p-5 flex flex-col justify-between shadow-xs hover:shadow-sm hover:border-amber-500/40 transition-all duration-300"
                >
                  <div>
                    <div className="relative overflow-hidden rounded-xl bg-surface-soft aspect-16/10 mb-4">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge
                        variant="outline"
                        className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-surface/90 backdrop-blur-md text-xs font-semibold text-amber-800 dark:text-amber-300 border-amber-400/40"
                      >
                        {article.region}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>{article.readingTime}</span>
                      <span>·</span>
                      <span className="font-medium text-amber-700 dark:text-amber-400">{article.category}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold leading-snug text-ink mb-2 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                      <a
                        href={`/culture-detail?articleId=${encodeURIComponent(
                          article.id
                        )}`}
                        onClick={(event) =>
                          handleArticleLinkClick(event, article.id)
                        }
                        className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                      >
                        {article.title}
                      </a>
                    </h3>

                    <p className="line-clamp-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300 mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      Chuyên đề di sản
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectArticle(article.id)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-600 transition-colors cursor-pointer"
                    >
                      <span>Đọc bài</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mb-12 flex flex-col items-center gap-3">
              <p
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="text-xs sm:text-sm text-stone-500"
              >
                Đang hiển thị {visibleArticles.length} / {catalogArticles.length} bài
                {featuredArticle ? " (ngoài bài tâm điểm)." : "."}
              </p>

              {catalogArticles.length > 4 && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={!hasMoreArticles}
                  aria-controls="culture-article-list"
                  onClick={() => setVisibleCount((count) => count + 4)}
                  className="min-h-11 px-7 rounded-xl border-line text-ink hover:text-accent font-semibold cursor-pointer"
                >
                  {hasMoreArticles
                    ? `Xem thêm ${Math.min(
                        4,
                        catalogArticles.length - visibleArticles.length
                      )} chuyên đề`
                    : "Đã hiển thị tất cả"}
                </Button>
              )}
            </div>
          </>
        )}

        {/* Editorial Principles Callout Banner */}
        <Card className="p-6 sm:p-8 rounded-2xl border-line bg-surface/95 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16 shadow-xs backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-0.5">
                Thông điệp của Tin Lắm Tâm Linh
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-1.5">
                NGUYÊN TẮC BIÊN TẬP & BẢO TỒN DI SẢN
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                Nội dung được giới thiệu theo góc nhìn văn hóa, tôn trọng đa dạng tập tục vùng miền.
                Bạn có thể xem tài liệu tham khảo chi tiết trong từng bài viết để cùng gìn giữ nếp xưa.
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className="px-4 py-2 rounded-full bg-amber-500/10 border-amber-400/40 text-xs font-semibold text-amber-800 dark:text-amber-300 shrink-0 self-start sm:self-auto"
          >
            Bảo tồn văn hóa phi vật thể
          </Badge>
        </Card>
      </main>
    </div>
  );
};

