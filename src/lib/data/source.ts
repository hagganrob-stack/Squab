import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { isSupabaseConfigured } from "@/lib/env";
import { getPublicClient } from "@/lib/supabase/public";
import * as demo from "@/lib/demo/data";
import type {
  Business,
  Category,
  CommunityEvent,
  HomepageSettings,
  Offer,
  Story,
} from "@/types/content";
import {
  mapBusiness,
  mapCategory,
  mapEvent,
  mapOffer,
  mapStory,
  type BusinessRow,
  type CategoryRow,
  type EventRow,
  type OfferRow,
  type StoryRow,
} from "./mappers";

/**
 * Raw loaders. Each is cached and tagged so admin mutations can invalidate
 * precisely (e.g. updateTag('offers') after an offer is approved).
 *
 * Public RLS policies already restrict anon reads to published/active
 * records; the filters below are belt-and-braces and also apply to the demo
 * fallback.
 */

export async function loadCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");
  if (!isSupabaseConfigured) return demo.categories;
  const { data, error } = await getPublicClient()
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw new Error(`Failed to load categories: ${error.message}`);
  return (data as CategoryRow[]).map(mapCategory);
}

export async function loadBusinesses(): Promise<Business[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("businesses");
  if (!isSupabaseConfigured) return demo.businesses.filter((b) => b.status === "active");
  const { data, error } = await getPublicClient()
    // Public view: active businesses only, private contact details masked.
    .from("business_directory")
    .select("*, business_categories(category_id)")
    .order("name");
  if (error) throw new Error(`Failed to load businesses: ${error.message}`);
  return (data as BusinessRow[]).map(mapBusiness);
}

export async function loadOffers(): Promise<Offer[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("offers");
  const today = new Date().toISOString().slice(0, 10);
  const isLive = (o: Offer) =>
    o.status === "published" &&
    (!o.startDate || o.startDate <= today) &&
    (!o.expiryDate || o.expiryDate >= today);

  const now = Date.now();
  const DAY = 86_400_000;
  const withFlags = (o: Offer): Offer => ({
    ...o,
    isNew: now - new Date(o.startDate ?? o.createdAt).getTime() < 30 * DAY,
    endingSoon: !!o.expiryDate && new Date(o.expiryDate).getTime() - now < 21 * DAY,
  });

  if (!isSupabaseConfigured) return demo.offers.filter(isLive).map(withFlags);
  const { data, error } = await getPublicClient()
    .from("offers")
    .select("*, offer_categories(category_id)")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Failed to load offers: ${error.message}`);
  return (data as OfferRow[]).map(mapOffer).filter(isLive).map(withFlags);
}

export async function loadStories(): Promise<Story[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("stories");
  const now = new Date().toISOString();
  const isLive = (s: Story) => s.status === "published" && s.publishedAt <= now;
  const sort = (list: Story[]) => [...list].sort((x, y) => y.publishedAt.localeCompare(x.publishedAt));

  if (!isSupabaseConfigured) return sort(demo.stories.filter(isLive));
  const { data, error } = await getPublicClient()
    .from("stories")
    .select("*")
    .eq("status", "published")
    .lte("published_at", now)
    .order("published_at", { ascending: false });
  if (error) throw new Error(`Failed to load stories: ${error.message}`);
  return (data as StoryRow[]).map(mapStory);
}

export async function loadEvents(): Promise<CommunityEvent[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("events");
  const sort = (list: CommunityEvent[]) => [...list].sort((x, y) => x.startsAt.localeCompare(y.startsAt));
  if (!isSupabaseConfigured) return sort(demo.events.filter((e) => e.status === "published"));
  const { data, error } = await getPublicClient()
    .from("events")
    .select("*, event_businesses(business_id)")
    .eq("status", "published")
    .order("start_datetime");
  if (error) throw new Error(`Failed to load events: ${error.message}`);
  return (data as EventRow[]).map(mapEvent);
}

export async function loadHomepageSettings(): Promise<HomepageSettings> {
  "use cache";
  cacheLife("hours");
  cacheTag("site-settings");
  if (!isSupabaseConfigured) return demo.homepageSettings;
  const { data, error } = await getPublicClient()
    .from("site_settings")
    .select("value")
    .eq("key", "homepage")
    .maybeSingle();
  if (error) throw new Error(`Failed to load homepage settings: ${error.message}`);
  return (data?.value as HomepageSettings | undefined) ?? demo.homepageSettings;
}
