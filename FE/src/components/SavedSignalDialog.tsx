import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { Button } from "./ui/button";
import type { SavedSignalItem } from "../screens/AccountScreen";

interface SavedSignalDialogProps {
  entry: SavedSignalItem | null;
  onClose: () => void;
}

export const SavedSignalDialog: React.FC<
  SavedSignalDialogProps
> = ({ entry, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (entry && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [entry]);

  if (!entry) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="saved-signal-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[85dvh] overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-ink shadow-xl backdrop:bg-black/50"
    >
      <div className="p-5 sm:p-7">
        <header className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2
              id="saved-signal-dialog-title"
              className="font-display text-2xl font-semibold"
            >
              Lời chiêm nghiệm đã lưu
            </h2>

            <p className="mt-2 text-sm text-muted">
              {entry.date} · {entry.mood}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Đóng nội dung đã lưu"
            autoFocus
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </Button>
        </header>

        <blockquote className="font-display text-xl sm:text-2xl leading-relaxed">
          <p>{entry.poemLine1}</p>
          <p>{entry.poemLine2}</p>
        </blockquote>

        <section className="mt-6 pt-5 border-t border-line">
          <h3 className="text-sm font-semibold mb-2">
            Hành động gợi ý trong lượt này
          </h3>

          <p className="text-base text-muted leading-relaxed">
            {entry.actionTitle}
          </p>
        </section>

        <section className="mt-5">
          <h3 className="text-sm font-semibold mb-2">
            Ghi chép của bạn
          </h3>

          <p className="text-base text-muted leading-relaxed whitespace-pre-wrap break-words">
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
          className="mt-5 w-full sm:w-auto"
        >
          Đóng
        </Button>
      </div>
    </dialog>
  );
};
