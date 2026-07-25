export interface Address {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface MerchantInfo {
  location: string;
  category: string;
  companyName: string;
  address: Address;
  website: string;
  services: string[];
  contactName: string;
  phone: string;
  wechat: string;
  email: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MerchantImage {
  url: string;
  alt: string;
  author: string;
  sourceUrl: string;
}

export interface MerchantDetails {
  name: string;
  slug: string;
  info: MerchantInfo;
  images: MerchantImage[];
  intro: string;
  faq: FaqItem[];
}
