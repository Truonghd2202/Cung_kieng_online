import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface ManuscriptAnalysisScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ManuscriptAnalysisScreen: React.FC<ManuscriptAnalysisScreenProps> = ({
  onNavigate,
}) => {
  const [docFilter, setDocFilter] = useState<'original' | 'ink' | 'bright'>('original');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [selectedWord, setSelectedWord] = useState<string>('Hương hỏa');
  const [viewMode, setViewMode] = useState<'edit' | 'raw'>('edit');
  const [keyboardTab, setKeyboardTab] = useState<'quocngu' | 'nom' | 'han' | 'line'>('nom');
  const [showAIPopover, setShowAIPopover] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleSaveToGenealogy = () => {
    showToast('Đã lưu bản hiệu đính bút tích vào Cây Gia Phả & Kho Ký Ức thành công!');
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
            <span className="text-[#80141d] font-bold">Kiểm Tra Chữ Viết Tay AI</span>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto text-xs">
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#dec9b6] font-mono text-[#6b584d] text-[11px]">
              Mã bảo vật: <span className="font-bold text-[#80141d]">MS-1955-THU-08</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#faeed9] text-[#734c13] font-bold text-[10.5px] border border-[#eed9be]">
              Đã mã hóa gia tộc AES-256
            </span>
          </div>
        </div>

        {/* =========================================================
            HEADER & DOCUMENT BADGE
            ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faeed9] text-[#734c13] text-[10.5px] font-bold uppercase tracking-wider border border-[#eed9be]">
              <span className="material-symbols-outlined text-[14px]">psychology</span>
              <span>CÔNG NGHỆ THỊ GIÁC HÁN NÔM &amp; QUỐC NGỮ CỔ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#80141d] tracking-tight">
              Phân Tích &amp; Dịch Thuật Bút Tích Chữ Viết Tay Tiền Nhân
            </h1>
            <p className="text-[13px] text-[#6b584d] max-w-3xl leading-relaxed">
              Đối chiếu tài liệu gốc bằng giấy dó, thư tay cổ xưa với bản phiên âm AI. Tự động đánh dấu từ ngữ chưa rõ nét và hỗ trợ hiệu đính thủ công lưu vào gia phả dòng họ.
            </p>
          </div>

          {/* Right Document Label Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#dec9b6] shadow-2xs flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#fae8e6] text-[#80141d] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">draft</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8a6f62] uppercase tracking-wider block font-semibold">
                Tài liệu thẩm định:
              </span>
              <span className="font-serif font-bold text-[13px] text-[#2b1b15] block">
                Thư Cụ Cố Gửi Trưởng Nam
              </span>
              <span className="text-[10.5px] text-[#80141d] font-medium">
                Ất Mùi 1955 • Mực nho tím trên giấy điệp
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            MAIN 2-COLUMN WORKSPACE (5 COLS SCAN / 7 COLS TRANSLATION)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1 items-start">
          {/* LEFT COLUMN: SCAN CANVAS & CONTEXT (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Image Viewer Toolbar */}
            <div className="flex items-center justify-between text-xs bg-white p-2 rounded-2xl border border-[#dec9b6] shadow-2xs">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setZoomLevel(zoomLevel === 100 ? 150 : 100)}
                  className="px-2.5 py-1 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] text-[#2b1b15] font-semibold text-[11px] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                  <span>{zoomLevel}%</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  className="px-2.5 py-1 rounded-lg border border-[#dec9b6] hover:bg-[#faefe3] text-[#2b1b15] font-semibold text-[11px]"
                >
                  Vừa khung
                </button>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setDocFilter('original')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    docFilter === 'original'
                      ? 'bg-[#80141d] text-white'
                      : 'border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
                  }`}
                >
                  Bản gốc
                </button>
                <button
                  type="button"
                  onClick={() => setDocFilter('ink')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    docFilter === 'ink'
                      ? 'bg-[#80141d] text-white'
                      : 'border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
                  }`}
                >
                  Tách mực nho
                </button>
                <button
                  type="button"
                  onClick={() => setDocFilter('bright')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    docFilter === 'bright'
                      ? 'bg-[#80141d] text-white'
                      : 'border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
                  }`}
                >
                  Sáng giấy điệp
                </button>
              </div>
            </div>

            {/* Original Scan Paper Canvas */}
            <div className="relative aspect-[4/5] rounded-3xl bg-[#201815] border border-[#dec9b6] overflow-hidden shadow-md flex items-center justify-center p-3 select-none">
              <div
                className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-300 ${
                  docFilter === 'ink'
                    ? 'filter contrast-150 grayscale'
                    : docFilter === 'bright'
                    ? 'filter brightness-125 sepia-[0.2]'
                    : 'filter sepia-[0.35] contrast-110'
                }`}
              >
                <img
                  src="/images/relic_book.jpg"
                  alt="Bút tích thư tay cổ 1955"
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                />

                {/* Simulated Bounding Box for Word 1 (Hương hỏa) */}
                <div
                  onClick={() => setShowAIPopover(true)}
                  className="absolute top-[48%] left-[28%] w-[26%] h-[7%] border-2 border-[#80141d] bg-[#80141d]/20 rounded-md cursor-pointer animate-pulse"
                  title="Từ nghi vấn: Hương hỏa"
                ></div>

                {/* Simulated Bounding Box for Word 2 (Nghiệp tổ) */}
                <div
                  className="absolute top-[72%] left-[42%] w-[24%] h-[7%] border-2 border-[#c9892c] bg-[#c9892c]/20 rounded-md cursor-pointer"
                  title="Từ nghi vấn: Nghiệp tổ"
                ></div>
              </div>

              {/* Annotation hints on canvas */}
              <div className="absolute bottom-10 inset-x-4 bg-black/80 backdrop-blur-xs rounded-2xl p-2.5 border border-white/15 flex items-center justify-between text-white text-[10.5px]">
                <span className="text-[#e8b56f] font-semibold">3 vùng bút tích bất định</span>
                <span className="text-white/80">Nhấp vào ô khoanh vùng để chuyển tới chữ cần sửa</span>
                <span className="material-symbols-outlined text-[14px] text-[#e8b56f]">pan_tool</span>
              </div>

              {/* Bottom Canvas Tag */}
              <div className="absolute bottom-2 left-4 text-[10px] text-white/70 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-emerald-400">check_circle</span>
                <span>Bóc Tách Số Tộc Nguyễn • Bản chụp phân giải 4K (600 DPI)</span>
              </div>
            </div>

            {/* Context Card: Bối Cảnh Bút Tích Gia Bảo */}
            <div className="p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/50">
                <h3 className="font-serif font-bold text-[14px] text-[#2b1b15] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#80141d]">menu_book</span>
                  <span>Bối Cảnh Bút Tích Gia Bảo</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#faeed9] text-[#734c13] font-bold">
                  Kỷ vật đời thứ 9
                </span>
              </div>

              <p className="text-[12px] text-[#6b584d] leading-relaxed">
                Thư do Cụ Cố Nguyễn Trực Khang (1889 – 1968) khởi thảo dặn dò con cháu chi Trực Lăng việc phụng tự nhà thờ chi họ và gìn giữ ruộng hương hỏa tại làng Tiên Lục, tỉnh Bắc Giang. Bản viết bằng chữ Quốc ngữ đời đầu, đan xen thuật ngữ cổ Hán Nôm thường dùng trong hương ước đình làng.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-1 text-[11px] text-[#2b1b15]">
                <div className="p-2.5 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60">
                  <span className="text-[#8a6f62] block text-[10px]">Tình trạng vật lý:</span>
                  <span className="font-semibold">Giấy ố, rách góc trái</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60">
                  <span className="text-[#8a6f62] block text-[10px]">Chất liệu nét bút:</span>
                  <span className="font-semibold">Mực tím nhập khẩu Pháp</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60">
                  <span className="text-[#8a6f62] block text-[10px]">Người phụ trách bảo quản:</span>
                  <span className="font-semibold">Trưởng chi Trực Lăng</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#fdfaf5] border border-[#dec9b6]/60">
                  <span className="text-[#8a6f62] block text-[10px]">Lưu trữ vật lý tại:</span>
                  <span className="font-semibold">Hòm gỗ mít Tộc Từ đường</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: AI TRANSLATION & EDITING INTERACTION (7 COLS) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Accuracy & View Modes Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#dec9b6] shadow-2xs text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[#6b584d]">
                  Độ chuẩn xác phiên âm: <strong className="text-[#80141d] font-bold text-sm">94.2%</strong>
                </span>
                <span className="text-[10.5px] text-[#8a6f62] hidden sm:inline">
                  • Phát hiện 3 từ cần thẩm định &amp; đối chiếu thư tịch
                </span>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('edit')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    viewMode === 'edit'
                      ? 'bg-[#80141d] text-white shadow-xs'
                      : 'border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
                  }`}
                >
                  Xem &amp; Hiệu Đính
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('raw')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    viewMode === 'raw'
                      ? 'bg-[#80141d] text-white shadow-xs'
                      : 'border border-[#dec9b6] text-[#6b584d] hover:bg-[#faefe3]'
                  }`}
                >
                  Chỉ văn bản thô
                </button>
              </div>
            </div>

            {/* Manuscript Transcription Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-4 relative">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/50">
                <span className="font-serif font-bold text-[#80141d] text-[13px] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  <span>Văn Bản Phiên Âm Bút Tích (Tháng 8 Năm 1955)</span>
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#fae8e6] text-[#80141d] font-bold text-[10px] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">lock</span>
                  <span>ẤN TRUYỀN DÒNG HỌ</span>
                </span>
              </div>

              {/* Body Text */}
              <div className="space-y-3.5 font-serif text-[14.5px] text-[#2b1b15] leading-relaxed relative">
                <p className="italic text-[#6b584d]">
                  &ldquo;Thư thảo gửi con trai trưởng Nguyễn Trực An và các cháu trong nội tộc chi Trực Lăng nghe răn dạy:&rdquo;
                </p>

                <p>
                  Tiết trời thu năm Ất Mùi (1955). Nay ta tuổi tác đã xế chiều, mắt mờ chân mỏi, bèn hạ bút dặn dò đôi điều việc chung của dòng họ. Từ xưa tới nay, cây có cội mới trổ cành xanh ngọn, nước có nguồn mới biển rộng sông dài. Phần đất tự điền năm sào tại bãi Chùa cùng hai gian nhà thờ cổ vốn là phần{' '}
                  <span
                    onClick={() => setShowAIPopover(true)}
                    className="bg-[#faeed9] text-[#734c13] font-bold px-1.5 py-0.5 rounded border border-[#c9892c] cursor-pointer hover:bg-[#faefe3] relative inline-flex items-center gap-0.5"
                  >
                    <span>[Hương hỏa]</span>
                    <span className="material-symbols-outlined text-[12px] text-[#c9892c]">tune</span>
                  </span>{' '}
                  truyền đời từ đời Cao tổ để lại. Tuyệt đối không được bán, không được đem cầm cho người ngoài.
                </p>

                {/* Floating AI Suggestion Popover on Hương hỏa */}
                {showAIPopover && (
                  <div className="my-3 p-4 rounded-2xl bg-[#fffdfa] border-2 border-[#c9892c] shadow-lg space-y-2.5 animate-fade-in relative z-20">
                    <div className="flex items-center justify-between text-xs pb-1.5 border-b border-[#dec9b6]/50">
                      <span className="font-bold text-[#80141d] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#c9892c]">psychology</span>
                        <span>Gợi Ý Trí Tuệ Nhân Tạo AI</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10.5px] text-[#734c13] bg-[#faeed9] px-2 py-0.5 rounded-full font-bold">
                          Độ tin cậy: 68%
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAIPopover(false)}
                          className="text-[#8a6f62] hover:text-[#80141d]"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#6b584d]">
                      Nét mực chữ Quốc ngữ bị nhòe bởi nếp gấp giấy điệp góc hạ.
                    </p>

                    <div className="space-y-1.5 text-xs">
                      {[
                        { word: 'Hương hỏa (香火)', conf: '65% chuẩn' },
                        { word: 'Hương ước (香約)', conf: '25% chuẩn' },
                        { word: 'Phụng hỏa (奉火)', conf: '10% chuẩn' },
                      ].map((item, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setSelectedWord(item.word.split(' ')[0]);
                            showToast(`Đã chọn từ: ${item.word}`);
                          }}
                          className="p-2 rounded-xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <span className="font-bold text-[#2b1b15]">{i + 1}. {item.word}</span>
                          <span className="text-[11px] text-[#80141d] font-semibold">{item.conf}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={selectedWord}
                        onChange={(e) => setSelectedWord(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-[#dec9b6] text-xs bg-white text-[#2b1b15] focus:outline-none focus:border-[#80141d]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowAIPopover(false);
                          showToast('Đã xác nhận chỉnh sửa từ.');
                        }}
                        className="px-4 py-1.5 rounded-xl bg-[#80141d] text-white font-bold text-xs hover:bg-[#681017] cursor-pointer"
                      >
                        Sửa
                      </button>
                    </div>
                  </div>
                )}

                <p>
                  Việc cúng giỗ tiết Thanh Minh và ngày kỵ của các bậc Tiên tổ hàng năm, các con phải tụ họp đầy đủ. Lễ vật tùy nghi biện lễ cốt lấy lòng kính trọng làm trọng tâm, chớ cầu kỳ tốn kém sinh bất hòa. Huynh đệ phải thương yêu đùm bọc lẫn nhau, giữ gìn danh dự nề nếp{' '}
                  <span className="bg-[#faeed9] text-[#734c13] font-bold px-1.5 py-0.5 rounded border border-[#c9892c]">
                    [Nghiệp tổ]
                  </span>
                  , chớ phụ công ơn tiền nhân khai hoang lập ấp xứ này.&rdquo;
                </p>

                <div className="pt-3 text-right">
                  <div className="font-serif font-bold text-[#80141d] text-[15px]">
                    Nguyễn Trực Khang
                  </div>
                  <div className="text-[11px] text-[#6b584d] italic">
                    Trưởng chi đời thứ 9 khuyên dặn
                  </div>
                </div>
              </div>
            </div>

            {/* Helper Keyboards / Annotations Tab */}
            <div className="p-4 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-[#dec9b6]/50">
                <span className="font-bold text-[#80141d] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">keyboard</span>
                  <span>Bộ Gõ Bổ Trợ Hiệu Đính:</span>
                </span>
                <div className="flex items-center gap-1">
                  {(['quocngu', 'nom', 'han', 'line'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setKeyboardTab(tab)}
                      className={`px-2 py-0.5 rounded text-[10.5px] font-semibold cursor-pointer ${
                        keyboardTab === tab
                          ? 'bg-[#80141d] text-white'
                          : 'bg-[#fdfaf5] text-[#6b584d] hover:bg-[#faefe3]'
                      }`}
                    >
                      {tab === 'quocngu' && 'Quốc Ngữ'}
                      {tab === 'nom' && 'Chữ Nôm (喃)'}
                      {tab === 'han' && 'Chữ Hán (漢)'}
                      {tab === 'line' && 'Đối ứng dòng'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#2b1b15]">
                <span className="text-[11px] text-[#8a6f62]">Ký tự Nôm/Cổ nhanh:</span>
                {['𦝄 (Của)', '𡥵 (Con)', '𠊛 (Người)', '𡦂 (Chữ)', '𱂠 (Lời)', '𬖍 (Hương)', '父 (Phụ)', '事 (Quyền)'].map((char, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => showToast(`Đã chèn ký tự cổ: ${char}`)}
                    className="px-2 py-1 rounded-lg bg-[#fdfaf5] border border-[#dec9b6] hover:bg-[#faefe3] cursor-pointer text-[11px] font-serif font-bold text-[#80141d]"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>

            {/* Glossary & Cultural Notes (Từ Điển Thuật Ngữ & Điển Tích) */}
            <div className="p-5 rounded-3xl bg-white border border-[#dec9b6] shadow-2xs space-y-3">
              <h4 className="font-serif font-bold text-[#80141d] text-[13.5px] flex items-center gap-1.5 pb-1 border-b border-[#dec9b6]/50">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Từ Điển Thuật Ngữ &amp; Điển Tích Văn Học Trong Thư</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6b584d] leading-relaxed">
                <div className="p-3 rounded-2xl bg-[#fdfaf5] border border-[#dec9b6]/60 space-y-1">
                  <span className="font-bold text-[#2b1b15] block">Hương hỏa (香火):</span>
                  Đất đai hoặc tài sản dùng để tạo hoa lợi cúng tế tổ tiên, đời đời truyền cho con trưởng, không chia chác.
                </div>

                <div className="p-3 rounded-2xl bg-[#fdfaf5] border border-[#dec9b6]/60 space-y-1">
                  <span className="font-bold text-[#2b1b15] block">Tự điền (祀田):</span>
                  Ruộng tế tự của chi phái họ tộc, hoa lợi nộp vào quỹ tổ dùng mua hương hoa, lễ vật ngày giỗ chạp.
                </div>

                <div className="p-3 rounded-2xl bg-[#fdfaf5] border border-[#dec9b6]/60 space-y-1">
                  <span className="font-bold text-[#2b1b15] block">Thế thứ (世次):</span>
                  Ngôi thứ trên dưới giữa các nhánh trưởng, thứ trong họ tộc theo gia phổ nghiêm minh.
                </div>

                <div className="p-3 rounded-2xl bg-[#fdfaf5] border border-[#dec9b6]/60 space-y-1">
                  <span className="font-bold text-[#2b1b15] block">Hèm tế (品禮):</span>
                  Quy ước cúng bái đặc biệt và các món kiêng cữ cổ truyền theo tích xưa của cụ tổ làng Tiên Lục.
                </div>
              </div>
            </div>

            {/* 3 Bottom Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => showToast('Đang tạo tệp văn bản PDF / Word kèm bản chụp sắc nét...')}
                className="py-3 rounded-2xl border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-[#2b1b15] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">download</span>
                <span>Xuất PDF / DOCX</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Đã gửi tài liệu đến Hội đồng Cố vấn Viện Nghiên cứu Hán Nôm')}
                className="py-3 rounded-2xl border border-[#dec9b6] bg-[#faeed9] hover:bg-[#faefe3] text-[#734c13] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px] text-[#c9892c]">send</span>
                <span>Gửi Bản Cố Vấn Hán Nôm</span>
              </button>

              <button
                type="button"
                onClick={handleSaveToGenealogy}
                className="py-3 rounded-2xl bg-[#80141d] hover:bg-[#681017] text-white font-serif font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Lưu Bản Hiệu Đính Vào Gia Phả</span>
              </button>
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
