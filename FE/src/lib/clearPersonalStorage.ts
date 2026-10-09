export function clearPersonalStorage(email: string) {
  const account = email.trim().toLowerCase();
  const corner = `tltl-user-corner-${account}`;
  const keys = [corner, `tltl-calendar-personal-notes_${account}`, `tltl-memorial-${account}`, `tltl-selected-memorial-${account}`, `tltl-reminders:${account}`,
    ...["tltl-action-done-date", "tltl-last-checkin-date", "tltl-today-mood", "tltl-current-signal-id"].map((base) => `${base}_${account}`)];
  const prefixes = [
    `tltl-ritual-checklist-${account}-`,
    `tltl-ritual-bookmark-${account}-`,
    `tltl-culture-bookmark-${account}-`,
  ];
  const accountKeys = [
    `tltl-traditional-xam_${account}`,
    `tltl-test-traditional-xam_${account}`,
    `tltl-ritual-drafts-${account}`,
    `tltl-digital-items-${account}`,
    `tltl-avatar:${account}`,
  ];
  for (const key of Object.keys(localStorage)) {
    if (accountKeys.includes(key)) keys.push(key);
    if (key.startsWith(`tltl-test-traditional-xam_${account}-`)) keys.push(key);
    if (key.startsWith(`${corner}-recovery-`) && /^[0-9a-f-]{36}$/.test(key.slice(`${corner}-recovery-`.length))) keys.push(key);
    if (prefixes.some((prefix) => key.startsWith(prefix))) keys.push(key);
  }
  for (const key of keys) localStorage.removeItem(key);
  window.dispatchEvent(new Event("storage"));
}
