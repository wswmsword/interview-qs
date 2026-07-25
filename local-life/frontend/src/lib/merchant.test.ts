import { describe, expect, it } from "vitest";

import { formatAddress, parseMerchantDetails } from "./merchant";
import { createStructuredData } from "./structured-data";

const validMerchant = {
  name: "Example",
  slug: "example-company",
  info: {
    location: "Melbourne",
    category: "装修服务",
    companyName: "Example Pty Ltd",
    address: {
      street: "1 Test Street",
      locality: "Melbourne",
      region: "VIC",
      postalCode: "3000",
      country: "AU",
    },
    website: "https://example.com",
    services: ["厨房改造"],
    contactName: "Daniel",
    phone: "+61 3 9000 1234",
    wechat: "example",
    email: "hello@example.com",
  },
  images: [
    {
      url: "https://images.unsplash.com/photo-example",
      alt: "装修案例",
      author: "Example Author",
      sourceUrl: "https://unsplash.com/photos/example",
    },
  ],
  intro: "介绍",
  faq: [{ question: "问题", answer: "回答" }],
};

describe("merchant helpers", () => {
  it("accepts the documented API contract", () => {
    expect(parseMerchantDetails(validMerchant)).toEqual(validMerchant);
  });

  it("rejects payloads without a service list", () => {
    expect(() =>
      parseMerchantDetails({
        ...validMerchant,
        info: { ...validMerchant.info, services: "厨房改造" },
      }),
    ).toThrow("incomplete merchant content");
  });

  it("formats every address level for display", () => {
    expect(formatAddress(validMerchant.info.address)).toBe(
      "1 Test Street, Melbourne, VIC, 3000, AU",
    );
  });

  it("connects the page, business, services, breadcrumbs, and FAQ data", () => {
    const structuredData = createStructuredData(
      parseMerchantDetails(validMerchant),
    );

    expect(structuredData.map((entry) => entry["@type"])).toEqual([
      "WebSite",
      "WebPage",
      "LocalBusiness",
      "Service",
      "BreadcrumbList",
      "FAQPage",
    ]);
    expect(
      structuredData.find((entry) => entry["@type"] === "LocalBusiness"),
    ).toMatchObject({
      name: "Example",
      address: {
        addressLocality: "Melbourne",
        addressCountry: "AU",
      },
      contactPoint: {
        telephone: "+61 3 9000 1234",
        email: "hello@example.com",
      },
      hasOfferCatalog: {
        itemListElement: [
          {
            itemOffered: {
              name: "厨房改造",
            },
          },
        ],
      },
    });
  });
});
