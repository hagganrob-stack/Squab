import type { RichDoc, RichMark, RichNode } from "../../types/content";

/** Tiny builders for authoring demo rich-text documents (Tiptap/ProseMirror JSON). */

type Inline = string | RichNode;

const inline = (parts: Inline[]): RichNode[] =>
  parts.map((p) => (typeof p === "string" ? { type: "text", text: p } : p));

export const t = (text: string, ...marks: RichMark[]): RichNode => ({
  type: "text",
  text,
  ...(marks.length ? { marks } : {}),
});
export const b = (text: string) => t(text, { type: "bold" });
export const i = (text: string) => t(text, { type: "italic" });
export const a = (text: string, href: string) => t(text, { type: "link", attrs: { href } });

export const p = (...parts: Inline[]): RichNode => ({ type: "paragraph", content: inline(parts) });
export const h2 = (text: string): RichNode => ({
  type: "heading",
  attrs: { level: 2 },
  content: [{ type: "text", text }],
});
export const h3 = (text: string): RichNode => ({
  type: "heading",
  attrs: { level: 3 },
  content: [{ type: "text", text }],
});
export const ul = (...items: Inline[][]): RichNode => ({
  type: "bulletList",
  content: items.map((parts) => ({ type: "listItem", content: [p(...parts)] })),
});
export const ol = (...items: Inline[][]): RichNode => ({
  type: "orderedList",
  content: items.map((parts) => ({ type: "listItem", content: [p(...parts)] })),
});
export const quote = (text: string, cite?: string): RichNode => ({
  type: "pullQuote",
  attrs: { text, ...(cite ? { cite } : {}) },
});
export const img = (alt: string, caption?: string, src?: string): RichNode => ({
  type: "image",
  attrs: { alt, ...(caption ? { caption } : {}), ...(src ? { src } : {}) },
});
export const cta = (label: string, href: string): RichNode => ({
  type: "ctaButton",
  attrs: { label, href },
});

export const doc = (...content: RichNode[]): RichDoc => ({ type: "doc", content });
