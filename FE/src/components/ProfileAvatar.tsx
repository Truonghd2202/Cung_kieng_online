import { useSyncExternalStore } from "react";

const AVATAR_EVENT = "tltl-avatar-change";

export const getAvatarKey = (email: string) =>
  `tltl-avatar:${email.trim().toLowerCase()}`;

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(AVATAR_EVENT, listener);

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(AVATAR_EVENT, listener);
  };
}

function readAvatar(email?: string): string {
  if (!email) return "";

  try {
    const value = localStorage.getItem(getAvatarKey(email)) || "";

    return value.startsWith("data:image/jpeg;base64,")
      ? value
      : "";
  } catch {
    return "";
  }
}

export function useProfileAvatar(email?: string): string {
  return useSyncExternalStore(
    subscribe,
    () => readAvatar(email),
    () => ""
  );
}

export function saveProfileAvatar(
  email: string,
  value: string | null
): boolean {
  try {
    const key = getAvatarKey(email);

    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }

    window.dispatchEvent(new Event(AVATAR_EVENT));
    return true;
  } catch {
    return false;
  }
}

interface ProfileAvatarProps {
  email?: string;
  name?: string;
  className?: string;
}

export function ProfileAvatar({
  email,
  name = "",
  className = "",
}: ProfileAvatarProps) {
  const avatar = useProfileAvatar(email);

  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full bg-accent-soft ${className}`}
      aria-hidden="true"
    >
      {avatar ? (
        <img
          src={avatar}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="grid h-full w-full place-items-center font-display font-semibold text-accent">
          {name.trim().charAt(0).toUpperCase() || "?"}
        </span>
      )}
    </span>
  );
}
