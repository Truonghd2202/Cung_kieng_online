import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface SubscriptionFundScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface InvoiceRecord {
  id: string;
  code: string;
  date: string;
  planName: string;
  amount: string;
  payer: string;
  method: string;
  status: string;
}

export const SubscriptionFundScreen: React.FC<SubscriptionFundScreenProps> = ({ onNavigate }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const invoices: InvoiceRecord[] = [
    {
      id: 'inv-1',
      code: '#HD-2024-1015',
      date: '15/10/2024 14:28:10',
      planName: 'Gói Gia Tộc Trường Tồn (1 Năm)\nDuy trì không gian phụng tự tổ tiên - 2024 - 2025',
      amount: '2.490.000 đ',
      payer: 'Nguyễn Trực Viễn\nTrích Quỹ Họ Chi Trực Lăng',
      method: 'VietQR MB Bank',
      status: 'Đã Chấp Nhận Điện Tử',
    },
    {
      id: 'inv-2',
      code: '#HD-2024-0802',
      date: '02/08/2024 09:15:33',
      planName: 'Gói Mở Rộng 100 Tín Chỉ AI Phục Chế\nPhục dựng bộ ảnh Cụ Thủy Tổ Đời 8',
      amount: '450.000 đ',
      payer: 'Nguyễn Phúc Anh Tuấn\nCon cháu cúng dường số hóa',
      method: 'Thẻ Visa **** 4860',
      status: 'Đã Chấp Nhận Điện Tử',
    },
    {
      id: 'inv-3',
      code: '#HD-2024-0612',
      date: '12/06/2024 16:42:02',
      planName: 'Nâng Cấp Kho Lưu Trữ +50 GB Đám Mây\nLưu trữ trọn bộ phim quay lễ tế phả hệ',
      amount: '500.000 đ',
      payer: 'Ban Quản Trị Tộc Vụ\nTrích Quỹ Khuyến Học & Tế Tự',
      method: 'Chuyển Khoản VCB',
      status: 'Đã Chấp Nhận Điện Tử',
    },
    {
      id: 'inv-4',
      code: '#HD-2023-1015',
      date: '15/10/2023 10:02:18',
      planName: 'Gói Gia Tộc Trường Tồn (Khởi Tạo Năm 1)\nKhởi tạo nền tảng phụng dưỡng số',
      amount: '2.490.000 đ',
      payer: 'Nguyễn Trực Viễn\nTrưởng Tộc Đời 11 Tiên Phong',
      method: 'VietQR MB Bank',
      status: 'Đã Chấp Nhận Điện Tử',
    },
  ];

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
            <span className="text-[#80141d] font-bold">Gói Dịch Vụ &amp; Thanh Toán</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#faefe3] border border-[#dec9b6] text-[10px] font-bold text-[#80141d]">
              • Ngân Quỹ Minh Bạch • Đồng Thuận Tộc Biểu
            </span>
          </div>
        </div>

        {/* Hero Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[10px] font-bold uppercase tracking-wider border border-[#dec9b6]">
              <span className="material-symbols-outlined text-xs">workspace_premium</span>
              <span>PHỤNG SỰ &amp; LƯU NIỆM BỀN LÂU</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1b15] leading-tight">
              Quản Lý Gói Dịch Vụ &amp; Ngân Quỹ Duy Trì Gia Tộc
            </h1>

            <p className="text-xs text-[#6b584d] leading-relaxed">
              Minh bạch chi phí bảo tồn di sản số, dung lượng lưu trữ gia phả và hạn mức phục chế ảnh AI. Tất cả chi phí được đối soát minh định cho toàn thể hội đồng con cháu.
            </p>
          </div>

          {/* Right Balance Card */}
          <div className="p-4 bg-[#faefe3]/80 border border-[#dec9b6] rounded-2xl shadow-2xs flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#c9892c] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#734c13]">
                Số Dư Quỹ Phụ Nhuận Từ Đường
              </div>
              <div className="text-lg font-serif font-bold text-[#80141d]">38.450.000 đ</div>
            </div>
          </div>
        </div>

        {/* Hero Active Plan Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Crimson Card (~65%) */}
          <div className="lg:col-span-8 bg-[#80141d] text-white rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden">
            {/* Watermark subtle pattern */}
            <div className="absolute right-0 bottom-0 w-48 h-48 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-black/30 text-[#faeed9] text-[10px] font-bold border border-white/20">
                  ★ GIA TỘC TRƯỜNG TỒN
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-emerald-100 text-[10px] font-bold border border-emerald-500/30">
                  • Đang hoạt động • Tự động gia hạn
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                GÓI GIA TỘC TRƯỜNG TỒN (Clan Heritage Pro)
              </h2>

              <p className="text-xs text-white/85 leading-relaxed max-w-xl">
                Đặc quyền phụng tự toàn diện: Mã hóa phả hệ vĩnh viễn, lưu trữ không giới hạn tài liệu gốc văn bia Hán Nôm và bảo chứng hương hỏa chi họ.
              </p>
            </div>

            {/* Plan Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-black/25 rounded-2xl border border-white/10 text-xs">
              <div className="space-y-0.5">
                <div className="text-[10px] text-white/70">Thời Gian Còn Lại</div>
                <div className="font-serif font-bold text-base text-[#faeed9]">284 Ngày</div>
                <div className="text-[10px] text-white/60">Hết hạn vào 15/10/2025</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-[10px] text-white/70">Kinh Phí Phụng Trì</div>
                <div className="font-serif font-bold text-base text-[#faeed9]">2.490.000 đ</div>
                <div className="text-[10px] text-white/60">Trả theo niên kỳ (1 năm/lần)</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-[10px] text-white/70">Người Chi Trả</div>
                <div className="font-serif font-bold text-base text-[#faeed9]">Quỹ Họ Chi Trực</div>
                <div className="text-[10px] text-white/60">Đã duyệt bởi Ban Trị Sự</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đang mở tùy chọn nâng cấp Gói Vĩnh Viễn 100 Năm...');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#faeed9] hover:bg-[#eed9be] text-[#80141d] font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">workspace_premium</span>
                  <span>Nâng Cấp Gói Vĩnh Viễn</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đang chuyển tới mục Quản lý Hóa Đơn & Gia Hạn...');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="px-4 py-2 rounded-xl bg-transparent border border-white/40 hover:bg-white/10 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">receipt_long</span>
                  <span>Quản Lý Gia Hạn &amp; Hóa Đơn</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setToastMessage('Đang mở Điều Khoản Phụng Sự Dòng Tộc...');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="text-[11px] text-white/80 hover:text-white underline cursor-pointer"
              >
                Xem điều khoản phụng sự
              </button>
            </div>
          </div>

          {/* Right 2 Side Cards (~35%) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            {/* Card 1: Thành Viên Kết Nối */}
            <div className="p-4 bg-white border border-[#dec9b6] rounded-3xl shadow-2xs space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-serif font-bold text-xs text-[#2b1b15] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-[#80141d]">groups</span>
                    <span>Thành Viên Kết Nối</span>
                  </div>
                  <span className="text-xs font-bold text-[#80141d]">48 / 100 Tối Đa</span>
                </div>
                <div className="text-[10px] text-[#8a6f62]">
                  Con cháu nội ngoại được cấp quyền truy cập
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-[#6b584d]">
                  <span>Đã kích hoạt khi khớp định danh phả ký</span>
                  <span className="font-bold text-[#2b1b15]">48%</span>
                </div>
                <div className="w-full bg-[#faefe3] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#80141d] h-full rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#dec9b6]/40">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#80141d] text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    V
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#c9892c] text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    A
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#734c13] text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    T
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#faeed9] text-[#734c13] text-[9px] font-bold flex items-center justify-center border border-white">
                    +45
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('moi-thanh-vien')}
                  className="text-xs font-bold text-[#80141d] hover:underline cursor-pointer"
                >
                  + Mời con cháu trong tộc &rarr;
                </button>
              </div>
            </div>

            {/* Card 2: Cam Kết Bảo Tồn 100 Năm */}
            <div className="p-4 bg-white border border-[#dec9b6] rounded-3xl shadow-2xs space-y-2 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#734c13]">
                <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#dec9b6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm text-[#734c13]">verified</span>
                </div>
                <span>Cam Kết Bảo Tồn 100 Năm</span>
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed">
                Mọi bản sao số hóa phả ký và di vật tổ tiên được sao lưu đa vùng, đảm bảo truyền đời không suy thoái dữ liệu.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Thống Kê Sử Dụng Tài Nguyên Di Sản */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#80141d]">analytics</span>
              <span>Thống Kê Sử Dụng Tài Nguyên Di Sản</span>
            </div>
            <span className="text-[11px] text-[#8a6f62]">Cập nhật tức thời 5 phút trước</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box 1: Dung Lượng Lưu Trữ */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-[#dec9b6]/40 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">cloud</span>
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xs text-[#2b1b15]">
                      Dung Lượng Lưu Trữ Đám Mây
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">
                      Kho số hóa gia bảo &amp; văn bản sắc phong
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif font-bold text-sm text-[#80141d]">41.2 GB</span>
                  <span className="text-[10px] text-[#8a6f62] ml-1">/ 50.0 GB (82.4%)</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="w-full bg-[#faefe3] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#80141d] h-full rounded-full" style={{ width: '82.4%' }} />
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#8a6f62]">0 GB</span>
                  <span className="text-rose-800 font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[11px]">warning</span>
                    <span>Gần đạt giới hạn ngưỡng 85%</span>
                  </span>
                  <span className="text-[#8a6f62]">50 GB</span>
                </div>
              </div>

              {/* 4 Category Breakdown Boxes */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl space-y-0.5">
                  <div className="text-[10px] text-[#8a6f62]">Ảnh Gốc &amp; Phục Chế 4K</div>
                  <div className="font-bold text-[#2b1b15]">24.8 GB (49.6%)</div>
                </div>
                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl space-y-0.5">
                  <div className="text-[10px] text-[#8a6f62]">Tư Liệu Hán Nôm &amp; Sắc Phong</div>
                  <div className="font-bold text-[#2b1b15]">9.6 GB (19.2%)</div>
                </div>
                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl space-y-0.5">
                  <div className="text-[10px] text-[#8a6f62]">Video &amp; Ghi âm Lễ tế</div>
                  <div className="font-bold text-[#2b1b15]">4.8 GB (9.6%)</div>
                </div>
                <div className="p-2.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl space-y-0.5">
                  <div className="text-[10px] text-[#8a6f62]">Mô hình 3D &amp; Vật phẩm cổ</div>
                  <div className="font-bold text-[#2b1b15]">2.0 GB (4.0%)</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-[#dec9b6]/40 text-xs">
                <span className="text-[10px] text-[#8a6f62] italic">
                  Lưu trữ trên toàn cảnh số an toàn chuẩn TIFF/PDF-A
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đang mở gói mở rộng dung lượng đám mây (100GB / 500GB)...');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  + Mua Thêm Dung Lượng (100GB / 500GB)
                </button>
              </div>
            </div>

            {/* Box 2: Tín Chỉ Phục Chế AI */}
            <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-[#dec9b6]/40 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#faeed9] text-[#734c13] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">auto_fix_high</span>
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xs text-[#2b1b15]">
                      Tín Chỉ Phục Chế Ảnh AI
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">
                      Khôi phục chân dung mờ ố, phục chế màu &amp; đọc văn bia
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif font-bold text-sm text-[#734c13]">102</span>
                  <span className="text-[10px] text-[#8a6f62] ml-1">/ 150 Khả dụng</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#6b584d]">
                <span>Đã cấp: 150 tín chỉ</span>
                <span>Tự động hồi 50 tín chỉ vào ngày 01/02/2025</span>
              </div>

              {/* Usage List */}
              <div className="p-3 bg-[#faefe3]/50 border border-[#dec9b6] rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold text-[#2b1b15]">
                  <span>Đã sử dụng trong tháng:</span>
                  <span className="text-[#80141d] font-bold">48 Tín chỉ</span>
                </div>
                <div className="space-y-1 text-[11px] text-[#6b584d]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-[#80141d]">check</span>
                    <span>24 ảnh chân dung tổ tiên phục chế màu</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-[#80141d]">check</span>
                    <span>12 trang văn bia cổ gia phả nôm bản trích tự động</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-[#8a6f62] italic">
                *Thuật toán xử lý chuyên biệt giữ cốt nét mặt truyền thống, không làm biến đổi nhân tướng tổ phụ.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-[#dec9b6]/40 text-xs">
                <span className="text-[10px] text-[#8a6f62] italic">
                  Tín chỉ mua thêm không bao giờ hết hạn
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Đang mở gói mua thêm tín chỉ AI cấp tốc...');
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#faeed9] hover:bg-[#eed9be] text-[#734c13] text-xs font-bold transition-colors cursor-pointer border border-[#dec9b6]"
                >
                  + Mua thêm gói tín chỉ cấp tốc
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Phương Thức Thanh Toán Đã Lưu Của Gia Tộc */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#80141d]">credit_card</span>
                <span>Phương Thức Thanh Toán Đã Lưu Của Gia Tộc</span>
              </div>
              <p className="text-[11px] text-[#8a6f62]">
                Các khoản trích quỹ tự động cho các khoản duy trì hương khói và số hóa dòng họ.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setToastMessage('Đang mở biểu mẫu thêm phương thức thanh toán mới...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#4a362f] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">add_card</span>
              <span>+ Thêm Phương Thức Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Method 1: MB Bank */}
            <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-800 font-bold text-xs flex items-center justify-center">
                    MB
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xs text-[#2b1b15]">
                      Tài Khoản Quỹ Dòng Họ
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">Ngân hàng Quân Đội (MB Bank)</div>
                  </div>
                </div>
                <span className="px-2 py-0.2 rounded-full bg-rose-100 text-rose-800 text-[9px] font-bold">
                  Mặc định
                </span>
              </div>

              <div className="p-2.5 bg-[#fdfaf5] rounded-xl border border-[#dec9b6]/60 text-xs space-y-0.5">
                <div className="text-[10px] text-[#8a6f62]">Số tài khoản chi phái:</div>
                <div className="font-mono font-bold text-[#2b1b15]">0908 1909 9999</div>
                <div className="text-[10px] text-[#8a6f62]">
                  Chủ thụ hưởng: BAN TRI SU TU DUONG NGUYEN PHUC
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#80141d] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">qr_code</span>
                  <span>VietQR Pro Liên Ngân Hàng</span>
                </span>
                <span className="material-symbols-outlined text-xs text-[#8a6f62]">more_vert</span>
              </div>
            </div>

            {/* Method 2: Mastercard Corporate */}
            <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">credit_card</span>
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xs text-[#2b1b15]">
                      Thẻ Doanh Nghiệp Tộc Vụ
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">Mastercard Corporate</div>
                  </div>
                </div>
                <span className="px-2 py-0.2 rounded-full bg-[#faeed9] text-[#734c13] text-[9px] font-bold">
                  Dự phòng
                </span>
              </div>

              <div className="p-2.5 bg-[#fdfaf5] rounded-xl border border-[#dec9b6]/60 text-xs space-y-0.5">
                <div className="text-[10px] text-[#8a6f62]">Số thẻ bảo mật:</div>
                <div className="font-mono font-bold text-[#2b1b15]">**** **** **** 4860</div>
                <div className="text-[10px] text-[#8a6f62]">Hạn thẻ: 11 / 28</div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#6b584d]">Người ủy nhiệm: Nguyễn Trực Viễn</span>
                <span className="material-symbols-outlined text-xs text-[#8a6f62]">more_vert</span>
              </div>
            </div>

            {/* Method 3: Vietcombank Ủy Nhiệm Chi */}
            <div className="p-4 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                    VCB
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xs text-[#2b1b15]">
                      Ủy Nhiệm Chi Kho Bạc Họ
                    </div>
                    <div className="text-[10px] text-[#8a6f62]">Vietcombank Chi Nhánh Huế</div>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-[#fdfaf5] rounded-xl border border-[#dec9b6]/60 text-xs space-y-0.5">
                <div className="text-[10px] text-[#8a6f62]">Tài khoản đồng sở hữu:</div>
                <div className="font-mono font-bold text-[#2b1b15]">0011 0006 7504</div>
                <div className="text-[10px] text-[#8a6f62]">Mục đích: Kinh phí số hóa &amp; Giỗ Chạp</div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#6b584d]">Cố định 6 tháng / lần</span>
                <span className="material-symbols-outlined text-xs text-[#8a6f62]">more_vert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Lịch Sử Hóa Đơn & Đóng Góp Quỹ Duy Trì */}
        <div className="bg-white border border-[#dec9b6] rounded-3xl p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9b6]/40 pb-3">
            <div className="space-y-0.5">
              <div className="font-serif font-bold text-sm text-[#2b1b15] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#80141d]">receipt_long</span>
                <span>Lịch Sử Hóa Đơn &amp; Đóng Góp Quỹ Duy Trì</span>
              </div>
              <p className="text-[11px] text-[#8a6f62]">
                Toàn vẹn biên lai số hóa, hóa đơn điện tử VAT và phiếu thu công đức được niêm yết minh bạch theo quy ước dòng họ.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setToastMessage('Đang mở bộ lọc niên khóa...');
                  setTimeout(() => setToastMessage(null), 2000);
                }}
                className="px-3 py-1.5 rounded-xl border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-semibold text-[#4a362f] flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span>Bộ lọc niên khóa</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToastMessage('Đang xuất báo cáo sổ sách thu chi dạng PDF...');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#80141d] flex items-center gap-1 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Xuất Sổ Sách PDF</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#faefe3] border-b border-[#dec9b6] font-serif font-bold text-[#2b1b15]">
                  <th className="py-3 px-3">MÃ HÓA ĐƠN</th>
                  <th className="py-3 px-3">NGÀY THANH TOÁN</th>
                  <th className="py-3 px-3">NỘI DUNG GÓI DỊCH VỤ</th>
                  <th className="py-3 px-3">SỐ TIỀN (VNĐ)</th>
                  <th className="py-3 px-3">NGƯỜI CHI TRẢ / NGUỒN QUỸ</th>
                  <th className="py-3 px-3">PHƯƠNG THỨC</th>
                  <th className="py-3 px-3 text-center">TRẠNG THÁI</th>
                  <th className="py-3 px-3 text-center">THAO TÁC</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#dec9b6]/40">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#fcf8f2] transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-[#80141d]">
                      {inv.code}
                    </td>

                    <td className="py-3.5 px-3 text-[11px] text-[#6b584d]">
                      {inv.date}
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-[#2b1b15] whitespace-pre-line">
                        {inv.planName}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-serif font-bold text-[#2b1b15]">
                      {inv.amount}
                    </td>

                    <td className="py-3.5 px-3 text-[11px] text-[#4a362f] whitespace-pre-line">
                      {inv.payer}
                    </td>

                    <td className="py-3.5 px-3 text-[11px] text-[#6b584d]">
                      {inv.method}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[10px] font-bold">
                        • {inv.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setToastMessage(`Đang tải hóa đơn VAT điện tử ${inv.code}...`);
                          setTimeout(() => setToastMessage(null), 2500);
                        }}
                        className="p-1 rounded-lg hover:bg-[#faefe3] text-[#80141d] cursor-pointer"
                        title="Tải hóa đơn"
                      >
                        <span className="material-symbols-outlined text-base">download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="pt-2 border-t border-[#dec9b6]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8a6f62]">
            <div>
              Hiển thị 4 / 4 giao dịch năm phả • Mọi khoản chi đều sinh biên lai hợp lệ tại Bộ Tài Chính
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#6b584d] font-bold">Trang 1 / 1</span>
            </div>
          </div>
        </div>

        {/* Bottom Card: Quy Chế Minh Bạch Tài Chính Tế Tự */}
        <div className="p-4 sm:p-5 bg-white border border-[#dec9b6] rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#faefe3] text-[#80141d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">gavel</span>
            </div>
            <div>
              <div className="font-serif font-bold text-xs text-[#80141d]">
                Quy Chế Minh Bạch Tài Chính Tế Tự
              </div>
              <p className="text-[11px] text-[#6b584d] leading-relaxed max-w-3xl">
                Tất cả hóa đơn điện tử VAT được xuất trực tiếp về hòm thư Ban Trị Sự và sao lưu vào bộ nhớ lạnh. Thành viên trong cây gia phả đều có quyền biểu quyết khi thay đổi hạn mức duy trì.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setToastMessage('Đang mở văn bản Hương Ước Dòng Họ...');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="px-3.5 py-1.5 rounded-xl border border-[#dec9b6] hover:bg-[#faefe3] text-xs font-bold text-[#80141d] flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
          >
            <span>Xem Hương Ước Dòng Họ</span>
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
