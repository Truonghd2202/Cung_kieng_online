import React, { useState } from 'react';
import type { ScreenType, ClanData } from '@/src/types.ts';

interface FamilySetupScreenProps {
  onNavigate: (screen: ScreenType) => void;
  clanData: ClanData;
}

export const FamilySetupScreen: React.FC<FamilySetupScreenProps> = ({
  onNavigate,
  clanData,
}) => {
  const [activeStep, setActiveStep] = useState<number>(3); // Default to Step 3 matching screenshot

  // Step 3: Ancestor #1 Form State
  const [ancestorName, setAncestorName] = useState('Nguyễn Hữu Trọng');
  const [ancestorTitle, setAncestorTitle] = useState('Thuần Đức Tiên Sinh');
  const [relation, setRelation] = useState<'ong-noi' | 'ba-noi' | 'than-phu' | 'cu-to'>('ong-noi');
  const [isDeceased, setIsDeceased] = useState(true);
  const [birthYear, setBirthYear] = useState('1934');
  const [deathYear, setDeathYear] = useState('12/10/2012');
  const [deathLunarDate, setDeathLunarDate] = useState('27 Tháng 8 Âm Lịch');
  const [canChiDay, setCanChiDay] = useState('Ngày Kỷ Mùi');
  const [worshipHour, setWorshipHour] = useState('Giờ Tỵ (09h - 11h)');
  const [originPlace, setOriginPlace] = useState('Thôn Nguyệt Biểu, Xã Thủy Biểu, Hương Thủy, TT-Huế');
  const [restingPlace, setRestingPlace] = useState('Đồi Thiên An, Phường Thủy Xuân, TP. Huế');

  // Step 4: Before / After Slider Position (0 to 100)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<'classic' | 'sharp_bw' | 'oil'>('classic');

  // Step 6: Incense burning state
  const [incenseLit, setIncenseLit] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleNextStep = () => {
    if (activeStep < 6) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setToastMessage('Đã hoàn tất thiết lập không gian thờ tự! Đang mở Cây Gia Phả...');
      setTimeout(() => {
        onNavigate('cay-pha-he-25d');
      }, 900);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('khoi-tao-gia-toc');
    }
  };

  const stepLabels = [
    { title: '1. THÔNG TIN', sub: 'Cá nhân cơ bản', quick: '1. Hồ sơ cá nhân' },
    { title: '2. VAI VẾ', sub: 'Nhánh & Thứ bậc', quick: '2. Định vị vai vế' },
    { title: '3. KHỞI SINH', sub: 'Thành viên #1', quick: '3. Thêm thành viên #1' },
    { title: '4. PHỤC CHẾ', sub: 'Tải ảnh ký ức', quick: '4. Phục chế ảnh AI' },
    { title: '5. BẢO MẬT', sub: 'Quyền gia tộc', quick: '5. Cấu hình bảo mật' },
    { title: '6. NHẬP MÔN', sub: 'Bàn thờ số Hôm Nay', quick: '6. Bàn thờ Hôm Nay' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7eee2] text-[#2b1b15] selection:bg-[#ecd4c0] selection:text-[#4a1217]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#dec9b6] bg-[#2b1b15] px-5 py-3 text-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[#c9892c]">temple_buddhist</span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================
          TOP FLOW HEADER (Matching screenshot)
          ========================================================= */}
      <header className="border-b border-[#e4d3c2] bg-[#f7eee2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => onNavigate('guest-landing')}
              className="group flex items-center gap-2.5 text-left transition-transform active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#80141d] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <span className="material-symbols-outlined text-[22px]">temple_buddhist</span>
              </span>
              <span className="flex flex-col">
                <span className="font-serif text-[18px] sm:text-[19px] font-bold leading-tight tracking-tight text-[#80141d]">
                  Thích Cúng Kiếng
                </span>
                <span className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-[#80141d]/90">
                  DI SẢN & KÝ ỨC GIA TỘC
                </span>
              </span>
            </button>
          </div>

          {/* Flow Steps: Badge | Step 1 | Step 2 | Step 3 (ACTIVE) */}
          <div className="hidden items-center justify-center gap-3 sm:flex lg:gap-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3 py-1 text-[11px] font-medium text-[#715b50]">
              <span className="material-symbols-outlined text-[14px] text-[#1b6b3e]">check</span>
              <span>Khởi Tạo Không Gian Phụng Thờ</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('chon-khong-gian')}
                className="px-3 py-1 text-[12px] font-medium text-[#543e34] hover:text-[#80141d] transition-colors"
              >
                Chọn Không Gian
              </button>

              <button
                type="button"
                onClick={() => onNavigate('khoi-tao-gia-toc')}
                className="px-3 py-1 text-[12px] font-medium text-[#543e34] hover:text-[#80141d] transition-colors"
              >
                Khởi Tạo Gia Tộc
              </button>

              <span className="rounded-full bg-[#80141d] px-4 py-1.5 text-[12px] font-bold text-white shadow-xs">
                Thiết Lập Gia Đình
              </span>
            </div>
          </div>

          {/* Right Status & Avatar */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <span className="block text-[11.5px] font-bold text-[#2b1b15]">Tộc Trưởng Chuẩn Bị</span>
              <span className="flex items-center justify-end gap-1 text-[10px] text-[#1b6b3e] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1b6b3e] animate-pulse" />
                <span>Trực tuyến</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('ho-so-ca-nhan')}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#80141d] text-white shadow-xs hover:bg-[#680f16] transition-colors"
              title="Tài khoản gia tộc"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN CONTENT AREA
          ========================================================= */}
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-[1200px] space-y-5">
          {/* STEPPER BANNER 1: TIẾN TRÌNH NHẬP MÔN GIA PHẢ */}
          <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
              <span className="flex items-center gap-2 font-bold text-[#80141d] uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-[#80141d]" />
                TIẾN TRÌNH NHẬP MÔN GIA PHẢ
              </span>
              <span className="font-medium text-[#715b50]">
                <strong className="text-[#80141d] font-bold">
                  {Math.round((activeStep / 6) * 100)}%
                </strong>{' '}
                Bước {activeStep}/6 • {activeStep === 3 ? 'Khởi sinh cội nguồn' : stepLabels[activeStep - 1]?.sub}
              </span>
            </div>

            {/* Progress Bar (Dual Color) */}
            <div className="h-1.5 w-full rounded-full bg-[#ebdcd0] overflow-hidden">
              <div
                className="h-full bg-[#80141d] transition-all duration-300 rounded-full"
                style={{ width: `${(activeStep / 6) * 100}%` }}
              />
            </div>

            {/* 6 Step Nodes */}
            <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-6">
              {stepLabels.map((s, idx) => {
                const num = idx + 1;
                const isPassed = num < activeStep;
                const isCurrent = num === activeStep;

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setActiveStep(num)}
                    className={`flex items-center gap-2 rounded-xl p-2 text-left transition-all ${
                      isCurrent
                        ? 'border border-[#dec9b6] bg-[#faefe3] shadow-2xs'
                        : isPassed
                        ? 'hover:bg-[#f5ece2]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        isPassed
                          ? 'bg-[#1b6b3e] text-white'
                          : isCurrent
                          ? 'bg-[#80141d] text-white shadow-xs'
                          : 'border border-[#dec9b6] bg-[#f5ece2] text-[#715b50]'
                      }`}
                    >
                      {isPassed ? (
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      ) : isCurrent ? (
                        <span className="material-symbols-outlined text-[14px]">person_add</span>
                      ) : (
                        num
                      )}
                    </div>
                    <div className="truncate">
                      <strong className={`block text-[11px] truncate ${isCurrent ? 'text-[#80141d]' : 'text-[#2b1b15]'}`}>
                        {s.title}
                      </strong>
                      <span className="block text-[10px] text-[#715b50] truncate">
                        {s.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEPPER BANNER 2: CHUYỂN BƯỚC DUYỆT QUICK PILLS */}
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#dec9b6] bg-[#f8ede2] px-4 py-2 text-[11.5px] shadow-2xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#80141d]">
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              CHUYỂN BƯỚC DUYỆT:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {stepLabels.map((s, idx) => {
                const num = idx + 1;
                const isCurrent = num === activeStep;

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setActiveStep(num)}
                    className={`rounded-lg px-3 py-1 font-medium transition-all ${
                      isCurrent
                        ? 'bg-[#80141d] text-white font-bold shadow-xs'
                        : 'text-[#543e34] hover:bg-[#f5ece2] hover:text-[#80141d]'
                    }`}
                  >
                    {s.quick}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================
              MAIN STEP 3 CONTENT (Matching screenshot)
              ========================================================= */}
          {activeStep === 3 && (
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              {/* LEFT COLUMN: FORM (~65% width = 8 cols) */}
              <div className="lg:col-span-8 rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-6 sm:p-8 shadow-sm space-y-6">
                {/* Header */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#80141d]">
                      <span className="material-symbols-outlined text-[14px]">stars</span>
                      BƯỚC 3 TRONG 6
                    </span>

                    <button
                      type="button"
                      onClick={() => setToastMessage('Đã mở công cụ phân nhánh phả hệ cội nguồn.')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#dec9b6] bg-[#f5ece2] px-3 py-1 text-[11px] font-bold text-[#80141d] hover:bg-[#ebdcd0] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[15px]">account_tree</span>
                      <span>Tạo Gốc Phả Hệ</span>
                    </button>
                  </div>

                  <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#80141d]">
                    Khởi Sinh Cội Nguồn – Thêm Người Thân Đầu Tiên
                  </h1>

                  <p className="text-[12.5px] leading-relaxed text-[#715b50]">
                    Hãy bắt đầu với ông bà, cha mẹ hoặc người có vai vế cao nhất mà bạn nắm rõ thông tin để tạo nhánh rễ đầu tiên.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  {/* Row 1: Họ tên khai sinh & Tên tự */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11.5px]">
                        <label className="font-bold text-[#2b1b15]">
                          Họ và tên khai sinh <span className="text-[#80141d]">*</span>
                        </label>
                        <span className="text-[10.5px] text-[#8a6f62]">Chính danh theo bộ bạ</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={ancestorName}
                          onChange={(e) => setAncestorName(e.target.value)}
                          placeholder="VD: Nguyễn Hữu Trọng"
                          className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 pl-3.5 pr-9 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#a07a68]">
                          badge
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11.5px]">
                        <label className="font-bold text-[#2b1b15]">
                          Tên tự / Tên hèm / Hiệu
                        </label>
                        <span className="text-[10.5px] text-[#8a6f62]">Truy phong truyền thống</span>
                      </div>
                      <input
                        type="text"
                        value={ancestorTitle}
                        onChange={(e) => setAncestorTitle(e.target.value)}
                        placeholder="VD: Thuần Đức Tiên Sinh"
                        className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all font-serif"
                      />
                    </div>
                  </div>

                  {/* Row 2: Mối quan hệ với bạn */}
                  <div className="space-y-2">
                    <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                      Mối quan hệ với bạn (Tộc Trưởng khởi tạo) <span className="text-[#80141d]">*</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {/* Ong noi */}
                      <button
                        type="button"
                        onClick={() => setRelation('ong-noi')}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 px-2 text-center transition-all ${
                          relation === 'ong-noi'
                            ? 'border-[#80141d] bg-[#80141d] text-white shadow-xs'
                            : 'border-[#dec9b6] bg-[#f8ede2] text-[#543e34] hover:bg-[#faefe3]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">elderly</span>
                        <span className="text-[12px] font-bold">Ông Nội (Cụ Ông)</span>
                      </button>

                      {/* Ba noi */}
                      <button
                        type="button"
                        onClick={() => setRelation('ba-noi')}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 px-2 text-center transition-all ${
                          relation === 'ba-noi'
                            ? 'border-[#80141d] bg-[#80141d] text-white shadow-xs'
                            : 'border-[#dec9b6] bg-[#f8ede2] text-[#543e34] hover:bg-[#faefe3]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">elderly_woman</span>
                        <span className="text-[12px] font-bold">Bà Nội (Cụ Bà)</span>
                      </button>

                      {/* Than phu */}
                      <button
                        type="button"
                        onClick={() => setRelation('than-phu')}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 px-2 text-center transition-all ${
                          relation === 'than-phu'
                            ? 'border-[#80141d] bg-[#80141d] text-white shadow-xs'
                            : 'border-[#dec9b6] bg-[#f8ede2] text-[#543e34] hover:bg-[#faefe3]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">man</span>
                        <span className="text-[12px] font-bold">Thân Phụ (Cha)</span>
                      </button>

                      {/* Cu Thuy To */}
                      <button
                        type="button"
                        onClick={() => setRelation('cu-to')}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 px-2 text-center transition-all ${
                          relation === 'cu-to'
                            ? 'border-[#80141d] bg-[#80141d] text-white shadow-xs'
                            : 'border-[#dec9b6] bg-[#f8ede2] text-[#543e34] hover:bg-[#faefe3]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">groups</span>
                        <span className="text-[12px] font-bold">Cụ Thủy Tổ / Khác</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 3: Hiện trạng của người thân */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[24px] text-[#80141d]">
                        vital_signs
                      </span>
                      <div>
                        <strong className="block text-[12px] font-bold text-[#2b1b15]">
                          Hiện trạng của người thân
                        </strong>
                        <span className="text-[11px] text-[#715b50]">
                          Để chuẩn bị văn khấn hoặc nhắc giỗ phụng thờ tương ứng
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center rounded-xl border border-[#dec9b6] bg-white p-1">
                      <button
                        type="button"
                        onClick={() => setIsDeceased(true)}
                        className={`rounded-lg px-3 py-1.5 text-[11.5px] font-bold transition-all ${
                          isDeceased
                            ? 'bg-[#80141d] text-white shadow-2xs'
                            : 'text-[#543e34] hover:text-[#80141d]'
                        }`}
                      >
                        Đã tạ thế (Hương Hỏa)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsDeceased(false)}
                        className={`rounded-lg px-3 py-1.5 text-[11.5px] font-bold transition-all ${
                          !isDeceased
                            ? 'bg-[#80141d] text-white shadow-2xs'
                            : 'text-[#543e34] hover:text-[#80141d]'
                        }`}
                      >
                        Còn sống
                      </button>
                    </div>
                  </div>

                  {/* Row 4: Năm sinh & Năm mất */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11.5px]">
                        <label className="font-bold text-[#2b1b15]">
                          Năm sinh (Dương lịch hoặc Âm lịch)
                        </label>
                        <span className="text-[10.5px] font-bold text-[#80141d]">Giáp Tuất 1934</span>
                      </div>
                      <input
                        type="text"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        placeholder="VD: 1934"
                        className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11.5px]">
                        <label className="font-bold text-[#2b1b15]">
                          Năm mất (Hưởng thọ 78 tuổi)
                        </label>
                        <span className="text-[10.5px] font-bold text-[#80141d]">Nhâm Thìn 2012</span>
                      </div>
                      <input
                        type="text"
                        value={deathYear}
                        onChange={(e) => setDeathYear(e.target.value)}
                        placeholder="VD: 12/10/2012"
                        className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 5: Lịch Giỗ Chính Thức (Tế Tự Hàng Năm) */}
                  <div className="rounded-2xl border border-[#dec9b6] bg-[#f5ece2] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[12px] font-bold text-[#80141d]">
                        <span className="material-symbols-outlined text-[17px]">candle</span>
                        <span>Lịch Giỗ Chính Thức (Tế Tự Hàng Năm)</span>
                      </div>
                      <span className="rounded-full bg-[#faefe3] border border-[#dec9b6] px-2.5 py-0.5 text-[10px] font-bold text-[#80141d]">
                        Tự động báo trước 7 ngày
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-[#dec9b6] bg-white p-3">
                        <span className="block text-[10.5px] text-[#715b50]">Ngày Âm Lịch</span>
                        <strong className="block text-[13px] font-bold text-[#2b1b15]">
                          {deathLunarDate}
                        </strong>
                      </div>

                      <div className="rounded-xl border border-[#dec9b6] bg-white p-3">
                        <span className="block text-[10.5px] text-[#715b50]">Can Chi Ngày</span>
                        <strong className="block text-[13px] font-bold text-[#2b1b15]">
                          {canChiDay}
                        </strong>
                      </div>

                      <div className="rounded-xl border border-[#dec9b6] bg-white p-3">
                        <span className="block text-[10.5px] text-[#715b50]">Giờ Cúng Truyền Thống</span>
                        <strong className="block text-[13px] font-bold text-[#2b1b15]">
                          {worshipHour}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Row 6: Nguyên quán & Nơi an nghỉ */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                        Nguyên quán / Quê hương gốc
                      </label>
                      <input
                        type="text"
                        value={originPlace}
                        onChange={(e) => setOriginPlace(e.target.value)}
                        placeholder="VD: Thôn Nguyệt Biểu, Xã Thủy Biểu..."
                        className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[12.5px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                        Nơi an nghỉ (Mộ phần / Từ đường)
                      </label>
                      <input
                        type="text"
                        value={restingPlace}
                        onChange={(e) => setRestingPlace(e.target.value)}
                        placeholder="VD: Đồi Thiên An, Phường Thủy Xuân, TP. Huế"
                        className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[12.5px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SIDEBAR PREVIEW (~35% width = 4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                {/* Preview Card 1: Chân Dung & Bài Vị Tiền Nhân */}
                <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#c9892c]/20 border border-[#c9892c]/40 px-3 py-1 text-[10.5px] font-bold text-[#8a5714]">
                      Thế Hệ Thứ 7 (Đời Ông)
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-[#c9892c]">
                      verified
                    </span>
                  </div>

                  {/* Circular Portrait with Flame/Incense badge */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#c9892c]/30 shadow-md">
                        <img
                          src="/images/ancestor_portrait.jpg"
                          alt={ancestorName}
                          className="h-full w-full object-cover filter sepia-[0.3]"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#80141d] text-white shadow-md">
                        <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                      </div>
                    </div>

                    <h2 className="mt-3 font-serif text-xl font-bold text-[#80141d]">
                      {ancestorName}
                    </h2>
                    <span className="font-serif text-[12px] italic text-[#6c5549]">
                      {ancestorTitle}
                    </span>
                  </div>

                  {/* Sinh hạ & Tạ thế Box */}
                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#dec9b6] bg-[#f5ece2] p-2.5 text-center">
                    <div>
                      <span className="block text-[10px] text-[#715b50]">Sinh hạ:</span>
                      <strong className="block text-[13px] font-bold text-[#2b1b15]">
                        {birthYear}
                      </strong>
                      <span className="text-[10px] text-[#80141d] font-semibold">Giáp Tuất</span>
                    </div>

                    <div className="border-l border-[#dec9b6]">
                      <span className="block text-[10px] text-[#715b50]">Tạ thế:</span>
                      <strong className="block text-[13px] font-bold text-[#2b1b15]">
                        2012
                      </strong>
                      <span className="text-[10px] text-[#80141d] font-semibold">Nhâm Thìn</span>
                    </div>
                  </div>

                  {/* Location & Death Anniversary Info */}
                  <div className="space-y-1.5 text-[11.5px] text-[#543e34]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#80141d]">
                        location_on
                      </span>
                      <span className="truncate">Nguyệt Biểu, Hương Thủy, TT-Huế</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#80141d]">
                        calendar_month
                      </span>
                      <span>Ngày giỗ: 27/8 Âm lịch</span>
                    </div>
                  </div>
                </div>

                {/* Preview Card 2: Mẹo nhập liệu gia phả */}
                <div className="rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-4 text-[11.5px] text-[#543e34] space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2 font-bold text-[#80141d]">
                    <span className="material-symbols-outlined text-[17px] text-[#c9892c]">
                      lightbulb
                    </span>
                    <span>Mẹo nhập liệu gia phả</span>
                  </div>
                  <p className="leading-relaxed text-[#715b50]">
                    Bạn có thể cập nhật và bổ sung nhánh phả hệ chi tiết hơn bất kỳ lúc nào sau khi vào trang chính. Trước mắt chỉ cần xác lập 1-2 vị trí tiền bối then chốt.
                  </p>
                </div>

                {/* Preview Card 3: Cấu Trúc Kết Nối Tức Thì (Mini Tree Diagram) */}
                <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4 shadow-2xs space-y-3">
                  <span className="block text-[10.5px] font-bold uppercase tracking-wider text-[#80141d]">
                    CẤU TRÚC KẾT NỐI TỨC THÌ:
                  </span>

                  <div className="space-y-2 text-center">
                    {/* Top Parent Node */}
                    <div className="mx-auto inline-block rounded-xl bg-[#80141d] px-4 py-2 text-[12px] font-bold text-white shadow-2xs">
                      Cụ {ancestorName} (Đời 7)
                    </div>

                    {/* Connecting Branch Line */}
                    <div className="relative mx-auto h-4 w-32 border-b-2 border-l-2 border-r-2 border-[#dec9b6]">
                      <div className="absolute left-1/2 -top-2 h-2 w-0.5 -translate-x-1/2 bg-[#dec9b6]" />
                    </div>

                    {/* Children Row */}
                    <div className="flex items-center justify-center gap-3 pt-1">
                      <div className="rounded-lg border border-[#dec9b6] bg-[#f5ece2] px-3 py-1.5 text-[11px] font-medium text-[#715b50]">
                        Bác Cả
                      </div>
                      <div className="rounded-lg border border-[#c9892c] bg-[#faefe3] px-3 py-1.5 text-[11.5px] font-bold text-[#8a5714] shadow-2xs">
                        Nguyễn Phúc Vĩnh Khang (Bạn)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Hồ sơ cá nhân */}
          {activeStep === 1 && (
            <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-[#dec9b6] pb-3">
                <span className="text-[11px] font-bold text-[#80141d]">BƯỚC 1 / 6</span>
                <h2 className="font-serif text-2xl font-bold text-[#80141d] mt-1">
                  Hồ Sơ Định Danh Người Khởi Lập
                </h2>
                <p className="text-[12.5px] text-[#715b50]">
                  Ghi chép thông tin cá nhân của bạn để định vị vị trí kết nối ban đầu trên cây phả hệ.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">Họ và tên đầy đủ</label>
                  <input
                    type="text"
                    defaultValue="Nguyễn Phúc Vĩnh Khang"
                    className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] text-[#2b1b15]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">Năm sinh (Âm / Dương)</label>
                  <input
                    type="text"
                    defaultValue="1988 (Mậu Thìn)"
                    className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] text-[#2b1b15]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">Nơi cư ngụ hiện nay</label>
                  <input
                    type="text"
                    defaultValue="Ba Đình, Hà Nội"
                    className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] text-[#2b1b15]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">Nghề nghiệp / Học vị</label>
                  <input
                    type="text"
                    defaultValue="Kỹ sư công nghệ"
                    className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] text-[#2b1b15]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Định vị vai vế */}
          {activeStep === 2 && (
            <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-[#dec9b6] pb-3">
                <span className="text-[11px] font-bold text-[#80141d]">BƯỚC 2 / 6</span>
                <h2 className="font-serif text-2xl font-bold text-[#80141d] mt-1">
                  Định Vị Vai Vế Trong Huyết Thống
                </h2>
                <p className="text-[12.5px] text-[#715b50]">
                  Lựa chọn nhánh gia đình và đời thứ để hệ thống tự động sắp xếp sơ đồ cây thế thứ.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-4 space-y-2">
                  <strong className="block text-[13px] font-bold text-[#2b1b15]">Đời thứ mấy trong họ?</strong>
                  <select className="w-full rounded-xl border border-[#dec9b6] bg-white p-2.5 text-[12.5px]">
                    <option>Đời thứ 8 (Hậu duệ trực hệ)</option>
                    <option>Đời thứ 9</option>
                    <option>Đời thứ 10</option>
                    <option>Đời thứ 11</option>
                  </select>
                </div>
                <div className="rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-4 space-y-2">
                  <strong className="block text-[13px] font-bold text-[#2b1b15]">Vị trí trong anh em</strong>
                  <select className="w-full rounded-xl border border-[#dec9b6] bg-white p-2.5 text-[12.5px]">
                    <option>Con thứ hai</option>
                    <option>Con trưởng</option>
                    <option>Con út</option>
                  </select>
                </div>
                <div className="rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-4 space-y-2">
                  <strong className="block text-[13px] font-bold text-[#2b1b15]">Trách nhiệm gia phong</strong>
                  <select className="w-full rounded-xl border border-[#dec9b6] bg-white p-2.5 text-[12.5px]">
                    <option>Đảm trách hương hỏa gia đình</option>
                    <option>Hỗ trợ ban trị sự tộc</option>
                    <option>Thành viên đóng góp ký ức</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Phục Chế Ảnh AI */}
          {activeStep === 4 && (
            <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-[#dec9b6] pb-3">
                <span className="text-[11px] font-bold text-[#80141d]">BƯỚC 4 / 6: CÔNG NGHỆ AI THUẦN VIỆT</span>
                <h2 className="font-serif text-2xl font-bold text-[#80141d] mt-1">
                  Phục Chế &amp; Tái Lập Sắc Diện Ảnh Cổ
                </h2>
                <p className="text-[12.5px] text-[#715b50]">
                  Kéo thanh trượt để so sánh ảnh gốc bị ố vàng với chân dung phục chế sắc nét bằng trí tuệ nhân tạo.
                </p>
              </div>

              {/* Slider */}
              <div className="relative max-w-xl mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-[#dec9b6] select-none">
                <div
                  className="relative aspect-[4/3] w-full bg-[#2b1b15] cursor-ew-resize overflow-hidden"
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                >
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Ảnh phục chế"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src="/images/ancestor_portrait.jpg"
                      alt="Ảnh gốc xưa"
                      className="absolute inset-y-0 left-0 max-w-none h-full object-cover sepia-[0.8] contrast-90 brightness-90 filter"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="absolute top-3 left-3 bg-black/60 px-2.5 py-0.5 rounded-full text-[10px] text-white">
                      Ảnh Gốc Xưa (1955)
                    </div>
                  </div>

                  <div
                    className="absolute inset-y-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#80141d] shadow-md flex items-center justify-center font-bold text-[14px]">
                      <span className="material-symbols-outlined text-[16px]">drag_indicator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Cấu hình bảo mật */}
          {activeStep === 5 && (
            <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-[#dec9b6] pb-3">
                <span className="text-[11px] font-bold text-[#80141d]">BƯỚC 5 / 6</span>
                <h2 className="font-serif text-2xl font-bold text-[#80141d] mt-1">
                  Cấu Hình Bảo Mật &amp; Mã Hóa Không Gian
                </h2>
                <p className="text-[12.5px] text-[#715b50]">
                  Bảo vệ tư liệu phả hệ khép kín, phân quyền xem và chỉnh sửa nghiêm ngặt theo gia quy.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-4 space-y-2">
                  <strong className="block text-[13px] font-bold text-[#2b1b15]">Mã hóa 2 lớp (2FA)</strong>
                  <p className="text-[11.5px] text-[#715b50]">Yêu cầu xác nhận qua OTP mỗi khi con cháu truy cập vào danh bạ và ảnh bài vị.</p>
                </div>
                <div className="rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-4 space-y-2">
                  <strong className="block text-[13px] font-bold text-[#2b1b15]">Quyền phê duyệt sửa đổi</strong>
                  <p className="text-[11.5px] text-[#715b50]">Chỉ Trưởng tộc hoặc người được ủy quyền mới có quyền xác nhận thành viên mới.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Bàn thờ số Hôm Nay */}
          {activeStep === 6 && (
            <div className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-6 sm:p-8 shadow-sm space-y-6 text-center">
              <div className="border-b border-[#dec9b6] pb-3">
                <span className="text-[11px] font-bold text-[#80141d]">BƯỚC 6 / 6: KHÔNG GIAN TÂM LINH SỐ</span>
                <h2 className="font-serif text-2xl font-bold text-[#80141d] mt-1">
                  Nhập Môn Bàn Thờ Số &amp; Dâng Hương Tri Ân
                </h2>
                <p className="text-[12.5px] text-[#715b50]">
                  Không gian phụng thờ ảo trang nghiêm dành cho các thế hệ con cháu ở xa.
                </p>
              </div>

              <div className="max-w-md mx-auto rounded-3xl border border-[#dec9b6] bg-[#f8ede2] p-6 space-y-4">
                <span className="material-symbols-outlined text-[48px] text-[#c9892c]">
                  candle
                </span>
                <h3 className="font-serif text-xl font-bold text-[#80141d]">
                  Bàn Thờ Gia Tiên Đại Tộc
                </h3>
                <p className="text-[12px] text-[#715b50]">
                  Nhấn dâng một nén tâm hương tri ân công đức tổ tiên trước khi bước vào không gian chính.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIncenseLit(true);
                    setToastMessage('Đã dâng 3 nén hương trầm thanh tịnh!');
                  }}
                  className={`rounded-xl px-6 py-2.5 text-[13px] font-bold transition-all ${
                    incenseLit
                      ? 'bg-[#1b6b3e] text-white'
                      : 'bg-[#80141d] text-white hover:bg-[#680f16]'
                  }`}
                >
                  {incenseLit ? 'Đã Thắp Hương ✓' : 'Dâng Hương Tri Ân'}
                </button>
              </div>
            </div>
          )}

          {/* BOTTOM ACTION BAR */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#dec9b6] bg-[#f8ede2] px-5 py-3 text-[12.5px] font-bold text-[#543e34] hover:bg-[#faefe3] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>
                {activeStep === 1
                  ? 'Quay lại Khởi tạo gia tộc'
                  : `Quay Lại Bước ${activeStep - 1}: ${stepLabels[activeStep - 2]?.sub}`}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('cay-pha-he-25d')}
              className="text-[12px] text-[#715b50] hover:text-[#80141d] underline transition-colors"
            >
              Tạm bỏ qua bước này, bổ sung sau
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#80141d] px-7 py-3 text-[13px] font-bold text-white shadow-md hover:bg-[#680f16] hover:shadow-lg active:scale-95 transition-all"
            >
              <span>
                {activeStep === 6
                  ? 'Hoàn Tất Nhập Môn Gia Phả'
                  : activeStep === 3
                  ? 'Lưu & Tiếp Tục Sang Bước 4: Tải Ảnh Cũ'
                  : `Tiếp tục Sang Bước ${activeStep + 1}`}
              </span>
              <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      {/* =========================================================
          BOTTOM AUTH FOOTER (Matching screenshot)
          ========================================================= */}
      <footer className="border-t border-[#e4d3c2] bg-[#f7eee2] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-[11.5px] text-[#715b50] md:flex-row">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-[#80141d]">shield</span>
            <div>
              <strong className="text-[#2b1b15]">Bảo mật gia phả &amp; dữ liệu hương hỏa tuyệt đối</strong>
              <span className="ml-1 text-[#8a6f62]">— Cam kết lưu trữ vĩnh cửu theo gia quy &amp; thuần phong mỹ tục Việt Nam</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <span className="flex items-center gap-1 text-[#80141d]">
              <span className="material-symbols-outlined text-[14px]">call</span>
              1900 8888
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              hotro@thichcungkieng.vn
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Mã hóa chuẩn gia tộc
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
