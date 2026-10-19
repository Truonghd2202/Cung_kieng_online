const API_TIMEOUT_MS = 30_000;

// Dành cho REST API trả JSON, không dùng cho streaming.
export const fetchApiWithTimeout: typeof fetch = async (
  input,
  init
) => {
  const controller = new AbortController();

  const upstreamSignal =
    init?.signal ??
    (input instanceof Request ? input.signal : undefined);

  let timedOut = false;

  const abortFromCaller = () => {
    controller.abort(upstreamSignal?.reason);
  };

  if (upstreamSignal?.aborted) {
    abortFromCaller();
  } else {
    upstreamSignal?.addEventListener(
      "abort",
      abortFromCaller,
      { once: true }
    );
  }

  const timer = globalThis.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, API_TIMEOUT_MS);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });

    // Đọc body trong thời hạn để tránh nhận được headers
    // nhưng chờ nội dung vô thời hạn.
    const body = await response.arrayBuffer();

    const method = (
      init?.method ??
      (input instanceof Request ? input.method : "GET")
    ).toUpperCase();

    const hasNoBody =
      method === "HEAD" ||
      [204, 205, 304].includes(response.status);

    return new Response(hasNoBody ? null : body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    if (timedOut && !upstreamSignal?.aborted) {
      throw new DOMException(
        "Máy chủ phản hồi quá thời gian chờ.",
        "TimeoutError"
      );
    }

    throw error;
  } finally {
    globalThis.clearTimeout(timer);

    upstreamSignal?.removeEventListener(
      "abort",
      abortFromCaller
    );
  }
};
