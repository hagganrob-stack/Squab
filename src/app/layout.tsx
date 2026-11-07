import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Squab Connect — offers, businesses and stories from the Squab community",
    template: "%s | Squab Connect",
  },
  description:
    "Discover exclusive offers, meet the businesses around you and stay up to date with everything happening across the Squab community.",
  applicationName: "Squab Connect",
  openGraph: {
    type: "website",
    siteName: "Squab Connect",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { capable: true, title: "Squab Connect", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f0e6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
