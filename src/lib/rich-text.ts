import type { RichNode } from "@/types/content";

export function plainText(node: RichNode): string {
  switch (node.type) {
    case "text":
      return node.text;
    case "pullQuote":
      return ` ${node.attrs.text} `;
    case "image":
    case "youtube":
    case "ctaButton":
    case "hardBreak":
      return " ";
    default:
      return "content" in node && node.content ? node.content.map(plainText).join(" ") : "";
  }
}

/** Estimated reading time at ~220 words per minute (minimum 1). */
export function readingMinutes(doc: RichNode) {
  const words = plainText(doc).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Only allow safe link targets: relative paths, http(s), mailto and tel. */
export function safeHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const url = new URL(href);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? href : "#";
  } catch {
    return "#";
  }
}
