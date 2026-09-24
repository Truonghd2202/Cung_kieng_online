import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface InviteMembersScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface InviteRecord {
  id: string;
  initials: string;
  name: string;
  contact: string;
  role: string;
  branch: string;
  sentDate: string;
  expiryInfo: string;
  isExpiringSoon?: boolean;
  isExpired?: boolean;
  isJoined?: boolean;
  isRevoked?: boolean;
  creator: string;
  status: 'pending' | 'joined' | 'expired' | 'revoked';
  statusLabel: string;
}

export const InviteMembersScreen: React.FC<InviteMembersScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'email' | 'link'>('email');
  const [contactInput, setContactInput] = useState('nguyen.tuanbac@heritage.org');
  const [selectedRole, setSelectedRole] = useState('contributor');
  const [pedigreeBranch, setPedigreeBranch] = useState('Chi Trực Lăng > Đời 12 > Nhánh Cụ Nguyễn Tộ');
  const [expiryDays, setExpiryDays] = useState<'48h' | '7d' | '30d' | 'forever'>('7d');
  const [usageType, setUsageType] = useState<'single' | 'multiple'>('single');
  const [message, setMessage] = useState(
    'Kính gửi con cháu chi Trực Lăng xa gần, kính mời quý bác, cô chú và anh chị em cùng hội tụ tại Trang Ký Ức Đại Tộc Nguyễn Phúc Anh. Đạo hiếu là đầu, sum vầy là phúc, mong mọi người cùng tiếp nối cội nguồn tổ tiên.\n\nKý tên: Nguyễn Trực Viễn (Trưởng tộc đời 11)'
  );
  const [searchTable, setSearchTable] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inviteRecords: InviteRecord[] = [
    {
      id: 'inv1',
      initials: 'TB',
      name: 'Nguyễn Tuấn Bắc',
      contact: 'nguyen.tuanbac@heritage.org',
      role: 'Editor (Biên Soạn)',
      branch: 'Chi Trực Lăng (Đời 13 - Trưởng Nhánh 2)',
      sentDate: '25/01/2025',
      expiryInfo: 'Còn 3 ngày 14 giờ (Hết hạn: 23:59 28/01/2025)',
      isExpiringSoon: true,
      creator: 'Nguyễn Trực Viễn',
      status: 'pending',
      statusLabel: 'Đang Chờ',
    },
    {
      id: 'inv2',
      initials: 'ML',
      name: 'Nguyễn Mai Lan (Pháp)',
      contact: '+33 6 12 34 56 78',
      role: 'Contributor (Kỷ Vật)',
      branch: 'Chi Phái Tổ (Đời 13 - Hải Ngoại)',
      sentDate: '23/01/2025',
      expiryInfo: 'Còn 1 ngày 08 giờ (Hết hạn: 23:59 26/01/2025)',
      isExpiringSoon: true,
      creator: 'Nguyễn Trực Viễn',
      status: 'pending',
      statusLabel: 'Đang Chờ',
    },
    {
      id: 'inv3',
      initials: 'HQ',
      name: 'Nguyễn Hoàng Quân',
      contact: 'hoangquan.nguyen@gmail.com',
      role: 'Editor (Biên Soạn)',
      branch: 'Chi Trực Lăng (Đời 14 - Cố định)',
      sentDate: '20/01/2025',
      expiryInfo: 'Gia nhập lúc 14:20 21/01',
      isJoined: true,
      creator: 'Nguyễn Trực Viễn',
      status: 'joined',
      statusLabel: 'Đã Tham Gia',
    },
    {
      id: 'inv4',
      initials: 'ĐA',
      name: 'Nguyễn Đăng Anh',
      contact: 'danganh.arch@gmail.com',
      role: 'Viewer (Xem Lễ)',
      branch: 'Chi Phái Tổ (Chưa khớp nhánh)',
      sentDate: '10/01/2025',
      expiryInfo: 'Đã Hết Hạn (Hết hiệu lực ngày 12/01)',
      isExpired: true,
      creator: 'Ban Quản Trị',
      status: 'expired',
      statusLabel: 'Hết Hiệu Lực',
    },
    {
      id: 'inv5',
      initials: 'QR',
      name: 'Mã QR Mở Ngày Chạp 2024',
      contact: 'Liên kết đa dụng nhóm họp mặt',
      role: 'Viewer (Quan Khách)',
      branch: 'Không gắn nhánh',
      sentDate: '01/01/2025',
      expiryInfo: 'Đã đóng thủ công',
      isRevoked: true,
      creator: 'Nguyễn Trực Viễn',
      status: 'revoked',
      statusLabel: 'Đã Thu Hồi',
    },
  ];

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Đã phát hành lời mời trang trọng tới người nhận!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = () => {
    setToastMessage('Đã sao chép liên kết mời kèm mã QR vào clipboard!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const renderStatusBadge = (status: InviteRecord['status'], label: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[10px] font-bold">
            • {label}
          </span>
        );
      case 'joined':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
            ✓ {label}
          </span>
        );
      case 'expired':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-bold">
            ✕ {label}
          </span>
        );
      case 'revoked':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-[10px] font-medium">
            {label}
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
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-[#dec9b6]/50 pb-3">
          <div className="flex items-center gap-2 text-[#8a6f62]">
            <span>Cài Đặt &amp; Quản Trị Gia Tộc</span>
            <span>&gt;</span>
            <span className="text-[#80141d] font-bold">Lời Mời Gia Đình</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#faefe3] border border-[#dec9b6] text-[10px] font-bold text-[#80141d]">
              • Không Gian Dòng Tộc Kín • AES-256
            </span>
            <span className="text-[#dec9b6]">|</span>
            <button
              type="button"
              onClick={() => {
                setToastMessage('Đang mở Nhật Ký Gia Nhập Dòng Họ...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="text-[11px] font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">history</span>
              <span>Nhật Ký Gia Nhập</span>
            </button>
          </div>
        </div>

        {/* Hero Banner Header Area */}
        <div className="relative p-6 bg-[#faefe3]/70 border border-[#dec9b6] rounded-3xl shadow-2xs overflow-hidden">
          {/* Circular watermark decoration */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 opacity-10 pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#80141d] fill-current">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[10px] font-bold uppercase tracking-wider border border-[#dec9b6]">
              <span className="material-symbols-outlined text-xs">group_add</span>
              <span>ĐOÀN TỤ PHỤNG SỰ HUYẾT THỐNG</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15] leading-tight">
              Gửi Lời Mời Gia Tộc &amp; Quản Lý Liên Kết Gia Nhập
            </h1>

            <p className="text-xs text-[#6b584d] leading-relaxed">
              Mời con cháu nội ngoại trong và ngoài nước sum vầy về không gian cội nguồn trực tuyến; kết nối cội rễ, chung tay ghi chép biên niên sử và phụng dưỡng tiền nhân muôn đời.
            </p>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span className="font-semibold">Tổng Lời Mời Đã Gửi</span>
              <span className="material-symbols-outlined text-rose-800 text-lg">outgoing_mail</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-[#80141d]">28</span>
              <span className="text-[10px] text-emerald-800 font-semibold">+6 tháng này</span>
            </div>
            <div className="text-[10px] text-[#8a6f62] pt-1 border-t border-[#dec9b6]/40">
              Bao gồm 12 email, 8 SMS &amp; 8 liên kết mở
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span className="font-semibold">Đã Chấp Nhận &amp; Vào Phả</span>
              <span className="material-symbols-outlined text-[#c9892c] text-lg">check_circle</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-[#734c13]">21</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#faeed9] text-[#734c13] font-bold">Tỷ lệ 75%</span>
            </div>
            <div className="text-[10px] text-[#8a6f62] pt-1 border-t border-[#dec9b6]/40">
              21 thành viên đã hoàn tất định danh nhánh
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span className="font-semibold">Đang Chờ Phản Hồi</span>
              <span className="material-symbols-outlined text-[#734c13] text-lg">pending</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-[#2b1b15]">05</span>
              <span className="text-[10px] text-[#80141d] font-semibold">2 người sắp quá hạn</span>
            </div>
            <div className="text-[10px] text-[#8a6f62] pt-1 border-t border-[#dec9b6]/40">
              Có thể bấm gửi nhắc nhở các thư
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8a6f62]">
              <span className="font-semibold">Hết Hạn / Đã Thu Hồi</span>
              <span className="material-symbols-outlined text-[#8a6f62] text-lg">event_busy</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-[#8a6f62]">02</span>
              <span className="text-[10px] text-[#8a6f62]">Khóa tự động</span>
            </div>
            <div className="text-[10px] text-[#8a6f62] pt-1 border-t border-[#dec9b6]/40">
              Bảo toàn bảo mật dòng tộc nội bộ
            </div>
          </div>
        </div>

        {/* Form & QR Code Section (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Create Invite Form) */}
          <div className="lg:col-span-7 bg-white border border-[#dec9b6] rounded-3xl p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="flex items-center gap-3 border-b border-[#dec9b6]/40 pb-3">
              <div className="w-10 h-10 rounded-xl bg-[#80141d] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">mark_email_read</span>
              </div>
              <div>
                <div className="font-serif font-bold text-sm text-[#2b1b15]">
                  Tạo Lời Mời Gia Nhập Mới
                </div>
                <div className="text-[11px] text-[#8a6f62]">
                  Khởi tạo thư mời trang trọng hoặc tạo đường dẫn định danh có mã QR
                </div>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('email')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'email'
                    ? 'bg-[#faefe3] border-2 border-[#80141d] text-[#80141d] shadow-2xs'
                    : 'bg-white border border-[#dec9b6] text-[#6b584d]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">email</span>
                <span>Gửi Email / SMS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('link')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'link'
                    ? 'bg-[#faefe3] border-2 border-[#80141d] text-[#80141d] shadow-2xs'
                    : 'bg-white border border-[#dec9b6] text-[#6b584d]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">qr_code_2</span>
                <span>Liên Kết / Mã QR</span>
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              {/* Recipient Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[#2b1b15] font-semibold">
                  <label htmlFor="contactInput">Hộp Thư Điện Tử (Email) hoặc Số Điện Thoại</label>
                  <span className="text-[10px] text-[#8a6f62] font-normal">
                    Hỗ trợ phân tách bằng dấu phẩy nhiều người nhận
                  </span>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a6f62] text-base pointer-events-none">
                    account_circle
                  </span>
                  <input
                    id="contactInput"
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder="nguyen.tuanbac@heritage.org, +84..."
                    className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl pl-9 pr-3 py-2 text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
                  />
                </div>
              </div>

              {/* 2 Dropdowns Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 font-semibold text-[#2b1b15]">
                    <span>Vai Trò Phân Quyền</span>
                    <span className="material-symbols-outlined text-xs text-[#8a6f62]">info</span>
                  </div>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] focus:outline-none cursor-pointer"
                  >
                    <option value="contributor">Contributor (Người Đóng Góp Ký Ức, Ảnh, Kỷ...)</option>
                    <option value="editor">Editor (Biên Tập Viên Soạn Phả)</option>
                    <option value="admin">Admin (Quản Trị Viên Dòng Tộc)</option>
                    <option value="viewer">Viewer (Người Xem Đọc Phả Hệ)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#2b1b15]">
                    <span>Khớp Cây Gia Phả (Tự Động)</span>
                    <span className="text-[10px] text-[#734c13] font-bold">Khuyến nghị</span>
                  </div>
                  <select
                    value={pedigreeBranch}
                    onChange={(e) => setPedigreeBranch(e.target.value)}
                    className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-[#2b1b15] focus:outline-none cursor-pointer font-medium"
                  >
                    <option>Chi Trực Lăng &gt; Đời 12 &gt; Nhánh Cụ Nguyễn Tộ</option>
                    <option>Chi Trực Lăng &gt; Đời 13 &gt; Nhánh Trưởng Đích</option>
                    <option>Chi Phái Tổ &gt; Hải Ngoại</option>
                  </select>
                </div>
              </div>

              {/* Expiry Buttons & Usage Radio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Expiry Days */}
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#2b1b15]">Thời Hạn Hiệu Lực Lời Mời</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: '48h', label: '48 Giờ' },
                      { id: '7d', label: '7 Ngày' },
                      { id: '30d', label: '30 Ngày' },
                      { id: 'forever', label: 'Vĩnh Viễn' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setExpiryDays(btn.id as any)}
                        className={`py-1.5 text-center rounded-lg text-[11px] font-bold cursor-pointer transition-colors border ${
                          expiryDays === btn.id
                            ? 'bg-[#80141d] text-white border-[#80141d]'
                            : 'bg-[#fcf8f2] text-[#4a362f] border-[#dec9b6] hover:bg-[#faefe3]'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                  <div className="text-[9px] text-[#8a6f62]">
                    *Vĩnh viễn chỉ áp dụng cho mã QR cố định tại Từ Đường.
                  </div>
                </div>

                {/* Usage Type */}
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#2b1b15]">Số Lượng Sử Dụng</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <label
                      onClick={() => setUsageType('single')}
                      className={`p-2 rounded-xl border flex items-start gap-2 cursor-pointer transition-colors ${
                        usageType === 'single'
                          ? 'bg-[#faefe3] border-[#80141d]'
                          : 'bg-[#fcf8f2] border-[#dec9b6]'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={usageType === 'single'}
                        onChange={() => {}}
                        className="mt-0.5 accent-[#80141d]"
                      />
                      <div>
                        <div className="font-bold text-[#2b1b15]">Đơn lẻ (1 người)</div>
                        <div className="text-[9px] text-[#8a6f62]">Tự khóa sau khi nhận</div>
                      </div>
                    </label>

                    <label
                      onClick={() => setUsageType('multiple')}
                      className={`p-2 rounded-xl border flex items-start gap-2 cursor-pointer transition-colors ${
                        usageType === 'multiple'
                          ? 'bg-[#faefe3] border-[#80141d]'
                          : 'bg-[#fcf8f2] border-[#dec9b6]'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={usageType === 'multiple'}
                        onChange={() => {}}
                        className="mt-0.5 accent-[#80141d]"
                      />
                      <div>
                        <div className="font-bold text-[#2b1b15]">Đa dụng (Nhiều người)</div>
                        <div className="text-[9px] text-[#8a6f62]">Dành cho nhóm gia đình</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Letter Message Box */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between font-semibold text-[#2b1b15]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#80141d]">history_edu</span>
                    <span>Thư Từ Phong Nhã Từ Trưởng Tộc</span>
                  </div>
                  <span className="text-[10px] text-[#734c13] italic font-serif">Ân chỉ chi Trực Lăng</span>
                </div>

                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl p-3 text-xs text-[#2b1b15] font-serif leading-relaxed italic focus:outline-none focus:border-[#80141d]"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setMessage(
                        'Kính gửi con cháu chi Trực Lăng xa gần, kính mời quý bác, cô chú và anh chị em cùng hội tụ tại Trang Ký Ức Đại Tộc Nguyễn Phúc Anh. Đạo hiếu là đầu, sum vầy là phúc, mong mọi người cùng tiếp nối cội nguồn tổ tiên.\n\nKý tên: Nguyễn Trực Viễn (Trưởng tộc đời 11)'
                      );
                    }}
                    className="text-[11px] text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <span className="material-symbols-outlined text-xs">restart_alt</span>
                    <span>Khôi phục mẫu văn cổ</span>
                  </button>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-[#dec9b6]/40">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-base">share</span>
                  <span>Sao Chép Kèm Mã QR</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  <span>Gửi Lời Mời Trang Trọng</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (Printable QR Poster) */}
          <div className="lg:col-span-5 bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
              <div className="font-serif font-bold text-xs uppercase tracking-wider text-[#8a6f62]">
                KỶ VẬT PHỤC VỤ LỄ NGHI
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[9px] font-bold">
                Bản In Chuẩn Gốc
              </span>
            </div>

            {/* Poster Card */}
            <div className="p-6 bg-[#fdfaf5] border border-[#dec9b6] rounded-2xl text-center space-y-4 relative shadow-2xs">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-2 left-2 text-[#c9892c] text-xs">⌜</div>
              <div className="absolute top-2 right-2 text-[#c9892c] text-xs">⌝</div>
              <div className="absolute bottom-2 left-2 text-[#c9892c] text-xs">⌞</div>
              <div className="absolute bottom-2 right-2 text-[#c9892c] text-xs">⌟</div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#faefe3] border border-[#dec9b6] mx-auto flex items-center justify-center text-[#80141d]">
                  <span className="material-symbols-outlined text-base">temple_buddhist</span>
                </div>
                <div className="font-serif font-bold text-sm text-[#80141d]">Đại Tộc Nguyễn</div>
                <div className="text-[10px] text-[#734c13] font-semibold uppercase tracking-wider">
                  TỪ ĐƯỜNG CHI TRỰC LĂNG
                </div>
              </div>

              {/* QR Code Graphic Box */}
              <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl border-2 border-[#80141d] shadow-sm flex flex-col items-center justify-center relative">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#80141d] fill-current">
                  {/* Position squares */}
                  <rect x="5" y="5" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="11" y="11" width="14" height="14" fill="currentColor" />
                  <rect x="69" y="5" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="75" y="11" width="14" height="14" fill="currentColor" />
                  <rect x="5" y="69" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="11" y="75" width="14" height="14" fill="currentColor" />
                  {/* Grid noise simulation */}
                  <rect x="36" y="10" width="8" height="8" />
                  <rect x="48" y="15" width="6" height="12" />
                  <rect x="12" y="38" width="10" height="6" />
                  <rect x="28" y="36" width="14" height="14" />
                  <rect x="55" y="38" width="8" height="8" />
                  <rect x="70" y="40" width="16" height="6" />
                  <rect x="38" y="56" width="10" height="12" />
                  <rect x="54" y="58" width="12" height="12" />
                  <rect x="72" y="60" width="14" height="8" />
                  <rect x="74" y="76" width="12" height="12" />
                  <rect x="40" y="78" width="10" height="8" />
                </svg>
              </div>

              <div className="space-y-0.5">
                <div className="font-serif font-bold text-xs text-[#2b1b15]">
                  Quét Để Điểm Danh &amp; Vào Phả
                </div>
                <p className="text-[10px] text-[#6b584d] max-w-xs mx-auto leading-relaxed">
                  Dành cho con cháu về tảo mộ, viếng hương ngày chạp 24 tháng Chạp
                </p>
              </div>
            </div>

            {/* Print Buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#8a6f62]">
                <span>Khổ Giấy Khuyến Nghị:</span>
                <span className="font-bold text-[#2b1b15]">A4 / A3 (300 DPI)</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đang chuẩn bị tệp in ấn kích thước A4 tiêu chuẩn...');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="py-2 px-3 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-sm text-[#80141d]">print</span>
                  <span>Tải Bản In A4</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đang chuẩn bị tệp in ấn kích thước A3 độ phân giải cao...');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="py-2 px-3 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-sm text-[#c9892c]">print</span>
                  <span>Tải Bản In A3</span>
                </button>
              </div>
            </div>

            <div className="text-[10px] text-[#8a6f62] bg-[#faefe3]/50 p-2.5 rounded-xl border border-[#dec9b6]/60 flex items-start gap-1.5">
              <span className="material-symbols-outlined text-xs text-[#c9892c] shrink-0 mt-0.5">
                verified_user
              </span>
              <span>
                Mã này được mã hóa vĩnh viễn, kèm danh phận khách viếng thăm có xác minh từ Trưởng tộc.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Table: Danh Sách Lời Mời & Trạng Thái Tiếp Nhận */}
        <div className="bg-white border border-[#dec9b6] rounded-3xl overflow-hidden shadow-2xs space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9b6]/40 pb-3">
            <div className="space-y-0.5">
              <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#80141d]">format_list_bulleted</span>
                <span>Danh Sách Lời Mời &amp; Trạng Thái Tiếp Nhận</span>
              </div>
              <p className="text-[11px] text-[#8a6f62]">
                Theo dõi thời gian thực, nhắc nhở hoặc thu hồi thẩm quyền liên kết
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-56">
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#8a6f62] text-sm pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchTable}
                  onChange={(e) => setSearchTable(e.target.value)}
                  placeholder="Tìm theo tên, email, nhánh..."
                  className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#2b1b15] focus:outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-2.5 py-1.5 text-xs text-[#2b1b15] focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả trạng thái (5)</option>
                <option value="pending">Đang chờ</option>
                <option value="joined">Đã tham gia</option>
                <option value="expired">Hết hạn</option>
                <option value="revoked">Đã thu hồi</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setToastMessage('Đã làm mới danh sách trạng thái!');
                  setTimeout(() => setToastMessage(null), 2000);
                }}
                className="p-1.5 rounded-xl border border-[#dec9b6] hover:bg-[#faefe3] text-[#8a6f62] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#faefe3] border-b border-[#dec9b6] font-serif font-bold text-[#2b1b15]">
                  <th className="py-3 px-3">NGƯỜI NHẬN / ĐỊNH DANH</th>
                  <th className="py-3 px-3">VAI TRÒ CHỈ ĐỊNH</th>
                  <th className="py-3 px-3">NHÁNH PHẢ HỆ</th>
                  <th className="py-3 px-3 text-center">NGÀY GỬI</th>
                  <th className="py-3 px-3">THỜI HẠN &amp; ĐẾM NGƯỢC</th>
                  <th className="py-3 px-3 text-center">NGƯỜI TẠO</th>
                  <th className="py-3 px-3 text-center">TRẠNG THÁI</th>
                  <th className="py-3 px-3 text-center">THAO TÁC</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#dec9b6]/40">
                {inviteRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-[#fcf8f2] transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] font-bold text-xs flex items-center justify-center shrink-0">
                          {r.initials}
                        </div>
                        <div>
                          <div className="font-serif font-bold text-xs text-[#2b1b15]">{r.name}</div>
                          <div className="text-[11px] text-[#8a6f62]">{r.contact}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-[#faefe3] text-[#80141d] font-semibold text-[10px] border border-[#dec9b6]">
                        {r.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-[#6b584d] text-[11px]">
                      {r.branch}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono text-[11px] text-[#8a6f62]">
                      {r.sentDate}
                    </td>

                    <td className="py-3.5 px-3 text-[11px]">
                      <div className="flex items-center gap-1">
                        {r.isExpiringSoon && (
                          <span className="material-symbols-outlined text-xs text-[#c9892c]">schedule</span>
                        )}
                        {r.isExpired && (
                          <span className="material-symbols-outlined text-xs text-rose-800">error</span>
                        )}
                        <span
                          className={
                            r.isExpiringSoon
                              ? 'font-bold text-[#c9892c]'
                              : r.isExpired
                              ? 'font-bold text-rose-800'
                              : 'text-[#6b584d]'
                          }
                        >
                          {r.expiryInfo}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center text-[#6b584d]">
                      {r.creator}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      {renderStatusBadge(r.status, r.statusLabel)}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Đã gửi lại lời nhắc tới: ${r.name}`);
                            setTimeout(() => setToastMessage(null), 2500);
                          }}
                          title="Gửi lại lời mời"
                          className="p-1 rounded hover:bg-[#faefe3] text-[#8a6f62] hover:text-[#80141d] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">send</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Đã sao chép liên kết của: ${r.name}`);
                            setTimeout(() => setToastMessage(null), 2500);
                          }}
                          title="Sao chép link"
                          className="p-1 rounded hover:bg-[#faefe3] text-[#8a6f62] hover:text-[#80141d] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Đã thu hồi thẩm quyền liên kết: ${r.name}`);
                            setTimeout(() => setToastMessage(null), 2500);
                          }}
                          title="Thu hồi quyền"
                          className="p-1 rounded hover:bg-[#faefe3] text-[#8a6f62] hover:text-rose-800 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">block</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="pt-3 border-t border-[#dec9b6]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#8a6f62]">
            <div>Hiển thị 5 trên tổng số 28 bản ghi lời mời</div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer text-[#4a362f]"
              >
                Trước
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-lg bg-[#80141d] text-white font-bold cursor-pointer"
              >
                1
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer"
              >
                2
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer"
              >
                3
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer text-[#4a362f]"
              >
                Tiếp
              </button>
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
