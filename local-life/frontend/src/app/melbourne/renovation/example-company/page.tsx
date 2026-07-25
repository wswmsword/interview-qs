import type { Metadata } from "next";

import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { CategoryPager } from "@/components/category-pager";
import { MerchantFaq } from "@/components/merchant-faq";
import { MerchantGallery } from "@/components/merchant-gallery";
import { MerchantInfo } from "@/components/merchant-info";
import { getMerchantDetails } from "@/lib/api";
import {
  DETAIL_DESCRIPTION,
  DETAIL_PATH,
  DETAIL_TITLE,
  DETAIL_URL,
} from "@/lib/constants";
import {
  createStructuredData,
  serializeJsonLd,
} from "@/lib/structured-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: DETAIL_TITLE,
  description: DETAIL_DESCRIPTION,
  alternates: {
    canonical: DETAIL_PATH,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "邻里集",
    title: DETAIL_TITLE,
    description: DETAIL_DESCRIPTION,
    url: DETAIL_URL,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Harbour & Stone Renovations 墨尔本装修服务",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DETAIL_TITLE,
    description: DETAIL_DESCRIPTION,
    images: ["/og.png"],
  },
};

export default async function MerchantDetailPage() {
  const merchant = await getMerchantDetails();
  const structuredData = createStructuredData(merchant);
  const headerImage = merchant.images[0];

  return (
    <>
      {structuredData.map((entry) => (
        <script
          key={entry["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(entry) }}
        />
      ))}

      <main className="site-shell pb-20 pt-[96px]">
        <CategoryPager />

        <div className="mt-10 border-t border-line pt-7">
          <BreadcrumbNav current={merchant.name} />
        </div>

        <article className="mt-8">
          <header className="relative mb-10 overflow-hidden rounded-xl border border-line bg-brand-soft">
            {headerImage ? (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden bg-cover bg-center sm:block"
                  style={{ backgroundImage: `url("${headerImage.url}")` }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden sm:block"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-brand-soft) 0%, var(--color-brand-soft) 28%, transparent 70%)",
                  }}
                />
              </>
            ) : null}

            <div className="relative px-6 py-7 sm:max-w-[62%] sm:px-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-ink">
                墨尔本 · 装修服务
              </p>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
                {merchant.name}
              </h1>
              <p className="mt-3 text-[15px] text-muted">
                专业住宅装修与空间改造服务
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { key: "地区", value: merchant.info.location },
                  { key: "类别", value: merchant.info.category },
                  { key: "联系", value: merchant.info.contactName },
                ].map((chip) => (
                  <span
                    key={chip.key}
                    className="inline-flex items-center gap-1.5 rounded border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink"
                  >
                    <span className="font-bold text-brand-ink">{chip.key}</span>
                    {chip.value}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <MerchantInfo info={merchant.info} />

          <section aria-labelledby="intro-heading" className="my-12">
            <header>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-ink">
                About the business
              </p>
              <h2
                id="intro-heading"
                className="text-2xl font-bold tracking-tight text-ink"
              >
                简介
              </h2>
            </header>

            <MerchantGallery images={merchant.images} />

            <div className="mt-7 max-w-4xl space-y-4 text-[15px] leading-8 text-muted">
              {merchant.intro.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <MerchantFaq items={merchant.faq} />
        </article>
      </main>
    </>
  );
}
