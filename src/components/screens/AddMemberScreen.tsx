import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AddMemberScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AddMemberScreen: React.FC<AddMemberScreenProps> = ({ onNavigate }) => {
  // Form State
  const [fullName, setFullName] = useState('Nguyễn Phục Hải Đăng');
  const [courtesyName, setCourtesyName] = useState('');
  const [hanziName, setHanziName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isDeceased, setIsDeceased] = useState(true);
  const [generation, setGeneration] = useState('12');
  const [birthOrder, setBirthOrder] = useState('Con Trưởng (Trưởng Nam / Trưởng Nữ)');
  const [lineageType, setLineageType] = useState<'noi' | 'ngoai'>('noi');
  
  // Relations
  const [father, setFather] = useState('Nguyễn Trực Viên (Đời 11 - Trưởng tộc) 👑');
  const [mother, setMother] = useState('Trần Thị Thu Mai (Chính thất 90) 👩');
  const [spouseName, setSpouseName] = useState('Lê Thị Diệu Hiền');
  const [marriageYear, setMarriageYear] = useState('2018 (Mậu Tuất)');
  const [spouseRole, setSpouseRole] = useState('Chính thất (Vợ cả)');
  
  // Dates & Memorial
  const [solarBirth, setSolarBirth] = useState('04/12/1990');
  const [deathDateLunar, setDeathDateLunar] = useState('26 Tháng Chạp');
  const [deathTime, setDeathTime] = useState('Giờ Thân (15h - 17h)');
  const [longevity, setLongevity] = useState('Hưởng thọ 78 tuổi');
  const [tombLocation, setTombLocation] = useState('Khu Lăng mộ Chi Trực Lãng, Xã Nghĩa Trụ');
  const [tombPlot, setTombPlot] = useState('Lô G8 - Mộ số 14');
  const [tombGps, setTombGps] = useState('20.4531° N, 106.12');
  
  // Bio & Moral
  const [hometown, setHometown] = useState('Làng La Chữ, Xã Hương Chữ, Huyện Hương Trà, Tỉnh Thừa Thiên Huế');
  const [biography, setBiography] = useState(
    'Sinh thời, người luôn giữ lòng trung đạo, một đời cống hiến cho ngành giáo dục và tôn tạo gia tộc. Có công lớn trong việc khôi phục dòng phả và trùng tu Từ Đường Chi Trực Lãng vào năm 1998...'
  );
  const [lastWords, setLastWords] = useState(
    'Vì đức hãy dốc sức người, hãy nhớ con lập thân thừa, dù đi bôn ba không quên ngày chạp họ'
  );
  
  // Media & Privacy
  const [aiRestored, setAiRestored] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([
    'Trich_luc_khai_sinh_nam_1990.pdf'
  ]);
  const [privacyScope, setPrivacyScope] = useState<'noi_gia_toc' | 'cong_khai' | 'ban_tri_su'>('noi_gia_toc');
  const [requireLeaderApproval, setRequireLeaderApproval] = useState(true);

  // UI Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyFullName = () => {
    navigator.clipboard?.writeText(fullName);
    showToast(`Đã sao chép họ tên: "${fullName}"`);
  };

  const handleRemoveFile = (fileName: string) => {
    setAttachedFiles(prev => prev.filter(f => f !== fileName));
    showToast(`Đã gỡ bỏ tài liệu: ${fileName}`);
  };

  const handleFileUploadMock = () => {
    const newDoc = `Gia_pha_chung_thuc_${Date.now().toString().slice(-4)}.pdf`;
    setAttachedFiles(prev => [...prev, newDoc]);
    showToast(`Đã tải lên tệp: ${newDoc}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Đã gửi hồ sơ "${fullName}" cho Trưởng tộc Nguyễn Trực Viên thẩm định & phê duyệt!`);
    setTimeout(() => {
      onNavigate('cay-pha-he-25d');
    }, 1800);
  };

  const handleSaveDraft = () => {
    showToast('Đã lưu bản nháp thông tin thành viên thành công.');
  };

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] py-6 px-4 sm:px-6 lg:px-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2b1b15] text-[#fdf9f4] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c9892c] animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[#c9892c]">verified</span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* =========================================================
            BREADCRUMBS & LOCK STATUS
            ========================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[12px] text-[#8a6f62]">
            <button
              type="button"
              onClick={() => onNavigate('cay-pha-he-25d')}
              className="hover:text-[#80141d] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">account_tree</span>
              <span>Cây gia phả</span>
            </button>
            <span>&gt;</span>
            <button
              type="button"
              onClick={() => onNavigate('tong-quan-pha-he')}
              className="hover:text-[#80141d] transition-colors font-medium cursor-pointer"
            >
              Chi Trực Lãng
            </button>
            <span>&gt;</span>
            <span className="text-[#80141d] font-bold">Thêm Thành Viên Mới</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fdeee9] border border-[#f0c2bc] text-[#80141d] text-[11px] font-bold tracking-wide">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>KHÓA LIÊN KẾT: TRỰC HỆ CHÍNH TÔNG • PHÂN HỆ NGUYỄN PHÚC</span>
          </div>
        </div>

        {/* =========================================================
            TOP BANNER CARD (VỚI WATERMARK HOA VĂN LA BÀN GIA TỘC)
            ========================================================= */}
        <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-6 sm:p-8 shadow-xs relative overflow-hidden">
          {/* Watermark hoa văn gia tộc */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.06] text-[#80141d] pointer-events-none select-none hidden sm:block">
            <svg viewBox="0 0 200 200" fill="currentColor">
              <polygon points="100,10 120,70 180,80 130,120 150,180 100,140 50,180 70,120 20,80 80,70" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="6" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" />
            </svg>
          </div>

          <div className="relative z-10 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fae8e6] text-[#80141d] border border-[#f2c7c5] text-[10.5px] font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-[14px]">account_balance</span>
              <span>SỐ HÓA KỶ ĐIỆN TỬ - QUY TRÌNH CHÍNH TÔNG</span>
            </div>

            <h1 className="font-serif font-bold text-[28px] sm:text-[34px] text-[#80141d] tracking-tight">
              Thêm Thành Viên Mới Vào Cây Gia Phả
            </h1>

            <p className="text-[13.5px] text-[#6b584d] max-w-3xl leading-relaxed">
              Ghi danh nhân khẩu vào phả đồ điện tử, thiết lập huyết thống trực hệ, liên kết ngày giỗ, kỷ niệm truyền đời và bảo tồn danh gia bảo phả cho các thế hệ mai sau.
            </p>
          </div>
        </div>

        {/* =========================================================
            MAIN FORM & PREVIEW WIDGET GRID (8 COLS / 4 COLS)
            ========================================================= */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* CỘT TRÁI: 6 KHỐI THÔNG TIN CHÍNH (8 COLS) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* -------------------------------------------------------
                  01: THÔNG TIN ĐỊNH DANH CÁ NHÂN
                  ------------------------------------------------------- */}
              <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-[12px] shadow-xs">
                      01
                    </span>
                    <div>
                      <h2 className="font-serif font-bold text-[17px] text-[#2b1b15]">
                        Thông Tin Định Danh Cá Nhân
                      </h2>
                      <p className="text-[11.5px] text-[#8a6f62]">
                        Tên húy, tự hiệu, chữ Hán và phẩm vị gia phong dòng tộc
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fae8e6] text-[#80141d] border border-[#f2c7c5] text-[10.5px] font-bold">
                    BẮT BUỘC
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Họ và tên khai sinh */}
                  <div>
                    <label className="block text-[12.5px] font-bold text-[#2b1b15] mb-1.5">
                      Họ và tên khai sinh <span className="text-[#80141d]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nhập họ và tên đầy đủ..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] focus:bg-white text-[14px] text-[#2b1b15] font-semibold transition-all outline-hidden pr-10"
                      />
                      <button
                        type="button"
                        onClick={handleCopyFullName}
                        title="Sao chép họ tên"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a6f62] hover:text-[#80141d] p-1 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-[#8a6f62] mt-1">
                      Tên này được dùng để phân chia phả hệ và khắc bia mộ sau này.
                    </p>
                  </div>

                  {/* 2 input: Tên Húy & Chữ Hán */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                        Tên Húy / Tên Cơm / Tên Nôm
                      </label>
                      <input
                        type="text"
                        value={courtesyName}
                        onChange={(e) => setCourtesyName(e.target.value)}
                        placeholder="Ví dụ: Minh Khang, Trần Đình"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] focus:bg-white text-[13px] text-[#2b1b15] transition-all outline-hidden"
                      />
                      <p className="text-[10.5px] text-[#8a6f62] mt-1">
                        Tên hiệu được dòng tộc xưng tụng hoặc húy kỵ sau khi mất.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                        Chữ Hán / Tên Nôm tương ứng
                      </label>
                      <input
                        type="text"
                        value={hanziName}
                        onChange={(e) => setHanziName(e.target.value)}
                        placeholder="Ví dụ: 阮復海登"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] focus:bg-white text-[13px] font-serif text-[#80141d] font-bold transition-all outline-hidden"
                      />
                      <p className="text-[10.5px] text-[#8a6f62] mt-1">
                        Dùng để khắc bia mộ, vi tế và xuất phả điện tử chữ Hán/Nôm cổ.
                      </p>
                    </div>
                  </div>

                  {/* Giới tính & Trạng thái thế nhân */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Giới tính */}
                    <div>
                      <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                        Giới tính <span className="text-[#80141d]">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setGender('male')}
                          className={`py-2 px-3 rounded-xl text-[12.5px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            gender === 'male'
                              ? 'bg-[#fae8e6] text-[#80141d] border-[#80141d] shadow-2xs'
                              : 'bg-[#faefe3]/50 text-[#543e34] border-[#dec9b6] hover:bg-[#faefe3]'
                          }`}
                        >
                          <span className="text-[14px]">♂</span>
                          <span>Nam (Nội tộc)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setGender('female')}
                          className={`py-2 px-3 rounded-xl text-[12.5px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            gender === 'female'
                              ? 'bg-[#fae8e6] text-[#80141d] border-[#80141d] shadow-2xs'
                              : 'bg-[#faefe3]/50 text-[#543e34] border-[#dec9b6] hover:bg-[#faefe3]'
                          }`}
                        >
                          <span className="text-[14px]">♀</span>
                          <span>Nữ (Ngoại tộc)</span>
                        </button>
                      </div>
                    </div>

                    {/* Trạng thái sinh tử */}
                    <div>
                      <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                        Trạng thái thế nhân <span className="text-[#80141d]">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setIsDeceased(false)}
                          className={`py-2 px-3 rounded-xl text-[12.5px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            !isDeceased
                              ? 'bg-[#faefe3] text-[#2b1b15] border-[#c9892c] shadow-2xs'
                              : 'bg-[#faefe3]/50 text-[#543e34] border-[#dec9b6] hover:bg-[#faefe3]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px] text-emerald-700">spa</span>
                          <span>Còn sống</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsDeceased(true)}
                          className={`py-2 px-3 rounded-xl text-[12.5px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isDeceased
                              ? 'bg-[#80141d] text-white border-[#80141d] shadow-2xs'
                              : 'bg-[#faefe3]/50 text-[#543e34] border-[#dec9b6] hover:bg-[#faefe3]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px] text-[#e8a29b]">mode_heat</span>
                          <span>Đã quy tiên (Hương hỏa)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Đời thứ & Thứ bậc */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                        Đời thứ trong dòng tộc <span className="text-[#80141d]">*</span>
                      </label>
                      <select
                        value={generation}
                        onChange={(e) => setGeneration(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] text-[13px] text-[#2b1b15] font-medium outline-hidden focus:border-[#80141d] cursor-pointer"
                      >
                        <option value="10">Đời thứ 10 (Tiền bối cội rễ)</option>
                        <option value="11">Đời thứ 11 (Cận đại)</option>
                        <option value="12">Đời thứ 12 (Thế hệ đương đại)</option>
                        <option value="13">Đời thứ 13 (Hậu bối kế thừa)</option>
                        <option value="14">Đời thứ 14 (Thế hệ mầm non)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                        Thứ bậc anh chị em trong gia đình
                      </label>
                      <select
                        value={birthOrder}
                        onChange={(e) => setBirthOrder(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] text-[13px] text-[#2b1b15] font-medium outline-hidden focus:border-[#80141d] cursor-pointer"
                      >
                        <option>Con Trưởng (Trưởng Nam / Trưởng Nữ)</option>
                        <option>Con Thứ 2 (Thứ Nam / Thứ Nữ)</option>
                        <option>Con Thứ 3</option>
                        <option>Con Thứ 4</option>
                        <option>Con Út</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------
                  02: XÁC LẬP MỐI QUAN HỆ PHẢ HỆ
                  ------------------------------------------------------- */}
              <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-[12px] shadow-xs">
                      02
                    </span>
                    <div>
                      <h2 className="font-serif font-bold text-[17px] text-[#2b1b15]">
                        Xác Lập Mối Quan Hệ Phả Hệ
                      </h2>
                      <p className="text-[11.5px] text-[#8a6f62]">
                        Huyết tộc trực hệ, quan hệ hôn phối, thân phụ và người thừa kế
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fef3dd] text-[#b3731a] border border-[#f5dfb3] text-[10.5px] font-bold">
                    TRỌNG YẾU
                  </span>
                </div>

                {/* Quy chuẩn huyết thống */}
                <div className="space-y-3">
                  <label className="block text-[12px] font-semibold text-[#543e34]">
                    Quy chuẩn huyết thống dòng họ
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setLineageType('noi')}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        lineageType === 'noi'
                          ? 'border-[#80141d] bg-[#fdf5f3] shadow-xs ring-1 ring-[#80141d]/30'
                          : 'border-[#dec9b6] bg-white hover:bg-[#faefe3]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          lineageType === 'noi' ? 'border-[#80141d]' : 'border-[#dec9b6]'
                        }`}>
                          {lineageType === 'noi' && <span className="w-2 h-2 rounded-full bg-[#80141d]"></span>}
                        </span>
                        <span className="text-[13px] font-bold text-[#80141d]">
                          Họ Nội | Trực Huyết Thống
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6b584d] mt-1.5 pl-5.5 leading-relaxed">
                        Sinh ra từ người mang họ Nguyễn Phục, thừa kế quyền phụng sự và kế thừa hương hỏa.
                      </p>
                    </div>

                    <div
                      onClick={() => setLineageType('ngoai')}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        lineageType === 'ngoai'
                          ? 'border-[#80141d] bg-[#fdf5f3] shadow-xs ring-1 ring-[#80141d]/30'
                          : 'border-[#dec9b6] bg-white hover:bg-[#faefe3]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          lineageType === 'ngoai' ? 'border-[#80141d]' : 'border-[#dec9b6]'
                        }`}>
                          {lineageType === 'ngoai' && <span className="w-2 h-2 rounded-full bg-[#80141d]"></span>}
                        </span>
                        <span className="text-[13px] font-bold text-[#543e34]">
                          Họ Ngoại / Phối Ngẫu Nhập Trạch
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6b584d] mt-1.5 pl-5.5 leading-relaxed">
                        Dâu hoặc rể, kết nối vào các thế hệ con ngoại tộc, mở rộng dòng họ.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thân phụ & Thân mẫu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                      Thân phụ (Cha ruột) <span className="text-[#80141d]">*</span>
                    </label>
                    <input
                      type="text"
                      value={father}
                      onChange={(e) => setFather(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] text-[13px] text-[#2b1b15] font-semibold outline-hidden"
                    />
                    <p className="text-[10.5px] text-[#8a6f62] mt-1">
                      Hệ thống sẽ tự động ghép nối cây con dưới quyền Thân phụ.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                      Thân mẫu (Mẹ ruột)
                    </label>
                    <input
                      type="text"
                      value={mother}
                      onChange={(e) => setMother(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] text-[13px] text-[#2b1b15] font-semibold outline-hidden"
                    />
                    <p className="text-[10.5px] text-[#8a6f62] mt-1">
                      Đính kèm chính thất hoặc thứ thất để định danh mẫu hệ.
                    </p>
                  </div>
                </div>

                {/* Đối chiếu anh chị em cùng dòng thế hệ */}
                <div className="p-3.5 rounded-2xl bg-[#faefe3]/60 border border-[#ebdcd0] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#8a6f62]">
                    <span className="flex items-center gap-1.5 text-[#543e34]">
                      <span className="material-symbols-outlined text-[15px] text-[#c9892c]">group</span>
                      <span>ĐỐI CHIẾU ANH CHỊ EM RUỘT (CÙNG DÒNG THẾ HỆ)</span>
                    </span>
                    <span className="text-[10px] text-[#c9892c] uppercase font-semibold">Tự động truy xuất</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11.5px]">
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-[#dec9b6] text-[#2b1b15] font-medium shadow-2xs">
                      • Nguyễn Trực Mai Hương (cùng Đời 11)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-[#dec9b6] text-[#2b1b15] font-medium shadow-2xs">
                      • Nguyễn Trực Thảo (Nguyên quán gia hệ 11)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-[#dec9b6] text-[#2b1b15] font-medium shadow-2xs">
                      • Nguyễn Trực Hòa Thọ (Đạo chi phái 11)
                    </span>
                  </div>
                </div>

                {/* Khối hôn phối */}
                <div className="p-4 rounded-2xl bg-[#fdfaf5] border border-[#dec9b6] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#80141d]">
                      <span className="material-symbols-outlined text-[16px]">favorite</span>
                      <span>Mối quan hệ Hôn phối (Vợ / Chồng)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('Đã mở hộp thoại thêm phối ngẫu kế thất')}
                      className="text-[11px] font-semibold text-[#c9892c] hover:underline cursor-pointer"
                    >
                      + Thêm mối quan hệ khác
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6b584d] mb-1">
                        Họ và tên phối ngẫu
                      </label>
                      <input
                        type="text"
                        value={spouseName}
                        onChange={(e) => setSpouseName(e.target.value)}
                        placeholder="Ví dụ: Lê Thị Diệu Hiền"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[12.5px] text-[#2b1b15] outline-hidden focus:border-[#80141d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#6b584d] mb-1">
                        Năm sinh / kết hôn
                      </label>
                      <input
                        type="text"
                        value={marriageYear}
                        onChange={(e) => setMarriageYear(e.target.value)}
                        placeholder="Ví dụ: 2018 (Mậu Tuất)"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[12.5px] text-[#2b1b15] outline-hidden focus:border-[#80141d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#6b584d] mb-1">
                        Vai trò phối ngẫu
                      </label>
                      <select
                        value={spouseRole}
                        onChange={(e) => setSpouseRole(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[12.5px] text-[#2b1b15] outline-hidden focus:border-[#80141d] cursor-pointer"
                      >
                        <option>Chính thất (Vợ cả)</option>
                        <option>Kế thất (Vợ hai)</option>
                        <option>Thứ thất (Trắc thất)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------
                  03: NIÊN KHÓA ÂM - DƯƠNG & NGÀY GIỖ CHẠP
                  ------------------------------------------------------- */}
              <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-[12px] shadow-xs">
                      03
                    </span>
                    <div>
                      <h2 className="font-serif font-bold text-[17px] text-[#2b1b15]">
                        Niên Khóa Âm - Dương &amp; Ngày Giỗ Chạp
                      </h2>
                      <p className="text-[11.5px] text-[#8a6f62]">
                        Tổ hợp quy đổi lịch cổ truyền, kiểm tra can chi và tính ngày tang lễ
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[#8a6f62]">
                    calendar_month
                  </span>
                </div>

                {/* Ngày sinh & Quy đổi Âm lịch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                      Ngày sinh (Dương lịch) <span className="text-[#80141d]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={solarBirth}
                        onChange={(e) => setSolarBirth(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] focus:border-[#80141d] text-[13px] text-[#2b1b15] font-semibold outline-hidden pr-10"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#8a6f62] pointer-events-none">
                        calendar_today
                      </span>
                    </div>
                  </div>

                  {/* Khung quy đổi lịch can chi */}
                  <div className="p-3 rounded-2xl bg-[#fbf1ed] border border-[#f0cfc7] flex items-center gap-3.5 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-[#80141d] text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                      <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">THÁNG</span>
                      <span className="font-serif font-bold text-[15px] leading-none">04/12</span>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#8a6f62] tracking-wider">
                        Âm lịch tự động chuẩn xác:
                      </div>
                      <div className="font-serif font-bold text-[13.5px] text-[#80141d]">
                        Ngày 13 Tháng Ba - Ất Hợi (1995)
                      </div>
                      <div className="text-[11px] text-[#8a6f62]">
                        Mệnh: Sơn Đầu Hỏa (Lửa trên núi)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Khung Thông Tin Tạ Thế & Ngày Chính Giỗ */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#fdfaf5] border border-[#ebdcd0] space-y-4">
                  <div className="flex items-center gap-2 text-[12.5px] font-bold text-[#80141d]">
                    <span className="material-symbols-outlined text-[17px] text-[#80141d]">mode_heat</span>
                    <span>Thông Tin Tạ Thế &amp; Ngày Chính Giỗ Hàng Năm</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#543e34] mb-1">
                        Ngày tạ thế (theo tuổi Âm lịch) <span className="text-[#80141d]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={deathDateLunar}
                          onChange={(e) => setDeathDateLunar(e.target.value)}
                          placeholder="Ví dụ: 26 Tháng Chạp"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[12.5px] text-[#80141d] font-bold outline-hidden pr-8 focus:border-[#80141d]"
                        />
                        <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-[#c9892c]">
                          event_available
                        </span>
                      </div>
                      <p className="text-[10px] text-[#8a6f62] mt-1">
                        Tự động đối soát Lịch Vạn Niên.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#543e34] mb-1">
                        Giờ mất (theo 12 giờ địa chi)
                      </label>
                      <input
                        type="text"
                        value={deathTime}
                        onChange={(e) => setDeathTime(e.target.value)}
                        placeholder="Ví dụ: Giờ Thân (15h - 17h)"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[12.5px] text-[#2b1b15] outline-hidden focus:border-[#80141d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#543e34] mb-1">
                        Hưởng thọ / Hưởng dương
                      </label>
                      <input
                        type="text"
                        value={longevity}
                        onChange={(e) => setLongevity(e.target.value)}
                        placeholder="Ví dụ: Hưởng thọ 78 tuổi"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[12.5px] text-[#2b1b15] outline-hidden focus:border-[#80141d]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#543e34] mb-1">
                        Nơi an nghỉ (Nghĩa trang/gia phả)
                      </label>
                      <input
                        type="text"
                        value={tombLocation}
                        onChange={(e) => setTombLocation(e.target.value)}
                        placeholder="Địa chỉ phần mộ..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[12.5px] text-[#2b1b15] outline-hidden focus:border-[#80141d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#543e34] mb-1">
                        Số hiệu mộ phần / Tọa độ quy hoạch
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={tombPlot}
                          onChange={(e) => setTombPlot(e.target.value)}
                          placeholder="Lô G8 - Mộ 14"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[12px] text-[#2b1b15] outline-hidden focus:border-[#80141d]"
                        />
                        <input
                          type="text"
                          value={tombGps}
                          onChange={(e) => setTombGps(e.target.value)}
                          placeholder="Tọa độ GPS"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9b6] text-[12px] text-[#2b1b15] font-mono outline-hidden focus:border-[#80141d]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------
                  04: TIỂU SỬ, HÀNH TRẠNG & PHẨM HẠNH
                  ------------------------------------------------------- */}
              <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-[12px] shadow-xs">
                      04
                    </span>
                    <div>
                      <h2 className="font-serif font-bold text-[17px] text-[#2b1b15]">
                        Tiểu Sử, Hành Trạng &amp; Phẩm Hạnh
                      </h2>
                      <p className="text-[11.5px] text-[#8a6f62]">
                        Lưu lại vốn tư bước đời, đạo đức gia phong và huân chương cống hiến
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[#8a6f62]">
                    menu_book
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                      Nguyên quán / Quê hương cội nguồn
                    </label>
                    <input
                      type="text"
                      value={hometown}
                      onChange={(e) => setHometown(e.target.value)}
                      placeholder="Quê quán cội nguồn..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] text-[13px] text-[#2b1b15] outline-hidden focus:border-[#80141d]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[12px] font-semibold text-[#543e34]">
                        Tóm tắt hành trạng cuộc đời
                      </label>
                      <div className="flex items-center gap-1 bg-[#faefe3] px-2 py-0.5 rounded-lg border border-[#dec9b6] text-[11px] text-[#543e34]">
                        <button type="button" className="px-1 font-bold hover:text-[#80141d] cursor-pointer">B</button>
                        <button type="button" className="px-1 italic hover:text-[#80141d] cursor-pointer">I</button>
                        <button type="button" className="px-1 underline hover:text-[#80141d] cursor-pointer">U</button>
                        <span className="text-[#dec9b6]">|</span>
                        <button type="button" className="px-1 material-symbols-outlined text-[14px] hover:text-[#80141d] cursor-pointer">format_list_bulleted</button>
                        <button type="button" className="px-1 material-symbols-outlined text-[14px] hover:text-[#80141d] cursor-pointer">format_align_left</button>
                      </div>
                    </div>
                    <textarea
                      rows={4}
                      value={biography}
                      onChange={(e) => setBiography(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#faefe3]/40 border border-[#dec9b6] focus:border-[#80141d] text-[13px] text-[#2b1b15] leading-relaxed outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#543e34] mb-1.5">
                      Di ngôn, Lời dặn lại cho cháu con đời sau
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 font-serif text-[22px] text-[#c9892c] pointer-events-none select-none">
                        “
                      </span>
                      <textarea
                        rows={2}
                        value={lastWords}
                        onChange={(e) => setLastWords(e.target.value)}
                        placeholder="Lời di huấn truyền đời..."
                        className="w-full py-2.5 pl-8 pr-4 rounded-xl bg-[#fdfbf7] border border-[#dec9b6] focus:border-[#80141d] text-[13px] font-serif italic text-[#80141d] leading-relaxed outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------
                  05: CHÂN DUNG & TƯ LIỆU ĐÍNH KÈM
                  ------------------------------------------------------- */}
              <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-[12px] shadow-xs">
                      05
                    </span>
                    <div>
                      <h2 className="font-serif font-bold text-[17px] text-[#2b1b15]">
                        Chân Dung &amp; Tư Liệu Đính Kèm
                      </h2>
                      <p className="text-[11.5px] text-[#8a6f62]">
                        Hình thể chân dung truyền thống và số hóa tài liệu cổ tự
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[#8a6f62]">
                    perm_media
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  {/* Ảnh chân dung (5 cols) */}
                  <div className="md:col-span-5 p-4 rounded-2xl bg-[#faefe3]/50 border border-[#dec9b6] text-center space-y-3">
                    <div className="w-36 h-36 mx-auto rounded-xl overflow-hidden border-2 border-[#dec9b6] bg-black/10 shadow-sm relative group">
                      <img
                        src="/images/ancestor_portrait.jpg"
                        alt="Ảnh Chân Dung"
                        className="w-full h-full object-cover filter contrast-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 cursor-pointer">
                        <span className="material-symbols-outlined text-white text-[20px]">edit</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[13px] font-bold text-[#2b1b15]">
                        Ảnh Thờ / Chân Dung Phả Hệ
                      </div>
                      <div className="text-[11px] text-[#8a6f62]">
                        Tỷ lệ 1:1, chuẩn trang thờ trong gia phả
                      </div>
                    </div>

                    <label className="inline-flex items-center gap-2 text-[11.5px] text-[#80141d] font-semibold cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={aiRestored}
                        onChange={(e) => setAiRestored(e.target.checked)}
                        className="rounded accent-[#80141d] cursor-pointer"
                      />
                      <span>Đã phục chế AI tự động (Làm nét khuôn &amp; khử nhiễu ảnh cũ)</span>
                    </label>
                  </div>

                  {/* Tài liệu đính kèm (7 cols) */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="text-[12px] font-semibold text-[#543e34]">
                      Tài liệu chứng thực &amp; Di vật liên quan
                    </div>

                    {/* Vùng kéo thả upload */}
                    <div
                      onClick={handleFileUploadMock}
                      className="p-5 rounded-2xl border-2 border-dashed border-[#dec9b6] bg-[#faefe3]/30 hover:bg-[#faefe3]/60 transition-all text-center space-y-2 cursor-pointer group"
                    >
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#faefe3] text-[#c9892c] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                      </div>
                      <div>
                        <div className="text-[12.5px] font-bold text-[#2b1b15]">
                          Kéo thả tài liệu, ảnh chụp di chúc hoặc gia phả cũ
                        </div>
                        <div className="text-[10.5px] text-[#8a6f62]">
                          Hỗ trợ PDF, JPG, PNG, DOCX (Tối đa 50MB)
                        </div>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-lg bg-white border border-[#dec9b6] text-[11px] font-bold text-[#80141d] hover:bg-[#faefe3] cursor-pointer"
                      >
                        Chọn tệp từ máy
                      </button>
                    </div>

                    {/* Danh sách tệp đã đính kèm */}
                    <div className="space-y-1.5 pt-1">
                      {attachedFiles.map((file) => (
                        <div
                          key={file}
                          className="px-3 py-2 rounded-xl bg-white border border-[#ebdcd0] flex items-center justify-between text-[11.5px] shadow-2xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="material-symbols-outlined text-[16px] text-[#c9892c]">
                              description
                            </span>
                            <span className="text-[#2b1b15] font-medium truncate">{file}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(file)}
                            className="text-[#8a6f62] hover:text-[#80141d] p-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[15px]">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------
                  06: CẤU HÌNH QUYỀN RIÊNG TƯ & KIỂM DUYỆT
                  ------------------------------------------------------- */}
              <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-[12px] shadow-xs">
                      06
                    </span>
                    <div>
                      <h2 className="font-serif font-bold text-[17px] text-[#2b1b15]">
                        Cấu Hình Quyền Riêng Tư &amp; Kiểm Duyệt
                      </h2>
                      <p className="text-[11.5px] text-[#8a6f62]">
                        Bảo hộ danh phận dòng họ và quy chế phân quyền phả hệ
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[#8a6f62]">
                    shield
                  </span>
                </div>

                {/* 3 Thẻ quyền riêng tư */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setPrivacyScope('noi_gia_toc')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      privacyScope === 'noi_gia_toc'
                        ? 'border-[#80141d] bg-[#fdf5f3] shadow-xs ring-1 ring-[#80141d]/30'
                        : 'border-[#dec9b6] bg-white hover:bg-[#faefe3]/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[16px] text-[#80141d]">lock</span>
                      <span className="text-[12.5px] font-bold text-[#80141d]">Nội Gia Tộc</span>
                    </div>
                    <p className="text-[11px] text-[#6b584d] leading-relaxed">
                      Chỉ thành viên được xác minh gia phả mới thấy mặt và thông tin chi tiết.
                    </p>
                  </div>

                  <div
                    onClick={() => setPrivacyScope('cong_khai')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      privacyScope === 'cong_khai'
                        ? 'border-[#80141d] bg-[#fdf5f3] shadow-xs ring-1 ring-[#80141d]/30'
                        : 'border-[#dec9b6] bg-white hover:bg-[#faefe3]/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[16px] text-[#543e34]">public</span>
                      <span className="text-[12.5px] font-bold text-[#543e34]">Công Khai Toàn Họ Hàng</span>
                    </div>
                    <p className="text-[11px] text-[#6b584d] leading-relaxed">
                      Chia sẻ rộng rãi toàn bộ các con cháu phả hệ qua đường link.
                    </p>
                  </div>

                  <div
                    onClick={() => setPrivacyScope('ban_tri_su')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      privacyScope === 'ban_tri_su'
                        ? 'border-[#80141d] bg-[#fdf5f3] shadow-xs ring-1 ring-[#80141d]/30'
                        : 'border-[#dec9b6] bg-white hover:bg-[#faefe3]/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[16px] text-[#543e34]">policy</span>
                      <span className="text-[12.5px] font-bold text-[#543e34]">Riêng Tư Ban Trị Sự</span>
                    </div>
                    <p className="text-[11px] text-[#6b584d] leading-relaxed">
                      Chỉ Trưởng tộc và Hội đồng Gia tộc có quyền tra cứu.
                    </p>
                  </div>
                </div>

                {/* Hộp kiểm duyệt Trưởng tộc */}
                <div className="p-4 rounded-2xl bg-[#fdf1ed] border border-[#f0cfc7] flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="leaderApproval"
                    checked={requireLeaderApproval}
                    onChange={(e) => setRequireLeaderApproval(e.target.checked)}
                    className="mt-1 rounded accent-[#80141d] cursor-pointer"
                  />
                  <label htmlFor="leaderApproval" className="cursor-pointer text-[12.5px]">
                    <span className="font-bold text-[#80141d] block">
                      Yêu cầu Trưởng tộc (Cụ Nguyễn Trực Viên) phê duyệt trước khi xuất bản lên Cây Gia Phả Chính Tông
                    </span>
                    <span className="text-[11px] text-[#6b584d] block mt-0.5 leading-relaxed">
                      Để tránh đính kèm trùng lặp hoặc sai lệch chi phái, đề xuất sẽ nằm tại mục &quot;Chờ duyệt kiểm chứng&quot; của Trưởng ban Trị sự.
                    </span>
                  </label>
                </div>
              </div>

            </div>

            {/* CỘT PHẢI: WIDGET PREVIEW & HƯỚNG DẪN CỔ PHÁP (4 COLS) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* WIDGET 1: SƠ ĐỒ PHẢ HỆ XEM TRƯỚC THỜI GIAN THỰC */}
              <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#ebdcd0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#80141d] animate-pulse"></span>
                    <span className="text-[11px] font-bold text-[#80141d] uppercase tracking-wider">
                      XEM TRƯỚC VỊ TRÍ TRÊN PHẢ ĐỒ
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#8a6f62]">
                    visibility
                  </span>
                </div>

                {/* Thẻ nốt thành viên Live */}
                <div className="p-4 rounded-2xl bg-[#fdfbf7] border-2 border-[#80141d] shadow-sm space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#80141d] bg-[#faefe3]">
                          <img
                            src="/images/ancestor_portrait.jpg"
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#80141d] text-white text-[9px] font-bold">
                          MỚI
                        </span>
                      </div>

                      <div>
                        <div className="font-serif font-bold text-[15px] text-[#80141d] leading-tight">
                          {fullName || 'Chưa nhập họ tên'}
                        </div>
                        <div className="text-[10.5px] text-[#c9892c] font-semibold mt-0.5">
                          {isDeceased ? 'Đã quy tiên' : 'Còn sống'} • {birthOrder.split(' ')[1] || 'Trưởng Nam'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#ebdcd0] text-[11px] text-[#6b584d] space-y-1">
                    <div className="flex justify-between">
                      <span>Trực hệ:</span>
                      <span className="font-semibold text-[#2b1b15]">Chi Trực Lãng</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thân phụ:</span>
                      <span className="font-semibold text-[#2b1b15]">{father.split(' (')[0] || father}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nhánh gả:</span>
                      <span className="font-semibold text-[#2b1b15]">{spouseName || 'Chưa cập nhật'}</span>
                    </div>
                  </div>

                  {/* Sơ đồ nhánh nối thu nhỏ */}
                  <div className="pt-2 border-t border-[#ebdcd0]">
                    <div className="p-2.5 rounded-xl bg-white border border-[#dec9b6] flex flex-col items-center">
                      {/* Node Thân Phụ */}
                      <div className="px-2.5 py-1 rounded-md bg-[#faefe3] border border-[#dec9b6] text-[10.5px] font-bold text-[#543e34] shadow-2xs">
                        {father.split(' (')[0] || 'Nguyễn Trực Viên'}
                      </div>

                      {/* Dây nối 90 độ */}
                      <div className="w-[1.5px] h-3 bg-[#dec9b6]"></div>
                      <div className="w-20 h-[1.5px] bg-[#dec9b6] relative">
                        <div className="absolute left-0 bottom-0 w-[1.5px] h-2.5 bg-[#dec9b6]"></div>
                        <div className="absolute right-0 bottom-0 w-[1.5px] h-2.5 bg-[#80141d]"></div>
                      </div>

                      {/* Node Con Cái */}
                      <div className="flex justify-between w-28 mt-2.5 text-[9.5px]">
                        <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                          Hương
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-[#fae8e6] text-[#80141d] font-bold border border-[#80141d] ring-1 ring-[#80141d]/30">
                          {fullName.split(' ').slice(-1)[0] || 'Đăng'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#8a6f62] italic text-center mt-1.5">
                      Vị trí dự kiến sẽ xuất hiện trên sơ đồ phân nhánh Đời {generation}
                    </p>
                  </div>
                </div>
              </div>

              {/* WIDGET 2: LỄ CÚNG PHỤNG ĐIỆP TẾ */}
              <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-5 shadow-sm space-y-3.5">
                <div className="flex items-center gap-2 pb-2 border-b border-[#ebdcd0]">
                  <span className="material-symbols-outlined text-[18px] text-[#80141d]">
                    menu_book
                  </span>
                  <h3 className="font-serif font-bold text-[14px] text-[#2b1b15]">
                    Cổ Pháp Phục Tế
                  </h3>
                </div>

                <div className="space-y-2.5 text-[11.5px] text-[#543e34]">
                  <div className="flex items-start gap-2">
                    <span className="text-[#80141d] font-bold text-[13px] leading-tight">✓</span>
                    <p>
                      <strong>Tên Húy:</strong> Sau khi thêm vào tế từ, tránh xuất hiện công khai trên bản tường trình sự.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#80141d] font-bold text-[13px] leading-tight">✓</span>
                    <p>
                      <strong>Giờ Tạ Thế:</strong> Đối soát hoa giáp và bộ sao chu kỳ thiên can địa chi, xem cung cát / hung kỵ nhật.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#80141d] font-bold text-[13px] leading-tight">✓</span>
                    <p>
                      <strong>Mộ Phần:</strong> Tọa độ GPS giúp con cháu định vị khi đi viếng sau những ngày đông chí hoặc thanh minh.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#fae8e6]/60 border border-[#f0cfc7] text-[10.5px] text-[#80141d] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] shrink-0">info</span>
                  <span>Mọi sửa đổi sau khi phê duyệt cần có sự xác thực của 2 bô lão.</span>
                </div>
              </div>

              {/* WIDGET 3: NGƯỜI TẠO HỒ SƠ */}
              <div className="rounded-3xl bg-[#ffffff] border border-[#dec9b6] p-4.5 shadow-sm flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#80141d] text-white flex items-center justify-center font-bold text-[13px] shadow-sm shrink-0">
                  NV
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-[#8a6f62] tracking-wider">
                    NGƯỜI TẠO HỒ SƠ
                  </div>
                  <div className="font-serif font-bold text-[14px] text-[#80141d] truncate">
                    Nguyễn Trực Viên
                  </div>
                  <div className="text-[10.5px] text-[#8a6f62] truncate">
                    Trưởng Tộc đời thứ 11 • Phân chi phái Sơ cao
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* =========================================================
              BOTTOM ACTION BAR (ĐẶT TÁCH BIỆT HOÀN TOÀN Ở DƯỚI)
              ========================================================= */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#dec9b6] relative z-20">
            <button
              type="button"
              onClick={() => onNavigate('cay-pha-he-25d')}
              className="px-5 py-2.5 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#543e34] font-semibold text-[13px] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>← Hủy bỏ / Quay lại</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-5 py-2.5 rounded-xl border border-[#dec9b6] bg-[#faefe3] hover:bg-[#ebdcd0] text-[#2b1b15] font-semibold text-[13px] transition-colors cursor-pointer"
              >
                Lưu Bản Nháp
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white font-bold text-[13px] shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Gửi Duyệt &amp; Ghi Vào Cây Phả Hệ</span>
                <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
