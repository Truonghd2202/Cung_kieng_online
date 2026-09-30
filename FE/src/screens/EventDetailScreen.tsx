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
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { CalendarEventItem, getCalendarEventById } from "../data/calendarData";

interface EventDetailScreenProps {
  eventId?: string;
  onBackToCalendar: () => void;
  onGoToRituals?: () => void;
  onGoToHome?: () => void;
  onGoToExplore?: () => void;
}

type NotificationStatus = "idle" | "requesting" | "granted" | "denied" | "unsupported";

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({
  eventId = "le-soc-vong-ngay-ram",
  onBackToCalendar,
  onGoToRituals,
  onGoToHome,
  onGoToExplore,
}) => {
  // Lấy sự kiện chuẩn xác từ eventId được truyền từ màn 22
  const event = getCalendarEventById(eventId) || getCalendarEventById("le-soc-vong-ngay-ram")!;

  // Reminder widget state với đầy đủ các trạng thái quyền thông báo
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderOption, setReminderOption] = useState<"before1" | "exact" | "custom">(() => {
    try {
      const saved = localStorage.getItem(`tltl-reminder-opt-${event.id}`);
      return (saved as "before1" | "exact" | "custom") || "before1";
    } catch {
      return "before1";
    }
  });
  const [notificationStatus, setNotificationStatus] = useState<NotificationStatus>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") return "granted";
      if (Notification.permission === "denied") return "denied";
    }
    return "idle";
  });
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Xử lý bật nhắc nhở và xin cấp quyền thông báo thực tế
  const handleToggleReminderSwitch = async () => {
    if (reminderEnabled) {
      setReminderEnabled(false);
      try {
        localStorage.setItem(`tltl-reminder-enabled-${event.id}`, "false");
      } catch {}
      setStatusMessage("");
      return;
    }

    setReminderEnabled(true);
    try {
      localStorage.setItem(`tltl-reminder-enabled-${event.id}`, "true");
    } catch {}
    await handleRequestNotificationPermission();
  };

  const handleSelectReminderOption = (opt: "before1" | "exact" | "custom") => {
    setReminderOption(opt);
    try {
      localStorage.setItem(`tltl-reminder-opt-${event.id}`, opt);
    } catch {}
  };

  const handleSendTestNotification = () => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("Thích Cúng Kiếng • Nhắc lịch văn hóa", {
          body: `[Thông báo thử nghiệm] Bạn đã thiết lập lời nhắc cho: ${event.title}.`,
          icon: "/logo.png",
        });
        setTestNotificationSent(true);
        setTimeout(() => setTestNotificationSent(false), 4000);
      } catch {
        // Fallback alert if browser blocks programmatic notifications
      }
    }
  };

  const handleRequestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotificationStatus("unsupported");
      setStatusMessage(
        "Trình duyệt hiện tại chưa hỗ trợ Web Notification hoặc bị hạn chế bởi chính sách bảo mật."
      );
      return;
    }

    if (Notification.permission === "granted") {
      setNotificationStatus("granted");
      setStatusMessage("Đã cấp quyền; chức năng nhắc tự động chưa hoạt động trong bản demo.");
      return;
    }

    if (Notification.permission === "denied") {
      setNotificationStatus("denied");
      setStatusMessage(
        "Quyền thông báo đang bị chặn. Vui lòng vào Cài đặt trình duyệt > Quyền trang web để bật quyền thông báo."
      );
      return;
    }

    try {
      setNotificationStatus("requesting");
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationStatus("granted");
        setStatusMessage("Đã cấp quyền thành công; chức năng nhắc tự động chưa hoạt động trong bản demo.");
      } else {
        setNotificationStatus("denied");
        setStatusMessage(
          "Bạn chưa cấp quyền thông báo. Thiết bị sẽ không thể gửi lời nhắc tự động."
        );
      }
    } catch {
      setNotificationStatus("denied");
      setStatusMessage("Không thể kích hoạt quyền thông báo trên trình duyệt này.");
    }
  };

  // Tính toán nhãn ngày giờ hiển thị chính xác theo sự kiện
  const isRam = event.id === "le-soc-vong-ngay-ram";
  const beforeDayText = isRam ? "Trước 1 ngày (20:00 tối ngày 16/10)" : "Trước ngày diễn ra 1 ngày";
  const exactDayText = isRam ? "Đúng ngày Rằm (07:00 sáng ngày 17/10)" : "Đúng sáng ngày diễn ra";

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

            {/* Section 5: Nguồn tư liệu kiểm chứng */}
            <Card className="p-5 sm:p-6 rounded-card bg-surface border border-line text-xs text-muted leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-ink">Nguồn tư liệu đã kiểm chứng:</strong>{" "}
                {event.verifiedSource ||
                  "Tư liệu khảo cứu dựa trên nếp sống văn hóa dân gian Việt Nam và tài liệu nghiên cứu phong tục tập quán truyền thống."}
                <div className="text-xs text-muted mt-1 italic">
                  * Nền tảng chỉ đăng tải các tư liệu đã xác minh niên đại, đối chiếu lịch âm thiên văn học và tuyệt đối không phục vụ mục đích bói toán dị đoan.
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column (4 cols): Sticky Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            {/* Widget 1: Nhắc tôi dịp này với đầy đủ trạng thái quyền */}
            <Card className="p-6 rounded-card bg-surface border border-line shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-line">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-accent" />
                  <h3 className="font-display font-bold text-base text-ink">
                    Nhắc tôi dịp này
                  </h3>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={handleToggleReminderSwitch}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    reminderEnabled ? "bg-action" : "bg-surface-soft"
                  }`}
                  title={reminderEnabled ? "Đang bật nhắc lịch" : "Đang tắt nhắc lịch"}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-surface transition-transform ${
                      reminderEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <p className="text-sm text-muted leading-relaxed mb-4">
                Nhận thông báo nhắc nhở nhẹ nhàng để chuẩn bị nếp nhà thảnh thơi.
              </p>

              {reminderEnabled && (
                <>
                  <div className="space-y-2.5 mb-4 text-xs text-ink">
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface/60 border border-line">
                      <input
                        type="radio"
                        name="reminder"
                        checked={reminderOption === "before1"}
                        onChange={() => handleSelectReminderOption("before1")}
                        className="text-accent focus:ring-accent"
                      />
                      <span>{beforeDayText}</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface/60 border border-line">
                      <input
                        type="radio"
                        name="reminder"
                        checked={reminderOption === "exact"}
                        onChange={() => handleSelectReminderOption("exact")}
                        className="text-accent focus:ring-accent"
                      />
                      <span>{exactDayText}</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface/60 border border-line">
                      <input
                        type="radio"
                        name="reminder"
                        checked={reminderOption === "custom"}
                        onChange={() => handleSelectReminderOption("custom")}
                        className="text-accent focus:ring-accent"
                      />
                      <span>Tùy chỉnh giờ nhắc riêng</span>
                    </label>
                  </div>

                  {/* Status Banner based on Notification Permission */}
                  {notificationStatus === "denied" && (
                    <div className="p-3 mb-4 rounded-xl bg-gold-soft border border-gold/40 text-gold text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-gold mt-0.5" />
                      <div>
                        <p className="font-bold">Chưa cấp quyền thông báo</p>
                        <p className="text-sm text-gold mt-0.5 leading-relaxed">
                          Trình duyệt đang chặn thông báo. Vui lòng cho phép quyền thông báo trong
                          Cài đặt trình duyệt để nhận lời nhắc đúng hẹn.
                        </p>
                        <button
                          onClick={handleRequestNotificationPermission}
                          className="mt-1.5 text-xs font-semibold text-accent underline hover:text-accent cursor-pointer"
                        >
                          Thử xin quyền lại
                        </button>
                      </div>
                    </div>
                  )}

                  {notificationStatus === "unsupported" && (
                    <div className="p-3 mb-4 rounded-xl bg-surface-soft border border-line text-muted text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-muted mt-0.5" />
                      <div>
                        <p className="font-semibold">Môi trường chưa hỗ trợ thông báo Web Notification</p>
                        <p className="text-sm mt-0.5 leading-relaxed">
                          Bạn có thể tự lưu ngày này vào ứng dụng Lịch trên điện thoại hoặc máy tính.
                        </p>
                      </div>
                    </div>
                  )}

                  {notificationStatus === "granted" && (
                    <div className="p-3.5 mb-4 rounded-panel bg-gold-soft/70 border border-gold/40 text-ink text-xs flex flex-col gap-2.5 shadow-2xs">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-success mt-0.5" />
                        <div>
                          <p className="font-bold text-ink">Đã cấp quyền thông báo trình duyệt</p>
                          <p className="text-sm text-ink mt-0.5 leading-relaxed">
                            Quyền trình duyệt đã được thiết lập. <strong>Lưu ý:</strong> Chức năng gửi thông báo nhắc tự động nền theo lịch hẹn chưa hoạt động trong bản demo (tính năng máy chủ thông báo định kỳ: <strong>Sắp ra mắt khi kết nối Backend</strong>).
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gold/40 flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs text-accent font-medium">Kiểm tra thông báo:</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSendTestNotification}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg border-line bg-surface text-accent hover:bg-surface transition-colors cursor-pointer"
                        >
                          Gửi thông báo thử nghiệm
                        </Button>
                      </div>

                      {testNotificationSent && (
                        <div className="text-xs text-success font-semibold flex items-center gap-1">
                          ✓ Đã kích hoạt 1 thông báo thử nghiệm trên màn hình của bạn.
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    variant="default"
                    size="default"
                    onClick={handleRequestNotificationPermission}
                    disabled={notificationStatus === "requesting"}
                    className="w-full font-semibold gap-2 shadow-xs text-xs py-2.5 bg-action hover:bg-action text-white cursor-pointer"
                  >
                    <Bell className="w-4 h-4" />
                    <span>
                      {notificationStatus === "granted"
                        ? "Đã cấp quyền • Đang chờ kết nối Backend"
                        : notificationStatus === "denied"
                        ? "Kiểm tra lại quyền thông báo"
                        : "Kích hoạt quyền thông báo trình duyệt"}
                    </span>
                  </Button>
                </>
              )}
            </Card>

            {/* Widget 2: Cẩm nang nghi lễ Link */}
            {onGoToRituals && (
              <Card className="p-6 rounded-card bg-surface-soft border border-line shadow-xs">
                <div className="text-xs uppercase font-bold tracking-wider text-accent mb-1">
                  CẨM NANG NGHI LỄ
                </div>

                <h4 className="font-display font-bold text-base text-ink mb-2 leading-snug">
                  Bạn muốn chuẩn bị nghi thức ngày Rằm tinh gọn, không rườm rà?
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

            {/* Widget 3: Lưu vào sự kiện yêu thích */}
            <Card
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-4 rounded-panel bg-surface border border-line hover:border-line transition-all cursor-pointer flex items-center justify-between shadow-2xs group"
            >
              <div className="flex items-center gap-2.5 text-xs text-ink">
                <Bookmark
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-accent text-accent" : "text-muted"
                  }`}
                />
                <span className="font-semibold group-hover:text-accent transition-colors">
                  {isFavorite ? "Đã lưu ngày này vào danh mục yêu thích" : "Lưu ngày này vào danh mục yêu thích"}
                </span>
              </div>
              <span className="text-xs font-sans tabular-nums text-muted">
                {isFavorite ? "✓ Đã lưu" : "Lưu"}
              </span>
            </Card>

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
