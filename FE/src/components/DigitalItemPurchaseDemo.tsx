import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import type { DigitalItemId } from "./DigitalItemsPanel";

interface Props {
  owned: DigitalItemId[];
  onReceive: (id: DigitalItemId) => boolean;
}

type Phase = "choose" | "review" | "processing" | "error";

const ITEMS: { id: DigitalItemId; title: string }[] = [
  { id: "lotus-vase", title: "Bình sen" },
  { id: "river-lantern", title: "Hoa đăng" },
  { id: "sticker", title: "Sticker kỷ vật" },
];

export function DigitalItemPurchaseDemo({ owned, onReceive }: Props) {
  const [selectedId, setSelectedId] =
    useState<DigitalItemId>("lotus-vase");
  const [phase, setPhase] = useState<Phase>("choose");
  const [simulateError, setSimulateError] = useState(false);
  const [message, setMessage] = useState("");

  const receiverRef = useRef(onReceive);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    receiverRef.current = onReceive;
  }, [onReceive]);

  useEffect(() => {
    if (phase !== "processing") return;

    const timer = window.setTimeout(() => {
      if (simulateError) {
        setMessage("Lỗi mô phỏng. Chưa thêm vật phẩm vào bộ sưu tập.");
        setPhase("error");
        return;
      }

      const saved = receiverRef.current(selectedId);

      if (!saved) {
        setMessage(
          "Chưa lưu được vật phẩm. Bạn hãy thử lại hoặc kiểm tra bộ sưu tập.",
        );
        setPhase("error");
        return;
      }

      setMessage("Đã thêm vật phẩm demo vào bộ sưu tập. Không thu tiền.");
      setPhase("choose");
    }, 600);

    return () => window.clearTimeout(timer);
  }, [phase, selectedId, simulateError]);

  useEffect(() => {
    if (phase !== "choose") statusRef.current?.focus();
  }, [phase]);

  const selected = ITEMS.find((item) => item.id === selectedId)!;
  const alreadyOwned = owned.includes(selectedId);

  return (
    <section
      aria-labelledby="digital-purchase-demo-title"
      className="mt-6 rounded-panel border border-line p-4 sm:p-5"
    >
      <h3
        id="digital-purchase-demo-title"
        className="font-display text-lg font-semibold text-ink"
      >
        Thử luồng mua vật phẩm
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Chỉ mô phỏng thao tác. Giá chưa được công bố, không thu tiền
        và không tạo giao dịch thật.
      </p>

      {phase === "choose" ? (
        <div className="mt-4 space-y-4">
          <label className="block text-sm font-semibold text-ink">
            Chọn vật phẩm
            <select
              value={selectedId}
              onChange={(event) => {
                setSelectedId(event.target.value as DigitalItemId);
                setMessage("");
              }}
              className="mt-2 w-full rounded-control border border-line bg-canvas px-3 py-3 text-base text-ink"
            >
              {ITEMS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                  {owned.includes(item.id) ? " — đã sở hữu" : ""}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(event) => setSimulateError(event.target.checked)}
              className="mt-1"
            />
            Mô phỏng xử lý thất bại
          </label>

          <Button
            type="button"
            disabled={alreadyOwned}
            onClick={() => {
              setMessage("");
              setPhase("review");
            }}
          >
            {alreadyOwned ? "Đã có trong bộ sưu tập" : "Xem lại lựa chọn"}
          </Button>
        </div>
      ) : (
        <div
          ref={statusRef}
          tabIndex={-1}
          aria-busy={phase === "processing"}
          className="mt-4"
        >
          {phase === "review" && (
            <>
              <p className="font-semibold text-ink">{selected.title}</p>
              <p className="mt-2 text-sm text-muted">
                Xác nhận để thử thêm vật phẩm vào bộ sưu tập demo.
                Không yêu cầu thông tin thanh toán.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  type="button"
                  disabled={alreadyOwned}
                  onClick={() => setPhase("processing")}
                >
                  {alreadyOwned ? "Đã sở hữu" : "Xác nhận mô phỏng"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPhase("choose")}
                >
                  Quay lại
                </Button>
              </div>
            </>
          )}

          {phase === "processing" && (
            <>
              <p role="status" className="text-sm text-muted">
                Đang xử lý mô phỏng…
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => setPhase("choose")}
              >
                Hủy
              </Button>
            </>
          )}

          {phase === "error" && (
            <>
              <p role="alert" className="text-sm text-danger">
                {message}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setSimulateError(false);
                    setMessage("");
                    setPhase("processing");
                  }}
                >
                  Thử lại
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMessage("");
                    setPhase("choose");
                  }}
                >
                  Quay lại chọn
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {phase === "choose" && message && (
        <p role="status" className="mt-4 text-sm text-ink">
          {message}
        </p>
      )}
    </section>
  );
}
