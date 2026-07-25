import { API_DETAILS_URL } from "@/lib/constants";
import { parseMerchantDetails } from "@/lib/merchant";
import type { MerchantDetails } from "@/types/merchant";

export async function getMerchantDetails(): Promise<MerchantDetails> {
  const response = await fetch(API_DETAILS_URL, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Details API responded with HTTP ${response.status}.`);
  }

  return parseMerchantDetails(await response.json());
}
