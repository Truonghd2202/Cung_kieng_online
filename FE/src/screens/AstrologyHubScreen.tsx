import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Sparkles,
  Compass,
  Eye,
  ShieldCheck,
  BookOpen,
  Flower2,
  Heart,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { BirthChartDemoPanel } from "../components/BirthChartDemoPanel";
import { PhysiognomyDemoPanel } from "../components/PhysiognomyDemoPanel";

interface AstrologyHubScreenProps {
  onBackToExperience: () => void;
  onGoToHoroscope: () => void;
}

export const AstrologyHubScreen: React.FC<AstrologyHubScreenProps> = ({
  onBackToExperience,
  onGoToHoroscope,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "birth" | "chart" | "face">("all");

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        {/* Top Breadcrumb Nav */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-stone-600 dark:text-stone-400">
          <button
            type="button"
            onClick={onBackToExperience}
            className="inline-flex items-center gap-1.5 hover:text-amber-800 dark:hover:text-amber-300 font-medium cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Quay lại Khám phá Trải nghiệm</span>
          </button>

          <Badge
            variant="outline"
            className="text-xs px-3 py-0.5 border-amber-500/40 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-medium self-start sm:self-auto"
          >
            ✦ THỜI KHẮC CỔ TRUYỀN · TỰ SOI CHIẾU NỘI TÂM
          </Badge>
        </div>

        {/* Hero Magazine Header */}
        <section className="mb-8 p-6 sm:p-10 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-surface via-surface to-amber-500/[0.04] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-bl-full" />

          <div className="relative z-10 space-y-3.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                CHIÊM TINH HỌC DÂN GIAN & NHÂN TƯỚNG NẾP XƯA
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-500">Đối Thoại Cùng Bản Thể</span>
            </div>

            <h1 className="page-title font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink leading-tight">
              Khám Phá Biểu Tượng Ngày Sinh & Nét Tướng
            </h1>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
              Người xưa mượn sự vận hành của tinh tú, tiết khí và tướng mạo để soi tỏ phẩm hạnh,
              quán chiếu tâm tính và tìm điểm tựa an lành. Đây là không gian văn hóa để bạn tự thấu hiểu chính mình,
              hoàn toàn không mang màu sắc bói toán đoán mệnh.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-full font-semibold border transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-amber-800 dark:bg-amber-700 text-white border-amber-800 shadow-xs"
                    : "bg-surface text-stone-700 dark:text-stone-300 border-line hover:border-amber-500/40"
                }`}
              >
                Tất cả trải nghiệm
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("birth")}
                className={`px-3.5 py-1.5 rounded-full font-semibold border transition-all cursor-pointer ${
                  activeTab === "birth"
                    ? "bg-amber-800 dark:bg-amber-700 text-white border-amber-800 shadow-xs"
                    : "bg-surface text-stone-700 dark:text-stone-300 border-line hover:border-amber-500/40"
                }`}
              >
                🌟 Biểu tượng ngày sinh
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("chart")}
                className={`px-3.5 py-1.5 rounded-full font-semibold border transition-all cursor-pointer ${
                  activeTab === "chart"
                    ? "bg-amber-800 dark:bg-amber-700 text-white border-amber-800 shadow-xs"
                    : "bg-surface text-stone-700 dark:text-stone-300 border-line hover:border-amber-500/40"
                }`}
              >
                📜 Bàn Tử Vi 12 Cung
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("face")}
                className={`px-3.5 py-1.5 rounded-full font-semibold border transition-all cursor-pointer ${
                  activeTab === "face"
                    ? "bg-amber-800 dark:bg-amber-700 text-white border-amber-800 shadow-xs"
                    : "bg-surface text-stone-700 dark:text-stone-300 border-line hover:border-amber-500/40"
                }`}
              >
                👤 Nhân tướng Tam Đình
              </button>
            </div>
          </div>
        </section>

        {/* Feature 1: Biểu tượng ngày sinh Highlight Card */}
        {(activeTab === "all" || activeTab === "birth") && (
          <section
            aria-labelledby="birth-symbols-title"
            className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-surface via-surface to-amber-500/[0.05] p-6 sm:p-8 shadow-md relative overflow-hidden mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-800 dark:text-amber-300">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    TRẢI NGHIỆM ĐẶC QUYỀN
                  </span>
                </div>

                <h2
                  id="birth-symbols-title"
                  className="font-display text-xl sm:text-2xl font-bold text-ink"
                >
                  Bản Chiêm Nghiệm Từ Ngày Sinh Của Bạn
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  Đối chiếu ngày sinh dương lịch với lịch âm Việt Nam, Can Chi năm, Ngũ hành nạp âm
                  và phương vị sinh dưỡng. Nhận về các câu hỏi tự vấn sâu sắc để bồi đắp tâm an lành.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-surface-soft border border-line">
                    <strong className="text-amber-800 dark:text-amber-300 block">✦ Tứ Trụ Can Chi</strong>
                    <span className="text-stone-500 text-[11px]">Đối chiếu âm dương thiên văn</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-soft border border-line">
                    <strong className="text-amber-800 dark:text-amber-300 block">✦ Ngũ Hành Nạp Âm</strong>
                    <span className="text-stone-500 text-[11px]">Bản mệnh & bài học nhân sinh</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-soft border border-line">
                    <strong className="text-amber-800 dark:text-amber-300 block">✦ Tự Vấn Nội Tâm</strong>
                    <span className="text-stone-500 text-[11px]">Nuôi dưỡng điểm mạnh tự thân</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-start md:items-end justify-center gap-2">
                <Button
                  type="button"
                  onClick={onGoToHoroscope}
                  className="rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 min-h-11 cursor-pointer shadow-md gap-2"
                >
                  <span>Nhập ngày sinh ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <span className="text-[11px] text-stone-500 italic">
                  * Tính toán an toàn, bảo mật trên trình duyệt
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Feature 2: Lá số Tử Vi 12 Cung Demo Panel */}
        {(activeTab === "all" || activeTab === "chart") && (
          <BirthChartDemoPanel />
        )}

        {/* Feature 3: Nhân Tướng Học Tam Đình Ngũ Quan Demo Panel */}
        {(activeTab === "all" || activeTab === "face") && (
          <PhysiognomyDemoPanel />
        )}

        {/* Ethical Standards Footer */}
        <section className="mt-8 p-6 rounded-3xl bg-surface border border-line shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Nguyên tắc ứng xử văn hóa của Tin Lắm Tâm Linh</span>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
            Toàn bộ các nội dung biểu tượng ngày sinh, lá số 12 cung và nhân tướng học được biên soạn
            dựa trên các tài liệu văn hóa khảo cứu dân gian chính thống. Chúng tôi cam kết:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-surface-soft border border-line">
              <strong className="text-ink block mb-0.5">Không mê tín dị đoan</strong>
              <span className="text-stone-500 text-[11px]">Không gieo rắc sợ hãi hay định đoạt số phận bi quan.</span>
            </div>
            <div className="p-3 rounded-2xl bg-surface-soft border border-line">
              <strong className="text-ink block mb-0.5">Không kinh doanh bùa ngải</strong>
              <span className="text-stone-500 text-[11px]">Không bán vật phẩm cầu may, hóa giải tai ương vụ lợi.</span>
            </div>
            <div className="p-3 rounded-2xl bg-surface-soft border border-line">
              <strong className="text-ink block mb-0.5">Tôn trọng quyền riêng tư</strong>
              <span className="text-stone-500 text-[11px]">Không lưu trữ hay truyền tải ngày sinh và hình ảnh của bạn.</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
