import React, { useState } from "react";
import { ArrowLeft, CalendarDays, Check, Heart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import type { MemorialRecord } from "./MemorialSpaceScreen";

interface MemorialFormScreenProps {
  initialValue?: MemorialRecord | null;
  onBack: () => void;
  onSave: (memorial: MemorialRecord) => Promise<MemorialRecord | null>;
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
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving) return;
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

    setSaving(true);
    try {
      const saved = await onSave({
        id: initialValue?.id,
        name: name.trim(),
        relation: relation.trim(),
        date,
        note: note.trim() || undefined,
        avatarUrl: initialValue?.avatarUrl,
      });
      if (!saved) throw new Error("Chưa lưu được hồ sơ tưởng niệm.");
    } catch {
      setError(
        "Chưa lưu được hồ sơ trên máy chủ. Kiểm tra kết nối rồi thử lại."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-3xl">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-stone-600 dark:text-stone-400">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại góc tưởng niệm</span>
          </button>
          <Badge
            variant="outline"
            className="text-xs px-2.5 py-0.5 font-medium border-rose-400/40 text-rose-800 dark:text-rose-300 bg-rose-500/10"
          >
            {initialValue ? "Chỉnh sửa hồ sơ" : "Tạo hồ sơ mới"}
          </Badge>
        </div>

        {/* Page Header */}
        <header className="mb-8 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-800 dark:text-rose-400">
            GIỮ MỘT ĐIỀU THÂN THƯƠNG
          </span>
          <h1
            tabIndex={-1}
            className="page-title mt-1.5 mb-2.5 font-display text-3xl sm:text-4xl font-bold text-ink outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border-0"
          >
            {initialValue ? "Chỉnh sửa góc tưởng niệm" : "Tạo góc tưởng niệm"}
          </h1>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
            Thông tin được lưu an toàn theo tài khoản của bạn; khi dùng thử với tư cách khách, thông tin chỉ lưu trên thiết bị này.
          </p>
        </header>

        <Card className="p-6 sm:p-9 rounded-2xl border-line bg-surface/95 mb-10 shadow-xs backdrop-blur-sm">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSave();
            }}
          >
            <div className="space-y-6">
              <label className="block">
                <span className="block text-sm font-semibold text-ink mb-2">
                  Tên người được tưởng nhớ <span className="text-rose-500">*</span>
                </span>
                <input
                  value={name}
                  maxLength={MAX_MEMORIAL_NAME_LENGTH}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  placeholder="Ví dụ: Bà Ngoại, Ông Nội, Cha, Mẹ..."
                  className="w-full min-h-12 rounded-xl border border-line bg-surface-soft/60 focus:bg-surface px-4 text-base text-ink outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-ink mb-2">
                  Mối quan hệ gia đình <span className="text-rose-500">*</span>
                </span>
                <input
                  value={relation}
                  maxLength={MAX_MEMORIAL_RELATION_LENGTH}
                  onChange={(event) => {
                    setRelation(event.target.value);
                    setError("");
                  }}
                  placeholder="Ví dụ: Đấng sinh thành, Người thân yêu..."
                  className="w-full min-h-12 rounded-xl border border-line bg-surface-soft/60 focus:bg-surface px-4 text-base text-ink outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-ink mb-2">
                  Ngày muốn ghi nhớ — dương lịch <span className="text-rose-500">*</span>
                </span>
                <div className="relative">
                  <CalendarDays className="absolute left-3.5 top-3.5 w-5 h-5 text-stone-500 pointer-events-none" />
                  <input
                    type="date"
                    min="0001-01-01"
                    max="9999-12-31"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                      setError("");
                    }}
                    className="w-full min-h-12 rounded-xl border border-line bg-surface-soft/60 focus:bg-surface pl-11 pr-4 text-base text-ink outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                  Đây là mốc ngày dương lịch bạn muốn nhớ về. Bạn cũng có thể cài thêm lịch nhắc ngày giỗ âm lịch ở mục Quản lý nhắc lịch.
                </p>
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-ink mb-2">
                  Lời tri ân gửi gắm <span className="font-normal text-stone-500 text-xs">(tùy chọn)</span>
                </span>
                <Textarea
                  value={note}
                  maxLength={MAX_MEMORIAL_NOTE_LENGTH}
                  onChange={(event) => {
                    setNote(event.target.value);
                    setError("");
                  }}
                  placeholder="Những lời tâm sự, nỗi nhớ thương hoặc bài học quý giá bạn muốn giữ mãi trong tim…"
                  className="min-h-32 p-4 text-sm sm:text-base leading-relaxed rounded-xl border border-line bg-surface-soft/60 focus:bg-surface text-ink placeholder:text-stone-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
                <div className="mt-2 flex justify-end text-xs text-stone-500">
                  <span>{note.length}/{MAX_MEMORIAL_NOTE_LENGTH} ký tự</span>
                </div>
              </label>
            </div>

            {error && (
              <div
                role="alert"
                className="mt-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-sm font-medium flex items-center gap-2.5 animate-fadeIn"
              >
                <Heart className="w-4 h-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-6 border-t border-line">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="min-h-11 px-5 rounded-xl border-line text-ink hover:text-accent cursor-pointer"
              >
                Hủy bỏ
              </Button>

              <Button
                type="submit"
                disabled={saving}
                className="min-h-11 px-6 rounded-xl bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-semibold shadow-md cursor-pointer gap-2"
              >
                <Check aria-hidden="true" className="h-4 w-4" />
                <span>{saving ? "Đang lưu…" : initialValue ? "Lưu thay đổi" : "Lưu góc tưởng niệm"}</span>
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};
