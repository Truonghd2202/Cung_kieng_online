import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { ContentProvenance } from "./ContentProvenance";
import { getPublishableTraditionalSticks } from
  "../data/traditionalXamEligibility";
import {
  TRADITIONAL_XAM_COLLECTIONS,
  type TraditionalXamCollectionId,
  type TraditionalXamStick,
} from "../data/traditionalXamData";
import type { TopicType } from "../data/xinXamData";
import {
  saveTraditionalXam,
  useSavedTraditionalXam,
  type TraditionalXamSaveRequest,
} from "../data/savedTraditionalXam";

const COLLECTION_CHOICES: {
  id: TraditionalXamCollectionId;
  title: string;
}[] = [
  { id: "quan-am", title: "Xăm Quan Âm" },
  { id: "quan-thanh", title: "Xăm Quan Thánh" },
];

const TOPICS: TopicType[] = [
  "Bình an",
  "Học tập",
  "Công việc",
  "Gia đình",
];

type TraditionalHistorySnapshot = {
  entryId: string;
  account: string;
  collectionId: TraditionalXamCollectionId;
  topic: TopicType;
  stickId: string | null;
};

function readTraditionalHistory(
  account: string
): TraditionalHistorySnapshot | null {
  const value = window.history.state?.traditionalXam;

  if (
    !value ||
    typeof value !== "object" ||
    typeof value.entryId !== "string" ||
    !value.entryId ||
    value.account !== account ||
    !COLLECTION_CHOICES.some(
      (item) => item.id === value.collectionId
    ) ||
    !TOPICS.includes(value.topic) ||
    !(
      value.stickId === null ||
      typeof value.stickId === "string"
    )
  ) {
    return null;
  }

  return {
    entryId: value.entryId,
    account: value.account,
    collectionId: value.collectionId,
    topic: value.topic,
    stickId: value.stickId,
  };
}

interface TraditionalXamExperienceProps {
  currentUserEmail?: string;
  onRequestLoginToSave: (
    request: TraditionalXamSaveRequest
  ) => void;
}

