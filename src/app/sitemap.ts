import type { MetadataRoute } from "next";
import { getBusinesses, getEvents, getOffers, getStories } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [offers, businesses, stories, events] = await Promise.all([getOffers(), getBusinesses(), getStories(), getEvents()]);
  const statics = ["", "/perks", "/businesses", "/news", "/events", "/about"].map((p) => ({ url: siteUrl(p) }));
  return [
    ...statics,
    // Only live (non-expired) offers are listed; expired offers return 404 and drop out of the index.
    ...offers.map((o) => ({ url: siteUrl(`/perks/${o.slug}`) })),
    ...businesses.map((b) => ({ url: siteUrl(`/businesses/${b.slug}`) })),
    ...stories.map((s) => ({ url: siteUrl(`/news/${s.slug}`), lastModified: s.publishedAt })),
    ...[...events.upcoming, ...events.past].map((e) => ({ url: siteUrl(`/events/${e.slug}`) })),
  ];
}
