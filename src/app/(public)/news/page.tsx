import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StoryCard, StoryMeta } from "@/components/stories/story-card";
import { EventCard } from "@/components/events/event-card";
import { CategoryChip, SampleBadge } from "@/components/ui/badge";
import { Media } from "@/components/ui/media";
import { EmptyState, Section, SectionHeader } from "@/components/ui/section";
import { getEvents, getStories } from "@/lib/data";

export const metadata: Metadata = {
  title: "News — what's happening across Squab",
  description: "Squab news, business spotlights and upcoming events from across the Squab community.",
  alternates: { canonical: "/news" },
};

export default async function StoriesPage() {
  const [stories, events] = await Promise.all([getStories(), getEvents()]);
  const lead = stories.find((s) => s.featured) ?? stories[0];
  const rest = stories.filter((s) => s.id !== lead?.id);

  if (!lead) {
    return (
      <Section>
        <EmptyState title="News is on its way" body="The first news and stories are being written. Check back shortly." />
      </Section>
    );
  }

  return (
    <>
      <header className="container-page pb-4 pt-12 sm:pt-16">
        <span aria-hidden className="mb-4 block h-1 w-10 rounded-full bg-squab-500" />
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-squab-700">Squab News</p>
        <h1 className="mt-3 max-w-4xl text-display font-extrabold">What’s happening across Squab.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-muted">
          Squab news, business spotlights and upcoming events from across the Squab community.
        </p>
      </header>

      {/* Lead story */}
      <section aria-label="Featured story" className="container-page pt-8">
        <article className="group relative grid overflow-hidden rounded-[var(--radius-panel)] bg-black text-white lg:grid-cols-[1.35fr_1fr]">
          <div className="relative">
            <Media src={lead.heroImageUrl} alt={lead.heroImageAlt} ratio="3/2" tone={lead.category.tone} rounded={false} priority sizes="(min-width: 1024px) 60vw, 100vw" className="h-full lg:aspect-auto! lg:min-h-[28rem]" label="Lead story photo" />
            {lead.isDemo && <SampleBadge className="absolute right-4 top-4" />}
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <CategoryChip tone={lead.category.tone} className="self-start">{lead.category.name}</CategoryChip>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-[2.6rem]">
              <Link href={`/news/${lead.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">{lead.title}</Link>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{lead.standfirst}</p>
            <StoryMeta story={lead} className="mt-5 text-white/60" />
            <span aria-hidden className="mt-7 inline-flex items-center gap-1.5 font-semibold text-squab-300">
              Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </article>
      </section>

      {rest.length > 0 && (
      <Section aria-labelledby="latest">
        <SectionHeader id="latest" title="Latest news" />
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 6).map((s) => <StoryCard key={s.id} story={s} />)}
        </div>
      </Section>
      )}

      {events.upcoming.length > 0 && (
        <Section aria-labelledby="happening" className="border-t border-line bg-white">
          <SectionHeader id="happening" eyebrow="What's happening" title="Coming up at Squab" action={{ label: "All events", href: "/events" }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.upcoming.slice(0, 3).map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </Section>
      )}

    </>
  );
}
