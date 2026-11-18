import { getBusinesses, getEvents, getFeaturedOffers, getOffers, getStories } from "@/lib/data";
import { hide } from "@/lib/content/the-hide";
import { rewardParts } from "@/lib/perks";
import { dateParts, eventDayLabel, eventTimes, formatDate } from "@/lib/utils";

/** Plain, serialisable content for the desktop mega menu panels. */
export interface MegaMenuData {
  perks: { slug: string; title: string; value: string; caption: string; business: string; logoUrl?: string; logoDark: boolean }[];
  businesses: { slug: string; name: string; kind: string; logoUrl?: string; logoDark: boolean }[];
  businessCount: number;
  stories: { slug: string; title: string; image?: string; alt: string; category: string; date: string }[];
  events: { slug: string; title: string; day: string; month: string; when: string; venue: string }[];
  hideHours: { when: string; time: string }[];
  hidePerk?: { slug: string; title: string; value: string; caption: string };
}

export async function getMegaMenuData(): Promise<MegaMenuData> {
  const [offers, allOffers, businesses, stories, events] = await Promise.all([
    getFeaturedOffers(4),
    getOffers(),
    getBusinesses(),
    getStories(),
    getEvents(),
  ]);
  const profiled = businesses.filter((b) => !b.listingOnly);
  const hideOffer = allOffers.find((o) => o.business.slug === "the-hide-cafe");

  return {
    perks: offers.map((o) => {
      const { value, caption } = rewardParts(o.rewardLabel);
      return {
        slug: o.slug,
        title: o.title,
        value,
        caption,
        business: o.business.name,
        logoUrl: o.business.logoUrl,
        logoDark: o.business.logoBackground === "dark",
      };
    }),
    businesses: [...profiled]
      .sort((a, b) => Number(b.featured) - Number(a.featured))
      .slice(0, 6)
      .map((b) => ({ slug: b.slug, name: b.name, kind: b.kind, logoUrl: b.logoUrl, logoDark: b.logoBackground === "dark" })),
    businessCount: businesses.length,
    stories: stories.slice(0, 3).map((s) => ({
      slug: s.slug,
      title: s.title,
      image: s.heroImageUrl,
      alt: s.heroImageAlt,
      category: s.category.name,
      date: formatDate(s.publishedAt),
    })),
    events: events.upcoming.slice(0, 3).map((e) => {
      const { day, month } = dateParts(e.startsAt);
      return { slug: e.slug, title: e.title, day, month, when: `${eventDayLabel(e)} · ${eventTimes(e)}`, venue: e.venue };
    }),
    hideHours: hide.hours,
    hidePerk: hideOffer && { slug: hideOffer.slug, title: hideOffer.title, ...rewardParts(hideOffer.rewardLabel) },
  };
}
