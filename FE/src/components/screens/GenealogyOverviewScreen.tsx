import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface GenealogyOverviewScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface PendingRequest {
  id: string;
  category: string;
  categoryColor: string;
  timeAgo: string;
  author: string;
  title: string;
  description: string;
  icon: string;
  actionType: 'approve_reject' | 'view_record' | 'approve_only';
  status: 'pending' | 'approved' | 'rejected';
}

export const GenealogyOverviewScreen: React.FC<GenealogyOverviewScreenProps> = ({ onNavigate }) => {
  const [requests, setRequests] = useState<PendingRequest[]>([
    {
      id: 'req-1',
      category: 'Nhánh 3 (TP.HCM)',
      categoryColor: '#80141d',
      timeAgo: '4 giờ trước',
      author: 'Nguyễn Phục Hùng',
      title: 'Khai sinh con trai thứ: Nguyễn Phục Hải Đăng (Đời 13)',
      description: 'Sinh ngày 12 tháng 09 năm Giáp Thìn (Âm lịch) tại Bệnh viện Từ Dũ. Đã đính kèm ảnh giấy chứng sinh.',
      icon: 'child_care',
      actionType: 'approve_reject',
      status: 'pending',
    },
    {
      id: 'req-2',
      category: 'Chi 2 (Nam Định)',
      categoryColor: '#c9892c',
      timeAgo: 'Hôm qua',
      author: 'Nguyễn Phúc Long',
      title: 'Đóng góp bản dập sắc phong: Cụ Cố Nguyễn Văn Đạt (Niên hiệu Bảo Đại)',
      description: 'Bản scan độ phân giải cao 600DPI, có dịch nghĩa chữ Hán – Nôm sang quốc ngữ.',
      icon: 'history_edu',
      actionType: 'view_record',
      status: 'pending',
    },
    {
      id: 'req-3',
      category: 'Nhánh Ngoài Tỉnh',
      categoryColor: '#715b50',
      timeAgo: '2 ngày trước',
      author: '',
      title: 'Yêu cầu cấp quyền xem cây gia phả: Dâu mới nhập trạch Trần Thị Thục Viên',
      description: 'Hôn lễ ngày 18 tháng Giêng. Đã qua thủ tục Lễ Tơ Hồng & yết kiến Nhà thờ tổ.',
      icon: 'person',
      actionType: 'approve_reject',
      status: 'pending',
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApprove = (id: string, title: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    setToastMessage(`Đã phê duyệt thông tin: ${title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReject = (id: string, title: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
    setToastMessage(`Đã từ chối/hoàn trả hồ sơ: ${title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] py-4 px-3 sm:px-6 lg:px-8 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2b1b15] text-[#fdf9f4] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in border border-[#c9892c]">
          <span className="material-symbols-outlined text-[#c9892c]">verified</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto space-y-4">
        {/* =========================================================
            BREADCRUMB & METADATA BAR
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[12px] text-[#8a6f62]">
            <span>Cây Gia Phả</span>
            <span>/</span>
            <span className="text-[#80141d] font-bold">
              Tổng Quan Dòng Tộc (Chi Trực Lãng)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#8a6f62] flex-wrap">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Đồng bộ Khâm Thiên Giám: Năm Ất Tỵ 2025
            </span>
            <span>•</span>
            <span>Mã phả hệ: <strong>NPX-TL-1682</strong></span>
          </div>
        </div>

        {/* =========================================================
            TOP HERO BANNER CARD (RADIAL LINEAGE BACKGROUND)
            ========================================================= */}
        <div className="relative rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-7 shadow-xs overflow-hidden">
          {/* Subtle lineage circles background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none opacity-25">
            <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#80141d]" fill="none">
              <circle cx="150" cy="100" r="30" strokeWidth="0.8" strokeDasharray="3 2" />
              <circle cx="150" cy="100" r="60" strokeWidth="0.8" />
              <circle cx="150" cy="100" r="90" strokeWidth="0.8" strokeDasharray="4 3" />
              <circle cx="150" cy="100" r="120" strokeWidth="0.8" />
              <line x1="30" y1="100" x2="150" y2="100" strokeWidth="0.8" />
              <line x1="150" y1="0" x2="150" y2="200" strokeWidth="0.8" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#80141d] text-white text-[10px] font-bold uppercase tracking-wider">
                  THẾ HỆ CHI NHÁNH 14 ĐỜI
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#faefe3] border border-[#ebdcd0] text-[#715b50] text-[10.5px] font-medium">
                  Quy củ sơn bản: Triều Gia Can
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#faefe3] border border-[#ebdcd0] text-[#715b50] text-[10.5px] font-medium">
                  Mộc bản lưu giữ: 342 năm
                </span>
              </div>

              <h1 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#80141d] leading-tight tracking-tight mt-1">
                Tổng Quan Phả Hệ Gia Tộc Nguyễn Phục
              </h1>
              <p className="text-[12.5px] text-[#715b50] max-w-2xl leading-relaxed">
                Cây phả hệ số hóa lưu giữ huyết thống, phân định chi phái, cành nhánh và phụng tự tiền hiền qua các thời kỳ. Nơi kết nối quá khứ linh thiêng và tương lai con cháu.
              </p>
            </div>

            {/* Quick Action Button Group */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => onNavigate('cay-pha-he-25d')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#80141d] text-white font-bold text-[12px] shadow-xs hover:bg-[#681017] transition-all whitespace-nowrap active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                <span>Mở Cây Gia Phả Toàn Màn Hình</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setToastMessage('Đang kết xuất bản in Phả Đồ A0 / PDF Đại Tộc Nguyễn Phục...');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[#dec9b6] bg-[#faefe3] text-[#2b1b15] hover:bg-[#f2e2d0] text-[12px] font-bold transition-colors shadow-2xs whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                <span>Xuất Phả Đồ A0 / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            4 STATS METRIC CARDS ROW
            ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: Thống Kê Nhân Đinh */}
          <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4.5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8a6f62]">
              <span>THỐNG KÊ NHÂN ĐINH</span>
              <span className="px-2 py-0.5 rounded-full bg-[#80141d]/10 text-[#80141d] font-bold">248</span>
            </div>
            <div className="font-serif text-[30px] font-bold text-[#2b1b15] my-1 leading-tight">
              248
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 text-[11px] text-[#715b50]">
                <span>• Nam (Đinh): <strong>136</strong></span>
                <span>• Nữ: <strong>112</strong></span>
              </div>
              <div className="w-full h-1 bg-[#ebdcd0] rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-[#80141d] to-[#c9892c] w-[55%]" />
              </div>
            </div>
          </div>

          {/* Card 2: Truyền Thừa Dòng Tộc */}
          <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4.5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8a6f62]">
              <span>TRUYỀN THỪA DÒNG TỘC</span>
              <span className="p-1 rounded bg-[#faefe3] text-[#c9892c]">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
              </span>
            </div>
            <div className="font-serif text-[30px] font-bold text-[#2b1b15] my-1 leading-tight flex items-baseline gap-1.5">
              <span>14</span>
              <span className="text-[15px] font-sans font-medium text-[#715b50]">Thế hệ</span>
            </div>
            <div className="text-[10.5px] text-[#715b50] leading-snug">
              <div>Từ Thủy tổ khởi dựng (1682)</div>
              <div>Đến đời hậu duệ sinh năm 2024</div>
            </div>
          </div>

          {/* Card 3: Phụng Thờ & Tế Tự */}
          <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4.5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8a6f62]">
              <span>PHỤNG THỜ &amp; TẾ TỰ</span>
              <span className="p-1 rounded bg-[#80141d]/10 text-[#80141d]">
                <span className="material-symbols-outlined text-[16px]">temple_buddhist</span>
              </span>
            </div>
            <div className="font-serif text-[30px] font-bold text-[#80141d] my-1 leading-tight flex items-baseline gap-1.5">
              <span>82</span>
              <span className="text-[15px] font-sans font-medium text-[#715b50]">Hương linh</span>
            </div>
            <div className="text-[10.5px] text-[#715b50] leading-snug">
              <div>✓ 100% Ngày giỗ &amp; Lăng mộ liên kết</div>
              <div className="text-[#80141d] font-semibold">Sắp đến: Tiết Thanh Minh 2025</div>
            </div>
          </div>

          {/* Card 4: Phục Chế Di Ảnh AI */}
          <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4.5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8a6f62]">
              <span>PHỤC CHẾ DI ẢNH AI</span>
              <span className="p-1 rounded bg-[#c9892c]/15 text-[#c9892c]">
                <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
              </span>
            </div>
            <div className="font-serif text-[30px] font-bold text-[#2b1b15] my-1 leading-tight flex items-baseline gap-1.5">
              <span>68</span>
              <span className="text-[15px] font-sans font-medium text-[#715b50]">Chân dung</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10.5px] text-[#715b50]">
                <span>Tiến độ phục dựng</span>
                <strong className="text-[#80141d]">85%</strong>
              </div>
              <div className="w-full h-1 bg-[#ebdcd0] rounded-full overflow-hidden">
                <div className="h-full bg-[#c9892c] w-[85%]" />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            PHÊ DUYỆT & CẬP NHẬT DÒNG PHÁI ĐANG CHỜ
            ========================================================= */}
        <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ebdcd0]">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#80141d] text-[20px]">
                  verified_user
                </span>
                <h3 className="font-serif text-[16px] font-bold text-[#80141d]">
                  Phê Duyệt &amp; Cập Nhật Dòng Phái Đang Chờ
                </h3>
              </div>
              <p className="text-[11px] text-[#8a6f62] mt-0.5">
                Quyền hạn: Nguyễn Trực Viên (Trưởng Tộc Đời 11)
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#80141d] text-white text-[11px] font-bold uppercase tracking-wider self-start sm:self-auto shadow-2xs">
              3 Yêu Cầu Chờ Quyết Định
            </span>
          </div>

          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-3.5 sm:p-4 rounded-xl border border-[#ebdcd0] bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs hover:border-[#dec9b6] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#faefe3] border border-[#ebdcd0] text-[#80141d]">
                    <span className="material-symbols-outlined text-[18px]">{req.icon}</span>
                  </span>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                        style={{ backgroundColor: `${req.categoryColor}15`, color: req.categoryColor }}
                      >
                        {req.category}
                      </span>
                      <span className="text-[10.5px] text-[#8a6f62]">
                        • {req.timeAgo}
                      </span>
                      {req.author && (
                        <span className="text-[10.5px] text-[#8a6f62]">
                          • bởi <strong className="text-[#543e34]">{req.author}</strong>
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-[13.5px] font-bold text-[#2b1b15]">
                      {req.title}
                    </h4>
                    <p className="text-[11.5px] text-[#715b50] leading-relaxed">
                      {req.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  {req.status === 'pending' ? (
                    <>
                      {req.actionType === 'view_record' ? (
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Đang mở hồ sơ tài liệu: ${req.title}`);
                            setTimeout(() => setToastMessage(null), 2500);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-[#8a5a22] text-white hover:bg-[#6f4618] text-[11.5px] font-bold shadow-2xs transition-all"
                        >
                          Xem Hồ Sơ
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApprove(req.id, req.title)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#80141d] text-white hover:bg-[#681017] text-[11.5px] font-bold shadow-2xs transition-all flex items-center gap-1"
                          >
                            <span>Duyệt Nhanh</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(req.id, req.title)}
                            className="px-3 py-1.5 rounded-lg border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#543e34] text-[11.5px] font-bold shadow-2xs transition-colors"
                          >
                            <span>Xem Chi Tiết</span>
                          </button>
                        </>
                      )}
                    </>
                  ) : req.status === 'approved' ? (
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      Đã Phê Duyệt
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-[#faefe3] text-[#80141d] border border-[#ebdcd0] text-[11px] font-bold">
                      Đã Hoàn Trả
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            SƠ BẢN ĐỒ PHẢ HỆ MẪU (4 ĐỜI TIỀN HIỀN KHỞI THỦY)
            ========================================================= */}
        <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#ebdcd0]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a6f62]">
                SƠ BẢN ĐỒ PHẢ HỆ MẪU (4 ĐỜI TIỀN HIỀN KHỞI THỦY)
              </span>
              <h3 className="font-serif text-[18px] font-bold text-[#80141d] mt-0.5">
                Trục Huyết Thống Chi Tiền Hiền Trực Lãng
              </h3>
            </div>
            <span className="text-[11px] text-[#715b50]">
              • Chế độ: Rút gọn phả hệ
            </span>
          </div>

          {/* CÂY PHẢ HỆ INTERACTIVE DIAGRAM */}
          <div className="relative rounded-2xl border border-[#ebdcd0] bg-[#faefe3]/40 p-6 sm:p-8 flex flex-col items-center justify-start min-h-[380px] overflow-hidden">
            {/* ĐỜI 1: KHỞI TỔ */}
            <div className="flex flex-col items-center">
              <div className="rounded-xl border-2 border-[#dec9b6] bg-[#fdf9f4] p-2.5 px-4 shadow-sm flex items-center gap-3 hover:scale-102 transition-transform">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Khởi tổ"
                  className="w-10 h-10 rounded-full object-cover border border-[#c9892c]"
                />
                <div className="leading-tight">
                  <span className="text-[9px] font-bold text-[#80141d] uppercase tracking-wider block">
                    ĐỜI 1 • KHỞI TỔ
                  </span>
                  <strong className="font-serif text-[13.5px] text-[#2b1b15] block">
                    Nguyễn Khắc Cẩn
                  </strong>
                  <span className="text-[10px] text-[#715b50]">
                    (1654 - 1728) • Quê Trực Lãng
                  </span>
                </div>
              </div>

              {/* Đường nối xuống Đời 2 */}
              <div className="w-0.5 h-6 bg-[#dec9b6]" />
            </div>

            {/* ĐỜI 2: TRƯỞNG PHÁI */}
            <div className="flex flex-col items-center">
              <div className="rounded-xl border border-[#dec9b6] bg-[#fdf9f4] p-2.5 px-4 shadow-sm flex items-center gap-3 hover:scale-102 transition-transform">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Trưởng phái"
                  className="w-10 h-10 rounded-full object-cover border border-[#c9892c]"
                />
                <div className="leading-tight">
                  <span className="text-[9px] font-bold text-[#c9892c] uppercase tracking-wider block">
                    ĐỜI 2 • TRƯỞNG PHÁI
                  </span>
                  <strong className="font-serif text-[13.5px] text-[#2b1b15] block">
                    Nguyễn Trọng Trực
                  </strong>
                  <span className="text-[10px] text-[#715b50]">
                    (1689 - 1761) • Tiền Hiền
                  </span>
                </div>
              </div>

              {/* Đường nối chia nhánh Đời 3 */}
              <div className="w-0.5 h-6 bg-[#dec9b6]" />
              <div className="w-64 sm:w-96 h-0.5 bg-[#dec9b6] relative">
                <div className="absolute left-0 top-0 w-0.5 h-5 bg-[#dec9b6]" />
                <div className="absolute right-0 top-0 w-0.5 h-5 bg-[#dec9b6]" />
              </div>
            </div>

            {/* ĐỜI 3: 2 NHÁNH SONG SONG */}
            <div className="pt-5 flex items-center justify-center gap-4 sm:gap-12 w-full max-w-xl">
              {/* Nhánh Trái */}
              <div className="rounded-xl border border-[#ebdcd0] bg-[#fdf9f4] p-2 px-3 shadow-2xs flex items-center gap-2.5 flex-1 max-w-[200px]">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Đời 3"
                  className="w-8 h-8 rounded-full object-cover border border-[#ebdcd0]"
                />
                <div className="leading-tight text-left">
                  <span className="text-[8.5px] font-bold text-[#80141d] block">
                    Đời 3 • Chi Trưởng Nam Định
                  </span>
                  <strong className="font-serif text-[12px] text-[#2b1b15] block truncate">
                    Nguyễn Văn Khoan
                  </strong>
                  <span className="text-[9.5px] text-[#715b50]">(1716 - 1782)</span>
                </div>
              </div>

              {/* Nhánh Phải */}
              <div className="rounded-xl border border-[#ebdcd0] bg-[#fdf9f4] p-2 px-3 shadow-2xs flex items-center gap-2.5 flex-1 max-w-[200px]">
                <img
                  src="/images/ancestor_portrait.jpg"
                  alt="Đời 3"
                  className="w-8 h-8 rounded-full object-cover border border-[#ebdcd0]"
                />
                <div className="leading-tight text-left">
                  <span className="text-[8.5px] font-bold text-[#c9892c] block">
                    Đời 3 • Chi Thứ Đậu Ngoại
                  </span>
                  <strong className="font-serif text-[12px] text-[#2b1b15] block truncate">
                    Nguyễn Đức Toàn
                  </strong>
                  <span className="text-[9.5px] text-[#715b50]">(1722 - 1795)</span>
                </div>
              </div>
            </div>

            {/* ĐỜI 4 (ẨN DƯỚI NỀN MỜ) */}
            <div className="pt-6 flex items-center justify-center gap-3 opacity-30 pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-white border border-[#ebdcd0] text-[10px]">
                Nguyễn Phục... (Đời 4 Chi...)
              </span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#ebdcd0] text-[10px]">
                Nguyễn Phục... (Đời 4 Chi...)
              </span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#ebdcd0] text-[10px]">
                Nguyễn Phúc... (Đời 4 Chi...)
              </span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#ebdcd0] text-[10px]">
                Nguyễn Minh Thiện (Chi Tiền...)
              </span>
            </div>

            {/* FLOATING ACTION OVERLAY DOCK */}
            <div className="absolute inset-x-0 bottom-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 px-4 z-20">
              <button
                type="button"
                onClick={() => onNavigate('cay-pha-he-25d')}
                className="px-4 py-2 rounded-full bg-[#2b1b15]/95 backdrop-blur-md text-white text-[11.5px] font-bold shadow-xl flex items-center gap-2 hover:bg-black transition-all border border-[#c9892c]/50 active:scale-98"
              >
                <span className="material-symbols-outlined text-[17px] text-[#c9892c]">explore</span>
                <span>Khám phá phả hệ 248 vị • Phóng to, tương tác chiều sâu 2.5D</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('cay-pha-he-25d')}
                className="px-4 py-2 rounded-full bg-[#80141d] text-white text-[11.5px] font-bold shadow-xl hover:bg-[#681017] transition-all active:scale-98"
              >
                Khám Phá Toàn Màn Hình
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            PHÂN TÁCH CHI TỘC (3 CARDS)
            ========================================================= */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a6f62]">
                PHÂN TÁCH CHI TỘC
              </span>
              <h3 className="font-serif text-[18px] font-bold text-[#80141d]">
                Các Chi Phái Tiền Nhân Trực Thuộc
              </h3>
            </div>
            <span className="text-[11.5px] text-[#715b50]">
              Tổng cộng 3 Phân chi theo phương vị định cư
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chi 1: Trực Lãng */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs flex flex-col justify-between space-y-3 hover:border-[#80141d] transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#80141d]">
                    TRỌNG ĐIỂM CỘI NGUỒN
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#80141d] text-white text-[9px] font-bold uppercase">
                    Chi Phái Đang Xem
                  </span>
                </div>
                <h4 className="font-serif text-[15px] font-bold text-[#80141d]">
                  Chi Trưởng - Tiền Hiền Trực Lãng
                </h4>

                <div className="space-y-1.5 text-[11px] text-[#543e34] pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Trưởng chi hiện thời:</span>
                    <strong>Nguyễn Trực Viên (Đời 11)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Nhân khẩu đã ghi:</span>
                    <strong className="text-[#80141d]">98 Thành viên</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Từ đường gốc:</span>
                    <span>Trực Lãng, Ý Yên, Nam Định</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Lăng mộ tổ tiên:</span>
                    <span>Bảo tồn nguyên vẹn</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Đại giỗ ngành:</span>
                    <strong className="text-[#c9892c]">15 tháng Giêng hàng năm</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ebdcd0] flex items-center justify-between text-[11px]">
                <span className="text-[#8a6f62]">Chi phái cội nguồn</span>
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="font-bold text-[#80141d] hover:underline flex items-center gap-1"
                >
                  <span>Xem Nhánh Riêng</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>

            {/* Chi 2: Đông Ngạc */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs flex flex-col justify-between space-y-3 hover:border-[#c9892c] transition-colors">
              <div className="space-y-2">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#715b50]">
                  PHÂN KHOA ĐÔNG NGẠC
                </span>
                <h4 className="font-serif text-[15px] font-bold text-[#2b1b15]">
                  Chi Thứ Hai - Phái Đông Ngạc
                </h4>

                <div className="space-y-1.5 text-[11px] text-[#543e34] pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Trưởng chi hiện thời:</span>
                    <strong>Nguyễn Phục Long (Đời 11)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Nhân khẩu đã ghi:</span>
                    <strong>74 Thành viên</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Nhà thờ nhánh:</span>
                    <span>Đông Ngạc, Bắc Từ Liêm, HN</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Lăng mộ tổ tiên:</span>
                    <span>Đã trùng tu 2022</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Đại giỗ ngành:</span>
                    <strong className="text-[#c9892c]">01 tháng Chạp</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ebdcd0] flex items-center justify-between text-[11px]">
                <span className="text-[#8a6f62]">Tách phái từ đời 3</span>
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="font-bold text-[#80141d] hover:underline flex items-center gap-1"
                >
                  <span>Xem Nhánh Riêng</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>

            {/* Chi 3: Gia Định / Nam Bộ */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 shadow-xs flex flex-col justify-between space-y-3 hover:border-[#80141d] transition-colors">
              <div className="space-y-2">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#715b50]">
                  PHÂN CHI KHẨN PHƯƠNG NAM
                </span>
                <h4 className="font-serif text-[15px] font-bold text-[#2b1b15]">
                  Chi Thứ Ba - Gia Định / Nam Bộ
                </h4>

                <div className="space-y-1.5 text-[11px] text-[#543e34] pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Trưởng chi hiện thời:</span>
                    <strong>Nguyễn Phục An (Đời 12)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Nhân khẩu đã ghi:</span>
                    <strong>76 Thành viên</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Tự hội chính:</span>
                    <span>Bình Thạnh, TP. Hồ Chí Minh</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Nghĩa trang gia tộc:</span>
                    <span>Hoa Viên Bình Dương</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a6f62]">Đại giỗ ngành:</span>
                    <strong className="text-[#c9892c]">22 tháng Bảy</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ebdcd0] flex items-center justify-between text-[11px]">
                <span className="text-[#8a6f62]">Tách phái từ đời 7</span>
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="font-bold text-[#80141d] hover:underline flex items-center gap-1"
                >
                  <span>Xem Nhánh Riêng</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM 2 CARDS: CẨM NANG DANH XƯNG (8 COLS) + GHI THÊM NHÂN ĐINH (4 COLS)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Card Trái: Cẩm Nang Gia Lễ & Phả Hệ Học (8 Cols) */}
          <div className="lg:col-span-8 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#c9892c]">
                <span className="material-symbols-outlined text-[15px]">menu_book</span>
                <span>CẨM NANG GIA LỄ &amp; PHẢ HỆ HỌC</span>
              </div>
              <h3 className="font-serif text-[16px] font-bold text-[#80141d]">
                Quy Chuẩn Danh Xưng Truyền Thừa Dòng Tộc
              </h3>
              <p className="text-[11.5px] text-[#715b50]">
                Hệ thống phân định ngôi thứ chính xác hỗ trợ việc xưng hô trong tế lễ giỗ chạp và ghi chép văn bia dòng họ.
              </p>
            </div>

            {/* 3 Khung Danh Xưng */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-[#ebdcd0] bg-[#faefe3] space-y-1">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#80141d] block">
                  TỔ TIÊN
                </span>
                <strong className="font-serif text-[13px] text-[#2b1b15] block">
                  Cao - Tằng - Tổ - Khảo
                </strong>
                <span className="text-[10px] text-[#715b50] block">
                  Bốn đời tiền bối trực hệ
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[#ebdcd0] bg-[#faefe3] space-y-1">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#80141d] block">
                  HẬU DUỆ
                </span>
                <strong className="font-serif text-[13px] text-[#2b1b15] block">
                  Tử - Tôn - Tằng - Huyền
                </strong>
                <span className="text-[10px] text-[#715b50] block">
                  Bốn đời kế tự cháu chắt
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[#ebdcd0] bg-[#faefe3] space-y-1">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#80141d] block">
                  DÒNG DÕI HÀNG NGANG
                </span>
                <strong className="font-serif text-[13px] text-[#2b1b15] block">
                  Thúc - Bá - Cô - Dì
                </strong>
                <span className="text-[10px] text-[#715b50] block">
                  Quan hệ anh em nội ngoại
                </span>
              </div>
            </div>

            {/* Footer Link */}
            <div className="pt-2 border-t border-[#ebdcd0] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
              <span className="text-[#8a6f62]">
                Tra cứu cách xưng hô chuẩn mực khi soạn thảo văn khấn tế tự
              </span>
              <button
                type="button"
                onClick={() => onNavigate('cam-nang-nghi-le')}
                className="font-bold text-[#80141d] hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Đến Mục Nghi Lễ &amp; Văn Khấn</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>

          {/* Card Phải: Ghi Thêm Nhân Đinh Mới (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#80141d] text-white">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
              </span>

              <h3 className="font-serif text-[16px] font-bold text-[#2b1b15]">
                Ghi Thêm Nhân Đinh Mới
              </h3>
              <p className="text-[11.5px] text-[#715b50] leading-relaxed">
                Cập nhật thành viên vào sinh, kết hôn nhập trạch hoặc bổ sung tiểu sử các vị tiền bối thất lạc vào cây phả hệ số.
              </p>

              <div className="p-2.5 rounded-lg bg-[#faefe3] border border-[#ebdcd0] text-[10.5px] text-[#8a6f62] flex items-start gap-1.5 leading-snug">
                <span className="material-symbols-outlined text-[15px] text-[#c9892c] shrink-0 mt-0.5">info</span>
                <span>Hồ sơ mới sẽ chuyển đến Trưởng tộc duyệt trước khi cập nhật toàn cây.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('them-thanh-vien')}
              className="w-full py-2.5 rounded-xl bg-[#80141d] text-white font-bold text-[12px] shadow-xs hover:bg-[#681017] transition-all flex items-center justify-center gap-1.5 active:scale-98"
            >
              <span className="material-symbols-outlined text-[17px]">add</span>
              <span>Thêm Thành Viên Mới</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            FOOTER DISCLAIMER
            ========================================================= */}
        <div className="pt-4 border-t border-[#ebdcd0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8a6f62]">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full bg-[#80141d] flex items-center justify-center text-white text-[9px] font-bold">
              CK
            </span>
            <strong>Thích Cúng Kiếng</strong>
            <span>• Hệ thống số hóa phả hệ &amp; nghi lễ gia tộc truyền thống</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button type="button" onClick={() => onNavigate('tong-quan-pha-he')} className="hover:text-[#80141d]">Phả Hệ Dòng Tộc</button>
            <span>•</span>
            <button type="button" onClick={() => onNavigate('family-calendar')} className="hover:text-[#80141d]">Lịch Tế Tự</button>
            <span>•</span>
            <button type="button" onClick={() => onNavigate('privacy-security')} className="hover:text-[#80141d]">Bảo Tồn Di Sản</button>
            <span>•</span>
            <button type="button" onClick={() => onNavigate('privacy-security')} className="hover:text-[#80141d]">Bảo Mật Gia Phả</button>
            <span>•</span>
            <span>© 2025 Thích Cúng Kiếng. Toàn quyền sở hữu kỹ thuật số dòng họ.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
