/** One selectable option within a variant dimension (e.g. a color or a size). */
export type DimensionOption = {
  id: string
  label: string
}

/** Named variant axis with its options (e.g. Color, Size). */
export type VariantDimension = {
  key: string
  label: string
  options: DimensionOption[]
}

export type Sku = {
  id: string
  priceCents: number
  stock: number
  /** Maps dimension key → selected option id */
  optionsByDimension: Record<string, string>
  imageUrl?: string
}

export type ProductDetail = {
  id: string
  name: string
  description: string
  defaultImageUrl: string
  dimensions: VariantDimension[]
  skus: Sku[]
}

export type SelectedOptions = Record<string, string>
