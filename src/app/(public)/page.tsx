import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { Hero } from "@/components/homepage/hero";
import { OfferCard } from "@/components/perks/offer-card";
import { StoryCard } from "@/components/stories/story-card";
import { DateTile } from "@/components/events/event-card";
import { ButtonLink } from "@/components/ui/button";
import { Logo, Media } from "@/components/ui/media";
import { SampleBadge } from "@/components/ui/badge";
import { EmptyState, Section, SectionHeader } from "@/components/ui/section";
import {
  getBusinesses,
  getEvents,
  getFeaturedOffers,
  getHomepageSettings,
  getStories,
} from "@/lib/data";
import { eventDayLabel, eventTimes } from "@/lib/utils";

export default async function HomePage() {
  const [settings, offers, businesses, stories, events] = await Promise.all([
    getHomepageSettings(),
    getFeaturedOffers(6),
    getBusinesses(),
    getStories(),
    getEvents(),
  ]);
  const community = [...businesses].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 8);
  const [leadStory, ...moreStories] = stories;
  const nextEvent = events.upcoming.find((e) => e.featured) ?? events.upcoming[0];

  return (
    <>
      <Hero hero={settings.hero} />

      {/* Featured perks */}
      <Section aria-labelledby="perks-heading">
        <SectionHeader
          id="perks-heading"
          eyebrow="Squab Perks"
          title="A little extra from your Squab community"
          description="Exclusive offers from local businesses — show your code at the business or use it when you book."
          action={{ label: "View all perks", href: "/perks" }}
        />
        {offers.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        ) : (
          <EmptyState title="Perks are on their way" body="Squab businesses are preparing their first offers. Check back soon." />
        )}
      </Section>

      {/* Meet the community */}
      <Section aria-labelledby="community-heading" className="bg-cream">
        <SectionHeader
          id="community-heading"
          eyebrow="Meet the community"
          title="The businesses around you"
          description="Pilates, golf, swimming, coffee, training and more — discover the businesses in the Squab community."
          action={{ label: "Discover all businesses", href: "/businesses" }}
        />
        <ul className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {community.map((b) => (
            <li key={b.id} className="w-[70%] shrink-0 snap-start sm:w-auto">
              <Link
                href={`/businesses/${b.slug}`}
                className="group flex h-full items-start gap-4 rounded-[var(--radius-card)] bg-white p-4 transition-shadow hover:shadow-lift"
              >
                <Logo src={b.logoUrl} name={b.name} size={52} dark={b.logoBackground === "dark"} />
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-display font-bold group-hover:text-squab-700">{b.name}</span>
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm text-stone-muted">{b.tagline}</span>
                  {b.isDemo && <SampleBadge className="mt-2" />}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Latest stories */}
      {leadStory && (
        <Section aria-labelledby="stories-heading">
          <SectionHeader
            id="stories-heading"
            eyebrow="News & Stories"
            title="What’s happening at Squab"
            action={{ label: "All news & stories", href: "/news" }}
          />
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            <StoryCard story={leadStory} ratio="16/9" size="lg" />
            <div className="grid content-start gap-10">
              {moreStories.slice(0, 2).map((s) => (
                <StoryCard key={s.id} story={s} ratio="21/9" size="sm" />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Upcoming event */}
      {nextEvent && (
        <Section aria-labelledby="event-heading" className="pt-0 sm:pt-0">
          <div className="overflow-hidden rounded-[var(--radius-panel)] bg-black text-white lg:grid lg:grid-cols-2">
            <div className="relative">
              <Media src={nextEvent.imageUrl} alt="" ratio="16/9" tone="rose" rounded={false} className="h-full lg:aspect-auto!" label="Event photo" />
              {nextEvent.isDemo && <SampleBadge className="absolute right-4 top-4" />}
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <span aria-hidden className="mb-4 block h-1 w-10 rounded-full bg-squab-500" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-squab-300">Upcoming event</p>
              <h2 id="event-heading" className="mt-3 text-headline font-extrabold">{nextEvent.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/75">{nextEvent.summary}</p>
              <div className="mt-6 flex items-center gap-4">
                <DateTile iso={nextEvent.startsAt} className="ring-0" />
                <ul className="space-y-1.5 text-sm text-white/85">
                  <li className="flex items-center gap-2"><CalendarDays aria-hidden className="size-4 text-squab-300" />{eventDayLabel(nextEvent)}</li>
                  <li className="flex items-center gap-2"><Clock aria-hidden className="size-4 text-squab-300" />{eventTimes(nextEvent)}</li>
                  <li className="flex items-center gap-2"><MapPin aria-hidden className="size-4 text-squab-300" />{nextEvent.venue}</li>
                </ul>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/events/${nextEvent.slug}`} variant="onDark" size="lg">
                  {nextEvent.registrationUrl ? "Details & registration" : "Event details"} <ArrowRight aria-hidden />
                </ButtonLink>
                <ButtonLink href="/events" variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  All events
                </ButtonLink>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Community CTA */}
      <Section aria-labelledby="join-heading" className="pt-0 sm:pt-0">
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-squab-500 px-7 py-12 text-ink sm:px-12 sm:py-16">
          <div aria-hidden className="absolute -bottom-24 -right-16 size-80 rounded-full bg-squab-300/70 blur-2xl" />
          <div className="relative max-w-2xl">
            <h2 id="join-heading" className="text-headline font-extrabold">{settings.community.headline}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">{settings.community.body}</p>
            <ButtonLink href={settings.community.cta.href} variant="dark" size="lg" className="mt-8">
              {settings.community.cta.label} <ArrowRight aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
