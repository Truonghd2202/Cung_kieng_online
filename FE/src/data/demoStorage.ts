export function readDemoValue<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(`tltl-demo-${key}`);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

export function writeDemoValue<T>(key: string, value: T): void {
  try { localStorage.setItem(`tltl-demo-${key}`, JSON.stringify(value)); } catch { /* Demo still works in memory for this action. */ }
}

export function clearDemoValues(): void {
  try {
    for (let index = localStorage.length - 1; index >= 0; index -= 1) {
      const key = localStorage.key(index);
      if (key?.startsWith("tltl-demo-") && key !== "tltl-demo-seed-v1") {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // Keep the current screen usable if browser storage is unavailable.
  }
}
