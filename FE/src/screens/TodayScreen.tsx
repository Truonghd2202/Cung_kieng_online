import React, { useState } from "react";
import {
  ArrowRight,
  RotateCw,
  Sparkles,
  CheckCircle2,
  Scroll,
  Heart,
  Bell,
  Home,
  Waves,
  Feather,
  Flower2,
  X,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { MoodKey, SIGNALS_DATA } from "../data/demoSignals";

interface TodayScreenProps {
  isCheckedIn?: boolean;
  isActionDone?: boolean;
  mood?: MoodKey;
  onSelectMoodClick: () => void;
  onViewSignalDetails?: () => void;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({
  isCheckedIn = false,
  isActionDone = false,
  mood = "Chênh vênh",
  onSelectMoodClick,
  onViewSignalDetails,
}) => {
  const signal = SIGNALS_DATA[mood] || SIGNALS_DATA["Chênh vênh"];
  const [selectedRegionInfo, setSelectedRegionInfo] = useState<{
    region: string;
    sub: string;
    title: string;
    image: string;
    quote: string;
    tradition: string;
    philosophy: string;
  } | null>(null);

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] text-[#2e2624] font-['Be_Vietnam_Pro',sans-serif]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Top Status Badge */}
        <div className="flex justify-center mb-6">
          {isCheckedIn ? (
            <Badge
              variant="terracotta"
              className="gap-2 px-4 py-1.5 text-xs font-semibold tracking-wide"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#9e3b2e]" />
              <span>Hôm nay bạn đã check-in</span>
              <span className="text-[#be8e5a]">•</span>
              <span>
                Cảm xúc: <strong className="text-[#9e3b2e]">{mood}</strong>
              </span>
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="gap-2 px-4 py-1.5 text-xs font-semibold tracking-wide border-[#ebd9cd] bg-[#fbf5ee]"
            >
              <span className="w-2 h-2 rounded-full bg-[#9e3b2e] animate-pulse"></span>
              <span>Chưa ghi nhận nhịp tâm hôm nay</span>
              <span className="text-[#be8e5a]">•</span>
              <span className="italic font-normal">Dành 2 phút lắng lòng</span>
            </Badge>
          )}
        </div>

        {/* Hero Header with decorative mandala */}
        <div className="relative max-w-4xl mx-auto mb-10 text-center">
          <div className="hidden lg:block absolute -right-8 -top-6 w-32 h-32 rounded-full border border-[#f0ded0] p-2 pointer-events-none opacity-60">
            <div className="w-full h-full rounded-full border border-dashed border-[#e6cbba] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#faece1]"></div>
            </div>
          </div>

          {isCheckedIn ? (
            <>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-['Noto_Serif',serif] font-bold text-[#2a211e] leading-tight mb-3">
                Tín hiệu hôm nay đã nở rộ trong lòng bạn
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#6f6059] leading-relaxed max-w-2xl mx-auto">
                Sự {mood.toLowerCase()} vốn chỉ là khoảng lặng giữa hai nhịp bước. Khi
                nhận biết rõ xao động trong tâm trí, bạn đã bắt đầu tiến dần về sự an ổn.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-['Noto_Serif',serif] font-bold text-[#2a211e] leading-tight mb-3">
                Hôm nay tâm bạn đang nương tựa nơi đâu?
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#6f6059] leading-relaxed max-w-2xl mx-auto">
                Cuộc sống hối hả dễ làm ta quên mất việc tự hỏi lòng mình đang cảm thấy thế nào. Hãy dành ít phút lắng lòng nhận diện cảm xúc để đón nhận quẻ tín hiệu và lời nhắn an lành cho hôm nay.
              </p>
            </>
          )}
        </div>

        {/* Main Action Card: 2 distinct states */}
        {isCheckedIn ? (
          <Card className="rounded-3xl p-6 sm:p-8 shadow-xs mb-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Column */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e]">
                <span>Trích dẫn tỉnh thức</span>
                <span className="text-[#be8e5a]">•</span>
                <span className="text-[#887870] font-medium">Chiêm nghiệm ngày</span>
              </div>

              <p className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#9e3b2e] leading-snug">
                “{signal.poem.line1} / {signal.poem.line2}”
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbf3ec] border border-[#f1e0d3] text-xs text-[#6e5d56]">
                <span className={isActionDone ? "text-[#2e6930]" : "text-[#be8e5a]"}>
                  {isActionDone ? "✔" : "✦"}
                </span>
                <span>
                  {isActionDone ? "Đã thực hiện: " : "Hành động nuôi tâm: "}
                  <strong>{signal.action.title}</strong> ({signal.action.duration})
                </span>
              </div>

              <div className="text-[11px] text-[#9c8b84]">
                Tín hiệu đã được đồng bộ cùng nhịp tâm trong ngày
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  variant="default"
                  size="pill"
                  onClick={onViewSignalDetails}
                  className="gap-2 shadow-xs"
                >
                  <span>Xem lại tín hiệu trọn vẹn</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="pill"
                  onClick={onSelectMoodClick}
                  className="gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#85736b]" />
                  <span>Check-in lại nếu cảm xúc thay đổi</span>
                </Button>
              </div>
            </div>

            {/* Right Column: Square Calligraphy Box */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-full max-w-[200px] aspect-square rounded-2xl bg-[#fdf8f2] border border-[#ecd9cb] p-6 text-center flex flex-col items-center justify-center shadow-2xs">
                <div className="font-['Noto_Serif',serif] font-bold text-5xl text-[#9e3b2e] mb-2 leading-none">
                  Tĩnh
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8b7972] mb-1">
                  Tín hiệu cốt lõi
                </div>
                <p className="text-[11px] text-[#6d5b54] leading-relaxed">
                  Hóa giải bồn chồn bằng hơi thở chậm nhẹ
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="rounded-3xl p-6 sm:p-8 shadow-xs mb-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-[#ebdcd0] bg-gradient-to-br from-[#fffdfa] to-[#fcf7f0]">
            {/* Left Column */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Khởi đầu ngày mới</span>
                <span className="text-[#be8e5a]">•</span>
                <span className="text-[#887870] font-medium">3 bước tĩnh tâm</span>
              </div>

              <h2 className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-3xl text-[#2a211e] leading-snug">
                Lắng nghe nhịp lòng, gieo một niệm lành
              </h2>

              <p className="text-xs sm:text-sm text-[#6f5e57] leading-relaxed max-w-xl">
                Mỗi sớm mai thức dậy là một cơ hội để kết nối lại với chính mình. Một nén hương lòng, một chén trà mộc, hay chỉ đơn giản là thành thật nhận diện nhịp cảm xúc đang hiện diện.
              </p>

              {/* 3 mini step cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#faede2]/70 border border-[#f3dfce] text-left">
                  <span className="inline-block text-[11px] font-bold text-[#9e3b2e] mb-1">1. Nhận diện</span>
                  <p className="text-[11px] text-[#6e5d56] leading-snug">
                    Thành thật chọn 1 trong 6 nhịp tâm trạng
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faede2]/70 border border-[#f3dfce] text-left">
                  <span className="inline-block text-[11px] font-bold text-[#9e3b2e] mb-1">2. Lắng đọng</span>
                  <p className="text-[11px] text-[#6e5d56] leading-snug">
                    Quán chiếu hơi thở cùng la bàn tĩnh tâm
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faede2]/70 border border-[#f3dfce] text-left">
                  <span className="inline-block text-[11px] font-bold text-[#9e3b2e] mb-1">3. Khai mở</span>
                  <p className="text-[11px] text-[#6e5d56] leading-snug">
                    Đón nhận tín hiệu cổ thi & hành động nuôi tâm
                  </p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Button
                  variant="default"
                  size="pill"
                  onClick={onSelectMoodClick}
                  className="gap-2 shadow-xs px-6 py-2.5 font-semibold text-xs sm:text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Bắt đầu check-in ngày mới</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <span className="text-xs text-[#8d7c75] italic">
                  Chỉ mất khoảng 1-2 phút
                </span>
              </div>
            </div>

            {/* Right Column: Calligraphy Invitation Box */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-full max-w-[220px] aspect-square rounded-2xl bg-[#fdf8f2] border-2 border-dashed border-[#e6cbba] p-6 text-center flex flex-col items-center justify-center shadow-2xs relative group hover:border-[#9e3b2e]/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#faede2] text-[#9e3b2e] flex items-center justify-center mb-2">
                  <Flower2 className="w-5 h-5" />
                </div>
                <div className="font-['Noto_Serif',serif] font-bold text-4xl text-[#9e3b2e] mb-1.5 leading-none">
                  An
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8b7972] mb-1">
                  Tâm an vạn sự an
                </div>
                <p className="text-[11px] text-[#6d5b54] leading-relaxed">
                  Đang chờ bạn chọn một nhịp cảm xúc hôm nay
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Section 1: Góc nhìn địa linh */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-bold text-[#9e3b2e] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9e3b2e]"></span>
                Góc nhìn địa linh
              </div>
              <h2 className="text-2xl sm:text-3xl font-['Noto_Serif',serif] font-bold text-[#2a2220]">
                Văn hóa & Tập tục Ba Miền
              </h2>
            </div>
            <div className="text-xs text-[#7e6e66] max-w-md leading-relaxed md:text-right">
              Mỗi vùng đất là một nếp sống an định riêng biệt, nâng niu tâm thức
              người Việt qua từng biến chuyển thời gian.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Bắc Bộ */}
            <Card className="p-6 rounded-2xl flex flex-col justify-between hover:border-[#dfc3af] transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8c7b74] mb-3">
                  <Badge variant="terracotta" className="text-[10px]">
                    Đất Kinh Kỳ
                  </Badge>
                  <Home className="w-4 h-4 text-[#9e3b2e]" />
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                  Bắc Bộ: Trầm mặc mái ngói phong rêu
                </h3>
                <p className="text-xs sm:text-sm text-[#72625b] leading-relaxed">
                  Tập tục giữ ấm chén trà mộc, khép vạt áo trước hiên chùa làng để
                  lắng lại những lao xao giữa sương khói hồ thu.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#f4e8dc]">
                <button
                  onClick={() =>
                    setSelectedRegionInfo({
                      region: "Bắc Bộ",
                      sub: "Đất Kinh Kỳ ngàn năm văn vật",
                      title: "Trầm mặc mái ngói phong rêu & nếp trà sương sớm",
                      image: "/images/temple_bac_bo.jpg",
                      quote:
                        "“Chè ngon nước ngát hương đưa, giọt sương đầu sớm hiên chùa lắng tâm.”",
                      tradition:
                        "Người Bắc Bộ xưa giữ nếp sống thong thả bên chén trà mộc, khép vạt áo trước hiên đình làng. Từng ngụm trà nóng không chỉ làm ấm thân tâm giữa tiết trời se lạnh mà còn là dịp để gác lại những lao xao chợ đời.",
                      philosophy:
                        "Sự thâm trầm, trang nhã và chừng mực trong nếp sống giúp người Tràng An giữ được tâm thế an định, nhu hòa trước bao biến thiên của lịch sử.",
                    })
                  }
                  className="text-xs font-semibold text-[#9e3b2e] hover:text-[#7f2c22] flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiêm nghiệm lối Bắc</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>

            {/* Card 2: Trung Bộ */}
            <Card className="p-6 rounded-2xl flex flex-col justify-between hover:border-[#dfc3af] transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8c7b74] mb-3">
                  <Badge variant="terracotta" className="text-[10px]">
                    Xứ Cố Đô
                  </Badge>
                  <Feather className="w-4 h-4 text-[#9e3b2e]" />
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                  Trung Bộ: Sâu lắng hồn sông núi
                </h3>
                <p className="text-xs sm:text-sm text-[#72625b] leading-relaxed">
                  Khí chất dung hòa qua ngọn nến hương trầm, sự nhẫn nại và trang
                  nhã hiển hiện nơi gian bếp nhỏ đón gió bão mặn mòi.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#f4e8dc]">
                <button
                  onClick={() =>
                    setSelectedRegionInfo({
                      region: "Trung Bộ",
                      sub: "Xứ Cố Đô trầm mặc sông Hương",
                      title: "Khí chất kiên định & nén trầm ấm áp",
                      image: "/images/hue_trung_bo.jpg",
                      quote:
                        "“Gió dập sóng dồi lòng chẳng chuyển, nén hương trầm ấm tỏa muôn phương.”",
                      tradition:
                        "Đất miền Trung nắng rát mưa dầm tôi luyện nên nếp người nhẫn nại và sâu sắc. Mùi hương bài, khói trầm lan tỏa nơi gian nhà rường cổ kính là chiếc cầu nối thiêng liêng với tổ tiên.",
                      philosophy:
                        "Biến khắc nghiệt thành chiều sâu nội tâm; tĩnh tại và kiên cường vượt qua mọi bão giông cuộc đời.",
                    })
                  }
                  className="text-xs font-semibold text-[#9e3b2e] hover:text-[#7f2c22] flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiêm nghiệm lối Trung</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>

            {/* Card 3: Nam Bộ */}
            <Card className="p-6 rounded-2xl flex flex-col justify-between hover:border-[#dfc3af] transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8c7b74] mb-3">
                  <Badge variant="terracotta" className="text-[10px]">
                    Miền Phù Sa
                  </Badge>
                  <Waves className="w-4 h-4 text-[#9e3b2e]" />
                </div>
                <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                  Nam Bộ: Khoáng đạt dòng nước lớn
                </h3>
                <p className="text-xs sm:text-sm text-[#72625b] leading-relaxed">
                  Tấm lòng rộng mở thuận theo con nước ròng nước lớn, tin vào sự
                  vô tư đất trời ban tặng cho người biết thảo thơm.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#f4e8dc]">
                <button
                  onClick={() =>
                    setSelectedRegionInfo({
                      region: "Nam Bộ",
                      sub: "Miền Đất Chín Rồng cây trái trù phú",
                      title: "Khoáng đạt dòng nước lớn & nếp sống thảo thơm",
                      image: "/images/mekong_nam_bo.jpg",
                      quote:
                        "“Nước lớn phù sa bồi bãi bồi, thảo thơm đi trước đón duyên lành.”",
                      tradition:
                        "Người phương Nam sống thuận tự nhiên theo con nước lớn nước ròng. Tinh thần cởi mở, hiếu khách và sẵn sàng san sẻ ngọt bùi tạo nên một không gian văn hóa chan hòa, nhẹ nhõm.",
                      philosophy:
                        "Khoáng đạt buông bỏ chấp niệm; tin tưởng vào sự hào phóng của đất trời và lòng người.",
                    })
                  }
                  className="text-xs font-semibold text-[#9e3b2e] hover:text-[#7f2c22] flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiêm nghiệm lối Nam</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          </div>
        </section>

        {/* Section 2: Tự thân tu tập */}
        <section className="mb-16">
          <Card className="p-6 sm:p-8 bg-[#fdf5ed]/60 border-[#eedcd0] rounded-3xl">
            <div className="mb-6">
              <div className="text-xs font-bold text-[#9e3b2e] uppercase tracking-wider mb-1">
                Tự thân tu tập
              </div>
              <h2 className="text-2xl sm:text-3xl font-['Noto_Serif',serif] font-bold text-[#2a2220]">
                Không Gian Thực Hành Tĩnh Niệm
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#73635d]">
                Dành chút thời gian trong ngày để soi tỏ bản thân qua những nghi
                thức dân gian được giản lược trang trọng.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Practice 1 */}
              <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#eddcd0] flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#faede2] text-[#9e3b2e] flex items-center justify-center mb-4">
                    <Scroll className="w-5 h-5" />
                  </div>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                    Gieo quẻ chữ Nôm
                  </h3>
                  <p className="text-xs sm:text-sm text-[#72625b] leading-relaxed">
                    Khám phá một chữ Hán-Nôm đại diện cho tâm niệm ngày, gửi gắm
                    bài học đúc kết từ cổ nhân qua từng nét mực thảo.
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-[#fbf5ee] border-[#ebdcd0] text-xs font-semibold gap-1.5"
                  >
                    <span>✎ Rút chữ chiêm nghiệm</span>
                  </Button>
                </div>
              </div>

              {/* Practice 2 */}
              <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#eddcd0] flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#faede2] text-[#9e3b2e] flex items-center justify-center mb-4">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                    Thỉnh lời chúc bình an
                  </h3>
                  <p className="text-xs sm:text-sm text-[#72625b] leading-relaxed">
                    Tâm gửi một niệm lành đến người thân thương hoặc chính mình,
                    neo giữ điều thiện lành bền bỉ qua từng biến động.
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-[#fbf5ee] border-[#ebdcd0] text-xs font-semibold gap-1.5"
                  >
                    <span>✦ Gửi lời nguyện an</span>
                  </Button>
                </div>
              </div>

              {/* Practice 3 */}
              <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#eddcd0] flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#faede2] text-[#9e3b2e] flex items-center justify-center mb-4">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h3 className="font-['Noto_Serif',serif] font-bold text-lg text-[#2a2220] mb-2">
                    Chuông tỉnh thức 5 phút
                  </h3>
                  <p className="text-xs sm:text-sm text-[#72625b] leading-relaxed">
                    Âm ba thanh tịnh chuông đồng lắng quẻ kéo tâm trí bạn trở về
                    ngay trong hiện tại, giải phóng áp lực tích tụ.
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-[#fbf5ee] border-[#ebdcd0] text-xs font-semibold gap-1.5"
                  >
                    <span>🔔 Thỉnh chuông lắng đọng</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 3: Pottery artisan storytelling card */}
        <Card className="rounded-3xl p-6 sm:p-8 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#fffcf8]">
          {/* Photo */}
          <div className="md:col-span-4 relative rounded-2xl overflow-hidden shadow-xs">
            <img
              src="/images/pottery_artisan.jpg"
              alt="Làng nghề gốm mộc"
              className="w-full h-64 sm:h-72 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-[11px] font-semibold">
              LÀNG NGHỀ GỐM MỘC • ĐẤT SÉT & BÀN TAY
            </div>
          </div>

          {/* Quote content */}
          <div className="md:col-span-8 space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#9e3b2e] flex items-center gap-1.5">
              <span>✦ Triết lý nếp đất</span>
            </div>

            <blockquote className="font-['Noto_Serif',serif] font-bold text-xl sm:text-2xl text-[#2a211e] leading-snug">
              “Chiếc bình gốm trước khi vững vàng trước bão gió đều phải trải
              qua nhiệt độ hầm hập của lò nung. Tâm trí người cũng vậy, những lúc
              thấy mình chênh vênh nhất lại là lúc đất mềm đang tự định hình dáng
              hình thanh sạch.”
            </blockquote>

            <div className="pt-2">
              <div className="font-bold text-sm text-[#9e3b2e]">
                Lời người thợ gốm
              </div>
              <div className="text-xs text-[#7e6d66]">
                Lắng nghe từ thềm gốm ven sông Đáy
              </div>
            </div>
          </div>
        </Card>

        {/* Regional Culture Modal */}
        {selectedRegionInfo && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full bg-[#fdfaf5] border border-[#ebd6c5] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedRegionInfo(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#faece1] text-[#9e3b2e] hover:bg-[#9e3b2e] hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                title="Đóng cửa sổ"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="terracotta" className="text-xs uppercase font-bold tracking-wider">
                  {selectedRegionInfo.sub}
                </Badge>
              </div>

              <h2 className="font-['Noto_Serif',serif] font-bold text-2xl sm:text-[26px] text-[#2a211e] leading-snug mb-4">
                {selectedRegionInfo.title}
              </h2>

              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden mb-6 h-56 sm:h-64 shadow-xs border border-[#ecd9cb]">
                <img
                  src={selectedRegionInfo.image}
                  alt={selectedRegionInfo.region}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white font-['Noto_Serif',serif] italic text-sm">
                  {selectedRegionInfo.quote}
                </div>
              </div>

              {/* Content columns */}
              <div className="space-y-4 text-xs sm:text-sm text-[#66544d] leading-relaxed">
                <div className="p-4 rounded-2xl bg-[#faf3ec] border border-[#ebd8c9]">
                  <h4 className="font-bold text-[#9e3b2e] uppercase text-[11px] tracking-wider mb-1">
                    Tập tục & Nếp sống dân gian
                  </h4>
                  <p>{selectedRegionInfo.tradition}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf3ec] border border-[#ebd8c9]">
                  <h4 className="font-bold text-[#9e3b2e] uppercase text-[11px] tracking-wider mb-1">
                    Triết lý soi tỏ tâm thức
                  </h4>
                  <p>{selectedRegionInfo.philosophy}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0ded2] flex justify-end">
                <Button
                  variant="default"
                  size="pill"
                  onClick={() => setSelectedRegionInfo(null)}
                  className="gap-1.5"
                >
                  <span>Khép lại chiêm nghiệm</span>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};
