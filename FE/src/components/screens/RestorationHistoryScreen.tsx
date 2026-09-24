import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface RestorationHistoryScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RestorationHistoryScreen: React.FC<RestorationHistoryScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'tree' | 'draft'>('tree');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerformer, setSelectedPerformer] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

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
            BREADCRUMB
            ========================================================= */}
        <div className="flex items-center gap-2 text-[12px] text-[#6b584d] border-b border-[#dec9b6]/60 pb-3">
          <button
            type="button"
            onClick={() => onNavigate('kho-ky-uc')}
            className="hover:text-[#80141d] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">photo_library</span>
            <span>Kho Ký Ức &amp; Kỷ Vật</span>
          </button>
          <span className="text-[#dec9b6]">/</span>
          <span className="text-[#80141d] font-bold">Lịch Sử Phục Chế AI</span>
        </div>

        {/* =========================================================
            HEADER & ACTIONS
            ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#80141d] tracking-tight">
              Nhật Ký &amp; Lịch Sử Phục Chế Ảnh AI Dòng Họ
            </h1>
            <p className="text-[13px] text-[#6b584d] max-w-3xl leading-relaxed">
              Theo dõi toàn bộ các đợt số hóa, phục dựng chân dung và tư liệu lịch sử của các chi phái đã được hoàn tất và thẩm định bởi Hội đồng Tộc biểu.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto text-xs">
            <button
              type="button"
              onClick={() => showToast('Đã mở cấu hình tham số Model AI Thị giác Vi-Heritage v3.2')}
              className="px-4 py-2.5 rounded-xl border border-[#dec9b6] bg-white text-[#2b1b15] hover:bg-[#faefe3] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#c9892c]">tune</span>
              <span>Thiết Lập Model</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('phuc-che-ai')}
              className="px-4 py-2.5 rounded-xl bg-[#80141d] text-white font-semibold hover:bg-[#681017] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
              <span>Tạo Lượt Phục Chế Mới</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            3 TOP METRIC SUMMARY CARDS
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Metric 1 */}
          <div className="p-5 rounded-3xl bg-white border border-[#dec9b6] space-y-2 relative overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#8a6f62] uppercase tracking-wider">
                THÀNH TỰU SỐ HÓA
              </span>
              <div className="w-7 h-7 rounded-full bg-[#fae8e6] text-[#80141d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">verified</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#80141d]">48</span>
              <span className="text-[13px] font-semibold text-[#2b1b15]">bức ảnh &amp; di vật</span>
            </div>
            <p className="text-[11.5px] text-[#80141d] flex items-center gap-1 font-medium pt-1">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              <span>+8 tư liệu được nghiệm thu trong tháng Chạp</span>
            </p>
          </div>

          {/* Metric 2 */}
          <div className="p-5 rounded-3xl bg-white border border-[#dec9b6] space-y-2 relative overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#8a6f62] uppercase tracking-wider">
                HẠN MỨC TỘC QUYỀN
              </span>
              <div className="w-7 h-7 rounded-full bg-[#faeed9] text-[#c9892c] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">token</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#2b1b15]">102</span>
              <span className="text-[13px] font-semibold text-[#6b584d]">/ 150 tín chỉ</span>
            </div>
            <p className="text-[11.5px] text-[#6b584d] pt-1">
              Tiêu hao: -2 tín chỉ / ảnh chân dung 4K • Tự động nạp đầu tháng
            </p>
          </div>

          {/* Metric 3 */}
          <div className="p-5 rounded-3xl bg-white border border-[#dec9b6] space-y-2 relative overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#8a6f62] uppercase tracking-wider">
                KHO LƯU TRỮ ĐÁM MÂY
              </span>
              <div className="w-7 h-7 rounded-full bg-[#f3eae0] text-[#6b584d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">cloud</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#2b1b15]">14.8</span>
              <span className="text-[13px] font-semibold text-[#6b584d]">GB / 50 GB</span>
            </div>
            <p className="text-[11.5px] text-[#6b584d] pt-1">
              Lưu trữ lossless TIFF &amp; RAW vĩnh viễn • <span className="text-[#80141d] font-semibold">Còn trống 35.2 GB</span>
            </p>
          </div>
        </div>

        {/* =========================================================
            SEARCH & FILTER TOOLBAR
            ========================================================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-1">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a6f62] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên người thân (vd: Cụ Cố Phúc), chi p..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-xs text-[#2b1b15] shadow-2xs placeholder:text-[#8a6f62]"
            />
          </div>

          {/* Filter Tabs & Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
              }`}
            >
              Tất Cả (48)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tree')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'tree'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
              }`}
            >
              Đã vào phả hệ (36)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('draft')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'draft'
                  ? 'bg-[#80141d] text-white shadow-xs'
                  : 'bg-white border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
              }`}
            >
              Bản nháp (12)
            </button>

            <div className="hidden lg:flex items-center gap-2 pl-2">
              <select
                value={selectedPerformer}
                onChange={(e) => setSelectedPerformer(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[#2b1b15] text-xs focus:outline-none cursor-pointer"
              >
                <option value="all">Người thực hiện: Toàn tộc ▾</option>
                <option value="truong-toc">Trưởng tộc Viên</option>
                <option value="chi-2">Nguyễn Phục Long (Chi 2)</option>
                <option value="chi-3">Chị Mai Hương</option>
              </select>

              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[#2b1b15] text-xs focus:outline-none cursor-pointer"
              >
                <option value="recent">Mới thực hiện gần nhất ▾</option>
                <option value="oldest">Cũ nhất trước</option>
                <option value="high-credits">Dùng nhiều tín chỉ nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================================================
            5 RESTORATION HISTORY CARDS LIST
            ========================================================= */}
        <div className="space-y-4 pt-1">
          {/* CARD 1: Cụ Cố Nguyễn Văn Phúc */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Split Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#241c19] shrink-0 border border-[#dec9b6] flex">
                <div className="w-1/2 h-full overflow-hidden">
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Bản gốc"
                    className="w-full h-full object-cover filter grayscale contrast-125 sepia-[0.5]"
                  />
                </div>
                <div className="w-1/2 h-full overflow-hidden border-l border-white/60">
                  <img
                    src="/images/ancestor_portrait.jpg"
                    alt="Phục chế 4K"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-1 right-1 bg-black/75 text-[#e8b56f] text-[8.5px] font-bold px-1.5 py-0.5 rounded">
                  Gốc vs 4K
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-[#fae8e6] text-[#80141d] text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">account_tree</span>
                    <span>Đã gắn vào Phả Hệ Đời 11</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] text-[10px] font-bold">
                    Chân dung thờ 4K
                  </span>
                </div>

                <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Cụ Cố Nguyễn Văn Phúc (1912 – 1988)
                </h3>

                <p className="text-[12px] text-[#6b584d] line-clamp-1 max-w-xl">
                  Phục chế chân dung 4K màu • Khử ố rách, tái tạo râu tóc tự nhiên, chỉnh sửa nếp gấp giấy điệp.
                </p>

                <div className="text-[11px] text-[#8a6f62] flex items-center gap-2 flex-wrap">
                  <span>📅 Hoàn thành: 14/08/2024</span>
                  <span>• 👤 Thực hiện: Trưởng tộc Viên</span>
                  <span className="text-[#80141d] font-semibold">• 🪙 Đã dùng: 2 tín chỉ</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('hoan-tat-phuc-che')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">compare</span>
                <span>Xem so sánh</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Đang tải bản ảnh phục chế 4K chuẩn in ấn...')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">download</span>
                <span>Tải ảnh</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Đã mở cấu hình in ấn phụng thờ A2/A3')}
                className="px-3 py-1.5 rounded-xl bg-[#80141d] text-white font-semibold hover:bg-[#681017] transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-[15px]">print</span>
                <span>In ấn</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Mở tùy chọn lưu trữ gia phả')}
                className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] cursor-pointer"
                title="Tùy chọn khác"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          </div>

          {/* CARD 2: Ảnh Đại Gia Đình Sân Từ Đường Tết 1965 */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#241c19] shrink-0 border border-[#dec9b6] flex">
                <img
                  src="/images/hero_family.jpg"
                  alt="Ảnh đại gia đình 1965"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/75 text-[#e8b56f] text-[8.5px] font-bold px-1.5 py-0.5 rounded">
                  Tập Thể Đời
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">archive</span>
                    <span>Đã duyệt vào Kho Ký Ức</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#f3eae0] text-[#6b584d] text-[10px] font-medium">
                    Nhận diện 42 diện mạo
                  </span>
                </div>

                <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Ảnh Đại Gia Đình Sân Từ Đường Tết 1965
                </h3>

                <p className="text-[12px] text-[#6b584d] line-clamp-1 max-w-xl">
                  Khử ố rách &amp; làm nét 42 khuôn mặt • Tách lớp kiến trúc từ đường, phục dựng hoa văn cỏ...
                </p>

                <div className="text-[11px] text-[#8a6f62] flex items-center gap-2 flex-wrap">
                  <span>📅 Hoàn thành: 10/08/2024</span>
                  <span>• 👤 Thực hiện: Nguyễn Phục Long (Chi 2)</span>
                  <span className="text-[#80141d] font-semibold">• 🪙 Đã dùng: 5 tín chỉ</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('hoan-tat-phuc-che')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">compare</span>
                <span>Xem so sánh</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Đang tải bản ảnh tập thể đại gia đình 4K...')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">download</span>
                <span>Tải ảnh</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('tuyen-tap-album')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#c9892c]">collections</span>
                <span>Vào Album</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Mở tùy chọn')}
                className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] cursor-pointer"
                title="Tùy chọn khác"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          </div>

          {/* CARD 3: Bản Dập Sắc Phong Niên Hiệu Tự Đức */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#241c19] shrink-0 border border-[#dec9b6] flex">
                <img
                  src="/images/relic_book.jpg"
                  alt="Sắc phong Tự Đức"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/75 text-[#e8b56f] text-[8.5px] font-bold px-1.5 py-0.5 rounded">
                  Sắc Phong
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-[#fae8e6] text-[#80141d] text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">menu_book</span>
                    <span>Bảo vật dòng họ</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#f3eae0] text-[#6b584d] text-[10px] font-medium">
                    Dập Mực Nho Nôm
                  </span>
                </div>

                <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Bản Dập Sắc Phong Niên Hiệu Tự Đức
                </h3>

                <p className="text-[12px] text-[#6b584d] line-clamp-1 max-w-xl">
                  Tái tạo độ tương phản mực nho &amp; chữ Hán Nôm • Tách viền triện son phụng hoàng cổ.
                </p>

                <div className="text-[11px] text-[#8a6f62] flex items-center gap-2 flex-wrap">
                  <span>📅 Hoàn thành: 02/08/2024</span>
                  <span>• 👤 Thực hiện: Trưởng tộc Viên</span>
                  <span className="text-[#80141d] font-semibold">• 🪙 Đã dùng: 3 tín chỉ</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('hoan-tat-phuc-che')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">compare</span>
                <span>Xem so sánh</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Đang tải bản scan độ phân giải cao sắc phong...')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">download</span>
                <span>Tải ảnh</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Đã hiển thị bản dịch Quốc ngữ: Sắc phong Triều Nguyễn...')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">translate</span>
                <span>Dịch nghĩa Nôm</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Mở tùy chọn')}
                className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] cursor-pointer"
                title="Tùy chọn khác"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          </div>

          {/* CARD 4: Cụ Bà Đỗ Thị Nhẫn */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#241c19] shrink-0 border border-[#dec9b6] flex">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Cụ Bà Đỗ Thị Nhẫn"
                  className="w-full h-full object-cover filter contrast-125 sepia-[0.3]"
                />
                <span className="absolute bottom-1 right-1 bg-black/75 text-[#e8b56f] text-[8.5px] font-bold px-1.5 py-0.5 rounded">
                  Truyền Thần
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-[#fae8e6] text-[#80141d] text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">account_tree</span>
                    <span>Đã gắn vào Phả Hệ Đời 10</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#faeed9] text-[#734c13] text-[10px] font-bold">
                    Ảnh thờ Bà Tổ
                  </span>
                </div>

                <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Cụ Bà Đỗ Thị Nhẫn (1890 – 1963)
                </h3>

                <p className="text-[12px] text-[#6b584d] line-clamp-1 max-w-xl">
                  Phục chế chân dung truyền thần • Tái cấu trúc khăn vấn nhung đen, chuỗi hạt ngọc và tà áo nă...
                </p>

                <div className="text-[11px] text-[#8a6f62] flex items-center gap-2 flex-wrap">
                  <span>📅 Hoàn thành: 28/07/2024</span>
                  <span>• 👤 Thực hiện: Chị Mai Hương</span>
                  <span className="text-[#80141d] font-semibold">• 🪙 Đã dùng: 2 tín chỉ</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('hoan-tat-phuc-che')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">compare</span>
                <span>Xem so sánh</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Đang tải ảnh phục chế cụ bà...')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">download</span>
                <span>Tải ảnh</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Đã mở cửa sổ in ấn ảnh thờ truyền thống')}
                className="px-3 py-1.5 rounded-xl bg-[#80141d] text-white font-semibold hover:bg-[#681017] transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-[15px]">print</span>
                <span>In ấn</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Mở tùy chọn')}
                className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] cursor-pointer"
                title="Tùy chọn khác"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          </div>

          {/* CARD 5: Lễ Dựng Cột Từ Đường Năm 1954 */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#241c19] shrink-0 border border-[#dec9b6] flex">
                <img
                  src="/images/hero_family.jpg"
                  alt="Lễ dựng cột 1954"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
                <span className="absolute bottom-1 right-1 bg-black/75 text-[#e8b56f] text-[8.5px] font-bold px-1.5 py-0.5 rounded">
                  Tư Liệu 1954
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-[#faefe3] text-[#a04000] text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">pending_actions</span>
                    <span>Bản nháp (Đang chờ Hội đồng duyệt)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#f3eae0] text-[#6b584d] text-[10px] font-medium">
                    Lịch sử kiến trúc
                  </span>
                </div>

                <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Lễ Dựng Cột Từ Đường Năm 1954
                </h3>

                <p className="text-[12px] text-[#6b584d] line-clamp-1 max-w-xl">
                  Làm rõ chi tiết thợ ngõa &amp; văn thơ gỗ lim • Loại bỏ hạt nhiễu âm bản phim nhựa cổ.
                </p>

                <div className="text-[11px] text-[#8a6f62] flex items-center gap-2 flex-wrap">
                  <span>📅 Hoàn thành: 15/07/2024</span>
                  <span>• 👤 Thực hiện: Nguyễn Phục Long (Chi 2)</span>
                  <span className="text-[#80141d] font-semibold">• 🪙 Đã dùng: 2 tín chỉ</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('hoan-tat-phuc-che')}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#80141d]">compare</span>
                <span>Xem so sánh</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Đã gửi phê duyệt bản phục chế vào Kho Ký Ức thành công!')}
                className="px-3.5 py-1.5 rounded-xl bg-[#80141d] text-white font-semibold hover:bg-[#681017] transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>Duyệt vào Kho</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Mở tùy chọn')}
                className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] cursor-pointer"
                title="Tùy chọn khác"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            PAGINATION BAR
            ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6b584d] pt-2 border-t border-[#dec9b6]/60">
          <span>Hiển thị 1 – 5 trong tổng số 48 kết quả phục chế</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="w-8 h-8 rounded-lg border border-[#dec9b6] bg-white text-[#2b1b15] flex items-center justify-center hover:bg-[#faefe3] cursor-pointer shadow-2xs"
            >
              &lt;
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-lg bg-[#80141d] text-white font-bold flex items-center justify-center shadow-xs cursor-pointer"
            >
              1
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-lg border border-[#dec9b6] bg-white text-[#2b1b15] flex items-center justify-center hover:bg-[#faefe3] cursor-pointer shadow-2xs"
            >
              2
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-lg border border-[#dec9b6] bg-white text-[#2b1b15] flex items-center justify-center hover:bg-[#faefe3] cursor-pointer shadow-2xs"
            >
              3
            </button>
            <span className="px-1 text-[#8a6f62]">...</span>
            <button
              type="button"
              className="w-8 h-8 rounded-lg border border-[#dec9b6] bg-white text-[#2b1b15] flex items-center justify-center hover:bg-[#faefe3] cursor-pointer shadow-2xs"
            >
              10
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-lg border border-[#dec9b6] bg-white text-[#2b1b15] flex items-center justify-center hover:bg-[#faefe3] cursor-pointer shadow-2xs"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* =========================================================
            SECURITY & COPYRIGHT BOX
            ========================================================= */}
        <div className="p-5 rounded-3xl bg-[#fcefe9] border border-[#f5d5c8] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#fae8e6] text-[#80141d] flex items-center justify-center shrink-0 border border-[#e69894]/40 shadow-2xs">
              <span className="material-symbols-outlined text-[22px]">lock</span>
            </div>
            <div className="space-y-0.5">
              <div className="font-serif font-bold text-[#2b1b15] text-[13.5px]">
                Cam Kết Mã Hóa &amp; Quyền Sở Hữu Vĩnh Viễn Của Gia Tộc
              </div>
              <p className="text-[11.5px] text-[#6b584d] max-w-2xl leading-relaxed">
                Tất cả hình ảnh và kỷ vật sau khi phục chế AI đều được ký số băm SHA-256 bảo vệ bản quyền, mã hóa AES-256 trên cụm máy chủ đặt tại Việt Nam. Toàn bộ bản phục chế nguyên mẫu thuộc quyền sở hữu 100% của dòng họ, không bao giờ được sử dụng để đào tạo AI công cộng.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showToast('Đã mở quy chế phả ký số mật mã Đại Tộc')}
            className="px-4 py-2.5 rounded-xl bg-white text-[#80141d] border border-[#dec9b6] font-semibold text-xs hover:bg-[#faefe3] transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px] text-[#c9892c]">shield</span>
            <span>Quy chế Phả ký số</span>
          </button>
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
