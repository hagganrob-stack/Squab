/**
 * Starter content for Squab Connect.
 *
 * Partners and offers are REAL: taken from the earlier Squab Perks prototype
 * (squab-perks-go.base44.app), with descriptions, logos and photos taken from
 * each partner's own website. Confirm each partner is happy with the wording
 * and imagery before launch.
 *
 * Stories and events are SAMPLE content (isDemo: true, shown with a "Sample"
 * badge) to demonstrate the magazine and events pages until Squab writes its own.
 *
 * This file is also the source of supabase/seed.sql (npm run seed:generate).
 */
import type {
  Business,
  Category,
  CommunityEvent,
  HomepageSettings,
  Offer,
  Story,
} from "../../types/content";
import { a, b, cta, doc, h2, i, p, ul } from "./rich.ts";

const id = (group: number, n: number) =>
  `00000000-0000-4000-8000-${String(group).padStart(4, "0")}${String(n).padStart(8, "0")}`;

/* ------------------------------------------------------------------ */
/* Categories — editorial only                                         */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  { id: id(3, 1), type: "story", slug: "meet-the-community", name: "Meet the Community", tone: "orange" },
  { id: id(3, 3), type: "story", slug: "squab-news", name: "Squab News", tone: "sky" },
  { id: id(3, 4), type: "story", slug: "events", name: "Events", tone: "rose" },
];

