import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AlbumCollectionScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface AlbumItem {
  id: string;
  badge: string;
  countBadge: string;
  subBadges: { icon: string; text: string; highlight?: boolean }[];
  title: string;
  meta: string;
  description: string;
  creatorInit: string;
  creatorName: string;
  mainImage: string;
  subImage1: string;
  subImage2: string;
}

export const AlbumCollectionScreen: React.FC<AlbumCollectionScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const albums: AlbumItem[] = [
    {
      id: 'album1',
      badge: 'Tế Lễ Đại Tôn',
      countBadge: '+42 ảnh',
      subBadges: [
        { icon: 'groups', text: 'Toàn Gia Phả', highlight: true },
        { icon: 'schedule', text: '2 ngày trước' },
      ],
      title: 'Đại Lễ Giỗ Tổ & Vu Lan Qua Các Thời Kỳ',
      meta: 'Niên đại ghi nhận: 1956 – 2024 • 45 Tư liệu',
      description:
        'Hồ sơ tổng hợp các kỳ giỗ tổ tiền hiền hàng năm tại Đền Tộc, ngày hội Vu Lan báo hiếu và những biến thiên lịch sử gắn liền với tế tự.',
      creatorInit: 'V',
      creatorName: 'Khởi tạo bởi Trưởng tộc Viên',
      mainImage: '/images/hero_family.jpg',
      subImage1: '/images/ancestor_portrait.jpg',
      subImage2: '/images/relic_box.jpg',
    },
    {
      id: 'album2',
      badge: 'Bảo Tồn Kiến Trúc',
      countBadge: '+29 ảnh',
      subBadges: [
        { icon: 'public', text: 'Công Khai Nội Tộc' },
        { icon: 'photo_camera', text: 'Chụp 1920 – 2024' },
      ],
      title: 'Từ Đường Chi Trực Lãng – Lịch Sử 180 Năm',
      meta: 'Niên đại: 1845 – Hiện tại • 32 Ảnh & Bản vẽ',
      description:
        'Họa đồ kiến trúc nguyên bản, biên bản trùng tu thời vua Khải Định, kèm loạt ảnh phục dựng 3D các vì kèo chạm rồng tinh xảo.',
      creatorInit: 'K',
      creatorName: 'Khởi tạo bởi KTS. Nguyễn Khắc Tuấn',
      mainImage: '/images/relic_box.jpg',
      subImage1: '/images/relic_book.jpg',
      subImage2: '/images/relic_medals.jpg',
    },
    {
      id: 'album3',
      badge: '✨ AI Phục Chế 4K',
      countBadge: '+25 ảnh',
      subBadges: [
        { icon: 'history_edu', text: 'Lưu Truyền Di Sản', highlight: true },
        { icon: 'auto_fix_high', text: 'Phục chế AI 4K' },
      ],
      title: 'Chân Dung Các Vị Tiền Hiền Đời 1 Đến Đời 10',
      meta: 'Thế kỷ XV – Đầu thế kỷ XX • 28 Ảnh Phục Chế',
      description:
        'Hệ thống chân dung tiền nhân phục dựng công phu từ tranh truyền thần, ảnh vi lượng và truyền ký văn bia, thư mục gia phả.',
      creatorInit: 'B',
      creatorName: 'Khởi tạo bởi Ban Trị Sự Phả Ký',
      mainImage: '/images/ancestor_portrait.jpg',
      subImage1: '/images/hero_family.jpg',
      subImage2: '/images/relic_book.jpg',
    },
    {
      id: 'album4',
      badge: 'Bảo Vật Triều Nguyễn',
      countBadge: '+18 vật',
      subBadges: [
        { icon: 'view_in_ar', text: 'Hiện Vật 3D & Hán Nôm' },
        { icon: 'verified', text: 'Giám định Viện Hán Nôm' },
      ],
      title: 'Kỷ Vật Kháng Chiến & Sắc Phong Triều Nguyễn',
      meta: 'Thời Tự Đức (1852) – 1975 • 16 Hiện Vật',
      description:
        '03 đạo sắc phong ban cho các bậc trung thần, kỷ vật thời kỳ chiến khu và mô hình 3D xoay 360 độ các hiện vật gia truyền.',
      creatorInit: 'H',
      creatorName: 'Khởi tạo bởi Cụ Nguyễn Trực Hoan',
      mainImage: '/images/relic_book.jpg',
      subImage1: '/images/relic_box.jpg',
      subImage2: '/images/relic_medals.jpg',
    },
    {
      id: 'album5',
      badge: 'Ký Ức Đời Sống',
      countBadge: '+38 ảnh',
      subBadges: [
        { icon: 'family_restroom', text: 'Gia Đình & Phong Tục' },
        { icon: 'photo_library', text: '38 Tư liệu ảnh' },
      ],
      title: 'Tết Đoàn Viên Cổ Truyền – Ký Ức Thời Bao Cấp',
      meta: 'Giai đoạn: 1960 – 1989 • Đen Trắng & Phục Chế',
      description:
        'Những khoảnh khắc sum vầy đơn sơ mà nồng ấm: nồi bánh chưng đêm ba mươi, phiên chợ Tết tem phiếu và những lời chúc phúc đầu xuân.',
      creatorInit: 'M',
      creatorName: 'Khởi tạo bởi Cô Nguyễn Thị Minh',
      mainImage: '/images/hero_family.jpg',
      subImage1: '/images/ancestor_portrait.jpg',
      subImage2: '/images/relic_box.jpg',
    },
    {
      id: 'album6',
      badge: 'Chi Nhánh Di Cư',
      countBadge: '+19 tư liệu',
      subBadges: [
        { icon: 'handshake', text: 'Liên Kết Nam – Bắc' },
        { icon: 'location_on', text: 'Lục Tỉnh Nam Kỳ' },
      ],
      title: 'Nhánh Phương Nam (Sài Gòn – Lục Tỉnh)',
      meta: 'Từ 1954 – Nay • 22 Tư Liệu Lịch Sử',
      description:
        'Hành trình lập nghiệp của chi thứ 3 khi di cư vào Nam năm 1954, những lá thư trao gửi cách trở đôi miền và ngày đoàn viên ngày nay.',
      creatorInit: 'Đ',
      creatorName: 'Khởi tạo bởi Bác Nguyễn Đăng Khoa',
      mainImage: '/images/ancestor_portrait.jpg',
      subImage1: '/images/hero_family.jpg',
      subImage2: '/images/relic_medals.jpg',
    },
  ];

  const filteredAlbums = albums.filter((alb) => {
    return (
      searchQuery.trim() === '' ||
      alb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alb.meta.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] py-6 px-4 sm:px-6 lg:px-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2b1b15] text-[#fdf9f4] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c9892c] animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[#c9892c]">verified</span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Modal: Tạo Album Mới */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border-2 border-[#dec9b6] space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#80141d]">add_photo_alternate</span>
                <h3 className="font-serif font-bold text-[18px] text-[#2b1b15]">
                  Biên Soạn Tuyển Tập Album Mới
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="h-8 w-8 rounded-full bg-[#faefe3] hover:bg-[#ebdcd0] flex items-center justify-center text-[#543e34] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5 text-[12.5px] text-[#543e34]">
              <div>
                <label className="block font-bold text-[#2b1b15] mb-1">Tên Album ký ức *</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Kỷ Niệm Tảo Mộ Thanh Minh Qua Các Năm..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] outline-hidden text-[13px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2b1b15] mb-1">Thời gian / Niên đại</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 1975 – 2024"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] outline-hidden text-[13px]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2b1b15] mb-1">Phạm vi hiển thị</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] outline-hidden text-[13px]">
                    <option>Toàn Gia Phả</option>
                    <option>Chi Trực Lãng</option>
                    <option>Ban Trị Sự Tộc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2b1b15] mb-1">Lời tựa mở đầu tuyển tập</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả ý nghĩa và thông điệp lịch sử lưu truyền cho cháu con..."
                  className="w-full p-3 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] outline-hidden text-[12.5px] leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-xl border border-[#dec9b6] text-[#543e34] font-semibold text-[12.5px] hover:bg-[#faefe3]"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  showToast('Đã khởi tạo Album mới thành công vào Sổ Phả Ký!');
                }}
                className="px-5 py-2 rounded-xl bg-[#80141d] text-white font-bold text-[12.5px] shadow-sm hover:bg-[#681017]"
              >
                Tạo Album Ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Đặt In Bản Khắc Gỗ & Sách Da */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border-2 border-[#dec9b6] space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#80141d]">menu_book</span>
                <h3 className="font-serif font-bold text-[18px] text-[#2b1b15]">
                  Dịch Vụ Ấn Loát Phả Ký Toàn Tộc
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="h-8 w-8 rounded-full bg-[#faefe3] hover:bg-[#ebdcd0] flex items-center justify-center text-[#543e34]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-[12.5px] text-[#543e34] leading-relaxed">
              <p>
                <strong>Tiêu chuẩn xuất bản:</strong> Khổ đại A0/A3, in mực archival trên giấy Dó thủ công hoặc đóng bìa da bò thuộc mạ vàng dập nổi gia huy.
              </p>
              <div className="p-3 rounded-xl bg-[#faefe3] border border-[#dec9b6] text-[12px] space-y-1">
                <div>• Bản bìa da cao cấp lưu trữ 100+ năm</div>
                <div>• Bản mộc bản khắc gỗ dâng tế Thượng Điện</div>
                <div>• Bản bỏ túi gia phả lược dịch cho con cháu</div>
              </div>
              <p className="text-[11px] text-[#8a6f62]">
                Thời gian chế tác thủ công: 10 – 15 ngày làm việc dưới sự thẩm tra của Hội đồng Tộc ước.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl border border-[#dec9b6] text-[#543e34] text-[12.5px]"
              >
                Để sau
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPrintModal(false);
                  showToast('Đã gửi yêu cầu ấn loát gia phả tới Ban Phụng Sự dòng tộc!');
                }}
                className="px-5 py-2 rounded-xl bg-[#80141d] text-white font-bold text-[12.5px] shadow-sm hover:bg-[#681017]"
              >
                Gửi Yêu Cầu Ấn Loát
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* =========================================================
            TOP BREADCRUMBS & BADGE
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] border-b border-[#ebdcd0] pb-3">
          <div className="flex items-center gap-1.5 text-[#8a6f62] flex-wrap">
            <span>Đại Tộc Nguyễn Phục Anh</span>
            <span>&gt;</span>
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Kho Ký Ức &amp; Kỷ Vật
            </button>
            <span>&gt;</span>
            <span className="text-[#80141d] font-bold">Tuyển Tập Album</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#fef3dd] border border-[#f5dfb3] text-[#b3731a] text-[11px] font-bold tracking-wide">
            <span className="material-symbols-outlined text-[14px]">account_balance</span>
            <span>BẢO TÀNG SỐ CHI NHÁNH • TẬP PHẢ THỨ IV</span>
          </div>
        </div>

        {/* =========================================================
            HEADER TITLE & STATS COUNTER CARDS
            ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#c9892c] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#80141d]"></span>
              <span>KÝ ỨC TRƯỜNG TỒN</span>
            </div>

            <h1 className="font-serif font-bold text-[28px] sm:text-[34px] text-[#80141d] tracking-tight leading-tight">
              Tuyển Tập Album Ký Ức &amp; Điển Tích Dòng Họ
            </h1>

            <p className="text-[13px] text-[#6b584d] leading-relaxed">
              Nơi phân loại và tổ chức những chặng đường thăng trầm, sự kiện tế tự, cúng giỗ và tư liệu di sản qua từng chi phái và từng thế hệ phụng sự nguồn cội.
            </p>
          </div>

          {/* 2 Thẻ Thống Kê Bên Phải */}
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto">
            <div className="px-4 py-2.5 rounded-2xl bg-white border border-[#dec9b6] shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#fae8e6] text-[#80141d] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">collections_bookmark</span>
              </div>
              <div>
                <div className="font-serif font-bold text-[18px] text-[#80141d] leading-none">
                  6
                </div>
                <div className="text-[10.5px] text-[#8a6f62] mt-0.5">Album Di Sản</div>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-white border border-[#dec9b6] shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#fef3dd] text-[#c9892c] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              </div>
              <div>
                <div className="font-serif font-bold text-[18px] text-[#c9892c] leading-none">
                  181
                </div>
                <div className="text-[10.5px] text-[#8a6f62] mt-0.5">Tư Liệu Lưu Trữ</div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            ACTION BAR: TÌM KIẾM, SẮP XẾP, TẢI PDF & TẠO ALBUM
            ========================================================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
          {/* Ô tìm kiếm */}
          <div className="relative w-full md:max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a6f62] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên album, chi phái, triều đại, niên độ..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#dec9b6] focus:border-[#80141d] text-[13px] text-[#2b1b15] shadow-2xs outline-hidden"
            />
          </div>

          {/* Các nút hành động bên phải */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end text-[12px]">
            {/* Bộ chọn sắp xếp */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[#543e34]">
              <span className="material-symbols-outlined text-[16px] text-[#8a6f62]">sort</span>
              <span>Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-bold text-[#2b1b15] bg-transparent outline-hidden cursor-pointer"
              >
                <option value="newest">Mới nhất cập nhật</option>
                <option value="oldest">Cổ nhất theo niên đại</option>
                <option value="most">Nhiều tư liệu nhất</option>
              </select>
            </div>

            {/* Tải trọn bộ sách ảnh */}
            <button
              type="button"
              onClick={() => showToast('Đang khởi tạo bản in Trọn Bộ Sách Ảnh PDF chuẩn A0/A4...')}
              className="px-3.5 py-2 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#543e34] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#80141d]">menu_book</span>
              <span className="whitespace-nowrap">Tải Trọn Bộ Sách Ảnh PDF/A0</span>
            </button>

            {/* Tạo Album mới */}
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
              <span>Tạo Album Mới</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            GRID 6 ALBUM CARDS (2 ROWS OF 3 CARDS)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
          {filteredAlbums.map((alb) => (
            <div
              key={alb.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#dec9b6] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* KHUNG MULTI-PHOTO COLLAGE (ẢNH CHÍNH 2/3 + 2 ẢNH PHỤ BÊN PHẢI 1/3) */}
                <div className="relative aspect-[16/10] bg-[#faefe3] overflow-hidden p-1 flex gap-1">
                  {/* Ảnh chính lớn bên trái */}
                  <div className="w-2/3 h-full rounded-2xl overflow-hidden relative">
                    <img
                      src={alb.mainImage}
                      alt={alb.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Huy hiệu chính của Album */}
                    <span className="absolute top-2.5 left-2.5 bg-[#80141d]/90 backdrop-blur-xs text-white text-[9.5px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-white/20">
                      {alb.badge}
                    </span>
                  </div>

                  {/* 2 ảnh phụ xếp chồng bên phải */}
                  <div className="w-1/3 h-full flex flex-col gap-1">
                    <div className="h-1/2 w-full rounded-xl overflow-hidden relative">
                      <img
                        src={alb.subImage1}
                        alt="Chi tiết 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-1/2 w-full rounded-xl overflow-hidden relative">
                      <img
                        src={alb.subImage2}
                        alt="Chi tiết 2"
                        className="w-full h-full object-cover"
                      />
                      {/* Huy hiệu đếm số lượng còn lại */}
                      <span className="absolute inset-0 bg-black/60 backdrop-blur-2xs text-white font-bold text-[11px] flex items-center justify-center">
                        {alb.countBadge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PHẦN NỘI DUNG ALBUM */}
                <div className="p-5 space-y-2.5">
                  {/* Hàng nhãn phụ */}
                  <div className="flex items-center justify-between text-[11px] text-[#8a6f62]">
                    <span className="flex items-center gap-1 font-semibold text-[#80141d]">
                      <span className="material-symbols-outlined text-[14px]">
                        {alb.subBadges[0].icon}
                      </span>
                      <span>{alb.subBadges[0].text}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        {alb.subBadges[1].icon}
                      </span>
                      <span>{alb.subBadges[1].text}</span>
                    </span>
                  </div>

                  {/* Tiêu đề Album */}
                  <h3
                    onClick={() => onNavigate('chi-tiet-di-vat')}
                    className="font-serif font-bold text-[16px] text-[#2b1b15] group-hover:text-[#80141d] transition-colors leading-snug cursor-pointer line-clamp-1"
                  >
                    {alb.title}
                  </h3>

                  {/* Niên đại & thống kê */}
                  <div className="text-[11.5px] text-[#c9892c] font-semibold">
                    {alb.meta}
                  </div>

                  {/* Mô tả */}
                  <p className="text-[12px] text-[#6b584d] line-clamp-2 leading-relaxed">
                    {alb.description}
                  </p>

                  {/* Tác giả khởi tạo */}
                  <div className="pt-1 flex items-center gap-2 text-[11px] text-[#8a6f62]">
                    <span className="w-5 h-5 rounded-full bg-[#fae8e6] text-[#80141d] flex items-center justify-center font-bold text-[10px]">
                      {alb.creatorInit}
                    </span>
                    <span>{alb.creatorName}</span>
                  </div>
                </div>
              </div>

              {/* FOOTER CỦA THẺ ALBUM */}
              <div className="px-5 pb-4 pt-2.5 flex items-center justify-between border-t border-[#ebdcd0] text-[11.5px]">
                <button
                  type="button"
                  onClick={() => showToast(`Đang kết xuất Sách Ảnh PDF cho ${alb.title}...`)}
                  className="text-[#8a6f62] hover:text-[#80141d] flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
                  <span>Sách Ảnh PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('chi-tiet-di-vat')}
                  className="text-[#80141d] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Khám Phá Album</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================
            SPECIAL CALL-TO-ACTION BANNER: ẤN LOÁT GIA PHẢ TOÀN TỘC
            ========================================================= */}
        <div className="p-6 rounded-3xl bg-[#fdfaf5] border-2 border-[#dec9b6] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fae8e6] text-[#80141d] flex items-center justify-center shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[26px]">menu_book</span>
            </div>
            <div className="space-y-0.5">
              <h3 className="font-serif font-bold text-[16px] text-[#2b1b15]">
                Quy Cách Biên Soạn &amp; Ấn Loát Gia Phả Toàn Tộc
              </h3>
              <p className="text-[12px] text-[#6b584d] max-w-2xl leading-relaxed">
                Mọi album khi được hoàn thiện đều tự động đồng bộ hóa với hệ thống in ấn chất lượng chuẩn viện bảo tàng (khổ A0 / A3, mực archival không phai) phục vụ nghi thức dâng hương từ đường.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="px-5 py-3 rounded-2xl bg-[#80141d] hover:bg-[#681017] text-white font-bold text-[12.5px] transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Đặt In Bản Khắc Gỗ &amp; Sách Da</span>
          </button>
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
