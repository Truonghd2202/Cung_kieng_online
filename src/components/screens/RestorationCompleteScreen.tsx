import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface RestorationCompleteScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RestorationCompleteScreen: React.FC<RestorationCompleteScreenProps> = ({ onNavigate }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState<'slider' | 'side' | 'full'>('slider');
  const [zoomLevel, setZoomLevel] = useState<100 | 200 | 400>(100);
  const [storageTarget, setStorageTarget] = useState<'tree' | 'album'>('tree');
  const [displayMode, setDisplayMode] = useState<'altar' | 'commemorative'>('altar');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSaveToArchive = () => {
    showToast('Đã lưu trữ vĩnh viễn vào Kho Ký Ức & Cập nhật Cây Phả Hệ thành công!');
    setTimeout(() => {
      onNavigate('kho-ky-uc');
    }, 1800);
  };

  const handleDownload4K = () => {
    showToast('Đã khởi tạo gói ảnh thờ 4K chuẩn in ấn phụng thờ (3840 × 5120 px - Định dạng TIFF không nén).');
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#fcf8f2] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Save Success Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#2b1b15] text-[#fcf8f2] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-bounce">
          <span className="material-symbols-outlined text-[#e8b56f] text-[20px]">task_alt</span>
          <span className="text-[12.5px] font-medium leading-snug">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* =========================================================
            BREADCRUMB & TOP STATUS BAR
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] border-b border-[#dec9b6]/60 pb-3">
          <div className="flex items-center gap-2 text-[#6b584d] flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">account_balance</span>
              <span>Kho Ký Ức Gia Tộc</span>
            </button>
            <span className="text-[#dec9b6]">/</span>
            <button
              type="button"
              onClick={() => onNavigate('phuc-che-ai')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Công Cụ Phục Chế AI Di Sản
            </button>
            <span className="text-[#dec9b6]">/</span>
            <span className="text-[#80141d] font-mono font-bold">Mã Lưu Trữ #PC-1948-NVPHUC</span>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="px-3 py-1 rounded-full bg-[#faeed9] text-[#734c13] border border-[#c9892c]/30 font-bold text-[10.5px] flex items-center gap-1.5 shadow-2xs">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              BẢO MẬT GIA PHẢ TOÀN TỘC
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-[#80141d] font-semibold bg-[#fae8e6] px-2.5 py-1 rounded-full border border-[#e69894]/40">
              <span className="w-2 h-2 rounded-full bg-[#80141d] animate-pulse"></span>
              Xử lý AI hoàn tất trong 4.2s
            </span>
          </div>
        </div>

        {/* =========================================================
            TITLE HEADER
            ========================================================= */}
        <div className="space-y-1">
          <div className="text-[11px] text-[#80141d] font-bold uppercase tracking-wider">
            BẢO TỒN DI CẢO HÌNH ẢNH • ĐỜI THỨ 9 CHI PHÁI 2
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#80141d] tracking-tight">
            Hoàn Tất Phục Chế Ảnh Ký Ức Tiền Nhân
          </h1>
          <p className="text-[13px] text-[#6b584d] max-w-4xl leading-relaxed">
            Đối chiếu kết quả phục hồi chi tiết. Kéo thanh trượt để cảm nhận sự chuyển mình qua hơn nửa thế kỷ giữa bản gốc giấy xưa và chất lượng số 4K chu sa cổ truyền.
          </p>
        </div>

        {/* =========================================================
            MAIN 2-COLUMN GRID (7 COLS / 5 COLS)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-1 items-start">
          {/* LEFT COLUMN: COMPARISON CANVAS & METRICS (7 COLS) */}
          <div className="lg:col-span-7 space-y-5">
            {/* View Mode & Zoom Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] bg-[#fdfaf5] p-2.5 rounded-2xl border border-[#dec9b6] shadow-2xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setViewMode('slider')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                    viewMode === 'slider'
                      ? 'bg-[#80141d] text-white shadow-xs'
                      : 'text-[#6b584d] hover:text-[#80141d] hover:bg-[#faefe3]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Xem thanh trượt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('side')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                    viewMode === 'side'
                      ? 'bg-[#80141d] text-white shadow-xs'
                      : 'text-[#6b584d] hover:text-[#80141d] hover:bg-[#faefe3]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">view_column</span>
                  <span>Xem song song</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('full')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                    viewMode === 'full'
                      ? 'bg-[#80141d] text-white shadow-xs'
                      : 'text-[#6b584d] hover:text-[#80141d] hover:bg-[#faefe3]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">filter</span>
                  <span>Xem ảnh phục chế trọn vẹn</span>
                </button>
              </div>

              {/* Zoom Buttons for Senior Legibility */}
              <div className="flex items-center gap-1.5 text-[#6b584d]">
                <span className="text-[11px] hidden sm:inline font-medium">Thu phóng cho người cao niên:</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    zoomLevel === 100
                      ? 'bg-[#80141d] text-white'
                      : 'bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-[#2b1b15]'
                  }`}
                >
                  100%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(200)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    zoomLevel === 200
                      ? 'bg-[#80141d] text-white'
                      : 'bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-[#2b1b15]'
                  }`}
                >
                  200%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(400)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    zoomLevel === 400
                      ? 'bg-[#80141d] text-white'
                      : 'bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-[#2b1b15]'
                  }`}
                >
                  400%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  className="p-1 rounded-lg bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-[#2b1b15] cursor-pointer flex items-center justify-center"
                  title="Đặt lại độ phóng"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                </button>
              </div>
            </div>

            {/* Interactive Image Display Area */}
            <div className="bg-[#241c19] rounded-3xl p-3 sm:p-4 border border-[#dec9b6] space-y-3 overflow-hidden shadow-md">
              {viewMode === 'slider' && (
                <div className="relative aspect-[4/5] sm:aspect-[4/5] rounded-2xl overflow-hidden select-none bg-black">
                  {/* Restored Full 4K Image in background */}
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Bản Phục Chế AI 4K"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                  />

                  {/* Damaged Vintage Image clipped to slider percentage */}
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src="/images/ancestor_portrait.jpg"
                      alt="Bản Gốc 1948"
                      style={{
                        transform: `scale(${zoomLevel / 100})`,
                        width: '100%',
                        height: '100%',
                      }}
                      className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-90 sepia-[0.55] max-w-none transition-transform duration-300"
                    />

                    {/* Faux paper folds and cracks on vintage side */}
                    <div className="absolute top-[38%] left-0 right-0 h-[1.5px] bg-white/60 shadow-xs pointer-events-none"></div>
                    <div className="absolute top-[39%] left-0 right-0 h-[1px] bg-black/40 pointer-events-none"></div>
                    <div className="absolute top-[65%] left-0 right-0 h-[1px] bg-white/50 pointer-events-none"></div>

                    {/* Tag Top-Left */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-xs text-white/95 text-[11px] font-medium px-3 py-1 rounded-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                      <span className="material-symbols-outlined text-[14px] text-[#e8b56f]">history</span>
                      <span>Bản Gốc 1948 (Ố vàng &amp; nứt nếp gấp)</span>
                    </div>
                  </div>

                  {/* Tag Top-Right */}
                  <div className="absolute top-4 right-4 bg-[#80141d]/95 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md flex items-center gap-1.5 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#c9892c] animate-pulse"></span>
                    <span>Bản Phục Chế AI 4K (Gấm Chu Sa)</span>
                  </div>

                  {/* Drag Line & Thumb */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] flex items-center justify-center -translate-x-1/2 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#80141d] text-white shadow-xl flex items-center justify-center border-2 border-white pointer-events-auto">
                      <span className="material-symbols-outlined text-[16px]">code</span>
                    </div>
                  </div>

                  {/* Invisible Range Slider for Smooth Interaction */}
                  <input
                    type="range"
                    min="2"
                    max="98"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    aria-label="Kéo thanh trượt để so sánh ảnh gốc và ảnh phục chế"
                  />
                </div>
              )}

              {viewMode === 'side' && (
                <div className="grid grid-cols-2 gap-3 aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden">
                  <div className="relative rounded-xl overflow-hidden bg-black">
                    <img
                      src="/images/ancestor_portrait.jpg"
                      alt="Ảnh gốc 1948"
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 sepia-[0.55]"
                    />
                    <div className="absolute top-[40%] left-0 right-0 h-[1.5px] bg-white/60"></div>
                    <span className="absolute bottom-2.5 left-2.5 bg-black/80 text-white text-[10.5px] px-2.5 py-1 rounded-md border border-white/20">
                      Bản Gốc 1948
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-black">
                    <img
                      src="/images/ancestor_portrait.jpg"
                      alt="Ảnh phục chế 4K"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-[#80141d] text-white text-[10.5px] px-2.5 py-1 rounded-md font-bold shadow-xs">
                      Bản Phục Chế AI 4K
                    </span>
                  </div>
                </div>
              )}

              {viewMode === 'full' && (
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black">
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Trọn vẹn phục chế 4K"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <span className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg border border-white/20">
                    Độ nét tối đa 4K Chu Sa Cổ Truyền
                  </span>
                </div>
              )}

              {/* Sub-footnote bar below canvas */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 py-1 text-[11.5px] text-white/80">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#e8b56f] font-bold">—</span>
                  Nhấn giữ và kéo thanh trượt sang trái hoặc phải để so sánh.
                </span>
                <span className="text-[#e8b56f] font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  Chuẩn hóa màu gấm chu sa theo điển tích triều Nguyễn
                </span>
              </div>
            </div>

            {/* 3 Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between text-[#6b584d] text-[11px]">
                  <span>Độ Phân Giải Xuất Bản</span>
                  <span className="material-symbols-outlined text-[#80141d] text-[18px]">aspect_ratio</span>
                </div>
                <div className="font-serif font-bold text-xl text-[#2b1b15]">3840 × 5120</div>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#734c13] bg-[#fbf4eb] border border-[#dec9b6] px-2 py-0.5 rounded-md leading-normal">
                    <span className="material-symbols-outlined text-[12px] text-[#80141d]">temple_buddhist</span>
                    Chuẩn in ấn phụng thờ khổ lớn A2/A3 không vỡ hạt
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between text-[#6b584d] text-[11px]">
                  <span>Cải Thiện Độ Nét</span>
                  <span className="material-symbols-outlined text-[#80141d] text-[18px]">auto_fix_high</span>
                </div>
                <div className="font-serif font-bold text-xl text-[#80141d]">+340%</div>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#734c13] bg-[#fbf4eb] border border-[#dec9b6] px-2 py-0.5 rounded-md leading-normal">
                    <span className="material-symbols-outlined text-[12px] text-[#80141d]">check_circle</span>
                    Khử sạch 8 vết rách nứt, loại bỏ đốm mốc thời gian
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between text-[#6b584d] text-[11px]">
                  <span>Trung Thực Nhân Diện</span>
                  <span className="material-symbols-outlined text-[#80141d] text-[18px]">history_edu</span>
                </div>
                <div className="font-serif font-bold text-xl text-[#80141d]">99.4%</div>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#734c13] bg-[#fbf4eb] border border-[#dec9b6] px-2 py-0.5 rounded-md leading-normal">
                    <span className="material-symbols-outlined text-[12px] text-[#80141d]">pin_drop</span>
                    Khớp chuẩn tỷ lệ xương mặt và nhân trắc học cội nguồn
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONFIRMATION & STORAGE FORM (5 COLS) */}
          <div className="lg:col-span-5 space-y-5">
            {/* CARD 1: XÁC NHẬN & LƯU TRỮ GIA PHẢ */}
            <div className="bg-white rounded-3xl p-6 border border-[#dec9b6] shadow-2xs space-y-5">
              <div className="space-y-1.5">
                <h2 className="font-serif font-bold text-lg text-[#80141d] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#80141d]">bookmark</span>
                  <span>Xác Nhận &amp; Lưu Trữ Gia Phả</span>
                </h2>
                <p className="text-[12px] text-[#6b584d] leading-relaxed">
                  Tác phẩm phục chế sẽ được lưu vĩnh viễn trong kho số hóa của Đại Tộc Nguyễn Phục Anh với mã băm dữ liệu chống làm giả.
                </p>
              </div>

              {/* Target Space Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#80141d] uppercase tracking-wide block">
                  Không Gian Lưu Trữ Mục Tiêu
                </label>
                <div className="space-y-2.5">
                  <label
                    onClick={() => setStorageTarget('tree')}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                      storageTarget === 'tree'
                        ? 'border-[#80141d] bg-[#faefe3] text-[#2b1b15]'
                        : 'border-[#ebdcd0] bg-[#fdfaf5] hover:bg-[#faefe3]/50 text-[#2b1b15]'
                    }`}
                  >
                    <div className="pt-0.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${storageTarget === 'tree' ? 'border-[#80141d]' : 'border-[#8a6f62]'}`}>
                        {storageTarget === 'tree' && <div className="w-2 h-2 rounded-full bg-[#80141d]"></div>}
                      </div>
                    </div>
                    <div>
                      <span className="font-serif font-bold text-[13px] block text-[#2b1b15]">
                        Gắn trực tiếp vào Cây Gia Phả
                      </span>
                      <span className="text-[11.5px] text-[#6b584d] leading-tight block mt-0.5">
                        Cụ Cố Nguyễn Văn Phúc (Đời thứ 9 - Trưởng phái)
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setStorageTarget('album')}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                      storageTarget === 'album'
                        ? 'border-[#80141d] bg-[#faefe3] text-[#2b1b15]'
                        : 'border-[#ebdcd0] bg-[#fdfaf5] hover:bg-[#faefe3]/50 text-[#2b1b15]'
                    }`}
                  >
                    <div className="pt-0.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${storageTarget === 'album' ? 'border-[#80141d]' : 'border-[#8a6f62]'}`}>
                        {storageTarget === 'album' && <div className="w-2 h-2 rounded-full bg-[#80141d]"></div>}
                      </div>
                    </div>
                    <div>
                      <span className="font-serif font-bold text-[13px] block text-[#2b1b15]">
                        Lưu vào Album Chân Dung Tiền Nhân
                      </span>
                      <span className="text-[11.5px] text-[#6b584d] leading-tight block mt-0.5">
                        Bảo tàng ký ức chung cho tất cả các nhánh phái phụng lãm
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Display Mode Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#80141d] uppercase tracking-wide block">
                  Chế Độ Hiển Thị &amp; Tôn Nghiêm
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setDisplayMode('altar')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                      displayMode === 'altar'
                        ? 'border-[#80141d] bg-[#faefe3]'
                        : 'border-[#ebdcd0] bg-[#fdfaf5] hover:bg-[#faefe3]/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${displayMode === 'altar' ? 'border-[#80141d]' : 'border-[#8a6f62]'}`}>
                        {displayMode === 'altar' && <div className="w-1.5 h-1.5 rounded-full bg-[#80141d]"></div>}
                      </div>
                      <span className="font-serif font-bold text-[12px] text-[#2b1b15]">Ảnh Thờ Chính Thức</span>
                    </div>
                    <p className="text-[10.5px] text-[#6b584d] leading-relaxed pl-5">
                      Dùng trong nghi lễ giỗ chạp và hiển thị trên bàn thờ số
                    </p>
                  </div>

                  <div
                    onClick={() => setDisplayMode('commemorative')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                      displayMode === 'commemorative'
                        ? 'border-[#80141d] bg-[#faefe3]'
                        : 'border-[#ebdcd0] bg-[#fdfaf5] hover:bg-[#faefe3]/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${displayMode === 'commemorative' ? 'border-[#80141d]' : 'border-[#8a6f62]'}`}>
                        {displayMode === 'commemorative' && <div className="w-1.5 h-1.5 rounded-full bg-[#80141d]"></div>}
                      </div>
                      <span className="font-serif font-bold text-[12px] text-[#2b1b15]">Ảnh Kỷ Niệm Dòng Họ</span>
                    </div>
                    <p className="text-[10.5px] text-[#6b584d] leading-relaxed pl-5">
                      Lưu giữ đối chiếu tư liệu, nghiên cứu gia phả
                    </p>
                  </div>
                </div>
              </div>

              {/* Authority Notice Card */}
              <div className="p-3.5 rounded-2xl bg-[#faeed9] border border-[#eed9be] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#734c13] text-[20px] shrink-0 mt-0.5">verified_user</span>
                <div className="text-[11.5px] text-[#5c4a42] leading-relaxed">
                  <span className="font-bold text-[#80141d] block">Quyền Trưởng Tộc Duyệt</span>
                  Thao tác này sẽ cập nhật trực tiếp vào ấn phẩm phả đồ số của 1.240 thành viên trong chi nhánh.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleSaveToArchive}
                  className="w-full py-3.5 rounded-2xl bg-[#80141d] hover:bg-[#681017] text-white font-serif font-bold text-[14px] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Xác Nhận &amp; Lưu Vào Kho Ký Ức</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownload4K}
                    className="w-1/2 py-2.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#80141d]">download</span>
                    <span>Tải ảnh 4K</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('phuc-che-ai')}
                    className="w-1/2 py-2.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#c9892c]">tune</span>
                    <span>Yêu cầu chỉnh thêm</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: CHI TIẾT PHỤC DỰNG VĂN HÓA */}
            <div className="bg-[#fdfaf5] rounded-3xl p-5 border border-[#dec9b6] shadow-2xs space-y-3">
              <h3 className="font-serif font-bold text-[#80141d] text-[14px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#80141d]">auto_awesome</span>
                <span>Chi Tiết Phục Dựng Văn Hóa</span>
              </h3>

              <div className="space-y-2.5 text-[11.5px] text-[#6b584d] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[15px] text-[#c9892c] shrink-0 mt-0.5">radio_button_unchecked</span>
                  <div>
                    <span className="font-bold text-[#2b1b15]">Màu Sắc Áo Tấc: </span>
                    Nhuộm gấm chu sa truyền thống thời Nguyễn, bổ sung họa tiết chữ Thọ chìm ở viền cổ áo.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[15px] text-[#c9892c] shrink-0 mt-0.5">radio_button_unchecked</span>
                  <div>
                    <span className="font-bold text-[#2b1b15]">Khóe Mắt &amp; Nhân Diện: </span>
                    Tôn trọng 100% nếp nhăn đuôi mắt của cụ ở tuổi 82, không làm mịn nhân tạo gây biến dạng diện mạo.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[15px] text-[#c9892c] shrink-0 mt-0.5">radio_button_unchecked</span>
                  <div>
                    <span className="font-bold text-[#2b1b15]">Chứng Chỉ Số AES-256: </span>
                    Đã lưu trữ bản gốc chưa can thiệp song song tại máy chủ bảo tồn dòng họ.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM HERITAGE SECURITY FOOTER BANNER
            ========================================================= */}
        <div className="pt-8 border-t border-[#ebdcd0] space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="space-y-1">
              <div className="font-serif font-bold text-[#80141d] text-[15px]">
                Thích Cúng Kiếng • Bảo Tàng Di Sản Số Dòng Họ
              </div>
              <p className="text-[12px] text-[#6b584d] max-w-2xl leading-relaxed">
                Không gian thiêng liêng gìn giữ gia phả, ký ức hình ảnh và truyền thống văn hóa phụng sự tổ tiên của các dòng họ Việt Nam.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-[12px] text-[#2b1b15] font-medium shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">lock</span>
                <span>Bảo Mật Kép AES-256</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#c9892c]">verified_user</span>
                <span>Quyền Sở Hữu Thuộc Dòng Họ 100%</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">auto_fix_high</span>
                <span>Phục Chế Ảnh Kỹ Thuật Số AI</span>
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#ebdcd0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8a6f62]">
            <div>
              © 2025 Thích Cúng Kiếng. Tôn kính phụng sự đạo nghĩa nguồn cội.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-[#80141d] cursor-pointer">Quy ước bảo tồn gia phong</span>
              <span>•</span>
              <span className="hover:text-[#80141d] cursor-pointer">Chính sách lưu trữ kỷ vật</span>
              <span>•</span>
              <span className="hover:text-[#80141d] cursor-pointer">Hỗ trợ từ Ban Phụng Sự</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
