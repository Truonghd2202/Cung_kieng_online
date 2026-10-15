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

export const CulturalMapScreen: React.FC<CulturalMapScreenProps> = ({ onBackToCulture, onSelectRegion }) => (
  <div className="screen-shell">
    <main className="page-container max-w-4xl">
      <Button type="button" variant="outline" onClick={onBackToCulture} className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Về Khám phá văn hóa
      </Button>
      <Card className="border-line bg-surface p-6 sm:p-10">
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
        <div className="flex items-start gap-3 rounded-xl border border-line bg-surface-soft p-4 text-sm text-muted">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>Lịch âm/dương và ghi chú cá nhân vẫn dùng được trong mục Lịch văn hóa.</p>
        </div>
      </Card>
    </main>
  </div>
);
