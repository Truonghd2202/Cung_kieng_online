import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';
import { MarketingShell } from './MarketingShell.tsx';

interface Props {
  onNavigate: (screen: ScreenType) => void;
  onLogout?: () => void;
}

export const PrivacySecurityScreen: React.FC<Props> = ({ onNavigate, onLogout }) => {
  // State for interactive FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // State for interactive audit log live filter/tabs
  const [auditFilter, setAuditFilter] = useState<'all' | 'admin' | 'security'>('all');

  // FAQ items data matching screenshot
  const faqs = [
    {
      question: 'Người ngoài họ có thể tình cờ tìm thấy hình ảnh gia tộc tôi trên Google không?',
      answer:
        'Tuyệt đối không. Không gian gia tộc trên Thích Cúng Kiếng hoạt động theo nguyên tắc hoàn toàn Private & Isolated. Chỉ những người có thư mời từ Trưởng tộc mới có thể truy cập. Các công cụ tìm kiếm bên ngoài (như Google, Bing) hoàn toàn bị chặn bằng giao thức bảo mật robots và mã hóa cấp server.',
    },
    {
      question: 'Nếu Trưởng tộc qua đời, quyền quản trị không gian gia tộc sẽ được chuyển giao thế nào?',
      answer:
        'Hệ thống hỗ trợ tính năng chỉ định Trưởng Tộc Kế Nhiệm ngay trong tài khoản. Khi Trưởng tộc quy tiên, Ban thường trực dòng họ cùng 2 thành viên Ban kiểm soát có thể kích hoạt quy trình chuyển giao quyền lực chính thức với giấy tờ xác thực hoặc biên bản họp họ có chữ ký đồng thuận.',
    },
    {
      question: 'Thích Cúng Kiếng có bán hoặc chia sẻ dữ liệu dòng họ cho bên thứ ba không?',
      answer:
        'Cam kết 100% Không. Thích Cúng Kiếng là nền tảng phụng sự di sản văn hóa tâm linh thuần túy. Chúng tôi không bao giờ bán dữ liệu, không khai thác thông tin cá nhân cho mục đích quảng cáo hoặc chia sẻ với bất kỳ bên thứ ba nào vì mục đích thương mại.',
    },
    {
      question: 'Hình ảnh cũ phục chế có bị lộ ra bên ngoài không?',
      answer:
        'Toàn bộ quá trình phục chế di ảnh được xử lý tự động trong môi trường điện toán đám mây riêng biệt được bảo vệ nghiêm ngặt. Sau khi quá trình phục chế ảnh 4K hoàn tất và bạn lưu về máy/gia phả, tệp tin tạm trên hệ thống AI sẽ tự động hủy sạch theo tiêu chuẩn bảo mật.',
    },
  ];

  // 9 Pillars of Data Protection
  const pillars = [
    {
      number: '01',
      category: 'KHÔNG GIAN RIÊNG BIỆT',
      icon: 'lock',
      title: 'Không Gian Gia Đình Khép Kín',
      desc: 'Mô hình kiến trúc độc lập (Dedicated Family Space), ngăn ngừa mọi sự rò rỉ dữ liệu ra ngoài. Hệ thống bảo vệ tuyệt đối mọi ảnh chụp, gia phả và kỷ vật của dòng họ trước các công cụ tìm kiếm hoặc đối tượng không thuộc gia đình.',
      actionText: 'Quy định bảo mật không gian riêng tư',
    },
    {
      number: '02',
      category: 'XÁC THỰC BẢO MẬT',
      icon: 'vpn_key',
      title: 'Truy Cập Bằng Thư Mời Có Mã',
      desc: 'Thành viên chỉ có thể tham gia qua thư mời mã hóa có giới hạn thời gian phát hành bởi Hội đồng trưởng lão hoặc Ban quản trị. Hỗ trợ 2FA qua SMS, OTP hoặc ứng dụng Authenticator.',
      actionText: 'Tìm hiểu bảo mật 2 lớp Authenticator',
    },
    {
      number: '03',
      category: 'PHÂN QUYỀN VAI TRÒ',
      icon: 'shield_person',
      title: 'Phân Quyền Đa Tầng 4 Cấp Độ',
      desc: 'Kiểm soát phân quyền theo truyền thống dòng họ: Trưởng tộc nắm quyền tối cao; Ban kiểm soát (Trưởng các chi, trưởng ngành); Thành viên đóng góp kỷ vật; và Khách (quyền xem giới hạn theo phả hệ).',
      actionText: 'Xem bảng phân cấp quyền gia tộc',
    },
    {
      number: '04',
      category: 'MÃ HÓA TOÀN TRÌNH',
      icon: 'security',
      title: 'Mã Hóa AES-256 & TLS 1.3',
      desc: 'Mọi ảnh chụp di ảnh, văn bản chữ Hán Nôm và ghi âm lịch sử gia đình đều được mã hóa bằng thuật toán AES-256 ở trạng thái nghỉ (at-rest) và bảo vệ bằng TLS 1.3 trong quá trình truyền tải (in-transit).',
      actionText: 'Tiêu chuẩn an ninh mật mã đa tầng',
    },
    {
      number: '05',
      category: 'MINH BẠCH VÀ BẢO TỒN AI',
      icon: 'auto_fix_normal',
      title: 'Minh Bạch & Đúng Thuần AI',
      desc: 'Ảnh cũ phục chế màu chỉ được xử lý tạm thời và xóa vĩnh viễn khỏi máy chủ sau khi hoàn thành. Không bao giờ sử dụng hình ảnh gia tộc để huấn luyện mô hình mở công cộng.',
      actionText: 'Chính sách đạo đức AI gia đình (AI Privacy)',
    },
    {
      number: '06',
      category: 'CHỐNG SAO CHÉP & BẢO VỆ KỶ VẬT',
      icon: 'branding_watermark',
      title: 'Chống Sao Chép & Đóng Dấu Thủy Ấn',
      desc: 'Ngăn ngừa hành vi chụp trộm, tải lậu ảnh gia phả hoặc trích xuất văn tự quý. Tự động gắn Watermark ẩn kỹ thuật số định danh tài khoản người xem.',
      actionText: 'Xem cơ chế đóng dấu bản quyền kỷ vật',
    },
    {
      number: '07',
      category: 'LƯU TRỮ VĨNH VIỄN & ĐỘC LẬP',
      icon: 'file_download',
      title: 'Xuất Dữ Liệu Trọn Gói Linh Hoạt',
      desc: 'Dòng họ nắm quyền sở hữu 100%. Bất kỳ lúc nào, Trưởng tộc cũng có thể xuất toàn bộ cây phả hệ dưới dạng GEDCOM chuẩn quốc tế, tài liệu phả hệ PDF sắc nét, hoặc file in bạt 10m chất lượng cao.',
      actionText: 'Định dạng GEDCOM chuẩn toàn cầu & In ấn',
    },
    {
      number: '08',
      category: 'TOÀN QUYỀN LÃNG QUÊN',
      icon: 'delete_forever',
      title: 'Tiêu Hủy Tài Khoản Tuyệt Đối',
      desc: "Thực thi chuẩn 'Right to be forgotten'. Nếu gia đình quyết định ngừng sử dụng, toàn bộ dữ liệu trên đám mây sẽ được xóa sạch vĩnh viễn và gửi chứng từ xác nhận sau 30 ngày lưu trữ theo quy chuẩn an toàn.",
      actionText: 'Cam kết xóa sạch dữ liệu sau 30 ngày',
    },
    {
      number: '09',
      category: 'MINH BẠCH LỊCH SỬ',
      icon: 'history_edu',
      title: 'Kiểm Toán Hành Vi (Audit Log)',
      desc: 'Mọi thao tác chỉnh sửa phả hệ, phân chia chi cành, duyệt bài viết hay thêm thành viên đều được ghi vết thời gian thực chuẩn xác. Trưởng tộc có thể tra cứu và khôi phục về trạng thái trước đó bất cứ khi nào.',
      actionText: 'Security Audit Log theo thời gian thực',
    },
  ];

  // 4-Tier Role Permission Matrix
  const permissions = [
    {
      feature: 'Khởi tạo & chỉnh sửa cấu trúc toàn bộ cây gia phả',
      roles: [true, true, false, false],
    },
    {
      feature: 'Phê duyệt thành viên mới tham gia vào không gian gia phả',
      roles: [true, true, false, false],
    },
    {
      feature: 'Tải ảnh di sản & đóng góp kỷ vật số, sắc phong',
      roles: [true, true, true, false],
    },
    {
      feature: 'Xem cây gia phả, thắp hương số & nhận thông báo ngày giỗ',
      roles: [true, true, true, true],
    },
    {
      feature: 'Xuất file phả hệ in ấn khổ lớn hoặc file PDF',
      roles: [true, true, false, false],
    },
    {
      feature: 'Xóa và tiêu hủy dữ liệu không gian gia tộc',
      roles: [true, false, false, false],
    },
  ];

  return (
    <MarketingShell currentScreen="privacy-security" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="bg-[#f7eee2] text-[#2b1b15] selection:bg-[#ecd4c0] selection:text-[#4a1217]">
        {/* =========================================================
            SECTION 1: HERO / PAGE TITLE & TRUST BADGES
            ========================================================= */}
        <section className="relative overflow-hidden bg-[#f7eee2] px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
          {/* Decorative background rings */}
          <div className="pointer-events-none absolute -left-20 top-0 h-[480px] w-[480px] rounded-full border border-[#e4d3c2] opacity-60" />
          <div className="pointer-events-none absolute -left-6 top-14 h-[360px] w-[360px] rounded-full border border-[#decab7] opacity-50" />

          <div className="mx-auto max-w-[1240px]">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[12px] text-[#7a6256]">
              <button
                type="button"
                onClick={() => onNavigate('guest-landing')}
                className="font-medium hover:text-[#80141d] hover:underline"
              >
                Trang chủ
              </button>
              <span>/</span>
              <span className="font-semibold text-[#80141d]">Bảo mật & Quyền riêng tư</span>
            </div>

            <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left Column: Heading & Trust Badges */}
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f2e7db] px-3.5 py-1 text-[11px] font-bold text-[#80141d] shadow-2xs">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  <span>TIÊU CHUẨN AN TOÀN THÔNG TIN DI SẢN GIA TỐI CAO</span>
                </div>

                <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.2] text-[#2b1b15] sm:text-4xl lg:text-[44px]">
                  Bảo Mật Ký Ức Gia Tộc & Quyền Riêng Tư Tuyệt Đối
                </h1>

                <p className="mt-4 text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
                  Chúng tôi hiểu rằng ký ức, gia phả và hình ảnh tổ tiên là tài sản thiêng liêng nhất của mỗi gia đình. Thích Cúng Kiếng được thiết kế như một két sắt kỹ thuật số biệt lập, tôn vinh tính toàn vẹn và bảo hộ tuyệt đối dòng chảy ký ức của dòng họ.
                </p>

                {/* 3 Trust Badges */}
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-xl border border-[#decab7] bg-[#fbf5ee] p-3 shadow-2xs">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#faefe3] text-[#80141d]">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                    </span>
                    <div>
                      <strong className="block text-[12px] font-bold text-[#2b1b15]">Mã hóa AES-256</strong>
                      <span className="text-[10.5px] text-[#7a6256]">Chuẩn mã hóa cấp quân đội</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[#decab7] bg-[#fbf5ee] p-3 shadow-2xs">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#faefe3] text-[#80141d]">
                      <span className="material-symbols-outlined text-[20px]">verified_user</span>
                    </span>
                    <div>
                      <strong className="block text-[12px] font-bold text-[#2b1b15]">Chứng nhận ISO 27001</strong>
                      <span className="text-[10.5px] text-[#7a6256]">Đạt tiêu chuẩn quốc tế</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[#decab7] bg-[#fbf5ee] p-3 shadow-2xs">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#faefe3] text-[#80141d]">
                      <span className="material-symbols-outlined text-[20px]">do_not_disturb_on</span>
                    </span>
                    <div>
                      <strong className="block text-[12px] font-bold text-[#2b1b15]">Không Quảng Cáo</strong>
                      <span className="text-[10.5px] text-[#7a6256]">Không bán dữ liệu dòng họ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Heritage Card */}
              <div className="relative mx-auto w-full max-w-md">
                <div className="overflow-hidden rounded-2xl border border-[#dec9b6] bg-gradient-to-b from-[#fbf6ef] via-[#f7eee2] to-[#f2e7db] p-8 text-center shadow-md">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dbcaa8] bg-[#f5e9dc] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    <span className="material-symbols-outlined text-[13px]">lock</span>
                    <span>HỆ THỐNG ĐÃ KÍCH HOẠT CHẾ ĐỘ BIỆT LẬP</span>
                  </div>

                  {/* Lotus / Shield Crest */}
                  <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#80141d] text-white shadow-lg ring-4 ring-[#ecd5c4]">
                    <span className="material-symbols-outlined text-[36px]">shield</span>
                  </div>

                  <h2 className="mt-5 font-serif text-2xl font-bold text-[#2b1b15]">
                    Di Sản Trường Tồn
                  </h2>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                    Dữ liệu lưu trữ vĩnh viễn, bảo vệ đa trung tâm với cấu trúc dữ liệu nguyên bản theo gia phả chữ Hán Nôm và Quốc ngữ.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#decab7] pt-5">
                    <div className="rounded-xl border border-[#e2d0be] bg-[#fbf5ee] p-2.5">
                      <div className="flex items-center justify-center gap-1 text-[#80141d]">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        <span className="text-[11px] font-bold">100%</span>
                      </div>
                      <span className="mt-0.5 block text-[10px] text-[#7a6256]">Gia phả toàn vẹn</span>
                    </div>
                    <div className="rounded-xl border border-[#e2d0be] bg-[#fbf5ee] p-2.5">
                      <div className="flex items-center justify-center gap-1 text-[#80141d]">
                        <span className="material-symbols-outlined text-[15px]">cloud_done</span>
                        <span className="text-[11px] font-bold">Đang Bật</span>
                      </div>
                      <span className="mt-0.5 block text-[10px] text-[#7a6256]">Sao lưu tức thì</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: 9 TRỤ CỘT BẢO HỘ DỮ LIỆU GIA TỘC
            ========================================================= */}
        <section className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            {/* Header */}
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                KIẾN TRÚC AN TOÀN ĐA PHÂN LỚP
              </p>
              <h2 className="mt-2.5 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                9 Trụ Cột Bảo Hộ Dữ Liệu Gia Tộc
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6c5549]">
                Giải pháp an ninh kỹ thuật số toàn diện nhằm bảo vệ di sản gia tộc mọi lúc mọi nơi, gắn kết các thế hệ an toàn.
              </p>
            </div>

            {/* Grid 3x3 */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((item) => (
                <div
                  key={item.number}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#80141d] hover:shadow-md"
                >
                  <div>
                    {/* Top Row: Icon & Tag */}
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faefe3] text-[#80141d] transition-transform duration-200 group-hover:scale-105">
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#a07a68]">
                        {item.number} / {item.category}
                      </span>
                    </div>

                    <h3 className="mt-5 font-serif text-lg font-bold text-[#2b1b15] group-hover:text-[#80141d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#6c5549]">
                      {item.desc}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="mt-6 border-t border-[#ebdcd0] pt-4">
                    <button
                      type="button"
                      onClick={() => onNavigate('bao-mat-tai-khoan')}
                      className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#80141d] hover:underline"
                    >
                      <span>{item.actionText}</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: MA TRẬN PHÂN QUYỀN 4 CẤP ĐỘ
            ========================================================= */}
        <section className="bg-[#f7eee2] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            {/* Section Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                  HỆ THỐNG PHÂN QUYỀN GIA TRUYỀN
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                  Ma Trận Phân Quyền 4 Cấp Độ
                </h2>
                <p className="mt-2.5 max-w-2xl text-[14px] leading-relaxed text-[#6c5549]">
                  Mỗi vai trò trong gia phả có quyền hạn và trách nhiệm rõ ràng, bảo đảm giữ đúng trật tự truyền thống và an toàn dữ liệu tuyệt đối theo tôn ty trật tự dòng họ.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#fbf5ee] px-3 py-1 text-[11px] text-[#7a6256] shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#80141d]" />
                <span>Dữ liệu minh họa hệ thống</span>
              </span>
            </div>

            {/* Matrix Table */}
            <div className="mt-8 overflow-x-auto rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] shadow-2xs">
              <table className="w-full min-w-[700px] border-collapse text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-[#dec9b6] bg-[#f2e7db] text-[11px] font-bold uppercase tracking-wider text-[#543e34]">
                    <th className="py-4 pl-6 pr-4">Bảng Định Vị Quyền Thao Tác</th>
                    <th className="px-4 py-4 text-center text-[#80141d]">
                      <div>Trưởng Tộc</div>
                      <span className="text-[9.5px] font-normal lowercase tracking-normal text-[#80141d]/80">
                        (Toàn quyền quản trị)
                      </span>
                    </th>
                    <th className="px-4 py-4 text-center">
                      <div>Ban Tộc Viên</div>
                      <span className="text-[9.5px] font-normal lowercase tracking-normal text-[#715b50]">
                        (Ghi chép & quản lý)
                      </span>
                    </th>
                    <th className="px-4 py-4 text-center">
                      <div>Thành Viên</div>
                      <span className="text-[9.5px] font-normal lowercase tracking-normal text-[#715b50]">
                        (Xem & đóng góp)
                      </span>
                    </th>
                    <th className="py-4 pl-4 pr-6 text-center">
                      <div>Khách Quyền</div>
                      <span className="text-[9.5px] font-normal lowercase tracking-normal text-[#715b50]">
                        (Xem ngoài họ)
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebdcd0]">
                  {permissions.map((row, idx) => (
                    <tr
                      key={idx}
                      className="transition-colors hover:bg-[#faefe3]/60"
                    >
                      <td className="py-3.5 pl-6 pr-4 font-medium text-[#2b1b15]">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-[#80141d]">
                            check_small
                          </span>
                          <span>{row.feature}</span>
                        </div>
                      </td>
                      {row.roles.map((allowed, rIdx) => (
                        <td
                          key={rIdx}
                          className={`px-4 py-3.5 text-center ${
                            rIdx === 0 ? 'bg-[#faefe3]/50 font-bold text-[#80141d]' : ''
                          }`}
                        >
                          {allowed ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1b6b3e]/10 text-[#1b6b3e]">
                              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                            </span>
                          ) : (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#decab7]/30 text-[#b59e8e]">
                              <span className="material-symbols-outlined text-[14px]">remove</span>
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: QUY TRÌNH PHỤC CHẾ ẢNH & NHẬT KÝ QUẢN TRỊ (2 CARDS)
            ========================================================= */}
        <section className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-2">
            {/* Card Left: Tiêu chuẩn Đạo đức AI & Phục chế di ảnh */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    TIÊU CHUẨN ĐẠO ĐỨC AI (ETHICS)
                  </span>
                  <span className="rounded-full border border-[#dbcaa8] bg-[#f2e7db] px-2.5 py-0.5 text-[10px] font-bold text-[#715b50]">
                    Minh bạch thuật toán
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-2xl font-bold text-[#2b1b15]">
                  Quy Trình Phục Chế Ảnh Tiền Nhân
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6c5549]">
                  Hình ảnh gốc được xử lý trong vùng đệm cô lập, đảm bảo an toàn tuyệt đối. Chúng tôi cam kết không lưu trữ bản gốc trên máy chủ sau khi xử lý xong.
                </p>

                {/* Sepia Family Archive Box */}
                <div className="relative mt-6 overflow-hidden rounded-xl border border-[#d9c4b0] bg-[#2b1b15] shadow-inner">
                  <div className="relative flex h-52 w-full items-center justify-center bg-gradient-to-b from-[#3d271f] to-[#1c120e]">
                    {/* Simulated archival family photo artwork */}
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <span className="material-symbols-outlined text-[54px] text-[#dbcaa8] opacity-60">
                        photo_camera_front
                      </span>
                      <p className="mt-2 font-serif text-[14px] font-semibold text-[#f5e9dc]">
                        Ảnh Cổ Gia Đình Việt Nam Thế Kỷ XX
                      </p>
                      <span className="mt-1 text-[11px] italic text-[#d4baa4]">
                        Di ảnh Đại gia đình Cụ Cố & Hậu duệ đời thứ 4 (Năm 1948)
                      </span>
                    </div>

                    {/* Tag badge overlay */}
                    <div className="absolute bottom-3 left-3 rounded-md bg-[#2b1b15]/90 px-3 py-1 text-[10px] font-medium text-white shadow">
                      Độ nét gốc: Phim đen trắng · gãy góc/ố vàng
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#ebdcd0] pt-4">
                <span className="text-[12px] font-semibold text-[#543e34]">
                  Tổ: Cụ Nguyễn Khắc Hoan (1864 – 1928)
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('phuc-che-ai')}
                  className="rounded-lg border border-[#80141d] bg-[#faefe3] px-3.5 py-1.5 text-[11.5px] font-bold text-[#80141d] hover:bg-[#80141d] hover:text-white transition-colors"
                >
                  Thử Phục Chế AI
                </button>
              </div>
            </div>

            {/* Card Right: Nhật ký quản trị hệ thống (Audit Log) */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    NHẬT KÝ QUẢN TRỊ HỆ THỐNG (AUDIT LOG)
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#1b6b3e]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#1b6b3e]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1b6b3e] animate-pulse" />
                    <span>Thời gian thực (Live)</span>
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-2xl font-bold text-[#2b1b15]">
                  Kiểm Toán Hành Vi & Nhật Ký Sự Kiện
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6c5549]">
                  Ghi lại từng thao tác theo thời gian, bảo vệ tính trung thực của phả hệ gia tộc.
                </p>

                {/* Event list */}
                <div className="mt-6 divide-y divide-[#ebdcd0] rounded-xl border border-[#dec9b6] bg-[#fbf5ee]">
                  <div className="flex items-center justify-between p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#80141d] text-white text-[12px] font-bold">
                        ĐK
                      </span>
                      <div>
                        <strong className="block text-[12px] font-bold text-[#2b1b15]">
                          Đặng Văn Khoa (Trưởng Tộc)
                        </strong>
                        <span className="text-[11px] text-[#715b50]">
                          Xuất toàn bộ cây gia phả ra định dạng GEDCOM
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#a07a68]">4 phút trước</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c9892c] text-white text-[12px] font-bold">
                        TQ
                      </span>
                      <div>
                        <strong className="block text-[12px] font-bold text-[#2b1b15]">
                          Nguyễn Thục Quyên (Ban Tộc Viên)
                        </strong>
                        <span className="text-[11px] text-[#715b50]">
                          Duyệt 4 ảnh di sản mới vào Album Kỷ vật Chi 2
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#a07a68]">12 phút trước</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a6b57] text-white text-[12px] font-bold">
                        TT
                      </span>
                      <div>
                        <strong className="block text-[12px] font-bold text-[#2b1b15]">
                          Đặng Thành Trung (Thành Viên)
                        </strong>
                        <span className="text-[11px] text-[#715b50]">
                          Thắp hương tưởng niệm ngày giỗ Cụ Cố
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#a07a68]">1 giờ trước</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2b1b15] text-white">
                        <span className="material-symbols-outlined text-[16px]">shield</span>
                      </span>
                      <div>
                        <strong className="block text-[12px] font-bold text-[#80141d]">
                          HỆ THỐNG TỰ ĐỘNG
                        </strong>
                        <span className="text-[11px] text-[#715b50]">
                          Khóa tài khoản xâm nhập sai mật khẩu 5 lần liên tiếp
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#a07a68]">Hôm qua, 18:34</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-6 border-t border-[#ebdcd0] pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('admin-nhat-ky-audit')}
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-[#80141d] hover:underline"
                >
                  <span>Xem toàn bộ nhật ký sự kiện</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: 2 HIGHLIGHT CARDS (XUẤT DI SẢN & TIÊU HỦY AN TOÀN)
            ========================================================= */}
        <section className="bg-[#f7eee2] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] gap-8 md:grid-cols-2">
            {/* Card 1: Toàn quyền xuất di sản */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faefe3] text-[#80141d]">
                <span className="material-symbols-outlined text-[24px]">folder_zip</span>
              </div>

              <h3 className="mt-5 font-serif text-2xl font-bold text-[#2b1b15]">
                Toàn Quyền Xuất Di Sản
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#6c5549]">
                Dữ liệu không bao giờ bị ràng buộc với nền tảng. Khi cần, Trưởng tộc có thể tải toàn bộ tệp tin tư liệu gia tộc về máy tính để lưu trữ ngoại tuyến độc lập, phục vụ cho việc in ấn phả ký, gia phả dạng bạt hoặc chuyển đổi sang các nền tảng khác.
              </p>

              {/* Supported formats */}
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold text-[#543e34]">
                <span className="rounded-lg border border-[#dbcaa8] bg-[#f5e9dc] px-3 py-1.5">
                  Xuất tệp GEDCOM chuẩn quốc tế
                </span>
                <span className="rounded-lg border border-[#dbcaa8] bg-[#f5e9dc] px-3 py-1.5">
                  File sách PDF bìa cứng sắc nét
                </span>
                <span className="rounded-lg border border-[#dbcaa8] bg-[#f5e9dc] px-3 py-1.5">
                  Bản in phả đồ lớn (10m x 2m)
                </span>
              </div>

              <div className="mt-6 border-t border-[#ebdcd0] pt-5">
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#80141d] px-5 py-2.5 text-[12px] font-bold text-white shadow transition-all hover:bg-[#680f16] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Tải dữ liệu mẫu xuất chuẩn GEDCOM</span>
                </button>
              </div>
            </div>

            {/* Card 2: Quyền Quên & Tiêu Hủy An Toàn */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faefe3] text-[#80141d]">
                <span className="material-symbols-outlined text-[24px]">delete_forever</span>
              </div>

              <h3 className="mt-5 font-serif text-2xl font-bold text-[#2b1b15]">
                Quyền Quên & Tiêu Hủy An Toàn
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#6c5549]">
                Chúng tôi tôn trọng tuyệt đối quyền riêng tư gia tộc. Trong trường hợp dòng họ quyết định ngừng sử dụng dịch vụ, quy trình tiêu hủy an toàn sẽ được kích hoạt với thời gian chờ 30 ngày để đề phòng các sự cố xóa ngoài ý muốn.
              </p>

              {/* DOD Callout */}
              <div className="mt-5 rounded-xl border border-[#decab7] bg-[#f5e9dc] p-3 text-[11px] text-[#715b50]">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#80141d] shrink-0 mt-0.5">
                    verified
                  </span>
                  <span>
                    Toàn bộ dữ liệu đám mây, sao lưu dự phòng và cơ sở dữ liệu sẽ được xóa sạch theo tiêu chuẩn DoD 5220.22-M.
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-[#ebdcd0] pt-5">
                <button
                  type="button"
                  onClick={() => onNavigate('bao-mat-tai-khoan')}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#ceb8a5] bg-[#fbf6ef] px-5 py-2.5 text-[12px] font-bold text-[#543e34] shadow-2xs transition-all hover:bg-[#ede0d1] hover:text-[#80141d] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">gavel</span>
                  <span>Quy trình & Điều khoản xóa gia phả</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: CÂU HỎI VỀ AN NINH & QUYỀN RIÊNG TƯ (FAQ)
            ========================================================= */}
        <section className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[860px]">
            {/* Header */}
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                MINH BẠCH & TẬN TÂM
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                Câu Hỏi Về An Ninh & Quyền Riêng Tư
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-[#6c5549]">
                Giải đáp thắc mắc phổ biến nhất của các bậc trưởng tộc và người phụng sự gia tộc.
              </p>
            </div>

            {/* Accordion list */}
            <div className="mt-10 space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] shadow-2xs transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[#faefe3]"
                    >
                      <span className="font-serif text-[15px] font-bold text-[#2b1b15]">
                        {faq.question}
                      </span>
                      <span
                        className={`material-symbols-outlined ml-4 text-[20px] text-[#80141d] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#ebdcd0] bg-[#fbf5ee] px-5 pb-5 pt-3 text-[13px] leading-relaxed text-[#6c5549]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: EMERGENCY SUPPORT CALLOUT BAR
            ========================================================= */}
        <section className="bg-[#f7eee2] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs md:flex-row md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#80141d] text-white shadow-md">
                  <span className="material-symbols-outlined text-[28px]">support_agent</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    CẦN TRAO ĐỔI TRỰC TIẾP VỚI CHUYÊN GIA?
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2b1b15]">
                    Tư Vấn An Ninh & Pháp Lý Di Sản
                  </h3>
                  <p className="text-[12px] text-[#715b50]">
                    Hỗ trợ riêng cho các Trưởng tộc, Trưởng phái và Người phụ trách số hóa dòng họ.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="rounded-xl border border-[#ceb8a5] bg-[#fbf5ee] px-4 py-2.5 text-[12px] font-bold text-[#543e34] shadow-2xs hover:bg-[#ede0d1] hover:text-[#80141d] transition-all"
                >
                  Gửi yêu cầu bảo mật
                </button>
                <a
                  href="tel:19006886"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#80141d] px-5 py-2.5 text-[12px] font-bold text-white shadow transition-all hover:bg-[#680f16]"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Hotline 1900 6886</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
};