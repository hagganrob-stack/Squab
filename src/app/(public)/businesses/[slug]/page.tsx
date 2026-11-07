import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Globe, Mail, MapPin, Phone } from "lucide-react";
import { BusinessCard } from "@/components/businesses/business-card";
import { OfferCard } from "@/components/perks/offer-card";
import { StoryCard } from "@/components/stories/story-card";
import { BackLink } from "@/components/shared/breadcrumb";
import { JsonLd } from "@/components/shared/json-ld";
import { TrackView } from "@/components/shared/track-view";
import { ButtonLink } from "@/components/ui/button";
import { SampleBadge } from "@/components/ui/badge";
import { Logo, Media } from "@/components/ui/media";
import { Section, SectionHeader } from "@/components/ui/section";
import { getBusinessBySlug, getBusinesses, getOffersForBusiness, getOtherBusinesses, getStories } from "@/lib/data";
import { siteUrl, stripProtocol } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getBusinesses()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/businesses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBusinessBySlug(slug);
  if (!b) return { title: "Business not found", robots: { index: false } };
  return {
    title: `${b.name} — ${b.tagline}`,
    description: b.description.slice(0, 155),
    alternates: { canonical: `/businesses/${b.slug}` },
    openGraph: { title: b.name, description: b.tagline, images: b.coverImageUrl ? [b.coverImageUrl] : undefined },
  };
}

const socialLabels = { instagram: "Instagram", linkedin: "LinkedIn", facebook: "Facebook", x: "X" } as const;

export default async function BusinessPage({ params }: PageProps<"/businesses/[slug]">) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) notFound();
  const [offers, related, stories] = await Promise.all([
    getOffersForBusiness(business.id),
    getOtherBusinesses(business),
    getStories(),
  ]);
  const features = stories.filter((s) => s.relatedBusinessId === business.id);
  const dark = business.logoBackground === "dark";

  return (
    <>
      <TrackView kind="business" id={business.id} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: business.name,
          description: business.description,
          url: business.website ?? siteUrl(`/businesses/${business.slug}`),
          ...(business.email ? { email: business.email } : {}),
          ...(business.phone ? { telephone: business.phone } : {}),
          ...(business.logoUrl ? { logo: business.logoUrl } : {}),
        }}
      />

      <div className="container-page pt-6">
        <BackLink href="/businesses" label="Directory" />
      </div>

      {/* Identity */}
      <header className="container-page pt-6">
        <div className="relative">
          <Media src={business.coverImageUrl} alt={`${business.name} cover photo`} ratio="21/9" fallbackLogo={business.logoUrl} fallbackLogoDark={dark} priority sizes="100vw" label="Cover photo" className="rounded-[var(--radius-panel)] max-sm:aspect-video!" />
          {business.isDemo && <SampleBadge className="absolute right-4 top-4" />}
        </div>
        <div className="flex flex-col gap-6 px-1 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <Logo src={business.logoUrl} name={business.name} size={104} dark={dark} className="-mt-12 rounded-[1.4rem] ring-[6px] ring-paper" />
            <div className="pb-1">
              <h1 className="text-headline font-extrabold sm:text-5xl">{business.name}</h1>
              <p className="mt-2 text-lg text-stone-muted">{business.tagline}</p>
            </div>
          </div>
          {business.kind && <p className="pb-2 text-sm font-bold uppercase tracking-[0.12em] text-squab-700">{business.kind}</p>}
        </div>
      </header>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px] lg:gap-14">
        <div>
          <section aria-labelledby="about">
            <h2 id="about" className="text-2xl font-extrabold">About {business.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{business.description}</p>
          </section>

          {business.services.length > 0 && (
            <section className="mt-10" aria-labelledby="services">
              <h2 id="services" className="text-2xl font-extrabold">Products &amp; services</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {business.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-squab-700" />
                    <span className="font-medium">{s}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {business.differentiator && (
            <section className="mt-10 rounded-[var(--radius-card)] bg-squab-50 p-6" aria-labelledby="different">
              <h2 id="different" className="text-lg font-extrabold text-squab-800">What makes us different</h2>
              <p className="mt-2 text-lg leading-relaxed text-ink">{business.differentiator}</p>
            </section>
          )}

          {offers.length > 0 && (
            <section className="mt-12" aria-labelledby="perks">
              <h2 id="perks" className="text-2xl font-extrabold">Squab Perks from {business.name}</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {offers.map((o) => <OfferCard key={o.id} offer={o} />)}
              </div>
            </section>
          )}

          {features.length > 0 && (
            <section className="mt-12" aria-labelledby="features">
              <h2 id="features" className="text-2xl font-extrabold">Featured in Squab Stories</h2>
              <div className="mt-5 grid gap-8 sm:grid-cols-2">
                {features.map((s) => <StoryCard key={s.id} story={s} size="sm" />)}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-stone-muted">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-[0.9375rem]">
              {business.website && <li className="flex items-center gap-3"><Globe aria-hidden className="size-4 text-stone-muted" /><a className="hover:text-squab-700" href={business.website} target="_blank" rel="noopener noreferrer">{stripProtocol(business.website)}</a></li>}
              {business.email && <li className="flex items-center gap-3"><Mail aria-hidden className="size-4 text-stone-muted" /><a className="hover:text-squab-700" href={`mailto:${business.email}`}>{business.email}</a></li>}
              {business.phone && <li className="flex items-center gap-3"><Phone aria-hidden className="size-4 text-stone-muted" /><a className="hover:text-squab-700" href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phone}</a></li>}
            </ul>
            {(Object.keys(socialLabels) as (keyof typeof socialLabels)[]).some((k) => business.social[k]) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {(Object.keys(socialLabels) as (keyof typeof socialLabels)[]).map((k) => {
                  const href = business.social[k];
                  if (!href) return null;
                  return (
                    <a key={k} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1 rounded-full bg-mist px-3.5 text-sm font-semibold text-ink hover:bg-squab-50 hover:text-squab-700">
                      {socialLabels[k]} <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  );
                })}
              </div>
            )}
            {business.website && (
              <ButtonLink href={business.website} external className="mt-6 w-full">Visit website</ButtonLink>
            )}
          </div>

          {(business.location || business.squabConnection) && (
            <div className="rounded-[var(--radius-card)] bg-ink p-6 text-white">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-squab-300">Where to find us</h2>
              {business.location && <p className="mt-3 flex items-center gap-2 font-semibold"><MapPin aria-hidden className="size-4 text-squab-300" />{business.location}</p>}
              {business.squabConnection && <p className="mt-2 text-white/75">{business.squabConnection}</p>}
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <Section aria-labelledby="related" className="border-t border-line bg-white">
          <SectionHeader id="related" title="More businesses" action={{ label: "Full directory", href: "/businesses" }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b) => <BusinessCard key={b.id} business={b} />)}
          </div>
        </Section>
      )}
    </>
  );
}
