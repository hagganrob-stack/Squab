import type { Metadata } from "next";
import { Suspense } from "react";
import { Search, Smartphone, Sparkles } from "lucide-react";
import { PerksExplorer } from "@/components/perks/perks-explorer";
import { OfferCard } from "@/components/perks/offer-card";
import { Section } from "@/components/ui/section";
import { getOffers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Squab Perks — exclusive offers for Squab customers",
  description: "Exclusive offers and discounts from local businesses in the Squab community.",
  alternates: { canonical: "/perks" },
};

const steps = [
  { icon: Search, title: "Pick a perk", body: "Browse offers from businesses around Squab." },
  { icon: Smartphone, title: "Get your code", body: "Show it at the counter or use it when you book." },
  { icon: Sparkles, title: "Enjoy", body: "No points, no sign-up — just good offers." },
];

export default async function PerksPage() {
  const offers = await getOffers();
  return (
    <>
      <header className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="absolute -right-24 -top-24 size-96 rounded-full bg-squab-500/15 blur-2xl" />
        <div aria-hidden className="absolute -bottom-32 left-1/3 size-80 rounded-full bg-squab-500/10 blur-2xl" />
        <div className="container-page relative py-12 sm:py-16">
          <span aria-hidden className="mb-4 block h-1 w-12 rounded-full bg-squab-500" />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-squab-300">Squab Perks</p>
          <h1 className="max-w-3xl text-display font-extrabold">
            A little extra from your <span className="text-squab-500">Squab community.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            <span className="font-bold text-white">{offers.length} exclusive offers</span> from local businesses, just for Squab customers.
          </p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="flex items-start gap-3 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-squab-500 text-ink">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block font-display font-extrabold">
                    <span className="text-squab-300">{i + 1}.</span> {title}
                  </span>
                  <span className="text-sm text-white/70">{body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </header>
      <Section aria-label="All perks" className="pt-10 sm:pt-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
