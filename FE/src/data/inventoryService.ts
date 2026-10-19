import { apiRequest } from "../lib/api";

export interface LanternUseReceipt {
  id: string;
  itemCode: "ROYAL_LANTERN";
  replayed: boolean;
}

export function useRoyalLantern(requestId: string) {
  return apiRequest<LanternUseReceipt>(
    "/inventory/royal-lantern/use",
    {
      method: "POST",
      body: JSON.stringify({ requestId }),
    }
  );
}
