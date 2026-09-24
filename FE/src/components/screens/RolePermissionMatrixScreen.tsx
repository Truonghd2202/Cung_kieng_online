import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface RolePermissionMatrixScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface RoleCard {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  badgeBg: string;
  description: string;
  count: string;
  icon: string;
}

interface PermissionItem {
  id: string;
  name: string;
  desc: string;
  owner: 'full' | 'limited' | 'none';
  admin: 'full' | 'limited' | 'none';
  editor: 'full' | 'limited' | 'none';
  contributor: 'full' | 'limited' | 'none';
  viewer: 'full' | 'limited' | 'none';
  ownerTag?: string;
  adminTag?: string;
  editorTag?: string;
  contributorTag?: string;
  viewerTag?: string;
}

interface PermissionGroup {
  id: string;
  number: number;
  title: string;
  tag: string;
  items: PermissionItem[];
}

export const RolePermissionMatrixScreen: React.FC<RolePermissionMatrixScreenProps> = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [customOverrideActive, setCustomOverrideActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const roles: RoleCard[] = [
    {
      id: 'owner',
      name: 'Chủ Không Gian',
      subtitle: 'Trưởng Tộc / Người Sáng Lập',
      badge: 'Tối Cao',
      badgeBg: 'bg-[#80141d] text-white',
      description: 'Toàn quyền tối cao, sở hữu không gian, quản lý tài chính & gói dịch vụ, chuyển giao vị trí Trưởng tộc.',
      count: 'Hiện có: 1 Đại diện',
      icon: 'shield_person',
    },
    {
      id: 'admin',
      name: 'Quản Trị Viên',
      subtitle: 'Ban Trị Sự Dòng Họ',
      badge: 'Trị Sự',
      badgeBg: 'bg-[#faeed9] text-[#734c13] border border-[#dec9b6]',
      description: 'Quản lý thành viên, kiểm duyệt cột mốc, phê duyệt hiện vật bảo tàng, lên lịch giỗ chạp tộc toàn.',
      count: 'Hiện có: 4 Thành viên',
      icon: 'admin_panel_settings',
    },
    {
      id: 'editor',
      name: 'Biên Tập Viên',
      subtitle: 'Ban Soạn Phả & Tư Liệu',
      badge: 'Tác Phả',
      badgeBg: 'bg-[#faefe3] text-[#80141d] border border-[#dec9b6]',
      description: 'Thêm/sửa thành viên gia phả, tạo album ảnh, ghi chép kỷ ức, tả hiện vật, sử dụng phục chế ảnh AI.',
      count: 'Hiện có: 12 Biên tập',
      icon: 'edit_note',
    },
    {
      id: 'contributor',
      name: 'Người Đóng Góp',
      subtitle: 'Con Cháu Nội Ngoại',
      badge: 'Thân Tộc',
      badgeBg: 'bg-rose-100 text-rose-800 border border-rose-200',
      description: 'Đóng góp câu chuyện, đăng ảnh gia đình, bình luận, gửi lời tri ân, bái vọng & thắp hương trực tuyến.',
      count: 'Hiện có: 100+ Con cháu',
      icon: 'volunteer_activism',
    },
    {
      id: 'viewer',
      name: 'Người Xem',
      subtitle: 'Hậu Duệ & Khách Dòng Họ',
      badge: 'Khách Nhánh',
      badgeBg: 'bg-stone-100 text-stone-700 border border-stone-200',
      description: 'Xem cây phả hệ, đọc điển tích, theo dõi lịch giỗ, xem phòng tưởng niệm 3D, không thể chỉnh sửa dữ liệu.',
      count: 'Hiện có: 210 Quan sát',
      icon: 'visibility',
    },
  ];

  const permissionGroups: PermissionGroup[] = [
    {
      id: 'genealogy',
      number: 1,
      title: 'Quản Trị Cây Gia Phả & Phả Hệ Chi Nhánh',
      tag: 'Gốc chứng cội nguồn 14 đời',
      items: [
        {
          id: 'g1',
          name: 'Xem toàn bộ phả đồ gia phả',
          desc: 'Xem mối liên kết huyết thống, thế thứ trực hệ và bàng hệ',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'full',
          viewer: 'full',
        },
        {
          id: 'g2',
          name: 'Thêm đời mới / Thành viên nhánh',
          desc: 'Khởi tạo hồ sơ cho thế hệ mới sinh ra trong dòng tộc',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'limited',
          contributorTag: '?? Cần Duyệt',
          viewer: 'none',
        },
        {
          id: 'g3',
          name: 'Chỉnh sửa thông tin cội nguồn & tên húy',
          desc: 'Bao gồm tên tự, ngày sinh âm/dương, phần mộ, văn bia tiền nhân',
          owner: 'full',
          admin: 'full',
          editor: 'limited',
          editorTag: 'Trực Hệ',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 'g4',
          name: 'Xóa nhánh hoặc ghép nối phả hệ phức tạp',
          desc: 'Thao tác hệ trọng - có nguy cơ làm đứt gãy mạch truyền',
          owner: 'full',
          admin: 'limited',
          adminTag: 'Yêu Cầu 2FA',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 'g5',
          name: 'Thẩm định giấy tờ & chứng thực phả ký',
          desc: 'Phê duyệt sắc phong vua ban, chúc thư, bằng khoán đất từ đường',
          owner: 'full',
          admin: 'full',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
      ],
    },
    {
      id: 'memory',
      number: 2,
      title: 'Kho Ký Ức & Phục Chế Ảnh Tiền Nhân Bằng AI',
      tag: 'Bảo lưu 1.012 bức ảnh cổ',
      items: [
        {
          id: 'm1',
          name: 'Xem ảnh, băng ghi âm & tư liệu gia tộc',
          desc: 'Duyệt qua các biên niên sử theo từng thập niên phát triển tộc họ',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'full',
          viewer: 'limited',
          viewerTag: 'Công Khai',
        },
        {
          id: 'm2',
          name: 'Tải lên ảnh mới & ký ức xưa',
          desc: 'Tải ảnh chụp từ điện thoại, tư liệu gia đình qua các đời',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'limited',
          contributorTag: 'Theo Kỳ',
          viewer: 'none',
        },
        {
          id: 'm3',
          name: 'Sử dụng tính chất phục chế ảnh & AI màu chân dung',
          desc: 'Tiêu hao định ngạch điện toán đám mây cấp cho không gian',
          owner: 'full',
          admin: 'full',
          editor: 'limited',
          editorTag: 'Tối đa 20 Lần/Tháng',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 'm4',
          name: 'Tạo mới / Xóa album kỷ niệm chung tộc',
          desc: 'Sắp xếp các chuyên đề: ngày giỗ tổ, khánh thành từ đường, đại thọ...',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 'm5',
          name: 'Tải xuống tệp quét gốc 4K & tư liệu RAW',
          desc: 'Bảo vệ tài sản số khỏi hành vi sao chép không phép',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'limited',
          contributorTag: 'Chỉ Nhánh Mình',
          viewer: 'none',
        },
      ],
    },
    {
      id: 'museum',
      number: 3,
      title: 'Bảo Tàng Gia Bảo & Hiện Vật Cổ Truyền 3D',
      tag: 'Lưu trữ 48 món cổ vật gia bảo',
      items: [
        {
          id: 'b1',
          name: 'Chiêm ngưỡng hiện vật & đọc điển tích 3D',
          desc: 'Xoay 360 độ ngắm đỉnh đồng, bài vị, trướng kỷ cổ',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'full',
          viewer: 'full',
        },
        {
          id: 'b2',
          name: 'Đăng ký hiện vật mới vào kho bảo tàng',
          desc: 'Khai báo thông số, chủ sở hữu hiện thời, nguồn gốc lịch sử',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'limited',
          contributorTag: 'Đề Xuất',
          viewer: 'none',
        },
        {
          id: 'b3',
          name: 'Phê duyệt cổ vật & xếp hạng bảo vật dòng tộc',
          desc: 'Xác nhận mức độ quý giá cấp bảo vật gia tộc',
          owner: 'full',
          admin: 'full',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 'b4',
          name: 'Quét thực tế ảo LiDAR / Khởi tạo mô hình 3D',
          desc: 'Sử dụng công nghệ quét không gian để dựng phòng trưng bày số',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'none',
          viewer: 'none',
        },
      ],
    },
    {
      id: 'altar',
      number: 4,
      title: 'Gian Thờ & Không Gian Tưởng Niệm Tôn Nghiêm',
      tag: 'Nơi phụng tâm linh 14 chi phái',
      items: [
        {
          id: 'a1',
          name: 'Bái vọng & Thắp hương tưởng niệm trực tuyến',
          desc: 'Kính cẩn tưởng nhớ tiền nhân vào ngày Tết, sóc vọng, ngày giỗ',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'full',
          viewer: 'full',
        },
        {
          id: 'a2',
          name: 'Dâng hoa lễ vật & đọc văn khấn cổ truyền',
          desc: 'Chọn các combo lễ phẩm theo nghi thức nông thôn chuẩn cổ',
          owner: 'full',
          admin: 'full',
          editor: 'full',
          contributor: 'full',
          viewer: 'limited',
          viewerTag: 'Chỉ khấn',
        },
        {
          id: 'a3',
          name: 'Chỉnh sửa bài trí gian thờ 3D ảo',
          desc: 'Thay đổi bài trí tiền án, đồ thờ trâm son, câu đối, đại tự',
          owner: 'full',
          admin: 'full',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 'a4',
          name: 'Kiểm duyệt sổ cảm niệm & lời tri ân công khai',
          desc: 'Đảm bảo ngôn từ trang nghiêm, tránh tạp ngữ xuất hiện trên bảng vàng',
          owner: 'full',
          admin: 'full',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
      ],
    },
    {
      id: 'settings',
      number: 5,
      title: 'Quản Lý Không Gian Gia Tộc & Ngân Sách Phụng Điền',
      tag: 'Hạ tầng & bảo mật mã hóa AES-256',
      items: [
        {
          id: 's1',
          name: 'Mời thành viên mới & Rút quyền truy cập',
          desc: 'Gửi liên kết định danh mã hóa vào qua email/SMS',
          owner: 'full',
          admin: 'full',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 's2',
          name: 'Phân bổ thứ bậc & chỉ định vai trò thành viên',
          desc: 'Nâng hạ cấp giữa Quản Trị Viên, Soạn Phả, Đóng Góp',
          owner: 'full',
          admin: 'limited',
          adminTag: 'Trừ Cấp Owner',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 's3',
          name: 'Nâng cấp gói lưu trữ viễn cảnh & tế hội lại',
          desc: 'Đổi Gói Tộc Kim Niên hoặc Mở Rộng Lưu Trữ (100-500GB)',
          owner: 'full',
          admin: 'limited',
          adminTag: 'Lập Đề Xuất',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 's4',
          name: 'Xem hóa đơn tài chính & lịch sử đóng góp phụng điền',
          desc: 'Số thu chi minh bạch chi phí duy trì số hóa dòng tộc',
          owner: 'full',
          admin: 'full',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
        {
          id: 's5',
          name: 'Hủy bỏ / Chuyển giao toàn quyền Không Gian Dòng Tộc',
          desc: 'Hành động tối cao - chỉ có Thân Tộc (Người Sáng Lập ban đầu) có quyền thực hiện',
          owner: 'limited',
          ownerTag: 'Toàn Quyền DUY NHẤT',
          admin: 'none',
          editor: 'none',
          contributor: 'none',
          viewer: 'none',
        },
      ],
    },
  ];

  const renderStatus = (status: 'full' | 'limited' | 'none', tag?: string) => {
    if (status === 'full') {
      return (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-[#fdfaf5] border border-[#dec9b6] flex items-center justify-center shadow-2xs">
            <span className="material-symbols-outlined text-[#c9892c] text-sm font-bold">check</span>
          </div>
        </div>
      );
    }
    if (status === 'limited') {
      return (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] whitespace-nowrap">
            {tag || 'Giới Hạn'}
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <span className="material-symbols-outlined text-[#dec9b6] text-sm">close</span>
      </div>
    );
  };

  const filteredGroups = permissionGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      searchQuery === ''
        ? true
        : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#80141d] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-fade-in text-xs font-semibold">
          <span className="material-symbols-outlined text-[#faeed9] text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {/* Top Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-[#dec9b6]/50 pb-3">
          <div className="flex items-center gap-2 text-[#8a6f62]">
            <span className="material-symbols-outlined text-sm text-[#80141d]">shield</span>
            <span>Cài Đặt &amp; Quản Trị Gia Tộc</span>
            <span>&gt;</span>
            <span className="text-[#80141d] font-bold">Vai Trò &amp; Ma Trận Phân Quyền</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#8a6f62] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#c9892c]">verified</span>
              <span>Bản Quy Chuẩn Phụng Tự Chi Tộc</span>
            </span>
            <span className="text-[#dec9b6]">|</span>
            <button
              type="button"
              onClick={() => {
                setToastMessage('Đang mở Sổ Tộc Khôi Quyền...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="text-[11px] font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">history_edu</span>
              <span>Sổ Tộc Khôi Quyền</span>
            </button>
          </div>
        </div>

        {/* Hero Banner Header Area */}
        <div className="p-6 bg-[#faefe3]/70 border border-[#dec9b6] rounded-3xl shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[10px] font-bold uppercase tracking-wider border border-[#dec9b6]">
              <span className="material-symbols-outlined text-xs">local_police</span>
              <span>PHỤNG TRUYỀN TÔN TI TRẬT TỰ</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15] leading-tight">
              Hệ Thống Phân Cấp Vai Trò &amp; Ma Trận Quyền Hạn Dòng Tộc
            </h1>

            <p className="text-xs text-[#6b584d] leading-relaxed">
              Thiết lập quyền hạn minh bạch, gìn giữ tôn ti trật tự theo gia phong truyền thống kết hợp chuẩn bảo mật hiện đại. Từng hành động tôn tạo gia phả đều được bảo lưu danh tính và sự chuẩn thuận trang nghiêm.
            </p>
          </div>

          {/* Right Stats Widget */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center gap-4 shrink-0">
            <div className="text-center pr-3 border-r border-[#dec9b6]/60">
              <div className="text-[10px] uppercase font-bold text-[#8a6f62]">Thành Viên Có Quyền</div>
              <div className="text-2xl font-serif font-bold text-[#80141d]">48</div>
              <div className="text-[9px] text-[#8a6f62]">Toàn bộ tộc nhân</div>
            </div>

            <div className="text-center pr-3 border-r border-[#dec9b6]/60">
              <div className="text-[10px] uppercase font-bold text-[#8a6f62]">Hiệu Lực Chuẩn Tộc</div>
              <div className="text-2xl font-serif font-bold text-[#734c13]">07</div>
              <div className="text-[9px] text-[#8a6f62]">Kỳ Họp Đã Phê Duyệt</div>
            </div>

            <div className="text-center">
              <div className="text-[10px] uppercase font-bold text-[#8a6f62]">Bảo Mật Tộc Thư</div>
              <div className="text-xs font-bold text-[#80141d] flex items-center justify-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>Khóa 2 Lớp (2FA)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Cấp Bậc Vai Trò Định Danh */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#80141d]">badge</span>
              <span>5 Cấp Bậc Vai Trò Định Danh</span>
            </div>
            <span className="text-[11px] text-[#8a6f62]">
              Nhấn vào từng vai trò để lọc dòng phân quyền
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {roles.map((r) => {
              const isSelected = selectedRole === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRole(isSelected ? null : r.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#faefe3] border-2 border-[#80141d] shadow-sm'
                      : 'bg-white border-[#dec9b6] hover:border-[#c9892c] shadow-2xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[#faefe3] text-[#80141d] flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">{r.icon}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.badgeBg}`}>
                        {r.badge}
                      </span>
                    </div>

                    <div>
                      <div className="font-serif font-bold text-xs text-[#2b1b15]">
                        {r.name}
                      </div>
                      <div className="text-[10px] text-[#8a6f62]">{r.subtitle}</div>
                    </div>

                    <p className="text-[11px] text-[#6b584d] leading-relaxed line-clamp-3">
                      {r.description}
                    </p>
                  </div>

                  <div className="text-[10px] text-[#8a6f62] border-t border-[#dec9b6]/40 pt-2 flex items-center justify-between">
                    <span>{r.count}</span>
                    <span className="material-symbols-outlined text-xs text-[#c9892c]">lock</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tùy Biến Quyền Hạn Đặc Thù Chi Phái (Custom Permission Override) */}
        <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">tune</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xs text-[#2b1b15]">
                  Tùy Biến Quyền Hạn Đặc Thù Chi Phái (Custom Permission Override)
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                  Nâng Cao
                </span>
              </div>
              <p className="text-[11px] text-[#6b584d]">
                Cho phép mở một vài nhánh hoặc thắt chặt quyền quản lý của các nhánh phân chi mà không ảnh hưởng gia quy toàn tộc.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-[#6b584d]">Gán cơ chế ngoại lệ:</span>
            <button
              type="button"
              onClick={() => setCustomOverrideActive(!customOverrideActive)}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                customOverrideActive ? 'bg-[#80141d]' : 'bg-[#dec9b6]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  customOverrideActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <select className="text-xs bg-[#faefe3] border border-[#dec9b6] rounded-xl px-2.5 py-1 text-[#2b1b15] font-medium focus:outline-none">
              <option>Áp dụng: Toàn Đại Tộc</option>
              <option>Chi Trực Lăng</option>
              <option>Chi Trực Ninh</option>
              <option>Phân Chi Miền Nam</option>
            </select>
          </div>
        </div>

        {/* Matrix Legend & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[11px] font-bold text-[#8a6f62] uppercase tracking-wider">
              QUY TẮC MA TRẬN:
            </span>
            <div className="flex items-center gap-1.5 text-[#4a362f]">
              <span className="w-4 h-4 rounded-full bg-[#fdfaf5] border border-[#dec9b6] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#c9892c] text-xs font-bold">check</span>
              </span>
              <span>Đầy đủ quyền</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#4a362f]">
              <span className="px-1.5 py-0.5 rounded bg-[#faeed9] text-[#734c13] text-[9px] font-bold border border-[#dec9b6]">
                Cần duyệt / Giới hạn
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#8a6f62]">
              <span className="material-symbols-outlined text-xs text-[#dec9b6]">close</span>
              <span>Không có quyền</span>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-2 text-[#8a6f62] text-sm pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm quyền hạn (ví dụ: 3D, tải ảnh, xóa...)"
              className="w-full bg-white border border-[#dec9b6] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
            />
          </div>
        </div>

        {/* Ma Trận Phân Quyền Table */}
        <div className="bg-white border border-[#dec9b6] rounded-3xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#faefe3] border-b border-[#dec9b6] text-xs font-serif font-bold text-[#2b1b15]">
                  <th className="py-3.5 px-4 w-5/12">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-[#80141d]">format_list_bulleted</span>
                      <span>Tính Năng &amp; Danh Mục Phân Quyền</span>
                    </div>
                  </th>
                  <th className="py-3.5 px-3 text-center w-[11.6%]">
                    <div className="font-bold text-[#80141d]">Chủ Sở Hữu</div>
                    <div className="text-[10px] text-[#8a6f62] font-sans font-normal">Owner</div>
                  </th>
                  <th className="py-3.5 px-3 text-center w-[11.6%]">
                    <div className="font-bold text-[#734c13]">Quản Trị Viên</div>
                    <div className="text-[10px] text-[#8a6f62] font-sans font-normal">Admin</div>
                  </th>
                  <th className="py-3.5 px-3 text-center w-[11.6%]">
                    <div className="font-bold text-[#80141d]">Biên Tập Viên</div>
                    <div className="text-[10px] text-[#8a6f62] font-sans font-normal">Editor</div>
                  </th>
                  <th className="py-3.5 px-3 text-center w-[11.6%]">
                    <div className="font-bold text-rose-800">Người Đóng Góp</div>
                    <div className="text-[10px] text-[#8a6f62] font-sans font-normal">Contributor</div>
                  </th>
                  <th className="py-3.5 px-3 text-center w-[11.6%]">
                    <div className="font-bold text-stone-700">Người Xem</div>
                    <div className="text-[10px] text-[#8a6f62] font-sans font-normal">Viewer</div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#dec9b6]/40 text-xs">
                {filteredGroups.map((group) => (
                  <React.Fragment key={group.id}>
                    {/* Group Header Row */}
                    <tr className="bg-[#faeed9]/50">
                      <td colSpan={6} className="py-2.5 px-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-serif font-bold text-xs text-[#80141d]">
                            <span className="w-5 h-5 rounded-md bg-[#80141d] text-white flex items-center justify-center text-[10px]">
                              {group.number}
                            </span>
                            <span>{group.title}</span>
                          </div>
                          <span className="text-[10px] text-[#8a6f62] font-medium">
                            {group.tag}
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Group Items */}
                    {group.items.map((item) => (
                      <tr key={item.id} className="hover:bg-[#fcf8f2] transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#2b1b15]">{item.name}</div>
                          <div className="text-[11px] text-[#8a6f62] leading-tight">{item.desc}</div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          {renderStatus(item.owner, item.ownerTag)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {renderStatus(item.admin, item.adminTag)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {renderStatus(item.editor, item.editorTag)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {renderStatus(item.contributor, item.contributorTag)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {renderStatus(item.viewer, item.viewerTag)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Card: Đạo Đức Kỷ Cương & Tính Bất Biến Của Phả Ký */}
        <div className="p-4 sm:p-5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">gavel</span>
            </div>
            <div>
              <div className="font-serif font-bold text-xs text-[#80141d]">
                Đạo Đức Kỷ Cương &amp; Tính Bất Biến Của Phả Ký
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed max-w-3xl">
                Mọi thao tác can thiệp phả ký từ cấp Biên Tập viên trở lên đều được ghi nhận vào nhật ký kiểm toán không thể sửa đổi (Audit Log). Vai trò Quản trị viên chỉ có quyền hủy bỏ thông tin sai lệch sau khi có sự chuẩn thuận của Trưởng tộc hoặc Đại hội dòng tộc.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setToastMessage('Đang mở Nhật Ký Kiểm Toán Phả Ký...');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="px-3 py-1.5 rounded-xl border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#80141d] flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-sm">history</span>
            <span>Nhật Ký Thay Đổi</span>
          </button>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#faefe3]/95 backdrop-blur-md border-t border-[#dec9b6] py-3 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#6b584d]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>
              Hệ thống đang chạy theo <strong>Gia Quy Mặc Định</strong>. Lần đồng bộ cuối: Hôm nay, lúc 09:40 bởi Nguyễn Trực Viễn
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setToastMessage('Đã khôi phục các quyền hạn về chuẩn mặc định!');
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="px-4 py-2 rounded-xl bg-white border border-[#dec9b6] text-xs font-bold text-[#4a362f] hover:bg-[#faefe3] transition-colors cursor-pointer"
            >
              Khôi Phục Chuẩn Mặc
            </button>
            <button
              type="button"
              onClick={() => {
                setToastMessage('Đã lưu các sửa đổi phân quyền gia quy thành công!');
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="px-4 py-2 rounded-xl bg-[#80141d] text-white hover:bg-[#681017] text-xs font-bold transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Lưu Thay Đổi Gia Quy</span>
            </button>
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
