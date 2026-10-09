import { apiRequest } from "../lib/api";

export function registerMembershipInterest(email: string) {
  return apiRequest<{ email: string; registeredAt: string }>("/membership/interests", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function removeMembershipInterest(email: string) {
  return apiRequest("/membership/interests", {
    method: "DELETE",
    body: JSON.stringify({ email }),
  });
}
