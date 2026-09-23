import React, { useState } from 'react';
import type { ScreenType } from '@/src/types.ts';

interface GenealogyTree25DScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface MemberNode {
  id: string;
  name: string;
  fullName: string;
  role: string;
  birthYear: number;
  deathYear?: number;
  age?: number;
  isAlive: boolean;
  generation: 1 | 2 | 3 | 4 | 5;
  gender: 'male' | 'female';
  avatarUrl?: string;
  avatarInitials?: string;
  isPatriarch?: boolean;
  isCurrentFocus?: boolean;
  spouseId?: string;
  lineageType: 'noi' | 'ngoai' | 'dau' | 're';
}

const TREE_MEMBERS: MemberNode[] = [
  // ==========================================
  // ĐỜI I: THỦY TỔ (1900)
  // ==========================================
  {
    id: 'gen1-cong',
    name: 'Nguyễn V. Công',
    fullName: 'Cụ Nguyễn Văn Công',
    role: 'Cụ Thủy Tổ',
    birthYear: 1900,
    deathYear: 1982,
    isAlive: false,
    generation: 1,
    gender: 'male',
    avatarUrl: '/images/ancestor_portrait.jpg',
    isPatriarch: true,
    spouseId: 'gen1-phuc',
    lineageType: 'noi',
  },
  {
    id: 'gen1-phuc',
    name: 'Trần Thị Phúc',
    fullName: 'Cụ Bà Trần Thị Phúc',
    role: 'Cụ Bà Thủy Tổ',
    birthYear: 1905,
    deathYear: 1994,
    isAlive: false,
    generation: 1,
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    spouseId: 'gen1-cong',
    lineageType: 'dau',
  },

  // ==========================================
  // ĐỜI II: ÔNG BÀ (CHI TRƯỞNG, NỘI, NGOẠI)
  // ==========================================
  {
    id: 'gen2-bac-truong',
    name: 'Nguyễn V....',
    fullName: 'Nguyễn Văn Khoát',
    role: 'Bác Trưởng Tộc',
    birthYear: 1928,
    deathYear: 2005,
    isAlive: false,
    generation: 2,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    spouseId: 'gen2-bac-gai',
    lineageType: 'noi',
  },
  {
    id: 'gen2-bac-gai',
    name: 'Phạm Thị...',
    fullName: 'Phạm Thị Mùi',
    role: 'Bác Gái (Dâu)',
    birthYear: 1930,
    deathYear: 2011,
    isAlive: false,
    generation: 2,
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    spouseId: 'gen2-bac-truong',
    lineageType: 'dau',
  },
  {
    id: 'gen2-ong-noi',
    name: 'Nguyễn V. Toàn',
    fullName: 'Nguyễn Văn Toàn',
    role: 'Ông Nội',
    birthYear: 1932,
    deathYear: 2001,
    isAlive: false,
    generation: 2,
    gender: 'male',
    avatarUrl: '/images/ancestor_portrait.jpg',
    isPatriarch: true,
    spouseId: 'gen2-ba-noi',
    lineageType: 'noi',
  },
  {
    id: 'gen2-ba-noi',
    name: 'Trần Thị Lan',
    fullName: 'Trần Thị Lan',
    role: 'Bà Nội',
    birthYear: 1935,
    deathYear: 2010,
    isAlive: false,
    generation: 2,
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    spouseId: 'gen2-ong-noi',
    lineageType: 'dau',
  },
  {
    id: 'gen2-ong-ngoai',
    name: 'Lê Văn Hùng',
    fullName: 'Lê Văn Hùng',
    role: 'Ông Ngoại',
    birthYear: 1930,
    deathYear: 2005,
    isAlive: false,
    generation: 2,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    spouseId: 'gen2-ba-ngoai',
    lineageType: 'ngoai',
  },
  {
    id: 'gen2-ba-ngoai',
    name: 'Phạm Thị Mai',
    fullName: 'Phạm Thị Mai',
    role: 'Bà Ngoại',
    birthYear: 1933,
    deathYear: 2018,
    isAlive: false,
    generation: 2,
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    spouseId: 'gen2-ong-ngoai',
    lineageType: 'ngoai',
  },

  // ==========================================
  // ĐỜI III: BỐ MẸ, CÔ CHÚ, CẬU
  // ==========================================
  {
    id: 'gen3-hai',
    name: 'Nguyễn V. Hải',
    fullName: 'Nguyễn Văn Hải',
    role: 'Bác Họ (Chi Trưởng)',
    birthYear: 1954,
    age: 70,
    isAlive: true,
    generation: 3,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    lineageType: 'noi',
  },
  {
    id: 'gen3-hanh',
    name: 'Nguyễn T. Hạnh',
    fullName: 'Nguyễn Thị Hạnh',
    role: 'Cô Ruột',
    birthYear: 1960,
    age: 64,
    isAlive: true,
    generation: 3,
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    lineageType: 'noi',
  },
  {
    id: 'gen3-minh',
    name: 'Nguyễn V. Minh',
    fullName: 'Nguyễn Văn Minh',
    role: 'Bố (Thân phụ)',
    birthYear: 1958,
    age: 66,
    isAlive: true,
    generation: 3,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    isPatriarch: true,
    spouseId: 'gen3-huong',
    lineageType: 'noi',
  },
  {
    id: 'gen3-huong',
    name: 'Lê Thị Hương',
    fullName: 'Lê Thị Hương',
    role: 'Mẹ (Thân mẫu)',
    birthYear: 1961,
    age: 63,
    isAlive: true,
    generation: 3,
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    spouseId: 'gen3-minh',
    lineageType: 'dau',
  },
  {
    id: 'gen3-duc',
    name: 'Nguyễn V. Đức',
    fullName: 'Nguyễn Văn Đức',
    role: 'Chú Út',
    birthYear: 1966,
    age: 58,
    isAlive: true,
    generation: 3,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    lineageType: 'noi',
  },
  {
    id: 'gen3-an',
    name: 'Lê Văn An',
    fullName: 'Lê Văn An',
    role: 'Cậu Ruột (Ngoại)',
    birthYear: 1968,
    age: 56,
    isAlive: true,
    generation: 3,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=150',
    lineageType: 'ngoai',
  },

  // ==========================================
  // ĐỜI IV: BẠN & ANH CHỊ EM, VỢ/CHỒNG
  // ==========================================
  {
    id: 'gen4-nam',
    name: 'Nguyễn Văn...',
    fullName: 'Nguyễn Văn Nam',
    role: 'Trưởng Nam',
    birthYear: 1984,
    age: 40,
    isAlive: true,
    generation: 4,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    isCurrentFocus: true,
    isPatriarch: true,
    spouseId: 'gen4-ha',
    lineageType: 'noi',
  },
  {
    id: 'gen4-ha',
    name: 'Phạm Thu Hà',
    fullName: 'Phạm Thu Hà',
    role: 'Dâu Cả (Vợ)',
    birthYear: 1987,
    age: 37,
    isAlive: true,
    generation: 4,
    gender: 'female',
    avatarInitials: 'Phạm',
    spouseId: 'gen4-nam',
    lineageType: 'dau',
  },
  {
    id: 'gen4-mai',
    name: 'Nguyễn M. Mai',
    fullName: 'Nguyễn Mai Mai',
    role: 'Thứ Nữ',
    birthYear: 1989,
    age: 35,
    isAlive: true,
    generation: 4,
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    spouseId: 'gen4-bao',
    lineageType: 'noi',
  },
  {
    id: 'gen4-bao',
    name: 'Trần Quốc Bảo',
    fullName: 'Trần Quốc Bảo',
    role: 'Con Rể (Chồng)',
    birthYear: 1986,
    age: 38,
    isAlive: true,
    generation: 4,
    gender: 'male',
    avatarInitials: 'Trần',
    spouseId: 'gen4-mai',
    lineageType: 're',
  },
  {
    id: 'gen4-gia',
    name: 'Nguyễn Gia...',
    fullName: 'Nguyễn Gia Huy',
    role: 'Con Trai Út',
    birthYear: 1993,
    age: 31,
    isAlive: true,
    generation: 4,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    lineageType: 'noi',
  },

  // ==========================================
  // ĐỜI V: HẬU DUỆ (CHÁU ĐÍCH TÔN, CHÁU NGOẠI)
  // ==========================================
  {
    id: 'gen5-tuan',
    name: 'Nguyễn Tuấn...',
    fullName: 'Nguyễn Tuấn Kiệt',
    role: 'Cháu Đích Tôn',
    birthYear: 2012,
    age: 12,
    isAlive: true,
    generation: 5,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=150',
    isPatriarch: true,
    lineageType: 'noi',
  },
  {
    id: 'gen5-ngoc',
    name: 'Nguyễn Ngọc...',
    fullName: 'Nguyễn Ngọc Hân',
    role: 'Trưởng Nữ',
    birthYear: 2016,
    age: 8,
    isAlive: true,
    generation: 5,
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    lineageType: 'noi',
  },
  {
    id: 'gen5-bao-an',
    name: 'Trần Bảo An',
    fullName: 'Trần Bảo An',
    role: 'Cháu Ngoại',
    birthYear: 2015,
    age: 9,
    isAlive: true,
    generation: 5,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    lineageType: 'ngoai',
  },
  {
    id: 'gen5-duc-thien',
    name: 'Trần Đức Thiện',
    fullName: 'Trần Đức Thiện',
    role: 'Cháu Ngoại',
    birthYear: 2018,
    age: 6,
    isAlive: true,
    generation: 5,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    lineageType: 'ngoai',
  },
];

