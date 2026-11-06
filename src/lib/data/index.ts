import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type {
  Business,
  Category,
  CategoryType,
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

/* ---------- Categories ---------- */

export async function getCategories(type: CategoryType): Promise<Category[]> {
  return (await loadCategories()).filter((c) => c.type === type);
}

/* ---------- Offers ---------- */

export async function getOffers(): Promise<OfferWithBusiness[]> {
  const [offers, businesses, categories] = await Promise.all([
    loadOffers(),
    loadBusinesses(),
    loadCategories(),
  ]);
  const byId = new Map(businesses.map((b) => [b.id, b]));
  const catById = new Map(categories.map((c) => [c.id, c]));
  return offers.flatMap((o) => {
    const b = byId.get(o.businessId);
    if (!b) return []; // business suspended/unpublished: hide its offers
    return [
      {
        ...o,
        business: { id: b.id, name: b.name, slug: b.slug, logoUrl: b.logoUrl, facility: b.facility },
        categories: o.categoryIds.map((id) => catById.get(id)).filter((c): c is Category => !!c),
      },
    ];
  });
}

export async function getFeaturedOffers(limit = 4) {
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

export async function getRelatedOffers(offer: OfferWithBusiness, limit = 3) {
  const all = await getOffers();
  const cats = new Set(offer.categoryIds);
  return all
    .filter((o) => o.id !== offer.id)
    .map((o) => ({ o, score: o.categoryIds.filter((c) => cats.has(c)).length }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.o);
}

/* ---------- Businesses ---------- */

export type BusinessWithCategories = Business & { categories: Category[]; offerCount: number };

export async function getBusinesses(): Promise<BusinessWithCategories[]> {
  const [businesses, categories, offers] = await Promise.all([
    loadBusinesses(),
    loadCategories(),
    loadOffers(),
  ]);
  const catById = new Map(categories.map((c) => [c.id, c]));
  return businesses.map((b) => ({
    ...b,
    categories: b.categoryIds.map((id) => catById.get(id)).filter((c): c is Category => !!c),
    offerCount: offers.filter((o) => o.businessId === b.id).length,
  }));
}

export async function getBusinessBySlug(slug: string) {
  return (await getBusinesses()).find((b) => b.slug === slug) ?? null;
}

export async function getBusinessById(id: string) {
  return (await getBusinesses()).find((b) => b.id === id) ?? null;
}

export async function getRelatedBusinesses(business: Business, limit = 3) {
  const all = await getBusinesses();
  const cats = new Set(business.categoryIds);
  return all
    .filter((b) => b.id !== business.id && b.categoryIds.some((c) => cats.has(c)))
    .slice(0, limit);
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
