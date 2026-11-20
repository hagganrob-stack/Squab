import Link from "next/link";
import { CategoryChip, SampleBadge } from "@/components/ui/badge";
import { Media, type MediaRatio } from "@/components/ui/media";
import { cn, formatDate } from "@/lib/utils";
import type { StoryWithCategory } from "@/types/content";

export function StoryMeta({ story, className }: { story: StoryWithCategory; className?: string }) {
  return (
    <p className={cn("text-sm text-stone-muted", className)}>
      <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
      <span aria-hidden> · </span>
      {story.readingMinutes} min read
    </p>
  );
}

export function StoryCard({
  story,
  ratio = "3/2",
  size = "md",
  className,
}: {
  story: StoryWithCategory;
  ratio?: MediaRatio;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative overflow-hidden rounded-[var(--radius-card)]">
        <Media
          src={story.heroImageUrl}
          alt={story.heroImageAlt}
          ratio={ratio}
          tone={story.category.tone}
          className="transition-transform duration-500 group-hover:scale-[1.015]"
        />
        {story.isDemo && <SampleBadge className="absolute right-3 top-3" />}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <CategoryChip tone={story.category.tone}>{story.category.name}</CategoryChip>
      </div>
      <h3
        className={cn(
          "mt-3 font-extrabold leading-tight decoration-squab-500 decoration-2 underline-offset-4 group-hover:underline",
          size === "lg" ? "text-3xl sm:text-4xl" : size === "md" ? "text-xl sm:text-2xl" : "text-lg",
        )}
      >
        <Link href={`/news/${story.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {story.title}
        </Link>
      </h3>
      {size !== "sm" && <p className="mt-2 line-clamp-3 leading-relaxed text-stone-muted">{story.standfirst}</p>}
      <StoryMeta story={story} className="mt-3" />
    </article>
  );
}

/** Large image-led card for the lead story: the photo zooms and the text slides up on hover. */
export function FeatureStoryCard({ story, className }: { story: StoryWithCategory; className?: string }) {
  return (
    <article className={cn("group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white sm:min-h-[32rem]", className)}>
      <Media
        src={story.heroImageUrl}
        alt={story.heroImageAlt}
        ratio="16/9"
        tone={story.category.tone}
        rounded={false}
        priority
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="absolute! inset-0 -z-20 h-full! transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/0 transition-opacity duration-500 group-hover:from-black/95" />
      {story.isDemo && <SampleBadge className="absolute right-4 top-4" />}
      <div className="p-6 transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:p-9">
        <CategoryChip tone={story.category.tone}>{story.category.name}</CategoryChip>
        <h3 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          <Link href={`/news/${story.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {story.title}
          </Link>
        </h3>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
          <p className="overflow-hidden text-white/85">
            <span className="mt-3 line-clamp-2 block max-w-xl leading-relaxed">{story.standfirst}</span>
          </p>
        </div>
        <StoryMeta story={story} className="mt-3 text-white/70" />
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-squab-300 transition-[gap] duration-300 group-hover:gap-3">
          Read the story <span aria-hidden>→</span>
        </span>
      </div>
    </article>
  );
}
