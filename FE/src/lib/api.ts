const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/$/, "");

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field?: string; message: string }>;
}

export class ApiError extends Error {
  status: number;
  errors: Array<{ field?: string; message: string }>;

  constructor(status: number, message: string, errors: Array<{ field?: string; message: string }> = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

let accessToken: string | null = null;
let refreshRequest: Promise<string | null> | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

async function parseResponse<T>(response: Response): Promise<ApiEnvelope<T>> {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    throw new ApiError(
      response.status,
      payload?.message || "Không thể kết nối tới máy chủ.",
      payload?.errors || [],
    );
  }

  return payload;
}

async function request<T>(path: string, init: RequestInit = {}, retryAuth = true): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  if (accessToken) headers.set("authorization", `Bearer ${accessToken}`);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
      credentials: "include",
    });
  } catch {
    throw new ApiError(0, "Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối và thử lại.");
  }

  const createsSession = ["/auth/login", "/auth/register", "/auth/refresh"].includes(path);
  if (response.status === 401 && retryAuth && !createsSession) {
    const token = await refreshAccessToken();
    if (token) return request<T>(path, init, false);
  }

  const payload = await parseResponse<T>(response);
  return payload.data as T;
}

export function apiRequest<T>(path: string, init: RequestInit = {}) {
  return request<T>(path, init);
}

export async function refreshAccessToken(): Promise<string | null> {
  if (refreshRequest) return refreshRequest;

  refreshRequest = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      const payload = await parseResponse<{ accessToken: string }>(response);
      const token = payload.data?.accessToken || null;
      setAccessToken(token);
      return token;
    } catch {
      setAccessToken(null);
      return null;
    } finally {
      refreshRequest = null;
    }
  })();

  return refreshRequest;
}
