import React, { useState } from "react";
import { ArrowLeft, CalendarDays, Check, Heart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import type { MemorialRecord } from "./MemorialSpaceScreen";

interface MemorialFormScreenProps {
  initialValue?: MemorialRecord | null;
  onBack: () => void;
  onSave: (memorial: MemorialRecord) => boolean;
}

export const MemorialFormScreen: React.FC<MemorialFormScreenProps> = ({ initialValue, onBack, onSave }) => {
  const [name, setName] = useState(initialValue?.name || "");
  const [relation, setRelation] = useState(initialValue?.relation || "");
  const [date, setDate] = useState(initialValue?.date || "");
  const [note, setNote] = useState(initialValue?.note || "");
  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");

    if (!name.trim() || !relation.trim() || !date) {
      setError(
        "Bạn hãy điền tên, mối quan hệ và ngày muốn ghi nhớ."
      );
      return;
    }

    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!match) {
      setError("Ngày chưa hợp lệ.");
      return;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const parsedDate = new Date(year, month - 1, day);

    if (
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() !== month - 1 ||
      parsedDate.getDate() !== day
    ) {
      setError("Ngày chưa hợp lệ.");
      return;
    }

    const saved = onSave({
      name: name.trim(),
      relation: relation.trim(),
      date,
      note: note.trim() || undefined,
    });

    if (!saved) {
      setError(
        "Chưa lưu được góc tưởng niệm. Bạn hãy thử lại."
      );
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-3xl">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors mb-7"><ArrowLeft className="w-3.5 h-3.5" /> Quay lại góc tưởng niệm</button>
        <div className="mb-8"><span className="text-xs font-semibold uppercase tracking-widest text-accent">Một điều muốn giữ</span><h1 className="page-title mt-2 mb-3">{initialValue ? "Chỉnh sửa góc tưởng niệm" : "Tạo một góc tưởng niệm"}</h1><p className="text-sm text-muted leading-relaxed">Thông tin này chỉ dùng để tạo không gian riêng trên thiết bị của bạn.</p></div>

        <Card className="p-6 sm:p-8 border-line mb-10">
          <div className="space-y-5">
            <label className="block"><span className="block text-sm font-semibold text-ink mb-2">Tên người được tưởng nhớ</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ví dụ: Bà Ngoại" className="w-full min-h-11 rounded-control border border-line bg-surface px-4 text-base text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20" /></label>
            <label className="block"><span className="block text-sm font-semibold text-ink mb-2">Mối quan hệ</span><input value={relation} onChange={(event) => setRelation(event.target.value)} placeholder="Ví dụ: Người thân trong gia đình" className="w-full min-h-11 rounded-control border border-line bg-surface px-4 text-base text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20" /></label>
            <label className="block">
              <span className="block text-sm font-semibold text-ink mb-2">Ngày muốn ghi nhớ — dương lịch</span>
              <span className="relative block">
                <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-muted pointer-events-none" />
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full min-h-11 rounded-control border border-line bg-surface pl-10 pr-4 text-base text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </span>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Đây là một ngày cụ thể, chưa phải lịch giỗ âm lịch
                hoặc lời nhắc lặp lại hằng năm.
              </p>
            </label>
            <label className="block"><span className="block text-sm font-semibold text-ink mb-2">Lời tri ân <span className="font-normal text-muted">(tùy chọn)</span></span><Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Một câu bạn muốn giữ lại…" className="min-h-28" /></label>
          </div>
          {error && <p className="mt-4 text-sm text-danger flex items-center gap-2" role="alert"><Heart className="w-4 h-4" /> {error}</p>}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7 pt-5 border-t border-line"><Button variant="outline" onClick={onBack}>Hủy</Button><Button onClick={handleSave} className="gap-2"><Check className="w-4 h-4" /> Lưu góc tưởng niệm</Button></div>
        </Card>
      </main>
    </div>
  );
};
