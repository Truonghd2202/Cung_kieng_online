export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field?: string; message: string; code?: string }>;
}

export class ApiError extends Error {
  status: number;
  errors: Array<{ field?: string; message: string; code?: string }>;

  constructor(status: number, message: string, errors: Array<{ field?: string; message: string; code?: string }> = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export type SessionRefreshResult =
  | { status: "authenticated"; token: string }
  | { status: "invalid" }
  | { status: "unavailable"; error: ApiError };

const SESSION_CHANGED = "Phiên đăng nhập đã thay đổi. Vui lòng tải lại dữ liệu của tài khoản hiện tại.";

function toConnectionError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (
    error instanceof Error &&
    error.name === "TimeoutError"
  ) {
    return new ApiError(
      0,
      "Máy chủ phản hồi quá thời gian chờ. Nếu vừa lưu hoặc thanh toán, hãy kiểm tra trạng thái trước khi gửi lại."
    );
  }

  return new ApiError(
    0,
    "Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối và thử lại."
  );
}

export function createSessionApiClient(options: {
  baseUrl: string;
  fetcher?: typeof fetch;
  rememberMe?: () => boolean;
}) {
  const fetcher = options.fetcher || fetch;
  let accessToken: string | null = null;
  let sessionGeneration = 0;
  let refreshRequest: { generation: number; promise: Promise<SessionRefreshResult> } | null = null;

  const resolveUrl = (path: string) => `${options.baseUrl.replace(/\/$/, "")}${path}`;
  const assertSession = (generation: number) => {
    if (generation !== sessionGeneration) throw new ApiError(0, SESSION_CHANGED);
  };

  function setAccessToken(token: string | null) {
    accessToken = token;
  }

  function beginSessionTransition(clearToken = true) {
    sessionGeneration += 1;
    if (clearToken) accessToken = null;
    return sessionGeneration;
  }

  function isSessionCurrent(generation: number) {
    return generation === sessionGeneration;
  }

  async function parseResponse<T>(response: Response): Promise<ApiEnvelope<T>> {
    const payload = await response.json().catch(() => null) as ApiEnvelope<T> | null;
    if (!response.ok || !payload?.success) {
      throw new ApiError(response.status, payload?.message || "Không thể kết nối tới máy chủ.", payload?.errors || []);
    }
    return payload;
  }

  async function refreshAccessTokenState(expectedGeneration = sessionGeneration): Promise<SessionRefreshResult> {
    if (!isSessionCurrent(expectedGeneration)) return { status: "invalid" };
    if (refreshRequest?.generation === expectedGeneration) return refreshRequest.promise;

    const startingToken = accessToken;
    const promise = (async (): Promise<SessionRefreshResult> => {
      try {
        const response = await fetcher(resolveUrl("/auth/refresh"), {
          method: "POST",
          headers: { "x-remember-me": options.rememberMe?.() ? "1" : "0" },
          credentials: "include",
        });
        let payload: ApiEnvelope<{ accessToken: string }>;
        try {
          payload = await parseResponse<{ accessToken: string }>(response);
        } catch (error) {
          if (!isSessionCurrent(expectedGeneration)) return { status: "invalid" };
          if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
            if (accessToken === startingToken) accessToken = null;
            return { status: "invalid" };
          }
          throw error;
        }
        if (!isSessionCurrent(expectedGeneration)) return { status: "invalid" };
        const token = payload.data?.accessToken;
        if (!token) throw new ApiError(502, "Máy chủ chưa xác nhận phiên đăng nhập.");
        // Another request may already have rotated the token within this same session.
        if (accessToken === startingToken) accessToken = token;
        return { status: "authenticated", token: accessToken || token };
      } catch (error) {
        if (!isSessionCurrent(expectedGeneration)) {
          return { status: "invalid" };
        }

        return {
          status: "unavailable",
          error: toConnectionError(error),
        };
      } finally {
        if (refreshRequest?.generation === expectedGeneration) refreshRequest = null;
      }
    })();
    refreshRequest = { generation: expectedGeneration, promise };
    return promise;
  }

  async function request<T>(path: string, init: RequestInit = {}, retryAuth = true): Promise<T> {
    const generation = sessionGeneration;
    const requestToken = accessToken;
    const headers = new Headers(init.headers);
    if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");
    if (requestToken) headers.set("authorization", `Bearer ${requestToken}`);

    let response: Response;
    try {
      response = await fetcher(resolveUrl(path), { ...init, headers, credentials: "include" });
    } catch (error) {
      assertSession(generation);
      throw toConnectionError(error);
    }

    // Check before handling 401: an old request must never refresh/retry with another account.
    assertSession(generation);
    const createsSession = ["/auth/login", "/auth/google", "/auth/register", "/auth/refresh"].includes(path);
    if (response.status === 401 && requestToken && retryAuth && !createsSession && path !== "/auth/logout") {
      const refreshed = await refreshAccessTokenState(generation);
      assertSession(generation);
      const retryToken = accessToken;
      if (refreshed.status === "authenticated" && retryToken) {
        const retryHeaders = new Headers(init.headers);
        if (init.body && !retryHeaders.has("content-type")) retryHeaders.set("content-type", "application/json");
        retryHeaders.set("authorization", `Bearer ${retryToken}`);
        try {
          response = await fetcher(resolveUrl(path), { ...init, headers: retryHeaders, credentials: "include" });
        } catch (error) {
          assertSession(generation);
          throw toConnectionError(error);
        }
        assertSession(generation);
      }
    }

    const payload = await parseResponse<T>(response);
    // The account can change while response.json() is reading the body.
    assertSession(generation);
    return payload.data as T;
  }

  return { apiRequest: request, setAccessToken, beginSessionTransition, isSessionCurrent, getSessionGeneration: () => sessionGeneration, refreshAccessTokenState };
}
