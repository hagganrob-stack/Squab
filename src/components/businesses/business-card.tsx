import Link from "next/link";
import { MapPin, Tag } from "lucide-react";
import { SampleBadge } from "@/components/ui/badge";
import { Logo, Media } from "@/components/ui/media";
import { cn } from "@/lib/utils";
import type { BusinessWithOffers } from "@/lib/data";

export function BusinessCard({ business, className }: { business: BusinessWithOffers; className?: string }) {
  const dark = business.logoBackground === "dark";
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-line/70 transition-shadow hover:shadow-lift",
        className,
      )}
    >
      <div className="relative">
        <Media src={business.coverImageUrl} alt="" ratio="16/9" rounded={false} fallbackLogo={business.logoUrl} fallbackLogoDark={dark} label="Cover photo" />
        {business.isDemo && <SampleBadge className="absolute right-3 top-3" />}
      </div>
      <div className="relative flex flex-1 flex-col px-5 pb-5">
        <Logo src={business.logoUrl} name={business.name} size={56} dark={dark} className="-mt-7 ring-4 ring-white" />
        <h3 className="mt-3 text-lg font-bold">
          <Link href={`/businesses/${business.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {business.name}
          </Link>
        </h3>
        {business.kind && <p className="text-xs font-bold uppercase tracking-[0.1em] text-squab-700">{business.kind}</p>}
        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-stone-muted">{business.tagline}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-xs text-stone-muted">
          {business.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden className="size-3.5" /> {business.location}
            </span>
          )}
          {business.offerCount > 0 && (
            <span className="inline-flex items-center gap-1 font-semibold text-squab-700">
              <Tag aria-hidden className="size-3.5" /> {business.offerCount} {business.offerCount === 1 ? "perk" : "perks"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
