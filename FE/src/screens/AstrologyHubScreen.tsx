import React from "react";
import { ArrowLeft, ArrowRight, BookOpen, Compass, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface AstrologyHubScreenProps { onBackToExperience: () => void; onGoToHoroscope: () => void; }

export const AstrologyHubScreen: React.FC<AstrologyHubScreenProps> = ({ onBackToExperience, onGoToHoroscope }) => (
  <div className="screen-shell"><main className="page-container max-w-6xl">
    <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted"><button onClick={onBackToExperience} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Trải nghiệm</button><Badge variant="outline">Biểu tượng · Tự soi chiếu</Badge></div>
    <header className="max-w-3xl mb-10"><span className="text-xs font-semibold uppercase tracking-widest text-accent">Tử vi & Lá số</span><h1 className="page-title mt-2 mb-3">Một cách nhìn khác về mình</h1><p className="text-sm sm:text-base text-muted leading-relaxed">Khám phá các biểu tượng thời gian theo hướng văn hóa và giải trí. Nội dung chỉ mang tính tham khảo, không quyết định tương lai hay phẩm chất của bạn.</p></header>
    <div className="grid md:grid-cols-3 gap-5 mb-10">
      <Card onClick={onGoToHoroscope} className="group p-6 border-t-2 border-t-accent cursor-pointer hover:bg-surface-soft"><div className="w-11 h-11 rounded-panel bg-surface-soft border border-line flex items-center justify-center text-accent mb-5"><Sparkles className="w-5 h-5" /></div><h2 className="font-display text-xl font-bold mb-2 group-hover:text-accent">Tử vi hôm nay</h2><p className="text-sm text-muted leading-relaxed mb-5">Một góc nhìn ngắn để bắt đầu ngày bằng sự chủ động và tỉnh táo.</p><span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Mở trải nghiệm <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span></Card>
      <Card onClick={onGoToHoroscope} className="group p-6 border-t-2 border-t-accent cursor-pointer hover:bg-surface-soft"><div className="w-11 h-11 rounded-panel bg-surface-soft border border-line flex items-center justify-center text-accent mb-5"><BookOpen className="w-5 h-5" /></div><h2 className="font-display text-xl font-bold mb-2 group-hover:text-accent">Lá số cá nhân</h2><p className="text-sm text-muted leading-relaxed mb-5">Nhập ngày, giờ và vùng sinh để đọc các biểu tượng ngũ hành theo dữ liệu mock hiện có.</p><span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Xem lá số <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span></Card>
      <Card onClick={onGoToHoroscope} className="group p-6 border-t-2 border-t-accent cursor-pointer hover:bg-surface-soft"><div className="w-11 h-11 rounded-panel bg-surface-soft border border-line flex items-center justify-center text-accent mb-5"><Compass className="w-5 h-5" /></div><h2 className="font-display text-xl font-bold mb-2 group-hover:text-accent">Khám phá tính cách</h2><p className="text-sm text-muted leading-relaxed mb-5">Dùng câu hỏi tự soi chiếu để mở ra một cuộc đối thoại nhỏ với chính mình.</p><span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Bắt đầu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span></Card>
    </div>
    <Card className="p-6 sm:p-8 bg-surface-soft border-line mb-12"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5"><p className="text-sm text-muted leading-relaxed max-w-2xl">Tất cả diễn giải đều được đóng khung như một cách khám phá bản thân và văn hóa, không phải lời tiên đoán chắc chắn.</p><Button onClick={onGoToHoroscope} className="gap-2">Mở form lá số <ArrowRight className="w-4 h-4" /></Button></div></Card>
  </main></div>
);
