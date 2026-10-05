import { useEffect, useState, type FormEvent } from "react";
import { Button } from "./ui/button";

const SERVICES = [
  {
    id: "peace",
    label: "Cầu an",
    description: "Viết một lời nguyện bình an.",
  },
  {
    id: "petition",
    label: "Dâng sớ",
    description:
      "Ghi ý nguyện để chuẩn bị; chưa tạo mẫu sớ truyền thống.",
  },
  {
    id: "star",
    label: "Cúng sao",
    description:
      "Ghi nhu cầu tìm hiểu; chưa tính sao hạn hoặc tổ chức nghi lễ.",
  },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

interface RitualDraft {
  id: string;
  service: ServiceId;
  name: string;
  content: string;
  createdAt: number;
}

function readDrafts(key: string): RitualDraft[] {
  const raw = localStorage.getItem(key);
  if (raw === null) return [];

  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value)) {
    throw new Error("Kho bản nháp chưa hợp lệ.");
  }

  const valid = value.every(
    (item: unknown) =>
      item !== null &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      typeof (item as Record<string, unknown>).id === "string" &&
      Boolean(((item as Record<string, unknown>).id as string).trim()) &&
      SERVICES.some(
        (service) =>
          service.id === (item as Record<string, unknown>).service
      ) &&
      typeof (item as Record<string, unknown>).name === "string" &&
      ((item as Record<string, unknown>).name as string).length <= 80 &&
      typeof (item as Record<string, unknown>).content === "string" &&
      Boolean(((item as Record<string, unknown>).content as string).trim()) &&
      ((item as Record<string, unknown>).content as string).length <= 2000 &&
      typeof (item as Record<string, unknown>).createdAt === "number" &&
      Number.isFinite((item as Record<string, unknown>).createdAt) &&
      ((item as Record<string, unknown>).createdAt as number) > 0 &&
      Number.isFinite(
        new Date(
          (item as Record<string, unknown>).createdAt as number
        ).getTime()
      )
  );

  if (
    !valid ||
    new Set(
      value.map((item: unknown) =>
        (item as Record<string, unknown>).id
      )
    ).size !== value.length
  ) {
    throw new Error("Kho bản nháp chưa hợp lệ.");
  }

  return value as RitualDraft[];
}

interface Props {
  email?: string;
}

