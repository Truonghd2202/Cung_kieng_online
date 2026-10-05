import React, {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, BookOpen, Check, Compass, Heart, Play, Waves } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import { ChauVanAudioLibrary } from "../components/ChauVanAudioLibrary";
import { SceneErrorBoundary } from "../components/SceneErrorBoundary";

export type RegionalExperienceKind = "chau-van" | "sea-prayer" | "southern-culture";

const SouthernRiverScene = lazy(() =>
  import("../components/SouthernRiverScene").then((module) => ({
    default: module.SouthernRiverScene,
  }))
);
const CentralSeaScene = lazy(
  () => import("../components/CentralSeaScene")
);
const NorthernShrineScene = lazy(
  () => import("../components/NorthernShrineScene")
);

interface RegionalExperienceScreenProps {
  kind: RegionalExperienceKind;
  currentUserEmail?: string;
  onBack: () => void;
  onGoToWish: () => void;
  onGoToMemorial: () => void;
}

const CONTENT: Record<RegionalExperienceKind, {
  region: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
}> = {
  "chau-van": {
    region: "Bắc Bộ",
    eyebrow: "Lời ca nghi lễ · Tự soi chiếu",
    title: "Một nhịp chầu văn thật chậm",
    description: "Lắng nghe câu chuyện về chầu văn, đạo Mẫu và không gian đình làng bằng một nhịp đọc tĩnh tại, tôn trọng di sản và người thực hành.",
    image: "/images/temple_bac_bo.jpg",
    icon: BookOpen,
  },
  "sea-prayer": {
    region: "Trung Bộ",
    eyebrow: "Cầu Ngư · Biển nhớ",
    title: "Gửi lời cầu bình an ra biển",
    description: "Một khoảng dừng lấy cảm hứng từ đời sống vạn chài: nhớ ơn biển, giữ sự tỉnh táo và gửi một lời chúc lành đến người đang lên đường.",
    image: "/images/hue_trung_bo.jpg",
    icon: Waves,
  },
  "southern-culture": {
    region: "Nam Bộ",
    eyebrow: "Phù sa · Nghĩa tình",
    title: "Dòng sông kể chuyện nhà",
    description: "Khám phá nếp sống rộng rãi, nghĩa tình của miền sông nước qua ký ức gia đình, mâm cơm và những mùa hoa đăng.",
    image: "/images/mekong_nam_bo.jpg",
    icon: Heart,
  },
};

