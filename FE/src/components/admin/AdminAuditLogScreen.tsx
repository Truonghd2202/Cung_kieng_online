import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminAuditLogScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminAuditLogScreen: React.FC<AdminAuditLogScreenProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [actorSearch, setActorSearch] = useState('');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAE1D3] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#80141d] text-white tracking-wider uppercase font-mono">
              AN TOÀN CẤP TỐI CAO
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50">
              Chuỗi khối bản SHA-256 đối soát thời gian thực
            </span>
          </div>

          <div className="text-[11px] font-mono text-stone-400 mb-0.5">
            Mã hiệu: TCK-LEDGER-V4
          </div>

          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Nhật Ký Kiểm Toán Bất Biến &amp; Báo Cáo An Ninh Hệ Thống
          </h1>
          <p className="text-xs text-stone-500 mt-0.5 max-w-3xl leading-relaxed">
            Ghi nhận vết truy cập, thay đổi gia phả, phân quyền tế lễ và di văn tổ tiên bằng thuật toán ký số không thể đảo ngược, bảo đảm tính tôn nghiêm và toàn vẹn của dữ liệu huyết thống.
          </p>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => alert('Đang kết xuất tệp kiểm toán ký số (.pfx / PDF)')}
            className="px-3.5 py-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-stone-600">download</span>
            <span>Xuất File Kiểm Toán Ký Số (.pfx / PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Mở bảng cấu hình cảnh báo an ninh tức thì')}
            className="px-4 py-2 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">shield</span>
            <span>Cấu Hình Cảnh Báo An Ninh Tức Thì</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>TOÀN VẸN HASH CHUỖI</span>
            <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[16px]">lock</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            100.00%
          </div>
          <div className="space-y-0.5 pt-1 border-t border-[#dec9b6]/40 text-[11px]">
            <span className="text-emerald-700 font-bold block flex items-center gap-1">
              ✓ Không phát hiện sai lệch hàm (0 tamper)
            </span>
            <span className="text-stone-400 font-mono text-[10px] block">
              Khối mới nhất: 485042-SHA
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>CẢNH BÁO XÂM NHẬP (24H)</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
              <span className="material-symbols-outlined text-[16px]">security</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-rose-700">
            14 Vụ
          </div>
          <div className="space-y-0.5 pt-1 border-t border-[#dec9b6]/40 text-[11px]">
            <span className="text-stone-600 block">
              11 vụ bị hệ thống WAF chặn ngay lập tức
            </span>
            <span className="text-rose-700 font-semibold text-[10.5px] block">
              Mức độ nghiêm trọng cao: 3 sự kiện
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>CAN THIỆP QUYỀN TỐI CAO</span>
            <div className="w-7 h-7 rounded-lg bg-[#faefe3] border border-[#dec9b6] flex items-center justify-center text-amber-800">
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            08 Lần
          </div>
          <div className="space-y-0.5 pt-1 border-t border-[#dec9b6]/40 text-[11px]">
            <span className="text-stone-600 block">
              Xác thực 2FA sinh trắc học hoàn tất
            </span>
            <span className="text-stone-500 font-mono text-[10px] block">
              Tác nhân gần nhất: SA-ADMIN-01
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>BẢO TỒN DI VĂN &amp; KIM PHẢ</span>
            <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#c9892c]">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            1,482 Lần
          </div>
          <div className="space-y-0.5 pt-1 border-t border-[#dec9b6]/40 text-[11px]">
            <span className="text-stone-600 block">
              Cập nhật thân phả, ảnh thờ cổ &amp; sắc phong
            </span>
            <span className="text-emerald-700 font-semibold text-[10.5px] block">
              Bản sao lưu đồng bộ: Đã lưu trữ lạnh
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar: Bộ Lọc Kiểm Toán Đa Tiêu Chí */}
      <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
            <span className="material-symbols-outlined text-[17px] text-[#80141d]">filter_alt</span>
            <span>Bộ Lọc Kiểm Toán Đa Tiêu Chí (Audit Filters)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setTimeRange('7d');
              setSeverityFilter('all');
              setModuleFilter('all');
              setActorSearch('');
            }}
            className="text-[11px] font-semibold text-stone-500 hover:text-[#80141d] flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>Đặt lại tiêu chí</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              KHOẢNG THỜI GIAN &amp; GIỜ
            </label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-hidden"
            >
              <option value="7d">7 Ngày gần nhất (Chu kỳ lễ tế)</option>
              <option value="24h">24 Giờ qua</option>
              <option value="30d">30 Ngày qua</option>
              <option value="custom">Tùy chỉnh khoảng ngày</option>
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              MỨC ĐỘ SỰ KIỆN (SEVERITY)
            </label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-hidden"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="info">Thông tin (Info)</option>
              <option value="warning">Cảnh báo (Warning)</option>
              <option value="critical">Nghiêm trọng (Critical)</option>
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              PHÂN HỆ NGHIỆP VỤ
            </label>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-hidden"
            >
              <option value="all">Toàn bộ phân hệ</option>
              <option value="genealogy">Phả Ký &amp; Cây Phả</option>
              <option value="security">An Ninh &amp; Phiên Đăng Nhập</option>
              <option value="ai">AI Phục Chế &amp; OCR</option>
              <option value="root">Quyền Root &amp; Cấu Hình</option>
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              MÃ TÁC NHÂN (ADMIN/USER ID)
            </label>
            <input
              type="text"
              placeholder="Ví dụ: ADM-883, USR-NTL..."
              value={actorSearch}
              onChange={(e) => setActorSearch(e.target.value)}
              className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Main High-Density Event Log Table */}
      <div className="bg-white rounded-2xl border border-[#dec9b6] shadow-xs overflow-hidden">
        {/* Table Title Bar */}
        <div className="p-4 border-b border-[#dec9b6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fdfaf5]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#80141d]">receipt_long</span>
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                Dòng Sự Kiện Kiểm Toán Bất Biến (High-Density Event Log)
              </h3>
              <p className="text-[11px] text-stone-500">
                Hiển thị 6 bản ghi đối chiếu thời gian thực mới nhất có gắn nhãn chữ ký SHA-256
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-600 font-mono font-medium">
              Tổng số: 42,910 Sự kiện lưu vết
            </span>
            <button
              type="button"
              onClick={() => alert('Đang làm mới dòng sự kiện')}
              className="p-1.5 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] text-stone-600"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#dec9b6]/60 text-stone-400 font-semibold tracking-wider uppercase text-[10px] bg-[#fcf8f2]">
                <th className="py-3 px-3">THỜI GIAN (ISO &amp; VN)</th>
                <th className="py-3 px-3">IP &amp; ĐỊA LÝ</th>
                <th className="py-3 px-3">TÁC NHÂN</th>
                <th className="py-3 px-3">HÀNH ĐỘNG</th>
                <th className="py-3 px-3">ĐỐI TƯỢNG ĐÍCH</th>
                <th className="py-3 px-3">TRẠNG THÁI</th>
                <th className="py-3 px-3">GIÁ TRỊ TRƯỚC - SAU (DIFF)</th>
                <th className="py-3 px-3">MÃ HASH (SHA-256)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dec9b6]/40">
              {/* Row 1 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono text-[11px]">
                  <div className="text-stone-900 font-semibold">2025-02-23 14:30:09</div>
                  <div className="text-stone-400 text-[10px]">(+07:00 VN)</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-mono text-stone-900 font-semibold text-[11px]">118.69.182.45</div>
                  <div className="text-stone-500 text-[10.5px]">📍 Hà Nội, VN</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-bold text-stone-900 text-xs">Nguyễn Tuấn Hải</div>
                  <div className="text-stone-400 font-mono text-[10px]">ADM-QUAN-TRI-04</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faeed9] text-[#80141d] font-mono">
                    CAP_NHAT_PHA_KY
                  </span>
                </td>
                <td className="py-3.5 px-3 text-stone-700">
                  <div className="font-semibold text-xs">Chi Phái 3 - Nhánh Giáp</div>
                  <div className="text-stone-400 font-mono text-[10px]">NODE_UID: B9412</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ✓ Thành công
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <button
                    type="button"
                    onClick={() => alert('Hiển thị bảng Diff thay đổi')}
                    className="text-[#80141d] font-bold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span className="material-symbols-outlined text-[13px]">difference</span>
                    <span>Xem Diff (1 sửa đổi)</span>
                  </button>
                </td>
                <td className="py-3.5 px-3 font-mono text-[10.5px] text-stone-500">
                  e3b8c44...a3f248
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono text-[11px]">
                  <div className="text-stone-900 font-semibold">2025-02-23 13:12:44</div>
                  <div className="text-stone-400 text-[10px]">(+07:00 VN)</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-mono text-rose-700 font-bold text-[11px]">185.220.101.5</div>
                  <div className="text-rose-800 text-[10.5px] font-semibold">Tor Exit Node (Nga/Đức)</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-bold text-rose-800 text-xs">Hệ Thống Tự Động (AI-WAF)</div>
                  <div className="text-stone-400 font-mono text-[10px]">SYS-SECURITY-ENGINE</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#80141d] text-white font-mono">
                    KHOA_TAI_KHOAN
                  </span>
                </td>
                <td className="py-3.5 px-3 text-stone-700">
                  <div className="font-semibold text-xs">USR-HUYNH-994</div>
                  <div className="text-stone-400 text-[10px]">Tài khoản Tộc Trưởng Chi 2</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-rose-100 text-rose-800">
                    Đã khóa tức thì
                  </span>
                </td>
                <td className="py-3.5 px-3 text-rose-700 font-semibold flex items-center gap-1 text-[11px] pt-4">
                  <span className="material-symbols-outlined text-[13px]">warning</span>
                  <span>5 lần sai mật khẩu</span>
                </td>
                <td className="py-3.5 px-3 font-mono text-[10.5px] text-stone-500">
                  f47ac10...829da1
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono text-[11px]">
                  <div className="text-stone-900 font-semibold">2025-02-23 11:05:22</div>
                  <div className="text-stone-400 text-[10px]">(+07:00 VN)</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-mono text-stone-900 font-semibold text-[11px]">14.161.22.109</div>
                  <div className="text-stone-500 text-[10.5px]">📍 TP Hồ Chí Minh, VN</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-bold text-stone-900 text-xs">Lê Quang Liêm</div>
                  <div className="text-stone-400 font-mono text-[10px]">USR-LE-00192</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faefe3] text-amber-900 font-mono">
                    XUAT_DU_LIEU_GIA_TOC
                  </span>
                </td>
                <td className="py-3.5 px-3 text-stone-700">
                  <div className="font-semibold text-xs">Gia phả toàn chi phái 14 Đời</div>
                  <div className="text-stone-400 font-mono text-[10px]">Định dạng .GEDCOM / PDF</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ✓ Thành công
                  </span>
                </td>
                <td className="py-3.5 px-3 text-stone-700 text-[11px]">
                  1.8 MB [Kèm Watermark số]
                </td>
                <td className="py-3.5 px-3 font-mono text-[10.5px] text-stone-500">
                  c69a022...9312dc
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono text-[11px]">
                  <div className="text-stone-900 font-semibold">2025-02-23 09:40:18</div>
                  <div className="text-stone-400 text-[10px]">(+07:00 VN)</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-mono text-stone-900 font-semibold text-[11px]">42.114.77.30</div>
                  <div className="text-stone-500 text-[10.5px]">📍 Đà Nẵng, VN</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-bold text-stone-900 text-xs">Quản Trị Trung Ương</div>
                  <div className="text-[#80141d] font-mono font-bold text-[10px]">SA-SUPER-ADMIN-01</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faeed9] text-stone-800 font-mono">
                    RESET_2FA
                  </span>
                </td>
                <td className="py-3.5 px-3 text-stone-700">
                  <div className="font-semibold text-xs">Trần Hoàng Bách</div>
                  <div className="text-stone-400 text-[10px]">Tộc phó Chi Trần Phục</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ✓ Thành công
                  </span>
                </td>
                <td className="py-3.5 px-3 text-stone-700 text-[11px]">
                  Duyệt qua hồ sơ công chứng
                </td>
                <td className="py-3.5 px-3 font-mono text-[10.5px] text-stone-500">
                  512cb81...fa4419
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono text-[11px]">
                  <div className="text-stone-900 font-semibold">2025-02-23 08:21:00</div>
                  <div className="text-stone-400 text-[10px]">(+07:00 VN)</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-mono text-stone-900 font-semibold text-[11px]">113.160.91.14</div>
                  <div className="text-stone-500 text-[10.5px]">📍 Huế, VN</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-bold text-stone-900 text-xs">Vũ Tố Điền</div>
                  <div className="text-stone-400 font-mono text-[10px]">USR-VT-883</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 font-mono">
                    XOA_SAC_PHONG_LOI
                  </span>
                </td>
                <td className="py-3.5 px-3 text-stone-700">
                  <div className="font-semibold text-xs">Sắc Phong Khải Định Năm Thứ 3</div>
                  <div className="text-stone-400 font-mono text-[10px]">ASSET_ID: 99128</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-rose-100 text-rose-800">
                    Bị từ chối
                  </span>
                </td>
                <td className="py-3.5 px-3 text-rose-800 text-[11px]">
                  Thiếu chữ ký phê chuẩn Trưởng Tộc
                </td>
                <td className="py-3.5 px-3 font-mono text-[10.5px] text-stone-500">
                  bb73832...10884a
                </td>
              </tr>

              {/* Row 6 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono text-[11px]">
                  <div className="text-stone-900 font-semibold">2025-02-23 06:15:33</div>
                  <div className="text-stone-400 text-[10px]">(+07:00 VN)</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-mono text-stone-900 font-semibold text-[11px]">118.69.182.45</div>
                  <div className="text-stone-500 text-[10.5px]">📍 Hà Nội, VN</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-bold text-stone-900 text-xs">Quản Trị Viên Tối Cao</div>
                  <div className="text-[#80141d] font-mono font-bold text-[10px]">SA-SUPER-ADMIN-ROOT</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#80141d] text-white font-mono">
                    CAN_THIEP_QUYEN_ROOT
                  </span>
                </td>
                <td className="py-3.5 px-3 text-stone-700">
                  <div className="font-semibold text-xs">Cấu hình bảo mật v2.5</div>
                  <div className="text-stone-400 font-mono text-[10px]">Master Vault Key</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ✓ Thành công
                  </span>
                </td>
                <td className="py-3.5 px-3 text-stone-700 text-[11px]">
                  Xoay vòng khóa bí mật định kỳ
                </td>
                <td className="py-3.5 px-3 font-mono text-[10.5px] text-stone-500">
                  aa0814c...776101
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#dec9b6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-[#fdfaf5] text-stone-500">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
            <span>Hợp đồng số đối chiếu chuỗi bản tự động mỗi 300 giây. Khóa đối soát gốc: <strong className="font-mono text-stone-700">SHA256-ROOT-GENEALOGY-2025</strong></span>
          </div>

          <div className="flex items-center gap-1 font-mono">
            <button className="px-2 py-0.5 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">Trước</button>
            <button className="px-2 py-0.5 rounded bg-[#80141d] text-white font-bold">1</button>
            <button className="px-2 py-0.5 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">2</button>
            <button className="px-2 py-0.5 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">3</button>
            <button className="px-2 py-0.5 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">Sau</button>
          </div>
        </div>
      </div>

      {/* Bottom 2 Analytic Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card (6/12): Đăng Nhập Thất Bại & Đột Biến Truy Cập (24H) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3.5 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#80141d]">trending_up</span>
                <h3 className="text-sm font-bold text-stone-900 font-serif">
                  Đăng Nhập Thất Bại &amp; Đột Biến Truy Cập (24H)
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-800 font-mono">
                Đỉnh điểm: 03:00 Sáng
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Giám sát dấu hiệu dò quét thông tin gia tộc hoặc tấn công mật khẩu từ điển.
            </p>

            {/* SVG Chart */}
            <div className="pt-3">
              <svg viewBox="0 0 400 120" className="w-full h-28 overflow-visible">
                <defs>
                  <linearGradient id="attackSpikeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#80141d" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#80141d" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal grid lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="#f3e5d8" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="#f3e5d8" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#f3e5d8" strokeDasharray="3 3" />

                {/* Area & line with sharp spike at 03:00 */}
                <path
                  d="M0,110 L70,110 L100,20 L130,105 L200,108 L260,100 L320,110 L400,110 L400,120 L0,120 Z"
                  fill="url(#attackSpikeGradient)"
                />
                <path
                  d="M0,110 L70,110 L100,20 L130,105 L200,108 L260,100 L320,110 L400,110"
                  fill="none"
                  stroke="#80141d"
                  strokeWidth="2.5"
                />
                {/* Spike circle */}
                <circle cx="100" cy="20" r="4" fill="#80141d" stroke="#ffffff" strokeWidth="2" />
              </svg>
              <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                <span>00:00</span>
                <span>03:00 (cao điểm 42 vụ)</span>
                <span>06:00</span>
                <span>09:00</span>
                <span>12:00</span>
                <span>15:00</span>
                <span>18:00</span>
                <span>Hiện tại</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#fcf8f2] border border-[#dec9b6]/60 text-xs flex items-center justify-between text-stone-600">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-700"></span>
              Cơ chế Auto-Ban: Tự khóa IP sau 5 lần sai mật khẩu liên tiếp
            </span>
            <span className="font-bold text-[#80141d]">Tỷ lệ ngăn chặn: 98.4%</span>
          </div>
        </div>

        {/* Right Card (6/12): Truy Cập Ngoại Lãnh Thổ (Geo-Anomalies) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#c9892c]">public</span>
                <h3 className="text-sm font-bold text-stone-900 font-serif">
                  Truy Cập Ngoại Lãnh Thổ (Geo-Anomalies)
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faeed9] text-[#c9892c] border border-[#f3b750]/50 font-mono">
                Bản đồ Địa Dư
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Tỷ lệ và lưu lượng kết nối từ hải ngoại vào kho tư liệu phả ký hoàng tộc.
            </p>

            {/* 3 Progress Bars */}
            <div className="space-y-3 text-xs pt-1">
              {/* Country 1: VN */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <span className="text-[13px]">🇻🇳</span>
                    Nội địa VN (VNPT, Viettel, FPT)
                  </span>
                  <span className="font-bold text-stone-900 font-mono">92.4% (39,648 lượt)</span>
                </div>
                <div className="h-2 w-full bg-[#faeed9] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full w-[92.4%]"></div>
                </div>
              </div>

              {/* Country 2: US */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <span className="text-[13px]">🇺🇸</span>
                    Hoa Kỳ (California, Texas - Kiều bào có cấp phép)
                  </span>
                  <span className="font-bold text-amber-800 font-mono">4.8% (2,059 lượt)</span>
                </div>
                <div className="h-2 w-full bg-[#faeed9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c9892c] rounded-full w-[4.8%]"></div>
                </div>
              </div>

              {/* Country 3: Proxy / Suspicious */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-rose-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-rose-700">warning</span>
                    Proxy / Cloud Hosting Lạ (Frankfurt, Moscow, Hong Kong)
                  </span>
                  <span className="font-bold text-rose-700 font-mono">2.8% (1,203 lượt bị cô lập)</span>
                </div>
                <div className="h-2 w-full bg-[#faeed9] rounded-full overflow-hidden">
                  <div className="h-full bg-rose-700 rounded-full w-[2.8%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#faefe3]/70 border border-[#dec9b6] text-xs flex items-center justify-between text-stone-700">
            <span className="text-[11px] leading-snug">
              Chính sách: Khóa truy cập toàn bộ ASN trung tâm dữ liệu không xác danh.
            </span>
            <button
              type="button"
              onClick={() => alert('Chi tiết 47 dải IP lạ đã bị chặn')}
              className="text-[#80141d] font-bold text-[11px] hover:underline shrink-0 ml-2"
            >
              Chi tiết 47 dải IP lạ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
