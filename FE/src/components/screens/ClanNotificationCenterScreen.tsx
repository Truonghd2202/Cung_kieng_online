import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface ClanNotificationCenterScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ClanNotificationCenterScreen: React.FC<ClanNotificationCenterScreenProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ritual' | 'admin' | 'memory' | 'account'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [zaloEnabled, setZaloEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [browserEnabled, setBrowserEnabled] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#80141d] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-fade-in text-xs font-semibold">
          <span className="material-symbols-outlined text-[#faeed9] text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-[#dec9b6]/50 pb-3">
          <div className="flex items-center gap-2 text-[#8a6f62]">
            <span>Quản Trị &amp; Cá Nhân</span>
            <span>&gt;</span>
            <span className="text-[#80141d] font-bold">Trung Tâm Thông Báo Gia Tộc</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-[10px] font-bold">
              • 16 Thông báo chưa đọc
            </span>
            <span className="text-[#dec9b6]">|</span>
            <span className="text-[11px] text-[#8a6f62] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#c9892c]">sync</span>
              <span>Đồng bộ máy chủ Gia Tộc lúc 09:15</span>
            </span>
          </div>
        </div>

        {/* Hero Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[10px] font-bold uppercase tracking-wider border border-[#dec9b6]">
              <span className="material-symbols-outlined text-xs">notifications_active</span>
              <span>BẢO PHỤC TỰ VIỆC TỘC &amp; BÁO TIN LINH THIÊNG</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15] leading-tight">
              Trung Tâm Thông Báo &amp; Tin Tức Gia Tộc
            </h1>

            <p className="text-xs text-[#6b584d] leading-relaxed">
              Theo dõi biến chuyển tế tự, nhắc nhở tuần tiết giỗ chạp và mọi sinh hoạt kết nối phả hệ từ các chi phái cháu con muôn đời.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setToastMessage('Đã đánh dấu toàn bộ 16 thông báo là đã đọc!');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-4 py-2 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-base">done_all</span>
              <span>Đánh dấu tất cả đã đọc</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setToastMessage('Đang mở cài đặt kênh thông báo...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-4 py-2 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-base">tune</span>
              <span>Cài đặt kênh tin</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'Tất cả thông báo (12)', icon: 'all_inbox' },
            { id: 'ritual', label: 'Giỗ Chạp & Nghi Lễ (4)', icon: 'temple_buddhist' },
            { id: 'admin', label: 'Quản Trị & Phả Hệ (3)', icon: 'schema' },
            { id: 'memory', label: 'Ký Ức & Kỷ Vật (3)', icon: 'photo_library' },
            { id: 'account', label: 'Hệ thống & Tài Khoản (2)', icon: 'manage_accounts' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors border flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#80141d] text-white border-[#80141d] font-bold shadow-2xs'
                  : 'bg-white text-[#6b584d] border-[#dec9b6] hover:border-[#c9892c]'
              }`}
            >
              <span className="material-symbols-outlined text-xs">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar + Week Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 sm:max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a6f62] text-sm pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tin cậy, lễ vật, chi phái..."
              className="w-full bg-white border border-[#dec9b6] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6b584d]">
            <span>Xem khoảng thời gian:</span>
            <select className="bg-white border border-[#dec9b6] rounded-xl px-3 py-2 text-xs text-[#2b1b15] font-semibold focus:outline-none cursor-pointer">
              <option>Tuần 24 Tháng Chạp - Ất Tỵ</option>
              <option>Tuần 23 Tháng Chạp</option>
              <option>Tuần Rằm Tháng Chạp</option>
            </select>
          </div>
        </div>

        {/* 2 Columns Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (~65%) - Notifications Feed */}
          <div className="lg:col-span-8 space-y-6">
            {/* GROUP 1: HÔM NAY */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#80141d]" />
                <span className="font-serif font-bold text-[#2b1b15]">Hôm Nay</span>
                <span className="px-2 py-0.2 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                  2 thông báo mới
                </span>
              </div>

              {/* Notification 1: Giỗ Cụ Bà Đỗ Thị Nhẫn */}
              <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs space-y-3 hover:border-[#80141d] transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#faeed9] border border-[#dec9b6] text-[#734c13] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-lg">temple_buddhist</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-200">
                          Giỗ chạp sắp tới
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold border border-[#dec9b6]">
                          Còn 3 ngày
                        </span>
                        <span className="text-[#8a6f62]">Hôm nay, 08:30 sáng</span>
                      </div>

                      <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                        Lễ Giỗ Cụ Bà Đỗ Thị Nhẫn (Chính giỗ 27 Tháng Chạp)
                      </h2>

                      <p className="text-xs text-[#6b584d] leading-relaxed">
                        Ban khánh tiết Từ đường Chi Trực Lăng đã thống nhất cập nhật thực đơn 7 món cúng dâng hương, chuẩn bị 50 phần trầu cau và hoàn thành phân công chuẩn bị mâm lễ nghinh rước tiền nhân.
                      </p>
                    </div>
                  </div>

                  <button type="button" className="text-[#8a6f62] hover:text-[#80141d] p-1 cursor-pointer">
                    <span className="material-symbols-outlined text-base">more_vert</span>
                  </button>
                </div>

                <div className="p-2.5 bg-[#faefe3]/60 rounded-xl border border-[#dec9b6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2 text-[11px] text-[#4a362f]">
                    <span className="material-symbols-outlined text-sm text-[#80141d]">history_edu</span>
                    <span>Lễ Thức: Cúng Tộc Đệ (26 tào &amp; Chính Kỳ 27 trưa) tại Nhà Thờ Họ</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onNavigate('chi-tiet-gio-chap')}
                      className="px-3 py-1 bg-white border border-[#dec9b6] hover:bg-[#faefe3] rounded-lg text-xs font-medium text-[#4a362f] cursor-pointer"
                    >
                      Phân việc họ
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('chi-tiet-nghi-le')}
                      className="px-3 py-1 bg-[#80141d] text-white hover:bg-[#681017] rounded-lg text-xs font-bold cursor-pointer shadow-2xs"
                    >
                      Xem mâm cỗ &amp; văn khấn &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification 2: Phục chế ảnh AI hoàn tất */}
              <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs space-y-3 hover:border-[#80141d] transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-lg">auto_awesome</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-200">
                          Phục chế di sản AI
                        </span>
                        <span className="text-[#8a6f62]">Hôm nay, 07:15 sáng</span>
                      </div>

                      <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                        Phục chế ảnh hoàn tất: Cụ Cố Nguyễn Khắc Cẩn (1889 - 1961)
                      </h2>

                      <p className="text-xs text-[#6b584d] leading-relaxed">
                        Bức chân dung cổ thời Pháp thuộc bị ố vàng đã được thuật toán AI chuyên biệt dòng tộc khử hạt xước, tái tạo vạt áo gấm sa tanh và nâng độ phân giải lên tiêu chuẩn lưu trữ 4K.
                      </p>
                    </div>
                  </div>

                  <button type="button" className="text-[#8a6f62] hover:text-[#80141d] p-1 cursor-pointer">
                    <span className="material-symbols-outlined text-base">more_vert</span>
                  </button>
                </div>

                {/* Before / After Images Preview */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-[#faefe3]/40 rounded-2xl border border-[#dec9b6]/60">
                  <div className="relative rounded-xl overflow-hidden border border-[#dec9b6] h-32 bg-stone-900 group">
                    <img
                      src="/images/ancestor_portrait.jpg"
                      alt="Bản gốc 1930"
                      className="w-full h-full object-cover filter grayscale contrast-125"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[9px]">
                      Bản gốc (1930)
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-[#80141d] h-32 bg-stone-900 group">
                    <img
                      src="/images/ancestor_portrait.jpg"
                      alt="Phục chế 4K"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#80141d] text-white text-[9px] font-bold">
                      • Phục chế 4K Sắc Nét
                    </span>
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-500/90 text-white text-[9px] font-bold">
                      +10 Tín chỉ AI đã dùng
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => onNavigate('hoan-tat-phuc-che')}
                    className="px-3 py-1 bg-white border border-[#dec9b6] hover:bg-[#faefe3] rounded-lg font-medium text-[#4a362f] cursor-pointer"
                  >
                    Tải xuống bản in thờ
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('hoan-tat-phuc-che')}
                    className="px-3 py-1 bg-[#80141d] text-white hover:bg-[#681017] rounded-lg font-bold cursor-pointer shadow-2xs"
                  >
                    Xem kết quả &amp; So sánh trực tiếp &rarr;
                  </button>
                </div>
              </div>

              {/* Notification 3: Thành viên mới gia nhập */}
              <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs space-y-3 hover:border-[#80141d] transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-lg">person_add</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold border border-[#dec9b6]">
                          Cây Gia Phả
                        </span>
                        <span className="text-[#8a6f62]">Hôm nay, 06:40 sáng</span>
                      </div>

                      <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                        Thành viên mới gia nhập: Cháu Nguyễn Trực Khang (Đời thứ 13)
                      </h2>

                      <p className="text-xs text-[#6b584d] leading-relaxed">
                        Cháu đã đồng ý thư mời gia tộc từ Trưởng tộc Nguyễn Trực Viễn, hoàn tất xác thực thông tin phụ thân Nguyễn Trực Hải và đã được tự động kết nối nhánh Chi Giáp.
                      </p>
                    </div>
                  </div>

                  <button type="button" className="text-[#8a6f62] hover:text-[#80141d] p-1 cursor-pointer">
                    <span className="material-symbols-outlined text-base">more_vert</span>
                  </button>
                </div>

                <div className="p-2.5 bg-[#fdfaf5] rounded-xl border border-[#dec9b6]/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#6b584d]">
                    Hộ khẩu thường trú: Hà Nội / Sinh năm 2004
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('cay-pha-he-25d')}
                    className="font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Xem hồ sơ phả hệ</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* GROUP 2: TUẦN NÀY */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#c9892c]" />
                <span className="font-serif font-bold text-[#2b1b15]">Tuần Này</span>
                <span className="text-[10px] text-[#8a6f62]">3 thông báo lưu trữ</span>
              </div>

              {/* Notification 4: Dâng nén tâm hương */}
              <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs space-y-3 hover:border-[#80141d] transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#faeed9] text-[#734c13] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-lg">mode_heat</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-[#faefe3] text-[#80141d] font-bold border border-[#dec9b6]">
                          Tâm Hương Tri Ân
                        </span>
                        <span className="text-[#8a6f62]">Thứ Ba, 21 Tháng Chạp</span>
                      </div>

                      <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                        Chị Nguyễn Thị Thu Trang vừa dâng nén tâm hương và gửi lời nguyện cầu
                      </h2>

                      <p className="text-xs text-[#6b584d] leading-relaxed">
                        Đã thắp 3 nén hương trầm ảo và để lại lời nguyện vọng gia quyến bình an nơi bài vị Không Gian Tưởng Niệm Cụ Cố Nguyễn Văn Phúc (Đời 10).
                      </p>
                    </div>
                  </div>

                  <button type="button" className="text-[#8a6f62] hover:text-[#80141d] p-1 cursor-pointer">
                    <span className="material-symbols-outlined text-base">more_vert</span>
                  </button>
                </div>

                <div className="p-3 bg-[#faefe3]/50 rounded-xl border border-[#dec9b6]/60 text-xs italic font-serif text-[#4a362f] leading-relaxed">
                  “Kính lạy Cụ Cố phù hộ độ trì cho chi họ chúng con năm mới Ất Tỵ các cháu đỗ đạt, các cháu học hành đỗ khoa cử đạt...”
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onNavigate('thap-huong-tri-an')}
                    className="text-xs font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Đọc lời tri ân &amp; Góp hương</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

              {/* Notification 5: Bổ sung kỷ vật bảo tàng */}
              <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs space-y-3 hover:border-[#80141d] transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-lg">verified</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold border border-[#dec9b6]">
                          Chờ Phê Duyệt Bảo Tàng
                        </span>
                        <span className="text-[#8a6f62]">Thứ Hai, 20 Tháng Chạp</span>
                      </div>

                      <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                        Yêu cầu bổ sung kỷ vật: Tráp Sơn Mài Khảm Xà Cừ Niên Đại Tự Đức (1865)
                      </h2>

                      <p className="text-xs text-[#6b584d] leading-relaxed">
                        Anh Nguyễn Phục Long (Chi 2) đã chụp tư liệu 3D, tải tài liệu chứng minh nguồn gốc dòng tộc gia truyền dùng đựng chiếu sắc của Cụ Tứ Tải triều Nguyễn.
                      </p>
                    </div>
                  </div>

                  <button type="button" className="text-[#8a6f62] hover:text-[#80141d] p-1 cursor-pointer">
                    <span className="material-symbols-outlined text-base">more_vert</span>
                  </button>
                </div>

                <div className="p-3 bg-[#fdfaf5] rounded-xl border border-[#dec9b6] flex items-center gap-3">
                  <img
                    src="/images/relic_box.jpg"
                    alt="Tráp Sơn Mài"
                    className="w-14 h-14 rounded-lg object-cover border border-[#dec9b6]"
                  />
                  <div className="space-y-0.5 text-xs">
                    <div className="font-serif font-bold text-[#2b1b15]">Tráp Sơn Mài Cổ Đại Tộc</div>
                    <div className="text-[11px] text-[#8a6f62]">
                      Người gìn giữ: Nguyễn Phục Long • Tình trạng: Bảo quản tốt
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage('Đã gửi phản hồi yêu cầu người đóng góp bổ sung tư liệu!');
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                    className="px-3 py-1 bg-white border border-[#dec9b6] hover:bg-[#faefe3] rounded-lg font-medium text-[#4a362f] cursor-pointer"
                  >
                    Yêu cầu bổ sung thông tin
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('bao-tang-gia-bao')}
                    className="px-3 py-1 bg-[#80141d] text-white hover:bg-[#681017] rounded-lg font-bold cursor-pointer shadow-2xs"
                  >
                    Kiểm duyệt &amp; Niêm yết &rarr;
                  </button>
                </div>
              </div>

              {/* Notification 6: Cảnh báo dung lượng */}
              <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs space-y-3 hover:border-[#80141d] transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-lg">cloud_sync</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-200">
                          Cảnh Báo Dung Lượng
                        </span>
                        <span className="text-[#8a6f62]">Chủ Nhật, 19 Tháng Chạp</span>
                      </div>

                      <h2 className="font-serif font-bold text-sm text-[#2b1b15]">
                        Kho lưu trữ tư liệu gia tộc đạt 82% hạn mức (41.2 GB / 50 GB)
                      </h2>

                      <p className="text-xs text-[#6b584d] leading-relaxed">
                        Sau khi các chi nhánh tải lên 14 cuốn văn tự nôm scan và hàng trăm video tế lễ Đại hội làng vừa qua, dung lượng đám mây sắp chạm ngưỡng giới hạn.
                      </p>
                    </div>
                  </div>

                  <button type="button" className="text-[#8a6f62] hover:text-[#80141d] p-1 cursor-pointer">
                    <span className="material-symbols-outlined text-base">more_vert</span>
                  </button>
                </div>

                <div className="space-y-1.5 p-3 bg-[#faefe3]/50 rounded-xl border border-[#dec9b6]">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#4a362f]">
                    <span>Tiến độ lưu trữ đám mây gia tộc:</span>
                    <span className="font-bold text-[#80141d]">41.2 GB / 50 GB (82%)</span>
                  </div>
                  <div className="w-full bg-[#dec9b6]/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#c9892c] h-full rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage('Đã chuyển các video năm cũ vào kho lưu trữ lạnh!');
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                    className="px-3 py-1 bg-white border border-[#dec9b6] hover:bg-[#faefe3] rounded-lg font-medium text-[#4a362f] cursor-pointer"
                  >
                    Lưu trữ lạnh (Cold Archive)
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('pricing')}
                    className="px-3 py-1 bg-[#80141d] text-white hover:bg-[#681017] rounded-lg font-bold cursor-pointer shadow-2xs"
                  >
                    Nâng cấp gói Gia Tộc Niên Vàng &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setToastMessage('Đã tải thêm 12 thông báo cũ hơn!');
                  setTimeout(() => setToastMessage(null), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">history</span>
                <span>Tải thông báo cũ hơn (Tháng 11 &amp; Tiết Đông Chí)</span>
              </button>
            </div>
          </div>

          {/* Right Column (~35%) - Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-5">
            {/* Widget 1: Tế Tự 7 Ngày Tới */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
                <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#80141d]">calendar_month</span>
                  <span>Tế Tự 7 Ngày Tới</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('family-calendar')}
                  className="text-[11px] text-[#80141d] font-bold hover:underline cursor-pointer"
                >
                  Toàn lịch họ &rarr;
                </button>
              </div>

              <p className="text-[11px] text-[#8a6f62]">
                Lịch sóc vọng và các tuần tiết quan trọng trong những ngày cuối năm Ất Tỵ.
              </p>

              <div className="space-y-2.5 text-xs">
                {/* Event 1 */}
                <div className="p-2.5 rounded-xl bg-[#faefe3]/60 border border-[#dec9b6] flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#80141d] text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold uppercase">TH.12</span>
                    <span className="text-base font-serif font-bold leading-none">27</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#80141d] font-bold">Chính Giỗ • Nhánh Cụ Cố</div>
                    <div className="font-serif font-bold text-[#2b1b15]">
                      Lễ Giỗ Cụ Bà Đỗ Thị Nhẫn
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">Từ đường Thôn Thượng, 09:30</div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="p-2.5 rounded-xl bg-white border border-[#dec9b6] flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#faeed9] text-[#734c13] border border-[#dec9b6] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold uppercase">TH.12</span>
                    <span className="text-base font-serif font-bold leading-none">30</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#734c13] font-bold">Nghi Thức Niên Niên</div>
                    <div className="font-serif font-bold text-[#2b1b15]">
                      Lễ Tảo Mộ &amp; Rước Tất Niên
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">Khu Lăng Mộ Nguyễn Tộc, 14:00</div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="p-2.5 rounded-xl bg-white border border-[#dec9b6] flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#faeed9] text-[#734c13] border border-[#dec9b6] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold uppercase">TH.GIÊNG</span>
                    <span className="text-base font-serif font-bold leading-none">01</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#734c13] font-bold">Tế Nguyện Sa San</div>
                    <div className="font-serif font-bold text-[#2b1b15]">
                      Chúc Tết Trưởng Tộc &amp; Hội Đồng Tộc
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">Trực tiếp &amp; Phòng Ảo Trực Tuyến</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: Kênh Nhận Tin Tức Tộc */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5 border-b border-[#dec9b6]/40 pb-2.5">
                <span className="material-symbols-outlined text-base text-[#80141d]">podcasts</span>
                <span>Kênh Nhận Tin Tức Tộc</span>
              </div>

              <p className="text-[11px] text-[#8a6f62]">
                Điều chỉnh phương thức thông báo để không bao giờ bỏ lỡ nghi lễ và phụng dưỡng dòng họ.
              </p>

              <div className="space-y-3 text-xs">
                {/* Toggle 1: Zalo OA */}
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[#2b1b15]">Zalo OA Gia Nguyễn</div>
                    <div className="text-[10px] text-[#8a6f62]">Bản tin giỗ khẩn cấp &amp; họp họ</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setZaloEnabled(!zaloEnabled)}
                    className={`w-10 h-5.5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                      zaloEnabled ? 'bg-[#80141d]' : 'bg-[#dec9b6]'
                    }`}
                  >
                    <div
                      className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                        zaloEnabled ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 2: Email */}
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[#2b1b15]">Email Bản Tin Tuần</div>
                    <div className="text-[10px] text-[#8a6f62]">Gửi mỗi sáng thứ Hai tuần tiết</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailEnabled(!emailEnabled)}
                    className={`w-10 h-5.5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                      emailEnabled ? 'bg-[#80141d]' : 'bg-[#dec9b6]'
                    }`}
                  >
                    <div
                      className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                        emailEnabled ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 3: Browser */}
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[#2b1b15]">Thông Báo Trình Duyệt</div>
                    <div className="text-[10px] text-[#8a6f62]">Khi có người thắp hương / bình luận</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBrowserEnabled(!browserEnabled)}
                    className={`w-10 h-5.5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                      browserEnabled ? 'bg-[#80141d]' : 'bg-[#dec9b6]'
                    }`}
                  >
                    <div
                      className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                        browserEnabled ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setToastMessage('Đang mở trang cấu hình số điện thoại & địa chỉ nhận...');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="w-full py-2 rounded-xl bg-[#faefe3] hover:bg-[#eed9be] text-xs font-bold text-[#80141d] transition-colors cursor-pointer border border-[#dec9b6]"
              >
                Cấu hình số điện thoại &amp; địa chỉ nhận
              </button>
            </div>

            {/* Widget 3: Lời Nhắn Trưởng Tộc */}
            <div className="bg-[#faefe3]/80 border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-3">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">menu_book</span>
                <span>Lời Nhắn Trưởng Tộc</span>
              </div>

              <p className="text-xs font-serif italic text-[#2b1b15] leading-relaxed">
                “Kỳ giỗ cuối năm nay quy tụ đông đủ con cháu các chi từ phương xa về bái tổ. Xin quí ban khánh tiết và các vị chi trưởng rà soát kỹ danh sách để ban nghi lễ sắm soạn chu đáo.”
              </p>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#dec9b6]/60">
                <span className="font-bold text-[#80141d]">Cụ Nguyễn Trực Viễn</span>
                <span className="text-[#8a6f62] italic font-serif">Ất Tỵ Niên</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Traditional Footer */}
      <footer className="mt-16 bg-[#faefe3] border-t border-[#dec9b6] pt-12 pb-8 text-[#4a362f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#dec9b6]/60">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2 text-[#80141d] font-serif font-bold text-base">
                <span className="material-symbols-outlined text-xl">temple_buddhist</span>
                <span>Thích Cúng Kiếng</span>
              </div>
              <p className="text-xs text-[#6b584d] leading-relaxed">
                Không gian lưu giữ ký ức, phụng dưỡng tiền tổ và truyền thừa phả hệ tôn nghiêm cho các thế hệ con cháu muôn đời sau.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider">
                Di Sản Dòng Tộc
              </div>
              <ul className="text-xs space-y-1.5 text-[#6b584d]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('cay-ky-niem')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Phả Hệ Chi Phái
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('bien-nien-su')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Biên Niên Sử &amp; Cột Mốc
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('tu-sach-gia-phong')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Điển Tích &amp; Kỷ Niệm
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider">
                Lễ Nghi &amp; Tập Tục
              </div>
              <ul className="text-xs space-y-1.5 text-[#6b584d]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('cam-nang-nghi-le')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Cẩm Nang Giỗ Chạp
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('chi-tiet-nghi-le')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Kho Văn Khấn Cổ Truyền
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('bao-tang-gia-bao')}
                    className="hover:text-[#80141d] transition-colors cursor-pointer"
                  >
                    Bảo Quản Di Vật
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-serif font-bold text-xs text-[#80141d] uppercase tracking-wider">
                Bảo Mật &amp; Phụng Điền
              </div>
              <div className="p-3 bg-white border border-[#dec9b6] rounded-xl space-y-1 text-xs text-[#6b584d]">
                <div className="flex items-center gap-1.5 font-bold text-[#2b1b15]">
                  <span className="material-symbols-outlined text-sm text-[#80141d]">verified_user</span>
                  <span>Mã Hóa AES-256 Kép</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Toàn bộ gia phả và dữ liệu phả ký được bảo vệ tuyệt đối.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8a6f62] gap-3">
            <div>© 2025 Thích Cúng Kiếng. Bản quyền thuộc Đại Tộc Nguyễn Phúc Anh.</div>
            <div className="font-serif italic font-bold text-[#80141d]">
              ĐẠO HIẾU LÀ ĐẦU – UỐNG NƯỚC NHỚ NGUỒN
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
