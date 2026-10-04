import React from "react";
import { ArrowLeft, ArrowRight, Compass, Landmark, Waves } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

export type CultureRegionSlug = "north" | "central" | "south";

interface CulturalMapScreenProps {
  onBackToCulture: () => void;
  onSelectRegion: (region: CultureRegionSlug) => void;
}

const REGIONS = [
  { slug: "north" as const, title: "Bắc Bộ", subtitle: "Đình làng · Chầu văn · Nếp nhà", image: "/images/temple_bac_bo.jpg", icon: Landmark, description: "Không gian làng quê, đình làng và những lớp văn hóa lâu đời bên bờ sông Hồng." },
  { slug: "central" as const, title: "Trung Bộ", subtitle: "Cầu Ngư · Xứ Huế · Biển nhớ", image: "/images/hue_trung_bo.jpg", icon: Compass, description: "Nét trầm mặc của cố đô, đời sống miền biển và lời cầu bình an của người đi khơi." },
  { slug: "south" as const, title: "Nam Bộ", subtitle: "Phù sa · Sông nước · Hoa đăng", image: "/images/mekong_nam_bo.jpg", icon: Waves, description: "Sự rộng rãi, phóng khoáng của miền sông nước và những mùa lễ hội phương Nam." },
];

export const CulturalMapScreen: React.FC<CulturalMapScreenProps> = ({ onBackToCulture, onSelectRegion }) => (
  <div className="screen-shell">
    <main className="page-container max-w-6xl">
      <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted">
        <button onClick={onBackToCulture} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Khám phá văn hóa</button>
        <Badge variant="outline">Ba miền · Một dòng chảy</Badge>
      </div>
      <header className="max-w-3xl mb-9">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">Bắc · Trung · Nam</span>
        <h1 className="page-title mt-2 mb-3">Khám phá văn hóa ba miền</h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          Khám phá những nét văn hóa và tín ngưỡng đặc trưng theo từng vùng miền, dưới góc nhìn nhân văn và tôn trọng đời sống.
        </p>
      </header>
      <div className="grid lg:grid-cols-3 gap-5 mb-12">
        {REGIONS.map(({ slug, title, subtitle, image, icon: Icon, description }) => (
          <Card
            key={slug}
            aria-label={`Khám phá văn hóa ${title}`}
            onClick={() => onSelectRegion(slug)}
            className="group overflow-hidden cursor-pointer hover:bg-surface-soft border-line"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                <Icon className="w-4 h-4" />
                <span className="font-display text-xl font-bold">{title}</span>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs text-accent font-semibold uppercase tracking-wider">{subtitle}</span>
              <p className="text-sm text-muted leading-relaxed mt-3 mb-5">{description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Mở vùng văn hóa <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-6 sm:p-8 bg-surface-soft border-line mb-12"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5"><div><Badge variant="terracotta" className="mb-3">Lưu ý văn hóa</Badge><p className="text-sm text-muted leading-relaxed max-w-3xl">Nội dung là tư liệu khám phá và gợi mở chiêm nghiệm; không phải khẳng định siêu nhiên hay lời phán định cho đời sống cá nhân.</p></div><Button variant="outline" onClick={onBackToCulture}>Xem thư viện văn hóa</Button></div></Card>
    </main>
  </div>
);
