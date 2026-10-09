export interface PublishableXamContent {
  active?: boolean;
  verified?: boolean;
  xam_type?: string;
  poem?: string | string[] | null;
  interpretations?: string | Array<string | null | undefined> | null;
  source?: string | null;
}

export function hasCompleteXamContent(content: PublishableXamContent): boolean;
export function isPublishableXamCard(card: PublishableXamContent): boolean;
