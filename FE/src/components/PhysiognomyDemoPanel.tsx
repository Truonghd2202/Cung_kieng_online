import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

type Phase = "edit" | "loading" | "result" | "error";

export function PhysiognomyDemoPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [imageReady, setImageReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("edit");
  const [error, setError] = useState("");
  const [simulateError, setSimulateError] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImageReady(false);

    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (phase !== "loading") return;

    const timer = window.setTimeout(() => {
      if (simulateError) {
        setError("Lỗi mô phỏng: chưa nhận được kết quả.");
        setPhase("error");
      } else {
        setPhase("result");
      }
    }, 600);

    return () => window.clearTimeout(timer);
  }, [phase, simulateError]);

  useEffect(() => {
    if (phase !== "edit") statusRef.current?.focus();
  }, [phase]);

  const clearImage = () => {
    setFile(null);
    setPreview("");
    setImageReady(false);
    setError("");
    setPhase("edit");
  };

  const fieldClass =
    "mt-2 block w-full min-w-0 rounded-control border border-line " +
    "bg-canvas px-3 py-3 text-sm text-ink";

  return (
    <section
      aria-labelledby="physiognomy-demo-title"
      className="mt-6 rounded-card border border-line bg-surface p-5 sm:p-8"
    >
      <h2
        id="physiognomy-demo-title"
        className="font-display text-2xl font-semibold text-ink"
      >
        Thử luồng nhân tướng
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Chỉ thử giao diện với ảnh trên thiết bị. Ảnh chưa được gửi,
        lưu vào bộ sưu tập hoặc phân tích bằng AI.
      </p>

      {phase === "edit" && (
        <div className="mt-5">
          <label
            htmlFor="physiognomy-demo-file"
            className="block text-sm font-semibold text-ink"
          >
            Chọn ảnh JPG hoặc PNG — tối đa 5 MB trong bản demo
          </label>

          <input
            id="physiognomy-demo-file"
            type="file"
            accept="image/jpeg,image/png"
            className={fieldClass}
            onChange={(event) => {
              const next = event.target.files?.[0];
              event.target.value = "";

              if (!next) return;

              if (
                !["image/jpeg", "image/png"].includes(next.type) ||
                next.size === 0 ||
                next.size > 5 * 1024 * 1024
              ) {
                setError("Chọn ảnh JPG/PNG hợp lệ, tối đa 5 MB.");
                return;
              }

              setError("");
              setImageReady(false);
              setFile(next);
            }}
          />

          <p className="mt-2 text-xs text-muted">
            Khi rời màn này hoặc tải lại trang, bạn cần chọn ảnh lại.
          </p>
        </div>
      )}

      {preview && (
        <figure className="mt-5">
          <img
            key={preview}
            src={preview}
            alt="Ảnh bạn đã chọn để thử giao diện"
            className="max-h-72 w-full rounded-panel border border-line bg-canvas object-contain"
            onLoad={() => setImageReady(true)}
            onError={() => {
              setImageReady(false);
              setError("Chưa đọc được ảnh. Bạn hãy chọn file khác.");
            }}
          />
          <figcaption className="mt-2 break-words text-xs text-muted">
            {file?.name}
          </figcaption>
        </figure>
      )}

      {phase === "edit" && (
        <div className="mt-5 space-y-4">
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(event) => setSimulateError(event.target.checked)}
              className="mt-1"
            />
            Mô phỏng lỗi để kiểm tra thao tác thử lại
          </label>

          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              disabled={!imageReady}
              onClick={() => {
                setError("");
                setPhase("loading");
              }}
            >
              Xem kết quả demo
            </Button>

            {file && (
              <Button
                type="button"
                variant="outline"
                onClick={clearImage}
              >
                Bỏ ảnh đã chọn
              </Button>
            )}
          </div>
        </div>
      )}

      {phase !== "edit" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          aria-busy={phase === "loading"}
          className="mt-5"
        >
          {phase === "loading" && (
            <>
              <p role="status" className="text-sm text-muted">
                Đang mô phỏng bước xử lý…
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => setPhase("edit")}
              >
                Hủy
              </Button>
            </>
          )}

          {phase === "error" && (
            <>
              <p role="alert" className="text-sm text-danger">
                {error} Ảnh đã chọn vẫn được giữ trong màn này.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  type="button"
                  disabled={!imageReady}
                  onClick={() => {
                    setSimulateError(false);
                    setError("");
                    setPhase("loading");
                  }}
                >
                  Thử lại demo
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setError("");
                    setPhase("edit");
                  }}
                >
                  Quay lại chọn ảnh
                </Button>
              </div>
            </>
          )}

          {phase === "result" && (
            <>
              <h3 className="font-semibold text-ink">
                Kết quả mẫu
              </h3>

              <div className="mt-4 rounded-panel border border-line p-4">
                <p className="text-sm leading-relaxed text-muted">
                  Đây là vị trí hiển thị kết quả sau khi phương pháp
                  và cấu trúc phản hồi được xác định. Bản demo không
                  nhận diện đặc điểm khuôn mặt hoặc suy ra tính cách,
                  sức khỏe hay vận mệnh từ ảnh.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPhase("edit")}
                >
                  Quay lại
                </Button>

                <Button type="button" onClick={clearImage}>
                  Bỏ ảnh và bắt đầu lại
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
