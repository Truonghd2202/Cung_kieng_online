import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface RelicDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RelicDetailScreen: React.FC<RelicDetailScreenProps> = ({ onNavigate }) => {
  const [incenseCount, setIncenseCount] = useState(348);
  const [hasOffered, setHasOffered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isComparingOriginal, setIsComparingOriginal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'fit' | '100' | '200'>('fit');
  const [showInspectionModal, setShowInspectionModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOfferIncense = () => {
    setIncenseCount((prev) => prev + 1);
    setHasOffered(true);
    showToast('Nén tâm hương tưởng niệm Cụ Cố Nguyễn Khắc Cẩn đã được dâng lên trang nghiêm.');
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      showToast('Đang phát: Lời kể của Cụ Bà về bức ảnh (Ghi âm năm 1998)');
    }
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

      {/* Modal: Biên Bản Giám Định */}
      {showInspectionModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border-2 border-[#dec9b6] space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#80141d]">verified</span>
                <h3 className="font-serif font-bold text-[18px] text-[#2b1b15]">
                  Biên Bản Giám Định Kỷ Vật Di Sản
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInspectionModal(false)}
                className="h-8 w-8 rounded-full bg-[#faefe3] hover:bg-[#ebdcd0] flex items-center justify-center text-[#543e34] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-[12.5px] text-[#543e34] leading-relaxed">
              <div className="p-3 rounded-xl bg-[#faefe3] border border-[#dec9b6] space-y-1">
                <div><strong>Mã định danh bảo tàng:</strong> KV-1910-TL09</div>
                <div><strong>Cơ quan giám định:</strong> Hội đồng Trị sự &amp; Ban Bảo tồn Phả Ký Đại Tộc</div>
                <div><strong>Khởi lập chuỗi khối:</strong> 15/08/2024 • Mã hash: 0x9f4a...e72b</div>
              </div>

              <p>
                <strong>Kết luận vật lý:</strong> Bản ảnh được rọi trên giấy tráng albumin keo bạc tiêu chuẩn Pháp đầu thế kỷ XX. Tình trạng lão hóa tự nhiên 114 năm tuổi, nếp gãy mép tả ngạn phù hợp với môi trường khí hậu nhiệt đới Bắc Bộ.
              </p>

              <p>
                <strong>Xác thực phả hệ:</strong> Chân dung Cụ Cố Khởi Tổ Đời thứ 9 Nguyễn Khắc Cẩn trùng khớp với mô tả trong bản Hán văn &quot;Nguyễn Tộc Thế Phả Ký Toàn Thư&quot; lưu trữ tại Thượng Điện.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowInspectionModal(false)}
                className="px-5 py-2 rounded-xl bg-[#80141d] text-white font-bold text-[12.5px] hover:bg-[#681017] cursor-pointer"
              >
                Đóng biên bản
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* =========================================================
            BREADCRUMBS & METADATA BADGES
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] border-b border-[#ebdcd0] pb-3">
          <div className="flex items-center gap-1.5 text-[#8a6f62] flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">inventory_2</span>
              <span>Kho Ký Ức</span>
            </button>
            <span>&gt;</span>
            <button
              type="button"
              onClick={() => onNavigate('tuyen-tap-album')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Album Chân Dung Tiền Nhân
            </button>
            <span>&gt;</span>
            <span className="text-[#80141d] font-bold">
              Chân Dung Cụ Ông Nguyễn Khắc Cẩn (Khởi Tổ Chi Trực Lãng)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] self-start sm:self-auto shrink-0">
            <span className="px-2.5 py-0.5 rounded-full bg-[#fae8e6] text-[#80141d] border border-[#f2c7c5] font-bold">
              Chi Trực Lãng Đời 9
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#dec9b6] text-[#543e34] font-mono font-medium">
              Mã số: KV-1910-TL09
            </span>
          </div>
        </div>

        {/* =========================================================
            MAIN DETAIL LAYOUT (2 COLUMNS: 5 COLS / 7 COLS)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* CỘT TRÁI: ẢNH CHÂN DUNG LỚN, DÂNG HƯƠNG & CHỨNG THỰC (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* KHUNG TRANH CHÂN DUNG GỖ KHẢM */}
            <div className="rounded-3xl bg-[#1c1613] p-3 border-2 border-[#3d2e27] shadow-xl space-y-3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black group select-none">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Chân dung Cụ Cố Đời Thứ 9"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isComparingOriginal
                      ? 'filter grayscale contrast-125 sepia-[0.35] brightness-90'
                      : 'filter contrast-105 saturate-110'
                  }`}
                />

                {/* Nếp gấp rách minh họa khi ở chế độ bản gốc */}
                {isComparingOriginal && (
                  <>
                    <div className="absolute top-[42%] left-0 right-0 h-[2px] bg-white/70 shadow-xs pointer-events-none"></div>
                    <div className="absolute top-[43%] left-0 right-0 h-[1.5px] bg-black/50 pointer-events-none"></div>
                  </>
                )}

                {/* Huy hiệu trên ảnh */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#80141d]/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-md border border-white/20 self-start">
                    {isComparingOriginal ? 'Bản Gốc Ố Mốc & Rách Mép' : '✨ Đã Phục Chế AI 4K • Màu Sắc Cổ Truyền'}
                  </span>
                </div>

                <div className="absolute top-3 right-3 pointer-events-none">
                  <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[#c9892c] text-[10px] font-serif font-bold border border-white/20">
                    Bản Niên Biểu 1910
                  </span>
                </div>

                {/* Độ phân giải góc phải dưới */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white/90 text-[10px] font-mono px-2.5 py-0.5 rounded-md border border-white/10 pointer-events-none">
                  Độ nét: 3840 x 4800 px (300 DPI)
                </div>
              </div>

              {/* 4 Nút thanh công cụ phụ dưới ảnh */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] text-white/90 font-medium">
                <button
                  type="button"
                  onClick={() => setIsComparingOriginal(!isComparingOriginal)}
                  className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer ${
                    isComparingOriginal
                      ? 'bg-[#c9892c] text-[#211a17] font-bold shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {isComparingOriginal ? 'Xem Ảnh Phục Chế' : 'So Sánh Bản Gốc'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const next = zoomLevel === 'fit' ? '100' : zoomLevel === '100' ? '200' : 'fit';
                    setZoomLevel(next);
                    showToast(`Chế độ hiển thị: ${next === 'fit' ? 'Vừa khung' : next + '%'}`);
                  }}
                  className="py-2 px-1 rounded-xl bg-white/10 hover:bg-white/20 text-center transition-all cursor-pointer"
                >
                  Thu Phóng Toàn Cảnh
                </button>

                <button
                  type="button"
                  onClick={() => showToast('Đang khởi tạo gói tệp in 300 DPI kích thước A3/A4...')}
                  className="py-2 px-1 rounded-xl bg-white/10 hover:bg-white/20 text-center transition-all cursor-pointer"
                >
                  Tải Bản In A3/A4
                </button>

                <button
                  type="button"
                  onClick={() => showToast('Mở cổng đóng góp bổ sung tư liệu ảnh dòng họ')}
                  className="py-2 px-1 rounded-xl bg-white/10 hover:bg-white/20 text-center transition-all cursor-pointer"
                >
                  Gửi Thêm Góc Ảnh
                </button>
              </div>
            </div>

            {/* BÁI VỌNG & DÂNG HƯƠNG CARD */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#fae8e6] text-[#80141d] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">mode_heat</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-[13.5px] text-[#2b1b15] flex items-center gap-1.5">
                    <span>Bái Vọng &amp; Dâng Hương</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#80141d]"></span>
                  </div>
                  <p className="text-[11px] text-[#6b584d] mt-0.5">
                    Đã có <strong className="text-[#80141d]">{incenseCount}</strong> lượt con cháu dâng nén tâm hương tưởng nhớ.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOfferIncense}
                className={`px-4 py-2 rounded-xl font-bold text-[12px] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  hasOffered
                    ? 'bg-[#c9892c] text-[#211a17]'
                    : 'bg-[#80141d] hover:bg-[#681017] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">mode_heat</span>
                <span>{hasOffered ? 'Đã Dâng Tâm Hương' : 'Thắp Nén Tâm Hương'}</span>
              </button>
            </div>

            {/* CHỨNG THỰC BẢO TỒN KỸ THUẬT SỐ */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-2xs flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#c9892c] text-[22px]">verified</span>
                <div>
                  <span className="font-bold text-[#2b1b15] block">
                    Chứng Thực Bảo Tồn Kỹ Thuật Số
                  </span>
                  <span className="text-[#8a6f62]">
                    Mã hóa chuỗi khối gia phả • Khởi lập ngày 15/08/2024
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowInspectionModal(true)}
                className="text-[#80141d] font-bold hover:underline flex items-center gap-0.5 cursor-pointer shrink-0"
              >
                <span>Xem biên bản giám định</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

          </div>

          {/* CỘT PHẢI: THÔNG TIN CHI TIẾT, HỒ SƠ GIÁM ĐỊNH & ĐIỂN TÍCH (7 COLS) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* TIÊU ĐỀ & HUY HIỆU DANH VỊ */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold">
                <span className="px-3 py-1 rounded-full bg-[#80141d] text-white shadow-2xs">
                  Kỷ Vật Thượng Đẳng
                </span>
                <span className="px-3 py-1 rounded-full bg-[#fef3dd] text-[#b3731a] border border-[#f5dfb3]">
                  Triều Nguyễn - Niên hiệu Duy Tân
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#543e34] border border-[#dec9b6]">
                  Nội bộ Gia Tộc
                </span>
              </div>

              <h1 className="font-serif font-bold text-[26px] sm:text-[32px] text-[#80141d] tracking-tight leading-tight">
                Bức Chân Dung Cụ Cố Đời Thứ 9 - Nguyễn Khắc Cẩn
              </h1>

              <p className="font-serif font-bold text-[14px] text-[#c9892c]">
                (1852 – 1928 • Thọ 77 tuổi • Tự Phúc Minh, Hiệu Tùng Trai)
              </p>
            </div>

            {/* BANNER LIÊN KẾT PHẢ HỆ CHÍNH THỨC */}
            <div
              onClick={() => onNavigate('ho-so-tien-nhan')}
              className="p-4 rounded-2xl bg-[#fbf1ed] hover:bg-[#fadbd7] border border-[#f0cfc7] transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#80141d] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">account_tree</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#80141d] font-bold uppercase tracking-wider block">
                    LIÊN KẾT PHẢ HỆ CHÍNH THỨC
                  </span>
                  <span className="font-serif font-bold text-[14px] text-[#80141d] group-hover:underline">
                    Hồ sơ cụ Nguyễn Khắc Cẩn (Đời 9 – Chi Trực Lãng)
                  </span>
                  <p className="text-[11px] text-[#6b584d]">
                    Cụ Khởi tổ phân chi • Mộ phần tại Gò Cây Sanh, Trực Ninh
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#80141d] group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </div>

            {/* HỒ SƠ GIÁM ĐỊNH & BẢO TÀNG (LƯỚI 2x2) */}
            <div className="rounded-3xl bg-white border border-[#dec9b6] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#ebdcd0] pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#80141d]">history_edu</span>
                  <h2 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                    Hồ Sơ Giám Định &amp; Bảo Tàng
                  </h2>
                </div>
                <span className="text-[11px] text-[#8a6f62]">Lần ghi chép cuối: 12/2024</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[12.5px]">
                {/* Khối 1: Năm khởi tạo */}
                <div className="p-3.5 rounded-2xl bg-[#faefe3]/50 border border-[#ebdcd0] space-y-1">
                  <span className="text-[10.5px] font-bold text-[#8a6f62] tracking-wider uppercase block">
                    NĂM KHỞI TẠO ƯỚC TÍNH
                  </span>
                  <div className="font-serif font-bold text-[14px] text-[#2b1b15]">
                    Khoảng 1910 (Canh Tuất)
                  </div>
                  <div className="text-[11px] text-[#c9892c] font-medium">
                    Thời kỳ Duy Tân thứ 4
                  </div>
                </div>

                {/* Khối 2: Người hiến tặng */}
                <div className="p-3.5 rounded-2xl bg-[#faefe3]/50 border border-[#ebdcd0] space-y-1">
                  <span className="text-[10.5px] font-bold text-[#8a6f62] tracking-wider uppercase block">
                    NGƯỜI HIẾN TẶNG TƯ LIỆU
                  </span>
                  <div className="font-serif font-bold text-[14px] text-[#2b1b15]">
                    Bác Cả Nguyễn Trực Viễn
                  </div>
                  <div className="text-[11px] text-[#8a6f62]">
                    Lưu giữ tại Hòm đồng Từ đường Chi
                  </div>
                </div>

                {/* Khối 3: Tình trạng vật lý */}
                <div className="p-3.5 rounded-2xl bg-[#faefe3]/50 border border-[#ebdcd0] space-y-1">
                  <span className="text-[10.5px] font-bold text-[#8a6f62] tracking-wider uppercase block">
                    TÌNH TRẠNG VẬT LÝ BẢN GỐC
                  </span>
                  <div className="font-serif font-bold text-[#80141d] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">warning</span>
                    <span>Ố mốc nặng, rách mép tả ngạn</span>
                  </div>
                  <div className="text-[11px] text-[#8a6f62]">
                    Chất liệu giấy rọi keo bạc cổ thời Pháp thuộc
                  </div>
                </div>

                {/* Khối 4: Phương thức bảo quản */}
                <div className="p-3.5 rounded-2xl bg-[#faefe3]/50 border border-[#ebdcd0] space-y-1">
                  <span className="text-[10.5px] font-bold text-[#8a6f62] tracking-wider uppercase block">
                    PHƯƠNG THỨC BẢO QUẢN SỐ
                  </span>
                  <div className="font-serif font-bold text-[#c9892c] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">shield</span>
                    <span>Bảo Tồn Vĩnh Viễn L3</span>
                  </div>
                  <div className="text-[11px] text-[#8a6f62]">
                    Sao lưu phân tán 3 kho tư liệu dòng họ
                  </div>
                </div>
              </div>
            </div>

            {/* KÝ ỨC TRUYỀN KHẨU & ĐIỂN TÍCH */}
            <div className="rounded-3xl bg-white border border-[#dec9b6] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#80141d]">auto_stories</span>
                <h2 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Ký Ức Truyền Khẩu &amp; Điển Tích
                </h2>
              </div>

              <div className="text-[12.5px] text-[#6b584d] leading-relaxed space-y-3">
                <p>
                  Theo lời các bậc cao niên trong chi phái kể lại, bức ảnh này cụ chụp tại <em className="text-[#80141d] font-serif font-semibold">Hiệu ảnh Phúc Hưng</em> bên bờ sông Vị Hoàng (Nam Định) vào mùa thu năm Canh Tuất 1910. Đây là dịp cụ thân chinh lên tỉnh chúc mừng người con thứ ba thi đỗ Tú tài Hán học, đồng thời cũng là lần đầu tiên cụ đồng ý ngồi trước ống kính của người thợ rọi ảnh phương Tây.
                </p>

                {/* Khung trích dẫn nhấn mạnh */}
                <div className="p-3.5 rounded-2xl bg-[#fdfaf5] border-l-3 border-[#c9892c] text-[12px] text-[#543e34] italic font-serif leading-relaxed">
                  Sinh thời, cụ Khắc Cẩn nổi tiếng trong vùng là người thông tỏ dịch lý, tính tình thuần hậu, mở lớp dạy chữ Nho không lấy học phí của trò nghèo. Ánh mắt cụ trong bức chân dung vừa nghiêm cẩn gia phong, vừa chan chứa từ tâm của bậc nho sĩ trọng đạo nghĩa làm người.
                </div>
              </div>

              {/* KHỐI TRÌNH PHÁT GHI ÂM LỜI KỂ CỦA CỤ BÀ */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fdfaf5] border border-[#ebdcd0] space-y-2">
                <div className="flex items-center justify-between text-[11.5px]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#fef3dd] text-[#c9892c] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">mic</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#2b1b15] block">
                        Lời kể của Cụ Bà về bức ảnh
                      </span>
                      <span className="text-[10.5px] text-[#8a6f62]">
                        Ghi âm năm 1998 tại nhà cổ thôn Thượng • Thời lượng 03:15
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={toggleAudio}
                    className="w-8 h-8 rounded-full bg-[#80141d] text-white flex items-center justify-center shadow-xs hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isPlayingAudio ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono text-[#8a6f62]">00:54</span>
                  <div className="flex-1 bg-[#dec9b6]/40 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full bg-[#80141d] ${isPlayingAudio ? 'w-2/5 animate-pulse' : 'w-1/4'}`}></div>
                  </div>
                  <span className="text-[10px] font-mono text-[#8a6f62]">03:15</span>
                </div>
              </div>

              {/* DÒNG BẢN QUYỀN & NÚT CHIA SẺ NỘI TỘC */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#ebdcd0] text-[11px]">
                <div className="text-[#8a6f62] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#c9892c]">shield</span>
                  <span>
                    <strong>Bản quyền số hóa:</strong> Chi Trực Lãng – Họ Nguyễn (Quyền truy cập giới hạn con cháu trong tộc phả)
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => showToast('Đã mở hộp thoại hiệu đính thông tin kỷ vật')}
                    className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#543e34] font-semibold text-[11.5px] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    <span>Chỉnh Sửa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('Đã sao chép liên kết chia sẻ nội bộ gia tộc!')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white font-bold text-[11.5px] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[14px]">share</span>
                    <span>Chia Sẻ Nội Tộc</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================
            SECTION: KỶ VẬT & ẢNH LIÊN QUAN CÙNG NIÊN ĐẠI (1900 - 1928)
            ========================================================= */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#c9892c] tracking-wider">
                TƯ LIỆU ĐỒNG ĐẠI &amp; CÙNG THỜI KỲ
              </div>
              <h2 className="font-serif font-bold text-[20px] text-[#80141d]">
                Kỷ Vật &amp; Ảnh Liên Quan Cùng Niên Đại (1900 – 1928)
              </h2>
              <p className="text-[12px] text-[#6b584d]">
                Những di chỉ, đồ tế tự và văn tư liệu quý giá liên quan trực tiếp đến cuộc đời cụ Khắc Cẩn
              </p>
            </div>

            <div className="flex items-center gap-1 text-[#8a6f62]">
              <button
                type="button"
                className="w-7 h-7 rounded-full border border-[#dec9b6] bg-white flex items-center justify-center hover:bg-[#faefe3] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">chevron_left</span>
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-full border border-[#dec9b6] bg-white flex items-center justify-center hover:bg-[#faefe3] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Thẻ 1: Tráp Gỗ Khảm Trai */}
            <div
              onClick={() => showToast('Đang mở chi tiết: Tráp Gỗ Khảm Trai Đựng Sắc Phong')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dec9b6] hover:border-[#80141d] shadow-2xs hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-[#faefe3] overflow-hidden">
                <img
                  src="/images/relic_box.jpg"
                  alt="Tráp Gỗ Khảm Trai"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[9.5px] px-2 py-0.5 rounded-md font-medium">
                  Hiện vật tế tự
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-[#fef3dd] text-[#b3731a] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#f5dfb3]">
                  Niên biểu 1915
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h3 className="font-serif font-bold text-[13.5px] text-[#2b1b15] group-hover:text-[#80141d] transition-colors truncate">
                  Tráp Gỗ Khảm Trai Đựng Sắc Phong
                </h3>
                <p className="text-[11px] text-[#6b584d] line-clamp-2 leading-relaxed">
                  Hộp tráp sơn son thiếp vàng cụ dùng cất giữ đạo sắc chỉ thời Khải Định ban cho...
                </p>
                <div className="text-[10.5px] text-[#80141d] font-bold pt-1 flex items-center gap-1">
                  <span>Bảo tồn tại Từ đường</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Thẻ 2: Bản Thủ Bút Gia Huấn */}
            <div
              onClick={() => showToast('Đang mở chi tiết: Bản Thủ Bút Gia Huấn Bằng Chữ Nôm')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dec9b6] hover:border-[#80141d] shadow-2xs hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-[#faefe3] overflow-hidden">
                <img
                  src="/images/relic_book.jpg"
                  alt="Bản Thủ Bút Gia Huấn"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[9.5px] px-2 py-0.5 rounded-md font-medium">
                  Văn bản Hán Nôm
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-[#fef3dd] text-[#b3731a] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#f5dfb3]">
                  Niên biểu 1920
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h3 className="font-serif font-bold text-[13.5px] text-[#2b1b15] group-hover:text-[#80141d] transition-colors truncate">
                  Bản Thủ Bút Gia Huấn Bằng Chữ Nôm
                </h3>
                <p className="text-[11px] text-[#6b584d] line-clamp-2 leading-relaxed">
                  Tập thơ răn dạy con cháu về chữ Hiếu và chữ Đễ do chính tay cụ Khắc Cẩn chép...
                </p>
                <div className="text-[10.5px] text-[#80141d] font-bold pt-1 flex items-center gap-1">
                  <span>Đã dịch nghĩa &amp; scan</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Thẻ 3: Nhà Cổ Ba Gian */}
            <div
              onClick={() => showToast('Đang mở chi tiết: Nhà Cổ Ba Gian Thôn Thượng')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dec9b6] hover:border-[#80141d] shadow-2xs hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-[#faefe3] overflow-hidden">
                <img
                  src="/images/hero_family.jpg"
                  alt="Nhà Cổ Ba Gian"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[9.5px] px-2 py-0.5 rounded-md font-medium">
                  Không gian ký ức
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-[#fef3dd] text-[#b3731a] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#f5dfb3]">
                  Niên biểu 1924
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h3 className="font-serif font-bold text-[13.5px] text-[#2b1b15] group-hover:text-[#80141d] transition-colors truncate">
                  Nhà Cổ Ba Gian Thôn Thượng
                </h3>
                <p className="text-[11px] text-[#6b584d] line-clamp-2 leading-relaxed">
                  Nơi cụ mở lớp dạy chữ Nho cho môn sinh quanh hạt, trước sân có giếng đá cổ và...
                </p>
                <div className="text-[10.5px] text-[#80141d] font-bold pt-1 flex items-center gap-1">
                  <span>Ảnh phục chế màu</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Thẻ 4: Bộ Lư Đồng Tam Sự Cổ */}
            <div
              onClick={() => showToast('Đang mở chi tiết: Bộ Lư Đồng Tam Sự Cổ')}
              className="bg-white rounded-2xl overflow-hidden border border-[#dec9b6] hover:border-[#80141d] shadow-2xs hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-[#faefe3] overflow-hidden">
                <img
                  src="/images/relic_medals.jpg"
                  alt="Bộ Lư Đồng Tam Sự Cổ"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[9.5px] px-2 py-0.5 rounded-md font-medium">
                  Bảo vật gia truyền
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-[#fef3dd] text-[#b3731a] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#f5dfb3]">
                  Niên biểu 1928
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h3 className="font-serif font-bold text-[13.5px] text-[#2b1b15] group-hover:text-[#80141d] transition-colors truncate">
                  Bộ Lư Đồng Tam Sự Cổ
                </h3>
                <p className="text-[11px] text-[#6b584d] line-clamp-2 leading-relaxed">
                  Vật phẩm do các môn sinh đồng môn đúc tặng mừng cụ thượng thọ thất tuần năm...
                </p>
                <div className="text-[10.5px] text-[#80141d] font-bold pt-1 flex items-center gap-1">
                  <span>Đang phụng thờ</span>
                  <span>→</span>
                </div>
              </div>
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
