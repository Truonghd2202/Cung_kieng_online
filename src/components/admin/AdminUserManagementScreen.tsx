import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminUserManagementScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface UserItem {
  id: string;
  name: string;
  code: string;
  avatar: string;
  email: string;
  phone: string;
  clan: string;
  clanBranch: string;
  role: 'Chủ Không Gian' | 'Biên Tập Phả' | 'Admin Chi Phái' | 'Đóng Góp Ký Ức' | 'Người Xem (Viewer)';
  plan: 'Trường Tồn' | 'Tiêu Chuẩn' | 'Khởi Đầu (Free)';
  status: 'Hoạt Động' | 'Chờ Đối Soát CCCD' | 'Tạm Khóa Tranh Chấp';
}

const INITIAL_USERS: UserItem[] = [
  {
    id: '1',
    name: 'Nguyễn Triệu Long',
    code: 'TK-NGUYEN-00192',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'trieulong@nguyenphuc.vn',
    phone: '0912.443.889',
    clan: 'Đại Tộc Nguyễn Phục Anh',
    clanBranch: 'Chi Trưởng • Đời thứ 14 (Tự Phúc)',
    role: 'Chủ Không Gian',
    plan: 'Trường Tồn',
    status: 'Hoạt Động',
  },
  {
    id: '2',
    name: 'Trần Thị Như Khuê',
    code: 'TK-TRAN-08914',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    email: 'nhukhue.tran@gmail.com',
    phone: '0988.121.765',
    clan: 'Trần Tộc Thần Khê',
    clanBranch: 'Chi Ba (Hữu Nhánh) • Đời thứ 11',
    role: 'Biên Tập Phả',
    plan: 'Tiêu Chuẩn',
    status: 'Hoạt Động',
  },
  {
    id: '3',
    name: 'Lê Khắc Huy Hoàng',
    code: 'TK-LE-00431',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'hoang.lekhac@lamkinh.org',
    phone: '0903.771.209',
    clan: 'Lê Gia Lam Kinh Ký',
    clanBranch: 'Phân Phái Đông Đạo • Đời thứ 9',
    role: 'Admin Chi Phái',
    plan: 'Trường Tồn',
    status: 'Chờ Đối Soát CCCD',
  },
  {
    id: '4',
    name: 'Vũ Đình Bách',
    code: 'TK-VU-09110',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    email: 'dinhbach.vu@motrach.vn',
    phone: '0945.332.119',
    clan: 'Vũ Tộc Mộ Trạch',
    clanBranch: 'Chi Giáp Vọng • Đang khiếu nại đời thứ 16',
    role: 'Đóng Góp Ký Ức',
    plan: 'Khởi Đầu (Free)',
    status: 'Tạm Khóa Tranh Chấp',
  },
  {
    id: '5',
    name: 'Đặng Hoàng Bửu',
    code: 'TK-DANG-11029',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    email: 'buu.danghoang@hueheritage.vn',
    phone: '0935.819.002',
    clan: 'Đặng Tộc Hương Trà',
    clanBranch: 'Chi Ngoại Tộc • Đời thứ 8',
    role: 'Người Xem (Viewer)',
    plan: 'Tiêu Chuẩn',
    status: 'Hoạt Động',
  },
];

