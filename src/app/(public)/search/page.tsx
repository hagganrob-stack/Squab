import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchExplorer, type SearchItem } from "@/components/shared/search-explorer";
import { getBusinesses, getEvents, getOffers, getStories } from "@/lib/data";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage() {
  const [offers, businesses, stories, events] = await Promise.all([getOffers(), getBusinesses(), getStories(), getEvents()]);
  const items: SearchItem[] = [
    ...offers.map((o) => ({ kind: "Perk" as const, title: `${o.rewardLabel} · ${o.title}`, subtitle: o.business.name, href: `/perks/${o.slug}`, keywords: `${o.shortDescription} ${o.business.kind}` })),
    ...businesses.map((b) => ({
      kind: "Business" as const,
      title: b.name,
      subtitle: b.listingOnly ? "Based at Squab" : b.tagline,
      href: b.listingOnly ? `/businesses?q=${encodeURIComponent(b.name)}` : `/businesses/${b.slug}`,
      keywords: `${b.kind} ${b.description} ${b.services.join(" ")}`,
    })),
    ...stories.map((s) => ({ kind: "News" as const, title: s.title, subtitle: s.category.name, href: `/news/${s.slug}`, keywords: s.standfirst })),
    ...events.upcoming.map((e) => ({ kind: "Event" as const, title: e.title, subtitle: e.venue, href: `/events/${e.slug}`, keywords: e.summary })),
  ];
  return (
    <div className="container-page max-w-3xl py-12 sm:py-16">
      <h1 className="text-headline font-extrabold">Search Squab Connect</h1>
      <p className="mt-2 mb-8 text-stone-muted">Find offers, businesses, stories and events.</p>
      <Suspense fallback={<div className="h-13 rounded-full bg-white ring-1 ring-line" />}>
        <SearchExplorer items={items} />
      </Suspense>
    </div>
  );
}
