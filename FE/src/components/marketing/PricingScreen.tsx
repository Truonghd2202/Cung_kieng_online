import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';
import { MarketingShell } from './MarketingShell.tsx';

interface Props {
  onNavigate: (screen: ScreenType) => void;
  onLogout?: () => void;
}

export const PricingScreen: React.FC<Props> = ({ onNavigate, onLogout }) => {
  // Billing cycle toggle: annual (20% discount) vs monthly
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Tôi có bị mất dữ liệu nếu hủy hoặc tạm ngưng gia hạn không?',
      answer:
        'Hoàn toàn không. Ngay cả khi tạm ngưng gói trả phí, toàn bộ cây gia phả và hình ảnh di sản của gia đình bạn vẫn được lưu giữ an toàn vĩnh viễn ở trạng thái chỉ đọc (Read-only). Bạn có thể kích hoạt lại bất kỳ lúc nào mà không sợ thất lạc thông tin.',
    },
    {
      question: 'Tín chỉ AI phục chế ảnh tính như thế nào và có cộng dồn không?',
      answer:
        'Mỗi bức ảnh phục chế 4K hoặc tách lớp ố mốc tương ứng với 1 tín chỉ AI. Đối với gói Gia Đình và Di Sản, các tín chỉ chưa sử dụng hết trong tháng sẽ được tự động cộng dồn sang chu kỳ tiếp theo, đảm bảo tối đa quyền lợi của gia đình.',
    },
    {
      question: 'Làm sao để mời các cụ cao niên trong gia đình sử dụng dễ dàng?',
      answer:
        'Thích Cúng Kiếng được thiết kế với giao diện phông chữ to rõ, tương phản cao, thao tác chạm tối giản. Ngoài ra, con cháu có thể in mã QR gia phả hoặc xuất sách bản in bạt khổ lớn để các cụ xem trực tiếp mà không cần thiết bị thông minh.',
    },
    {
      question: 'Dữ liệu gia tộc có bị chia sẻ công khai ra ngoài không?',
      answer:
        'Tuyệt đối không. Không gian gia tộc là không gian đóng 100% riêng tư. Chỉ những người có thư mời từ Trưởng tộc mới có quyền xem hoặc tương tác. Hệ thống tuân thủ bảo mật cấp quân đội AES-256 và không bao giờ chia sẻ dữ liệu cho bên thứ ba.',
    },
  ];

  return (
    <MarketingShell currentScreen="pricing" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="bg-[#f7eee2] text-[#2b1b15] selection:bg-[#ecd4c0] selection:text-[#4a1217]">
        {/* =========================================================
            SECTION 1: HERO / PAGE HEADLINE & ANNUAL TOGGLE
            ========================================================= */}
        <section className="relative overflow-hidden bg-[#f7eee2] px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10 text-center">
          {/* Decorative concentric rings */}
          <div className="pointer-events-none absolute -left-20 top-0 h-[460px] w-[460px] rounded-full border border-[#e4d3c2] opacity-60" />
          <div className="pointer-events-none absolute -right-20 top-10 h-[460px] w-[460px] rounded-full border border-[#e4d3c2] opacity-60" />

          <div className="mx-auto max-w-[1240px]">
            {/* Heritage Subtitle Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f2e7db] px-3.5 py-1 text-[11px] font-bold text-[#80141d] shadow-2xs">
              <span className="material-symbols-outlined text-[14px]">history_edu</span>
              <span>KẾ THỪA TRUYỀN THỐNG • TRƯỜNG TỒN NGÀN NĂM</span>
            </div>

            {/* Main Headline */}
            <h1 className="mx-auto mt-4 max-w-4xl font-serif text-3xl font-bold leading-[1.2] text-[#2b1b15] sm:text-4xl lg:text-[44px]">
              Bảng Giá Phụng Sự - Đầu Tư Trọn Vẹn Cho Ký Ức Gia Tộc
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6c5549] sm:text-[15px]">
              Mức phí minh bạch, không phí ẩn. Giúp gia đình bạn lưu giữ gia phả, ký ức tiền nhân và cội nguồn mãi mãi cho thế hệ mai sau.
            </p>

            {/* Toggle Switch: Annual vs Monthly */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center rounded-full border border-[#dbcaa8] bg-[#fbf5ee] p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setIsAnnual(true)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-bold transition-all duration-200 ${
                    isAnnual
                      ? 'bg-[#80141d] text-white shadow-xs'
                      : 'text-[#6c5549] hover:text-[#80141d]'
                  }`}
                >
                  <span>Thanh toán năm</span>
                  <span className={`rounded-full px-1.5 py-0.2 text-[9.5px] font-bold ${
                    isAnnual ? 'bg-[#c9892c] text-white' : 'bg-[#e8d5c4] text-[#80141d]'
                  }`}>
                    -20%
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAnnual(false)}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all duration-200 ${
                    !isAnnual
                      ? 'bg-[#80141d] text-white shadow-xs'
                      : 'text-[#6c5549] hover:text-[#80141d]'
                  }`}
                >
                  Thanh toán tháng
                </button>
              </div>

              {/* Promo Callout */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f2e7db] px-3.5 py-1 text-[11px] font-bold text-[#80141d]">
                <span className="material-symbols-outlined text-[13px] text-[#c9892c]">auto_awesome</span>
                <span>Tặng 100 Tín chỉ AI phục chế ảnh cổ khi thanh toán năm</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: 3 PRICING TIERS (KHỞI ĐẦU, GIA ĐÌNH, DI SẢN)
            ========================================================= */}
        <section className="bg-[#f7eee2] px-4 pb-16 pt-2 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto grid max-w-[1240px] items-stretch gap-6 md:grid-cols-3">
            {/* ---------------- CARD 1: CƠ BẢN THỬ NGHIỆM ---------------- */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-7">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a6f62]">
                    CƠ BẢN THỬ NGHIỆM
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2e7db] text-[#80141d]">
                    <span className="material-symbols-outlined text-[18px]">explore</span>
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl font-bold text-[#2b1b15]">
                  Khởi Đầu Khám Phá
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                  Phù hợp gia đình nhỏ muốn trải nghiệm phục chế vài tấm ảnh cổ và bắt đầu kết nối cây gia phả thế hệ đầu.
                </p>

                {/* Price */}
                <div className="mt-5 border-y border-[#ebdcd0] py-4">
                  <div className="flex items-baseline gap-1">
                    <strong className="font-serif text-3xl font-bold text-[#2b1b15]">0 đ</strong>
                    <span className="text-[12px] text-[#715b50]">/ tháng</span>
                  </div>
                  <span className="mt-1 block text-[11px] text-[#8a6f62]">
                    Miễn phí trọn đời • Không cần thẻ tín dụng
                  </span>
                </div>

                {/* Features */}
                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#80141d]">
                    ĐẶC QUYỀN BAO GỒM
                  </p>
                  <ul className="mt-3 space-y-2.5 text-[12px] text-[#543e34]">
                    {[
                      'Tối đa 25 thành viên trong phả hệ',
                      '2 GB lưu trữ hình ảnh & tài liệu',
                      '10 tín chỉ AI phục chế ảnh bạc màu',
                      'Sở hữu tối đa 2 di vật gia tộc',
                      'Phân quyền cơ bản 2 cấp',
                      'Hỗ trợ qua cộng đồng & tài liệu',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#1b6b3e] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="w-full rounded-xl border border-[#dec9b6] bg-[#f5e9dc] py-2.5 text-[12px] font-bold text-[#80141d] shadow-2xs transition-all hover:bg-[#ede0d1] active:scale-95"
                >
                  Đăng Ký Miễn Phí
                </button>
              </div>
            </div>

            {/* ---------------- CARD 2: GÓI GIA ĐÌNH (HIGHLIGHTED) ---------------- */}
            <div className="relative flex flex-col justify-between rounded-2xl border-2 border-[#80141d] bg-[#fbf6ef] p-6 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl sm:p-7 md:-mt-2 md:mb-[-8px]">
              {/* Highlight Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#80141d] px-4 py-1 text-[10px] font-bold text-white shadow-md">
                ★ KHUYÊN DÙNG CHO GIA TỘC
              </div>

              <div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#80141d]">
                    THỊNH VƯỢNG ĐA THẾ HỆ
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#80141d] text-white">
                    <span className="material-symbols-outlined text-[18px]">groups</span>
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl font-bold text-[#80141d]">
                  Gói Gia Đình
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                  Dành riêng cho đại gia đình 4 – 5 đời cần kết nối bền chặt, ghi nhớ ngày giỗ tiền nhân và phục chế toàn bộ album ảnh cũ.
                </p>

                {/* Price */}
                <div className="mt-5 border-y border-[#ebdcd0] py-4 bg-[#faefe2]/60 -mx-6 px-6 sm:-mx-7 sm:px-7">
                  <div className="flex items-baseline gap-1">
                    <strong className="font-serif text-3xl font-bold text-[#80141d]">
                      {isAnnual ? '119.000 đ' : '149.000 đ'}
                    </strong>
                    <span className="text-[12px] text-[#715b50]">/ tháng</span>
                  </div>
                  <span className="mt-1 block text-[11px] font-medium text-[#715b50]">
                    {isAnnual
                      ? 'Số theo năm: 1.428.000 đ/12 tháng (Tiết kiệm 360.000 đ)'
                      : 'Thanh toán linh hoạt từng tháng'}
                  </span>
                </div>

                {/* Features */}
                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#80141d]">
                    TOÀN BỘ QUYỀN LỢI GÓI CƠ BẢN, CỘNG THÊM:
                  </p>
                  <ul className="mt-3 space-y-2.5 text-[12px] text-[#2b1b15]">
                    {[
                      'Tối đa 150 thành viên (4 – 5 thế hệ)',
                      '50 GB dung lượng lưu trữ tốc độ cao',
                      '150 tín chỉ AI phục chế chân dung/tháng',
                      'Không giới hạn di vật & sắc phong số',
                      'Nhắc giỗ tự động qua Zalo/SMS cho toàn tộc',
                      'Xuất file phả đồ PDF chuẩn in ấn khổ lớn',
                      'Hỗ trợ kỹ thuật gia đình tận tâm 24/7',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#80141d] shrink-0 mt-0.5 font-bold">
                          check_circle
                        </span>
                        <span className={idx < 3 ? 'font-semibold' : ''}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#80141d] py-3 text-[12.5px] font-bold text-white shadow-md transition-all hover:bg-[#680f16] hover:shadow-lg active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Bắt Đầu Dùng Thử 14 Ngày</span>
                </button>
                <span className="mt-1.5 block text-center text-[10.5px] text-[#715b50]">
                  Hủy linh hoạt bất cứ lúc nào
                </span>
              </div>
            </div>

            {/* ---------------- CARD 3: QUY MÔ CHI PHÁI & ĐẠI TỘC ---------------- */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-7">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a6f62]">
                    QUY MÔ CHI PHÁI & ĐẠI TỘC
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2e7db] text-[#80141d]">
                    <span className="material-symbols-outlined text-[18px]">temple_buddhist</span>
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl font-bold text-[#2b1b15]">
                  Gói Di Sản
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6c5549]">
                  Giải pháp toàn vẹn cho nhà thờ họ, từ đường chi tộc trăm nhánh cần lưu giữ phả ký trường tồn và xuất bản gia phả lưu truyền.
                </p>

                {/* Price */}
                <div className="mt-5 border-y border-[#ebdcd0] py-4">
                  <div className="flex items-baseline gap-1">
                    <strong className="font-serif text-3xl font-bold text-[#2b1b15]">
                      {isAnnual ? '319.000 đ' : '399.000 đ'}
                    </strong>
                    <span className="text-[12px] text-[#715b50]">/ tháng</span>
                  </div>
                  <span className="mt-1 block text-[11px] text-[#8a6f62]">
                    {isAnnual
                      ? 'Số theo năm: 3.828.000 đ (Tiết kiệm 960.000 đ)'
                      : 'Thanh toán linh hoạt từng tháng'}
                  </span>
                </div>

                {/* Features */}
                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#80141d]">
                    ĐẶC QUYỀN CAO CẤP TỘC ƯỚC:
                  </p>
                  <ul className="mt-3 space-y-2.5 text-[12px] text-[#543e34]">
                    {[
                      'Không giới hạn số lượng thành viên con cháu',
                      '500 GB dung lượng vĩnh viễn (hỗ trợ nâng thêm)',
                      '500 tín chỉ AI phục chế di ảnh 4K & tô màu/kỳ',
                      'Bảo tàng kỷ vật, sơ đồ hóa đa góc nhìn',
                      'Chuyên viên phân trang cây phả hệ tận nơi',
                      'Đặc quyền xuất bản sách gia phả bìa cứng & file in GEDCOM',
                      'Bảo mật dữ liệu chuẩn mã hóa riêng biệt',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#1b6b3e] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span className={idx === 4 ? 'font-bold text-[#80141d]' : ''}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="flex w-full items-center justify-center gap-1 rounded-xl bg-[#6d1319] py-2.5 text-[12px] font-bold text-white shadow-2xs transition-all hover:bg-[#80141d] active:scale-95"
                >
                  <span>Đăng Ký Gói Di Sản</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: CÔNG NGHỆ AI THUẦN VIỆT CHO DI SẢN (PHỤC HỒI)
            ========================================================= */}
        <section className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs sm:p-8 lg:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.3fr]">
                {/* Left Column: Info & Stats */}
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#80141d]">
                    <span className="material-symbols-outlined text-[15px]">auto_fix_high</span>
                    <span>CÔNG NGHỆ AI THUẦN VIỆT CHO DI SẢN</span>
                  </div>

                  <h2 className="mt-2.5 font-serif text-2xl font-bold leading-tight text-[#2b1b15] sm:text-3xl">
                    Phục Hồi Sắc Nét Di Ảnh Cụ Cố Sau Nửa Thế Kỷ
                  </h2>

                  <p className="mt-3 text-[13px] leading-relaxed text-[#6c5549]">
                    Tất cả các gói trả phí đều đi kèm công nghệ khử ố mốc, nối liền vết nứt rách và tái tạo màu áo lam truyền thống cho ảnh chụp từ thế kỷ trước. Ký ức tiền nhân sống mãi trong diện mạo vẹn nguyên.
                  </p>

                  {/* 2 Stat Boxes */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#dec9b6] bg-[#fbf5ee] p-3.5">
                      <strong className="block font-serif text-2xl font-bold text-[#80141d]">
                        99.8%
                      </strong>
                      <span className="mt-1 block text-[11px] text-[#715b50]">
                        Độ chính xác nét mặt tiền nhân
                      </span>
                    </div>

                    <div className="rounded-xl border border-[#dec9b6] bg-[#fbf5ee] p-3.5">
                      <strong className="block font-serif text-2xl font-bold text-[#80141d]">
                        100 Năm
                      </strong>
                      <span className="mt-1 block text-[11px] text-[#715b50]">
                        Cam kết lưu trữ đám mây an toàn
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: 2 Visual Artifact Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Photo 1: Cụ Ông Nguyễn Văn Phúc */}
                  <div className="group overflow-hidden rounded-xl border border-[#dec9b6] bg-[#fbf5ee] shadow-2xs">
                    <div className="relative h-44 w-full overflow-hidden bg-[#2b1b15]">
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#3a251e] to-[#1c120e] p-4 text-center">
                        <span className="material-symbols-outlined text-[48px] text-[#dbcaa8] opacity-70">
                          portrait
                        </span>
                      </div>
                      <span className="absolute left-2.5 top-2.5 rounded bg-[#2b1b15]/90 px-2 py-0.5 text-[9.5px] font-bold text-white shadow">
                        Phục chế nét từng nếp nhăn
                      </span>
                    </div>
                    <div className="p-3.5">
                      <strong className="font-serif text-[14px] font-bold text-[#2b1b15]">
                        Cụ Ông Nguyễn Văn Phúc (1912 – 1988)
                      </strong>
                      <span className="mt-0.5 block text-[11px] text-[#715b50]">
                        Đời thứ 11 · Ngành phái Đông mỹ
                      </span>
                    </div>
                  </div>

                  {/* Photo 2: Gia Phả Gốc Dòng Tộc */}
                  <div className="group overflow-hidden rounded-xl border border-[#dec9b6] bg-[#fbf5ee] shadow-2xs">
                    <div className="relative h-44 w-full overflow-hidden bg-[#2b1b15]">
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#3a251e] to-[#1c120e] p-4 text-center">
                        <span className="material-symbols-outlined text-[48px] text-[#dbcaa8] opacity-70">
                          auto_stories
                        </span>
                      </div>
                      <span className="absolute left-2.5 top-2.5 rounded bg-[#80141d]/90 px-2 py-0.5 text-[9.5px] font-bold text-white shadow">
                        Phục dựng 3D sắc nét
                      </span>
                    </div>
                    <div className="p-3.5">
                      <strong className="font-serif text-[14px] font-bold text-[#2b1b15]">
                        Gia Phả Gốc Dòng Tộc Chi 2
                      </strong>
                      <span className="mt-0.5 block text-[11px] text-[#715b50]">
                        248 Thành viên ghi nhận · Lưu trữ 1950s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: BẢNG SO SÁNH CHI TIẾT QUYỀN LỢI
            ========================================================= */}
        <section className="bg-[#f7eee2] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            {/* Header */}
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                  MINH BẠCH & CHI TIẾT
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                  Bảng So Sánh Chi Tiết Quyền Lợi
                </h2>
              </div>
              <span className="text-[11px] italic text-[#8a6f62]">
                * Đã áp dụng mức chiết khấu theo chuẩn mực cao cấp các chi phái gia tộc.
              </span>
            </div>

            {/* Table */}
            <div className="mt-8 overflow-x-auto rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] shadow-2xs">
              <table className="w-full min-w-[760px] border-collapse text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-[#dec9b6] bg-[#f2e7db] text-[11.5px] font-bold uppercase tracking-wider text-[#543e34]">
                    <th className="py-4 pl-6 pr-4">Tính Năng Cốt Lõi</th>
                    <th className="px-4 py-4">
                      <div>Khởi Đầu Khám Phá</div>
                      <span className="text-[10px] font-normal lowercase tracking-normal text-[#715b50]">
                        0 đ / tháng
                      </span>
                    </th>
                    <th className="px-4 py-4 bg-[#faefe3] text-[#80141d]">
                      <div>Gia Đình (Phổ Biến)</div>
                      <span className="text-[10px] font-normal lowercase tracking-normal text-[#80141d]/80">
                        119.000 đ / tháng
                      </span>
                    </th>
                    <th className="py-4 pl-4 pr-6">
                      <div>Di Sản Dòng Họ</div>
                      <span className="text-[10px] font-normal lowercase tracking-normal text-[#715b50]">
                        319.000 đ / tháng
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebdcd0]">
                  {[
                    {
                      feature: 'Thành viên gia đình',
                      icon: 'groups',
                      tiers: ['25 thành viên', '150 thành viên', 'Không giới hạn'],
                    },
                    {
                      feature: 'Dung lượng lưu trữ',
                      icon: 'cloud_upload',
                      tiers: ['2 GB lưu trữ', '50 GB lưu trữ', '500 GB (mở rộng linh hoạt)'],
                    },
                    {
                      feature: 'Tín chỉ AI phục chế',
                      icon: 'auto_fix_high',
                      tiers: ['10 tín chỉ (Dùng 1 lần)', '150 tín chỉ / mỗi tháng', '500 tín chỉ 4K / tháng'],
                    },
                    {
                      feature: 'Giới hạn kỷ vật số',
                      icon: 'museum',
                      tiers: ['Tối đa 2 kỷ vật', 'Không giới hạn', 'Không giới hạn (Kèm 3D Scan)'],
                    },
                    {
                      feature: 'Phân quyền quản trị',
                      icon: 'shield_person',
                      tiers: ['2 vai trò cơ bản', '4 vai trò chi tiết (Trưởng họ, Thủ bạ, ...)', 'Tùy biến ma trận phân quyền dòng họ'],
                    },
                    {
                      feature: 'Nhắc giỗ tự động',
                      icon: 'notifications_active',
                      tiers: ['Email cơ bản', 'Zalo & SMS gửi đa thành viên', 'Hotline tự động, Zalo & SMS'],
                    },
                    {
                      feature: 'Xuất bản cây gia phả',
                      icon: 'print',
                      tiers: ['File ảnh JPG đơn giản', 'File PDF vector chuẩn in A3/A0', 'Sách in da bò mạ vàng & GEDCOM'],
                    },
                    {
                      feature: 'Kênh chăm sóc & hỗ trợ',
                      icon: 'support_agent',
                      tiers: ['Trung tâm trợ giúp trực tuyến', 'Hỗ trợ riêng qua Zalo/Email 24/7', 'Chuyên viên phả hệ phụng sự riêng'],
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-[#faefe3]/50">
                      <td className="py-3.5 pl-6 pr-4 font-semibold text-[#2b1b15]">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-[#80141d]">
                            {row.icon}
                          </span>
                          <span>{row.feature}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[#543e34]">{row.tiers[0]}</td>
                      <td className="px-4 py-3.5 bg-[#faefe3]/50 font-bold text-[#80141d]">
                        {row.tiers[1]}
                      </td>
                      <td className="py-3.5 pl-4 pr-6 text-[#543e34] font-medium">{row.tiers[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: TESTIMONIAL QUOTE CARD
            ========================================================= */}
        <section className="bg-[#f7eee2] px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-6 shadow-2xs sm:flex-row sm:p-8">
              {/* Elder Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#80141d] text-white shadow-md ring-4 ring-[#ecd5c4]">
                <span className="material-symbols-outlined text-[40px]">person</span>
              </div>

              {/* Quote text */}
              <div>
                <blockquote className="font-serif text-[15px] italic leading-relaxed text-[#2b1b15] sm:text-[16px]">
                  &ldquo;Từ ngày cả họ đăng ký Gói Gia Đình, con cháu ở Sài Gòn, Hà Nội hay định cư nước ngoài đều mở máy xem được ngày giỗ cụ, hình chụp mộ phần và gia phả ông bà. Ký ức gia đình là của để dành quý giá nhất.&rdquo;
                </blockquote>
                <p className="mt-2 text-[12px] font-bold text-[#80141d]">
                  Ông Lê Quang Vinh <span className="font-normal text-[#715b50]">— Trưởng Ban Chuyên Tộc Họ Lê, Hải Dương</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: CÂU HỎI THƯỜNG GẶP VỀ DỊCH VỤ PHỤNG SỰ
            ========================================================= */}
        <section className="border-t border-[#e2d0be] bg-[#f2e7db] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[860px]">
            {/* Header */}
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80141d]">
                GIẢI ĐÁP MỐI QUAN TÂM
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#2b1b15] sm:text-4xl">
                Câu Hỏi Thường Gặp Về Dịch Vụ Phụng Sự
              </h2>
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
            SECTION 7: EMERGENCY / CONSULTATION CALLOUT
            ========================================================= */}
        <section className="bg-[#f7eee2] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="rounded-2xl border border-[#dec9b6] bg-[#fbf6ef] p-8 text-center shadow-2xs sm:p-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#80141d] text-white shadow-md">
                <span className="material-symbols-outlined text-[28px]">handshake</span>
              </div>

              <h2 className="mt-5 font-serif text-2xl font-bold text-[#2b1b15] sm:text-3xl">
                Cần Hỗ Trợ Tư Vấn Cho Chi Tộc Lớn Hơn?
              </h2>

              <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed text-[#6c5549] sm:text-[14px]">
                Đội ngũ nghiên cứu văn hóa & phả ký của chúng tôi sẵn sàng đồng hành số hóa tận nơi cho các từ đường, lăng miếu và nhà thờ họ trên khắp 63 tỉnh thành.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href="tel:19006886"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#80141d] px-6 py-3 text-[12.5px] font-bold text-white shadow transition-all hover:bg-[#680f16] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[17px]">call</span>
                  <span>Đặt Lịch Tư Vấn Phả Hệ Miễn Phí</span>
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('cay-pha-he-25d')}
                  className="rounded-xl border border-[#ceb8a5] bg-[#fbf5ee] px-6 py-3 text-[12.5px] font-bold text-[#543e34] shadow-2xs transition-all hover:bg-[#ede0d1] hover:text-[#80141d] active:scale-95"
                >
                  Xem Thử Mẫu Gia Phả Chuẩn
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
};