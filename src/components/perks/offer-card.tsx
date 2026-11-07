import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { RewardLabel, SampleBadge } from "@/components/ui/badge";
import { Logo, Media } from "@/components/ui/media";
import { cn, formatShortDate } from "@/lib/utils";
import type { OfferWithBusiness } from "@/types/content";

export function OfferCard({ offer, className, priority }: { offer: OfferWithBusiness; className?: string; priority?: boolean }) {
  const { business } = offer;
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-line/70 transition-shadow duration-200 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative">
        <Media
          src={offer.imageUrl ?? business.coverImageUrl}
          alt=""
          ratio="16/9"
          rounded={false}
          priority={priority}
          fallbackLogo={business.logoUrl}
          fallbackLogoDark={business.logoBackground === "dark"}
          label={business.name}
        />
        <RewardLabel className="absolute left-3 top-3">{offer.rewardLabel}</RewardLabel>
        {offer.isDemo && <SampleBadge className="absolute right-3 top-3" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2.5">
          <Logo src={business.logoUrl} name={business.name} size={36} dark={business.logoBackground === "dark"} className="rounded-lg" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">{business.name}</p>
            {business.kind && <p className="truncate text-xs text-stone-muted">{business.kind}</p>}
          </div>
        </div>
        <h3 className="text-xl font-bold leading-snug">
          <Link href={`/perks/${offer.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {offer.title}
          </Link>
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {offer.expiryDate && (
            <span className="inline-flex items-center gap-1 text-xs text-stone-muted">
              <CalendarClock aria-hidden className="size-3.5" />
              Ends {formatShortDate(offer.expiryDate)}
            </span>
          )}
          <span aria-hidden className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-squab-700">
            View offer <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
