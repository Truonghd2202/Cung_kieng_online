import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface TodayScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({ onNavigate }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Xôi chè hương hoa & cau trầu', done: true },
    { id: 2, text: 'Bản văn khấn Vu Lan cổ truyền', done: true },
    { id: 3, text: 'Báo tin Zalo/SMS 142 con cháu', done: true },
    { id: 4, text: 'Lau dọn từ đường & linh vị', done: true },
    { id: 5, text: 'Chuẩn bị phẩm vật thụ lộc', done: false },
    { id: 6, text: 'Cử 4 người chấp sự dâng hương', done: false },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const completedCount = checklist.filter((i) => i.done).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] selection:bg-[#ecd4c0] selection:text-[#4a1217] pb-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* =========================================================
            1. LINEAGE SPACE SUB-HEADER BANNER
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4 sm:px-6 shadow-xs">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#80141d] text-white shadow-xs">
              <span className="material-symbols-outlined text-[24px]">temple_buddhist</span>
            </span>
            <div>
              <span className="block text-[10.5px] font-bold uppercase tracking-wider text-[#8a6f62]">
                TỔNG PHẢ TRỰC THỪA • Phủ Từ Nam Định
              </span>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-[#2b1b15]">
                Nguyễn Phục Anh — Chi Trực Lăng Đời Thứ 9 Đến 14
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3.5 py-1 text-[11.5px] font-semibold text-[#543e34]">
              <span className="material-symbols-outlined text-[15px] text-[#1b6b3e]">groups</span>
              <span>142 Thành viên kết nối</span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('tong-quan-pha-he')}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f8ede2] px-3.5 py-1 text-[11.5px] font-bold text-[#80141d] hover:bg-[#ebdcd0] transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">auto_stories</span>
              <span>Phả Ký Toàn Thư</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            2. HERO LUNAR/SOLAR CALENDAR CARD (3 Parts)
            ========================================================= */}
        <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-7 shadow-xs">
          <div className="grid gap-6 lg:grid-cols-12 items-stretch">
            {/* Part 1: Tiết khí trọng niên (Solar & Weather) - 4 cols */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-[#ebdcd0] pb-5 lg:pb-0">
              <div>
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#80141d]">
                  <span className="material-symbols-outlined text-[15px]">wb_sunny</span>
                  TIẾT KHÍ TRỌNG NIÊN
                </span>
                <h2 className="mt-1 font-serif text-3xl font-bold text-[#80141d]">
                  Thứ Bảy
                </h2>
                <span className="block font-serif text-[17px] font-bold text-[#2b1b15] mt-0.5">
                  17 Tháng 08 Năm 2024
                </span>
              </div>

              <div className="rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <strong className="text-[#2b1b15]">Thời Tiết &amp; Tiết Khí</strong>
                  <span className="rounded-full bg-[#faefe3] border border-[#dec9b6] px-2 py-0.5 font-bold text-[#80141d]">
                    Tiết Lập Thu
                  </span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-[#715b50]">
                  Khí trời mát dịu chớm thu, sương mai đọng lá ngô đồng. Ngày vượng khí gia quy, phụng sự từ đường chu toàn hiếu nghĩa.
                </p>
              </div>
            </div>

            {/* Part 2: Âm lịch phụng sự (Lunar details) - 5 cols */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 px-0 lg:px-4 border-b lg:border-b-0 lg:border-r border-[#ebdcd0] pb-5 lg:pb-0">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#80141d]">
                    <span className="h-2 w-2 rounded-full bg-[#80141d]" />
                    ÂM LỊCH PHỤNG SỰ
                  </span>
                  <span className="text-[11px] font-medium text-[#715b50]">
                    Mùa Vu Lan Thắng Hội
                  </span>
                </div>

                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-serif text-5xl font-bold text-[#2b1b15]">
                    14
                  </span>
                  <div>
                    <strong className="block font-serif text-2xl font-bold text-[#2b1b15]">
                      Tháng Bảy
                    </strong>
                    <span className="text-[11.5px] text-[#8a6f62]">
                      Tháng Vu Lan Báo Hiếu
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Can Chi Data Boxes */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-[#dec9b6] bg-[#f8ede2] p-2.5 text-center">
                  <span className="block text-[10px] text-[#715b50]">Can Chi Ngày</span>
                  <strong className="block text-[12.5px] font-bold text-[#2b1b15]">Kỷ Mùi</strong>
                </div>
                <div className="rounded-xl border border-[#dec9b6] bg-[#f8ede2] p-2.5 text-center">
                  <span className="block text-[10px] text-[#715b50]">Can Chi Tháng</span>
                  <strong className="block text-[12.5px] font-bold text-[#2b1b15]">Nhâm Thân</strong>
                </div>
                <div className="rounded-xl border border-[#dec9b6] bg-[#f8ede2] p-2.5 text-center">
                  <span className="block text-[10px] text-[#715b50]">Can Chi Năm</span>
                  <strong className="block text-[12.5px] font-bold text-[#2b1b15]">Giáp Thìn</strong>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#715b50] pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#80141d]">schedule</span>
                  <span>Khung giờ hành lễ tốt: Dần, Tỵ, Thân, Tuất</span>
                </span>
                <span className="font-bold text-[#1b6b3e]">Cát Nhật</span>
              </div>
            </div>

            {/* Part 3: Trọng Sự Dòng Tộc (Crimson Card) - 3 cols */}
            <div className="lg:col-span-3">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#80141d] p-5 text-white shadow-md">
                {/* Circular watermark seal */}
                <div className="pointer-events-none absolute -right-6 -bottom-6 h-36 w-36 rounded-full border-4 border-white/10" />
                <div className="pointer-events-none absolute -right-2 -bottom-2 h-24 w-24 rounded-full border border-white/10" />

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white">
                      TRỌNG SỰ DÒNG TỘC
                    </span>
                    <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-bold text-white">
                      Còn 1 Ngày
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold leading-snug">
                    Đại Tế Vu Lan Gia Tộc
                  </h3>

                  <p className="text-[12px] leading-relaxed text-white/85">
                    15 Tháng 7 Âm Lịch tại Từ Đường Trực Lăng. Họp mặt toàn chi phái.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('chi-tiet-gio-chap')}
                  className="mt-4 flex items-center justify-between rounded-xl bg-black/25 px-3.5 py-2.5 text-[12px] font-bold text-white hover:bg-black/35 transition-colors relative z-10"
                >
                  <span>Chấp sự: Trưởng Tộc</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            3. MAIN WORKSPACE (2 Columns: Left 8 cols, Right 4 cols)
            ========================================================= */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* LEFT COLUMN (8 cols): Event Detail Card + Memory Card */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card 1: Giỗ Chạp & Điển Lễ */}
            <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="rounded-md bg-[#80141d] px-2.5 py-0.5 font-bold uppercase tracking-wider text-white">
                    GIỖ CHẠP &amp; ĐIỂN LỄ
                  </span>
                  <span className="text-[#8a6f62]">
                    Kỷ niệm 112 năm thụ phong cụ Cố Nguyễn Văn Phúc
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#80141d]">
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                  <span>Chính nhật: Giờ Ngọ 15/7 Âm lịch (11:30 Ngày mai)</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2b1b15]">
                  Lễ Vu Lan &amp; Lễ Đại Tế Gia Tộc – Chi Trực Lăng
                </h2>

                <p className="text-[13px] leading-relaxed text-[#715b50]">
                  Tế cáo tổ tiên, tuyên đọc bản sắc phong triều Nguyễn, cầu siêu chư vị hương linh nội ngoại và sum họp con cháu đảnh lễ tiền nhân.
                </p>
              </div>

              {/* Progress & Checklist Box */}
              <div className="rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-5 space-y-4">
                <div className="grid gap-5 sm:grid-cols-12 items-center">
                  {/* Circular Gauge on Left (4 cols) */}
                  <div className="sm:col-span-4 flex flex-col items-center text-center">
                    <div className="relative flex h-28 w-28 items-center justify-center">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className="stroke-[#ebdcd0]"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className="stroke-[#80141d] transition-all duration-500"
                          strokeWidth="8"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * progressPercent) / 100}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <strong className="text-xl font-bold text-[#80141d]">
                          {progressPercent}%
                        </strong>
                        <span className="text-[10px] text-[#715b50]">Chuẩn Bị</span>
                      </div>
                    </div>
                    <span className="mt-1 text-[11px] font-semibold text-[#8a6f62]">
                      Đã đạt {completedCount}/{checklist.length} hạng mục
                    </span>
                  </div>

                  {/* Checklist on Right (8 cols) */}
                  <div className="sm:col-span-8 space-y-2">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[#80141d]">
                      TIẾN ĐỘ SẮM LỄ &amp; PHÂN VIỆC PHỤC VỤ
                    </span>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {checklist.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleCheck(item.id)}
                          className={`flex items-start gap-2 rounded-xl p-2 text-left text-[11.5px] transition-all ${
                            item.done
                              ? 'border border-[#dec9b6] bg-white text-[#2b1b15]'
                              : 'border border-[#dec9b6] bg-[#faefe3] text-[#80141d] font-medium'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[16px] shrink-0 mt-0.5 ${
                              item.done ? 'text-[#1b6b3e]' : 'text-[#80141d]'
                            }`}
                          >
                            {item.done ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span className={item.done ? 'line-through opacity-70' : ''}>
                            {item.text}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2 Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#dec9b6]">
                  <button
                    type="button"
                    onClick={() => onNavigate('chi-tiet-gio-chap')}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#80141d] px-5 py-2.5 text-[12.5px] font-bold text-white shadow-xs hover:bg-[#680f16] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">assignment</span>
                    <span>Xem Phân Công Việc Họ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('cam-nang-nghi-le')}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#dec9b6] bg-white px-5 py-2.5 text-[12.5px] font-bold text-[#80141d] hover:bg-[#faefe3] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    <span>Mở Văn Khấn Chuẩn</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Điển Tích & Ký Ức Ngày Này */}
            <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebdcd0] pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#80141d]">
                    photo_library
                  </span>
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#80141d]">
                    ĐIỂN TÍCH &amp; KÝ ỨC NGÀY NÀY
                  </span>
                  <span className="text-[11.5px] text-[#715b50]">
                    • 54 Năm Trước (14/7 Canh Tuất • 1970)
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3 py-0.5 text-[10.5px] font-bold text-[#80141d]">
                  <span className="material-symbols-outlined text-[13px]">auto_fix_high</span>
                  <span>Đã Phục Chế AI 4K</span>
                </span>
              </div>

              {/* Photo & Story Row */}
              <div className="grid gap-5 md:grid-cols-12 items-center">
                {/* Photo (5 cols) */}
                <div className="md:col-span-5 relative overflow-hidden rounded-2xl border border-[#dec9b6] shadow-sm">
                  <img
                    src="/images/hero_family.jpg"
                    alt="Lễ giỗ thượng thọ 1970"
                    className="h-56 w-full object-cover filter contrast-105"
                  />
                  <div className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-mono text-white backdrop-blur-xs">
                    Tư liệu Di vật #NV-1970
                  </div>
                </div>

                {/* Narrative & Audio (7 cols) */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#80141d]">
                    Lễ Giỗ Thượng Thọ Cụ Bà Lê Thị Mười — 14/7 Âm Lịch
                  </h3>

                  <p className="text-[12.5px] leading-relaxed text-[#715b50]">
                    Bức ảnh ghi lại khoảnh khắc toàn tộc vây quanh cụ bà tại hiên nhà cổ Nam Định trong dịp Tiết Vu Lan. Lời căn dặn của cụ về việc giữ đạo hòa thuận, kính trên nhường dưới đến nay vẫn là kim chỉ nam cho chi phái Trực Lăng.
                  </p>

                  {/* Audio Player Bar */}
                  <div className="flex items-center gap-3 rounded-xl border border-[#dec9b6] bg-[#f8ede2] p-2.5">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white shadow-xs hover:bg-[#680f16] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isPlayingAudio ? 'pause' : 'play_arrow'}
                      </span>
                    </button>

                    <div className="flex-1">
                      <span className="block text-[11px] font-bold text-[#2b1b15]">
                        Ghi âm lời cụ dặn dò con cháu gia phong
                      </span>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1 flex-1 rounded-full bg-[#dec9b6]">
                          <div
                            className={`h-full bg-[#80141d] rounded-full transition-all duration-300 ${
                              isPlayingAudio ? 'w-2/5' : 'w-0'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-[#715b50]">02:45</span>
                      </div>
                    </div>

                    <span className="material-symbols-outlined text-[18px] text-[#715b50]">
                      volume_up
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#715b50] pt-1">
                    <span>Người lưu trữ: Nguyễn Phúc Long (Chi 2)</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('kho-ky-uc')}
                      className="font-bold text-[#80141d] hover:underline"
                    >
                      Mở kho ảnh xưa →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (4 cols): Mini Calendar + Clan Activity Feed */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Lịch Gia Tộc (Calendar Widget) */}
            <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#ebdcd0] pb-3">
                <span className="flex items-center gap-1.5 font-bold text-[#2b1b15] text-[13px]">
                  <span className="material-symbols-outlined text-[17px] text-[#80141d]">
                    calendar_month
                  </span>
                  <span>Lịch Gia Tộc</span>
                </span>
                <span className="text-[11px] font-bold text-[#80141d]">
                  Tháng 7 Âm • Giáp Thìn
                </span>
              </div>

              {/* 7-Col Month Grid */}
              <div className="space-y-1.5">
                <div className="grid grid-cols-7 text-center text-[10.5px] font-bold text-[#8a6f62]">
                  <span>T2</span>
                  <span>T3</span>
                  <span>T4</span>
                  <span>T5</span>
                  <span>T6</span>
                  <span>T7</span>
                  <span>CN</span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11.5px]">
                  {/* Week 1 */}
                  <span className="py-1 text-[#b5a396]">29</span>
                  <span className="py-1 text-[#b5a396]">30</span>
                  <span className="py-1 text-[#b5a396]">31</span>
                  <span className="py-1 text-[#543e34]">1</span>
                  <span className="py-1 text-[#543e34]">2</span>
                  <span className="relative py-1 text-[#543e34] font-bold">
                    3
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#c9892c]" />
                  </span>
                  <span className="py-1 text-[#543e34]">4</span>

                  {/* Week 2 */}
                  <span className="py-1 text-[#543e34]">5</span>
                  <span className="py-1 text-[#543e34]">6</span>
                  <span className="py-1 text-[#543e34]">7</span>
                  <span className="relative py-1 text-[#543e34] font-bold">
                    8
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#2b1b15]" />
                  </span>
                  <span className="py-1 text-[#543e34]">9</span>
                  <span className="py-1 text-[#543e34]">10</span>
                  <span className="py-1 text-[#543e34]">11</span>

                  {/* Week 3 */}
                  <span className="py-1 text-[#543e34]">12</span>
                  <span className="py-1 text-[#543e34]">13</span>
                  {/* Day 14 (Hôm Nay) */}
                  <span className="relative py-1 font-bold text-[#80141d]">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#80141d] bg-[#faefe3]">
                      14
                    </span>
                  </span>
                  {/* Day 15 (Đại tế Vu Lan) */}
                  <span className="relative py-1 font-bold text-white">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#80141d] shadow-2xs">
                      15
                    </span>
                  </span>
                  <span className="py-1 text-[#543e34]">16</span>
                  <span className="py-1 text-[#543e34]">17</span>
                  <span className="py-1 text-[#543e34]">18</span>

                  {/* Week 4 */}
                  <span className="py-1 text-[#543e34]">19</span>
                  <span className="py-1 text-[#543e34]">20</span>
                  <span className="py-1 text-[#543e34]">21</span>
                  <span className="py-1 text-[#543e34]">22</span>
                  <span className="py-1 text-[#543e34]">23</span>
                  <span className="py-1 text-[#543e34]">24</span>
                  <span className="py-1 text-[#543e34]">25</span>

                  {/* Week 5 */}
                  <span className="py-1 text-[#543e34]">26</span>
                  <span className="py-1 text-[#543e34]">27</span>
                  <span className="py-1 text-[#543e34]">28</span>
                  <span className="py-1 text-[#543e34]">29</span>
                  <span className="py-1 text-[#543e34]">30</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 text-[10.5px] font-medium text-[#715b50] pt-2 border-t border-[#ebdcd0]">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#80141d]" />
                  <span>Ngày Giỗ</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#2b1b15]" />
                  <span>Họp Tộc</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#c9892c]" />
                  <span>Mừng Thọ</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('family-calendar')}
                className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 text-[12px] font-bold text-[#80141d] hover:bg-[#faefe3] transition-colors"
              >
                Mở Toàn Bộ Lịch Gia Tộc
              </button>
            </div>

            {/* Card 2: Hoạt Động Dòng Họ (Activity Feed) */}
            <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#ebdcd0] pb-3">
                <span className="flex items-center gap-1.5 font-bold text-[#2b1b15] text-[13px]">
                  <span className="material-symbols-outlined text-[17px] text-[#80141d]">
                    history
                  </span>
                  <span>Hoạt Động Dòng Họ</span>
                </span>
                <span className="h-2 w-2 rounded-full bg-[#80141d] animate-pulse" />
              </div>

              <div className="space-y-3.5">
                {/* Item 1 */}
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#80141d]/10 text-[#80141d] mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">folder</span>
                  </span>
                  <div>
                    <p className="text-[12px] leading-snug text-[#2b1b15]">
                      <strong>Bác Cả Nguyễn Phục Long</strong> vừa đóng góp 3 tư liệu ảnh xưa cho Chi phái 2.
                    </p>
                    <span className="text-[10px] text-[#8a6f62]">
                      15 phút trước • Kho Tư Liệu
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#c9892c]/20 text-[#8a5714] mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  </span>
                  <div>
                    <p className="text-[12px] leading-snug text-[#2b1b15]">
                      <strong>Chị Nguyễn Mai Anh</strong> xác nhận tham dự Lễ Giỗ và đăng ký dâng mâm quả ngũ sắc.
                    </p>
                    <span className="text-[10px] text-[#8a6f62]">
                      1 giờ trước • Chấp Sự &amp; Lễ Phẩm
                    </span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#80141d]/10 text-[#80141d] mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">shield</span>
                  </span>
                  <div>
                    <p className="text-[12px] leading-snug text-[#2b1b15]">
                      <strong>Trưởng tộc Nguyễn Trực Viễn</strong> vừa phê duyệt bản hiệu đính nhánh đời thứ 5.
                    </p>
                    <span className="text-[10px] text-[#8a6f62]">
                      3 giờ trước • Phả Ký Gia Phả
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('lich-su-phuc-che')}
                className="w-full pt-1 text-center text-[11.5px] font-bold text-[#80141d] hover:underline"
              >
                Xem nhật ký đại gia tộc →
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            4. BOTTOM SECURITY FOOTER
            ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] px-5 py-3 text-[11.5px] text-[#715b50]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#80141d]">shield</span>
            <span>Không gian lưu trữ phả hệ khép kín &amp; bảo mật đời đời cho đại gia đình</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Thích Cúng Kiếng • Kính ngưỡng tổ tiên</span>
            <span>•</span>
            <span>Giữ ký ức — Nối cội nguồn</span>
          </div>
        </div>
      </div>
    </div>
  );
};