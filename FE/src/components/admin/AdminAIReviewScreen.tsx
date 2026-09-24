import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminAIReviewScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminAIReviewScreen: React.FC<AdminAIReviewScreenProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'urgent' | 'low_conf' | 'auto' | 'rejected'>('urgent');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAE1D3] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-3.5 bg-[#80141d] rounded-full inline-block"></span>
            <span className="text-[11px] font-bold tracking-wider text-[#80141d] uppercase font-mono">
              QUY CHUẨN GIÁM ĐỊNH DI SẢN QUỐC GIA • Hội Đồng Hán Nôm &amp; Nhân Chủng Học
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Hội Đồng Thẩm Định &amp; Kiểm Chuẩn Kết Quả AI
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Đối soát chuẩn mực chân dung tiền nhân, phục dựng sắc phong và dịch tự văn bia trước khi niêm ấn nhập vào sổ bộ phả ký vĩnh cửu.
          </p>
        </div>

        {/* Right Expert Profile Card */}
        <div className="p-3 rounded-2xl bg-[#faefe3]/70 border border-[#dec9b6] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#80141d] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]">psychology</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block font-semibold uppercase">GIÁM ĐỊNH VIÊN PHIÊN THẨM</span>
            <h4 className="text-xs font-bold text-stone-900 font-serif">GS. Trần Trọng Dương</h4>
            <p className="text-[10.5px] text-stone-500">Viện Nghiên Cứu Hán Nôm • Chuyên ban Bia ký</p>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50 shrink-0">
            THẨM ĐỊNH CẤP 3
          </span>
        </div>
      </div>

      {/* Filter Tabs & Optics Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveFilter('urgent')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'urgent'
                ? 'bg-[#80141d] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-[#dec9b6] hover:bg-[#faefe3]'
            }`}
          >
            <span>!</span>
            <span>Cần Thẩm Định Khẩn (34)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('low_conf')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'low_conf'
                ? 'bg-[#80141d] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-[#dec9b6] hover:bg-[#faefe3]'
            }`}
          >
            <span>⚠</span>
            <span>Điểm Tin Cậy Thấp &lt;85% (18)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('auto')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'auto'
                ? 'bg-[#80141d] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-[#dec9b6] hover:bg-[#faefe3]'
            }`}
          >
            <span>✓</span>
            <span>Đã Duyệt Tự Động (1,420)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('rejected')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'rejected'
                ? 'bg-[#80141d] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-[#dec9b6] hover:bg-[#faefe3]'
            }`}
          >
            <span>✕</span>
            <span>Bị Bác Bỏ (12)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600">
          <span className="font-semibold">Độ phóng đại:</span>
          <span className="font-mono font-bold text-[#80141d]">250%</span>
          <span className="text-stone-400">(Phân tích quang học)</span>
          <button className="p-1 rounded-lg hover:bg-stone-100 text-stone-600 ml-1">
            <span className="material-symbols-outlined text-[16px]">compare</span>
          </button>
          <button className="p-1 rounded-lg hover:bg-stone-100 text-stone-600">
            <span className="material-symbols-outlined text-[16px]">contrast</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Comparison Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Column 1: Tư Liệu Gốc Cổ Bản (4/12) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#dec9b6] p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/60">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-sm">
                <span className="material-symbols-outlined text-[18px] text-[#80141d]">menu_book</span>
                <span>Tư Liệu Gốc Cổ Bản</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#faeed9] text-[#80141d]">
                Hồ sơ #HN-1892-TX
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Bản dập rập văn bia đá vôi Thanh Hóa (1892) &amp; di ảnh cụ Cố Nguyễn Bá Kính (chụp tại xưởng ảnh Khánh Ký, Hà Nội 1920) bị ố mốc, tróc thủy ngân và mất nét do ẩm khí.
            </p>

            {/* Image 1: Bản dập đá */}
            <div className="space-y-1">
              <div className="relative rounded-xl overflow-hidden h-36 border border-[#dec9b6] bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80"
                  alt="Bản dập đá Thanh Hóa"
                  className="w-full h-full object-cover grayscale contrast-150"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-serif text-[10px]">
                  Bản dập đá Thanh Hóa (1892)
                </span>
              </div>
              <div className="flex justify-between text-[10.5px] text-stone-500">
                <span>Tình trạng vật lý: Nứt gãy ngang, rỗ mặt 42% diện tích</span>
                <span className="font-mono font-bold">Quét 1200 DPI</span>
              </div>
            </div>

            {/* Image 2: Di ảnh Cổ Đại Huynh */}
            <div className="space-y-1 pt-1">
              <div className="relative rounded-xl overflow-hidden h-36 border border-[#dec9b6] bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80"
                  alt="Di ảnh Cổ Đại Huynh"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-serif text-[10px]">
                  Di ảnh Cổ Đại Huynh (1920)
                </span>
              </div>
              <div className="flex justify-between text-[10.5px] text-stone-500">
                <span>Thế hệ thứ 11 • Chi Phái 2 Vĩnh Lộc</span>
                <span className="font-mono text-[10px]">MD5: c9f2..8a1</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#faefe3]/70 border border-[#dec9b6] text-[11px] text-stone-600 flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-amber-700 shrink-0 mt-0.5">info</span>
            <p className="leading-snug">
              Được bảo tồn tại Nhà thờ tổ họ Nguyễn, Chi phái Vĩnh Lộc, Thanh Hóa. Người gửi: Trưởng tộc Nguyễn Bá Hưng.
            </p>
          </div>
        </div>

        {/* Column 2: Kết Quả Phục Chế & Phiên Dịch AI (4/12) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#dec9b6] p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/60">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-sm">
                <span className="material-symbols-outlined text-[18px] text-[#c9892c]">auto_fix_high</span>
                <span>Kết Quả Phục Chế &amp; Phiên Dịch AI</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#faefe3] text-stone-800">
                Mô hình: TCK-Heritage-LLM v4.2
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Chân dung phục dựng sắc nét bảo toàn nhân dạng &amp; Bản phiên âm Hán Nôm chiết tự đối chiếu ngữ pháp thời Nguyễn (Thành Thái thứ 4).
            </p>

            {/* Restored color portrait */}
            <div className="space-y-1">
              <div className="relative rounded-xl overflow-hidden h-44 border border-[#dec9b6] bg-amber-50">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80"
                  alt="Restored Portrait"
                  className="w-full h-full object-cover contrast-105"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#80141d]/90 text-white font-serif text-[10px] font-bold">
                  Phục chế màu sơn mài &amp; lụa cổ
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-800/90 text-white font-mono text-[10px] font-bold">
                  Độ chuẩn nét: 98.7%
                </span>
              </div>
              <div className="flex justify-between text-[10.5px] text-stone-500">
                <span>Tái tạo cấu trúc tóc, nếp khăn đóng &amp; vạt áo the nguyên gốc</span>
                <span className="text-emerald-700 font-semibold">Không khử nhiễu quá đà</span>
              </div>
            </div>

            {/* Phiên âm Hán Nôm & Quốc Ngữ */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex justify-between items-center text-[10.5px] font-bold text-stone-500 uppercase">
                <span>PHIÊN ÂM HÁN NÔM &amp; QUỐC NGỮ PHÂN ĐOẠN</span>
                <span className="font-mono text-stone-400">Văn bia dòng 07 - 12</span>
              </div>

              {/* Hán tự box */}
              <div className="p-3 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6] font-serif text-sm text-stone-900 leading-relaxed tracking-wide">
                欽定 阮朝 成泰 肆年 歲次 壬辰 孟冬 朔日 <strong className="text-[#80141d]">[香火]</strong> 田土 遺命 孫枝 世代 恪守 <strong className="text-[#80141d]">[祀田]</strong> 不得 擅變...
              </div>

              {/* Standard translation */}
              <div className="p-3 rounded-xl bg-[#fcf8f2] border border-[#dec9b6]/60 text-[11.5px] text-stone-700 leading-relaxed">
                <span className="font-bold text-stone-900 block mb-0.5">BẢN DỊCH NGHĨA TIÊU CHUẨN (AI ĐỀ XUẤT):</span>
                &quot;Khâm định Triều Nguyễn, năm Thành Thái thứ tư (1892), năm Nhâm Thìn, ngày mồng một đầu đông. Phần điền thổ hương hỏa di mệnh để lại cho con cháu muôn đời kính cẩn giữ gìn, ruộng tự điền cúng giỗ không được tự ý sang nhượng...&quot;
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 text-xs flex items-center justify-between text-[#80141d]">
            <span className="flex items-center gap-1 font-semibold text-[11px]">
              <span className="material-symbols-outlined text-[15px]">spellcheck</span>
              2 từ Hán Nôm cảnh báo cần chuẩn hóa tự dạng
            </span>
            <button
              type="button"
              onClick={() => alert('Tra cứu từ điển Taberd 1838')}
              className="font-bold underline hover:text-[#661017] text-[11px]"
            >
              Xem Từ Điển Taberd 1838
            </button>
          </div>
        </div>

        {/* Column 3: Bảng Chấm Điểm & Phê Duyệt (4/12) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#dec9b6] p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/60">
              <h3 className="font-serif font-bold text-stone-900 text-sm">
                Bảng Chấm Điểm
              </h3>
              <span className="material-symbols-outlined text-[18px] text-stone-400">score</span>
            </div>

            {/* Score 1 */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-stone-700">Độ trung thực nguyên bản</span>
                <span className="text-base font-bold font-serif text-[#80141d]">96.4<span className="text-xs text-stone-400">/100</span></span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Không làm biến đổi tỉ lệ nhân trắc học tiền nhân
              </p>
            </div>

            {/* Score 2 */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-stone-700">Tính chuẩn xác văn tự Nôm</span>
                <span className="text-base font-bold font-serif text-[#c9892c]">94.2<span className="text-xs text-stone-400">/100</span></span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10.5px] text-amber-900 leading-snug">
                Chữ &apos;Hương Hỏa&apos; (稥火/香火) &amp; &apos;Tự Điền&apos; (祀田) cần kiểm tra lại thể chữ triện khắc trên trán bia.
              </div>
            </div>

            {/* Score 3 */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-stone-700">Cảnh báo Bịa Chữ (Hallucination)</span>
                <span className="text-base font-bold font-serif text-emerald-700">0.0%</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Tuyệt đối an toàn: Không phát hiện tự suy diễn các nét đá nứt.
              </p>
            </div>

            {/* Bar Chart: Phân Bố Độ Tự Tin Âm Vị */}
            <div className="pt-2 border-t border-[#dec9b6]/60 space-y-1.5">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                PHÂN BỐ ĐỘ TỰ TIN ÂM VỊ
              </span>
              <div className="grid grid-cols-6 gap-1 h-12 items-end pt-1">
                {[
                  { label: 'Đoạn 1', height: 'h-8', color: 'bg-rose-300' },
                  { label: 'Đoạn 2', height: 'h-9', color: 'bg-rose-400' },
                  { label: 'Đoạn 3', height: 'h-11', color: 'bg-amber-600' },
                  { label: 'Đoạn 4', height: 'h-8', color: 'bg-rose-300' },
                  { label: 'Đoạn 5', height: 'h-12', color: 'bg-amber-800' },
                  { label: 'Đoạn 6', height: 'h-12', color: 'bg-amber-900' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className={`w-full rounded-xs ${item.height} ${item.color}`}></div>
                    <span className="text-[8px] text-stone-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert comment */}
            <div className="p-3 rounded-xl bg-[#faefe3]/70 border border-[#dec9b6] text-xs space-y-1">
              <div className="flex justify-between text-[10.5px] font-bold text-stone-800">
                <span>Ý Kiến Thẩm Định Viện Hán Nôm</span>
                <span className="text-emerald-700">Ký số xác thực</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">
                &quot;Đồng thuận niên hiệu Thành Thái 4, Chữ &apos;Hương Hỏa&apos; nguyên bản khắc bộ Hương (香)...&quot;
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => alert('Đã phê duyệt kết quả và đóng dấu mộc đỏ lưu trữ vĩnh viễn')}
              className="w-full py-2.5 bg-[#80141d] hover:bg-[#661017] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Phê Duyệt Chuẩn Di Sản (Dấu Mộc Đỏ)</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Đã gửi yêu cầu chạy lại với tham số tinh chỉnh')}
              className="w-full py-2 bg-[#faeed9] hover:bg-[#faefe3] border border-[#f3b750]/50 text-[#80141d] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              <span>Yêu Cầu Chạy Lại Với Prompt Tinh Chỉnh</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => alert('Đã chuyển sang biên tập thủ công')}
                className="py-1.5 px-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
                <span>Bác Bỏ &amp; Sửa</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Đã gửi thông báo đối chiếu đến Trưởng tộc')}
                className="py-1.5 px-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">send</span>
                <span>Gửi Trưởng Tộc</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Queue: Hàng Đợi Chờ Thẩm Định Kế Tiếp */}
      <div className="bg-white rounded-2xl border border-[#dec9b6] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#80141d]">queue</span>
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Hàng Đợi Chờ Thẩm Định Kế Tiếp
            </h3>
            <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#faeed9] text-[#80141d]">
              34 Hồ sơ sẵn sàng
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-500 font-mono">
            <button className="px-1.5 py-0.5 rounded hover:bg-stone-100">‹</button>
            <span className="font-bold text-stone-800">1 / 6</span>
            <button className="px-1.5 py-0.5 rounded hover:bg-stone-100">›</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Item 1 */}
          <div className="p-3 rounded-xl bg-[#faefe3]/70 border-2 border-[#80141d] flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-amber-100 overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=120&auto=format&fit=crop&q=80"
                alt="thumb"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#80141d] text-[11px]">#HN-1892-TX</span>
                <span className="text-[10px] text-[#80141d] font-bold">Đang soi</span>
              </div>
              <h5 className="font-bold text-stone-900 truncate">Văn bia &amp; Chân dung...</h5>
              <p className="text-[10.5px] text-stone-500">Thanh Hóa • Độ tin cậy: 96.4%</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="p-3 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3]/40 flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=120&auto=format&fit=crop&q=80"
                alt="thumb"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-stone-700 text-[11px]">#SP-1790-HN</span>
                <span className="text-[10px] text-amber-800 font-bold">81.0%</span>
              </div>
              <h5 className="font-bold text-stone-900 truncate">Sắc phong Tây Sơn Cả...</h5>
              <p className="text-[10.5px] text-stone-500">Bắc Ninh • Rách mép ấn triện</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="p-3 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3]/40 flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
                alt="thumb"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-stone-700 text-[11px]">#CD-1935-TG</span>
                <span className="text-[10px] text-emerald-700 font-bold">97.8%</span>
              </div>
              <h5 className="font-bold text-stone-900 truncate">Chân dung Cố Mẫu Lê...</h5>
              <p className="text-[10.5px] text-stone-500">Tiền Giang • Chi Nhánh Nam Bộ</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="p-3 rounded-xl bg-white border border-[#dec9b6] hover:bg-[#faefe3]/40 flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=120&auto=format&fit=crop&q=80"
                alt="thumb"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-stone-700 text-[11px]">#MC-1845-QB</span>
                <span className="text-[10px] text-amber-800 font-bold">84.5%</span>
              </div>
              <h5 className="font-bold text-stone-900 truncate">Minh chuông từ đường...</h5>
              <p className="text-[10.5px] text-stone-500">Quảng Bình • Chữ mờ do rỉ đồng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
