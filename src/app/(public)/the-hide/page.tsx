import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Coffee, Mail, MapPin, Phone, Tag } from "lucide-react";
import { JsonLd } from "@/components/shared/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { getBusinessBySlug, getOffersForBusiness } from "@/lib/data";
import { hide } from "@/lib/content/the-hide";
import { cn, siteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Hide Café at Squab Hall Farm, Leamington Spa",
  description:
    "The Hide at Squab Hall Farm near Leamington Spa — fresh breakfasts, lunches, great coffee, catering and welcoming spaces to meet and gather.",
  alternates: { canonical: "/the-hide" },
};

const mailto = (subject: string) => `mailto:${hide.email}?subject=${encodeURIComponent(subject)}`;

function Bar({ className }: { className?: string }) {
  return <span aria-hidden className={cn("mb-4 block h-1 w-10 rounded-full bg-hide-orange", className)} />;
}

export default async function TheHidePage() {
  const business = await getBusinessBySlug("the-hide-cafe");
  const perks = business ? await getOffersForBusiness(business.id) : [];
  const perk = perks[0];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: hide.name,
          url: siteUrl("/the-hide"),
          telephone: hide.phone,
          email: hide.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Squab Hall Farm, Harbury Lane",
            addressLocality: "Leamington Spa",
            postalCode: "CV33 9QB",
            addressCountry: "GB",
          },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "15:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "14:00" },
          ],
        }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-hide-black text-white">
        <Image
          src="/images/partners/the-hide-cafe-cover.webp"
          alt="Inside The Hide café"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/60 to-black/25 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/60 lg:to-black/10" />
        <div className="container-page flex min-h-[34rem] flex-col justify-end gap-8 py-14 lg:min-h-[38rem] lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div className="max-w-2xl">
            <Bar className="w-12" />
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-hide-orange">The Hide by Squab • {hide.eyebrow}</p>
            <h1 className="text-display font-extrabold text-white">
              Tucked away. <span className="text-hide-orange">Worth finding.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{hide.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#visit" size="lg" className="bg-hide-orange text-black hover:bg-[#f7a443]">
                Plan your visit <ArrowRight aria-hidden />
              </ButtonLink>
              {perk && (
                <ButtonLink href={`/perks/${perk.slug}`} size="lg" variant="onDark">
                  <Tag aria-hidden /> Squab Perk: {perk.title.toLowerCase()}
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="hidden shrink-0 lg:block">
            <Image src="/images/partners/the-hide-logo.png" alt="The Hide by Squab logo" width={220} height={220} className="rounded-full bg-white shadow-lift" />
          </div>
        </div>
      </section>

      {/* Offers strip */}
      <section aria-label="Offers at The Hide" className="bg-hide-orange text-black">
        <div className="container-page grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {perk && (
            <Link href={`/perks/${perk.slug}`} className="group flex items-center gap-3 rounded-2xl bg-black px-5 py-4 text-white">
              <Tag aria-hidden className="size-5 shrink-0 text-hide-orange" />
              <span>
                <span className="block font-display font-extrabold">Squab customers: {perk.title.toLowerCase()}</span>
                <span className="text-sm text-white/75">Show code {perk.redemptionCode} at the counter →</span>
              </span>
            </Link>
          )}
          {hide.cafeOffers.map((o) => (
            <div key={o.label} className="flex items-center gap-3 rounded-2xl bg-white/45 px-5 py-4">
              <Coffee aria-hidden className="size-5 shrink-0" />
              <span>
                <span className="block font-display font-extrabold">{o.label}</span>
                <span className="text-sm">{o.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-hide-cream py-14 sm:py-20" aria-labelledby="pillars">
        <div className="container-page">
          <Bar />
          <h2 id="pillars" className="text-headline font-extrabold text-black">Good food. Good provenance. Good company.</h2>
          <p className="mt-3 max-w-2xl text-lg text-black/70">{hide.intro2}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {hide.pillars.map((p) => (
              <div key={p.title} className="rounded-[var(--radius-card)] bg-white p-6">
                <h3 className="text-lg font-extrabold uppercase tracking-wide text-black">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-black/75">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 sm:py-20" aria-labelledby="story">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Media src="/images/partners/the-hide-cafe-gathering.webp" alt="Friends chatting over coffee at The Hide" ratio="4/3" className="rounded-[var(--radius-panel)]" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div>
            <Bar />
            <h2 id="story" className="text-headline font-extrabold">A café with a story</h2>
            {hide.story.map((para) => (
              <p key={para} className="mt-4 text-lg leading-relaxed text-ink-soft">{para}</p>
            ))}
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-stone-muted">{hide.values.join(" • ")}</p>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="bg-white py-14 sm:py-20" aria-labelledby="menu">
        <div className="container-page">
          <Bar />
          <h2 id="menu" className="text-headline font-extrabold">Freshly made. Properly satisfying.</h2>
          <p className="mt-3 max-w-2xl text-lg text-stone-muted">
            A straightforward, generous menu with daily and seasonal specials alongside the regular favourites. Ask the team about dietary requirements — they’ll always help where they can.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hide.menu.map((m) => (
              <div key={m.title} className="rounded-[var(--radius-card)] border-t-4 border-hide-orange bg-paper p-6">
                <h3 className="text-xl font-extrabold">{m.title}</h3>
                <p className="mt-1 text-sm font-semibold text-squab-700">{m.when}</p>
                <ul className="mt-4 space-y-2 text-ink-soft">
                  {m.items.map((i) => (
                    <li key={i} className="flex gap-2"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-hide-orange" />{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers */}
      <section className="bg-hide-black py-14 text-white sm:py-20" aria-labelledby="british">
        <div className="container-page">
          <Bar />
          <h2 id="british" className="text-headline font-extrabold">Proud to buy British</h2>
          <p className="mt-3 max-w-2xl text-lg text-white/75">Good food starts with good ingredients — and with knowing a little about where they come from.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hide.suppliers.map((s) => (
              <div key={s.name} className="rounded-[var(--radius-card)] bg-white/[0.07] p-6 ring-1 ring-white/10">
                <h3 className="font-display text-lg font-extrabold text-hide-orange">{s.name}</h3>
                <p className="mt-2 leading-relaxed text-white/80">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section className="py-14 sm:py-20" aria-labelledby="spaces">
        <div className="container-page">
          <Bar />
          <h2 id="spaces" className="text-headline font-extrabold">More than a café</h2>
          <p className="mt-3 max-w-2xl text-lg text-stone-muted">Catering and spaces to gather at Squab Hall Farm, with The Hide close at hand for food and coffee.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {hide.spaces.map((s) => (
              <div key={s.title} className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-card ring-1 ring-line">
                <h3 className="text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
                <ul className="mt-4 space-y-1.5 text-sm font-semibold text-ink">
                  {s.facts.map((f) => (
                    <li key={f} className="flex gap-2"><span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-hide-orange" />{f}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <ButtonLink href={mailto(s.subject)} variant="dark" className="w-full">
                    <Mail aria-hidden /> {s.cta}
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-stone-muted">Prices are a guide — the team will confirm current rates when you enquire.</p>
        </div>
      </section>

      {/* Find us */}
      <section id="visit" className="scroll-mt-20 bg-hide-cream py-14 sm:py-20" aria-labelledby="find-us">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Bar />
            <h2 id="find-us" className="text-headline font-extrabold text-black">Fancy a coffee?</h2>
            <p className="mt-3 max-w-xl text-lg text-black/75">{hide.directions}</p>
            <address className="mt-8 flex gap-3 not-italic text-lg text-black">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-squab-700" />
              <span>
                <span className="block font-bold">{hide.name}</span>
                {hide.address.map((l) => <span key={l} className="block">{l}</span>)}
              </span>
            </address>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={hide.mapUrl} external size="lg" className="bg-hide-black text-white hover:bg-black/85">
                <MapPin aria-hidden /> Get directions
              </ButtonLink>
              <ButtonLink href={`tel:${hide.phone.replace(/\s/g, "")}`} size="lg" variant="secondary">
                <Phone aria-hidden /> {hide.phone}
              </ButtonLink>
            </div>
            <p className="mt-4">
              <a href={`mailto:${hide.email}`} className="inline-flex items-center gap-2 font-semibold text-black underline decoration-hide-orange decoration-2 underline-offset-4">
                <Mail aria-hidden className="size-4" /> {hide.email}
              </a>
            </p>
          </div>
          <div className="rounded-[var(--radius-panel)] bg-white p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-xl font-extrabold"><Clock aria-hidden className="size-5 text-squab-700" /> Opening hours</h3>
            <dl className="mt-5 divide-y divide-line">
              {hide.hours.map((h) => (
                <div key={h.when} className="flex justify-between gap-4 py-3">
                  <dt className="font-semibold">{h.when}</dt>
                  <dd className={cn(h.time === "Closed" ? "text-stone-muted" : "font-semibold")}>{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-stone-muted">Breakfast until 11am, lunch 11am–3pm on weekdays.</p>
            <div className="mt-6 flex items-center gap-4 border-t border-line pt-6">
              <Image src="/images/partners/the-hide-logo.png" alt="" width={56} height={56} />
              <p className="text-sm text-ink-soft">Good food, good provenance and good company — tucked away at Squab Hall Farm.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
