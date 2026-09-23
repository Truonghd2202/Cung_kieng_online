import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface ClanMemberDirectoryScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface Member {
  id: string;
  name: string;
  alias: string;
  generationBadge: number;
  isHead?: boolean;
  avatar: string;
  email: string;
  phone: string;
  role: 'owner' | 'admin' | 'editor' | 'contributor' | 'viewer';
  roleLabel: string;
  treeCode: string;
  treePosition: string;
  joinDate: string;
  status: 'online' | 'recent' | 'inactive';
  statusText: string;
}

export const ClanMemberDirectoryScreen: React.FC<ClanMemberDirectoryScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const members: Member[] = [
    {
      id: 'm1',
      name: 'Nguyễn Trực Viễn',
      alias: 'Tên Húy: Phúc Viễn • Đời thứ 11, Nhánh Trưởng Đích',
      generationBadge: 11,
      isHead: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      email: 'trucvien.nguyen@phucanh.vn',
      phone: '+84 (091) 328-99xx',
      role: 'owner',
      roleLabel: 'Chủ Không Gian (Owner)',
      treeCode: 'Đ11-N1-01',
      treePosition: 'Đỉnh Chi',
      joinDate: '15/08/2021',
      status: 'online',
      statusText: 'Đang trực tuyến',
    },
    {
      id: 'm2',
      name: 'Nguyễn Trực Long',
      alias: 'Trưởng ban Tế Tự • Đời thứ 11, Chi Trực Lăng',
      generationBadge: 11,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      email: 'long.tetu@trieuphuc.org',
      phone: '+84 (090) 812-44xx',
      role: 'admin',
      roleLabel: 'Quản Trị Viên (Admin)',
      treeCode: 'Đ11-N1-03',
      treePosition: 'Tế Tự',
      joinDate: '12/09/2021',
      status: 'recent',
      statusText: 'Hoạt động 2 giờ trước',
    },
    {
      id: 'm3',
      name: 'Nguyễn Trực Thắng',
      alias: 'Ban Số Hóa Gia Phả • Đời thứ 12, Nhánh 2',
      generationBadge: 12,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
      email: 'thang.nguyen@techgenealogy.vn',
      phone: '+84 (097) 554-11xx',
      role: 'admin',
      roleLabel: 'Quản Trị Viên (Admin)',
      treeCode: 'Đ12-N2-04',
      treePosition: 'Hậu Tự',
      joinDate: '18/10/2021',
      status: 'online',
      statusText: 'Đang trực tuyến',
    },
    {
      id: 'm4',
      name: 'Nguyễn Thị Mai Anh',
      alias: 'Ban Biên Tập Ký Ức • Đời thứ 12',
      generationBadge: 12,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      email: 'maianh.nguyen@heritage.vn',
      phone: '+84 (094) 223-77xx',
      role: 'editor',
      roleLabel: 'Biên Tập Viên (Editor)',
      treeCode: 'Đ12-N1-08',
      treePosition: 'Nội Nữ',
      joinDate: '02/01/2022',
      status: 'recent',
      statusText: 'Hoạt động hôm qua',
    },
    {
      id: 'm5',
      name: 'Nguyễn Trọng Tấn',
      alias: 'Chi Nhánh Đệ Nhị • Đời thứ 12',
      generationBadge: 12,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      email: 'trongtan.nguyen@tanviet.vn',
      phone: '+84 (098) 676-33xx',
      role: 'contributor',
      roleLabel: 'Người Đóng Góp (Contributor)',
      treeCode: 'Đ12-N2-02',
      treePosition: 'Cổ Thư',
      joinDate: '14/05/2022',
      status: 'recent',
      statusText: 'Hoạt động 3 ngày trước',
    },
    {
      id: 'm6',
      name: 'Nguyễn Trực Khang',
      alias: 'Thế Hệ Kế Thừa • Đời thứ 13, Ngành Trưởng',
      generationBadge: 13,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      email: 'khang.nguyen2004@student.edu.vn',
      phone: '+84 (033) 987-12xx',
      role: 'viewer',
      roleLabel: 'Người Xem (Viewer)',
      treeCode: 'Đ13-N1-15',
      treePosition: 'Hậu Thế',
      joinDate: '10/01/2024',
      status: 'inactive',
      statusText: 'Hoạt động tuần trước',
    },
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(members.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderRolePill = (role: Member['role'], label: string) => {
    switch (role) {
      case 'owner':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#80141d] text-white text-[10px] font-bold shadow-2xs">
            <span className="material-symbols-outlined text-xs">crown</span>
            <span>{label}</span>
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[10px] font-bold">
            <span className="material-symbols-outlined text-xs">shield</span>
            <span>{label}</span>
          </span>
        );
      case 'editor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#faefe3] border border-[#dec9b6] text-[#80141d] text-[10px] font-bold">
            <span className="material-symbols-outlined text-xs">edit_note</span>
            <span>{label}</span>
          </span>
        );
      case 'contributor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-bold">
            <span className="material-symbols-outlined text-xs">volunteer_activism</span>
            <span>{label}</span>
          </span>
        );
      case 'viewer':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-[10px] font-medium">
            <span className="material-symbols-outlined text-xs">visibility</span>
            <span>{label}</span>
          </span>
        );
    }
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
          <span>Cài Đặt &amp; Quản Trị Gia Tộc</span>
          <span>&gt;</span>
          <span className="text-[#80141d] font-bold">Quản Lý Thành Viên Gia Đình</span>
        </div>

        {/* Title Header & Main CTAs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15]">
                Quản Lý Thành Viên &amp; Danh Bạ Dòng Tộc Chi Trực Lăng
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-xs font-bold">
                Đại Tộc Nguyễn
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8a6f62] italic font-serif">
              <span className="material-symbols-outlined text-sm text-[#80141d]">menu_book</span>
              <span>“Gia đình thuận hòa, con cháu tề tựu, tôn ti trật tự lưu truyền muôn đời”</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setToastMessage('Đang xuất danh bạ phả hệ dạng Excel/PDF...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-4 py-2 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Xuất Danh Bạ Gia Tộc (Excel/PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('moi-thanh-vien')}
              className="px-4 py-2 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>+ Mời Thành Viên Mới</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span className="font-semibold">Tổng Thành Viên Hoạt Động</span>
              <span className="material-symbols-outlined text-rose-800 text-lg">groups</span>
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-[#80141d]">48</span>
              <span className="text-xs text-[#8a6f62] ml-1.5 font-medium">thành viên</span>
            </div>
            <div className="text-[11px] text-[#6b584d] pt-1 border-t border-[#dec9b6]/40 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#80141d]" />
              <span>32 Nội tộc</span>
              <span className="text-[#dec9b6]">•</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9892c]" />
              <span>16 Ngoại tộc / Dâu rể</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center justify-between gap-3">
            <div className="w-14 h-14 rounded-full bg-[#faeed9] border-2 border-[#c9892c] flex flex-col items-center justify-center shrink-0">
              <span className="text-sm font-bold text-[#734c13]">6 vai</span>
            </div>
            <div className="space-y-0.5 text-[11px] text-[#6b584d] flex-1">
              <div className="font-semibold text-xs text-[#2b1b15] mb-1">Phân Cấp Quyền Hạn</div>
              <div>1 Chủ Tộc • 3 Quản Trị</div>
              <div>8 Biên Tập • 14 Đóng Góp</div>
              <div className="text-[#8a6f62]">22 Người Xem Gia Phong</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span className="font-semibold">Lời Mời Chờ Xác Nhận</span>
              <span className="material-symbols-outlined text-[#c9892c] text-lg">mark_email_unread</span>
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-[#734c13]">05</span>
              <span className="text-xs text-[#8a6f62] ml-1.5 font-medium">thư mời điện tử</span>
            </div>
            <div className="text-[11px] text-[#6b584d] pt-1 border-t border-[#dec9b6]/40 flex items-center justify-between">
              <span>Hết hạn trong 7 ngày</span>
              <button
                type="button"
                onClick={() => onNavigate('moi-thanh-vien')}
                className="font-bold text-[#80141d] hover:underline cursor-pointer"
              >
                Kiểm tra &rarr;
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span className="font-semibold">Khớp Nối Cây Gia Phả</span>
              <span className="material-symbols-outlined text-[#80141d] text-lg">schema</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-serif font-bold text-[#2b1b15]">42</span>
                <span className="text-xs text-[#8a6f62] ml-1">/ 48 Đã Định Danh</span>
              </div>
              <span className="text-xs font-bold text-[#80141d]">87.5%</span>
            </div>
            <div className="w-full bg-[#faefe3] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#80141d] h-full rounded-full" style={{ width: '87.5%' }} />
            </div>
            <div className="text-[10px] text-[#8a6f62]">
              Còn 6 thành viên tự do chưa gắn phả hệ
            </div>
          </div>
        </div>

        {/* Search & Dropdown Filters Bar */}
        <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a6f62] text-sm pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên húy, thế thứ, đời, email, số điện thoại..."
              className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] focus:outline-none cursor-pointer"
            >
              <option value="all">Tất Cả Vai Trò (Toàn Bộ 48)</option>
              <option value="owner">Chủ Không Gian</option>
              <option value="admin">Quản Trị Viên</option>
              <option value="editor">Biên Tập Viên</option>
              <option value="contributor">Người Đóng Góp</option>
              <option value="viewer">Người Xem</option>
            </select>

            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] focus:outline-none cursor-pointer"
            >
              <option value="all">Phân Nhánh: Toàn Dòng Tộc Chi Trực Lăng</option>
              <option value="truong">Nhánh Trưởng Đích</option>
              <option value="nhanh2">Nhánh 2</option>
              <option value="chidenhi">Chi Đệ Nhị</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] focus:outline-none cursor-pointer"
            >
              <option value="all">Trạng Thái: Tất Cả</option>
              <option value="online">Đang trực tuyến</option>
              <option value="recent">Hoạt động gần đây</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Sub-bar */}
        <div className="p-3 bg-[#faefe3]/70 border border-[#dec9b6] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-[#4a362f]">
            <input
              type="checkbox"
              checked={selectedIds.length === members.length && members.length > 0}
              onChange={handleSelectAll}
              className="rounded border-[#dec9b6] text-[#80141d] focus:ring-[#80141d] accent-[#80141d]"
            />
            <span>Chọn tất cả danh mục trang này (Đang chọn {selectedIds.length} thành viên)</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setToastMessage('Đã mở trình soạn thông báo giỗ chạp gửi các thành viên!');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-semibold text-[#4a362f] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm text-[#80141d]">campaign</span>
              <span>Gửi Thông Báo Giỗ Chạp</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setToastMessage('Đang mở bảng cập nhật phân nhánh gia phả...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-semibold text-[#4a362f] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm text-[#c9892c]">folder_open</span>
              <span>Cập Nhật Nhánh Gia Phả</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setToastMessage('Đang tạo và tải thẻ dòng tộc điện tử...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-semibold text-[#4a362f] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm text-[#734c13]">badge</span>
              <span>Xuất Thẻ Dòng Tộc</span>
            </button>
          </div>
        </div>

        {/* Member Directory Table */}
        <div className="bg-white border border-[#dec9b6] rounded-3xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#faefe3] border-b border-[#dec9b6] font-serif font-bold text-[#2b1b15]">
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === members.length && members.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-[#dec9b6] text-[#80141d] focus:ring-[#80141d] accent-[#80141d]"
                    />
                  </th>
                  <th className="py-3 px-3">THÀNH VIÊN &amp; THẾ THỨ GIA TỘC</th>
                  <th className="py-3 px-3">LIÊN LẠC &amp; TÀI KHOẢN</th>
                  <th className="py-3 px-3 text-center">VAI TRÒ KHÔNG GIAN</th>
                  <th className="py-3 px-3 text-center">VỊ TRÍ CÂY GIA PHẢ</th>
                  <th className="py-3 px-3 text-center">THAM GIA</th>
                  <th className="py-3 px-3 text-center">TRẠNG THÁI</th>
                  <th className="py-3 px-3 text-center">THAO TÁC</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#dec9b6]/40">
                {members.map((m) => {
                  const isChecked = selectedIds.includes(m.id);
                  return (
                    <tr
                      key={m.id}
                      className={`hover:bg-[#fcf8f2] transition-colors ${
                        isChecked ? 'bg-[#faefe3]/40' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(m.id)}
                          className="rounded border-[#dec9b6] text-[#80141d] focus:ring-[#80141d] accent-[#80141d]"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={m.avatar}
                              alt={m.name}
                              className="w-10 h-10 rounded-full object-cover border border-[#dec9b6]"
                            />
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#80141d] text-white text-[9px] font-bold flex items-center justify-center">
                              {m.generationBadge}
                            </span>
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif font-bold text-sm text-[#2b1b15]">
                                {m.name}
                              </span>
                              {m.isHead && (
                                <span className="px-1.5 py-0.2 rounded bg-[#80141d] text-white text-[9px] font-bold">
                                  Chủ Tộc
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#8a6f62]">{m.alias}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-[#6b584d]">
                        <div className="font-medium text-[#2b1b15]">{m.email}</div>
                        <div className="text-[11px] text-[#8a6f62]">{m.phone}</div>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        {renderRolePill(m.role, m.roleLabel)}
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#faefe3] border border-[#dec9b6] text-[#80141d] text-[10px] font-bold">
                          <span className="material-symbols-outlined text-xs">schema</span>
                          <span>
                            {m.treeCode} ({m.treePosition})
                          </span>
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-center text-[#8a6f62] font-mono text-[11px]">
                        {m.joinDate}
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <div className="inline-flex items-center gap-1 text-[11px]">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              m.status === 'online'
                                ? 'bg-emerald-600'
                                : m.status === 'recent'
                                ? 'bg-[#c9892c]'
                                : 'bg-[#dec9b6]'
                            }`}
                          />
                          <span
                            className={
                              m.status === 'online'
                                ? 'font-semibold text-emerald-800'
                                : 'text-[#8a6f62]'
                            }
                          >
                            {m.statusText}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Tùy chọn thao tác với thành viên: ${m.name}`);
                            setTimeout(() => setToastMessage(null), 2000);
                          }}
                          className="p-1.5 rounded-lg hover:bg-[#faefe3] text-[#8a6f62] hover:text-[#80141d] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 bg-[#fdfaf5] border-t border-[#dec9b6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#8a6f62]">
            <div>Hiển thị 1 - 6 trong số 48 thành viên gia phả</div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-7 h-7 rounded-lg border border-[#dec9b6] flex items-center justify-center hover:bg-[#faefe3] text-[#4a362f] cursor-pointer"
              >
                &lt;
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-7 h-7 rounded-lg font-bold text-xs cursor-pointer ${
                  currentPage === 1
                    ? 'bg-[#80141d] text-white'
                    : 'border border-[#dec9b6] hover:bg-[#faefe3]'
                }`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`w-7 h-7 rounded-lg font-bold text-xs cursor-pointer ${
                  currentPage === 2
                    ? 'bg-[#80141d] text-white'
                    : 'border border-[#dec9b6] hover:bg-[#faefe3]'
                }`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className="w-7 h-7 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer"
              >
                3
              </button>
              <span>...</span>
              <button
                type="button"
                onClick={() => setCurrentPage(8)}
                className="w-7 h-7 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer"
              >
                8
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-7 h-7 rounded-lg border border-[#dec9b6] flex items-center justify-center hover:bg-[#faefe3] text-[#4a362f] cursor-pointer"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Card: Quy Chuẩn Phụng Sự & Chuyển Giao Quyền Chủ Không Gian */}
        <div className="p-4 sm:p-5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">account_tree</span>
            </div>
            <div>
              <div className="font-serif font-bold text-xs text-[#80141d]">
                Quy Chuẩn Phụng Sự &amp; Chuyển Giao Quyền Chủ Không Gian (Owner)
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed max-w-3xl">
                Chỉ đích danh <strong className="text-[#80141d]">Trưởng Tộc (Nguyễn Trực Viễn)</strong> hoặc người mang di chúc ủy quyền tế tự hợp pháp theo Hội Đồng Gia Tộc Chi Trực Lăng mới có thẩm quyền chuyển nhượng vai trò Chủ Không Gian. Mọi bổ nhiệm Quản Trị Viên đều được ghi nhận vào Nhật Ký Phả Ký Bất Biến.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setToastMessage('Đang mở văn bản Gia Quy Chi Tộc...');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="px-3 py-1.5 rounded-xl border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#80141d] flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
          >
            <span>Xem Gia Quy Chi Tộc</span>
          </button>
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
