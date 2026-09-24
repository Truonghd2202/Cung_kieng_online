import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AncestorProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AncestorProfileScreen: React.FC<AncestorProfileScreenProps> = ({ onNavigate }) => {
  const [incenseCount, setIncenseCount] = useState(1284);
  const [hasOfferedIncense, setHasOfferedIncense] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'audio' | 'relics'>('photos');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showGpsModal, setShowGpsModal] = useState(false);

  const handleOfferIncense = () => {
    setIncenseCount((prev) => prev + 1);
    setHasOfferedIncense(true);
    setToastMessage('Đã dâng một nén tâm hương kính cẩn tưởng niệm Cụ Cố Nguyễn Văn Phúc!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] py-6 px-4 sm:px-6 lg:px-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2b1b15] text-[#fdf9f4] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c9892c] animate-in fade-in">
          <span className="material-symbols-outlined text-[#c9892c]">verified</span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* GPS Location Modal */}
      {showGpsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-[#fdf9f4] w-full max-w-md rounded-3xl p-6 shadow-2xl border-2 border-[#dec9b6] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#80141d]">location_on</span>
                <h3 className="font-serif font-bold text-[17px] text-[#2b1b15]">
                  Tọa Độ Vị Trí Mộ Phần
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGpsModal(false)}
                className="h-8 w-8 rounded-full bg-[#faefe3] hover:bg-[#ebdcd0] flex items-center justify-center text-[#543e34]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-[13px] text-[#543e34]">
              <p>
                <strong>Vị trí:</strong> Khu Lăng mộ Nguyễn Tộc, Thôn Trực Lãng Thượng, Huyện Nam Trực, Tỉnh Nam Định.
              </p>
              <div className="p-3 rounded-xl bg-[#faefe3] border border-[#ebdcd0] font-mono text-[12px] text-[#80141d] font-bold">
                Tọa độ GPS: 20°18&apos;44.2&quot;N 106°11&apos;06.4&quot;E
              </div>
              <p className="text-[11.5px] text-[#8a6f62]">
                Hướng lăng: Tọa Càn Hướng Tốn (Tây Bắc nhìn Đông Nam), tụ khí thủy triều long huyệt Nam Sách.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  window.open('https://maps.google.com/?q=20.312278,106.185111', '_blank');
                  setShowGpsModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#80141d] text-white font-bold text-[12px] hover:bg-[#681017] transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                <span>Mở Google Maps</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* =========================================================
            BREADCRUMBS NAVIGATION (THEO ĐÚNG HÌNH CHỤP)
            ========================================================= */}
        <div className="flex items-center gap-1.5 text-[11.5px] text-[#8a6f62] flex-wrap">
          <button
            type="button"
            onClick={() => onNavigate('cay-pha-he-25d')}
            className="hover:text-[#80141d] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">account_tree</span>
            <span>Cây gia phả</span>
          </button>
          <span>&gt;</span>
          <button
            type="button"
            onClick={() => onNavigate('tong-quan-pha-he')}
            className="hover:text-[#80141d] transition-colors font-medium"
          >
            Chi Trực Lãng
          </button>
          <span>&gt;</span>
          <span>Thế hệ thứ 11</span>
          <span>&gt;</span>
          <span className="text-[#80141d] font-bold">Cụ Cố Nguyễn Văn Phúc</span>
        </div>

        {/* =========================================================
            HERO CARD: CỤ CỐ NGUYỄN VĂN PHÚC (THEO HÌNH ẢNH)
            ========================================================= */}
        <div className="rounded-3xl bg-[#fdf9f4] border border-[#dec9b6] p-6 sm:p-8 shadow-xs relative overflow-hidden">
          {/* Watermark logo gia tộc chìm ở góc phải trên */}
          <div className="absolute right-6 top-6 opacity-10 pointer-events-none hidden sm:block">
            <span className="material-symbols-outlined text-[120px] text-[#80141d]">shield</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Cột trái: Ảnh chân dung + Nút thắp hương */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative w-56 sm:w-64 h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#dec9b6] bg-[#faefe3] shadow-md group">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Cụ Cố Nguyễn Văn Phúc"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                {/* Huy hiệu phục chế AI */}
                <div className="absolute bottom-2.5 inset-x-3 py-1 rounded-lg bg-[#c9892c] text-[#2b1b15] text-[10px] font-bold uppercase tracking-wider text-center shadow-xs">
                  1988 PHỤC CHẾ AI 4K
                </div>
              </div>

              {/* Nút thắp hương */}
              <button
                type="button"
                onClick={handleOfferIncense}
                className={`mt-4 w-56 sm:w-64 py-2.5 px-4 rounded-xl font-bold text-[13px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  hasOfferedIncense
                    ? 'bg-[#c9892c] text-[#2b1b15] ring-2 ring-[#c9892c]/40 animate-pulse'
                    : 'bg-[#80141d] text-white hover:bg-[#681017]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">mode_heat</span>
                <span>Thắp Nén Tâm Hương • {incenseCount.toLocaleString()}</span>
              </button>
            </div>

            {/* Cột phải: Thông tin danh xưng, niên đại, lăng mộ */}
            <div className="md:col-span-8 space-y-4">
              {/* Hàng nhãn huy hiệu */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#80141d] text-white text-[10px] font-bold uppercase tracking-wider">
                  ĐỜI THỨ 11
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#faefe3] border border-[#dec9b6] text-[#c9892c] text-[10px] font-bold uppercase tracking-wider">
                  CHI PHÁI TRỰC LÃNG
                </span>
                <span className="text-[11px] text-[#715b50]">
                  Hưởng thọ 77 tuổi
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#80141d] font-semibold">
                  <span className="h-2 w-2 rounded-full bg-[#80141d] inline-block" />
                  <span>Đã quy tiên (Hương Hỏa)</span>
                </span>
              </div>

              {/* Tên danh nhân & Chữ Hán */}
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h1 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#2b1b15] tracking-tight">
                    Cụ Cố Nguyễn Văn Phúc
                  </h1>
                  <span className="font-serif text-[22px] sm:text-[26px] font-bold text-[#80141d]">
                    阮文福
                  </span>
                </div>
                <p className="text-[12.5px] text-[#715b50] font-medium mt-1">
                  Tự: Minh Thuận • Hiệu: Chân Nho Cư Sĩ • Danh hiệu: Minh Thuận Tiên Sinh
                </p>
              </div>

              {/* 2 Khung Thông Tin Niên Kỷ & Mộ Phần */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* Khung 1: Niên kỷ */}
                <div className="p-3.5 rounded-2xl bg-[#faefe3]/70 border border-[#dec9b6] space-y-1.5 text-[11.5px]">
                  <div className="flex items-center gap-1.5 font-bold text-[#80141d] text-[11px] uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                    <span>Niên Kỷ Sinh - Tạ Thế</span>
                  </div>
                  <div>
                    <span className="text-[#8a6f62]">SINH HẠ: </span>
                    <strong className="text-[#2b1b15]">18/04/1912</strong> (Nhâm Tý)
                  </div>
                  <div>
                    <span className="text-[#8a6f62]">TẠ THẾ (NGÀY GIỖ NỘI): </span>
                    <strong className="text-[#80141d]">22/09/1988</strong> (Mậu Thìn)
                  </div>
                  <div className="text-[10.5px] text-[#715b50] pt-0.5">
                    Âm lịch: Ngày 12 tháng 8 (Đêm tháng mười)
                  </div>
                </div>

                {/* Khung 2: Mộ phần */}
                <div className="p-3.5 rounded-2xl bg-[#faefe3]/70 border border-[#dec9b6] space-y-1.5 text-[11.5px]">
                  <div className="flex items-center gap-1.5 font-bold text-[#80141d] text-[11px] uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[15px]">temple_buddhist</span>
                    <span>An Nghỉ / Mộ Phần</span>
                  </div>
                  <p className="text-[#2b1b15] leading-snug">
                    Khu Lăng mộ Nguyễn Tộc, Thôn Trực Lãng Thượng, Huyện Nam Trực, Tỉnh Nam Định
                  </p>
                  <p className="text-[10.5px] text-[#8a6f62] font-mono">
                    Tọa độ phả đồ: 20°18&apos;44.2&quot;N 106°11&apos;06.4&quot;E
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowGpsModal(true)}
                    className="text-[11px] font-bold text-[#80141d] hover:underline flex items-center gap-1 pt-0.5"
                  >
                    <span className="material-symbols-outlined text-[13px]">near_me</span>
                    <span>Chỉ Đường Vị Trí Mộ Phần</span>
                  </button>
                </div>
              </div>

              {/* Hàng nút chức năng */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="px-4 py-2 rounded-xl bg-[#80141d] text-white text-[12px] font-bold hover:bg-[#681017] transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">account_tree</span>
                  <span>Cây Phả Hệ Trực Tiếp</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đang kết xuất bản in phả ký lưu trữ A4...');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="px-3.5 py-2 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#543e34] text-[12px] font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#c9892c]">print</span>
                  <span>In Trích Bản Phả Ký</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('them-thanh-vien')}
                  className="px-3.5 py-2 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#543e34] text-[12px] font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#80141d]">edit</span>
                  <span>Chỉnh Sửa Hồ Sơ</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 2: PHẢ KÝ HUYẾT THỐNG (MỐI QUAN HỆ TRỰC HỆ & PHỐI NGẪU)
            ========================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider block">
                PHẢ KÝ HUYẾT THỐNG
              </span>
              <h2 className="font-serif text-[18px] font-bold text-[#2b1b15]">
                Mối Quan Hệ Trực Hệ &amp; Phối Ngẫu
              </h2>
            </div>
            <span className="text-[11.5px] text-[#8a6f62]">
              8 người con • 2 phối ngẫu
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Cột Trái (5 phần): Thân phụ & Thân mẫu + Hôn phối */}
            <div className="lg:col-span-5 space-y-4">
              {/* Thân phụ & Thân mẫu */}
              <div className="rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#80141d] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[15px]">diversity_1</span>
                  <span>Thân Phụ &amp; Thân Mẫu (Đời thứ 10)</span>
                </div>

                <div className="space-y-2">
                  {/* Thân Phụ */}
                  <div className="p-2.5 rounded-xl bg-white border border-[#ebdcd0] flex items-center justify-between hover:border-[#c5a880] transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src="/images/ancestor_portrait.jpg"
                        alt="Thân phụ"
                        className="w-10 h-10 rounded-full object-cover border border-[#c9892c]"
                      />
                      <div>
                        <span className="text-[9px] font-bold text-[#80141d] uppercase block">
                          THÂN PHỤ
                        </span>
                        <strong className="font-serif text-[13px] text-[#2b1b15] block">
                          Cụ Ông Nguyễn Hữu Trọng
                        </strong>
                        <span className="text-[10px] text-[#715b50]">1885 - 1949 • 64 tuổi</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#8a6f62] text-[18px]">chevron_right</span>
                  </div>

                  {/* Thân Mẫu */}
                  <div className="p-2.5 rounded-xl bg-white border border-[#ebdcd0] flex items-center justify-between hover:border-[#c5a880] transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
                        alt="Thân mẫu"
                        className="w-10 h-10 rounded-full object-cover border border-[#c9892c]"
                      />
                      <div>
                        <span className="text-[9px] font-bold text-[#80141d] uppercase block">
                          THÂN MẪU
                        </span>
                        <strong className="font-serif text-[13px] text-[#2b1b15] block">
                          Cụ Bà Đỗ Thị Nhàn
                        </strong>
                        <span className="text-[10px] text-[#715b50]">1890 - 1951 • 61 tuổi</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#8a6f62] text-[18px]">chevron_right</span>
                  </div>
                </div>
              </div>

              {/* Hôn Phối (Phu Nhân) */}
              <div className="rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#80141d] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[15px]">favorite</span>
                  <span>Hôn Phối (Phu Nhân)</span>
                </div>

                <div className="space-y-2">
                  {/* Chính Thất */}
                  <div className="p-3 rounded-xl bg-white border border-[#ebdcd0] flex items-start gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150"
                      alt="Chính thất"
                      className="w-10 h-10 rounded-full object-cover border border-[#80141d]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <strong className="font-serif text-[13px] text-[#2b1b15]">
                          Cụ Bà Phạm Thị Lan
                        </strong>
                        <span className="px-1.5 py-0.5 rounded bg-[#faefe3] text-[#80141d] text-[9.5px] font-bold">
                          Chính Thất
                        </span>
                      </div>
                      <div className="text-[10.5px] text-[#715b50]">1915 - 2002 (Thọ 87 tuổi)</div>
                      <div className="text-[10px] text-[#8a6f62] mt-0.5 flex justify-between">
                        <span>Kết hôn năm 1934</span>
                        <span className="font-semibold text-[#80141d]">Sinh hạ 6 con chung</span>
                      </div>
                    </div>
                  </div>

                  {/* Kế Thất */}
                  <div className="p-3 rounded-xl bg-white border border-[#ebdcd0] flex items-start gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
                      alt="Kế thất"
                      className="w-10 h-10 rounded-full object-cover border border-[#c9892c]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <strong className="font-serif text-[13px] text-[#2b1b15]">
                          Cụ Bà Hoàng Thị Bích
                        </strong>
                        <span className="px-1.5 py-0.5 rounded bg-[#faefe3] text-[#c9892c] text-[9.5px] font-bold">
                          Kế Thất
                        </span>
                      </div>
                      <div className="text-[10.5px] text-[#715b50]">1920 - 1975 (Thọ 55 tuổi)</div>
                      <div className="text-[10px] text-[#8a6f62] mt-0.5 flex justify-between">
                        <span>Kết hôn năm 1946</span>
                        <span className="font-semibold text-[#c9892c]">Sinh hạ 2 con chung</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột Phải (7 phần): Các Con Cái (Đời thứ 12 - Thứ tự sinh hạ) */}
            <div className="lg:col-span-7 rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] p-4 sm:p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#80141d] uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[15px]">child_care</span>
                    <span>Các Con Cái (Đời thứ 12 - Thứ Tự Sinh Hạ)</span>
                  </div>
                  <span className="text-[10.5px] text-[#8a6f62]">6 trai • 2 gái</span>
                </div>

                {/* Grid 6 con cái */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  {/* Con 1 */}
                  <div className="p-3 rounded-xl bg-white border border-[#ebdcd0] flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#faefe3] text-[#80141d] font-bold text-[11px] flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="space-y-0.5 text-[11px] flex-1">
                      <div className="flex items-center gap-1.5">
                        <strong className="font-serif text-[12.5px] text-[#2b1b15]">Nguyễn Trực Viên</strong>
                        <span className="px-1 py-0.2 rounded bg-[#80141d] text-white text-[8.5px] font-bold">
                          Trưởng Tôn
                        </span>
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">Hậu duệ: Cụ bà Phạm Thị Lan</div>
                      <div className="text-[9.5px] text-emerald-800 font-semibold">Sinh 1936 • Còn sống (88 tuổi)</div>
                    </div>
                  </div>

                  {/* Con 2 */}
                  <div className="p-3 rounded-xl bg-white border border-[#ebdcd0] flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#faefe3] text-[#80141d] font-bold text-[11px] flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div className="space-y-0.5 text-[11px] flex-1">
                      <strong className="font-serif text-[12.5px] text-[#2b1b15] block">Nguyễn Phục Khiêm</strong>
                      <div className="text-[10px] text-[#8a6f62] truncate">Chi Lăng mộ Nguyễn Tộc, Thôn Lăng Thượng...</div>
                      <div className="text-[9.5px] text-[#80141d]">1938 - 2013 (Thọ 75 tuổi)</div>
                    </div>
                  </div>

                  {/* Con 3 */}
                  <div className="p-3 rounded-xl bg-white border border-[#ebdcd0] flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#faefe3] text-[#80141d] font-bold text-[11px] flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div className="space-y-0.5 text-[11px] flex-1">
                      <strong className="font-serif text-[12.5px] text-[#2b1b15] block">Nguyễn Mai Hưởng</strong>
                      <div className="text-[10px] text-[#8a6f62]">Hậu duệ: Cụ bà Phạm Thị Lan</div>
                      <div className="text-[9.5px] text-emerald-800 font-semibold">Sinh 1942 • Còn sống</div>
                    </div>
                  </div>

                  {/* Con 4 */}
                  <div className="p-3 rounded-xl bg-white border border-[#ebdcd0] flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#faefe3] text-[#80141d] font-bold text-[11px] flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div className="space-y-0.5 text-[11px] flex-1">
                      <strong className="font-serif text-[12.5px] text-[#2b1b15] block">Nguyễn Trực Khoái</strong>
                      <div className="text-[10px] text-[#8a6f62]">Hậu duệ: Cụ bà Phạm Thị Lan</div>
                      <div className="text-[9.5px] text-[#80141d]">1945 - 1998 (Lâm tế)</div>
                    </div>
                  </div>

                  {/* Con 5 */}
                  <div className="p-3 rounded-xl bg-white border border-[#ebdcd0] flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#faefe3] text-[#80141d] font-bold text-[11px] flex items-center justify-center shrink-0">
                      5
                    </div>
                    <div className="space-y-0.5 text-[11px] flex-1">
                      <strong className="font-serif text-[12.5px] text-[#2b1b15] block">Nguyễn Thị Thu Hà</strong>
                      <div className="text-[10px] text-[#8a6f62]">Hậu duệ: Cụ bà Hoàng Thị Bích</div>
                      <div className="text-[9.5px] text-emerald-800 font-semibold">Sinh 1948 • Định cư Hà Nội</div>
                    </div>
                  </div>

                  {/* Con 6 */}
                  <div className="p-3 rounded-xl bg-white border border-[#ebdcd0] flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#faefe3] text-[#80141d] font-bold text-[11px] flex items-center justify-center shrink-0">
                      6
                    </div>
                    <div className="space-y-0.5 text-[11px] flex-1">
                      <strong className="font-serif text-[12.5px] text-[#2b1b15] block">Nguyễn Trực An</strong>
                      <div className="text-[10px] text-[#8a6f62]">Hậu duệ: Cụ bà Hoàng Thị Bích</div>
                      <div className="text-[9.5px] text-emerald-800 font-semibold">Sinh 1952 • Còn sống</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thanh thống kê hậu duệ bên dưới */}
              <div className="p-3 rounded-xl bg-[#faefe3] border border-[#ebdcd0] flex items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-[18px]">family_restroom</span>
                  <div>
                    <strong className="text-[#2b1b15]">Tổng quan phả hệ hậu duệ:</strong>{' '}
                    <span className="text-[#715b50]">Thống kê: 8 con, 18 cháu (nội/ngoại), 24 chắt đời thứ 14.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="text-[11px] font-bold text-[#80141d] hover:underline shrink-0"
                >
                  Khám phá trực hệ &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 3: BIÊN NIÊN SỬ GIA TỘC (DÒNG THỜI GIAN NIÊN ĐẠI & HÀNH TRẠNG)
            ========================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider block">
                BIÊN NIÊN SỬ GIA TỘC
              </span>
              <h2 className="font-serif text-[18px] font-bold text-[#2b1b15]">
                Dòng Thời Gian Niên Đại &amp; Hành Trạng
              </h2>
            </div>
            <span className="text-[11.5px] text-[#8a6f62]">
              1912 – 1988
            </span>
          </div>

          <div className="rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] p-6 sm:p-8 relative">
            {/* Đường trục dọc đỏ son nối timeline */}
            <div className="absolute left-[29px] sm:left-[37px] top-10 bottom-10 w-0.5 bg-[#80141d]/30" />

            <div className="space-y-6 relative">
              {/* Mốc 1: 1912 */}
              <div className="flex items-start gap-4 sm:gap-6 relative">
                <div className="w-5 h-5 rounded-full bg-[#80141d] ring-4 ring-[#faefe3] shrink-0 mt-1 z-10" />
                <div className="flex-1 p-4 rounded-xl bg-white border border-[#ebdcd0] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-serif font-bold text-[14px] text-[#2b1b15]">
                      Sinh Hạ Khởi Niên
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#faefe3] text-[#80141d] text-[10.5px] font-bold">
                      1912 • Nhâm Tý
                    </span>
                  </div>
                  <p className="text-[12px] text-[#543e34] leading-relaxed">
                    Sinh hạ vào tiết Thanh Minh năm Nhâm Tý tại Thôn Trực Lãng, Phủ Nam Trực, Tỉnh Nam Định. Là con trai trưởng của Cụ Nguyễn Hữu Trọng, thụ hưởng nền giáo dục Nho học gia phong từ thuở ấu thơ.
                  </p>
                </div>
              </div>

              {/* Mốc 2: 1930 */}
              <div className="flex items-start gap-4 sm:gap-6 relative">
                <div className="w-5 h-5 rounded-full bg-[#80141d] ring-4 ring-[#faefe3] shrink-0 mt-1 z-10" />
                <div className="flex-1 p-4 rounded-xl bg-white border border-[#ebdcd0] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-serif font-bold text-[14px] text-[#2b1b15]">
                      Đỗ Sơ Khảo Hán Học &amp; Thành Tài
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#faefe3] text-[#80141d] text-[10.5px] font-bold">
                      1930 • 18 Tuổi
                    </span>
                  </div>
                  <p className="text-[12px] text-[#543e34] leading-relaxed">
                    Đỗ kỳ thi Sơ khảo Hán văn hương tỉnh và tốt nghiệp Trường Quốc học Nam Định. Tinh thông chữ Hán, chữ Nôm và Quốc ngữ, bắt đầu tham gia phụ giúp việc chép sổ hộ tịch và tế tự đình làng.
                  </p>
                </div>
              </div>

              {/* Mốc 3: 1934 */}
              <div className="flex items-start gap-4 sm:gap-6 relative">
                <div className="w-5 h-5 rounded-full bg-[#80141d] ring-4 ring-[#faefe3] shrink-0 mt-1 z-10" />
                <div className="flex-1 p-4 rounded-xl bg-white border border-[#ebdcd0] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-serif font-bold text-[14px] text-[#2b1b15]">
                      Thành Hôn &amp; Tiếp Quản Hương Hỏa
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#faefe3] text-[#80141d] text-[10.5px] font-bold">
                      1934 • Giáp Tuất
                    </span>
                  </div>
                  <p className="text-[12px] text-[#543e34] leading-relaxed">
                    Thành hôn cùng Cụ Bà Phạm Thị Lan (người cùng thôn), chính thức nhận lãnh trách nhiệm trưởng chi, quản lý điền thổ hương hỏa và gìn giữ văn khế cổ của Đại tộc Nguyễn Phục Anh.
                  </p>
                </div>
              </div>

              {/* Mốc 4: 1954 */}
              <div className="flex items-start gap-4 sm:gap-6 relative">
                <div className="w-5 h-5 rounded-full bg-[#80141d] ring-4 ring-[#faefe3] shrink-0 mt-1 z-10" />
                <div className="flex-1 p-4 rounded-xl bg-white border border-[#ebdcd0] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-serif font-bold text-[14px] text-[#2b1b15]">
                      Đại Trùng Tu Từ Đường Dòng Họ
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#faefe3] text-[#80141d] text-[10.5px] font-bold">
                      1954 • Giáp Ngọ
                    </span>
                  </div>
                  <p className="text-[12px] text-[#543e34] leading-relaxed">
                    Khởi xướng và cùng bà con nội ngoại quyên góp trùng tu toàn bộ hậu cung Từ Đường Nguyễn Tộc bị hư hại sau chiến sự, gìn giữ nguyên vẹn hoành phi câu đối và bài vị tổ tiên qua bao loạn lạc.
                  </p>
                </div>
              </div>

              {/* Mốc 5: 1972 */}
              <div className="flex items-start gap-4 sm:gap-6 relative">
                <div className="w-5 h-5 rounded-full bg-[#80141d] ring-4 ring-[#faefe3] shrink-0 mt-1 z-10" />
                <div className="flex-1 p-4 rounded-xl bg-white border border-[#ebdcd0] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-serif font-bold text-[14px] text-[#2b1b15]">
                      Soạn Thảo Gia Phả Chép Tay Đương Đại
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#faefe3] text-[#80141d] text-[10.5px] font-bold">
                      1972 • Nhâm Tý
                    </span>
                  </div>
                  <p className="text-[12px] text-[#543e34] leading-relaxed">
                    Nhân dịp đại thọ lục tuần, Cụ đã dành 9 tháng khảo chứng các bia ký, điền bạ cổ để hoàn thiện bộ &quot;Gia Phả Chi Trực Lãng&quot; gồm 4 quyển chữ Nôm pha Quốc ngữ, nền tảng số hóa của phả hệ ngày nay.
                  </p>
                </div>
              </div>

              {/* Mốc 6: 1988 */}
              <div className="flex items-start gap-4 sm:gap-6 relative">
                <div className="w-5 h-5 rounded-full bg-[#80141d] ring-4 ring-[#faefe3] shrink-0 mt-1 z-10" />
                <div className="flex-1 p-4 rounded-xl bg-white border border-[#ebdcd0] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-serif font-bold text-[14px] text-[#2b1b15]">
                      Tạ Thế Về Với Tổ Tiên
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#80141d] text-white text-[10.5px] font-bold">
                      1988 • Mậu Thìn
                    </span>
                  </div>
                  <p className="text-[12px] text-[#543e34] leading-relaxed">
                    Thanh thản tạ thế vào giờ Ngọ ngày rằm tháng Bảy năm Mậu Thìn tại lăng gia trong vòng tay con cháu. Hưởng thọ 77 tuổi. Di huấn toàn tộc giữ vững lễ nghĩa, hiếu kính phụng tự và học hành tiến đức.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 4: KHO LƯU TRỮ DI SẢN (TƯ LIỆU KÝ ỨC, GIỌNG NÓI & DI VẬT)
            ========================================================= */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider block">
                KHO LƯU TRỮ DI SẢN
              </span>
              <h2 className="font-serif text-[18px] font-bold text-[#2b1b15]">
                Tư Liệu Ký Ức, Giọng Nói &amp; Di Vật Xưa
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex rounded-xl border border-[#dec9b6] bg-[#faefe3] p-1 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveMediaTab('photos')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeMediaTab === 'photos'
                    ? 'bg-[#80141d] text-white shadow-2xs font-bold'
                    : 'text-[#715b50] hover:text-[#2b1b15]'
                }`}
              >
                Hình Ảnh Xưa (9)
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('audio')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeMediaTab === 'audio'
                    ? 'bg-[#80141d] text-white shadow-2xs font-bold'
                    : 'text-[#715b50] hover:text-[#2b1b15]'
                }`}
              >
                Băng Ghi Âm (2)
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('relics')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeMediaTab === 'relics'
                    ? 'bg-[#80141d] text-white shadow-2xs font-bold'
                    : 'text-[#715b50] hover:text-[#2b1b15]'
                }`}
              >
                Kỷ Vật Cổ (3)
              </button>
            </div>
          </div>

          {/* 3 Tư Liệu Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden bg-[#faefe3]">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400"
                    alt="Lễ Mừng Thọ Lục Tuần"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[9.5px] font-bold">
                    Phục chế AI 4K
                  </span>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#8a6f62]">
                    <span>Năm 1972</span>
                    <span>Từ đường Chi tộc</span>
                  </div>
                  <h3 className="font-serif font-bold text-[13.5px] text-[#2b1b15]">
                    Lễ Mừng Thọ Lục Tuần (60 tuổi)
                  </h3>
                  <p className="text-[11.5px] text-[#715b50] leading-snug">
                    Con cháu tề tựu chúc thọ và dâng lễ tạ ơn tiền tổ tại quê nhà.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden bg-[#faefe3]">
                  <img
                    src="/images/hero_family.jpg"
                    alt="Ảnh Đại Gia Đình Đoàn Viên"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[9.5px] font-bold">
                    Phục chế AI 4K
                  </span>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#8a6f62]">
                    <span>Năm 1980</span>
                    <span>Sân Từ Đường</span>
                  </div>
                  <h3 className="font-serif font-bold text-[13.5px] text-[#2b1b15]">
                    Ảnh Đại Gia Đình Đoàn Viên
                  </h3>
                  <p className="text-[11.5px] text-[#715b50] leading-snug">
                    Tề tựu đủ 4 thế hệ trước khi các con trai lên đường công tác và nhập ngũ.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden bg-[#faefe3]">
                  <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400"
                    alt="Đại Trùng Tu Từ Đường"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#80141d] text-white text-[9.5px] font-bold">
                    Tư liệu gốc
                  </span>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#8a6f62]">
                    <span>Năm 1954</span>
                    <span>Xã Nam Lãng</span>
                  </div>
                  <h3 className="font-serif font-bold text-[13.5px] text-[#2b1b15]">
                    Đại Trùng Tu Từ Đường
                  </h3>
                  <p className="text-[11.5px] text-[#715b50] leading-snug">
                    Hình ảnh Cụ Đồ cùng các bô lão giám sát lắp dựng rường cột gỗ lim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 5: QUYỀN RIÊNG TƯ & XÁC THỰC DỮ LIỆU
            ========================================================= */}
        <div className="p-4 rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11.5px]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#faefe3] border border-[#ebdcd0] flex items-center justify-center text-[#c9892c] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <strong className="text-[#2b1b15] font-serif">Quyền Riêng Tư &amp; Xác Thực Dữ Liệu</strong>
                <span className="px-2 py-0.2 rounded-full bg-[#faefe3] text-[#80141d] text-[9.5px] font-bold">
                  Toàn bộ sao chép trong Dây Gia Phả
                </span>
              </div>
              <p className="text-[#715b50] text-[11px] mt-0.5">
                Chỉ trưởng tộc và Ban trị sự chi phái có thẩm quyền sửa đổi thông tin chính sử, ngày giỗ kỵ, chi tiết mộ phần và phả ký gốc. Mọi thành viên khác chỉ có thể đóng góp ảnh kỷ niệm hoặc kỷ vật.
              </p>
            </div>
          </div>

          <div className="text-[10px] text-[#8a6f62] shrink-0 text-right">
            Cập nhật lần cuối: 14/01/2026<br />
            bởi <strong>Trưởng tộc Nguyễn Trực Viên</strong>
          </div>
        </div>

        {/* =========================================================
            FOOTER CHÍNH THỐNG
            ========================================================= */}
        <footer className="pt-6 pb-4 border-t border-[#dec9b6] text-[11px] text-[#8a6f62] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#80141d]">Thích Cúng Kiếng</span>
            <span>•</span>
            <span>Hệ thống số hóa phả hệ &amp; nghi lễ gia tộc truyền thống</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate('tong-quan-pha-he')}
              className="hover:text-[#80141d] transition-colors"
            >
              Phả Ký Dòng Tộc
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('family-calendar')}
              className="hover:text-[#80141d] transition-colors"
            >
              Lịch Tế Tự
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors"
            >
              Bảo Tồn Di Sản
            </button>
            <span>•</span>
            <span className="text-[#8a6f62]">
              &copy; 2026 Thích Cúng Kiếng. Toàn quyền lưu trữ quyền riêng tư.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
