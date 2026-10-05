import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import {
  GOOD_DAY_PURPOSES,
  lookupGoodDays,
  parseDateInput,
  validateGoodDayQuery,
  type GoodDayPurpose,
  type GoodDayQuery,
  type GoodDayResult,
} from "../data/goodDayLookup";

interface DayPlan {
  title: string;
  day: number;
  month: number;
  year: number;
}

interface GoodDayLookupPanelProps {
  onSaveDayToCalendar: (plan: DayPlan) => boolean;
  onGoToCalendar: () => void;
}

export function GoodDayLookupPanel({
  onSaveDayToCalendar,
  onGoToCalendar,
}: GoodDayLookupPanelProps) {
  const [purpose, setPurpose] = useState<GoodDayPurpose>("family");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchedQuery, setSearchedQuery] =
    useState<GoodDayQuery | null>(null);
  const [results, setResults] = useState<GoodDayResult[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const resetResults = () => {
    setSearchedQuery(null);
    setResults([]);
    setError("");
    setMessage("");
  };

  const search = (event: FormEvent) => {
    event.preventDefault();

    const query = { purpose, from, to };
    const validationError = validateGoodDayQuery(query);

    if (validationError) {
      resetResults();
      setError(validationError);
      return;
    }

    try {
      const next = lookupGoodDays(query);
      setResults(next);
      setSearchedQuery(query);
      setError("");
      setMessage("");
    } catch {
      resetResults();
      setError("Chưa tra cứu được dữ liệu. Bạn hãy thử lại.");
    }
  };

  const saveResult = (result: GoodDayResult) => {
    const date = parseDateInput(result.date);

    if (!date) {
      setError("Ngày trong kết quả chưa hợp lệ.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const saved = onSaveDayToCalendar({
        title: `[Mô phỏng] ${result.title}`,
        year: date.year,
        month: date.month,
        day: date.day,
      });

      if (!saved) {
        setError("Chưa lưu được vào lịch. Bạn hãy thử lại.");
        return;
      }

      setSavedIds((current) =>
        current.includes(result.id)
          ? current
          : [...current, result.id]
      );

      setMessage(
        "Đã lưu ghi chú mô phỏng vào lịch trên trình duyệt."
      );
    } catch {
      setError("Chưa lưu được vào lịch. Bạn hãy thử lại.");
    }
  };

  const inputClass =
    "mt-2 w-full min-w-0 rounded-control border " +
    "border-line bg-canvas px-4 py-3 text-base text-ink";

  return (
    <section
      aria-labelledby="good-day-lookup-title"
      className="mb-8 rounded-card border border-line bg-surface p-5 sm:p-8"
    >
      <h2
        id="good-day-lookup-title"
        className="font-display text-2xl font-semibold text-ink"
      >
        Tra cứu theo mục đích
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Đang dùng dữ liệu mô phỏng để thử giao diện. Kết quả không
        phải đánh giá ngày tốt. Chưa có nguồn và phương pháp tra cứu
        chính thức.
      </p>

      <form onSubmit={search} className="mt-6 space-y-5">
        <label className="block text-sm font-semibold text-ink">
          Mục đích
          <select
            value={purpose}
            onChange={(event) => {
              setPurpose(event.target.value as GoodDayPurpose);
              resetResults();
            }}
            className={inputClass}
          >
            {GOOD_DAY_PURPOSES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-ink">
            Từ ngày
            <input
              required
              type="date"
              min="1900-01-01"
              max="2100-12-31"
              value={from}
              onChange={(event) => {
                setFrom(event.target.value);
                resetResults();
              }}
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-semibold text-ink">
            Đến ngày
            <input
              required
              type="date"
              min="1900-01-01"
              max="2100-12-31"
              value={to}
              onChange={(event) => {
                setTo(event.target.value);
                resetResults();
              }}
              className={inputClass}
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit">Tra cứu dữ liệu mẫu</Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFrom("2026-10-01");
              setTo("2026-10-31");
              resetResults();
            }}
          >
            Điền khoảng ngày có mẫu
          </Button>
        </div>
      </form>

      {error && (
        <p role="alert" className="mt-4 text-sm text-danger">
          {error}
        </p>
      )}

      <p role="status" className="mt-4 text-sm text-ink">
        {message}
      </p>

      {searchedQuery && (
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-ink">Kết quả mô phỏng</h3>

          <p role="status" className="text-sm text-muted">
            {results.length === 0
              ? "Không có bản ghi mẫu trong khoảng ngày này. Điều đó không có nghĩa các ngày này không tốt."
              : `Có ${results.length} bản ghi mẫu.`}
          </p>

          {results.map((result) => (
            <article
              key={result.id}
              className="rounded-panel border border-line p-5"
            >
              <h4 className="font-semibold text-ink">{result.title}</h4>

              <p className="mt-2 text-sm text-ink">
                Ngày dương lịch: {result.date.split("-").reverse().join("/")}
              </p>

              <details className="mt-3">
                <summary className="cursor-pointer py-2 text-sm font-semibold text-accent">
                  Giải thích và nguồn
                </summary>

                <p className="text-sm leading-relaxed text-muted">
                  {result.explanation}
                </p>

                <p className="mt-2 text-xs text-muted">
                  Nguồn: {result.sourceLabel}
                </p>
              </details>

              <Button
                type="button"
                variant="outline"
                className="mt-4"
                disabled={savedIds.includes(result.id)}
                onClick={() => saveResult(result)}
              >
                {savedIds.includes(result.id)
                  ? "Đã lưu trong lượt này"
                  : "Lưu ghi chú mẫu vào lịch"}
              </Button>
            </article>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={onGoToCalendar}
          >
            Mở lịch văn hóa
          </Button>
        </div>
      )}
    </section>
  );
}
