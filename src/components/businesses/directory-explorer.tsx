"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchInput, replaceQuery } from "@/components/shared/search-input";
import { EmptyState } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { normalise } from "@/lib/utils";
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
      {results.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No businesses found"
          body="Try another word, or browse them all."
          action={<Button variant="secondary" onClick={() => update("")}>Show all businesses</Button>}
        />
      )}
    </div>
  );
}
