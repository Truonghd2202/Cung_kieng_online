import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Compass,
  Landmark,
  Waves,
  Clock,
  ShieldCheck,
  Headphones,
  MapPin,
  Flame,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { CULTURE_ARTICLES, RegionKey } from "../data/cultureData";
import { REGIONAL_TOPICS } from "../data/regionalTopics";
import type { CultureRegionSlug } from "./CulturalMapScreen";
import type { RegionalExperienceKind } from "./RegionalExperienceScreen";

interface RegionCultureScreenProps {
  region: CultureRegionSlug;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
  onGoToExperience: () => void;
  onGoToRegionalExperience: (kind: RegionalExperienceKind) => void;
}

interface RegionMetaDetail {
  slug: CultureRegionSlug;
  title: string;
  region: RegionKey;
  icon: string;
  themeGradient: string;
  activeRing: string;
  badgeBg: string;
  badgeText: string;
  quote: string;
  tagline: string;
  image: string;
  imageCaption: string;
  description: string;
  heritagePillars: {
    icon: string;
    title: string;
    desc: string;
  }[];
  experience: {
    kind: RegionalExperienceKind;
    title: string;
    subtitle: string;
    desc: string;
    icon: React.ElementType;
    badge: string;
  };
}

const REGION_META_MAP: Record<CultureRegionSlug, RegionMetaDetail> = {
  north: {
    slug: "north",
    title: "Bắc Bộ",
    region: "Bắc Bộ",
    icon: "⛩️",
    themeGradient: "from-amber-700 via-amber-800 to-amber-950",
    activeRing: "ring-amber-500/40",
    badgeBg: "bg-amber-500/10 border-amber-400/40",
    badgeText: "text-amber-800 dark:text-amber-300",
    quote: "“Dù ai đi ngược về xuôi — Nhớ ngày Giỗ Tổ mùng mười tháng ba.”",
    tagline: "Cội nguồn ngàn năm văn vật bên dòng sông Hồng",
    image: "/images/temple_bac_bo.jpg",
    imageCaption: "Mái đình cong vút rêu phong — Không gian thiêng lưu giữ nếp làng xứ Bắc",
    description:
      "Vùng đất khởi nguồn của nền văn minh lúa nước và dòng chảy lịch sử dân tộc. Nơi đây từng nhịp thở của làng xã gắn liền với bóng cây đa bến nước sân đình, tục thờ Thành hoàng bảo trợ cư dân, và hệ thống tín ngưỡng thờ Mẫu Tam phủ huyền diệu tôn vinh đất trời.",
    heritagePillars: [
      {
        icon: "🏛️",
        title: "Đình làng & Đạo thờ Thành hoàng",
        desc: "Trung tâm tâm linh và sinh hoạt cộng đồng, tri ân tiền nhân khai hoang lập ấp.",
      },
      {
        icon: "🪕",
        title: "Nghi lễ Hầu đồng & Nhịp điệu Chầu văn",
        desc: "Di sản phi vật thể nhân loại tôn vinh Mẫu Đệ Nhất, Mẫu Đệ Nhị, Mẫu Đệ Tam.",
      },
      {
        icon: "🏮",
        title: "Nếp nhà gia lễ & Gia tiên cổ truyền",
        desc: "Sự tôn nghiêm trong mỗi gian thờ gia đình, giữ trọn chữ hiếu qua bao thăng trầm.",
      },
    ],
    experience: {
      kind: "chau-van",
      title: "Nhịp điệu Chầu văn & Không gian Đền Phủ",
      subtitle: "Thực hành tĩnh tâm hòa cùng âm hưởng linh thiêng",
      desc: "Lắng nghe thanh âm đàn nguyệt, tiếng phách nhịp nhàng và lời ca chúc phúc trong nghi lễ chầu văn truyền thống.",
      icon: Headphones,
      badge: "Âm thanh & Trực giác",
    },
  },
  central: {
    slug: "central",
    title: "Trung Bộ",
    region: "Trung Bộ",
    icon: "🏯",
    themeGradient: "from-rose-700 via-rose-800 to-rose-950",
    activeRing: "ring-rose-500/40",
    badgeBg: "bg-rose-500/10 border-rose-400/40",
    badgeText: "text-rose-800 dark:text-rose-300",
    quote: "“Gió đưa cành trúc la đà — Tiếng chuông Thiên Mụ, canh gà Thọ Xương.”",
    tagline: "Kinh thành trầm mặc và lời cầu nguyện bình an nơi duyên hải",
    image: "/images/hue_trung_bo.jpg",
    imageCaption: "Cố đô Huế u nhã bóng hoàng cung — Tinh hoa tế lễ giao hòa cùng non nước",
    description:
      "Dải đất hẹp gánh hai đầu đất nước, nơi di sản hoàng triều uy nghiêm và nhã nhạc cung đình mẫu mực hòa nhịp cùng tiếng sóng biển Đông. Cư dân duyên hải gắn chặt sinh mệnh với biển cả, nuôi dưỡng tín ngưỡng thờ Cá Ông và nghĩa cử đùm bọc kiên cường.",
    heritagePillars: [
      {
        icon: "🏯",
        title: "Tế lễ Cung đình & Lăng tẩm phong thủy",
        desc: "Đỉnh cao kiến trúc giao hòa thiên nhiên và hệ thống điển chế tế tự nghìn xưa.",
      },
      {
        icon: "🌊",
        title: "Tín ngưỡng thờ Cá Ông & Lễ Cầu Ngư",
        desc: "Lòng biết ơn biển mẹ và nghĩa tình nhân đạo sâu đậm của người dân vạn chài.",
      },
      {
        icon: "🪔",
        title: "Đêm rằm hoài niệm & Ánh sáng tịnh độ",
        desc: "Nếp sống tĩnh tại phố cổ, hoa đăng ước nguyện an lành trôi trên dòng sông Hoài.",
      },
    ],
    experience: {
      kind: "sea-prayer",
      title: "Lời nguyện Cầu Ngư & Tiếng chuông Thiên Mụ",
      subtitle: "Chiêm nghiệm thanh tịnh giữa mênh mông biển trời",
      desc: "Hòa nhịp cùng nghi thức gửi lời chúc bình an đến những người thân yêu và cảm nhận tiếng chuông chùa vang vọng.",
      icon: Flame,
      badge: "Gửi niệm an lành",
    },
  },
  south: {
    slug: "south",
    title: "Nam Bộ",
    region: "Nam Bộ",
    icon: "🚣",
    themeGradient: "from-emerald-700 via-emerald-800 to-emerald-950",
    activeRing: "ring-emerald-500/40",
    badgeBg: "bg-emerald-500/10 border-emerald-400/40",
    badgeText: "text-emerald-800 dark:text-emerald-300",
    quote: "“Nhà Bè nước chảy chia hai — Ai về Gia Định Đồng Nai thì về.”",
    tagline: "Đất phù sa phóng khoáng và ân tình sâu nặng phương Nam",
    image: "/images/mekong_nam_bo.jpg",
    imageCaption: "Sông nước miệt vườn chở nặng phù sa — Tấm lòng thơm thảo bao dung mở cõi",
    description:
      "Vùng đồng bằng màu mỡ được bồi đắp bởi dòng Cửu Long cuồn cuộn. Nơi lớp lớp cư dân đa tộc người (Kinh, Khmer, Hoa, Chăm) cùng khai hoang mở cõi, hình thành diện mạo tâm linh hào sảng, trọng ân nghĩa, bao dung và gắn bó keo sơn với sông nước miệt vườn.",
    heritagePillars: [
      {
        icon: "🌺",
        title: "Lễ hội Vía Bà Chúa Xứ Núi Sam",
        desc: "Biểu tượng tâm linh chở che và ban phước lành bậc nhất đất phương Nam.",
      },
      {
        icon: "🛶",
        title: "Tập quán ghe thuyền & Tín ngưỡng Thủy Long",
        desc: "Lối sống nương theo con nước, tôn kính Bà Thủy và sự đùm bọc nghĩa tình.",
      },
      {
        icon: "🌕",
        title: "Lễ cúng Trăng Ok Om Bok & Hoa đăng",
        desc: "Lễ tạ ơn đất trời ban mùa màng thịnh vượng, kết nối tình đoàn kết các dân tộc.",
      },
    ],
    experience: {
      kind: "southern-culture",
      title: "Dòng sông kể chuyện & Hoa đăng đất phương Nam",
      subtitle: "Thả hoa đăng ước nguyện giữa mênh mang sông nước",
      desc: "Trải nghiệm thả đèn hoa đăng tạ ơn đất trời, gửi gắm ước nguyện bình an và lòng biết ơn tổ tiên bồi đắp.",
      icon: Waves,
      badge: "Nguyện ước bình an",
    },
  },
};

