/**
 * Splits a reward label into the big headline value and the small line
 * beneath it, voucher-style: "20% off" → ["20%", "off"],
 * "Free first session" → ["Free", "first session"], "£50 off" → ["£50", "off"].
 */
export function rewardParts(label: string): { value: string; caption: string } {
  const pct = label.match(/^\s*((?:£|\$)?\d+(?:\.\d+)?%?)\s+(.*)$/i);
  if (pct) return { value: pct[1]!, caption: pct[2]! };
  const free = label.match(/^\s*(free)\s*(.*)$/i);
  if (free) return { value: "Free", caption: free[2] || "offer" };
  return { value: label, caption: "" };
}

/** Code teaser for cards: first two characters, rest hidden. */
export function maskCode(code: string) {
  return code.slice(0, 2) + "•".repeat(Math.max(3, code.length - 2));
}
