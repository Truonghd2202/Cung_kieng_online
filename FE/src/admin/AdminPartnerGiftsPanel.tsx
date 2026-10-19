import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../lib/api";

interface Gift {
  id: string;
  name: string;
  description: string;
  partner_name: string;
  purchase_url: string;
  active: boolean;
  version: number;
}

interface GiftPage {
  items: Gift[];
  total: number;
  page: number;
  pageSize: number;
}

interface GiftForm {
  name: string;
  description: string;
  partner_name: string;
  purchase_url: string;
  active: boolean;
}

function emptyForm(): GiftForm {
  return {
    name: "",
    description: "",
    partner_name: "",
    purchase_url: "",
    active: false,
  };
}

export function AdminPartnerGiftsPanel() {
  const [data, setData] = useState<GiftPage | null>(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<Gift | null>(null);
  const [form, setForm] = useState<GiftForm>(emptyForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const lockRef = useRef(false);
  const versionRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const version = ++versionRef.current;
    setLoading(true);
    setData(null);
    setError("");

    void apiRequest<GiftPage>(
      `/partner-gifts/admin?page=${page}`
    )
      .then((result) => {
        if (version === versionRef.current) setData(result);
      })
      .catch((cause: unknown) => {
        if (version === versionRef.current) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Không tải được danh sách hộp quà."
          );
        }
      })
      .finally(() => {
        if (version === versionRef.current) setLoading(false);
      });

    return () => {
      versionRef.current += 1;
    };
  }, [page, reload]);

  function resetForm() {
    setEditing(null);
    setForm(emptyForm());
  }

  function editGift(gift: Gift) {
    if (lockRef.current) return;

    setEditing(gift);
    setForm({
      name: gift.name,
      description: gift.description,
      partner_name: gift.partner_name,
      purchase_url: gift.purchase_url,
      active: gift.active,
    });
    setError("");
    setMessage("");
  }

  async function save() {
    if (lockRef.current || loading) return;

    const values = {
      name: form.name.trim(),
      description: form.description.trim(),
      partner_name: form.partner_name.trim(),
      purchase_url: form.purchase_url.trim(),
    };

    if (
      values.name.length < 3 ||
      values.description.length < 30 ||
      values.partner_name.length < 2
    ) {
      setError(
        "Tên cần ít nhất 3 ký tự, mô tả 30 ký tự và tên đối tác 2 ký tự."
      );
      return;
    }

    try {
      const url = new URL(values.purchase_url);
      if (
        url.protocol !== "https:" ||
        url.username ||
        url.password ||
        url.port
      ) {
        throw new Error("Invalid URL");
      }
    } catch {
      setError("Nhập liên kết HTTPS hợp lệ của đối tác.");
      return;
    }

    lockRef.current = true;
    setBusy(true);
    setError("");
    setMessage("");

    try {
      await apiRequest<Gift>(
        editing
          ? `/partner-gifts/admin/${editing.id}`
          : "/partner-gifts/admin",
        {
          method: editing ? "PATCH" : "POST",
          body: JSON.stringify(
            editing
              ? {
                  ...values,
                  active: form.active,
                  version: editing.version,
                }
              : values
          ),
        }
      );

      if (!mountedRef.current) return;

      setMessage(
        editing
          ? "Đã cập nhật hộp quà."
          : "Đã tạo hộp quà ở trạng thái ẩn."
      );
      resetForm();
      setReload((current) => current + 1);
    } catch (cause: unknown) {
      if (mountedRef.current) {
        setError(
          cause instanceof Error
            ? cause.message
            : "Không lưu được hộp quà."
        );
      }
    } finally {
      lockRef.current = false;
      if (mountedRef.current) setBusy(false);
    }
  }

  const disabled = loading || busy;
  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / data.pageSize))
    : 1;

  return (
    <section aria-label="Quản lý hộp quà đối tác">
      <h2>Hộp quà văn hóa từ đối tác</h2>
      <p>
        Chỉ đăng sản phẩm của đối tác đã xác nhận. Khách mua hàng
        tại website đối tác; giá, giao hàng và đổi trả do đối tác
        cung cấp. Chưa hỗ trợ ảnh trong phiên bản này.
      </p>

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void save();
        }}
      >
        <h3>{editing ? "Sửa hộp quà" : "Thêm hộp quà"}</h3>

        <fieldset disabled={disabled}>
          <legend>Thông tin sản phẩm</legend>

          <label style={{ display: "block", marginBottom: 12 }}>
            Tên hộp quà
            <input
              required
              minLength={3}
              maxLength={200}
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              style={{ display: "block", width: "100%" }}
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            Tên đối tác cung cấp
            <input
              required
              minLength={2}
              maxLength={200}
              value={form.partner_name}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  partner_name: event.target.value,
                }))
              }
              style={{ display: "block", width: "100%" }}
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            Mô tả
            <textarea
              required
              minLength={30}
              maxLength={5000}
              rows={5}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              style={{ display: "block", width: "100%" }}
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            Liên kết sản phẩm tại đối tác
            <input
              required
              type="url"
              maxLength={2000}
              placeholder="https://..."
              value={form.purchase_url}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  purchase_url: event.target.value,
                }))
              }
              style={{ display: "block", width: "100%" }}
            />
          </label>

          <p>
            BE chỉ chấp nhận tên miền đã được khai báo trong
            partner-domains.js.
          </p>

          {editing ? (
            <label style={{ display: "block", marginBottom: 12 }}>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    active: event.target.checked,
                  }))
                }
              />{" "}
              Hiển thị cho khách
            </label>
          ) : (
            <p>Sản phẩm mới được tạo ở trạng thái ẩn.</p>
          )}

          <button type="submit">
            {busy
              ? "Đang lưu…"
              : editing
                ? "Lưu thay đổi"
                : "Tạo bản ẩn"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={resetForm}
              style={{ marginLeft: 12 }}
            >
              Hủy chỉnh sửa
            </button>
          )}
        </fieldset>
      </form>

      <hr />

      <button
        type="button"
        disabled={disabled}
        onClick={() => setReload((current) => current + 1)}
      >
        Tải lại danh sách
      </button>

      {editing && (
        <p>
          Nếu gặp lỗi phiên bản, tải lại danh sách rồi chọn lại
          sản phẩm để sửa trên dữ liệu mới nhất.
        </p>
      )}

      {loading && <p role="status">Đang tải hộp quà…</p>}

      {!loading && data?.items.length === 0 && (
        <p>Chưa có hộp quà. Không cần tạo sản phẩm giả để lấp danh sách.</p>
      )}

      {!loading &&
        data?.items.map((gift) => (
          <article
            key={gift.id}
            style={{
              border: "1px solid #d6d3d1",
              borderRadius: 12,
              padding: 16,
              marginTop: 16,
              overflowWrap: "anywhere",
            }}
          >
            <h3>{gift.name}</h3>
            <p>Đối tác: {gift.partner_name}</p>
            <p>Trạng thái: {gift.active ? "Đang hiển thị" : "Đang ẩn"}</p>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {gift.description}
            </p>
            <p>Liên kết đã lưu: {gift.purchase_url}</p>
            <button
              type="button"
              disabled={disabled}
              onClick={() => editGift(gift)}
            >
              Chỉnh sửa
            </button>
          </article>
        ))}

      {!loading && data && data.total > 0 && (
        <nav
          aria-label="Phân trang hộp quà"
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <button
            type="button"
            disabled={disabled || page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Trang trước
          </button>
          <span>Trang {page}/{totalPages}</span>
          <button
            type="button"
            disabled={disabled || page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Trang sau
          </button>
        </nav>
      )}
    </section>
  );
}
