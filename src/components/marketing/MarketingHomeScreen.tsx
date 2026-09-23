import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';
import { MarketingShell } from './MarketingShell.tsx';

interface Props {
  onNavigate: (screen: ScreenType) => void;
  onLogout?: () => void;
}

export const MarketingHomeScreen: React.FC<Props> = ({ onNavigate, onLogout }) => {
  // Interactive Before/After slider state (percentage from 0 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [zoomLevel, setZoomLevel] = useState<'fit' | '100' | '200'>('fit');
  const [activeSampleIndex, setActiveSampleIndex] = useState<number>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedTreeNode, setSelectedTreeNode] = useState<string | null>(null);
  const [calendarTab, setCalendarTab] = useState<'today' | 'upcoming' | 'major'>('today');

  const restorationSamples = [
    {
      title: 'Cụ Cố Nguyễn Khắc Cẩn (1912 – 1989)',
      meta: 'Chụp năm 1954 tại Nam Định • Nguyên bản ảnh thờ trong gia phả',
      image: '/images/ancestor_portrait.jpg',
      accuracy: '99.4%',
      depth: '16-bit ProPhoto RGB',
      originalRes: '800 × 600 px (72 DPI)',
      aiRes: '4800 × 3600 px (300 DPI)',
      printSize: 'Ảnh thờ 60 × 90 cm',
    },
    {
      title: 'Đại Gia Tộc Nhà Thờ Tổ (Chi Trực Lăng 1928)',
      meta: 'Chụp năm 1928 tại Cố đô Huế • Kỷ niệm ngày khánh thành từ đường',
      image: '/images/hero_family.jpg',
      accuracy: '98.9%',
      depth: '14-bit Heritage Film',
      originalRes: '1024 × 768 px (96 DPI)',
      aiRes: '5120 × 3840 px (300 DPI)',
      printSize: 'Tranh đại sảnh 80 × 120 cm',
    },
    {
      title: 'Huy Chương Kháng Chiến & Bằng Khen Cụ Ông',
      meta: 'Hiện vật lưu niệm năm 1968 • Khử xước mặt kính và khôi phục nhung gấm',
      image: '/images/relic_medals.jpg',
      accuracy: '99.8%',
      depth: '16-bit Lab Color',
      originalRes: '640 × 480 px (72 DPI)',
      aiRes: '3840 × 2880 px (300 DPI)',
      printSize: 'Tư liệu số hóa bảo tàng',
    },
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((offsetX / rect.width) * 100);
  };

  return (
    <MarketingShell currentScreen="guest-landing" onNavigate={onNavigate} onLogout={onLogout}>
      {/* =========================================================
          HERO SECTION - WARM HERITAGE BEIGE PALETTE
          ========================================================= */}
      <section className="relative overflow-hidden bg-[#f7eee2] px-5 pb-20 pt-12 lg:px-8 lg:pb-24 lg:pt-16">
        {/* Background Decorative Heritage Watermark Concentric Rings */}
        <div className="pointer-events-none absolute -left-20 top-0 h-[620px] w-[620px] rounded-full border border-[#e4d3c2] opacity-70" />
        <div className="pointer-events-none absolute -left-6 top-14 h-[470px] w-[470px] rounded-full border border-[#decab7] opacity-60" />
        <div className="pointer-events-none absolute left-10 top-28 h-[320px] w-[320px] rounded-full border border-dashed border-[#d5beaa] opacity-50" />

        <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left Hero Column */}
          <div className="relative z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfcdbb] bg-[#ede0d1] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#80141d] shadow-2xs transition-transform duration-200 hover:scale-[1.02]">
              <span className="material-symbols-outlined text-[15px] text-[#80141d]">auto_awesome</span>
              <span>Nền tảng số hóa di sản gia tộc Việt Nam</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.14] text-[#2b1b15] sm:text-5xl lg:text-[54px]">
              Giữ ký ức —<br />
              <span className="font-serif italic font-bold text-[#80141d]">Nơi cội nguồn</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#6c5549] sm:text-[16px]">
              Hồi sinh từng trang ký ức và di sản gia tộc qua cây phả hệ 2.5D trực quan, phục chế ảnh cũ bằng AI và các quy ước phụng sự thuần Việt. Được gìn giữ trang trọng bởi chính gia đình bạn.
            </p>

            {/* CTA Buttons with high-end micro-interactions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#88131d] to-[#6d0d15] px-8 py-3.5 text-[14px] font-bold text-white shadow-md ring-1 ring-[#9c1b25] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#961722] hover:to-[#7a1019] hover:shadow-[0_8px_24px_rgba(128,20,29,0.3)] active:translate-y-0 active:scale-95"
              >
                <span>Bắt đầu miễn phí</span>
                <span className="text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('cay-pha-he-25d')}
                className="rounded-xl border border-[#ceb7a3] bg-[#fdfaf6]/70 px-6 py-3.5 text-[14px] font-semibold text-[#80141d] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#bda18a] hover:bg-[#ede1d3] hover:shadow-sm active:translate-y-0 active:scale-95"
              >
                Khám phá không gian mẫu
              </button>
            </div>

            {/* Bullet features */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-[13px] text-[#715b50]">
              <span className="inline-flex items-center gap-2 transition-transform duration-200 hover:translate-x-0.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ede0d1] text-[#80141d] shadow-2xs">
                  <span className="material-symbols-outlined text-[15px]">verified_user</span>
                </span>
                Bảo mật & quyền riêng tư
              </span>
              <span className="inline-flex items-center gap-2 transition-transform duration-200 hover:translate-x-0.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ede0d1] text-[#80141d] shadow-2xs">
                  <span className="material-symbols-outlined text-[15px]">menu_book</span>
                </span>
                Chuẩn văn hóa gia phong
              </span>
              <span className="inline-flex items-center gap-2 transition-transform duration-200 hover:translate-x-0.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ede0d1] text-[#80141d] shadow-2xs">
                  <span className="material-symbols-outlined text-[15px]">devices</span>
                </span>
                Đa nền tảng, mọi thành viên
              </span>
            </div>
          </div>

          {/* Right Hero Column: Visual Card */}
          <div className="relative">
            {/* Glow Aura */}
            <div className="absolute -inset-4 rounded-3xl bg-[#ecd8c7]/60 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-[#e4d2bf] bg-[#fbf6ef] p-3 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#eed6cc] shadow-inner">
                <img
                  src="/images/hero_family.jpg"
                  alt="Không gian ký ức dòng họ Nguyễn Cảnh"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-[#e4d2bf] bg-[#faf4ec]/95 px-4 py-2.5 shadow-md backdrop-blur-md transition-all duration-200 hover:bg-[#fffdfa]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#80141d]">location_on</span>
                    <span className="text-[12px] font-semibold text-[#4a362d]">
                      Không gian ký ức dòng họ Nguyễn Cảnh (Thừa Thiên Huế)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('cay-pha-he-25d')}
                    className="group shrink-0 text-[12px] font-bold text-[#80141d] transition-all duration-150 hover:text-[#a01a24] active:scale-95"
                  >
                    <span>Trực quan 2.5D</span>
                    <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: ĐẠO HIẾU LƯU TRUYỀN, CÔNG NGHỆ GÌN GIỮ
          ========================================================= */}
      <section className="border-y border-[#e2d0be] bg-[#f2e7db] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#936652]">
            Tính năng nổi bật & ý nghĩa
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
            Đạo hiếu lưu truyền, công nghệ gìn giữ
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[#685246]">
            Thích Cúng Kiếng không chỉ là phả hệ trực tuyến. Đó là nơi từng thành viên kết nối lại với gốc rễ thông qua nét văn hóa thuần Việt.
          </p>

          {/* 3 Value Cards with Interactive Lift & Glow */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group flex flex-col justify-between rounded-2xl border border-[#e5d5c5] bg-[#fbf6ef] p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d9c4b0] hover:shadow-[0_12px_28px_rgba(43,27,21,0.08)] active:scale-[0.99]">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#80141d] text-[14px] font-bold text-white shadow-sm ring-1 ring-[#9c1b25] transition-transform duration-300 group-hover:scale-105">
                  1
                </span>
                <h3 className="mt-5 font-serif text-[18px] font-bold text-[#2b1b15] transition-colors duration-200 group-hover:text-[#80141d]">
                  Khởi tạo không gian gia tộc
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[#6c5549]">
                  Thiết lập không gian số cho dòng họ. Tự động liên kết các nhánh gia tộc, bổ nhiệm người phụ trách và phân quyền theo vai vế truyền thống.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-[#ebdcce] pt-4 text-[12px] text-[#856b5f]">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">key</span>
                <span>Phân quyền theo vai vế • Tối đa bảo mật</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col justify-between rounded-2xl border border-[#e5d5c5] bg-[#fbf6ef] p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d9c4b0] hover:shadow-[0_12px_28px_rgba(43,27,21,0.08)] active:scale-[0.99]">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#80141d] text-[14px] font-bold text-white shadow-sm ring-1 ring-[#9c1b25] transition-transform duration-300 group-hover:scale-105">
                  2
                </span>
                <h3 className="mt-5 font-serif text-[18px] font-bold text-[#2b1b15] transition-colors duration-200 group-hover:text-[#80141d]">
                  Số hóa Kỷ vật & Ký ức
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[#6c5549]">
                  Ghi chép và lưu trữ tư liệu, kỷ vật thiêng liêng cùng những câu chuyện truyền khẩu để con cháu mai sau thấu hiểu ngọn ngành gốc gác.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-[#ebdcce] pt-4 text-[12px] text-[#856b5f]">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">museum</span>
                <span>Bảo tàng kỷ vật số • Đính kèm ghi âm</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col justify-between rounded-2xl border border-[#e5d5c5] bg-[#fbf6ef] p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d9c4b0] hover:shadow-[0_12px_28px_rgba(43,27,21,0.08)] active:scale-[0.99]">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#80141d] text-[14px] font-bold text-white shadow-sm ring-1 ring-[#9c1b25] transition-transform duration-300 group-hover:scale-105">
                  3
                </span>
                <h3 className="mt-5 font-serif text-[18px] font-bold text-[#2b1b15] transition-colors duration-200 group-hover:text-[#80141d]">
                  Quản lý giỗ chạp & Toàn văn
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[#6c5549]">
                  Lịch Âm - Dương đồng bộ tự động nhắc nhở ngày giỗ, ngày lễ kỵ, chuẩn bị mâm lễ chu đáo và kết nối các thành viên cùng tề tựu đông đủ.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-[#ebdcce] pt-4 text-[12px] text-[#856b5f]">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">notifications_active</span>
                <span>Nhắc hẹn đa kênh • Nghi thức lễ chu đáo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: PHỤC CHẾ ẢNH CHÂN DUNG TỔ TIÊN
          ========================================================= */}
      <section className="bg-[#f7eee2] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          {/* Header Row */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#936652]">
                Công nghệ phục chế AI — Giữ trọn nét xưa
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                Phục chế ảnh chân dung tổ tiên
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Khôi phục những bức ảnh cũ mờ phai theo năm tháng. AI nhận diện từng chi tiết khuôn mặt, tái tạo trang phục truyền thống và giữ nguyên hồn cốt của người đi trước.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('phuc-che-ai')}
              className="group inline-flex items-center gap-2 self-start rounded-xl border border-[#ceb8a5] bg-[#fbf6ef] px-5 py-2.5 text-[13px] font-bold text-[#80141d] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b59b84] hover:bg-[#ede0d1] hover:shadow active:translate-y-0 active:scale-95 md:self-end"
            >
              <span>Vào Studio Phục Chế AI</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Sample Switcher Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="text-[12px] font-semibold text-[#715b50]">Chọn ảnh mẫu:</span>
            {restorationSamples.map((sample, idx) => (
              <button
                key={sample.title}
                type="button"
                onClick={() => setActiveSampleIndex(idx)}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all duration-150 active:scale-95 ${
                  activeSampleIndex === idx
                    ? 'bg-[#80141d] font-bold text-white shadow-xs ring-1 ring-[#9c1b25]'
                    : 'border border-[#decab7] bg-[#fbf6ef] text-[#543e34] hover:bg-[#ede0d1] hover:text-[#80141d]'
                }`}
              >
                {sample.title.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Interactive Before & After Visual Component */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#e2d0be] bg-[#f2e7db] p-4 shadow-sm">
            {/* Top Bar inside preview card */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#e4d2bf] pb-3 text-[12px]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#80141d]">badge</span>
                <strong className="font-serif text-[14px] text-[#2b1b15]">
                  {restorationSamples[activeSampleIndex].title}
                </strong>
                <span className="hidden text-[#715b50] sm:inline">
                  • {restorationSamples[activeSampleIndex].meta}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6c5549]">
                <button
                  type="button"
                  onClick={() => setZoomLevel('fit')}
                  className={`rounded-md border px-2 py-0.5 shadow-2xs transition-colors ${
                    zoomLevel === 'fit'
                      ? 'border-[#80141d] bg-[#80141d] text-white font-bold'
                      : 'border-[#ceb8a5] bg-[#fbf6ef] text-[#6c5549] hover:bg-[#ede0d1]'
                  }`}
                >
                  Vừa khung
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel('100')}
                  className={`rounded-md border px-2 py-0.5 shadow-2xs transition-colors ${
                    zoomLevel === '100'
                      ? 'border-[#80141d] bg-[#80141d] text-white font-bold'
                      : 'border-[#ceb8a5] bg-[#fbf6ef] text-[#6c5549] hover:bg-[#ede0d1]'
                  }`}
                >
                  100%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel('200')}
                  className={`rounded-md border px-2 py-0.5 shadow-2xs transition-colors ${
                    zoomLevel === '200'
                      ? 'border-[#80141d] bg-[#80141d] text-white font-bold'
                      : 'border-[#ceb8a5] bg-[#fbf6ef] text-[#6c5549] hover:bg-[#ede0d1]'
                  }`}
                >
                  200%
                </button>
              </div>
            </div>

            <div
              className="relative aspect-[16/9] w-full cursor-ew-resize select-none overflow-hidden rounded-xl bg-[#2b1b15] shadow-inner"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* Full Color Restored Image (Right/Underneath) */}
              <img
                src={restorationSamples[activeSampleIndex].image}
                alt="Phục chế màu sắc AI"
                className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 ${
                  zoomLevel === '200' ? 'scale-150' : zoomLevel === '100' ? 'scale-115' : 'scale-100'
                }`}
              />

              {/* Black & White Restored Image (Left Clipped) */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={restorationSamples[activeSampleIndex].image}
                  alt="Ảnh phục chế sau khi làm nét"
                  className={`pointer-events-none absolute inset-y-0 left-0 h-full max-w-none object-cover object-top transition-transform duration-300 ${
                    zoomLevel === '200' ? 'scale-150' : zoomLevel === '100' ? 'scale-115' : 'scale-100'
                  }`}
                  style={{
                    width: '100%',
                    minWidth: '100%',
                    filter: 'grayscale(100%) sepia(25%) contrast(1.1) brightness(0.95)',
                  }}
                />
              </div>

              {/* Slider Divider Line */}
              <div
                className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white/95 shadow-md"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#c9892c] text-white shadow-xl ring-2 ring-white">
                  <span className="text-[11px] font-bold">{Math.round(sliderPosition)}%</span>
                </div>
              </div>

              {/* Pill Tags on Image */}
              <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-lg bg-[#2b1b15]/85 px-3 py-1.5 text-[11px] font-bold text-white shadow backdrop-blur-sm">
                Ảnh tư liệu gốc
              </span>
              <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-lg bg-[#80141d]/90 px-3 py-1.5 text-[11px] font-bold text-white shadow backdrop-blur-sm">
                Phục chế AI 4K
              </span>
            </div>

            {/* Verification Bar - from Image 1 */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] px-3.5 py-2 text-[11.5px] text-[#715b50]">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[16px] text-[#2e7d32]">verified</span>
                <span>
                  Đã kiểm định: Khớp <strong>{restorationSamples[activeSampleIndex].accuracy}</strong> giải phẫu nhân diện
                </span>
              </span>
              <span>
                Độ sâu màu: <strong>{restorationSamples[activeSampleIndex].depth}</strong> • Tái tạo thần sắc: <strong className="text-[#80141d]">Hoàn tất</strong>
              </span>
            </div>

            {/* Resolution Upgrade Spec Box - from Image 1 */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#ddcaa8] bg-[#ede0d1]/70 px-4 py-2.5 text-[12px]">
              <div className="flex items-center gap-2 text-[#4a362d]">
                <span className="material-symbols-outlined text-[18px] text-[#80141d]">photo_size_select_actual</span>
                <span>
                  Thông số độ phân giải: <strong className="text-[#2b1b15]">Gốc {restorationSamples[activeSampleIndex].originalRes}</strong> → <strong className="text-[#80141d]">AI 4K: {restorationSamples[activeSampleIndex].aiRes}</strong>
                </span>
              </div>
              <span className="rounded-lg bg-[#fbf6ef] px-2.5 py-1 text-[11px] font-bold text-[#80141d] shadow-2xs">
                Sẵn sàng in {restorationSamples[activeSampleIndex].printSize}
              </span>
            </div>

            {/* 3 Feature Boxes below the image */}
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="group flex items-start gap-3 rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] p-3.5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#80141d] text-[13px] font-bold text-white shadow-2xs">
                  1
                </span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#2b1b15] transition-colors group-hover:text-[#80141d]">
                    Khôi phục chi tiết & vết rách
                  </h4>
                  <p className="text-[12px] text-[#715b50]">Giữ nguyên góc cạnh & nét mặt người xưa</p>
                </div>
              </div>

              <div className="group flex items-start gap-3 rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] p-3.5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#80141d] text-[13px] font-bold text-white shadow-2xs">
                  2
                </span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#2b1b15] transition-colors group-hover:text-[#80141d]">
                    Tô màu hoài niệm
                  </h4>
                  <p className="text-[12px] text-[#715b50]">Đúng tông sắc phục trang truyền thống</p>
                </div>
              </div>

              <div className="group flex items-start gap-3 rounded-xl border border-[#e4d2bf] bg-[#fbf6ef] p-3.5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#80141d] text-[13px] font-bold text-white shadow-2xs">
                  3
                </span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#2b1b15] transition-colors group-hover:text-[#80141d]">
                    Thước đo quy chuẩn truyền thống
                  </h4>
                  <p className="text-[12px] text-[#715b50]">Tương thích ảnh thờ cúng & gia phả</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: CÂY GIA PHẢ TRỰC QUAN, CHUẨN LỄ NGHI
          ========================================================= */}
      <section className="border-t border-[#e2d0be] bg-[#f2e7db] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          {/* Header Row */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#936652]">
                Phả hệ số — Trực quan 2.5D
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                Cây Gia Phả trực quan, chuẩn lễ nghi
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Hệ thống phả hệ hiển thị đa chiều, phân tầng chi nhánh rõ ràng, hỗ trợ quy chuẩn xưng hô và thứ bậc nghiêm cẩn theo gia pháp truyền thống.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('cay-pha-he-25d')}
              className="inline-flex items-center gap-1.5 self-start rounded-xl border border-[#ceb8a5] bg-[#fbf6ef] px-4 py-2 text-[12px] font-semibold text-[#543e34] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ede0d1] hover:text-[#80141d] active:translate-y-0 active:scale-95 md:self-end"
            >
              <span className="material-symbols-outlined text-[16px]">fullscreen</span>
              Khám phá không gian 2.5D
            </button>
          </div>

          {/* Interactive Family Tree Diagram Preview */}
          <div className="mt-8 rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm sm:p-8">
            {/* Level 1: Thủy Tổ */}
            <div
              onClick={() => setSelectedTreeNode(selectedTreeNode === 'thuy-to' ? null : 'thuy-to')}
              className={`mx-auto max-w-sm cursor-pointer rounded-xl bg-gradient-to-br from-[#88131d] to-[#6d0d15] p-4 text-center text-white shadow-md ring-1 transition-all duration-200 hover:shadow-lg ${
                selectedTreeNode === 'thuy-to' ? 'ring-4 ring-[#e5a93c] scale-[1.02]' : 'ring-[#9c1b25]'
              }`}
            >
              <span className="rounded bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                ĐỜI I • THỦY TỔ
              </span>
              <strong className="mt-1 block font-serif text-[18px]">Cụ Khắc Cẩn</strong>
              <span className="text-[12px] opacity-85">1640 – 1715</span>

              <div className="mt-3 flex justify-center gap-2 border-t border-white/20 pt-2 text-[11px]">
                <span className="rounded bg-white/10 px-2 py-0.5">Chánh thất: Cụ Bà...</span>
                <span className="rounded bg-white/10 px-2 py-0.5">Kế thất: Cụ Bà...</span>
              </div>
            </div>

            {/* Stem line */}
            <div className="mx-auto h-6 w-0.5 bg-[#cca68d]" />

            {/* Level 2: Chi Trưởng & Chi Thứ */}
            <div className="mx-auto max-w-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setSelectedTreeNode(selectedTreeNode === 'chi-truong' ? null : 'chi-truong')}
                  className={`cursor-pointer rounded-xl border p-4 text-left shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs ${
                    selectedTreeNode === 'chi-truong'
                      ? 'border-[#80141d] bg-[#faeee1] ring-2 ring-[#80141d]'
                      : 'border-[#e4d2bf] bg-[#f5e9dc] hover:border-[#d9c4b0]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    ĐỜI II • CHI TRƯỞNG
                  </span>
                  <strong className="mt-1 block font-serif text-[15px] text-[#2b1b15]">
                    Cụ Trọng Quang
                  </strong>
                  <span className="text-[12px] text-[#7a6256]">1675 – 1740</span>
                </div>

                <div
                  onClick={() => setSelectedTreeNode(selectedTreeNode === 'chi-thu' ? null : 'chi-thu')}
                  className={`cursor-pointer rounded-xl border p-4 text-left shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs ${
                    selectedTreeNode === 'chi-thu'
                      ? 'border-[#80141d] bg-[#faeee1] ring-2 ring-[#80141d]'
                      : 'border-[#e4d2bf] bg-[#f5e9dc] hover:border-[#d9c4b0]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    ĐỜI II • CHI THỨ
                  </span>
                  <strong className="mt-1 block font-serif text-[15px] text-[#2b1b15]">
                    Cụ Quang Vĩnh
                  </strong>
                  <span className="text-[12px] text-[#7a6256]">1680 – 1752</span>
                </div>
              </div>
            </div>

            {/* Stem line down */}
            <div className="mx-auto h-6 w-0.5 bg-[#cca68d]" />

            {/* Level 3: 3 Branches */}
            <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
              <div
                onClick={() => setSelectedTreeNode(selectedTreeNode === 'nhanh-1' ? null : 'nhanh-1')}
                className={`cursor-pointer rounded-xl border p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  selectedTreeNode === 'nhanh-1'
                    ? 'border-[#80141d] bg-[#fff5ea] ring-2 ring-[#80141d]'
                    : 'border-[#e4d2bf] bg-[#faf3ec] hover:border-[#d9c4b0]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                  ĐỜI III • NHÁNH TRƯỞNG
                </span>
                <strong className="mt-1 block font-serif text-[14px] text-[#2b1b15]">
                  Cụ Trọng Nhân
                </strong>
                <p className="mt-1 text-[11px] text-[#715b50]">1705 – 1770</p>
                <p className="mt-1 text-[11px] text-[#856b5f]">Hậu duệ: 12 người • Hương hỏa: Nhà thờ Họ</p>
              </div>

              <div
                onClick={() => setSelectedTreeNode(selectedTreeNode === 'nhanh-2' ? null : 'nhanh-2')}
                className={`cursor-pointer rounded-xl border p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  selectedTreeNode === 'nhanh-2'
                    ? 'border-[#80141d] bg-[#fff5ea] ring-2 ring-[#80141d]'
                    : 'border-[#e4d2bf] bg-[#faf3ec] hover:border-[#d9c4b0]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                  ĐỜI III • NHÁNH THỨ HAI
                </span>
                <strong className="mt-1 block font-serif text-[14px] text-[#2b1b15]">
                  Cụ Trọng Quyền
                </strong>
                <p className="mt-1 text-[11px] text-[#715b50]">1710 – 1775</p>
                <p className="mt-1 text-[11px] text-[#856b5f]">Hậu duệ: 8 người • Di cư: Xứ Đoài</p>
              </div>

              <div
                onClick={() => setSelectedTreeNode(selectedTreeNode === 'nhanh-3' ? null : 'nhanh-3')}
                className={`cursor-pointer rounded-xl border p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  selectedTreeNode === 'nhanh-3'
                    ? 'border-[#80141d] bg-[#fff5ea] ring-2 ring-[#80141d]'
                    : 'border-[#e4d2bf] bg-[#faf3ec] hover:border-[#d9c4b0]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                  ĐỜI III • NHÁNH THỨ BA
                </span>
                <strong className="mt-1 block font-serif text-[14px] text-[#2b1b15]">
                  Cụ Nam Toàn
                </strong>
                <p className="mt-1 text-[11px] text-[#715b50]">1715 – 1782</p>
                <p className="mt-1 text-[11px] text-[#856b5f]">Hậu duệ: 15 người • Khởi sự buôn gốm</p>
              </div>
            </div>

            {/* Bottom Bar inside tree card */}
            <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-[#ebdcce] pt-4 text-[12px] sm:flex-row">
              <span className="flex items-center gap-1.5 text-[#715b50]">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">schema</span>
                Chế độ xem 2.5D đa chiều: Kéo thả tự do, xem chi tiết từng người, lịch sử hôn phối
              </span>
              <button
                type="button"
                onClick={() => onNavigate('cay-pha-he-25d')}
                className="group font-bold text-[#80141d] transition-all duration-150 hover:text-[#a01a24] active:scale-95"
              >
                <span>Khám phá tính năng gia phả đầy đủ</span>
                <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: LỊCH ÂM - DƯƠNG & GIỖ CHẠP GIA ĐÌNH
          ========================================================= */}
      <section className="bg-[#f7eee2] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#936652]">
              Lễ nghi truyền thống — Không bỏ sót ngày lễ
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
              Lịch Âm - Dương & Giỗ Chạp gia đình
            </h2>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
              Tự động chuyển đổi ngày âm dương và gửi thông báo sớm, gợi ý sắm mâm lễ và bài văn khấn chuẩn nghi thức để gia đình chuẩn bị chu tất.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left Card: Featured / Today */}
            <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-7 shadow-sm transition-all duration-300 hover:shadow-md">
              <span className="rounded-full border border-[#ddcaa8] bg-[#ede0d1] px-3.5 py-1 text-[11px] font-bold text-[#80141d] shadow-2xs">
                HÔM NAY
              </span>
              <strong className="mt-3 block font-serif text-3xl text-[#2b1b15] sm:text-4xl">
                14 Tháng Bảy
              </strong>
              <p className="mt-1 text-[12px] font-medium text-[#7a6256]">Năm Giáp Thìn (2024)</p>

              <div className="mt-5 rounded-xl border border-[#e4d2bf] bg-[#f5e9dc] p-4 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-[#80141d]">
                  <span className="material-symbols-outlined text-[16px]">candle</span>
                  LỄ CHUNG THẤT MẸ (THỜI KỲ 49 NGÀY)
                </div>
                <p className="mt-1.5 text-[12px] font-medium text-[#4a362d]">
                  Dương lịch: Thứ Ba, 14/07/2024 • Âm lịch: 09/06 Giáp Thìn
                </p>
                <p className="mt-1 text-[12px] text-[#715b50]">
                  Lễ kỵ: Cụ Bà Nguyễn Thị Lan • Giờ đẹp: Giờ Tỵ (09:00 - 11:00)
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[12px] italic text-[#715b50]">
                  Chuẩn bị: Mâm lễ chay thanh tịnh...
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('cam-nang-nghi-le')}
                  className="rounded-lg bg-[#80141d] px-4 py-2 text-[12px] font-bold text-white shadow-sm ring-1 ring-[#9c1b25] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6c1017] hover:shadow active:translate-y-0 active:scale-95"
                >
                  Xem văn khấn
                </button>
              </div>
            </div>

            {/* Right Card: Upcoming Events in Week */}
            <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#ebdcce] pb-3">
                <h3 className="font-serif text-[17px] font-bold text-[#2b1b15]">
                  Tuần này có 3 ngày Giỗ sắp tới
                </h3>
                <span className="text-[12px] text-[#856b5f]">3 sự kiện gần nhất</span>
              </div>

              <div className="mt-3.5 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-[#e4d2bf] bg-[#f5e9dc]/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5e9dc] hover:shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edd8c6] text-[#80141d]">
                      <span className="material-symbols-outlined text-[18px]">event</span>
                    </span>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#2b1b15]">
                        16/07 - Giỗ Cụ Cố (Đời thứ tư)
                      </h4>
                      <p className="text-[12px] text-[#715b50]">Âm lịch: 11 tháng Sáu • Còn 2 ngày</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#8a7063]">notifications</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#e4d2bf] bg-[#f5e9dc]/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5e9dc] hover:shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ebd9c1] text-[#a45e14]">
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    </span>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#2b1b15]">
                        18/07 - Lễ Cúng Rằm & Cúng Cô Hồn Gia Tộc
                      </h4>
                      <p className="text-[12px] text-[#715b50]">Âm lịch: 13 tháng Sáu • Chuẩn bị văn khấn</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#8a7063]">description</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#e4d2bf] bg-[#f5e9dc]/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5e9dc] hover:shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edd8c6] text-[#80141d]">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    </span>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#2b1b15]">
                        20/07 - Lễ Giỗ Cậu Cả (Bác ruột Trưởng tộc)
                      </h4>
                      <p className="text-[12px] text-[#715b50]">Âm lịch: 15 tháng Sáu • Giờ Ngọ (11:00)</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#8a7063]">notifications</span>
                </div>
              </div>

              <p className="mt-4 flex items-center gap-1.5 text-[12px] text-[#856b5f]">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">schedule_send</span>
                Hệ thống tự động thông báo qua Zalo và Email cho các thành viên trước 7 ngày
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6: BẢO TỒN KỶ VẬT & ĐIỂN TÍCH TRUYỀN ĐỜI
          ========================================================= */}
      <section className="border-t border-[#e2d0be] bg-[#f2e7db] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          {/* Header Row */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#936652]">
                Di sản truyền thống — Kỷ vật ngàn năm
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                Bảo tồn Kỷ vật & Điển tích truyền đời
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                Không chỉ lưu chữ, Thích Cúng Kiếng lưu giữ cả hồn cốt qua từng bức sắc phong, cuốn gia phả cổ, tráp trầu hay kỷ vật kháng chiến thiêng liêng của cha ông.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('hien-tang-gia-bao')}
              className="group inline-flex items-center gap-1 self-start text-[13px] font-bold text-[#80141d] transition-all duration-150 hover:text-[#a01a24] active:scale-95 md:self-end"
            >
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              <span>Đóng góp kỷ vật vào gia tộc</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* 3 Relic Cards with Hover Lift */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <article className="group overflow-hidden rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d9c4b0] hover:shadow-[0_12px_28px_rgba(43,27,21,0.08)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8d5cb]">
                <img
                  src="/images/relic_box.jpg"
                  alt="Tráp gỗ Khảm ốc xà cừ"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded bg-[#2b1b15]/85 px-2.5 py-1 text-[10px] font-bold text-white shadow backdrop-blur-sm">
                  KỶ VẬT GIA TRUYỀN
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-[17px] font-bold text-[#2b1b15] transition-colors duration-200 group-hover:text-[#80141d]">
                  Tráp gỗ Khảm ốc xà cừ
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                  Kỷ vật của Cụ Cố truyền lại từ năm 1912. Hiện do Trưởng nam chi thứ gìn giữ tại nhà thờ họ thôn An Cựu.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#ebdcce] pt-3 text-[12px] text-[#856b5f]">
                  <span>Người gìn giữ: Bác Nguyễn Văn Cảnh</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('chi-tiet-gia-bao')}
                    className="font-bold text-[#80141d] transition-all hover:text-[#9e1520] hover:underline active:scale-95"
                  >
                    Xem tư liệu (3D)
                  </button>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group overflow-hidden rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d9c4b0] hover:shadow-[0_12px_28px_rgba(43,27,21,0.08)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8d5cb]">
                <img
                  src="/images/relic_book.jpg"
                  alt="Gia phả chữ Hán năm 1925"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded bg-[#2b1b15]/85 px-2.5 py-1 text-[10px] font-bold text-white shadow backdrop-blur-sm">
                  TƯ LIỆU CỔ
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-[17px] font-bold text-[#2b1b15] transition-colors duration-200 group-hover:text-[#80141d]">
                  Gia phả chữ Hán năm 1925
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                  Tập tài liệu chữ Nôm quý giá được số hóa từng trang, có bản dịch nghĩa và chú thích ngữ cảnh lịch sử.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#ebdcce] pt-3 text-[12px] text-[#856b5f]">
                  <span>Người số hóa: Chú Nguyễn Văn Thọ</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('phan-tich-but-tich')}
                    className="font-bold text-[#80141d] transition-all hover:text-[#9e1520] hover:underline active:scale-95"
                  >
                    Xem bản quét sắc nét
                  </button>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group overflow-hidden rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d9c4b0] hover:shadow-[0_12px_28px_rgba(43,27,21,0.08)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8d5cb]">
                <img
                  src="/images/relic_medals.jpg"
                  alt="Huy chương Kháng chiến của Ông"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded bg-[#2b1b15]/85 px-2.5 py-1 text-[10px] font-bold text-white shadow backdrop-blur-sm">
                  KỶ VẬT KHÁNG CHIẾN
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-[17px] font-bold text-[#2b1b15] transition-colors duration-200 group-hover:text-[#80141d]">
                  Huy chương Kháng chiến của Ông
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                  Ghi nhận công lao đóng góp cho Tổ quốc thời kỳ kháng chiến chống Mỹ. Đi kèm ghi âm lời kể của Bác Cả.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#ebdcce] pt-3 text-[12px] text-[#856b5f]">
                  <span>Người gìn giữ: Cô Nguyễn Thị Mai</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('chi-tiet-di-vat')}
                    className="font-bold text-[#80141d] transition-all hover:text-[#9e1520] hover:underline active:scale-95"
                  >
                    Xem tư liệu chi tiết
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 7: CAM KẾT BẢO MẬT TUYỆT ĐỐI CHO KÝ ỨC CỦA TỔ TIÊN
          ========================================================= */}
      <section className="bg-[#f7eee2] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid items-center gap-8 rounded-3xl border border-[#dfcdbb] bg-[#eedecf] p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            {/* Left Column */}
            <div>
              <span className="inline-block rounded-full bg-[#faefe4] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#80141d] shadow-2xs">
                Bảo mật & Quyền riêng tư tuyệt đối
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#2b1b15] sm:text-4xl">
                Cam kết bảo mật tuyệt đối cho ký ức của tổ tiên
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-[#5e493f]">
                Chúng tôi coi dữ liệu gia phả là tài sản thiêng liêng nhất của mỗi gia đình. Thích Cúng Kiếng cam kết tuyệt đối không thương mại hóa, không bán dữ liệu cho bên thứ ba.
              </p>

              {/* 4 Feature Points */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#80141d]">verified</span>
                  <div>
                    <strong className="text-[13px] font-bold text-[#2b1b15]">Không quảng cáo</strong>
                    <p className="text-[12px] text-[#6c5549]">Dữ liệu thuần túy và không gian tôn nghiêm trọn vẹn</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#80141d]">lock</span>
                  <div>
                    <strong className="text-[13px] font-bold text-[#2b1b15]">Quyền riêng tư tuyệt đối</strong>
                    <p className="text-[12px] text-[#6c5549]">Tùy biến phân quyền cho từng thành viên: xem, sửa, quản trị</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#80141d]">dns</span>
                  <div>
                    <strong className="text-[13px] font-bold text-[#2b1b15]">Máy chủ đặt tại Việt Nam</strong>
                    <p className="text-[12px] text-[#6c5549]">Tốc độ nhanh chóng, tuân thủ pháp luật an toàn thông tin</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#80141d]">cloud_sync</span>
                  <div>
                    <strong className="text-[13px] font-bold text-[#2b1b15]">Sao lưu định kỳ liên tục</strong>
                    <p className="text-[12px] text-[#6c5549]">Không bao giờ lo thất lạc dù sau hàng chục năm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating White Card */}
            <div className="rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#faefe4] text-[#80141d] shadow-sm ring-1 ring-[#e2cfbe]">
                <span className="material-symbols-outlined text-[32px]">verified_user</span>
              </span>
              <strong className="mt-4 block font-serif text-[20px] font-bold text-[#2b1b15]">
                Chứng nhận Bảo Mật Gia Tộc
              </strong>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6c5549]">
                Mọi dữ liệu được mã hóa đầu cuối 256-bit AES. Dữ liệu chỉ thuộc về gia đình bạn và những người được bạn cấp quyền truy cập.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('privacy-security')}
                className="group mt-5 inline-flex items-center gap-1 text-[13px] font-bold text-[#80141d] transition-all duration-150 hover:text-[#9e1520] active:scale-95"
              >
                <span>Tìm hiểu chính sách quyền riêng tư chi tiết</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 8: ĐỒNG HÀNH TRƯỜNG TỒN CÙNG DÒNG HỌ (BẢNG GIÁ)
          ========================================================= */}
      <section className="border-t border-[#e2d0be] bg-[#f2e7db] px-5 py-20 text-center lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#936652]">
            Bảng giá dịch vụ
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
            Đồng hành trường tồn cùng dòng họ
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-[#685246]">
            Chi phí minh bạch, không phí ẩn. Đảm bảo nền tảng vận hành bền vững qua nhiều thế hệ.
          </p>

          {/* Interactive Billing Cycle Toggle */}
          <div className="mt-7 inline-flex items-center rounded-xl border border-[#ceb8a5] bg-[#ede0d1] p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-lg px-4 py-1.5 text-[12px] font-bold transition-all duration-150 ${
                billingCycle === 'monthly'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'text-[#543e34] hover:text-[#80141d]'
              }`}
            >
              Thanh toán theo tháng
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-[12px] font-bold transition-all duration-150 ${
                billingCycle === 'yearly'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'text-[#543e34] hover:text-[#80141d]'
              }`}
            >
              <span>Thanh toán theo năm</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                billingCycle === 'yearly' ? 'bg-[#c9892c] text-white' : 'bg-[#80141d] text-white'
              }`}>
                -20%
              </span>
            </button>
          </div>

          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            {/* Plan 1 */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#936652]">
                  CƠ BẢN
                </span>
                <p className="mt-1 text-[12px] text-[#6c5549]">
                  Dành cho gia đình nhỏ muốn lưu giữ ký ức
                </p>
                <div className="mt-5">
                  <span className="font-serif text-4xl font-bold text-[#2b1b15]">0 đ</span>
                </div>

                <ul className="mt-6 space-y-2.5 text-[13px] text-[#685246]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Cây gia phả tới 30 thành viên
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Lưu trữ 50 ảnh & kỷ vật gia đình
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Lịch giỗ chạp cơ bản & thông báo qua web
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="mt-8 w-full rounded-xl border border-[#ceb8a5] bg-[#f5e9dc] py-3 text-[13px] font-bold text-[#80141d] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ede0d1] hover:shadow-xs active:translate-y-0 active:scale-95"
              >
                Đăng ký miễn phí
              </button>
            </div>

            {/* Plan 2: Recommended */}
            <div className="relative flex flex-col justify-between rounded-2xl border-2 border-[#80141d] bg-[#fbf6ef] p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#80141d] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ring-1 ring-[#9c1b25]">
                Phổ biến nhất
              </span>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#80141d]">
                  GIA ĐÌNH PHỔ THÔNG
                </span>
                <p className="mt-1 text-[12px] text-[#6c5549]">
                  Chi nhánh dòng họ, gia đình nhiều thế hệ
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-bold text-[#80141d]">
                    {billingCycle === 'yearly' ? '39.000 đ' : '49.000 đ'}
                  </span>
                  <span className="text-[13px] text-[#856b5f]">/ tháng</span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="mt-1 text-[11px] font-medium text-[#2e7d32]">
                    Thanh toán 468.000 đ/năm (tiết kiệm 120.000 đ)
                  </p>
                )}

                <ul className="mt-6 space-y-2.5 text-[13px] text-[#685246]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Cây gia phả tới 200 thành viên (không giới hạn nhánh)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Phục chế 20 ảnh cũ/tháng bằng AI cao cấp
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Bảo tàng kỷ vật không giới hạn
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Tự động thông báo qua Zalo cho toàn dòng họ
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#88131d] to-[#6d0d15] py-3 text-[13px] font-bold text-white shadow-md ring-1 ring-[#9c1b25] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#961722] hover:to-[#7a1019] hover:shadow-[0_8px_20px_rgba(128,20,29,0.3)] active:translate-y-0 active:scale-95"
              >
                Trải nghiệm miễn phí 14 ngày
              </button>
            </div>

            {/* Plan 3 */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#e4d2bf] bg-[#fbf6ef] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#936652]">
                  ĐẠI TỘC TRƯỜNG TỒN
                </span>
                <p className="mt-1 text-[12px] text-[#6c5549]">
                  Dành cho toàn bộ dòng họ lớn, nhà thờ tộc
                </p>
                <div className="mt-5">
                  <span className="font-serif text-4xl font-bold text-[#2b1b15]">Trọn đời</span>
                  <span className="mt-0.5 block text-[12px] text-[#856b5f]">1.490.000 đ một lần duy nhất</span>
                </div>

                <ul className="mt-6 space-y-2.5 text-[13px] text-[#685246]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Toàn bộ tính năng cao cấp không giới hạn
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Phục chế ảnh AI không giới hạn số lượng
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Hỗ trợ số hóa gia phả chữ Nôm / Hán cổ chuyên sâu
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#80141d]">✓</span> Tên miền riêng cho dòng tộc & tài liệu in ấn
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="mt-8 w-full rounded-xl border border-[#ceb8a5] bg-[#f5e9dc] py-3 text-[13px] font-bold text-[#80141d] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ede0d1] hover:shadow-xs active:translate-y-0 active:scale-95"
              >
                Liên hệ tư vấn dòng họ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 9: RED CALL TO ACTION BANNER
          ========================================================= */}
      <section className="bg-[#f7eee2] px-5 pb-20 pt-8 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7a121c] to-[#5e0c14] p-10 text-center text-white shadow-2xl ring-1 ring-[#9c1b25] lg:p-14">
            {/* Background subtle ring watermark */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#fedbc5] shadow-sm">
                <span className="material-symbols-outlined text-[26px]">temple_buddhist</span>
              </span>

              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                Đừng để ký ức trăm năm của ông bà phai mờ theo thời gian
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
                Hãy cùng con cháu kiến tạo cuốn gia phả số sống động ngay hôm nay. Chỉ mất 3 phút để bắt đầu không gian thiêng liêng cho dòng tộc.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="rounded-xl bg-[#e7a93a] px-8 py-3.5 text-[14px] font-bold text-[#3e1b10] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d69829] hover:shadow-[0_8px_24px_rgba(231,169,58,0.35)] active:translate-y-0 active:scale-95"
                >
                  Bắt đầu miễn phí ngay
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('cam-nang-nghi-le')}
                  className="rounded-xl border border-white/40 px-7 py-3.5 text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0 active:scale-95"
                >
                  Tìm hiểu thêm quy ước
                </button>
              </div>

              <p className="mt-4 text-[12px] text-white/70">
                Miễn phí khởi tạo vĩnh viễn • Không yêu cầu thẻ tín dụng
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
};