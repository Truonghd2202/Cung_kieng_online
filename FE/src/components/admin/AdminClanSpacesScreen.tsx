import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface AdminClanSpacesScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface ClanItem {
  id: string;
  code: string;
  name: string;
  badge: string;
  badgeColor: string;
  address: string;
  region: string;
  leader: string;
  leaderEmail: string;
  leaderTitle: string;
  generations: number;
  members: number;
  internal: number;
  external: number;
  storage: string;
  storageNote: string;
  storageWarning?: boolean;
  isLocked?: boolean;
}

const CLAN_LIST: ClanItem[] = [
  {
    id: '1',
    code: '#CLAN-0012',
    name: 'Đại Tộc Nguyễn Phục Anh',
    badge: 'Nhà Thờ Tổ',
    badgeColor: 'bg-[#faeed9] text-[#80141d] border-[#f3b750]/50',
    address: 'Ý Yên, Nam Định',
    region: 'Miền Bắc',
    leader: 'Cụ Nguyễn Đình Cảnh',
    leaderEmail: 'truongtoc.nguyendinh@gmail.com',
    leaderTitle: 'Trưởng Tộc Đời 13',
    generations: 14,
    members: 428,
    internal: 312,
    external: 116,
    storage: '38.4 GB / 100 GB',
    storageNote: '18 Cổ vật 3D',
  },
  {
    id: '2',
    code: '#CLAN-0045',
    name: 'Họ Lê Văn - Tiền Hiền Khai Hoang',
    badge: 'Di Tích Tỉnh',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    address: 'Hương Thủy, Thừa Thiên Huế',
    region: 'Miền Trung',
    leader: 'Ông Lê Văn Trọng',
    leaderEmail: 'levantrong.hue@heritage.vn',
    leaderTitle: 'Ban Trị Sự Tộc',
    generations: 11,
    members: 680,
    internal: 510,
    external: 170,
    storage: '92.1 GB / 100 GB',
    storageNote: 'Sắp vượt trần',
    storageWarning: true,
  },
  {
    id: '3',
    code: '#CLAN-0288',
    name: 'Trần Tộc Chi 3 - Phân Nhánh An Giang',
    badge: 'Chi Phái',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    address: 'Chợ Mới, An Giang',
    region: 'Miền Nam',
    leader: 'Trần Văn Thiện (Đại diện)',
    leaderEmail: 'tvthien.angiang@yahoo.com',
    leaderTitle: 'Trưởng Chi Nhánh 3',
    generations: 7,
    members: 195,
    internal: 140,
    external: 55,
    storage: '12.3 GB / 50 GB',
    storageNote: '4 Bản thờ',
  },
  {
    id: '4',
    code: '#CLAN-0914',
    name: 'Vũ Tộc Đường - Chi Thứ Giáp',
    badge: 'Tạm Khóa',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    address: 'Cẩm Giàng, Hải Dương',
    region: 'Miền Bắc',
    leader: 'Vũ Huy Tuấn (Ủy Quyền)',
    leaderEmail: 'tuancamgiang@vufamily.org',
    leaderTitle: 'Tranh chấp phả đồ nhánh 2',
    generations: 9,
    members: 310,
    internal: 220,
    external: 90,
    storage: '21.0 GB / 50 GB',
    storageNote: 'Khóa ghi',
    isLocked: true,
  },
  {
    id: '5',
    code: '#CLAN-0871',
    name: 'Hội Đồng Hoàng Tộc Nguyễn Phúc - California',
    badge: 'Hải Ngoại',
    badgeColor: 'bg-[#faeed9] text-[#c9892c] border-[#f3b750]/50',
    address: 'Orange County, CA (USA)',
    region: 'Hải ngoại',
    leader: 'Tôn Thất Hoài Nam',
    leaderEmail: 'hoainam.tonthat@oversea-lineage.org',
    leaderTitle: 'Hội Đồng Quản Trị Hải Ngoại',
    generations: 16,
    members: 1240,
    internal: 920,
    external: 320,
    storage: '84.0 GB / 200 GB',
    storageNote: '54 Tư liệu bản',
  },
];

