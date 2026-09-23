import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminClanDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminClanDetailScreen: React.FC<AdminClanDetailScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'tree' | 'council' | 'artifacts' | 'dispute'>('tree');
  const [isTreeFrozen, setIsTreeFrozen] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb and Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE1D3] pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('admin-khong-gian-gia-toc')}
            className="w-9 h-9 rounded-xl bg-white border border-[#dec9b6] flex items-center justify-center text-stone-700 hover:text-[#80141d] hover:border-[#80141d] transition-all shadow-xs cursor-pointer"
            title="Quay lại danh sách không gian"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-0.5">
              <span>QUẢN LÝ KHÔNG GIAN GIA TỘC</span>
              <span>›</span>
              <span className="text-[#80141d] font-mono font-bold">MÃ PHẢ: #CLAN-0012</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-stone-900 font-serif">
                Đại Tộc Nguyễn Phục Anh
              </h1>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50 shadow-2xs">
                Đại Tộc Tổ • Niên Hiệu Vĩnh Tộ 1624
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsTreeFrozen(!isTreeFrozen)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              isTreeFrozen
                ? 'bg-rose-700 hover:bg-rose-800 text-white'
                : 'bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isTreeFrozen ? 'ac_unit' : 'lock_clock'}
            </span>
            <span>{isTreeFrozen ? 'Đang Đóng Băng Cây Phả' : 'Khóa Cây Phả Toàn Tộc'}</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Đã tạo mã QR định danh số Ban Trị Sự và Từ Đường')}
            className="px-3.5 py-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-stone-600">qr_code_2</span>
            <span>Cấp QR Ban Trị Sự</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Đang kết xuất Hồ Sơ Số Hóa Ký Số Dòng Họ (SHA-256)')}
            className="px-4 py-2 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Xuất Hồ Sơ Số Hóa Ký Số</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Highlight Box (from Screenshot 5) */}
      <div className="p-4 rounded-2xl bg-[#faefe3]/70 border border-[#dec9b6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d] shrink-0">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Kim Phả Đã Chứng Nhận Hán Nôm
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Hồ sơ số 88/2023-VHN. Bản dịch đối chiếu lưu trữ bảo chứng bởi Viện Nghiên Cứu Hán Nôm &amp; Viện Sử Học.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="text-stone-500 font-medium">Từ Đường:</span>
          <span className="font-bold text-stone-800">Xã Yên Tiến, Huyện Ý Yên, Nam Định</span>
        </div>
      </div>

      {/* 4 Key Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-xs">
          <div className="text-[10.5px] font-bold text-stone-500 uppercase mb-1 tracking-wider">
            TỔNG THẾ HỆ
          </div>
          <div className="text-2xl font-bold font-serif text-[#80141d]">14 Đời</div>
          <p className="text-[11px] text-stone-500 mt-1">Từ Khởi Tổ Nguyễn Phúc Đăng</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-xs">
          <div className="text-[10.5px] font-bold text-stone-500 uppercase mb-1 tracking-wider">
            ĐINH BỘ TOÀN TỘC
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">428 Đinh</div>
          <p className="text-[11px] text-stone-500 mt-1">184 Giáp • 132 Ất • 112 Bính</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-xs">
          <div className="text-[10.5px] font-bold text-stone-500 uppercase mb-1 tracking-wider">
            SẮC PHONG BẢO VẬT
          </div>
          <div className="text-2xl font-bold font-serif text-[#c9892c]">6 Đạo Sắc</div>
          <p className="text-[11px] text-stone-500 mt-1">18 Hiện Vật Quý • 3 Bản Tụng Niệm</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-xs bg-[#faefe3]/30">
          <div className="text-[10.5px] font-bold text-stone-500 uppercase mb-1 tracking-wider">
            TRẠNG THÁI PHÁP LÝ
          </div>
          <div className="text-sm font-bold font-serif text-emerald-800 mt-1">
            ĐẠI TỘC CHÍNH DANH
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            ✓ Cụ Nguyễn Đình Cảnh (SN 1948)
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#faefe3]/80 p-1.5 rounded-2xl border border-[#dec9b6] flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'tree', label: 'Cấu Trúc Ba Chi Phái & Từ Đường', icon: 'account_tree' },
          { id: 'council', label: 'Ban Trị Sự & Hội Đồng Tộc Biểu', icon: 'groups' },
          { id: 'artifacts', label: 'Kho Hiện Vật & Sắc Phong (18)', icon: 'history_edu' },
          { id: 'dispute', label: 'Buồng Hòa Giải & Xung Đột', icon: 'balance' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-[#80141d] shadow-sm border border-[#dec9b6]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Cấu Trúc Ba Chi Phái */}
      {activeTab === 'tree' && (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-2xl border border-[#dec9b6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                Phân Bổ Ba Chi Nhánh Đại Tộc Theo Sắc Lệnh &amp; Di Huấn
              </h3>
              <p className="text-xs text-stone-500">
                Lưu giữ tại Từ đường Ý Yên, Nam Định • Giỗ tổ 16 tháng Giêng (Âm Lịch)
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('admin-khong-gian-gia-toc')}
              className="text-xs font-bold text-[#80141d] hover:underline flex items-center gap-1"
            >
              <span>Xem phả đồ tương tác</span>
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chi Giáp */}
            <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#80141d] text-white">
                  CHI GIÁP (CHI TRƯỞNG)
                </span>
                <span className="font-mono text-xs font-bold text-[#80141d]">184 Đinh</span>
              </div>
              <h4 className="text-sm font-bold text-stone-900 font-serif">
                Từ Đường Gốc - Ý Yên
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Người đứng đầu: Cụ Nguyễn Đình Cảnh (Đời thứ 13, SN 1948). Quản lý toàn bộ 6 đạo sắc phong hoàng đế ban tặng và từ đường tổ miếu.
              </p>
              <div className="pt-2 border-t border-[#dec9b6]/60 flex items-center justify-between text-xs text-stone-500">
                <span>Số hộ: 42</span>
                <span className="text-emerald-700 font-bold">● Đồng bộ 100%</span>
              </div>
            </div>

            {/* Chi Ất */}
            <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50">
                  CHI ẤT (THỨ CHI)
                </span>
                <span className="font-mono text-xs font-bold text-stone-900">132 Đinh</span>
              </div>
              <h4 className="text-sm font-bold text-stone-900 font-serif">
                Phân Nhánh Hà Nội &amp; Chương Mỹ
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Người đứng đầu: Ông Nguyễn Trực Viễn (Đời thứ 11). Di cư từ đầu thế kỷ 19, gìn giữ nhánh văn học cử nhân thi hương triều Nguyễn.
              </p>
              <div className="pt-2 border-t border-[#dec9b6]/60 flex items-center justify-between text-xs text-stone-500">
                <span>Số hộ: 31</span>
                <span className="text-emerald-700 font-bold">● Đồng bộ 100%</span>
              </div>
            </div>

            {/* Chi Bính */}
            <div className="p-4 rounded-2xl bg-white border border-[#dec9b6] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                  CHI BÍNH (HẬU DUỆ NAM TIẾN)
                </span>
                <span className="font-mono text-xs font-bold text-stone-900">112 Đinh</span>
              </div>
              <h4 className="text-sm font-bold text-stone-900 font-serif">
                Biên Hòa &amp; Gia Định
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Người đứng đầu: Ông Nguyễn Phước Thịnh (Đời thứ 12). Lập đền thờ vọng tại Biên Hòa năm 1956, đã số hóa toàn bộ di thư liên lạc.
              </p>
              <div className="pt-2 border-t border-[#dec9b6]/60 flex items-center justify-between text-xs text-stone-500">
                <span>Số hộ: 23</span>
                <span className="text-emerald-700 font-bold">● Đồng bộ 98%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ban Trị Sự */}
      {activeTab === 'council' && (
        <div className="bg-white p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Ban Trị Sự &amp; Hội Đồng Tộc Biểu Phân Quyền
            </h3>
            <button
              type="button"
              onClick={() => alert('Thêm ủy viên Ban Trị Sự mới')}
              className="px-3 py-1.5 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              + Bổ Nhiệm Ủy Viên Mới
            </button>
          </div>

          <div className="divide-y divide-[#dec9b6]/40 text-xs">
            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#80141d] text-white flex items-center justify-center font-bold text-xs">
                  C
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm font-serif">Cụ Nguyễn Đình Cảnh</h4>
                  <p className="text-stone-500">Tộc Trưởng (SN 1948) • Đại diện pháp nhân dòng họ</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#80141d] text-white text-[11px] font-bold rounded-md">
                Quyền Phủ Quyết Tối Cao
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 text-[#80141d] flex items-center justify-center font-bold text-xs">
                  V
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm font-serif">Nguyễn Trực Viễn</h4>
                  <p className="text-stone-500">Phó Tộc Trưởng • Trưởng Ban Phả Ký Điện Tử (#USR-88291)</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#faeed9] text-[#80141d] border border-[#f3b750]/50 text-[11px] font-bold rounded-md">
                Biên Tập &amp; Duyệt Phả
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-xs">
                  T
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm font-serif">Nguyễn Văn Thuận</h4>
                  <p className="text-stone-500">Thủ Quỹ Tộc Tự • Trưởng Ban Khánh Tiết &amp; Cúng Giỗ</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-stone-100 text-stone-700 text-[11px] font-medium rounded-md">
                Quản Lý Thu Chi &amp; Lễ Nghi
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Kho Hiện Vật & Sắc Phong */}
      {activeTab === 'artifacts' && (
        <div className="bg-white p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                Kho Hiện Vật, Sắc Phong &amp; Văn Bia Số Hóa
              </h3>
              <p className="text-xs text-stone-500">6 Đạo Sắc Phong Hoàng Đế • 18 Hiện Vật Quý • 3 Bản Tụng Niệm</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('admin-tham-dinh-ai')}
              className="px-3.5 py-1.5 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Chuyển Thẩm Định AI →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            <div className="p-3.5 bg-[#fcf8f2] rounded-xl border border-[#dec9b6] space-y-2">
              <div className="h-32 bg-amber-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&auto=format&fit=crop&q=80"
                  alt="Sắc phong"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-stone-900 font-serif">Sắc Phong Cảnh Hưng 44 (1783)</h4>
              <p className="text-[11px] text-stone-600">Ban phong cho Cụ Tổ Nguyễn Phúc Đăng chức Đô Chỉ Huy Sứ</p>
              <span className="text-[10.5px] text-emerald-700 font-bold block">✓ Đã giám định dấu ấn hoàng triều</span>
            </div>

            <div className="p-3.5 bg-[#fcf8f2] rounded-xl border border-[#dec9b6] space-y-2">
              <div className="h-32 bg-amber-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300&auto=format&fit=crop&q=80"
                  alt="Văn bia cổ"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-stone-900 font-serif">Bia Ký Trực Lăng Tự Đôn (1812)</h4>
              <p className="text-[11px] text-stone-600">Ghi lại công đức tôn tạo từ đường và danh sách đinh đóng góp</p>
              <span className="text-[10.5px] text-emerald-700 font-bold block">✓ OCR Nôm đạt 99.4% F1-Score</span>
            </div>

            <div className="p-3.5 bg-[#fcf8f2] rounded-xl border border-[#dec9b6] space-y-2">
              <div className="h-32 bg-amber-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=80"
                  alt="Khánh vàng"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-stone-900 font-serif">Khánh Vàng &quot;Tiết Hạnh Khả Phong&quot;</h4>
              <p className="text-[11px] text-stone-600">Vua Tự Đức ban tặng cụ bà Đời thứ 8 năm 1867</p>
              <span className="text-[10.5px] text-stone-600 font-medium block">Lưu trữ bảo an tại gian hậu cung Ý Yên</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Buồng Hòa Giải */}
      {activeTab === 'dispute' && (
        <div className="bg-[#faefe3]/50 p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#80141d]">balance</span>
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Buồng Hòa Giải Trực Tuyến &amp; Biên Bản Thẩm Định #TC-HP-2025-009
            </h3>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed">
            Hồ sơ khiếu nại về nhánh Chi thứ 2 đối soát cùng Chi thứ 4 Họ Đỗ. Hệ thống đề xuất giải pháp trích lục bản phả gốc Nôm lưu trữ tại Viện Hán Nôm và lấy biểu quyết của hai trưởng chi tại phiên trọng tài số ngày 25/02/2025.
          </p>

          <div className="p-3.5 bg-white rounded-xl border border-[#dec9b6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <strong className="text-stone-900 block font-serif">Biên Bản Thỏa Thuận Sơ Bộ (Dự Thảo)</strong>
              <span className="text-stone-500 text-[11px]">Đã nhận xác nhận chữ ký số của 2/3 Trưởng Chi</span>
            </div>
            <button
              type="button"
              onClick={() => alert('Đã mở phiên hòa giải trực tuyến')}
              className="px-3.5 py-1.5 bg-[#80141d] hover:bg-[#661017] text-white font-bold rounded-xl shadow-xs self-start sm:self-auto"
            >
              Vào Phiên Trọng Tài
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
