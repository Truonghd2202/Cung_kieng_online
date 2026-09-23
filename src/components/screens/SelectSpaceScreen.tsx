import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface SelectSpaceScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SelectSpaceScreen: React.FC<SelectSpaceScreenProps> = ({ onNavigate }) => {
  const [inviteCode, setInviteCode] = useState('TCK-8899-HN');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleVerifyCode = () => {
    if (!inviteCode.trim()) return;
    setToastMessage('Đang xác thực mã mời gia phả...');
    setTimeout(() => {
      setToastMessage('Xác thực thành công! Đang kết nối vào không gian Đại Tộc Nguyễn...');
      setTimeout(() => {
        onNavigate('cay-pha-he-25d');
      }, 700);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7eee2] text-[#2b1b15] selection:bg-[#ecd4c0] selection:text-[#4a1217]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#dec9b6] bg-[#2b1b15] px-5 py-3 text-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[#c9892c]">temple_buddhist</span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================
          TOP FLOW HEADER (Matching screenshot)
          ========================================================= */}
      <header className="border-b border-[#e4d3c2] bg-[#f7eee2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => onNavigate('guest-landing')}
              className="group flex items-center gap-2.5 text-left transition-transform active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#80141d] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <span className="material-symbols-outlined text-[22px]">temple_buddhist</span>
              </span>
              <span className="flex flex-col">
                <span className="font-serif text-[18px] sm:text-[19px] font-bold leading-tight tracking-tight text-[#80141d]">
                  Thích Cúng Kiếng
                </span>
                <span className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-[#80141d]/90">
                  DI SẢN & KÝ ỨC GIA TỘC
                </span>
              </span>
            </button>
          </div>

          {/* Flow Steps: Badge | Step 1 (Active) | Step 2 | Step 3 */}
          <div className="hidden items-center justify-center gap-3 sm:flex lg:gap-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3 py-1 text-[11px] font-medium text-[#715b50]">
              <span className="material-symbols-outlined text-[14px] text-[#1b6b3e]">check</span>
              <span>Khởi Tạo Không Gian Phụng Thờ</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#80141d] px-4 py-1.5 text-[12px] font-bold text-white shadow-xs">
                Chọn Không Gian
              </span>

              <button
                type="button"
                onClick={() => onNavigate('khoi-tao-gia-toc')}
                className="px-3 py-1 text-[12px] font-medium text-[#543e34] hover:text-[#80141d] transition-colors"
              >
                Khởi Tạo Gia Tộc
              </button>

              <button
                type="button"
                onClick={() => onNavigate('thiet-lap-gia-dinh')}
                className="px-3 py-1 text-[12px] font-medium text-[#543e34] hover:text-[#80141d] transition-colors"
              >
                Thiết Lập Gia Đình
              </button>
            </div>
          </div>

          {/* Right Status & Avatar */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <span className="block text-[11.5px] font-bold text-[#2b1b15]">Tộc Trưởng Chuẩn Bị</span>
              <span className="flex items-center justify-end gap-1 text-[10px] text-[#1b6b3e] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1b6b3e] animate-pulse" />
                <span>Trực tuyến</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('ho-so-ca-nhan')}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#80141d] text-white shadow-xs hover:bg-[#680f16] transition-colors"
              title="Tài khoản gia tộc"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN BODY
          ========================================================= */}
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-[1100px] space-y-10">
          {/* Title Area */}
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3.5 py-1 text-[11px] font-bold text-[#80141d]">
              <span className="material-symbols-outlined text-[14px]">menu_book</span>
              <span>KHỞI ĐẦU HÀNH TRÌNH CỘI NGUỒN</span>
            </div>

            <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#2b1b15]">
              Chào mừng bạn đến với <span className="italic text-[#80141d]">Thích Cúng Kiếng</span>
            </h1>

            <p className="mx-auto mt-2.5 max-w-2xl text-[13.5px] leading-relaxed text-[#715b50]">
              Bước đầu tiên để lưu giữ di sản, kết nối các thế hệ và bảo tồn ký ức hương hỏa gia đình vĩnh cửu theo gia quy thuần Việt.
            </p>
          </div>

          {/* 2 Main Gateway Cards */}
          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* Card 1: Tạo Không Gian Gia Đình Mới */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-7 shadow-xl sm:p-9">
              {/* Crimson Top Line Accent */}
              <div className="absolute left-6 right-6 top-0 h-1.5 rounded-b-md bg-[#80141d]" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8ede2] text-[#80141d]">
                    <span className="material-symbols-outlined text-[26px]">account_tree</span>
                  </div>

                  <span className="rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3 py-1 text-[11px] font-semibold text-[#80141d]">
                    ● Dành cho Trưởng tộc &amp; Người khởi lập
                  </span>
                </div>

                <h2 className="mt-5 font-serif text-2xl font-bold text-[#2b1b15]">
                  Tạo Không Gian Gia Đình Mới
                </h2>

                <p className="mt-2 text-[13px] leading-relaxed text-[#6c5549]">
                  Khởi tạo cội nguồn số cho đại gia tộc hoặc chi phái của bạn. Tự tay thiết lập cấu trúc phả hệ đa thế hệ, số hóa văn tự cổ và chủ động lịch hương hỏa.
                </p>

                {/* 3 Checklist Features */}
                <div className="mt-6 space-y-2.5 rounded-2xl border border-[#dec9b6] bg-[#f5ece2] p-4 text-[12px] text-[#543e34]">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[17px] text-[#80141d] shrink-0 mt-0.5">
                      verified_user
                    </span>
                    <span>Toàn quyền quản trị tư liệu, mã hóa gia quy và phân cấp vai vế con cháu.</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[17px] text-[#80141d] shrink-0 mt-0.5">
                      auto_fix_high
                    </span>
                    <span>Tích hợp AI phục chế chân dung cổ và trợ lý nhận diện chi nhánh phái.</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[17px] text-[#80141d] shrink-0 mt-0.5">
                      print
                    </span>
                    <span>Xuất bản hồ sơ phả ký truyền thống định dạng giấy điệp chuẩn A3 / A0.</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('khoi-tao-gia-toc')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#80141d] py-3.5 text-[13.5px] font-bold text-white shadow-md transition-all hover:bg-[#680f16] hover:shadow-lg active:scale-[0.99]"
                >
                  <span>Bắt đầu khởi tạo dòng tộc</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <span className="mt-2 block text-center text-[11px] text-[#8a6f62]">
                  Miễn phí 100 thế hệ đầu tiên • Khởi lập trong 3 phút
                </span>
              </div>
            </div>

            {/* Card 2: Tham Gia Bằng Mã Mời */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-7 shadow-xl sm:p-9">
              {/* Gold Top Line Accent */}
              <div className="absolute left-6 right-6 top-0 h-1.5 rounded-b-md bg-[#c9892c]" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8ede2] text-[#80141d]">
                    <span className="material-symbols-outlined text-[26px]">mail</span>
                  </div>

                  <span className="rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3 py-1 text-[11px] font-semibold text-[#80141d]">
                    ● Dành cho Con cháu &amp; Thành viên
                  </span>
                </div>

                <h2 className="mt-5 font-serif text-2xl font-bold text-[#2b1b15]">
                  Tham Gia Bằng Mã Mời
                </h2>

                <p className="mt-2 text-[13px] leading-relaxed text-[#6c5549]">
                  Gia phả của bạn đã được các bậc trưởng bối khởi lập? Nhập mã định danh 8 ký tự hoặc đường dẫn liên kết được chia sẻ để kết nối ngay vào cây gia tộc.
                </p>

                {/* Invite Code Box */}
                <div className="mt-6 rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-4">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15] mb-2">
                    Mã mời gia tộc (Invite Code)
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#a07a68]">
                        key
                      </span>
                      <input
                        type="text"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        placeholder="VD: TCK-8899-HN"
                        className="w-full rounded-xl border border-[#decab7] bg-white py-2.5 pl-9 pr-3 text-[13px] font-mono font-bold text-[#2b1b15] uppercase tracking-wider focus:border-[#80141d] focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#dec9b6] bg-[#faefe3] px-4 py-2.5 text-[12.5px] font-bold text-[#80141d] hover:bg-[#f3e3d2] active:scale-95 transition-all"
                    >
                      <span>Xác thực mã</span>
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                    </button>
                  </div>
                  <span className="mt-2.5 block text-[11px] text-[#715b50]">
                    <span className="material-symbols-outlined text-[13px] align-middle mr-1">help_outline</span>
                    Chưa có mã? Hỏi Trưởng tộc hoặc{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('cay-pha-he-25d')}
                      className="font-bold text-[#80141d] hover:underline"
                    >
                      xem không gian mẫu
                    </button>.
                  </span>
                </div>
              </div>

              {/* Sample Clan Box */}
              <div className="mt-6 rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9892c]/20 text-[#80141d]">
                    <span className="material-symbols-outlined text-[22px]">groups</span>
                  </div>
                  <div>
                    <strong className="block text-[12.5px] font-bold text-[#2b1b15]">
                      Gia phả mẫu: Đại Tộc Nguyễn (Đông Ngạc)
                    </strong>
                    <span className="text-[11px] text-[#715b50]">
                      Trải nghiệm 7 đời • 142 thành viên
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="rounded-lg border border-[#dec9b6] bg-white px-3 py-1.5 text-[11.5px] font-bold text-[#80141d] hover:bg-[#faefe3] transition-colors"
                >
                  Khám phá
                </button>
              </div>
            </div>
          </div>

          {/* 3 Feature Cards Underneath */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4 shadow-2xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8ede2] text-[#80141d]">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
              </div>
              <div>
                <strong className="block text-[12.5px] font-bold text-[#2b1b15]">
                  Văn Khấn &amp; Điển Tích
                </strong>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#715b50]">
                  Chuẩn hóa 54 bài cúng theo nghi lễ cổ truyền ba miền.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4 shadow-2xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8ede2] text-[#80141d]">
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </div>
              <div>
                <strong className="block text-[12.5px] font-bold text-[#2b1b15]">
                  Nhắc Nhở Giỗ Chạp
                </strong>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#715b50]">
                  Tự động đồng bộ lịch Âm – Dương và điều phối công việc họ hàng.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4 shadow-2xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8ede2] text-[#80141d]">
                <span className="material-symbols-outlined text-[20px]">photo_library</span>
              </div>
              <div>
                <strong className="block text-[12.5px] font-bold text-[#2b1b15]">
                  Kho Ký Ức Hương Hỏa
                </strong>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#715b50]">
                  Lưu trữ ảnh thờ, di ngôn, sắc phong truyền đời vĩnh cửu.
                </p>
              </div>
            </div>
          </div>

          {/* Assistance Callout Bar */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#dec9b6] bg-[#f8ede2] p-5 shadow-2xs sm:flex-row sm:p-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c9892c]/20 text-[#80141d]">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div>
                <strong className="block text-[13px] font-bold text-[#2b1b15]">
                  Cần hỗ trợ hướng dẫn người cao niên hoặc quy trình nhập phả?
                </strong>
                <p className="text-[11.5px] text-[#715b50]">
                  Đội ngũ nghiên cứu văn hóa &amp; kỹ thuật viên luôn sẵn sàng trợ giúp tận tình từng bước qua điện thoại hoặc Zalo.
                </p>
              </div>
            </div>

            <a
              href="tel:19008888"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white border border-[#dec9b6] px-5 py-2.5 text-[13px] font-bold text-[#80141d] shadow-2xs hover:bg-[#faefe3] transition-colors"
            >
              <span className="material-symbols-outlined text-[17px]">call</span>
              <span>1900 8888</span>
            </a>
          </div>

          {/* Privacy Subline */}
          <div className="text-center text-[11.5px] text-[#715b50] flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#80141d]">shield</span>
            <span>Không gian gia đình khép kín 100% • Dữ liệu mã hóa chuẩn phân quyền tộc phái &amp; thuần phong mỹ tục</span>
          </div>
        </div>
      </main>

      {/* =========================================================
          BOTTOM AUTH FOOTER (Matching screenshot)
          ========================================================= */}
      <footer className="border-t border-[#e4d3c2] bg-[#f7eee2] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-[11.5px] text-[#715b50] md:flex-row">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-[#80141d]">shield</span>
            <div>
              <strong className="text-[#2b1b15]">Bảo mật gia phả &amp; dữ liệu hương hỏa tuyệt đối</strong>
              <span className="ml-1 text-[#8a6f62]">— Cam kết lưu trữ vĩnh cửu theo gia quy &amp; thuần phong mỹ tục Việt Nam</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <span className="flex items-center gap-1 text-[#80141d]">
              <span className="material-symbols-outlined text-[14px]">call</span>
              1900 8888
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              hotro@thichcungkieng.vn
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Mã hóa chuẩn gia tộc
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
