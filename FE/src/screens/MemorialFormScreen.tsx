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

const MAX_MEMORIAL_NAME_LENGTH = 100;
const MAX_MEMORIAL_RELATION_LENGTH = 80;
const MAX_MEMORIAL_NOTE_LENGTH = 2000;

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

    if (
      name.trim().length >
      MAX_MEMORIAL_NAME_LENGTH
    ) {
      setError(
        `Tên người được tưởng nhớ tối đa ${MAX_MEMORIAL_NAME_LENGTH} ký tự.`
      );
      return;
    }

    if (
      relation.trim().length >
      MAX_MEMORIAL_RELATION_LENGTH
    ) {
      setError(
        `Mối quan hệ tối đa ${MAX_MEMORIAL_RELATION_LENGTH} ký tự.`
      );
      return;
    }

    if (
      note.trim().length >
      MAX_MEMORIAL_NOTE_LENGTH
    ) {
      setError(
        `Lời tri ân tối đa ${MAX_MEMORIAL_NOTE_LENGTH} ký tự.`
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

    if (
      year < 1 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      setError("Ngày chưa hợp lệ.");
      return;
    }

    const parsedDate = new Date(0);
    parsedDate.setHours(0, 0, 0, 0);
    parsedDate.setFullYear(year, month - 1, day);

    if (
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() !== month - 1 ||
      parsedDate.getDate() !== day
    ) {
      setError("Ngày chưa hợp lệ.");
      return;
    }

    let saved = false;

    try {
      saved = onSave({
        name: name.trim(),
        relation: relation.trim(),
        date,
        note: note.trim() || undefined,
      }) === true;
    } catch {
      saved = false;
    }

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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSave();
            }}
          >
            <div className="space-y-5">
              <label className="block">
                <span className="block text-sm font-semibold text-ink mb-2">Tên người được tưởng nhớ</span>
                <input
                  value={name}
                  maxLength={MAX_MEMORIAL_NAME_LENGTH}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  placeholder="Ví dụ: Bà Ngoại"
                  className="w-full min-h-11 rounded-control border border-line bg-surface px-4 text-base text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-semibold text-ink mb-2">Mối quan hệ</span>
                <input
                  value={relation}
                  maxLength={MAX_MEMORIAL_RELATION_LENGTH}
                  onChange={(event) => {
                    setRelation(event.target.value);
                    setError("");
                  }}
                  placeholder="Ví dụ: Người thân trong gia đình"
                  className="w-full min-h-11 rounded-control border border-line bg-surface px-4 text-base text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-semibold text-ink mb-2">Ngày muốn ghi nhớ — dương lịch</span>
                <span className="relative block">
                  <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-muted pointer-events-none" />
                  <input
                    type="date"
                    min="0001-01-01"
                    max="9999-12-31"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                      setError("");
                    }}
                    className="w-full min-h-11 rounded-control border border-line bg-surface pl-10 pr-4 text-base text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </span>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Đây là một ngày cụ thể, chưa phải lịch giỗ âm lịch
                  hoặc lời nhắc lặp lại hằng năm.
                </p>
              </label>
              <label className="block">
                <span className="block text-sm font-semibold text-ink mb-2">Lời tri ân <span className="font-normal text-muted">(tùy chọn)</span></span>
                <Textarea
                  value={note}
                  maxLength={MAX_MEMORIAL_NOTE_LENGTH}
                  onChange={(event) => {
                    setNote(event.target.value);
                    setError("");
                  }}
                  placeholder="Một câu bạn muốn giữ lại…"
                  className="min-h-28"
                />
                <p className="mt-2 text-xs text-muted">
                  {note.length}/{MAX_MEMORIAL_NOTE_LENGTH} ký tự
                </p>
              </label>
            </div>
            {error && <p className="mt-4 text-sm text-danger flex items-center gap-2" role="alert"><Heart className="w-4 h-4" /> {error}</p>}
            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="min-h-11"
              >
                Hủy
              </Button>

              <Button
                type="submit"
                className="min-h-11 gap-2"
              >
                <Check aria-hidden="true" className="h-4 w-4" />
                Lưu góc tưởng niệm
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};