export const GenealogyTree25DScreen: React.FC<GenealogyTree25DScreenProps> = ({ onNavigate }) => {
  const [is25D, setIs25D] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('gen4-nam');
  const [selectedMemberForMenu, setSelectedMemberForMenu] = useState<MemberNode | null>(null);
  const [lineageTab, setLineageTab] = useState<'all' | 'noi' | 'ngoai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedMember = TREE_MEMBERS.find((m) => m.id === selectedMemberId) || TREE_MEMBERS[12];

  const handleSelectMember = (member: MemberNode) => {
    setSelectedMemberId(member.id);
    setSelectedMemberForMenu(member);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(70, Math.min(130, prev + delta)));
  };

  const handleResetView = () => {
    setZoomLevel(100);
    setSelectedMemberId('gen4-nam');
    setSelectedMemberForMenu(null);
    setToastMessage('Đã đưa góc nhìn về mặc định (100% thu trọn vẹn màn hình)');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f7eee2] text-[#2b1b15] flex flex-col justify-between overflow-x-hidden select-none">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2b1b15] text-[#fdf9f4] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in border border-[#c9892c]">
          <span className="material-symbols-outlined text-[#c9892c]">verified</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================
          1. TOP NAVIGATION TOOLBAR (THEO HÌNH 1 & HÌNH 2)
          ========================================================= */}
      <div className="sticky top-0 z-30 bg-[#fdf9f4] border-b border-[#dec9b6] shadow-xs px-3 sm:px-6 py-2.5">
        <div className="max-w-[1520px] mx-auto flex flex-col gap-2">
          {/* Hàng 1: Back + Title + Filter Lineage + Quick Tools */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('tong-quan-pha-he')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] hover:text-[#80141d] text-[12px] font-bold transition-all shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Tổng Quan</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#80141d]" />
                <h1 className="font-serif text-[17px] font-bold text-[#80141d] tracking-tight">
                  Phả Hệ Dòng Họ Nguyễn
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#faefe3] border border-[#ebdcd0] text-[#c9892c] text-[10.5px] font-bold uppercase tracking-wider">
                  {is25D ? '2.5D Depth Active' : 'Phẳng 2D Bản Chuẩn'}
                </span>
              </div>
            </div>

            {/* Toggle Họ Nội / Họ Ngoại */}
            <div className="flex items-center gap-2">
              <div className="flex rounded-xl border border-[#dec9b6] bg-[#faefe3] p-1 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setLineageTab('all')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    lineageTab === 'all'
                      ? 'bg-[#80141d] text-white shadow-2xs font-bold'
                      : 'text-[#715b50] hover:text-[#2b1b15]'
                  }`}
                >
                  Nội &amp; Ngoại
                </button>
                <button
                  type="button"
                  onClick={() => setLineageTab('noi')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    lineageTab === 'noi'
                      ? 'bg-[#80141d] text-white shadow-2xs font-bold'
                      : 'text-[#715b50] hover:text-[#2b1b15]'
                  }`}
                >
                  Họ Nội (Paternal)
                </button>
                <button
                  type="button"
                  onClick={() => setLineageTab('ngoai')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    lineageTab === 'ngoai'
                      ? 'bg-[#80141d] text-white shadow-2xs font-bold'
                      : 'text-[#715b50] hover:text-[#2b1b15]'
                  }`}
                >
                  Họ Ngoại (Maternal)
                </button>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={() => onNavigate('them-thanh-vien')}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#80141d] text-white text-[11.5px] font-bold shadow-2xs hover:bg-[#681017] transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                <span>+ Thêm thành viên</span>
              </button>
            </div>
          </div>

          {/* Hàng 2: Chi họ + Ô Tìm kiếm + Thế hệ pills + Toggle 2.5D */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1.5 border-t border-[#ebdcd0] text-[11.5px]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#dec9b6] text-[#80141d] font-bold flex items-center gap-1 text-[11px]">
                <span className="material-symbols-outlined text-[14px]">account_tree</span>
                <span>Chi Trưởng Nam Sách • Phân Hệ 5 Đời</span>
              </span>

              {/* Input tìm kiếm */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[15px] text-[#8a6f62]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm thành viên, chi nhánh..."
                  className="h-8 pl-8 pr-3 rounded-lg border border-[#dec9b6] bg-white text-[11.5px] text-[#2b1b15] placeholder-[#8a6f62] focus:outline-none focus:border-[#80141d] w-48 sm:w-56"
                />
              </div>

              <span className="text-[#8a6f62] hidden lg:inline">
                Tâm điểm: <strong className="text-[#80141d]">Nguyễn Văn Nam</strong>
              </span>
            </div>

            {/* Toggle 2.5D & View Modes */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIs25D(!is25D)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all border shadow-2xs flex items-center gap-1.5 ${
                  is25D
                    ? 'bg-[#c9892c] text-white border-[#c9892c]'
                    : 'bg-white text-[#543e34] border-[#dec9b6] hover:bg-[#faefe3]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {is25D ? 'view_in_ar' : 'layers'}
                </span>
                <span>Chiều Sâu 2.5D: {is25D ? 'BẬT' : 'TẮT'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('tong-quan-pha-he')}
                className="px-2.5 py-1 rounded-lg border border-[#dec9b6] bg-white text-[#543e34] hover:bg-[#faefe3] text-[11px] font-semibold"
                title="Dạng sách phả"
              >
                Dạng sách phả
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. LEGEND BAR (THEO CHUẨN HÌNH 2)
          ========================================================= */}
      <div className="bg-[#faefe3] border-b border-[#ebdcd0] px-4 py-1.5 text-[11px] text-[#715b50]">
        <div className="max-w-[1520px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold text-[#80141d]">
              Đồ Bản: 18 thành viên trọng yếu (Đời I &rarr; Đời V)
            </span>
            <span className="text-[#dec9b6]">|</span>
            <span>Khung nhìn: <strong>100% Thu trọn vẹn màn hình</strong></span>
            <span className="text-[#dec9b6]">|</span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-5 bg-[#80141d] inline-block" />
              <span>Huyết thống nội tộc</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-5 bg-[#c9892c] inline-block border-t border-dashed border-[#c9892c]" />
              <span>Hôn phối (Vợ / Chồng)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block" />
              <span>Còn sống</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#80141d] inline-block" />
              <span>Đã quy tiên</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#80141d] font-semibold">
            <span>• CHI TỘC: Chính Tông (5 Đời Hội Tụ)</span>
            <span className="text-[#8a6f62]">| Căn xứng</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          3. MAIN CANVAS: SƠ ĐỒ GIA PHẢ 5 ĐỜI (CHUẨN ĐẸP NHƯ HÌNH MẪU)
          ========================================================= */}
      <div className="relative flex-1 overflow-auto p-4 sm:p-8 flex flex-col items-center min-h-[760px] pb-20">
        {/* Container chuyển động 2.5D perspective */}
        <div
          className="w-full max-w-[1360px] mx-auto transition-transform duration-500 ease-out pt-2 pb-8 flex flex-col items-center"
          style={{
            transform: `${is25D ? 'perspective(1400px) rotateX(4deg)' : 'none'} scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
          }}
        >
          {/* CÂY GIA PHẢ: 5 THẾ HỆ NỐI SÁT 100% THEO HỆ THỐNG ĐƯỜNG NỐI ĐỒ BẢN HOÀNG GIA */}
          <div className="flex flex-col items-center relative w-full min-w-[1080px]">

            {/* ====================================================
                ĐỜI I: CỤ THỦY TỔ (1900)
                ==================================================== */}
            <div className="flex flex-col items-center relative z-10">
              <div className="flex items-center gap-0 relative">
                {/* Nguyễn V. Công */}
                <MemberCard
                  member={TREE_MEMBERS[0]}
                  isSelected={selectedMemberId === 'gen1-cong'}
                  onClick={() => handleSelectMember(TREE_MEMBERS[0])}
                />

                {/* Đường Hôn Phối Nối Chặt Cụ Công & Cụ Phúc */}
                <div className="w-8 h-0.5 bg-[#dec9b6] relative flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
                </div>

                {/* Trần Thị Phúc */}
                <MemberCard
                  member={TREE_MEMBERS[1]}
                  isSelected={selectedMemberId === 'gen1-phuc'}
                  onClick={() => handleSelectMember(TREE_MEMBERS[1])}
                />
              </div>

              {/* Vạch nối từ giữa Cụ Thủy Tổ xuống Đời II */}
              <div className="w-0.5 h-6 bg-[#dec9b6]" />
            </div>

            {/* ====================================================
                ĐỜI II: 3 CẶP ÔNG BÀ (CHI TRƯỞNG - NỘI - NGOẠI)
                Thanh ngang 760px chuẩn đẹp như hình mẫu!
                ==================================================== */}
            <div className="w-[760px] flex flex-col items-center relative">
              {/* Thanh ngang Đời II */}
              <div className="w-full h-0.5 bg-[#dec9b6] relative">
                {/* Vạch xuống tâm Bác Trưởng (trái) */}
                <div className="absolute left-0 top-0 w-0.5 h-6 bg-[#dec9b6]" />
                {/* Vạch xuống tâm Ông Bà Nội (giữa) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-6 bg-[#dec9b6]" />
                {/* Vạch xuống tâm Ông Bà Ngoại (phải) */}
                <div className="absolute right-0 top-0 w-0.5 h-6 bg-[#dec9b6]" />
              </div>

              {/* 3 Cụm Đời II - Cắm sát vào 3 vạch của thanh ngang với pt-6 */}
              <div className="w-full pt-6 flex items-start justify-between relative z-10">
                {/* Cụm 1 (Trái): Bác Trưởng Tộc (Nguyễn V. + Phạm Thị) - tâm tại left: 0 */}
                <div className="w-[240px] -ml-[120px] flex flex-col items-center">
                  <div className="flex items-center gap-0">
                    <MemberCard
                      member={TREE_MEMBERS[2]}
                      isSelected={selectedMemberId === 'gen2-bac-truong'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[2])}
                    />
                    <div className="w-5 h-0.5 bg-[#dec9b6] relative flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
                    </div>
                    <MemberCard
                      member={TREE_MEMBERS[3]}
                      isSelected={selectedMemberId === 'gen2-bac-gai'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[3])}
                    />
                  </div>
                  {/* Đường thẳng cắm xuống Bác Họ Hải ở Đời III */}
                  <div className="w-0.5 h-6 bg-[#dec9b6]" />
                </div>

                {/* Cụm 2 (Giữa): Ông Bà Nội (Nguyễn V. Toàn + Trần Thị Lan) - tâm tại left: 50% */}
                <div className="w-[240px] flex flex-col items-center">
                  <div className="flex items-center gap-0">
                    <MemberCard
                      member={TREE_MEMBERS[4]}
                      isSelected={selectedMemberId === 'gen2-ong-noi'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[4])}
                    />
                    <div className="w-5 h-0.5 bg-[#dec9b6] relative flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
                    </div>
                    <MemberCard
                      member={TREE_MEMBERS[5]}
                      isSelected={selectedMemberId === 'gen2-ba-noi'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[5])}
                    />
                  </div>
                  {/* Đường thẳng cắm xuống thanh ngang Đời III */}
                  <div className="w-0.5 h-6 bg-[#dec9b6]" />
                  {/* Thanh ngang chia 3 con (Cô Hạnh, Bố Mẹ, Chú Đức) */}
                  <div className="w-[380px] h-0.5 bg-[#dec9b6] relative">
                    <div className="absolute left-0 top-0 w-0.5 h-6 bg-[#dec9b6]" />
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-6 bg-[#dec9b6]" />
                    <div className="absolute right-0 top-0 w-0.5 h-6 bg-[#dec9b6]" />
                  </div>
                </div>

                {/* Cụm 3 (Phải): Ông Bà Ngoại (Lê Văn Hùng + Phạm Thị Mai) - tâm tại right: 0 */}
                <div className="w-[240px] -mr-[120px] flex flex-col items-center">
                  <div className="flex items-center gap-0">
                    <MemberCard
                      member={TREE_MEMBERS[6]}
                      isSelected={selectedMemberId === 'gen2-ong-ngoai'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[6])}
                    />
                    <div className="w-5 h-0.5 bg-[#dec9b6] relative flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
                    </div>
                    <MemberCard
                      member={TREE_MEMBERS[7]}
                      isSelected={selectedMemberId === 'gen2-ba-ngoai'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[7])}
                    />
                  </div>
                  {/* Đường thẳng cắm xuống Cậu An ở Đời III */}
                  <div className="w-0.5 h-6 bg-[#dec9b6]" />
                </div>
              </div>
            </div>

            {/* ====================================================
                ĐỜI III: BỐ MẸ, CÔ, CHÚ, CẬU
                pt-6 cắm sát 100% vào đỉnh của 5 vị!
                ==================================================== */}
            <div className="w-[760px] pt-6 flex items-start justify-between relative">
              {/* Con Bác Trưởng: Bác Họ Nguyễn V. Hải (Căn chuẩn theo cột Bác Trưởng) */}
              <div className="w-[240px] -ml-[120px] flex flex-col items-center relative z-10">
                <MemberCard
                  member={TREE_MEMBERS[8]}
                  isSelected={selectedMemberId === 'gen3-hai'}
                  onClick={() => handleSelectMember(TREE_MEMBERS[8])}
                />
              </div>

              {/* Nhánh 3 con của Ông Bà Nội (Cô Hạnh, Bố Mẹ, Chú Đức) */}
              <div className="w-[380px] flex items-start justify-between relative z-10">
                {/* Cô Ruột (Trái) */}
                <div className="w-[110px] -ml-[55px] flex flex-col items-center">
                  <MemberCard
                    member={TREE_MEMBERS[9]}
                    isSelected={selectedMemberId === 'gen3-hanh'}
                    onClick={() => handleSelectMember(TREE_MEMBERS[9])}
                  />
                </div>

                {/* Cặp Bố Mẹ (Giữa) */}
                <div className="w-[240px] flex flex-col items-center">
                  <div className="flex items-center gap-0 p-1 rounded-2xl bg-[#faefe3] border-2 border-[#dec9b6] shadow-xs">
                    <MemberCard
                      member={TREE_MEMBERS[10]}
                      isSelected={selectedMemberId === 'gen3-minh'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[10])}
                    />
                    <div className="w-5 h-0.5 bg-[#dec9b6] relative flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
                    </div>
                    <MemberCard
                      member={TREE_MEMBERS[11]}
                      isSelected={selectedMemberId === 'gen3-huong'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[11])}
                    />
                  </div>
                  {/* Vạch đi xuống Đời IV */}
                  <div className="w-0.5 h-6 bg-[#dec9b6]" />
                  {/* Thanh ngang chia 3 con Đời IV */}
                  <div className="w-[520px] h-0.5 bg-[#dec9b6] relative">
                    <div className="absolute left-0 top-0 w-0.5 h-6 bg-[#dec9b6]" />
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-6 bg-[#dec9b6]" />
                    <div className="absolute right-0 top-0 w-0.5 h-6 bg-[#dec9b6]" />
                  </div>
                </div>

                {/* Chú Út (Phải) */}
                <div className="w-[110px] -mr-[55px] flex flex-col items-center">
                  <MemberCard
                    member={TREE_MEMBERS[12]}
                    isSelected={selectedMemberId === 'gen3-duc'}
                    onClick={() => handleSelectMember(TREE_MEMBERS[12])}
                  />
                </div>
              </div>

              {/* Con Ông Bà Ngoại: Cậu Ruột Lê Văn An (Căn chuẩn theo cột Ông Bà Ngoại) */}
              <div className="w-[240px] -mr-[120px] flex flex-col items-center relative z-10">
                <MemberCard
                  member={TREE_MEMBERS[13]}
                  isSelected={selectedMemberId === 'gen3-an'}
                  onClick={() => handleSelectMember(TREE_MEMBERS[13])}
                />
              </div>
            </div>

            {/* ====================================================
                ĐỜI IV: BẠN & ANH CHỊ EM
                pt-6 cắm sát 100% vào đỉnh 3 nhánh!
                ==================================================== */}
            <div className="w-[520px] pt-6 flex items-start justify-between relative z-10">
              {/* Con 1: Trưởng Nam [ĐANG CHỌN • BẠN] & Vợ (Dâu Cả) */}
              <div className="w-[240px] -ml-[120px] flex flex-col items-center">
                <div className="relative flex flex-col items-center">
                  <span className="absolute -top-3 left-4 z-20 px-2 py-0.5 rounded bg-[#80141d] text-white text-[9px] font-bold uppercase tracking-wider shadow-xs">
                    ĐANG CHỌN • BẠN
                  </span>
                  <div className="flex items-center gap-0 p-1 rounded-2xl bg-[#fdf9f4] border-2 border-[#80141d] shadow-md">
                    <MemberCard
                      member={TREE_MEMBERS[14]}
                      isSelected={selectedMemberId === 'gen4-nam'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[14])}
                    />
                    <div className="w-5 h-0.5 bg-[#dec9b6] relative flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
                    </div>
                    <MemberCard
                      member={TREE_MEMBERS[15]}
                      isSelected={selectedMemberId === 'gen4-ha'}
                      onClick={() => handleSelectMember(TREE_MEMBERS[15])}
                    />
                  </div>
                </div>
                {/* Đường xuống 2 con (Đời V) */}
                <div className="w-0.5 h-5 bg-[#dec9b6]" />
                {/* Thanh ngang nối 2 con */}
                <div className="w-[130px] h-0.5 bg-[#dec9b6] relative">
                  <div className="absolute left-0 top-0 w-0.5 h-5 bg-[#dec9b6]" />
                  <div className="absolute right-0 top-0 w-0.5 h-5 bg-[#dec9b6]" />
                </div>
              </div>

              {/* Con 2: Thứ Nữ & Con Rể */}
              <div className="w-[240px] flex flex-col items-center">
                <div className="flex items-center gap-0 p-1 rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] shadow-xs">
                  <MemberCard
                    member={TREE_MEMBERS[16]}
                    isSelected={selectedMemberId === 'gen4-mai'}
                    onClick={() => handleSelectMember(TREE_MEMBERS[16])}
                  />
                  <div className="w-5 h-0.5 bg-[#dec9b6] relative flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
                  </div>
                  <MemberCard
                    member={TREE_MEMBERS[17]}
                    isSelected={selectedMemberId === 'gen4-bao'}
                    onClick={() => handleSelectMember(TREE_MEMBERS[17])}
                  />
                </div>
                {/* Đường xuống 2 cháu ngoại (Đời V) */}
                <div className="w-0.5 h-5 bg-[#dec9b6]" />
                {/* Thanh ngang nối 2 cháu ngoại */}
                <div className="w-[130px] h-0.5 bg-[#dec9b6] relative">
                  <div className="absolute left-0 top-0 w-0.5 h-5 bg-[#dec9b6]" />
                  <div className="absolute right-0 top-0 w-0.5 h-5 bg-[#dec9b6]" />
                </div>
              </div>

              {/* Con 3: Con Trai Út */}
              <div className="w-[110px] -mr-[55px] flex flex-col items-center pt-1">
                <MemberCard
                  member={TREE_MEMBERS[18]}
                  isSelected={selectedMemberId === 'gen4-gia'}
                  onClick={() => handleSelectMember(TREE_MEMBERS[18])}
                />
              </div>
            </div>

            {/* ====================================================
                ĐỜI V: HẬU DUỆ (CHÁU ĐÍCH TÔN & CHÁU NGOẠI)
                pt-5 cắm sát 100% vào đỉnh 4 cháu!
                ==================================================== */}
            <div className="w-[520px] pt-5 flex items-start justify-between relative z-10">
              {/* Con của Trưởng Nam: Cháu Đích Tôn & Trưởng Nữ */}
              <div className="w-[240px] -ml-[120px] flex items-center justify-between">
                <MemberCard
                  member={TREE_MEMBERS[19]}
                  isSelected={selectedMemberId === 'gen5-tuan'}
                  onClick={() => handleSelectMember(TREE_MEMBERS[19])}
                />
                <MemberCard
                  member={TREE_MEMBERS[20]}
                  isSelected={selectedMemberId === 'gen5-ngoc'}
                  onClick={() => handleSelectMember(TREE_MEMBERS[20])}
                />
              </div>

              {/* Con của Thứ Nữ: 2 Cháu Ngoại (Bảo An & Đức Thiện) */}
              <div className="w-[240px] flex items-center justify-between">
                <MemberCard
                  member={TREE_MEMBERS[21]}
                  isSelected={selectedMemberId === 'gen5-bao-an'}
                  onClick={() => handleSelectMember(TREE_MEMBERS[21])}
                />
                <MemberCard
                  member={TREE_MEMBERS[22]}
                  isSelected={selectedMemberId === 'gen5-duc-thien'}
                  onClick={() => handleSelectMember(TREE_MEMBERS[22])}
                />
              </div>

              {/* Khoảng trống dưới Con Trai Út */}
              <div className="w-[110px] -mr-[55px]" />
            </div>

          </div>
        </div>

        {/* =========================================================
            4. CONTEXT ACTION MODAL (POPUP THEO HÌNH 1)
            ========================================================= */}
        {selectedMemberForMenu && (
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-[#fdf9f4] w-full max-w-sm rounded-3xl p-5 shadow-2xl border-2 border-[#dec9b6] space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd0]">
                <div>
                  <span className="text-[10px] font-bold text-[#80141d] uppercase tracking-wider bg-[#faefe3] px-2 py-0.5 rounded">
                    HÀNH ĐỘNG PHẢ ĐỒ
                  </span>
                  <h3 className="font-serif text-[18px] font-bold text-[#2b1b15] mt-1">
                    {selectedMemberForMenu.fullName}
                  </h3>
                  <p className="text-[11.5px] text-[#715b50]">
                    {selectedMemberForMenu.role} • Đời thứ {selectedMemberForMenu.generation}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMemberForMenu(null)}
                  className="h-8 w-8 rounded-full bg-[#faefe3] hover:bg-[#ebdcd0] flex items-center justify-center text-[#543e34]"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="space-y-1.5 text-[12px]">
                <button
                  type="button"
                  onClick={() => onNavigate('ho-so-tien-nhan')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-[#faefe3] border border-[#ebdcd0] text-left flex items-center gap-2.5 font-bold text-[#2b1b15] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#80141d] text-[18px]">badge</span>
                  <span>Xem hồ sơ chi tiết</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('chi-tiet-gio-chap')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-[#faefe3] border border-[#ebdcd0] text-left flex items-center gap-2.5 font-bold text-[#2b1b15] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#c9892c] text-[18px]">temple_buddhist</span>
                  <span>Văn khấn &amp; Cúng giỗ</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('them-thanh-vien')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-[#faefe3] border border-[#ebdcd0] text-left flex items-center gap-2.5 font-bold text-[#2b1b15] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#80141d] text-[18px]">group_add</span>
                  <span>Thêm con nối dõi</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('phuc-che-ai')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-[#faefe3] border border-[#ebdcd0] text-left flex items-center gap-2.5 font-bold text-[#2b1b15] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#c9892c] text-[18px]">auto_fix_high</span>
                  <span>Phục chế chân dung AI</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedMemberId(selectedMemberForMenu.id);
                    setSelectedMemberForMenu(null);
                    setToastMessage(`Đã đặt ${selectedMemberForMenu.fullName} làm gốc hiển thị!`);
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-[#faefe3] border border-[#ebdcd0] text-left flex items-center gap-2.5 font-bold text-[#715b50] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
                  <span>Đặt làm gốc hiển thị</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            5. BẢN ĐỒ PHẢ HỆ THU NHỎ NẰM TĨNH Ở CUỐI TRANG (KHÔNG CÒN TRÔI)
            ========================================================= */}
        <div className="w-full max-w-[960px] mx-auto mt-12 p-4 rounded-2xl bg-[#fdf9f4] border border-[#dec9b6] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#faefe3] border border-[#ebdcd0] flex items-center justify-center text-[#80141d]">
              <span className="material-symbols-outlined text-[22px]">map</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-[#80141d] text-[14px]">
                  Bản Đồ Phả Hệ Thu Nhỏ
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#faefe3] text-[#80141d] text-[10px] font-bold">
                  Toàn cảnh 5 Đời
                </span>
              </div>
              <p className="text-[11.5px] text-[#715b50]">
                Tổng số 18 vị • Tuyến trưởng tộc chính tông • Bản đồ được cố định tĩnh tại đây
              </p>
            </div>
          </div>

          {/* Sơ đồ mini preview tĩnh */}
          <div className="h-12 w-48 rounded-xl border border-[#ebdcd0] bg-[#faefe3] p-1.5 flex flex-col justify-between items-center relative overflow-hidden">
            <div className="w-6 h-1 bg-[#80141d] rounded-full" />
            <div className="w-20 h-1 bg-[#80141d]/70 rounded-full" />
            <div className="w-28 h-1 bg-[#80141d]/70 rounded-full" />
            <div className="w-36 h-1 bg-[#80141d] rounded-full ring-2 ring-[#80141d]/30" />
            <div className="w-24 h-1 bg-[#c9892c] rounded-full" />
            <div className="absolute inset-x-3 inset-y-1.5 border border-[#80141d] rounded pointer-events-none opacity-40" />
          </div>

          <button
            type="button"
            onClick={handleResetView}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#faefe3] hover:bg-[#ebdcd0] text-[#80141d] font-bold text-[12px] transition-colors shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">center_focus_weak</span>
            <span>Về Khởi Tổ (100%)</span>
          </button>
        </div>

        {/* Thanh Zoom nhỏ gọn cố định dưới góc trái (Chỉ gồm nút zoom, không che nội dung) */}
        <div className="fixed bottom-10 left-6 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-[#fdf9f4]/95 backdrop-blur-md border border-[#dec9b6] shadow-lg text-[12px]">
          <button
            type="button"
            onClick={() => handleZoom(10)}
            className="h-7 w-7 rounded-lg bg-white hover:bg-[#faefe3] border border-[#ebdcd0] flex items-center justify-center font-bold text-[#2b1b15]"
            title="Phóng to"
          >
            +
          </button>
          <span className="w-10 text-center font-mono font-bold text-[#80141d] text-[11px]">
            {zoomLevel}%
          </span>
          <button
            type="button"
            onClick={() => handleZoom(-10)}
            className="h-7 w-7 rounded-lg bg-white hover:bg-[#faefe3] border border-[#ebdcd0] flex items-center justify-center font-bold text-[#2b1b15]"
            title="Thu nhỏ"
          >
            -
          </button>
        </div>
      </div>

      {/* =========================================================
          6. FOOTER STATUS BAR (THEO CHUẨN HÌNH 2)
          ========================================================= */}
      <footer className="bg-[#fdf9f4] border-t border-[#dec9b6] px-4 py-2.5 text-[11px] text-[#8a6f62]">
        <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Gia phả số hóa &amp; Lưu trữ gia bảo • <strong>Thích Cúng Kiếng</strong>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
            <span>Đồng bộ máy chủ nội tộc: Toàn vẹn (100% không tràn viền)</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Mã chi họ: <strong>VN-HD-NS-0982</strong></span>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setToastMessage('Đang kết xuất tệp đồ bản A0 chuẩn bị in ấn...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="text-[#80141d] font-bold hover:underline"
            >
              Xuất phả đồ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// =========================================================
// THẺ THÀNH VIÊN TRONG SƠ ĐỒ (THEO PIXEL MOCKUP HÌNH 2)
// =========================================================
interface MemberCardProps {
  member: MemberNode;
  isSelected?: boolean;
  onClick: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-xl border p-2 sm:p-2.5 text-left transition-all duration-200 cursor-pointer flex flex-col items-center text-center w-[100px] sm:w-[118px] ${
        isSelected
          ? 'border-2 border-[#80141d] bg-[#faefe3] ring-2 ring-[#80141d]/20 shadow-md scale-102 z-20'
          : member.isCurrentFocus
          ? 'border-2 border-[#80141d] bg-[#fdf9f4] shadow-sm'
          : 'border-[#dec9b6] bg-[#fdf9f4] hover:border-[#c5a880] hover:shadow-md shadow-2xs'
      }`}
    >
      {/* Avatar + Status Indicator */}
      <div className="relative mb-1">
        {member.avatarUrl ? (
          <img
            src={member.avatarUrl}
            alt={member.name}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border ${
              member.isAlive ? 'border-emerald-600' : 'border-[#80141d]'
            }`}
          />
        ) : (
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#faefe3] border border-[#c9892c] flex items-center justify-center font-bold text-[#80141d] text-[12px]">
            {member.avatarInitials || member.name.slice(0, 2)}
          </div>
        )}

        {/* Chấm trạng thái sống/mất */}
        <span
          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white ${
            member.isAlive ? 'bg-emerald-600' : 'bg-[#80141d]'
          }`}
          title={member.isAlive ? 'Còn sống' : 'Đã quy tiên'}
        />
      </div>

      {/* Tên thành viên */}
      <div className="font-serif font-bold text-[11px] sm:text-[12px] text-[#2b1b15] leading-tight w-full truncate">
        {member.name}
      </div>

      {/* Vai trò / Danh xưng */}
      <div className="text-[9.5px] sm:text-[10px] text-[#715b50] leading-tight mt-0.5 w-full truncate">
        {member.role}
      </div>

      {/* Năm sinh / mất hoặc tuổi */}
      <div className="text-[8.5px] sm:text-[9px] text-[#8a6f62] mt-0.5">
        {member.deathYear
          ? `${member.birthYear} - ${member.deathYear}`
          : member.age
          ? `${member.birthYear} (${member.age} tuổi)`
          : member.birthYear}
      </div>
    </button>
  );
};