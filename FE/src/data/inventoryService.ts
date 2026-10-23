import { apiRequest } from "../lib/api";
import { isDemoMode } from "./demoMode";
import { readDemoValue, writeDemoValue } from "./demoStorage";

export interface LanternUseReceipt {
  id: string;
  itemCode: "ROYAL_LANTERN";
  replayed: boolean;
}

export function useRoyalLantern(requestId: string) {
  if (isDemoMode()) {
    const stock = getDemoRoyalLanternStock();
    if (stock < 1) return Promise.reject(new Error("Kho demo đã hết đèn hoàng gia."));
    writeDemoValue("royal-lantern-stock", stock - 1);
    return Promise.resolve({ id: `demo-${requestId}`, itemCode: "ROYAL_LANTERN", replayed: false } satisfies LanternUseReceipt);
  }
  return apiRequest<LanternUseReceipt>(
    "/inventory/royal-lantern/use",
    {
      method: "POST",
      body: JSON.stringify({ requestId }),
    }
  );
}

export function getDemoRoyalLanternStock(): number {
  return Math.max(0, readDemoValue<number>("royal-lantern-stock", 1));
}
