import { useEffect, useMemo, useState } from "react"
import { addToCart } from "@/api/addToCart"
import { getProductDetail } from "@/api/productDetail"
import { trackAddToCart } from "@/analytics/track"
import { Button } from "@/components/ui/button"
import type { ProductDetail, SelectedOptions, Sku } from "@/types/pdp"
import { AddToCartSection } from "@/components/pdp/AddToCartSection"
import { CartCountBadge } from "@/components/pdp/CartCountBadge"
import { DescriptionSection } from "@/components/pdp/DescriptionSection"
import { ProductMedia } from "@/components/pdp/ProductMedia"
import { ProductSummary } from "@/components/pdp/ProductSummary"
import { QuantityRow } from "@/components/pdp/QuantityRow"
import { VariantGroup } from "@/components/pdp/VariantGroup"
import { Skeleton } from "./Skeleton"

function findSku(
  product: ProductDetail,
  selected: SelectedOptions,
): Sku | undefined {
  return product.skus.find((sku) =>
    product.dimensions.every(
      (d) => sku.optionsByDimension[d.key] === selected[d.key],
    ),
  )
}

function defaultSelection(product: ProductDetail): SelectedOptions {
  const firstInStock = product.skus.find((s) => s.stock > 0)
  if (firstInStock) return { ...firstInStock.optionsByDimension }
  const first = product.skus[0]
  if (first) return { ...first.optionsByDimension }
  const fallback: SelectedOptions = {}
  for (const d of product.dimensions) {
    const id = d.options[0]?.id
    if (id) fallback[d.key] = id
  }
  return fallback
}

function selectionAfterOptionChange(
  product: ProductDetail,
  current: SelectedOptions,
  dimensionKey: string,
  optionId: string,
): SelectedOptions {
  const attempt = { ...current, [dimensionKey]: optionId }
  if (findSku(product, attempt)) return attempt

  const candidates = product.skus.filter(
    (s) => s.optionsByDimension[dimensionKey] === optionId,
  )
  const inStock = candidates.find((s) => s.stock > 0)
  if (inStock) return { ...inStock.optionsByDimension }
  if (candidates[0]) return { ...candidates[0].optionsByDimension }
  return attempt
}

export function ProductPage() {
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [selected, setSelected] = useState<SelectedOptions>({})
  const [quantity, setQuantity] = useState(1)
  const [cartCount, setCartCount] = useState(0)
  const [addBusy, setAddBusy] = useState(false)
  const [cartSuccess, setCartSuccess] = useState<string | null>(null)

  useEffect(() => {
    loadProduct()
  }, [])

  const currentSku = useMemo(() => {
    if (!product) return undefined
    return findSku(product, selected)
  }, [product, selected])

  useEffect(() => {
    if (!currentSku) return
    if (currentSku.stock <= 0) {
      setQuantity(1)
      return
    }
    setQuantity((q) => Math.max(1, Math.min(q, currentSku.stock)))
  }, [currentSku])

  const stock = currentSku?.stock ?? 0
  const outOfStock = stock <= 0
  const imageUrl =
    currentSku?.imageUrl ?? product?.defaultImageUrl ?? ""

  if (loading) {
    return <Skeleton />;
  }

  if (loadError || !product) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-16 text-center">
        <p className="text-destructive">{loadError ?? "Product unavailable."}</p>
        <Button type="button" onClick={() => loadProduct()}>
          Retry
        </Button>
        <p className="text-xs text-muted-foreground">
          Tip: remove <code className="rounded bg-muted px-1">?failProduct=1</code> from
          the URL if you enabled the mock error query.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8 flex justify-end">
        <CartCountBadge count={cartCount} />
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductMedia alt={product.name} imageUrl={imageUrl} />

        <div className="flex flex-col gap-6">
          <ProductSummary name={product.name} sku={currentSku} />

          {product.dimensions.map((dimension) => (
            <VariantGroup
              key={dimension.key}
              dimension={dimension}
              selectedId={selected[dimension.key]}
              onSelect={handleSelectDimension}
            />
          ))}

          <QuantityRow
            quantity={quantity}
            max={outOfStock ? 1 : stock}
            disabled={outOfStock}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />

          <AddToCartSection
            disabled={outOfStock}
            busy={addBusy}
            successMessage={cartSuccess}
            onAddToCart={() => handleAddToCart()}
          />

          <DescriptionSection body={product.description} />
        </div>
      </div>
    </div>
  )

  function handleSelectDimension(dimensionKey: string, optionId: string) {
    if (!product) return
    setSelected((prev) =>
      selectionAfterOptionChange(product, prev, dimensionKey, optionId),
    )
  }

  function handleDecrement() {
    setQuantity((q) => Math.max(1, q - 1))
  }

  function handleIncrement() {
    if (outOfStock) return
    setQuantity((q) => Math.min(q + 1, stock))
  }

  async function handleAddToCart() {
    if (!product || !currentSku || outOfStock) return
    setAddBusy(true)
    setCartSuccess(null)
    try {
      const result = await addToCart({
        skuId: currentSku.id,
        quantity,
      })
      trackAddToCart({
        skuId: currentSku.id,
        quantity,
        productId: product.id,
      })
      setCartCount(result.cartItemCount)
      setCartSuccess(`Added ${quantity} item(s) to your cart.`)
      window.setTimeout(() => setCartSuccess(null), 3500)
    } finally {
      setAddBusy(false)
    }
  }

  async function loadProduct() {
    setLoading(true)
    setLoadError(null)
    try {
      const detail = await getProductDetail()
      setProduct(detail)
      const initial = defaultSelection(detail)
      setSelected(initial)
      setQuantity(1)
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Something went wrong loading the product."
      setLoadError(message)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }
}
