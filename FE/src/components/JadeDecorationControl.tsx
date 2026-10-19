import type {
  useJadeDecoration,
} from "../hooks/useJadeDecoration";

export function JadeDecorationControl({
  state,
}: {
  state: ReturnType<typeof useJadeDecoration>;
}) {
  return (
    <div className="my-4 rounded-xl border border-line p-4">
      <label className="block text-sm font-semibold">
        Vật phẩm trang trí
        <select
          className="mt-2 block min-h-11 w-full rounded-lg border border-line bg-surface p-3 text-ink"
          value={state.selected ?? ""}
          disabled={
            state.loading ||
            state.busy ||
            Boolean(state.error)
          }
          onChange={(event) =>
            void state.change(event.target.value)
          }
        >
          <option value="">Không bày vật phẩm bổ sung</option>

          {state.items.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <p role="status" className="mt-2 text-sm text-muted">
        {state.loading
          ? "Đang tải vật phẩm…"
          : state.busy
            ? "Đang lưu lựa chọn…"
            : !state.items.length
              ? "Bạn chưa sở hữu vật phẩm trang trí cho cảnh này."
              : "Lựa chọn được lưu theo tài khoản. Bật/tắt không trừ số lượng."}
      </p>

      <p className="mt-2 text-xs text-muted">
        Vật phẩm chỉ thay đổi trang trí, không làm tăng
        hiệu lực của nghi thức hay lời nguyện.
      </p>

      {state.error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {state.error}
        </p>
      )}

      <button
        type="button"
        disabled={state.loading || state.busy}
        onClick={state.retry}
        className="mt-3 min-h-11 rounded-lg border border-line px-3 py-2 text-sm"
      >
        Tải lại vật phẩm
      </button>
    </div>
  );
}
