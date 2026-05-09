import { ShoppingCart } from "lucide-react"

type CartCountBadgeProps = {
  count: number
}

export function CartCountBadge({ count }: CartCountBadgeProps) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground shadow-sm"
      aria-live="polite"
    >
      <ShoppingCart className="size-4 text-muted-foreground" aria-hidden />
      <span className="font-medium">Cart</span>
      <span className="tabular-nums rounded-md bg-muted px-2 py-0.5 text-foreground">
        {count}
      </span>
    </div>
  )
}
