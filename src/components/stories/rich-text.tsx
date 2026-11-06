import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/ui/media";
import { buttonVariants } from "@/components/ui/button";
import { safeHref } from "@/lib/rich-text";
import type { RichNode } from "@/types/content";

/**
 * Renders stored ProseMirror/Tiptap JSON to React. Only whitelisted node
 * types render and no raw HTML is ever injected, so editor content cannot
 * execute scripts.
 */
export function RichText({ doc }: { doc: RichNode }) {
  return <div className="article-body">{renderChildren(doc)}</div>;
}

function renderChildren(node: RichNode) {
  if (!("content" in node) || !node.content) return null;
  return node.content.map((child, i) => <Node key={i} node={child} />);
}

function Node({ node }: { node: RichNode }) {
  switch (node.type) {
    case "paragraph":
      return <p className="my-5 text-[1.125rem] leading-[1.75] text-ink-soft sm:text-[1.1875rem]">{renderChildren(node)}</p>;
    case "heading":
      return node.attrs.level === 2 ? (
        <h2 className="mt-12 mb-4 text-2xl font-extrabold sm:text-[1.75rem]">{renderChildren(node)}</h2>
      ) : (
        <h3 className="mt-8 mb-3 text-xl font-bold">{renderChildren(node)}</h3>
      );
    case "bulletList":
      return <ul className="my-6 list-disc space-y-2 pl-6 text-[1.125rem] leading-[1.7] text-ink-soft marker:text-squab-500">{renderChildren(node)}</ul>;
    case "orderedList":
      return <ol className="my-6 list-decimal space-y-2 pl-6 text-[1.125rem] leading-[1.7] text-ink-soft marker:font-bold marker:text-squab-700">{renderChildren(node)}</ol>;
    case "listItem":
      return <li className="pl-1 [&>p]:my-0">{renderChildren(node)}</li>;
    case "blockquote":
      return <blockquote className="my-8 border-l-4 border-squab-500 pl-5 italic">{renderChildren(node)}</blockquote>;
    case "pullQuote":
      return (
        <figure className="my-12 border-y border-line py-8">
          <blockquote className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
            <span aria-hidden className="mr-1 text-squab-500">“</span>
            {node.attrs.text}
            <span aria-hidden className="text-squab-500">”</span>
          </blockquote>
          {node.attrs.cite && <figcaption className="mt-4 text-sm font-semibold text-stone-muted">— {node.attrs.cite}</figcaption>}
        </figure>
      );
    case "image":
      return (
        <figure className="my-10">
          <Media src={node.attrs.src} alt={node.attrs.alt} ratio="3/2" sizes="(min-width: 768px) 720px, 100vw" />
          {node.attrs.caption && <figcaption className="mt-3 text-sm text-stone-muted">{node.attrs.caption}</figcaption>}
        </figure>
      );
    case "youtube":
      return (
        <figure className="my-10 aspect-video overflow-hidden rounded-[var(--radius-card)] bg-ink">
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(node.attrs.videoId)}`}
            title={node.attrs.title}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </figure>
      );
    case "ctaButton": {
      const href = safeHref(node.attrs.href);
      const cls = buttonVariants({ size: "lg" });
      return (
        <p className="my-10">
          {href.startsWith("/") ? (
            <Link href={href} className={cls}>
              {node.attrs.label} <ArrowRight aria-hidden />
            </Link>
          ) : (
            <a href={href} className={cls} rel="noopener noreferrer" target="_blank">
              {node.attrs.label} <ArrowRight aria-hidden />
            </a>
          )}
        </p>
      );
    }
    case "hardBreak":
      return <br />;
    case "text":
      return <Text node={node} />;
    default:
      return null;
  }
}

function Text({ node }: { node: Extract<RichNode, { type: "text" }> }) {
  let out: React.ReactNode = node.text;
  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") out = <strong className="font-semibold text-ink">{out}</strong>;
    else if (mark.type === "italic") out = <em>{out}</em>;
    else if (mark.type === "link") {
      const href = safeHref(mark.attrs.href);
      const cls = "font-medium text-squab-700 underline decoration-squab-300 underline-offset-4 hover:decoration-squab-700";
      out = href.startsWith("/") ? (
        <Link href={href} className={cls}>{out}</Link>
      ) : (
        <a href={href} className={cls} rel="noopener noreferrer" target="_blank">{out}</a>
      );
    }
  }
  return <>{out}</>;
}
