import React from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Edit2, Heart, Plus, UserRound } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

export interface MemorialRecord {
  name: string;
  relation: string;
  date: string;
  note?: string;
}

interface MemorialSpaceScreenProps {
  memorial: MemorialRecord | null;
  onBack: () => void;
  onCreate: () => void;
  onEdit: () => void;
  onGoToAltar: () => void;
}

export const MemorialSpaceScreen: React.FC<MemorialSpaceScreenProps> = ({ memorial, onBack, onCreate, onEdit, onGoToAltar }) => {
  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted">
          <button onClick={onBack} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Không gian của tôi</button>
          <Badge variant="outline">Góc tưởng niệm</Badge>
        </div>

        <header className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Giữ một điều thân thương</span>
          <h1 className="page-title mt-2 mb-3">Góc tưởng niệm</h1>
          <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">Một nơi nhỏ để gọi tên người mình nhớ và lưu lại lời tri ân theo cách thật riêng.</p>
        </header>

        {!memorial ? (
          <Card className="p-8 sm:p-14 text-center border-line mb-12">
            <div className="w-16 h-16 rounded-full bg-surface-soft border border-line mx-auto mb-5 flex items-center justify-center text-accent"><Heart className="w-7 h-7" /></div>
            <h2 className="font-display text-2xl font-bold mb-3">Bạn chưa tạo góc tưởng niệm</h2>
            <p className="text-sm text-muted leading-relaxed max-w-lg mx-auto mb-7">Bạn có thể bắt đầu bằng một cái tên, một mối quan hệ và một ngày muốn giữ trong lòng.</p>
            <Button onClick={onCreate} className="gap-2"><Plus className="w-4 h-4" /> Tạo một góc tưởng niệm</Button>
          </Card>
        ) : (
          <>
            <Card className="p-6 sm:p-9 border-line mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-surface-soft border border-line flex items-center justify-center text-accent shrink-0"><UserRound className="w-6 h-6" /></div>
                  <div>
                    <Badge variant="terracotta" className="mb-2">Góc riêng của bạn</Badge>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">{memorial.name}</h2>
                    <p className="text-sm text-muted mt-1">{memorial.relation} · Ngày tưởng niệm {memorial.date}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={onEdit} className="gap-2"><Edit2 className="w-4 h-4" /> Chỉnh sửa</Button>
              </div>

              <div className="mt-8 pt-6 border-t border-line grid sm:grid-cols-2 gap-5">
                <div><span className="text-xs text-muted uppercase tracking-wider">Lời tri ân</span><p className="font-display text-lg italic mt-2 text-ink">{memorial.note || "Bạn chưa viết lời tri ân nào."}</p></div>
                <div className="sm:border-l sm:border-line sm:pl-5"><span className="text-xs text-muted uppercase tracking-wider">Một nhịp nhớ</span><p className="text-sm text-muted leading-relaxed mt-2">Bạn có thể trở lại bất cứ khi nào muốn thắp một nén nhang lòng.</p></div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              <Card onClick={onGoToAltar} className="group p-5 cursor-pointer hover:bg-surface-soft border-line flex items-center justify-between"><span className="flex items-center gap-3 font-semibold"><Heart className="w-5 h-5 text-accent" /> Thắp nhang</span><ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" /></Card>
              <Card onClick={onEdit} className="group p-5 cursor-pointer hover:bg-surface-soft border-line flex items-center justify-between"><span className="flex items-center gap-3 font-semibold"><Edit2 className="w-5 h-5 text-accent" /> Viết một lời</span><ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" /></Card>
            </div>
          </>
        )}

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4"><CalendarDays className="w-5 h-5 text-accent" /><h2 className="section-title">Những ngày muốn nhớ</h2></div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["Ngày giỗ", "Theo lịch gia đình"],
              ["Ngày sinh", "Một ngày đã lưu"],
              ["Ngày gặp lại", "Dành cho một kỷ niệm"],
            ].map(([title, detail]) => <Card key={title} className="p-5 border-line"><span className="text-xs text-muted">{detail}</span><h3 className="font-display font-bold mt-2">{title}</h3></Card>)}
          </div>
        </section>
      </main>
    </div>
  );
};
