import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface DonateRelicScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const DonateRelicScreen: React.FC<DonateRelicScreenProps> = ({ onNavigate }) => {
  const [relicName, setRelicName] = useState<string>('Tráp Gỗ Trắc Khảm Xà Cừ Ngũ Điển');
  const [category, setCategory] = useState<string>('dotho');
  const [yearEra, setYearEra] = useState<string>('Nhâm Thân 1932');
  const [dynasty, setDynasty] = useState<string>('baodai');
  const [ancestorName, setAncestorName] = useState<string>('Cụ Nguyễn Văn Phúc (Đời 11)');
  const [branchName, setBranchName] = useState<string>('Chi Trưởng Trực Lăng (Đại Tộc)');
  const [donorName, setDonorName] = useState<string>('Nguyễn Trực Viên (Chắt đích tôn)');
  const [material, setMaterial] = useState<string>('Gỗ trắc tự nhiên, cẩn ốc xà cừ ngũ sắc');
  const [condition, setCondition] = useState<string>('Tốt - Nguyên vẹn, xà cừ sáng bóng tự nhiên');
  const [location, setLocation] = useState<string>(
    'Tủ kính lưu niệm số 02 - Gian Hậu Cung, Từ Đường Chi Trưởng (Trực Lăng, Nam Định)'
  );
  const [story, setStory] = useState<string>(
    'Tráp gỗ cẩn ốc này vốn là món quà mừng thọ thượng tuần do Thượng thư bộ Lễ ban tặng Cụ Nguyễn Văn Phúc vào mùa đông năm 1932. Trong tráp luôn cất giữ văn tự mua đất làng lập hậu tự cho dòng tộc. Năm 1946 khi tản cư, Cụ bà đã bọc tráp trong lớp lụa nâu và cất giấu cẩn thận dưới giếng cổ trước khi trở về tiếp quản từ đường.'
  );
  const [privacyLevel, setPrivacyLevel] = useState<'clan' | 'branch' | 'public'>('clan');
  const [request3DScan, setRequest3DScan] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Hồ sơ số hóa gia bảo đã được đệ trình lên Hội Đồng Tộc Biểu thành công!');
    setTimeout(() => {
      onNavigate('bao-tang-gia-bao');
    }, 1500);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#fcf8f2] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#2b1b15] text-[#fcf8f2] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c9892c]/50 animate-bounce">
          <span className="material-symbols-outlined text-[#e8b56f] text-[20px]">task_alt</span>
          <span className="text-[12.5px] font-medium leading-snug">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* =========================================================
            BREADCRUMB & METADATA
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] border-b border-[#dec9b6]/60 pb-3">
          <div className="flex items-center gap-2 text-[#6b584d] flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">photo_library</span>
              <span>Kho Ký Ức &amp; Kỷ Vật</span>
            </button>
            <span className="text-[#dec9b6]">/</span>
            <button
              type="button"
              onClick={() => onNavigate('bao-tang-gia-bao')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Bảo Tàng Gia Bảo
            </button>
            <span className="text-[#dec9b6]">/</span>
            <span className="text-[#80141d] font-bold">Thêm Gia Bảo Mới</span>
          </div>

          <div className="text-[11px] text-[#6b584d] font-mono">
            HỒ SƠ SỐ: <span className="font-bold text-[#80141d]">#GB-2026-089</span>
          </div>
        </div>

        {/* =========================================================
            HEADER TITLE
            ========================================================= */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faeed9] text-[#734c13] text-[10.5px] font-bold uppercase tracking-wider border border-[#eed9be]">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span>PHỤNG HIẾN DI SẢN VĨNH CỬU</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#80141d] tracking-tight">
            Hiến Tặng &amp; Đăng Ký Gia Bảo Vào Bảo Tàng Dòng Họ
          </h1>
          <p className="text-[13px] text-[#6b584d] max-w-3xl leading-relaxed">
            Ghi danh hiện vật, kỷ vật thiêng liêng vào kim phổ số. Hỗ trợ quét 3D đa góc, lưu trữ nguồn gốc xuất xứ và gắn kết trực tiếp với tiền nhân sở hữu.
          </p>
        </div>

        {/* =========================================================
            MAIN 2-COLUMN GRID (7 COLS FORM / 5 COLS PREVIEW)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-1">
          {/* LEFT COLUMN: 6 FORM STEPS (7 COLS) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            {/* STEP 1: THÔNG TIN ĐỊNH DANH GIA BẢO */}
            <div className="p-6 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/50">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                    Thông Tin Định Danh Gia Bảo
                  </h3>
                </div>
                <span className="text-[11px] text-[#80141d] font-bold uppercase">Bắt buộc</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#2b1b15] mb-1">
                    Tên hiện vật / Kỷ vật truyền đời <span className="text-[#80141d]">*</span>
                  </label>
                  <input
                    type="text"
                    value={relicName}
                    onChange={(e) => setRelicName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-[#2b1b15] bg-[#fdfaf5]"
                    placeholder="Ví dụ: Tráp Gỗ Trắc Khảm Xà Cừ..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#2b1b15] mb-1">
                      Phân loại hiện vật <span className="text-[#80141d]">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-[#2b1b15] bg-[#fdfaf5] cursor-pointer"
                    >
                      <option value="dotho">Hiện vật thờ tự &amp; Đồ thờ gia tiên</option>
                      <option value="dongho">Đồng hồ &amp; Kỷ vật thời gian</option>
                      <option value="thutu">Thư từ &amp; Bút tích Hán Nôm</option>
                      <option value="yphuc">Y phục &amp; Khăn áo cổ truyền</option>
                      <option value="sotay">Sổ tay &amp; Nhật ký truyền đời</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2b1b15] mb-1">
                      Niên đại ước tính / Năm chế tác <span className="text-[#80141d]">*</span>
                    </label>
                    <input
                      type="text"
                      value={yearEra}
                      onChange={(e) => setYearEra(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-[#2b1b15] bg-[#fdfaf5]"
                      placeholder="Ví dụ: Nhâm Thân 1932..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#2b1b15] mb-1.5">
                    Niên hiệu triều đại / Bối cảnh lịch sử tương ứng
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'tuduc', label: 'Tự Đức (1847-1883)' },
                      { id: 'thanhthai', label: 'Thành Thái (1889-1907)' },
                      { id: 'khaidinh', label: 'Khải Định (1916-1925)' },
                      { id: 'baodai', label: 'Bảo Đại (1926-1945)' },
                    ].map((dyn) => (
                      <button
                        key={dyn.id}
                        type="button"
                        onClick={() => setDynasty(dyn.id)}
                        className={`py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer text-center ${
                          dynasty === dyn.id
                            ? 'bg-[#80141d] text-white border-[#80141d] shadow-2xs'
                            : 'bg-[#fdfaf5] border-[#dec9b6] text-[#2b1b15] hover:bg-[#faefe3]'
                        }`}
                      >
                        {dyn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: TIỀN NHÂN SỞ HỮU & LIÊN KẾT PHẢ HỆ */}
            <div className="p-6 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#dec9b6]/50">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Tiền Nhân Sở Hữu &amp; Liên Kết Phả Hệ
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#2b1b15] mb-1.5">
                    Thuộc quyền sở hữu của tiền nhân (Chọn trực tiếp trên Cây Gia Phả) <span className="text-[#80141d]">*</span>
                  </label>
                  <div className="p-3.5 rounded-2xl bg-[#faefe3] border border-[#e69894]/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#80141d] text-white flex items-center justify-center font-serif font-bold text-sm">
                        Ph
                      </div>
                      <div>
                        <div className="font-serif font-bold text-[13px] text-[#2b1b15] flex items-center gap-1.5">
                          <span>{ancestorName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold">
                            ĐỜI THỨ 11
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6b584d]">1895 – 1968 • Tiền Nhân Chi Trưởng</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('cay-pha-he-25d')}
                      className="text-[#80141d] hover:underline text-[11px] font-semibold cursor-pointer"
                    >
                      Đổi sang vị khác
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#2b1b15] mb-1">
                      Nhánh phái phụng sự
                    </label>
                    <select
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-[#2b1b15] bg-[#fdfaf5] cursor-pointer"
                    >
                      <option value="Chi Trưởng Trực Lăng (Đại Tộc)">Chi Trưởng Trực Lăng (Đại Tộc)</option>
                      <option value="Chi Giáp - Đệ Tam Ngành">Chi Giáp - Đệ Tam Ngành</option>
                      <option value="Phân Chi Nam Định">Phân Chi Nam Định</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2b1b15] mb-1">
                      Người hiến tặng / Đóng góp hiện vật
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-[#2b1b15] bg-[#fdfaf5]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: SỐ HÓA HÌNH ẢNH & QUÉT 3D ĐA CHIỀU */}
            <div className="p-6 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/50">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                    Số Hóa Hình Ảnh &amp; Quét 3D Đa Chiều
                  </h3>
                </div>
                <span className="text-[11px] text-[#c9892c] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
                  Chuẩn 3D (12 góc)
                </span>
              </div>

              {/* Upload Dropzone */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-[#dec9b6] bg-[#fdfaf5] hover:bg-[#faefe3]/50 transition-colors text-center space-y-2 cursor-pointer">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#faeed9] text-[#c9892c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                </div>
                <div className="font-semibold text-xs text-[#2b1b15]">
                  Kéo thả tư liệu hình ảnh hoặc bấm để chọn tệp
                </div>
                <p className="text-[11px] text-[#8a6f62] max-w-sm mx-auto">
                  Hệ thống tái hiện mô hình xoay bằng 12 bức ảnh chụp đa chiều quanh hiện vật. Định dạng JPG, PNG, TIFF tối đa 50MB/ảnh.
                </p>
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-lg bg-[#80141d] text-white text-[11px] font-bold shadow-2xs hover:bg-[#681017] transition-all"
                >
                  Chọn trọn bộ ảnh (Đã tải 4/12 góc)
                </button>
              </div>

              {/* 4 Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { img: '/images/relic_box.jpg', tag: 'Mặt chính diện' },
                  { img: '/images/relic_box.jpg', tag: 'Góc nghiêng 45°' },
                  { img: '/images/relic_medals.jpg', tag: 'Chi tiết hoa văn' },
                  { img: '/images/relic_book.jpg', tag: 'Đáy & tem thư xưa' },
                ].map((thumb, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-[#dec9b6] bg-black">
                    <img src={thumb.img} alt={thumb.tag} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 inset-x-1 text-center bg-black/75 text-white text-[9.5px] py-0.5 rounded">
                      {thumb.tag}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pro 3D Scan Home Service Checkbox */}
              <div className="p-3.5 rounded-2xl bg-[#faeed9]/50 border border-[#eed9be] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#c9892c] text-[20px] shrink-0 mt-0.5">home_repair_service</span>
                <div className="text-[11.5px] text-[#5c4a42] space-y-1">
                  <span className="font-bold text-[#2b1b15] block">Đăng ký dịch vụ Quét 3D Chuyên Sâu tại Nhà Thờ Họ</span>
                  <p className="text-[#6b584d]">
                    Đối với các đại bảo vật cồng kềnh, sắc phong cổ dòn nát hoàn toàn không thể di chuyển, Ban Quản Trị sẽ cử cán bộ kỹ thuật mang máy quét laser độ phân giải 0.02mm đến tận từ đường số hóa.
                  </p>
                  <label className="flex items-center gap-2 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={request3DScan}
                      onChange={(e) => setRequest3DScan(e.target.checked)}
                      className="rounded text-[#80141d] focus:ring-[#80141d]"
                    />
                    <span className="font-semibold text-[#80141d]">Cần cán bộ kỹ thuật hỗ trợ số hóa trực tiếp</span>
                  </label>
                </div>
              </div>
            </div>

            {/* STEP 4: CHẤT LIỆU, HIỆN TRẠNG & NƠI LƯU GIỮ */}
            <div className="p-6 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#dec9b6]/50">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Chất Liệu, Hiện Trạng &amp; Nơi Lưu Giữ
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#2b1b15] mb-1">
                      Chất liệu chế tác chính <span className="text-[#80141d]">*</span>
                    </label>
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-[#2b1b15] bg-[#fdfaf5]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2b1b15] mb-1">
                      Tình trạng bảo quản hiện tại <span className="text-[#80141d]">*</span>
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-[#2b1b15] bg-[#fdfaf5] cursor-pointer"
                    >
                      <option value="Tốt - Nguyên vẹn, xà cừ sáng bóng tự nhiên">Tốt - Nguyên vẹn, xà cừ sáng bóng tự nhiên</option>
                      <option value="Khá - Trầy xước nhẹ theo thời gian">Khá - Trầy xước nhẹ theo thời gian</option>
                      <option value="Cần phục chế khẩn cấp">Cần phục chế khẩn cấp</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#2b1b15] mb-1">
                    Vị trí lưu giữ hiện vật gốc <span className="text-[#80141d]">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-[#2b1b15] bg-[#fdfaf5]"
                  />
                </div>
              </div>
            </div>

            {/* STEP 5: ĐIỂN TÍCH & KÝ ỨC TRUYỀN KHẨU */}
            <div className="p-6 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#dec9b6]/50">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-xs">
                  5
                </span>
                <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Điển Tích &amp; Ký Ức Truyền Khẩu
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#2b1b15] mb-1">
                    Câu chuyện di sản đính kèm hiện vật (Ghi chép truyền ngôn)
                  </label>
                  <textarea
                    rows={4}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#dec9b6] focus:border-[#80141d] focus:outline-none text-[#2b1b15] bg-[#fdfaf5] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2b1b15] mb-1">
                    Tệp ghi âm giọng nói nhân chứng kể về hiện vật (Bảo tồn âm thanh sống)
                  </label>
                  <div className="p-3.5 rounded-2xl bg-[#fdfaf5] border border-[#dec9b6] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fae8e6] text-[#80141d] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">mic</span>
                      </div>
                      <div>
                        <span className="font-semibold text-xs block text-[#2b1b15]">Ghi_am_Loi_ke_Cu_Truc_Vien_1932.wav</span>
                        <span className="text-[10.5px] text-[#8a6f62]">14.2 MB • Thời lượng 03 phút 45 giây • Đã khử nhiễu AI</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('Phát đoạn ghi âm mẫu')}
                      className="text-[#80141d] hover:underline font-bold text-xs cursor-pointer"
                    >
                      Nghe thử
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 6: QUYỀN RIÊNG TƯ & PHÊ DUYỆT HỒ SƠ */}
            <div className="p-6 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#dec9b6]/50">
                <span className="w-6 h-6 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-xs">
                  6
                </span>
                <h3 className="font-serif font-bold text-[15px] text-[#2b1b15]">
                  Quyền Riêng Tư &amp; Phê Duyệt Hồ Sơ
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <label className="block font-semibold text-[#2b1b15]">
                  Cấp độ bảo mật &amp; Phạm vi xuất bản:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'clan', title: 'Toàn Thể Dòng Tộc', desc: 'Tất cả con cháu đã định danh trong phả đồ đều được chiêm bái' },
                    { id: 'branch', title: 'Nội Bộ Chi Phái', desc: 'Chỉ con cháu thuộc nhánh Chi Trưởng Trực Lăng được xem hồ sơ' },
                    { id: 'public', title: 'Mở Rộng Giao Lưu', desc: 'Cho phép khách quý và các chi họ bạn cùng họ Nguyễn chiêm quan' },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setPrivacyLevel(p.id as any)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                        privacyLevel === p.id
                          ? 'bg-[#faefe3] border-[#80141d]'
                          : 'bg-[#fdfaf5] border-[#dec9b6] hover:bg-[#faefe3]/50'
                      }`}
                    >
                      <div className="font-serif font-bold text-[12.5px] text-[#2b1b15] flex items-center gap-1.5">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${privacyLevel === p.id ? 'border-[#80141d]' : 'border-[#8a6f62]'}`}>
                          {privacyLevel === p.id && <div className="w-1.5 h-1.5 rounded-full bg-[#80141d]"></div>}
                        </div>
                        <span>{p.title}</span>
                      </div>
                      <p className="text-[10.5px] text-[#6b584d] leading-relaxed pl-5">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-[#faeed9]/60 border border-[#eed9be] flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#734c13] text-[18px] shrink-0 mt-0.5">verified_user</span>
                  <p className="text-[11.5px] text-[#5c4a42] leading-relaxed">
                    <span className="font-bold text-[#80141d]">Quyền yêu cầu thẩm định bởi Trưởng Tộc &amp; Ban Trị Sự:</span> Hồ sơ sẽ được các cụ trong Hội đồng Trưởng lão kiểm chứng độ xác thực trước khi chính thức hiển thị trên ấn bản phả ký số của dòng họ.
                  </p>
                </div>
              </div>
            </div>

            {/* FORM ACTION BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigate('bao-tang-gia-bao')}
                  className="px-4 py-2.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Hủy bỏ / Quay lại
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Đã lưu bản nháp hồ sơ gia bảo')}
                  className="px-4 py-2.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Lưu bản nháp
                </button>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#80141d] hover:bg-[#681017] text-white font-serif font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Hoàn Tất &amp; Khởi Tạo Hồ Sơ Gia Bảo</span>
              </button>
            </div>
          </form>

          {/* RIGHT COLUMN: STICKY PREVIEW CARD & GUIDELINES (5 COLS) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
            {/* Live Card Preview */}
            <div className="bg-white rounded-3xl border border-[#dec9b6] shadow-sm overflow-hidden p-5 space-y-4">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#dec9b6]/50">
                <span className="font-bold text-[#8a6f62] uppercase tracking-wider text-[10.5px]">
                  GIA BẢO SỐ • BẢN XEM TRƯỚC BẢO TÀNG
                </span>
                <span className="px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold text-[10px]">
                  Mô phỏng 3D
                </span>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#201815] border border-[#dec9b6]">
                <img
                  src="/images/relic_box.jpg"
                  alt="Tráp gỗ trắc khảm xà cừ ngũ điển"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-mono border border-white/20">
                  #GB-1865-TRAP-01
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10.5px] font-bold text-[#80141d] uppercase">
                  Nhâm Thân 1932 • Triều Bảo Đại
                </div>
                <h3 className="font-serif font-bold text-[16px] text-[#2b1b15]">
                  {relicName}
                </h3>
              </div>

              <div className="space-y-1.5 text-xs text-[#6b584d] pt-1 border-t border-[#dec9b6]/40">
                <div className="flex justify-between">
                  <span>Phân loại:</span>
                  <span className="font-semibold text-[#2b1b15]">Hiện vật thờ tự &amp; Đồ thờ</span>
                </div>
                <div className="flex justify-between">
                  <span>Chủ nhân xưa:</span>
                  <span className="font-semibold text-[#2b1b15]">Cụ Nguyễn Văn Phúc (Đời 11)</span>
                </div>
                <div className="flex justify-between">
                  <span>Chất liệu:</span>
                  <span className="font-semibold text-[#2b1b15]">Gỗ trắc cẩn xà cừ ngũ sắc</span>
                </div>
                <div className="flex justify-between">
                  <span>Bản tồn:</span>
                  <span className="font-semibold text-[#80141d]">Tốt - Nguyên vẹn cổ truyền</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#8a6f62] pt-1">
                  <span className="material-symbols-outlined text-[14px] text-[#c9892c]">place</span>
                  <span>Tủ kính 02, Từ Đường Trực Lăng, Nam Định</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('chi-tiet-gia-bao')}
                className="w-full py-2.5 rounded-xl border border-[#dec9b6] bg-[#fdfaf5] hover:bg-[#faefe3] text-[#80141d] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px]">3d_rotation</span>
                <span>Trải nghiệm xoay đa chiều</span>
              </button>
            </div>

            {/* Standard Photography Guidelines */}
            <div className="bg-[#fdfaf5] rounded-3xl border border-[#dec9b6] p-5 shadow-2xs space-y-3">
              <h4 className="font-serif font-bold text-[#80141d] text-[13.5px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                <span>Quy Chuẩn Chụp Ảnh Cổ Vật</span>
              </h4>

              <ul className="space-y-2 text-[11.5px] text-[#6b584d] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-[#c9892c] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Ánh sáng tự nhiên:</strong> Tránh đèn flash trực diện làm lóa men sứ và ánh sáng xà cừ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-[#c9892c] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Phông nền tối giản:</strong> Ưu tiên đặt trên vải lụa sẫm màu hoặc mặt gỗ mộc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-[#c9892c] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Vết tích thời gian:</strong> Chụp rõ cả những vết nứt, tem mộc hay chữ khắc chìm cổ.</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-[#dec9b6]/60 text-[11px] text-[#8a6f62] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#80141d]">call</span>
                <span>Cần trợ giúp số hóa? Liên hệ Ban Phụng Sự: <strong>0912.888.xxx</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM HERITAGE SECURITY FOOTER BANNER
            ========================================================= */}
        <div className="pt-8 border-t border-[#ebdcd0] space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="space-y-1">
              <div className="font-serif font-bold text-[#80141d] text-[15px]">
                Thích Cúng Kiếng • Bảo Tàng Di Sản Số Dòng Họ
              </div>
              <p className="text-[12px] text-[#6b584d] max-w-2xl leading-relaxed">
                Không gian thiêng liêng gìn giữ gia phả, ký ức hình ảnh và truyền thống văn hóa phụng sự tổ tiên của các dòng họ Việt Nam.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-[12px] text-[#2b1b15] font-medium shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">lock</span>
                <span>Bảo Mật Kép AES-256</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#c9892c]">verified_user</span>
                <span>Quyền Sở Hữu Thuộc Dòng Họ 100%</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">auto_fix_high</span>
                <span>Phục Chế Ảnh Kỹ Thuật Số AI</span>
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#ebdcd0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8a6f62]">
            <div>
              © 2025 Thích Cúng Kiếng. Tôn kính phụng sự đạo nghĩa nguồn cội.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-[#80141d] cursor-pointer">Quy ước bảo tồn gia phong</span>
              <span>•</span>
              <span className="hover:text-[#80141d] cursor-pointer">Chính sách lưu trữ kỷ vật</span>
              <span>•</span>
              <span className="hover:text-[#80141d] cursor-pointer">Hỗ trợ từ Ban Phụng Sự</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
