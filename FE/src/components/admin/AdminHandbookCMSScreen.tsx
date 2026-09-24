import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminHandbookCMSScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminHandbookCMSScreen: React.FC<AdminHandbookCMSScreenProps> = ({ onNavigate }) => {
  const [regionFilter, setRegionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAE1D3] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-3.5 bg-[#80141d] rounded-full inline-block"></span>
            <span className="text-[11px] font-bold tracking-wider text-[#80141d] uppercase font-mono">
              TỔNG TRỊ SỰ PHẢ HỆ • KHỞI NGHỆ LỄ CỔ TRUYỀN
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Hệ Thống CMS Cẩm Nang Nghi Lễ &amp; Tri Thức Di Sản
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Cơ sở dữ liệu điển chương, văn tế, tập tục thờ phụng và quy chuẩn lễ nghi bách nghệ theo nếp xưa thuần phong mỹ tục Việt Nam.
          </p>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => alert('Mở cửa sổ nhập văn bản Hán Nôm hàng loạt qua file XML/Word')}
            className="px-3.5 py-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-stone-600">upload_file</span>
            <span>Nhập Văn Bản Hán Nôm Hàng Loạt</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Mở trình soạn thảo nghi lễ mới')}
            className="px-4 py-2 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>+ Soạn Nghi Lễ Mới</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>NGHI LỄ CHUẨN QUỐC GIA</span>
            <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-[#80141d]">52</span>
            <span className="text-xs text-stone-600 font-medium">quy chuẩn bảo tồn</span>
          </div>
          <p className="text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            Đã chuẩn hóa 4 thời vụ tế tự
          </p>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>VĂN KHẤN CỔ TRUYỀN 3 MIỀN</span>
            <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#c9892c]">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-stone-900">128</span>
            <span className="text-xs text-stone-600 font-medium">bản khắc phục chế</span>
          </div>
          <p className="text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            Kèm phiên âm Quốc ngữ chuẩn xác
          </p>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>ĐIỂN TÍCH GIA HUẤN</span>
            <div className="w-7 h-7 rounded-lg bg-[#faefe3] border border-[#dec9b6] flex items-center justify-center text-amber-800">
              <span className="material-symbols-outlined text-[16px]">temple_buddhist</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-stone-900">48</span>
            <span className="text-xs text-stone-600 font-medium">bài học gia đạo</span>
          </div>
          <p className="text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            Từ đường, lăng miếu &amp; đại tôn
          </p>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>HỘI ĐỒNG CỐ VẤN HÁN NÔM</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[16px]">school</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-stone-900">16</span>
            <span className="text-xs text-stone-600 font-medium">học gia viện nghiên cứu</span>
          </div>
          <p className="text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            100% chứng thực khóa số ký điện tử
          </p>
        </div>
      </div>

      {/* Highlight Source Banner: NGUỒN DI SẢN VIỆN HÁN NÔM */}
      <div className="p-5 rounded-2xl bg-[#faefe3]/70 border border-[#dec9b6] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d] shrink-0">
            <span className="material-symbols-outlined text-[26px]">import_contacts</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                NGUỒN DI SẢN VIỆN HÁN NÔM
              </span>
              <span className="text-[10px] font-mono text-stone-400">Thư viện số TCK • 2025</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif mt-0.5">
              Đối chiếu song bản Việt Nam Phong Tục &amp; Nếp Cũ
            </h3>
            <p className="text-xs text-stone-600 mt-0.5 leading-relaxed max-w-3xl">
              Tất cả văn khấn và lễ nghi trước khi xuất bản đều được quy chiếu qua các ấn bản học thuật mẫu mực của Phan Kế Bính (1915), Toan Ánh (1968), kết hợp hiệu đính các văn bia sắc phong tộc phả lưu giữ tại Viện Nghiên cứu Hán Nôm.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start lg:self-auto shrink-0">
          <div className="flex items-center -space-x-1.5">
            <span className="w-7 h-7 rounded-full bg-[#80141d] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-2xs">
              ĐT
            </span>
            <span className="w-7 h-7 rounded-full bg-[#c9892c] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-2xs">
              VN
            </span>
            <span className="w-7 h-7 rounded-full bg-stone-700 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-2xs">
              NĐ
            </span>
          </div>
          <button
            type="button"
            onClick={() => alert('Mở bảng khảo dị văn bản')}
            className="px-3 py-2 bg-white hover:bg-[#faefe3] border border-[#dec9b6] text-stone-800 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Xem Biên Bản Khảo Dị
          </button>
        </div>
      </div>

      {/* Filter Bar: Bộ Lọc Điển Chương Văn Hóa */}
      <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
            <span className="material-symbols-outlined text-[17px] text-[#80141d]">filter_list</span>
            <span>Bộ Lọc Điển Chương Văn Hóa</span>
          </div>
          <button
            type="button"
            onClick={() => setRegionFilter('all')}
            className="text-[11px] font-semibold text-stone-500 hover:text-[#80141d] flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>Thiết lập lại bộ lọc</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Region buttons */}
          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              PHẠM VI ĐỊA LÝ &amp; PHONG THỔ
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'Toàn quốc' },
                { id: 'bac', label: 'Bắc Bộ' },
                { id: 'trung', label: 'Trung Bộ' },
                { id: 'nam', label: 'Nam Bộ' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setRegionFilter(btn.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    regionFilter === btn.id
                      ? 'bg-[#80141d] text-white shadow-2xs font-bold'
                      : 'bg-[#fcf8f2] text-stone-700 border border-[#dec9b6] hover:bg-[#faefe3]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Classification */}
          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              PHÂN LOẠI TIẾT KHÍ &amp; ĐỜI SỐNG
            </label>
            <select className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-hidden">
              <option>Tế Tự Tứ Thời (Tết, Thanh Minh, Vu Lan, T...</option>
              <option>Hiếu Hỉ &amp; Gia Tộc</option>
              <option>Kiến Thiết Từ Đường &amp; Lăng Mộ</option>
            </select>
          </div>

          {/* Workflow Status */}
          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              QUY TRÌNH HIỆU KHẢO &amp; PHÊ PHÁN
            </label>
            <div className="flex items-center gap-2 pt-1.5">
              <span className="flex items-center gap-1 font-semibold text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-700"></span>
                Đã duyệt (42)
              </span>
              <span className="flex items-center gap-1 font-semibold text-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                Thẩm định (8)
              </span>
              <span className="flex items-center gap-1 font-semibold text-stone-500">
                <span className="w-2 h-2 rounded-full bg-stone-400"></span>
                Bản thảo (2)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table: Mục lục Điển Thờ Phụng */}
      <div className="bg-white rounded-2xl border border-[#dec9b6] shadow-xs overflow-hidden">
        {/* Table Title Bar */}
        <div className="p-4 border-b border-[#dec9b6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fdfaf5]">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Mục lục Điển Thờ Phụng
            </h3>
            <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#faeed9] text-[#80141d]">
              52 Mục Lục
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm theo tên bài, trích dẫn Hán văn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-[#dec9b6] rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-800 w-64 focus:outline-hidden"
              />
              <span className="material-symbols-outlined text-[16px] text-stone-400 absolute left-2.5 top-2">
                search
              </span>
            </div>
            <button
              type="button"
              onClick={() => alert('Xuất danh mục')}
              className="p-1.5 rounded-xl border border-[#dec9b6] hover:bg-[#faefe3] text-stone-600"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#dec9b6]/60 text-stone-400 font-semibold tracking-wider uppercase text-[10px] bg-[#fcf8f2]">
                <th className="py-3 px-3">MÃ BÀI</th>
                <th className="py-3 px-3">NGHI LỄ / VĂN KHẤN</th>
                <th className="py-3 px-3">ĐỊA PHƯƠNG</th>
                <th className="py-3 px-3">TÁC PHẨM THƯ TỊCH NGUỒN</th>
                <th className="py-3 px-3">CỐ VẤN KÝ SỐ</th>
                <th className="py-3 px-3">LƯỢT XEM / TẢI</th>
                <th className="py-3 px-3">TRẠNG THÁI</th>
                <th className="py-3 px-3 text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dec9b6]/40">
              {/* Row 1 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-4 px-3 font-mono font-bold text-[#80141d]">NL-0104</td>
                <td className="py-4 px-3">
                  <h4 className="font-bold text-stone-900 font-serif text-sm">
                    Văn Khấn Giao Thừa Ngoài Cảnh &amp; Trong Nhà
                  </h4>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[13px] text-amber-700">bookmark</span>
                    Tế Tự Tứ Thời • Giao bài cúng Lễ Trừ Tịch vạn thọ
                  </p>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                    Toàn quốc (Kèm dị bản Nam Bộ)
                  </span>
                </td>
                <td className="py-4 px-3 text-stone-700">
                  <span className="font-semibold block">Việt Nam Phong Tục</span>
                  <span className="text-[11px] text-stone-500">Phan Kế Bính (Trang 42-45)</span>
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#80141d] text-white flex items-center justify-center text-[9px] font-bold">
                      TH
                    </span>
                    <div>
                      <span className="font-bold text-stone-800 block text-[11px]">GS. Trần Hữu Khắc</span>
                      <span className="text-[10px] text-stone-400">Viện Nghiên cứu Hán Nôm</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <span className="font-mono font-bold text-stone-800 block">284,520</span>
                  <span className="text-[10.5px] text-stone-400 font-mono">42,189 tệp PDF</span>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-rose-100 text-rose-900 flex items-center gap-1 w-max">
                    ✓ Đã ký số duyệt
                  </span>
                </td>
                <td className="py-4 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-stone-500">
                    <button className="hover:text-[#80141d]"><span className="material-symbols-outlined text-[16px]">visibility</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">history</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-4 px-3 font-mono font-bold text-[#80141d]">NL-0108</td>
                <td className="py-4 px-3">
                  <h4 className="font-bold text-stone-900 font-serif text-sm">
                    Văn Tế Tảo Mộ Tiết Thanh Minh &amp; Tạ Thổ Thần Kỳ
                  </h4>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[13px] text-amber-700">bookmark</span>
                    Tế Tự Tứ Thời • Tục lệ viếng lăng mộ tiền tổ
                  </p>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                    Bắc Bộ &amp; Bắc Trung Bộ
                  </span>
                </td>
                <td className="py-4 px-3 text-stone-700">
                  <span className="font-semibold block">Nếp Cũ: Tín Ngưỡng Việt Nam</span>
                  <span className="text-[11px] text-stone-500">Toan Ánh (Tập Hạ, tr. 118)</span>
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-stone-700 text-white flex items-center justify-center text-[9px] font-bold">
                      VN
                    </span>
                    <div>
                      <span className="font-bold text-stone-800 block text-[11px]">PGS.TS. Vũ Ngọc Cương</span>
                      <span className="text-[10px] text-stone-400">Hội Dân Tộc Học Việt Nam</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <span className="font-mono font-bold text-stone-800 block">195,400</span>
                  <span className="text-[10.5px] text-stone-400 font-mono">18,324 tệp PDF</span>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-rose-100 text-rose-900 flex items-center gap-1 w-max">
                    ✓ Đã ký số duyệt
                  </span>
                </td>
                <td className="py-4 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-stone-500">
                    <button className="hover:text-[#80141d]"><span className="material-symbols-outlined text-[16px]">visibility</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">history</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-4 px-3 font-mono font-bold text-[#80141d]">NL-0215</td>
                <td className="py-4 px-3">
                  <h4 className="font-bold text-stone-900 font-serif text-sm">
                    Nghi Thức Giỗ Chạp (Tiên Thường &amp; Chính Kỵ) Đại Tôn
                  </h4>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[13px] text-amber-700">bookmark</span>
                    Hiếu Hỉ &amp; Gia Tộc • Nghi quy thiết lập hương án từ đường
                  </p>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                    Trung Bộ (Huế &amp; Quảng Nam)
                  </span>
                </td>
                <td className="py-4 px-3 text-stone-700">
                  <span className="font-semibold block">Thọ Mai Gia Lễ Diễn Nghĩa</span>
                  <span className="text-[11px] text-stone-500">Bản khắc mộc bản triều Tự Đức</span>
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#c9892c] text-white flex items-center justify-center text-[9px] font-bold">
                      ĐT
                    </span>
                    <div>
                      <span className="font-bold text-stone-800 block text-[11px]">Cụ Đặng Triều Đức</span>
                      <span className="text-[10px] text-stone-400">Ban Trị Sự Họ Đặng Miền Trung</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <span className="font-mono font-bold text-stone-800 block">88,290</span>
                  <span className="text-[10.5px] text-stone-400 font-mono">9,120 tệp PDF</span>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-rose-100 text-rose-900 flex items-center gap-1 w-max">
                    ✓ Đã ký số duyệt
                  </span>
                </td>
                <td className="py-4 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-stone-500">
                    <button className="hover:text-[#80141d]"><span className="material-symbols-outlined text-[16px]">visibility</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">history</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-4 px-3 font-mono font-bold text-[#80141d]">NL-0331</td>
                <td className="py-4 px-3">
                  <h4 className="font-bold text-stone-900 font-serif text-sm">
                    Nghi Thức Phạt Mộc, Thượng Lương (Cất Nóc) Nhà Thờ Họ
                  </h4>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[13px] text-amber-700">bookmark</span>
                    Kiến Thiết Từ Đường • Thịnh Long Mạch Định Vị
                  </p>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                    Bắc Bộ
                  </span>
                </td>
                <td className="py-4 px-3 text-stone-700">
                  <span className="font-semibold block">Lỗ Ban Cương Mục &amp; Điển Thơ</span>
                  <span className="text-[11px] text-stone-500">Tài liệu lưu trữ chi phái Nguyễn Đông Tác</span>
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center text-[9px] font-bold">
                      LT
                    </span>
                    <div>
                      <span className="font-bold text-stone-800 block text-[11px]">TS. Lê Văn Toàn</span>
                      <span className="text-[10px] text-stone-400">Đồng phân biện thư tịch</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <span className="font-mono font-bold text-stone-800 block">14,210</span>
                  <span className="text-[10.5px] text-stone-400 font-mono">640 tệp PDF</span>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-amber-100 text-amber-900 flex items-center gap-1 w-max">
                    ● Đang thẩm định
                  </span>
                </td>
                <td className="py-4 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-stone-500">
                    <button className="hover:text-[#80141d]"><span className="material-symbols-outlined text-[16px]">visibility</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">history</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-4 px-3 font-mono font-bold text-[#80141d]">NL-0402</td>
                <td className="py-4 px-3">
                  <h4 className="font-bold text-stone-900 font-serif text-sm">
                    Văn Tế Trùng Cửu (9 tháng 9 Âm Lịch) &amp; Lễ Dâng Cao Thọ Lão
                  </h4>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[13px] text-amber-700">bookmark</span>
                    Tế Tự Tứ Thời • Tạ ơn tổ tiên thọ khang
                  </p>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                    Nam Bộ &amp; Sài Gòn xưa
                  </span>
                </td>
                <td className="py-4 px-3 text-stone-700">
                  <span className="font-semibold block">Gia Định Thành Thông Chí</span>
                  <span className="text-[11px] text-stone-500">Trịnh Hoài Đức (Phong Tục Chí)</span>
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-stone-500 text-white flex items-center justify-center text-[9px] font-bold">
                      TC
                    </span>
                    <div>
                      <span className="font-bold text-stone-800 block text-[11px]">Ban Biên Tập TCK</span>
                      <span className="text-[10px] text-stone-400">Chuyên gia thỉnh định viện</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <span className="font-mono font-bold text-stone-800 block">1,820</span>
                  <span className="text-[10.5px] text-stone-400 font-mono">Nội bộ thẩm tra</span>
                </td>
                <td className="py-4 px-3">
                  <span className="px-2.5 py-1 rounded-md text-[10.5px] font-medium bg-stone-100 text-stone-700 flex items-center gap-1 w-max">
                    ● Bản thảo nháp
                  </span>
                </td>
                <td className="py-4 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-stone-500">
                    <button className="hover:text-[#80141d]"><span className="material-symbols-outlined text-[16px]">visibility</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                    <button className="hover:text-stone-900"><span className="material-symbols-outlined text-[16px]">history</span></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 border-t border-[#dec9b6]/60 flex items-center justify-between text-xs bg-[#fdfaf5] text-stone-500">
          <span>Hiển thị 1 - 5 trong tổng số 52 cẩm nang điển chương</span>
          <div className="flex items-center gap-1 font-mono">
            <button className="px-2.5 py-1 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">Trang trước</button>
            <button className="px-2.5 py-1 rounded bg-[#80141d] text-white font-bold">1</button>
            <button className="px-2.5 py-1 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">2</button>
            <button className="px-2.5 py-1 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">3</button>
            <span className="px-1 text-stone-400">...</span>
            <button className="px-2.5 py-1 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">11</button>
            <button className="px-2.5 py-1 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">Trang tiếp</button>
          </div>
        </div>
      </div>
    </div>
  );
};