const cat = (slug: string) => {
  const c = categories.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown story category ${slug}`);
  return c.id;
};

/* ------------------------------------------------------------------ */
/* Partners                                                            */
/* ------------------------------------------------------------------ */

const img = (file: string) => `/images/partners/${file}`;

export const businesses: Business[] = [
  {
    id: id(10, 1),
    name: "Rise and Reform",
    slug: "rise-and-reform",
    kind: "Reformer Pilates",
    tagline: "Small-group Reformer Pilates.",
    description:
      "Small-group Reformer Pilates classes in Leamington Spa, Rugby, Stratford-upon-Avon and Kenilworth.",
    services: ["Small-group Reformer Pilates classes"],
    logoUrl: img("rise-and-reform-logo.png"),
    coverImageUrl: img("rise-and-reform-cover.webp"),
    website: "https://risereformpilates.com/",
    social: {},
    location: "Leamington Spa, Rugby, Stratford-upon-Avon & Kenilworth",
    featured: true,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 2),
    name: "The Leamington Dog Field",
    slug: "the-leamington-dog-field",
    kind: "Dog field",
    tagline: "A bookable dog field at Squab Hall.",
    description: "The Leamington Dog Field is based at Squab Hall. Sessions are booked online.",
    services: ["Bookable field sessions"],
    logoUrl: img("leamington-dog-field-logo.png"),
    website: "https://leamingtonspadogfield.simplybook.it/",
    social: {},
    location: "Squab Hall, Leamington Spa",
    featured: true,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 3),
    name: "Proper Golfing",
    slug: "proper-golfing",
    kind: "Golf coaching",
    tagline: "The Timeless Golf Swing, for golfers over 45.",
    description:
      "Proper Golfing teaches the Timeless Golf Swing — effortless, repeatable golf coaching for golfers over 45 with PGA Professional Julian Mellor.",
    services: ["Golf lessons for golfers over 45"],
    logoUrl: img("proper-golfing-logo.svg"),
    coverImageUrl: img("proper-golfing-cover.webp"),
    website: "https://propergolfing.com/",
    social: {},
    featured: true,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 4),
    name: "Swim in a Tin",
    slug: "swim-in-a-tin",
    kind: "Private swimming",
    tagline: "Swim at your own pace in a private space.",
    description:
      "Swim at your own pace in a safe, private, personalised space to swim, train or learn — with or without qualified, supportive coaches.",
    services: ["Private swim sessions", "Coached swimming"],
    logoUrl: img("swim-in-a-tin-logo.png"),
    coverImageUrl: img("swim-in-a-tin-cover.webp"),
    website: "https://www.swiminatin.com/",
    social: {},
    featured: true,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 5),
    name: "The Hide Cafe",
    slug: "the-hide-cafe",
    kind: "Café",
    tagline: "The café at Squab Hall Farm.",
    description: "The Hide is the café at Squab Hall Farm.",
    services: ["Coffee and drinks", "Food"],
    logoUrl: img("the-hide-cafe-logo.png"),
    coverImageUrl: img("the-hide-cafe-cover.webp"),
    website: "https://squabhallfarm.co.uk/services/cafe/",
    social: {},
    location: "Squab Hall Farm",
    featured: true,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 6),
    name: "Project 23",
    slug: "project-23",
    kind: "Personal training",
    tagline: "Personal training in a private gym.",
    description:
      "Personal training and small-group coaching at Project 23’s private gym in Leamington Spa, near Warwick.",
    services: ["Personal training", "Small-group coaching"],
    logoUrl: img("project-23-logo.png"),
    logoBackground: "dark",
    coverImageUrl: img("project-23-cover.webp"),
    website: "https://project23coaching.co.uk/",
    social: {},
    location: "Leamington Spa",
    featured: true,
    status: "active",
    isDemo: false,
  },
];

const biz = (slug: string) => {
  const found = businesses.find((x) => x.slug === slug);
  if (!found) throw new Error(`Unknown business ${slug}`);
  return found;
};

/* ------------------------------------------------------------------ */
/* Offers (codes from the Squab Perks prototype)                       */
/* ------------------------------------------------------------------ */

const offer = (
  n: number,
  slug: string,
  title: string,
  rewardLabel: string,
  rewardType: Offer["rewardType"],
  code: string,
): Offer => {
  const b = biz(slug);
  return {
    id: id(20, n),
    businessId: b.id,
    title,
    slug: `${slug}-${code.toLowerCase()}`,
    shortDescription: `${title} at ${b.name}, exclusively for Squab customers.`,
    fullDescription: `${b.description} Squab customers get ${title.charAt(0).toLowerCase()}${title.slice(1)} with the code below.`,
    whatYouGet: [],
    howToRedeem: `Show your code (or the QR code) at ${b.name}, or quote it when you book with them.`,
    rewardType,
    rewardLabel,
    redemptionMethod: "code",
    redemptionUrl: b.website,
    redemptionCode: code,
    terms: "",
    status: "published",
    featured: true,
    createdAt: "2026-09-18T09:00:00Z",
    isDemo: false,
  };
};

export const offers: Offer[] = [
  offer(1, "rise-and-reform", "Free first pilates session", "Free first session", "introductory", "RISEFREE"),
  offer(2, "the-leamington-dog-field", "20% off your first booking", "20% off", "percentage", "LEAMDOG20"),
  offer(3, "proper-golfing", "25% off your first lesson", "25% off", "percentage", "PROPER25"),
  offer(4, "swim-in-a-tin", "15% off sessions", "15% off", "percentage", "SWIMTIN15"),
  offer(5, "the-hide-cafe", "20% off any drink", "20% off", "percentage", "HIDE20"),
  offer(6, "project-23", "30 minute personal training consultation", "Free consultation", "complimentary", "P23TRAIN30"),
];

/* ------------------------------------------------------------------ */
/* Stories (sample copy — replace with Squab's own)                    */
/* ------------------------------------------------------------------ */

export const stories: Story[] = [
  {
    id: id(30, 1),
    title: "Meet the businesses behind Squab Perks",
    slug: "meet-the-businesses-behind-squab-perks",
    standfirst: "Pilates, golf, swimming, coffee, a dog field and a private gym — here’s who’s offering something extra to Squab customers.",
    heroImageUrl: "/images/partners/the-hide-cafe-cover.webp",
    heroImageAlt: "Inside The Hide café at Squab Hall Farm",
    authorName: "The Squab Connect team",
    categoryId: cat("meet-the-community"),
    format: "standard",
    status: "published",
    featured: true,
    publishedAt: "2026-11-03T08:00:00Z",
    isDemo: true,
    body: doc(
      p("Squab Perks brings together offers from businesses in and around the Squab community. Here’s a quick introduction to the first six."),
      h2("Rise and Reform"),
      p("Small-group Reformer Pilates across Leamington Spa, Rugby, Stratford-upon-Avon and Kenilworth. Squab customers get ", b("their first session free"), "."),
      h2("The Leamington Dog Field"),
      p("A bookable dog field at Squab Hall — ", b("20% off your first booking"), "."),
      h2("Proper Golfing"),
      p("Golf coaching for golfers over 45 with PGA Professional Julian Mellor — ", b("25% off your first lesson"), "."),
      h2("Swim in a Tin"),
      p("Private, personalised swimming, with or without a coach — ", b("15% off sessions"), "."),
      h2("The Hide Cafe"),
      p("The café at Squab Hall Farm — ", b("20% off any drink"), "."),
      h2("Project 23"),
      p("Personal training at a private gym in Leamington Spa — ", b("a free 30-minute consultation"), "."),
      cta("See all Squab Perks", "/perks"),
    ),
  },
  {
    id: id(30, 2),
    title: "Introducing Squab Connect",
    slug: "introducing-squab-connect",
    standfirst: "One place for offers, local businesses, news and events from across the Squab community.",
    heroImageUrl: "/images/squab/welcome.webp",
    heroImageAlt: "The welcome area at a Squab Storage facility",
    authorName: "The Squab Connect team",
    categoryId: cat("squab-news"),
    format: "standard",
    status: "published",
    featured: false,
    publishedAt: "2026-11-01T08:00:00Z",
    isDemo: true,
    body: doc(
      p(i("Sample copy — to be replaced with Squab’s own announcement.")),
      p("Squab Connect is a new home for the Squab community. Browse exclusive perks from local businesses, find out who’s around you and keep up with news and events."),
      h2("What you can do"),
      ul(
        [b("Use Squab Perks"), " — show a code at the business or use it when you book."],
        [b("Discover local businesses"), " in the directory."],
        [b("Come along to an event"), " and meet people face to face."],
      ),
      p("Run a business and want to offer something to Squab customers? ", a("Find out how to take part", "/about#businesses"), "."),
      cta("Explore Squab Perks", "/perks"),
    ),
  },
  {
    id: id(30, 3),
    title: "Join us at our next networking evening",
    slug: "join-us-at-our-next-networking-evening",
    standfirst: "Drinks, introductions and a chance to meet the businesses around you.",
    heroImageUrl: "/images/squab/lounge.webp",
    heroImageAlt: "A Squab Storage reception lounge",
    authorName: "The Squab Connect team",
    categoryId: cat("events"),
    format: "standard",
    status: "published",
    featured: false,
    publishedAt: "2026-10-22T08:00:00Z",
    isDemo: true,
    body: doc(
      p(i("Sample copy to demonstrate event announcements.")),
      p("Our networking evenings are relaxed, informal and open to every business and customer in the Squab community."),
      cta("Event details", "/events/autumn-networking-evening"),
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Events (sample)                                                     */
/* ------------------------------------------------------------------ */

export const events: CommunityEvent[] = [
  {
    id: id(40, 1),
    title: "Autumn Networking Evening",
    slug: "autumn-networking-evening",
    summary: "An informal evening of drinks, introductions and conversation with businesses from across the Squab community.",
    description: [
      "Join us for a relaxed evening designed to help you meet the people and businesses working alongside you.",
      "Sample event — date, venue and details to be confirmed by Squab.",
    ],
    expect: ["Short introductions from local businesses", "Drinks and light refreshments", "Time to meet people informally"],
    whoShouldAttend: "Anyone who runs a business near Squab, stores with us, or is curious about the community.",
    imageUrl: "/images/squab/lounge.webp",
    startsAt: "2026-11-26T18:00:00Z",
    endsAt: "2026-11-26T20:30:00Z",
    venue: "Venue to be confirmed",
    fullyBooked: false,
    status: "published",
    featured: true,
    relatedBusinessIds: [],
    isDemo: true,
  },
  {
    id: id(40, 2),
    title: "New Year Business Breakfast",
    slug: "new-year-business-breakfast",
    summary: "Coffee, pastries and practical conversation to start the year.",
    description: ["Sample event — details to be confirmed by Squab."],
    expect: ["Breakfast and coffee", "Round-table introductions"],
    whoShouldAttend: "Business owners in the Squab community.",
    startsAt: "2027-01-21T08:00:00Z",
    endsAt: "2027-01-21T09:30:00Z",
    venue: "Venue to be confirmed",
    fullyBooked: false,
    status: "published",
    featured: false,
    relatedBusinessIds: [],
    isDemo: true,
  },
];

/* ------------------------------------------------------------------ */
/* Homepage settings                                                   */
/* ------------------------------------------------------------------ */

export const homepageSettings: HomepageSettings = {
  hero: {
    eyebrow: "Welcome to Squab Connect",
    headline: "Good things happen when we connect.",
    subheading:
      "Discover exclusive offers, meet the businesses around you and stay up to date with everything happening across the Squab community.",
    primaryCta: { label: "Explore Squab Perks", href: "/perks" },
    secondaryCta: { label: "Discover our community", href: "/businesses" },
    imageUrl: "/images/squab/welcome.webp",
  },
  community: {
    headline: "Part of the Squab community? Make yourself known.",
    body: "Whether you have a business to promote, an offer to share or simply want to meet the people around you, Squab Connect is the place to start.",
    cta: { label: "Find out more", href: "/about" },
  },
};
