import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { SampleBadge } from "@/components/ui/badge";
import { Media } from "@/components/ui/media";
import { cn, dateParts, eventTimes, formatWeekday } from "@/lib/utils";
import type { CommunityEvent } from "@/types/content";

export function DateTile({ iso, className }: { iso: string; className?: string }) {
  const { day, month } = dateParts(iso);
  return (
    <div
      className={cn(
        "flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white text-ink shadow-card ring-1 ring-line",
        className,
      )}
    >
      <span className="text-[0.7rem] font-bold uppercase tracking-widest text-squab-700">{month}</span>
      <span className="font-display text-2xl font-extrabold leading-none">{day}</span>
    </div>
  );
}

export function EventCard({ event, past = false, className }: { event: CommunityEvent; past?: boolean; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-line/70 transition-shadow hover:shadow-lift",
        past && "opacity-80",
        className,
      )}
    >
      <div className="relative">
        <Media src={event.imageUrl} alt="" ratio="16/9" tone="rose" rounded={false} label="Event photo" />
        <DateTile iso={event.startsAt} className="absolute bottom-3 left-3" />
        {event.isDemo && <SampleBadge className="absolute right-3 top-3" />}
        {event.fullyBooked && !past && (
          <span className="absolute right-3 bottom-3 rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">Fully booked</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-muted">{formatWeekday(event.startsAt)}</p>
        <h3 className="mt-1 text-xl font-bold leading-snug">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-stone-muted">{event.summary}</p>
        <ul className="mt-auto space-y-1.5 pt-4 text-sm text-ink-soft">
          <li className="flex items-center gap-2">
            <Clock aria-hidden className="size-4 text-stone-muted" /> {eventTimes(event)}
          </li>
          <li className="flex items-center gap-2">
            <MapPin aria-hidden className="size-4 text-stone-muted" /> {event.venue}
          </li>
        </ul>
      </div>
    </article>
  );
}
