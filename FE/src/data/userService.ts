import { apiRequest } from "../lib/api";
import type { ThemePreference } from "../hooks/useTheme";
import type { UserProfile } from "./authService";

interface ApiUser {
  id: string;
  fullName: string;
  email: string;
}

export interface UserSettings {
  locale: "vi" | "en";
  theme: ThemePreference;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  locale: "vi",
  theme: "dark",
  emailNotifications: true,
  pushNotifications: true,
};

interface TopicsPayload {
  topics: string[];
}

function toProfile(user: ApiUser): UserProfile {
  return { name: user.fullName, email: user.email.trim().toLowerCase() };
}

export async function loadUserPreferences(): Promise<{
  settings: UserSettings;
  topics: string[];
}> {
  const [settings, topics] = await Promise.all([
    apiRequest<UserSettings>("/users/me/settings"),
    apiRequest<TopicsPayload>("/users/me/topics"),
  ]);
  return { settings, topics: topics.topics };
}

export async function updateProfile(fullName: string): Promise<UserProfile> {
  const user = await apiRequest<ApiUser>("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ fullName }),
  });
  return toProfile(user);
}

export function updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
  return apiRequest<UserSettings>("/users/me/settings", {
    method: "PATCH",
    body: JSON.stringify(settings),
  });
}

export async function replaceTopics(topics: string[]): Promise<string[]> {
  const result = await apiRequest<TopicsPayload>("/users/me/topics", {
    method: "PUT",
    body: JSON.stringify({ topics }),
  });
  return result.topics;
}
