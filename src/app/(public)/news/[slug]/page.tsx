import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { RichText } from "@/components/stories/rich-text";
import { StoryCard, StoryMeta } from "@/components/stories/story-card";
import { OfferCard } from "@/components/perks/offer-card";
import { BackLink } from "@/components/shared/breadcrumb";
import { JsonLd } from "@/components/shared/json-ld";
import { CategoryChip, SampleBadge } from "@/components/ui/badge";
import { Logo, Media } from "@/components/ui/media";
import { Section, SectionHeader } from "@/components/ui/section";
import { getBusinessById, getOffersForBusiness, getRelatedStories, getStories, getStoryBySlug } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story not found", robots: { index: false } };
  return {
    title: story.title,
    description: story.standfirst,
    alternates: { canonical: `/news/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.standfirst,
      publishedTime: story.publishedAt,
      authors: [story.authorName],
      images: story.heroImageUrl ? [story.heroImageUrl] : undefined,
    },
  };
}

export default async function StoryPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();
  const business = story.relatedBusinessId ? await getBusinessById(story.relatedBusinessId) : null;
  const [related, businessOffers] = await Promise.all([
    getRelatedStories(story),
    business ? getOffersForBusiness(business.id) : Promise.resolve([]),
  ]);
  const spotlight = story.format === "spotlight";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: story.title,
          description: story.standfirst,
          datePublished: story.publishedAt,
          author: { "@type": "Organization", name: story.authorName },
          publisher: { "@type": "Organization", name: "Squab Connect" },
          mainEntityOfPage: siteUrl(`/news/${story.slug}`),
          ...(story.heroImageUrl ? { image: [story.heroImageUrl] } : {}),
        }}
      />
      <article>
        <header className="container-page max-w-4xl pt-6 text-center">
          <div className="text-left"><BackLink href="/news" label="News & Stories" /></div>
          <div className="mt-8 flex items-center justify-center gap-2">
            <CategoryChip tone={story.category.tone}>{story.category.name}</CategoryChip>
            {story.isDemo && <SampleBadge />}
          </div>
          <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(2.1rem,1.4rem+3vw,3.6rem)] font-extrabold leading-[1.05]">{story.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-stone-muted">{story.standfirst}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-1 text-sm sm:flex-row sm:gap-2">
            <span className="font-semibold text-ink">{story.authorName}</span>
            <span aria-hidden className="hidden text-stone-muted sm:inline">·</span>
            <StoryMeta story={story} />
          </div>
        </header>
        <div className="container-page mt-10 max-w-6xl">
          <Media src={story.heroImageUrl} alt={story.heroImageAlt} ratio="16/9" tone={story.category.tone} priority sizes="(min-width: 1152px) 1152px, 100vw" label="Hero photo" className="rounded-[var(--radius-panel)]" />
        </div>

        <div className="container-page mt-4 max-w-[44rem] pb-10">
          <RichText doc={story.body} />
        </div>
      </article>

      {business && (
        <aside aria-labelledby="business-panel" className="container-page max-w-[44rem] pb-16">
          <div className="rounded-[var(--radius-panel)] bg-white p-6 ring-1 ring-line sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-squab-700">{spotlight ? "In the spotlight" : "Mentioned in this story"}</p>
            <div className="mt-4 flex items-center gap-4">
              <Logo src={business.logoUrl} name={business.name} size={60} />
              <div>
                <h2 id="business-panel" className="text-2xl font-extrabold">{business.name}</h2>
                <p className="text-stone-muted">{business.tagline}</p>
              </div>
            </div>
            <Link href={`/businesses/${business.slug}`} className="mt-5 inline-flex items-center gap-1 font-semibold text-squab-700 hover:underline">
              View their Squab profile <ArrowRight aria-hidden className="size-4" />
            </Link>
            {businessOffers.length > 0 && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {businessOffers.slice(0, 2).map((o) => <OfferCard key={o.id} offer={o} />)}
              </div>
            )}
          </div>
        </aside>
      )}

      {related.length > 0 && (
        <Section aria-labelledby="more-stories" className="border-t border-line bg-white">
          <SectionHeader id="more-stories" title="More news & stories" action={{ label: "All news & stories", href: "/news" }} />
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => <StoryCard key={s.id} story={s} size="sm" />)}
          </div>
        </Section>
      )}
    </>
  );
}
