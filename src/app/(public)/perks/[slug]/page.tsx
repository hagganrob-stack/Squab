import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Globe, Mail, MapPin, Phone } from "lucide-react";
import { RedemptionPanel } from "@/components/perks/redemption-panel";
import { OfferCard } from "@/components/perks/offer-card";
import { BackLink } from "@/components/shared/breadcrumb";
import { TrackView } from "@/components/shared/track-view";
import { CategoryChip, SampleBadge } from "@/components/ui/badge";
import { Logo, Media } from "@/components/ui/media";
import { Section, SectionHeader } from "@/components/ui/section";
import { getBusinessById, getOfferBySlug, getOffers, getRelatedOffers } from "@/lib/data";
import { formatDate, stripProtocol } from "@/lib/utils";

export async function generateStaticParams() {
  const offers = await getOffers();
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps<"/perks/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);
  if (!offer) return { title: "Offer not found", robots: { index: false } };
  return {
    title: `${offer.title} — ${offer.business.name}`,
    description: offer.shortDescription,
    alternates: { canonical: `/perks/${offer.slug}` },
    openGraph: { title: `${offer.rewardLabel}: ${offer.title}`, description: offer.shortDescription, images: offer.imageUrl ? [offer.imageUrl] : undefined },
  };
}

export default async function OfferPage({ params }: PageProps<"/perks/[slug]">) {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);
  if (!offer) notFound();
  const [business, related] = await Promise.all([getBusinessById(offer.businessId), getRelatedOffers(offer)]);
  const primary = offer.categories[0];

  return (
    <>
      <TrackView kind="offer" id={offer.id} />
      <div className="container-page pt-6">
        <BackLink href="/perks" label="All perks" />
      </div>

      <article className="container-page grid gap-10 pb-16 pt-6 lg:grid-cols-[1fr_400px] lg:gap-14">
        <div>
          <div className="relative">
            <Media src={offer.imageUrl} alt={`${offer.title} — ${offer.business.name}`} ratio="16/9" tone={primary?.tone} priority sizes="(min-width: 1024px) 60vw, 100vw" label={offer.business.name} className="rounded-[var(--radius-panel)]" />
            {offer.isDemo && <SampleBadge className="absolute right-4 top-4" />}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {offer.categories.map((c) => (
              <CategoryChip key={c.id} tone={c.tone}>{c.name}</CategoryChip>
            ))}
          </div>
          <h1 className="mt-4 text-headline font-extrabold sm:text-5xl">{offer.title}</h1>
          <Link href={`/businesses/${offer.business.slug}`} className="mt-4 inline-flex items-center gap-3 font-semibold hover:text-squab-700">
            <Logo src={offer.business.logoUrl} name={offer.business.name} size={36} className="rounded-lg" />
            {offer.business.name}
          </Link>

          <p className="mt-8 text-lg leading-relaxed text-ink-soft">{offer.fullDescription}</p>

          {offer.whatYouGet.length > 0 && (
            <section className="mt-10" aria-labelledby="what-you-get">
              <h2 id="what-you-get" className="text-2xl font-extrabold">What you receive</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {offer.whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-squab-50 text-squab-700"><Check aria-hidden className="size-4" /></span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10" aria-labelledby="how-to-redeem">
            <h2 id="how-to-redeem" className="text-2xl font-extrabold">How to redeem</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{offer.howToRedeem}</p>
          </section>

          {offer.terms && (
            <section className="mt-10 rounded-2xl bg-mist p-5" aria-labelledby="terms">
              <h2 id="terms" className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-stone-muted">Terms &amp; conditions</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{offer.terms}</p>
              {(offer.startDate || offer.expiryDate) && (
                <p className="mt-2 text-sm text-stone-muted">
                  {offer.startDate && <>Valid from {formatDate(offer.startDate)}</>}
                  {offer.expiryDate && <> until {formatDate(offer.expiryDate)}</>}.
                </p>
              )}
            </section>
          )}
        </div>

        <aside id="redeem" className="scroll-mt-24 space-y-6 lg:sticky lg:top-24 lg:self-start">
          <RedemptionPanel
            offerId={offer.id}
            offerTitle={offer.title}
            rewardLabel={offer.rewardLabel}
            businessName={offer.business.name}
            method={offer.redemptionMethod}
            url={offer.redemptionUrl}
            code={offer.redemptionCode}
            email={offer.contactEmail}
            phone={offer.contactPhone}
            expiryLabel={offer.expiryDate ? `Offer ends ${formatDate(offer.expiryDate)}` : "Ongoing offer"}
          />
          {business && (
            <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line">
              <div className="flex items-center gap-3">
                <Logo src={business.logoUrl} name={business.name} size={44} />
                <div>
                  <p className="font-display font-bold">{business.name}</p>
                  <p className="text-sm text-stone-muted">{business.tagline}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {business.website && <li className="flex items-center gap-2.5"><Globe aria-hidden className="size-4 text-stone-muted" /><a className="hover:text-squab-700" href={business.website} rel="noopener noreferrer" target="_blank">{stripProtocol(business.website)}</a></li>}
                {business.email && <li className="flex items-center gap-2.5"><Mail aria-hidden className="size-4 text-stone-muted" /><a className="hover:text-squab-700" href={`mailto:${business.email}`}>{business.email}</a></li>}
                {business.phone && <li className="flex items-center gap-2.5"><Phone aria-hidden className="size-4 text-stone-muted" /><a className="hover:text-squab-700" href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phone}</a></li>}
                {business.facility && <li className="flex items-center gap-2.5"><MapPin aria-hidden className="size-4 text-stone-muted" />{business.facility}</li>}
              </ul>
              <Link href={`/businesses/${business.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-squab-700 hover:underline">
                View full profile <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          )}
        </aside>
      </article>

      {/* Mobile: keep the primary action one tap away */}
      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <a href="#redeem" className="flex h-12 items-center justify-between rounded-[var(--radius-control)] bg-squab-700 px-5 font-semibold text-white">
          <span>{offer.rewardLabel}</span>
          <span className="inline-flex items-center gap-1">Get this offer <ArrowRight aria-hidden className="size-4" /></span>
        </a>
      </div>

      {related.length > 0 && (
        <Section aria-labelledby="related-perks" className="border-t border-line bg-white">
          <SectionHeader id="related-perks" title="You might also like" action={{ label: "All perks", href: "/perks" }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((o) => <OfferCard key={o.id} offer={o} />)}
          </div>
        </Section>
      )}
      <div aria-hidden className="h-20 lg:hidden" />
    </>
  );
}
