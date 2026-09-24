import React, { useState } from 'react';
import type { ScreenType } from '../../types.ts';

interface MemorialTreeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const MemorialTreeScreen: React.FC<MemorialTreeScreenProps> = ({ onNavigate }) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedLeafType, setSelectedLeafType] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-13');

  const nodes = [
    {
      id: 'node-13',
      title: 'Chồi Biếc Giáp Thìn • 2024',
      person: 'Nguyễn Trực Khang',
      subtitle: 'Đời 13 • Cháu đích tôn hạ sinh',
      description:
        'Cháu đích tôn đời thứ 13 của Đại Tộc Nguyễn Phục Anh hạ sinh tại Bệnh viện Phụ sản Trung Ương, cân nặng 3.4kg, mang họ đệm chính danh Nguyễn Trực. Được Hội đồng Trưởng tộc trao bức phả đồ thêu gấm nhân lễ Đầy tháng.',
      date: 'Tháng 08 Giáp Thìn (2024)',
      type: 'birth',
      x: 390,
      y: 95,
      icon: 'eco',
      badgeColor: 'bg-[#5c4033] text-white',
    },
    {
      id: 'node-11',
      title: 'Hiếu Nghĩa • 1970',
      person: 'Mừng Thọ Bát Tuần',
      subtitle: 'Cụ Bà Đỗ Thị Nhàn',
      description:
        'Toàn thể con cháu 3 ngành quy tụ tại gian từ đường dâng khánh vàng thêu chữ Thọ, phụng dưỡng mẹ hiền trọn vẹn hiếu đạo.',
      date: 'Năm Canh Tuất 1970',
      type: 'birth',
      x: 270,
      y: 205,
      icon: 'cake',
      badgeColor: 'bg-[#faeed9] text-[#734c13]',
    },
    {
      id: 'node-10-renovate',
      title: 'Công Đức • 1954',
      person: 'Đại Trùng Tu Tiền Đường',
      subtitle: 'Lập thượng lương chi tộc',
      description:
        'Toàn tộc đồng lòng đào tráp lưu hoành phi câu đối và phục dựng lại tiền môn nhà thờ tổ trang nghiêm sau thời gian kháng chiến.',
      date: 'Năm Giáp Ngọ 1954',
      type: 'merit',
      x: 470,
      y: 255,
      icon: 'temple_buddhist',
      badgeColor: 'bg-[#80141d] text-white',
    },
    {
      id: 'node-10-scholar',
      title: 'Hán Học • 1932',
      person: 'Đỗ Kỳ Sơ Khảo Hán Học',
      subtitle: 'Cụ Nguyễn Văn Phúc (Đời 10)',
      description:
        'Cụ được vinh danh trong kỳ thi kinh điển Hán học và Pháp văn tại trường Quốc học Nam Định, mở đầu cho truyền thống hiếu học rạng danh chi tộc.',
      date: 'Năm Nhâm Thân 1932',
      type: 'scholar',
      x: 220,
      y: 310,
      icon: 'history_edu',
      badgeColor: 'bg-[#c9892c] text-white',
    },
  ];

  const currentNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2b1b15] font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Breadcrumb & Top Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-[#dec9b6]/40 pb-3">
          <div className="flex items-center gap-2 font-medium text-[#8a6f62]">
            <button
              type="button"
              onClick={() => onNavigate('kho-ky-uc')}
              className="hover:text-[#80141d] transition-colors cursor-pointer"
            >
              Kho Ký Ức
            </button>
            <span>›</span>
            <span className="text-[#80141d] font-semibold">Cây Kỷ Niệm Dòng Tộc</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-xs font-medium">
            <span className="material-symbols-outlined text-sm text-[#c9892c]">verified</span>
            <span>Bảo Thư Chi Trực Lăng • Mộc Bản Ấn Định</span>
          </div>
        </div>

        {/* Title Header with Ancestor Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="text-[11px] font-bold tracking-widest text-[#80141d] uppercase">
              Mộc Đức Sinh Hoa • Trường Lưu Bất Tận
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#80141d] tracking-tight">
              Cây Kỷ Niệm
            </h1>
            <p className="text-xs sm:text-sm text-[#6b584d] leading-relaxed">
              Cội Rễ Trường Tồn &amp; Chồi Lộc Gia Tộc — Nơi mỗi cột mốc công đức, hiếu nghĩa, khoa
              cử hiển vinh và hồng ân thế hệ kết tinh thành từng chồi biếc truyền lưu đời đời.
            </p>
          </div>

          {/* Top Right Founder Era Badge */}
          <div className="p-3.5 bg-[#faefe3] border border-[#dec9b6] rounded-2xl flex items-center gap-3 shrink-0 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#dec9b6] flex items-center justify-center text-[#80141d] shadow-2xs">
              <span className="material-symbols-outlined text-xl">temple_buddhist</span>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#8a6f62] tracking-wider">
                Niên Hiệu Khởi Tổ
              </div>
              <div className="font-serif font-bold text-sm text-[#2b1b15]">Chính Hòa Tam Niên</div>
              <div className="text-[10px] text-[#80141d] font-semibold">Khắc bia năm 1682</div>
            </div>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="appearance-none bg-white border border-[#dec9b6] rounded-xl px-4 py-2 pr-8 text-xs font-bold text-[#80141d] focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">Toàn Chi Tộc ▾</option>
                <option value="first">Ngành Trưởng</option>
                <option value="second">Ngành Thứ</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { id: 'all', label: 'Tất cả chồi lộc' },
                { id: 'birth', label: 'Khởi sinh & Thành hôn' },
                { id: 'scholar', label: 'Học vị & Khoa cử' },
                { id: 'renovate', label: 'Đại trùng tu từ đường' },
                { id: 'charity', label: 'Phụng hiến xã hội' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedLeafType(pill.id)}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-colors border cursor-pointer ${
                    selectedLeafType === pill.id
                      ? 'bg-[#80141d] text-white border-[#80141d] shadow-2xs font-semibold'
                      : 'bg-white text-[#6b584d] border-[#dec9b6] hover:border-[#c9892c]'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => alert('Mở bản dập phả đồ đại bản toàn chi...')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#dec9b6] text-xs font-semibold text-[#4a362f] hover:bg-[#faefe3] transition-colors shadow-2xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Bản Dập Phả Đồ</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('them-cot-moc')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>+ Thêm Cột Mốc Mới</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Interactive Canvas & Node Summary (8 cols) + Right Stats (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas Container */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-[#dec9b6] p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between min-h-[580px]">
              {/* Canvas Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dec9b6]/30 pb-3 z-10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#80141d]" />
                  <span className="font-serif font-bold text-xs text-[#2b1b15]">
                    Hiển thị trục thế hệ: Đời 9 (1682) — Đời 13 (2025)
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.15))}
                    className="w-7 h-7 rounded-lg bg-[#fdfaf5] border border-[#dec9b6] text-xs font-bold text-[#4a362f] hover:bg-[#faefe3] flex items-center justify-center cursor-pointer"
                    title="Thu nhỏ"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.min(1.4, prev + 0.15))}
                    className="w-7 h-7 rounded-lg bg-[#fdfaf5] border border-[#dec9b6] text-xs font-bold text-[#4a362f] hover:bg-[#faefe3] flex items-center justify-center cursor-pointer"
                    title="Phóng to"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="w-7 h-7 rounded-lg bg-[#fdfaf5] border border-[#dec9b6] text-xs text-[#4a362f] hover:bg-[#faefe3] flex items-center justify-center cursor-pointer"
                    title="Đặt lại khung nhìn"
                  >
                    ⛶
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Chú giải các loại phiến lá và niên đại thế hệ')}
                    className="px-2.5 py-1 rounded-lg bg-[#faefe3] border border-[#dec9b6] text-[11px] font-semibold text-[#80141d] hover:bg-[#f5dbcf] flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">info</span>
                    <span>Chú giải lá</span>
                  </button>
                </div>
              </div>

              {/* Tree Canvas Area */}
              <div className="relative w-full h-[470px] my-auto flex items-center justify-center overflow-hidden">
                {/* Generational Concentric Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[440px] h-[440px] rounded-full border border-dashed border-[#dec9b6]/40" />
                  <div className="w-[340px] h-[340px] rounded-full border border-dashed border-[#dec9b6]/50 absolute" />
                  <div className="w-[240px] h-[240px] rounded-full border border-dashed border-[#dec9b6]/60 absolute" />
                  <div className="w-[140px] h-[140px] rounded-full border border-dashed border-[#dec9b6]/70 absolute" />
                </div>

                {/* Generational Labels along Left Arc */}
                <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-between text-[11px] font-medium text-[#8a6f62] pointer-events-none py-6">
                  <div className="px-2 py-0.5 rounded bg-[#faefe3] border border-[#dec9b6] text-[#80141d] font-bold">
                    Đời 13 • Hiện Tại (2024 - Nay)
                  </div>
                  <div className="px-2 py-0.5 rounded bg-[#fdfaf5] border border-[#dec9b6]">
                    Đời 12 • Hậu Tự (1970 - 2000)
                  </div>
                  <div className="px-2 py-0.5 rounded bg-[#fdfaf5] border border-[#dec9b6]">
                    Đời 11 • Trung Niên (1945 - 1970)
                  </div>
                  <div className="px-2 py-0.5 rounded bg-[#fdfaf5] border border-[#dec9b6]">
                    Đời 10 • Tiếp Dựng (1900 - 1945)
                  </div>
                  <div className="px-2 py-0.5 rounded bg-[#faeed9] border border-[#dec9b6] text-[#734c13] font-bold">
                    Đời 9 • Tiền Tổ Khởi Nghiệp (1682)
                  </div>
                </div>

                {/* Scalable Vector Tree */}
                <div
                  className="relative w-full h-full flex items-center justify-center transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <svg viewBox="0 0 620 480" className="w-full h-full pointer-events-none">
                    {/* Trunk */}
                    <path
                      d="M 335 450 C 330 380, 315 280, 325 210 C 330 160, 340 100, 350 40"
                      fill="none"
                      stroke="#c9892c"
                      strokeWidth="12"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    {/* Generational organic branches */}
                    <path
                      d="M 325 210 C 270 205, 230 205, 200 205"
                      fill="none"
                      stroke="#dec9b6"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 325 250 C 390 250, 440 255, 480 255"
                      fill="none"
                      stroke="#dec9b6"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 328 140 C 360 115, 395 100, 420 95"
                      fill="none"
                      stroke="#dec9b6"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 330 320 C 265 315, 220 310, 180 310"
                      fill="none"
                      stroke="#dec9b6"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Center Root Origin Marker */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
                    <div className="w-12 h-12 rounded-full bg-[#5c4033] border-4 border-white shadow-md flex items-center justify-center text-white mb-1">
                      <span className="material-symbols-outlined text-xl">temple_buddhist</span>
                    </div>
                    <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#dec9b6] text-center shadow-xs">
                      <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                        Cội Rễ Khởi Nguyên
                      </div>
                      <div className="text-[11px] font-serif font-bold text-[#2b1b15]">
                        Năm Nhâm Tuất 1682
                      </div>
                    </div>
                  </div>

                  {/* Interactive Leaf Nodes */}
                  {nodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 z-20 flex items-center gap-2 ${
                          isSelected ? 'scale-105 ring-2 ring-[#80141d] rounded-2xl p-1 bg-white/80' : ''
                        }`}
                        style={{ left: `${node.x}px`, top: `${node.y}px` }}
                      >
                        {/* Node Icon Circle */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${
                            node.id === 'node-13'
                              ? 'bg-[#5c4033] text-white'
                              : node.id === 'node-10-renovate'
                              ? 'bg-[#80141d] text-white'
                              : 'bg-[#faeed9] text-[#734c13]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">{node.icon}</span>
                        </div>

                        {/* Node Label Box */}
                        <div className="bg-white/95 border border-[#dec9b6] rounded-xl px-3 py-1.5 shadow-2xs text-left max-w-[170px]">
                          <div className="text-[10px] font-bold text-[#80141d] leading-none truncate">
                            {node.title}
                          </div>
                          <div className="font-serif font-bold text-xs text-[#2b1b15] leading-tight mt-0.5 truncate">
                            {node.person}
                          </div>
                          <div className="text-[9px] text-[#8a6f62] truncate mt-0.5">
                            {node.subtitle}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Canvas Bottom Legend */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dec9b6]/30 pt-3 z-10 text-xs">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6b584d]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5c4033]" />
                    <span>Chồi lộc khai hoa (Sinh nở/Hôn phối)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c9892c]" />
                    <span>Lá vàng vinh quy (Khoa bảng/Đỗ đạt)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#80141d]" />
                    <span>Phiến lá công đức (Trùng tu/Hiến điền)</span>
                  </div>
                </div>

                <span className="text-[11px] italic text-[#8a6f62]">
                  Nhấp vào từng chồi lá để tra khảo chi tiết
                </span>
              </div>
            </div>

            {/* Selected Leaf Detail Callout Banner */}
            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#dec9b6] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#80141d] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-2xl">energy_savings_leaf</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#faefe3] border border-[#dec9b6] text-[10px] font-bold text-[#80141d]">
                      Chồi Lộc Thế Hệ
                    </span>
                    <span className="text-[11px] text-[#8a6f62]">{currentNode.date}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#2b1b15]">
                    Khởi Lộc: {currentNode.person}
                  </h3>
                  <p className="text-xs text-[#6b584d] leading-relaxed max-w-xl">
                    {currentNode.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => alert('Đã sao chép liên kết chia sẻ nhánh phả đồ!')}
                  className="px-3 py-1.5 rounded-lg border border-[#dec9b6] bg-white hover:bg-[#faefe3] text-xs font-semibold text-[#4a362f] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">share</span>
                  <span>Chia sẻ nhánh</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('bien-nien-su')}
                  className="px-3 py-1.5 rounded-lg bg-[#80141d] hover:bg-[#681017] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  <span>Mở Phả Ký</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Ancestry Stats & Heritage Wisdom */}
          <div className="lg:col-span-4 space-y-6">
            {/* Widget 1: Cội Nguồn Huyết Mạch */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#dec9b6]/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#80141d] text-base">hub</span>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                    Cội Nguồn Huyết Mạch
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#faeed9] border border-[#dec9b6] text-[#734c13] text-[10px] font-bold">
                  Quy chuẩn 1770
                </span>
              </div>

              {/* Total Counter with Lotus Icon */}
              <div className="p-3.5 bg-[#fdfaf5] border border-[#dec9b6] rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#8a6f62] uppercase tracking-wider">
                    Tổng Số Hoa Lộc
                  </div>
                  <div className="text-3xl font-serif font-bold text-[#80141d] leading-none mt-1">
                    142
                  </div>
                  <div className="text-[11px] text-[#6b584d] mt-1">
                    Lá mầm &amp; chồi lộc đã kết tinh
                  </div>
                </div>
                <span className="material-symbols-outlined text-4xl text-[#faeed9] select-none">
                  spa
                </span>
              </div>

              {/* Breakdown with Progress Bars */}
              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <div className="flex justify-between py-0.5 text-[11px]">
                    <span className="text-[#2b1b15]">Khai sinh &amp; thành hôn</span>
                    <span className="font-bold text-[#5c4033]">50 chồi biếc</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#faefe3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5c4033] rounded-full w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between py-0.5 text-[11px]">
                    <span className="text-[#2b1b15]">Khoa bảng &amp; học vị thành danh</span>
                    <span className="font-bold text-[#c9892c]">54 phiến vàng</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#faefe3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#c9892c] rounded-full w-[38%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between py-0.5 text-[11px]">
                    <span className="text-[#2b1b15]">Công đức trùng tu &amp; phụng hiến</span>
                    <span className="font-bold text-[#80141d]">38 phiến son</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#faefe3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#80141d] rounded-full w-[27%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: Mốc Son Hai Đầu Thời Gian */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center gap-2 border-b border-[#dec9b6]/30 pb-2.5">
                <span className="material-symbols-outlined text-[#c9892c] text-base">
                  hourglass_top
                </span>
                <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2b1b15]">
                  Mốc Son Hai Đầu Thời Gian
                </h3>
              </div>

              {/* Item 1: Ancient */}
              <div className="p-3 bg-[#faefe3]/50 border border-[#dec9b6] rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-[#80141d] text-lg shrink-0 mt-0.5">
                  history
                </span>
                <div className="text-xs space-y-0.5">
                  <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                    Phiến Lá Khởi Nguyên • 1682
                  </div>
                  <div className="font-bold text-[#2b1b15]">Cụ Khởi Tổ Nguyễn Đức Tịnh</div>
                  <p className="text-[11px] text-[#6b584d] leading-relaxed">
                    Khai hoang lập ấp Trực Lăng, ban giao điều lệ tộc ước và thủ lập gia phả văn bia.
                  </p>
                </div>
              </div>

              {/* Connector line */}
              <div className="text-center text-[10px] text-[#8a6f62] font-semibold flex items-center justify-center gap-1">
                <span>↓</span>
                <span>Truyền thừa 343 năm liên tục</span>
              </div>

              {/* Item 2: Modern */}
              <div className="p-3 bg-[#faefe3]/50 border border-[#dec9b6] rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-[#5c4033] text-lg shrink-0 mt-0.5">
                  eco
                </span>
                <div className="text-xs space-y-0.5">
                  <div className="text-[10px] font-bold text-[#5c4033] uppercase tracking-wider">
                    Chồi Lộc Non Nhất • 08/2024
                  </div>
                  <div className="font-bold text-[#2b1b15]">Nguyễn Trực Khang</div>
                  <p className="text-[11px] text-[#6b584d] leading-relaxed">
                    Thành viên đời thứ 13 vừa làm lễ Quan Tẩy, chính thức nhập tự sổ bộ gia tộc.
                  </p>
                </div>
              </div>
            </div>

            {/* Widget 3: Huấn Ngữ Dòng Họ (Crimson) */}
            <div className="bg-[#80141d] rounded-2xl p-6 text-white shadow-md relative overflow-hidden space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#faeed9]">
                Huấn Ngữ Dòng Họ
              </div>
              <p className="font-serif italic text-base text-white/95 leading-relaxed">
                “Cây có cội mới trổ cành xanh ngọn, Nước có nguồn mới bủa rộng sông sâu.”
              </p>
              <div className="text-[11px] text-[#faeed9]/80 font-medium flex justify-between">
                <span>Trích Phả Ký Trực Lăng</span>
                <span>Canh Dần Niên (1770)</span>
              </div>
              <div className="absolute right-2 -bottom-4 text-white/10 select-none text-8xl font-serif pointer-events-none">
                德
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Chồi Mới Đơm Hoa & Phiến Lá Vừa Ghi Sổ (4 Cards Grid) */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider">
                Biên Niên Mới Tiếp Nhận
              </div>
              <h2 className="font-serif font-bold text-lg text-[#2b1b15]">
                Chồi Mới Đơm Hoa &amp; Phiến Lá Vừa Ghi Sổ
              </h2>
              <p className="text-xs text-[#6b584d]">
                Các sự kiện hiếu nghĩa, học vị và công đức vừa được Ban Trị Sự xác minh nhập vào thân
                cây di sản.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('bien-nien-su')}
              className="text-xs font-bold text-[#80141d] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Xem Tất Cả 142 Cột Mốc</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-4 shadow-2xs space-y-2 flex flex-col justify-between hover:border-[#80141d] transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[9px] font-bold border border-[#dec9b6]">
                    Khoa Cử • Học Vị
                  </span>
                  <span className="text-[9px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <span>✓</span> Đã chứng thực
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xs text-[#2b1b15] leading-snug">
                  Bảo Vệ Thành Công Luận Án Tiến Sĩ
                </h3>
                <p className="text-[11px] text-[#6b584d] leading-relaxed line-clamp-3">
                  Nguyễn Trực Nam (Đời 12 - Chi 2) hoàn thành học vị Tiến Sĩ Toán Ứng Dụng tại...
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#8a6f62] border-t border-[#dec9b6]/30 pt-2">
                <span>15 Tháng Chạp, 2024</span>
                <span className="font-semibold text-[#80141d]">Chi 2 Ngành Trưởng</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-4 shadow-2xs space-y-2 flex flex-col justify-between hover:border-[#80141d] transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-[9px] font-bold border border-[#dec9b6]">
                    Công Đức Trùng Tu
                  </span>
                  <span className="text-[9px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <span>✓</span> Đã chứng thực
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xs text-[#2b1b15] leading-snug">
                  Cung Tiến Bộ Cuốn Thư Khảm Xà Cừ
                </h3>
                <p className="text-[11px] text-[#6b584d] leading-relaxed line-clamp-3">
                  Gia đình ông Nguyễn Trực Long thành tâm cung tiến bộ đại tự "Đức Lưu Quang"...
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#8a6f62] border-t border-[#dec9b6]/30 pt-2">
                <span>02 Tháng Chạp, 2024</span>
                <span className="font-semibold text-[#80141d]">Ban Trị Sự Tộc</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-4 shadow-2xs space-y-2 flex flex-col justify-between hover:border-[#80141d] transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-[#fdfaf5] text-[#5c4033] text-[9px] font-bold border border-[#dec9b6]">
                    Khởi Sinh &amp; Hậu Tự
                  </span>
                  <span className="text-[9px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <span>✓</span> Đã chứng thực
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xs text-[#2b1b15] leading-snug">
                  Hạ Sinh Con Gái: Nguyễn Nhã Uyên
                </h3>
                <p className="text-[11px] text-[#6b584d] leading-relaxed line-clamp-3">
                  Cháu thứ tư thuộc Ngành Thứ Đệ, lễ trình diện tiền tổ tổ chức tại nhà thờ họ...
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#8a6f62] border-t border-[#dec9b6]/30 pt-2">
                <span>Tháng 11 Âm Lịch, 2024</span>
                <span className="font-semibold text-[#5c4033]">Ngành Thứ - Ất Đệ</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl border border-[#dec9b6] p-4 shadow-2xs space-y-2 flex flex-col justify-between hover:border-[#80141d] transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-[#faeed9] text-[#734c13] text-[9px] font-bold border border-[#dec9b6]">
                    Thành Hôn Điền Lễ
                  </span>
                  <span className="text-[9px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <span>✓</span> Đã chứng thực
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xs text-[#2b1b15] leading-snug">
                  Lễ Tơ Hồng: Trực Thắng &amp; Mai Chi
                </h3>
                <p className="text-[11px] text-[#6b584d] leading-relaxed line-clamp-3">
                  Hôn lễ diễn ra trang trọng với nghi thức lạy tổ phụ truyền thống, đón nhận lời...
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#8a6f62] border-t border-[#dec9b6]/30 pt-2">
                <span>Tháng 10 Âm Lịch, 2024</span>
                <span className="font-semibold text-[#80141d]">Chi 1 Ngành Trưởng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemorialTreeScreen;
