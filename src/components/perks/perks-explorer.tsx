"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchInput, replaceQuery } from "@/components/shared/search-input";
import { EmptyState } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { normalise } from "@/lib/utils";
import type { OfferWithBusiness } from "@/types/content";
import { OfferCard } from "./offer-card";

export function PerksExplorer({ offers }: { offers: OfferWithBusiness[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const results = useMemo(() => {
    const q = normalise(query.trim());
    if (!q) return offers;
    return offers.filter((o) => {
      const hay = normalise([o.title, o.rewardLabel, o.business.name, o.business.kind, o.shortDescription].join(" "));
      return q.split(/\s+/).every((term) => hay.includes(term));
    });
  }, [offers, query]);

  const update = (v: string) => {
    setQuery(v);
    replaceQuery({ q: v || null });
  };

  return (
    <div>
      <SearchInput label="Search perks" placeholder="Search by business or offer — e.g. pilates, coffee, golf" value={query} onChange={update} className="max-w-2xl" />
      <p className="mt-6 mb-5 text-sm font-medium text-stone-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "offer" : "offers"}
      </p>
      {results.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {results.map((o, i) => (
            <OfferCard key={o.id} offer={o} priority={i < 3} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No offers match that search"
          body="Try a different word — or browse them all."
          action={<Button variant="secondary" onClick={() => update("")}>Show all offers</Button>}
        />
      )}
    </div>
  );
}
