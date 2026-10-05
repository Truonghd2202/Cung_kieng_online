import { useEffect, useRef, useState } from "react";
import { Camera, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  ProfileAvatar,
  saveProfileAvatar,
  useProfileAvatar,
} from "./ProfileAvatar";

async function prepareAvatar(file: File): Promise<string> {
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    throw new Error("Bạn hãy chọn ảnh JPG hoặc PNG.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Ảnh tối đa 5 MB.");
  }

  const url = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.src = url;

    await image.decode();

    if (
      !image.naturalWidth ||
      !image.naturalHeight ||
      image.naturalWidth > 8000 ||
      image.naturalHeight > 8000
    ) {
      throw new Error(
        "Ảnh không hợp lệ hoặc có kích thước quá lớn."
      );
    }

    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Trình duyệt chưa xử lý được ảnh.");
    }

    // Cắt vuông ở giữa để avatar không bị méo.
    const side = Math.min(
      image.naturalWidth,
      image.naturalHeight
    );

    const sourceX = (image.naturalWidth - side) / 2;
    const sourceY = (image.naturalHeight - side) / 2;

    // Nền cho PNG trong suốt khi chuyển sang JPEG.
    context.fillStyle = "#f3eadc";
    context.fillRect(0, 0, 256, 256);

    context.drawImage(
      image,
      sourceX,
      sourceY,
      side,
      side,
      0,
      0,
      256,
      256
    );

    const result = canvas.toDataURL("image/jpeg", 0.85);

    if (!result.startsWith("data:image/jpeg;base64,")) {
      throw new Error("Chưa chuyển đổi được ảnh.");
    }

    return result;
  } finally {
    URL.revokeObjectURL(url);
  }
}

interface ProfileAvatarEditorProps {
  email: string;
  name: string;
}

export function ProfileAvatarEditor({
  email,
  name,
}: ProfileAvatarEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef(0);

  const avatar = useProfileAvatar(email);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    return () => {
      // Bỏ kết quả xử lý nếu đã rời màn hình.
      requestRef.current += 1;
    };
  }, []);

  const handleChooseFile = async (file: File) => {
    const requestId = ++requestRef.current;

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const prepared = await prepareAvatar(file);

      if (requestId !== requestRef.current) return;

      if (!saveProfileAvatar(email, prepared)) {
        throw new Error(
          "Chưa lưu được ảnh. Trình duyệt có thể hết dung lượng hoặc đang chặn lưu dữ liệu."
        );
      }

      setNotice("Đã cập nhật ảnh đại diện.");
    } catch (cause) {
      if (requestId !== requestRef.current) return;

      setError(
        cause instanceof Error
          ? cause.message
          : "Không đọc được ảnh. Bạn hãy chọn ảnh khác."
      );
    } finally {
      if (requestId === requestRef.current) {
        setBusy(false);
      }
    }
  };

  const handleRemove = () => {
    setError("");
    setNotice("");

    if (!saveProfileAvatar(email, null)) {
      setError("Chưa xóa được ảnh. Bạn hãy thử lại.");
      return;
    }

    setNotice("Đã xóa ảnh đại diện.");
  };

  return (
    <div className="mb-5 rounded-panel border border-line bg-surface p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <ProfileAvatar
            email={email}
            name={name}
            className="h-14 w-14 border border-line text-2xl"
          />

          <div>
            <p className="text-sm font-bold text-ink">
              Ảnh đại diện
            </p>
            <p className="text-xs leading-relaxed text-muted">
              JPG, PNG · Tối đa 5 MB
            </p>
            <p className="text-xs leading-relaxed text-muted">
              Ảnh được cắt vuông ở giữa và chỉ lưu trên
              trình duyệt này.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            <Camera className="mr-2 h-4 w-4" />
            {busy ? "Đang xử lý…" : "Đổi ảnh"}
          </Button>

          {avatar && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={handleRemove}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa ảnh
            </Button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        aria-label="Chọn ảnh đại diện JPG hoặc PNG"
        className="sr-only"
        disabled={busy}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];

          // Cho phép chọn lại cùng một file.
          event.currentTarget.value = "";

          if (file) {
            void handleChooseFile(file);
          }
        }}
      />

      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}

      {notice && (
        <p role="status" className="mt-3 text-sm text-success">
          {notice}
        </p>
      )}
    </div>
  );
}