export function OnlineRitualDraftPanel({ email }: Props) {
  const account = email?.trim().toLowerCase() || "guest";
  const storageKey = `tltl-ritual-drafts-${account}`;

  const [service, setService] = useState<ServiceId>("peace");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [step, setStep] = useState<"edit" | "review">("edit");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<RitualDraft[]>([]);
  const [ready, setReady] = useState(false);
  const [readError, setReadError] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const selectedService = SERVICES.find(
    (item) => item.id === service
  )!;

  useEffect(() => {
    const refresh = () => {
      try {
        setDrafts(readDrafts(storageKey));
        setReadError(false);
      } catch {
        setDrafts([]);
        setReadError(true);
      } finally {
        setReady(true);
      }
    };

    setReady(false);
    refresh();

    const onStorage = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        (event.key === storageKey || event.key === null)
      ) {
        refresh();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  const review = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!content.trim()) {
      setError("Bạn hãy viết điều muốn gửi gắm.");
      return;
    }

    setName(name.trim());
    setContent(content.trim());
    setStep("review");
  };

  const commit = (
    update: (latest: RitualDraft[]) => RitualDraft[]
  ): boolean => {
    try {
      const latest = readDrafts(storageKey);
      const next = update(latest);

      localStorage.setItem(storageKey, JSON.stringify(next));
      setDrafts(next);
      setError("");
      return true;
    } catch {
      setError(
        "Chưa lưu được thay đổi. Nội dung đang nhập được giữ nguyên."
      );
      return false;
    }
  };

  const save = () => {
    if (!ready || readError) return;

    const cleanName = name.trim();
    const cleanContent = content.trim();

    if (
      !cleanContent ||
      cleanContent.length > 2000 ||
      cleanName.length > 80
    ) {
      setError("Bạn hãy kiểm tra lại tên và nội dung bản nháp.");
      return;
    }

    const wasEditing = editingId !== null;

    const saved = commit((latest) => {
      if (editingId !== null) {
        const existing = latest.find(
          (draft) => draft.id === editingId,
        );

        if (!existing) {
          throw new Error("Bản nháp không còn trong kho.");
        }

        return latest.map((draft) =>
          draft.id === editingId
            ? {
                ...draft,
                service,
                name: cleanName,
                content: cleanContent,
              }
            : draft,
        );
      }

      const next: RitualDraft = {
        id: crypto.randomUUID(),
        service,
        name: cleanName,
        content: cleanContent,
        createdAt: Date.now(),
      };

      return [next, ...latest];
    });

    if (!saved) return;

    setEditingId(null);
    setName("");
    setContent("");
    setStep("edit");

    setMessage(
      wasEditing
        ? "Đã cập nhật bản nháp trên trình duyệt."
        : "Đã lưu bản nháp trên trình duyệt. Chưa gửi hoặc thực hiện nghi lễ.",
    );
  };

  const fieldClass =
    "mt-2 w-full rounded-control border border-line " +
    "bg-canvas px-4 py-3 text-base text-ink";

  return (
    <section
      aria-labelledby="online-ritual-title"
      className="mt-8 rounded-card border border-line bg-surface p-5 sm:p-8"
    >
      <h2
        id="online-ritual-title"
        className="font-display text-2xl font-semibold text-ink"
      >
        Chuẩn bị lời nguyện
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Viết và lưu bản nháp cho nhu cầu của bạn. Chưa có đơn vị tiếp
        nhận, thanh toán hoặc thực hiện nghi lễ trực tuyến.
      </p>

      {!ready ? (
        <p role="status" className="mt-4 text-sm text-muted">
          Đang đọc bản nháp…
        </p>
      ) : readError ? (
        <p role="alert" className="mt-4 text-sm text-danger">
          Chưa đọc được kho bản nháp. Dữ liệu gốc chưa bị ghi đè.
        </p>
      ) : (
        <>
          {step === "edit" ? (
            <form onSubmit={review} className="mt-6 space-y-5">
              <label className="block text-sm font-semibold text-ink">
                Nhu cầu
                <select
                  value={service}
                  onChange={(event) => {
                    setService(event.target.value as ServiceId);
                    setError("");
                    setMessage("");
                  }}
                  className={fieldClass}
                >
                  {SERVICES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <p className="text-sm text-muted">
                {selectedService.description}
              </p>

              <label className="block text-sm font-semibold text-ink">
                Tên hoặc cách xưng hô — không bắt buộc
                <input
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={fieldClass}
                />
              </label>

              <label className="block text-sm font-semibold text-ink">
                Điều bạn muốn gửi gắm
                <textarea
                  required
                  maxLength={2000}
                  rows={5}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  className={fieldClass}
                />
              </label>

              <p className="text-xs text-muted">
                {content.length}/2000 ký tự. Bản nháp nằm trên trình
                duyệt, chưa đồng bộ với máy chủ.
              </p>

              <Button type="submit">Xem lại bản nháp</Button>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-ink">
                {selectedService.label} · Bản nháp
              </h3>

              {name && <p className="text-sm text-ink">{name}</p>}

              <p className="whitespace-pre-line break-words text-sm leading-relaxed text-ink">
                {content}
              </p>

              <p className="text-xs text-muted">
                Nội dung do bạn viết, không phải văn khấn hoặc mẫu sớ
                đã đối chiếu nguồn.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" onClick={save}>
                  {editingId ? "Lưu thay đổi" : "Lưu bản nháp"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("edit")}
                >
                  Sửa nội dung
                </Button>
              </div>
            </div>
          )}

          {editingId && (
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => {
                setEditingId(null);
                setName("");
                setContent("");
                setStep("edit");
                setError("");
                setMessage(
                  "Đã hủy chỉnh sửa. Bản nháp đã lưu được giữ nguyên.",
                );
              }}
            >
              Hủy chỉnh sửa
            </Button>
          )}

          <div className="mt-8 border-t border-line pt-5">
            <h3 className="font-display text-lg font-semibold text-ink">
              Bản nháp đã lưu
            </h3>

            {drafts.length === 0 ? (
              <p className="mt-3 text-sm text-muted">Chưa có bản nháp.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {drafts.map((draft) => (
                  <li
                    key={draft.id}
                    className="rounded-panel border border-line p-4"
                  >
                    <details>
                      <summary className="cursor-pointer py-2 text-sm font-semibold text-ink">
                        {SERVICES.find(
                          (item) => item.id === draft.service
                        )?.label}
                        {" · "}
                        {new Date(draft.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </summary>

                      {draft.name && (
                        <p className="mt-2 text-sm text-muted">
                          {draft.name}
                        </p>
                      )}

                      <p className="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-ink">
                        {draft.content}
                      </p>
                    </details>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="mt-3 mr-3"
                      disabled={editingId !== null || content.trim().length > 0}
                      onClick={() => {
                        setEditingId(draft.id);
                        setService(draft.service);
                        setName(draft.name);
                        setContent(draft.content);
                        setStep("edit");
                        setError("");
                        setMessage("Đã mở bản nháp để sửa ở biểu mẫu phía trên.");

                        document.getElementById("online-ritual-title")?.scrollIntoView({
                          block: "start",
                        });
                      }}
                    >
                      Sửa bản nháp
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="mt-3"
                      disabled={editingId === draft.id}
                      onClick={() => {
                        if (
                          commit((latest) =>
                            latest.filter((item) => item.id !== draft.id)
                          )
                        ) {
                          setMessage("Đã xóa bản nháp.");
                        }
                      }}
                    >
                      Xóa bản nháp
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {error && (
        <p role="alert" className="mt-4 text-sm text-danger">
          {error}
        </p>
      )}

      <p role="status" className="mt-4 text-sm text-ink">
        {message}
      </p>
    </section>
  );
}
