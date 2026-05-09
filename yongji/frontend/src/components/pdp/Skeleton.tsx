export function Skeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-xl bg-muted" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-1/3 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </div>
  )
}