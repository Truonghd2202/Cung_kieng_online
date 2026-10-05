import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "./ui/button";

type Phase = "edit" | "loading" | "result" | "error";

interface BirthChartInput {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

const EMPTY_INPUT: BirthChartInput = {
  birthDate: "",
  birthTime: "",
  birthPlace: "",
};

// Nội dung cố định để thử bố cục, không suy ra từ ngày sinh.
const MOCK_SECTIONS = [
  {
    title: "Tổng quan",
    content:
      "Đây là vị trí hiển thị phần tổng quan khi hệ thống trả kết quả. Nội dung hiện tại là mẫu cố định.",
  },
  {
    title: "Diễn giải",
    content:
      "Phần này sẽ trình bày các luận điểm cùng căn cứ của phương pháp được chọn. Bản demo chưa tính cung, sao hoặc vận hạn.",
  },
  {
    title: "Gợi ý tự suy ngẫm",
    content:
      "Bạn đang muốn hiểu thêm điều gì về bản thân? Hãy ghi lại một câu hỏi cụ thể để chuẩn bị cho trải nghiệm.",
  },
];

function validateInput(input: BirthChartInput): string | null {
  const match = input.birthDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) return "Bạn hãy chọn ngày sinh.";

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day, 12);
  const today = new Date();

  if (
    year < 1900 ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getTime() > new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
    ).getTime()
  ) {
    return "Ngày sinh chưa hợp lệ hoặc nằm trong tương lai.";
  }

  if (
    input.birthTime &&
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(input.birthTime)
  ) {
    return "Giờ sinh chưa hợp lệ.";
  }

  if (input.birthPlace.trim().length > 80) {
    return "Nơi sinh tối đa 80 ký tự.";
  }

  return null;
}

export function BirthChartDemoPanel() {
  const [input, setInput] = useState<BirthChartInput>(EMPTY_INPUT);
  const [submitted, setSubmitted] = useState<BirthChartInput | null>(null);
  const [phase, setPhase] = useState<Phase>("edit");
  const [error, setError] = useState("");
  const [simulateError, setSimulateError] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "loading") return;

    const timer = window.setTimeout(() => {
      if (simulateError) {
        setError("Lỗi mô phỏng: chưa nhận được kết quả.");
        setPhase("error");
      } else {
        setPhase("result");
      }
    }, 600);

    return () => window.clearTimeout(timer);
  }, [phase, simulateError]);

  useEffect(() => {
    if (phase !== "edit") {
      statusRef.current?.focus();
    }
  }, [phase]);

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const next = {
      ...input,
      birthPlace: input.birthPlace.trim(),
    };

    const validationError = validateInput(next);

    if (validationError) {
      setError(validationError);
      return;
    }

    setInput(next);
    setSubmitted(next);
    setError("");
    setPhase("loading");
  };

  const fieldClass =
    "mt-2 w-full min-w-0 rounded-control border border-line " +
    "bg-canvas px-3 py-3 text-base text-ink";

  return (
    <section
      aria-labelledby="birth-chart-demo-title"
      className="mt-6 rounded-card border border-line bg-surface p-5 sm:p-8"
    >
      <h2
        id="birth-chart-demo-title"
        className="font-display text-2xl font-semibold text-ink"
      >
        Thử luồng lá số
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Demo giao diện: chưa lập lá số, chưa có diễn giải AI.
        Thông tin chỉ được giữ trong màn này, chưa lưu hoặc gửi đi.
      </p>

      {phase === "edit" ? (
        <form onSubmit={submit} className="mt-6 space-y-5">
          <label className="block text-sm font-semibold text-ink">
            Ngày sinh dương lịch
            <input
              required
              type="date"
              min="1900-01-01"
              value={input.birthDate}
              onChange={(event) => {
                setInput({ ...input, birthDate: event.target.value });
                setError("");
              }}
              className={fieldClass}
            />
          </label>

          <label className="block text-sm font-semibold text-ink">
            Giờ sinh — tùy chọn trong bản demo
            <input
              type="time"
              value={input.birthTime}
              onChange={(event) => {
                setInput({ ...input, birthTime: event.target.value });
                setError("");
              }}
              className={fieldClass}
            />
          </label>

          <label className="block text-sm font-semibold text-ink">
            Nơi sinh — tùy chọn trong bản demo
            <input
              maxLength={80}
              value={input.birthPlace}
              onChange={(event) => {
                setInput({ ...input, birthPlace: event.target.value });
                setError("");
              }}
              placeholder="Ví dụ: TP. Hồ Chí Minh"
              className={fieldClass}
            />
          </label>

          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(event) => setSimulateError(event.target.checked)}
              className="mt-1"
            />
            Mô phỏng lỗi để kiểm tra thao tác thử lại
          </label>

          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}

          <Button type="submit">Xem kết quả demo</Button>
        </form>
      ) : (
        <div
          ref={statusRef}
          tabIndex={-1}
          aria-busy={phase === "loading"}
          className="mt-6"
        >
          {phase === "loading" && (
            <>
              <p role="status" className="text-sm text-muted">
                Đang mô phỏng bước xử lý…
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => setPhase("edit")}
              >
                Hủy
              </Button>
            </>
          )}

          {phase === "error" && (
            <>
              <p role="alert" className="text-sm text-danger">
                {error} Thông tin đã nhập được giữ nguyên.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setSimulateError(false);
                    setError("");
                    setPhase("loading");
                  }}
                >
                  Thử lại demo
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setError("");
                    setPhase("edit");
                  }}
                >
                  Sửa thông tin
                </Button>
              </div>
            </>
          )}

          {phase === "result" && submitted && (
            <>
              <h3 className="font-semibold text-ink">
                Kết quả mẫu — giống nhau với mọi thông tin nhập
              </h3>

              <dl className="mt-4 space-y-2 text-sm text-muted">
                <div>
                  <dt className="font-semibold">Ngày sinh dương lịch</dt>
                  <dd>
                    {submitted.birthDate.split("-").reverse().join("/")}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Giờ sinh</dt>
                  <dd>{submitted.birthTime || "Chưa cung cấp"}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Nơi sinh</dt>
                  <dd className="break-words">
                    {submitted.birthPlace || "Chưa cung cấp"}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 space-y-4">
                {MOCK_SECTIONS.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-panel border border-line p-4"
                  >
                    <h4 className="font-semibold text-ink">
                      {section.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {section.content}
                    </p>
                  </article>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                className="mt-5"
                onClick={() => setPhase("edit")}
              >
                Sửa thông tin
              </Button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
