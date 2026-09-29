import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckSquare,
  Square,
  Share2,
  Printer,
  Bookmark,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Home,
  Sparkles,
  Flower2,
  Info,
  Flame,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { RITUAL_GUIDES, getRitualById } from "../data/ritualData";

interface RitualDetailScreenProps {
  ritualId?: string;
  onBackToRitualList: () => void;
  onSelectRelatedRitual: (id: string) => void;
}

export const RitualDetailScreen: React.FC<RitualDetailScreenProps> = ({
  ritualId = "chuan-bi-ngay-ram",
  onBackToRitualList,
  onSelectRelatedRitual,
}) => {
  const ritual = getRitualById(ritualId) || RITUAL_GUIDES[0];
  const detail = ritual.detail || RITUAL_GUIDES[0].detail!;

  // Interactive checklist state isolated per ritual ID
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`tltl-ritual-checklist-${ritual.id}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(`tltl-ritual-bookmark-${ritual.id}`);
      return stored === "true";
    } catch {
      return false;
    }
  });

  const [showShareNotification, setShowShareNotification] = useState(false);

  // Sync state whenever ritual.id changes (prevents carrying old state to new article)
  useEffect(() => {
    try {
      const storedChecklist = localStorage.getItem(`tltl-ritual-checklist-${ritual.id}`);
      setCheckedIds(storedChecklist ? JSON.parse(storedChecklist) : []);
      const storedBookmark = localStorage.getItem(`tltl-ritual-bookmark-${ritual.id}`);
      setIsBookmarked(storedBookmark === "true");
    } catch {
      setCheckedIds([]);
      setIsBookmarked(false);
    }
  }, [ritual.id]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(`tltl-ritual-checklist-${ritual.id}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(`tltl-ritual-bookmark-${ritual.id}`, String(next));
      } catch {}
      return next;
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 2500);
    }
  };

  const relatedRituals = RITUAL_GUIDES.filter((item) => item.id !== ritual.id).slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb & Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              onClick={onBackToRitualList}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Khám phá
            </span>
            <span>/</span>
            <span
              onClick={onBackToRitualList}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Cẩm nang nghi lễ
            </span>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold">{ritual.title}</span>
          </div>

          <div className="flex items-center gap-1.5 uppercase font-semibold text-[11px] text-[#938279]">
            <span className="w-2 h-2 rounded-full bg-[#9e3b2e] inline-block"></span>
            <span>HƯỚNG DẪN NGHI LỄ THÍCH ỨNG</span>
          </div>
        </div>

        {/* Sub-badge & Title Section */}
        <div className="mb-6">
          <Badge
            variant="terracotta"
            className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#faece1] text-[#9e3b2e] border-[#eedcd0]"
          >
            THỰC HÀNH TẠI GIA TIẾT GIẢM • PHÙ HỢP CĂN HỘ & NHÀ PHỐ TRẺ
          </Badge>

          <h1 className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-3xl lg:text-[38px] text-[#2a2220] leading-tight mb-3">
            {detail.fullTitle}
          </h1>

          <p className="text-sm sm:text-base text-[#6f5e57] leading-relaxed max-w-3xl mb-4">
            {detail.subtitle}
          </p>

          {/* 4 Metadata Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-white border border-[#eddcd0] text-[#6d5c55] font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#9e3b2e]" />
              <span>4 bước giản dị</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-[#eddcd0] text-[#6d5c55] font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#9e3b2e]" />
              <span>Khoảng 15 - 20 phút</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-[#eddcd0] text-[#6d5c55] font-medium flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#9e3b2e]" />
              <span>Phù hợp căn hộ & nhà phố</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#fbf3ec] border border-[#ecd9cb] text-[#9e3b2e] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Điểm an yên: Lắng đọng tâm</span>
            </span>
          </div>
        </div>

        {/* Hero Artwork Banner */}
        <div className="mb-10 rounded-3xl overflow-hidden border border-[#eddcd0] bg-white shadow-2xs">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#faede2]">
            <img
              src={detail.heroImage}
              alt={detail.fullTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3.5 bg-[#fbf5ee] border-t border-[#f0e2d5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8c7b74]">
            <span className="italic">{detail.heroCaption}</span>
            <span className="font-medium text-[#a19088]">{detail.heroArtCredit}</span>
          </div>
        </div>

        {/* Two Columns Layout: Left Content, Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Left Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Section 1: Ý nghĩa của việc dành thời gian tưởng nhớ */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-4 rounded-full bg-[#9e3b2e]"></span>
                <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
                  {detail.meaningTitle}
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#5c4c45] leading-relaxed mb-5">
                {detail.meaningParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Callout Quote */}
              <div className="p-5 rounded-2xl bg-[#faece1]/60 border-l-4 border-[#9e3b2e] text-[#843226] font-['Noto_Serif',serif] italic text-sm sm:text-base leading-relaxed">
                {detail.meaningQuote}
              </div>
            </section>

            {/* Section 2: Danh sách vật phẩm tinh gọn */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-4 rounded-full bg-[#9e3b2e]"></span>
                <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
                  Danh sách vật phẩm tinh gọn có thể điều chỉnh theo gia đình
                </h2>
              </div>

              {/* Advice Alert Banner */}
              <div className="p-4 rounded-2xl bg-[#fbf2eb] border border-[#ecdacb] mb-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#9e3b2e] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#736057] leading-relaxed">
                  {detail.offeringAdvice}
                </p>
              </div>

              {/* 5 Offering Items */}
              <div className="space-y-3">
                {detail.offerings.map((offering) => (
                  <div
                    key={offering.id}
                    className="p-4 rounded-2xl bg-white border border-[#eddcd0] hover:border-[#dfc3af] transition-all flex items-start gap-3.5 shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#faede2] text-[#9e3b2e] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <strong className="text-sm sm:text-base text-[#2a2220] font-bold">
                          {offering.name}
                        </strong>
                        {offering.subname && (
                          <span className="text-xs text-[#95837b] italic">
                            {offering.subname}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#6c5a52] leading-relaxed">
                        {offering.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: 4 bước thực hành an tịnh nơi tổ ấm */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-4 rounded-full bg-[#9e3b2e]"></span>
                <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
                  4 bước: Thực hành an tịnh nơi tổ ấm
                </h2>
              </div>

              <div className="space-y-5">
                {detail.steps.map((st) => (
                  <div
                    key={st.stepNumber}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-[#eddcd0] relative overflow-hidden flex flex-col justify-between shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#9e3b2e] text-white font-bold font-serif text-sm flex items-center justify-center shrink-0">
                          {parseInt(st.stepNumber, 10)}
                        </span>
                        <h3 className="font-['Noto_Serif',serif] font-bold text-base sm:text-lg text-[#2a2220]">
                          {st.title}
                        </h3>
                      </div>
                      <span className="font-serif font-bold text-3xl sm:text-4xl text-[#edd6c7] select-none">
                        {st.stepNumber}
                      </span>
                    </div>

                    <p className="text-sm text-[#615049] leading-relaxed pl-11">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Khác biệt phong tục 3 miền & An toàn khói lửa */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-4 rounded-full bg-[#9e3b2e]"></span>
                <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
                  Khác biệt phong tục vùng miền & Ưu tiên an toàn khói lửa
                </h2>
              </div>

              {/* 3 Regional Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {detail.regionalDetails.map((rd) => (
                  <Card key={rd.region} className="p-4 rounded-2xl bg-white border-[#eddcd0]">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
                      <span>{rd.region}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#68564e] leading-relaxed">
                      {rd.desc}
                    </p>
                  </Card>
                ))}
              </div>

              {/* PCCC Fire Safety Box */}
              <div className="p-5 rounded-2xl bg-[#fff7f0] border border-[#f0d6c0] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b84a39]">
                  <Flame className="w-4 h-4" />
                  <span>Nguyên tắc vàng an toàn PCCC tại chung cư & nhà phố</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#735e54] pl-5 list-disc leading-relaxed">
                  {detail.fireSafetyRules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>

              {/* Classical Excerpt Quote */}
              <div className="p-4 rounded-2xl bg-[#faece1]/70 border border-[#ecd5c4] text-center">
                <p className="font-['Noto_Serif',serif] italic font-semibold text-sm sm:text-base text-[#9e3b2e]">
                  {detail.closingQuote}
                </p>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#eddcd0] dark:border-[#3d2f2b]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBackToRitualList}
                  className="w-full sm:w-auto text-xs font-semibold gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại: Cẩm nang nghi lễ</span>
                </Button>

                <Button
                  variant={isBookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleBookmark}
                  className="w-full sm:w-auto text-xs font-semibold gap-1.5"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                  <span>
                    {isBookmarked
                      ? "Đã lưu vào cẩm nang của tôi ✔"
                      : "Lưu cẩm nang nghi thức"}
                  </span>
                </Button>
              </div>
            </section>
          </div>

          {/* Right Sidebar: Sticky Checklist & Safety Controls (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Checklist Card */}
              <Card className="p-5 rounded-3xl bg-white border-[#ecdcd0] shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220]">
                    Tiến trình chuẩn bị
                  </div>
                  <Badge variant="outline" className="text-xs text-[#9e3b2e] border-[#eedcd0]">
                    Tự do
                  </Badge>
                </div>

                <p className="text-xs text-[#8c7b74] leading-relaxed mb-4">
                  Đánh dấu từng việc để kiểm tra không gian thờ an yên mà không áp lực.
                </p>

                {/* Counter */}
                <div className="p-3 rounded-2xl bg-[#fbece1]/70 border border-[#ecd5c4] text-xs font-semibold text-[#9e3b2e] mb-4 flex items-center justify-between">
                  <span>Tiến độ thực hiện:</span>
                  <span className="font-mono text-sm">
                    {checkedIds.length} / {detail.checklists.length} việc hoàn thành
                  </span>
                </div>

                {/* Checkboxes List */}
                <div className="space-y-2.5 mb-6">
                  {detail.checklists.map((chk) => {
                    const isDone = checkedIds.includes(chk.id);
                    return (
                      <div
                        key={chk.id}
                        onClick={() => toggleCheck(chk.id)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 cursor-pointer transition-all ${
                          isDone
                            ? "bg-[#faf0e6] border-[#9e3b2e]/40 text-[#2a2220] font-medium"
                            : "bg-[#fffdfa] border-[#eddcd0] text-[#6d5c55] hover:border-[#dfc3af]"
                        }`}
                      >
                        <div className="mt-0.5 text-[#9e3b2e]">
                          {isDone ? (
                            <CheckSquare className="w-4 h-4" />
                          ) : (
                            <Square className="w-4 h-4 text-[#a8958c]" />
                          )}
                        </div>
                        <span className={isDone ? "line-through text-[#8f7e77]" : ""}>
                          {chk.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Safety Tip in sidebar */}
                <div className="p-3.5 rounded-2xl bg-[#fffaf5] border border-[#f0dfd3] mb-5 text-xs text-[#7e6c64] space-y-1">
                  <div className="font-bold text-[#9e3b2e] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Lưu ý an toàn lửa & chung cư</span>
                  </div>
                  <p className="leading-relaxed">{detail.safetyTip}</p>
                </div>

                {/* Print & Share actions */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="text-xs font-medium gap-1 text-[#66544d]"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In lưu trữ</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="text-xs font-medium gap-1 text-[#66544d]"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Chia sẻ</span>
                  </Button>
                </div>

                {showShareNotification && (
                  <div className="mt-2 text-center text-xs text-[#9e3b2e] font-medium">
                    ✓ Đã sao chép liên kết cẩm nang!
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>

        {/* Section: Cẩm nang nghi lễ liên quan */}
        <div className="pt-10 border-t border-[#eddcd0] mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220]">
              Cẩm nang nghi lễ liên quan dành cho bạn
            </h2>
            <button
              onClick={onBackToRitualList}
              className="text-xs text-[#9e3b2e] font-semibold hover:underline cursor-pointer"
            >
              Xem tất cả cẩm nang →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedRituals.map((item) => (
              <Card
                key={item.id}
                onClick={() => onSelectRelatedRitual(item.id)}
                className="rounded-3xl overflow-hidden bg-white border-[#eddcd0] hover:border-[#dfc3af] transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#faede2]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-black/60 text-white backdrop-blur-xs">
                        {item.occasion}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] leading-snug mb-1 hover:text-[#9e3b2e] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#705e57] line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 text-xs font-semibold text-[#9e3b2e] flex items-center justify-end">
                  <span>Xem hướng dẫn →</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center pt-6 border-t border-[#eddcd0]">
          <p className="font-['Noto_Serif',serif] italic font-semibold text-lg text-[#9e3b2e] mb-1.5">
            “Tâm bình thế giới bình, lòng an vạn sự tỏ.”
          </p>
          <div className="text-xs uppercase tracking-widest text-[#938279] font-medium">
            © {new Date().getFullYear()} Tin Lắm Tâm Linh • Chiêm nghiệm dân gian đương đại
          </div>
        </div>
      </main>
    </div>
  );
};
