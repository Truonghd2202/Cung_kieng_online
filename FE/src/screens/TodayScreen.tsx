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

const TOPIC_NAMES: Record<string, string> = {
  cadao: "Ca dao & Tục ngữ",
  xinxam: "Xin xăm & Gieo quẻ",
  bamien: "Văn hóa Ba Miền",
  nghile: "Cẩm nang nghi lễ",
  trian: "Góc tri ân & Tĩnh thức",
};

interface TodayScreenProps {
  isCheckedIn?: boolean;
  isActionDone?: boolean;
  mood?: MoodKey;
  onSelectMoodClick: () => void;
  onViewSignalDetails?: () => void;
  selectedTopics?: string[];
}

export const TodayScreen: React.FC<TodayScreenProps> = ({
  isCheckedIn = false,
  isActionDone = false,
  mood = "Chênh vênh",
  onSelectMoodClick,
  onViewSignalDetails,
  selectedTopics,
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
    <div className="screen-shell">
      <main className="page-container max-w-7xl">
        {/* Top Editorial Greeting & Date Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-5 border-b border-line/70">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-semibold mb-1">
              <Flower2 className="w-3.5 h-3.5" />
              <span>Tiết Khí An Lành • Khởi Đầu Ngày Mới</span>
            </div>
            <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">
              Chào bạn, chúc một ngày thong dong & tĩnh tại
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {isCheckedIn ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent border border-accent/30 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã ghi nhận nhịp tâm: <strong>{mood}</strong></span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-line text-muted">
                <span className="w-2 h-2 rounded-full bg-action animate-pulse" />
                <span>Chưa check-in hôm nay</span>
              </span>
            )}
          </div>
        </div>

        {/* Central Mindfulness Sanctuary (Single Focal Point - Editorial Layout) */}
        {isCheckedIn ? (
          <div className="my-8 py-10 px-6 sm:px-12 rounded-2xl bg-surface/80 border border-line/80 shadow-xs text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Tín hiệu chiêm nghiệm hôm nay
              </span>

              {/* Calligraphic Poem Scroll in Center */}
              <blockquote className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-ink leading-relaxed italic py-2">
                “{signal.poem.line1}
                <br />
                {signal.poem.line2}”
              </blockquote>

              <p className="text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
                Sự {mood.toLowerCase()} vốn chỉ là khoảng lặng giữa hai nhịp bước. Khi nhận biết rõ xao động trong tâm trí, bạn đã bắt đầu tiến dần về sự an ổn.
              </p>

              {/* Micro Action */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-accent-soft/60 border border-accent/20 text-xs sm:text-sm text-ink mx-auto">
                <span className={isActionDone ? "text-success font-bold" : "text-accent"}>
                  {isActionDone ? "✔" : "✦"}
                </span>
                <span>
                  Hành động nuôi tâm: <strong className="text-accent">{signal.action.title}</strong> ({signal.action.duration})
                </span>
              </div>

              {/* Clear Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
                <Button
                  variant="default"
                  size="default"
                  onClick={onViewSignalDetails}
                  className="gap-2 shadow-sm font-semibold px-6 py-2.5 cursor-pointer"
                >
                  <span>Xem lại tín hiệu trọn vẹn</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={onSelectMoodClick}
                  className="gap-1.5 font-medium border-line text-muted hover:text-accent cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Check-in lại nếu cảm xúc thay đổi</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-10 py-12 px-6 sm:px-12 rounded-2xl bg-surface/60 border border-line/70 text-center max-w-3xl mx-auto space-y-6">
            <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center text-accent mx-auto">
              <Flower2 className="w-6 h-6" />
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink leading-snug">
                Hôm nay tâm bạn đang nương tựa nơi đâu?
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Cuộc sống hối hả dễ làm ta quên tự hỏi lòng mình đang cảm thấy thế nào. Dành ít phút lắng lòng nhận diện cảm xúc để đón nhận quẻ tín hiệu và lời nhắn an lành cho hôm nay.
              </p>
            </div>

            {/* Single Focal Red CTA */}
            <div className="pt-2">
              <Button
                variant="default"
                size="lg"
                onClick={onSelectMoodClick}
                className="gap-2.5 px-8 py-3.5 font-semibold text-sm sm:text-base shadow-md cursor-pointer mx-auto"
              >
                <Sparkles className="w-4 h-4" />
                <span>Lắng lòng check-in ngày mới</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="mt-2 text-xs text-muted/70 italic">Chỉ mất khoảng 1-2 phút • Hoàn toàn riêng tư</div>
            </div>
          </div>
        )}

        {/* Personalization Topics Indicator if selected */}
        {selectedTopics && selectedTopics.length > 0 && (
          <div className="mb-6 p-4 rounded-panel bg-surface border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-muted shadow-2xs">
            <div className="flex items-center gap-2">
              <Badge variant="terracotta" className="text-xs font-semibold">
                Cá nhân hóa
              </Badge>
              <span>
                Đang mở tín hiệu theo <strong>{selectedTopics.length} chủ đề</strong> bạn yêu thích:{" "}
                <strong className="text-accent">
                  {selectedTopics.map((id) => TOPIC_NAMES[id] || id).join(", ")}
                </strong>
              </span>
            </div>
            <span className="text-xs text-muted italic">
              Có thể đổi tại mục Trải nghiệm
            </span>
          </div>
        )}

        {/* Section 1: Góc nhìn địa linh */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-action"></span>
                Góc nhìn địa linh
              </div>
              <h2 className="section-title text-2xl sm:text-3xl">
                Văn hóa & Tập tục Ba Miền
              </h2>
            </div>
            <div className="text-xs text-muted max-w-md leading-relaxed md:text-right">
              Mỗi vùng đất là một nếp sống an định riêng biệt, nâng niu tâm thức
              người Việt qua từng biến chuyển thời gian.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Bắc Bộ */}
            <div className="group flex flex-col justify-between rounded-xl bg-surface/70 border border-line overflow-hidden hover:border-gold/60 transition-colors">
              <div className="relative h-44 overflow-hidden bg-surface">
                <img
                  src="/images/temple_bac_bo.jpg"
                  alt="Mái đình Bắc Bộ"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/90 uppercase tracking-wider">
                  Đất Kinh Kỳ • Bắc Bộ
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-ink mb-2">
                    Trầm mặc mái ngói phong rêu
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Tập tục giữ ấm chén trà mộc, khép vạt áo trước hiên chùa làng để lắng lại những lao xao giữa sương khói hồ thu.
                  </p>
                </div>
                <div className="pt-4 mt-5 border-t border-line/70">
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
                    className="text-xs font-semibold text-accent hover:text-accent flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Chiêm nghiệm lối Bắc</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Trung Bộ */}
            <div className="group flex flex-col justify-between rounded-xl bg-surface/70 border border-line overflow-hidden hover:border-gold/60 transition-colors">
              <div className="relative h-44 overflow-hidden bg-surface">
                <img
                  src="/images/hue_trung_bo.jpg"
                  alt="Lăng tẩm Cố Đô Huế"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/90 uppercase tracking-wider">
                  Xứ Cố Đô • Trung Bộ
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-ink mb-2">
                    Sâu lắng hồn thiêng sông núi
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Khí chất dung hòa qua ngọn nến hương trầm, sự nhẫn nại và trang nhã hiển hiện nơi gian nhà rường đón gió biển mặn mòi.
                  </p>
                </div>
                <div className="pt-4 mt-5 border-t border-line/70">
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
                    className="text-xs font-semibold text-accent hover:text-accent flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Chiêm nghiệm lối Trung</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Nam Bộ */}
            <div className="group flex flex-col justify-between rounded-xl bg-surface/70 border border-line overflow-hidden hover:border-gold/60 transition-colors">
              <div className="relative h-44 overflow-hidden bg-surface">
                <img
                  src="/images/mekong_nam_bo.jpg"
                  alt="Sông nước Cửu Long Nam Bộ"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/90 uppercase tracking-wider">
                  Miền Phù Sa • Nam Bộ
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-ink mb-2">
                    Khoáng đạt dòng nước lớn
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Tấm lòng rộng mở thuận theo con nước ròng nước lớn, tin vào sự vô tư đất trời ban tặng cho người biết thảo thơm.
                  </p>
                </div>
                <div className="pt-4 mt-5 border-t border-line/70">
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
                    className="text-xs font-semibold text-accent hover:text-accent flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Chiêm nghiệm lối Nam</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Tự thân tu tập */}
        <section className="mb-16">
          <Card className="py-8 border-0 border-y border-line bg-transparent rounded-none">
            <div className="mb-6">
              <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                Tự thân tu tập
              </div>
              <h2 className="section-title text-2xl sm:text-3xl">
                Không Gian Thực Hành Tĩnh Niệm
              </h2>
              <p className="mt-1 text-sm text-muted">
                Dành chút thời gian trong ngày để soi tỏ bản thân qua những nghi
                thức dân gian được giản lược trang trọng.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Practice 1 */}
              <div className="py-4 sm:pr-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface text-accent flex items-center justify-center mb-4">
                    <Scroll className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    Gieo quẻ chữ Nôm
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Khám phá một chữ Hán-Nôm đại diện cho tâm niệm ngày, gửi gắm
                    bài học đúc kết từ cổ nhân qua từng nét mực thảo.
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-surface border-line text-xs font-semibold gap-1.5"
                  >
                    <span>✎ Rút chữ chiêm nghiệm</span>
                  </Button>
                </div>
              </div>

              {/* Practice 2 */}
              <div className="py-4 sm:pr-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface text-accent flex items-center justify-center mb-4">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    Thỉnh lời chúc bình an
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Tâm gửi một niệm lành đến người thân thương hoặc chính mình,
                    neo giữ điều thiện lành bền bỉ qua từng biến động.
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-surface border-line text-xs font-semibold gap-1.5"
                  >
                    <span>✦ Gửi lời nguyện an</span>
                  </Button>
                </div>
              </div>

              {/* Practice 3 */}
              <div className="py-4 sm:pr-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface text-accent flex items-center justify-center mb-4">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    Chuông tỉnh thức 5 phút
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Âm ba thanh tịnh chuông đồng lắng quẻ kéo tâm trí bạn trở về
                    ngay trong hiện tại, giải phóng áp lực tích tụ.
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-surface border-line text-xs font-semibold gap-1.5"
                  >
                    <span>🔔 Thỉnh chuông lắng đọng</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 3: Pottery artisan storytelling card */}
        <Card className="rounded-card p-6 sm:p-8 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-surface">
          {/* Photo */}
          <div className="md:col-span-4 relative rounded-panel overflow-hidden shadow-xs">
            <img
              src="/images/pottery_artisan.jpg"
              alt="Làng nghề gốm mộc"
              className="w-full h-64 sm:h-72 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-xs font-semibold">
              LÀNG NGHỀ GỐM MỘC • ĐẤT SÉT & BÀN TAY
            </div>
          </div>

          {/* Quote content */}
          <div className="md:col-span-8 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <span>✦ Triết lý nếp đất</span>
            </div>

            <blockquote className="font-display font-bold text-xl sm:text-2xl text-ink leading-snug">
              “Chiếc bình gốm trước khi vững vàng trước bão gió đều phải trải
              qua nhiệt độ hầm hập của lò nung. Tâm trí người cũng vậy, những lúc
              thấy mình chênh vênh nhất lại là lúc đất mềm đang tự định hình dáng
              hình thanh sạch.”
            </blockquote>

            <div className="pt-2">
              <div className="font-bold text-sm text-accent">
                Lời người thợ gốm
              </div>
              <div className="text-xs text-muted">
                Lắng nghe từ thềm gốm ven sông Đáy
              </div>
            </div>
          </div>
        </Card>

        {/* Regional Culture Modal */}
        {selectedRegionInfo && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full bg-surface border border-line rounded-card p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedRegionInfo(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface text-accent hover:bg-action hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                title="Đóng cửa sổ"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="terracotta" className="text-xs uppercase font-bold tracking-wider">
                  {selectedRegionInfo.sub}
                </Badge>
              </div>

              <h2 className="section-title text-2xl sm:text-[26px] leading-snug mb-4">
                {selectedRegionInfo.title}
              </h2>

              {/* Photo */}
              <div className="relative rounded-panel overflow-hidden mb-6 h-56 sm:h-64 shadow-xs border border-line">
                <img
                  src={selectedRegionInfo.image}
                  alt={selectedRegionInfo.region}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white font-display italic text-sm">
                  {selectedRegionInfo.quote}
                </div>
              </div>

              {/* Content columns */}
              <div className="space-y-4 text-xs sm:text-sm text-ink leading-relaxed">
                <div className="p-4 rounded-panel bg-surface border border-line">
                  <h4 className="font-bold text-accent uppercase text-xs tracking-wider mb-1">
                    Tập tục & Nếp sống dân gian
                  </h4>
                  <p>{selectedRegionInfo.tradition}</p>
                </div>

                <div className="p-4 rounded-panel bg-surface border border-line">
                  <h4 className="font-bold text-accent uppercase text-xs tracking-wider mb-1">
                    Triết lý soi tỏ tâm thức
                  </h4>
                  <p>{selectedRegionInfo.philosophy}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line flex justify-end">
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
