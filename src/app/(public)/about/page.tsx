import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Store, Tag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { PageIntro, Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "About Squab — Workspace, Storage, Removals and Farm",
  description:
    "Squab is a family-run group near Leamington Spa: Squab Workspace, Squab Storage, Squab Removals and Squab Hall Farm. Squab Connect brings their community together.",
  alternates: { canonical: "/about" },
};

/**
 * Facts below are taken from each business's own website (checked November 2026):
 * squabworkspace.co.uk, squabstorage.co.uk/about-us, squabremovals.co.uk, squabhallfarm.co.uk/about.
 */
const family = [
  {
    name: "Squab Workspace",
    strap: "Flexible space for businesses to grow",
    image: "/images/squab/workspace-office.webp",
    alt: "A bright private office at Squab Workspace, Rubery",
    body: "Squab Workspace offers everything from small units and containers to large warehouses and offices, which businesses can fit out to suit their brand. One all-inclusive rent, with no lock-in contracts and no minimum term, so you can scale up or down as you need. Tenants share meeting and conference rooms, communal areas, showers and bike storage, plus goods-in and goods-out handling and membership of the Squab Business Club. Tradespeople, studios, coaches, e-commerce sellers and professional firms all work from Squab.",
    facts: ["Six sites", "No minimum contract", "All-inclusive rent", "Business Club membership"],
    href: "https://squabworkspace.co.uk",
    site: "squabworkspace.co.uk",
  },
  {
    name: "Squab Storage",
    strap: "Award-winning, independent self storage",
    image: "/images/squab/bridgwater.webp",
    alt: "Squab Storage's purpose-built facility in Bridgwater",
    body: "Squab Storage began in 2006, when Emlyn Evans and his late father Keith diversified the family farm near Leamington Spa. It has grown into one of the UK's most respected independent storage brands, with nearly 250,000 sq ft of capacity across Leamington Spa, Warwick, Evesham, Rubery, Stowmarket and Bridgwater. Sites are open 7 days a week, with CCTV, individual alarms and electronic access. Around 40% of customers are businesses, and more than 170 local businesses use the Leamington Spa site alone as part of their daily operations. Squab is a member of the Self Storage Association and has committed to clear, transparent pricing with no surprises.",
    facts: ["Founded 2006", "~250,000 sq ft", "170+ businesses at Leamington", "No.1 Independent in Europe — Evesham 2021, Leamington 2023"],
    href: "https://squabstorage.co.uk",
    site: "squabstorage.co.uk",
  },
  {
    name: "Squab Removals",
    strap: "Family-run movers, from one item to a whole office",
    image: "/images/squab/removals-lorry.webp",
    alt: "A Squab Removals lorry",
    body: "Squab Removals is a family-run removals company working from its purpose-built site on the edge of Leamington Spa. It has moved thousands of homes and businesses across Leamington, Warwick, Kenilworth and the wider Midlands. Services run from single-item moves to fully managed moves with packing, as well as commercial and office relocations and moves across Europe and worldwide. The team are members of the British Association of Removers, trained at Squab's own training centre, and backed by Squab's storage when there's a gap between moves.",
    facts: ["Domestic & commercial", "European & international", "British Association of Removers member"],
    href: "https://squabremovals.co.uk",
    site: "squabremovals.co.uk",
  },
  {
    name: "Squab Hall Farm",
    strap: "Where it all started, in 1933",
    image: "/images/squab/farm-harvest.webp",
    alt: "Harvest at Squab Hall Farm",
    body: "Timothy Idris Evans and Margaret moved from Wales to Squab Hall in 1933 to start a family farm. Three generations on, T.I. Evans and Son farm 485 hectares of owned and rented arable land, growing wheat, barley, beans and oilseed rape. The farm works through the Windmill Farming joint venture with neighbouring farmers and uses precision techniques like GPS steering and controlled traffic. Around 60 hectares are in environmental schemes, including wildflower margins and hedge planting. When the dairy and poultry stopped in the early '90s, the old farm buildings became the first Squab storage, and that's how everything else began.",
    facts: ["Evans family since 1933", "485 hectares", "~60 ha in environmental schemes"],
    href: "https://squabhallfarm.co.uk",
    site: "squabhallfarm.co.uk",
  },
] as const;

const timeline = [
  ["1933", "The Evans family arrive at Squab Hall and start a dairy, poultry and arable farm."],
  ["1990s", "Dairy and poultry come to an end. The farm buildings are repurposed for crop and archive storage."],
  ["2006", "Emlyn and Keith Evans launch Squab self storage on the farm near Leamington Spa."],
  ["2015", "Squab expands beyond the farm with new purpose-built storage and workspace sites."],
  ["2021 & 2023", "Evesham, then Leamington Spa, voted No.1 Independent Self-Storage Operation in Europe."],
  ["Today", "Six sites, and more than 170 businesses at Leamington Spa alone. That's a community worth connecting: welcome to Squab Connect."],
] as const;

