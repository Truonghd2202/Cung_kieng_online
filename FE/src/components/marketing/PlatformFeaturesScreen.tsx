import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';
import { MarketingShell } from './MarketingShell.tsx';

interface Props {
  onNavigate: (screen: ScreenType) => void;
  onLogout?: () => void;
}

export const PlatformFeaturesScreen: React.FC<Props> = ({ onNavigate, onLogout }) => {
  // Slider position for Section 2 (AI Restoration Before/After)
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Active incense tribute states for Section 9 (Không gian tưởng niệm)
  const [incenseCount, setIncenseCount] = useState<number>(108);
  const [hasOfferedIncense, setHasOfferedIncense] = useState<boolean>(false);
  const [hasOfferedLotus, setHasOfferedLotus] = useState<boolean>(false);

  // Selected branch in Section 3 (Cây gia phả)
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'chi-truong' | 'chi-thu'>('all');

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((offsetX / rect.width) * 100);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <MarketingShell currentScreen="platform-features" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="bg-[#f7eee2] text-[#2b1b15] selection:bg-[#ecd4c0] selection:text-[#4a1217]">
        {/* =========================================================
            SECTION 1: HERO / PAGE TITLE & 9 FEATURE QUICK-NAV PILLS
            ========================================================= */}
        <section className="relative overflow-hidden bg-[#f7eee2] px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
          {/* Decorative concentric background rings */}
          <div className="pointer-events-none absolute -left-24 top-0 h-[500px] w-[500px] rounded-full border border-[#e4d3c2] opacity-60" />
          <div className="pointer-events-none absolute -left-10 top-12 h-[380px] w-[380px] rounded-full border border-[#decab7] opacity-50" />

          <div className="mx-auto max-w-[1240px]">
            {/* Top Meta Bar: Breadcrumbs & Heritage Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-[12px]">
              <div className="flex items-center gap-1.5 text-[#7a6256]">
                <button
                  type="button"
                  onClick={() => onNavigate('guest-landing')}
                  className="font-medium hover:text-[#80141d] hover:underline"
                >
                  Trang chủ
                </button>
                <span>/</span>
                <span className="font-semibold text-[#80141d]">Tính năng nền tảng</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f2e7db] px-3 py-1 text-[11px] font-bold text-[#80141d] shadow-2xs">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                <span>Hệ sinh thái số hóa di sản gia tộc toàn diện tại Việt Nam</span>
              </div>
            </div>

            {/* Main Page Headline */}
            <div className="mt-6 max-w-4xl">
              <h1 className="font-serif text-3xl font-bold leading-[1.2] text-[#2b1b15] sm:text-4xl lg:text-[46px]">
                Tính Năng Nền Tảng — Giải Pháp Toàn Diện Cho Ký Ức Gia Tộc
              </h1>
              <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Kế thừa tri thức tâm linh cùng công nghệ số tiên tiến tại Việt Nam. Không chỉ là cây gia phả, Thích Cúng Kiếng mang đến 9 phân hệ phụng sự trọn vẹn mọi nhu cầu lưu giữ gia phong, gắn kết huyết thống và tri ân tiền nhân.
              </p>
            </div>

            {/* Horizontal 9 Quick-Nav Pill Bar */}
            <div className="mt-7 -my-2.5 flex gap-2.5 overflow-x-auto py-3 px-1 scrollbar-none sm:flex-wrap sm:overflow-visible">
              {[
                { id: 'sec-ai', icon: 'auto_fix_high', label: 'Phục chế AI' },
                { id: 'sec-tree', icon: 'account_tree', label: 'Cây gia phả' },
                { id: 'sec-archive', icon: 'photo_library', label: 'Kho ký ức' },
                { id: 'sec-museum', icon: 'museum', label: 'Bảo tàng kỷ vật' },
                { id: 'sec-calendar', icon: 'calendar_month', label: 'Lịch giỗ & lễ nghi' },
                { id: 'sec-handbook', icon: 'menu_book', label: 'Cẩm nang lễ' },
                { id: 'sec-origin', icon: 'local_library', label: 'Không gian cội nguồn' },
                { id: 'sec-memorial', icon: 'temple_buddhist', label: 'Không gian tưởng niệm' },
                { id: 'sec-privacy', icon: 'shield_person', label: 'Phân quyền' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="group flex shrink-0 items-center gap-1.5 rounded-full border border-[#dbcaa8] bg-[#fbf5ee] px-3.5 py-1.5 text-[12px] font-semibold text-[#543e34] shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-[#80141d] hover:bg-[#faefe2] hover:text-[#80141d] hover:shadow-sm active:translate-y-0 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px] text-[#80141d] transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: 01. PHỤC CHẾ ẢNH AI CHUYÊN BIỆT DI SẢN VIỆT NAM
            ========================================================= */}
        <section id="sec-ai" className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left Content Column */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                PHÂN HỆ 01 • CÔNG NGHỆ PHỤC CHẾ AI DI SẢN
              </p>
              <h2 className="mt-2.5 font-serif text-3xl font-bold leading-tight text-[#2b1b15] sm:text-4xl">
                Phục Chế Ảnh AI Chuyên Biệt Di Sản Việt Nam
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Khôi phục hoàn hảo sắc phục gấm vóc, hoa văn áo dài cổ truyền, phục chế chi tiết khuôn mặt bị mờ ố, rách nát hay mốc ẩm theo năm tháng. AI chuyên biệt tôn trọng tối đa nhân tướng học truyền thống, không làm biến đổi diện mạo tổ tiên, gìn giữ nét trang nghiêm chuẩn mực của di ảnh gia tộc thờ phụng.
              </p>

              {/* 2 Feature Badges */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] p-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#80141d]">
                    <span className="material-symbols-outlined text-[18px]">healing</span>
                    <strong className="text-[13px] font-bold text-[#2b1b15]">Tách lớp & Khử xước</strong>
                  </div>
                  <p className="mt-1 text-[12px] text-[#715b50]">
                    Khôi phục nếp gãy, rách mép, khử nhiễu hạt phim và vết ố vàng ẩm mốc.
                  </p>
                </div>
                <div className="rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] p-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#80141d]">
                    <span className="material-symbols-outlined text-[18px]">palette</span>
                    <strong className="text-[13px] font-bold text-[#2b1b15]">Màu sắc Cổ Truyền</strong>
                  </div>
                  <p className="mt-1 text-[12px] text-[#715b50]">
                    Đúng chất liệu vải gấm, lụa tơ tằm, sa tanh và huy hiệu thời xưa.
                  </p>
                </div>
              </div>

              {/* Spec Banner */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d9c4af] bg-[#ede0d1] p-3.5 text-[12px]">
                <div className="flex items-center gap-2 text-[#4a362d]">
                  <span className="material-symbols-outlined text-[18px] text-[#80141d]">verified</span>
                  <span>
                    Tỉ lệ khớp giải phẫu: <strong className="text-[#80141d]">99.4%</strong> • Độ phân giải: <strong className="text-[#2b1b15]">AI 4K Ultra-HD (In ảnh thờ cỡ lớn)</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('phuc-che-ai')}
                  className="rounded-lg bg-[#80141d] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-2xs transition-all hover:bg-[#680f16] active:scale-95"
                >
                  Thử phục chế ngay →
                </button>
              </div>
            </div>

            {/* Right Interactive Image Slider Card */}
            <div className="overflow-hidden rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-4 shadow-md">
              <div className="mb-3 flex items-center justify-between border-b border-[#ebdcce] pb-2 text-[12px]">
                <span className="font-serif font-bold text-[#2b1b15]">
                  Mô phỏng phục chế di ảnh gia tộc trực quan
                </span>
                <span className="text-[11px] font-medium text-[#7a6256]">Kéo thanh trượt để so sánh</span>
              </div>

              <div
                className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-xl bg-[#2b1b15] shadow-inner"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
              >
                {/* Underneath: Full Color Restored */}
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Ảnh phục chế AI màu sắc cổ phong"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
                />

                {/* Overlaid: Black & White Original */}
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Ảnh tư liệu gốc"
                    className="pointer-events-none absolute inset-y-0 left-0 h-full max-w-none object-cover object-top"
                    style={{
                      width: '100%',
                      minWidth: '100%',
                      filter: 'grayscale(100%) sepia(30%) contrast(1.1) brightness(0.95)',
                    }}
                  />
                </div>

                {/* Divider Line */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white shadow-md"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#c9892c] text-white shadow-lg ring-2 ring-white">
                    <span className="text-[10px] font-bold">{Math.round(sliderPosition)}%</span>
                  </div>
                </div>

                {/* Badges */}
                <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-[#2b1b15]/85 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                  ẢNH GỐC NĂM 1954
                </span>
                <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-md bg-[#80141d]/90 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                  ĐÃ PHỤC CHẾ 4K
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between pt-1">
                <span className="text-[11.5px] italic text-[#715b50]">
                  Chân dung Cụ Cố Nguyễn Khắc Cẩn (1884 – 1952) sau khi phục chế AI
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('phuc-che-ai')}
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-[#80141d] hover:underline"
                >
                  <span>Vào Studio Phục Chế AI</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: 02. CÂY GIA PHẢ TƯƠNG TÁC: CHI, CÀNH, NHÁNH RÕ RÀNG
            ========================================================= */}
        <section id="sec-tree" className="bg-[#f7eee2] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            {/* Header with actions */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                  PHÂN HỆ 02 • CÂY PHẢ HỆ 2.5D TRỰC QUAN
                </p>
                <h2 className="mt-2.5 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                  Cây Gia Phả Tương Tác: Chi, Cành, Nhánh Rõ Ràng
                </h2>
                <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                  Trực quan hóa toàn bộ phả hệ đa tầng, đa nhánh từ Thủy tổ đến hậu duệ hiện đại. Phân định rõ ràng Chi Trưởng, Chi Thứ, Ngành, Phái cùng hệ thống xưng hô chuẩn lễ nghi thuần Việt.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="group inline-flex items-center gap-1.5 rounded-xl border border-[#ceb8a5] bg-[#fbf6ef] px-4 py-2 text-[12px] font-semibold text-[#543e34] shadow-2xs transition-all hover:bg-[#ede0d1] hover:text-[#80141d] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                  <span>Toàn cảnh 2.5D</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#88131d] to-[#6d0d15] px-4.5 py-2 text-[12px] font-bold text-white shadow-sm ring-1 ring-[#9c1b25] transition-all hover:-translate-y-0.5 hover:shadow active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">account_tree</span>
                  <span>Mở xem phả hệ mẫu</span>
                </button>
              </div>
            </div>

            {/* Interactive Tree Box */}
            <div className="mt-8 rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm sm:p-8">
              {/* Level 1: Thủy Tổ */}
              <div className="mx-auto max-w-sm rounded-xl bg-gradient-to-br from-[#88131d] to-[#6d0d15] p-4 text-center text-white shadow-md ring-1 ring-[#9c1b25]">
                <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  ĐỜI I • THỦY TỔ (HƯƠNG HỎA)
                </span>
                <strong className="mt-1.5 block font-serif text-[18px]">Cụ Nguyễn Khắc Cẩn (1640 – 1715)</strong>
                <p className="mt-1 text-[11px] opacity-85">Chánh thất: Cụ Bà Nguyễn Thị Mai (1645 – 1720)</p>
                <div className="mt-2.5 border-t border-white/20 pt-2 text-[11px]">
                  <span>Hậu duệ: 2 chi • 14 đời • 248 nhân đinh</span>
                </div>
              </div>

              {/* Stem line */}
              <div className="mx-auto h-6 w-0.5 bg-[#cca68d]" />

              {/* Level 2: Chi Trưởng & Chi Thứ */}
              <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
                <div
                  onClick={() => setSelectedBranch(selectedBranch === 'chi-truong' ? 'all' : 'chi-truong')}
                  className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    selectedBranch === 'chi-truong'
                      ? 'border-[#80141d] bg-[#faefe3] ring-2 ring-[#80141d]'
                      : 'border-[#e4d2bf] bg-[#f5e9dc] hover:border-[#d9c4b0]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    ĐỜI II • CHI TRƯỞNG (NAM ĐỊNH)
                  </span>
                  <strong className="mt-1 block font-serif text-[15px] text-[#2b1b15]">
                    Nguyễn Khắc Quang (1675 – 1740)
                  </strong>
                  <p className="mt-1 text-[11px] text-[#715b50]">Chánh phối: Cụ Bà Trần Thị Nhàn</p>
                  <p className="mt-1.5 text-[11px] font-semibold text-[#80141d]">Hậu duệ: 5 ngành • 112 nhân đinh</p>
                </div>

                <div
                  onClick={() => setSelectedBranch(selectedBranch === 'chi-thu' ? 'all' : 'chi-thu')}
                  className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    selectedBranch === 'chi-thu'
                      ? 'border-[#80141d] bg-[#faefe3] ring-2 ring-[#80141d]'
                      : 'border-[#e4d2bf] bg-[#f5e9dc] hover:border-[#d9c4b0]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    ĐỜI II • CHI THỨ (THỪA THIÊN HUẾ)
                  </span>
                  <strong className="mt-1 block font-serif text-[15px] text-[#2b1b15]">
                    Nguyễn Khắc Vĩnh (1680 – 1752)
                  </strong>
                  <p className="mt-1 text-[11px] text-[#715b50]">Chánh phối: Cụ Bà Lê Thị Thảo</p>
                  <p className="mt-1.5 text-[11px] font-semibold text-[#80141d]">Hậu duệ: 4 ngành • 136 nhân đinh</p>
                </div>
              </div>

              {/* Bottom Tip Bar */}
              <div className="mt-6 flex items-center justify-between border-t border-[#ebdcce] pt-4 text-[12px] text-[#715b50]">
                <span>💡 Mẹo: Bấm vào từng chi để xem thống kê nhân đinh; nhấp nút &ldquo;Mở xem phả hệ mẫu&rdquo; để tương tác cây phả hệ đầy đủ.</span>
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="font-bold text-[#80141d] hover:underline"
                >
                  Xem toàn bộ 14 thế hệ →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: 03. KHO LƯU TRỮ KÝ ỨC & GIỌNG NÓI VƯỢT KHÔNG THỜI GIAN
            ========================================================= */}
        <section id="sec-archive" className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1fr_1fr]">
            {/* Left: 2 Photo Cards */}
            <div className="space-y-4">
              {/* Photo 1: Family Assembly with Audio Wave */}
              <div className="overflow-hidden rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-4 shadow-sm">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#ebd8cc]">
                  <img
                    src="/images/hero_family.jpg"
                    alt="Họp mặt tế xuân Quý Mão"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#2b1b15]/85 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                    GHI ÂM GIA TỘC (AUDIO)
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-[#ebdcce] pt-3 text-[12px]">
                  <div>
                    <strong className="block font-serif text-[14px] text-[#2b1b15]">
                      Họp mặt tế xuân Quý Mão 2023
                    </strong>
                    <span className="text-[11px] text-[#715b50]">Lời dặn dò của Cụ Trưởng Chi • 12 phút 15 giây</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#d9c4af] bg-[#ede0d1] px-3 py-1 text-[11px] font-bold text-[#80141d]">
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>03:42 / 12:15</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Elder Calligraphy / Quote */}
              <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ede0d1] text-[#80141d]">
                    <span className="material-symbols-outlined text-[20px]">format_quote</span>
                  </span>
                  <div>
                    <p className="font-serif text-[13.5px] italic leading-relaxed text-[#3c2921]">
                      &ldquo;Lời dặn dò của Cụ Ông truyền cho con cháu: Giữ trọn chữ Tín, hiếu đạo làm đầu, tương trợ đồng tộc lúc gian nan, khuyến học khuyến tài để rạng danh tổ tông.&rdquo;
                    </p>
                    <span className="mt-2 block text-[11px] font-bold uppercase tracking-wider text-[#80141d]">
                      — Trích Điển Tích Chi Giáp (1968)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Feature Descriptions */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                PHÂN HỆ 03 • KHO KÝ ỨC GIA TỘC
              </p>
              <h2 className="mt-2.5 font-serif text-3xl font-bold leading-tight text-[#2b1b15] sm:text-4xl">
                Kho Lưu Trữ Ký Ức & Giọng Nói Vượt Không Thời Gian
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Không gian số an toàn để mỗi gia đình gìn giữ những câu chuyện truyền khẩu, những đoạn băng ghi âm lời chúc Tết của ông bà, video họp mặt gia tộc ngày giỗ, di cảo chép tay và những bức thư thời kháng chiến.
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] p-4 shadow-2xs">
                  <strong className="block text-[13px] font-bold text-[#2b1b15]">
                    1. Gặp gỡ qua âm thanh ký ức
                  </strong>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#715b50]">
                    Lưu giữ file ghi âm MP3, WAV chất lượng cao; khử tạp âm bằng AI để nghe rõ từng tiếng dặn dò của người xưa.
                  </p>
                </div>

                <div className="rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] p-4 shadow-2xs">
                  <strong className="block text-[13px] font-bold text-[#2b1b15]">
                    2. Tra cứu theo dòng sự kiện & thế hệ
                  </strong>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#715b50]">
                    Tự động gắn tag thành viên trong cây phả hệ vào từng kỷ niệm, album ảnh và tư liệu gia đình.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('kho-ky-uc')}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#88131d] to-[#6d0d15] px-6 py-2.5 text-[13px] font-bold text-white shadow-sm ring-1 ring-[#9c1b25] transition-all hover:-translate-y-0.5 hover:shadow active:scale-95"
              >
                <span>Khám phá kho ký ức gia tộc</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: 04. BẢO TÀNG KỶ VẬT SỐ ĐA CHIỀU
            ========================================================= */}
        <section id="sec-museum" className="bg-[#f7eee2] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                  PHÂN HỆ 04 • BẢO TÀNG GIA BẢO SỐ
                </p>
                <h2 className="mt-2.5 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                  Bảo Tàng Kỷ Vật Số Đa Chiều
                </h2>
                <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                  Mỗi kỷ vật của gia đình là một mảnh ghép lịch sử sống động: tráp trầu, ấm trà, sắc phong vua ban, huy chương kháng chiến hay chiếc đồng hồ quả quýt. Thích Cúng Kiếng số hóa 3D 360 độ giúp con cháu muôn nơi chiêm bái như đang hiện diện trước mắt.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('bao-tang-gia-bao')}
                className="inline-flex items-center gap-1.5 self-start rounded-xl border border-[#ceb8a5] bg-[#fbf6ef] px-4.5 py-2 text-[12.5px] font-bold text-[#80141d] shadow-2xs transition-all hover:bg-[#ede0d1] active:scale-95 md:self-end"
              >
                <span>Toàn bộ bảo tàng gia bảo</span>
                <span>→</span>
              </button>
            </div>

            {/* 3 Relic Cards */}
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <article className="group overflow-hidden rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8d5cb]">
                  <img
                    src="/images/relic_box.jpg"
                    alt="Tráp Gỗ Khảm Ốc Xà Cừ"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#2b1b15]/85 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                    MÔ HÌNH 3D 360°
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-[17px] font-bold text-[#2b1b15] group-hover:text-[#80141d]">
                    Tráp Gỗ Khảm Ốc Xà Cừ (1912)
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                    Kỷ vật hồi môn của Cụ Cố Bà, khảm tích &ldquo;Nhị thập tứ hiếu&rdquo; bằng xà cừ ngũ sắc. Số hóa xoay 360 độ.
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#ebdcce] pt-3 text-[12px]">
                    <span className="text-[#856b5f]">Nhà thờ chi thứ • An Cựu</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('chi-tiet-gia-bao')}
                      className="font-bold text-[#80141d] hover:underline"
                    >
                      Xem 3D 360° →
                    </button>
                  </div>
                </div>
              </article>

              {/* Card 2 */}
              <article className="group overflow-hidden rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8d5cb]">
                  <img
                    src="/images/relic_book.jpg"
                    alt="Sắc Phong Niên Hiệu Tự Đức"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#2b1b15]/85 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                    BẢN QUÉT AI 8K (CHỮ HÁN)
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-[17px] font-bold text-[#2b1b15] group-hover:text-[#80141d]">
                    Sắc Phong Niên Hiệu Tự Đức (1865)
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                    Sắc phong ban cho Cụ Cố chức Hàn Lâm Viện Đãi Chiếu. AI hỗ trợ nhận diện chữ Hán Nôm và dịch thuật tự động.
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#ebdcce] pt-3 text-[12px]">
                    <span className="text-[#856b5f]">Gia phả lưu giữ • Bản gốc</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('phan-tich-but-tich')}
                      className="font-bold text-[#80141d] hover:underline"
                    >
                      Dịch nghĩa AI →
                    </button>
                  </div>
                </div>
              </article>

              {/* Card 3 */}
              <article className="group overflow-hidden rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8d5cb]">
                  <img
                    src="/images/relic_medals.jpg"
                    alt="Huy Chương Kháng Chiến"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#2b1b15]/85 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                    KỶ VẬT KHÁNG CHIẾN
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-[17px] font-bold text-[#2b1b15] group-hover:text-[#80141d]">
                    Huy Chương Kháng Chiến Cụ Ông (1968)
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                    Kỷ vật chiến trường kèm lá thư tay gửi về hậu phương trước chiến dịch Mậu Thân. Có bản đọc audio đi kèm.
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#ebdcce] pt-3 text-[12px]">
                    <span className="text-[#856b5f]">Tư liệu gia đình • Đã số hóa</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('chi-tiet-di-vat')}
                      className="font-bold text-[#80141d] hover:underline"
                    >
                      Xem chi tiết →
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: 05. LỊCH GIỖ TỘC & HỆ THỐNG NHẮC LỄ ÂM LỊCH TỰ ĐỘNG
            ========================================================= */}
        <section id="sec-calendar" className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                PHÂN HỆ 05 • LỊCH ÂM DƯƠNG & GIỖ CHẠP
              </p>
              <h2 className="mt-2.5 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                Lịch Giỗ Tộc & Hệ Thống Nhắc Lễ Âm Lịch Tự Động
              </h2>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Tự động tính toán chuyển đổi âm dương chuẩn xác cho từng năm nhuận. Thông báo sớm trước 30 ngày, 7 ngày và 1 ngày qua Email, Zalo và SMS giúp trưởng chi và con cháu chủ động sắp xếp thời gian phụng sự.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Left: Today & Prep Guidelines */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm">
                  <span className="rounded-full border border-[#d9c4af] bg-[#ede0d1] px-3 py-1 text-[11px] font-bold text-[#80141d]">
                    HÔM NAY • 14 THÁNG 7 NĂM 2024
                  </span>
                  <strong className="mt-3 block font-serif text-2xl text-[#2b1b15]">
                    09 Tháng Sáu Giáp Thìn
                  </strong>
                  <p className="mt-1 text-[12px] text-[#715b50]">
                    Sắp tới: Giỗ Cụ Cố Bà Nguyễn Thị Lan (20/06 Âm lịch • 11 ngày nữa)
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-[#80141d]">
                    <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
                    <strong className="font-serif text-[15px] text-[#2b1b15]">
                      Gợi ý thực đơn mâm cỗ cúng gia tiên chuẩn lễ
                    </strong>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                    Mâm cỗ truyền thống miền Bắc 4 bát 6 đĩa: Xôi gấc hạt sen, gà trống thiến luộc cánh tiên, nem công chả phượng, giò hoa, canh măng mực Bát Tràng...
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('cam-nang-nghi-le')}
                    className="mt-4 text-[12px] font-bold text-[#80141d] hover:underline"
                  >
                    Xem chi tiết hướng dẫn sắm mâm cỗ →
                  </button>
                </div>
              </div>

              {/* Right: Upcoming Clan Events Calendar Box */}
              <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#ebdcce] pb-3">
                  <strong className="font-serif text-[16px] text-[#2b1b15]">
                    Tháng 11 / 2024 (Lịch Giỗ Dòng Họ Nguyễn Khắc)
                  </strong>
                  <div className="flex items-center gap-1 text-[11px] text-[#80141d]">
                    <button type="button" className="rounded p-1 hover:bg-[#ede0d1]">‹</button>
                    <button type="button" className="rounded p-1 hover:bg-[#ede0d1]">›</button>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-[#e4d2bf] bg-[#f5e9dc] p-4">
                    <div>
                      <span className="rounded bg-[#80141d] px-2 py-0.5 text-[9px] font-bold text-white">
                        ĐẠI LỄ DÒNG HỌ
                      </span>
                      <strong className="mt-1 block font-serif text-[14px] text-[#2b1b15]">
                        Đại Lễ Tế Thu Dòng Họ Nguyễn Khắc (Từ Đường)
                      </strong>
                      <span className="text-[12px] text-[#715b50]">Dương lịch: 15/11/2024 • Âm lịch: 15/10 Giáp Thìn</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('chi-tiet-gio-chap')}
                      className="rounded-lg bg-[#80141d] px-3 py-1.5 text-[11px] font-bold text-white shadow-2xs hover:bg-[#680f16]"
                    >
                      Chi tiết lễ
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-[#e4d2bf] bg-[#faf3ec] p-4">
                    <div>
                      <span className="rounded bg-[#c9892c] px-2 py-0.5 text-[9px] font-bold text-white">
                        GIỖ CHI HỌ
                      </span>
                      <strong className="mt-1 block font-serif text-[14px] text-[#2b1b15]">
                        Giỗ Cụ Khắc Cung (Đời thứ 2 - Chi Trưởng)
                      </strong>
                      <span className="text-[12px] text-[#715b50]">Dương lịch: 28/11/2024 • Âm lịch: 28/10 Giáp Thìn</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('chi-tiet-gio-chap')}
                      className="rounded-lg border border-[#ceb8a5] bg-[#fbf6ef] px-3 py-1.5 text-[11px] font-bold text-[#80141d] hover:bg-[#ede0d1]"
                    >
                      Chi tiết lễ
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#ebdcce] pt-3 text-[12px]">
                  <span className="text-[#856b5f]">Đồng bộ Google Calendar & Apple Calendar</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('family-calendar')}
                    className="font-bold text-[#80141d] hover:underline"
                  >
                    Xem lịch gia đình đầy đủ →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: 06. CẨM NANG NGHI LỄ & VĂN KHẤN BA MIỀN
            ========================================================= */}
        <section id="sec-handbook" className="bg-[#f7eee2] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                PHÂN HỆ 06 • VĂN HÓA TRUYỀN THỐNG
              </p>
              <h2 className="mt-2.5 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                Cẩm Nang Nghi Lễ & Văn Khấn Ba Miền
              </h2>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Tuyển tập hơn 100+ bài văn khấn cổ truyền thuần Việt đã được khảo cứu kỹ lưỡng bởi các chuyên gia văn hóa dân gian. Hướng dẫn chi tiết sắm lễ, bài trí bàn thờ và cách thức hành lễ trang nghiêm đúng phép tắc cổ truyền.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#80141d] text-white">
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                </span>
                <h3 className="mt-4 font-serif text-[17px] font-bold text-[#2b1b15]">
                  Văn Khấn Gia Tiên Ngày Giỗ
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                  Bài văn khấn chuẩn mực tấu trình công đức tổ tiên, cầu phúc lộc cho con cháu trong ngày giỗ chính kỵ.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('cam-nang-nghi-le')}
                  className="mt-5 w-full rounded-xl border border-[#ceb8a5] bg-[#f5e9dc] py-2 text-[12px] font-bold text-[#80141d] hover:bg-[#ede0d1]"
                >
                  Xem bài văn khấn
                </button>
              </div>

              <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#80141d] text-white">
                  <span className="material-symbols-outlined text-[20px]">temple_buddhist</span>
                </span>
                <h3 className="mt-4 font-serif text-[17px] font-bold text-[#2b1b15]">
                  Nghi Thức Lễ Tế Xuân & Thu Dòng Họ
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                  Quy chuẩn chuẩn bị lễ vật, văn tế chữ Hán dịch nghĩa, bài trí tế đàn tại nhà thờ tổ trang trọng.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('cam-nang-nghi-le')}
                  className="mt-5 w-full rounded-xl border border-[#ceb8a5] bg-[#f5e9dc] py-2 text-[12px] font-bold text-[#80141d] hover:bg-[#ede0d1]"
                >
                  Xem quy trình hành lễ
                </button>
              </div>

              <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#80141d] text-white">
                  <span className="material-symbols-outlined text-[20px]">celebration</span>
                </span>
                <h3 className="mt-4 font-serif text-[17px] font-bold text-[#2b1b15]">
                  Văn Khấn Giao Thừa & Tết Cổ Truyền
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                  Nghi thức rước ông bà tổ tiên về sum vầy cùng cháu con trong 3 ngày Tết thiêng liêng đầm ấm.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('cam-nang-nghi-le')}
                  className="mt-5 w-full rounded-xl border border-[#ceb8a5] bg-[#f5e9dc] py-2 text-[12px] font-bold text-[#80141d] hover:bg-[#ede0d1]"
                >
                  Xem văn khấn Tết
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 8: 07. CỘI NGUỒN GẮN KẾT: MẠNG LỊCH SỬ DÒNG TỘC CHO NGƯỜI TRẺ
            ========================================================= */}
        <section id="sec-origin" className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                PHÂN HỆ 07 • KẾT NỐI THẾ HỆ TRẺ
              </p>
              <h2 className="mt-2.5 font-serif text-3xl font-bold leading-tight text-[#2b1b15] sm:text-4xl">
                Cội Nguồn Gắn Kết: Mạng Lịch Sử Dòng Tộc Cho Người Trẻ
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Giao diện hiện đại, trực quan, gần gũi với thế hệ Z và thế hệ số. Biến những trang phả hệ cổ xưa thành hành trình khám phá cội nguồn tự hào qua huy hiệu cống hiến, bảng vinh danh và câu chuyện danh nhân dòng họ.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] p-4 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px] text-[#80141d]">public</span>
                  <strong className="mt-1 block text-[13px] font-bold text-[#2b1b15]">
                    Bản Đồ Phân Bố Dòng Tộc
                  </strong>
                  <p className="mt-1 text-[11.5px] text-[#715b50]">
                    Xem bản đồ con cháu định cư trên toàn cầu (Việt Nam, Mỹ, Pháp, Úc...).
                  </p>
                </div>

                <div className="rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] p-4 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px] text-[#80141d]">school</span>
                  <strong className="mt-1 block text-[13px] font-bold text-[#2b1b15]">
                    Quỹ Khuyến Học Dòng Tộc
                  </strong>
                  <p className="mt-1 text-[11.5px] text-[#715b50]">
                    Vinh danh con cháu đỗ đạt, đạt thành tích xuất sắc trong học tập.
                  </p>
                </div>
              </div>
            </div>

            {/* Honor roll box */}
            <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#ebdcce] pb-3">
                <strong className="font-serif text-[16px] text-[#2b1b15]">
                  Bảng Vinh Danh Khuyến Học Dòng Tộc
                </strong>
                <span className="rounded-full bg-[#ede0d1] px-2.5 py-0.5 text-[10px] font-bold text-[#80141d]">
                  NĂM HỌC 2023 – 2024
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-[#e4d2bf] bg-[#f5e9dc] p-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white">
                    <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                  </span>
                  <div>
                    <strong className="block text-[13px] font-bold text-[#2b1b15]">
                      Nguyễn Khắc Lâm (Đời thứ 14 • Chi Trưởng)
                    </strong>
                    <p className="text-[12px] text-[#715b50]">
                      Thủ khoa Đại học Bách Khoa Hà Nội • Nhận Học bổng Tiền Nhân
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-[#e4d2bf] bg-[#faf3ec] p-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9892c] text-white">
                    <span className="material-symbols-outlined text-[20px]">military_tech</span>
                  </span>
                  <div>
                    <strong className="block text-[13px] font-bold text-[#2b1b15]">
                      Nguyễn Thị Minh Trang (Đời thứ 14 • Chi Thứ)
                    </strong>
                    <p className="text-[12px] text-[#715b50]">
                      Học bổng Tiến sĩ Toàn phần Đại học Tokyo (Nhật Bản)
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="mt-4 w-full rounded-xl border border-[#ceb8a5] bg-[#f5e9dc] py-2.5 text-[12px] font-bold text-[#80141d] hover:bg-[#ede0d1]"
              >
                Đóng góp vào quỹ khuyến học dòng họ →
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 9: 08. KHÔNG GIAN TƯỞNG NIỆM TÔN NGHIÊM & THANH TỊNH
            ========================================================= */}
        <section id="sec-memorial" className="bg-[#f7eee2] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
              PHÂN HỆ 08 • KHÔNG GIAN TÂM LINH SỐ
            </p>
            <h2 className="mt-2.5 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
              Không Gian Tưởng Niệm Tôn Nghiêm & Thanh Tịnh
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
              Dành cho những người con xa xứ không thể về quê hương thắp nén tâm hương trong ngày kỵ giỗ. Không gian tưởng niệm số hóa trang trọng, âm nhạc thiền tịnh, dâng hoa tươi và thắp nến tri ân người đã khuất.
            </p>

            {/* Memorial Interactive Altar Box */}
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-8 shadow-sm">
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#80141d] shadow-md ring-4 ring-[#ede0d1]">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Hương linh tiền nhân"
                  className="h-full w-full object-cover"
                />
              </div>
              <strong className="mt-4 block font-serif text-[18px] text-[#2b1b15]">
                Hương linh Cụ Bà Nguyễn Thị Mai (1920 – 2004)
              </strong>
              <p className="mt-1 text-[12px] text-[#715b50]">
                Hưởng thọ 85 tuổi • Mẹ Việt Nam Anh Hùng • Chi Trực Lăng
              </p>

              {/* Tribute Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIncenseCount((prev) => prev + 1);
                    setHasOfferedIncense(true);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold transition-all ${
                    hasOfferedIncense
                      ? 'bg-[#80141d] text-white shadow-xs'
                      : 'border border-[#ceb8a5] bg-[#f5e9dc] text-[#80141d] hover:bg-[#ede0d1]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                  <span>{hasOfferedIncense ? 'Đã thắp tâm hương' : 'Thắp nén tâm hương'} ({incenseCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasOfferedLotus(true)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold transition-all ${
                    hasOfferedLotus
                      ? 'bg-[#c9892c] text-white shadow-xs'
                      : 'border border-[#ceb8a5] bg-[#f5e9dc] text-[#543e34] hover:bg-[#ede0d1]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">spa</span>
                  <span>{hasOfferedLotus ? 'Đã dâng hoa sen' : 'Dâng hoa sen & lễ vật'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('thap-huong-tri-an')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#ceb8a5] bg-[#f5e9dc] px-4 py-2 text-[12px] font-bold text-[#543e34] hover:bg-[#ede0d1]"
                >
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                  <span>Viết lời tri ân</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 10: 09. KIỂM SOÁT QUYỀN RIÊNG TƯ & PHÂN CẤP GIA TỘC CHẶT CHẼ
            ========================================================= */}
        <section id="sec-privacy" className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                PHÂN HỆ 09 • AN TOÀN & BẢO MẬT GIA TỘC
              </p>
              <h2 className="mt-2.5 font-serif text-3xl font-bold leading-tight text-[#2b1b15] sm:text-4xl">
                Kiểm Soát Quyền Riêng Tư & Phân Cấp Gia Tộc Chặt Chẽ
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Mỗi gia tộc là một ốc đảo số độc lập và khép kín. Áp dụng ma trận phân quyền theo vai vế truyền thống: Trưởng họ, Trưởng chi, Thành viên chính thức và Khách vãng lai, bảo vệ tuyệt đối thông tin gia phả khỏi sự xâm phạm từ bên ngoài.
              </p>

              <div className="mt-6 rounded-xl border border-[#d9c4af] bg-[#ede0d1] p-4 text-[12px] text-[#4a362d]">
                <div className="flex items-center gap-2 font-bold text-[#80141d]">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span>Cam kết bảo mật 100% dữ liệu di sản</span>
                </div>
                <p className="mt-1 text-[11.5px] leading-relaxed text-[#715b50]">
                  Dữ liệu gia phả được mã hóa đầu cuối (E2EE), sao lưu 3 lớp tại trung tâm dữ liệu chuẩn Tier 3 tại Việt Nam.
                </p>
              </div>
            </div>

            {/* Role Matrix Table */}
            <div className="overflow-hidden rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] shadow-sm">
              <div className="border-b border-[#ebdcce] bg-[#f5e9dc] px-5 py-3">
                <strong className="font-serif text-[15px] text-[#2b1b15]">
                  Bảng Phân Quyền Gia Tộc Theo Truyền Thống
                </strong>
              </div>
              <div className="divide-y divide-[#ebdcce] text-[12px]">
                <div className="flex items-center justify-between px-5 py-3">
                  <div>
                    <strong className="text-[#80141d]">Trưởng Tộc / Trưởng Họ</strong>
                    <p className="text-[11px] text-[#715b50]">Toàn quyền quản trị, duyệt phả, phê chuẩn thành viên</p>
                  </div>
                  <span className="rounded bg-[#80141d] px-2 py-0.5 text-[10px] font-bold text-white">Toàn quyền</span>
                </div>

                <div className="flex items-center justify-between px-5 py-3">
                  <div>
                    <strong className="text-[#2b1b15]">Trưởng Chi / Trưởng Ngành</strong>
                    <p className="text-[11px] text-[#715b50]">Cập nhật chi nhánh phụ trách, ghi nhận giỗ chạp chi</p>
                  </div>
                  <span className="rounded bg-[#ede0d1] px-2 py-0.5 text-[10px] font-bold text-[#80141d]">Quản trị chi</span>
                </div>

                <div className="flex items-center justify-between px-5 py-3">
                  <div>
                    <strong className="text-[#2b1b15]">Thành Viên Gia Tộc</strong>
                    <p className="text-[11px] text-[#715b50]">Xem phả hệ, thắp hương tri ân, tải ảnh kỷ niệm</p>
                  </div>
                  <span className="rounded bg-[#f5e9dc] px-2 py-0.5 text-[10px] font-bold text-[#543e34]">Đóng góp</span>
                </div>

                <div className="flex items-center justify-between px-5 py-3">
                  <div>
                    <strong className="text-[#2b1b15]">Khách Vãng Lai</strong>
                    <p className="text-[11px] text-[#715b50]">Chỉ xem cây phả hệ mẫu công khai do họ cho phép</p>
                  </div>
                  <span className="rounded bg-[#f5e9dc] px-2 py-0.5 text-[10px] font-bold text-[#715b50]">Xem mẫu</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 11: CALL TO ACTION BANNER (MÀU ĐỎ MẬN TRANG CHỦ)
            ========================================================= */}
        <section className="bg-[#f7eee2] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="rounded-3xl bg-gradient-to-br from-[#80141d] via-[#6d0d15] to-[#54080e] p-8 text-center text-white shadow-xl sm:p-14">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-sm ring-1 ring-white/20 mx-auto">
                <span className="material-symbols-outlined text-[26px]">temple_buddhist</span>
              </span>
              <h2 className="mt-5 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                Sẵn Sàng Số Hóa Di Sản Dòng Tộc Của Bạn?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-[#edd6cc] sm:text-[15px]">
                Hơn 5,000+ dòng họ tại Việt Nam đã tin tưởng lựa chọn Thích Cúng Kiếng để gìn giữ cội nguồn cho muôn đời sau.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="rounded-xl bg-white px-7 py-3 text-[13px] font-bold text-[#80141d] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#faf4ec] hover:shadow-lg active:scale-95"
                >
                  Bắt đầu dùng thử miễn phí
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="rounded-xl border border-white/40 bg-white/10 px-7 py-3 text-[13px] font-bold text-white shadow-2xs backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:scale-95"
                >
                  Khám phá không gian mẫu
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
};