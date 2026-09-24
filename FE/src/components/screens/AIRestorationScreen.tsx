import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AIRestorationScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AIRestorationScreen: React.FC<AIRestorationScreenProps> = ({ onNavigate }) => {
  // Toggles for AI Restoration Parameters
  const [scratchRepair, setScratchRepair] = useState(true);
  const [denoiseDetail, setDenoiseDetail] = useState(true);
  const [faceReconstruction, setFaceReconstruction] = useState(true);
  const [colorScheme, setColorScheme] = useState<'silk_north' | 'monochrome'>('silk_north');
  const [ethicsConfirmed, setEthicsConfirmed] = useState(true);

  // Credits & Processing State
  const [credits, setCredits] = useState(14);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetDefaults = () => {
    setScratchRepair(true);
    setDenoiseDetail(true);
    setFaceReconstruction(true);
    setColorScheme('silk_north');
    showToast('Đã khôi phục thông số phục chế AI về mặc định.');
  };

  const handleStartRestoration = () => {
    if (!ethicsConfirmed) {
      showToast('Vui lòng xác nhận cam kết đạo đức & bản quyền ký ức!');
      return;
    }
    if (credits <= 0) {
      showToast('Bạn đã hết tín chỉ phục chế. Vui lòng nạp thêm.');
      return;
    }

    setIsProcessing(true);
    showToast('Đang khởi chạy mô hình AI Vi-Heritage v3.2 để phục chế...');

    setTimeout(() => {
      setCredits((prev) => Math.max(0, prev - 1));
      setIsProcessing(false);
      showToast('Phục chế hoàn tất thành công! Đang chuyển đến kết quả...');
      setTimeout(() => {
        onNavigate('hoan-tat-phuc-che');
      }, 1200);
    }, 2000);
  };

  const handleFileSelectMock = () => {
    setSelectedFile('NguyenHuu_An_ChanDung_Scan_1941.tif');
    showToast('Đã tải lên tệp ảnh quét gốc: NguyenHuu_An_ChanDung_Scan_1941.tif (38.4 MB)');
  };

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] py-6 px-4 sm:px-6 lg:px-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2b1b15] text-[#fdf9f4] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c9892c] animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[#c9892c]">verified</span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* =========================================================
            BREADCRUMBS & CREDITS STATUS BAR
            ========================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[12px] text-[#8a6f62]">
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">inventory_2</span>
              <span>Kho Ký Ức &amp; Kỷ Vật</span>
            </button>
            <span>&gt;</span>
            <span className="text-[#80141d] font-bold">Phục Chế Ảnh Tiền Nhân AI</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdeee9] border border-[#f0c2bc] text-[#80141d] text-[11px] font-bold tracking-wide">
            <span className="material-symbols-outlined text-[15px] text-[#c9892c]">toll</span>
            <span>Tín chỉ phục chế: <strong>{credits}</strong></span>
            <span className="text-[#dec9b6]">|</span>
            <span className="uppercase text-[10px] tracking-wider text-[#543e34]">BẢN QUYỀN GIA TỘC</span>
          </div>
        </div>

        {/* =========================================================
            BANNER HEADER (CÓ WATERMARK HOA VĂN GIA TỘC)
            ========================================================= */}
        <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-6 sm:p-8 shadow-xs relative overflow-hidden">
          {/* Watermark hoa văn gia tộc */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.06] text-[#80141d] pointer-events-none select-none hidden sm:block">
            <svg viewBox="0 0 200 200" fill="currentColor">
              <polygon points="100,10 120,70 180,80 130,120 150,180 100,140 50,180 70,120 20,80 80,70" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="6" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" />
            </svg>
          </div>

          <div className="relative z-10 space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fae8e6] text-[#80141d] border border-[#f2c7c5] text-[10.5px] font-bold tracking-wider">
              <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
              <span>Mô hình AI Thị Giác Di Sản Vi-Heritage v3.2</span>
            </div>

            <h1 className="font-serif font-bold text-[28px] sm:text-[34px] text-[#80141d] tracking-tight leading-tight">
              Phục Chế &amp; Tái Hiện Chân Dung Tiền Nhân Bằng AI Chuyên Biệt
            </h1>

            <p className="text-[13px] text-[#6b584d] leading-relaxed">
              Hệ thống AI thuần Việt am tường văn hóa, trang phục cổ truyền (áo tấc, áo dài, khăn xếp ngũ thân), phục hồi trọn vẹn nét mặt và thần thái nghiêm kỉnh của tổ tiên mà không làm mất đi dấu ấn nhân trắc học lịch sử.
            </p>
          </div>
        </div>

        {/* =========================================================
            MAIN WORKSPACE: 2 CỘT (TRÁI 7 COLS / PHẢI 5 COLS)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* CỘT TRÁI: KHUNG TẢI ẢNH & XỬ LÝ MẪU (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* VÙNG KÉO THẢ UPLOAD (VIỀN ĐỎ NÉT ĐỨT) */}
            <div
              onClick={handleFileSelectMock}
              className="p-8 sm:p-10 rounded-3xl border-2 border-dashed border-[#e69894] bg-[#fdfaf5] hover:bg-[#faefe3]/50 transition-all text-center space-y-3 cursor-pointer group shadow-2xs"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#fae8e6] text-[#80141d] flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                <span className="material-symbols-outlined text-[28px]">photo_library</span>
              </div>

              <div className="space-y-1">
                <div className="font-serif font-bold text-[16px] text-[#2b1b15]">
                  Kéo thả ảnh cũ, ảnh ố mốc hoặc bản chụp từ gia phả vào đây
                </div>
                <p className="text-[11.5px] text-[#8a6f62] max-w-md mx-auto leading-relaxed">
                  Hỗ trợ độ phân giải lên tới 50MB định dạng JPG, PNG, TIFF hoặc HEIC quét độ nét cao từ máy scan chuyên dụng.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white font-bold text-[12.5px] shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                  <span>Chọn tệp từ máy tính</span>
                </button>
              </div>

              {selectedFile && (
                <div className="pt-2 text-[11px] font-semibold text-[#80141d]">
                  ✓ Đã chọn: {selectedFile}
                </div>
              )}
            </div>

            {/* KHUNG SO SÁNH TƯ LIỆU ĐANG XỬ LÝ MẪU */}
            <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ebdcd0]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#c9892c]">history_edu</span>
                  <span className="font-serif font-bold text-[14px] text-[#2b1b15]">
                    Tài liệu đang xử lý mẫu: Cụ Ông Nguyễn Hữu (1892 – 1968)
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fae8e6] text-[#80141d] border border-[#f2c7c5] text-[10.5px] font-bold uppercase tracking-wider self-start sm:self-auto">
                  ẢNH QUÉT NĂM 1941
                </span>
              </div>

              {/* 2 KHUNG ẢNH SO SÁNH SONG SONG */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* ẢNH GỐC BỊ Ố MỐC & RÁCH NGANG */}
                <div className="rounded-2xl border border-[#dec9b6] bg-[#faefe3] overflow-hidden flex flex-col justify-between shadow-2xs">
                  <div className="relative aspect-[3/4] overflow-hidden bg-black">
                    <img
                      src="/images/ancestor_portrait.jpg"
                      alt="Ảnh gốc nguyên bản"
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 sepia-[0.3]"
                    />
                    {/* Hiệu ứng nếp gấp rách ngang minh họa */}
                    <div className="absolute top-[42%] left-0 right-0 h-[2px] bg-white/70 shadow-xs"></div>
                    <div className="absolute top-[43%] left-0 right-0 h-[1.5px] bg-black/40"></div>

                    {/* Nhãn thẻ ảnh gốc */}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium border border-white/20">
                      Ảnh gốc: Ố mốc &amp; rách ngang
                    </span>
                  </div>

                  <div className="p-3 bg-[#fdfbf7] border-t border-[#dec9b6] flex items-center justify-between text-[11px]">
                    <span className="text-[#8a6f62]">Khổ scan: 2400 x 3200 px</span>
                    <span className="text-[#80141d] font-bold">3 vết gãy giấy trầm trọng</span>
                  </div>
                </div>

                {/* ẢNH MÔ PHỎNG PHỤC CHẾ SƠ BỘ */}
                <div className="rounded-2xl border-2 border-[#80141d] bg-[#fdfbf7] overflow-hidden flex flex-col justify-between shadow-md">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#2b1b15]">
                    <img
                      src="/images/ancestor_portrait.jpg"
                      alt="Ảnh phục chế sắc nét"
                      className="w-full h-full object-cover filter contrast-105 saturate-110"
                    />

                    {/* Nhãn mô phỏng sơ bộ */}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#80141d]/90 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20">
                      ⚙ Mô phỏng phục chế sơ bộ
                    </span>

                    {/* Huy hiệu chuẩn nhân trắc */}
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#c9892c] text-[#2b1b15] text-[10px] font-bold shadow-xs">
                      Chuẩn nhân trắc 99.4%
                    </span>

                    {/* Thanh công cụ phụ: Zoom, Download, Share */}
                    <div className="absolute bottom-2.5 inset-x-2.5 bg-black/70 backdrop-blur-xs rounded-xl py-1 px-3 flex items-center justify-around text-white text-[10.5px]">
                      <button
                        type="button"
                        onClick={() => showToast('Đã kích hoạt chế độ soi chi tiết sợi vải')}
                        className="hover:text-[#c9892c] flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                        <span>Zoom</span>
                      </button>
                      <span className="text-white/30">|</span>
                      <button
                        type="button"
                        onClick={() => showToast('Đang chuẩn bị gói tải xuống 4K...')}
                        className="hover:text-[#c9892c] flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        <span>Tải xuống</span>
                      </button>
                      <span className="text-white/30">|</span>
                      <button
                        type="button"
                        onClick={() => showToast('Đã sao chép liên kết ảnh gia tộc')}
                        className="hover:text-[#c9892c] flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">share</span>
                        <span>Chia sẻ</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white border-t border-[#dec9b6] flex items-center justify-between text-[11px]">
                    <span className="text-[#80141d] font-bold">Tự động cân chỉnh sắc tố</span>
                    <span className="text-[#c9892c] font-semibold">Sợi vải gấm Hà Đông</span>
                  </div>
                </div>

              </div>

              {/* THÔNG BÁO MA TRẬN ĐIỂM ẢNH */}
              <div className="p-3 rounded-2xl bg-[#faefe3]/60 border border-[#dec9b6] text-[11.5px] text-[#6b584d] flex items-start gap-2 leading-relaxed">
                <span className="material-symbols-outlined text-[16px] text-[#c9892c] shrink-0 mt-0.5">info</span>
                <p>
                  Hệ thống phân tích ma trận điểm ảnh đã nhận diện: Nếp rách sâu trán trái (28mm), vết loang nấm mốc góc phải và hạt quang hóa hư tổn bề mặt.
                </p>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI: BẢNG ĐIỀU KHIỂN THÔNG SỐ AI & CAM KẾT (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CARD 1: THÔNG SỐ PHỤC CHẾ AI */}
            <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#80141d]">tune</span>
                  <h2 className="font-serif font-bold text-[16px] text-[#2b1b15]">
                    Thông Số Phục Chế AI
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="text-[11px] font-bold text-[#80141d] hover:underline uppercase tracking-wider cursor-pointer"
                >
                  ĐẶT LẠI MẶC ĐỊNH
                </button>
              </div>

              <div className="space-y-4">
                {/* Tính năng 1: Khử vết xước & nếp gấp */}
                <div className="p-3.5 rounded-2xl bg-[#fdfaf5] border border-[#ebdcd0] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-[13px] text-[#2b1b15]">
                      <span className="material-symbols-outlined text-[16px] text-[#80141d]">healing</span>
                      <span>Khử vết xước, ố mốc &amp; nếp gấp gãy</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setScratchRepair(!scratchRepair)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        scratchRepair ? 'bg-[#80141d]' : 'bg-[#dec9b6]'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          scratchRepair ? 'left-6' : 'left-1'
                        }`}
                      ></span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#6b584d] leading-relaxed">
                    Loại bỏ sợi nấm ố vàng, vết rách giấy do thời Pháp thuộc và vết mực loang cũ.
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-[#8a6f62]">Cường độ khử khuyết tật:</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#fae8e6] text-[#80141d] font-bold text-[10.5px]">
                      Triệt để (Cao cấp)
                    </span>
                  </div>
                </div>

                {/* Tính năng 2: Khử nhiễu hạt & tăng nét */}
                <div className="p-3.5 rounded-2xl bg-[#fdfaf5] border border-[#ebdcd0] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-[13px] text-[#2b1b15]">
                      <span className="material-symbols-outlined text-[16px] text-[#80141d]">grain</span>
                      <span>Khử nhiễu hạt &amp; Tăng nét chi tiết</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDenoiseDetail(!denoiseDetail)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        denoiseDetail ? 'bg-[#80141d]' : 'bg-[#dec9b6]'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          denoiseDetail ? 'left-6' : 'left-1'
                        }`}
                      ></span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#6b584d] leading-relaxed">
                    Tái tạo chi tiết sợi vải áo, hoa văn kỷ hà trên viền nếp và các sợi râu tóc tự nhiên.
                  </p>
                </div>

                {/* Tính năng 3: Phục hồi thần thái */}
                <div className="p-3.5 rounded-2xl bg-[#fdfaf5] border border-[#ebdcd0] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-[13px] text-[#2b1b15]">
                      <span className="material-symbols-outlined text-[16px] text-[#80141d]">face</span>
                      <span>Phục hồi thần thái khuôn mặt tiền nhân</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFaceReconstruction(!faceReconstruction)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        faceReconstruction ? 'bg-[#80141d]' : 'bg-[#dec9b6]'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          faceReconstruction ? 'left-6' : 'left-1'
                        }`}
                      ></span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#6b584d] leading-relaxed">
                    Thuật toán bảo toàn nghiêm ngặt tỷ lệ trắc diện mắt – mũi – miệng nguyên bản, kiên quyết không áp dụng hiệu ứng làm mịn hoặc biến dạng khuôn mặt của người đã khuất.
                  </p>
                  <div className="text-[11px] text-[#c9892c] font-bold flex items-center gap-1 pt-0.5">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    <span>Bảo toàn cấu trúc giải phẫu nhân học</span>
                  </div>
                </div>

                {/* Tính năng 4: Tô màu phục trang cổ truyền */}
                <div className="p-3.5 rounded-2xl bg-[#fdfaf5] border border-[#ebdcd0] space-y-3">
                  <div className="font-bold text-[13px] text-[#2b1b15] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#80141d]">palette</span>
                    <span>Tô màu phục trang cổ truyền thuần Việt</span>
                  </div>
                  <p className="text-[11px] text-[#6b584d] leading-relaxed">
                    Lựa chọn bảng màu di sản chuẩn mực dựa trên sắc ký các làng nghề tơ lụa truyền thống:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Tùy chọn 1: Màu Lụa & Gấm Bắc Bộ */}
                    <div
                      onClick={() => setColorScheme('silk_north')}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        colorScheme === 'silk_north'
                          ? 'border-[#80141d] bg-[#fdf5f3] ring-1 ring-[#80141d]/30'
                          : 'border-[#dec9b6] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[12px] font-bold text-[#80141d]">Màu Lụa &amp; Gấm Bắc Bộ</span>
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          colorScheme === 'silk_north' ? 'border-[#80141d]' : 'border-[#dec9b6]'
                        }`}>
                          {colorScheme === 'silk_north' && <span className="w-2 h-2 rounded-full bg-[#80141d]"></span>}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-3 h-3 rounded-full bg-[#c9892c]"></span>
                        <span className="w-3 h-3 rounded-full bg-[#80141d]"></span>
                        <span className="w-3 h-3 rounded-full bg-[#deb887]"></span>
                      </div>
                      <p className="text-[10px] text-[#6b584d]">
                        Sắc the đen, gấm đỏ son, lụa tơ tằm vàng nghệ
                      </p>
                    </div>

                    {/* Tùy chọn 2: Đen Trắng Tinh Chỉnh */}
                    <div
                      onClick={() => setColorScheme('monochrome')}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        colorScheme === 'monochrome'
                          ? 'border-[#80141d] bg-[#fdf5f3] ring-1 ring-[#80141d]/30'
                          : 'border-[#dec9b6] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[12px] font-bold text-[#543e34]">Đen Trắng Tinh Chỉnh</span>
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          colorScheme === 'monochrome' ? 'border-[#80141d]' : 'border-[#dec9b6]'
                        }`}>
                          {colorScheme === 'monochrome' && <span className="w-2 h-2 rounded-full bg-[#80141d]"></span>}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-3 h-3 rounded-full bg-stone-900"></span>
                        <span className="w-3 h-3 rounded-full bg-stone-500"></span>
                        <span className="w-3 h-3 rounded-full bg-stone-300"></span>
                      </div>
                      <p className="text-[10px] text-[#6b584d]">
                        Giữ nguyên thần sắc cổ kính, tăng độ sâu sắc độ mô tả
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: CAM KẾT ĐẠO ĐỨC & BẢN QUYỀN KÝ ỨC */}
            <div className="rounded-3xl bg-[#fdf1ed] border border-[#f0cfc7] p-5 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2 text-[#80141d]">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <h3 className="font-serif font-bold text-[14px]">
                  CAM KẾT ĐẠO ĐỨC &amp; BẢN QUYỀN KÝ ỨC
                </h3>
              </div>

              <label className="flex items-start gap-2.5 text-[11.5px] text-[#543e34] cursor-pointer">
                <input
                  type="checkbox"
                  checked={ethicsConfirmed}
                  onChange={(e) => setEthicsConfirmed(e.target.checked)}
                  className="mt-0.5 rounded accent-[#80141d] cursor-pointer shrink-0"
                />
                <span className="leading-relaxed">
                  Tôi xác nhận đây là ảnh kỷ niệm / tổ tiên dòng họ và đồng ý sử dụng AI phục chế trong không gian số khép kín của gia phả. <strong>Cam kết không thương mại hóa hoặc đưa ảnh tiền nhân ra bên ngoài.</strong>
                </span>
              </label>

              <div className="p-2.5 rounded-xl bg-white/70 border border-[#f0cfc7] text-[10.5px] text-[#6b584d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#80141d] shrink-0">lock</span>
                <span>
                  Dữ liệu xử lý trong môi trường điện toán đám mây mã hóa AES-256 riêng biệt và tự động hủy bộ nhớ đệm tạm thời sau 30 phút.
                </span>
              </div>
            </div>

            {/* NÚT THAO TÁC & TIÊU HAO TÍN CHỈ */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('kho-ky-uc')}
                  className="px-4 py-3 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#543e34] font-bold text-[12.5px] transition-colors cursor-pointer"
                >
                  Hủy / Quay lại
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleStartRestoration}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#80141d] hover:bg-[#681017] disabled:opacity-50 text-white font-bold text-[13px] shadow-md hover:shadow-lg transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                    <span>{isProcessing ? 'Đang Xử Lý Phục Chế...' : 'Bắt Đầu Phục Chế AI'}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-black/25 text-white/90 text-[10.5px] font-semibold">
                    Tiêu hao 1 Tín chỉ
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-[#8a6f62] text-center italic">
                Thời gian phục hồi ước tính: 45 – 60 giây tuỳ theo mật độ hư tổn ảnh gốc
              </p>
            </div>

          </div>

        </div>

        {/* =========================================================
            BOTTOM HERITAGE SECURITY FOOTER BANNER
            ========================================================= */}
        <div className="p-6 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="space-y-1">
              <div className="font-serif font-bold text-[#80141d] text-[16px]">
                Thích Cúng Kiếng • Bảo Tàng Di Sản Số Dòng Họ
              </div>
              <p className="text-[12px] text-[#6b584d] max-w-2xl leading-relaxed">
                Không gian thiêng liêng gìn giữ gia phả, ký ức hình ảnh và truyền thống văn hóa phụng sự tổ tiên của các dòng họ Việt Nam.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11.5px] text-[#543e34] font-semibold shrink-0">
              <span className="flex items-center gap-1 text-[#80141d]">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Bảo Mật Kép AES-256</span>
              </span>
              <span className="flex items-center gap-1 text-[#c9892c]">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Quyền Sở Hữu Thuộc Dòng Họ 100%</span>
              </span>
              <span className="flex items-center gap-1 text-[#80141d]">
                <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                <span>Phục Chế Ảnh Kỹ Thuật Số AI</span>
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#ebdcd0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8a6f62]">
            <div>
              © 2025 Thích Cúng Kiếng. Tôn kính phụng sự đạo nghĩa nguồn cội.
            </div>
            <div className="flex items-center gap-4 font-medium">
              <span className="hover:text-[#80141d] cursor-pointer">Quy ước bảo tồn gia phong</span>
              <span>•</span>
              <span className="hover:text-[#80141d] cursor-pointer">Chính sách lưu trữ kỷ vật</span>
              <span>•</span>
              <span className="hover:text-[#80141d] cursor-pointer">Hỗ trợ Ban Phụng Sự</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
