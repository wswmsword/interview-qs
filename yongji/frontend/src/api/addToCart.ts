import { delay } from "@/api/delay"

export type AddToCartInput = {
  skuId: string
  quantity: number
}

export type AddToCartResult = {
  cartItemCount: number
}

/** In-memory cart total for the mock API (session-scoped). */
let mockCartTotalQuantity = 0

export async function addToCart(input: AddToCartInput): Promise<AddToCartResult> {
  await delay(280)
  mockCartTotalQuantity += input.quantity
  return { cartItemCount: mockCartTotalQuantity }
}
