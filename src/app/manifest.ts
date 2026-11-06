import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Squab Connect",
    short_name: "Connect",
    description: "Offers, businesses, stories and events from the Squab community.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#f26a1d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
