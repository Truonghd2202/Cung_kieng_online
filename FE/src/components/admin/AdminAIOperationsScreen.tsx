import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminAIOperationsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminAIOperationsScreen: React.FC<AdminAIOperationsScreenProps> = ({ onNavigate }) => {
  const [pipelineFilter, setPipelineFilter] = useState('all');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAE1D3] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-3.5 bg-[#c9892c] rounded-full inline-block"></span>
            <span className="text-[11px] font-bold tracking-wider text-[#80141d] uppercase font-mono">
              HẠ TẦNG ĐIỆN TOÁN TRÍ TUỆ NHÂN TẠO • NODE THĂNG LONG CLUSTER
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Trung Tâm Vận Hành &amp; Hạ Tầng AI Di Sản
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Điều phối mô hình phục chế chân dung sơn mài, OCR Hán Nôm và phân rã văn bản mộc bản hoàng triều.
          </p>
        </div>

        {/* Right Status & Control Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#faefe3]/70 border border-[#dec9b6] flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <div>
              <span className="text-[10px] text-stone-400 block font-semibold uppercase">TRẠNG THÁI HỆ THỐNG</span>
              <strong className="text-stone-900 text-xs">Cụm AI Hoạt Động Bình Thường (99.96% Uptime)</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => alert('Đã giải phóng 4.2 GB bộ nhớ đệm VRAM GPU')}
              className="px-3 py-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#80141d]">cached</span>
              <span>Xóa Cache GPU</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Đã tạm dừng các job suy luận hàng loạt ngoài giờ')}
              className="px-3 py-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-700">pause_circle</span>
              <span>Tạm Dừng Job Ngoài Giờ</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Đang chuyển 35% lưu lượng sang cụm GPU dự phòng Sài Gòn')}
              className="px-3.5 py-2 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">alt_route</span>
              <span>Traffic Sang Server Dự Phòng SG</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: HÀNG ĐỢI TÁC VỤ */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>HÀNG ĐỢI TÁC VỤ</span>
            <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[16px]">queue</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-[#80141d]">142</span>
            <span className="text-xs text-stone-500 font-medium">Tác vụ chờ</span>
          </div>
          <div className="space-y-1 pt-1 border-t border-[#dec9b6]/40 text-[11px] text-stone-600">
            <div className="flex justify-between">
              <span>Phục chế chân dung 4K</span>
              <strong className="font-mono text-stone-900">48</strong>
            </div>
            <div className="flex justify-between">
              <span>OCR Bia Ký Hán Nôm</span>
              <strong className="font-mono text-stone-900">82</strong>
            </div>
            <div className="flex justify-between">
              <span>Vector hóa phả ký</span>
              <strong className="font-mono text-stone-900">12</strong>
            </div>
          </div>
        </div>

        {/* Card 2: TỐC ĐỘ XỬ LÝ TRUNG BÌNH */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>TỐC ĐỘ XỬ LÝ TRUNG BÌNH</span>
            <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#c9892c]">
              <span className="material-symbols-outlined text-[16px]">speed</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-serif text-stone-900">1.4</span>
            <span className="text-xs text-stone-500">s / ảnh chân dung</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Độ trễ suy luận 6 giờ qua: <strong className="text-stone-800">480ms / trang Nôm</strong>
          </p>

          {/* Sparkline chart */}
          <div className="pt-1">
            <svg viewBox="0 0 160 30" className="w-full h-7 overflow-visible">
              <defs>
                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#80141d" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#80141d" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,22 Q30,12 60,18 T120,8 T160,12 L160,30 L0,30 Z"
                fill="url(#latencyGradient)"
              />
              <path
                d="M0,22 Q30,12 60,18 T120,8 T160,12"
                fill="none"
                stroke="#80141d"
                strokeWidth="2"
              />
            </svg>
            <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-0.5">
              <span>-6h: 1.82s</span>
              <span>Hiện tại: 1.38s</span>
            </div>
          </div>
        </div>

        {/* Card 3: TỶ LỆ LỖI TÁC VỤ (24H) */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>TỶ LỆ LỖI TÁC VỤ (24H)</span>
            <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-emerald-700">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900">0.12%</span>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
              SLA &lt; 0.50%
            </span>
          </div>
          <div className="flex justify-between text-[11px] text-stone-500">
            <span>Thành công: <strong className="text-stone-800">11,386</strong></span>
            <span className="text-rose-700 font-bold">14 lỗi</span>
          </div>
          <div className="h-1.5 w-full bg-[#faeed9] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-700 rounded-full w-[99.88%]"></div>
          </div>
          <p className="text-[10px] text-stone-500 leading-tight">
            11,400 tác vụ xử lý thành công không làm gián đoạn việc tải phả đồ.
          </p>
        </div>

        {/* Card 4: GPU ALLOCATION */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>GPU ALLOCATION (HẠ TẦNG)</span>
            <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-amber-700">
              <span className="material-symbols-outlined text-[16px]">memory</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-[#80141d]">16x</span>
            <span className="text-xs text-stone-600 font-bold">NVIDIA A100 80GB</span>
          </div>
          <div className="flex justify-between text-[11px] text-stone-500">
            <span>Tải Cụm Tensor Core: <strong className="text-stone-900">64%</strong></span>
            <span className="text-amber-800 font-bold">58°C (Tối Ưu)</span>
          </div>

          {/* 16 GPU blocks grid (2 rows of 8) */}
          <div className="grid grid-cols-8 gap-1 pt-1">
            {[
              'bg-[#80141d]', 'bg-[#80141d]', 'bg-[#80141d]', 'bg-[#80141d]',
              'bg-[#80141d]', 'bg-[#80141d]', 'bg-[#80141d]', 'bg-[#80141d]',
              'bg-[#c9892c]', 'bg-[#c9892c]', 'bg-[#c9892c]', 'bg-[#c9892c]',
              'bg-[#faeed9]', 'bg-[#faeed9]', 'bg-stone-200', 'bg-stone-200'
            ].map((colorClass, idx) => (
              <div key={idx} className={`h-3 rounded-xs ${colorClass}`} title={`GPU Node #${idx + 1}`} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>14 Active</span>
            <span>2 Cold Standby</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Các Model Pipelines Di Sản Đang Chạy */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#80141d]">hub</span>
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Các Model Pipelines Di Sản Đang Chạy
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Tự động cân bằng tải qua Kubernetes KEDA
          </span>
        </div>

        {/* 4 Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pipeline 1: HeritageFace-Restore */}
          <div className="bg-white rounded-2xl border border-[#dec9b6] p-4 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faeed9] text-[#80141d]">
                  Vision GenAI
                </span>
                <span className="text-[11px] text-stone-500 font-mono">● 6 instances</span>
              </div>
              <h3 className="font-bold text-stone-900 font-serif text-sm">
                HeritageFace-Restore
              </h3>
              <div className="text-[11px] text-[#80141d] font-mono font-semibold">
                v4.1-prod (Checkpoints: Triều Nguyễn)
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Khôi phục cấu trúc tranh chân dung cổ, phục chế chi tiết hoa văn áo gấm, khăn vấn, phục trang hoàng triều thế kỷ XIX.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative rounded-xl overflow-hidden h-28 border border-[#dec9b6]/60 bg-amber-50">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
                  alt="HeritageFace Preview"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[9px] font-bold">
                  PSNR 34.2dB
                </span>
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-[#80141d]/90 text-white text-[9px] font-bold">
                  Khôi phục da &amp; gấm
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
                <span>Thông lượng: <strong>42 img/min</strong></span>
                <span className="text-[#80141d] font-bold">Tải 78%</span>
              </div>
            </div>
          </div>

          {/* Pipeline 2: NomOCR-Transformer */}
          <div className="bg-white rounded-2xl border border-[#dec9b6] p-4 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faefe3] text-amber-900">
                  OCR &amp; NLP
                </span>
                <span className="text-[11px] text-stone-500 font-mono">● 4 instances</span>
              </div>
              <h3 className="font-bold text-stone-900 font-serif text-sm">
                NomOCR-Transformer
              </h3>
              <div className="text-[11px] text-[#80141d] font-mono font-semibold">
                v3.8-rubbing (Hán Nôm Viện Khảo Cổ)
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Nhận diện văn bia đá cổ xước mờ, bản dập mộc bản triều Lê - Nguyễn. Khử nhiễu thạch bản tự động.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative rounded-xl overflow-hidden h-28 border border-[#dec9b6]/60 bg-stone-100 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300&auto=format&fit=crop&q=80"
                  alt="NomOCR Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                  Bia đá &amp; Mộc bản
                </span>
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-emerald-800/90 text-white text-[9px] font-bold">
                  Độ chính xác F1 98.8%
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
                <span>Thông lượng: <strong>120 page/min</strong></span>
                <span className="text-amber-800 font-bold">Tải 54%</span>
              </div>
            </div>
          </div>

          {/* Pipeline 3: PedigreeGraph-Parser */}
          <div className="bg-white rounded-2xl border border-[#dec9b6] p-4 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faeed9] text-[#c9892c]">
                  Graph Topology
                </span>
                <span className="text-[11px] text-stone-500 font-mono">● 3 instances</span>
              </div>
              <h3 className="font-bold text-stone-900 font-serif text-sm">
                PedigreeGraph-Parser
              </h3>
              <div className="text-[11px] text-[#80141d] font-mono font-semibold">
                v2.4-genealogy (Cấu trúc Chi Phái)
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Trích xuất quan hệ phụ hệ, mẫu hệ, danh vị thứ bậc trong dòng họ; biên dịch tự động thành cấu trúc JSON phả hệ chuẩn.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative rounded-xl overflow-hidden h-28 border border-[#dec9b6]/60 bg-[#faefe3]/70 p-3 flex flex-col items-center justify-center">
                <div className="px-2.5 py-1 rounded bg-[#80141d] text-white text-[10px] font-bold">
                  Thủy Tổ
                </div>
                <div className="w-0.5 h-3 bg-stone-400"></div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-white text-[9px] border border-[#dec9b6]">Chi 1</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-[9px] border border-[#dec9b6]">Chi 2</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-[9px] border border-[#dec9b6]">Chi 3</span>
                </div>
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-emerald-800/90 text-white text-[9px] font-bold">
                  Khớp cây 100%
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
                <span>Thông lượng: <strong>18 phả đồ/min</strong></span>
                <span className="text-stone-700 font-bold">Tải 32%</span>
              </div>
            </div>
          </div>

          {/* Pipeline 4: Handwriting-Transcriber */}
          <div className="bg-white rounded-2xl border border-[#dec9b6] p-4 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-800">
                  Manuscript NLP
                </span>
                <span className="text-[11px] text-stone-500 font-mono">● 3 instances</span>
              </div>
              <h3 className="font-bold text-stone-900 font-serif text-sm">
                Handwriting-Transcriber
              </h3>
              <div className="text-[11px] text-[#80141d] font-mono font-semibold">
                v1.9-quocngu (Bút ký Nam Bộ &amp; Bắc Hà)
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Dịch giải bút tích chữ mực tàu, quốc ngữ đầu thế kỷ XX, văn tự điền bộ chúc thư truyền đời.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative rounded-xl overflow-hidden h-28 border border-[#dec9b6]/60 bg-amber-50">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=80"
                  alt="Handwriting Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                  Chữ Nôm • Bút ký
                </span>
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-[#80141d]/90 text-white text-[9px] font-bold">
                  BLEU Score 92.4
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
                <span>Thông lượng: <strong>65 trang/min</strong></span>
                <span className="text-[#80141d] font-bold">Tải 61%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Dòng Tác Vụ Thời Gian Thực (Live Job Stream) */}
      <div className="bg-white rounded-2xl border border-[#dec9b6] shadow-xs overflow-hidden">
        {/* Table Title Bar */}
        <div className="p-4 border-b border-[#dec9b6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fdfaf5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                Dòng Tác Vụ Thời Gian Thực (Live Job Stream)
              </h3>
              <p className="text-[11px] text-stone-500">
                Cập nhật mỗi 2 giây • Websocket Cluster-Live-Event
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={pipelineFilter}
              onChange={(e) => setPipelineFilter(e.target.value)}
              className="bg-white border border-[#dec9b6] text-stone-800 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-hidden"
            >
              <option value="all">Tất cả Pipelines</option>
              <option value="face">HeritageFace-Restore</option>
              <option value="ocr">NomOCR-Transformer</option>
              <option value="tree">PedigreeGraph-Parser</option>
              <option value="hand">Handwriting-Transcriber</option>
            </select>
            <button
              type="button"
              onClick={() => alert('Đang làm mới dòng sự kiện')}
              className="p-1.5 rounded-xl border border-[#dec9b6] hover:bg-[#faefe3] text-stone-600 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Live Job Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#dec9b6]/60 text-stone-400 font-semibold tracking-wider uppercase text-[10px] bg-[#fcf8f2]">
                <th className="py-3 px-3">MÃ JOB</th>
                <th className="py-3 px-3">THỜI GIAN</th>
                <th className="py-3 px-3">PIPELINE AI</th>
                <th className="py-3 px-3">GIA TỘC THỤ HƯỞNG</th>
                <th className="py-3 px-3">ĐẦU VÀO TƯ LIỆU</th>
                <th className="py-3 px-3">TIẾN ĐỘ</th>
                <th className="py-3 px-3">THỰC THI</th>
                <th className="py-3 px-3">TRẠNG THÁI</th>
                <th className="py-3 px-3 text-right">HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dec9b6]/40">
              {/* Row 1 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono font-bold text-[#80141d]">#JOB-88419</td>
                <td className="py-3.5 px-3 font-mono text-stone-600">14:32:08</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#faeed9] text-[#80141d]">
                    HeritageFace-Restore
                  </span>
                </td>
                <td className="py-3.5 px-3 font-medium text-stone-800">Nguyễn Phúc (Huế)</td>
                <td className="py-3.5 px-3 font-mono text-stone-600 truncate max-w-[150px]">
                  ChanDung_CuBa_1896_4K.tiff
                </td>
                <td className="py-3.5 px-3 w-32">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-[#faeed9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#80141d] rounded-full w-[74%]"></div>
                    </div>
                    <span className="font-mono text-[10.5px] text-stone-600 font-bold">74%</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-mono text-stone-600">1.12s</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-amber-50 text-amber-900 flex items-center gap-1 w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>
                    Processing
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1 text-stone-500 hover:text-[#80141d]"><span className="material-symbols-outlined text-[15px]">play_arrow</span></button>
                    <button className="p-1 text-stone-500 hover:text-red-700"><span className="material-symbols-outlined text-[15px]">close</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono font-bold text-[#80141d]">#JOB-88418</td>
                <td className="py-3.5 px-3 font-mono text-stone-600">14:31:55</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#faefe3] text-amber-900">
                    NomOCR-Transformer
                  </span>
                </td>
                <td className="py-3.5 px-3 font-medium text-stone-800">Lê Cảnh (Lam Kinh)</td>
                <td className="py-3.5 px-3 font-mono text-stone-600 truncate max-w-[150px]">
                  BanDap_BiaDa_VinhLang_T...
                </td>
                <td className="py-3.5 px-3 w-32">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-[#faeed9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#c9892c] rounded-full w-[48%]"></div>
                    </div>
                    <span className="font-mono text-[10.5px] text-stone-600 font-bold">48%</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-mono text-stone-600">320ms</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-amber-50 text-amber-900 flex items-center gap-1 w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>
                    Processing
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1 text-stone-500 hover:text-[#80141d]"><span className="material-symbols-outlined text-[15px]">play_arrow</span></button>
                    <button className="p-1 text-stone-500 hover:text-red-700"><span className="material-symbols-outlined text-[15px]">close</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono font-bold text-[#80141d]">#JOB-88417</td>
                <td className="py-3.5 px-3 font-mono text-stone-600">14:31:40</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#faeed9] text-[#c9892c]">
                    PedigreeGraph-Parser
                  </span>
                </td>
                <td className="py-3.5 px-3 font-medium text-stone-800">Trần Đăng (Hải Dương)</td>
                <td className="py-3.5 px-3 font-mono text-stone-600 truncate max-w-[150px]">
                  SoDo_PhaKy_ChiBa_CanChi...
                </td>
                <td className="py-3.5 px-3 w-32">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-[#faeed9] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-700 rounded-full w-[100%]"></div>
                    </div>
                    <span className="font-mono text-[10.5px] text-emerald-700 font-bold">100%</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-mono text-stone-600">0.84s</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 w-max">
                    ✓ Completed
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1 text-stone-500 hover:text-stone-900"><span className="material-symbols-outlined text-[15px]">download</span></button>
                    <button className="p-1 text-stone-500 hover:text-stone-900"><span className="material-symbols-outlined text-[15px]">visibility</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono font-bold text-[#80141d]">#JOB-88416</td>
                <td className="py-3.5 px-3 font-mono text-stone-600">14:31:12</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-rose-50 text-rose-800">
                    Handwriting-Transcriber
                  </span>
                </td>
                <td className="py-3.5 px-3 font-medium text-stone-800">Vũ Tộc (Bình Định)</td>
                <td className="py-3.5 px-3 font-mono text-stone-600 truncate max-w-[150px]">
                  VanChucThu_MucTau_1912....
                </td>
                <td className="py-3.5 px-3 w-32">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-[#faeed9] rounded-full overflow-hidden">
                      <div className="h-full bg-amber-600 rounded-full w-[25%]"></div>
                    </div>
                    <span className="font-mono text-[10.5px] text-stone-600 font-bold">25%</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-mono text-stone-600">2.41s</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-amber-100 text-amber-900 flex items-center gap-1 w-max">
                    ⟳ Retrying (2/3)
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1 text-stone-500 hover:text-amber-800"><span className="material-symbols-outlined text-[15px]">bug_report</span></button>
                    <button className="p-1 text-stone-500 hover:text-stone-900"><span className="material-symbols-outlined text-[15px]">restart_alt</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-[#faefe3]/40 transition-colors">
                <td className="py-3.5 px-3 font-mono font-bold text-[#80141d]">#JOB-88415</td>
                <td className="py-3.5 px-3 font-mono text-stone-600">14:30:20</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#faeed9] text-[#80141d]">
                    HeritageFace-Restore
                  </span>
                </td>
                <td className="py-3.5 px-3 font-medium text-stone-800">Hoàng Phái (Thừa Thiên)</td>
                <td className="py-3.5 px-3 font-mono text-stone-600 truncate max-w-[150px]">
                  HuHongNang_AnhVangO.jpg
                </td>
                <td className="py-3.5 px-3 w-32">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-[#faeed9] rounded-full overflow-hidden">
                      <div className="h-full bg-rose-700 rounded-full w-[15%]"></div>
                    </div>
                    <span className="font-mono text-[10.5px] text-rose-700 font-bold">15%</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-mono text-stone-600">0.45s</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1 w-max">
                    ✕ Failed (OOM)
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1 text-stone-500 hover:text-[#80141d]"><span className="material-symbols-outlined text-[15px]">replay</span></button>
                    <button className="p-1 text-stone-500 hover:text-stone-900"><span className="material-symbols-outlined text-[15px]">description</span></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#dec9b6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-[#fdfaf5] text-stone-500">
          <span>Đang hiển thị 5 trên 142 tác vụ đang chờ • Auto-scroll: Bật</span>
          <span className="text-[#80141d] font-semibold">Tự động xả tải khi nhiệt độ &gt; 82°C</span>
        </div>
      </div>
    </div>
  );
};
