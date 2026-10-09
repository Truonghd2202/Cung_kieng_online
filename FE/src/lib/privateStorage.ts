// The non-exportable key stays in IndexedDB; localStorage contains authenticated ciphertext.
let deviceKey: Promise<CryptoKey> | undefined;
function getDeviceKey(): Promise<CryptoKey> {
  if (!deviceKey) deviceKey = (async () => {
    const candidate = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
    return new Promise<CryptoKey>((resolve, reject) => {
      const opening = indexedDB.open("tltl-private-storage", 1);
      opening.onupgradeneeded = () => opening.result.createObjectStore("keys");
      opening.onerror = () => reject(opening.error);
      opening.onsuccess = () => {
        const db = opening.result;
        const tx = db.transaction("keys", "readwrite");
        const store = tx.objectStore("keys");
        const read = store.get("device");
        let key: CryptoKey;
        read.onsuccess = () => { key = read.result ?? candidate; if (!read.result) store.put(key, "device"); };
        tx.oncomplete = () => { db.close(); resolve(key); };
        tx.onerror = () => { db.close(); reject(tx.error); };
        tx.onabort = () => { db.close(); reject(tx.error); };
      };
    });
  })().catch((error) => { deviceKey = undefined; throw error; });
  return deviceKey;
}
const encode = (bytes: Uint8Array) => btoa(Array.from(bytes, (value) => String.fromCharCode(value)).join(""));
const decode = (value: string) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));

export async function writePrivateJson(storageKey: string, value: unknown): Promise<void> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: new TextEncoder().encode(storageKey) }, await getDeviceKey(), bytes);
  localStorage.setItem(storageKey, JSON.stringify({ encrypted: "AES-GCM-v1", iv: encode(iv), data: encode(new Uint8Array(ciphertext)) }));
}
export async function readPrivateJson(storageKey: string): Promise<unknown | null> {
  const raw = localStorage.getItem(storageKey);
  if (raw === null) return null;
  const value = JSON.parse(raw);
  if (value?.encrypted === "AES-GCM-v1") {
    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: decode(value.iv), additionalData: new TextEncoder().encode(storageKey) }, await getDeviceKey(), decode(value.data));
    return JSON.parse(new TextDecoder().decode(plaintext));
  }
  // Migrate a legacy plaintext cache only after encryption has succeeded.
  await writePrivateJson(storageKey, value);
  return value;
}
