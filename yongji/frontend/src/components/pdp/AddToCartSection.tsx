import { Button } from "@/components/ui/button"

type AddToCartSectionProps = {
  disabled: boolean
  busy: boolean
  successMessage: string | null
  onAddToCart: () => void
}

export function AddToCartSection({
  disabled,
  busy,
  successMessage,
  onAddToCart,
}: AddToCartSectionProps) {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        size="lg"
        className="w-full sm:w-auto"
        disabled={disabled || busy}
        onClick={onAddToCart}
      >
        {busy ? "Adding…" : "Add to cart"}
      </Button>
      <div className="min-h-[1.25rem]" aria-live="polite">
        {successMessage ? (
          <p className="text-sm font-medium text-primary">{successMessage}</p>
        ) : null}
      </div>
    </div>
  )
}
