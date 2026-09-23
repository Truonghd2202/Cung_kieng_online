import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminUserDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminUserDetailScreen: React.FC<AdminUserDetailScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'spaces' | 'logs' | 'credits' | 'sessions'>('spaces');
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="space-y-6 pb-12 text-[#2b1b15]">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dec9b6] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8a6f62] mb-1">
            <button
              type="button"
              onClick={() => onNavigate('admin-nguoi-dung')}
              className="hover:text-[#80141d] flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              <span>Danh sách người dùng</span>
            </button>
            <span>•</span>
            <span className="font-mono text-[#543e34] font-bold">Mã: #USR-88291</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-[#2b1b15] font-serif">
              Hồ Sơ Thành Viên: Nguyễn Trực Viễn
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50 shadow-2xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9892c]"></span>
              Đang Hoạt Động | Đích Tôn Đời Thứ 11
            </span>
          </div>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsLocked(!isLocked)}
            className="px-3.5 py-2 bg-[#fdf9f4] border border-[#dec9b6] hover:bg-[#faefe3] text-[#2b1b15] text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#543e34]">lock</span>
            <span>{isLocked ? 'Mở Khóa Hồ Sơ' : 'Khóa tạm thời'}</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Đã gửi mã tái kích hoạt 2FA đến thiết bị định danh')}
            className="px-3.5 py-2 bg-[#fdf9f4] border border-[#dec9b6] hover:bg-[#faefe3] text-[#2b1b15] text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#543e34]">history_toggle_off</span>
            <span>Đặt lại 2FA</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Đã ghi nhận cảnh báo phả ý')}
            className="px-3.5 py-2 bg-[#fdf9f4] border border-[#dec9b6] hover:bg-[#faefe3] text-[#80141d] text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#80141d]">warning</span>
            <span>Cảnh báo phả ý</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Đang kết xuất hồ sơ PDF mã hóa SHA-256')}
            className="px-4 py-2 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            <span>Xuất hồ sơ PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5/12): Profile, Legal & 2FA */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Main Portrait & Title Card */}
          <div className="bg-[#fdf9f4] p-5 rounded-2xl border border-[#dec9b6] shadow-xs relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&auto=format&fit=crop&q=80"
                  alt="Nguyễn Trực Viễn"
                  className="w-20 h-20 rounded-2xl object-cover border border-[#dec9b6] shadow-xs grayscale contrast-125"
                />
                <button
                  type="button"
                  onClick={() => alert('Cấu hình chân dung')}
                  className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#fdf9f4] border border-[#dec9b6] flex items-center justify-center text-[#543e34] hover:text-[#80141d] shadow-2xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">settings</span>
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-[#8a6f62] uppercase tracking-wider block">
                  TỘC TRƯỞNG CHI GIÁP
                </span>
                <h2 className="text-xl font-bold text-[#2b1b15] font-serif leading-tight mt-0.5">
                  Nguyễn Trực Viễn
                </h2>
                <p className="text-xs text-[#8a6f62] mt-0.5">
                  Chi phái Đại Tộc Nguyễn Phục Anh
                </p>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-lg text-[10.5px] font-bold bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">military_tech</span>
                    Uy tín: 98/100
                  </span>
                  <span className="px-2 py-0.5 rounded-lg text-[10.5px] font-bold bg-[#faefe3] text-[#2b1b15] border border-[#dec9b6] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">badge</span>
                    eKYC Số hóa 100%
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Bar in Card 1 */}
            <div className="mt-4 pt-3 border-t border-[#dec9b6]/60 flex items-center justify-between text-xs">
              <span className="text-[#543e34] flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[16px] text-[#c9892c]">verified</span>
                Độ chuẩn xác hồ sơ phả hệ
              </span>
              <span className="font-bold text-[#80141d] font-mono">98% Tối Cao</span>
            </div>
          </div>

          {/* Card 2: Định Danh & Pháp Lý Di Sản */}
          <div className="bg-[#fdf9f4] p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/60">
              <div className="flex items-center gap-2 font-serif font-bold text-[#2b1b15] text-sm">
                <span className="material-symbols-outlined text-[18px] text-[#80141d]">badge</span>
                <span>Định Danh &amp; Pháp Lý Di Sản</span>
              </div>
              <span className="text-[10px] font-bold text-[#80141d] tracking-wider uppercase font-mono">
                CHỮ KÝ SỐ HỢP LỆ
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6]">
                <span className="text-[10px] text-[#8a6f62] block font-semibold uppercase">TÊN KHAI SINH</span>
                <strong className="text-[#2b1b15] block mt-0.5">Nguyễn Trực Viễn</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6]">
                <span className="text-[10px] text-[#8a6f62] block font-semibold uppercase">TÊN TỰ (THƯỜNG GỌI)</span>
                <strong className="text-[#2b1b15] block mt-0.5">Minh Viễn Cư Sĩ</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6]">
                <span className="text-[10px] text-[#8a6f62] block font-semibold uppercase">TÊN HÚY CỔ TRUYỀN</span>
                <strong className="text-[#80141d] font-serif block mt-0.5 text-sm">Phúc Viễn Quân</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6]">
                <span className="text-[10px] text-[#8a6f62] block font-semibold uppercase">ĐỜI THỨ / CHI NHÁNH</span>
                <strong className="text-[#2b1b15] block mt-0.5">Đời 11 • Chi Giáp Cụ Khởi</strong>
              </div>
            </div>

            {/* Birthdates */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#faefe3] border border-[#dec9b6]">
                <span className="text-[10px] text-[#8a6f62] font-semibold uppercase block">NGÀY SINH (DƯƠNG LỊCH)</span>
                <div className="text-sm font-bold text-[#2b1b15] font-mono mt-0.5">
                  14 / 09 / 1958
                </div>
                <span className="text-[10.5px] text-[#8a6f62] block mt-0.5">Giờ Thìn (07:30 Sáng)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#faefe3] border border-[#dec9b6]">
                <span className="text-[10px] text-[#80141d] font-semibold uppercase block">NGÀY SINH (ÂM LỊCH)</span>
                <div className="text-sm font-bold text-[#80141d] font-serif mt-0.5">
                  02 Tháng Tám, Mậu Tuất
                </div>
                <span className="text-[10.5px] text-[#543e34] block mt-0.5">Trực Bình • Tiết Bạch Lộ</span>
              </div>
            </div>

            {/* Address entries */}
            <div className="space-y-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] flex items-start gap-2.5 text-[#543e34]">
                <span className="material-symbols-outlined text-[17px] text-[#80141d] mt-0.5">temple_buddhist</span>
                <div>
                  <span className="text-[#8a6f62] text-[10px] uppercase font-semibold block">QUÊ QUÁN TỪ ĐƯỜNG GỐC</span>
                  <p className="font-medium text-[#2b1b15] leading-snug mt-0.5">
                    Từ Đường Họ Nguyễn, Làng Cổ Đông Ngạc, Quận Bắc Từ Liêm, TP. Hà Nội
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] flex items-start gap-2.5 text-[#543e34]">
                <span className="material-symbols-outlined text-[17px] text-[#80141d] mt-0.5">location_on</span>
                <div>
                  <span className="text-[#8a6f62] text-[10px] uppercase font-semibold block">ĐỊA CHỈ THƯỜNG TRÚ HIỆN TẠI</span>
                  <p className="font-medium text-[#2b1b15] leading-snug mt-0.5">
                    Số 42 Phố Hàng Bạc, Phường Hàng Bạc, Quận Hoàn Kiếm, TP. Hà Nội
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Bảo Mật & Định Danh Phiên */}
          <div className="bg-[#fdf9f4] p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/60">
              <div className="flex items-center gap-2 font-serif font-bold text-[#2b1b15] text-sm">
                <span className="material-symbols-outlined text-[18px] text-[#543e34]">shield</span>
                <span>Bảo Mật &amp; Định Danh Phiên</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50 font-mono">
                2FA Kích Hoạt
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#543e34]">phonelink_lock</span>
                  <div>
                    <span className="font-bold text-[#2b1b15] block">Khóa Mã TOTP</span>
                    <span className="text-[11px] text-[#8a6f62]">Google Authenticator (Đã liên kết)</span>
                  </div>
                </div>
                <span className="font-bold text-[#80141d] font-mono text-[11px]">CHUẨN XÁC</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#543e34]">devices</span>
                  <div>
                    <span className="font-bold text-[#2b1b15] block">Thiết Bị Tin Cậy</span>
                    <span className="text-[11px] text-[#8a6f62]">4 thiết bị đã cấp quyền gia phả</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Danh sách 4 thiết bị tin cậy')}
                  className="font-bold text-[#80141d] hover:underline text-[11px] cursor-pointer"
                >
                  Xem chi tiết
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#543e34]">schedule</span>
                  <div>
                    <span className="font-bold text-[#2b1b15] block">Truy Cập Gần Nhất</span>
                    <span className="text-[11px] text-[#8a6f62]">15 phút trước • IP: 14.161.82.11 (Hà Nội, VN)</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#c9892c]"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7/12): Tabs, Clan Spaces, Privileges */}
        <div className="lg:col-span-7 space-y-4">
          {/* Top 4 Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'spaces', label: 'Không Gian Gia Tộc', icon: 'temple_buddhist' },
              { id: 'logs', label: 'Nhật Ký Thao Tác', icon: 'assignment' },
              { id: 'credits', label: 'Tín Chỉ AI & Phí', icon: 'stars' },
              { id: 'sessions', label: 'Phiên & Thiết Bị', icon: 'devices' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-[#80141d] text-white border-[#80141d] shadow-sm'
                    : 'bg-[#fdf9f4] text-[#543e34] border-[#dec9b6] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab 1: Spaces List */}
          {activeTab === 'spaces' && (
            <div className="space-y-4">
              {/* Space Item 1 */}
              <div className="bg-[#fdf9f4] p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 text-[#80141d] flex items-center justify-center font-bold font-serif text-base shrink-0">
                      ĐN
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#80141d] text-white">
                          Chủ Không Gian (Trưởng Tộc)
                        </span>
                        <span className="text-[11px] font-mono text-[#8a6f62] font-bold">
                          Mã tộc: #TOK-1002
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#2b1b15] font-serif mt-1">
                        Đại Tộc Nguyễn Phục Anh
                      </h3>
                      <p className="text-xs text-[#8a6f62] mt-0.5">
                        Quy mô: 1,420 thành viên • 18 thế hệ • 456 kỷ vật lưu trữ
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[11px] font-semibold text-[#543e34] block">
                      Quyền Trị Sự Tối Cao
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('admin-chi-tiet-khong-gian')}
                      className="text-xs font-bold text-[#80141d] hover:underline flex items-center sm:justify-end gap-0.5 mt-0.5 cursor-pointer"
                    >
                      <span>Vào kiểm duyệt</span>
                      <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                    </button>
                  </div>
                </div>

                {/* 3 Metric Boxes */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                  <div className="p-3 rounded-xl bg-[#faefe3] border border-[#dec9b6]">
                    <span className="text-[10px] text-[#8a6f62] font-semibold uppercase block">NGÀY KHỞI TẠO</span>
                    <strong className="text-[#2b1b15] font-mono text-xs block mt-0.5">12/03/2021</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#faefe3] border border-[#dec9b6]">
                    <span className="text-[10px] text-[#8a6f62] font-semibold uppercase block">DUYỆT NHẬP PHẢ</span>
                    <strong className="text-[#80141d] text-xs block mt-0.5">24 yêu cầu mới</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#faefe3] border border-[#dec9b6]">
                    <span className="text-[10px] text-[#8a6f62] font-semibold uppercase block">MỘ PHẦN QUẢN LÝ</span>
                    <strong className="text-[#2b1b15] text-xs block mt-0.5">32 khu viên</strong>
                  </div>
                </div>
              </div>

              {/* Space Item 2 */}
              <div className="bg-[#fdf9f4] p-5 rounded-2xl border border-[#dec9b6] shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 text-[#80141d] flex items-center justify-center font-bold font-serif text-base shrink-0">
                    ĐN
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50">
                        Cố Vấn Ban Phả Ký
                      </span>
                      <span className="text-[11px] font-mono text-[#8a6f62] font-bold">
                        Mã tộc: #TOK-0419
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#2b1b15] font-serif mt-1">
                      Chi Tộc Đông Ngạc - Nhánh Bính
                    </h3>
                    <p className="text-xs text-[#8a6f62] mt-0.5">
                      Quy mô: 230 thành viên • 7 thế hệ • 98 tư liệu cổ
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[11px] font-semibold text-[#543e34] block">
                    Quyền Tra Cứu &amp; Góp Ý
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('admin-khong-gian-gia-toc')}
                    className="text-xs font-bold text-[#543e34] hover:text-[#80141d] hover:underline flex items-center sm:justify-end gap-0.5 mt-0.5 cursor-pointer"
                  >
                    <span>Xem không gian</span>
                    <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Đặc Quyền Cấp Trưởng Tộc (Super Admin Bổ Nhiệm) */}
              <div className="bg-[#fdf9f4] p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/60">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[19px] text-[#80141d]">verified_user</span>
                    <div>
                      <h4 className="font-bold text-[#2b1b15] font-serif text-sm">
                        Đặc Quyền Cấp Trưởng Tộc (Super Admin Bổ Nhiệm)
                      </h4>
                      <p className="text-[11px] text-[#8a6f62]">
                        Các chính sách miễn trừ và phân quyền thẩm phán nội tộc
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50">
                    Chính sách: POL-VER-11
                  </span>
                </div>

                {/* 4 Privileges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Priv 1 */}
                  <div className="p-3.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#2b1b15]">
                      <span className="material-symbols-outlined text-[16px] text-[#c9892c]">gavel</span>
                      Quyền Phủ Quyết Phả Ký (Veto Power)
                    </div>
                    <p className="text-[11px] text-[#543e34] leading-relaxed">
                      Có thẩm quyền đình chỉ hoặc chấp thuận đơn phương thành viên mới vào chi tộc trước khi hội đồng phả họp.
                    </p>
                  </div>

                  {/* Priv 2 */}
                  <div className="p-3.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#2b1b15]">
                      <span className="material-symbols-outlined text-[16px] text-[#c9892c]">history_edu</span>
                      Chỉnh Sửa Bia Ký Cổ Không Chờ Duyệt
                    </div>
                    <p className="text-[11px] text-[#543e34] leading-relaxed">
                      Được phép hiệu đính trực tiếp văn tự Hán Nôm và phả ký trước năm 1945 mà không thông qua ban kiểm duyệt trung ương.
                    </p>
                  </div>

                  {/* Priv 3 */}
                  <div className="p-3.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#2b1b15]">
                      <span className="material-symbols-outlined text-[16px] text-[#c9892c]">download_for_offline</span>
                      Xuất Bản Toàn Bộ Dữ Liệu Lưu Trữ Raw
                    </div>
                    <p className="text-[11px] text-[#543e34] leading-relaxed">
                      Được phép tải xuống bản sao lưu toàn bộ hình ảnh gốc TIFF 600DPI của các sắc phong và bài vị thờ.
                    </p>
                  </div>

                  {/* Priv 4 */}
                  <div className="p-3.5 rounded-xl bg-[#faefe3] border border-[#dec9b6] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#2b1b15]">
                      <span className="material-symbols-outlined text-[16px] text-[#c9892c]">auto_fix_high</span>
                      Miễn Phí Tín Chỉ AI Phục Chế Di Sản
                    </div>
                    <p className="text-[11px] text-[#543e34] leading-relaxed">
                      Tài khoản thuộc danh sách bảo trợ văn hóa phi vật thể, tự động hồi phục 2,000 tín chỉ vào đầu mỗi chu kỳ quý.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Logs */}
          {activeTab === 'logs' && (
            <div className="bg-[#fdf9f4] p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3 text-xs">
              <h4 className="font-bold text-[#2b1b15] font-serif text-sm">
                Nhật Ký Thao Tác Hệ Thống (Audit Trail)
              </h4>
              {[
                { time: '14:20:12 - Hôm nay', action: 'Ký số biên bản hiệp thương gia phả Đời thứ 11', ip: '14.161.82.11', status: 'Hợp lệ' },
                { time: '09:15:33 - Hôm nay', action: 'Tải lên 6 sắc phong triều Cảnh Thịnh định dạng TIFF', ip: '14.161.82.11', status: 'Đã lưu trữ' },
                { time: '18:40:02 - Hôm qua', action: 'Phê duyệt 3 thành viên chi Giáp nhập phả', ip: '14.161.82.11', status: 'Thành công' },
              ].map((log, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#faefe3] border border-[#dec9b6] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#2b1b15] block">{log.action}</span>
                    <span className="text-[11px] text-[#8a6f62] font-mono">{log.time} • IP: {log.ip}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Credits */}
          {activeTab === 'credits' && (
            <div className="bg-[#fdf9f4] p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-[#2b1b15] font-serif text-sm">Tín Chỉ AI &amp; Niên Liễm</h4>
                <span className="text-xl font-bold font-serif text-[#80141d]">14,250 Tín Chỉ</span>
              </div>
              <p className="text-[#543e34]">Được cấp tự động theo chính sách bảo trợ di sản gia tộc cấp 1.</p>
            </div>
          )}

          {/* Tab 4: Sessions */}
          {activeTab === 'sessions' && (
            <div className="bg-[#fdf9f4] p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3 text-xs">
              <h4 className="font-bold text-[#2b1b15] font-serif text-sm">4 Thiết Bị Định Danh</h4>
              <p className="text-[#543e34]">Tất cả thiết bị đều vượt qua xác thực phần cứng YubiKey &amp; TOTP 2FA.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

