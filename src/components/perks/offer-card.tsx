import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { CategoryChip, RewardLabel, SampleBadge } from "@/components/ui/badge";
import { Logo, Media } from "@/components/ui/media";
import { cn, formatShortDate } from "@/lib/utils";
import type { OfferWithBusiness } from "@/types/content";

export function OfferCard({ offer, className, priority }: { offer: OfferWithBusiness; className?: string; priority?: boolean }) {
  const primary = offer.categories[0];
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-line/70 transition-shadow duration-200 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative">
        <Media
          src={offer.imageUrl}
          alt=""
          ratio="4/3"
          tone={primary?.tone}
          rounded={false}
          priority={priority}
          label={`${offer.business.name}`}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <RewardLabel>{offer.rewardLabel}</RewardLabel>
        </div>
        {offer.isDemo && <SampleBadge className="absolute right-3 top-3" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2.5">
          <Logo src={offer.business.logoUrl} name={offer.business.name} size={32} className="rounded-lg" />
          <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-stone-muted">{offer.business.name}</p>
        </div>
        <h3 className="text-xl font-bold leading-snug">
          <Link href={`/perks/${offer.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {offer.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-stone-muted">{offer.shortDescription}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {primary && <CategoryChip tone={primary.tone}>{primary.name}</CategoryChip>}
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
