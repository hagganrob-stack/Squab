import { ArrowUpRight, Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn, initials } from "@/lib/utils";
import { getGoogleReviews, googleReviewUrl, type GoogleReview } from "@/lib/google-reviews";
import { manualGoogleReviews } from "@/lib/content/google-reviews";

/** Google's four-colour "G" mark, used to attribute reviews to Google. */
export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} aria-hidden className={cn("size-4", n <= Math.round(rating) ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-line text-line")} />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <figure className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <GoogleG className="size-5 shrink-0" />
      </div>
      <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
        <p className="line-clamp-6">{review.text}</p>
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {review.authorPhoto ? (
          // Google-hosted avatar; shown as supplied by the Places API.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={review.authorPhoto} alt="" width={36} height={36} referrerPolicy="no-referrer" className="size-9 rounded-full object-cover" loading="lazy" />
        ) : (
          <span aria-hidden className="grid size-9 place-items-center rounded-full bg-mist text-xs font-bold text-stone-muted">{initials(review.author)}</span>
        )}
        <span className="min-w-0 text-sm">
          {review.authorUrl ? (
            <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="block truncate font-bold hover:underline">{review.author}</a>
          ) : (
            <span className="block truncate font-bold">{review.author}</span>
          )}
          {review.when && <span className="text-stone-muted">{review.when}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export async function GoogleReviews() {
  const live = await getGoogleReviews();
  const data = live?.reviews.length ? live : manualGoogleReviews.reviews.length ? manualGoogleReviews : live;
  const reviews = data?.reviews.slice(0, 4) ?? [];
  const writeUrl = googleReviewUrl();
  const hasReviews = reviews.length > 0;

  const cta = (
    <div className={cn("flex flex-col justify-between rounded-[var(--radius-card)] bg-ink p-7 text-white sm:p-8", !hasReviews && "sm:flex-row sm:items-center sm:gap-8")}>
      <div>
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-white"><GoogleG className="size-7" /></span>
          {data?.rating ? (
            <span>
              <span className="flex items-center gap-2 font-display text-2xl font-extrabold">
                {data.rating.toFixed(1)} <Stars rating={data.rating} />
              </span>
              {data.total ? <span className="text-sm text-white/70">from {data.total} Google reviews</span> : null}
            </span>
          ) : (
            <span className="text-sm font-semibold text-white/80">Squab Workspace on Google</span>
          )}
        </div>
        <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight">Enjoyed working at Squab?</h3>
        <p className="mt-2 text-white/75">
          Leave us a quick Google review. It helps other local businesses find their perfect workspace, and it means a lot to the team.
        </p>
      </div>
      <div className={cn("mt-6 flex flex-col gap-3", !hasReviews && "sm:mt-0 sm:shrink-0")}>
        <a
          href={writeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-white px-5 font-bold text-ink transition-colors hover:bg-squab-50"
        >
          <GoogleG className="size-5" /> Leave a Google review
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        {data?.mapsUrl && (
          <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-white/80 hover:text-white">
            Read all reviews on Google <ArrowUpRight aria-hidden className="size-4" />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <Section aria-labelledby="reviews-heading" className="pt-0 sm:pt-0">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span aria-hidden className="mb-4 block h-1 w-10 rounded-full bg-squab-500" />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-squab-700">Reviews</p>
          <h2 id="reviews-heading" className="text-headline font-extrabold">
            {hasReviews ? "What people say about Squab Workspace" : "Tell us how we’re doing"}
          </h2>
        </div>
      </div>
      {hasReviews ? (
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <ReviewCard key={`${r.author}-${i}`} review={r} />
            ))}
          </div>
          {cta}
        </div>
      ) : (
        cta
      )}
      {hasReviews && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-stone-muted">
          <GoogleG className="size-3.5" /> Reviews from Google for Squab Workspace, Leamington Spa
        </p>
      )}
    </Section>
  );
}
