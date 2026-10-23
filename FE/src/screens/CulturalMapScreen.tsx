import React from "react";
import { ArrowLeft, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";

export type CultureRegionSlug = "north" | "central" | "south";

interface CulturalMapScreenProps {
  onBackToCulture: () => void;
  onSelectRegion: (region: CultureRegionSlug) => void;
}

const REGIONS: Array<{ slug: CultureRegionSlug; title: string; subtitle: string }> = [
  { slug: "north", title: "Bắc Bộ", subtitle: "Mở nội dung và trải nghiệm miền Bắc" },
  { slug: "central", title: "Trung Bộ", subtitle: "Mở nội dung và trải nghiệm miền Trung" },
  { slug: "south", title: "Nam Bộ", subtitle: "Mở nội dung và trải nghiệm miền Nam" },
];

const HIGHLIGHTS: Record<CultureRegionSlug, Array<{ title: string; location: string; source: string; url: string }>> = {
  north: [
    { title: "Khu di tích trung tâm Hoàng thành Thăng Long", location: "Hà Nội", source: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1328/" },
    { title: "Tín ngưỡng thờ cúng Hùng Vương", location: "Phú Thọ", source: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/worship-of-hng-kings-in-ph-th-00735" },
    { title: "Hội Gióng tại đền Phù Đổng và đền Sóc", location: "Hà Nội", source: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/giong-festival-of-phu-djong-and-soc-temples-00443" },
  ],
  central: [
    { title: "Đô thị cổ Hội An", location: "Quảng Nam", source: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/948/" },
  ],
  south: [
    { title: "Nghệ thuật Đờn ca tài tử Nam Bộ", location: "Nam Bộ", source: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/art-of-don-ca-tai-tu-music-and-song-in-south-viet-nam-00733" },
  ],
};

export const CulturalMapScreen: React.FC<CulturalMapScreenProps> = ({ onBackToCulture, onSelectRegion }) => (
  <div className="screen-shell">
    <main className="page-container max-w-4xl">
      <Button type="button" variant="outline" onClick={onBackToCulture} className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Về Khám phá văn hóa
      </Button>
      <Card className="border-line bg-surface p-6 sm:p-10">
        <section className="mb-6 grid items-center gap-5 rounded-2xl border border-line bg-surface-soft p-4 sm:grid-cols-[minmax(180px,240px)_1fr] sm:p-6" aria-label="So do vung mien Viet Nam">
          <svg viewBox="0 0 220 390" role="img" aria-label="So do ba mien Viet Nam, chon mot mien de kham pha" className="mx-auto h-72 w-44">
            <defs><clipPath id="vietnam-map-clip"><path d="M68 17 96 25 113 39 137 43 150 58 143 73 159 83 147 97 160 111 147 127 156 143 143 158 151 174 137 187 145 203 132 216 142 233 127 247 136 264 120 278 126 294 112 307 117 322 103 335 98 354 84 369 68 362 59 347 43 340 37 322 49 303 54 286 64 269 58 251 67 234 61 217 73 199 67 181 80 164 73 147 86 130 80 113 94 96 88 78 103 62 97 45 81 37Z"/></clipPath></defs>
            <g clipPath="url(#vietnam-map-clip)"><rect x="25" y="10" width="150" height="115" fill="hsl(var(--accent))" opacity=".78"/><rect x="25" y="125" width="150" height="125" fill="#d7a84b" opacity=".82"/><rect x="25" y="250" width="150" height="130" fill="#6f9b7a" opacity=".9"/><path d="M25 125h150M25 250h150" stroke="hsl(var(--line))" strokeWidth="2" strokeDasharray="5 5"/></g>
            <path d="M68 17 96 25 113 39 137 43 150 58 143 73 159 83 147 97 160 111 147 127 156 143 143 158 151 174 137 187 145 203 132 216 142 233 127 247 136 264 120 278 126 294 112 307 117 322 103 335 98 354 84 369 68 362 59 347 43 340 37 322 49 303 54 286 64 269 58 251 67 234 61 217 73 199 67 181 80 164 73 147 86 130 80 113 94 96 88 78 103 62 97 45 81 37Z" fill="none" stroke="hsl(var(--line))" strokeWidth="3" strokeLinejoin="round"/>
            {([{ slug: "north", y: 76, label: "B" }, { slug: "central", y: 187, label: "T" }, { slug: "south", y: 304, label: "N" }] as const).map((region) => <g key={region.slug} role="button" tabIndex={0} aria-label={`Kham pha mien ${region.label}`} onClick={() => onSelectRegion(region.slug)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelectRegion(region.slug); } }} className="cursor-pointer"><circle cx="109" cy={region.y} r="14" fill="hsl(var(--surface))" stroke="hsl(var(--line))" strokeWidth="2"/><text x="109" y={region.y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(var(--ink))">{region.label}</text></g>)}
          </svg>
          <div><h2 className="font-display text-lg font-bold text-ink">Ban do vung mien tuong tac</h2><p className="mt-2 text-sm leading-relaxed text-muted">So do minh hoa chia Viet Nam thanh ba vung. Chon mot mien tren ban do hoac cac nut ben duoi de xem noi dung va trai nghiem tuong ung; day khong phai ban do duong di.</p></div>
        </section>
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <MapPin className="h-4 w-4" />
          <span>Bản đồ văn hóa</span>
        </div>
        <h1 className="mb-3 font-display text-2xl font-bold text-ink">Khám phá văn hóa ba miền</h1>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted">
          Chọn một miền để mở nội dung và trải nghiệm tương ứng. Địa điểm và bài viết chỉ được công bố sau khi nguồn, quyền sử dụng và thông tin văn hóa được xác minh.
        </p>
        <div className="mb-5 grid gap-3 sm:grid-cols-3" aria-label="Chọn vùng miền">
          {REGIONS.map((region) => (
            <Button
              key={region.slug}
              type="button"
              variant="outline"
              onClick={() => onSelectRegion(region.slug)}
              aria-label={`Khám phá ${region.title}`}
              className="min-h-24 flex-col items-start gap-1 px-4 py-4 text-left"
            >
              <span className="font-display text-base font-bold">{region.title}</span>
              <span className="text-xs font-normal text-muted">{region.subtitle}</span>
            </Button>
          ))}
        </div>
        <section className="mb-5 rounded-xl border border-line bg-surface-soft p-4" aria-labelledby="regional-highlights-title">
          <h2 id="regional-highlights-title" className="mb-3 font-semibold text-ink">Điểm văn hóa có nguồn đối chiếu</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {REGIONS.flatMap((region) => HIGHLIGHTS[region.slug].map((item) => (
              <article key={item.title} className="rounded-lg border border-line bg-surface p-4">
                <p className="text-xs font-semibold text-muted">{region.title} · {item.location}</p>
                <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
                <a href={item.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-accent underline underline-offset-2">Nguồn: {item.source}</a>
              </article>
            )))}
          </div>
        </section>
        <div className="flex items-start gap-3 rounded-xl border border-line bg-surface-soft p-4 text-sm text-muted">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>Lịch âm/dương và ghi chú cá nhân vẫn dùng được trong mục Lịch văn hóa.</p>
        </div>
      </Card>
    </main>
  </div>
);
