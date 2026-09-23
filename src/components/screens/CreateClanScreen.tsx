import React, { useState } from 'react';
import type { ScreenType, ClanData } from '@/src/types.ts';

interface CreateClanScreenProps {
  onNavigate: (screen: ScreenType) => void;
  clanData: ClanData;
  setClanData: React.Dispatch<React.SetStateAction<ClanData>>;
}

export const CreateClanScreen: React.FC<CreateClanScreenProps> = ({
  onNavigate,
  clanData,
  setClanData,
}) => {
  const [spaceName, setSpaceName] = useState(
    clanData.spaceName || 'Đại Gia Tộc Nguyễn Phục Anh – Chi Trực Lăng'
  );
  const [surname, setSurname] = useState(clanData.surname || 'Nguyễn (阮)');
  const [branch, setBranch] = useState(
    clanData.branch || 'Chi 3 - Hậu Duệ Tiền Hiền Khai Hoang'
  );
  const [provinceOrigin, setProvinceOrigin] = useState(
    clanData.provinceOrigin || 'Huyện Nam Trực, Tỉnh Nam Định (Xứ Sơn Nam Hạ)'
  );
  const [villageAncestral, setVillageAncestral] = useState(
    clanData.villageAncestral || 'Làng Trực Lăng, Từ Đường Tộc Nguyễn Phục Anh'
  );
  const [repName, setRepName] = useState(clanData.repName || 'Nguyễn Phục Tường Cảnh');
  const [repRole, setRepRole] = useState(clanData.repRole || 'Trưởng tộc đời thứ 11');
  const [repPhone, setRepPhone] = useState(clanData.repPhone || '0988 234 567');
  const [smsNotify, setSmsNotify] = useState(true);
  const [motto, setMotto] = useState(
    clanData.motto ||
      'Uống nước nhớ nguồn, ngàn năm cây cội cành hoa nảy nở. Đất Sơn Nam dựng nghiệp cần lao, truyền nối đến nay đã mười bốn đời rạng danh thi thư, giữ tròn đạo hiếu trung phụng thờ tổ tiên.'
  );
  const [privacyLevel, setPrivacyLevel] = useState<'closed' | 'branch' | 'elder'>(
    clanData.privacyLevel || 'closed'
  );
  const [isCommitted, setIsCommitted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCommitted) {
      setToastMessage('Vui lòng xác nhận cam kết gia quy truyền thống trước khi tiếp tục.');
      return;
    }

    setIsLoading(true);
    setToastMessage('Đang ghi chép tộc bạ và khởi tạo không gian...');

    setClanData({
      spaceName,
      surname,
      branch,
      provinceOrigin,
      villageAncestral,
      repName,
      repRole,
      repPhone,
      motto,
      privacyLevel,
    });

    setTimeout(() => {
      setIsLoading(false);
      setToastMessage('Khởi tạo gia tộc thành công! Chuyển tiếp thiết lập gia đình...');
      setTimeout(() => {
        onNavigate('thiet-lap-gia-dinh');
      }, 700);
    }, 900);
  };

  const handleSaveDraft = () => {
    setToastMessage('Đã lưu bản nháp phụng lập vào thiết bị an toàn.');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7eee2] text-[#2b1b15] selection:bg-[#ecd4c0] selection:text-[#4a1217]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#dec9b6] bg-[#2b1b15] px-5 py-3 text-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[#c9892c]">auto_stories</span>
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

          {/* Flow Steps: Badge | Step 1 | Step 2 (ACTIVE) | Step 3 */}
          <div className="hidden items-center justify-center gap-3 sm:flex lg:gap-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3 py-1 text-[11px] font-medium text-[#715b50]">
              <span className="material-symbols-outlined text-[14px] text-[#1b6b3e]">check</span>
              <span>Khởi Tạo Không Gian Phụng Thờ</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('chon-khong-gian')}
                className="px-3 py-1 text-[12px] font-medium text-[#543e34] hover:text-[#80141d] transition-colors"
              >
                Chọn Không Gian
              </button>

              <span className="rounded-full bg-[#80141d] px-4 py-1.5 text-[12px] font-bold text-white shadow-xs">
                Khởi Tạo Gia Tộc
              </span>

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
          MAIN FORM CONTAINER
          ========================================================= */}
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-[960px] space-y-6">
          {/* Top Breadcrumb & Step Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[12px]">
            <button
              type="button"
              onClick={() => onNavigate('chon-khong-gian')}
              className="group inline-flex items-center gap-1.5 font-medium text-[#715b50] hover:text-[#80141d] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:-translate-x-0.5">
                arrow_back
              </span>
              <span>Quay lại lựa chọn không gian</span>
            </button>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#dec9b6] bg-[#f5ece2] px-3.5 py-1 text-[11px] font-bold tracking-wide text-[#80141d]">
              <span className="material-symbols-outlined text-[14px]">menu_book</span>
              <span>BƯỚC 2 / 3: KHỞI TẠO TỘC PHẢ</span>
            </div>
          </div>

          {/* Title Area & Lunar Calendar Seal Widget */}
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end pb-2">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-[#f5ece2] border border-[#dec9b6] px-2.5 py-0.5 text-[11px] font-bold text-[#80141d]">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                <span>SỔ BỘ BỔN TỘC KÝ</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-[34px] font-bold tracking-tight text-[#80141d]">
                Khởi Tạo Không Gian Gia Tộc
              </h1>

              <p className="text-[13px] leading-relaxed text-[#715b50]">
                Điền thông tin cơ bản để xây dựng ngôi nhà chung lưu giữ ký ức, cội nguồn và di huấn truyền đời của các bậc tiền nhân.
              </p>
            </div>

            {/* Heritage Date Card with Circular Compass Seal Watermark */}
            <div className="relative shrink-0 overflow-hidden rounded-2xl border border-[#dec9b6] bg-[#fdf9f4] p-4 pr-7 shadow-xs">
              {/* Circular watermark decoration */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full border-[6px] border-[#dec9b6]/30 opacity-40" />
              <div className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 rounded-full border border-[#c9892c]/40 opacity-40" />

              <div className="relative flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#c9892c]">
                  calendar_month
                </span>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#715b50]">
                    TIẾT KHÍ LẬP PHẢ
                  </span>
                  <strong className="font-serif text-[17px] font-bold text-[#80141d]">
                    Năm Giáp Thìn
                  </strong>
                  <span className="block text-[11px] text-[#715b50]">
                    Tháng Chạp • Ngày Hoàng Đạo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              THE MAIN 6-SECTION FORM CARD
              ========================================================= */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#dec9b6] bg-[#fdf9f4] p-6 sm:p-9 shadow-md space-y-7"
          >
            {/* SECTION 1: Tên Không Gian Gia Đình */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12px]">
                <label className="flex items-center gap-1.5 font-bold text-[#2b1b15]">
                  <span className="h-2 w-2 rounded-full bg-[#80141d]" />
                  <span>Tên không gian gia đình</span>
                  <span className="text-[#80141d]">*</span>
                </label>
                <span className="italic text-[11px] text-[#8a6f62]">
                  Hiển thị trên đầu gia phả &amp; thư thỉnh giỗ
                </span>
              </div>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#80141d]">
                  temple_buddhist
                </span>
                <input
                  type="text"
                  required
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                  placeholder="VD: Đại Gia Tộc Nguyễn Phục Anh – Chi Trực Lăng"
                  className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-3 pl-11 pr-4 text-[13.5px] font-serif font-bold text-[#2b1b15] placeholder:text-[#a07a68] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all shadow-2xs"
                />
              </div>

              <p className="text-[11px] text-[#715b50]">
                Tên trang trọng sẽ được khắc ghi trên các chứng thư, câu đối điện tử và thông báo ngày tế tự hàng năm.
              </p>
            </div>

            {/* SECTION 2: 2. DANH XƯNG DÒNG TỘC & PHÂN CHI */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-[12.5px] font-bold text-[#80141d] uppercase tracking-wide">
                <span className="material-symbols-outlined text-[17px]">account_tree</span>
                <span>2. DANH XƯNG DÒNG TỘC &amp; PHÂN CHI</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Column 1: Họ chính */}
                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                    Họ chính nguyên bản <span className="text-[#80141d]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 pl-3.5 pr-8 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="Nguyễn (阮)">Nguyễn (阮)</option>
                      <option value="Trần (陳)">Trần (陳)</option>
                      <option value="Lê (黎)">Lê (黎)</option>
                      <option value="Phạm (范)">Phạm (范)</option>
                      <option value="Hoàng / Huỳnh (黃)">Hoàng / Huỳnh (黃)</option>
                      <option value="Phan (潘)">Phan (潘)</option>
                      <option value="Vũ / Võ (武)">Vũ / Võ (武)</option>
                      <option value="Đặng (鄧)">Đặng (鄧)</option>
                      <option value="Bùi (裴)">Bùi (裴)</option>
                      <option value="Đỗ (杜)">Đỗ (杜)</option>
                      <option value="Hồ (胡)">Hồ (胡)</option>
                      <option value="Ngô (吳)">Ngô (吳)</option>
                      <option value="Dương (楊)">Dương (楊)</option>
                      <option value="Khác">Họ khác...</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-[#715b50]">
                      expand_more
                    </span>
                  </div>
                  <span className="block text-[10.5px] text-[#715b50]">
                    Tra cứu mẫu tự chữ Nho chuẩn dòng tộc
                  </span>
                </div>

                {/* Column 2: Tên Chi / Nhánh */}
                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                    Tên Chi / Nhánh / Phái phụng sự <span className="text-[#80141d]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="VD: Chi 3 - Hậu Duệ Tiền Hiền Khai Hoang"
                    className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                  />
                  <span className="block text-[10.5px] text-[#715b50]">
                    Phân định thứ bậc trong Đại gia tộc lớn
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 3: 3. NGUYÊN QUÁN & ĐỊA DANH THỜ TỰ GỐC */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12.5px] font-bold text-[#80141d] uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[17px]">location_on</span>
                  <span>3. NGUYÊN QUÁN &amp; ĐỊA DANH THỜ TỰ GỐC</span>
                </div>
                <button
                  type="button"
                  onClick={() => setToastMessage('Đang mở bản đồ địa bạ quy tập hương hỏa...')}
                  className="text-[11px] font-medium text-[#80141d] hover:underline"
                >
                  Bản đồ quy tập hương hỏa
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Column 1: Tỉnh/Thành & Huyện xứ gốc */}
                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                    Tỉnh / Thành phố &amp; Huyện xứ gốc <span className="text-[#80141d]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={provinceOrigin}
                    onChange={(e) => setProvinceOrigin(e.target.value)}
                    placeholder="VD: Huyện Nam Trực, Tỉnh Nam Định (Xứ Sơn Nam Hạ)"
                    className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                  />
                  <span className="block text-[10.5px] text-[#715b50]">
                    Xác lập hệ quy chiếu địa bạ các chi phái ly hương
                  </span>
                </div>

                {/* Column 2: Thôn làng cổ & Từ đường */}
                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                    Thôn làng cổ &amp; Từ đường / Nhà thờ tổ <span className="text-[#80141d]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={villageAncestral}
                    onChange={(e) => setVillageAncestral(e.target.value)}
                    placeholder="VD: Làng Trực Lăng, Từ Đường Tộc Nguyễn Phục Anh"
                    className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                  />
                  <span className="block text-[10.5px] text-[#715b50]">
                    Nơi đặt linh vị, sắc phong và phần mộ liệt tổ liệt tông
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 4: 4. NGƯỜI ĐẠI DIỆN PHỤNG SỰ & BAN TRỊ SỰ */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-[12.5px] font-bold text-[#80141d] uppercase tracking-wide">
                <span className="material-symbols-outlined text-[17px]">groups</span>
                <span>4. NGƯỜI ĐẠI DIỆN PHỤNG SỰ &amp; BAN TRỊ SỰ</span>
              </div>

              {/* Row 1 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                    Họ và tên người đại diện (Trưởng tộc / Người lập phả) <span className="text-[#80141d]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={repName}
                    onChange={(e) => setRepName(e.target.value)}
                    placeholder="VD: Nguyễn Phục Tường Cảnh"
                    className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 px-3.5 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                    Vai vế / Danh xưng gia tộc <span className="text-[#80141d]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={repRole}
                      onChange={(e) => setRepRole(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 pl-3.5 pr-8 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="Trưởng tộc đời thứ 11">Trưởng tộc đời thứ 11</option>
                      <option value="Trưởng tộc / Tộc trưởng">Trưởng tộc / Tộc trưởng</option>
                      <option value="Trưởng chi / Trưởng phái">Trưởng chi / Trưởng phái</option>
                      <option value="Hội đồng gia tộc">Hội đồng gia tộc</option>
                      <option value="Thư ký ban trị sự">Thư ký ban trị sự</option>
                      <option value="Hậu duệ phụng sự">Hậu duệ phụng sự</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-[#715b50]">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold text-[#2b1b15]">
                    Số điện thoại phụng sự &amp; thông báo tế tự khẩn <span className="text-[#80141d]">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#80141d]">
                      call
                    </span>
                    <input
                      type="tel"
                      required
                      value={repPhone}
                      onChange={(e) => setRepPhone(e.target.value)}
                      placeholder="0988 234 567"
                      className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] py-2.5 pl-9 pr-3.5 text-[13px] font-medium text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <label className="flex w-full items-center gap-2.5 rounded-xl border border-[#dec9b6] bg-[#f8ede2] px-3.5 py-2.5 text-[12px] font-medium text-[#2b1b15] cursor-pointer hover:bg-[#faefe3] transition-colors">
                    <input
                      type="checkbox"
                      checked={smsNotify}
                      onChange={(e) => setSmsNotify(e.target.checked)}
                      className="h-4 w-4 rounded accent-[#80141d]"
                    />
                    <span className="material-symbols-outlined text-[17px] text-[#80141d]">
                      forward_to_inbox
                    </span>
                    <span>Đồng bộ lịch cúng &amp; gửi SMS con cháu</span>
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 5: 5. ĐÔI DÒNG TỰ KHẢO & DI HUẤN CỘI NGUỒN */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12.5px] font-bold text-[#80141d] uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[17px]">auto_stories</span>
                  <span>5. ĐÔI DÒNG TỰ KHẢO &amp; DI HUẤN CỘI NGUỒN</span>
                </div>
                <span className="text-[11px] text-[#8a6f62]">
                  Có thể hiệu chỉnh và nối dài sau
                </span>
              </div>

              <textarea
                rows={4}
                value={motto}
                onChange={(e) => setMotto(e.target.value)}
                placeholder="Nhập đôi dòng ghi nhớ cội nguồn, lời răn dạy của tiền nhân..."
                className="w-full rounded-xl border border-[#dec9b6] bg-[#f8ede2] p-3.5 text-[13px] leading-relaxed text-[#2b1b15] focus:border-[#80141d] focus:bg-white focus:outline-none transition-all font-serif"
              />

              <div className="flex items-center justify-between text-[11px] text-[#715b50]">
                <span className="italic">Trích khắc: Tiền cuốn Kim Phả điện tử của Tộc</span>
                <span>{motto.trim().split(/\s+/).filter(Boolean).length} / 1000 từ</span>
              </div>
            </div>

            {/* SECTION 6: 6. MỨC ĐỘ BẢO MẬT & QUYỀN KẾ THỪA PHẢ HỆ */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12.5px] font-bold text-[#80141d] uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[17px]">shield</span>
                  <span>6. MỨC ĐỘ BẢO MẬT &amp; QUYỀN KẾ THỪA PHẢ HỆ</span>
                </div>
                <span className="text-[11px] font-medium text-[#80141d]">
                  Bảo mật gia đạo tuyệt đối
                </span>
              </div>

              {/* 3 Selectable Security Cards */}
              <div className="grid gap-3.5 md:grid-cols-3">
                {/* Card 1: Khép kín gia tộc (Selected) */}
                <button
                  type="button"
                  onClick={() => setPrivacyLevel('closed')}
                  className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                    privacyLevel === 'closed'
                      ? 'border-[#80141d] bg-[#faefe3] shadow-xs ring-1 ring-[#80141d]'
                      : 'border-[#dec9b6] bg-[#f8ede2] hover:bg-[#faefe3]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#80141d]/10 px-2 py-0.5 text-[9.5px] font-bold text-[#80141d]">
                        <span className="material-symbols-outlined text-[12px]">security</span>
                        KHUYÊN DÙNG
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-[#80141d]">
                        {privacyLevel === 'closed' ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                    </div>

                    <strong className="mt-2.5 block text-[13px] font-bold text-[#2b1b15]">
                      Khép kín gia tộc
                    </strong>

                    <p className="mt-1 text-[11px] leading-relaxed text-[#6c5549]">
                      Chỉ thành viên có lời mời kèm mã xác thực đích tôn mới xem được chi tiết sinh lão bệnh tử, hình ảnh bài vị và văn cúng.
                    </p>
                  </div>
                </button>

                {/* Card 2: Nội bộ chi phái */}
                <button
                  type="button"
                  onClick={() => setPrivacyLevel('branch')}
                  className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                    privacyLevel === 'branch'
                      ? 'border-[#80141d] bg-[#faefe3] shadow-xs ring-1 ring-[#80141d]'
                      : 'border-[#dec9b6] bg-[#f8ede2] hover:bg-[#faefe3]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#c9892c]/20 px-2 py-0.5 text-[9.5px] font-bold text-[#8a5714]">
                        <span className="material-symbols-outlined text-[12px]">account_tree</span>
                        CHI PHÁI
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-[#80141d]">
                        {privacyLevel === 'branch' ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                    </div>

                    <strong className="mt-2.5 block text-[13px] font-bold text-[#2b1b15]">
                      Nội bộ chi phái
                    </strong>

                    <p className="mt-1 text-[11px] leading-relaxed text-[#6c5549]">
                      Cho phép con cháu họ hàng mở rộng xem thông tin nhà thờ tổ và 5 đời cao tổ tiền bối; đời gần lưu trữ nội bộ.
                    </p>
                  </div>
                </button>

                {/* Card 3: Nghiêm ngặt Trưởng Ban */}
                <button
                  type="button"
                  onClick={() => setPrivacyLevel('elder')}
                  className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                    privacyLevel === 'elder'
                      ? 'border-[#80141d] bg-[#faefe3] shadow-xs ring-1 ring-[#80141d]'
                      : 'border-[#dec9b6] bg-[#f8ede2] hover:bg-[#faefe3]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#dec9b6] px-2 py-0.5 text-[9.5px] font-bold text-[#543e34]">
                        <span className="material-symbols-outlined text-[12px]">verified_user</span>
                        TRƯỞNG TỘC
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-[#80141d]">
                        {privacyLevel === 'elder' ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                    </div>

                    <strong className="mt-2.5 block text-[13px] font-bold text-[#2b1b15]">
                      Nghiêm ngặt Trưởng Ban
                    </strong>

                    <p className="mt-1 text-[11px] leading-relaxed text-[#6c5549]">
                      Mọi chi nhánh muốn bổ sung con cháu, cập nhật ngày mất hay kỷ vật phải được Trưởng tộc duyệt qua vân tay/OTP.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Commitment Checkbox */}
            <div className="rounded-2xl border border-[#dec9b6] bg-[#f5ece2] p-4 text-[12px] text-[#543e34]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCommitted}
                  onChange={(e) => setIsCommitted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#80141d]"
                />
                <span className="leading-relaxed">
                  Tôi cam kết mọi thông tin thế thứ, danh tự và ngày giỗ chạp khai báo là xác thực; đồng thời kính cẩn chịu trách nhiệm trước anh linh tổ tiên và toàn thể dòng họ theo gia quy truyền thống.
                </span>
              </label>
            </div>

            {/* Action Buttons: Lưu bản nháp | Hoàn Tất & Khởi Tạo Không Gian */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="w-full sm:w-auto rounded-xl border border-[#dec9b6] bg-[#f8ede2] px-6 py-3 text-[13px] font-bold text-[#543e34] hover:bg-[#faefe3] transition-colors"
              >
                Lưu bản nháp phụng lập
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#80141d] px-7 py-3 text-[13px] font-bold text-white shadow-md hover:bg-[#680f16] hover:shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                <span>{isLoading ? 'Đang khởi tạo...' : 'Hoàn Tất & Khởi Tạo Không Gian'}</span>
                <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Security Sub-bar (above footer) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#dec9b6] bg-[#f5ece2] px-5 py-3 text-[11.5px] text-[#715b50]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#80141d]">lock</span>
              <span>Dữ liệu được bảo trợ mã hóa AES-256 theo Quy chế bảo tồn di sản gia tộc Việt Nam.</span>
            </div>

            <div className="flex items-center gap-3 font-medium text-[#80141d]">
              <button
                type="button"
                onClick={() => setToastMessage('Đang mở Điều lệ hương hỏa & gia phong thuần Việt...')}
                className="hover:underline"
              >
                Điều lệ hương hỏa
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setToastMessage('Đang mở Hướng dẫn lập phả đồ chuẩn truyền thống...')}
                className="hover:underline"
              >
                Hướng dẫn lập phả đồ
              </button>
            </div>
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
