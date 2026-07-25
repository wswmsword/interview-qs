import {
  DETAIL_DESCRIPTION,
  DETAIL_TITLE,
  DETAIL_URL,
  SITE_URL,
} from "./constants";
import { formatAddress } from "./merchant";
import type { MerchantDetails } from "../types/merchant";

export function createStructuredData(merchant: MerchantDetails) {
  const businessId = `${DETAIL_URL}#business`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${DETAIL_URL}#webpage`;
  const serviceId = `${DETAIL_URL}#service`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: "邻里集",
      description: "发现墨尔本值得信赖的本地商户和生活服务。",
      inLanguage: "zh-CN",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": webpageId,
      url: DETAIL_URL,
      name: DETAIL_TITLE,
      description: DETAIL_DESCRIPTION,
      inLanguage: "zh-CN",
      isPartOf: {
        "@id": websiteId,
      },
      breadcrumb: {
        "@id": `${DETAIL_URL}#breadcrumb`,
      },
      mainEntity: {
        "@id": businessId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": businessId,
      name: merchant.name,
      legalName: merchant.info.companyName,
      description: merchant.intro.split("\n\n")[0],
      url: DETAIL_URL,
      mainEntityOfPage: {
        "@id": webpageId,
      },
      sameAs: [merchant.info.website],
      telephone: merchant.info.phone,
      email: merchant.info.email,
      image: merchant.images.map((image) => image.url),
      address: {
        "@type": "PostalAddress",
        streetAddress: merchant.info.address.street,
        addressLocality: merchant.info.address.locality,
        addressRegion: merchant.info.address.region,
        postalCode: merchant.info.address.postalCode,
        addressCountry: merchant.info.address.country,
      },
      areaServed: merchant.info.location,
      knowsAbout: merchant.info.services,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: merchant.info.phone,
        email: merchant.info.email,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${merchant.name} 服务项目`,
        itemListElement: merchant.info.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
            areaServed: merchant.info.location,
            provider: {
              "@id": businessId,
            },
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": serviceId,
      name: `${merchant.info.category} — ${merchant.name}`,
      description: DETAIL_DESCRIPTION,
      serviceType: merchant.info.services,
      areaServed: merchant.info.location,
      provider: {
        "@id": businessId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${DETAIL_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首页",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "墨尔本",
          item: `${SITE_URL}/melbourne`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "装修服务",
          item: `${SITE_URL}/melbourne/renovation`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: merchant.name,
          item: DETAIL_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: merchant.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function getAddressLabel(merchant: MerchantDetails): string {
  return formatAddress(merchant.info.address);
}
