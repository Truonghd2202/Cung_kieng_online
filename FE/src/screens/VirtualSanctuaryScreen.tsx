import React, { lazy, Suspense, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Flower2,
  Heart,
  Landmark,
  Sparkles,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

import type { MemorialRecord } from "./MemorialSpaceScreen";

const SanctuaryScene = lazy(() =>
  import("../components/SanctuaryScene").then((module) => ({
    default: module.SanctuaryScene,
  }))
);

interface VirtualSanctuaryScreenProps {
  memorial: MemorialRecord | null;
  onBackToExperience: () => void;
  onGoToAltar: () => void;
  onGoToMemorial: () => void;
  onGoToZen: () => void;
}

export const VirtualSanctuaryScreen: React.FC<
  VirtualSanctuaryScreenProps
> = ({
  memorial,
  onBackToExperience,
  onGoToAltar,
  onGoToMemorial,
  onGoToZen,
}) => {
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <button onClick={onBackToExperience} className="hover:text-accent transition-colors">
              Trải nghiệm
            </button>
            <span>/</span>
            <span className="text-accent font-semibold">Không gian của tôi</span>
          </div>
          <button onClick={onBackToExperience} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Về trải nghiệm
          </button>
        </div>

        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center mb-14">
          <div>
            <Badge variant="terracotta" className="mb-4 gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-action" /> Một khoảng riêng để trở về
            </Badge>
            <h1 className="page-title mb-4">Không gian của tôi</h1>
            <p className="text-sm sm:text-base text-ink leading-relaxed max-w-xl mb-6">
              Một nơi yên tĩnh để giữ lại những điều bạn trân quý, gửi một lời tri ân và dành vài phút lắng lòng.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={onGoToAltar} className="gap-2">
                <Landmark className="w-4 h-4" /> Ghé bàn thờ gia tiên
              </Button>
              <Button variant="outline" onClick={onGoToMemorial} className="gap-2">
                <Heart className="w-4 h-4" /> Góc tưởng niệm
              </Button>
            </div>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-card border border-line bg-surface shadow-card">
            <img
              src="/images/temple_bac_bo.jpg"
              alt="Mái đình trong một khoảng chiều yên"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/25 to-transparent" />
            <div className="relative flex min-h-64 items-end p-6">
              <p className="max-w-sm font-display text-lg italic text-ink">
                “Giữ một khoảng lặng, để nghe lòng mình nói khẽ.”
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="sanctuary-3d-title" className="mb-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2
              id="sanctuary-3d-title"
              className="font-display text-xl font-semibold text-ink"
            >
              Khám phá góc tri ân
            </h2>

            <Button
              type="button"
              variant="outline"
              aria-expanded={show3D}
              aria-controls="sanctuary-3d-panel"
              onClick={() => setShow3D((value) => !value)}
            >
              {show3D ? "Đóng cảnh 3D" : "Mở cảnh 3D"}
            </Button>
          </div>

          <div id="sanctuary-3d-panel">
            {show3D && (
              <Suspense
                fallback={
                  <p role="status" className="p-4 text-sm text-muted">
                    Đang mở không gian…
                  </p>
                }
              >
                <SanctuaryScene
                  memorial={memorial}
                  onOpenMemorial={onGoToMemorial}
                />
              </Suspense>
            )}
          </div>
        </section>

        <section aria-labelledby="sanctuary-spaces" className="mb-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Ba nếp nhỏ</span>
              <h2 id="sanctuary-spaces" className="section-title mt-1">Những không gian có thể ghé qua</h2>
            </div>
            <span className="hidden sm:inline text-xs text-muted">Mở từng nơi theo nhịp riêng của bạn</span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Card onClick={onGoToAltar} className="group p-6 border-t-2 border-t-accent cursor-pointer hover:bg-surface-soft">
              <div className="w-11 h-11 rounded-panel bg-surface-soft border border-line flex items-center justify-center text-accent mb-5">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent">Bàn thờ gia tiên</h3>
              <p className="text-sm text-muted leading-relaxed mb-5">Một góc giản dị để thắp nén nhang lòng và nhớ về cội nguồn.</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Ghé thăm <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Card>

            <Card onClick={onGoToMemorial} className="group p-6 border-t-2 border-t-accent cursor-pointer hover:bg-surface-soft">
              <div className="w-11 h-11 rounded-panel bg-surface-soft border border-line flex items-center justify-center text-accent mb-5">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent">Góc tưởng niệm</h3>
              <p className="text-sm text-muted leading-relaxed mb-5">Lưu một cái tên, một ngày nhớ và lời tri ân chỉ thuộc về bạn.</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Mở góc riêng <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Card>

            <Card onClick={onGoToZen} className="group p-6 border-t-2 border-t-accent cursor-pointer hover:bg-surface-soft">
              <div className="w-11 h-11 rounded-panel bg-surface-soft border border-line flex items-center justify-center text-accent mb-5">
                <Flower2 className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent">Khoảng an yên</h3>
              <p className="text-sm text-muted leading-relaxed mb-5">Một nhịp thở chậm, một chút tĩnh tại giữa những ngày nhiều việc.</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Dành vài phút <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Card>
          </div>
        </section>

        <Card className="p-6 sm:p-8 bg-surface-soft border-line mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-surface border border-line flex items-center justify-center text-accent">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg mb-1">Không gian này thuộc về bạn</h2>
                <p className="text-sm text-muted leading-relaxed max-w-2xl">Các ghi chú được lưu trong trình duyệt trên thiết bị này, chưa đồng bộ sang thiết bị khác.</p>
              </div>
            </div>
            <span className="text-xs text-muted whitespace-nowrap">Riêng tư · Nhẹ nhàng · Tự nguyện</span>
          </div>
        </Card>
      </main>
    </div>
  );
};
