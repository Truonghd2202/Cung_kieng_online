import React, { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Sparkles,
  Heart,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Flower2,
  Calendar,
  Compass,
  Flame,
  Check,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { OnlineRitualDraftPanel } from "../components/OnlineRitualDraftPanel";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  RITUAL_GUIDES,
  RitualOccasionKey,
  RitualRegionKey,
  RitualGuideItem,
} from "../data/ritualData";
import { DiscoveryNav } from "../components/DiscoveryNav";

const normalizeRitualSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

interface RitualGuideScreenProps {
  currentUserEmail?: string;
  onSelectRitual: (id: string) => void;
  onGoToCulture?: () => void;
  onGoToCalendar?: () => void;
  onGoToPlan?: () => void;
  onGoToMap?: () => void;
}

export const RitualGuideScreen: React.FC<RitualGuideScreenProps> = ({
  currentUserEmail,
  onSelectRitual,
  onGoToCulture,
  onGoToCalendar,
  onGoToPlan,
  onGoToMap,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState<RitualOccasionKey>("all");
  const [selectedRegion, setSelectedRegion] = useState<RitualRegionKey>("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const OCCASIONS: { key: RitualOccasionKey; label: string; icon: string }[] = [
    { key: "all", label: "Tất cả các dịp", icon: "✦" },
    { key: "Rằm", label: "Ngày Rằm (Vọng)", icon: "🌕" },
    { key: "Mùng một", label: "Mùng Một (Sóc)", icon: "🌑" },
    { key: "Tết Nguyên Đán", label: "Tết Nguyên Đán", icon: "🏮" },
    { key: "Dịp gia đình", label: "Việc hiếu hỉ gia đạo", icon: "🏡" },
    { key: "Động thổ", label: "Khởi tạo & Động thổ", icon: "🏛️" },
  ];

  const REGIONS: { key: RitualRegionKey; label: string; icon: string }[] = [
    { key: "all", label: "Toàn quốc", icon: "🇻🇳" },
    { key: "Bắc Bộ", label: "Bắc Bộ", icon: "⛩️" },
    { key: "Trung Bộ", label: "Trung Bộ", icon: "🌊" },
    { key: "Nam Bộ", label: "Nam Bộ", icon: "🚣" },
    { key: "Thích ứng đa vùng", label: "Thích ứng căn hộ / Đa vùng", icon: "🏢" },
  ];

  const filteredItems = useMemo(() => {
    const query = normalizeRitualSearch(searchQuery);

    return RITUAL_GUIDES.filter((item) => {
      const matchesOccasion =
        selectedOccasion === "all" ||
        item.occasion === selectedOccasion;

      const matchesRegion =
        selectedRegion === "all" ||
        item.region === selectedRegion;

      const searchableText = normalizeRitualSearch(
        [
          item.title,
          item.desc,
          item.occasion,
          item.region,
          item.tagPill,
        ].join(" ")
      );

      return (
        matchesOccasion &&
        matchesRegion &&
        (!query || searchableText.includes(query))
      );
    });
  }, [searchQuery, selectedOccasion, selectedRegion]);

  const isDefaultView =
    selectedOccasion === "all" &&
    selectedRegion === "all" &&
    !searchQuery.trim();

  const featuredRitual = isDefaultView ? filteredItems[0] : null;
  const catalogRituals = isDefaultView ? filteredItems.slice(1) : filteredItems;
  const visibleItems = catalogRituals.slice(0, visibleCount);
  const hasMoreItems = visibleItems.length < catalogRituals.length;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedOccasion("all");
    setSelectedRegion("all");
    setVisibleCount(6);
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-7xl">
        {/* Top Breadcrumb & Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-2">
            {onGoToCulture ? (
              <button
                type="button"
                onClick={onGoToCulture}
                className="inline-flex min-h-11 items-center rounded-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent font-medium cursor-pointer"
              >
                Khám phá di sản
              </button>
            ) : (
              <span>Khám phá di sản</span>
            )}
            <span>/</span>
            <span className="text-amber-800 dark:text-amber-300 font-semibold">Cẩm nang nghi lễ tại gia</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-xs px-3 py-0.5 border-amber-400/40 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-medium"
            >
              ✦ NẾP SỐNG GIA ĐÌNH & ĐẠO HIẾU TRUYỀN THỐNG
            </Badge>
          </div>
        </div>

        {/* Hero Magazine 7:5 Section */}
        <section className="mb-10 p-6 sm:p-10 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-surface via-surface to-amber-500/[0.04] shadow-sm relative overflow-hidden">
          {/* Subtle Golden Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Columns: Editorial Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                    NGHI LỄ TẠI GIA · ĐƯƠNG ĐẠI & THỰC CHẤT
                  </span>
                  <span className="text-xs text-stone-400">·</span>
                  <span className="text-xs text-stone-500">Thuận hòa nếp nhà</span>
                </div>

                <h1
                  tabIndex={-1}
                  className="page-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink outline-none border-0 leading-tight tracking-tight"
                >
                  Nghi tại tâm · Lễ tại thành
                </h1>

                <p className="font-display text-base sm:text-lg text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                  Hướng dẫn chuẩn bị các tiết lễ tại gia chu đáo, tinh gọn, gạt bỏ gánh nặng mê tín dị đoan
                </p>

                <div className="p-4 rounded-2xl border-l-3 border-amber-600 bg-amber-500/[0.07] border border-amber-500/20">
                  <p className="font-display italic text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                    “Tâm xuất Phật tri, tâm thành tất ứng — Chén nước thanh tịnh, nén hương trầm mộc và tấc lòng hiếu kính quý hơn vạn mâm cỗ cồng kềnh.”
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  Nghi lễ truyền thống của người Việt cốt ở chữ <strong>Thành</strong> và chữ <strong>Hiếu</strong>.
                  Dù sống nơi căn hộ chung cư tân thời hay nhà phố nhỏ, bạn hoàn toàn có thể gìn giữ ngọn lửa tâm linh ấm áp
                  với sự thong dong, giản dị và thanh thản nhất.
                </p>
              </div>

              {/* 4 Golden Principles of Mindful Ritual */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-surface border border-line flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                    <Flower2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display text-xs font-bold text-ink block">Thanh tịnh thân tâm</span>
                    <span className="text-[11px] text-stone-500">Giữ lòng an tịnh</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-line flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display text-xs font-bold text-ink block">Giản dị thực chất</span>
                    <span className="text-[11px] text-stone-500">Quý sạch không cầu kỳ</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-line flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display text-xs font-bold text-ink block">Tùy duyên nếp nhà</span>
                    <span className="text-[11px] text-stone-500">Hợp cảnh không rập khuôn</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-line flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display text-xs font-bold text-ink block">An toàn khói lửa</span>
                    <span className="text-[11px] text-stone-500">Bảo vệ căn ấm gia đình</span>
                  </div>
                </div>
              </div>

              {/* Highlights Counter Bar */}
              <div className="pt-4 flex items-center justify-between sm:justify-start sm:gap-10 border-t border-line/60 text-xs text-stone-600 dark:text-stone-400">
                <div>
                  <strong className="font-display text-xl sm:text-2xl font-bold text-ink block">7</strong>
                  <span>Nghi lễ nếp nhà</span>
                </div>
                <div className="w-px h-8 bg-line"></div>
                <div>
                  <strong className="font-display text-xl sm:text-2xl font-bold text-ink block">3</strong>
                  <span>Miền phong tục</span>
                </div>
                <div className="w-px h-8 bg-line"></div>
                <div>
                  <strong className="font-display text-xl sm:text-2xl font-bold text-ink block">100%</strong>
                  <span>Thuần khiết & An toàn PCCC</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Visual Magazine Artwork */}
            <div className="lg:col-span-5 relative flex flex-col justify-center">
              <div className="relative overflow-hidden rounded-2xl shadow-md border border-line bg-surface-soft h-72 sm:h-80 lg:h-full min-h-[340px]">
                <img
                  src="/images/ritual_ram.jpg"
                  alt="Không gian thờ tự thanh tịnh ngày sóc vọng"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <Badge className="bg-surface/90 text-amber-800 border-amber-400/40 text-xs font-bold px-3 py-1 backdrop-blur-md">
                    ✦ GÓC HƯƠNG ÁN THIỀN TỊNH
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                    NGÀY SÓC VỌNG & TIẾT LỄ GIA TỘC
                  </span>
                  <p className="font-display text-xs sm:text-sm font-medium leading-snug drop-shadow-sm text-stone-100">
                    Chung nước mát lành, nén trầm thơm mộc và đóa sen ngát hương mở ra khoảnh khắc lắng đọng giữa nhịp sống đô thị hối hả
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discovery Navigation Hub */}
        <DiscoveryNav
          current="rituals"
          onGoToCulture={onGoToCulture}
          onGoToCalendar={onGoToCalendar}
          onGoToPlan={onGoToPlan}
          onGoToMap={onGoToMap}
        />

        {/* Search & Filter Toolbar */}
        <div className="my-8 p-6 rounded-3xl border border-line bg-surface shadow-xs space-y-5">
          {/* Search Row */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              aria-label="Tìm hướng dẫn nghi lễ"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              placeholder="Tìm nghi lễ theo dịp: ngày rằm, mùng một, giỗ gia tiên, động thổ, cúng tất niên…"
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-surface-soft/60 border border-line text-sm sm:text-base text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter: Theo Dịp */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1 mr-2 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Dịp hành lễ:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((occ) => {
                const isActive = selectedOccasion === occ.key;
                return (
                  <button
                    key={occ.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedOccasion(occ.key);
                      setVisibleCount(6);
                    }}
                    className={`min-h-10 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-red-800 to-amber-700 text-white shadow-xs font-semibold ring-1 ring-amber-500/30"
                        : "bg-surface-soft/80 border border-line text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-amber-800"
                    }`}
                  >
                    <span>{occ.icon}</span>
                    <span>{occ.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter: Vùng Miền */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-line/60">
            <span className="font-bold text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1 mr-2 shrink-0">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Vùng văn hóa:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((reg) => {
                const isActive = selectedRegion === reg.key;
                return (
                  <button
                    key={reg.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedRegion(reg.key);
                      setVisibleCount(6);
                    }}
                    className={`min-h-10 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-red-800 to-amber-700 text-white shadow-xs font-semibold ring-1 ring-amber-500/30"
                        : "bg-surface-soft/80 border border-line text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-amber-800"
                    }`}
                  >
                    <span>{reg.icon}</span>
                    <span>{reg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter & Quick Reset */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500">
          <p role="status" aria-live="polite">
            Tìm thấy <strong className="text-ink">{filteredItems.length}</strong> bài cẩm nang phù hợp
          </p>

          {(searchQuery || selectedOccasion !== "all" || selectedRegion !== "all") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Đặt lại bộ lọc</span>
            </button>
          )}
        </div>

        {/* 6 Cards Grid (3 Columns) */}
        {filteredItems.length > 0 ? (
          <>
            {/* ================= EDITORIAL COVER STORY (When browsing default) ================= */}
            {featuredRitual && (
              <section className="mb-10 sm:mb-12">
                <div className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>TIÊU ĐIỂM NGHI LỄ TẠI GIA · SÓC VỌNG ĐỊNH KỲ</span>
                </div>

                <article className="group rounded-3xl overflow-hidden bg-surface/95 border border-amber-500/35 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[320px] overflow-hidden bg-surface-soft">
                    <img
                      src={featuredRitual.image}
                      alt={featuredRitual.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/75 via-black/25 to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="px-3 py-1 bg-surface/90 backdrop-blur-md text-xs font-bold text-amber-800 dark:text-amber-300 border-amber-400/40 shadow-xs"
                      >
                        ✦ {featuredRitual.occasion}
                      </Badge>
                      <Badge className="px-3 py-1 bg-amber-700 text-white text-xs font-semibold shadow-xs">
                        {featuredRitual.region}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                        ✦ {featuredRitual.tagPill}
                      </span>
                      <p className="font-display text-xs sm:text-sm font-medium leading-snug drop-shadow-sm text-stone-100 max-w-lg">
                        Chung nước thanh khiết, nén hương mộc và đĩa quả ngọt — khoảng lặng thanh tịnh nuôi dưỡng nếp nhà.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-9 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-3">
                        <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>Thời gian thực hiện: {featuredRitual.timeEstimate}</span>
                        <span>•</span>
                        <span className="italic text-amber-700 dark:text-amber-400 font-medium">
                          {featuredRitual.stepsCount}
                        </span>
                      </div>

                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight mb-4 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                        <a
                          href={`/ritual-detail?ritualId=${encodeURIComponent(featuredRitual.id)}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectRitual(featuredRitual.id);
                          }}
                          className="rounded-sm hover:text-amber-800 dark:hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                        >
                          {featuredRitual.title}
                        </a>
                      </h2>

                      <p className="text-sm sm:text-base leading-relaxed text-stone-600 dark:text-stone-300 mb-4">
                        {featuredRitual.desc}
                      </p>

                      <div className="p-3.5 rounded-xl border-l-2 border-amber-600 bg-amber-500/5 dark:bg-amber-500/10 border border-line/60">
                        <p className="font-display italic text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                          “Cây có cội mới trổ cành xanh ngọn, nước có nguồn mới biển rộng sông sâu.”
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-line flex items-center justify-between">
                      <span className="text-xs text-stone-500 italic">
                        Nếp nhà · Thuần phong mỹ tục
                      </span>
                      <Button
                        type="button"
                        onClick={() => onSelectRitual(featuredRitual.id)}
                        className="gap-2 min-h-11 px-5 rounded-xl bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-semibold shadow-md cursor-pointer"
                      >
                        <span>Khám phá cẩm nang chi tiết</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              </section>
            )}

            {featuredRitual && (
              <div className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>CẨM NANG NGHI LỄ TIẾP THEO</span>
              </div>
            )}

            <div
              id="ritual-guide-list"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleItems.map((item) => {
                const isHighlight = item.id === "chuan-bi-ngay-ram";
                const href = `/ritual-detail?ritualId=${encodeURIComponent(item.id)}`;

                const handleOpen = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
                  onSelectRitual(item.id);
                };

                return (
                  <Card
                    key={item.id}
                    className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                      isHighlight
                        ? "border-amber-500/50 bg-gradient-to-b from-amber-500/[0.04] to-surface"
                        : "border-line bg-surface hover:border-amber-500/40"
                    }`}
                  >
                    {/* Visual Card Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-surface-soft">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-surface/90 text-amber-800 dark:text-amber-300 backdrop-blur-md shadow-xs border border-amber-400/30">
                          {item.occasion}
                        </span>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/60 text-white backdrop-blur-md border border-white/20">
                          {item.region}
                        </span>
                      </div>

                      {/* Bottom Tag Pill */}
                      <div className="absolute bottom-2.5 left-3 text-white">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-amber-300 flex items-center gap-1">
                          <span>✦</span>
                          <span>{item.tagPill}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <h2 className="font-display text-lg sm:text-xl font-bold leading-snug text-ink group-hover:text-amber-800 transition-colors mb-2">
                          <a
                            href={href}
                            onClick={handleOpen}
                            className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                          >
                            {item.title}
                          </a>
                        </h2>

                        <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                          {item.desc}
                        </p>
                      </div>

                      {/* Card Footer: Steps & Estimate & CTA */}
                      <div className="pt-3 border-t border-line flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 text-stone-500">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{item.stepsCount}</span>
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>{item.timeEstimate}</span>
                          </span>
                        </div>

                        <a
                          href={href}
                          onClick={handleOpen}
                          aria-label={`Xem hướng dẫn chi tiết: ${item.title}`}
                          className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-500/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                        >
                          <span>Chi tiết</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Load More Pagination */}
            <div className="my-10 flex flex-col items-center gap-3">
              <p
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="text-xs text-stone-500"
              >
                Đang hiển thị {visibleItems.length} / {filteredItems.length} hướng dẫn nghi lễ.
              </p>

              {filteredItems.length > 6 && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={!hasMoreItems}
                  aria-controls="ritual-guide-list"
                  onClick={() => setVisibleCount((count) => count + 6)}
                  className="min-h-11 px-6 rounded-xl border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10 font-semibold cursor-pointer"
                >
                  {hasMoreItems
                    ? `Xem thêm ${Math.min(6, filteredItems.length - visibleItems.length)} hướng dẫn khác`
                    : "Đã hiển thị toàn bộ hướng dẫn"}
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-surface border border-line my-12">
            <Compass className="w-10 h-10 mx-auto text-stone-400 mb-3" />
            <h4 className="font-display text-base font-bold text-ink mb-1">
              Chưa tìm thấy hướng dẫn phù hợp
            </h4>
            <p className="text-xs text-stone-500 mb-4 max-w-md mx-auto">
              Không có nghi lễ nào khớp với tiêu chí tìm kiếm hoặc bộ lọc hiện tại. Bạn hãy thử từ khóa khác hoặc đặt lại bộ lọc.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-xl border-amber-500/40 text-amber-800 cursor-pointer"
            >
              Đặt lại bộ lọc
            </Button>
          </div>
        )}

        {/* Philosophy & Fire Safety Pledge Banner */}
        <Card className="p-6 sm:p-8 rounded-3xl bg-surface/90 border border-amber-500/30 mb-12 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <Flower2 className="w-4 h-4 text-amber-600" />
                  <span>NGUYÊN TẮC VÀNG: TÂM THÀNH LÀM TRỌNG & AN TOÀN TUYỆT ĐỐI</span>
                </div>
                <p className="text-xs sm:text-sm text-ink leading-relaxed max-w-3xl">
                  Phong tục và tập quán có sự đa dạng tự nhiên giữa ba miền và từng gia đình. Các hướng dẫn trên mang tính gợi ý tham khảo;
                  bạn hoàn toàn có thể uyển chuyển điều chỉnh theo điều kiện thực tế. Khi thắp hương hoặc dùng đèn nến nơi căn hộ, hãy luôn chú ý
                  khoảng cách an toàn và không bao giờ để lửa cháy không người canh giữ.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Online Ritual Draft & Petition Panel */}
        <OnlineRitualDraftPanel
          key={currentUserEmail || "guest"}
          email={currentUserEmail}
        />

        {/* Classical Bottom Quote */}
        <div className="text-center pt-10 pb-6 border-t border-line mt-12">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            © {new Date().getFullYear()} Tin Lắm Tâm Linh • Chiêm nghiệm văn hóa dân gian đương đại
          </div>
        </div>
      </main>
    </div>
  );
};

