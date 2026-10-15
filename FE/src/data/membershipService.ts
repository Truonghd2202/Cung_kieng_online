import { apiRequest } from "../lib/api";

export interface MembershipInterestStatus {
  registered: boolean;
  email: string;
  registeredAt: string | null;
}

export function loadMembershipInterest() {
  return apiRequest<MembershipInterestStatus>(
    "/membership/interests",
  );
}

export function registerMembershipInterest() {
  return apiRequest<{
    email: string;
    registeredAt: string;
  }>("/membership/interests", {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export function removeMembershipInterest() {
  return apiRequest("/membership/interests", {
    method: "DELETE",
    body: JSON.stringify({}),
  });
}
