import React from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Flower2,
  Heart,
  ScrollText,
  ShieldCheck,
  Sparkles,
  SunMedium,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

interface GuestScreenProps {
  onSelectMood: () => void;
  onGoToCulture: () => void;
  onGoToExperience: () => void;
}

// 5 trạng thái cảm xúc tiêu biểu theo Mục III.1.1 trong Requirements
const MOOD_TEASER_CHIPS = [
  { label: "Chênh vênh", icon: "🌱" },
  { label: "Áp lực", icon: "🍃" },
  { label: "Mông lung", icon: "☁️" },
  { label: "Cần động viên", icon: "☀️" },
  { label: "Bình yên", icon: "🌸" },
];

export const GuestScreen: React.FC<GuestScreenProps> = ({
  onSelectMood,
  onGoToCulture,
  onGoToExperience,
}) => {
  return (
    <div className="screen-shell relative overflow-hidden">
      {/* Vầng sáng nền mang sắc ấm mỹ học truyền thống */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] sm:w-[56rem] h-[28rem] rounded-full bg-gradient-to-b from-accent/10 via-gold/5 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gold/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-accent/6 blur-3xl"
        aria-hidden="true"
      />

      <main className="page-container max-w-6xl relative z-10 py-6 sm:py-10">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (GIỚI THIỆU & 2 LUỒNG CHÍNH ĐỘC LẬP)      */}
        {/* ========================================================= */}
        <section
          aria-labelledby="guest-intro-title"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Pill Badge định vị */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/8 border border-accent/20 text-accent font-medium text-xs sm:text-sm tracking-wide shadow-xs backdrop-blur-xs w-fit mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <Flower2 className="w-4 h-4 text-accent" aria-hidden="true" />
              <span>Văn hóa Việt · Trạm dừng tĩnh tại cho tâm hồn</span>
            </div>

            {/* Tiêu đề chính không bị viền focus */}
            <h1
              id="guest-intro-title"
              tabIndex={-1}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.18] tracking-tight mb-4 outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
            >
              Chạm một chút văn hóa.
              <span className="block mt-2 bg-gradient-to-r from-accent via-coral-warm to-gold bg-clip-text text-transparent pb-1">
                Dành một chút cho mình.
              </span>
            </h1>

            {/* Họa tiết hoa văn truyền thống */}
            <div className="flex items-center gap-3 my-2 mb-5" aria-hidden="true">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-accent/70" />
              <div className="h-px w-32 bg-accent/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-accent/70" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/40" />
            </div>

            {/* Đoạn mở đầu định vị chuẩn theo Requirements */}
            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mb-7">
              <strong className="font-semibold text-ink">Tin Lắm Tâm Linh</strong>{" "}
              kết nối kho tàng văn hóa dân gian Việt với nhịp sống số hiện đại,
              mang đến điểm tựa tinh thần nhẹ nhàng và những câu chuyện cội nguồn
              gần gũi cho người trẻ.
            </p>

            {/* Hai nút hành động đại diện cho 2 luồng độc lập trong Requirements */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:items-center">
              <Button
                type="button"
                size="lg"
                onClick={onSelectMood}
                className="group relative overflow-hidden shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto font-medium"
              >
                <span>Chọn tâm trạng hôm nay</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onGoToCulture}
                className="group hover:border-accent/40 hover:bg-surface-soft hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto shadow-xs"
              >
                <BookOpen
                  className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>Khám phá văn hóa</span>
              </Button>
            </div>

            {/* Các cam kết cốt lõi: Tự nguyện & Không áp đặt */}
            <div className="mt-6 pt-5 border-t border-line/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                Không cần đăng nhập
              </span>
              <span className="inline-flex items-center gap-1.5">
                <SunMedium className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                Tự do trải nghiệm
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-success" aria-hidden="true" />
                Không hù dọa · Phi mê tín
              </span>
            </div>
          </div>

          {/* Cụm thị giác chén trà: Thuần khiết, không chèn chữ đè lên ảnh */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Vầng sáng dịu phía sau */}
            <div
              className="absolute inset-0 -m-4 bg-gradient-to-tr from-accent/15 via-gold/10 to-transparent rounded-[9rem] blur-2xl opacity-70"
              aria-hidden="true"
            />

            <figure className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              {/* Khung vòm Indochine mộc mạc, giữ trọn vẹn vẻ đẹp bức ảnh */}
              <div className="overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-line bg-surface shadow-md">
                <img
                  src="/images/tea_bowl.jpg"
                  alt="Chén trà ấm trong không gian yên tĩnh truyền thống"
                  decoding="async"
                  className="w-full h-72 sm:h-80 lg:h-[26rem] object-cover transition-transform duration-500 hover:scale-102"
                />
              </div>

              {/* Chú thích trang nhã đặt dưới ảnh, không che chắn thị giác */}
              <figcaption className="mt-3 text-sm text-muted text-center sm:text-left">
                Một khoảng dừng nhỏ giữa nhịp sống thường ngày.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. CHẠM CẢM XÚC NHANH (INTERACTIVE MOOD TEASER)            */}
        {/* ========================================================= */}
        <section
          aria-labelledby="mood-teaser-title"
          className="mt-14 sm:mt-20 rounded-3xl border border-line/80 bg-gradient-to-br from-surface via-surface-soft/40 to-surface p-6 sm:p-8 shadow-xs relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                <Heart className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Góc lắng đọng cảm xúc</span>
              </div>

              <h2
                id="mood-teaser-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-2"
              >
                Hôm nay bạn đang cảm thấy thế nào?
              </h2>

              <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
                Chạm nhanh vào một cảm xúc để nhận góc nhìn tích cực từ ca dao,
                tục ngữ dân gian và gợi ý một hành động nhỏ dịu dàng cho tâm hồn.
              </p>
            </div>

            <Button
              type="button"
              variant="default"
              size="default"
              onClick={onSelectMood}
              className="shrink-0 w-full sm:w-auto font-medium"
            >
              <span>Vào check-in tâm trạng</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Các nút chip cảm xúc kích hoạt luồng Check-in */}
          <div className="mt-6 pt-5 border-t border-line/60 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-medium text-subtle mr-1">
              Gợi ý cảm xúc:
            </span>
            {MOOD_TEASER_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={onSelectMood}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-line bg-surface hover:border-accent hover:bg-accent-soft/40 text-xs sm:text-sm font-medium text-ink transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. BA TRỤ CỘT HỆ SINH THÁI RÕ RÀNG (KHOE TÍNH NĂNG VÀNG)  */}
        {/* ========================================================= */}
        <section
          aria-labelledby="guest-pillars-title"
          className="mt-14 sm:mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Không gian trải nghiệm</span>
              </div>
              <h2
                id="guest-pillars-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight"
              >
                Khám phá hệ sinh thái Tin Lắm Tâm Linh
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted max-w-md">
              Hai luồng tiếp cận tự do: khởi đầu từ cảm xúc cá nhân hoặc trực
              tiếp khám phá di sản và nghi thức dân gian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Trụ cột 1: Đồng hành cảm xúc (Mood check-in) */}
            <article
              role="button"
              tabIndex={0}
              onClick={onSelectMood}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectMood();
                }
              }}
              className="group cursor-pointer rounded-2xl border border-line/80 bg-surface hover:bg-surface-soft/50 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-coral-warm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-on-accent transition-all duration-300 shadow-xs">
                    <Heart className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-accent bg-accent/8 px-2.5 py-1 rounded-full border border-accent/15">
                    Đồng hành cảm xúc
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2.5 group-hover:text-accent transition-colors duration-200">
                  Lắng nghe mình
                </h3>

                <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
                  Gửi gắm tâm sự khi áp lực, chênh vênh. Nhận lời khuyên từ ca
                  dao, tục ngữ và thông điệp tích cực cá nhân hóa cho ngày hôm nay.
                </p>

                {/* Các tính năng đặc trưng theo Requirements */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Check-in tâm trạng
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Ca dao tục ngữ
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Hành động an yên
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-sm font-semibold text-accent group-hover:text-accent-strong">
                <span>Bắt đầu lắng nghe</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </div>
            </article>

            {/* Trụ cột 2: Di sản văn hóa ba miền */}
            <article
              role="button"
              tabIndex={0}
              onClick={onGoToCulture}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onGoToCulture();
                }
              }}
              className="group cursor-pointer rounded-2xl border border-line/80 bg-surface hover:bg-surface-soft/50 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-gold/50 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-on-accent transition-all duration-300 shadow-xs">
                    <BookOpen className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                    Di sản ba miền
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2.5 group-hover:text-gold transition-colors duration-200">
                  Hiểu thêm văn hóa
                </h3>

                <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
                  Dạo bước qua kho tàng văn hóa Bắc, Trung, Nam: Tín ngưỡng Thờ
                  Mẫu & điệu hát Chầu Văn, di sản Cố đô, tục thờ cá Ông và sông
                  nước miệt vườn.
                </p>

                {/* Các tính năng đặc trưng theo Requirements */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Thờ Mẫu & Chầu Văn
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Cố đô & Biển cả
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Văn hóa sông nước
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-sm font-semibold text-gold group-hover:text-amber-800 dark:group-hover:text-amber-300">
                <span>Khám phá văn hóa</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </div>
            </article>

            {/* Trụ cột 3: Trải nghiệm thực hành số */}
            <article
              role="button"
              tabIndex={0}
              onClick={onGoToExperience}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onGoToExperience();
                }
              }}
              className="group cursor-pointer rounded-2xl border border-line/80 bg-surface hover:bg-surface-soft/50 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-success/50 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-success/10 border border-success/25 flex items-center justify-center text-success group-hover:bg-success group-hover:text-white transition-all duration-300 shadow-xs">
                    <ScrollText className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
                    Tương tác trực tiếp
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2.5 group-hover:text-success transition-colors duration-200">
                  Thực hành tâm an
                </h3>

                <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
                  Xin xăm văn hóa truyền thống (Quan Âm, Quan Thánh), thả hoa
                  đăng số gửi gắm điều ước thiện lành, hoặc thắp nén nhang lòng tri
                  ân tổ tiên.
                </p>

                {/* Các tính năng đặc trưng theo Requirements */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Xăm Quan Âm / Quan Thánh
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Đèn hoa đăng số
                  </span>
                  <span className="text-[11px] font-medium text-subtle bg-surface-soft px-2 py-0.5 rounded-md">
                    Tri ân gia tiên
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-sm font-semibold text-success group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                <span>Vào phòng trải nghiệm</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </div>
            </article>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. CAM KẾT VĂN HÓA & TRIẾT LÝ SẢN PHẨM (MỤC I.4 REQUIREMENTS)*/}
        {/* ========================================================= */}
        <div className="mt-12 pt-6 border-t border-line/60 flex items-start sm:items-center gap-3 text-xs sm:text-sm text-muted">
          <ShieldCheck
            className="w-4 h-4 text-accent shrink-0 mt-0.5 sm:mt-0"
            aria-hidden="true"
          />
          <p className="leading-relaxed">
            <strong className="text-ink font-medium">
              Triết lý văn hóa văn minh:
            </strong>{" "}
            “Tôn trọng văn hóa gốc – Chạm cảm xúc trẻ – Nuôi dưỡng tinh thần tích
            cực”. Trải nghiệm hoàn toàn tự nguyện; không mang tính mê tín dị
            đoan, không phán xét, không hù dọa và không quyết định thay bạn.
          </p>
        </div>
      </main>
    </div>
  );
};
