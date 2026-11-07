/**
 * Domain types shared by the data layer, components and demo dataset.
 * Field names are camelCase; the Supabase mapping lives in src/lib/data/mappers.ts.
 */

/** Only editorial content is categorised; with ~20 partners, perks and businesses are found by search. */
export type CategoryType = "story";

export type CategoryTone = "sage" | "sky" | "plum" | "sand" | "rose" | "teal" | "orange";

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: CategoryType;
  description?: string;
  tone: CategoryTone;
}

export interface SocialLinks {
  website?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  x?: string;
}

export type BusinessStatus = "pending" | "active" | "suspended";

export interface Business {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  /** Short plain label shown on cards, e.g. "Reformer Pilates". Replaces a category taxonomy. */
  kind: string;
  services: string[];
  differentiator?: string;
  logoUrl?: string;
  /** Some logos are white and need a dark tile behind them. */
  logoBackground?: "light" | "dark";
  coverImageUrl?: string;
  email?: string;
  phone?: string;
  website?: string;
  social: SocialLinks;
  /** Where the business is, e.g. "Squab Hall, Leamington Spa". */
  location?: string;
  squabConnection?: string;
  featured: boolean;
  status: BusinessStatus;
  isDemo: boolean;
}

export type RedemptionMethod = "show" | "link" | "code" | "contact";

export type RewardType =
  | "percentage"
  | "fixed"
  | "complimentary"
  | "introductory"
  | "exclusive_rate"
  | "code";

export type OfferStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "changes_requested"
  | "approved"
  | "published"
  | "rejected"
  | "paused"
  | "withdrawn"
  | "expired"
  | "archived";

export interface Offer {
  id: string;
  businessId: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  whatYouGet: string[];
  howToRedeem: string;
  imageUrl?: string;
  rewardType: RewardType;
  /** Short, prominent benefit label, e.g. "15% off" or "Free consultation". */
  rewardLabel: string;
  redemptionMethod: RedemptionMethod;
  redemptionUrl?: string;
  redemptionCode?: string;
  contactEmail?: string;
  contactPhone?: string;
  terms: string;
  startDate?: string;
  expiryDate?: string;
  status: OfferStatus;
  featured: boolean;
  createdAt: string;
  isDemo: boolean;
  /** Computed when loaded: added in the last 30 days. */
  isNew?: boolean;
  /** Computed when loaded: expires within the next 21 days. */
  endingSoon?: boolean;
}

/* ---------- Rich text (ProseMirror / Tiptap JSON subset) ---------- */

export type RichMark =
  | { type: "bold" }
  | { type: "italic" }
  | { type: "link"; attrs: { href: string } };

export type RichNode =
  | { type: "doc"; content: RichNode[] }
  | { type: "paragraph"; content?: RichNode[] }
  | { type: "heading"; attrs: { level: 2 | 3 }; content?: RichNode[] }
  | { type: "text"; text: string; marks?: RichMark[] }
  | { type: "bulletList"; content: RichNode[] }
  | { type: "orderedList"; content: RichNode[] }
  | { type: "listItem"; content: RichNode[] }
  | { type: "blockquote"; content: RichNode[] }
  | { type: "pullQuote"; attrs: { text: string; cite?: string } }
  | { type: "image"; attrs: { src?: string; alt: string; caption?: string } }
  | { type: "youtube"; attrs: { videoId: string; title: string } }
  | { type: "ctaButton"; attrs: { label: string; href: string } }
  | { type: "hardBreak" };

export type RichDoc = Extract<RichNode, { type: "doc" }>;

export type StoryStatus = "draft" | "scheduled" | "published" | "archived";
export type StoryFormat = "standard" | "spotlight";

export interface Story {
  id: string;
  title: string;
  slug: string;
  standfirst: string;
  body: RichDoc;
  heroImageUrl?: string;
  heroImageAlt: string;
  authorName: string;
  categoryId: string;
  format: StoryFormat;
  relatedBusinessId?: string;
  status: StoryStatus;
  featured: boolean;
  publishedAt: string;
  isDemo: boolean;
}

export type EventStatus = "draft" | "published" | "archived";

export interface CommunityEvent {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string[];
  expect: string[];
  whoShouldAttend: string;
  imageUrl?: string;
  startsAt: string;
  endsAt: string;
  venue: string;
  address?: string;
  registrationUrl?: string;
  contactEmail?: string;
  capacity?: number;
  fullyBooked: boolean;
  status: EventStatus;
  featured: boolean;
  relatedBusinessIds: string[];
  isDemo: boolean;
}

export interface HomepageSettings {
  hero: {
    eyebrow: string;
    headline: string;
    subheading: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    imageUrl?: string;
  };
  community: {
    headline: string;
    body: string;
    cta: { label: string; href: string };
  };
}

/** An offer joined with the business that runs it — what most UI needs. */
export interface OfferWithBusiness extends Offer {
  business: Pick<Business, "id" | "name" | "slug" | "kind" | "logoUrl" | "logoBackground" | "coverImageUrl" | "location" | "website">;
}

export interface StoryWithCategory extends Story {
  category: Category;
  readingMinutes: number;
}
