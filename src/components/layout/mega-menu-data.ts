import { getEvents, getFeaturedOffers } from "@/lib/data";
import { rewardParts } from "@/lib/perks";
import { dateParts, eventDayLabel, eventTimes } from "@/lib/utils";

/** Plain, serialisable content for the desktop mega menu panels (Perks and Events). */
export interface MegaMenuData {
  perks: { slug: string; title: string; value: string; caption: string; business: string; logoUrl?: string; logoDark: boolean }[];
  events: { slug: string; title: string; day: string; month: string; when: string; venue: string }[];
}

export async function getMegaMenuData(): Promise<MegaMenuData> {
  const [offers, events] = await Promise.all([getFeaturedOffers(4), getEvents()]);
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
    events: events.upcoming.slice(0, 3).map((e) => {
      const { day, month } = dateParts(e.startsAt);
      return { slug: e.slug, title: e.title, day, month, when: `${eventDayLabel(e)} · ${eventTimes(e)}`, venue: e.venue };
    }),
  };
}
