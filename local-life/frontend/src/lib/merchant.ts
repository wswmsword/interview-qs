import type { Address, MerchantDetails } from "@/types/merchant";

export function formatAddress(address: Address): string {
  return [
    address.street,
    address.locality,
    address.region,
    address.postalCode,
    address.country,
  ].join(", ");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasString(record: Record<string, unknown>, key: string): boolean {
  return typeof record[key] === "string";
}

export function parseMerchantDetails(value: unknown): MerchantDetails {
  if (
    !isRecord(value) ||
    !hasString(value, "name") ||
    !hasString(value, "slug") ||
    !hasString(value, "intro") ||
    !isRecord(value.info) ||
    !Array.isArray(value.images) ||
    !Array.isArray(value.faq)
  ) {
    throw new Error("The details API returned an invalid merchant payload.");
  }

  const info = value.info;
  const requiredInfoFields = [
    "location",
    "category",
    "companyName",
    "website",
    "contactName",
    "phone",
    "wechat",
    "email",
  ];

  if (
    !requiredInfoFields.every((key) => hasString(info, key)) ||
    !Array.isArray(info.services) ||
    !info.services.every((service) => typeof service === "string") ||
    !value.images.every(
      (image) =>
        isRecord(image) &&
        hasString(image, "url") &&
        hasString(image, "alt") &&
        hasString(image, "author") &&
        hasString(image, "sourceUrl"),
    ) ||
    !value.faq.every(
      (item) =>
        isRecord(item) &&
        hasString(item, "question") &&
        hasString(item, "answer"),
    )
  ) {
    throw new Error("The details API returned incomplete merchant content.");
  }

  const address = info.address;
  const addressFields = [
    "street",
    "locality",
    "region",
    "postalCode",
    "country",
  ];
  if (
    !isRecord(address) ||
    !addressFields.every((key) => hasString(address, key))
  ) {
    throw new Error("The details API returned an incomplete address.");
  }

  return value as unknown as MerchantDetails;
}
