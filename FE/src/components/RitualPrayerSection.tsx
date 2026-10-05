import { useState } from "react";
import type { RitualPrayer } from "../data/ritualData";
import { Button } from "./ui/button";
import { ContentProvenance } from "./ContentProvenance";

interface Props {
  prayers?: RitualPrayer[];
}

export function RitualPrayerSection({ prayers = [] }: Props) {
  const [selectedId, setSelectedId] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [copying, setCopying] = useState(false);

  const available = prayers.filter(
    (prayer) =>
      prayer.title.trim() &&
      prayer.paragraphs.some((paragraph) => paragraph.trim()),
  );

  const selected =
    available.find((prayer) => prayer.id === selectedId) ??
    available[0];

  const copyPrayer = async () => {
    if (!selected || copying) return;

    setCopying(true);
    setCopyStatus("");

    try {
      await navigator.clipboard.writeText(
        [selected.title, ...selected.paragraphs].join("\n\n"),
      );
      setCopyStatus("Đã sao chép bài văn khấn.");
    } catch {
      setCopyStatus(
        "Chưa sao chép được. Bạn có thể chọn phần văn bản để sao chép.",
      );
    } finally {
      setCopying(false);
    }
  };

  return (
    <section
      aria-labelledby="ritual-prayer-title"
      className="my-6 rounded-card border border-line bg-surface p-5 sm:p-6"
    >
      <h2
        id="ritual-prayer-title"
        className="font-display text-xl font-semibold text-ink"
      >
        Văn khấn tham khảo
      </h2>

      {!selected ? (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Nghi lễ này chưa có bài văn khấn trong thư viện.
          Checklist chuẩn bị bên trên chưa thay thế nội dung văn khấn.
        </p>
      ) : (
        <>
          {available.length > 1 && (
            <div className="mt-4">
              <label
                htmlFor="ritual-prayer-select"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Chọn bài tham khảo
              </label>

              <select
                id="ritual-prayer-select"
                value={selected.id}
                onChange={(event) => {
                  setSelectedId(event.target.value);
                  setCopyStatus("");
                }}
                className="w-full min-w-0 rounded-control border border-line bg-canvas px-3 py-3 text-base text-ink"
              >
                {available.map((prayer) => (
                  <option key={prayer.id} value={prayer.id}>
                    {prayer.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <p className="mt-4 text-xs text-accent">
            {selected.kind}
          </p>

          <h3 className="mt-2 font-semibold text-ink">
            {selected.title}
          </h3>

          <p className="mt-2 text-sm text-muted">
            Phạm vi tham khảo: {selected.applicableTo}
          </p>

          {selected.metadata.editorialStatus !== "approved" && (
            <p className="mt-3 text-sm text-muted">
              Đây là nội dung đang biên tập, chưa phải bản đã duyệt.
            </p>
          )}

          <div className="mt-5 space-y-4 text-base leading-loose text-ink">
            {selected.paragraphs.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-wrap break-words">
                {paragraph}
              </p>
            ))}
          </div>

          {selected.usageNote && (
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {selected.usageNote}
            </p>
          )}

          <div className="mt-5">
            <ContentProvenance metadata={selected.metadata} />
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={copying}
            onClick={copyPrayer}
            className="mt-5"
          >
            {copying ? "Đang sao chép…" : "Sao chép bài văn khấn"}
          </Button>

          <p role="status" className="mt-3 text-sm text-muted">
            {copyStatus}
          </p>
        </>
      )}
    </section>
  );
}
