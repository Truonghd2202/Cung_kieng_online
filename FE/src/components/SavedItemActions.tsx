import React from "react";
import { Star, Trash2 } from "lucide-react";

interface SavedItemActionsProps {
  label: string;
  starred: boolean;
  onToggleStar?: () => void;
  onDelete: () => void;
}

export const SavedItemActions: React.FC<
  SavedItemActionsProps
> = ({
  label,
  starred,
  onToggleStar,
  onDelete,
}) => {
  return (
    <div className="flex shrink-0 items-center gap-1">
      {onToggleStar && (
        <button
          type="button"
          aria-label={`${
            starred
              ? "Bỏ đánh dấu yêu thích"
              : "Đánh dấu yêu thích"
          }: ${label}`}
          aria-pressed={starred}
          title={
            starred
              ? "Bỏ yêu thích"
              : "Đánh dấu yêu thích"
          }
          onClick={onToggleStar}
          className={[
            "inline-flex h-11 w-11 items-center",
            "justify-center rounded-xl",
            "hover:bg-accent-soft",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-accent",
            starred ? "text-accent" : "text-muted",
          ].join(" ")}
        >
          <Star
            className={`h-5 w-5 ${
              starred ? "fill-current" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      )}

      <button
        type="button"
        aria-label={`Xóa: ${label}`}
        title="Xóa mục đã lưu"
        onClick={onDelete}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-muted hover:bg-danger-soft hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Trash2
          className="h-5 w-5"
          aria-hidden="true"
        />
      </button>
    </div>
  );
};
