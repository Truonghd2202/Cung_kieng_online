import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Heart,
  Sparkles,
  BookOpen,
  Bell,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Flower2,
  Bookmark,
  Share2,
  Info,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { CalendarEventItem, getCalendarEventById } from "../data/calendarData";

interface EventDetailScreenProps {
  eventId?: string;
  onBackToCalendar: () => void;
  onGoToRituals: () => void;
  onGoToHome: () => void;
}

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({
  eventId = "le-soc-vong-ngay-ram",
  onBackToCalendar,
  onGoToRituals,
  onGoToHome,
}) => {
  const event = getCalendarEventById(eventId) || getCalendarEventById("le-soc-vong-ngay-ram")!;

  // Reminder widget state
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderOption, setReminderOption] = useState<"before1" | "exact" | "custom">("before1");
  const [isSavedReminder, setIsSavedReminder] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSaveReminder = () => {
    setIsSavedReminder(true);
    setTimeout(() => setIsSavedReminder(false), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Top Breadcrumb & Back Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-[#8a7971]">
          <div className="flex items-center gap-2">
            <span
              onClick={onGoToHome}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Hôm nay
            </span>
            <span>/</span>
            <span
              onClick={onBackToCalendar}
              className="hover:text-[#9e3b2e] cursor-pointer transition-colors"
            >
              Lịch văn hóa
            </span>
            <span>/</span>
            <span className="text-[#9e3b2e] font-semibold truncate max-w-[200px] sm:max-w-xs">
              Chi tiết sự kiện ({event.title})
            </span>
          </div>

          <button
            onClick={onBackToCalendar}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#82716a] hover:text-[#9e3b2e] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại lịch văn hóa</span>
          </button>
        </div>

        {/* Badges Strip */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge
            variant="terracotta"
            className="text-[11px] font-semibold px-2.5 py-0.5 uppercase bg-[#faede2] text-[#9e3b2e] border-[#ebd5c3]"
          >
            {event.typeLabel.toUpperCase()}
          </Badge>

          <Badge
            variant="outline"
            className="text-[11px] font-semibold px-2.5 py-0.5 text-[#73635b] border-[#ebdcd0]"
          >
            {event.region.toUpperCase()}
          </Badge>

          <span className="text-xs text-[#8c7b74]">
            • Nếp sống hiện đại • Gợi ý tìm hiểu trong ngày rằm xuất hiện
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="mb-6">
          <h1 className="font-['Noto_Serif',serif] font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#2a2220] leading-tight mb-3">
            {event.title}
          </h1>

          <p className="text-sm sm:text-base text-[#6f5e57] leading-relaxed max-w-4xl">
            {event.shortDesc}
          </p>
        </div>

        {/* 3 Meta Info Strip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          <div className="p-4 rounded-2xl bg-white border border-[#eddcd0] flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#98877f]">
                Thời điểm diễn ra
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#2a2220]">
                {event.timing || event.lunarDate}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#eddcd0] flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#98877f]">
                Phạm vi lưu truyền
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#2a2220]">
                {event.scope || event.region}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#eddcd0] flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#faede2] flex items-center justify-center text-[#9e3b2e] shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#98877f]">
                Ý nghĩa trọng tâm
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#2a2220]">
                {event.coreMeaning || "Tri ân cội nguồn & bình an gia đạo"}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Artwork with Caption matching Image 2 */}
        <div className="mb-10">
          <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#ebd6c5] max-h-[460px] bg-[#221c1a]">
            <img
              src={event.heroImage || "/images/ritual_ram.jpg"}
              alt={event.title}
              className="w-full h-full object-cover max-h-[460px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-xs font-semibold text-[#3b302b] uppercase tracking-wider shadow-xs">
              CỘI NGUỒN NẾP XƯA • TRANH DÂN GIAN ĐƯƠNG ĐẠI
            </div>
          </div>

          <div className="text-center text-xs text-[#8c7b74] italic mt-2.5">
            {event.heroCaption ||
              "Tranh minh họa: Nếp nhà Việt ấm áp trong ngày Rằm — Nơi soi sáng đạo hiếu và khoảng an yên sau những ngày bận rộn."}
          </div>
        </div>

        {/* 2-Column Content Layout matching Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Structured Content Sections */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section 1: Ý nghĩa văn hóa & Tinh thần nếp xưa */}
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1 flex items-center gap-1.5">
                <Flower2 className="w-3.5 h-3.5" />
                <span>Ý NGHĨA VIỆT</span>
              </div>

              <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mb-4">
                Ý nghĩa văn hóa & Tinh thần nếp xưa
              </h2>

              <div className="space-y-3.5 text-sm sm:text-base text-[#52443f] leading-relaxed mb-6">
                {event.culturalMeaning?.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                )) || (
                  <p>
                    Trong văn hóa truyền thống của người Việt, ngày Rằm và mùng một là hai điểm tựa
                    thời gian thiêng liêng để mỗi người tự soi chiếu lại chính mình, tưởng nhớ công
                    ơn sinh thành dưỡng dục của tổ tiên.
                  </p>
                )}
              </div>

              {event.culturalMeaning?.quote && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#faf3ec] border-l-4 border-[#9e3b2e] text-xs sm:text-sm text-[#7a483e] italic leading-relaxed">
                  “{event.culturalMeaning.quote}”
                </div>
              )}
            </Card>

            {/* Section 2: Phong tục thường gặp trong dân gian */}
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TẬP QUÁN LÀNH MẠNH</span>
              </div>

              <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mb-2">
                Phong tục thường gặp trong dân gian
              </h2>

              <p className="text-xs sm:text-sm text-[#78665f] mb-6">
                Dù ở nông thôn hay thành thị, bốn nét thực hành thuần khiết này thường được các thế hệ duy
                trì như một nếp sống đẹp:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(event.customs || [
                  {
                    title: "Bao sái & Dọn nếp nhà",
                    desc: "Lau dọn bàn thờ bằng nước ngũ vị ấm, giữ cho hiên nhà và không gian sống thanh tịnh.",
                  },
                  {
                    title: "Thắp hương & Hoa quả mùa",
                    desc: "Dâng một nén trầm thơm, đĩa hoa cúc hoặc hoa quả mùa thu với lòng thành mộc mạc.",
                  },
                  {
                    title: "Bữa cơm gia đạo",
                    desc: "Một bữa cơm chay thanh đạm hoặc mâm cơm sum họp gia đình ấm cúng.",
                  },
                  {
                    title: "Hóa ái & Thiện tâm",
                    desc: "Nói lời hòa nhã, bao dung với người khác và giúp đỡ người xung quanh.",
                  },
                ]).map((c, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#faf4ed]/80 border border-[#ecdacb] flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-['Noto_Serif',serif] font-bold text-sm sm:text-base text-[#2a2220] mb-1">
                        {c.title}
                      </h4>
                      <p className="text-xs text-[#6e5d56] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Section 3: Điều người trẻ có thể tìm hiểu hoặc thực hành */}
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>HÀNH ĐỘNG HÔM NAY</span>
              </div>

              <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mb-2">
                Điều người trẻ có thể tìm hiểu hoặc thực hành
              </h2>

              <p className="text-xs sm:text-sm text-[#78665f] mb-6">
                Không cần những nghi thức quá rườm rà hay tốn kém, những gợi ý này hướng tới việc nuôi dưỡng
                tâm trí thảnh thơi giữa đời sống hiện đại:
              </p>

              <div className="space-y-4">
                {(event.youthActions || [
                  {
                    step: 1,
                    title: "15 phút tĩnh lặng buổi sớm",
                    desc: "Tạm rời xa màn hình điện thoại, tự tay pha ấm trà ấm, hít thở sâu và ghi lại 3 điều bạn biết ơn.",
                  },
                  {
                    step: 2,
                    title: "Một cuộc gọi ấm áp về nhà",
                    desc: "Gửi lời thăm hỏi chân tình tới ông bà, cha mẹ. Đôi khi chỉ một câu hỏi han đã đem lại niềm vui to lớn.",
                  },
                  {
                    step: 3,
                    title: "Lắng nghe ký ức từ bữa cơm sum họp",
                    desc: "Hỏi người lớn tuổi về nếp cúng xưa, vừa tiếp thu mỹ học dân gian vừa bồi đắp tình thân.",
                  },
                ]).map((action) => (
                  <div
                    key={action.step}
                    className="p-4 rounded-2xl bg-[#fbf5ee] border border-[#ecd9cb] flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#9e3b2e] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {action.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#2a2220] mb-0.5">
                        {action.title}
                      </h4>
                      <p className="text-xs text-[#6e5d56] leading-relaxed">{action.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Section 4: Sắc thái văn hóa vùng miền */}
            <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#9e3b2e] mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>SẮC THÁI VĂN HÓA</span>
              </div>

              <h2 className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a2220] mb-2">
                Lưu ý khác biệt giữa gia đình và vùng miền
              </h2>

              <p className="text-xs sm:text-sm text-[#78665f] mb-6">
                Đất nước trải dài tạo nên sự đa dạng phong phú về tập quán. Mỗi miền lại gửi gắm nét riêng:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
                <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#eddcd0]">
                  <div className="font-bold text-xs uppercase text-[#9e3b2e] mb-1">
                    Miền Bắc
                  </div>
                  <p className="text-xs text-[#695852] leading-relaxed">
                    {event.regionalNuances?.bac ||
                      "Coi trọng mâm cỗ tươm tất trong gian thờ, hương hoa cúc thanh nhã, giữ nét tôn ti khuôn phép."}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#eddcd0]">
                  <div className="font-bold text-xs uppercase text-[#9e3b2e] mb-1">
                    Miền Trung
                  </div>
                  <p className="text-xs text-[#695852] leading-relaxed">
                    {event.regionalNuances?.trung ||
                      "Đậm chất cung đình kết hợp nếp làng, chuộng lễ vật mộc mạc, tĩnh lặng và sâu lắng."}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#faf3ec] border border-[#eddcd0]">
                  <div className="font-bold text-xs uppercase text-[#9e3b2e] mb-1">
                    Miền Nam
                  </div>
                  <p className="text-xs text-[#695852] leading-relaxed">
                    {event.regionalNuances?.nam ||
                      "Khoáng đạt và rộng mở, gia chủ thường bày hoa trái xum xuê, chú trọng tình gắn kết láng giềng."}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#fbece1]/70 border border-[#ecd5c4] text-xs text-[#79675f] leading-relaxed">
                {event.regionalNuances?.note ||
                  "Những điểm tiếp nối: Tuyệt đối không mê tín dị đoan. Tùy điều kiện mỗi người mà thực hành giản dị, lấy cái tâm bình an làm điều cốt tủy."}
              </div>
            </Card>

            {/* Section 5: Nguồn tư liệu & Tính minh bạch */}
            <Card className="p-5 sm:p-6 rounded-3xl bg-[#faf4ed] border border-[#eddcd0] text-xs text-[#796860] leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-[#9e3b2e] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-[#2a2220]">Nguồn tư liệu & Tính minh bạch:</strong>{" "}
                Nội dung tham khảo từ các tài liệu phong tục dân gian Việt Nam, lịch vạn niên văn hóa và ký ức truyền khẩu người xưa. Không đại diện cho các quan điểm bói toán định mệnh hay hủ tục mê tín.
              </div>
            </Card>
          </div>

          {/* Right Column (4 cols): Sticky Sidebar Widgets matching Image 2 */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            {/* Widget 1: Nhắc tôi dịp này */}
            <Card className="p-6 rounded-3xl bg-white border border-[#eddcd0] shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#f3e6da]">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#9e3b2e]" />
                  <h3 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220]">
                    Nhắc tôi dịp này
                  </h3>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => setReminderEnabled(!reminderEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    reminderEnabled ? "bg-[#9e3b2e]" : "bg-[#ded1c8]"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      reminderEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs text-[#78665f] leading-relaxed mb-4">
                Nhận thông báo nhắc nhở nhẹ nhàng để chuẩn bị nếp nhà thảnh thơi.
              </p>

              {reminderEnabled && (
                <div className="space-y-2.5 mb-5 text-xs text-[#52443f]">
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-[#faf3ec]/60 border border-[#eddcd0]">
                    <input
                      type="radio"
                      name="reminder"
                      checked={reminderOption === "before1"}
                      onChange={() => setReminderOption("before1")}
                      className="text-[#9e3b2e] focus:ring-[#9e3b2e]"
                    />
                    <span>Trước 1 ngày (20:00 tối ngày 14)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-[#faf3ec]/60 border border-[#eddcd0]">
                    <input
                      type="radio"
                      name="reminder"
                      checked={reminderOption === "exact"}
                      onChange={() => setReminderOption("exact")}
                      className="text-[#9e3b2e] focus:ring-[#9e3b2e]"
                    />
                    <span>Đúng ngày Rằm (07:00 sáng ngày 15)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-[#faf3ec]/60 border border-[#eddcd0]">
                    <input
                      type="radio"
                      name="reminder"
                      checked={reminderOption === "custom"}
                      onChange={() => setReminderOption("custom")}
                      className="text-[#9e3b2e] focus:ring-[#9e3b2e]"
                    />
                    <span>Tùy chỉnh giờ nhắc riêng</span>
                  </label>
                </div>
              )}

              <Button
                variant="default"
                size="default"
                onClick={handleSaveReminder}
                disabled={!reminderEnabled}
                className="w-full font-semibold gap-2 shadow-xs text-xs py-2.5"
              >
                {isSavedReminder ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Đã lưu vào nhật ký</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Lưu vào nhật ký/lịch</span>
                  </>
                )}
              </Button>
            </Card>

            {/* Widget 2: Cẩm nang nghi lễ Link matching Image 2 */}
            <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#faede2] to-[#fbf2ea] border border-[#ebd5c3] shadow-xs">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9e3b2e] mb-1">
                CẨM NANG NGHI LỄ
              </div>

              <h4 className="font-['Noto_Serif',serif] font-bold text-base text-[#2a2220] mb-2 leading-snug">
                Bạn muốn chuẩn bị ngày Rằm tinh gọn, không rườm rà?
              </h4>

              <p className="text-xs text-[#705e57] leading-relaxed mb-4">
                Xem hướng dẫn cúng lễ mâm lễ chay mộc mạc, bài văn khấn truyền thống lưu truyền tinh gọn.
              </p>

              <Button
                variant="outline"
                size="default"
                onClick={onGoToRituals}
                className="w-full text-xs font-semibold bg-white border-[#ebd4c2] text-[#9e3b2e] hover:bg-[#faede2] gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>Xem Cẩm nang nghi lễ (Màn 18)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Card>

            {/* Widget 3: Lưu vào sự kiện yêu thích */}
            <Card
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-4 rounded-2xl bg-white border border-[#eddcd0] hover:border-[#dfc3af] transition-all cursor-pointer flex items-center justify-between shadow-2xs group"
            >
              <div className="flex items-center gap-2.5 text-xs text-[#52443f]">
                <Bookmark
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-[#9e3b2e] text-[#9e3b2e]" : "text-[#9c8b83]"
                  }`}
                />
                <span className="font-semibold group-hover:text-[#9e3b2e] transition-colors">
                  {isFavorite ? "Đã lưu vào sự kiện yêu thích" : "Lưu vào sự kiện yêu thích"}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#98877f]">
                {isFavorite ? "✓ Đã lưu" : "Lưu"}
              </span>
            </Card>

            {/* Widget 4: Classical Quote */}
            <div className="text-center p-4 rounded-2xl bg-[#faf3ec] border border-[#eddcd0] text-xs text-[#7d6c64] italic leading-relaxed">
              <div className="text-sm text-[#be8e5a] mb-1">✤</div>
              “Những thói quen tốt thấu cảm nếp xưa giúp tâm hồn vững vàng trước dòng chảy xao động.”
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
