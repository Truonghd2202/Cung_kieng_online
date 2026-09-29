import React, { useState, useMemo } from "react";
import {
  Flower2,
  Scroll,
  BookOpen,
  Search,
  Star,
  Trash2,
  Eye,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Calendar,
  Lock,
  X,
  AlertTriangle,
  RotateCcw,
  Compass,
  Settings,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { MoodKey } from "../data/demoSignals";

export interface SavedSignalItem {
  id: string;
  signalId: string;
  mood: MoodKey;
  date: string;
  journal?: string;
  poemLine1: string;
  poemLine2: string;
  actionTitle?: string;
  starred?: boolean;
}

export interface SavedXinXamItem {
  id: string;
  stickNumber: string;
  fortuneType: string;
  category: string;
  region: string;
  quote: string;
  date: string;
  starred?: boolean;
}

export interface SavedWishItem {
  id: string;
  category: string;
  content: string;
  date: string;
  sealed: boolean;
  starred?: boolean;
}

interface AccountScreenProps {
  currentUser?: { name: string; email: string } | null;
  savedSignals: SavedSignalItem[];
  savedXamList: SavedXinXamItem[];
  savedWishList: SavedWishItem[];
  onDeleteSignal: (id: string) => void;
  onDeleteXam: (id: string) => void;
  onDeleteWish: (id: string) => void;
  onToggleStarSignal?: (id: string) => void;
  onToggleStarXam: (id: string) => void;
  onToggleStarWish: (id: string) => void;
  onGoToSignalResult: (signalId: string) => void;
  onGoToXinXam: () => void;
  onGoToWish: () => void;
  onGoToMood: () => void;
  onGoToHome: () => void;
  onGoToSettings?: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  currentUser,
  savedSignals,
  savedXamList,
  savedWishList,
  onDeleteSignal,
  onDeleteXam,
  onDeleteWish,
  onToggleStarSignal,
  onToggleStarXam,
  onToggleStarWish,
  onGoToSignalResult,
  onGoToXinXam,
  onGoToWish,
  onGoToMood,
  onGoToHome,
  onGoToSettings,
}) => {
  // 3 Primary Tabs
  const [activeTab, setActiveTab] = useState<"signals" | "xinxam" | "wishes">("xinxam");

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "thisWeek" | "thisMonth" | "starred"
  >("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Modals state
  const [itemToDelete, setItemToDelete] = useState<{
    type: "signal" | "xinxam" | "wish";
    id: string;
    title?: string;
  } | null>(null);

  const [openedWish, setOpenedWish] = useState<SavedWishItem | null>(null);
  const [openedXam, setOpenedXam] = useState<SavedXinXamItem | null>(null);

  // Helper date parsing (DD/MM/YYYY)
  const parseVnDate = (str: string): number => {
    try {
      const parts = str.split("/");
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day).getTime();
      }
    } catch {}
    return 0;
  };

  const isWithinDays = (dateStr: string, days: number): boolean => {
    const ts = parseVnDate(dateStr);
    if (!ts) return true;
    const now = Date.now();
    const diffDays = (now - ts) / (1000 * 60 * 60 * 24);
    return diffDays <= days && diffDays >= -1;
  };

  const isCurrentMonth = (dateStr: string): boolean => {
    const ts = parseVnDate(dateStr);
    if (!ts) return true;
    const itemDate = new Date(ts);
    const now = new Date();
    return (
      itemDate.getMonth() === now.getMonth() &&
      itemDate.getFullYear() === now.getFullYear()
    );
  };

  // Perform deletion
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === "signal") {
      onDeleteSignal(itemToDelete.id);
    } else if (itemToDelete.type === "xinxam") {
      onDeleteXam(itemToDelete.id);
    } else if (itemToDelete.type === "wish") {
      onDeleteWish(itemToDelete.id);
    }

    setItemToDelete(null);
  };

  // Filtered Xam
  const filteredXam = useMemo(() => {
    const list = savedXamList.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.category.toLowerCase().includes(q);
        const matchQuote = item.quote.toLowerCase().includes(q);
        const matchRegion = item.region.toLowerCase().includes(q);
        const matchNum = item.stickNumber.includes(q);
        const matchFortune = item.fortuneType.toLowerCase().includes(q);
        if (!matchTitle && !matchQuote && !matchRegion && !matchNum && !matchFortune) return false;
      }
      if (activeFilter === "starred" && !item.starred) return false;
      if (activeFilter === "thisWeek" && !isWithinDays(item.date, 7)) return false;
      if (activeFilter === "thisMonth" && !isCurrentMonth(item.date)) return false;
      return true;
    });

    return list.sort((a, b) => {
      const timeA = parseVnDate(a.date);
      const timeB = parseVnDate(b.date);
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
  }, [savedXamList, searchQuery, activeFilter, sortOrder]);

  // Filtered Wishes
  const filteredWishes = useMemo(() => {
    const list = savedWishList.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchContent = item.content.toLowerCase().includes(q);
        if (!matchCategory && !matchContent) return false;
      }
      if (activeFilter === "starred" && !item.starred) return false;
      if (activeFilter === "thisWeek" && !isWithinDays(item.date, 7)) return false;
      if (activeFilter === "thisMonth" && !isCurrentMonth(item.date)) return false;
      return true;
    });

    return list.sort((a, b) => {
      const timeA = parseVnDate(a.date);
      const timeB = parseVnDate(b.date);
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
  }, [savedWishList, searchQuery, activeFilter, sortOrder]);

  // Filtered Signals
  const filteredSignals = useMemo(() => {
    const list = savedSignals.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchMood = item.mood.toLowerCase().includes(q);
        const matchPoem = (item.poemLine1 + " " + item.poemLine2).toLowerCase().includes(q);
        const matchJournal = (item.journal || "").toLowerCase().includes(q);
        const matchAction = (item.actionTitle || "").toLowerCase().includes(q);
        if (!matchMood && !matchPoem && !matchJournal && !matchAction) return false;
      }
      if (activeFilter === "starred" && !item.starred) return false;
      if (activeFilter === "thisWeek" && !isWithinDays(item.date, 7)) return false;
      if (activeFilter === "thisMonth" && !isCurrentMonth(item.date)) return false;
      return true;
    });

    return list.sort((a, b) => {
      const timeA = parseVnDate(a.date);
      const timeB = parseVnDate(b.date);
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
  }, [savedSignals, searchQuery, activeFilter, sortOrder]);

  // Total count
  const totalCount = savedSignals.length + savedXamList.length + savedWishList.length;

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb & Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2">
            <span
              onClick={onGoToHome}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Trang chủ
            </span>
            <span>&gt;</span>
            <span className="text-[#9e3b2e] font-semibold">Góc của tôi</span>
          </div>

          <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
            <Lock className="w-3.5 h-3.5 text-[#9e3b2e]" />
            <span>NỘI DUNG BẢN DEMO ĐƯỢC LƯU TRÊN TRÌNH DUYỆT NÀY</span>
          </div>
        </div>

        {/* Hero Card Banner with Profile on the Right */}
        <div className="relative rounded-3xl p-6 sm:p-10 mb-8 bg-gradient-to-br from-[#faece1] via-[#fbf1e7] to-[#faece1] border border-[#ebd6c5] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-xs uppercase font-bold tracking-wider text-[#9e3b2e] mb-2 flex items-center gap-1.5">
              <span>— GÓC TĨNH TÂM CÁ NHÂN</span>
            </div>

            <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl text-[#2a2220] leading-tight mb-2">
              Góc của tôi
            </h1>

            <p className="font-['Noto_Serif',serif] italic text-sm sm:text-base text-[#9e3b2e] font-medium mb-3">
              “Chào bạn, hôm nay tâm trí bạn đã thảnh thơi hơn chưa?”
            </p>

            <p className="text-xs sm:text-sm text-[#6c5a52] leading-relaxed">
              Nơi cất giữ những khoảnh khắc tĩnh tại, những thẻ quẻ chiêm nghiệm và lời tâm sự
              được niêm phong cẩn trọng. Một trạm dừng chân ấm áp sau những vội vã đời thường.
            </p>
          </div>

          {/* User Profile Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#eddcd0] shadow-sm flex items-center justify-between gap-4 shrink-0 min-w-[280px]">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#eddcd0] shrink-0 bg-[#faede2]">
                <img
                  src="/images/pottery_artisan.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220]">
                    {currentUser?.name || "An Nhiên"}
                  </span>
                  <span className="w-4 h-4 rounded-full bg-[#9e3b2e] text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                </div>
                <div className="text-xs text-[#8c7a72] mb-1.5">
                  Bạn đồng hành
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#9e3b2e] font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{totalCount} dấu ấn đã lưu lại</span>
                </div>
              </div>
            </div>

            {onGoToSettings && (
              <button
                onClick={onGoToSettings}
                title="Cài đặt & Tùy chọn cá nhân"
                className="p-2.5 rounded-full border border-[#e8d6c7] bg-[#fdf9f5] hover:bg-[#faede2] text-[#8c7970] hover:text-[#9e3b2e] transition-colors cursor-pointer"
                aria-label="Cài đặt"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Primary Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          {/* Tab 1: Tín hiệu đã lưu */}
          <button
            onClick={() => setActiveTab("signals")}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "signals"
                ? "bg-[#9e3b2e] text-white shadow-2xs"
                : "bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af]"
            }`}
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>Tín hiệu đã lưu</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[11px] font-mono ${
                activeTab === "signals" ? "bg-white/20 text-white" : "bg-[#f5e9df] text-[#8c7a72]"
              }`}
            >
              {savedSignals.length.toString().padStart(2, "0")}
            </span>
          </button>

          {/* Tab 2: Thẻ xin xăm đã lưu */}
          <button
            onClick={() => setActiveTab("xinxam")}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "xinxam"
                ? "bg-[#9e3b2e] text-white shadow-2xs"
                : "bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af]"
            }`}
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>Thẻ xin xăm đã lưu</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[11px] font-mono ${
                activeTab === "xinxam" ? "bg-white/20 text-white" : "bg-[#f5e9df] text-[#8c7a72]"
              }`}
            >
              {savedXamList.length.toString().padStart(2, "0")}
            </span>
          </button>

          {/* Tab 3: Điều ước & Lời tri ân */}
          <button
            onClick={() => setActiveTab("wishes")}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "wishes"
                ? "bg-[#9e3b2e] text-white shadow-2xs"
                : "bg-white border border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Điều ước & Lời tri ân</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[11px] font-mono ${
                activeTab === "wishes" ? "bg-white/20 text-white" : "bg-[#f5e9df] text-[#8c7a72]"
              }`}
            >
              {savedWishList.length.toString().padStart(2, "0")}
            </span>
          </button>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#eddcd0] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-2xs">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8880]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm trong nội dung đã lưu (tiêu đề, thẻ, chữ...)"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#fcf8f2] border border-[#ecd9cb] text-xs text-[#2a2220] placeholder-[#9a8880] focus:outline-none focus:ring-1 focus:ring-[#9e3b2e]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[#524440] text-white shadow-2xs font-semibold"
                  : "bg-[#fcf8f2] border border-[#eddcd0] text-[#6d5c55]"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveFilter("thisWeek")}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                activeFilter === "thisWeek"
                  ? "bg-[#524440] text-white shadow-2xs font-semibold"
                  : "bg-[#fcf8f2] border border-[#eddcd0] text-[#6d5c55]"
              }`}
            >
              Tuần này
            </button>
            <button
              onClick={() => setActiveFilter("thisMonth")}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                activeFilter === "thisMonth"
                  ? "bg-[#524440] text-white shadow-2xs font-semibold"
                  : "bg-[#fcf8f2] border border-[#eddcd0] text-[#6d5c55]"
              }`}
            >
              Tháng này
            </button>
            <button
              onClick={() => setActiveFilter("starred")}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                activeFilter === "starred"
                  ? "bg-[#524440] text-white shadow-2xs font-semibold"
                  : "bg-[#fcf8f2] border border-[#eddcd0] text-[#6d5c55]"
              }`}
            >
              ☆ Gắn sao
            </button>
          </div>

          {/* Sort selector */}
          <button
            onClick={() => setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
            className="flex items-center gap-1.5 text-xs text-[#786760] hover:text-[#9e3b2e] shrink-0 border-l border-[#eddcd0] pl-3 cursor-pointer transition-colors font-medium"
            title="Nhấp để chuyển đổi thứ tự sắp xếp"
          >
            <span>{sortOrder === "newest" ? "Mới nhất trước ↓" : "Cũ nhất trước ↑"}</span>
          </button>
        </div>

        {/* =========================================================================
            TAB CONTENT 1: THẺ XIN XĂM ĐÃ LƯU (MATCHING IMAGE 1)
           ========================================================================= */}
        {activeTab === "xinxam" && (
          <div>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Scroll className="w-5 h-5 text-[#9e3b2e]" />
                <h2 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220]">
                  Thẻ xin xăm đã lưu
                </h2>
              </div>
              <span className="text-xs text-[#8c7a72]">
                Hiển thị {filteredXam.length}/{savedXamList.length} thẻ xăm
              </span>
            </div>

            {filteredXam.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {filteredXam.map((item) => (
                  <Card
                    key={item.id}
                    className="p-5 rounded-3xl bg-white border-[#eddcd0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top status line */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-[#9e3b2e]">
                          Thẻ số {item.stickNumber} • {item.fortuneType}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[11px] font-medium bg-[#faede2] text-[#9e3b2e] border-[#ebd7c8]"
                        >
                          {item.category}
                        </Badge>
                      </div>

                      {/* Region/Temple line */}
                      <div className="text-xs text-[#8f7e77] mb-2 font-medium">
                        {item.region}
                      </div>

                      {/* Title */}
                      <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-3">
                        {item.category}
                      </h3>

                      {/* Quote Container */}
                      <div className="p-3.5 rounded-2xl bg-[#fbf5ee] border border-[#f0e2d5] text-xs sm:text-sm font-['Noto_Serif',serif] italic text-[#5c4a43] leading-relaxed mb-4">
                        {item.quote}
                      </div>

                      {/* Date */}
                      <div className="text-[11px] text-[#9a8981] mb-4 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-[#f4e8dc] flex items-center justify-between">
                      <button
                        onClick={() => setOpenedXam(item)}
                        className="text-xs font-semibold text-[#9e3b2e] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Xem lại kết quả</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleStarXam(item.id)}
                          className={`p-1.5 rounded-full hover:bg-[#faede2] transition-colors cursor-pointer ${
                            item.starred ? "text-amber-500 fill-current" : "text-[#a8958c]"
                          }`}
                        >
                          <Star className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            setItemToDelete({
                              type: "xinxam",
                              id: item.id,
                              title: `Thẻ số ${item.stickNumber} - ${item.category}`,
                            })
                          }
                          className="p-1.5 rounded-full hover:bg-rose-50 text-[#a8958c] hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* EMPTY STATE MATCHING IMAGE 3 */
              <div className="p-10 sm:p-14 text-center rounded-3xl bg-white border border-[#eddcd0] mb-16 shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-[#fbf3ec] border border-[#ecd9cb] mx-auto mb-4 flex items-center justify-center text-[#9e3b2e]">
                  <Scroll className="w-8 h-8" />
                </div>

                <div className="text-xs uppercase font-bold tracking-wider text-[#9e3b2e] mb-1.5">
                  ỐNG XĂM ĐANG TĨNH LẶNG
                </div>

                <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-3">
                  Bạn chưa lưu thẻ xin xăm nào
                </h3>

                <p className="text-sm text-[#736057] leading-relaxed max-w-xl mx-auto mb-6">
                  Khi lòng cần một khoảng lặng hay một lời chiêm nghiệm dân gian từ các đền
                  miếu ba miền, hãy thử rút một thẻ xăm để soi tỏ tâm tư.
                </p>

                <Button
                  variant="default"
                  size="lg"
                  onClick={onGoToXinXam}
                  className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold gap-2 shadow-sm mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Bắt đầu trải nghiệm xin xăm</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="text-xs text-[#9a8981] italic">
                  ⓘ Các tab khác của bạn như Tín hiệu đã lưu ({savedSignals.length}) vẫn đang sẵn
                  sàng để xem lại.
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT 2: ĐIỀU ƯỚC LƯU RIÊNG (MATCHING IMAGE 4)
           ========================================================================= */}
        {activeTab === "wishes" && (
          <div>
            {/* Privacy Pledge Banner Matching Image 4 */}
            <Card className="p-4 sm:p-5 rounded-2xl bg-[#fbece1]/70 border border-[#ecd5c4] mb-6 flex items-start gap-3.5 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#9e3b2e] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1">
                  Không gian lưu riêng trên trình duyệt
                </div>
                <p className="text-xs sm:text-sm text-[#6c5a52] leading-relaxed">
                  Chỉ hiển thị những điều ước bạn chọn{" "}
                  <strong>“Lưu riêng vào nhật ký”</strong>. Những điều ước gửi dưới dạng thả trôi
                  biểu tượng đã được hướng tới sự an nhiên và hoàn toàn không lưu giữ.
                </p>
              </div>
            </Card>

            {filteredWishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {filteredWishes.map((wish) => (
                  <Card
                    key={wish.id}
                    className="p-6 rounded-3xl bg-white border-[#eddcd0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Meta header */}
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-3 text-xs">
                        <div className="text-[#8c7b74] font-medium flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#9e3b2e]" />
                          <span>{wish.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-[11px] bg-[#fbf5ee] text-[#9e3b2e] border-[#ebd7c8]"
                          >
                            {wish.category}
                          </Badge>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f2e6dc] text-[#7a675e] font-medium flex items-center gap-1">
                            <Lock className="w-3 h-3 text-[#9e3b2e]" />
                            <span>Đã niêm phong kín</span>
                          </span>
                        </div>
                      </div>

                      {/* Content excerpt */}
                      <div className="p-4 rounded-2xl bg-[#fffdfa] border border-[#eedcd0] text-sm text-[#3b2e29] font-['Noto_Serif',serif] leading-relaxed mb-3">
                        “{wish.content}”
                      </div>

                      <div className="text-xs text-[#9c8b82] italic flex items-center gap-1 mb-4">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a59]" />
                        <span>Đã cất giữ cẩn thận</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-[#f4e8dc] flex items-center justify-between">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => setOpenedWish(wish)}
                        className="text-xs font-semibold gap-1.5 rounded-xl px-4 py-2"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Mở điều ước</span>
                      </Button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleStarWish(wish.id)}
                          className={`p-1.5 rounded-full hover:bg-[#faede2] transition-colors cursor-pointer ${
                            wish.starred ? "text-amber-500 fill-current" : "text-[#a8958c]"
                          }`}
                        >
                          <Star className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            setItemToDelete({
                              type: "wish",
                              id: wish.id,
                              title: `Điều ước [${wish.category}]`,
                            })
                          }
                          className="inline-flex items-center gap-1 text-xs text-[#9c8b82] hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-10 sm:p-14 text-center rounded-3xl bg-white border border-[#eddcd0] mb-16 shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-[#fbf3ec] border border-[#ecd9cb] mx-auto mb-4 flex items-center justify-center text-[#9e3b2e]">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-3">
                  Bạn chưa lưu điều ước nào
                </h3>
                <p className="text-sm text-[#736057] leading-relaxed max-w-xl mx-auto mb-6">
                  Khi có những nỗi niềm cần giải tỏa hay gửi gắm khoảng lặng, bạn có thể viết và
                  lưu riêng tư tại màn Gửi gắm điều ước.
                </p>
                <Button
                  variant="default"
                  size="lg"
                  onClick={onGoToWish}
                  className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Viết điều ước ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT 3: TÍN HIỆU ĐÃ LƯU (DAILY CHECK-IN SIGNALS)
           ========================================================================= */}
        {activeTab === "signals" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-[#9e3b2e]" />
                <h2 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220]">
                  Tín hiệu đã lưu
                </h2>
              </div>
              <span className="text-xs text-[#8c7a72]">
                {filteredSignals.length} bản ghi lưu trữ
              </span>
            </div>

            {filteredSignals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {filteredSignals.map((item) => (
                  <Card
                    key={item.id}
                    className="p-6 rounded-3xl bg-white border-[#eddcd0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                        <Badge variant="terracotta" className="text-xs">
                          {item.mood}
                        </Badge>
                        <span className="text-[#8c7b74]">{item.date}</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#f0e2d5] text-sm font-['Noto_Serif',serif] italic text-[#4a3a34] leading-relaxed mb-3">
                        <p>{item.poemLine1}</p>
                        <p>{item.poemLine2}</p>
                      </div>

                      {item.journal && (
                        <p className="text-xs text-[#6e5d56] mb-3 line-clamp-2">
                          <strong>Ghi chú:</strong> {item.journal}
                        </p>
                      )}

                      {item.actionTitle && (
                        <div className="text-xs text-[#806f67] flex items-center gap-1.5 mb-4">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a59]" />
                          <span>{item.actionTitle}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#f4e8dc] flex items-center justify-between">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onGoToSignalResult(item.signalId)}
                        className="text-xs font-semibold gap-1 rounded-xl"
                      >
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleStarSignal?.(item.id)}
                          className={`p-1.5 rounded-full hover:bg-[#faede2] transition-colors cursor-pointer ${
                            item.starred ? "text-amber-500 fill-current" : "text-[#a8958c]"
                          }`}
                        >
                          <Star className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            setItemToDelete({
                              type: "signal",
                              id: item.id,
                              title: `Tín hiệu [${item.mood}]`,
                            })
                          }
                          className="p-1.5 rounded-full hover:bg-rose-50 text-[#a8958c] hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-10 sm:p-14 text-center rounded-3xl bg-white border border-[#eddcd0] mb-16 shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-[#fbf3ec] border border-[#ecd9cb] mx-auto mb-4 flex items-center justify-center text-[#9e3b2e]">
                  <Flower2 className="w-8 h-8" />
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-3">
                  Bạn chưa lưu tín hiệu nào
                </h3>
                <p className="text-sm text-[#736057] leading-relaxed max-w-xl mx-auto mb-6">
                  Mỗi ngày, hãy dành 1 phút check-in cảm xúc để đón nhận câu ca dao và vi hành
                  động an lành cho tâm trí.
                </p>
                <Button
                  variant="default"
                  size="lg"
                  onClick={onGoToMood}
                  className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Check-in cảm xúc hôm nay</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Classical Bottom Quote */}
        <div className="text-center pt-8 border-t border-[#eddcd0]">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-lg text-[#9e3b2e] mb-1.5">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ.”
          </p>
          <div className="text-xs uppercase tracking-widest text-[#938279] font-medium">
            © {new Date().getFullYear()} Tin Lắm Tâm Linh. Bản quyền thuộc về những tâm hồn yêu nếp xưa đương đại.
          </div>
        </div>
      </main>

      {/* =========================================================================
          MODAL 1: XÁC NHẬN XÓA (MATCHING IMAGE 2)
         ========================================================================= */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-white shadow-2xl border border-[#eedcd0] text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Red alert square icon */}
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 mx-auto mb-4 flex items-center justify-center text-rose-600">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-2.5">
              Xác nhận xóa {itemToDelete.type === "wish" ? "điều ước lưu riêng" : "bản ghi này"}?
            </h3>

            <p className="text-xs sm:text-sm text-[#736057] leading-relaxed mb-6">
              Mục này sẽ được gỡ bỏ vĩnh viễn khỏi <strong>Góc của tôi</strong>. Hành động này
              không thể hoàn tác sau khi xác nhận.
            </p>

            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setItemToDelete(null)}
                className="w-1/2 rounded-2xl text-xs font-semibold"
              >
                Hủy bỏ
              </Button>

              <Button
                variant="default"
                size="lg"
                onClick={handleConfirmDelete}
                className="w-1/2 rounded-2xl text-xs font-semibold bg-[#8a2e22] hover:bg-[#72251a] text-white"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                <span>Xóa vĩnh viễn</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: MỞ ĐIỀU ƯỚC CHI TIẾT
         ========================================================================= */}
      {openedWish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="max-w-lg w-full p-6 sm:p-8 rounded-3xl bg-[#fffdfa] shadow-2xl border border-[#eedcd0] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setOpenedWish(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#faede2] text-[#8c7b74] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="terracotta" className="text-xs">
                {openedWish.category}
              </Badge>
              <span className="text-xs text-[#8c7b74]">{openedWish.date}</span>
            </div>

            <h3 className="font-['Noto_Serif',serif] font-bold text-xl text-[#2a2220] mb-4">
              {openedWish.category.includes("tri ân") ||
              openedWish.category.includes("Tri ân") ||
              openedWish.category === "Lòng biết ơn"
                ? "Lời tri ân đã lưu riêng"
                : "Ước nguyện đã niêm phong"}
            </h3>

            <div className="p-5 rounded-2xl bg-[#fbf5ee] border border-[#f0e2d5] text-sm sm:text-base font-['Noto_Serif',serif] leading-relaxed text-[#3a2c26] mb-6 whitespace-pre-wrap">
              “{openedWish.content}”
            </div>

            <div className="text-xs text-[#7d6b63] italic mb-6">
              ⓘ Lời tâm sự này chỉ lưu trữ trên thiết bị của bạn và không gửi tới bất kỳ ai.
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setOpenedWish(null)}
              className="w-full rounded-2xl text-xs font-semibold"
            >
              Đóng lại
            </Button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: MỞ THẺ XĂM CHI TIẾT
         ========================================================================= */}
      {openedXam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="max-w-lg w-full p-6 sm:p-8 rounded-3xl bg-[#fffdfa] shadow-2xl border border-[#eedcd0] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setOpenedXam(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#faede2] text-[#8c7b74] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Badge variant="terracotta" className="text-xs">
                {openedXam.region}
              </Badge>
              <Badge variant="outline" className="text-xs bg-[#faede2] text-[#9e3b2e] border-[#ebd7c8]">
                {openedXam.category}
              </Badge>
              <span className="text-xs text-[#8c7b74]">{openedXam.date}</span>
            </div>

            <div className="text-xs uppercase font-bold tracking-wider text-[#9e3b2e] mb-1">
              THẺ SỐ {openedXam.stickNumber} • QUẺ {openedXam.fortuneType.toUpperCase()}
            </div>

            <h3 className="font-['Noto_Serif',serif] font-bold text-2xl text-[#2a2220] mb-4">
              Lời quẻ chiêm nghiệm
            </h3>

            <div className="p-5 rounded-2xl bg-[#fbf5ee] border border-[#f0e2d5] mb-5">
              <p className="font-['Noto_Serif',serif] italic text-base sm:text-lg text-[#9e3b2e] font-semibold text-center leading-relaxed">
                “{openedXam.quote}”
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#6c5a52] leading-relaxed mb-6">
              Lời nhắc từ truyền thống dân gian: Mọi sự hanh thông bắt đầu từ việc giữ lòng an định,
              chăm lo những điều thiết thực trong tầm tay và bao dung với chính mình.
            </p>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setOpenedXam(null)}
                className="w-1/2 rounded-2xl text-xs font-semibold"
              >
                Đóng lại
              </Button>

              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  setOpenedXam(null);
                  onGoToXinXam();
                }}
                className="w-1/2 rounded-2xl text-xs font-semibold gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Rút quẻ mới</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
