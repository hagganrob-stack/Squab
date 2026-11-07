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
