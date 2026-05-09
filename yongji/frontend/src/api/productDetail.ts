import { SAMPLE_PRODUCT } from "@/data/sample-product"
import type { ProductDetail } from "@/types/pdp"
import { delay } from "@/api/delay"

/** Set to true to simulate a failing product detail request (for demos). */
export const SIMULATE_PRODUCT_DETAIL_ERROR = false

function shouldSimulateProductDetailFailure(): boolean {
  if (SIMULATE_PRODUCT_DETAIL_ERROR) return true
  if (typeof window === "undefined") return false
  return new URLSearchParams(window.location.search).get("failProduct") === "1"
}

export async function getProductDetail(): Promise<ProductDetail> {
  await delay(450)

  if (shouldSimulateProductDetailFailure()) {
    throw new Error("Failed to load product. Please try again.")
  }

  return structuredClone(SAMPLE_PRODUCT)
}
