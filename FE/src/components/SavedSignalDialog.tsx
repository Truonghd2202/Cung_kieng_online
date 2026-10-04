import React from "react";
import { X } from "lucide-react";

import { AppDialog } from "./AppDialog";
import { Button } from "./ui/button";
import type { SavedSignalItem } from "../screens/AccountScreen";

interface SavedSignalDialogProps {
  entry: SavedSignalItem | null;
  onClose: () => void;
}

export const SavedSignalDialog: React.FC<
  SavedSignalDialogProps
> = ({ entry, onClose }) => {
  if (!entry) return null;

  const createdDate =
    typeof entry.createdAt === "number" &&
    Number.isFinite(entry.createdAt)
      ? new Date(entry.createdAt)
      : null;

  const savedTimeLabel =
    createdDate && Number.isFinite(createdDate.getTime())
      ? createdDate.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  return (
    <AppDialog
      labelledBy="saved-signal-dialog-title"
      onClose={onClose}
    >
      <header className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2
            id="saved-signal-dialog-title"
            className="font-display text-xl sm:text-2xl font-semibold text-ink"
          >
            Lời chiêm nghiệm đã lưu
          </h2>

          <p className="mt-2 text-sm text-muted">
            {entry.date}
            {savedTimeLabel ? ` · ${savedTimeLabel}` : ""}
            {" · "}
            {entry.mood}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          aria-label="Đóng nội dung đã lưu"
          autoFocus
          className="h-11 w-11 shrink-0 p-0"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </Button>
      </header>

      <blockquote className="font-display text-xl sm:text-2xl text-ink leading-relaxed [overflow-wrap:anywhere]">
        <p>{entry.poemLine1}</p>
        <p>{entry.poemLine2}</p>
      </blockquote>

      {entry.actionTitle?.trim() && (
        <section className="mt-6 border-t border-line pt-5">
          <h3 className="mb-2 text-sm font-semibold text-ink">
            Hành động gợi ý trong lượt này
          </h3>

          <p className="text-base text-muted leading-relaxed [overflow-wrap:anywhere]">
            {entry.actionTitle}
          </p>
        </section>
      )}

      <section className="mt-5">
        <h3 className="mb-2 text-sm font-semibold text-ink">
          Ghi chép của bạn
        </h3>

        <p className="whitespace-pre-wrap text-base text-muted leading-relaxed [overflow-wrap:anywhere]">
          {entry.journal?.trim() ||
            "Bạn không lưu ghi chép trong lượt này."}
        </p>
      </section>

      <p className="mt-6 text-sm text-muted leading-relaxed">
        Đây là nội dung bạn đã lưu. Xem lại không thay đổi
        tâm trạng hoặc hành động hôm nay.
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="mt-5 min-h-11 w-full sm:w-auto"
      >
        Đóng
      </Button>
    </AppDialog>
  );
};
