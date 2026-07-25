import type { MetadataRoute } from "next";

import { DETAIL_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DETAIL_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
