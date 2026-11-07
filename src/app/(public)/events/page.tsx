import type { Metadata } from "next";
import { EventCard } from "@/components/events/event-card";
import { EmptyState, PageIntro, Section, SectionHeader } from "@/components/ui/section";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events & networking",
  description: "Networking evenings, breakfasts and community events across Squab.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();
  return (
    <>
      <PageIntro
        eyebrow="Events & networking"
        title="Meet the people around you."
        description="Relaxed networking evenings, breakfasts and community events — open to every business and customer in the Squab community."
      />
      <Section aria-labelledby="upcoming">
        <SectionHeader id="upcoming" title="Upcoming events" />
        {upcoming.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <EmptyState title="No events scheduled right now" body="New events are announced here and in News & Stories — check back soon." />
        )}
      </Section>
      {past.length > 0 && (
        <Section aria-labelledby="past" className="border-t border-line bg-white">
          <SectionHeader id="past" title="Past events" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => <EventCard key={e.id} event={e} past />)}
          </div>
        </Section>
      )}
    </>
  );
}
