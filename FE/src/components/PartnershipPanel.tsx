import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../lib/api";
import { isDemoMode } from "../data/demoMode";
import { readDemoValue, writeDemoValue } from "../data/demoStorage";

type Status = "NEW" | "REVIEWING" | "CLOSED";

interface Entry {
  id: string;
  organization: string;
  message: string;
  status: Status;
  users?: { email: string };
}

const labels: Record<Status, string> = {
  NEW: "Đã tiếp nhận",
  REVIEWING: "Đang xem xét",
  CLOSED: "Đã đóng",
};

export function PartnershipPanel({
  admin = false,
}: {
  admin?: boolean;
}) {
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<Entry[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [reload, setReload] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  const lock = useRef(false);
  const mounted = useRef(false);
  const attempt = useRef<{
    id: string;
    organization: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setItems([]);

    if (isDemoMode() && !admin) {
      const demoEntries = readDemoValue<Entry[]>("partnerships", [
        { id: "demo-partnership-1", organization: "Không gian văn hóa An Nhiên", message: "Mong muốn kết nối để giới thiệu các hoạt động gìn giữ văn hóa Việt và trải nghiệm tâm linh lành mạnh.", status: "REVIEWING" },
      ]);
      setItems(demoEntries.slice((page - 1) * pageSize, page * pageSize));
      setTotal(demoEntries.length);
      setLoading(false);
      return;
    }

    const path = admin
      ? "/partnerships/admin"
      : "/partnerships";

    void apiRequest<{
      items: Entry[];
      total: number;
      page: number;
      pageSize: number;
    }>(`${path}?page=${page}`)
      .then((result) => {
        if (!active) return;
        setItems(result.items);
        setTotal(result.total);
      })
      .catch(() => {
        if (!active) return;
        setTotal(0);
        setNotice("Chưa tải được đề xuất. Hãy thử tải lại.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [admin, reload, page]);

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (lock.current) return;

    const cleanOrganization = organization.trim();
    const cleanMessage = message.trim();

    if (!cleanOrganization || cleanMessage.length < 20) {
      setNotice("Điền tên đơn vị và nhu cầu ít nhất 20 ký tự.");
      return;
    }

    if (
      !attempt.current ||
      attempt.current.organization !== cleanOrganization ||
      attempt.current.message !== cleanMessage
    ) {
      attempt.current = {
        id: crypto.randomUUID(),
        organization: cleanOrganization,
        message: cleanMessage,
      };
    }

    lock.current = true;
    setBusy(true);
    setNotice("");

    try {
      if (isDemoMode() && !admin) {
        const entries = readDemoValue<Entry[]>("partnerships", []);
        entries.unshift({
          id: `demo-partnership-${crypto.randomUUID()}`,
          organization: cleanOrganization,
          message: cleanMessage,
          status: "NEW",
        });
        writeDemoValue("partnerships", entries);
        if (!mounted.current) return;
        setMessage("");
        setNotice("Đã lưu đề xuất minh họa trên trình duyệt này.");
        setPage(1);
        setReload((value) => value + 1);
        return;
      }
      await apiRequest("/partnerships", {
        method: "POST",
        body: JSON.stringify({
          requestId: attempt.current.id,
          organization: cleanOrganization,
          message: cleanMessage,
        }),
      });

      if (!mounted.current) return;

      attempt.current = null;
      setMessage("");
      setNotice(
        "Đã tiếp nhận đề xuất. Đây chưa phải xác nhận báo giá hoặc hợp đồng."
      );
      setPage(1);
      setReload((value) => value + 1);
    } catch (error) {
      if (mounted.current) {
        setNotice(
          error instanceof Error
            ? error.message
            : "Chưa xác nhận được việc gửi."
        );
      }
    } finally {
      lock.current = false;
      if (mounted.current) setBusy(false);
    }
  };

  const changeStatus = async (id: string, status: Status) => {
    if (lock.current) return;

    lock.current = true;
    setBusy(true);
    setNotice("");

    try {
      await apiRequest(`/partnerships/admin/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      if (mounted.current) {
        setItems((current) =>
          current.map((item) =>
            item.id === id ? { ...item, status } : item
          )
        );
      }
    } catch (error) {
      if (mounted.current) {
        setNotice(
          error instanceof Error
            ? error.message
            : "Chưa cập nhật được trạng thái."
        );
        setReload((value) => value + 1);
      }
    } finally {
      lock.current = false;
      if (mounted.current) setBusy(false);
    }
  };

  const inputClass =
    "mt-2 block w-full rounded-lg border border-line bg-surface p-3 text-ink";

  return (
    <section className="my-6 rounded-xl border border-line bg-surface p-5">
      <h2 className="text-xl font-semibold">
        {admin ? "Đề xuất hợp tác" : "Hợp tác văn hóa và quà tặng"}
      </h2>

      {!admin && (
        <form onSubmit={(event) => void send(event)} className="mt-4">
          <fieldset disabled={busy} className="space-y-4">
            <label className="block">
              Tên đơn vị
              <input
                required
                maxLength={200}
                value={organization}
                onChange={(event) => setOrganization(event.target.value)}
                className={inputClass}
              />
            </label>

            <label className="block">
              Nhu cầu hợp tác
              <textarea
                required
                minLength={20}
                maxLength={3000}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={inputClass}
              />
            </label>

            <p className="text-sm text-muted">
              Nội dung được gửi lên máy chủ để nhóm quản trị xem xét.
              Nhóm có thể dùng email tài khoản để liên hệ nếu cần.
              Không nhập thông tin bí mật hoặc dữ liệu nhạy cảm.
            </p>

            <button className="min-h-11 rounded-lg border px-4 py-2">
              {busy ? "Đang gửi…" : "Gửi đề xuất"}
            </button>
          </fieldset>
        </form>
      )}

      {notice && <p role="status" className="mt-3">{notice}</p>}
      {loading && <p role="status">Đang tải đề xuất…</p>}

      {!loading && (
        <p className="mt-4 text-xs text-muted">
          {total} đề xuất · Trang {page}
        </p>
      )}

      {!loading && total === 0 && (
        <p className="mt-3 text-sm text-muted">
          Chưa có đề xuất để hiển thị.
        </p>
      )}

      <ul className="mt-3 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="rounded-lg border border-line p-4">
            <h3 className="font-semibold">{item.organization}</h3>
            {admin && <p>{item.users?.email}</p>}
            <p className="whitespace-pre-wrap">{item.message}</p>
            <p className="mt-2 text-sm">{labels[item.status]}</p>

            {admin && (
              <select
                aria-label={`Trạng thái đề xuất ${item.organization}`}
                value={item.status}
                disabled={busy || loading}
                onChange={(event) =>
                  void changeStatus(item.id, event.target.value as Status)
                }
                className={inputClass}
              >
                <option value="NEW">Đã tiếp nhận</option>
                <option value="REVIEWING">Đang xem xét</option>
                <option value="CLOSED">Đã đóng</option>
              </select>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={loading || busy || page <= 1}
          onClick={() => setPage((value) => value - 1)}
          className="min-h-11 rounded-lg border border-line px-4 py-2 disabled:opacity-50"
        >
          Trang trước
        </button>

        <button
          type="button"
          disabled={
            loading ||
            busy ||
            page * pageSize >= total
          }
          onClick={() => setPage((value) => value + 1)}
          className="min-h-11 rounded-lg border border-line px-4 py-2 disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>

      <button
        type="button"
        disabled={loading || busy}
        onClick={() => setReload((value) => value + 1)}
        className="mt-4 min-h-11 rounded-lg border px-4 py-2"
      >
        Tải lại danh sách
      </button>
    </section>
  );
}
