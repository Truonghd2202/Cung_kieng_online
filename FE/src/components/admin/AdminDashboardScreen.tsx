import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface AdminDashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ onNavigate }) => {
  const [timeFilter, setTimeFilter] = useState<'today' | '7days' | 'month' | 'year'>('month');

  return (
    <div className="space-y-6 pb-12 text-[#2b1b15]">
      {/* Header section with status & actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#dec9b6]/60 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[10px] font-bold uppercase tracking-wider border border-[#dec9b6]">
            <span className="material-symbols-outlined text-xs">shield</span>
            <span>BẢNG KIỂM SOÁT TRỰC QUAN TOÀN HỆ THỐNG</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15] leading-tight">
            Tổng Quan Bảng Điều Khiển
          </h1>

          <p className="text-xs text-[#6b584d] leading-relaxed">
            Giám sát hạ tầng phả hệ, phân tích lưu lượng AI và thẩm định bảo an di sản tộc ước.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Time range filters */}
          <div className="bg-white border border-[#dec9b6] p-0.5 rounded-xl flex items-center text-xs shadow-2xs">
            {(['today', '7days', 'month', 'year'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeFilter(t)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  timeFilter === t
                    ? 'bg-[#80141d] text-white font-bold shadow-2xs'
                    : 'text-[#6b584d] hover:text-[#2b1b15]'
                }`}
              >
                {t === 'today' && 'Hôm nay'}
                {t === '7days' && '7 ngày qua'}
                {t === 'month' && 'Tháng này'}
                {t === 'year' && 'Năm 2025'}
              </button>
            ))}
          </div>

          {/* Export button */}
          <button
            type="button"
            onClick={() => alert('Đã xuất báo cáo ký số SHA-256 mã kiểm tra: TCK-RPT-2025-0916')}
            className="px-3.5 py-1.5 bg-[#80141d] text-white hover:bg-[#681017] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Xuất Báo Cáo Ký Số</span>
          </button>
        </div>
      </div>

      {/* 4 Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => onNavigate('admin-khong-gian-gia-toc')}
          className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-2xs hover:border-[#80141d] transition-all cursor-pointer flex flex-col justify-between space-y-2"
        >
          <div className="flex items-center justify-between text-xs text-[#8a6f62]">
            <span className="font-semibold">Không Gian Gia Tộc</span>
            <div className="w-7 h-7 rounded-lg bg-[#faefe3] text-[#80141d] flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">temple_buddhist</span>
            </div>
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-[#2b1b15]">1,482</span>
            <span className="text-xs text-[#8a6f62] ml-1.5">không gian</span>
          </div>
          <div className="text-[11px] text-[#6b584d] pt-1 border-t border-[#dec9b6]/40 flex items-center justify-between">
            <span className="text-emerald-800 font-bold">↑ +12% MoM</span>
            <span>98 chi đại tông</span>
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => onNavigate('admin-nguoi-dung')}
          className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-2xs hover:border-[#80141d] transition-all cursor-pointer flex flex-col justify-between space-y-2"
        >
          <div className="flex items-center justify-between text-xs text-[#8a6f62]">
            <span className="font-semibold">Người Dùng Hoạt Động</span>
            <div className="w-7 h-7 rounded-lg bg-[#faefe3] text-[#80141d] flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">groups</span>
            </div>
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-[#2b1b15]">48,290</span>
            <span className="text-xs text-[#8a6f62] ml-1.5">thành viên</span>
          </div>
          <div className="text-[11px] text-[#6b584d] pt-1 border-t border-[#dec9b6]/40 flex items-center justify-between">
            <span>Định danh 86%</span>
            <span>4,120 Trưởng tộc</span>
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => onNavigate('admin-van-hanh-ai')}
          className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-2xs hover:border-[#80141d] transition-all cursor-pointer flex flex-col justify-between space-y-2"
        >
          <div className="flex items-center justify-between text-xs text-[#8a6f62]">
            <span className="font-semibold">Phục Chế &amp; OCR AI (Tháng)</span>
            <div className="w-7 h-7 rounded-lg bg-[#faefe3] text-[#80141d] flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
            </div>
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-[#2b1b15]">124,580</span>
            <span className="text-xs text-[#8a6f62] ml-1.5">lượt</span>
          </div>
          <div className="text-[11px] text-[#6b584d] pt-1 border-t border-[#dec9b6]/40 flex items-center justify-between">
            <span className="text-emerald-800 font-bold">✓ Thành công 99.4%</span>
            <span>610ms / trang Nôm</span>
          </div>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => onNavigate('admin-kiem-duyet')}
          className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-2xs hover:border-[#80141d] transition-all cursor-pointer flex flex-col justify-between space-y-2"
        >
          <div className="flex items-center justify-between text-xs text-[#8a6f62]">
            <span className="font-semibold">Cảnh Báo &amp; Xung Đột Phả Hệ</span>
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">warning</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif font-bold text-rose-800">18</span>
            <span className="text-xs text-rose-800 font-semibold">vụ việc ưu tiên</span>
          </div>
          <div className="text-[11px] pt-1 border-t border-[#dec9b6]/40 flex items-center justify-between">
            <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
              Cần duyệt gấp
            </span>
            <span className="text-[#8a6f62]">6 trùng lặp tổ phụ</span>
          </div>
        </div>
      </div>

      {/* Main 2 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (~65%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chart Card */}
          <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9b6]/40 pb-3">
              <div className="space-y-0.5">
                <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#80141d]">monitoring</span>
                  <span>Tăng Trưởng Không Gian &amp; Lưu Lượng Dữ Liệu</span>
                </div>
                <div className="text-[11px] text-[#8a6f62]">
                  Chỉ số tạo mới không gian họ tộc đối chiếu với phiên tra cứu văn tự số hóa (2025)
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-[#80141d] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#80141d]" />
                  <span>Không gian mở mới</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#c9892c] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c9892c]" />
                  <span>Lưu lượng tra cứu (K)</span>
                </div>
              </div>
            </div>

            {/* SVG Area Chart Graphic */}
            <div className="h-56 w-full relative">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#80141d" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#80141d" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="gradGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9892c" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#c9892c" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#dec9b6" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#dec9b6" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#dec9b6" strokeWidth="0.5" strokeDasharray="3 3" />

                {/* Gold area */}
                <path
                  d="M0 160 Q 80 150, 160 130 T 320 90 T 420 60 T 500 45 L 500 180 L 0 180 Z"
                  fill="url(#gradGold)"
                />
                <path
                  d="M0 160 Q 80 150, 160 130 T 320 90 T 420 60 T 500 45"
                  fill="none"
                  stroke="#c9892c"
                  strokeWidth="2"
                />

                {/* Red area */}
                <path
                  d="M0 170 Q 80 165, 160 150 T 320 120 T 420 95 T 500 70 L 500 180 L 0 180 Z"
                  fill="url(#gradRed)"
                />
                <path
                  d="M0 170 Q 80 165, 160 150 T 320 120 T 420 95 T 500 70"
                  fill="none"
                  stroke="#80141d"
                  strokeWidth="2"
                />
              </svg>

              {/* X Axis Labels */}
              <div className="flex items-center justify-between text-[10px] text-[#8a6f62] pt-2 border-t border-[#dec9b6]/40">
                <span>Th.10</span>
                <span>Th.11</span>
                <span>Th.12</span>
                <span>Th.01</span>
                <span>Th.02</span>
                <span>Th.03</span>
                <span className="font-bold text-[#80141d]">Hiện tại</span>
              </div>
            </div>

            {/* Bottom Tip Banner */}
            <div className="p-3 bg-[#faefe3]/70 rounded-2xl border border-[#dec9b6] flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#4a362f]">
                <span className="material-symbols-outlined text-sm text-[#80141d]">lightbulb</span>
                <span>
                  Giai đoạn Thanh Minh 2025 dự kiến tăng đột biến <strong>+34%</strong> lượt số hóa kim phả.
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('admin-nhat-ky-audit')}
                className="font-bold text-[#80141d] hover:underline cursor-pointer shrink-0"
              >
                Xem báo cáo chuyên sâu &rarr;
              </button>
            </div>
          </div>

          {/* Table: Hoạt Động Gia Tộc Nổi Bật Gần Đây */}
          <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-3">
              <div className="space-y-0.5">
                <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#80141d]">history</span>
                  <span>Hoạt Động Gia Tộc Nổi Bật Gần Đây</span>
                </div>
                <div className="text-[11px] text-[#8a6f62]">
                  Hồ sơ đăng ký lập phủ từ đường và cập nhật thế phả được khởi tạo trong 48 giờ qua
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('admin-khong-gian-gia-toc')}
                className="text-xs font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Xem tất cả (1,482)</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#faefe3] border-b border-[#dec9b6] font-serif font-bold text-[#2b1b15]">
                    <th className="py-2.5 px-3">TÊN CHI TỘC &amp; ĐỊA BÀN</th>
                    <th className="py-2.5 px-3">TRƯỞNG TỘC ĐẠI DIỆN</th>
                    <th className="py-2.5 px-3">GÓI DỊCH VỤ</th>
                    <th className="py-2.5 px-3 text-right">THỜI GIAN</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#dec9b6]/40">
                  <tr className="hover:bg-[#fcf8f2] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#80141d] text-white font-serif font-bold text-xs flex items-center justify-center shrink-0">
                          V
                        </div>
                        <div>
                          <div className="font-serif font-bold text-[#2b1b15]">
                            Vũ Tộc Đường - Chi Ba Phái Giáp
                          </div>
                          <div className="text-[10px] text-[#8a6f62]">
                            Mộ Trạch, Hải Dương (Đời thứ 16)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-[#2b1b15]">Vũ Huy Hoàng</div>
                      <div className="text-[10px] text-[#8a6f62]">Đích Tôn • Đã eKYC</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#faeed9] border border-[#dec9b6] text-[#734c13] font-bold text-[10px]">
                        Đại Tộc Kim Tự
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[11px] text-[#8a6f62]">
                      14 phút trước
                    </td>
                  </tr>

                  <tr className="hover:bg-[#fcf8f2] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#c9892c] text-white font-serif font-bold text-xs flex items-center justify-center shrink-0">
                          N
                        </div>
                        <div>
                          <div className="font-serif font-bold text-[#2b1b15]">
                            Nguyễn Khoa Gia Phái
                          </div>
                          <div className="text-[10px] text-[#8a6f62]">
                            Hương Thủy, Thừa Thiên Huế
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-[#2b1b15]">Nguyễn Khoa Đăng</div>
                      <div className="text-[10px] text-[#8a6f62]">Trưởng Chi Hội Đồng</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#faefe3] border border-[#dec9b6] text-[#80141d] font-bold text-[10px]">
                        Di Sản Gia Trạch
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[11px] text-[#8a6f62]">
                      1 giờ trước
                    </td>
                  </tr>

                  <tr className="hover:bg-[#fcf8f2] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#80141d] text-white font-serif font-bold text-xs flex items-center justify-center shrink-0">
                          L
                        </div>
                        <div>
                          <div className="font-serif font-bold text-[#2b1b15]">
                            Lê Tộc Đại Tôn Đồng Kỵ
                          </div>
                          <div className="text-[10px] text-[#8a6f62]">
                            Từ Sơn, Bắc Ninh (Hệ nhánh 5)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-[#2b1b15]">Lê Quang Liêm</div>
                      <div className="text-[10px] text-[#8a6f62]">Hậu duệ trực hệ</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#faeed9] border border-[#dec9b6] text-[#734c13] font-bold text-[10px]">
                        Đại Tộc Kim Tự
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[11px] text-[#8a6f62]">
                      3 giờ trước
                    </td>
                  </tr>

                  <tr className="hover:bg-[#fcf8f2] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#faeed9] text-[#734c13] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                          T
                        </div>
                        <div>
                          <div className="font-serif font-bold text-[#2b1b15]">
                            Trần Văn Phái Nam Định
                          </div>
                          <div className="text-[10px] text-[#8a6f62]">
                            Xuân Trường, Nam Định
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-[#2b1b15]">Trần Bá Đạt</div>
                      <div className="text-[10px] text-[#8a6f62]">Ủy quyền ban khánh tiết</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#fdfaf5] border border-[#dec9b6] text-[#6b584d] font-bold text-[10px]">
                        Cơ Bản (Dòng Tộc)
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[11px] text-[#8a6f62]">
                      6 giờ trước
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (~35%) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Cần Phê Duyệt Ngay */}
          <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
              <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#80141d]">gavel</span>
                <span>Cần Phê Duyệt Ngay</span>
              </div>
              <span className="px-2 py-0.2 rounded-full bg-[#80141d] text-white text-[10px] font-bold">
                6 hồ sơ
              </span>
            </div>

            <p className="text-[11px] text-[#8a6f62]">
              Các sự vụ pháp lý và tranh chấp thế thứ cần sự can thiệp của Quản Trị Viên Tối Cao
            </p>

            <div className="space-y-3 text-xs">
              {/* Approval 1 */}
              <div className="p-3 bg-[#faefe3]/60 rounded-2xl border border-[#dec9b6] space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-1.5 py-0.2 rounded bg-[#80141d] text-white font-bold">
                    3 Quyền Trưởng Tộc
                  </span>
                  <span className="text-[#80141d] font-bold">Hết hạn trong 24h</span>
                </div>
                <div className="font-serif font-bold text-[#2b1b15] leading-snug">
                  Yêu cầu trao quyền Trưởng Phái: Họ Đặng (Hà Tĩnh), Phan Tộc (Bình Định)
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('admin-kiem-duyet')}
                    className="flex-1 py-1.5 bg-[#80141d] hover:bg-[#681017] text-white rounded-lg font-bold text-[11px] cursor-pointer shadow-2xs"
                  >
                    Thẩm Định Giấy Ủy Quyền
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Đã tạm hoãn hồ sơ')}
                    className="px-2.5 py-1.5 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-[#4a362f] rounded-lg font-medium text-[11px] cursor-pointer"
                  >
                    Tạm Hoãn
                  </button>
                </div>
              </div>

              {/* Approval 2 */}
              <div className="p-3 bg-white rounded-2xl border border-[#dec9b6] space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-1.5 py-0.2 rounded bg-[#faeed9] text-[#734c13] font-bold border border-[#dec9b6]">
                    2 Duyệt Gia Bảo Hạng Đặc Biệt
                  </span>
                  <span className="text-[#c9892c] font-bold">Bảo vật cấp 1</span>
                </div>
                <div className="font-serif font-bold text-[#2b1b15] leading-snug">
                  Sắc phong Cảnh Hưng thời Lê Trung Hưng (1783) &amp; Chiếu thư triều Nguyễn chi phái Mạc Tộc.
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('admin-tham-dinh-ai')}
                  className="w-full py-1.5 bg-[#734c13] hover:bg-[#59390c] text-white rounded-lg font-bold text-[11px] cursor-pointer shadow-2xs"
                >
                  Đối Soát Văn Bản Nôm
                </button>
              </div>

              {/* Approval 3 */}
              <div className="p-3 bg-white rounded-2xl border border-[#dec9b6] space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold border border-rose-200">
                    1 Khiếu Nại Bản Quyền Phả Ký
                  </span>
                  <span className="text-rose-800 font-bold">Xung đột dữ liệu</span>
                </div>
                <div className="font-serif font-bold text-[#2b1b15] leading-snug">
                  Khiếu nại sao chép cuốn "Nam Sách Nguyễn Tộc Thế Kỷ" giữa 2 nhánh họ tại Hải Phòng.
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('admin-kiem-duyet')}
                  className="w-full py-1.5 bg-[#80141d] hover:bg-[#681017] text-white rounded-lg font-bold text-[11px] cursor-pointer shadow-2xs"
                >
                  Mở Trọng Tài Phả Hệ
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Cụm Máy Chủ & Tác Vụ AI */}
          <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#dec9b6]/40 pb-2.5">
              <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#80141d]">dns</span>
                <span>Cụm Máy Chủ &amp; Tác Vụ AI</span>
              </div>
              <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Bình thường</span>
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2b1b15]">GPU Cluster NVIDIA A100</span>
                  <span className="font-bold text-rose-800">Tải 62%</span>
                </div>
                <div className="text-[10px] text-[#8a6f62]">
                  Phục chế ảnh chân dung thờ • 8 node / 3,420 ảnh hàng đợi
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2b1b15]">OCR Nôm &amp; Hán Tự Engine v3.2</span>
                  <span className="font-bold text-[#c9892c]">Tải 41%</span>
                </div>
                <div className="text-[10px] text-[#8a6f62]">
                  Độ chính xác ngữ nghĩa Hán Nôm: 98.8% F1-score
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2b1b15]">Lưu Trữ Lạnh &amp; Sao Lưu Kép</span>
                  <span className="font-bold text-emerald-800">Sẵn sàng</span>
                </div>
                <div className="text-[10px] text-[#8a6f62]">
                  Sao lưu lúc 03:00 AM (Snapshot #892) • 42.8 TB / 150 TB
                </div>
              </div>

              <div className="pt-2 border-t border-[#dec9b6]/40 flex items-center justify-between text-[11px]">
                <span className="text-[#6b584d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#80141d]">verified</span>
                  <span>Ký thuật toán Hash SHA-256</span>
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('admin-van-hanh-ai')}
                  className="font-bold text-[#80141d] hover:underline cursor-pointer"
                >
                  Xem Telemetry
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Niên Giám Phả Hệ 2025 */}
          <div className="p-4 bg-[#faefe3]/80 border border-[#dec9b6] rounded-2xl flex items-start gap-3 text-xs">
            <div className="w-8 h-8 rounded-lg bg-[#faeed9] border border-[#dec9b6] text-[#734c13] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">menu_book</span>
            </div>
            <div className="space-y-0.5 leading-relaxed">
              <div className="font-serif font-bold text-xs text-[#80141d]">
                NIÊN GIÁM PHẢ HỆ 2025
              </div>
              <p className="text-[11px] text-[#6b584d]">
                Số hóa hơn 25,000 trang sắc phong cổ với sự bảo trợ của Viện Nghiên cứu Hán Nôm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
