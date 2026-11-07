import type {
  Business,
  Category,
  CommunityEvent,
  Offer,
  RichDoc,
  Story,
} from "@/types/content";

/** Row shapes as returned by Supabase (snake_case, see supabase/migrations). */

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  tone: Category["tone"] | null;
}

export interface BusinessRow {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  kind: string | null;
  services: string[] | null;
  differentiator: string | null;
  logo_url: string | null;
  logo_background: "light" | "dark" | null;
  cover_image_url: string | null;
  email: string | null;
  phone: string | null;
  show_email: boolean;
  show_phone: boolean;
  website: string | null;
  social_links: Business["social"] | null;
  location: string | null;
  squab_connection: string | null;
  status: Business["status"];
  featured: boolean;
  is_demo: boolean;
}

export interface OfferRow {
  id: string;
  business_id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string | null;
  what_you_get: string[] | null;
  how_to_redeem: string | null;
  image_url: string | null;
  reward_type: Offer["rewardType"];
  reward_value: string;
  redemption_method: Offer["redemptionMethod"];
  redemption_url: string | null;
  redemption_code: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  terms: string | null;
  start_date: string | null;
  expiry_date: string | null;
  status: Offer["status"];
  featured: boolean;
  created_at: string;
  is_demo: boolean;
}

export interface StoryRow {
  id: string;
  title: string;
  slug: string;
  standfirst: string | null;
  body: RichDoc | null;
  hero_image: string | null;
  hero_image_alt: string | null;
  author_name: string | null;
  category_id: string;
  format: Story["format"];
  related_business_id: string | null;
  status: Story["status"];
  featured: boolean;
  published_at: string;
  is_demo: boolean;
}

export interface EventRow {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  what_to_expect: string[] | null;
  who_should_attend: string | null;
  image_url: string | null;
  start_datetime: string;
  end_datetime: string;
  venue: string;
  address: string | null;
  registration_url: string | null;
  contact_email: string | null;
  capacity: number | null;
  fully_booked: boolean;
  status: CommunityEvent["status"];
  featured: boolean;
  is_demo: boolean;
  event_businesses?: { business_id: string }[];
}

const opt = <T>(v: T | null | undefined) => (v === null ? undefined : v);

export const mapCategory = (r: CategoryRow): Category => ({
  id: r.id,
  name: r.name,
  slug: r.slug,
  type: "story",
  description: opt(r.description),
  tone: r.tone ?? "orange",
});

export const mapBusiness = (r: BusinessRow): Business => ({
  id: r.id,
  name: r.name,
  slug: r.slug,
  tagline: r.tagline ?? "",
  description: r.description ?? "",
  kind: r.kind ?? "",
  services: r.services ?? [],
  differentiator: opt(r.differentiator),
  logoUrl: opt(r.logo_url),
  logoBackground: opt(r.logo_background),
  coverImageUrl: opt(r.cover_image_url),
  // Contact details are only exposed when the business has opted in.
  email: r.show_email ? opt(r.email) : undefined,
  phone: r.show_phone ? opt(r.phone) : undefined,
  website: opt(r.website),
  social: r.social_links ?? {},
  location: opt(r.location),
  squabConnection: opt(r.squab_connection),
  featured: r.featured,
  status: r.status,
  isDemo: r.is_demo,
});

export const mapOffer = (r: OfferRow): Offer => ({
  id: r.id,
  businessId: r.business_id,
  title: r.title,
  slug: r.slug,
  shortDescription: r.short_description,
  fullDescription: r.full_description ?? "",
  whatYouGet: r.what_you_get ?? [],
  howToRedeem: r.how_to_redeem ?? "",
  imageUrl: opt(r.image_url),
  rewardType: r.reward_type,
  rewardLabel: r.reward_value,
  redemptionMethod: r.redemption_method,
  redemptionUrl: opt(r.redemption_url),
  redemptionCode: opt(r.redemption_code),
  contactEmail: opt(r.contact_email),
  contactPhone: opt(r.contact_phone),
  terms: r.terms ?? "",
  startDate: opt(r.start_date),
  expiryDate: opt(r.expiry_date),
  status: r.status,
  featured: r.featured,
  createdAt: r.created_at,
  isDemo: r.is_demo,
});

export const mapStory = (r: StoryRow): Story => ({
  id: r.id,
  title: r.title,
  slug: r.slug,
  standfirst: r.standfirst ?? "",
  body: r.body ?? { type: "doc", content: [] },
  heroImageUrl: opt(r.hero_image),
  heroImageAlt: r.hero_image_alt ?? "",
  authorName: r.author_name ?? "Squab Connect",
  categoryId: r.category_id,
  format: r.format,
  relatedBusinessId: opt(r.related_business_id),
  status: r.status,
  featured: r.featured,
  publishedAt: r.published_at,
  isDemo: r.is_demo,
});

export const mapEvent = (r: EventRow): CommunityEvent => ({
  id: r.id,
  title: r.title,
  slug: r.slug,
  summary: r.summary ?? "",
  description: (r.description ?? "").split(/\n{2,}/).filter(Boolean),
  expect: r.what_to_expect ?? [],
  whoShouldAttend: r.who_should_attend ?? "",
  imageUrl: opt(r.image_url),
  startsAt: r.start_datetime,
  endsAt: r.end_datetime,
  venue: r.venue,
  address: opt(r.address),
  registrationUrl: opt(r.registration_url),
  contactEmail: opt(r.contact_email),
  capacity: opt(r.capacity),
  fullyBooked: r.fully_booked,
  status: r.status,
  featured: r.featured,
  relatedBusinessIds: (r.event_businesses ?? []).map((e) => e.business_id),
  isDemo: r.is_demo,
});
