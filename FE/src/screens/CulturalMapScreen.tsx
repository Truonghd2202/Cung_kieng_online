import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Landmark,
  Waves,
  Sparkles,
  MapPin,
  BookOpen,
  Info,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { CULTURE_ARTICLES, RegionKey } from "../data/cultureData";
import {
  VIETNAM_NORTH_PATHS,
  VIETNAM_CENTRAL_PATHS,
  VIETNAM_SOUTH_PATHS,
} from "../data/vietnamMapData";

export type CultureRegionSlug = "north" | "central" | "south";

interface CulturalMapScreenProps {
  onBackToCulture: () => void;
  onSelectRegion: (region: CultureRegionSlug) => void;
}

interface LandmarkPoint {
  id: string;
  name: string;
  province: string;
  desc: string;
  x: number;
  y: number;
  category: string;
}

interface RegionDetail {
  slug: CultureRegionSlug;
  title: string;
  regionName: RegionKey;
  subtitle: string;
  image: string;
  icon: React.ElementType;
  themeColor: string;
  gradientFill: string;
  tagline: string;
  quote: string;
  description: string;
  landmarks: LandmarkPoint[];
  heritageHighlights: {
    icon: string;
    title: string;
    desc: string;
  }[];
}

const REGION_DATA: Record<CultureRegionSlug, RegionDetail> = {
  north: {
    slug: "north",
    title: "Bắc Bộ",
    regionName: "Bắc Bộ",
    subtitle: "Đình làng · Chầu văn · Nếp nhà cổ truyền",
    image: "/images/temple_bac_bo.jpg",
    icon: Landmark,
    themeColor: "amber",
    gradientFill: "url(#gradNorthDetail)",
    tagline: "Cội nguồn nghìn năm văn vật bên dòng sông Hồng",
    quote: "“Dù ai đi ngược về xuôi — Nhớ ngày Giỗ Tổ mùng mười tháng ba.”",
    description:
      "Vùng đất khởi thủy của dòng chảy lịch sử Việt Nam với những nếp làng thuần hậu, bóng đa bến nước sân đình, tục thờ Thành hoàng và tín ngưỡng thờ Mẫu Tam phủ huyền diệu.",
    landmarks: [
      {
        id: "den-hung",
        name: "Đền Hùng",
        province: "Phú Thọ",
        desc: "Không gian thiêng liêng tưởng nhớ cội nguồn dân tộc, nơi vua Hùng dựng nước Văn Lang.",
        x: 448,
        y: 190,
        category: "Di tích Quốc gia đặc biệt",
      },
      {
        id: "thang-long",
        name: "Hoàng thành Thăng Long",
        province: "Hà Nội",
        desc: "Kinh đô ngàn năm văn hiến, trung tâm chính trị và văn hóa rực rỡ qua các triều đại.",
        x: 499,
        y: 223,
        category: "Di sản Thế giới UNESCO",
      },
      {
        id: "chua-huong",
        name: "Quần thể Chùa Hương",
        province: "Hà Nội",
        desc: "Miền đất Phật thanh tịnh giữa suối Yến và núi non trùng điệp mùa lễ hội đầu xuân.",
        x: 490,
        y: 245,
        category: "Không gian tín ngưỡng",
      },
      {
        id: "dinh-tay-dang",
        name: "Đình Tây Đằng",
        province: "Hà Nội",
        desc: "Ngôi đình cổ thế kỷ XVI lưu giữ đỉnh cao nghệ thuật chạm khắc gỗ dân gian xứ Đoài.",
        x: 472,
        y: 215,
        category: "Kiến trúc đình làng",
      },
      {
        id: "yen-tu",
        name: "Kinh đô Phật giáo Yên Tử",
        province: "Quảng Ninh",
        desc: "Đất tổ Phật giáo Trúc Lâm do Phật hoàng Trần Nhân Tông khai sáng, hòa quyện thiền và đời.",
        x: 574,
        y: 173,
        category: "Di sản Phật giáo",
      },
    ],
    heritageHighlights: [
      {
        icon: "⛩️",
        title: "Đình làng & Tục thờ Thành hoàng",
        desc: "Không gian thiêng gắn kết làng xã, nơi tri ân công đức tiền nhân khai hoang mở cõi và bảo hộ cư dân.",
      },
      {
        icon: "🪕",
        title: "Nghi lễ Chầu văn & Thờ Mẫu Tam phủ",
        desc: "Nghi lễ thực hành tâm linh độc đáo tôn vinh thiên nhiên, đất trời và công tích lịch sử dân tộc.",
      },
      {
        icon: "🏡",
        title: "Nếp nhà gia phong & Đạo hiếu",
        desc: "Không gian thờ phụng gia tiên trang nghiêm trong mỗi ngôi nhà cổ, gìn giữ nền nếp hiếu thuận qua bao đời.",
      },
    ],
  },
  central: {
    slug: "central",
    title: "Trung Bộ",
    regionName: "Trung Bộ",
    subtitle: "Cố đô Huế · Lễ Cầu Ngư · Đất Mẹ Duyên Hải",
    image: "/images/hue_trung_bo.jpg",
    icon: Compass,
    themeColor: "rose",
    gradientFill: "url(#gradCentralDetail)",
    tagline: "Trầm mặc kinh thành cổ và lời nguyện bình an hướng ra biển mẹ",
    quote: "“Gió đưa cành trúc la đà — Tiếng chuông Thiên Mụ, canh gà Thọ Xương.”",
    description:
      "Dải đất hẹp gánh hai đầu đất nước, nơi di sản hoàng cung uy nghiêm hòa nhịp cùng tín ngưỡng thờ phụng của cư dân duyên hải và đồng bào miền duyên sơn.",
    landmarks: [
      {
        id: "lam-kinh",
        name: "Khu di tích Lam Kinh",
        province: "Thanh Hóa",
        desc: "Đất phát tích cuộc khởi nghĩa Lam Sơn oanh liệt và cội nguồn triều đại Hậu Lê.",
        x: 445,
        y: 250,
        category: "Di tích Lịch sử Quốc gia",
      },
      {
        id: "co-do-hue",
        name: "Quần thể Cố đô Huế",
        province: "Thừa Thiên Huế",
        desc: "Kinh đô triều Nguyễn với hệ thống thành quách, lăng tẩm và nhã nhạc cung đình mẫu mực.",
        x: 575,
        y: 488,
        category: "Di sản Thế giới UNESCO",
      },
      {
        id: "hoi-an",
        name: "Đô thị cổ Hội An",
        province: "Quảng Nam",
        desc: "Thương cảng quốc tế cổ truyền giao thoa văn hóa Đông - Tây với nếp sống trầm mặc đèn lồng.",
        x: 647,
        y: 565,
        category: "Di sản Thế giới UNESCO",
      },
      {
        id: "my-son",
        name: "Thánh địa Mỹ Sơn",
        province: "Quảng Nam",
        desc: "Quần thể tháp Chăm huyền bí ẩn mình giữa thung lũng thiêng, dấu tích vương triều cổ xưa.",
        x: 635,
        y: 575,
        category: "Di sản Thế giới UNESCO",
      },
      {
        id: "cau-ngu",
        name: "Vạn chài Cầu Ngư Cá Ông",
        province: "Khánh Hòa",
        desc: "Tín ngưỡng thiêng liêng của ngư dân miền biển, gửi gắm lòng biết ơn và cầu sóng yên biển lặng.",
        x: 708,
        y: 736,
        category: "Lễ hội dân gian duyên hải",
      },
    ],
    heritageHighlights: [
      {
        icon: "🏯",
        title: "Tế lễ cung đình & Lăng tẩm phong thủy",
        desc: "Đỉnh cao tư duy kiến trúc và lễ tế giao hòa đất trời, lưu giữ tinh hoa lễ nhạc ngàn xưa.",
      },
      {
        icon: "🌊",
        title: "Tín ngưỡng thờ Cá Ông & Lễ Cầu Ngư",
        desc: "Văn hóa tâm linh gắn liền số phận con người với biển cả, tôn vinh lòng nhân nghĩa và tương trợ.",
      },
      {
        icon: "🏮",
        title: "Đêm rằm hoài niệm & Ánh sáng tịnh độ",
        desc: "Tập tục tắt đèn hiện đại, thắp sáng lồng đèn và thả hoa đăng ước nguyện bình an giữa lòng phố cổ.",
      },
    ],
  },
  south: {
    slug: "south",
    title: "Nam Bộ",
    regionName: "Nam Bộ",
    subtitle: "Phù sa · Sông nước miệt vườn · Hội Vía Bà Chúa Xứ",
    image: "/images/mekong_nam_bo.jpg",
    icon: Waves,
    themeColor: "emerald",
    gradientFill: "url(#gradSouthDetail)",
    tagline: "Phóng khoáng phương Nam và ân tình sâu nặng của đất phù sa",
    quote: "“Nhà Bè nước chảy chia hai — Ai về Gia Định Đồng Nai thì về.”",
    description:
      "Vùng đồng bằng trù phú bao dung, nơi hội tụ các lớp cư dân mở cõi tạo nên diện mạo tâm linh đa dạng, hào sảng, trọng tình nghĩa và chan hòa với thiên nhiên.",
    landmarks: [
      {
        id: "sai-gon",
        name: "Chợ Lớn & Sài Gòn Cổ Tự",
        province: "TP. Hồ Chí Minh",
        desc: "Không gian giao thoa tín ngưỡng đặc sắc với các hội quán cổ, chùa Giác Lâm, chùa Ngọc Hoàng.",
        x: 567,
        y: 843,
        category: "Di tích Kiến trúc Nghệ thuật",
      },
      {
        id: "ba-chua-xu",
        name: "Miếu Bà Chúa Xứ Núi Sam",
        province: "An Giang",
        desc: "Trung tâm hành hương tâm linh bậc nhất Nam Bộ, biểu tượng che chở và ban phúc cho nhân dân.",
        x: 465,
        y: 816,
        category: "Di sản Phi vật thể Quốc gia",
      },
      {
        id: "can-tho",
        name: "Sông nước Cần Thơ & Đình Bình Thủy",
        province: "Cần Thơ",
        desc: "Di tích kiến trúc nghệ thuật cổ kính gắn liền văn hóa sông nước trù phú miền Tây Đô.",
        x: 487,
        y: 842,
        category: "Văn hóa Sông nước Nam Bộ",
      },
      {
        id: "dat-mui",
        name: "Đất Mũi Cà Mau",
        province: "Cà Mau",
        desc: "Cực Nam linh thiêng của Tổ quốc, nơi phù sa lấn biển và rừng đước bạt ngàn ôm ấp mầm sống.",
        x: 443,
        y: 897,
        category: "Địa đầu non sông",
      },
    ],
    heritageHighlights: [
      {
        icon: "🌺",
        title: "Lễ hội Vía Bà Chúa Xứ Núi Sam",
        desc: "Lễ hội tâm linh tầm vóc quy tụ hàng triệu người hành hương mỗi năm cầu nguyện bình an, tài lộc.",
      },
      {
        icon: "🚣",
        title: "Tập quán ghe thuyền & Tín ngưỡng sông nước",
        desc: "Nếp sống nương theo con nước, tôn kính Bà Thủy Long, Bà Cậu và sự hào sảng bao bọc đồng loại.",
      },
      {
        icon: "🕯️",
        title: "Lễ hội Ok Om Bok & Thả hoa đăng",
        desc: "Lễ cúng Trăng tạ ơn đất trời ban mùa màng tươi tốt, biểu tượng tình đoàn kết keo sơn Kinh - Khmer - Hoa.",
      },
    ],
  },
};

