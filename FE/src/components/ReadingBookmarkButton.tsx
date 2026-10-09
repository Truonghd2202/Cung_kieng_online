import { useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import {
  type ReadingKind,
  setReadingBookmark,
  useReadingBookmark,
} from "../hooks/useReadingBookmarks";

interface ReadingBookmarkButtonProps {
  kind: ReadingKind;
  id: string;
  email?: string;
  title?: string;
}

export function ReadingBookmarkButton({
  kind,
  id,
  email,
  title,
}: ReadingBookmarkButtonProps) {
  const saved = useReadingBookmark(kind, id, email);
  const [error, setError] = useState("");

  return (
    <div>
      <Button
        type="button"
        variant={saved ? "default" : "outline"}
        aria-pressed={saved}
        onClick={() => {
          setError("");

          const succeeded = setReadingBookmark(
            kind,
            id,
            !saved,
            email,
            title
          );

          if (!succeeded) {
            setError(
              "Chưa cập nhật được dấu lưu. Bạn hãy thử lại."
            );
          }
        }}
      >
        <Bookmark
          aria-hidden="true"
          className={`mr-2 h-4 w-4 ${
            saved ? "fill-current" : ""
          }`}
        />
        {saved ? "Đã đánh dấu" : "Đánh dấu bài"}
      </Button>

      {error && (
        <p role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
