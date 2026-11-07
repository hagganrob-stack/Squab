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
import { a, b, cta, doc, h2, i, img as image, p, ul } from "./rich.ts";

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
    coverImageUrl: img("proper-golfing-studio.webp"),
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
    coverImageUrl: img("swim-in-a-tin-containers.webp"),
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
    coverImageUrl: img("project-23-coaching.webp"),
    website: "https://project23coaching.co.uk/",
    social: {},
    location: "Leamington Spa",
    featured: true,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 7),
    name: "AM Joinery",
    slug: "am-joinery",
    kind: "Joinery",
    tagline: "A joinery workshop based at Squab.",
    description: "AM Joinery runs its joinery workshop from a unit at Squab.",
    services: ["Joinery"],
    coverImageUrl: img("am-joinery-cover.webp"),
    social: {},
    squabConnection: "Squab tenant with a joinery workshop on site.",
    featured: false,
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
    id: id(30, 4),
    title: "Meet us at The Midlands Business Network Expo 2026",
    slug: "midlands-business-network-expo-2026",
    standfirst: "Squab is exhibiting in Stratford-upon-Avon on 27 November. Grow, learn, connect — and come and say hello.",
    heroImageUrl: "/images/events/expo-2026-wide.webp",
    heroImageAlt: "We're exhibiting: The Midlands Business Network Expo 2026, 27 November, Stratford-upon-Avon",
    authorName: "The Squab Connect team",
    categoryId: cat("events"),
    format: "standard",
    status: "published",
    featured: true,
    publishedAt: "2026-11-07T08:00:00Z",
    isDemo: false,
    body: doc(
      p("We’re exhibiting at ", b("The Midlands Business Network Expo 2026"), " — a day of connections for businesses from across the region."),
      ul([b("When:"), " Friday 27 November 2026"], [b("Where:"), " Stratford-upon-Avon"]),
      image("We're exhibiting at The Midlands Business Network Expo 2026 — grow, learn, connect", undefined, "/images/events/expo-2026.webp"),
      p("If you’re going, come and find the Squab team. We’d love to talk about storage, workspace and the businesses that make up the Squab community."),
      cta("Event details", "/events/midlands-business-network-expo-2026"),
    ),
  },
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
    featured: false,
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
    heroImageUrl: "/images/partners/the-hide-cafe-gathering.webp",
    heroImageAlt: "People chatting over coffee at The Hide café",
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
    title: "Squab Networking is back",
    slug: "squab-networking-is-back",
    standfirst: "Friendly local connections for growing businesses — with guest speaker Tracey Barnbrook.",
    heroImageUrl: "/images/squab/networking-room.webp",
    heroImageAlt: "Business owners chatting over coffee at a Squab networking morning",
    authorName: "The Squab Connect team",
    categoryId: cat("events"),
    format: "standard",
    status: "published",
    featured: false,
    publishedAt: "2026-09-15T08:00:00Z",
    isDemo: false,
    body: doc(
      p("Squab Networking is back: a relaxed morning of friendly local connections for growing businesses."),
      ul([b("When:"), " Tuesday 29 September, 10:00–12:30"], [b("Guest speaker:"), " Tracey Barnbrook"]),
      image("Squab Networking is back — Tuesday 29 September, 10:00–12:30, with guest speaker Tracey Barnbrook", undefined, "/images/squab/networking-is-back.webp"),
      cta("See upcoming events", "/events"),
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Events (sample)                                                     */
/* ------------------------------------------------------------------ */

export const events: CommunityEvent[] = [
  {
    id: id(40, 4),
    title: "The Midlands Business Network Expo 2026",
    slug: "midlands-business-network-expo-2026",
    summary: "Squab is exhibiting at The Midlands Business Network Expo in Stratford-upon-Avon. Come and say hello.",
    description: [
      "Squab is exhibiting at The Midlands Business Network Expo 2026 in Stratford-upon-Avon on 27 November.",
      "If you're going, come and find the Squab team to talk about storage, workspace and the Squab community.",
    ],
    expect: ["Meet the Squab team", "Exhibitors and businesses from across the Midlands"],
    whoShouldAttend: "Businesses across the Midlands looking to grow, learn and connect.",
    imageUrl: "/images/events/expo-2026-wide.webp",
    startsAt: "2026-11-27T09:00:00Z",
    endsAt: "2026-11-27T17:00:00Z",
    timeTbc: true,
    venue: "Stratford-upon-Avon",
    fullyBooked: false,
    status: "published",
    featured: true,
    relatedBusinessIds: [],
    isDemo: false,
  },
  {
    id: id(40, 3),
    title: "Squab Networking: Networking is back",
    slug: "squab-networking-september-2026",
    summary: "Friendly local connections for growing businesses, with guest speaker Tracey Barnbrook.",
    description: ["A morning of networking for local businesses, with a talk from guest speaker Tracey Barnbrook."],
    expect: ["Guest speaker Tracey Barnbrook", "Coffee and conversation", "Friendly local connections"],
    whoShouldAttend: "Growing local businesses.",
    imageUrl: "/images/squab/networking-room.webp",
    startsAt: "2026-09-29T09:00:00Z",
    endsAt: "2026-09-29T11:30:00Z",
    venue: "Squab Storage",
    fullyBooked: false,
    status: "published",
    featured: false,
    relatedBusinessIds: [],
    isDemo: false,
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
    imageUrl: "/images/squab/aerial.webp",
  },
  community: {
    headline: "Part of the Squab community? Make yourself known.",
    body: "Whether you have a business to promote, an offer to share or simply want to meet the people around you, Squab Connect is the place to start.",
    cta: { label: "Find out more", href: "/about" },
  },
};
