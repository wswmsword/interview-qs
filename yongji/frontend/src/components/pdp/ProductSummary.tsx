import type { Sku } from "@/types/pdp"

function formatPrice(cents: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(cents / 100)
}

type ProductSummaryProps = {
  name: string
  sku: Sku | undefined
}

export function ProductSummary({ name, sku }: ProductSummaryProps) {
  const stock = sku?.stock ?? 0
  const outOfStock = stock <= 0

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {name}
      </h1>
      <p className="text-2xl font-medium tabular-nums text-foreground">
        {sku ? formatPrice(sku.priceCents) : "—"}
      </p>
      <p className="text-sm text-muted-foreground">
        {outOfStock ? (
          <span className="font-medium text-destructive">Out of stock</span>
        ) : (
          <>
            <span className="text-foreground">{stock}</span> in stock
          </>
        )}
      </p>
    </div>
  )
}
