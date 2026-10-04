import { useEffect, useState } from "react";

export type ThemePreference = "light" | "dark" | "system";

const THEME_KEY = "tltl-theme";

const readThemePreference = (): ThemePreference => {
  try {
    const value = localStorage.getItem(THEME_KEY);

    if (
      value === "light" ||
      value === "dark" ||
      value === "system"
    ) {
      return value;
    }
  } catch {
    // Vẫn sử dụng được theme khi không truy cập được bộ nhớ.
  }

  return "system";
};

export const useTheme = () => {
  const [themePreference, setThemePreference] =
    useState<ThemePreference>(readThemePreference);

  const [systemDark, setSystemDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const dark =
    themePreference === "system"
      ? systemDark
      : themePreference === "dark";

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const updateSystemTheme = () => {
      setSystemDark(media.matches);
    };

    updateSystemTheme();
    media.addEventListener("change", updateSystemTheme);

    return () => {
      media.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, themePreference);
    } catch {
      // Theme vẫn áp dụng trong phiên hiện tại.
    }
  }, [themePreference]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme =
      dark ? "dark" : "light";
  }, [dark]);

  const toggleTheme = () => {
    // Bấm ở header chuyển sang lựa chọn sáng/tối cụ thể.
    setThemePreference(dark ? "light" : "dark");
  };

  return {
    dark,
    themePreference,
    setThemePreference,
    toggleTheme,
  };
};
