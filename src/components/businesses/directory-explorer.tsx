"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchInput, replaceQuery } from "@/components/shared/search-input";
import { EmptyState } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { initials, normalise } from "@/lib/utils";
import type { BusinessWithOffers } from "@/lib/data";
import { BusinessCard } from "./business-card";

export function DirectoryExplorer({ businesses }: { businesses: BusinessWithOffers[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const results = useMemo(() => {
    const q = normalise(query.trim());
    if (!q) return businesses;
    return businesses.filter((b) => {
      const hay = normalise([b.name, b.kind, b.tagline, b.description, b.location ?? "", ...b.services].join(" "));
      return q.split(/\s+/).every((t) => hay.includes(t));
    });
  }, [businesses, query]);

  const profiled = results.filter((b) => !b.listingOnly);
  const listed = results.filter((b) => b.listingOnly).sort((a, b) => a.name.localeCompare(b.name));

  const update = (v: string) => {
    setQuery(v);
    replaceQuery({ q: v || null });
  };

  return (
    <div>
      <SearchInput label="Search businesses" placeholder="Search by name or what they do" value={query} onChange={update} className="max-w-2xl" />
      <p className="mt-6 mb-5 text-sm font-medium text-stone-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "business" : "businesses"}
      </p>

      {results.length === 0 && (
        <EmptyState
          title="No businesses found"
          body="Try another word, or browse them all."
          action={<Button variant="secondary" onClick={() => update("")}>Show all businesses</Button>}
        />
      )}

      {profiled.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profiled.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      )}

      {listed.length > 0 && (
        <section aria-labelledby="also-at-squab" className={profiled.length ? "mt-14" : ""}>
          <span aria-hidden className="mb-4 block h-1 w-10 rounded-full bg-squab-500" />
          <h2 id="also-at-squab" className="text-2xl font-extrabold">Also based at Squab</h2>
          <p className="mt-2 max-w-2xl text-stone-muted">
            More of the businesses, charities and clubs that call Squab home. Profiles are added as businesses join Squab Connect.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listed.map((b) => (
              <li key={b.id} className="flex items-center gap-3 rounded-[var(--radius-control)] bg-white px-4 py-3 ring-1 ring-line/70">
                <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-lg bg-cream font-display text-sm font-extrabold text-squab-800">
                  {initials(b.name) || b.name.slice(0, 1)}
                </span>
                <span className="min-w-0 font-semibold leading-snug">{b.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