export function TraditionalXamExperience({
  currentUserEmail,
  onRequestLoginToSave,
}: TraditionalXamExperienceProps) {
  const instanceId = useId();

  const account =
    currentUserEmail?.trim().toLowerCase() || "guest";

  const [initialSnapshot] = useState(() =>
    readTraditionalHistory(account)
  );

  const entryIdRef = useRef(
    initialSnapshot?.entryId ?? crypto.randomUUID()
  );

  const [collectionId, setCollectionId] =
    useState<TraditionalXamCollectionId>(
      initialSnapshot?.collectionId ?? "quan-am"
    );

  const [topic, setTopic] = useState<TopicType>(
    initialSnapshot?.topic ?? "Bình an"
  );

  const [result, setResult] =
    useState<TraditionalXamStick | null>(() => {
      if (!initialSnapshot?.stickId) return null;

      return (
        getPublishableTraditionalSticks(
          initialSnapshot.collectionId,
          initialSnapshot.topic
        ).find(
          (item) => item.id === initialSnapshot.stickId
        ) ?? null
      );
    });

  const [notice, setNotice] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [saveError, setSaveError] = useState("");

  const {
    items: savedItems,
    readError,
  } = useSavedTraditionalXam(currentUserEmail);

  const drawLockedRef = useRef(false);

  const drawTimerRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const collection = TRADITIONAL_XAM_COLLECTIONS.find(
    (item) => item.id === collectionId
  );

  const isSaved =
    result !== null &&
    collection !== undefined &&
    savedItems.some(
      (item) =>
        item.collectionId === collectionId &&
        item.editionLabel === collection.editionLabel &&
        item.stickId === result.id &&
        item.topic === topic
    );

  const handleSave = () => {
    setSaveError("");

    if (!currentUserEmail || !result || isDrawing) return;

    const saved = saveTraditionalXam(
      currentUserEmail,
      collectionId,
      topic,
      result.id
    );

    if (!saved) {
      setSaveError(
        "Chưa lưu được thẻ. Thẻ có thể không còn đủ điều kiện hoặc trình duyệt chưa lưu được dữ liệu."
      );
    }
  };

  useEffect(() => {
    setSaveError("");
  }, [collectionId, topic, result?.id]);

  const available = getPublishableTraditionalSticks(
    collectionId,
    topic
  );

  const selectedTitle =
    COLLECTION_CHOICES.find(
      (item) => item.id === collectionId
    )?.title ?? "Bộ xăm";

  useEffect(() => {
    if (window.location.pathname !== "/xinxam") return;

    const previousState = window.history.state ?? {};
    const previousSnapshot = previousState.traditionalXam;

    // Chặn ghi nhầm sang mục lịch sử khác của cùng tài khoản.
    // Snapshot của tài khoản khác được thay bằng trạng thái
    // mới của tài khoản hiện tại.
    if (
      previousSnapshot?.account === account &&
      previousSnapshot?.entryId &&
      previousSnapshot.entryId !== entryIdRef.current
    ) {
      return;
    }

    const snapshot: TraditionalHistorySnapshot = {
      entryId: entryIdRef.current,
      account,
      collectionId,
      topic,
      stickId: result?.id ?? null,
    };

    window.history.replaceState(
      {
        ...previousState,
        traditionalXam: snapshot,
      },
      "",
      window.location.href
    );
  }, [account, collectionId, topic, result]);

  useEffect(() => {
    return () => {
      if (drawTimerRef.current !== null) {
        clearTimeout(drawTimerRef.current);
        drawTimerRef.current = null;
      }

      drawLockedRef.current = false;
    };
  }, []);

  const changeCollection = (
    next: TraditionalXamCollectionId
  ) => {
    if (drawLockedRef.current) return;

    setCollectionId(next);
    setResult(null);
    setNotice("");
  };

  const changeTopic = (next: TopicType) => {
    if (drawLockedRef.current) return;

    setTopic(next);
    setResult(null);
    setNotice("");
  };

  const handleDraw = () => {
    if (drawLockedRef.current) return;

    const eligible = getPublishableTraditionalSticks(
      collectionId,
      topic
    );

    if (eligible.length === 0) {
      setResult(null);
      setNotice(
        "Chưa có thẻ đủ điều kiện cho lựa chọn này."
      );
      return;
    }

    const chosen =
      eligible[Math.floor(Math.random() * eligible.length)];

    const finish = () => {
      // Kiểm tra lại dữ liệu ở thời điểm trả kết quả.
      const stillEligible = getPublishableTraditionalSticks(
        collectionId,
        topic
      ).find((item) => item.id === chosen.id);

      if (!stillEligible) {
        setResult(null);
        setNotice(
          "Thẻ này hiện chưa đủ điều kiện hiển thị."
        );
      } else {
        setResult(stillEligible);

        setNotice(
          eligible.length === 1
            ? "Kho hiện có một thẻ phù hợp; rút lại sẽ nhận cùng thẻ."
            : "Đã chọn một thẻ từ phần nội dung đang có trong kho."
        );
      }

      setIsDrawing(false);
      drawLockedRef.current = false;
    };

    drawLockedRef.current = true;
    setNotice("");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      finish();
      return;
    }

    setIsDrawing(true);

    drawTimerRef.current = setTimeout(() => {
      drawTimerRef.current = null;

      const sameEntry =
        window.location.pathname === "/xinxam" &&
        window.history.state?.traditionalXam?.entryId ===
          entryIdRef.current;

      if (!sameEntry) {
        drawLockedRef.current = false;
        setIsDrawing(false);
        return;
      }

      finish();
    }, 1200);
  };

  return (
    <section
      aria-labelledby={`${instanceId}-title`}
      className="space-y-5"
    >
      <header>
        <h2
          id={`${instanceId}-title`}
          className="mb-3 font-display text-xl font-semibold text-ink"
        >
          Chọn bộ xăm truyền thống
        </h2>

        <p className="text-sm leading-relaxed text-muted">
          Bộ xăm và bản lưu truyền được trình bày riêng.
          Lời gợi mở theo chủ đề không thay đổi nguyên văn thẻ.
        </p>
      </header>

      <fieldset>
        <legend className="mb-3 font-semibold text-ink">
          Bộ xăm
        </legend>

        <div className="grid gap-3 sm:grid-cols-2">
          {COLLECTION_CHOICES.map((choice) => (
            <label
              key={choice.id}
              className="flex min-h-14 cursor-pointer items-center gap-3 rounded-control border border-line bg-canvas p-4"
            >
              <input
                type="radio"
                name={`${instanceId}-collection`}
                value={choice.id}
                checked={collectionId === choice.id}
                onChange={() => changeCollection(choice.id)}
                disabled={isDrawing}
                className="h-4 w-4 accent-action"
              />

              <span className="font-semibold text-ink">
                {choice.title}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-semibold text-ink">
          Chủ đề chiêm nghiệm
        </legend>

        <div className="grid gap-3 sm:grid-cols-2">
          {TOPICS.map((item) => (
            <label
              key={item}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-control border border-line p-3"
            >
              <input
                type="radio"
                name={`${instanceId}-topic`}
                value={item}
                checked={topic === item}
                onChange={() => changeTopic(item)}
                disabled={isDrawing}
                className="h-4 w-4 accent-action"
              />

              <span className="text-ink">{item}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div
        id={`${instanceId}-availability`}
        role="status"
        className="rounded-panel border border-line bg-canvas p-4 text-sm leading-relaxed text-muted"
      >
        {!collection ? (
          <p>
            {selectedTitle} chưa có bộ dữ liệu trong bản hiện tại.
            Bạn vẫn có thể dùng trải nghiệm thẻ mẫu bên trên.
          </p>
        ) : available.length === 0 ? (
          <>
            <p className="font-semibold text-ink">
              Chưa sẵn sàng để rút thẻ
            </p>

            <p className="mt-2">
              Bộ này đã có dữ liệu nhập thử, nhưng chưa có thẻ
              đáp ứng đầy đủ điều kiện sử dụng cho chủ đề này.
            </p>
          </>
        ) : (
          <>
            <p className="font-semibold text-ink">
              Có {available.length} thẻ đủ điều kiện
            </p>

            <p className="mt-2">
              Đây là số thẻ đang dùng được trong kho ứng dụng,
              không phải khẳng định toàn bộ bộ xăm đã được số hóa.
            </p>
          </>
        )}
      </div>

      {collection && (
        <p className="text-sm leading-relaxed text-muted">
          Bản tư liệu: {collection.editionLabel}
        </p>
      )}

      <Button
        type="button"
        onClick={handleDraw}
        disabled={isDrawing || available.length === 0}
        aria-describedby={`${instanceId}-availability`}
        className="w-full sm:w-auto"
      >
        {isDrawing
          ? "Đang rút thẻ…"
          : available.length > 0
            ? result
              ? "Rút lại từ bộ này"
              : "Rút một thẻ"
            : "Chưa có thẻ để rút"}
      </Button>

      {isDrawing && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 rounded-panel border border-line bg-canvas p-4"
        >
          <span
            aria-hidden="true"
            className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-line border-t-accent motion-reduce:animate-none"
          />

          <p className="text-sm text-muted">
            Đang chọn một thẻ từ bộ bạn đã chọn…
          </p>
        </div>
      )}

      {notice && (
        <p role="status" className="text-sm text-muted">
          {notice}
        </p>
      )}

      {result && !isDrawing && (
        <article className="space-y-5 rounded-card border border-line bg-canvas p-5">
          <header>
            <h3 className="font-display text-xl font-semibold text-ink">
              {selectedTitle} — Thẻ số {result.stickNumber}
            </h3>

            <p className="mt-2 text-sm text-muted">
              Nội dung để tìm hiểu và chiêm nghiệm,
              không bảo đảm kết quả tương lai.
            </p>
          </header>

          <section>
            <h4 className="mb-3 font-semibold text-ink">
              Nguyên văn
            </h4>

            <div
              lang="zh-Hant"
              className="space-y-2 text-xl leading-relaxed text-ink"
            >
              {result.originalLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </section>

          {result.translation && (
            <section>
              <h4 className="mb-3 font-semibold text-ink">
                Bản dịch
              </h4>

              <div className="space-y-2 text-ink">
                {result.translation.lines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              <p className="mt-3 text-sm text-muted">
                {result.translation.attribution}
              </p>

              <div className="mt-4">
                <ContentProvenance
                  metadata={result.translation.metadata}
                />
              </div>
            </section>
          )}

          {result.culturalContext && (
            <section className="rounded-card border border-line bg-canvas p-4">
              <h4 className="font-semibold text-ink">
                {result.culturalContext.title}
              </h4>

              <p className="mt-3 text-sm leading-relaxed text-ink">
                {result.culturalContext.description}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-muted">
                Vị trí đối chiếu: {result.culturalContext.sourceLocator}
              </p>

              <p className="mt-2 text-xs text-muted">
                Đây là bối cảnh văn bản, tách riêng với lời chiêm nghiệm
                do sản phẩm biên soạn.
              </p>
            </section>
          )}

          <section>
            <h4 className="mb-3 font-semibold text-ink">
              Gợi mở về {topic.toLocaleLowerCase("vi-VN")}
            </h4>

            <p className="leading-relaxed text-ink">
              {result.reflectionByTopic[topic]}
            </p>

            <p className="mt-3 text-sm text-muted">
              Phần gợi mở do sản phẩm biên soạn,
              được trình bày riêng với nguyên văn.
            </p>
          </section>

          <ContentProvenance metadata={result.metadata} />

          <div className="border-t border-line pt-5">
            {currentUserEmail ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleSave}
                disabled={isSaved || readError}
                className="w-full sm:w-auto"
              >
                {isSaved
                  ? "Đã lưu vào Góc của tôi"
                  : "Lưu thẻ vào Góc của tôi"}
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-muted">
                  Đăng nhập để lưu thẻ đang đọc vào Góc của tôi.
                  Bạn không cần rút lại.
                </p>

                <Button
                  type="button"
                  variant="outline"
                  disabled={!collection}
                  onClick={() => {
                    if (!collection || !result || isDrawing) return;

                    onRequestLoginToSave({
                      collectionId,
                      topic,
                      stickId: result.id,
                      editionLabel: collection.editionLabel,
                    });
                  }}
                  className="w-full sm:w-auto"
                >
                  Đăng nhập để lưu thẻ
                </Button>
              </div>
            )}

            {(saveError || readError) && (
              <p role="alert" className="mt-3 text-sm text-danger">
                {saveError ||
                  "Chưa đọc được kho thẻ đã lưu. Dữ liệu hiện có chưa bị ghi đè."}
              </p>
            )}
          </div>
        </article>
      )}
    </section>
  );
}
