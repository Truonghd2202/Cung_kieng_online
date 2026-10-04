import type { TopicType } from "./xinXamData";
import type { ContentMetadata } from "./contentMetadata";
import {
  TRADITIONAL_XAM_COLLECTIONS,
  TRADITIONAL_XAM_STICKS,
  type TraditionalXamCollectionId,
  type TraditionalXamStick,
} from "./traditionalXamData";
import { validateTraditionalXam } from "./validateTraditionalXam";

function isApproved(metadata: ContentMetadata): boolean {
  return (
    metadata.contentKind === "editorial" &&
    metadata.editorialStatus === "approved" &&
    Boolean(metadata.reviewedBy?.trim()) &&
    Boolean(metadata.reviewedOn?.trim())
  );
}

export function getPublishableTraditionalSticks(
  collectionId: TraditionalXamCollectionId,
  topic: TopicType
): TraditionalXamStick[] {
  const errors = validateTraditionalXam(
    TRADITIONAL_XAM_COLLECTIONS,
    TRADITIONAL_XAM_STICKS
  );

  if (errors.length > 0) return [];

  const collection = TRADITIONAL_XAM_COLLECTIONS.find(
    (item) => item.id === collectionId
  );

  if (!collection || !isApproved(collection.metadata)) {
    return [];
  }

  return TRADITIONAL_XAM_STICKS.filter(
    (stick) =>
      stick.collectionId === collectionId &&
      stick.metadata.quotationVerified &&
      isApproved(stick.metadata) &&
      stick.translation !== undefined &&
      stick.translation.metadata.quotationVerified &&
      isApproved(stick.translation.metadata) &&
      Boolean(stick.reflectionByTopic[topic]?.trim())
  );
}
