import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface VirtualMemorialHall3DScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const VirtualMemorialHall3DScreen: React.FC<VirtualMemorialHall3DScreenProps> = ({
  onNavigate,
}) => {
  const [isBellRinging, setIsBellRinging] = useState<boolean>(false);
  const [incenseSticks, setIncenseSticks] = useState<number>(3);
  const [hasOfferedFlowers, setHasOfferedFlowers] = useState<boolean>(true);
  const [cameraView, setCameraView] = useState<'main' | 'left' | 'right' | 'top'>('main');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRingBell = () => {
    setIsBellRinging(true);
    setToastMessage('Chuông đồng vang ngân thanh tịnh, tâm hồn an lạc bái hướng tiền tổ...');
    setTimeout(() => {
      setIsBellRinging(false);
      setTimeout(() => setToastMessage(null), 2500);
    }, 1800);
  };

  const handleLightIncense = () => {
    setIncenseSticks((prev) => prev + 1);
    setToastMessage('Đã kính cẩn thắp thêm một nén tâm hương trầm dâng lên Tiền Linh!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOfferFlowers = () => {
    setHasOfferedFlowers(true);
    setToastMessage('Đã dâng bình hoa cúc hoàng cung & huệ trắng thơm ngát!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#1c120c] text-[#fcf8f2] font-sans relative overflow-hidden flex flex-col justify-between select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#80141d] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-fade-in text-xs font-semibold">
          <span className="material-symbols-outlined text-[#faeed9] text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Atmospheric Background: Hall Interior with Dim Warm Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_family.jpg"
          alt="Từ Đường Cổ"
          className="w-full h-full object-cover brightness-[0.32] contrast-125 filter blur-[1px] scale-105"
        />
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute inset-0 bg-radial from-amber-900/30 via-black/60 to-black/90 pointer-events-none" />
      </div>

      {/* Top Floating Control Bar */}
      <div className="relative z-30 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-black/55 backdrop-blur-md border border-[#dec9b6]/25 rounded-2xl p-2.5 sm:px-4 shadow-xl">
          {/* Back button */}
          <button
            type="button"
            onClick={() => onNavigate('ho-so-huong-linh')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>←</span>
            <span>Rời Không Gian Tưởng Niệm (Trở về hồ sơ tĩnh)</span>
          </button>

          {/* Title & Status */}
          <div className="text-center space-y-0.5">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-serif font-bold text-sm sm:text-base text-[#faeed9] tracking-tight">
                Không Gian Tưởng Niệm Chi Tộc Trực Lăng
              </h1>
            </div>
            <div className="text-[10px] text-[#dec9b6]/80 uppercase tracking-wider">
              Thành Kính Truy Niệm • Phụng Thờ Tiền Tổ
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRingBell}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                isBellRinging
                  ? 'bg-amber-400 text-black border-amber-300 ring-2 ring-amber-300'
                  : 'bg-white/10 hover:bg-white/20 text-[#faeed9] border-white/15'
              }`}
            >
              <span className="material-symbols-outlined text-sm">notifications_active</span>
              <span>Chuông ngân thanh tịnh</span>
            </button>

            <button
              type="button"
              onClick={handleLightIncense}
              className="px-3.5 py-1.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-[#c9892c]/50"
            >
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              <span>Thắp Nén Tâm Hương</span>
            </button>

            <button
              type="button"
              onClick={handleOfferFlowers}
              className="px-3 py-1.5 rounded-xl bg-[#faeed9] hover:bg-white text-[#734c13] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">local_florist</span>
              <span>Dâng Hoa Tươi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sanctuary Area: 3D Altar Layout */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center items-center py-6 px-4 transition-transform duration-500"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Lacquered Boards (Hoành Phi) */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-block px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#5a0d14] via-[#80141d] to-[#5a0d14] border-2 border-[#c9892c] shadow-2xl">
            <div className="text-[10px] font-bold text-[#faeed9] tracking-widest uppercase">
              Ẩm Thủy Tư Nguyên
            </div>
            <div className="text-[9px] text-[#faeed9]/80 font-serif">
              Uống Nước Nhớ Nguồn • Đức Lưu Quang
            </div>
          </div>

          <div className="px-10 py-3 rounded-xl bg-gradient-to-r from-[#2b1b15] via-[#4a362f] to-[#2b1b15] border-2 border-[#c9892c] shadow-2xl">
            <div className="font-serif font-bold text-2xl sm:text-3xl text-[#faeed9] tracking-[0.25em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              ĐỨC LƯU QUANG
            </div>
          </div>
        </div>

        {/* 3 Ancestor Portraits Altar Tier */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 items-end max-w-2xl w-full mb-6">
          {/* Left: Cụ Bà Lê Thị Thục */}
          <div className="flex flex-col items-center space-y-1.5 text-center group cursor-pointer">
            <div className="p-1.5 bg-[#faeed9] border-2 border-[#c9892c] rounded-xl shadow-xl group-hover:border-white transition-colors">
              <img
                src="/images/ancestor_portrait.jpg"
                alt="Cụ Bà: Lê Thị Thục"
                className="w-24 sm:w-28 h-32 sm:h-36 object-cover rounded-lg filter grayscale contrast-125"
              />
            </div>
            <div className="px-2.5 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-bold border border-[#dec9b6]/40">
              Cụ Bà: Lê Thị Thục
            </div>
          </div>

          {/* Center (Grand): Cụ Cố Nguyễn Trọng Trực (1894 - 1972) */}
          <div
            onClick={() => onNavigate('ho-so-huong-linh')}
            className="flex flex-col items-center space-y-2 text-center group cursor-pointer -translate-y-4"
          >
            <div className="p-2 bg-gradient-to-b from-[#faeed9] to-[#c9892c] border-2 border-white rounded-2xl shadow-2xl ring-4 ring-[#80141d]/80 group-hover:scale-105 transition-transform">
              <img
                src="/images/ancestor_portrait.jpg"
                alt="Cụ Cố: Nguyễn Trọng Trực"
                className="w-32 sm:w-40 h-44 sm:h-52 object-cover rounded-xl filter grayscale contrast-125"
              />
            </div>
            <div className="px-3 py-1 rounded-md bg-[#80141d] text-white text-xs font-serif font-bold shadow-md border border-[#c9892c]">
              Cụ Cố: Nguyễn Trọng Trực (1894 - 1972)
            </div>
          </div>

          {/* Right: Trưởng Chi Nguyễn Trọng Kha */}
          <div className="flex flex-col items-center space-y-1.5 text-center group cursor-pointer">
            <div className="p-1.5 bg-[#faeed9] border-2 border-[#c9892c] rounded-xl shadow-xl group-hover:border-white transition-colors">
              <img
                src="/images/hero_family.jpg"
                alt="Trưởng Chi: Nguyễn Trọng Kha"
                className="w-24 sm:w-28 h-32 sm:h-36 object-cover rounded-lg filter grayscale contrast-125"
              />
            </div>
            <div className="px-2.5 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-bold border border-[#dec9b6]/40">
              Trưởng Chi: Nguyễn Trọng Kha
            </div>
          </div>
        </div>

        {/* Altar Offerings Table Tray */}
        <div className="w-full max-w-3xl bg-gradient-to-r from-[#faeed9]/90 via-[#fdfaf5]/95 to-[#faeed9]/90 backdrop-blur-md border border-[#c9892c] rounded-3xl p-5 shadow-2xl text-[#2b1b15]">
          <div className="flex items-center justify-between gap-4">
            {/* Left Offering: Bình Cúc Hoàng Cung */}
            <div className="flex flex-col items-center space-y-1 text-center">
              <span className="material-symbols-outlined text-3xl text-amber-600 animate-bounce">
                local_florist
              </span>
              <span className="text-[11px] font-bold text-[#734c13]">Bình Cúc Hoàng Cung</span>
            </div>

            {/* Left Candle */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-4 bg-amber-400 rounded-full animate-pulse shadow-[0_0_12px_#f59e0b]" />
              <div className="w-4 h-16 bg-[#5c4033] rounded-t-sm" />
            </div>

            {/* Center: Bát Hương Tộc Biểu */}
            <div
              onClick={handleLightIncense}
              className="flex flex-col items-center cursor-pointer group"
            >
              {/* Smoke & Incense Sticks */}
              <div className="flex items-end justify-center gap-1.5 -mb-2 z-10">
                {Array.from({ length: incenseSticks }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shadow-[0_0_8px_#ef4444]" />
                    <div className="w-0.5 h-10 bg-[#80141d]" />
                  </div>
                ))}
              </div>

              {/* Bronze Censer Body */}
              <div className="w-24 h-16 rounded-b-2xl bg-gradient-to-b from-[#805e36] to-[#4a362f] border-2 border-[#c9892c] shadow-lg flex items-center justify-center text-amber-200 text-xl font-serif">
                <span className="material-symbols-outlined text-3xl text-[#faeed9]">
                  temple_buddhist
                </span>
              </div>
              <div className="px-3 py-0.5 rounded-full bg-[#80141d] text-white text-[10px] font-bold mt-1 shadow-sm">
                Bát Hương Tộc Biểu
              </div>
              <div className="text-[9px] text-[#8a6f62] mt-0.5 group-hover:text-[#80141d]">
                Bấm để dâng lời tưởng niệm
              </div>
            </div>

            {/* Right Candle */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-4 bg-amber-400 rounded-full animate-pulse shadow-[0_0_12px_#f59e0b]" />
              <div className="w-4 h-16 bg-[#5c4033] rounded-t-sm" />
            </div>

            {/* Right Offering: Bình Huệ Trắng */}
            <div className="flex flex-col items-center space-y-1 text-center">
              <span className="material-symbols-outlined text-3xl text-emerald-700 animate-bounce">
                yard
              </span>
              <span className="text-[11px] font-bold text-[#734c13]">Bình Huệ Trắng</span>
            </div>
          </div>

          <div className="text-center text-[10px] font-serif font-bold text-[#80141d] tracking-widest uppercase border-t border-[#dec9b6]/50 pt-2.5 mt-3">
            Hiếu Để Nhược Tiên • Vĩnh Thế Lưu Phương
          </div>
        </div>
      </div>

      {/* Bottom Row: Left Book, Center Camera Controls, Right Album */}
      <div className="relative z-30 max-w-7xl w-full mx-auto px-4 sm:px-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Floating Card: Sách Ước & Sắc Phong */}
        <div
          onClick={() => onNavigate('phan-tich-but-tich')}
          className="p-3.5 bg-white rounded-2xl border border-[#dec9b6] shadow-2xl flex items-center gap-3 text-[#2b1b15] cursor-pointer hover:bg-[#faefe3] transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#faeed9] text-[#734c13] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">menu_book</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xs">Sách Ước &amp; Sắc Phong</span>
              <span className="px-1.5 py-0.2 rounded bg-[#80141d] text-white text-[9px] font-bold">
                1917
              </span>
            </div>
            <div className="text-[10px] text-[#8a6f62]">Bảo quản cấp gia tộc</div>
          </div>
        </div>

        {/* Center Camera Controls Toolbar */}
        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-[#dec9b6]/30 rounded-full px-3 py-1.5 shadow-xl text-white text-xs">
          <button
            type="button"
            onClick={() => setCameraView('left')}
            className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer ${
              cameraView === 'left' ? 'bg-white/30 text-white' : ''
            }`}
            title="Góc nhìn tả vu"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setCameraView('top')}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer"
            title="Góc nhìn hoành phi"
          >
            ^
          </button>
          <button
            type="button"
            onClick={() => {
              setCameraView('main');
              setZoomLevel(1);
            }}
            className="px-3 py-1 rounded-full bg-[#80141d] text-white font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">center_focus_strong</span>
            <span>Chính Diện</span>
          </button>
          <button
            type="button"
            onClick={() => alert('Góc nhìn bàn hương án')}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer"
            title="Góc nhìn hương án"
          >
            v
          </button>
          <button
            type="button"
            onClick={() => setCameraView('right')}
            className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer ${
              cameraView === 'right' ? 'bg-white/30 text-white' : ''
            }`}
            title="Góc nhìn hữu vu"
          >
            ›
          </button>

          <span className="w-px h-4 bg-white/20 mx-1" />

          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.max(0.8, prev - 0.1))}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 text-xs font-bold cursor-pointer"
            title="Thu nhỏ"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.min(1.3, prev + 0.1))}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 text-xs font-bold cursor-pointer"
            title="Phóng to"
          >
            +
          </button>
        </div>

        {/* Right Floating Card: Kỷ Vật Ảnh Đại Tộc */}
        <div
          onClick={() => onNavigate('album-dong-ho')}
          className="p-3.5 bg-white rounded-2xl border border-[#dec9b6] shadow-2xl flex items-center gap-3 text-[#2b1b15] cursor-pointer hover:bg-[#faefe3] transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">photo_library</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xs">Kỷ Vật Ảnh Đại Tộc</span>
              <span className="px-1.5 py-0.2 rounded bg-[#734c13] text-white text-[9px] font-bold">
                48 ảnh
              </span>
            </div>
            <div className="text-[10px] text-[#8a6f62]">Chi phái 1945 — 1985</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VirtualMemorialHall3DScreen;
