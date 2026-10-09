import React from "react";
import { MemorialProfilesPanel } from "../components/MemorialProfilesPanel";
import {
  ArrowLeft,
  ArrowRight,
  Edit2,
  Heart,
  Plus,
  UserRound,
  Calendar,
  Flame,
  Sparkles,
  BookOpen,
  Bell,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

export interface MemorialRecord {
  id?: string;
  name: string;
  relation: string;
  date: string;
  note?: string;
  avatarUrl?: string;
}

interface MemorialSpaceScreenProps {
  onSelect: (record: MemorialRecord | null) => void;
  memorial: MemorialRecord | null;
  onBack: () => void;
  onCreate: () => void;
  onEdit: () => void;
  onGoToAltar: () => void;
  onGoToReminders: () => void;
}

const formatMemorialDate = (value: string): string => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) return value;

  return `${match[3]}/${match[2]}/${match[1]}`;
};

export const MemorialSpaceScreen: React.FC<MemorialSpaceScreenProps> = ({
  onSelect,
  memorial,
  onBack,
  onCreate,
  onEdit,
  onGoToAltar,
  onGoToReminders,
}) => {
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
            className="text-xs px-2.5 py-0.5 font-medium border-rose-400/40 text-rose-800 dark:text-rose-300 bg-rose-500/10"
          >
            Góc tưởng niệm
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
            Góc tưởng niệm
          </h1>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
            Nơi tĩnh lặng để gọi tên người thương yêu đã khuất, gìn giữ bóng hình và gửi trao những lời tri ân thiêng liêng nhất.
          </p>
        </header>

        <MemorialProfilesPanel selectedId={memorial?.id} onSelect={onSelect} />
        {/* Main Content Area */}
        {!memorial ? (
          /* Empty State: Haven't created yet */
          <Card className="p-8 sm:p-14 text-center rounded-2xl border-line bg-surface/95 mb-12 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-rose-500/15 border border-rose-400/30 mx-auto mb-5 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-sm">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-3">
              Bạn chưa tạo góc tưởng niệm
            </h2>

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-lg mx-auto mb-8">
              Bắt đầu bằng một cái tên thân thương, một mối quan hệ gia đình và một ngày kỷ niệm muốn lưu giữ trọn đời trong tim.
            </p>

            <Button
              onClick={onCreate}
              className="gap-2 min-h-12 px-7 rounded-xl bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-semibold shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo một góc tưởng niệm</span>
            </Button>
          </Card>
        ) : (
          /* Active State: Display Shrine Card */
          <>
            <Card className="p-6 sm:p-9 rounded-2xl border border-amber-400/35 bg-surface/95 mb-8 shadow-xs backdrop-blur-sm">
              <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-amber-600/15 text-amber-800 dark:text-amber-300 shadow-xs">
                    {memorial.avatarUrl ? (
                      <>
                        <img src={memorial.avatarUrl} alt={`Ảnh tưởng niệm ${memorial.name}`} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.classList.add("hidden"); event.currentTarget.nextElementSibling?.classList.remove("hidden"); }} />
                        <UserRound className="hidden h-8 w-8" aria-hidden="true" />
                      </>
                    ) : <UserRound className="h-8 w-8" aria-hidden="true" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge className="bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-400/30 text-xs font-semibold px-2.5 py-0.5">
                        Góc tri ân riêng
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs text-amber-800 dark:text-amber-300 border-amber-400/40"
                      >
                        {memorial.relation}
                      </Badge>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink [overflow-wrap:anywhere]">
                      {memorial.name}
                    </h2>

                    <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
                      <Calendar className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                      <span>
                        Ngày ghi nhớ:{" "}
                        <strong className="text-ink">
                          {formatMemorialDate(memorial.date)}
                        </strong>{" "}
                        (dương lịch)
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={onEdit}
                  className="w-full shrink-0 gap-2 sm:w-auto border-line text-ink hover:text-accent cursor-pointer rounded-xl"
                >
                  <Edit2 className="h-4 w-4" aria-hidden="true" />
                  <span>Chỉnh sửa thông tin</span>
                </Button>
              </div>

              {/* Tribute Note Area */}
              <div className="mt-8 pt-6 border-t border-line grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-2">
                    LỜI TRI ÂN GỬI GẮM
                  </span>
                  <div className="p-4 rounded-xl bg-surface-soft/80 border border-line">
                    <p className="whitespace-pre-wrap font-display text-base sm:text-lg italic text-ink [overflow-wrap:anywhere] leading-relaxed">
                      “{memorial.note || "Bạn chưa viết lời tri ân nào."}”
                    </p>
                  </div>
                </div>

                <div className="sm:border-l sm:border-line sm:pl-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-2">
                      KHOẢNG LẶNG NHỚ THƯƠNG
                    </span>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      Bất cứ khi nào lòng chùng xuống, bạn có thể ghé về bàn thờ 3D để dâng một nén tâm hương,
                      hoặc viết thêm những dòng tâm sự để gắn kết cùng người thân.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-2 text-xs text-stone-500">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dữ liệu được lưu trữ an toàn trên thiết bị của bạn.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Action Navigation Grid */}
            <div className="mb-12 grid gap-4 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                onClick={onGoToAltar}
                className="h-auto min-h-16 w-full justify-between whitespace-normal p-5 text-left rounded-2xl border border-line bg-surface hover:bg-surface-soft hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                    <Flame className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-ink">
                      Thắp hương tại bàn thờ 3D
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Chuyển sang bàn thờ gia tiên để dâng nén nhang lòng
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onEdit}
                className="h-auto min-h-16 w-full justify-between whitespace-normal p-5 text-left rounded-2xl border border-line bg-surface hover:bg-surface-soft hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-400/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                    <Edit2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-ink">
                      Bổ sung lời tri ân
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Ghi thêm những dòng hoài niệm gửi đến người thân
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
              </Button>
            </div>
          </>
        )}

        {/* Reminders Callout Box */}
        <section
          aria-labelledby="memorial-reminders-title"
          className="mb-12 rounded-2xl border border-line bg-surface/95 p-6 sm:p-7 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3
                  id="memorial-reminders-title"
                  className="font-display text-lg sm:text-xl font-bold text-ink"
                >
                  Nhắc ngày giỗ và dịp lễ trọng
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5">
                  Thiết lập ngày giỗ (âm lịch / dương lịch) hoặc ngày sóc vọng (mùng Một, ngày Rằm) để nhớ về gia tiên
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={onGoToReminders}
              className="shrink-0 rounded-xl border-amber-400/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10 cursor-pointer font-medium self-start sm:self-auto"
            >
              <span>Mở quản lý nhắc lịch</span>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};
