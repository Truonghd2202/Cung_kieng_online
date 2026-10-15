import { ApiError, createSessionApiClient } from "./sessionApiClient";

const localDevelopmentApiUrl = import.meta.env.DEV ? "http://localhost:4000/api/v1" : "";
const configuredApiUrl = (import.meta.env.VITE_API_URL || localDevelopmentApiUrl).replace(/\/$/, "");
const API_URL = configuredApiUrl.endsWith("/api") ? `${configuredApiUrl}/v1` : configuredApiUrl;
const apiConfigurationError = !API_URL
  ? "Ứng dụng chưa được cấu hình địa chỉ máy chủ. Vui lòng đặt VITE_API_URL cho môi trường phát hành."
  : import.meta.env.PROD && /^https?:\/\/(localhost|127(?:\.\d{1,3}){3}|\[::1\])(?::\d+)?(?:\/|$)/i.test(API_URL)
    ? "Địa chỉ API trong bản production đang trỏ về localhost. Hãy đặt VITE_API_URL tới máy chủ đã triển khai."
    : "";

const client = createSessionApiClient({
  baseUrl: API_URL,
  rememberMe: () => typeof window !== "undefined" && localStorage.getItem("tltl-remember-me") === "true",
});

export { ApiError };
export type { SessionRefreshResult } from "./sessionApiClient";

export function setAccessToken(token: string | null) {
  client.setAccessToken(token);
}

export function beginSessionTransition(clearToken = true) {
  return client.beginSessionTransition(clearToken);
}

export function isSessionCurrent(generation: number) {
  return client.isSessionCurrent(generation);
}

export function getSessionGeneration() {
  return client.getSessionGeneration();
}

export function apiRequest<T>(path: string, init: RequestInit = {}) {
  if (apiConfigurationError) return Promise.reject(new ApiError(0, apiConfigurationError));
  return client.apiRequest<T>(path, init);
}

export async function refreshAccessToken(): Promise<string | null> {
  const result = await refreshAccessTokenState();
  return result.status === "authenticated" ? result.token : null;
}

export function refreshAccessTokenState() {
  if (apiConfigurationError) {
    return Promise.resolve({ status: "unavailable" as const, error: new ApiError(0, apiConfigurationError) });
  }
  return client.refreshAccessTokenState();
}
