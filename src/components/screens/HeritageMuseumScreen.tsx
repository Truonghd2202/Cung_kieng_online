import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface HeritageMuseumScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const HeritageMuseumScreen: React.FC<HeritageMuseumScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('oldest');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const toggleSave = (id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const artifacts = [
    {
      id: 'GB-1922-01',
      code: '#GB-1922-01',
      badge3D: '3D 360°',
      status: 'Tủ kính Từ Đường • Đang hoạt động',
      tag: 'ĐỒNG HỒ • NIÊN ĐẠI 1922',
      title: 'Đồng hồ quả quýt mạ vàng OMEGA 1922',
      desc: 'Kỷ vật trao tay từ Cụ Cố Nguyễn Văn Phúc (Đời 11). Mặt số tráng men trắng tinh xảo, nắp đáy chạm trổ hoa văn chữ Thọ hoa cúc độc bản...',
      person: 'Cụ Cố Phúc (Đời 11)',
      roleBadge: 'Bảo vật Chi Trưởng',
      category: 'dongho',
      image: '/images/relic_medals.jpg',
      action1: 'Lời thuyết minh',
      action2: 'Khám Phá 3D',
      onAction1: () => showToast('Đang phát lời thuyết minh về Đồng hồ quả quýt OMEGA 1922'),
      onAction2: () => onNavigate('chi-tiet-gia-bao'),
    },
    {
      id: 'GB-1968-THU-02',
      code: '#GB-1968-THU-02',
      badge3D: 'Đã phiên âm AI',
      status: 'Túi chống ẩm gia tộc • Bảo tồn cấp 1',
      tag: 'BÚT TÍCH • NIÊN ĐẠI 1968',
      title: 'Thư tay răn dạy con cháu trước ngày nhập ngũ 1968',
      desc: 'Bút tích của Liệt sĩ Nguyễn Trực Khoái (Đời 12) gửi về cho mẹ và các em trước giờ hành quân vào chiến trường Trị Thiên Huế...',
      person: 'Liệt sĩ Trực Khoái',
      roleBadge: 'Tư liệu quý tộc',
      category: 'thutu',
      image: '/images/relic_book.jpg',
      action1: 'Đọc thư AI',
      action2: 'Xem Bản Quét',
      onAction1: () => onNavigate('phan-tich-but-tich'),
      onAction2: () => onNavigate('phan-tich-but-tich'),
    },
    {
      id: 'GB-YPHUC-03',
      code: '#GB-YPHUC-03',
      badge3D: '3D 360°',
      status: 'Tủ kính hút chân không • Nguyên vẹn 95%',
      tag: 'Y PHỤC CỔ • THẾ KỶ 20',
      title: 'Áo Dài Cổ Thọ Lụa Gấm Lam Ngọc',
      desc: 'Y phục mừng đại thọ bát tuần của Cụ Bà Đỗ Thị Nhàn (1890 - 1963). May thủ công hoàn toàn từ tơ tằm Vạn Phúc dệt nổi hoa mai...',
      person: 'Cụ Bà Đỗ Thị Nhàn',
      roleBadge: 'Hiện vật nguyên bản',
      category: 'yphuc',
      image: '/images/ancestor_portrait.jpg',
      action1: 'Lịch sử phục chế',
      action2: 'Khám Phá 3D',
      onAction1: () => onNavigate('lich-su-phuc-che'),
      onAction2: () => onNavigate('chi-tiet-gia-bao'),
    },
    {
      id: 'GB-SOTAY-1956',
      code: '#GB-SOTAY-1956',
      badge3D: '24 trang số hóa',
      status: 'Tàng thư chi họ • Đã quét OCR',
      tag: 'SỔ TAY GIA TRUYỀN • 1956',
      title: 'Sổ Tay Lễ Tiết & Mẹo Canh Nông Cổ',
      desc: 'Bút tích Bác Cả Nguyễn Trực Viễn. Ghi chép chi tiết các tuần tiết cúng giỗ bốn mùa, bài thuốc cổ truyền và quy định cúng tế dòng họ...',
      person: 'Bác Cả Trực Viễn',
      roleBadge: 'Gia phong bảo huấn',
      category: 'sotay',
      image: '/images/relic_book.jpg',
      action1: 'Bản dịch chữ Nôm',
      action2: 'Lật Sách Số',
      onAction1: () => onNavigate('phan-tich-but-tich'),
      onAction2: () => onNavigate('phan-tich-but-tich'),
    },
    {
      id: 'GB-TRAP-1865',
      code: '#GB-TRAP-1865',
      badge3D: '3D 360°',
      status: 'Tủ cấm từ đường • Cực phẩm gia truyền',
      tag: 'ĐỒ TỰ KHÍ • TỰ ĐỨC THỨ 18 (1865)',
      title: 'Tráp Sơn Mài Khảm Xà Cừ Dựng Sắc Lệnh',
      desc: 'Vật phẩm lưu giữ sắc phong triều Nguyễn ban cho tổ tiên dòng họ. Khảm ốc xà cừ ngũ sắc họa tiết lưỡng long chầu nguyệt tinh xảo...',
      person: 'Khởi Tổ Chi Nhánh',
      roleBadge: 'Bảo vật tối cao',
      category: 'dotho',
      image: '/images/relic_box.jpg',
      action1: 'Điển tích tráp cổ',
      action2: 'Khám Phá 3D',
      onAction1: () => showToast('Mở tài liệu điển tích tráp gỗ cổ thời Tự Đức'),
      onAction2: () => onNavigate('chi-tiet-gia-bao'),
    },
    {
      id: 'GB-BUTDONG-1910',
      code: '#GB-BUTDONG-1910',
      badge3D: '3D 360°',
      status: 'Phòng gia bảo tộc • Đồng thau nguyên khối',
      tag: 'BÚT NGHIÊN • NIÊN ĐẠI 1910',
      title: 'Bút Đồng Chữ Nôm Cụ Hàn Lâm Viện',
      desc: 'Bộ bút đồng và nghiên mực đúc đen của Cụ Hàn Lâm Viện Nguyễn Trực Thận dùng soạn thảo văn bia tiền tổ và gia phả chi phái...',
      person: 'Cụ Hàn Lâm Thận',
      roleBadge: 'Văn nhân khoa bảng',
      category: 'thutu',
      image: '/images/relic_medals.jpg',
      action1: 'Thuyết minh văn bia',
      action2: 'Khám Phá 3D',
      onAction1: () => showToast('Đang phát tư liệu văn bia khoa bảng dòng họ'),
      onAction2: () => onNavigate('chi-tiet-gia-bao'),
    },
  ];

  const filteredArtifacts = artifacts.filter((item) => {
    if (activeTab === 'dongho' && item.category !== 'dongho') return false;
    if (activeTab === 'thutu' && item.category !== 'thutu') return false;
    if (activeTab === 'yphuc' && item.category !== 'yphuc') return false;
    if (activeTab === 'sotay' && item.category !== 'sotay') return false;
    if (activeTab === 'dotho' && item.category !== 'dotho') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.person.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
            BREADCRUMB & COLLECTION CODE
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
            <span className="text-[#80141d] font-bold">BẢO TÀNG GIA BẢO</span>
            <span className="text-[#8a6f62] bg-[#faeed9] border border-[#eed9be] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
              BỘ SƯU TẬP DI VẬT #07
            </span>
          </div>
        </div>

        {/* =========================================================
            HEADER TITLE & ACTIONS
            ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#80141d] tracking-tight">
              Bảo Tàng Gia Bảo &amp; Di Vật Tổ Tiên
            </h1>
            <div className="text-[12px] text-[#c9892c] font-serif font-bold italic tracking-wide">
              — Gia Bảo Cổ Truyền – Lưu Dấu Tinh Hoa Huyết Thống —
            </div>
            <p className="text-[13px] text-[#6b584d] max-w-3xl leading-relaxed">
              Nơi phụng lưu, số hóa 3D và bảo tồn những kỷ vật thiêng liêng, hiện vật lịch sử gắn liền với cuộc đời, sự nghiệp của tiền nhân qua nhiều thế hệ dòng tộc Nguyễn Phục Anh.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto text-xs">
            <button
              type="button"
              onClick={() => onNavigate('phan-tich-but-tich')}
              className="px-4 py-2.5 rounded-xl border border-[#dec9b6] bg-white text-[#2b1b15] hover:bg-[#faefe3] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#c9892c]">history_edu</span>
              <span>Quét Chữ Viết Tay AI</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('hien-tang-gia-bao')}
              className="px-4 py-2.5 rounded-xl bg-[#80141d] text-white font-semibold hover:bg-[#681017] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Thêm Gia Bảo Mới</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            HERO FEATURED ARTIFACT (ĐỒNG HỒ QUẢ QUÝT OMEGA 1922)
            ========================================================= */}
        <div className="rounded-3xl bg-white border border-[#dec9b6] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left: 3D Interactive Mock Display */}
          <div className="lg:col-span-5 relative bg-[#1c1614] overflow-hidden flex items-center justify-center p-6 min-h-[320px]">
            {/* Top 3D badge */}
            <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-xs text-[#e8b56f] text-[10.5px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#c9892c] animate-pulse"></span>
              <span>ĐÃ DỰNG MÔ HÌNH 3D 360°</span>
            </div>

            {/* Watch Image */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-[#c9892c]/40 group cursor-grab">
              <img
                src="/images/relic_medals.jpg"
                alt="Đồng hồ quả quýt mạ vàng 1922"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Bottom ID Bar on Image */}
            <div className="absolute bottom-3 inset-x-3 bg-black/80 backdrop-blur-xs rounded-xl px-3 py-2 flex items-center justify-between text-white text-[11px] border border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#e8b56f]">qr_code_2</span>
                <span className="text-[#ebdcd0] text-[10.5px]">MÃ SỐ ĐỊNH DANH BẢO VẬT:</span>
                <span className="font-mono font-bold text-[#e8b56f]">#GB-1922-OMEGA-01</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('chi-tiet-gia-bao')}
                className="bg-[#80141d] hover:bg-[#681017] text-white px-2.5 py-1 rounded-md text-[10.5px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Xem chi tiết 3D</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right: Detailed Lore & Metadata */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] font-bold text-[10.5px] border border-[#eed9be]">
                  BẢO VẬT CHI TRƯỞNG • ĐỜI THỨ 11
                </span>
                <span className="text-[#8a6f62] flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                  <span>102 ngày an bản</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#80141d] leading-snug">
                Đồng hồ quả quýt mạ vàng Tây phương niên hiệu Khải Định (1922)
              </h2>

              <p className="text-[12.5px] text-[#6b584d] leading-relaxed">
                Kỷ vật do Cụ Cố Khởi Tổ Nguyễn Văn Phúc tiếp nhận khi nhậm chức Huấn đạo tỉnh vụ. Đồng hồ vỏ bằng đồng mạ vàng 18K do hãng Omega Thụy Sĩ chế tác năm 1922, nắp khắc chìm họa tiết chữ Thọ hoa cúc. Hiện trạng vẫn đang vận hành chính xác.
              </p>

              {/* 4 Metadata Attributes Table */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60">
                  <span className="text-[10px] text-[#8a6f62] uppercase block">Chủ nhân ban đầu:</span>
                  <span className="font-serif font-bold text-xs text-[#2b1b15]">Cụ Cố Nguyễn Văn Phúc</span>
                </div>

                <div className="p-3 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60">
                  <span className="text-[10px] text-[#8a6f62] uppercase block">Năm đúc:</span>
                  <span className="font-serif font-bold text-xs text-[#80141d]">1922 (Nhâm Tuất)</span>
                </div>

                <div className="p-3 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60">
                  <span className="text-[10px] text-[#8a6f62] uppercase block">Nơi phụng lưu:</span>
                  <span className="font-semibold text-xs text-[#2b1b15]">Tủ kính linh từ chi Trực Lăng</span>
                </div>

                <div className="p-3 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60">
                  <span className="text-[10px] text-[#8a6f62] uppercase block">Người quản thủ hiện tại:</span>
                  <span className="font-semibold text-xs text-[#2b1b15]">Trưởng tộc Nguyễn Trực Viễn</span>
                </div>
              </div>
            </div>

            {/* Audio Lore Player Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-[#dec9b6]/60">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="flex items-center gap-2 text-xs font-semibold text-[#80141d] hover:text-[#681017] transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#fae8e6] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">
                    {isPlayingAudio ? 'pause' : 'volume_up'}
                  </span>
                </div>
                <span>{isPlayingAudio ? 'Đang phát lời kể (01:42 / 03:45)' : 'Lời kể Trưởng Tộc (03:45)'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Đã sao chép liên kết chia sẻ gia bảo')}
                  className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] cursor-pointer"
                  title="Chia sẻ"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Đã lưu vào danh sách gia bảo yêu thích')}
                  className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] cursor-pointer"
                  title="Lưu trữ"
                >
                  <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SEARCH BAR & CATEGORY FILTER
            ========================================================= */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:max-w-xl">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a6f62] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên gia bảo, niên đại, người sở hữu (vd: Đồng hồ quả quýt, Áo dài lụa, Sắc phong, Sổ tay)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-xs text-[#2b1b15] shadow-2xs placeholder:text-[#8a6f62]"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
              <div className="flex items-center gap-1.5 text-[#6b584d]">
                <span className="text-[11px]">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#dec9b6] text-[#2b1b15] text-xs focus:outline-none cursor-pointer"
                >
                  <option value="oldest">Niên đại cổ nhất ▾</option>
                  <option value="newest">Mới sưu tầm gần nhất</option>
                  <option value="3d">Có mô hình 3D trước</option>
                </select>
              </div>

              <span className="px-3 py-1.5 rounded-xl bg-[#faeed9] border border-[#eed9be] text-[#734c13] font-bold text-xs">
                📦 24 HIỆN VẬT
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
              }`}
            >
              Tất cả gia bảo (24)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dongho')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'dongho'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">watch</span>
              <span>Đồng hồ &amp; Kỷ vật thời gian (3)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('thutu')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'thutu'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">history_edu</span>
              <span>Thư từ &amp; Bút tích (7)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('yphuc')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'yphuc'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">dry_cleaning</span>
              <span>Y phục &amp; Khăn áo cổ (4)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sotay')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'sotay'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">menu_book</span>
              <span>Sổ tay &amp; Nhật ký (5)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dotho')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'dotho'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">temple_buddhist</span>
              <span>Đồ thờ tự &amp; Khảm xà cừ (5)</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            6 ARTIFACT CARDS GRID (2 COLUMNS X 3 ROWS)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {filteredArtifacts.map((item) => {
            const isSaved = savedItems.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#dec9b6] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Image Display */}
                <div className="relative aspect-[16/10] bg-[#241c19] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white font-mono text-[10px] font-bold border border-white/20">
                      {item.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#faeed9] text-[#734c13] font-bold text-[10px] flex items-center gap-1 border border-[#eed9be]">
                      <span className="material-symbols-outlined text-[13px] text-[#c9892c]">view_in_ar</span>
                      <span>{item.badge3D}</span>
                    </span>
                  </div>

                  {/* Bottom Status Tag */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] text-white">
                    <span className="flex items-center gap-1 font-medium truncate drop-shadow-sm">
                      <span className="material-symbols-outlined text-[14px] text-[#e8b56f]">place</span>
                      <span className="truncate">{item.status}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSave(item.id)}
                      className="text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isSaved ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                      {item.tag}
                    </span>
                    <h3 className="text-[15px] font-serif font-bold text-[#2b1b15] mt-1 line-clamp-1 group-hover:text-[#80141d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-[#6b584d] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Person metadata */}
                  <div className="pt-2.5 border-t border-[#dec9b6]/50 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#2b1b15] truncate">{item.person}</span>
                    <span className="px-2 py-0.5 rounded bg-[#fae8e6] text-[#80141d] font-bold shrink-0">
                      {item.roleBadge}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <button
                      type="button"
                      onClick={item.onAction1}
                      className="py-2 px-2.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#80141d]">record_voice_over</span>
                      <span className="truncate">{item.action1}</span>
                    </button>
                    <button
                      type="button"
                      onClick={item.onAction2}
                      className="py-2 px-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[15px]">view_in_ar</span>
                      <span className="truncate">{item.action2}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            BOTTOM COMMITMENT BANNER (Preservation Standards)
            ========================================================= */}
        <div className="rounded-3xl bg-[#fdfaf5] border border-[#dec9b6] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faeed9] text-[#734c13] text-[10.5px] font-bold uppercase tracking-wider border border-[#eed9be]">
                <span className="material-symbols-outlined text-[14px]">security</span>
                <span>CAM KẾT QUY CHUẨN BẢO TỒN DI SẢN SỐ HUYẾT THỐNG</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#80141d]">
                Số Hóa 3D Tiêu Chuẩn Hiện Vật Bảo Tàng • Lưu Truyền Muôn Đời
              </h3>
              <p className="text-[12.5px] text-[#6b584d] max-w-2xl leading-relaxed">
                Toàn bộ gia bảo của dòng tộc được số hóa qua công nghệ quét quang học 3D độ phân giải micro, lưu trữ trên nền tảng điện toán đám mây phân tán mã hóa AES-256. Bản quyền hình ảnh và dữ liệu di vật hoàn toàn thuộc quyền sở hữu bất khả xâm phạm của Hội Đồng Gia Tộc.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-[12px] text-[#2b1b15]">
                <div className="flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-[18px] text-[#c9892c]">3d_rotation</span>
                  <span>3D Photogrammetry: Tái tạo chi tiết vân gỗ, lụa, kim loại đến 0.05mm</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-[18px] text-[#c9892c]">translate</span>
                  <span>Phiên Âm Hán Nôm AI: Nhận diện và dịch nghĩa tự động các bản văn thư cổ</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-[18px] text-[#c9892c]">nfc</span>
                  <span>Bảo Vệ Độc Bản: Cấp thẻ căn cước số hóa NFC cho từng hiện vật vật lý</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('hien-tang-gia-bao')}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Đăng Ký Số Hóa Hiện Vật Tộc
              </button>
              <button
                type="button"
                onClick={() => onNavigate('chi-tiet-gia-bao')}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                Xem Cẩm Nang Giữ Gìn Hiện Vật
              </button>
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
