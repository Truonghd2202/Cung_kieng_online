import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface UserProfilePedigreeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const UserProfilePedigreeScreen: React.FC<UserProfilePedigreeScreenProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'contributions' | 'privacy'>('info');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Trực Viễn',
    aliasNames: 'Tự: Văn Nghiệp, Húy: Viễn Cổ',
    solarBirth: '18/09/1958',
    lunarBirth: '06 Tháng 8 năm Mậu Tuất (Giờ Thìn)',
    hometown: 'Làng Trực Lăng, Huyện Trực Ninh, Tỉnh Nam Định',
    career: 'Nhà giáo ưu tú – Cựu Giảng viên ĐH Sư Phạm',
    bio: 'Kế vị chức vụ Trưởng tộc Chi Trực Lăng từ năm 2004 theo di huấn của Thân phụ Nguyễn Trực Khang. Có công chủ trì công tác đại trùng tu Từ Đường Trực Lăng năm Giáp Ngọ (2014) và số hóa 12 cuốn tộc phả từ giấy bản cổ truyền sang kho lưu trữ điện tử dòng họ.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Đã lưu thông tin lý lịch phả hệ thành công!');
    setTimeout(() => setToastMessage(null), 3000);
  };

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
        {/* Top Breadcrumb */}
        <div className="flex items-center gap-2 text-xs border-b border-[#dec9b6]/50 pb-3 text-[#8a6f62]">
          <span className="material-symbols-outlined text-sm">account_circle</span>
          <span>Tài Khoản Cá Nhân</span>
          <span>&gt;</span>
          <span className="text-[#80141d] font-bold">Hồ Sơ Người Dùng &amp; Định Danh Phả Hệ</span>
        </div>

        {/* Title & Top Navigation Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15]">
                Hồ Sơ Thành Viên &amp; Định Danh Phả Hệ
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-xs font-bold">
                Chính Tộc
              </span>
            </div>
            <p className="text-xs text-[#8a6f62] italic font-serif">
              “Rõ cội nguồn, sáng danh phận, con cháu giữ trọn đạo hiếu nghĩa.”
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('chon-khong-gian')}
              className="px-4 py-2 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-base">sync_alt</span>
              <span>Đổi Không Gian Gia Tộc</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('cay-pha-he-25d')}
              className="px-4 py-2 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-base">account_tree</span>
              <span>Mở Vị Trí Trên Phả Đồ</span>
            </button>
          </div>
        </div>

        {/* 2 Columns Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Identity, Pedigree Tree, Contact) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Card 1: Avatar & Identity Card */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4 text-center">
              <div className="relative w-24 h-24 mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80"
                  alt="Nguyễn Trực Viễn"
                  className="w-full h-full rounded-full object-cover border-3 border-[#c9892c] shadow-sm"
                />
                <span className="absolute bottom-0 right-0 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center gap-0.5 border border-white shadow-xs">
                  <span className="material-symbols-outlined text-[10px]">verified</span>
                  <span>Đã xác thực</span>
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-serif font-bold text-[#2b1b15]">
                  Nguyễn Trực Viễn
                </h2>
                <div className="text-[11px] text-[#8a6f62]">
                  Tên chữ: Trực Viễn • Tên tự: Văn Nghiệp
                </div>
              </div>

              <div className="p-3 bg-[#faefe3]/80 rounded-2xl border border-[#dec9b6] space-y-0.5">
                <div className="text-[9px] uppercase tracking-wider font-bold text-[#80141d]">
                  THỨ BẬC &amp; CHI PHÁI
                </div>
                <div className="font-serif font-bold text-xs text-[#2b1b15]">
                  Trưởng Tộc Đời Thứ 11 – Chi Trực Lăng
                </div>
                <div className="text-[10px] text-[#8a6f62]">
                  Đại Tộc Nguyễn Phúc Anh (Thủy Tổ Khởi Thủy 1642)
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[10px] font-bold">
                  <span className="material-symbols-outlined text-xs">shield</span>
                  <span>Chủ Không Gian (Owner)</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#faefe3] border border-[#dec9b6] text-[#80141d] text-[10px] font-bold">
                  <span className="material-symbols-outlined text-xs">history_edu</span>
                  <span>Chấp Bút Ký</span>
                </span>
              </div>
            </div>

            {/* Card 2: Định Danh Phả Hệ */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
                <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#80141d]">schema</span>
                  <span>Định Danh Phả Hệ</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] border border-[#dec9b6]">
                  Mã phả: N11 - TL - 01
                </span>
              </div>

              {/* Lineage Tree Hierarchy */}
              <div className="relative pl-6 space-y-4 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dec9b6]">
                {/* Generation 9 */}
                <div className="relative">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#dec9b6] border-2 border-white" />
                  <div className="text-[10px] text-[#8a6f62]">Tổ Phụ (Đời thứ 9)</div>
                  <div className="font-serif font-bold text-[#2b1b15]">
                    Cụ Nguyễn Trực Định (1888 - 1965)
                  </div>
                </div>

                {/* Generation 10 */}
                <div className="relative">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#dec9b6] border-2 border-white" />
                  <div className="text-[10px] text-[#8a6f62]">Thân Sinh Phụ Mẫu (Đời thứ 10)</div>
                  <div className="font-serif font-bold text-[#2b1b15]">
                    Cha: Cụ Nguyễn Trực Khang (1922 - 2004)
                  </div>
                  <div className="text-[11px] text-[#6b584d]">
                    Mẹ: Cụ Bà Trần Thị Liễu (1925 - 2018)
                  </div>
                </div>

                {/* Generation 11 (Current User) */}
                <div className="relative p-2.5 bg-[#faefe3] rounded-xl border border-[#80141d]/40">
                  <span className="absolute -left-6 top-4 w-2.5 h-2.5 rounded-full bg-[#80141d] border-2 border-white" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#80141d] font-bold">Đương Chủ (Đời thứ 11)</div>
                      <div className="font-serif font-bold text-[#2b1b15] text-sm">
                        Nguyễn Trực Viễn
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#80141d] text-white font-bold">
                      Trưởng Nam
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('cay-pha-he-25d')}
                className="w-full py-2 rounded-xl bg-[#fdfaf5] hover:bg-[#faefe3] border border-[#dec9b6] text-xs font-bold text-[#80141d] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">search</span>
                <span>Khám Phá Sơ Đồ Cây Gia Phả</span>
              </button>
            </div>

            {/* Card 3: Thông Tin Liên Lạc */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="font-serif font-bold text-sm text-[#2b1b15] border-b border-[#dec9b6]/40 pb-2.5">
                Thông Tin Liên Lạc
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sm text-[#80141d] mt-0.5">mail</span>
                  <div>
                    <div className="text-[10px] text-[#8a6f62]">Thư điện tử chính thức</div>
                    <div className="font-semibold text-[#2b1b15]">trucvien.nguyen@phucanh-giadinh.vn</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sm text-[#80141d] mt-0.5">call</span>
                  <div>
                    <div className="text-[10px] text-[#8a6f62]">Điện thoại di động</div>
                    <div className="font-semibold text-[#2b1b15]">+84 (0)913 288 679</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sm text-[#80141d] mt-0.5">home</span>
                  <div>
                    <div className="text-[10px] text-[#8a6f62]">Nơi cư ngụ thường trú</div>
                    <div className="font-semibold text-[#2b1b15]">Số 42 Phố Lãn Ông, Hoàn Kiếm, Hà Nội</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sm text-[#80141d] mt-0.5">temple_buddhist</span>
                  <div>
                    <div className="text-[10px] text-[#8a6f62]">Quê quán gốc &amp; Từ đường</div>
                    <div className="font-semibold text-[#2b1b15]">
                      Thôn Trực Lăng, Xã Trực Khang, Huyện Trực Ninh, Nam Định
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#dec9b6]/40 space-y-2">
                <button
                  type="button"
                  onClick={() => onNavigate('chon-khong-gian')}
                  className="w-full py-2 rounded-xl bg-[#faefe3] hover:bg-[#eed9be] text-xs font-bold text-[#80141d] transition-colors cursor-pointer border border-[#dec9b6] flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">switch_account</span>
                  <span>Chuyển Đổi Không Gian Gia Tộc</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="w-full py-1.5 text-xs font-bold text-rose-800 hover:underline flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span>Đăng Xuất Tài Khoản</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Editable Bio, Lineage Form & Details) */}
          <div className="lg:col-span-8 bg-white border border-[#dec9b6] rounded-3xl p-5 sm:p-6 shadow-2xs space-y-6">
            {/* 3 Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#dec9b6]/50 pb-3 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'info'
                    ? 'bg-[#80141d] text-white shadow-2xs'
                    : 'bg-white border border-[#dec9b6] text-[#4a362f] hover:border-[#80141d]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">badge</span>
                <span>Thông Tin Cá Nhân &amp; Gia Thể</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('contributions')}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'contributions'
                    ? 'bg-[#80141d] text-white shadow-2xs'
                    : 'bg-white border border-[#dec9b6] text-[#4a362f] hover:border-[#80141d]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">military_tech</span>
                <span>Dấu Ấn Phụng Hiến</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('privacy')}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'privacy'
                    ? 'bg-[#80141d] text-white shadow-2xs'
                    : 'bg-white border border-[#dec9b6] text-[#4a362f] hover:border-[#80141d]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>Quyền Riêng Tư &amp; Hiển Thị</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 text-xs">
              {/* SECTION 1: Lý Lịch & Danh Xưng Cổ Truyền */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9b6]/40 pb-2">
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#2b1b15]">
                      Lý Lịch &amp; Danh Xưng Cổ Truyền
                    </h3>
                    <p className="text-[11px] text-[#8a6f62]">
                      Ghi chép chính thức đối chiếu cùng bản chép tay Gia Phả Chi Trực Lăng năm 1928
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">menu_book</span>
                    <span>Quyển 3 – Trang 72</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Họ tên khai sinh */}
                  <div className="space-y-1">
                    <label className="font-semibold text-[#2b1b15]">Họ tên khai sinh</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] font-serif font-bold text-xs focus:outline-none focus:border-[#80141d]"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#8a6f62] text-sm pointer-events-none">
                        person
                      </span>
                    </div>
                  </div>

                  {/* Bí danh & Tên tự / Tên húy */}
                  <div className="space-y-1">
                    <label className="font-semibold text-[#2b1b15]">Bí danh &amp; Tên tự / Tên húy</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.aliasNames}
                        onChange={(e) => setFormData({ ...formData, aliasNames: e.target.value })}
                        className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] text-xs focus:outline-none focus:border-[#80141d]"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#8a6f62] text-sm pointer-events-none">
                        history_edu
                      </span>
                    </div>
                  </div>

                  {/* Ngày sinh Dương lịch */}
                  <div className="space-y-1">
                    <label className="font-semibold text-[#2b1b15]">Ngày sinh Dương lịch</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.solarBirth}
                        onChange={(e) => setFormData({ ...formData, solarBirth: e.target.value })}
                        className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] text-xs focus:outline-none focus:border-[#80141d]"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#8a6f62] text-sm pointer-events-none">
                        calendar_today
                      </span>
                    </div>
                  </div>

                  {/* Ngày sinh Âm lịch */}
                  <div className="space-y-1">
                    <label className="font-semibold text-[#2b1b15]">
                      Ngày sinh Âm lịch (Trọng ngày tế lễ)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.lunarBirth}
                        onChange={(e) => setFormData({ ...formData, lunarBirth: e.target.value })}
                        className="w-full bg-[#faefe3]/50 border border-[#dec9b6] rounded-xl px-3 py-2 text-[#80141d] font-serif font-bold text-xs focus:outline-none focus:border-[#80141d]"
                      />
                      <span className="material-symbols-outlined text-[#c9892c] absolute right-3 top-2.5 text-sm pointer-events-none">
                        nights_stay
                      </span>
                    </div>
                  </div>

                  {/* Quê quán gốc */}
                  <div className="space-y-1">
                    <label className="font-semibold text-[#2b1b15]">Quê quán gốc tiền tổ</label>
                    <input
                      type="text"
                      value={formData.hometown}
                      onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                      className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] text-xs focus:outline-none focus:border-[#80141d]"
                    />
                  </div>

                  {/* Nghề nghiệp & Học vị */}
                  <div className="space-y-1">
                    <label className="font-semibold text-[#2b1b15]">Nghề nghiệp &amp; Học vị / Danh xưng</label>
                    <input
                      type="text"
                      value={formData.career}
                      onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                      className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] text-xs focus:outline-none focus:border-[#80141d]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Gia thất & Hậu bối trực hệ */}
              <div className="space-y-3 pt-2">
                <div className="font-serif font-bold text-sm text-[#2b1b15] border-b border-[#dec9b6]/40 pb-1.5">
                  Gia thất &amp; Hậu bối trực hệ
                </div>

                {/* Hôn phối */}
                <div className="p-3 bg-[#faefe3]/60 rounded-2xl border border-[#dec9b6] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-[#2b1b15]">
                      Hôn phối (Phối ngẫu): <strong className="font-serif text-[#80141d]">Bà Lê Thị Mỹ Dung</strong> (Sinh năm 1961 - Kỷ Hợi)
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold text-[10px] border border-[#dec9b6]">
                      Chính thất
                    </span>
                  </div>

                  {/* Children Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2 bg-white rounded-xl border border-[#dec9b6] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#80141d] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        1
                      </span>
                      <span>
                        Trưởng nam: <strong className="font-serif text-[#2b1b15]">Nguyễn Trực Tuấn</strong> (Đời 12 - sn 1986)
                      </span>
                    </div>

                    <div className="p-2 bg-white rounded-xl border border-[#dec9b6] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#c9892c] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        2
                      </span>
                      <span>
                        Thứ nữ: <strong className="font-serif text-[#2b1b15]">Nguyễn Trực Mai Anh</strong> (Đời 12 - sn 1990)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Tiểu sử tóm tắt ghi nhận trong Sổ Phả Tộc */}
              <div className="space-y-2 pt-2">
                <div className="font-serif font-bold text-sm text-[#2b1b15] border-b border-[#dec9b6]/40 pb-1.5">
                  Tiểu sử tóm tắt ghi nhận trong Sổ Phả Tộc
                </div>

                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl p-3 text-xs text-[#2b1b15] font-serif leading-relaxed italic focus:outline-none focus:border-[#80141d]"
                />
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#dec9b6]/40">
                <div className="text-[11px] text-[#8a6f62] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs text-[#c9892c]">history</span>
                  <span>Cập nhật gần nhất: 19:42 – Ngày 14 Tháng Chạp năm Ất Tỵ</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage('Đã hủy bỏ các thay đổi chưa lưu!');
                      setTimeout(() => setToastMessage(null), 2000);
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] transition-colors cursor-pointer shadow-2xs"
                  >
                    Hủy Thay Đổi
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">save</span>
                    <span>Lưu Thông Tin Cập Nhật</span>
                  </button>
                </div>
              </div>
            </form>
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