export const RegionCultureScreen: React.FC<RegionCultureScreenProps> = ({
  region: initialRegion,
  onBack,
  onSelectArticle,
  onGoToExperience,
  onGoToRegionalExperience,
}) => {
  const [selectedRegionSlug, setSelectedRegionSlug] = useState<CultureRegionSlug>(initialRegion);

  const meta = REGION_META_MAP[selectedRegionSlug];
  const topics = REGIONAL_TOPICS[selectedRegionSlug] || [];
  const articles = CULTURE_ARTICLES.filter(
    (article) => article.region === meta.region
  );

  const handleArticleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    articleId: string
  ) => {
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
        {/* Top Breadcrumb Nav & Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-stone-600 dark:text-stone-400">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Bản đồ di sản chữ S</span>
          </button>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`text-xs px-3 py-0.5 font-semibold ${meta.badgeBg} ${meta.badgeText}`}
            >
              ✦ KHẢO CỨU VĂN HÓA {meta.title.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Region Quick Selector Buttons */}
        <div className="flex items-center gap-2.5 mb-8 overflow-x-auto pb-1">
          {(["north", "central", "south"] as const).map((slug) => {
            const rMeta = REGION_META_MAP[slug];
            const isActive = selectedRegionSlug === slug;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => setSelectedRegionSlug(slug)}
                className={`min-h-11 px-5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2.5 shrink-0 ${
                  isActive
                    ? `bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 text-white shadow-md ring-2 ${rMeta.activeRing}`
                    : "bg-surface text-stone-700 dark:text-stone-300 border border-line hover:border-amber-500/40 hover:text-amber-800 dark:hover:text-amber-300"
                }`}
              >
                <span>{rMeta.icon}</span>
                <span>Miền {rMeta.title}</span>
                <span className="text-xs opacity-75 hidden sm:inline">
                  — {rMeta.tagline.split("bên")[0].split("và")[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hero Editorial Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Heritage Identity & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
                  DI SẢN TRẦM TÍCH PHƯƠNG TRỜI
                </span>
                <span className="text-xs text-stone-500">·</span>
                <span className="text-xs text-stone-500">Nếp xưa muôn thuở</span>
              </div>

              <h1
                tabIndex={-1}
                className="page-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border-0 leading-tight"
              >
                Nét văn hóa {meta.title}
              </h1>

              <p className="font-display text-base sm:text-lg text-amber-800 dark:text-amber-400 font-medium leading-relaxed">
                {meta.tagline}
              </p>

              {/* Quote Ca dao Cổ truyền */}
              <div className="p-4 rounded-xl border-l-2 border-amber-600 bg-amber-500/5 dark:bg-amber-500/10 border border-line/60">
                <p className="font-display italic text-xs sm:text-sm text-ink leading-relaxed">
                  {meta.quote}
                </p>
              </div>

              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                {meta.description}
              </p>
            </div>

            {/* Quick Stats Bar */}
            <div className="pt-4 flex items-center justify-between sm:justify-start sm:gap-10 border-t border-line/60 text-xs text-stone-600 dark:text-stone-400">
              <div>
                <strong className="font-display text-xl sm:text-2xl font-bold text-ink block">
                  {articles.length}
                </strong>
                <span>Chuyên đề khảo cứu</span>
              </div>
              <div className="w-px h-8 bg-line"></div>
              <div>
                <strong className="font-display text-xl sm:text-2xl font-bold text-ink block">
                  {topics.length}
                </strong>
                <span>Không gian tín ngưỡng</span>
              </div>
              <div className="w-px h-8 bg-line"></div>
              <div>
                <strong className="font-display text-xl sm:text-2xl font-bold text-ink block">
                  3
                </strong>
                <span>Nét đẹp căn cốt</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Canvas */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-2xl shadow-md border border-line bg-surface-soft h-72 sm:h-80 lg:h-full min-h-[340px]">
              <img
                src={meta.image}
                alt={meta.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="px-3 py-1 bg-surface/90 backdrop-blur-md text-xs font-bold text-amber-800 dark:text-amber-300 border-amber-400/40 shadow-xs"
                >
                  ✦ DI SẢN MIỀN {meta.title.toUpperCase()}
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                  DANH THẮNG & NẾP THỜ TỰ
                </span>
                <p className="font-display text-xs sm:text-sm font-medium leading-snug drop-shadow-sm text-stone-100">
                  {meta.imageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Heritage Pillars Section */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-1.5 h-5 bg-gradient-to-b from-red-800 to-amber-600 rounded-full"></span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-ink">
              3 Trụ cột di sản của miền {meta.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {meta.heritagePillars.map((pillar, idx) => (
              <Card
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border-line bg-surface/95 hover:bg-surface-soft/80 shadow-xs transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl block mb-3">{pillar.icon}</span>
                  <h3 className="font-display text-base font-bold text-ink mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-line/60 text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <span>Trầm tích văn hóa dân gian</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Cultural Topics & Sanctuaries */}
        <section className="mb-14">
          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-line">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="font-display font-bold text-xl sm:text-2xl text-ink">
                Không gian tín ngưỡng & Điển tích tiêu biểu
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {topics.length} địa hạt khảo cứu
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => {
              const matchedArticle = topic.articleId
                ? articles.find((a) => a.id === topic.articleId)
                : undefined;

              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    if (topic.articleId) {
                      onSelectArticle(topic.articleId);
                    }
                  }}
                  className={`p-4 rounded-xl border border-line bg-surface/90 hover:bg-surface-soft transition-all duration-200 flex flex-col justify-between ${
                    topic.articleId ? "cursor-pointer group hover:border-amber-500/50 hover:shadow-xs" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-400/30">
                        {meta.title}
                      </span>
                      {topic.articleId && (
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                      )}
                    </div>
                    <h3 className="font-display text-sm font-bold text-ink mb-1 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                      {topic.label}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                      {matchedArticle?.subtitle || "Không gian văn hóa tín ngưỡng đặc sắc được bảo tồn và thực hành qua nhiều thế hệ."}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-line/60 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400">
                      {topic.articleId ? "✦ Đã có khảo cứu chi tiết" : "✦ Đang bổ sung tư liệu"}
                    </span>
                    {topic.articleId && (
                      <span className="font-semibold text-amber-700 dark:text-amber-400 group-hover:underline">
                        Khám phá
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Curated Regional Articles List */}
        <section className="mb-14">
          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-line">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="font-display font-bold text-xl sm:text-2xl text-ink">
                Tuyển tập chuyên đề miền {meta.title}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {articles.length} bài viết
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
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
                    <span className="font-medium text-amber-700 dark:text-amber-400">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold leading-snug text-ink mb-2 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                    <a
                      href={`/culture-detail?articleId=${encodeURIComponent(article.id)}`}
                      onClick={(e) => handleArticleLinkClick(e, article.id)}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300 mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs text-stone-500">Chuyên đề di sản</span>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article.id)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    <span>Đọc bài</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Sensory Ritual Experience Showcase (Call to Action) */}
        <Card className="p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-surface to-orange-500/5 mb-14 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-800 dark:text-amber-300 shrink-0">
                <meta.experience.icon className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[11px] px-2.5 py-0.5 border-amber-500/40 text-amber-800 dark:text-amber-300 bg-amber-500/10">
                    {meta.experience.badge}
                  </Badge>
                  <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                    KHÔNG GIAN TRẢI NGHIỆM MIỀN {meta.title.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                  {meta.experience.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                  {meta.experience.desc}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Button
                type="button"
                onClick={() => onGoToRegionalExperience(meta.experience.kind)}
                className="w-full sm:w-auto min-h-12 px-6 rounded-xl bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-semibold shadow-md cursor-pointer gap-2"
              >
                <span>Mở không gian {meta.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Editorial Footnote */}
        <Card className="p-6 sm:p-8 rounded-2xl border-line bg-surface/95 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-14 shadow-xs backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-1">
                TÔN TRỌNG ĐA DẠNG BẢN SẮC
              </span>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                Nội dung khảo cứu văn hóa ba miền được biên soạn dựa trên các tư liệu khảo cứu lịch sử,
                tôn vinh giá trị thuần hậu và nếp sống tốt đẹp của người Việt qua bao thế hệ.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="rounded-xl border-line text-ink hover:text-accent font-semibold shrink-0 cursor-pointer self-start sm:self-auto min-h-11 px-5"
          >
            Quay lại bản đồ di sản
          </Button>
        </Card>
      </main>
    </div>
  );
};
