import React from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";

interface HoroscopeScreenProps {
  onBackToExperience: () => void;
  onGoToCulture?: () => void;
  onGoToHome?: () => void;
}

export const HoroscopeScreen: React.FC<HoroscopeScreenProps> = ({
  onBackToExperience,
  onGoToCulture,
}) => (
  <div className="screen-shell">
    <main className="page-container max-w-4xl">
      <Button type="button" variant="outline" onClick={onBackToExperience} className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Về Trải nghiệm
      </Button>
      <Card className="border-line bg-surface p-6 sm:p-10">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <ShieldCheck className="h-4 w-4 text-accent" />
          <span>Chưa phát hành</span>
        </div>
        <h1 className="mb-3 font-display text-2xl font-bold text-ink">Luận giải ngày sinh đang được rà soát</h1>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted">
          Ứng dụng chưa có phương pháp và nguồn tư liệu đủ thẩm định để tính lá số hoặc diễn giải Can Chi, ngũ hành theo từng cá nhân. Ngày sinh của bạn sẽ không được thu thập tại màn hình này.
        </p>
        {onGoToCulture && (
          <Button type="button" variant="outline" onClick={onGoToCulture}>
            Khám phá nội dung văn hóa
          </Button>
        )}
      </Card>
    </main>
  </div>
);
