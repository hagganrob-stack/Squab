import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Store, Tag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PageIntro, Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "About Squab Connect",
  description: "Squab Connect brings together the businesses, customers and tenants of Squab Storage.",
  alternates: { canonical: "/about" },
};

const pillars = [
  { icon: Tag, title: "Squab Perks", body: "Exclusive offers and discounts from businesses based at Squab — for everyone in the community.", href: "/perks" },
  { icon: Store, title: "Business directory", body: "Find the trades, makers, studios and services working alongside you.", href: "/businesses" },
  { icon: BookOpen, title: "News & Stories", body: "Squab news, business spotlights and what's happening across the community.", href: "/news" },
  { icon: CalendarDays, title: "Events", body: "Networking evenings and community events to meet people face to face.", href: "/events" },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Squab Connect"
        title="More than storage. A community of businesses and people."
        description="Squab facilities are home to small businesses, workshops, studios, tradespeople and thousands of customers. Squab Connect makes it easier for all of them to discover each other, do business together and feel part of something bigger."
      />
      <Section aria-labelledby="what">
        <SectionHeader id="what" title="What you'll find here" />
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
              Get a free profile in the directory, share an exclusive offer with the community and be considered for a spotlight in News & Stories.
            </p>
          </div>
          <ol className="space-y-4">
            {[
              ["Request access", "Tell us about your business and your connection with Squab."],
              ["We review your request", "The Squab team checks every business before it goes live."],
              ["Build your profile", "Add your logo, photos, services and contact details from your dashboard."],
              ["Share a perk", "Submit an offer for the community — we'll approve it and publish it for you."],
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
