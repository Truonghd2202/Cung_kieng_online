import type { ContentMetadata } from "./contentMetadata";

export interface ChauVanRecording {
  id: string;
  title: string;
  performer: string;
  description: string;

  // Đường dẫn file trong public/audio.
  src: string;

  credit: string;
  usagePermission: string;
  permissionConfirmed: boolean;

  metadata: ContentMetadata;
}

export const CHAU_VAN_RECORDINGS: ChauVanRecording[] = [];

export function canPlayRecording(
  recording: ChauVanRecording
): boolean {
  return (
    recording.permissionConfirmed &&
    Boolean(recording.title.trim()) &&
    Boolean(recording.performer.trim()) &&
    Boolean(recording.credit.trim()) &&
    Boolean(recording.usagePermission.trim()) &&
    /^\/audio\/[^?#]+\.(mp3|ogg|wav|m4a)$/i.test(
      recording.src
    ) &&
    recording.metadata.contentKind === "editorial" &&
    recording.metadata.editorialStatus === "approved"
  );
}
