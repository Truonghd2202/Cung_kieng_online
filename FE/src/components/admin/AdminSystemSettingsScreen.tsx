import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminSystemSettingsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminSystemSettingsScreen: React.FC<AdminSystemSettingsScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'security' | 'storage' | 'api' | 'backup' | 'heritage'>('security');
  const [sessionTimeout, setSessionTimeout] = useState<'15' | '30' | '60'>('30');
  const [enable2FA, setEnable2FA] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAE1D3] pb-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#80141d] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[26px]">tune</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-bold text-[#80141d] tracking-wider uppercase font-mono bg-[#faeed9] px-2 py-0.5 rounded">
                TRUNG TÂM ĐIỀU HÀNH HẠ TẦNG
              </span>
              <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Cụm Máy Chủ Trực Tuyến
              </span>
            </div>

            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Cài Đặt &amp; Cấu Hình Hệ Thống Trung Ương
            </h1>

            <div className="flex items-center gap-3 text-xs text-stone-500 font-mono mt-0.5 flex-wrap">
              <span>Nền tảng v2.5.4 Enterprise Core</span>
              <span>•</span>
              <span>Bảo mật AES-256</span>
              <span>•</span>
              <span className="text-stone-800 font-bold">Node ID: VN-HAN-SANCTUARY-01</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => alert('Đã khôi phục các thông số về mặc định')}
            className="px-3.5 py-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-stone-600">history</span>
            <span>Khôi Phục Gốc</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Lưu &amp; Áp Dụng Toàn Cục</span>
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-semibold">
          <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
          <span>Đã lưu thành công và đồng bộ chữ ký số cấu hình hệ thống trên toàn cụm máy chủ!</span>
        </div>
      )}

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>THỜI GIAN VẬN HÀNH</span>
            <div className="w-8 h-8 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            99.98%
          </div>
          <p className="text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            142 ngày liên tục
          </p>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>TẢI CỤM AI PHỤC CHẾ</span>
            <div className="w-8 h-8 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#c9892c]">
              <span className="material-symbols-outlined text-[18px]">memory</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            42.4 QPS
          </div>
          <p className="text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            8 NPU đang hoạt động
          </p>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>KHÔNG GIAN KÍCH HOẠT</span>
            <div className="w-8 h-8 rounded-xl bg-[#faefe3] border border-[#dec9b6] flex items-center justify-center text-amber-800">
              <span className="material-symbols-outlined text-[18px]">temple_buddhist</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            1,842
          </div>
          <p className="text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            +34 chi phái tuần này
          </p>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>TRẠNG THÁI AN NINH</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            Bảo Vệ Cấp 3
          </div>
          <p className="text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            WAF &amp; DDoS Tối Đa
          </p>
        </div>
      </div>

      {/* Navigation Tabs Pill Bar */}
      <div className="bg-[#faefe3]/80 p-1.5 rounded-2xl border border-[#dec9b6] flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'security', label: 'Bảo Mật & Xác Thực', icon: 'lock' },
          { id: 'storage', label: 'Dung Lượng & AI', icon: 'folder' },
          { id: 'api', label: 'API & Cổng Dịch Vụ', icon: 'hub' },
          { id: 'backup', label: 'Sao Lưu & Thảm Họa', icon: 'cloud_sync' },
          { id: 'heritage', label: 'Quy Chuẩn Di Sản', icon: 'menu_book' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-[#80141d] shadow-sm border border-[#dec9b6]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-xs space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#dec9b6]/60">
            <div>
              <h2 className="text-base font-bold text-stone-900 font-serif">
                Kiểm Soát An Ninh &amp; Quản Lý Phiên Làm Việc
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Thiết lập các rào cản truy cập tối cao nhằm bảo toàn cơ sở dữ liệu phả ký hoàng tộc.
              </p>
            </div>
            <span className="material-symbols-outlined text-[24px] text-[#80141d]">verified_user</span>
          </div>

          {/* 2 Top Setting Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Thời Hạn Phiên Đăng Nhập Super Admin */}
            <div className="p-5 rounded-2xl bg-[#fcf8f2] border border-[#dec9b6] space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 font-serif text-sm">
                    Thời Hạn Phiên Đăng Nhập Super Admin
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Tự động hủy phiên khi không phát hiện tương tác bàn phím/chuột.
                  </p>
                </div>
                <span className="material-symbols-outlined text-[20px] text-amber-700">timer</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: '15', label: '15', sub: 'PHÚT' },
                  { value: '30', label: '30', sub: 'PHÚT (KHUYẾN DÙNG)' },
                  { value: '60', label: '60', sub: 'PHÚT' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSessionTimeout(item.value as any)}
                    className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer border ${
                      sessionTimeout === item.value
                        ? 'bg-white border-2 border-[#80141d] text-[#80141d] shadow-sm font-bold'
                        : 'bg-white border-[#dec9b6] text-stone-600 hover:bg-[#faefe3]'
                    }`}
                  >
                    <span className="text-base font-bold font-serif block">{item.label}</span>
                    <span className="text-[9.5px] uppercase font-semibold block mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card 2: Bắt Buộc Xác Thực 2 Yếu Tố (2FA) */}
            <div className="p-5 rounded-2xl bg-[#fcf8f2] border border-[#dec9b6] space-y-4 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 font-serif text-sm">
                    Bắt Buộc Xác Thực 2 Yếu Tố (2FA)
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    Bắt buộc áp dụng mã OTP từ Authenticator App cho toàn bộ tài khoản Trưởng Tộc, Đích Tôn và Ban Trị Sự khi truy cập gia phả.
                  </p>
                </div>
                <span className="material-symbols-outlined text-[20px] text-[#80141d]">phonelink_lock</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#dec9b6]/60">
                <span className="text-xs font-semibold text-stone-800">
                  Kích hoạt rào chắn 2FA toàn diện
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enable2FA}
                    onChange={(e) => setEnable2FA(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#80141d]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Card 3: Danh Sách Địa Chỉ IP Whitelist Ban Trị Sự */}
          <div className="p-5 rounded-2xl bg-[#fcf8f2] border border-[#dec9b6] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-stone-900 font-serif text-sm">
                  Danh Sách Địa Chỉ IP Whitelist Ban Trị Sự
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Chỉ cho phép sửa đổi dữ liệu gốc từ văn phòng Hội Đồng Dòng Họ hoặc địa chỉ cố định.
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert('Mở bảng thêm dải IP Whitelist mới')}
                className="px-3.5 py-1.5 bg-white hover:bg-[#faefe3] border border-[#dec9b6] text-stone-800 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">add</span>
                <span>+ Thêm Dải IP Mới</span>
              </button>
            </div>

            {/* IP Whitelist Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#dec9b6]/60 text-stone-400 font-semibold tracking-wider uppercase text-[10px]">
                    <th className="py-2.5 px-3">VĂN PHÒNG / BAN ĐẠI DIỆN</th>
                    <th className="py-2.5 px-3">DẢI IP / SUBNET</th>
                    <th className="py-2.5 px-3">ĐỊA ĐIỂM</th>
                    <th className="py-2.5 px-3">TRẠNG THÁI</th>
                    <th className="py-2.5 px-3 text-right">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dec9b6]/40">
                  {/* Row 1 */}
                  <tr className="hover:bg-[#faefe3]/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 font-bold text-stone-900">
                        <span className="material-symbols-outlined text-[18px] text-[#80141d]">temple_buddhist</span>
                        <span>Văn Phòng Trị Sự Quốc Gia (Hà Nội)</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#80141d]">
                      118.70.184.22 / 29
                    </td>
                    <td className="py-3 px-3 text-stone-700">
                      Hoàn Kiếm, Hà Nội
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#faeed9] text-amber-900 border border-[#f3b750]/50">
                        Đang Khóa Nghiêm Ngặt
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => alert('Xóa dải IP')}
                        className="p-1 text-stone-400 hover:text-rose-700 cursor-pointer"
                        title="Xóa dải IP"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-[#faefe3]/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 font-bold text-stone-900">
                        <span className="material-symbols-outlined text-[18px] text-amber-800">apartment</span>
                        <span>Chi Nhánh Lưu Trữ Phương Nam</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#80141d]">
                      14.161.45.10 / 30
                    </td>
                    <td className="py-3 px-3 text-stone-700">
                      Quận 3, TP. Hồ Chí Minh
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#faeed9] text-amber-900 border border-[#f3b750]/50">
                        Đang Khóa Nghiêm Ngặt
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => alert('Xóa dải IP')}
                        className="p-1 text-stone-400 hover:text-rose-700 cursor-pointer"
                        title="Xóa dải IP"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Storage & AI */}
      {activeTab === 'storage' && (
        <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-xs space-y-4 text-xs">
          <h3 className="text-base font-bold text-stone-900 font-serif">Hạn Mức Dung Lượng &amp; Cụm AI</h3>
          <p className="text-stone-600">Phân bổ bộ nhớ lưu trữ TIFF 600DPI và điều phối VRAM cho các tác vụ phục chế.</p>
        </div>
      )}

      {/* Tab 3: API & Services */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-xs space-y-4 text-xs">
          <h3 className="text-base font-bold text-stone-900 font-serif">Cổng Kết Nối API &amp; Webhook</h3>
          <p className="text-stone-600">Tích hợp dịch vụ định danh eKYC Bộ Công An và liên thông Viện Nghiên Cứu Hán Nôm.</p>
        </div>
      )}

      {/* Tab 4: Backup & Disaster Recovery */}
      {activeTab === 'backup' && (
        <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-xs space-y-4 text-xs">
          <h3 className="text-base font-bold text-stone-900 font-serif">Sao Lưu Lạnh &amp; Phòng Chống Thảm Họa</h3>
          <p className="text-stone-600">Đồng bộ bản chụp SHA-256 sang 3 trung tâm dữ liệu độc lập địa lý.</p>
        </div>
      )}

      {/* Tab 5: Heritage Standards */}
      {activeTab === 'heritage' && (
        <div className="bg-white rounded-2xl border border-[#dec9b6] p-6 shadow-xs space-y-4 text-xs">
          <h3 className="text-base font-bold text-stone-900 font-serif">Quy Chuẩn Di Sản &amp; Phả Hệ Quốc Gia</h3>
          <p className="text-stone-600">Thiết lập các tiêu chí chuẩn hóa văn tự Nôm và định dạng số hóa cổ vật.</p>
        </div>
      )}
    </div>
  );
};
