import { useEffect, useRef, useState } from "react";
import { ApiError, apiRequest } from "../lib/api";

type Entry = {
  slug: string;
  title: string;
  excerpt: string | null;
};

type Article = Entry & {
  source: string | null;
  sections: Array<{
    heading?: string;
    title?: string;
    body?: string | string[];
  }>;
  provenance: {
    sourceTitle?: string;
    sourceAuthor?: string;
    sourceLocator?: string;
    bibliography?: string;
  } | null;
};

export function MemberLibrary({
  email,
}: {
  email?: string;
}) {
  const [items, setItems] = useState<Entry[]>([]);
  const [article, setArticle] = useState<Article | null>(null);
  const [offset, setOffset] = useState(0);
  const [nextOffset, setNextOffset] = useState<number | null>(null);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(false);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState("");

  const openVersion = useRef(0);

  useEffect(() => {
    let active = true;

    setArticle(null);
    setItems([]);
    setError("");
    setNextOffset(null);
    openVersion.current += 1;

    if (!email) {
      setLoading(false);
      return;
    }

    setLoading(true);

    void apiRequest<{
      items: Entry[];
      nextOffset: number | null;
    }>(`/membership/library?offset=${offset}`)
      .then((result) => {
        if (!active) return;

        setItems(result.items);
        setNextOffset(result.nextOffset);
      })
      .catch((reason) => {
        if (!active) return;

        setError(
          reason instanceof ApiError && reason.status === 403
            ? "Thư viện dành cho hội viên Tâm An đang hoạt động."
            : "Chưa tải được thư viện. Bạn hãy thử lại."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      openVersion.current += 1;
    };
  }, [email, offset, reload]);

  const open = async (slug: string) => {
    const version = ++openVersion.current;

    setOpening(true);
    setError("");
    setArticle(null);

    try {
      const result = await apiRequest<Article>(
        `/membership/library/${encodeURIComponent(slug)}`
      );

      if (version === openVersion.current) {
        setArticle(result);
      }
    } catch (reason) {
      if (version !== openVersion.current) return;

      setError(
        reason instanceof Error
          ? reason.message
          : "Chưa mở được bài."
      );
    } finally {
      if (version === openVersion.current) {
        setOpening(false);
      }
    }
  };

  const buttonClass =
    "min-h-11 rounded-xl border border-line px-4 py-2 text-sm disabled:opacity-50";

  return (
    <section
      className="my-8 rounded-3xl border border-line bg-surface p-6"
      aria-labelledby="member-library-title"
    >
      <h2
        id="member-library-title"
        className="text-xl font-semibold text-ink"
      >
        Thư viện hội viên
      </h2>

      {!email && (
        <p className="mt-3 text-sm text-muted">
          Đăng nhập để kiểm tra quyền truy cập thư viện.
        </p>
      )}

      {(loading || opening) && (
        <p role="status" className="mt-3 text-sm text-muted">
          {loading ? "Đang tải thư viện…" : "Đang mở bài…"}
        </p>
      )}

      {error && (
        <div role="alert" className="mt-3 space-y-3">
          <p className="text-sm text-muted">{error}</p>

          <button
            type="button"
            disabled={loading || opening}
            className={buttonClass}
            onClick={() => setReload((value) => value + 1)}
          >
            Kiểm tra lại thư viện
          </button>
        </div>
      )}

      {email && !loading && !error && items.length === 0 && (
        <p className="mt-3 text-sm text-muted">
          Chưa có bài hội viên được xuất bản.
        </p>
      )}

      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.slug}>
            <button
              type="button"
              disabled={loading || opening}
              className="min-h-11 text-left font-semibold text-ink disabled:opacity-50"
              onClick={() => void open(item.slug)}
            >
              {item.title}
            </button>

            {item.excerpt && (
              <p className="text-sm text-muted">
                {item.excerpt}
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-3">
        {offset > 0 && (
          <button
            type="button"
            disabled={loading || opening}
            className={buttonClass}
            onClick={() =>
              setOffset((value) => Math.max(0, value - 20))
            }
          >
            Trang trước
          </button>
        )}

        {nextOffset !== null && (
          <button
            type="button"
            disabled={loading || opening}
            className={buttonClass}
            onClick={() => setOffset(nextOffset)}
          >
            Trang sau
          </button>
        )}
      </div>

      {article && (
        <article className="mt-6 space-y-4 border-t border-line pt-6">
          <h3 className="text-xl font-semibold text-ink">
            {article.title}
          </h3>

          {article.sections.map((section, index) => (
            <section key={index}>
              {(section.heading || section.title) && (
                <h4 className="mb-2 font-semibold">
                  {section.heading || section.title}
                </h4>
              )}

              <p className="whitespace-pre-wrap leading-relaxed">
                {Array.isArray(section.body)
                  ? section.body.join("\n\n")
                  : section.body}
              </p>
            </section>
          ))}

          <div className="space-y-1 text-sm text-muted">
            <p>
              Nguồn:{" "}
              {article.provenance?.sourceTitle ||
                article.source ||
                "Xem hồ sơ biên soạn của bài."}
            </p>

            {article.provenance?.sourceLocator && (
              <p>
                Vị trí nguồn: {article.provenance.sourceLocator}
              </p>
            )}

            {article.provenance?.bibliography && (
              <p>{article.provenance.bibliography}</p>
            )}
          </div>
        </article>
      )}
    </section>
  );
}
