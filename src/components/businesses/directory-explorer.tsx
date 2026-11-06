"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterChip, SearchInput, replaceQuery } from "@/components/shared/search-input";
import { EmptyState } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { normalise } from "@/lib/utils";
import type { Category } from "@/types/content";
import type { BusinessWithCategories } from "@/lib/data";
import { BusinessCard } from "./business-card";

export function DirectoryExplorer({ businesses, categories }: { businesses: BusinessWithCategories[]; categories: Category[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<string | null>(params.get("category"));

  const results = useMemo(() => {
    const q = normalise(query.trim());
    return businesses.filter((b) => {
      if (category && !b.categories.some((c) => c.slug === category)) return false;
      if (!q) return true;
      const hay = normalise([b.name, b.tagline, b.description, ...b.services, ...b.categories.map((c) => c.name)].join(" "));
      return q.split(/\s+/).every((t) => hay.includes(t));
    });
  }, [businesses, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <SearchInput
          label="Search businesses"
          placeholder="Search by name, service or keyword"
          value={query}
          onChange={(v) => {
            setQuery(v);
            replaceQuery({ q: v || null });
          }}
          className="max-w-2xl"
        />
        <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
          <FilterChip active={!category} onClick={() => { setCategory(null); replaceQuery({ category: null }); }}>
            All businesses
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              active={category === c.slug}
              onClick={() => {
                const next = category === c.slug ? null : c.slug;
                setCategory(next);
                replaceQuery({ category: next });
              }}
            >
              {c.name}
            </FilterChip>
          ))}
        </div>
      </div>
      <p className="mt-8 mb-5 text-sm font-medium text-stone-muted" aria-live="polite">
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
          body="Try another search term or browse all categories."
          action={<Button variant="secondary" onClick={() => { setQuery(""); setCategory(null); replaceQuery({ q: null, category: null }); }}>Clear filters</Button>}
        />
      )}
    </div>
  );
}