export const AdminUserManagementScreen: React.FC<AdminUserManagementScreenProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('Tất cả');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [toastMessage, setToastMessage] = useState<string | null>('Đã cập nhật trạng thái người dùng thành công');

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);

    const matchRole = roleFilter === 'Tất cả' || u.role === roleFilter;
    const matchStatus = statusFilter === 'Tất cả' || u.status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus =
            u.status === 'Hoạt Động' ? 'Tạm Khóa Tranh Chấp' : 'Hoạt Động';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
    setToastMessage('Đã cập nhật trạng thái người dùng thành công');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE1D3] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-[#8A1A1B] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px]">badge</span>
              SỔ BỘ NHÂN SỰ &amp; QUYỀN HẠN TOÀN THƯ
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Quản Lý Người Dùng &amp; Định Danh Phả Hệ
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            48,290 tài khoản thành viên, chức sắc, ban trị sự và hậu duệ gia tộc trên cả nước.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => alert('Đang xuất sổ bộ nhân sự định dạng PDF/Excel mã hóa SHA-256')}
            className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Xuất Báo Cáo</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('admin-chi-tiet-nguoi-dung')}
            className="px-3 py-1.5 bg-[#8A1A1B] text-white hover:bg-[#731415] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            <span>Thêm Quản Trị Viên</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 uppercase mb-1">
            <span>ĐANG HOẠT ĐỘNG</span>
            <span className="material-symbols-outlined text-[17px] text-emerald-600">how_to_reg</span>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">46,810</div>
          <p className="text-[11px] text-stone-500 mt-1">96.9% tỉ lệ chuẩn định danh</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs bg-amber-50/20">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 uppercase mb-1">
            <span>CHỜ THẨM ĐỊNH CỘI NGUỒN</span>
            <span className="material-symbols-outlined text-[17px] text-amber-600">hourglass_top</span>
          </div>
          <div className="text-2xl font-bold font-serif text-amber-900">142</div>
          <p className="text-[11px] text-amber-700 mt-1">CCCD &amp; Tông Tự cần đối soát</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-red-200 shadow-xs bg-red-50/20">
          <div className="flex items-center justify-between text-[11px] font-bold text-red-900 uppercase mb-1">
            <span>BỊ TẠM KHÓA TRANH CHẤP</span>
            <span className="material-symbols-outlined text-[17px] text-red-600">lock_clock</span>
          </div>
          <div className="text-2xl font-bold font-serif text-red-700">17</div>
          <p className="text-[11px] text-red-600 mt-1">Tranh chấp phả đang xử lý</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 uppercase mb-1">
            <span>GÓI GIA TỘC TRƯỜNG TỒN</span>
            <span className="material-symbols-outlined text-[17px] text-amber-700">workspace_premium</span>
          </div>
          <div className="text-2xl font-bold font-serif text-[#8A1A1B]">9,840</div>
          <p className="text-[11px] text-stone-500 mt-1">Lưu trữ ngàn năm không giới hạn</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search box */}
          <div className="lg:col-span-2 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-stone-400">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo họ tên, email, SĐT, số CCCD hoặc mã (TK-NGUYEN-00192)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#8A1A1B] text-stone-800"
            />
          </div>

          {/* Role select */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#8A1A1B] text-stone-800"
          >
            <option value="Tất cả">Vai trò: Tất cả</option>
            <option value="Chủ Không Gian">Chủ Không Gian</option>
            <option value="Biên Tập Phả">Biên Tập Phả</option>
            <option value="Admin Chi Phái">Admin Chi Phái</option>
            <option value="Đóng Góp Ký Ức">Đóng Góp Ký Ức</option>
            <option value="Người Xem (Viewer)">Người Xem (Viewer)</option>
          </select>

          {/* Status select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#8A1A1B] text-stone-800"
          >
            <option value="Tất cả">Trạng thái: Tất cả</option>
            <option value="Hoạt Động">Hoạt Động</option>
            <option value="Chờ Đối Soát CCCD">Chờ Đối Soát CCCD</option>
            <option value="Tạm Khóa Tranh Chấp">Tạm Khóa Tranh Chấp</option>
          </select>

          {/* Sort */}
          <select className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#8A1A1B] text-stone-800">
            <option>Sắp xếp theo: Định danh mới nhất</option>
            <option>Họ tên (A &rarr; Z)</option>
            <option>Quy mô dòng họ</option>
            <option>Mức độ uy tín</option>
          </select>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
          <div>
            Bộ lọc đang áp dụng: Toàn hệ thống ({users.length} bản ghi mẫu) •{' '}
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('Tất cả');
                setStatusFilter('Tất cả');
              }}
              className="text-[#8A1A1B] hover:underline font-semibold"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50/80 text-[10.5px] font-bold uppercase text-stone-500 border-b border-stone-200">
                <th className="p-3.5 w-8">
                  <input type="checkbox" className="rounded text-[#8A1A1B]" />
                </th>
                <th className="p-3.5">Người Dùng &amp; Định Danh Phả Hệ</th>
                <th className="p-3.5">Thông Tin Liên Hệ</th>
                <th className="p-3.5">Dòng Họ &amp; Vị Trí Phả Ký</th>
                <th className="p-3.5">Vai Trò</th>
                <th className="p-3.5">Gói Dịch Vụ</th>
                <th className="p-3.5">Trạng Thái</th>
                <th className="p-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-3.5">
                    <input type="checkbox" className="rounded text-[#8A1A1B]" />
                  </td>

                  {/* User info */}
                  <td className="p-3.5">
                    <div
                      onClick={() => onNavigate('admin-chi-tiet-nguoi-dung')}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-stone-200 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-stone-900 group-hover:text-[#8A1A1B] flex items-center gap-1.5">
                          {user.name}
                          <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                        </p>
                        <p className="text-[10.5px] font-mono text-stone-500">{user.code}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="p-3.5 text-[11.5px]">
                    <div className="font-mono text-stone-700">{user.email}</div>
                    <div className="text-stone-500 font-mono text-[10.5px]">{user.phone}</div>
                  </td>

                  {/* Clan */}
                  <td className="p-3.5">
                    <p className="font-bold text-stone-800">{user.clan}</p>
                    <p className="text-[10.5px] text-stone-500">{user.clanBranch}</p>
                  </td>

                  {/* Role */}
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold ${
                        user.role === 'Chủ Không Gian'
                          ? 'bg-[#8A1A1B] text-white shadow-xs'
                          : user.role === 'Admin Chi Phái'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : user.role === 'Biên Tập Phả'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Plan */}
                  <td className="p-3.5">
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        user.plan === 'Trường Tồn' ? 'text-amber-800' : 'text-stone-700'
                      }`}
                    >
                      {user.plan === 'Trường Tồn' && (
                        <span className="material-symbols-outlined text-[15px] text-amber-600">diamond</span>
                      )}
                      {user.plan}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        user.status === 'Hoạt Động'
                          ? 'bg-emerald-50 text-emerald-700'
                          : user.status === 'Chờ Đối Soát CCCD'
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-red-50 text-red-700 font-bold'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'Hoạt Động'
                            ? 'bg-emerald-500'
                            : user.status === 'Chờ Đối Soát CCCD'
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-stone-500">
                      <button
                        type="button"
                        onClick={() => onNavigate('admin-chi-tiet-nguoi-dung')}
                        className="p-1 rounded hover:bg-stone-100 hover:text-stone-900"
                        title="Xem chi tiết"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(user.id)}
                        className={`p-1 rounded hover:bg-stone-100 ${
                          user.status === 'Hoạt Động' ? 'hover:text-red-700' : 'hover:text-emerald-700'
                        }`}
                        title={user.status === 'Hoạt Động' ? 'Tạm khóa' : 'Kích hoạt'}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {user.status === 'Hoạt Động' ? 'lock' : 'lock_open'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('admin-nhat-ky-audit')}
                        className="p-1 rounded hover:bg-stone-100 hover:text-stone-900"
                        title="Lịch sử kiểm toán"
                      >
                        <span className="material-symbols-outlined text-[18px]">history</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3.5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <span>Hiển thị 1 - 25 trong tổng số 48,290 tài khoản • Số dòng: 25</span>
          <div className="flex items-center gap-1 font-mono">
            <button type="button" className="px-2 py-1 rounded bg-white border border-stone-200 text-stone-700 hover:bg-stone-100">
              |&lt;
            </button>
            <button type="button" className="px-2 py-1 rounded bg-white border border-stone-200 text-stone-700 hover:bg-stone-100">
              &lt;
            </button>
            <button type="button" className="px-2.5 py-1 rounded bg-[#8A1A1B] text-white font-bold">
              1
            </button>
            <button type="button" className="px-2.5 py-1 rounded bg-white border border-stone-200 text-stone-700 hover:bg-stone-100">
              2
            </button>
            <button type="button" className="px-2.5 py-1 rounded bg-white border border-stone-200 text-stone-700 hover:bg-stone-100">
              3
            </button>
            <span>...</span>
            <button type="button" className="px-2 py-1 rounded bg-white border border-stone-200 text-stone-700 hover:bg-stone-100">
              1932
            </button>
            <button type="button" className="px-2 py-1 rounded bg-white border border-stone-200 text-stone-700 hover:bg-stone-100">
              &gt;
            </button>
            <button type="button" className="px-2 py-1 rounded bg-white border border-stone-200 text-stone-700 hover:bg-stone-100">
              &gt;|
            </button>
          </div>
        </div>
      </div>

      {/* Floating Success Toast (as in Image 3) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3 text-xs border border-stone-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white ml-2"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
