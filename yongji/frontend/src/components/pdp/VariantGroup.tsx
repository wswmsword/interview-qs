import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { VariantDimension } from "@/types/pdp"

type VariantGroupProps = {
  dimension: VariantDimension
  selectedId: string | undefined
  onSelect: (dimensionKey: string, optionId: string) => void
}

const chipRadioItemClass =
  "peer absolute inset-0 z-10 h-full w-full min-h-7 opacity-0 !aspect-auto !size-auto shrink-0 rounded-[min(var(--radius-md),12px)] border-0 bg-transparent p-0 shadow-none ring-0 after:hidden focus-visible:ring-3 focus-visible:ring-ring/50 [&_[data-slot=radio-group-indicator]]:hidden data-checked:border-transparent data-checked:bg-transparent dark:data-checked:bg-transparent"

export function VariantGroup({
  dimension,
  selectedId,
  onSelect,
}: VariantGroupProps) {
  return (
    <fieldset className="m-0 space-y-2 border-0 p-0">
      <legend className="text-sm font-medium text-foreground">
        {dimension.label}
      </legend>
      <RadioGroup
        name={`variant-${dimension.key}`}
        value={selectedId ?? ""}
        onValueChange={(value) => onSelect(dimension.key, value)}
        className="flex flex-wrap gap-2"
      >
        {dimension.options.map((opt) => (
          <label
            key={opt.id}
            className="group relative inline-flex cursor-pointer items-stretch"
          >
            <RadioGroupItem
              id={`${dimension.key}-${opt.id}`}
              value={opt.id}
              className={cn(chipRadioItemClass)}
            />
            <span
              className={cn(
                "pointer-events-none rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 py-1 text-[0.8rem] font-medium transition-colors",
                "group-hover:bg-muted group-hover:text-foreground",
                "dark:border-input dark:bg-input/30 dark:group-hover:bg-input/50",
                "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:shadow-none dark:peer-data-[state=checked]:bg-primary",
              )}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  )
}
