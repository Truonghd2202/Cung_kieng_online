import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Compass, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import {
  VIETNAM_CENTRAL_PATHS,
  VIETNAM_NORTH_PATHS,
  VIETNAM_SOUTH_PATHS,
} from "../data/vietnamMapData";

export type CultureRegionSlug = "north" | "central" | "south";

interface CulturalMapScreenProps {
  onBackToCulture: () => void;
  onSelectRegion: (region: CultureRegionSlug) => void;
}

interface HeritagePoint {
  title: string;
  location: string;
  source: string;
  url: string;
  x: number;
  y: number;
}

const REGIONS: Record<CultureRegionSlug, {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  color: string;
  paths: typeof VIETNAM_NORTH_PATHS;
  points: HeritagePoint[];
}> = {
  north: {
    title: "Bắc Bộ",
    subtitle: "Di sản và thực hành văn hóa miền Bắc",
    image: "/images/temple_bac_bo.jpg",
    description: "Một số di sản và thực hành văn hóa miền Bắc được UNESCO ghi danh, kèm nguồn để tiếp tục tìm hiểu.",
    color: "#991b1b",
    paths: VIETNAM_NORTH_PATHS,
    points: [
      { title: "Khu di tích trung tâm Hoàng thành Thăng Long", location: "Hà Nội", source: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1328/", x: 499, y: 223 },
      { title: "Tín ngưỡng thờ cúng Hùng Vương", location: "Phú Thọ", source: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/worship-of-hng-kings-in-ph-th-00735", x: 448, y: 190 },
      { title: "Hội Gióng tại đền Phù Đổng và đền Sóc", location: "Hà Nội", source: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/giong-festival-of-phu-djong-and-soc-temples-00443", x: 515, y: 239 },
    ],
  },
  central: {
    title: "Trung Bộ",
    subtitle: "Di sản và thực hành văn hóa miền Trung",
    image: "/images/hue_trung_bo.jpg",
    description: "Khám phá đô thị cổ Hội An qua hồ sơ Di sản Thế giới của UNESCO.",
    color: "#fffdfa",
    paths: VIETNAM_CENTRAL_PATHS,
    points: [
      { title: "Đô thị cổ Hội An", location: "Quảng Nam", source: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/948/", x: 647, y: 565 },
    ],
  },
  south: {
    title: "Nam Bộ",
    subtitle: "Di sản và thực hành văn hóa miền Nam",
    image: "/images/mekong_nam_bo.jpg",
    description: "Tìm hiểu nghệ thuật Đờn ca tài tử Nam Bộ qua hồ sơ di sản văn hóa phi vật thể của UNESCO.",
    color: "#348b78",
    paths: VIETNAM_SOUTH_PATHS,
    points: [
      { title: "Nghệ thuật Đờn ca tài tử Nam Bộ", location: "Nam Bộ", source: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/art-of-don-ca-tai-tu-music-and-song-in-south-viet-nam-00733", x: 540, y: 850 },
    ],
  },
};

const REGION_ORDER: CultureRegionSlug[] = ["north", "central", "south"];

export const CulturalMapScreen: React.FC<CulturalMapScreenProps> = ({ onBackToCulture, onSelectRegion }) => {
  const [activeRegion, setActiveRegion] = useState<CultureRegionSlug>("central");
  const current = REGIONS[activeRegion];

  const chooseRegion = (region: CultureRegionSlug) => setActiveRegion(region);
  const onRegionKeyDown = (event: React.KeyboardEvent<SVGGElement>, region: CultureRegionSlug) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseRegion(region);
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-7xl">
        <div className="mb-5 flex items-center justify-between gap-3 text-xs text-muted">
          <Button type="button" variant="ghost" onClick={onBackToCulture} className="min-h-11 gap-2 px-2">
            <ArrowLeft className="h-4 w-4" /> Khám phá văn hóa
          </Button>
          <Badge variant="outline" className="hidden border-accent/30 text-accent sm:inline-flex">Ba miền · Một dòng chảy</Badge>
        </div>

        <header className="relative mb-7 overflow-hidden rounded-[1.75rem] border border-[#e7d4c1] bg-[linear-gradient(110deg,#fffaf3_0%,#f7ecdf_58%,#f1e4d7_100%)] px-5 py-6 shadow-[0_12px_35px_rgba(87,44,29,0.08)] sm:mb-9 sm:px-9 sm:py-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border border-[#cda35b]/25 sm:right-12 sm:-top-44 sm:h-[26rem] sm:w-[26rem]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-2 -top-14 h-56 w-56 rounded-full border border-[#cda35b]/20 sm:right-24 sm:-top-32 sm:h-[21rem] sm:w-[21rem]" />
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#9b1c28]/15 bg-white/65 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-[#8b1a26] sm:text-xs"><Compass className="h-3.5 w-3.5" /> BẮC · TRUNG · NAM</span>
              <h1 className="page-title mb-2 mt-3 font-display text-3xl font-bold leading-tight text-[#301c19] sm:text-5xl">Một dải đất,<br className="sm:hidden" /> ba miền di sản</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-[#69564d] sm:text-base">Theo dấu những lớp văn hóa trên bản đồ Việt Nam. Chọn một miền để gặp các di sản và câu chuyện có nguồn tham khảo.</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-white/80 bg-white/65 px-4 py-3 shadow-sm sm:self-auto">
              <span className="font-display text-3xl font-bold leading-none text-[#9b1c28]">03</span>
              <span className="max-w-24 text-xs font-semibold leading-snug text-[#69564d]">miền văn hóa<br />trên một bản đồ</span>
            </div>
          </div>
        </header>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1" aria-label="Chọn miền văn hóa">
          {REGION_ORDER.map((region) => (
            <Button key={region} type="button" variant={activeRegion === region ? "default" : "outline"} aria-pressed={activeRegion === region} onClick={() => chooseRegion(region)} className="min-h-11 shrink-0">
              {REGIONS[region].title}
            </Button>
          ))}
        </div>

        <div className="culture-map-layout">
          <Card className="w-full min-w-0 overflow-hidden border-[#e6d5c4] bg-[#fffdfa] p-3 shadow-[0_16px_45px_rgba(69,37,27,0.10)] sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-2 border-b border-[#eadccf] pb-3">
              <div className="flex items-center gap-2 font-display text-base font-bold text-ink"><Compass className="h-4 w-4 text-accent" /> Bản đồ văn hóa</div>
              <span className="rounded-full bg-[#f6eee5] px-3 py-1.5 text-xs font-medium text-[#766359]">Chạm vào miền để khám phá</span>
            </div>
            <div className="relative mx-auto aspect-[5/7.2] max-h-[720px] overflow-hidden rounded-[1.25rem] border border-[#dac5af] bg-[radial-gradient(ellipse_at_48%_40%,#fffdf9_0%,#f5eee4_72%,#eee4d8_100%)] p-2 shadow-inner sm:p-3">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(130,91,69,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(130,91,69,.07)_1px,transparent_1px)] [background-size:34px_34px]" />
              <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-lg border border-[#eadbc9] bg-[#fffaf1]/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                <p className="text-[10px] font-bold tracking-[0.14em] text-[#927a66]">VIỆT NAM</p>
                <p className="mt-0.5 font-display text-sm font-bold text-[#462b23]">Dải đất di sản</p>
              </div>
              <svg viewBox="190 20 630 960" className="relative z-[1] h-full w-full select-none drop-shadow-[0_8px_8px_rgba(76,43,31,0.20)]" role="group" aria-labelledby="culture-map-title culture-map-desc">
                <title id="culture-map-title">Bản đồ minh họa văn hóa ba miền Việt Nam</title>
                <desc id="culture-map-desc">Chọn Bắc Bộ, Trung Bộ hoặc Nam Bộ trên bản đồ để xem các điểm văn hóa có nguồn.</desc>
                <defs>
                  <linearGradient id="region-north" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d94d56" /><stop offset="100%" stopColor="#941b2a" /></linearGradient>
                  <linearGradient id="region-central" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fffdf8" /><stop offset="100%" stopColor="#e8d9c7" /></linearGradient>
                  <linearGradient id="region-south" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a5d3c3" /><stop offset="100%" stopColor="#348b78" /></linearGradient>
                  <filter id="selected-region-glow" x="-25%" y="-15%" width="150%" height="130%"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <text x="680" y="290" textAnchor="middle" className="fill-[#9a8874] font-display text-[14px] font-semibold tracking-[0.2em]">BIỂN ĐÔNG</text>
                {REGION_ORDER.map((slug) => {
                  const region = REGIONS[slug];
                  const active = activeRegion === slug;
                  return (
                    <g key={slug} role="button" tabIndex={0} aria-label={`Chọn ${region.title}`} aria-pressed={active} onClick={() => chooseRegion(slug)} onKeyDown={(event) => onRegionKeyDown(event, slug)} className="cursor-pointer outline-none" filter={active ? "url(#selected-region-glow)" : undefined}>
                      {region.paths.map((province) => <path key={province.id} d={province.d} fill={slug === "central" ? "url(#region-central)" : slug === "north" ? "url(#region-north)" : "url(#region-south)"} fillOpacity={active ? 1 : 0.76} stroke={slug === "central" ? "#a58e78" : slug === "north" ? "#6f1620" : "#246c5e"} strokeOpacity={active ? 0.78 : 0.58} strokeWidth={active ? 1.15 : 0.85} strokeLinejoin="round" className="transition-opacity duration-200 hover:opacity-100" />)}
                    </g>
                  );
                })}
                {REGION_ORDER.flatMap((slug) => REGIONS[slug].points.map((point) => (
                  <g key={`${slug}-${point.title}`} className="pointer-events-none">
                    <circle cx={point.x} cy={point.y} r={activeRegion === slug ? 9 : 6} fill="#9b1c28" fillOpacity={activeRegion === slug ? 1 : 0.78} stroke="#fffaf0" strokeWidth="3" />
                    {activeRegion === slug && <><circle cx={point.x} cy={point.y} r="15" fill="none" stroke="#9b1c28" strokeOpacity="0.36" strokeWidth="2" /><circle cx={point.x} cy={point.y} r="20" fill="none" stroke="#c9a34a" strokeOpacity="0.42" strokeWidth="1" /></>}
                  </g>
                )))}
              </svg>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-line bg-surface-soft px-3 py-2.5 text-xs">
              {REGION_ORDER.map((slug) => <button key={slug} type="button" onClick={() => chooseRegion(slug)} className="inline-flex min-h-8 items-center gap-2 rounded px-1 font-medium text-ink hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"><span className="h-3 w-3 rounded-full border border-black/15" style={{ backgroundColor: REGIONS[slug].color }} />{REGIONS[slug].title}</button>)}
              <span className="ml-auto inline-flex items-center gap-1.5 text-muted"><MapPin className="h-3.5 w-3.5 text-accent" /> Điểm văn hóa</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">Bản đồ minh họa để khám phá văn hóa, không dùng để tra cứu địa giới hành chính.</p>
          </Card>

          <Card className="w-full min-w-0 overflow-hidden border-[#e6d5c4] bg-[#fffdfa] shadow-[0_16px_45px_rgba(69,37,27,0.10)]">
            <div className="relative h-48 overflow-hidden bg-surface-soft sm:h-52">
              <img src={current.image} alt={`Ảnh minh họa ${current.title}`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <Badge className="absolute left-4 top-4 border-white/40 bg-black/45 text-white">{current.title}</Badge>
              <h2 className="absolute bottom-4 left-4 right-4 font-display text-2xl font-bold text-white sm:text-3xl">{current.subtitle}</h2>
            </div>
            <div className="space-y-5 p-5 sm:p-7">
              <p className="text-sm leading-relaxed text-muted sm:text-base">{current.description}</p>
              <section aria-labelledby="heritage-points-heading">
                <div className="mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /><h3 id="heritage-points-heading" className="font-display font-bold text-ink">Điểm văn hóa có nguồn đối chiếu</h3></div>
                <div className="space-y-3">
                  {current.points.map((point) => <article key={point.title} className="rounded-xl border border-line bg-surface-soft p-4"><p className="text-xs font-semibold text-muted">{point.location}</p><h4 className="mt-1 font-semibold text-ink">{point.title}</h4><a href={point.url} target="_blank" rel="noreferrer" className="mt-2 inline-block min-h-8 text-sm text-accent underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">Nguồn: {point.source}</a></article>)}
                </div>
              </section>
              <div className="flex items-start gap-3 rounded-xl border border-line bg-surface-soft p-4 text-sm text-muted"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><p>Nội dung có liên kết nguồn để bạn đọc và đối chiếu thêm.</p></div>
              <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between"><span className="text-sm text-muted">Mở chuyên đề {current.title}</span><Button type="button" onClick={() => onSelectRegion(activeRegion)} className="min-h-11 gap-2">Khám phá miền này <ArrowRight className="h-4 w-4" /></Button></div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