const pillars = [
  { icon: Tag, title: "Squab Perks", body: "Exclusive offers and discounts from businesses based at Squab, for everyone in the community.", href: "/perks" },
  { icon: Store, title: "The Network", body: "Find the trades, makers, studios and services working alongside you.", href: "/businesses" },
  { icon: BookOpen, title: "News", body: "Squab news, business spotlights and what's happening across the community.", href: "/news" },
  { icon: CalendarDays, title: "Events", body: "Networking evenings and community events where you can meet people face to face.", href: "/events" },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Squab"
        title="One family. Four businesses. A whole community."
        description="Squab started as a family farm on Harbury Lane, just outside Leamington Spa. Nearly a century on, the Squab umbrella covers workspace, self storage, removals and the farm itself. The sites are home to hundreds of businesses and thousands of customers, and Squab Connect brings them together."
      />

      <Section aria-labelledby="family" className="pt-4 sm:pt-6">
        <SectionHeader id="family" eyebrow="Under the Squab umbrella" title="Meet the Squab family of businesses" />
        <div className="space-y-12 lg:space-y-16">
          {family.map((b, i) => (
            <article key={b.name} aria-labelledby={`fam-${i}`} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <Media
                src={b.image}
                alt={b.alt}
                ratio="4/3"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={i % 2 ? "lg:order-2" : undefined}
              />
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-squab-700">{b.strap}</p>
                <h3 id={`fam-${i}`} className="mt-2 text-headline font-extrabold">{b.name}</h3>
                <p className="mt-4 leading-relaxed text-stone-muted">{b.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {b.facts.map((f) => (
                    <li key={f} className="rounded-full bg-white px-3 py-1 text-sm font-semibold ring-1 ring-line">{f}</li>
                  ))}
                </ul>
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 font-bold text-squab-700 hover:underline"
                >
                  Visit {b.site} <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="story" className="bg-ink text-white">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-squab-300">Our story</p>
        <h2 id="story" className="mt-3 max-w-2xl text-headline font-extrabold">From a Warwickshire farm to six sites</h2>
        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {timeline.map(([year, text]) => (
            <li key={year} className="border-l-2 border-squab-500 pl-5">
              <span className="font-display text-2xl font-extrabold text-squab-300">{year}</span>
              <p className="mt-1 text-white/80">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="what">
        <SectionHeader
          id="what"
          eyebrow="About Squab Connect"
          title="What you'll find here"
          description="Squab Connect helps the businesses, tenants and customers across every Squab site discover each other, do business together and feel part of something bigger."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, body, href }) => (
            <Link key={title} href={href} className="group rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line transition-shadow hover:shadow-lift">
              <span className="grid size-11 place-items-center rounded-xl bg-squab-50 text-squab-700"><Icon aria-hidden className="size-5" /></span>
              <h3 className="mt-5 text-lg font-bold group-hover:text-squab-700">{title}</h3>
              <p className="mt-2 text-stone-muted">{body}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="businesses" aria-labelledby="for-businesses" className="bg-white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-squab-700">For Squab businesses</p>
            <h2 id="for-businesses" className="mt-3 text-headline font-extrabold">Run a business from Squab? Make yourself known.</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-muted">
              Get a free profile in the Network, share an exclusive offer with the community and be considered for a spotlight in Squab News.
            </p>
          </div>
          <ol className="space-y-4">
            {[
              ["Request access", "Tell us about your business and your connection with Squab."],
              ["We review your request", "The Squab team checks every business before it goes live."],
              ["Build your profile", "Add your logo, photos, services and contact details from your dashboard."],
              ["Share a perk", "Submit an offer for the community and we'll approve it and publish it for you."],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4 rounded-[var(--radius-card)] bg-paper p-5 ring-1 ring-line">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink font-display font-extrabold text-white">{i + 1}</span>
                <span><span className="block font-bold">{title}</span><span className="text-stone-muted">{body}</span></span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10 rounded-[var(--radius-card)] bg-squab-50 p-6 sm:flex sm:items-center sm:justify-between">
          <p className="font-semibold text-squab-900">Online business registration opens soon. In the meantime, speak to the Squab team at your facility.</p>
          <ButtonLink href="/register" className="mt-4 sm:mt-0">Register interest <ArrowRight aria-hidden /></ButtonLink>
        </div>
      </Section>

      <Section aria-labelledby="policies">
        <SectionHeader id="policies" title="Privacy & terms" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div id="privacy" className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line">
            <h3 className="text-lg font-bold">Privacy</h3>
            <p className="mt-2 text-stone-muted">Squab Connect&rsquo;s full privacy and cookie policy will be published here before launch. We use privacy-friendly, cookieless analytics and never share your details with businesses without your action.</p>
          </div>
          <div id="terms" className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line">
            <h3 className="text-lg font-bold">Terms of use</h3>
            <p className="mt-2 text-stone-muted">Offers are provided by the businesses listed and are subject to their own terms. Full website terms will be published here before launch.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
