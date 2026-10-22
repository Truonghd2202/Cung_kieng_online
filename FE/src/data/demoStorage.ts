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
