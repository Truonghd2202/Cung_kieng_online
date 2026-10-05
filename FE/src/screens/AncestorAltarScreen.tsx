import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import type { MemorialRecord } from "./MemorialSpaceScreen";

const SanctuaryScene = lazy(() =>
  import("../components/SanctuaryScene").then((module) => ({
    default: module.SanctuaryScene,
  }))
);

interface AncestorAltarScreenProps {
  memorial: MemorialRecord | null;
  onBack: () => void;
  onGoToMemorial: () => void;
  onGoToReminders: () => void;
  isLoggedIn: boolean;
  onSaveTribute: (content: string) => boolean;
  initialContent?: string;
  onDraftChange?: (content: string | null) => void;
}

export const AncestorAltarScreen: React.FC<
  AncestorAltarScreenProps
> = ({
  memorial,
  onBack,
  onGoToMemorial,
  onGoToReminders,
  isLoggedIn,
  onSaveTribute,
  initialContent = "",
  onDraftChange,
}) => {
  const [show3D, setShow3D] = useState(false);
  const [tribute, setTribute] = useState(initialContent);
  const [submitted, setSubmitted] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    onDraftChange?.(
      submitted ? null : tribute
    );
  }, [
    tribute,
    submitted,
    onDraftChange,
  ]);

  const sendTribute = () => {
    const cleanContent = tribute.trim();

    if (!cleanContent || submitted) return;

    setSaveError("");

    const saved = onSaveTribute(cleanContent);

    if (saved) {
      setSubmitted(true);
    } else if (isLoggedIn) {
      setSaveError(
        "Chưa lưu được lời tri ân. Bạn hãy thử lại."
      );
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted">
          <button onClick={onBack} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Không gian của tôi
          </button>
          <Badge variant="outline">Góc riêng trên thiết bị</Badge>
        </div>

        <header className="max-w-2xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Một nếp nhà</span>
          <h1 className="page-title mt-2 mb-3">Bàn thờ gia tiên</h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">Một không gian mô phỏng giản dị để bạn dừng lại, nhớ về người đi trước và gửi một lời lành.</p>
        </header>

        <section
          aria-labelledby="ancestor-scene-title"
          className="mb-8"
        >
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2
                id="ancestor-scene-title"
                className="font-display text-xl font-semibold text-ink"
              >
                Một khoảng lặng hướng về nhà
              </h2>

              <p className="mt-2 text-sm text-muted leading-relaxed">
                Mở mô hình để xoay góc nhìn và thắp nhang tượng trưng.
                Thao tác này không tạo bản ghi lời tri ân.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              aria-expanded={show3D}
              aria-controls="ancestor-scene-panel"
              onClick={() => setShow3D((value) => !value)}
              className="min-h-11 w-full sm:w-auto shrink-0"
            >
              {show3D ? "Đóng cảnh 3D" : "Mở bàn thờ 3D"}
            </Button>
          </div>

          <div id="ancestor-scene-panel">
            {show3D ? (
              <Suspense
                fallback={
                  <p
                    role="status"
                    className="rounded-card border border-line bg-surface p-6 text-sm text-muted"
                  >
                    Đang mở bàn thờ 3D…
                  </p>
                }
              >
                <SanctuaryScene
                  memorial={memorial}
                  onOpenMemorial={onGoToMemorial}
                />
              </Suspense>
            ) : (
              <div className="rounded-card border border-line bg-surface-soft p-6 sm:p-8">
                <p className="font-display text-lg italic text-ink">
                  “Uống nước nhớ nguồn.”
                </p>

                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Bạn có thể mở cảnh khi muốn, hoặc viết lời tri ân
                  ở bên dưới.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold text-ink mb-2">
            Giữ lại một người bạn muốn nhớ
          </h2>

          <p className="mb-4 text-sm leading-relaxed text-muted">
            Tạo góc tưởng niệm để ghi tên, ngày và lời tri ân.
            Nếu muốn nhắc ngày giỗ, bạn có thể thêm ngày âm lịch
            hoặc dương lịch trong Nhắc lịch.
          </p>

          <p className="mb-5 text-sm leading-relaxed text-muted">
            Hồ sơ tưởng niệm chưa tự tạo lịch nhắc.
            Bản thử nghiệm hiển thị lời nhắc khi mở web,
            chưa gửi thông báo khi đóng web.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={onGoToMemorial}
            >
              Mở góc tưởng niệm
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onGoToReminders}
            >
              Mở nhắc lịch
            </Button>
          </div>
        </section>

        <Card className="p-6 sm:p-8 border-line mb-12">
          <h2 className="font-display text-xl font-bold mb-2">Gửi một lời nếu bạn muốn</h2>
          <p className="text-sm text-muted mb-4">
            Bạn có thể viết và chọn lưu vào Góc của tôi.
            <br className="hidden sm:inline" /> Chỉ thắp nhang không tạo bản ghi lời tri ân.
          </p>
          <Textarea
            value={tribute}
            onChange={(event) => {
              setTribute(event.target.value);
              setSubmitted(false);
              setSaveError("");
            }}
            aria-label="Lời tri ân"
            placeholder="Một lời biết ơn hoặc tưởng nhớ bạn muốn giữ lại..."
            className="min-h-28 mb-4"
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted">Không bắt buộc</span>
            <Button
              type="button"
              onClick={sendTribute}
              disabled={!tribute.trim() || submitted}
              className="gap-2"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              <span>
                {submitted
                  ? "Đã lưu lời tri ân"
                  : isLoggedIn
                    ? "Lưu vào Góc của tôi"
                    : "Đăng nhập để lưu"}
              </span>
            </Button>
          </div>
          {submitted && (
            <p role="status" className="mt-4 text-sm text-success">
              Đã lưu lời tri ân vào Góc của tôi trên trình duyệt này.
            </p>
          )}

          {saveError && (
            <p role="alert" className="mt-4 text-sm text-danger">
              {saveError}
            </p>
          )}
        </Card>
      </main>
    </div>
  );
};
