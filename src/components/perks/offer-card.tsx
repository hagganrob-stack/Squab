import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { SampleBadge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/media";
import { maskCode, rewardParts } from "@/lib/perks";
import { cn, formatShortDate } from "@/lib/utils";
import type { OfferWithBusiness } from "@/types/content";

/**
 * Voucher-style offer card: an orange stub with the headline benefit, a
 * perforated tear line, and the offer details with a teaser of the code.
 * `notchClassName` must match the background the card sits on, so the
 * notches read as cut-outs.
 */
export function OfferCard({
  offer,
  className,
  notchClassName = "bg-paper",
}: {
  offer: OfferWithBusiness;
  className?: string;
  priority?: boolean;
  notchClassName?: string;
}) {
  const { business } = offer;
  const { value, caption } = rewardParts(offer.rewardLabel);
  const long = value.length > 4;

  return (
    <article
      className={cn(
        "group relative flex min-h-48 min-w-0 rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-line/70 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lift",
        className,
      )}
    >
      {/* Stub */}
      <div className="relative flex w-[7.5rem] shrink-0 flex-col items-center justify-center overflow-hidden rounded-l-[var(--radius-card)] bg-squab-500 px-3 text-center text-ink sm:w-40">
        <span aria-hidden className="absolute -right-8 -top-8 size-20 rounded-full bg-white/20" />
        <span aria-hidden className="absolute -bottom-10 -left-6 size-20 rounded-full bg-squab-600/25" />
        <span className={cn("relative font-display font-extrabold leading-none tracking-tight", long ? "text-3xl sm:text-4xl" : "text-[2.6rem] sm:text-5xl")}>
          {value}
        </span>
        {caption && (
          <span className="relative mt-1.5 text-xs font-extrabold uppercase leading-tight tracking-wider sm:text-sm">{caption}</span>
        )}
      </div>

      {/* Perforation */}
      <div aria-hidden className="relative w-0">
        <span className={cn("absolute -top-3 left-0 size-6 -translate-x-1/2 rounded-full ring-1 ring-inset ring-line/70 [clip-path:inset(50%_0_0_0)]", notchClassName)} />
        <span className={cn("absolute -bottom-3 left-0 size-6 -translate-x-1/2 rounded-full ring-1 ring-inset ring-line/70 [clip-path:inset(0_0_50%_0)]", notchClassName)} />
        <span className="absolute inset-y-4 left-0 border-l-2 border-dashed border-line" />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col p-4 pl-5 sm:p-6 sm:pl-7">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
          <Logo src={business.logoUrl} name={business.name} size={44} width={business.logoUrl ? 88 : undefined} dark={business.logoBackground === "dark"} className="rounded-lg" />
          <div className="min-w-[8.5rem] flex-1">
            <p className="truncate text-sm font-bold text-ink">{business.name}</p>
            {business.kind && <p className="truncate text-xs text-stone-muted">{business.kind}</p>}
          </div>
          {offer.isDemo && <SampleBadge className="ml-auto" />}
        </div>
        <h3 className="mt-4 text-lg font-bold leading-snug sm:text-xl">
          <Link href={`/perks/${offer.slug}`} className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] focus-visible:outline-none">
            {offer.title}
          </Link>
        </h3>
        {offer.expiryDate && (
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-stone-muted">
            <CalendarClock aria-hidden className="size-3.5" /> Ends {formatShortDate(offer.expiryDate)}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
          {offer.redemptionCode ? (
            <span className="rounded-md border border-dashed border-squab-600/60 bg-squab-50 px-2 py-1 font-mono text-xs font-bold tracking-[0.18em] text-squab-800">
              {maskCode(offer.redemptionCode)}
            </span>
          ) : (
            <span className="text-xs font-semibold text-stone-muted">Squab exclusive</span>
          )}
          <span aria-hidden className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white transition-colors group-hover:bg-squab-500 group-hover:text-ink">
            {offer.redemptionCode ? "Get code" : "View offer"} <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
