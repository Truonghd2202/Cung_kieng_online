import React from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Sparkles,
  Bell,
  Clock,
  Compass,
  Flower2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { getCalendarEventById } from "../data/calendarData";
import { DetailNotFound } from "../components/DetailNotFound";

interface EventDetailScreenProps {
  eventId?: string;
  onBackToCalendar: () => void;
  onGoToRituals?: () => void;
  onGoToHome?: () => void;
  onGoToExplore?: () => void;
}

const EventDetailContent: React.FC<EventDetailScreenProps> = ({
  eventId = "le-soc-vong-ngay-ram",
  onBackToCalendar,
  onGoToRituals,
  onGoToHome,
  onGoToExplore,
}) => {
  // Lấy sự kiện chuẩn xác từ eventId được truyền từ màn 22
  const event = getCalendarEventById(eventId)!;

  const eventDate = new Date(
    event.year,
    event.month - 1,
    event.day
  );

  const eventDateLabel = eventDate.toLocaleDateString(
    "vi-VN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const isPastEvent = eventDate < startOfToday;

  return (
    <div className="screen-shell">
      <main className="page-container max-w-6xl">
        {/* Top Breadcrumb & Back Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToHome}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Hôm nay
            </button>
            <span>/</span>
            <button
              onClick={onBackToCalendar}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Lịch văn hóa
            </button>
            <span>/</span>
            <span className="text-accent font-semibold truncate max-w-[200px] sm:max-w-xs">
              Chi tiết sự kiện ({event.title})
            </span>
          </div>

          <button
            onClick={onBackToCalendar}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-accent transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại lịch văn hóa</span>
          </button>
        </div>

        {/* Badges Strip */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge
            variant="terracotta"
            className="text-xs font-semibold px-2.5 py-0.5 uppercase bg-surface text-accent border-line"
          >
            {event.typeLabel.toUpperCase()}
          </Badge>

          <Badge
            variant="outline"
            className="text-xs font-semibold px-2.5 py-0.5 text-muted border-line"
          >
            {event.region.toUpperCase()}
          </Badge>

          {event.badge && (
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-gold-soft text-gold border-gold/40"
            >
              {event.badge}
            </Badge>
          )}

          <span className="text-xs text-muted">
            • Tư liệu văn hóa đã kiểm chứng
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="mb-6">
          <h1 className="page-title mb-3">
            {event.title}
          </h1>

          <p className="mb-3 text-base text-accent font-medium">
            {eventDateLabel}
          </p>

          {isPastEvent && (
            <p className="mb-5 rounded-xl border border-line bg-surface p-4 text-sm text-muted leading-relaxed">
              Đây là thông tin của một ngày đã qua.
              Nội dung được giữ để tham khảo văn hóa.
            </p>
          )}

          <p className="text-sm sm:text-base text-ink leading-relaxed max-w-4xl">
            {event.shortDesc}
          </p>
        </div>

        {/* 3 Meta Info Strip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          <div className="p-4 rounded-panel bg-surface border border-line flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-accent shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-muted">
                Thời điểm diễn ra
              </div>
              <div className="font-semibold text-xs sm:text-sm text-ink">
                {event.timing || event.lunarDate}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-panel bg-surface border border-line flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-accent shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-muted">
                Phạm vi lưu truyền
              </div>
              <div className="font-semibold text-xs sm:text-sm text-ink">
                {event.scope || event.region}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-panel bg-surface border border-line flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-accent shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-muted">
                Ý nghĩa cốt lõi
              </div>
              <div className="font-semibold text-xs sm:text-sm text-ink">
                {event.coreMeaning || "Tri ân cội nguồn & Nuôi dưỡng tâm lành"}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Hero Image, Meaning, Customs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Hero Artwork Image Card */}
            <div className="rounded-card overflow-hidden bg-surface border border-line shadow-xs">
              <div className="relative aspect-16/9 w-full bg-surface overflow-hidden">
                <img
                  src={event.heroImage || "/images/ritual_ram.jpg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {event.heroCaption && (
                <div className="p-4 text-xs text-muted italic bg-surface border-t border-line flex items-start gap-2">
                  <span className="text-accent text-sm shrink-0">✤</span>
                  <span>{event.heroCaption}</span>
                </div>
              )}
            </div>

            {/* Section 1: Ý nghĩa văn hóa & Nếp nhà */}
            <Card className="py-6 border-0 border-t border-line rounded-none bg-transparent">
              <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1 flex items-center gap-1.5">
                <Flower2 className="w-3.5 h-3.5" />
                <span>Ý NGHĨA VĂN HÓA</span>
              </div>

              <h2 className="section-title text-xl sm:text-2xl mb-4">
                Chiều sâu nếp sống và đạo hiếu truyền đời
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-ink leading-relaxed">
                {event.culturalMeaning?.paragraphs ? (
                  event.culturalMeaning.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-2.5 first-letter:float-left first-letter:text-accent first-letter:leading-none"
                          : ""
                      }
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-2.5 first-letter:float-left first-letter:text-accent first-letter:leading-none">
                      Mỗi phong tục hay lễ hội trong văn hóa Việt đều là một nhịp cầu nối kết con người
                      với tổ tiên, với cộng đồng và với đất trời. Đó không phải là sự cầu xin may rủi
                      viển vông, mà là sự tự nhắc nhở bản thân về đạo lý làm người.
                    </p>
                    <p>
                      Dành thời gian tìm hiểu về ngày này giúp người trẻ thấu hiểu mạch nguồn văn hóa,
                      giữ được nếp nhà thanh tao mà không vướng bận vào những hủ tục mê tín tốn kém.
                    </p>
                  </>
                )}
              </div>

              {event.culturalMeaning?.quote && (
                <div className="mt-6 p-4 rounded-panel bg-surface border-l-4 border-accent text-sm italic font-display text-ink leading-relaxed">
                  “{event.culturalMeaning.quote}”
                </div>
              )}
            </Card>

            {/* Section 2: Thực hành phong tục */}
            {event.customs && event.customs.length > 0 && (
              <Card className="py-6 border-0 border-t border-line rounded-none bg-transparent">
                <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PHONG TỤC TRUYỀN THỐNG</span>
                </div>

                <h2 className="section-title text-xl sm:text-2xl mb-4">
                  Những việc thường làm giản dị mà trang trọng
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.customs.map((custom, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-panel bg-surface border border-line flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-ink mb-1 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-action" />
                          <span>{custom.title}</span>
                        </h4>
                        <p className="text-base text-ink leading-loose">{custom.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Section 3: Gợi ý cho người trẻ */}
            {event.youthActions && event.youthActions.length > 0 && (
              <Card className="py-6 border-0 border-t border-line rounded-none bg-transparent">
                <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>NGƯỜI TRẺ THỰC HÀNH</span>
                </div>

                <h2 className="section-title text-xl sm:text-2xl mb-2">
                  3 bước gắn kết nếp xưa cho người bận rộn
                </h2>

                <div className="space-y-3 mt-4">
                  {event.youthActions.map((action) => (
                    <div
                      key={action.step}
                      className="p-4 rounded-panel bg-surface border border-line flex items-start gap-3.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-action text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {action.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-ink mb-0.5">
                          {action.title}
                        </h4>
                        <p className="text-sm text-ink leading-relaxed">{action.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Section 4: Sắc thái văn hóa vùng miền */}
            {event.regionalNuances && (
              <Card className="py-6 border-0 border-t border-line rounded-none bg-transparent">
                <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>SẮC THÁI VĂN HÓA</span>
                </div>

                <h2 className="section-title text-xl sm:text-2xl mb-4">
                  Lưu ý khác biệt giữa gia đình và vùng miền
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
                  <div className="p-3.5 rounded-panel bg-surface border border-line">
                    <div className="font-bold text-xs uppercase text-accent mb-1">
                      Miền Bắc
                    </div>
                    <p className="text-sm text-ink leading-relaxed">
                      {event.regionalNuances.bac}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-panel bg-surface border border-line">
                    <div className="font-bold text-xs uppercase text-accent mb-1">
                      Miền Trung
                    </div>
                    <p className="text-sm text-ink leading-relaxed">
                      {event.regionalNuances.trung}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-panel bg-surface border border-line">
                    <div className="font-bold text-xs uppercase text-accent mb-1">
                      Miền Nam
                    </div>
                    <p className="text-sm text-ink leading-relaxed">
                      {event.regionalNuances.nam}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-panel bg-surface/70 border border-line text-xs text-muted leading-relaxed">
                  {event.regionalNuances.note}
                </div>
              </Card>
            )}

            {/* Nguồn tham khảo trong bản thử nghiệm */}
            <section
              aria-labelledby="event-sources-title"
              className="rounded-card border border-line bg-surface p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <BookOpen
                  aria-hidden="true"
                  className="w-5 h-5 text-accent shrink-0 mt-1"
                />

                <div className="min-w-0">
                  <h2
                    id="event-sources-title"
                    className="font-display font-semibold text-lg text-ink"
                  >
                    Nguồn tham khảo
                  </h2>

                  <p className="mt-2 text-sm text-ink leading-relaxed [overflow-wrap:anywhere]">
                    {event.verifiedSource?.trim() ||
                      "Sự kiện này chưa có thông tin nguồn tham khảo cụ thể."}
                  </p>

                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    Thông tin nguồn trong bản thử nghiệm cần được bổ sung
                    tác giả, thông tin xuất bản, đường dẫn hoặc trang trích
                    dẫn để đối chiếu trước khi phát hành chính thức.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (4 cols): Sticky Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            {/* Widget 1: Nhắc tôi dịp này với đầy đủ trạng thái quyền */}
            <Card className="p-6 rounded-card bg-surface border-line">
              <div className="flex items-center gap-2 mb-3">
                <Bell
                  className="w-5 h-5 text-accent"
                  aria-hidden="true"
                />
                <h2 className="font-display font-semibold text-lg text-ink">
                  Nhắc lịch tự động
                </h2>
              </div>

              <span className="inline-flex rounded-full bg-accent-soft px-3 py-1.5 text-sm text-accent mb-3">
                Chưa có trong bản thử nghiệm
              </span>

              <p className="text-sm text-muted leading-relaxed">
                Trang hiện chưa gửi lời nhắc tự động theo ngày.
                Bạn có thể xem thông tin sự kiện và tự đặt lời nhắc
                trong ứng dụng lịch đang sử dụng.
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={onBackToCalendar}
                className="w-full mt-5"
              >
                Xem lịch văn hóa
              </Button>
            </Card>

            {/* Widget 2: Cẩm nang nghi lễ Link */}
            {onGoToRituals && (
              <Card className="p-6 rounded-card bg-surface-soft border border-line shadow-xs">
                <div className="text-xs uppercase font-bold tracking-wider text-accent mb-1">
                  CẨM NANG NGHI LỄ
                </div>

                <h4 className="font-display font-bold text-base text-ink mb-2 leading-snug">
                  Tìm hướng dẫn phù hợp với dịp bạn quan tâm
                </h4>

                <p className="text-sm text-ink leading-relaxed mb-4">
                  Xem hướng dẫn cúng lễ mâm lễ chay mộc mạc, bài văn khấn truyền thống lưu truyền tinh gọn.
                </p>

                <Button
                  variant="outline"
                  size="default"
                  onClick={onGoToRituals}
                  className="w-full text-xs font-semibold bg-surface border-line text-accent hover:bg-surface gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>Xem Cẩm nang nghi lễ tại gia</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Card>
            )}

            {/* Widget 4: Classical Quote */}
            <div className="text-center p-4 rounded-panel bg-surface border border-line text-xs text-muted italic leading-relaxed">
              <div className="text-sm text-accent mb-1">✤</div>
              <p>“Cây có cội mới trổ cành xanh ngọn, nước có nguồn mới biển rộng sông sâu.”</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const EventDetailScreen: React.FC<
  EventDetailScreenProps
> = (props) => {
  const eventId = props.eventId ?? "le-soc-vong-ngay-ram";
  const event = getCalendarEventById(eventId);

  if (!event) {
    return (
      <DetailNotFound
        title="Không tìm thấy sự kiện"
        backLabel="Về Lịch văn hóa"
        onBack={props.onBackToCalendar}
      />
    );
  }

  return (
    <EventDetailContent
      {...props}
      eventId={eventId}
      key={eventId}
    />
  );
};
