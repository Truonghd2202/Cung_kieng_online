import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminModerationScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminModerationScreen: React.FC<AdminModerationScreenProps> = ({ onNavigate }) => {
  const [selectedCaseId, setSelectedCaseId] = useState('1');
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAE1D3] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-3.5 bg-[#80141d] rounded-full inline-block"></span>
            <span className="text-[11px] font-bold tracking-wider text-[#80141d] uppercase font-mono">
              QUY CHUẨN TÔN NGHIÊM • Phiên Trực: Ca Sáng #KD-8842
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Kiểm Duyệt Nội Dung &amp; Tôn Nghiêm Di Sản
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Bảo vệ giá trị gia phong và thuần phong mỹ tục. Ngăn chặn mê tín dị đoan, trục lợi tâm linh và bảo đảm chuẩn mực kính phụng tổ tiên.
          </p>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => alert('Mở bảng cấu hình từ khóa & hình ảnh cấm AI Guardrail')}
            className="px-3.5 py-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-stone-600">tune</span>
            <span>Cấu hình AI Guardrail</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Chế độ Kính cẩn tự động đang kích hoạt ở mức cao nhất')}
            className="px-4 py-2 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span>Chế độ Kính cẩn tự động</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>ĐANG CHỜ DUYỆT KHẨN</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
              <span className="material-symbols-outlined text-[16px]">pending_actions</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-rose-700">23</span>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              +5 vụ mới
            </span>
          </div>
          <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            <span>Yêu cầu xử lý trong &lt; 15 phút</span>
            <span className="text-rose-700 font-bold">Ưu tiên số 1</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>AI GUARDRAIL ĐÃ CHẶN</span>
            <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-amber-700">
              <span className="material-symbols-outlined text-[16px]">shield</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900">145</span>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
              98.4% chính xác
            </span>
          </div>
          <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            <span>Mô hình lọc từ khóa &amp; hình ảnh cấm</span>
            <span className="font-semibold text-stone-700">Tự động 24/7</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>BÁO CÁO TỪ THÀNH VIÊN</span>
            <div className="w-7 h-7 rounded-lg bg-[#faefe3] border border-[#dec9b6] flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[16px]">flag</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900">9</span>
            <span className="text-[11px] font-bold text-[#80141d] bg-[#faeed9] px-1.5 py-0.5 rounded">
              4 từ Trưởng Tộc
            </span>
          </div>
          <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            <span>Xác minh gia phả nội tộc</span>
            <span className="text-[#80141d] font-bold">Cần đối chiếu</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
            <span>ĐÃ XỬ LÝ HÔM NAY</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900">318</span>
            <span className="text-[11px] text-stone-500">Thời gian TB: 3m</span>
          </div>
          <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-[#dec9b6]/40">
            <span>Tỷ lệ vi phạm lặp lại: 1.2%</span>
            <span className="text-emerald-700 font-bold">Bình ổn</span>
          </div>
        </div>
      </div>

      {/* Category Pills & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-stone-400 font-bold mr-1">Danh mục:</span>
          {[
            { id: 'all', label: 'Tất cả (23)' },
            { id: 'incense', label: 'Lời tri ân & Thắp hương (8)' },
            { id: 'story', label: 'Điển tích & Kỷ niệm công khai (5)' },
            { id: 'museum', label: 'Ảnh hiến tặng bảo tàng (4)' },
            { id: 'dispute', label: 'Tranh chấp bình luận phả ký (6)' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === cat.id
                  ? 'bg-[#80141d] text-white shadow-2xs'
                  : 'bg-white text-stone-700 border border-[#dec9b6] hover:bg-[#faefe3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-stone-600 shrink-0">
          <span className="text-stone-400 font-semibold">Mức độ:</span>
          <span className="flex items-center gap-1 font-semibold text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-700"></span>
            Nghiêm trọng (Mê tín, xuyên tạc)
          </span>
          <span className="flex items-center gap-1 font-semibold text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            Cảnh báo (Thiếu tôn kính, riêng tư)
          </span>
        </div>
      </div>

      {/* Main Split: Left Table & Right Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Table (7/12): Danh Sách Bị Gắn Cờ Vi Phạm */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#dec9b6] shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-[#dec9b6]/60 flex items-center justify-between bg-[#fdfaf5]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#80141d]">flag</span>
                <h3 className="text-sm font-bold text-stone-900 font-serif">
                  Danh Sách Bị Gắn Cờ Vi Phạm
                </h3>
                <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#faeed9] text-[#80141d]">
                  4 Vụ Nổi Cộm Cần Quyết Định
                </span>
              </div>
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">sync</span>
                Cập nhật 30 giây trước
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#dec9b6]/60 text-stone-400 font-semibold tracking-wider uppercase text-[10px] bg-[#fcf8f2]">
                    <th className="py-2.5 px-3">MÃ &amp; NỘI DUNG</th>
                    <th className="py-2.5 px-3">TÁC GIẢ &amp; KHÔNG GIAN</th>
                    <th className="py-2.5 px-3">TRÍCH ĐOẠN VI PHẠM</th>
                    <th className="py-2.5 px-3">LÝ DO / CẤP ĐỘ</th>
                    <th className="py-2.5 px-3 text-right">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dec9b6]/40">
                  {/* Row 1 */}
                  <tr
                    onClick={() => setSelectedCaseId('1')}
                    className={`hover:bg-[#faefe3]/50 transition-colors cursor-pointer ${
                      selectedCaseId === '1' ? 'bg-[#faefe3]/70' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-[#80141d]">#VP-2024-991</div>
                      <div className="text-[10.5px] text-stone-500">Lời tri ân &amp; Thắp hương</div>
                      <div className="text-[10px] text-stone-400">10 phút trước</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-stone-900">user_buiduc_88</div>
                      <div className="text-[10.5px] text-stone-500">Chi Họ Bùi (Vĩnh Lộc)</div>
                      <div className="text-[10px] text-stone-400 font-mono">ID: UID-77291</div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-stone-700 italic leading-snug line-clamp-2">
                        &quot;...Nhân ngày Giỗ Tổ bác nào muốn công danh tài lộc phát đạt liên hệ...&quot;
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-700 text-white block w-max">
                        Nghiêm Trọng
                      </span>
                      <span className="text-[10px] text-rose-800 font-semibold block mt-0.5">
                        Mê tín &amp; Bán hàng tâm linh
                      </span>
                      <span className="text-[9.5px] text-stone-400 font-mono block">Nguồn: AI Guardrail #K9</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Đã khóa ngay tài khoản vi phạm');
                        }}
                        className="px-2.5 py-1 bg-[#80141d] hover:bg-[#661017] text-white rounded-lg text-xs font-bold shadow-2xs"
                      >
                        Khóa Ngay
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr
                    onClick={() => setSelectedCaseId('2')}
                    className={`hover:bg-[#faefe3]/50 transition-colors cursor-pointer ${
                      selectedCaseId === '2' ? 'bg-[#faefe3]/70' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-stone-800">#VP-2024-988</div>
                      <div className="text-[10.5px] text-stone-500">Điển tích &amp; Kỷ vật</div>
                      <div className="text-[10px] text-stone-400">34 phút trước</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-stone-900">Nguyễn Văn Thuận</div>
                      <div className="text-[10.5px] text-stone-500">Đại Tộc Nguyễn (Đời 15)</div>
                      <div className="text-[10px] text-stone-400 font-mono">ID: UID-12894</div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-stone-700 italic leading-snug line-clamp-2">
                        &quot;...Hình chụp chúc thư năm 1993 của Cụ Cố giao mảnh đất 400m2...&quot;
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faeed9] text-[#c9892c] border border-[#f3b750]/50 block w-max">
                        Cảnh Báo
                      </span>
                      <span className="text-[10px] text-amber-900 font-semibold block mt-0.5">
                        Lộ thông tin cá nhân PII
                      </span>
                      <span className="text-[9.5px] text-stone-400 font-mono block">Nguồn: AI Regex Filter</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Đã ẩn bài và gửi tin nhắn nhắc nhở quy chuẩn riêng tư');
                        }}
                        className="px-2 py-1 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 rounded-lg text-xs font-semibold shadow-2xs"
                      >
                        Ẩn &amp; Nhắc
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr
                    onClick={() => setSelectedCaseId('3')}
                    className={`hover:bg-[#faefe3]/50 transition-colors cursor-pointer ${
                      selectedCaseId === '3' ? 'bg-[#faefe3]/70' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-[#80141d]">#VP-2024-984</div>
                      <div className="text-[10.5px] text-stone-500">Ảnh hiến tặng bảo tàng</div>
                      <div className="text-[10px] text-stone-400">1 giờ trước</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-stone-900">troll_king_viet</div>
                      <div className="text-[10.5px] text-stone-500">Không Gian Phổ Thông #8</div>
                      <div className="text-[10px] text-stone-400 font-mono">ID: UID-99318</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 shrink-0">
                          <span className="material-symbols-outlined text-[15px]">visibility_off</span>
                        </div>
                        <span className="text-[10.5px] text-rose-800 font-medium leading-tight">
                          Ảnh ghép hoạt hình...
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-700 text-white block w-max">
                        Nghiêm Trọng
                      </span>
                      <span className="text-[10px] text-rose-800 font-semibold block mt-0.5">
                        Xúc phạm tôn nghiêm tiền nhân
                      </span>
                      <span className="text-[9.5px] text-stone-400 font-mono block">Nguồn: Trưởng Tộc Báo Cáo</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Đã khóa vĩnh viễn tài khoản troll');
                        }}
                        className="px-2 py-1 bg-[#661017] hover:bg-[#4d0c11] text-white rounded-lg text-xs font-bold shadow-2xs"
                      >
                        Khóa Vĩnh Viễn
                      </button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr
                    onClick={() => setSelectedCaseId('4')}
                    className={`hover:bg-[#faefe3]/50 transition-colors cursor-pointer ${
                      selectedCaseId === '4' ? 'bg-[#faefe3]/70' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-stone-800">#VP-2024-972</div>
                      <div className="text-[10.5px] text-stone-500">Tranh chấp bình luận</div>
                      <div className="text-[10px] text-stone-400">2 giờ trước</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-stone-900">Lê Hoàng Quân &amp; Chi Giáp</div>
                      <div className="text-[10.5px] text-stone-500">Họ Lê Chi Đông (Quảng Nam)</div>
                      <div className="text-[10px] text-[#80141d] font-semibold">23 lượt phản hồi gay gắt</div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-stone-700 italic leading-snug line-clamp-2">
                        &quot;...Bên Chi Ất các người là thứ xuất, không có quyền giữ chìa khóa n...&quot;
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#faefe3] text-stone-800 border border-[#dec9b6] block w-max">
                        Tranh Chấp Nội Bộ
                      </span>
                      <span className="text-[10px] text-stone-600 block mt-0.5">
                        Mâu thuẫn chi phái từ đường
                      </span>
                      <span className="text-[9.5px] text-stone-400 font-mono block">Nguồn: Hội Đồng Chi Tộc</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Đã chuyển phiên sang Hội Đồng Trưởng Lão');
                        }}
                        className="px-2 py-1 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-semibold shadow-2xs"
                      >
                        Hội Đồng Trưởng Lão
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table pagination */}
          <div className="p-3 border-t border-[#dec9b6]/60 flex items-center justify-between text-xs bg-[#fdfaf5] text-stone-500">
            <span>Hiển thị 4 trong tổng số 23 nội dung cần thẩm tra</span>
            <div className="flex items-center gap-1 font-mono">
              <button className="px-2 py-0.5 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">Trước</button>
              <button className="px-2 py-0.5 rounded bg-[#80141d] text-white font-bold">1</button>
              <button className="px-2 py-0.5 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">2</button>
              <button className="px-2 py-0.5 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">3</button>
              <button className="px-2 py-0.5 rounded border border-[#dec9b6] bg-white hover:bg-[#faefe3]">Sau</button>
            </div>
          </div>
        </div>

        {/* Right Detail Panel (5/12): Chi Tiết Hồ Sơ Thẩm Định */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#dec9b6] p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#dec9b6]/60">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase block">CHI TIẾT HỒ SƠ THẨM ĐỊNH</span>
                <h3 className="font-mono font-bold text-stone-900 text-sm">#VP-2024-991</h3>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-700 text-white">
                Mức: Nghiêm Trọng
              </span>
            </div>

            {/* Author summary */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6]/60">
              <div className="w-10 h-10 rounded-xl bg-[#80141d] text-white flex items-center justify-center font-bold text-sm">
                B
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-xs">Chi Họ Bùi (Vĩnh Lộc, Thanh Hóa)</h4>
                <p className="text-[11px] text-stone-500">
                  Người đăng: <strong className="text-stone-800">user_buiduc_88</strong> (Thành viên liên kết)
                </p>
              </div>
            </div>

            {/* Article policy warning */}
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-900">
                <span className="material-symbols-outlined text-[16px] text-rose-700">gavel</span>
                <span>Điều 4: Cấm Thương Mại Hóa Tâm Linh &amp; Mê Tín</span>
              </div>
              <p className="text-[11px] text-rose-900/90 leading-relaxed">
                Không gian số Thích Cúng Kiếng phụng sự hoài niệm và phả hệ gia phong. Mọi hành vi rao bán bùa chú, đồng bóng, lôi kéo cờ bạc phong thủy hoặc trục lợi đám giỗ đều bị gỡ bỏ ngay lập tức và khóa quyền truy cập.
              </p>
            </div>

            {/* Quoted violation text */}
            <div className="space-y-1 text-xs">
              <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider block">
                TOÀN VĂN NỘI DUNG GỬI KIỂM DUYỆT
              </span>
              <div className="p-3.5 rounded-xl bg-[#fcf8f2] border border-[#dec9b6] text-[11.5px] text-stone-800 leading-relaxed font-sans">
                &quot;Kính lạy các bậc tiền bối, con cháu kính cẩn dâng nén <strong className="text-[#80141d]">nhang thành tâm</strong>. Nhân ngày Giỗ Tổ bác nào muốn công danh tài lộc phát đạt liên hệ em ngay qua Zalo 0987xxx, có <strong className="text-rose-700 bg-rose-100 px-1 py-0.5 rounded">bùa hộ mệnh phong thủy Thái Lan làm phép giá 2.5 triệu</strong> đảm bảo linh ứng 100%, bảo hành tài lộc trọn đời, ship tận nơi cả nước...&quot;
              </div>
            </div>

            {/* AI Automated Assessment */}
            <div className="p-3 rounded-xl bg-[#faeed9]/60 border border-[#f3b750]/50 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#80141d]">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span>Đánh giá tự động từ Bộ Lọc Tôn Nghiêm</span>
              </div>
              <p className="text-[11px] text-stone-700 leading-relaxed">
                Xác suất thương mại trái phép: <strong className="text-rose-700 font-mono">99.1%</strong>. Mức độ phương hại văn hóa truyền thống: <strong className="text-stone-900">Cấp độ 4/5</strong>. Khuyến nghị: Áp dụng chế tài cấp cao nhất.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2 border-t border-[#dec9b6]/60">
            <span className="text-[10.5px] font-bold text-stone-500 uppercase block">HÀNH ĐỘNG XỬ LÝ NGAY</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => alert('Đã gỡ bỏ nội dung và gửi cảnh báo vi phạm')}
                className="py-2 px-2.5 rounded-xl bg-[#faefe3] hover:bg-[#faeed9] border border-[#dec9b6] text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#80141d]">delete</span>
                <span>Gỡ bỏ &amp; Cảnh cáo</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Đã tạm đình chỉ tài khoản 30 ngày')}
                className="py-2 px-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">person_off</span>
                <span>Khóa nick 30 ngày</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => alert('Đã bỏ qua gắn cờ và đánh dấu nội dung hợp lệ')}
                className="py-2 px-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Bỏ qua gắn cờ</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Đã chuyển hồ sơ sang Hội Đồng Trưởng Lão hòa giải')}
                className="py-2 px-2.5 rounded-xl bg-[#80141d] hover:bg-[#661017] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">balance</span>
                <span>Hội Đồng Trưởng Lão</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Cẩm Nang Chuẩn Mực Ứng Xử Phả Hệ & Thờ Phụng */}
      <div className="p-4 rounded-2xl bg-[#faefe3]/70 border border-[#dec9b6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d] shrink-0">
            <span className="material-symbols-outlined text-[22px]">menu_book</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900 font-serif">
              Cẩm Nang Chuẩn Mực Ứng Xử Phả Hệ &amp; Thờ Phụng
            </h4>
            <p className="text-xs text-stone-600 mt-0.5">
              Bao gồm 12 điều lệ bảo vệ tôn nghiêm di văn, chuẩn mực xưng hô chữ Nho - Quốc Ngữ, và phương thức phân xử di huấn tộc họ hài hòa.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('admin-cms-cam-nang')}
            className="px-3.5 py-2 bg-white hover:bg-[#faefe3] border border-[#dec9b6] text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            Xem Quy Chuẩn Tộc Ước
          </button>
          <button
            type="button"
            onClick={() => alert('Đang kết xuất báo cáo tuần (PDF)')}
            className="px-3.5 py-2 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Xuất Báo Cáo Tuần (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
