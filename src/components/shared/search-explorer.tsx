"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchInput, replaceQuery } from "./search-input";
import { normalise } from "@/lib/utils";

export interface SearchItem {
  kind: "Perk" | "Business" | "Story" | "Event";
  title: string;
  subtitle: string;
  href: string;
  keywords: string;
}

export function SearchExplorer({ items }: { items: SearchItem[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const results = useMemo(() => {
    const q = normalise(query.trim());
    if (!q) return [];
    const terms = q.split(/\s+/);
    return items.filter((it) => {
      const hay = normalise(`${it.title} ${it.subtitle} ${it.keywords}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [items, query]);

  return (
    <div>
      <SearchInput
        label="Search Squab Connect"
        placeholder="Try “gin”, “joinery” or “networking”"
        value={query}
        autoFocus
        onChange={(v) => {
          setQuery(v);
          replaceQuery({ q: v || null });
        }}
      />
      <div className="mt-8" aria-live="polite">
        {query.trim() && (
          <p className="mb-4 text-sm font-medium text-stone-muted">
            {results.length} {results.length === 1 ? "result" : "results"} for “{query.trim()}”
          </p>
        )}
        <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-line empty:hidden">
          {results.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="flex items-center gap-4 px-5 py-4 hover:bg-mist/60">
                <span className="w-20 shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-squab-700">{r.kind}</span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{r.title}</span>
                  <span className="block truncate text-sm text-stone-muted">{r.subtitle}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {query.trim() && results.length === 0 && (
          <p className="rounded-[var(--radius-card)] bg-white p-6 text-stone-muted ring-1 ring-line">
            Nothing found. Try a broader term, or browse <Link className="font-semibold text-squab-700" href="/perks">perks</Link> and the <Link className="font-semibold text-squab-700" href="/businesses">directory</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
