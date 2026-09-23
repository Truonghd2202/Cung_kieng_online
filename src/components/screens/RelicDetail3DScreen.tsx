import React, { useState, useEffect, useRef } from 'react';
import type { ScreenType } from '../../types.ts';

interface RelicDetail3DScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RelicDetail3DScreen: React.FC<RelicDetail3DScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'photos' | 'marks'>('3d');
  const [angle, setAngle] = useState<number>(99);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [incenseOffered, setIncenseOffered] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Drag-to-rotate references
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const startAngleRef = useRef<number>(99);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Auto-rotation effect: rotates smoothly when activeTab is '3d' and isAutoRotating is true
  useEffect(() => {
    if (activeTab !== '3d' || !isAutoRotating) return;

    const interval = setInterval(() => {
      setAngle((prev) => (prev >= 360 ? 1 : prev + 1));
    }, 40);

    return () => clearInterval(interval);
  }, [activeTab, isAutoRotating]);

  // Pause on user interaction, resume after 4 seconds of idle
  const pauseAutoRotate = () => {
    setIsAutoRotating(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  const scheduleResumeAutoRotate = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsAutoRotating(true);
    }, 4000);
  };

  // Mouse and Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    pauseAutoRotate();
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    startAngleRef.current = angle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const newAngle = Math.round((startAngleRef.current + deltaX) % 360);
    setAngle(newAngle < 0 ? newAngle + 360 : newAngle);
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      scheduleResumeAutoRotate();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoRotate();
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      dragStartXRef.current = e.touches[0].clientX;
      startAngleRef.current = angle;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    const newAngle = Math.round((startAngleRef.current + deltaX) % 360);
    setAngle(newAngle < 0 ? newAngle + 360 : newAngle);
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      scheduleResumeAutoRotate();
    }
  };

  const handleOfferIncense = () => {
    setIncenseOffered(true);
    showToast('Tâm hương đã được kính dâng lên án tiền Cụ Cố! Nguyện cầu tiền nhân chứng giám.');
  };

  const multiAnglePhotos = [
    { title: 'Mặt chính diện', desc: 'Mặt số men sứ trắng, kim mắt ngỗng thép xanh', img: '/images/relic_medals.jpg' },
    { title: 'Cạnh bên vặn cót', desc: 'Núm quả quýt mạ vàng 18K chạm khía cổ', img: '/images/relic_medals.jpg' },
    { title: 'Nắp sau chạm hoa', desc: 'Họa tiết chữ Thọ hoa cúc khắc chìm tinh xảo', img: '/images/relic_box.jpg' },
    { title: 'Máy cơ lộ thiên', desc: 'Con lắc bánh gai Omega Thụy Sĩ nguyên bản 100%', img: '/images/relic_medals.jpg' },
    { title: 'Dây xích bạc đúc', desc: 'Móc xích hoa văn hạt lúa truyền thống', img: '/images/relic_book.jpg' },
    { title: 'Tem triện niên hiệu', desc: 'Mộc đỏ chứng nhận Tòa Sứ Nam Định 1922', img: '/images/relic_book.jpg' },
  ];

  const marksInspection = [
    { title: 'Dấu triện kiểm định Besançon (Pháp)', time: 'Năm 1922', desc: 'Khắc chìm ở góc 6 giờ mặt trong nắp đáy, xác nhận tuổi vàng 18K và nguồn gốc xưởng chế tác hoàng gia.', status: 'Nguyên vẹn 100%' },
    { title: 'Vết xước nắp đáy mùa tản cư', time: 'Mùa đông 1946', desc: 'Vết cấn nhẹ do Cụ Bà chôn giấu dưới giếng cổ lúc sơ tán, minh chứng cho sự can trường giữ gìn gia bảo.', status: 'Dấu ấn lịch sử' },
    { title: 'Họa tiết chữ Thọ hoa cúc độc bản', time: 'Triều Khải Định thất niên', desc: 'Nghệ nhân Việt Nam cẩn chạm thêm theo điển tích gia phong khi Cụ Cố nhậm chức Huấn đạo.', status: 'Đặc trưng gia phong' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#fcf8f2] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#2b1b15] text-[#fcf8f2] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-bounce">
          <span className="material-symbols-outlined text-[#e8b56f] text-[20px]">task_alt</span>
          <span className="text-[12.5px] font-medium leading-snug">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* =========================================================
            BREADCRUMB & IDENTIFIERS
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] border-b border-[#dec9b6]/60 pb-3">
          <div className="flex items-center gap-2 text-[#6b584d] flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">photo_library</span>
              <span>Kho Ký Ức &amp; Kỷ Vật</span>
            </button>
            <span className="text-[#dec9b6]">/</span>
            <button
              type="button"
              onClick={() => onNavigate('bao-tang-gia-bao')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Bảo Tàng Gia Bảo
            </button>
            <span className="text-[#dec9b6]">/</span>
            <span className="text-[#80141d] font-bold">Chi Tiết Đồng Hồ Quả Quýt Khải Định 1922</span>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto text-xs">
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#dec9b6] font-mono text-[#6b584d] text-[11px]">
              Mã định danh: <span className="font-bold text-[#80141d]">#GB-1922-PHUC-01</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#faeed9] text-[#734c13] font-bold text-[10.5px] border border-[#eed9be]">
              Cấp bảo mật: Di sản chi phái
            </span>
          </div>
        </div>

        {/* =========================================================
            MAIN 2-COLUMN SECTION (6 COLS VIEWER / 6 COLS LORE)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 3D VIEWER CONTAINER (6 COLS) */}
          <div className="lg:col-span-6 space-y-4">
            {/* View Mode Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-[#dec9b6] text-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('3d');
                  setIsAutoRotating(true);
                }}
                className={`flex-1 py-2 rounded-xl font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                  activeTab === '3d'
                    ? 'bg-[#80141d] text-white shadow-xs'
                    : 'text-[#6b584d] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">3d_rotation</span>
                <span>Mô hình 3D 360°</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                  activeTab === 'photos'
                    ? 'bg-[#80141d] text-white shadow-xs'
                    : 'text-[#6b584d] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                <span>Ảnh đa góc chụp tĩnh (6)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('marks')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                  activeTab === 'marks'
                    ? 'bg-[#80141d] text-white shadow-xs'
                    : 'text-[#6b584d] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">saved_search</span>
                <span>Xem vết xước &amp; Dấu ấn thời gian</span>
              </button>
            </div>

            {/* Stage Box Content depending on tab */}
            {activeTab === '3d' && (
              <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative aspect-square rounded-3xl bg-[#1c1614] border border-[#dec9b6] p-6 flex flex-col justify-between overflow-hidden shadow-lg select-none cursor-grab active:cursor-grabbing"
              >
                {/* Top Status Indicators */}
                <div className="flex items-center justify-between text-[11px] z-10 pointer-events-none">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoRotating(!isAutoRotating);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-xs text-white border border-white/20 pointer-events-auto cursor-pointer transition-colors ${
                      isAutoRotating ? 'bg-black/75 hover:bg-black/90' : 'bg-[#80141d]/85'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isAutoRotating ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                      }`}
                    />
                    <span>
                      {isAutoRotating
                        ? 'Tự động xoay chậm • Giữ để tương tác'
                        : 'Đang tạm dừng • Nhấn để tiếp tục xoay'}
                    </span>
                  </div>

                  <span className="font-mono text-[#e8b56f] text-[11px] bg-black/75 px-2.5 py-1 rounded-md border border-white/10">
                    Góc quay: {angle}°
                  </span>
                </div>

                {/* 3D Model Center Stage with Dynamic Rotation and Specular Reflection */}
                <div className="relative flex-1 flex items-center justify-center my-auto">
                  <div
                    className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full shadow-2xl flex items-center justify-center transition-transform"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transition: isDraggingRef.current ? 'none' : 'transform 0.08s linear',
                    }}
                  >
                    {/* Outer Gold Dial Bezel Ticks */}
                    <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-[#c9892c]/50 animate-spin-slow pointer-events-none"></div>

                    {/* Image of Artifact */}
                    <img
                      src="/images/relic_medals.jpg"
                      alt="Đồng hồ quả quýt 1922 3D"
                      className="w-full h-full object-cover rounded-full border-4 border-[#c9892c] shadow-[0_0_50px_rgba(201,137,44,0.4)] pointer-events-none"
                    />

                    {/* Moving Specular Reflection Highlight based on angle */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-overlay"
                      style={{
                        background: `linear-gradient(${angle + 45}deg, rgba(255,255,255,0.8) 0%, transparent 40%, rgba(201,137,44,0.6) 100%)`,
                      }}
                    ></div>

                    {/* Center Pivot Point */}
                    <div className="absolute w-3.5 h-3.5 rounded-full bg-[#faeed9] border-2 border-[#80141d] shadow-sm"></div>
                  </div>
                </div>

                {/* Angle Slider Controls */}
                <div
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="bg-black/85 backdrop-blur-xs rounded-2xl p-3 border border-white/15 space-y-2 z-10 pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1.5 text-[11px] text-[#ebdcd0]">
                      <span className="material-symbols-outlined text-[15px] text-[#c9892c]">sync</span>
                      <span>Kéo rê chuột hoặc vuốt để xoay 360°</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#e8b56f] text-xs">195%</span>
                      <button
                        type="button"
                        onClick={() => {
                          setAngle(99);
                          setIsAutoRotating(true);
                        }}
                        className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[10.5px] cursor-pointer"
                      >
                        Đặt lại góc nhìn
                      </button>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onMouseDown={pauseAutoRotate}
                    onTouchStart={pauseAutoRotate}
                    onChange={(e) => {
                      setAngle(Number(e.target.value));
                      pauseAutoRotate();
                    }}
                    onMouseUp={scheduleResumeAutoRotate}
                    onTouchEnd={scheduleResumeAutoRotate}
                    className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#c9892c]"
                  />
                </div>

                {/* Footnote Bar */}
                <div className="text-center text-[10.5px] text-white/70 pt-2 pointer-events-none">
                  Hệ thống tự động xoay chậm sau 4 giây không tương tác. Chạm hoặc rê chuột để dừng xoay ngay lập tức để ngắm nhìn tĩnh.
                </div>
              </div>
            )}

            {/* Photos Tab: 6 Multi-angle High-res Photos */}
            {activeTab === 'photos' && (
              <div className="aspect-square rounded-3xl bg-white border border-[#dec9b6] p-4 overflow-y-auto space-y-3 shadow-lg">
                <div className="text-xs font-bold text-[#80141d] uppercase pb-2 border-b border-[#dec9b6]/60 flex items-center justify-between">
                  <span>Ảnh đa góc chụp tĩnh độ nét cao (6 góc)</span>
                  <span className="text-[11px] text-[#8a6f62] font-normal">Quét quang học 600DPI</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {multiAnglePhotos.map((photo, i) => (
                    <div key={i} className="space-y-1.5 rounded-xl border border-[#dec9b6] p-2 bg-[#fdfaf5]">
                      <div className="aspect-square rounded-lg overflow-hidden bg-black">
                        <img src={photo.img} alt={photo.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-serif font-bold text-xs text-[#2b1b15] block">{photo.title}</span>
                      <p className="text-[10px] text-[#6b584d] line-clamp-2">{photo.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Marks Tab: Inspection Scratches & Hallmarks */}
            {activeTab === 'marks' && (
              <div className="aspect-square rounded-3xl bg-white border border-[#dec9b6] p-5 overflow-y-auto space-y-3 shadow-lg">
                <div className="text-xs font-bold text-[#80141d] uppercase pb-2 border-b border-[#dec9b6]/60 flex items-center justify-between">
                  <span>Dấu ấn lịch sử &amp; Vết xước thời gian</span>
                  <span className="text-[11px] text-[#c9892c] font-bold">Thẩm định chứng thực</span>
                </div>
                <div className="space-y-3">
                  {marksInspection.map((mark, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-[#fdfaf5] border border-[#dec9b6] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-serif font-bold text-[#2b1b15]">{mark.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold">
                          {mark.status}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-[#80141d] font-semibold block">{mark.time}</span>
                      <p className="text-[11.5px] text-[#6b584d] leading-relaxed">{mark.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3 Action Buttons below 3D Box */}
            <div className="grid grid-cols-3 gap-3 text-xs font-semibold">
              <button
                type="button"
                onClick={handleOfferIncense}
                className="py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                <span>{incenseOffered ? 'Đã Dâng Tâm Hương' : 'Dâng Tâm Hương'}</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Mở tài liệu bản in ấn di sản tộc khổ lớn')}
                className="py-2.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">print</span>
                <span>Bản In Di Sản Tộc</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Gửi yêu cầu mở tủ kính chiêm bái nhân dịp giỗ chạp')}
                className="py-2.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px] text-[#c9892c]">lock_open</span>
                <span>Xin Mở Tủ Dịp Giỗ</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: LORE, PROVENANCE & ANCESTRAL METADATA (6 COLS) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Header Titles */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] font-bold text-[10.5px] border border-[#eed9be]">
                  BẢO VẬT TRIỀU NGUYỄN
                </span>
                <span className="text-[11px] text-[#8a6f62]">Niên hiệu Khải Định thất niên</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#80141d] tracking-tight">
                Đồng Hồ Quả Quýt Mạ Vàng Triều Khải Định (1922)
              </h1>

              <p className="text-[13px] text-[#6b584d] leading-relaxed">
                Kỷ vật lịch sử tri ân công đức tiền nhân của Chi Trưởng họ Nguyễn Phục Anh, gắn liền với nếp gia phong gìn giữ chữ Tín qua 4 thế hệ.
              </p>
            </div>

            {/* Card: Chất Liệu & Lai Lịch Di Vật */}
            <div className="p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/50">
                <h3 className="font-serif font-bold text-[14px] text-[#2b1b15] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#80141d]">inventory_2</span>
                  <span>Chất Liệu &amp; Lai Lịch Di Vật</span>
                </h3>
                <span className="text-[10.5px] text-[#c9892c] font-bold">Giám định 2024</span>
              </div>

              <div className="space-y-2.5 text-xs text-[#6b584d] leading-relaxed">
                <div>
                  <span className="font-bold text-[#2b1b15] block uppercase text-[10.5px]">Chất liệu chế tác:</span>
                  Vỏ đồng thau mạ vàng 18K cổ; mặt kính sapphire lồi chịu lực; kim mắt ngỗng thép xanh nung nhiệt; dây đeo móc xích bạc đúc hoa văn hạt lúa truyền thống.
                </div>

                <div>
                  <span className="font-bold text-[#2b1b15] block uppercase text-[10.5px]">Xuất xứ &amp; Dịp ban tặng:</span>
                  Hãng mạ vàng Đặng Đường đặt hàng xưởng chế tác danh tiếng Besançon (Pháp) năm 1922; được triều đình ban tặng cho Cụ Cố nhân dịp thụ phong Thông phán Nam Định.
                </div>

                <div>
                  <span className="font-bold text-[#2b1b15] block uppercase text-[10.5px]">Tình trạng bảo tồn:</span>
                  Cơ cấu con lắc và bánh gai còn nguyên bản 100%; mặt số men sứ trắng tinh tuyển không vết rạn nứt; bộ máy cơ vận hành chính xác sau bảo dưỡng dầu đồng hồ định kỳ.
                </div>

                <div className="pt-1 flex items-start gap-1.5 text-[11px] text-[#2b1b15]">
                  <span className="material-symbols-outlined text-[15px] text-[#c9892c] shrink-0 mt-0.5">place</span>
                  <span><strong>Vị trí lưu trữ vật lý:</strong> Tủ kính chống ẩm gian tả - Từ Đường Đại Tộc Nguyễn Phục Anh (Thôn Trực Lăng, Ý Yên, Nam Định).</span>
                </div>
              </div>
            </div>

            {/* Card: Lời Răn Dạy & Điển Tích */}
            <div className="p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/50">
                <h3 className="font-serif font-bold text-[14px] text-[#80141d] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#80141d]">record_voice_over</span>
                  <span>Lời Răn Dạy &amp; Điển Tích</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold">
                  Chỉ lưu gia tộc
                </span>
              </div>

              <blockquote className="font-serif italic text-xs text-[#2b1b15] bg-[#fdfaf5] p-3.5 rounded-2xl border-l-4 border-l-[#80141d] leading-relaxed">
                &ldquo;Chiếc đồng hồ này từng cùng cụ thân sinh đi qua những năm tháng tản cư kháng chiến gian lao. Cụ tuần coi tiếng gõ tích tắc nhịp nhàng là thước đo kỷ cương gia tộc, dặn dò con cháu đời sau: Giờ giấc chuẩn mực chính là cội rễ của chữ Tín.&rdquo;
              </blockquote>

              {/* Audio Wave Player */}
              <div className="p-3 rounded-2xl bg-[#fdfaf5] border border-[#dec9b6] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-8 h-8 rounded-full bg-[#80141d] text-white flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isPlayingAudio ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <div>
                    <span className="font-semibold text-xs block text-[#2b1b15]">
                      Ký ức tiếng tích tắc của Cụ Cố - Lời kể của Bác Trưởng tộc
                    </span>
                    <span className="text-[10.5px] text-[#8a6f62]">04:15 • Ghi âm tháng Chạp 2023</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-[#8a6f62]">
                  <span>01:28</span>
                </div>
              </div>
            </div>

            {/* Card: Tiền Nhân Sở Hữu & Người Đang Gìn Giữ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-2xs space-y-2">
                <span className="text-[10px] font-bold text-[#8a6f62] uppercase tracking-wide">
                  TIỀN NHÂN SỞ HỮU
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Cụ Cố Nguyễn Văn Phúc"
                    className="w-10 h-10 rounded-full object-cover border border-[#c9892c]"
                  />
                  <div>
                    <span className="font-serif font-bold text-xs text-[#2b1b15] block">
                      Cụ Cố Nguyễn Văn Phúc
                    </span>
                    <span className="text-[11px] text-[#6b584d]">Đời thứ 11 • 1912 – 1988</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('ho-so-tien-nhan')}
                  className="text-[11px] text-[#80141d] hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>Xem hồ sơ phả hệ</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-2xs space-y-2">
                <span className="text-[10px] font-bold text-[#8a6f62] uppercase tracking-wide">
                  NGƯỜI ĐANG GÌN GIỮ
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#faeed9] text-[#734c13] font-serif font-bold flex items-center justify-center border border-[#eed9be] text-xs">
                    Viên
                  </div>
                  <div>
                    <span className="font-serif font-bold text-xs text-[#2b1b15] block">
                      Bác Nguyễn Trực Viễn
                    </span>
                    <span className="text-[11px] text-[#6b584d]">Trưởng tộc đời 11</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#c9892c] font-semibold flex items-center gap-1 pt-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>Bảo hành theo hương ước tộc</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM SECTION: CHỨNG THƯ LỊCH SỬ & HÌNH ẢNH XƯA
            ========================================================= */}
        <div className="pt-6 border-t border-[#dec9b6]/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold text-[#80141d] uppercase tracking-wider">
                KHỐI TƯ LIỆU ĐÍNH KÈM
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2b1b15]">
                Chứng Thư Lịch Sử &amp; Hình Ảnh Xưa
              </h2>
              <p className="text-[12.5px] text-[#6b584d]">
                Tài liệu giấy điệp và hình ảnh thực địa xác thực tính nguyên bản của gia bảo qua một thế kỷ biến thiên.
              </p>
            </div>

            <button
              type="button"
              onClick={() => showToast('Mở biểu mẫu đóng góp tư liệu lịch sử liên quan')}
              className="px-4 py-2 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-[16px] text-[#80141d]">upload_file</span>
              <span>Đóng góp tư liệu liên quan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Doc Card 1 */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] overflow-hidden shadow-2xs space-y-2 p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black">
                  <img
                    src="/images/relic_book.jpg"
                    alt="Giấy chứng nhận xuất xứ"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded">
                    Năm 1922
                  </span>
                </div>
                <h4 className="font-serif font-bold text-xs text-[#2b1b15]">
                  Giấy Chứng Nhận Xuất Xứ Thuộc Địa
                </h4>
                <p className="text-[11px] text-[#6b584d] line-clamp-2">
                  Chứng thư của Tòa Sứ Nam Định ghi nhận việc trao tặng đồng hồ cho Cụ Cố ngày 14 tháng 8 năm 1922, có mộc đỏ...
                </p>
              </div>
              <div className="pt-2 border-t border-[#dec9b6]/50 flex items-center justify-between text-[11px]">
                <span className="text-[#8a6f62]">Bản quét phân giải cao 600DPI</span>
                <button
                  type="button"
                  onClick={() => showToast('Đang mở bản scan 600DPI')}
                  className="text-[#80141d] font-semibold hover:underline"
                >
                  Phóng to ↗
                </button>
              </div>
            </div>

            {/* Doc Card 2 */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] overflow-hidden shadow-2xs space-y-2 p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black">
                  <img
                    src="/images/hero_family.jpg"
                    alt="Ảnh Cụ Cố đeo đồng hồ"
                    className="w-full h-full object-cover filter contrast-125"
                  />
                  <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded">
                    Năm 1935
                  </span>
                </div>
                <h4 className="font-serif font-bold text-xs text-[#2b1b15]">
                  Ảnh Cụ Cố Đeo Đồng Hồ (Chụp 1935)
                </h4>
                <p className="text-[11px] text-[#6b584d] line-clamp-2">
                  Bức ảnh chụp tại hiệu ảnh Quốc Hoa (Hà Nội), sợi xích bọc hoa văn hạt lúa vắt qua túi áo cánh của Cụ được nh...
                </p>
              </div>
              <div className="pt-2 border-t border-[#dec9b6]/50 flex items-center justify-between text-[11px]">
                <span className="text-[#8a6f62]">Đã phục chế nét bằng AI</span>
                <button
                  type="button"
                  onClick={() => onNavigate('hoan-tat-phuc-che')}
                  className="text-[#80141d] font-semibold hover:underline"
                >
                  So sánh gốc ↗
                </button>
              </div>
            </div>

            {/* Doc Card 3 */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] overflow-hidden shadow-2xs space-y-2 p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black">
                  <img
                    src="/images/relic_box.jpg"
                    alt="Biên bản bàn giao 1974"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded">
                    Năm 1974
                  </span>
                </div>
                <h4 className="font-serif font-bold text-xs text-[#2b1b15]">
                  Biên Bản Bàn Giao &amp; Tra Dầu 1974
                </h4>
                <p className="text-[11px] text-[#6b584d] line-clamp-2">
                  Bút tích của cụ thân sinh truyền lại chiếc đồng hồ cho thế hệ kế tiếp trước khi trùng tu căn Từ Đường sau đợt b...
                </p>
              </div>
              <div className="pt-2 border-t border-[#dec9b6]/50 flex items-center justify-between text-[11px]">
                <span className="text-[#8a6f62]">Giấy Dó lưu trữ</span>
                <button
                  type="button"
                  onClick={() => onNavigate('phan-tich-but-tich')}
                  className="text-[#80141d] font-semibold hover:underline"
                >
                  Đọc toàn văn ↗
                </button>
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
