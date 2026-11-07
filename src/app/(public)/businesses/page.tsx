import type { Metadata } from "next";
import { Suspense } from "react";
import { BusinessCard } from "@/components/businesses/business-card";
import { DirectoryExplorer } from "@/components/businesses/directory-explorer";
import { PageIntro, Section } from "@/components/ui/section";
import { getBusinesses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Businesses — meet the Squab community",
  description: "Discover the local businesses in the Squab community.",
  alternates: { canonical: "/businesses" },
};

export default async function BusinessesPage() {
  const businesses = await getBusinesses();
  return (
    <>
      <PageIntro
        eyebrow="Businesses"
        title="Meet the businesses around you."
        description={`${businesses.length} businesses, charities and clubs are based at Squab — find someone to work with, buy from or simply say hello to.`}
      />
      <Section aria-label="All businesses" className="pt-10 sm:pt-12">
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.filter((b) => !b.listingOnly).map((b) => <BusinessCard key={b.id} business={b} />)}
            </div>
          }
        >
          <DirectoryExplorer businesses={businesses} />
        </Suspense>
      </Section>
    </>
  );
}
