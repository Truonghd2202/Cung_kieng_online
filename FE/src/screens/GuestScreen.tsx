import React, { useState } from "react";
import {
  Compass,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Wind,
  Heart,
  Moon,
  Waves,
  Feather,
  Flower2,
} from "lucide-react";
import { MoodKey, MOODS_LIST, SIGNALS_DATA } from "../data/demoSignals";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";

interface GuestScreenProps {
  onStartSignal: (mood: MoodKey) => void;
  onGoToToday: () => void;
  onGoToAccount: () => void;
}

export const GuestScreen: React.FC<GuestScreenProps> = ({
  onStartSignal,
  onGoToToday,
  onGoToAccount,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodKey>("An yên");
  const currentSignal = SIGNALS_DATA[selectedMood];

  const getMoodIcon = (iconType: string) => {
    switch (iconType) {
      case "lotus":
        return <Flower2 className="w-3.5 h-3.5 text-accent" />;
      case "waves":
        return <Waves className="w-3.5 h-3.5 text-accent" />;
      case "question":
        return <HelpCircle className="w-3.5 h-3.5 text-accent" />;
      case "wind":
        return <Wind className="w-3.5 h-3.5 text-accent" />;
      case "heart":
        return <Heart className="w-3.5 h-3.5 text-accent" />;
      case "moon":
        return <Moon className="w-3.5 h-3.5 text-accent" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-accent" />;
    }
  };

  return (
    <div className="screen-shell">
      <main className="page-container max-w-7xl">
        {/* Editorial Hero Header - Style Image 1: Toàn màn hình thoáng đãng, trọn vẹn 2 dòng */}
        <section className="mb-8 sm:mb-12">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-3.5">
            <Flower2 className="w-3.5 h-3.5 text-accent" />
            <span>Gieo mầm an lành • Lắng đọng tâm tư</span>
          </div>

          {/* Main Title - Trọn vẹn 2 dòng không rớt chữ */}
          <h1 className="greeting-hero mb-4">
            <span className="greeting-line-1">Chào bạn hữu duyên ghé lại</span>
            <span className="greeting-line-2">
              Gieo một nhịp an lành hôm nay
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
            Chọn một nhịp cảm xúc để đón nhận lời chúc lành và tích truyện văn
            hóa thuần hậu của tiền nhân.
          </p>
        </section>

        <section className="guest-first-look mb-14">
          <div className="guest-first-look__content flex flex-col justify-center">
            {/* Mood Selection - Open Editorial Layout (No CRM Card Box) */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-muted mb-3">
                <span className="font-medium text-ink">
                  Bạn đang thấy lòng mình thế nào?
                </span>
                <span className="italic">Chạm để chọn</span>
              </div>

              <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
                role="group"
                aria-label="Chọn tâm trạng hiện tại"
              >
                {MOODS_LIST.map((m) => {
                  const isSelected = selectedMood === m.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedMood(m.key)}
                      className={`group relative flex items-center justify-between px-3.5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-accent bg-accent-soft/80 text-accent shadow-xs ring-1 ring-accent/30 font-semibold"
                          : "border-line bg-surface/70 text-ink hover:border-gold/60 hover:bg-surface"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${isSelected ? "bg-action" : "bg-line group-hover:bg-gold"}`}
                        />
                        <span className="truncate">{m.name}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 ml-1 opacity-80 group-hover:opacity-100"
                      >
                        {getMoodIcon(m.iconType)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Single Focal Primary CTA Button */}
            <div className="pt-1">
              <Button
                variant="default"
                size="lg"
                onClick={() => onStartSignal(selectedMood)}
                className="w-full sm:w-auto px-7 py-3 text-sm sm:text-base font-semibold shadow-md gap-2.5 cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Khám phá tín hiệu hôm nay</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Gentle Ambient Signal Preview & Account Link */}
            <div className="mt-6 pt-5 border-t border-line/80 max-w-xl">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-accent-soft flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-accent mb-0.5">
                    {currentSignal.guestPreview.title}
                  </div>
                  <p className="text-sm text-ink leading-relaxed font-serif italic">
                    “{currentSignal.guestPreview.message}”
                  </p>
                </div>
              </div>

              <div className="mt-4 pl-10">
                <Button
                  variant="link"
                  onClick={onGoToAccount}
                  className="px-0 py-0 h-auto text-xs text-muted hover:text-accent font-medium inline-flex items-center gap-1"
                >
                  <span>Đã có tài khoản? Đăng nhập vào Góc của tôi</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Ambient Visual Artwork */}
          <div className="guest-first-look__visual flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              <img
                src="/images/tea_bowl.jpg"
                alt="Chén trà tịnh tâm"
                className="guest-first-look__image shadow-md"
              />
              <div className="absolute inset-0 rounded-[8rem_8rem_var(--radius-panel)_var(--radius-panel)] lg:rounded-[8rem_8rem_var(--radius-panel)_var(--radius-panel)] pointer-events-none ring-1 ring-inset ring-black/5" />
            </div>
          </div>
        </section>

        <section
          className="guest-cultural-note mb-16"
          aria-label="Góc văn hóa dân gian"
        >
          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-1.5">
              Khoảng lặng hôm nay
            </span>
            <p className="font-display text-xl sm:text-2xl font-semibold text-ink">
              Thuận Hòa • An Nhiên
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Trải nghiệm mở cho khách thập phương. Dành vài phút lắng đọng để
              tái tạo năng lượng an lành.
            </p>
          </div>
          <div className="border-l-2 border-gold/70 pl-6 flex flex-col justify-center">
            <p className="font-display text-lg sm:text-xl font-medium italic leading-relaxed text-ink">
              “Nước trong hoa nở ngát dòng,
              <br />
              Tâm an vạn nẻo bụi trần hóa sen.”
            </p>
            <p className="mt-2 text-xs text-muted/80">
              ✦ Ca dao dân gian • Gieo một niềm an
            </p>
          </div>
        </section>

        {/* 3 Pillars Section - Style Image 2 */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span className="badge-crimson">TRIẾT LÝ DÂN GIAN</span>
                <span className="text-[11px] font-bold tracking-widest text-gold uppercase">
                  DI SẢN TRÍ TUỆ · TỰA NGUỒN CỘI VIỆT
                </span>
              </div>
              <h2 className="font-luxury text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-ink leading-tight">
                TINH HOA DÂN GIAN <br className="hidden sm:inline" />
                <span className="ampersand-gold text-3xl sm:text-4xl lg:text-5xl">
                  &
                </span>{" "}
                NẾP SỐNG TỈNH THỨC
              </h2>
              <p className="mt-2 text-sm text-muted max-w-2xl leading-relaxed">
                Không ly kỳ huyền hoặc, không gieo rắc sợ hãi. Mỗi lời chiêm
                nghiệm là một tấm gương soi tỏ lòng mình qua trí tuệ nghìn đời
                của tiền nhân.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted font-medium">
              <span className="w-2 h-2 rounded-full bg-accent-soft"></span>
              <span>Khách ghé tự do</span>
              <span>•</span>
              <span>Bảo mật trọn vẹn</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <Card className="py-6 border-0 border-t border-line rounded-none bg-transparent flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-accent mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase text-accent tracking-wider mb-1">
                  Trụ cột 01 • Khảo cứu văn bản
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-2.5">
                  Chất liệu nguồn cội
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Ca dao, tục ngữ, tích xưa đã được tuyển lựa cẩn trọng và trích
                  dẫn nguồn xác thực từ kho tàng văn hóa dân tộc — không biến
                  tướng hay pha tạp.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-accent">
                <span className="flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5" />
                  Kho tàng Dó & Văn bia
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Pillar 2 */}
            <Card className="py-6 border-0 border-t border-line rounded-none bg-transparent flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-accent mb-4">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase text-accent tracking-wider mb-1">
                  Trụ cột 02 • Nhân văn hiện đại
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-2.5">
                  Chiêm nghiệm không mê tín
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Lời soi chiếu nhân văn, văn minh, không phán xét, không hù dọa
                  vận hạn. Lấy an lạc tự thân và trí tuệ tỉnh táo làm trung tâm
                  soi chiếu đường đời.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-accent">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  100% Thuần khiết tư duy
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Pillar 3 */}
            <Card className="py-6 border-0 border-t border-line rounded-none bg-transparent flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-accent mb-4">
                  <Flower2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase text-accent tracking-wider mb-1">
                  Trụ cột 03 • Thực hành vi mô
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-2.5">
                  Hành động nhỏ nuôi tâm
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Một cử chỉ vi mô thiết thực cho bạn thực hành ngay trong ngày:
                  tưới một khóm cây, lắng nghe một tri âm, hay giữ một nhịp thở
                  chậm giữa phố thị.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-accent">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Hành thiền vi mô 5 phút
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          </div>
        </section>

        {/* Community Banner Callout */}
        <Card className="p-6 sm:p-8 rounded-card bg-surface border border-line flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Gieo duyên cộng đồng
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
              Mỗi ngày một nét mực Dó, góp một nhánh an lành
            </h3>
            <p className="mt-2 text-sm text-ink leading-relaxed">
              Con số minh họa cho định hướng cộng đồng: hơn 12.400 người bạn hữu
              duyên ghé thăm trong một tuần để đón nhận một chỉ dẫn văn hóa nhẹ
              nhàng trước khi bắt đầu ngày làm việc.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-muted">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Không quảng cáo làm phiền
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Không gửi danh tính lên máy chủ
              </span>
            </div>
          </div>

          <div className="text-center flex-shrink-0">
            <Button
              variant="outline"
              size="pill"
              onClick={onGoToToday}
              className="bg-surface hover:bg-surface border-line text-accent shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-accent" />
              <span>Xem thư viện ca dao & điềm lành</span>
            </Button>
            <div className="mt-2 text-xs text-muted">
              Trải nghiệm hoàn toàn mở cho khách
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
