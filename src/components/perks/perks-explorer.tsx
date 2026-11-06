"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterChip, SearchInput, replaceQuery } from "@/components/shared/search-input";
import { EmptyState } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { normalise } from "@/lib/utils";
import type { Category, OfferWithBusiness } from "@/types/content";
import { OfferCard } from "./offer-card";

type Flag = "featured" | "new" | "ending";

const flags: { id: Flag; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "New" },
  { id: "ending", label: "Ending soon" },
];

export function PerksExplorer({ offers, categories }: { offers: OfferWithBusiness[]; categories: Category[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<string | null>(params.get("category"));
  const [flag, setFlag] = useState<Flag | null>((params.get("show") as Flag | null) ?? null);

  const results = useMemo(() => {
    const q = normalise(query.trim());
    return offers.filter((o) => {
      if (category && !o.categories.some((c) => c.slug === category)) return false;
      if (flag === "featured" && !o.featured) return false;
      if (flag === "new" && !o.isNew) return false;
      if (flag === "ending" && !o.endingSoon) return false;
      if (!q) return true;
      const hay = normalise(
        [o.title, o.shortDescription, o.business.name, o.rewardLabel, ...o.categories.map((c) => c.name), ...o.whatYouGet].join(" "),
      );
      return q.split(/\s+/).every((term) => hay.includes(term));
    });
  }, [offers, query, category, flag]);

  const reset = () => {
    setQuery("");
    setCategory(null);
    setFlag(null);
    replaceQuery({ q: null, category: null, show: null });
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <SearchInput
          label="Search perks"
          placeholder="Search offers, businesses or services"
          value={query}
          onChange={(v) => {
            setQuery(v);
            replaceQuery({ q: v || null });
          }}
          className="max-w-2xl"
        />
        <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
          <FilterChip
            active={!category}
            onClick={() => {
              setCategory(null);
              replaceQuery({ category: null });
            }}
          >
            All categories
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
        <div role="group" aria-label="Show" className="flex flex-wrap gap-2">
          {flags.map((f) => (
            <FilterChip
              key={f.id}
              active={flag === f.id}
              onClick={() => {
                const next = flag === f.id ? null : f.id;
                setFlag(next);
                replaceQuery({ show: next });
              }}
            >
              {f.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-8 mb-5 text-sm font-medium text-stone-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "offer" : "offers"}
      </p>

      {results.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No offers match just yet"
          body="Try a different search or category — new perks are added by Squab businesses all the time."
          action={
            <Button variant="secondary" onClick={reset}>
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  );
}
