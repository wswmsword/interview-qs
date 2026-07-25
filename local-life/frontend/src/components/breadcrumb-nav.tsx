interface BreadcrumbNavProps {
  current: string;
}

const ancestors = [
  { label: "首页", href: "/" },
  { label: "墨尔本", href: "/melbourne" },
  { label: "装修服务", href: "/melbourne/renovation" },
];

export function BreadcrumbNav({ current }: BreadcrumbNavProps) {
  return (
    <nav aria-label="面包屑" className="overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2 text-sm text-muted">
        {ancestors.map((item) => (
          <li key={item.href} className="contents">
            <a
              href={item.href}
              className="rounded-sm outline-none transition hover:text-brand-ink focus-visible:ring-2 focus-visible:ring-brand"
            >
              {item.label}
            </a>
            <span aria-hidden="true" className="text-line">
              /
            </span>
          </li>
        ))}
        <li aria-current="page" className="max-w-64 truncate font-medium text-ink">
          {current}
        </li>
      </ol>
    </nav>
  );
}
