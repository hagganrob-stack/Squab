import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Check, Clock, ExternalLink, Mail, MapPin, Users } from "lucide-react";
import { BusinessCard } from "@/components/businesses/business-card";
import { BackLink } from "@/components/shared/breadcrumb";
import { JsonLd } from "@/components/shared/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { SampleBadge } from "@/components/ui/badge";
import { Media } from "@/components/ui/media";
import { Section, SectionHeader } from "@/components/ui/section";
import { getBusinesses, getEventBySlug, getEvents } from "@/lib/data";
import { eventTimes, formatDate, formatWeekday, isMultiDay } from "@/lib/utils";

export async function generateStaticParams() {
  const { upcoming, past } = await getEvents();
  return [...upcoming, ...past].map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found", robots: { index: false } };
  return {
    title: `${event.title} — ${formatDate(event.startsAt)}`,
    description: event.summary,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: { title: event.title, description: event.summary, images: event.imageUrl ? [event.imageUrl] : undefined },
  };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const [event, events, businesses] = await Promise.all([getEventBySlug(slug), getEvents(), getBusinesses()]);
  if (!event) notFound();
  const isPast = events.past.some((e) => e.id === event.id);
  const related = businesses.filter((b) => event.relatedBusinessIds.includes(b.id));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.title,
          description: event.summary,
          startDate: event.startsAt,
          endDate: event.endsAt,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: { "@type": "Place", name: event.venue, address: event.address ?? event.venue },
          organizer: { "@type": "Organization", name: "Squab Connect" },
          ...(event.imageUrl ? { image: [event.imageUrl] } : {}),
        }}
      />
      <div className="container-page pt-6"><BackLink href="/events" label="All events" /></div>
      <article className="container-page grid gap-10 pb-16 pt-6 lg:grid-cols-[1fr_380px] lg:gap-14">
        <div>
          <div className="relative">
            <Media src={event.imageUrl} alt={event.title} ratio="16/9" tone="rose" priority sizes="(min-width: 1024px) 60vw, 100vw" label="Event photo" className="rounded-[var(--radius-panel)]" />
            {event.isDemo && <SampleBadge className="absolute right-4 top-4" />}
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-squab-700">{isPast ? "Past event" : "Upcoming event"}</p>
          <h1 className="mt-3 text-headline font-extrabold sm:text-5xl">{event.title}</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
            {event.description.map((para) => <p key={para}>{para}</p>)}
          </div>
          {event.expect.length > 0 && (
            <section className="mt-10" aria-labelledby="expect">
              <h2 id="expect" className="text-2xl font-extrabold">What to expect</h2>
              <ul className="mt-4 space-y-3">
                {event.expect.map((x) => (
                  <li key={x} className="flex items-start gap-3"><Check aria-hidden className="mt-1 size-4 shrink-0 text-squab-700" /><span className="text-lg">{x}</span></li>
                ))}
              </ul>
            </section>
          )}
          {event.schedule && event.schedule.length > 0 && (
            <section className="mt-10" aria-labelledby="opening-times">
              <h2 id="opening-times" className="text-2xl font-extrabold">Opening times</h2>
              <dl className="mt-4 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-line">
                {event.schedule.map((d) => (
                  <div key={d.day} className="grid gap-1 px-5 py-3 sm:grid-cols-[10rem_7rem_1fr] sm:items-baseline">
                    <dt className="font-semibold">{d.day}</dt>
                    <dd className="font-semibold text-squab-700">{d.time}</dd>
                    {d.note ? <dd className="text-sm text-stone-muted">{d.note}</dd> : <dd className="hidden sm:block" />}
                  </div>
                ))}
              </dl>
            </section>
          )}
          {event.whoShouldAttend && (
            <section className="mt-10 rounded-[var(--radius-card)] bg-squab-50 p-6" aria-labelledby="who">
              <h2 id="who" className="text-lg font-extrabold text-squab-800">Who should attend</h2>
              <p className="mt-2 text-lg text-ink">{event.whoShouldAttend}</p>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-panel)] bg-white p-6 shadow-lift ring-1 ring-line">
            <ul className="space-y-4">
              <li className="flex gap-3"><CalendarDays aria-hidden className="mt-0.5 size-5 text-squab-700" />{isMultiDay(event) ? (<span><span className="block font-semibold">{formatWeekday(event.startsAt)} {formatDate(event.startsAt).replace(/ \d{4}$/, "")} –</span>{formatWeekday(event.endsAt)} {formatDate(event.endsAt)}</span>) : (<span><span className="block font-semibold">{formatWeekday(event.startsAt)}</span>{formatDate(event.startsAt)}</span>)}</li>
              <li className="flex gap-3"><Clock aria-hidden className="mt-0.5 size-5 text-squab-700" /><span>{eventTimes(event)}</span></li>
              <li className="flex gap-3"><MapPin aria-hidden className="mt-0.5 size-5 text-squab-700" /><span><span className="block font-semibold">{event.venue}</span>{event.address}</span></li>
              {event.capacity && <li className="flex gap-3"><Users aria-hidden className="mt-0.5 size-5 text-squab-700" /><span>{event.capacity} places</span></li>}
            </ul>
            <div className="mt-6 space-y-3">
              {isPast ? (
                <p className="rounded-xl bg-mist p-4 text-center text-sm font-semibold text-stone-muted">This event has finished.</p>
              ) : event.fullyBooked ? (
                <p className="rounded-xl bg-ink p-4 text-center text-sm font-bold text-white">Fully booked</p>
              ) : (
                event.registrationUrl && (
                  <ButtonLink href={event.registrationUrl} external size="lg" className="w-full">
                    {event.registrationLabel ?? "Register to attend"} <ExternalLink aria-hidden />
                  </ButtonLink>
                )
              )}
              {event.contactEmail && (
                <ButtonLink href={`mailto:${event.contactEmail}`} variant="secondary" size="lg" className="w-full">
                  <Mail aria-hidden /> Ask a question
                </ButtonLink>
              )}
            </div>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <Section aria-labelledby="who-attending" className="border-t border-line bg-white">
          <SectionHeader id="who-attending" title="Businesses involved" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b) => <BusinessCard key={b.id} business={b} />)}
          </div>
        </Section>
      )}
    </>
  );
}
