import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type {
  Business,
  CommunityEvent,
  OfferWithBusiness,
  StoryWithCategory,
} from "@/types/content";
import { readingMinutes } from "@/lib/rich-text";
import {
  loadBusinesses,
  loadCategories,
  loadEvents,
  loadHomepageSettings,
  loadOffers,
  loadStories,
} from "./source";

export { loadHomepageSettings as getHomepageSettings };

/* ---------- Offers ---------- */

export async function getOffers(): Promise<OfferWithBusiness[]> {
  const [offers, businesses] = await Promise.all([loadOffers(), loadBusinesses()]);
  const byId = new Map(businesses.map((b) => [b.id, b]));
  return offers.flatMap((o) => {
    const b = byId.get(o.businessId);
    if (!b) return []; // business suspended/unpublished: hide its offers
    const { id, name, slug, kind, logoUrl, logoBackground, coverImageUrl, location, website } = b;
    return [{ ...o, business: { id, name, slug, kind, logoUrl, logoBackground, coverImageUrl, location, website } }];
  });
}

export async function getFeaturedOffers(limit = 6) {
  const all = await getOffers();
  const featured = all.filter((o) => o.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getOfferBySlug(slug: string) {
  return (await getOffers()).find((o) => o.slug === slug) ?? null;
}

export async function getOffersForBusiness(businessId: string) {
  return (await getOffers()).filter((o) => o.businessId === businessId);
}

export async function getOtherOffers(offer: OfferWithBusiness, limit = 3) {
  return (await getOffers()).filter((o) => o.id !== offer.id).slice(0, limit);
}

/* ---------- Businesses ---------- */

export type BusinessWithOffers = Business & { offerCount: number };

export async function getBusinesses(): Promise<BusinessWithOffers[]> {
  const [businesses, offers] = await Promise.all([loadBusinesses(), loadOffers()]);
  return businesses.map((b) => ({
    ...b,
    offerCount: offers.filter((o) => o.businessId === b.id).length,
  }));
}

export async function getBusinessBySlug(slug: string) {
  return (await getBusinesses()).find((b) => b.slug === slug) ?? null;
}

export async function getBusinessById(id: string) {
  return (await getBusinesses()).find((b) => b.id === id) ?? null;
}

export async function getOtherBusinesses(business: Business, limit = 3) {
  return (await getBusinesses()).filter((b) => b.id !== business.id).slice(0, limit);
}

/* ---------- Stories ---------- */

export async function getStories(): Promise<StoryWithCategory[]> {
  const [stories, categories] = await Promise.all([loadStories(), loadCategories()]);
  const catById = new Map(categories.map((c) => [c.id, c]));
  return stories.flatMap((s) => {
    const category = catById.get(s.categoryId);
    if (!category) return [];
    return [{ ...s, category, readingMinutes: readingMinutes(s.body) }];
  });
}

export async function getStoryBySlug(slug: string) {
  return (await getStories()).find((s) => s.slug === slug) ?? null;
}

export async function getRelatedStories(story: StoryWithCategory, limit = 3) {
  const all = (await getStories()).filter((s) => s.id !== story.id);
  const same = all.filter((s) => s.categoryId === story.categoryId);
  return [...same, ...all.filter((s) => s.categoryId !== story.categoryId)].slice(0, limit);
}

/* ---------- Events ---------- */

export async function getEvents(): Promise<{ upcoming: CommunityEvent[]; past: CommunityEvent[] }> {
  "use cache";
  cacheLife("hours");
  cacheTag("events");
  const all = await loadEvents();
  const now = new Date().toISOString();
  return {
    upcoming: all.filter((e) => e.endsAt >= now),
    past: all.filter((e) => e.endsAt < now).reverse(),
  };
}

export async function getEventBySlug(slug: string) {
  return (await loadEvents()).find((e) => e.slug === slug) ?? null;
}
