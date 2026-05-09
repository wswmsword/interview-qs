import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

type QuantityRowProps = {
  quantity: number
  max: number
  disabled: boolean
  onDecrement: () => void
  onIncrement: () => void
}

export function QuantityRow({
  quantity,
  max,
  disabled,
  onDecrement,
  onIncrement,
}: QuantityRowProps) {
  const canDec = !disabled && quantity > 1
  const canInc = !disabled && quantity < max

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground">Quantity</span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Decrease quantity"
          disabled={!canDec}
          onClick={onDecrement}
        >
          <Minus className="size-4" />
        </Button>
        <span className="min-w-[2ch] text-center text-sm tabular-nums text-foreground">
          {quantity}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Increase quantity"
          disabled={!canInc}
          onClick={onIncrement}
        >
          <Plus className="size-4" />
        </Button>
      </div>
      {!disabled ? (
        <span className="text-xs text-muted-foreground">Max {max}</span>
      ) : null}
    </div>
  )
}
