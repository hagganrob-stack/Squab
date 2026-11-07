import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Squab Connect",
    short_name: "Connect",
    description: "Offers, businesses, stories and events from the Squab community.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f0e6",
    theme_color: "#f4941e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
