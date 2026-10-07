import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";

const PARTNERSHIP_TYPES = [
  "Quảng bá sản phẩm thủ công",
  "Quà tặng số",
  "Sự kiện văn hóa",
] as const;

type PartnershipType = (typeof PARTNERSHIP_TYPES)[number];

interface PartnershipDraft {
  brand: string;
  contactName: string;
  email: string;
  type: PartnershipType;
  description: string;
}

const EMPTY_DRAFT: PartnershipDraft = {
  brand: "",
  contactName: "",
  email: "",
  type: "Quảng bá sản phẩm thủ công",
  description: "",
};

export function BrandPartnershipForm() {
  const [draft, setDraft] = useState<PartnershipDraft>(EMPTY_DRAFT);
  const [step, setStep] =
    useState<"choose" | "edit" | "review" | "done">("choose");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [showClearRequests, setShowClearRequests] = useState(false);
  const [clearRequestsMessage, setClearRequestsMessage] =
    useState("");

  const clearLocalPartnershipRequests = () => {
    setClearRequestsMessage("");

    try {
      const keys: string[] = [];

      // Thu thập trước, tránh bỏ sót khi xóa làm thay đổi thứ tự key.
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);

        if (key?.startsWith("tltl-partnership-demo-")) {
          keys.push(key);
        }
      }

      for (const key of keys) {
        localStorage.removeItem(key);
      }

      setShowClearRequests(false);
      setClearRequestsMessage(
        keys.length
          ? "Đã xóa các bản yêu cầu hợp tác lưu trên trình duyệt này."
          : "Không có bản yêu cầu hợp tác nào đã lưu trên trình duyệt này.",
      );
    } catch {
      setClearRequestsMessage(
        "Chưa hoàn tất việc xóa. Một số bản yêu cầu có thể vẫn còn; bạn hãy thử lại.",
      );
    }
  };

  const update = <K extends keyof PartnershipDraft>(
    key: K,
    value: PartnershipDraft[K]
  ) => {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));

    setError("");
  };

  const review = (event: FormEvent) => {
    event.preventDefault();

    const cleaned: PartnershipDraft = {
      ...draft,
      brand: draft.brand.trim(),
      contactName: draft.contactName.trim(),
      email: draft.email.trim().toLowerCase(),
      description: draft.description.trim(),
    };

    if (
      !cleaned.brand ||
      !cleaned.contactName ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email) ||
      cleaned.description.length < 20
    ) {
      setError(
        "Bạn hãy nhập tên thương hiệu, người liên hệ, email hợp lệ và mô tả ít nhất 20 ký tự."
      );
      return;
    }

    setDraft(cleaned);
    setError("");
    setStep("review");
  };

  const confirm = () => {
    setError("");

    try {
      const id = crypto.randomUUID();

      // Mỗi yêu cầu có khóa riêng, không ghi đè yêu cầu trước.
      localStorage.setItem(
        `tltl-partnership-demo-${id}`,
        JSON.stringify({
          id,
          ...draft,
          createdAt: Date.now(),
          status: "local-demo",
        })
      );

      setReference(id);
      setStep("done");
    } catch {
      setError(
        "Chưa lưu được yêu cầu thử. Thông tin trong form vẫn được giữ để bạn thử lại."
      );
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-line " +
    "bg-surface px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30";

  return (
    <section
      aria-labelledby="partnership-title"
      className="mb-8 rounded-3xl border border-amber-500/30 bg-surface p-6 sm:p-8 shadow-xs"
    >
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
            HỢP TÁC DOANH NGHIỆP & B2B DI SẢN
          </span>
          <span className="text-xs text-stone-400">·</span>
          <span className="text-xs text-stone-500">Đồng Hành Phát Triển</span>
        </div>

        <h2
          id="partnership-title"
          className="font-display text-xl sm:text-2xl font-bold text-ink"
        >
          Cùng Kiến Tạo Trải Nghiệm Văn Hóa Di Sản
        </h2>

        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400 max-w-2xl">
          Dành cho các thương hiệu phong cách sống, đơn vị thủ công mỹ nghệ truyền thống,
          nghệ nhân dân gian và các tổ chức sự kiện mong muốn lan tỏa giá trị văn hóa thuần Việt.
        </p>

        <p className="mt-2 text-[11px] text-stone-500 italic">
          * Đăng ký đề xuất hợp tác được lưu trữ an toàn trên thiết bị của bạn.
        </p>
      </header>

      {step === "choose" ? (
        <div className="space-y-5">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-ink">
              Chọn hình thức hợp tác
            </legend>

            <div className="grid gap-3 sm:grid-cols-3">
              {PARTNERSHIP_TYPES.map((type) => (
                <label
                  key={type}
                  className="flex min-h-14 cursor-pointer items-center gap-3 rounded-control border border-line p-4 text-sm font-semibold text-ink"
                >
                  <input
                    type="radio"
                    name="partnership-type"
                    value={type}
                    checked={draft.type === type}
                    onChange={() => update("type", type)}
                    className="h-4 w-4 accent-action"
                  />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>

          <Button type="button" onClick={() => setStep("edit")}>
            Tiếp tục nhập thông tin
          </Button>
        </div>
      ) : step === "edit" ? (
        <form onSubmit={review} className="space-y-5">
          <div className="flex flex-col gap-3 rounded-panel border border-line bg-surface-soft p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink">
              Hình thức đã chọn: <strong>{draft.type}</strong>
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("choose")}
            >
              Đổi hình thức
            </Button>
          </div>

          <label className="block text-sm font-semibold text-ink">
            Thương hiệu hoặc đơn vị
            <input
              required
              maxLength={120}
              autoComplete="organization"
              value={draft.brand}
              onChange={(event) => update("brand", event.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="block text-sm font-semibold text-ink">
            Người liên hệ
            <input
              required
              maxLength={80}
              autoComplete="name"
              value={draft.contactName}
              onChange={(event) =>
                update("contactName", event.target.value)
              }
              className={fieldClass}
            />
          </label>

          <label className="block text-sm font-semibold text-ink">
            Email liên hệ
            <input
              required
              type="email"
              maxLength={254}
              autoComplete="email"
              value={draft.email}
              onChange={(event) => update("email", event.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="block text-sm font-semibold text-ink">
            Ý tưởng hợp tác
            <textarea
              required
              minLength={20}
              maxLength={2000}
              rows={5}
              value={draft.description}
              onChange={(event) =>
                update("description", event.target.value)
              }
              placeholder="Bạn muốn cùng tạo hoạt động hoặc trải nghiệm gì?"
              className={fieldClass}
            />
          </label>

          <p className="text-xs text-muted">
            {draft.description.length}/2000 ký tự
          </p>

          <Button type="submit">Xem lại yêu cầu</Button>
        </form>
      ) : step === "review" ? (
        <div className="space-y-5">
          <h3 className="font-semibold text-ink">Kiểm tra thông tin</h3>

          <dl className="space-y-4 text-sm">
            {(
              [
                ["Đơn vị", draft.brand],
                ["Người liên hệ", draft.contactName],
                ["Email", draft.email],
                ["Hình thức", draft.type],
                ["Ý tưởng", draft.description],
              ] as Array<[string, string]>
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="font-semibold text-ink">{label}</dt>
                <dd className="mt-1 whitespace-pre-line break-words leading-relaxed text-muted">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={confirm}>
              Lưu yêu cầu thử
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setError("");
                setStep("edit");
              }}
            >
              Sửa thông tin
            </Button>
          </div>
        </div>
      ) : (
        <div role="status" className="space-y-4">
          <h3 className="font-semibold text-ink">Đã lưu yêu cầu thử</h3>

          <p className="text-sm leading-relaxed text-muted">
            Nhóm dự án chưa nhận được yêu cầu này và chưa có lịch phản
            hồi. Không có email được gửi.
          </p>

          <p className="break-all text-xs text-muted">
            Mã lưu trên trình duyệt: {reference}
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDraft({ ...EMPTY_DRAFT });
              setReference("");
              setError("");
              setStep("choose");
            }}
          >
            Tạo yêu cầu thử khác
          </Button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 text-sm text-danger">
          {error}
        </p>
      )}

      <section className="mt-6 border-t border-line pt-5">
        <h3 className="font-semibold text-ink">
          Dữ liệu yêu cầu hợp tác
        </h3>

        <p className="mt-2 text-sm text-muted">
          Các yêu cầu demo chỉ lưu trên trình duyệt này và chưa
          được gửi đến đội ngũ. Chúng chưa được phân theo tài khoản.
        </p>

        {!showClearRequests ? (
          <Button
            type="button"
            variant="outline"
            className="mt-3"
            onClick={() => {
              setClearRequestsMessage("");
              setShowClearRequests(true);
            }}
          >
            Xóa các yêu cầu hợp tác đã lưu
          </Button>
        ) : (
          <div className="mt-4 rounded-panel border border-line p-4">
            <p className="text-sm text-ink">
              Xóa tất cả bản yêu cầu hợp tác demo trên trình duyệt
              này, bao gồm bản được tạo trong những phiên sử dụng
              khác? Thao tác không thể hoàn tác.
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowClearRequests(false)}
              >
                Giữ lại
              </Button>

              <Button
                type="button"
                onClick={clearLocalPartnershipRequests}
              >
                Xác nhận xóa
              </Button>
            </div>
          </div>
        )}

        <p
          role="status"
          aria-live="polite"
          className="mt-3 text-sm text-muted"
        >
          {clearRequestsMessage}
        </p>
      </section>
    </section>
  );
}