export const CulturalMapScreen: React.FC<CulturalMapScreenProps> = ({
  onBackToCulture,
  onSelectRegion,
}) => {
  const [activeSlug, setActiveSlug] = useState<CultureRegionSlug>("central");
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkPoint | null>(
    REGION_DATA.central.landmarks[1]
  );
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const currentRegion = REGION_DATA[activeSlug];
  const regionArticles = CULTURE_ARTICLES.filter(
    (a) => a.region === currentRegion.regionName
  );

  const handleSelectRegionTab = (slug: CultureRegionSlug) => {
    setActiveSlug(slug);
    setSelectedLandmark(REGION_DATA[slug].landmarks[0]);
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-7xl">
        {/* Top Breadcrumb Nav */}
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-stone-600 dark:text-stone-400">
          <button
            onClick={onBackToCulture}
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Khám phá văn hóa</span>
          </button>

          <Badge
            variant="outline"
            className="text-xs px-2.5 py-0.5 font-medium border-amber-400/40 text-amber-800 dark:text-amber-300 bg-amber-500/10"
          >
            ✦ HÀNH TRÌNH DI SẢN CHỮ S
          </Badge>
        </div>

        {/* Header Title Section */}
        <header className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
            DÒNG CHẢY TÍN NGƯỠNG ĐẤT NƯỚC
          </span>
          <h1
            tabIndex={-1}
            className="page-title mt-1.5 mb-2.5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border-0 leading-tight"
          >
            Bản đồ di sản văn hóa ba miền
          </h1>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
            Hành trình địa lý tương tác tái hiện trọn vẹn non sông gấm vóc hình chữ S với 63 tỉnh thành và hải đảo thiêng liêng.
            Chạm vào từng miền đất để lắng nghe câu chuyện tâm linh, chiêm bái di tích cổ và cảm nhận mạch nguồn dân tộc.
          </p>
        </header>

        {/* Region Quick Selector Buttons */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {(["north", "central", "south"] as const).map((slug) => {
            const region = REGION_DATA[slug];
            const isActive = activeSlug === slug;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => handleSelectRegionTab(slug)}
                className={`min-h-11 px-5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2.5 shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 text-white shadow-md ring-2 ring-amber-500/30"
                    : "bg-surface text-stone-700 dark:text-stone-300 border border-line hover:border-amber-500/40 hover:text-amber-800 dark:hover:text-amber-300"
                }`}
              >
                <span>{slug === "north" ? "⛩️" : slug === "central" ? "🏯" : "🚣"}</span>
                <span>Miền {region.title}</span>
                <span className="text-xs opacity-75 hidden sm:inline">
                  — {region.subtitle.split("·")[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Split View Layout: Detailed Geographic S-Map (Left) & Heritage Insight Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* ================= LEFT: GEOGRAPHIC ACCURATE S-MAP ================= */}
          <div className="lg:col-span-6 xl:col-span-5">
            <Card className="p-4 sm:p-6 rounded-2xl border-line bg-surface/95 shadow-sm backdrop-blur-sm relative overflow-hidden">
              {/* Map Canvas Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-line">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span className="font-display text-sm font-bold text-ink">
                    Bản đồ địa lý di sản Việt Nam
                  </span>
                </div>
                {hoveredProvince ? (
                  <Badge variant="outline" className="text-[11px] px-2 py-0 border-amber-500/40 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-medium">
                    Tỉnh/TP: {hoveredProvince}
                  </Badge>
                ) : (
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 italic">
                    * Nhấp miền hoặc điểm ghim
                  </span>
                )}
              </div>

              {/* Vector SVG S-Map Canvas */}
              <div className="relative w-full aspect-[5/7.4] max-h-[640px] mx-auto flex items-center justify-center bg-stone-100/70 dark:bg-stone-900/50 rounded-xl border border-line/60 p-2 overflow-hidden shadow-inner">
                <svg
                  viewBox="190 20 630 960"
                  className="w-full h-full drop-shadow-md select-none"
                  aria-label="Bản đồ tương tác di sản Việt Nam 63 tỉnh thành hình chữ S"
                >
                  <defs>
                    {/* Rich Gradients for North, Central, South */}
                    <linearGradient id="gradNorthDetail" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#d97706" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#b45309" stopOpacity="1" />
                    </linearGradient>

                    <linearGradient id="gradCentralDetail" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#e11d48" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#9f1239" stopOpacity="1" />
                    </linearGradient>

                    <linearGradient id="gradSouthDetail" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#059669" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#065f46" stopOpacity="1" />
                    </linearGradient>

                    {/* Aura Glow Filter for Active Region */}
                    <filter id="auraGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Gentle Sea Ripple Wave Lines (Biển Đông) */}
                  <path
                    d="M 520 280 Q 680 340 640 520 T 730 750"
                    fill="none"
                    stroke="rgba(217, 119, 6, 0.16)"
                    strokeWidth="1.5"
                    strokeDasharray="5 7"
                  />
                  <path
                    d="M 560 250 Q 720 370 670 560 T 760 790"
                    fill="none"
                    stroke="rgba(217, 119, 6, 0.1)"
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                  />

                  {/* Compass Rose Ornament in East Sea */}
                  <g transform="translate(735, 110)" className="opacity-55 pointer-events-none">
                    <circle cx="0" cy="0" r="26" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-amber-800 dark:text-amber-300" />
                    <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" className="text-amber-800 dark:text-amber-300" />
                    <line x1="0" y1="-32" x2="0" y2="32" stroke="currentColor" strokeWidth="1.2" className="text-amber-800 dark:text-amber-300" />
                    <line x1="-32" y1="0" x2="32" y2="0" stroke="currentColor" strokeWidth="1.2" className="text-amber-800 dark:text-amber-300" />
                    <polygon points="0,-28 5,-8 0,-14 -5,-8" fill="#b45309" />
                    <polygon points="28,0 8,5 14,0 8,-5" fill="currentColor" className="text-amber-700/60" />
                    <text x="0" y="-36" textAnchor="middle" className="text-[11px] font-bold fill-amber-900 dark:fill-amber-300 font-display">
                      BẮC
                    </text>
                  </g>

                  {/* Biển Đông Typography Label */}
                  <g transform="translate(680, 290)" className="pointer-events-none opacity-40 select-none">
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      className="text-[14px] font-display font-bold uppercase tracking-[0.25em] fill-amber-900 dark:fill-amber-200"
                    >
                      B I Ể N   Đ Ô N G
                    </text>
                  </g>

                  {/* ================= 1. BẮC BỘ PROVINCES ================= */}
                  <g
                    id="region-north"
                    className="cursor-pointer"
                    onClick={() => handleSelectRegionTab("north")}
                    filter={activeSlug === "north" ? "url(#auraGlow)" : undefined}
                  >
                    {VIETNAM_NORTH_PATHS.map((p) => {
                      const isActive = activeSlug === "north";
                      const isHover = hoveredProvince === p.name;
                      return (
                        <path
                          key={p.id}
                          d={p.d}
                          fill={
                            isActive
                              ? isHover
                                ? "#fbbf24"
                                : "url(#gradNorthDetail)"
                              : isHover
                              ? "rgba(245, 158, 11, 0.45)"
                              : "rgba(245, 158, 11, 0.22)"
                          }
                          stroke={
                            isActive
                              ? "#78350f"
                              : isHover
                              ? "rgba(180, 83, 9, 0.7)"
                              : "rgba(180, 83, 9, 0.35)"
                          }
                          strokeWidth={isActive ? "1" : "0.6"}
                          strokeLinejoin="round"
                          className="transition-colors duration-200"
                          onMouseEnter={() => setHoveredProvince(p.name)}
                          onMouseLeave={() => setHoveredProvince(null)}
                        />
                      );
                    })}
                  </g>

                  {/* ================= 2. TRUNG BỘ PROVINCES ================= */}
                  <g
                    id="region-central"
                    className="cursor-pointer"
                    onClick={() => handleSelectRegionTab("central")}
                    filter={activeSlug === "central" ? "url(#auraGlow)" : undefined}
                  >
                    {VIETNAM_CENTRAL_PATHS.map((p) => {
                      const isActive = activeSlug === "central";
                      const isHover = hoveredProvince === p.name;
                      return (
                        <path
                          key={p.id}
                          d={p.d}
                          fill={
                            isActive
                              ? isHover
                                ? "#fb7185"
                                : "url(#gradCentralDetail)"
                              : isHover
                              ? "rgba(244, 63, 94, 0.45)"
                              : "rgba(244, 63, 94, 0.22)"
                          }
                          stroke={
                            isActive
                              ? "#881337"
                              : isHover
                              ? "rgba(159, 18, 57, 0.7)"
                              : "rgba(159, 18, 57, 0.35)"
                          }
                          strokeWidth={isActive ? "1" : "0.6"}
                          strokeLinejoin="round"
                          className="transition-colors duration-200"
                          onMouseEnter={() => setHoveredProvince(p.name)}
                          onMouseLeave={() => setHoveredProvince(null)}
                        />
                      );
                    })}
                  </g>

                  {/* ================= 3. NAM BỘ PROVINCES ================= */}
                  <g
                    id="region-south"
                    className="cursor-pointer"
                    onClick={() => handleSelectRegionTab("south")}
                    filter={activeSlug === "south" ? "url(#auraGlow)" : undefined}
                  >
                    {VIETNAM_SOUTH_PATHS.map((p) => {
                      const isActive = activeSlug === "south";
                      const isHover = hoveredProvince === p.name;
                      return (
                        <path
                          key={p.id}
                          d={p.d}
                          fill={
                            isActive
                              ? isHover
                                ? "#34d399"
                                : "url(#gradSouthDetail)"
                              : isHover
                              ? "rgba(16, 185, 129, 0.45)"
                              : "rgba(16, 185, 129, 0.22)"
                          }
                          stroke={
                            isActive
                              ? "#064e3b"
                              : isHover
                              ? "rgba(6, 95, 70, 0.7)"
                              : "rgba(6, 95, 70, 0.35)"
                          }
                          strokeWidth={isActive ? "1" : "0.6"}
                          strokeLinejoin="round"
                          className="transition-colors duration-200"
                          onMouseEnter={() => setHoveredProvince(p.name)}
                          onMouseLeave={() => setHoveredProvince(null)}
                        />
                      );
                    })}
                  </g>

                  {/* ================= 4. ISLANDS & ARCHIPELAGOS ================= */}
                  {/* Quần đảo Hoàng Sa (Việt Nam) */}
                  <g className="cursor-default select-none">
                    {/* Coral Reef Atolls */}
                    <circle cx="745" cy="412" r="5.5" fill="#d97706" className="drop-shadow-xs" />
                    <circle cx="758" cy="402" r="4.2" fill="#d97706" />
                    <circle cx="768" cy="415" r="4" fill="#d97706" />
                    <circle cx="738" cy="425" r="4.5" fill="#d97706" />
                    <circle cx="755" cy="432" r="3.8" fill="#d97706" />
                    <circle cx="772" cy="438" r="3.2" fill="#d97706" />

                    <text x="755" y="458" textAnchor="middle" className="text-[11px] font-bold fill-stone-800 dark:fill-stone-200 font-display">
                      QĐ. Hoàng Sa
                    </text>
                    <text x="755" y="470" textAnchor="middle" className="text-[9.5px] font-medium fill-amber-700 dark:fill-amber-400">
                      (Việt Nam)
                    </text>
                  </g>

                  {/* Quần đảo Trường Sa (Việt Nam) - Dịch ra khơi thoáng đãng */}
                  <g className="cursor-default select-none">
                    {/* Coral Reef Islands */}
                    <circle cx="755" cy="745" r="5" fill="#d97706" className="drop-shadow-xs" />
                    <circle cx="770" cy="755" r="4.2" fill="#d97706" />
                    <circle cx="745" cy="770" r="4" fill="#d97706" />
                    <circle cx="780" cy="780" r="4.5" fill="#d97706" />
                    <circle cx="760" cy="795" r="3.8" fill="#d97706" />
                    <circle cx="788" cy="810" r="3.2" fill="#d97706" />
                    <circle cx="735" cy="800" r="3.5" fill="#d97706" />

                    <text x="762" y="836" textAnchor="middle" className="text-[11px] font-bold fill-stone-800 dark:fill-stone-200 font-display">
                      QĐ. Trường Sa
                    </text>
                    <text x="762" y="848" textAnchor="middle" className="text-[9.5px] font-medium fill-amber-700 dark:fill-amber-400">
                      (Việt Nam)
                    </text>
                  </g>

                  {/* Đảo Phú Quốc (Kiên Giang) */}
                  <g className="cursor-default select-none">
                    <path
                      d="M 386 865 C 388 860 393 862 396 868 C 398 876 397 888 393 894 C 390 898 384 892 384 882 Z"
                      fill="#059669"
                      stroke="#065f46"
                      strokeWidth="1"
                      className="drop-shadow-xs"
                    />
                    <text x="388" y="907" textAnchor="middle" className="text-[9.5px] font-bold fill-stone-700 dark:fill-stone-300">
                      Đ. Phú Quốc
                    </text>
                  </g>

                  {/* Quần đảo Côn Đảo (Bà Rịa - Vũng Tàu) */}
                  <g className="cursor-default select-none">
                    <ellipse cx="582" cy="922" rx="4.5" ry="3.2" fill="#059669" stroke="#065f46" strokeWidth="0.8" />
                    <circle cx="589" cy="925" r="2" fill="#059669" />
                    <text x="596" y="934" textAnchor="start" className="text-[9px] font-medium fill-stone-600 dark:fill-stone-400">
                      Côn Đảo
                    </text>
                  </g>

                  {/* ================= 5. INTERACTIVE CULTURAL LANDMARK PINS ================= */}
                  {currentRegion.landmarks.map((lm) => {
                    const isSelected = selectedLandmark?.id === lm.id;
                    const isHovered = hoveredLandmark === lm.id;

                    return (
                      <g
                        key={lm.id}
                        className="cursor-pointer group"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLandmark(lm);
                        }}
                        onMouseEnter={() => setHoveredLandmark(lm.id)}
                        onMouseLeave={() => setHoveredLandmark(null)}
                      >
                        {/* Animated pulse wave */}
                        <circle
                          cx={lm.x}
                          cy={lm.y}
                          r={isSelected ? "14" : "9"}
                          className="animate-ping opacity-35 fill-red-500"
                        />

                        {/* Outer Pin Halo */}
                        <circle
                          cx={lm.x}
                          cy={lm.y}
                          r={isSelected ? "8.5" : "6"}
                          className={`transition-all duration-300 ${
                            isSelected
                              ? "fill-amber-400 stroke-red-800 stroke-[3]"
                              : "fill-white stroke-red-700 stroke-[2.2]"
                          }`}
                        />

                        {/* Core center dot */}
                        <circle
                          cx={lm.x}
                          cy={lm.y}
                          r={isSelected ? "3.5" : "2.5"}
                          className="fill-red-800"
                        />

                        {/* Pin Floating Tooltip - Chỉ hiện khi hover để không che bản đồ */}
                        {isHovered && (
                          <g className="transition-opacity duration-200 pointer-events-none">
                            <rect
                              x={lm.x - 70}
                              y={lm.y - 38}
                              width="140"
                              height="28"
                              rx="7"
                              className="fill-stone-900/95 stroke-amber-500/70 stroke-1 shadow-xl"
                            />
                            <text
                              x={lm.x}
                              y={lm.y - 20}
                              textAnchor="middle"
                              className="fill-white text-[11px] font-bold"
                            >
                              {lm.name}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Map Legend Bar - Nằm ngoài canvas, hoàn toàn không che Phú Quốc hay Cà Mau */}
              <div className="mt-3 p-2.5 rounded-xl border border-line bg-surface-soft/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3 font-medium text-ink">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <span>Bắc Bộ</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
                    <span>Trung Bộ</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                    <span>Nam Bộ</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                  <span>Điểm ghim di sản tâm linh</span>
                </div>
              </div>

              {/* Landmark Selection Grid Below Map */}
              <div className="mt-4 pt-3.5 border-t border-line">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-2">
                  TỌA ĐỘ TÂM LINH MIỀN {currentRegion.title.toUpperCase()}:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {currentRegion.landmarks.map((lm) => {
                    const isSelected = selectedLandmark?.id === lm.id;
                    return (
                      <button
                        key={lm.id}
                        type="button"
                        onClick={() => setSelectedLandmark(lm)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-500/50 text-ink ring-1 ring-amber-500/30"
                            : "bg-surface-soft/60 hover:bg-surface border-line/60 text-stone-700 dark:text-stone-300"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-semibold text-xs text-ink">
                          <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-amber-700 dark:text-amber-400" : "text-stone-400"}`} />
                          <span className="truncate">{lm.name}</span>
                        </div>
                        <p className="text-[10px] text-stone-500 truncate mt-0.5 ml-5">{lm.province}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* ================= RIGHT: HERITAGE INSIGHT & LANDMARK DETAIL ================= */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            {/* Main Showcase Card */}
            <Card className="rounded-2xl border-line bg-surface/95 overflow-hidden shadow-sm backdrop-blur-sm">
              {/* Region Landscape Artwork */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-surface-soft">
                <img
                  src={currentRegion.image}
                  alt={currentRegion.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge className="bg-surface/90 backdrop-blur-md text-amber-800 dark:text-amber-300 border-amber-400/40 text-xs font-bold px-3 py-1">
                    Miền {currentRegion.title}
                  </Badge>
                  <span className="text-white text-xs px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md">
                    {currentRegion.subtitle.split("·")[0].trim()}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                    KHÔNG GIAN VĂN HÓA ĐẶC TRƯNG
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm">
                    {currentRegion.tagline}
                  </h2>
                </div>
              </div>

              {/* Detail Content Body */}
              <div className="p-6 sm:p-7 space-y-6">
                {/* Folk Quote */}
                <div className="p-3.5 rounded-xl border-l-2 border-amber-600 bg-amber-500/5 dark:bg-amber-500/10 border border-line/60">
                  <p className="font-display italic text-xs sm:text-sm text-ink leading-relaxed">
                    {currentRegion.quote}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                  {currentRegion.description}
                </p>

                {/* Selected Landmark Showcase Spotlight */}
                {selectedLandmark && (
                  <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-surface to-orange-500/5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                        <h3 className="font-display text-base sm:text-lg font-bold text-ink">
                          {selectedLandmark.name}
                        </h3>
                      </div>
                      <Badge variant="outline" className="text-[11px] border-amber-400/40 text-amber-800 dark:text-amber-300 bg-amber-500/10">
                        {selectedLandmark.category}
                      </Badge>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {selectedLandmark.desc}
                    </p>
                    <span className="text-[11px] text-stone-500 block mt-2">
                      📍 Tọa lạc tại: <strong className="text-ink">{selectedLandmark.province}</strong>
                    </span>
                  </div>
                )}

                {/* 3 Heritage Pillars */}
                <div className="space-y-3 pt-2 border-t border-line">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block">
                    3 NÉT ĐẸP CĂN CỐT CỦA MIỀN {currentRegion.title.toUpperCase()}:
                  </span>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {currentRegion.heritageHighlights.map((hl) => (
                      <div
                        key={hl.title}
                        className="p-3.5 rounded-xl border border-line bg-surface-soft/60 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-2xl block mb-2">{hl.icon}</span>
                          <h4 className="font-display font-bold text-xs sm:text-sm text-ink mb-1">
                            {hl.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed mt-2">
                          {hl.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Articles of this region */}
                {regionArticles.length > 0 && (
                  <div className="pt-3 border-t border-line">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>CHUYÊN ĐỀ ĐÃ KHẢO CỨU:</span>
                      </span>
                      <span className="text-xs text-stone-500">
                        {regionArticles.length} bài viết
                      </span>
                    </div>

                    <div className="space-y-2">
                      {regionArticles.slice(0, 2).map((art) => (
                        <div
                          key={art.id}
                          className="p-3 rounded-xl border border-line/70 bg-surface-soft/40 flex items-start justify-between gap-3"
                        >
                          <div>
                            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block">
                              {art.category}
                            </span>
                            <h5 className="font-display text-xs sm:text-sm font-bold text-ink mt-0.5">
                              {art.title}
                            </h5>
                          </div>
                          <span className="text-[11px] text-stone-500 shrink-0 mt-0.5">
                            {art.readingTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-stone-500 italic">
                    Khám phá chi tiết các bài viết & khảo cứu miền {currentRegion.title}
                  </span>

                  <Button
                    type="button"
                    onClick={() => onSelectRegion(currentRegion.slug)}
                    className="min-h-12 px-6 rounded-xl bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-semibold shadow-md cursor-pointer gap-2 shrink-0"
                  >
                    <span>Mở chuyên đề {currentRegion.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Banner Philosophy */}
        <Card className="p-6 sm:p-8 rounded-2xl border-line bg-surface/90 flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-14 shadow-xs backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-1">
                TÔN TRỌNG ĐA DẠNG BẢN SẮC
              </span>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                Bắc — Trung — Nam mỗi miền có địa lý, thổ nhưỡng và phong tục khác nhau,
                nhưng đều chung một ước vọng hướng thiện, hiếu kính tổ tiên và cầu chúc bình an cho xóm làng.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onBackToCulture}
            className="rounded-xl border-line text-ink hover:text-accent font-semibold shrink-0 cursor-pointer self-start sm:self-auto min-h-11 px-5"
          >
            Quay lại thư viện bài viết
          </Button>
        </Card>
      </main>
    </div>
  );
};
