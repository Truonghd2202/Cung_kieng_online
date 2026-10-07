import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  readMembershipIntent,
  clearMembershipIntent,
  type MembershipTerm,
} from "../data/membershipIntent";

interface DemoMembership {
  term: MembershipTerm;
  registeredAt: number;
}

interface MembershipDemoFlowProps {
  email?: string;
  onGoToLogin: (term: MembershipTerm) => void;
}

const termLabel = (term: MembershipTerm) =>
  term === "monthly" ? "Theo tháng" : "Theo năm";

const PREMIUM_DEMO_CONTENT = [
  {
    id: "research",
    title: "Tư liệu nghiên cứu tín ngưỡng",
    description: "Thử giao diện đọc tư liệu chuyên sâu.",
    body:
      "Nội dung mẫu để kiểm tra quyền truy cập. Tư liệu thật sẽ có tác giả, nguồn, phạm vi nghiên cứu và các phần nội dung riêng.",
  },
  {
    id: "chau-van",
    title: "Chầu Văn và Thờ Mẫu chuyên sâu",
    description: "Thử giao diện nội dung văn hóa dành cho hội viên.",
    body:
      "Đây là mẫu bố cục bài chuyên sâu. Bản hiện tại chưa cung cấp kho bài premium hoặc bản thu bổ sung.",
  },
  {
    id: "astrology",
    title: "Diễn giải tử vi chuyên sâu",
    description: "Thử giao diện kết quả dành cho hội viên.",
    body:
      "Đây là nội dung mẫu cố định. Chưa tính lá số, phân tích vận hạn hoặc tạo diễn giải AI.",
  },
] as const;

function parseMembership(raw: string | null): DemoMembership | null {
  if (raw === null) return null;

  const value: unknown = JSON.parse(raw);

  if (value === null) {
    return null;
  }

  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    throw new Error("Dữ liệu chưa hợp lệ.");
  }

  const item = value as Record<string, unknown>;

  if (
    (item.term !== "monthly" && item.term !== "yearly") ||
    typeof item.registeredAt !== "number" ||
    !Number.isFinite(item.registeredAt) ||
    item.registeredAt <= 0 ||
    !Number.isFinite(new Date(item.registeredAt).getTime())
  ) {
    throw new Error("Dữ liệu chưa hợp lệ.");
  }

  return {
    term: item.term,
    registeredAt: item.registeredAt,
  };
}

