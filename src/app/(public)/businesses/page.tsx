import type { Metadata } from "next";
import { Suspense } from "react";
import { BusinessCard } from "@/components/businesses/business-card";
import { DirectoryExplorer } from "@/components/businesses/directory-explorer";
import { PageIntro, Section, SectionHeader } from "@/components/ui/section";
import { getBusinesses, getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Business directory — meet the Squab community",
  description: "Discover the businesses, makers, trades and services operating from Squab facilities.",
  alternates: { canonical: "/businesses" },
};

export default async function BusinessesPage() {
  const [businesses, categories] = await Promise.all([getBusinesses(), getCategories("business")]);
  const featured = businesses.filter((b) => b.featured).slice(0, 3);

  return (
    <>
      <PageIntro
        eyebrow="Business directory"
        title="Meet the businesses around you."
        description="Makers, trades, studios and services — all operating from Squab. Find someone to work with, buy from or simply say hello to."
      />
      {featured.length > 0 && (
        <Section aria-labelledby="featured-businesses" className="pb-0 sm:pb-0">
          <SectionHeader id="featured-businesses" title="Featured businesses" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((b) => <BusinessCard key={b.id} business={b} />)}
          </div>
        </Section>
      )}
      <Section aria-labelledby="all-businesses">
        <SectionHeader id="all-businesses" title="All businesses" />
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.map((b) => <BusinessCard key={b.id} business={b} />)}
            </div>
          }
        >
          <DirectoryExplorer businesses={businesses} categories={categories} />
        </Suspense>
      </Section>
    </>
  );
}
