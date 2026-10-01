import React, { useState } from "react";
import { ArrowLeft, CalendarDays, Check, Flower2, Flame, Heart, Wind } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";

interface AncestorAltarScreenProps {
  onBack: () => void;
  onGoToMemorial: () => void;
}

export const AncestorAltarScreen: React.FC<AncestorAltarScreenProps> = ({ onBack, onGoToMemorial }) => {
  const [incenseLit, setIncenseLit] = useState(false);
  const [tribute, setTribute] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const lightIncense = () => {
    setIncenseLit(true);
    setSubmitted(false);
  };

  const sendTribute = () => {
    if (!tribute.trim()) return;
    setSubmitted(true);
    setTribute("");
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted">
          <button onClick={onBack} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Không gian của tôi
          </button>
          <Badge variant="outline">Góc riêng trên thiết bị</Badge>
        </div>

        <header className="max-w-2xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Một nếp nhà</span>
          <h1 className="page-title mt-2 mb-3">Bàn thờ gia tiên</h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">Một không gian mô phỏng giản dị để bạn dừng lại, nhớ về người đi trước và gửi một lời lành.</p>
        </header>

        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-10">
          <Card className="relative overflow-hidden p-6 sm:p-10 min-h-[390px] bg-surface-soft border-line">
            <div className="absolute inset-x-8 top-12 h-1 rounded-full bg-line" />
            <div className="absolute inset-x-14 top-20 h-3 rounded-full bg-line/70" />
            <div className="relative flex flex-col items-center justify-center min-h-[300px]">
              <div className="relative flex items-end justify-center gap-12 mb-8">
                <div className={`relative flex flex-col items-center transition-transform duration-700 ${incenseLit ? "-translate-y-1" : ""}`}>
                  <div className="w-1 h-28 bg-accent rounded-full" />
                  {incenseLit && <span className="absolute -top-10 text-xs text-muted animate-pulse">khói nhẹ</span>}
                </div>
                <div className="w-24 h-24 rounded-panel border border-line bg-surface flex items-center justify-center shadow-sm">
                  <div className="w-14 h-14 rounded-full border border-accent/35 bg-surface-soft flex items-center justify-center">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div className={`relative flex flex-col items-center transition-transform duration-700 ${incenseLit ? "-translate-y-1" : ""}`}>
                  <div className="w-1 h-28 bg-accent rounded-full" />
                </div>
              </div>
              <div className="w-56 h-4 rounded-full bg-line mb-3" />
              <div className="w-72 h-3 rounded-full bg-line/70" />
              <p className="mt-8 text-center font-display text-lg italic text-ink">“Uống nước nhớ nguồn.”</p>
            </div>
          </Card>

          <Card className="p-6 sm:p-8 border-line">
            <div className="flex items-center gap-2 mb-5 text-accent">
              <CalendarDays className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Hôm nay</span>
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">Một phút hướng về nhà</h2>
            <p className="text-sm text-muted leading-relaxed mb-6">Không cần nghi thức cầu kỳ. Chỉ cần một hơi thở chậm và một điều bạn muốn nói.</p>

            <Button onClick={lightIncense} disabled={incenseLit} className="w-full gap-2 mb-3">
              {incenseLit ? <Check className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
              {incenseLit ? "Đã thắp một nén nhang lòng" : "Thắp một nén nhang"}
            </Button>
            <Button variant="outline" onClick={onGoToMemorial} className="w-full gap-2">
              <Heart className="w-4 h-4" /> Gửi lời tri ân riêng
            </Button>

            {incenseLit && (
              <div className="mt-6 pt-5 border-t border-line animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs text-accent font-semibold mb-2"><Wind className="w-3.5 h-3.5" /> Khoảng lặng đã mở</div>
                <p className="text-sm text-muted leading-relaxed">Bạn có thể để lòng mình ở đây thêm một chút, hoặc viết một lời gửi gắm.</p>
              </div>
            )}
          </Card>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5"><Flower2 className="w-5 h-5 text-accent" /><h2 className="section-title">Ngày tưởng niệm sắp tới</h2></div>
          <div className="grid sm:grid-cols-3 gap-4">
            {["Ngày giỗ trong gia đình", "Rằm tháng sau", "Một ngày bạn muốn nhớ"].map((label, index) => (
              <Card key={label} className="p-5 bg-surface border-line">
                <span className="text-xs text-muted">{index === 0 ? "15/10" : index === 1 ? "15/11" : "Chưa đặt ngày"}</span>
                <h3 className="font-display font-bold mt-2 mb-1">{label}</h3>
                <p className="text-xs text-muted">Ghi chú riêng tư trên thiết bị</p>
              </Card>
            ))}
          </div>
        </section>

        <Card className="p-6 sm:p-8 border-line mb-12">
          <h2 className="font-display text-xl font-bold mb-2">Gửi một lời nếu bạn muốn</h2>
          <p className="text-sm text-muted mb-4">Lời bình an, biết ơn hoặc tưởng nhớ sẽ chỉ được lưu khi bạn chọn gửi.</p>
          <Textarea value={tribute} onChange={(event) => setTribute(event.target.value)} placeholder="Gửi một lời bình an, biết ơn hoặc tưởng nhớ…" className="min-h-28 mb-4" />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted">Không bắt buộc</span>
            <Button onClick={sendTribute} disabled={!tribute.trim()} className="gap-2"><Heart className="w-4 h-4" /> Gửi lời</Button>
          </div>
          {submitted && <p className="mt-4 text-sm text-success flex items-center gap-2"><Check className="w-4 h-4" /> Lời của bạn đã được giữ lại trong khoảnh khắc này.</p>}
        </Card>
      </main>
    </div>
  );
};