export function MembershipDemoFlow({
  email,
  onGoToLogin,
}: MembershipDemoFlowProps) {
  const account = email?.trim().toLowerCase();
  const storageKey = account
    ? `tltl-membership-demo-${account}`
    : null;

  const [term, setTerm] = useState<MembershipTerm>(
    () => readMembershipIntent() ?? "monthly"
  );
  const [step, setStep] = useState<"choose" | "confirm">("choose");
  const [membership, setMembership] =
    useState<DemoMembership | null>(null);
  const [loading, setLoading] = useState(true);
  const [readError, setReadError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedPremiumId, setSelectedPremiumId] =
    useState<string | null>(null);

  const selectedPremium = PREMIUM_DEMO_CONTENT.find(
    (item) => item.id === selectedPremiumId,
  );

  useEffect(() => {
    const requestedTerm = readMembershipIntent();

    setTerm(requestedTerm ?? "monthly");
    setStep(account && requestedTerm ? "confirm" : "choose");
    setMessage("");
    setSelectedPremiumId(null);

    const refresh = () => {
      try {
        const saved = storageKey
          ? parseMembership(localStorage.getItem(storageKey))
          : null;

        setMembership(saved);
        setReadError(false);

        if (saved) {
          setStep("choose");
          clearMembershipIntent();
        }
      } catch {
        setMembership(null);
        setReadError(true);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    refresh();

    const handleStorage = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        (event.key === storageKey || event.key === null)
      ) {
        setStep("choose");
        setMessage("");
        refresh();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [storageKey]);

  const confirmRegistration = () => {
    if (!storageKey || readError) return;

    setMessage("");

    try {
      // Đọc lại để không ghi đè đăng ký ở tab khác.
      const latest = parseMembership(localStorage.getItem(storageKey));

      if (latest) {
        clearMembershipIntent();
        setMembership(latest);
        setStep("choose");
        setMessage("Tài khoản này đã có đăng ký thử.");
        return;
      }

      const next: DemoMembership = {
        term,
        registeredAt: Date.now(),
      };

      localStorage.setItem(storageKey, JSON.stringify(next));
      clearMembershipIntent();

      setMembership(next);
      setStep("choose");
      setMessage("Đã lưu đăng ký mô phỏng.");
    } catch {
      setMessage(
        "Chưa lưu được đăng ký thử. Dữ liệu hiện có chưa bị ghi đè."
      );
    }
  };

  const cancelRegistration = () => {
    if (!storageKey || readError) return;

    try {
      localStorage.removeItem(storageKey);
      setMembership(null);
      setSelectedPremiumId(null);
      setStep("choose");
      setMessage("Đã hủy đăng ký mô phỏng.");
    } catch {
      setMessage("Chưa hủy được đăng ký thử. Bạn hãy thử lại.");
    }
  };

  return (
    <section
      aria-labelledby="membership-demo-title"
      className="mb-8 rounded-3xl border border-amber-500/30 bg-surface p-6 sm:p-8 shadow-xs"
    >
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
            NỘI DUNG CHUYÊN SÂU
          </span>
          <span className="text-xs text-stone-400">·</span>
          <span className="text-xs text-stone-500">Đặc Quyền Hội Viên Tâm An</span>
        </div>

        <h2
          id="membership-demo-title"
          className="font-display text-xl sm:text-2xl font-bold text-ink"
        >
          Trải Nghiệm Nội Dung Chuyên Khảo Mẫu
        </h2>

        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400 max-w-2xl">
          Khám phá không gian đọc chuyên khảo dành cho hội viên đồng hành: các tài liệu khảo cứu di sản,
          nghi thức cổ truyền và phân tích văn hóa dân gian chuyên sâu.
        </p>
      </header>

      {loading ? (
        <p role="status" className="text-sm text-muted">
          Đang đọc trạng thái đăng ký…
        </p>
      ) : readError ? (
        <p role="alert" className="text-sm text-danger">
          Chưa đọc được dữ liệu đăng ký trên trình duyệt. Dữ liệu gốc
          được giữ nguyên.
        </p>
      ) : membership ? (
        <div className="space-y-4">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-ink">Trạng thái</dt>
              <dd className="mt-1 text-muted">Đã đăng ký thử</dd>
            </div>

            <div>
              <dt className="font-semibold text-ink">Chu kỳ đã chọn</dt>
              <dd className="mt-1 text-muted">
                {termLabel(membership.term)}
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-ink">Ngày đăng ký thử</dt>
              <dd className="mt-1 text-muted">
                {new Date(membership.registeredAt).toLocaleDateString(
                  "vi-VN"
                )}
              </dd>
            </div>
          </dl>

          <Button
            type="button"
            variant="outline"
            onClick={cancelRegistration}
          >
            Hủy đăng ký thử
          </Button>
        </div>
      ) : step === "confirm" ? (
        <div className="space-y-4">
          <h3 className="font-semibold text-ink">Kiểm tra lựa chọn</h3>

          <p className="text-sm text-ink">
            Chu kỳ: {termLabel(term)}
          </p>

          <p className="text-sm text-muted">
            Giá chưa được công bố. Thao tác này chỉ lưu lựa chọn vào
            tài khoản demo trên trình duyệt.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={confirmRegistration}>
              Xác nhận đăng ký thử
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("choose")}
            >
              Đổi lựa chọn
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <fieldset>
            <legend className="mb-3 font-semibold text-ink">
              Chọn chu kỳ
            </legend>

            <div className="grid gap-3 sm:grid-cols-2">
              {(["monthly", "yearly"] as const).map((option) => (
                <label
                  key={option}
                  className="flex min-h-14 cursor-pointer items-center gap-3 rounded-control border border-line p-4"
                >
                  <input
                    type="radio"
                    name="membership-demo-term"
                    value={option}
                    checked={term === option}
                    onChange={() => setTerm(option)}
                    className="h-4 w-4 accent-action"
                  />

                  <span className="font-semibold text-ink">
                    {termLabel(option)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="text-sm text-muted">Giá chưa được công bố.</p>

          <Button
            type="button"
            onClick={() => {
              if (account) {
                setStep("confirm");
              } else {
                onGoToLogin(term);
              }
            }}
          >
            {account ? "Xem lại lựa chọn" : "Đăng nhập để đăng ký thử"}
          </Button>
        </div>
      )}

      {!loading && !readError && (
        <div className="mt-8 border-t border-line pt-6">
          <h3 className="font-display text-xl font-semibold text-ink">
            Nội dung Premium mẫu
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {membership
              ? "Đăng ký demo cho phép mở các nội dung mẫu bên dưới."
              : "Đăng ký thử để kiểm tra thao tác mở nội dung mẫu."}
            {" "}Đây chỉ là mô phỏng quyền truy cập trên trình duyệt.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {PREMIUM_DEMO_CONTENT.map((item) => (
              <article
                key={item.id}
                className="rounded-panel border border-line p-4"
              >
                <p className="text-xs font-semibold text-accent">
                  {membership ? "Có thể mở · Demo" : "Đang khóa · Demo"}
                </p>

                <h4 className="mt-2 font-semibold text-ink">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  disabled={!membership}
                  aria-pressed={selectedPremiumId === item.id}
                  onClick={() => setSelectedPremiumId(item.id)}
                >
                  Mở nội dung mẫu
                </Button>
              </article>
            ))}
          </div>

          {!membership && (
            <Button
              type="button"
              className="mt-5"
              onClick={() => {
                if (!account) {
                  onGoToLogin(term);
                  return;
                }

                setStep("confirm");

                document.getElementById("membership-demo-title")
                  ?.scrollIntoView({ block: "start" });
              }}
            >
              {account
                ? "Xem lại lựa chọn đăng ký thử"
                : "Đăng nhập để đăng ký thử"}
            </Button>
          )}

          {membership && selectedPremium && (
            <div
              role="region"
              aria-label={selectedPremium.title}
              aria-live="polite"
              className="mt-5 rounded-panel border border-line bg-canvas p-5"
            >
              <h4 className="font-display text-lg font-semibold text-ink">
                {selectedPremium.title}
              </h4>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {selectedPremium.body}
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => setSelectedPremiumId(null)}
              >
                Đóng nội dung
              </Button>
            </div>
          )}
        </div>
      )}

      <p
        role="status"
        aria-live="polite"
        className="mt-4 text-sm text-ink"
      >
        {message}
      </p>
    </section>
  );
}
