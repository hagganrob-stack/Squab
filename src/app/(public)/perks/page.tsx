import type { Metadata } from "next";
import { Suspense } from "react";
import { PerksExplorer } from "@/components/perks/perks-explorer";
import { OfferCard } from "@/components/perks/offer-card";
import { PageIntro, Section } from "@/components/ui/section";
import { getOffers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Squab Perks — exclusive offers for Squab customers",
  description: "Exclusive offers and discounts from local businesses in the Squab community.",
  alternates: { canonical: "/perks" },
};

export default async function PerksPage() {
  const offers = await getOffers();
  return (
    <>
      <PageIntro
        eyebrow="Squab Perks"
        title="A little extra from your Squab community."
        description="Exclusive offers from local businesses. Pick an offer, then show your code at the business or use it when you book."
      />
      <Section aria-label="All perks" className="pt-10 sm:pt-12">
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          }
        >
          <PerksExplorer offers={offers} />
        </Suspense>
      </Section>
    </>
  );
}
