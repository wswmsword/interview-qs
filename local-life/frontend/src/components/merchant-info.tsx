import { formatAddress } from "@/lib/merchant";
import type { MerchantInfo as MerchantInfoType } from "@/types/merchant";

interface MerchantInfoProps {
  info: MerchantInfoType;
}

export function MerchantInfo({ info }: MerchantInfoProps) {
  const rows = [
    { label: "地区和区域", value: info.location },
    { label: "服务类别", value: info.category },
    { label: "公司名称", value: info.companyName },
    { label: "公司地址", value: formatAddress(info.address) },
    {
      label: "公司网址",
      value: (
        <a
          href={info.website}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand-ink underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
        >
          {new URL(info.website).hostname}
        </a>
      ),
    },
    {
      label: "服务项目",
      value: (
        <div className="flex flex-wrap gap-1.5">
          {info.services.map((service) => (
            <span
              key={service}
              className="inline-block rounded bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand-ink"
            >
              {service}
            </span>
          ))}
        </div>
      ),
    },
    { label: "姓名", value: info.contactName },
    {
      label: "电话",
      value: (
        <a
          href={`tel:${info.phone.replace(/\s/g, "")}`}
          className="font-medium text-brand-ink underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
        >
          {info.phone}
        </a>
      ),
    },
    { label: "微信", value: info.wechat },
    {
      label: "邮箱",
      value: (
        <a
          href={`mailto:${info.email}`}
          className="font-medium text-brand-ink underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
        >
          {info.email}
        </a>
      ),
    },
  ];

  return (
    <section aria-labelledby="merchant-info-heading">
      <header className="mb-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-ink">
          Business details
        </p>
        <h2
          id="merchant-info-heading"
          className="text-2xl font-bold tracking-tight text-ink"
        >
          商户信息
        </h2>
      </header>
      <div className="overflow-hidden rounded-lg border border-line bg-white">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1.5 border-t border-line px-5 py-3.5 first:border-t-0 sm:border-r sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2n)]:border-r-0"
            >
              <dt className="text-[11px] font-bold tracking-[0.04em] text-muted">
                {row.label}
              </dt>
              <dd className="text-sm leading-6 text-ink [font-variant-numeric:tabular-nums]">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
