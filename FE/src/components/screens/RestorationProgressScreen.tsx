import React, { useState, useEffect } from 'react';
import type { ScreenType } from '../../types.ts';

interface RestorationProgressScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RestorationProgressScreen: React.FC<RestorationProgressScreenProps> = ({ onNavigate }) => {
  const [progress, setProgress] = useState(68);
  const [stage, setStage] = useState(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onNavigate('hoan-tat-phuc-che'), 900);
          return 100;
        }
        const next = prev + 1;
        if (next >= 92) setStage(4);
        else if (next >= 78) setStage(3);
        else if (next >= 40) setStage(2);
        return next;
      });
    }, 600);

    return () => clearInterval(timer);
  }, [onNavigate]);

  const handleCancel = () => {
    setToastMessage('Đã hủy tiến trình phục chế và hoàn trả 1 tín chỉ AI vào quỹ gia tộc.');
    setTimeout(() => {
      onNavigate('phuc-che-ai');
    }, 1200);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#fcf8f2] py-10 px-4 sm:px-6 flex items-center justify-center font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#2b1b15] text-[#fcf8f2] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-bounce">
          <span className="material-symbols-outlined text-[#e8b56f] text-[20px]">info</span>
          <span className="text-[12.5px] font-medium leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="max-w-2xl w-full bg-[#fdfaf5] rounded-[32px] p-6 sm:p-10 border border-[#dec9b6] shadow-sm space-y-7 text-center relative overflow-hidden">
        {/* Subtle Sacred Geometry Watermark Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-[#ebdcd0]/40 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-[#ebdcd0]/30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#ebdcd0]/20 pointer-events-none"></div>

        {/* Top Header Badge & Sacred Emblem */}
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faeed9] text-[#734c13] border border-[#c9892c]/30 text-[10.5px] font-bold uppercase tracking-wider shadow-2xs">
            <span className="material-symbols-outlined text-[14px] text-[#c9892c]">auto_awesome</span>
            <span>KHÔNG GIAN PHỤC CHẾ DI ẢNH HOÀNG TỘC</span>
          </div>

          {/* Traditional Incense Sacred Compass Emblem */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            {/* Outer golden halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c9892c]/10 to-[#80141d]/10 animate-pulse"></div>
            {/* 8 Radiant Star Rays */}
            <div className="absolute w-16 h-16 border border-[#c9892c]/40 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '24s' }}>
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9892c]/60 to-transparent"></div>
              <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#c9892c]/60 to-transparent"></div>
              <div className="absolute w-full h-[1px] rotate-45 bg-gradient-to-r from-transparent via-[#c9892c]/60 to-transparent"></div>
              <div className="absolute w-full h-[1px] -rotate-45 bg-gradient-to-r from-transparent via-[#c9892c]/60 to-transparent"></div>
            </div>

            {/* Sacred Flame Emblem Core */}
            <div className="relative w-10 h-10 rounded-full bg-[#fffbf5] border border-[#c9892c] shadow-sm flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[20px] text-[#80141d] animate-pulse">local_fire_department</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15] tracking-tight">
            Đang Phục Chế Ký Ức Tiền Nhân...
          </h1>
          <p className="text-[13px] text-[#6b584d] max-w-md mx-auto leading-relaxed">
            Hệ thống AI đang cẩn trọng phân tích từng sợi vải, khử vết ố mốc thời gian và tái hiện nét mặt tôn nghiêm.
          </p>
        </div>

        {/* Processing Image Card with Scanning Effect */}
        <div className="relative max-w-sm sm:max-w-md mx-auto aspect-[4/3] rounded-2xl overflow-hidden bg-[#201815] border border-[#dec9b6] shadow-md group">
          <img
            src="/images/ancestor_portrait.jpg"
            alt="Đang quét ảnh phục chế"
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 sepia-[0.35]"
          />

          {/* Traditional Photo Frame Margin Inner Border */}
          <div className="absolute inset-2 border border-white/20 rounded-xl pointer-events-none"></div>

          {/* Animated Scanning Beam effect */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#e8b56f] to-transparent animate-bounce top-1/3 shadow-[0_0_12px_#c9892c] pointer-events-none"></div>

          {/* Multi-tier Denoising Status Pill */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-md border border-white/20 flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#80141d] animate-pulse"></span>
            <span>Đang khử nhiễu đa tầng</span>
          </div>

          {/* Document ID Tag */}
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-[#ebdcd0] text-[11px] font-mono px-2.5 py-1 rounded-md border border-white/20">
            Tư liệu #1932-B
          </div>
        </div>

        {/* Restoration Progress Bar */}
        <div className="space-y-2 text-left pt-1">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-serif font-bold text-[#80141d] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#80141d]">hourglass_top</span>
              <span>Tiến trình phục nguyên</span>
            </span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#80141d] text-sm">{progress}%</span>
              <span className="text-[#6b584d] text-[11.5px]">
                (Ước tính còn: {Math.max(0, Math.ceil((100 - progress) * 0.4))} giây)
              </span>
            </div>
          </div>

          {/* Custom Dual-Tone Gradient Progress Bar */}
          <div className="w-full h-3 rounded-full bg-[#f3e8dc] overflow-hidden p-0.5 border border-[#dec9b6]/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#80141d] via-[#c9892c] to-[#e8b56f] transition-all duration-300 shadow-2xs"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#8a6f62] pt-0.5">
            <span>Khởi tạo thuật toán</span>
            <span>Bảo toàn chân dung gốc</span>
            <span>Chuẩn hóa di sản</span>
          </div>
        </div>

        {/* 4 Stages Breakdown */}
        <div className="space-y-3 text-left">
          {/* Stage 1: Completed */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#ebdcd0] flex items-start gap-3 shadow-2xs">
            <span className="material-symbols-outlined text-[#80141d] text-[20px] shrink-0 mt-0.5">
              check_circle
            </span>
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[12.5px] text-[#2b1b15]">
                  Giai đoạn 1: Phân tích kết cấu &amp; nhận diện nếp gãy
                </span>
                <span className="text-[10px] bg-[#fae8e6] text-[#80141d] px-2.5 py-0.5 rounded-full font-bold">
                  Hoàn thành
                </span>
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Đã bóc tách 14 vệt nứt dọc, xử lý ố mốc thời gian và cân chỉnh phẳng mặt ảnh scan 1200 DPI.
              </p>
            </div>
          </div>

          {/* Stage 2: Processing (Active) */}
          <div
            className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
              stage === 2
                ? 'bg-[#fffdfa] border-[#dec9b6] border-l-4 border-l-[#c9892c] shadow-xs'
                : stage > 2
                ? 'bg-white border-[#ebdcd0]'
                : 'bg-white/60 border-[#ebdcd0]/70'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${stage === 2 ? 'text-[#c9892c] animate-spin' : stage > 2 ? 'text-[#80141d]' : 'text-[#a89083]'}`}>
              {stage > 2 ? 'check_circle' : 'sync'}
            </span>
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[12.5px] text-[#2b1b15]">
                  Giai đoạn 2: Tái cấu trúc ma trận điểm ảnh &amp; khôi phục ngũ quan
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                  stage === 2
                    ? 'bg-[#faeed9] text-[#734c13] border border-[#c9892c]/30'
                    : stage > 2
                    ? 'bg-[#fae8e6] text-[#80141d]'
                    : 'bg-[#f3eae0] text-[#8a6f62]'
                }`}>
                  {stage === 2 && <span className="w-1.5 h-1.5 rounded-full bg-[#c9892c] animate-ping"></span>}
                  <span>{stage > 2 ? 'Hoàn thành' : stage === 2 ? 'Đang xử lý' : 'Đang chờ'}</span>
                </span>
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Tái tạo chi tiết đồng tử mắt, khóe môi và phong thái tôn nghiêm theo đặc trưng diện mạo người Việt cổ.
              </p>
            </div>
          </div>

          {/* Stage 3: Waiting or Processing */}
          <div
            className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
              stage === 3
                ? 'bg-[#fffdfa] border-[#dec9b6] border-l-4 border-l-[#c9892c] shadow-xs'
                : stage > 3
                ? 'bg-white border-[#ebdcd0]'
                : 'bg-[#fdfaf5]/70 border-[#ebdcd0]'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${stage === 3 ? 'text-[#c9892c] animate-spin' : stage > 3 ? 'text-[#80141d]' : 'text-[#a89083]'}`}>
              {stage > 3 ? 'check_circle' : stage === 3 ? 'sync' : 'palette'}
            </span>
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[12.5px] text-[#2b1b15]">
                  Giai đoạn 3: Phối màu phục trang di sản theo mỹ tục
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                  stage === 3
                    ? 'bg-[#faeed9] text-[#734c13] font-bold'
                    : stage > 3
                    ? 'bg-[#fae8e6] text-[#80141d] font-bold'
                    : 'bg-[#f3eae0] text-[#8a6f62]'
                }`}>
                  {stage > 3 ? 'Hoàn thành' : stage === 3 ? 'Đang xử lý' : 'Đang chờ'}
                </span>
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Ứng dụng tư liệu sắc phong, gấm vóc cổ truyền và bảng màu phẩm nhuộm tự nhiên thời Nguyễn.
              </p>
            </div>
          </div>

          {/* Stage 4: Waiting or Finalizing */}
          <div
            className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
              stage === 4
                ? 'bg-[#fffdfa] border-[#dec9b6] border-l-4 border-l-[#80141d] shadow-xs'
                : 'bg-[#fdfaf5]/70 border-[#ebdcd0]'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${stage === 4 ? 'text-[#80141d] animate-pulse' : 'text-[#a89083]'}`}>
              {stage >= 4 ? 'verified' : 'verified'}
            </span>
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[12.5px] text-[#2b1b15]">
                  Giai đoạn 4: Xuất bản Ultra HD 4K &amp; kiểm định chất lượng
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                  stage >= 4
                    ? 'bg-[#fae8e6] text-[#80141d] font-bold'
                    : 'bg-[#f3eae0] text-[#8a6f62]'
                }`}>
                  {stage >= 4 ? 'Đang hoàn tất' : 'Đang chờ'}
                </span>
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Đảm bảo độ phân giải sắc nét tiêu chuẩn thờ phụng gia tiên và lưu trữ bảo mật vĩnh viễn trong gia phả số.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons & Security Mode Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#dec9b6]/50">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-full border border-[#e69894] bg-[#fae8e6]/60 hover:bg-[#fae8e6] text-[#80141d] text-[11.5px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">cancel</span>
            <span>Hủy Quá Trình (Hoàn lại 1 tín chỉ AI)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('hoan-tat-phuc-che')}
            className="text-[11.5px] text-[#734c13] font-medium flex items-center gap-1.5 hover:text-[#80141d] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#c9892c]">shield</span>
            <span>Chế độ bảo mật phả tộc khép kín</span>
          </button>
        </div>

        {/* Bottom Quotation */}
        <div className="pt-2 space-y-1">
          <p className="font-serif italic text-[#80141d] text-sm font-semibold">
            &ldquo;Mỗi bức ảnh cũ là một câu chuyện vô giá của dòng họ.&rdquo;
          </p>
          <p className="text-[11.5px] text-[#8a6f62] flex items-center justify-center gap-1.5">
            <span className="text-[#80141d]">🪷</span>
            <span>Xin vui lòng giữ nguyên màn hình trong giây lát để hạt ảnh được lắng kết trọn vẹn.</span>
            <span className="text-[#80141d]">🪷</span>
          </p>
        </div>
      </div>
    </div>
  );
};
