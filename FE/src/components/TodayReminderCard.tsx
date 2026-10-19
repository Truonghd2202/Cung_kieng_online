import { Button } from "./ui/button";
import { useReminderOverview } from "../hooks/useReminderOverview";

interface TodayReminderCardProps {
  email?: string;
  onOpenReminders: () => void;
}

export function TodayReminderCard({
  email,
  onOpenReminders,
}: TodayReminderCardProps) {
  const {
    upcoming,
    loading,
    loadError,
    retry,
  } = useReminderOverview(email);

  // Today chỉ giới thiệu các ngày gần nhất trong một tuần.
  const near = upcoming.filter(
    (item) => item.daysAway <= 7
  );

  if (loading || loadError) {
    return (
      <section
        aria-label="Những ngày bạn muốn nhớ"
        className="mb-6 rounded-card border border-line bg-surface p-5"
      >
        <h2 className="font-display text-xl font-bold text-ink">
          Những ngày bạn muốn nhớ
        </h2>

        {loading ? (
          <p role="status" className="mt-3 text-sm text-muted">
            Đang tải lịch tưởng niệm…
          </p>
        ) : (
          <div role="alert" className="mt-3">
            <p className="text-sm text-muted">
              Chưa tải được lịch tưởng niệm từ tài khoản.
              Danh sách hiện chưa được xác nhận đầy đủ.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-3"
              onClick={retry}
            >
              Thử tải lại
            </Button>
          </div>
        )}
      </section>
    );
  }

  if (near.length === 0) return null;

  return (
    <section
      aria-label="Những ngày bạn muốn nhớ"
      className="mb-6 rounded-card border border-line bg-surface p-5"
    >
      <h2 className="font-display text-xl font-bold text-ink">
        Những ngày bạn muốn nhớ
      </h2>

      <ul className="mt-3 space-y-3">
        {near.slice(0, 3).map((item) => (
          <li key={item.id}>
            <p className="font-semibold text-ink">
              {item.title}
            </p>
            <p className="text-sm text-muted">
              {item.date.toLocaleDateString("vi-VN")} ·{" "}
              {item.daysAway === 0
                ? "Hôm nay"
                : `Còn ${item.daysAway} ngày`}
            </p>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={onOpenReminders}
      >
        {near.length > 3
          ? `Xem tất cả ${near.length} lời nhắc sắp tới`
          : "Xem và quản lý nhắc lịch"}
      </Button>
    </section>
  );
}
