import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/constants";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "邻里集｜墨尔本本地生活服务",
    template: "%s｜邻里集",
  },
  description: "发现墨尔本值得信赖的本地商户和生活服务。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "邻里集",
    title: "邻里集｜墨尔本本地生活服务",
    description: "发现墨尔本值得信赖的本地商户和生活服务。",
    url: SITE_URL,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "邻里集墨尔本本地生活服务",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "邻里集｜墨尔本本地生活服务",
    description: "发现墨尔本值得信赖的本地商户和生活服务。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
