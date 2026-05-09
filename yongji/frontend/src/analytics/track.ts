export type AddToCartAnalyticsPayload = {
  skuId: string
  quantity: number
  productId?: string
}

/** Lightweight analytics hook for add-to-cart (bonus). */
export function trackAddToCart(payload: AddToCartAnalyticsPayload): void {
  const detail = { ...payload, event: "add_to_cart" as const }
  if (import.meta.env.DEV) {
    console.info("[analytics]", detail)
  }
  window.dispatchEvent(new CustomEvent("add_to_cart", { detail }))
}