export const AdminClanSpacesScreen: React.FC<AdminClanSpacesScreenProps> = ({ onNavigate }) => {
  const [selectedClan, setSelectedClan] = useState<ClanItem | null>(CLAN_LIST[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterCert, setFilterCert] = useState('all');
  const [filterStorage, setFilterStorage] = useState('all');

  const handleClanRowClick = (clan: ClanItem) => {
    setSelectedClan(clan);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE1D3] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-3.5 bg-[#80141d] rounded-full inline-block"></span>
            <span className="text-[11px] font-bold tracking-wider text-[#80141d] uppercase font-mono">
              TRUNG TÂM PHẢ KÝ TOÀN QUỐC
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Quản Lý Không Gian Gia Tộc &amp; Nhà Thờ Họ Toàn Quốc
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Giám sát tính nguyên vẹn của kim phả, kiểm chứng tư liệu cúng tế và hạ tầng số hóa di sản 63 tỉnh thành.
          </p>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => alert('Đang gửi quy chuẩn cập nhật kim phả tới 1,482 Ban Trị Sự')}
            className="px-3.5 py-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-stone-600">mail</span>
            <span>Gửi quy chuẩn gia phả</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Đang xuất niên giám dòng họ toàn quốc định dạng Excel/PDF')}
            className="px-3.5 py-2 bg-white border border-[#dec9b6] hover:bg-[#faefe3] text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-stone-600">download</span>
            <span>Xuất niên giám dòng họ</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Mở bảng khởi tạo không gian gia tộc mới')}
            className="px-4 py-2 bg-[#80141d] hover:bg-[#661017] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Khởi tạo không gian mới</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
              TỔNG KHÔNG GIAN GIA TỘC
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#faeed9] border border-[#f3b750]/40 flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[18px]">temple_buddhist</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900">1,482</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              +14 tháng này
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-2">
            Gồm 1,024 Đại tộc • 458 Chi thứ
          </p>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
              CẤP CHI TỘC ĐỘC LẬP
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#faeed9] border border-[#f3b750]/40 flex items-center justify-center text-[#c9892c]">
              <span className="material-symbols-outlined text-[18px]">account_tree</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900">98</span>
            <span className="text-[11px] text-stone-500">Chi phái nhánh</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-2">
            Đã liên kết từ đường gốc
          </p>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
              DI TÍCH CẤP QUỐC GIA / TỈNH
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#faeed9] border border-[#f3b750]/40 flex items-center justify-center text-amber-700">
              <span className="material-symbols-outlined text-[18px]">military_tech</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900">12</span>
            <span className="text-[11px] text-stone-500">Nhà Thờ Tổ</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-2">
            Đã mã hóa sắc phong &amp; văn bia
          </p>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
              CẢNH BÁO DUNG LƯỢNG &amp; PHẢ ĐỒ
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-rose-700">7</span>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              Cần xử lý gấp
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-2">
            5 quá tải tài nguyên • 2 tranh chấp
          </p>
        </div>
      </div>

      {/* Filter Bar: Bộ Lọc & Thẩm Tra Phân Tuyến */}
      <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
            <span className="material-symbols-outlined text-[17px] text-[#80141d]">tune</span>
            <span>Bộ Lọc &amp; Thẩm Tra Phân Tuyến</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setFilterType('all');
              setFilterRegion('all');
              setFilterCert('all');
              setFilterStorage('all');
            }}
            className="text-[11px] font-semibold text-stone-500 hover:text-[#80141d] flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              PHÂN LOẠI KHÔNG GIAN
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-hidden focus:border-[#80141d]"
            >
              <option value="all">Tất cả phân loại (1,482)</option>
              <option value="daitoc">Đại Tộc Tổ (1,024)</option>
              <option value="tienhien">Tiền Hiền Khai Hoang</option>
              <option value="chiphainhanh">Chi Phái Nhánh (458)</option>
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              KHU VỰC ĐỊA LÝ
            </label>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-hidden focus:border-[#80141d]"
            >
              <option value="all">Toàn quốc &amp; Hải ngoại</option>
              <option value="bac">Miền Bắc</option>
              <option value="trung">Miền Trung</option>
              <option value="nam">Miền Nam</option>
              <option value="overseas">Hải ngoại</option>
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              KIỂM CHỨNG KIM PHẢ
            </label>
            <select
              value={filterCert}
              onChange={(e) => setFilterCert(e.target.value)}
              className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-hidden focus:border-[#80141d]"
            >
              <option value="all">Tất cả trạng thái xác thực</option>
              <option value="verified">Đã chứng nhận Viện Hán Nôm</option>
              <option value="pending">Đang giám định thư tịch</option>
              <option value="dispute">Đang tạm khóa tranh chấp</option>
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-semibold text-stone-500 block mb-1 uppercase tracking-wider">
              TÌNH TRẠNG DUNG LƯỢNG
            </label>
            <select
              value={filterStorage}
              onChange={(e) => setFilterStorage(e.target.value)}
              className="w-full bg-[#fcf8f2] border border-[#dec9b6] rounded-xl px-3 py-2 text-stone-800 font-medium focus:outline-hidden focus:border-[#80141d]"
            >
              <option value="all">Toàn bộ mức dung lượng</option>
              <option value="warning">Sắp vượt trần (&gt;90%)</option>
              <option value="normal">Bình thường (&lt;50%)</option>
              <option value="locked">Bị khóa lưu trữ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table: Danh Sách Không Gian Gia Tộc */}
      <div className="bg-white rounded-2xl border border-[#dec9b6] shadow-xs overflow-hidden">
        {/* Table Title Bar */}
        <div className="p-4 border-b border-[#dec9b6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#fdfaf5]">
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Danh Sách Không Gian Gia Tộc
            </h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#80141d] text-white">
              Trang 1 / 149
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
            <span className="material-symbols-outlined text-[15px] text-[#c9892c]">info</span>
            <span>Dữ liệu thời gian thực đồng bộ với sổ bộ hương ước số</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#dec9b6]/60 text-stone-400 font-semibold tracking-wider uppercase text-[10px] bg-[#fcf8f2]">
                <th className="py-3 px-4">KHÔNG GIAN &amp; MÃ PHẢ</th>
                <th className="py-3 px-4">TRƯỞNG TỘC / QUẢN TRỊ</th>
                <th className="py-3 px-4">QUY MÔ PHẢ HỆ</th>
                <th className="py-3 px-4">KHO LƯU TRỮ 3D</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dec9b6]/40">
              {CLAN_LIST.map((clan) => (
                <tr
                  key={clan.id}
                  onClick={() => handleClanRowClick(clan)}
                  className={`hover:bg-[#faefe3]/50 transition-colors cursor-pointer ${
                    selectedClan?.id === clan.id && drawerOpen ? 'bg-[#faefe3]/60' : ''
                  }`}
                >
                  {/* Clan Name & Code */}
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d] shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[19px]">temple_buddhist</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-stone-900 font-serif text-[13px] hover:text-[#80141d]">
                            {clan.name}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${clan.badgeColor}`}>
                            {clan.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                          <span className="text-[#80141d] font-bold">{clan.code}</span>
                          <span className="mx-1">•</span>
                          <span>{clan.address}</span>
                          <span className="mx-1">•</span>
                          <span className="text-stone-700 font-sans">{clan.region}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Leader Info */}
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-bold text-stone-800 text-xs">
                        {clan.leader}
                      </div>
                      <div className="text-[10.5px] text-stone-400 font-mono">
                        {clan.leaderEmail}
                      </div>
                      <div className={`text-[11px] font-medium mt-0.5 ${clan.isLocked ? 'text-rose-700 font-semibold' : 'text-stone-600'}`}>
                        {clan.leaderTitle}
                      </div>
                    </div>
                  </td>

                  {/* Generation & Member count */}
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-bold text-stone-900 text-xs">
                        <span className="text-[#80141d] font-serif text-sm">{clan.generations} Đời</span>
                        <span className="text-stone-500 font-normal ml-1">({clan.members} nhân khẩu)</span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {clan.internal} Nội tộc • {clan.external} Ngoại tộc
                      </div>
                    </div>
                  </td>

                  {/* Storage */}
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-bold text-stone-800 font-mono text-xs">
                        {clan.storage}
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 mt-0.5 ${
                        clan.storageWarning
                          ? 'text-rose-700 font-bold'
                          : clan.isLocked
                          ? 'text-stone-600 font-medium'
                          : 'text-[#c9892c] font-medium'
                      }`}>
                        {clan.storageWarning && <span className="material-symbols-outlined text-[13px]">warning</span>}
                        {clan.isLocked && <span className="material-symbols-outlined text-[13px]">lock</span>}
                        <span>{clan.storageNote}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-[#dec9b6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-[#fdfaf5]">
          <div className="flex items-center gap-2 text-stone-600">
            <span>Hiển thị 5 trên tổng số 1,482 không gian phả ký</span>
            <span>•</span>
            <span>Mỗi trang:</span>
            <select className="bg-white border border-[#dec9b6] rounded-md px-1.5 py-0.5 text-stone-700 font-medium">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded-lg border border-[#dec9b6] bg-white text-stone-500 hover:bg-[#faefe3]">
              ‹
            </button>
            <button className="px-2.5 py-1 rounded-lg bg-[#80141d] text-white font-bold">
              1
            </button>
            <button className="px-2.5 py-1 rounded-lg border border-[#dec9b6] bg-white text-stone-700 hover:bg-[#faefe3]">
              2
            </button>
            <button className="px-2.5 py-1 rounded-lg border border-[#dec9b6] bg-white text-stone-700 hover:bg-[#faefe3]">
              3
            </button>
            <span className="px-1 text-stone-400">...</span>
            <button className="px-2.5 py-1 rounded-lg border border-[#dec9b6] bg-white text-stone-700 hover:bg-[#faefe3]">
              75
            </button>
            <button className="px-2.5 py-1 rounded-lg border border-[#dec9b6] bg-white text-stone-500 hover:bg-[#faefe3]">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Bottom 2 Cards (Screenshot 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card: Tiến Độ Thẩm Định Kim Phả & Sắc Phong Theo Miền (7/12) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#80141d]">monitoring</span>
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                Tiến Độ Thẩm Định Kim Phả &amp; Sắc Phong Theo Miền
              </h3>
            </div>
            <span className="text-[10.5px] text-stone-400">Cập nhật 15 phút trước</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Region 1: Bắc */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-stone-800">
                  Miền Bắc (Hà Nội, Nam Định, Bắc Ninh, Hải Dương)
                </span>
                <span className="font-bold text-[#80141d] font-mono">824 / 910 Không Gian (90.5%)</span>
              </div>
              <div className="h-2 w-full bg-[#faeed9] rounded-full overflow-hidden">
                <div className="h-full bg-[#80141d] rounded-full w-[90.5%]"></div>
              </div>
            </div>

            {/* Region 2: Trung */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-stone-800">
                  Miền Trung (Huế, Quảng Nam, Nghệ An, Hà Tĩnh)
                </span>
                <span className="font-bold text-[#80141d] font-mono">362 / 412 Không Gian (87.8%)</span>
              </div>
              <div className="h-2 w-full bg-[#faeed9] rounded-full overflow-hidden">
                <div className="h-full bg-[#80141d] rounded-full w-[87.8%]"></div>
              </div>
            </div>

            {/* Region 3: Nam */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-stone-800">
                  Miền Nam &amp; Đồng Bằng Sông Cửu Long
                </span>
                <span className="font-bold text-[#80141d] font-mono">148 / 185 Không Gian (80.0%)</span>
              </div>
              <div className="h-2 w-full bg-[#faeed9] rounded-full overflow-hidden">
                <div className="h-full bg-[#80141d] rounded-full w-[80.0%]"></div>
              </div>
            </div>

            {/* Region 4: Hải Ngoại */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-stone-800">
                  Hải Ngoại (Mỹ, Pháp, Đức, Canada, Úc)
                </span>
                <span className="font-bold text-[#80141d] font-mono">48 / 65 Không Gian (73.8%)</span>
              </div>
              <div className="h-2 w-full bg-[#faeed9] rounded-full overflow-hidden">
                <div className="h-full bg-[#80141d] rounded-full w-[73.8%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Quy Chuẩn Bảo Tồn Di Sản (5/12) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#dec9b6] shadow-xs space-y-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#c9892c]">verified</span>
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                Quy Chuẩn Bảo Tồn Di Sản
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Toàn bộ văn bia Hán Nôm và sắc phong triều Nguyễn được số hóa chuẩn bảo tàng 400 DPI, có chữ ký số xác thực nguồn gốc gia tộc.
            </p>

            <div className="mt-3 p-3 rounded-xl bg-[#faefe3]/70 border border-[#dec9b6] text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#80141d] mb-1">
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
                <span>Chứng Thư Kim Phả Số Hóa</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-snug">
                Đáp ứng quy định lưu trữ gia phả của Trung Tâm Lưu Trữ Quốc Gia và Viện Nghiên Cứu Hán Nôm.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Đang mở nhật ký cấp phát chứng thư số kim phả toàn hệ thống')}
            className="w-full py-2.5 rounded-xl bg-[#faefe3] hover:bg-[#faeed9] border border-[#dec9b6] text-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#80141d]">menu_book</span>
            <span>Xem Nhật Ký Cấp Chứng Thư</span>
          </button>
        </div>
      </div>

      {/* 3 Executive Bottom Cards (Screenshot 5 bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-stone-500 uppercase">HỘI ĐỒNG TỘC BIỂU QUYẾT</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#faeed9] text-[#80141d]">
              18 Yêu Cầu Mới
            </span>
          </div>
          <h4 className="font-bold text-stone-900 font-serif text-sm">
            Phục Dựng &amp; Giám Định Kim Điệp
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Đang có 18 đơn vị gia phả dòng họ yêu cầu đối chiếu thư tịch cổ với Viện Nghiên cứu Hán Nôm và Viện Sử học trước Rằm tháng Chạp.
          </p>
          <div className="pt-2 border-t border-[#dec9b6]/60 flex items-center justify-between text-[11px]">
            <span className="text-stone-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">history</span>
              Kỳ kiểm định: Năm Giáp Thìn
            </span>
            <button
              type="button"
              onClick={() => alert('Mở viện thẩm định')}
              className="text-[#80141d] font-bold hover:underline flex items-center gap-0.5"
            >
              Mở thẩm định viện →
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-stone-500 uppercase">HẠ TẦNG LƯU TRỮ DI SẢN</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 font-mono">
              78.4 TB / 120 TB
            </span>
          </div>
          <h4 className="font-bold text-stone-900 font-serif text-sm">
            Dung Lượng Bản Quét Tư Liệu Cổ
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Bao gồm 48,290 tệp ảnh độ phân giải cao định dạng TIFF của sắc phong triều Nguyễn, bản đồ địa bạ và ghi âm lễ cúng tế truyền thống.
          </p>
          <div className="pt-2 border-t border-[#dec9b6]/60 space-y-1">
            <div className="h-1.5 w-full bg-[#faeed9] rounded-full overflow-hidden">
              <div className="h-full bg-[#c9892c] rounded-full w-[65.3%]"></div>
            </div>
            <div className="flex justify-between text-[10.5px] text-stone-500">
              <span>Đã dùng 65.3%</span>
              <span>Khả dụng: 41.6 TB</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#dec9b6] shadow-xs space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-stone-900 font-serif font-bold text-sm mb-1">
              <span className="material-symbols-outlined text-[16px] text-[#80141d]">balance</span>
              <span>Nguyên Tắc Hòa Giải Tộc Biểu</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Các không gian có trạng thái "Tranh Chấp Nhánh" được tự động phân định theo nguyên tắc: Trưởng tộc tại quê quán giữ quyền gốc; Chi phái di cư giữ nhánh phụ cho đến khi hai bên xác lập biên bản hiệp thương có chứng thực của Ban Trị Sự.
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert('Mở sổ phân quyết hòa giải (82 vụ việc)')}
            className="w-full py-2 bg-[#80141d] hover:bg-[#661017] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Xem Sổ Phân Quyết (82)
          </button>
        </div>
      </div>

      {/* Slide-over Drawer / Right Detail Panel (Screenshot 5) */}
      {drawerOpen && selectedClan && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/30 backdrop-blur-2xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#dec9b6] overflow-y-auto">
            <div className="p-6 space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#dec9b6]/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#80141d] text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                    DN
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#80141d]">
                      {selectedClan.code}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 font-serif">
                      {selectedClan.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
                  title="Đóng bảng chi tiết"
                >
                  ✕
                </button>
              </div>

              {/* Certificate Box */}
              <div className="p-3.5 rounded-xl bg-[#faefe3]/70 border border-[#dec9b6] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#faeed9] border border-[#f3b750]/50 flex items-center justify-center text-[#80141d] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    Kim Phả Đã Chứng Nhận Hán Nôm
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                    Hồ sơ số 88/2023-VHN. Bản dịch bảo chứng bởi Viện Nghiên Cứu.
                  </p>
                </div>
              </div>

              {/* Section 1: THÔNG TIN TỪ ĐƯỜNG & TỔ MIẾU */}
              <div className="space-y-2 text-xs">
                <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider block">
                  THÔNG TIN TỪ ĐƯỜNG &amp; TỔ MIẾU
                </span>

                <div className="p-3.5 rounded-xl bg-[#fcf8f2] border border-[#dec9b6]/60 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Địa bàn:</span>
                    <span className="font-semibold text-stone-800 text-right">
                      Xã Yên Tiến, Huyện Ý Yên, Nam Định
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Năm khởi dựng:</span>
                    <span className="font-semibold text-stone-800">
                      1624 (Niên hiệu Vĩnh Tộ thứ 6)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Trưởng Tộc Kế Vị:</span>
                    <span className="font-semibold text-stone-800">
                      Nguyễn Đình Cảnh (SN 1948)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Ngày giỗ tổ:</span>
                    <span className="font-bold text-[#80141d]">
                      16 tháng Giêng (Âm Lịch)
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: PHÂN BỐ CHI PHÁI & ĐỊNH BỘ */}
              <div className="space-y-2.5 text-xs">
                <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider block">
                  PHÂN BỐ CHI PHÁI &amp; ĐỊNH BỘ
                </span>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6]">
                    <span className="text-[10px] text-stone-500 block uppercase">TỔNG THẾ HỆ</span>
                    <strong className="text-base font-bold font-serif text-[#80141d]">14 Đời</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#faefe3]/50 border border-[#dec9b6]">
                    <span className="text-[10px] text-stone-500 block uppercase">TỔNG ĐINH</span>
                    <strong className="text-base font-bold font-serif text-stone-900">428 Đinh</strong>
                  </div>
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-[#fcf8f2] border border-[#dec9b6]/60">
                  <div className="flex justify-between text-stone-700">
                    <span>Chi Giáp (Trưởng Chi)</span>
                    <strong className="font-mono text-stone-900">184 Đinh</strong>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>Chi Ất (Thứ Chi)</span>
                    <strong className="font-mono text-stone-900">132 Đinh</strong>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>Chi Bính (Nam tiến - Biên Hòa)</span>
                    <strong className="font-mono text-stone-900">112 Đinh</strong>
                  </div>
                </div>
              </div>

              {/* Section 3: KHO BẢO VẬT SỐ HÓA */}
              <div className="space-y-2 text-xs">
                <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider block">
                  KHO BẢO VẬT SỐ HÓA
                </span>

                <div className="space-y-2 p-3.5 rounded-xl bg-[#fcf8f2] border border-[#dec9b6]/60">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <span className="material-symbols-outlined text-[16px] text-amber-700">history_edu</span>
                      Sắc phong Hoàng đế ban tặng
                    </span>
                    <strong className="text-[#80141d] font-bold font-mono">6 Đạo sắc</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <span className="material-symbols-outlined text-[16px] text-amber-700">photo_library</span>
                      Ảnh chụp sắc lệnh &amp; khánh vàng
                    </span>
                    <strong className="text-stone-900 font-bold font-mono">18 Hiện vật</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <span className="material-symbols-outlined text-[16px] text-amber-700">record_voice_over</span>
                      Ghi âm văn tế cổ truyền
                    </span>
                    <strong className="text-stone-900 font-bold font-mono">3 Bản tụng niệm</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-6 border-t border-[#dec9b6]/60 bg-[#fdfaf5] space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onNavigate('admin-chi-tiet-khong-gian');
                }}
                className="w-full py-2.5 bg-[#80141d] hover:bg-[#661017] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[17px]">open_in_new</span>
                <span>Truy Cập Quản Trị Chi Tiết Không Gian</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Đã gửi liên kết cấp lại quyền quản trị phả hệ cho Ban Trị Sự')}
                className="w-full py-2 bg-white hover:bg-[#faefe3] border border-[#dec9b6] text-stone-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px]">sync</span>
                <span>Cấp Lại Quyền Quản Trị Phả Hệ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
