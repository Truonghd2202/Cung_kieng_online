export function clearPersonalStorage(email: string) {
  const account = email.trim().toLowerCase();
  const corner = `tltl-user-corner-${account}`;
  const keys = [corner, `tltl-calendar-personal-notes_${account}`, `tltl-memorial-${account}`, `tltl-reminders:${account}`,
    ...["tltl-action-done-date", "tltl-last-checkin-date", "tltl-today-mood", "tltl-current-signal-id"].map((base) => `${base}_${account}`)];
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith(`${corner}-recovery-`) && /^[0-9a-f-]{36}$/.test(key.slice(`${corner}-recovery-`.length))) keys.push(key);
  }
  for (const key of keys) localStorage.removeItem(key);
  window.dispatchEvent(new Event("storage"));
}
