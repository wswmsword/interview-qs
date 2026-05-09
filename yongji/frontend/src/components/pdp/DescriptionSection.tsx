type DescriptionSectionProps = {
  title?: string
  body: string
}

export function DescriptionSection({
  title = "Description",
  body,
}: DescriptionSectionProps) {
  return (
    <section className="space-y-2 border-t border-border pt-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </section>
  )
}