export const RegionalExperienceScreen: React.FC<RegionalExperienceScreenProps> = ({
  kind,
  currentUserEmail,
  onBack,
  onGoToWish,
  onGoToMemorial,
}) => {
  const accountId =
    currentUserEmail?.trim().toLowerCase() ||
    "guest";

  const noteStorageKey =
    `tltl-regional-note-${accountId}-${kind}`;

  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [started, setStarted] = useState(false);
  const [showRiver, setShowRiver] = useState(false);
  const [showSea, setShowSea] = useState(false);
  const [showNorthernShrine, setShowNorthernShrine] =
    useState(false);

  const readingSectionRef =
    useRef<HTMLElement | null>(null);

  const readingButtonRef =
    useRef<HTMLButtonElement | null>(null);

  const handleStartReading = () => {
    if (started) {
      readingSectionRef.current?.focus();
      return;
    }

    setStarted(true);
  };

  const handleCloseReading = () => {
    setStarted(false);

    readingButtonRef.current?.focus({
      preventScroll: true,
    });
  };

  useEffect(() => {
    if (!started || kind !== "chau-van") return;

    const section = readingSectionRef.current;

    if (!section) return;

    section.focus({
      preventScroll: true,
    });

    section.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }, [started, kind]);

  const noteSaved =
    note.trim().length > 0 &&
    note.trim() === savedNote;

  useEffect(() => {
    setNoteError("");
    setStarted(false);
    setShowRiver(false);

    try {
      const stored =
        sessionStorage.getItem(noteStorageKey) || "";

      setNote(stored);
      setSavedNote(stored);
    } catch {
      setNote("");
      setSavedNote("");
      setNoteError(
        "Chưa đọc được cảm nhận trong tab này."
      );
    }
  }, [noteStorageKey]);

  useEffect(() => {
    setShowSea(false);
  }, [kind, accountId]);

  useEffect(() => {
    setShowNorthernShrine(false);
  }, [kind, accountId]);

  const handleSaveNote = () => {
    const cleanNote = note.trim();

    setNoteError("");

    if (!cleanNote) {
      setNoteError(
        "Bạn hãy viết một vài dòng trước khi lưu."
      );
      return;
    }

    if (cleanNote.length > 1000) {
      setNoteError(
        "Cảm nhận tối đa 1.000 ký tự."
      );
      return;
    }

    try {
      sessionStorage.setItem(
        noteStorageKey,
        cleanNote
      );
    } catch {
      setNoteError(
        "Chưa lưu được cảm nhận. Nội dung đang viết vẫn được giữ; hãy thử lại."
      );
      return;
    }

    setNote(cleanNote);
    setSavedNote(cleanNote);
  };

  const content = CONTENT[kind];
  const Icon = content.icon;

  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted">
          <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Vùng văn hóa</button>
          <Badge variant="outline">Trải nghiệm {content.region}</Badge>
        </div>

        <section className="grid lg:grid-cols-[1fr_0.8fr] gap-8 items-center mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-3"><Icon className="w-4 h-4" /> {content.eyebrow}</div>
            <h1 className="page-title mb-4">{content.title}</h1>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">{content.description}</p>
            <div className="flex flex-wrap gap-3">
              {kind === "chau-van" && (
                <Button
                  ref={readingButtonRef}
                  type="button"
                  onClick={handleStartReading}
                  aria-expanded={started}
                  aria-controls="regional-reading-panel"
                  className="gap-2"
                >
                  <BookOpen
                    className="h-4 w-4"
                    aria-hidden="true"
                  />

                  {started
                    ? "Trở lại phần đọc"
                    : "Mở một nhịp đọc"}
                </Button>
              )}
              {kind === "sea-prayer" && (
                <Button
                  type="button"
                  onClick={onGoToWish}
                  className="gap-2"
                >
                  <Waves
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Viết lời cầu bình an
                </Button>
              )}
              {kind === "southern-culture" && <Button className="gap-2" onClick={onGoToMemorial}><Heart className="w-4 h-4" /> Nhớ về người thân</Button>}
              {kind !== "sea-prayer" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onGoToWish}
                >
                  Gửi gắm một điều ước
                </Button>
              )}
            </div>
          </div>
          <div className="relative h-64 rounded-card overflow-hidden border border-line"><img src={content.image} alt={content.region} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-canvas/90 to-transparent" /><span className="absolute bottom-5 left-5 text-ink font-display text-lg">Một lát cắt văn hóa để lắng lại</span></div>
        </section>

        {kind === "chau-van" && <ChauVanAudioLibrary />}

        {kind === "sea-prayer" && (
          <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
            <h2 className="text-lg font-semibold text-ink">
              Không gian biển 3D
            </h2>

            <p className="mt-2 text-sm text-muted">
              Mở một cảnh biển minh họa để quan sát và nghỉ một nhịp.
              Bạn có thể tiếp tục đọc và viết lời chúc bên dưới.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-4"
              aria-expanded={showSea}
              aria-controls="central-sea-panel"
              onClick={() => setShowSea((previous) => !previous)}
            >
              {showSea ? "Đóng cảnh biển" : "Mở cảnh biển 3D"}
            </Button>

            {showSea && (
              <div id="central-sea-panel" className="mt-5">
                <SceneErrorBoundary
                  onClose={() => setShowSea(false)}
                >
                  <Suspense
                    fallback={
                      <p role="status" className="text-sm text-muted">
                        Đang tải cảnh biển…
                      </p>
                    }
                  >
                    <CentralSeaScene />
                  </Suspense>
                </SceneErrorBoundary>
              </div>
            )}
          </section>
        )}

        {kind === "southern-culture" && (
          <section className="mb-8">
            <Button
              type="button"
              variant="outline"
              aria-expanded={showRiver}
              aria-controls="southern-river-panel"
              onClick={() => setShowRiver((value) => !value)}
            >
              {showRiver
                ? "Đóng cảnh sông nước"
                : "Mở cảnh sông nước 3D"}
            </Button>

            {showRiver && (
              <div id="southern-river-panel" className="mt-4">
                <SceneErrorBoundary
                  onClose={() => setShowRiver(false)}
                >
                  <Suspense
                    fallback={
                      <p role="status" className="py-6 text-sm text-muted">
                        Đang tải cảnh sông nước…
                      </p>
                    }
                  >
                    <SouthernRiverScene wishText={note} />
                  </Suspense>
                </SceneErrorBoundary>
              </div>
            )}
          </section>
        )}

        {kind === "chau-van" && (
          <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
            <h2 className="text-lg font-semibold text-ink">
              Không gian Bắc Bộ 3D
            </h2>

            <p className="mt-2 text-sm text-muted">
              Quan sát mô hình minh họa và thử thao tác thắp nhang.
              Nội dung về đạo Mẫu và chầu văn được trình bày riêng
              trong phần bài đọc và thư viện âm thanh.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-4"
              aria-expanded={showNorthernShrine}
              aria-controls="northern-shrine-panel"
              onClick={() =>
                setShowNorthernShrine((previous) => !previous)
              }
            >
              {showNorthernShrine
                ? "Đóng không gian 3D"
                : "Mở không gian Bắc Bộ 3D"}
            </Button>

            {showNorthernShrine && (
              <div id="northern-shrine-panel" className="mt-5">
                <SceneErrorBoundary
                  onClose={() => setShowNorthernShrine(false)}
                >
                  <Suspense
                    fallback={
                      <p role="status" className="text-sm text-muted">
                        Đang tải không gian Bắc Bộ…
                      </p>
                    }
                  >
                    <NorthernShrineScene />
                  </Suspense>
                </SceneErrorBoundary>
              </div>
            )}
          </section>
        )}

        {kind === "chau-van" && started && (
          <section
            ref={readingSectionRef}
            id="regional-reading-panel"
            tabIndex={-1}
            aria-labelledby="regional-reading-title"
            className="mb-8 scroll-mt-28 rounded-card border border-line bg-surface p-5 sm:p-8"
          >
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  Một khoảng đọc và tự suy ngẫm
                </p>

                <h2
                  id="regional-reading-title"
                  className="font-display text-2xl font-semibold text-ink"
                >
                  Đọc chậm, giữ lại một điều
                </h2>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleCloseReading}
              >
                Đóng phần đọc
              </Button>
            </div>

            <p className="text-base leading-relaxed text-ink">
              {content.description}
            </p>

            <ol className="mt-6 list-decimal space-y-5 pl-5 text-sm leading-relaxed text-ink">
              <li>
                <strong>Dừng lại một chút.</strong>{" "}
                Đọc lại đoạn giới thiệu phía trên. Bạn không cần
                thực hành một nghi thức để bắt đầu tìm hiểu.
              </li>

              <li>
                <strong>Chọn điều bạn muốn hiểu thêm.</strong>{" "}
                Có thể là lời ca, nhạc cụ, không gian biểu diễn
                hoặc ý nghĩa của trải nghiệm đối với người thực hành.
                Ghi lại một câu hỏi thay vì vội kết luận.
              </li>

              <li>
                <strong>Giữ lại cảm nhận của mình.</strong>{" "}
                Điều gì khiến bạn thấy gần gũi hoặc tò mò?
                Bạn có thể viết vào ô “Ghi lại cảm nhận” bên dưới.
              </li>
            </ol>

            <p className="mt-6 rounded-panel bg-surface-soft p-4 text-sm leading-relaxed text-muted">
              Đây là gợi ý đọc và suy ngẫm do dự án biên soạn.
              Các bản thu sẵn sàng, nếu có, được trình bày riêng
              trong mục “Nghe chầu văn” cùng thông tin nguồn.
            </p>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <Card className="p-6 bg-surface-soft border-line"><h2 className="font-display text-xl font-bold mb-3">Gợi ý chiêm nghiệm</h2><p className="text-sm text-muted leading-relaxed">Hãy đọc chậm, đặt điện thoại xuống một lúc và giữ lại điều khiến bạn thấy gần gũi nhất. Đây là nội dung văn hóa, không phải lời phán định.</p></Card>
          <Card className="min-w-0 border-line p-6">
            <h2 className="mb-3 font-display text-xl font-bold">
              Ghi lại cảm nhận
            </h2>

            <Textarea
              id="regional-note"
              value={note}
              maxLength={1000}
              aria-label="Cảm nhận về trải nghiệm văn hóa"
              onChange={(event) => {
                setNote(event.target.value);
                setNoteError("");
              }}
              placeholder="Một hình ảnh, một câu chuyện, một điều muốn giữ lại…"
              className="min-h-32"
            />

            <p className="mt-2 text-xs text-muted">
              {note.length}/1.000 ký tự
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              Cảm nhận được lưu trong tab này, riêng theo hồ sơ
              và vùng văn hóa. Chưa được đồng bộ sang thiết bị khác.
            </p>

            {noteError && (
              <p
                role="alert"
                className="mt-3 text-sm leading-relaxed text-danger"
              >
                {noteError}
              </p>
            )}

            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveNote}
                disabled={!note.trim() || noteSaved}
                className="min-h-11 gap-2"
              >
                {noteSaved && (
                  <Check
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                )}

                {noteSaved
                  ? "Đã lưu trong tab này"
                  : "Lưu cảm nhận"}
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6 sm:p-8 bg-surface-soft border-line mb-12"><div className="flex items-start gap-3"><Compass className="w-5 h-5 text-accent shrink-0 mt-0.5" /><p className="text-sm text-muted leading-relaxed">Tin Lắm Tâm Linh chỉ mở ra một không gian học hỏi và tự soi chiếu. Khi có tư liệu âm thanh phù hợp bản quyền, trải nghiệm này có thể được bổ sung thêm lớp nghe.</p></div></Card>
      </main>
    </div>
  );
};
