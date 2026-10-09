import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";
import {
  ArrowLeft,
  Heart,
  Landmark,
  Calendar,
  Sparkles,
  Eye,
  EyeOff,
  Send,
  Compass,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
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
  onRecordIncense: () => Promise<boolean>;
  onSaveTribute: (content: string) => boolean | Promise<boolean>;
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
  onRecordIncense,
  onSaveTribute,
  initialContent = "",
  onDraftChange,
}) => {
  const [show3D, setShow3D] = useState(false);
  const [tribute, setTribute] = useState(initialContent);
  const [submitted, setSubmitted] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [incenseStatus, setIncenseStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const recordIncense = async () => {
    if (incenseStatus === "saving") return;
    setIncenseStatus("saving");
    try {
      setIncenseStatus(await onRecordIncense() ? "saved" : "error");
    } catch {
      setIncenseStatus("error");
    }
  };

  useEffect(() => {
    onDraftChange?.(submitted ? null : tribute);
  }, [tribute, submitted, onDraftChange]);

  const sendTribute = async () => {
    const cleanContent = tribute.trim();

    if (!cleanContent || submitted) return;

    setSaveError("");

    const saved = await onSaveTribute(cleanContent);

    if (saved) {
      setSubmitted(true);
    } else if (isLoggedIn) {
      setSaveError("Chưa lưu được lời tri ân. Bạn hãy thử lại.");
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-stone-600 dark:text-stone-400">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Không gian của tôi</span>
          </button>
          <Badge
            variant="outline"
            className="text-xs px-2.5 py-0.5 font-medium border-amber-400/40 text-amber-800 dark:text-amber-300 bg-amber-500/10"
          >
            Góc riêng tâm linh
          </Badge>
        </div>

        {/* Page Header */}
        <header className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
            NẾP NHÀ VIỆT
          </span>
          <h1
            tabIndex={-1}
            className="page-title mt-1.5 mb-2.5 font-display text-3xl sm:text-4xl font-bold text-ink outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border-0"
          >
            Bàn thờ gia tiên
          </h1>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
            Không gian tâm linh mô phỏng trang nghiêm để bạn dừng lại giữa nhịp sống bận rộn,
            hướng về nguồn cội, dâng nén tâm hương và gửi một lời chúc lành đến gia tiên.
          </p>
        </header>

        {/* 3D Altar Interactive Section */}
        <section
          aria-labelledby="ancestor-scene-title"
          className="mb-10"
        >
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-surface-soft/80 border border-line">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h2
                  id="ancestor-scene-title"
                  className="font-display text-lg sm:text-xl font-bold text-ink"
                >
                  Một khoảng lặng hướng về gia tiên
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  Mở mô hình 3D để chiêm bái 360°, thắp nén hương lòng và bài trí kỷ vật
                </p>
              </div>
            </div>

            <Button
              type="button"
              aria-expanded={show3D}
              aria-controls="ancestor-scene-panel"
              onClick={() => setShow3D((value) => !value)}
              className={`min-h-11 px-5 rounded-xl font-semibold transition-all cursor-pointer shadow-md shrink-0 ${
                show3D
                  ? "bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-600"
                  : "bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white"
              }`}
            >
              {show3D ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1.5" />
                  <span>Đóng bàn thờ 3D</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1.5" />
                  <span>Mở bàn thờ 3D</span>
                </>
              )}
            </Button>
          </div>

          <div id="ancestor-scene-panel">
            {show3D ? (
              <Suspense
                fallback={
                  <div
                    role="status"
                    className="p-12 text-center rounded-2xl bg-surface border border-line shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-amber-600 border-t-transparent animate-spin mx-auto mb-3" />
                    <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                      Đang chuẩn bị bàn thờ gia tiên 3D…
                    </p>
                  </div>
                }
              >
                <SanctuaryScene
                  memorial={memorial}
                  onOpenMemorial={onGoToMemorial}
                />
              </Suspense>
            ) : (
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-surface to-orange-500/5 p-7 sm:p-9 text-center shadow-xs">
                <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 mx-auto mb-3.5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <p className="font-display text-xl sm:text-2xl italic font-bold text-ink mb-2">
                  “Cây có cội mới nở cành xanh ngọn, nước có nguồn mới biển rộng sông sâu.”
                </p>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-lg mx-auto">
                  Bạn có thể nhấn nút <strong className="text-ink">Mở bàn thờ 3D</strong> ở trên để thắp hương và chiêm bái,
                  hoặc viết đôi dòng tri ân gửi đến người đi trước ở khung bên dưới.
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline" disabled={!isLoggedIn || !memorial?.id || incenseStatus === "saving"} onClick={() => void recordIncense()}>
              <Heart className="mr-2 h-4 w-4" />
              {incenseStatus === "saving" ? "Đang ghi nhận…" : "Thắp một nén nhang lòng"}
            </Button>
            {incenseStatus === "saved" && <span role="status" className="text-sm text-muted">Đã lưu nén nhang tri ân vào hồ sơ.</span>}
            {incenseStatus === "error" && <span role="alert" className="text-sm text-destructive">Chưa lưu được. Bạn hãy thử lại.</span>}
          </div>
        </section>

        {/* Memorial & Remembrance Section */}
        <section className="mb-10 rounded-2xl border border-line bg-surface/95 p-6 sm:p-8 shadow-xs backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-400/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-ink">
                  Ghi nhớ bóng hình người thân
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  Tạo góc tưởng niệm riêng tư để lưu tên, mối quan hệ và ngày giỗ thiêng liêng
                </p>
              </div>
            </div>

            {memorial && (
              <Badge className="bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 font-semibold self-start sm:self-auto">
                Đang gắn kết: {memorial.name}
              </Badge>
            )}
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
            Hồ sơ tưởng niệm lưu trữ an toàn ngay trên trình duyệt máy bạn. Bạn có thể thiết lập lịch nhắc ngày giỗ
            (theo âm lịch hoặc dương lịch) để luôn trọn vẹn đạo hiếu.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onGoToMemorial}
              className="gap-2 border-line text-ink hover:text-accent cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>{memorial ? "Xem góc tưởng niệm" : "Tạo góc tưởng niệm"}</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onGoToReminders}
              className="gap-2 border-line text-ink hover:text-accent cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Quản lý lịch nhắc ngày giỗ</span>
            </Button>
          </div>
        </section>

        {/* Tribute Note Section */}
        <Card className="p-6 sm:p-8 rounded-2xl border-line bg-surface/95 mb-12 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                Gửi một lời tri ân thành kính
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                Những lời tấc lòng gửi gắm đến đấng sinh thành, tổ tiên sẽ được bảo lưu trong Góc của tôi
              </p>
            </div>
          </div>

          <Textarea
            value={tribute}
            onChange={(event) => {
              setTribute(event.target.value);
              setSubmitted(false);
              setSaveError("");
            }}
            aria-label="Lời tri ân"
            placeholder="Một lời biết ơn, tâm nguyện lành hoặc nỗi nhớ thương bạn muốn gửi đến tổ tiên..."
            className="min-h-32 mb-4 p-4 text-sm sm:text-base leading-relaxed rounded-xl border border-line bg-surface-soft/60 focus:bg-surface text-ink placeholder:text-stone-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-stone-500 dark:text-stone-400 italic">
              * Tùy tâm nguyện, không bắt buộc điền
            </span>

            <Button
              type="button"
              onClick={sendTribute}
              disabled={!tribute.trim() || submitted}
              className={`gap-2 min-h-11 px-6 rounded-xl font-semibold transition-all cursor-pointer shadow-md ${
                submitted
                  ? "bg-emerald-700 text-white hover:bg-emerald-800"
                  : "bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white"
              }`}
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Đã lưu lời tri ân</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-200" />
                  <span>
                    {isLoggedIn ? "Lưu vào Góc của tôi" : "Đăng nhập để lưu"}
                  </span>
                </>
              )}
            </Button>
          </div>

          {submitted && (
            <div
              role="status"
              className="mt-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium flex items-center gap-2.5 animate-fadeIn"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                Lời tri ân đã được lưu giữ trang trọng vào mục Điều ước & Tri ân tại Góc của tôi!
              </span>
            </div>
          )}

          {saveError && (
            <p role="alert" className="mt-4 text-sm text-danger font-medium">
              {saveError}
            </p>
          )}
        </Card>
      </main>
    </div>
  );
};
