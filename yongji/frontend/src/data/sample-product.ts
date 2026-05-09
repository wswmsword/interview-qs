import type { ProductDetail } from "@/types/pdp"

/** Demo PDP payload: two dimensions (color + size) and multiple SKUs. */
export const SAMPLE_PRODUCT: ProductDetail = {
  id: "prod-demo-tshirt",
  name: "Everyday Cotton Tee",
  description:
    "Soft jersey knit with reinforced collar. Machine wash cold. Designed for daily wear — pair with denim or layer under a jacket. Ships from local warehouse.",
  defaultImageUrl:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  dimensions: [
    {
      key: "color",
      label: "Color",
      options: [
        { id: "black", label: "Black" },
        { id: "white", label: "White" },
        { id: "navy", label: "Navy" },
      ],
    },
    {
      key: "size",
      label: "Size",
      options: [
        { id: "s", label: "S" },
        { id: "m", label: "M" },
        { id: "l", label: "L" },
      ],
    },
  ],
  skus: [
    {
      id: "sku-black-s",
      priceCents: 2999,
      stock: 12,
      optionsByDimension: { color: "black", size: "s" },
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    },
    {
      id: "sku-black-m",
      priceCents: 2999,
      stock: 0,
      optionsByDimension: { color: "black", size: "m" },
      imageUrl:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    },
    {
      id: "sku-black-l",
      priceCents: 3199,
      stock: 4,
      optionsByDimension: { color: "black", size: "l" },
    },
    {
      id: "sku-white-s",
      priceCents: 2799,
      stock: 8,
      optionsByDimension: { color: "white", size: "s" },
      imageUrl:
      "https://images.unsplash.com/photo-1776665505703-6f0ea0fb3221?q=80&w=800"
    },
    {
      id: "sku-white-m",
      priceCents: 2799,
      stock: 15,
      optionsByDimension: { color: "white", size: "m" },
    },
    {
      id: "sku-white-l",
      priceCents: 2999,
      stock: 6,
      optionsByDimension: { color: "white", size: "l" },
    },
    {
      id: "sku-navy-s",
      priceCents: 3099,
      stock: 0,
      optionsByDimension: { color: "navy", size: "s" },
    },
    {
      id: "sku-navy-m",
      priceCents: 3099,
      stock: 9,
      optionsByDimension: { color: "navy", size: "m" },
      imageUrl:
        "http://images.unsplash.com/photo-1621951753015-740c699ab970?q=80&w=800",
    },
    {
      id: "sku-navy-l",
      priceCents: 3299,
      stock: 3,
      optionsByDimension: { color: "navy", size: "l" },
    },
  ],
}
