import { useEffect, useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import {
  Scroll,
  Sparkles,
  Copy,
  Check,
  Edit3,
  Trash2,
  BookmarkCheck,
  RotateCcw,
  ShieldCheck,
  Compass,
  FileText,
  HeartHandshake,
} from "lucide-react";

export const RITUAL_SERVICES = [
  {
    id: "peace",
    label: "Cầu an bản mệnh",
    subtitle: "Lời nguyện thân tâm an lạc, gia đạo hòa thuận",
    description: "Soạn lời cầu an gửi gắm ước nguyện bình yên cho bản thân và người thân yêu.",
    template:
      "Nam mô A Di Đà Phật (3 lần).\n\nCon kính lạy mười phương Chư Phật, Chư Bồ Tát, Chư Hiền Thánh Tăng.\nCon kính lạy Hoàng thiên Hậu thổ, Chư vị Tôn thần cai quản nơi này.\nCon kính lạy gia tiên tiền tổ, hương linh nội ngoại.\n\nTín chủ con là: [Họ và tên, tuổi]\nNgụ tại: [Địa chỉ gia đình]\n\nHôm nay ngày lành tháng tốt, tín chủ con một lòng hướng thiện, dâng nén tâm hương kính cẩn nguyện cầu:\n- Cầu cho gia đạo bình an, trong ấm ngoài êm, trên thuận dưới hòa.\n- Cầu cho thân tâm thanh thản, phiền não đoạn trừ, sở cầu như ý, sở nguyện tòng tâm.\n- Nguyện noi gương đức lành, làm việc thiện, nói lời hay, tích đức cho con cháu đời sau.\n\nCúi xin Chư vị chứng giám lòng thành, chở che độ trì.\nCẩn cáo!",
  },
  {
    id: "petition",
    label: "Dâng sớ tạ ơn",
    subtitle: "Kính cáo gia tiên & tiền nhân nhân dịp đặc biệt",
    description: "Ghi nhớ công đức sinh thành dưỡng dục, tạ ơn che chở và báo cáo việc lành trong nhà.",
    template:
      "Phục dĩ: Chí thành thông thánh, lễ bạc tâm thanh.\n\nKính lạy: Hoàng thiên Hậu thổ, Tôn thần bản thổ, Đông trù Tư mệnh Táo phủ Thần quân.\nKính lạy: Tiên tổ nội ngoại, bá thúc huynh đệ, cô di tỷ muội.\n\nTín chủ con là: [Họ và tên]\nCùng toàn thể gia quyến cư ngụ tại: [Địa chỉ]\n\nNhân ngày: [Dịp lễ / Ngày rằm / Giỗ chạp / Đầu năm mới],\nChúng con thành tâm sắm sửa hương hoa lễ vật, kính dâng trước án.\nKính cẩn tạ ơn đất trời che chở, tổ tiên phù hộ độ trì cho gia đình một năm được an khang, mọi sự hanh thông.\nChúng con xin nguyện giữ gìn gia phong, thương yêu đùm bọc, kế thừa nếp thơm của tiên tổ.\n\nKính mong chư vị giáng lâm trước án, chứng giám tấc lòng thành.\nCẩn bạch!",
  },
  {
    id: "star",
    label: "Nguyện hóa giải sao hạn",
    subtitle: "Lắng tâm đón nhận thử thách, tu dưỡng tâm đức",
    description: "Nhìn nhận năm tuổi và sao chiếu với tâm thế hướng thiện, tích đức hành thiện để giải tỏa âu lo.",
    template:
      "Nam mô Tiêu Tai Diên Thọ Dược Sư Lưu Ly Quang Vương Phật.\n\nCon kính lạy Đức Trung thiên Tinh chúa Bắc cực Tử vi Đại đế.\nCon kính lạy Chư vị Tinh quân giáng chiếu bản mệnh niên khóa.\n\nTín chủ con là: [Họ và tên, năm sinh]\nHiện cư ngụ tại: [Địa chỉ]\n\nNăm nay gặp tiết tinh quân chiếu mệnh, con hiểu rằng phúc họa do tâm khởi, quả lành do đức sinh. Trước đấng cao xanh, con không cầu xin phép lạ, chỉ xin phát tâm:\n1. Tự soi chiếu lỗi lầm, buông bỏ sân si, sửa đổi tâm tính.\n2. Siêng năng làm việc thiện, giúp đỡ người khó khăn, phóng sinh tu đức.\n3. Giữ gìn sức khỏe, cẩn trọng lời ăn tiếng nói, nhường nhịn xóm giềng.\n\nKính xin Chư vị Tinh quân gia ân bảo hộ, hóa giải tai ương thành điềm lành, cho con vững bước trên đường đời.\nCẩn nguyện!",
  },
] as const;

export type RitualServiceId = (typeof RITUAL_SERVICES)[number]["id"];

export interface StoredRitualDraft {
  id: string;
  service: RitualServiceId;
  name: string;
  content: string;
  createdAt: number;
}

function readDrafts(key: string): StoredRitualDraft[] {
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
      RITUAL_SERVICES.some(
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

  return value as StoredRitualDraft[];
}

interface Props {
  email?: string;
}

export function OnlineRitualDraftPanel({ email }: Props) {
  const account = email?.trim().toLowerCase() || "guest";
  const storageKey = `tltl-ritual-drafts-${account}`;

  const [service, setService] = useState<RitualServiceId>("peace");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [step, setStep] = useState<"edit" | "review">("edit");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<StoredRitualDraft[]>([]);
  const [ready, setReady] = useState(false);
  const [readError, setReadError] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedService = RITUAL_SERVICES.find(
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

  const handleApplyTemplate = () => {
    setContent(selectedService.template);
    setError("");
    setMessage(`Đã tải mẫu "${selectedService.label}". Bạn hãy điền tên và thông tin gia đình.`);
  };

  const handleClearForm = () => {
    setName("");
    setContent("");
    setError("");
    setMessage("");
  };

  const review = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!content.trim()) {
      setError("Bạn hãy viết hoặc chọn mẫu lời nguyện muốn gửi gắm.");
      return;
    }

    setName(name.trim());
    setContent(content.trim());
    setStep("review");
  };

  const commit = (
    update: (latest: StoredRitualDraft[]) => StoredRitualDraft[]
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
        "Chưa lưu được thay đổi. Nội dung đang nhập được giữ nguyên trên màn hình."
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
      setError("Bạn hãy kiểm tra lại tên và nội dung bản nháp (tối đa 2.000 ký tự).");
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

      const next: StoredRitualDraft = {
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
        ? "✓ Đã cập nhật bản nháp trên thiết bị của bạn thành công."
        : "✓ Đã lưu bản nháp lời nguyện vào thiết bị. Bạn có thể mở lại bất cứ lúc nào.",
    );
  };

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Không thể tự động sao chép. Bạn hãy bôi đen và nhấn Ctrl+C.");
    }
  };

  return (
    <section
      aria-labelledby="online-ritual-title"
      className="mt-12 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-surface via-surface to-amber-500/[0.03] p-6 sm:p-10 shadow-sm relative overflow-hidden"
    >
      {/* Decorative Traditional Corner Accents */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none rounded-br-full" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-bl-full" />

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-400/30">
              <Scroll className="w-3.5 h-3.5 text-amber-600" />
              <span>SỔ SỚ & BẢN NHÁP LỜI NGUYỆN TẠI GIA</span>
            </span>
            <span className="text-xs text-stone-600 dark:text-stone-400">·</span>
            <span className="text-xs text-stone-600 dark:text-stone-400">Tùy nghi tâm thành</span>
          </div>

          <h2
            id="online-ritual-title"
            className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight"
          >
            Soạn lời nguyện & Văn khấn tại gia
          </h2>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300 max-w-2xl">
            Nơi bạn có thể tự tay viết lời nguyện ước, mượn mẫu văn khấn cổ truyền để chuẩn bị chu đáo trước giờ hành lễ.
            Bản nháp được lưu hoàn toàn riêng tư trên trình duyệt của bạn, không gửi ra ngoài.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center shrink-0 self-start md:self-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            Triết lý hành lễ
          </div>
          <div className="font-display text-sm font-semibold text-ink mt-0.5">
            “Tâm xuất Phật tri · Tâm thành tất ứng”
          </div>
        </div>
      </div>

      {!ready ? (
        <div className="py-12 text-center text-sm text-stone-500">
          <Sparkles className="w-5 h-5 mx-auto mb-2 animate-spin text-amber-600" />
          <span>Đang mở kho bản nháp của bạn…</span>
        </div>
      ) : readError ? (
        <div role="alert" className="my-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-700">
          Chưa đọc được kho bản nháp. Dữ liệu gốc trên máy của bạn vẫn được bảo toàn.
        </div>
      ) : (
        <>
          {step === "edit" ? (
            <form onSubmit={review} className="mt-8 space-y-6">
              {/* Service Selection Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-3">
                  1. Chọn mục đích soạn văn khấn / lời nguyện
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {RITUAL_SERVICES.map((item) => {
                    const isSelected = item.id === service;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setService(item.id);
                          setError("");
                          setMessage("");
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-500/50 shadow-xs ring-1 ring-amber-500/30"
                            : "bg-surface border-line hover:border-amber-500/30 hover:bg-amber-500/[0.02]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-display text-base font-bold text-ink">
                              {item.label}
                            </span>
                            {isSelected && (
                              <BookmarkCheck className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                            )}
                          </div>
                          <p className="text-xs text-stone-600 dark:text-stone-300 leading-snug">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Service Note & Apply Template CTA */}
              <div className="p-4 rounded-2xl bg-amber-500/[0.07] border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Gợi ý:</strong> {selectedService.description}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleApplyTemplate}
                  className="rounded-xl border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/15 text-xs font-semibold shrink-0 cursor-pointer gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dùng mẫu sớ gợi ý</span>
                </Button>
              </div>

              {/* Name / Addressing Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="ritual-author-name" className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    2. Danh xưng tín chủ / Đại diện gia đình (Không bắt buộc)
                  </label>
                  <span className="text-[11px] text-stone-600 dark:text-stone-400">Tối đa 80 ký tự</span>
                </div>
                <input
                  id="ritual-author-name"
                  type="text"
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ví dụ: Tín chủ Nguyễn Văn An (tuổi Nhâm Thân) cùng toàn thể gia quyến"
                  className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
              </div>

              {/* Content Textarea */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="ritual-prayer-content" className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    3. Nội dung văn khấn / Lời nguyện
                  </label>
                  <span className="text-xs text-stone-600 dark:text-stone-400 font-mono">
                    {content.length}/2.000 ký tự
                  </span>
                </div>
                <textarea
                  id="ritual-prayer-content"
                  required
                  maxLength={2000}
                  rows={8}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Ghi lại những điều bạn muốn thưa gửi, cầu chúc bình an cho gia đạo hoặc bấm 'Dùng mẫu sớ gợi ý' ở trên…"
                  className="w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all leading-relaxed font-sans"
                />
              </div>

              {/* Actions Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    className="min-h-11 px-6 rounded-xl bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 text-white font-semibold cursor-pointer shadow-md gap-2"
                  >
                    <Scroll className="w-4 h-4" />
                    <span>Xem trước dạng sớ cổ phong</span>
                  </Button>

                  {content.length > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleClearForm}
                      className="rounded-xl text-xs text-stone-500 hover:text-stone-800 cursor-pointer gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Xóa trắng</span>
                    </Button>
                  )}
                </div>

                <div className="text-xs text-stone-500 flex items-center gap-1.5 italic">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Dữ liệu lưu an toàn trên máy của bạn</span>
                </div>
              </div>
            </form>
          ) : (
            /* Review Step - Styled as Traditional Ceremonial Scroll */
            <div className="mt-8 space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <Scroll className="w-4 h-4 text-amber-600" />
                  <span>MÔ PHỎNG VĂN KHẤN / SỚ ĐIỆP HOÀNG CHỈ</span>
                </span>
                <span className="text-xs text-stone-500">
                  {selectedService.label}
                </span>
              </div>

              {/* Scroll Container with Diep Paper Aesthetics */}
              <div className="relative rounded-3xl border-2 border-amber-600/40 bg-gradient-to-b from-[#fdfbf7] to-[#f7f2e7] dark:from-stone-900 dark:to-stone-950 p-6 sm:p-10 shadow-md">
                {/* Scroll Header Seal */}
                <div className="text-center pb-6 border-b border-amber-600/20 relative">
                  <div className="inline-block px-4 py-1 rounded-full border border-red-700/40 bg-red-700/10 text-red-800 dark:text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
                    ✦ TÂM THÀNH TẤT ỨNG ✦
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-950 dark:text-amber-100">
                    {selectedService.label.toUpperCase()}
                  </h3>
                  {name && (
                    <p className="font-display italic text-sm text-stone-600 dark:text-stone-400 mt-1">
                      Kính cẩn: {name}
                    </p>
                  )}
                </div>

                {/* Scroll Body */}
                <div className="py-6 sm:py-8">
                  <div className="font-display text-sm sm:text-base leading-loose text-stone-800 dark:text-stone-200 whitespace-pre-line tracking-wide">
                    {content}
                  </div>
                </div>

                {/* Scroll Footer */}
                <div className="pt-4 border-t border-amber-600/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
                  <span>Khởi tạo ngày: {new Date().toLocaleDateString("vi-VN", { dateStyle: "full" })}</span>
                  <span className="italic">“Lễ bạc lòng son · Thần minh giám cách”</span>
                </div>
              </div>

              {/* Action Buttons for Review Mode */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    onClick={save}
                    className="min-h-11 px-6 rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-semibold cursor-pointer shadow-md gap-2"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>{editingId ? "Cập nhật thay đổi" : "Lưu vào kho bản nháp"}</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopy(content)}
                    className="min-h-11 px-5 rounded-xl border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10 font-semibold cursor-pointer gap-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "Đã sao chép văn khấn" : "Sao chép lời khấn"}</span>
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep("edit")}
                    className="rounded-xl text-xs text-stone-600 hover:text-stone-900 cursor-pointer gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Chỉnh sửa lại nội dung</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {editingId && (
            <div className="mt-4 p-3 rounded-xl bg-stone-500/10 flex items-center justify-between text-xs">
              <span className="text-stone-600">Đang ở chế độ chỉnh sửa bản nháp đã lưu</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingId(null);
                  setName("");
                  setContent("");
                  setStep("edit");
                  setError("");
                  setMessage("Đã hủy chế độ chỉnh sửa. Bản nháp đã lưu được giữ nguyên.");
                }}
                className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
              >
                Hủy chỉnh sửa
              </Button>
            </div>
          )}

          {/* List of Saved Drafts */}
          <div className="mt-12 border-t border-line pt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                  Kho bản nháp đã lưu trên máy
                </h3>
              </div>
              <span className="text-xs text-stone-500">
                {drafts.length} bản nháp
              </span>
            </div>

            {drafts.length === 0 ? (
              <div className="p-8 rounded-2xl bg-surface border border-line text-center text-xs sm:text-sm text-stone-500">
                Chưa có bản nháp nào được lưu. Bạn có thể soạn và nhấn “Lưu vào kho bản nháp” ở trên.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {drafts.map((draft) => {
                  const serviceMeta = RITUAL_SERVICES.find(
                    (item) => item.id === draft.service
                  );
                  return (
                    <div
                      key={draft.id}
                      className="rounded-2xl border border-line bg-surface p-5 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                            {serviceMeta?.label || "Bản nháp"}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {new Date(draft.createdAt).toLocaleDateString("vi-VN")}
                          </span>
                        </div>

                        {draft.name && (
                          <p className="font-display text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                            Tín chủ: {draft.name}
                          </p>
                        )}

                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed whitespace-pre-line mb-4 font-serif">
                          {draft.content}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-line flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="text-xs rounded-xl h-8 px-3 border-amber-500/40 text-amber-800 dark:text-amber-300 cursor-pointer"
                            disabled={editingId !== null}
                            onClick={() => {
                              setEditingId(draft.id);
                              setService(draft.service);
                              setName(draft.name);
                              setContent(draft.content);
                              setStep("edit");
                              setError("");
                              setMessage("Đã mở bản nháp để chỉnh sửa ở biểu mẫu phía trên.");

                              document.getElementById("online-ritual-title")?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }}
                          >
                            <Edit3 className="w-3 h-3 mr-1" />
                            <span>Sửa</span>
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="text-xs rounded-xl h-8 px-2 text-stone-600 hover:text-amber-700 cursor-pointer"
                            onClick={() => handleCopy(draft.content)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            <span>Chép</span>
                          </Button>
                        </div>

                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="text-xs rounded-xl h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-500/10 cursor-pointer"
                          disabled={editingId === draft.id}
                          onClick={() => {
                            if (
                              commit((latest) =>
                                latest.filter((item) => item.id !== draft.id)
                              )
                            ) {
                              setMessage("Đã xóa bản nháp khỏi thiết bị.");
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          <span>Xóa</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {error && (
        <div role="alert" className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs sm:text-sm text-red-700 font-medium">
          {error}
        </div>
      )}

      {message && (
        <div role="status" className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}
    </section>
  );
}

