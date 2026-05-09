type ProductMediaProps = {
  alt: string
  imageUrl: string
}

export function ProductMedia({ alt, imageUrl }: ProductMediaProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="aspect-square w-full h-full object-cover"
      />
    </div>
  )
}
