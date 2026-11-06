import type { Metadata } from "next";
import { Suspense } from "react";
import { PerksExplorer } from "@/components/perks/perks-explorer";
import { OfferCard } from "@/components/perks/offer-card";
import { PageIntro, Section, SectionHeader } from "@/components/ui/section";
import { getCategories, getOffers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Squab Perks — exclusive offers from the Squab community",
  description:
    "Discover exclusive offers, discounts and services from the businesses that make up the Squab community.",
  alternates: { canonical: "/perks" },
};

export default async function PerksPage() {
  const [offers, categories] = await Promise.all([getOffers(), getCategories("perk")]);
  const featured = offers.filter((o) => o.featured).slice(0, 3);

  return (
    <>
      <PageIntro
        eyebrow="Squab Perks"
        title="A little extra from your Squab community."
        description="Discover exclusive offers, discounts and services from the businesses that make up the Squab community. No points, no catches — just good offers from good neighbours."
      />

      {featured.length > 0 && (
        <Section aria-labelledby="featured-perks" className="pb-0 sm:pb-0">
          <SectionHeader id="featured-perks" title="Featured this month" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((o, i) => (
              <OfferCard key={o.id} offer={o} priority={i === 0} />
            ))}
          </div>
        </Section>
      )}

      <Section aria-labelledby="all-perks">
        <SectionHeader id="all-perks" title="All perks" description="Newest first. Search or filter to find something for you." />
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((o) => (
                <OfferCard key={o.id} offer={o} />
              ))}
            </div>
          }
        >
          <PerksExplorer offers={offers} categories={categories} />
        </Suspense>
      </Section>
    </>
  );
}
