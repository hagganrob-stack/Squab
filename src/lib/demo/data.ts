/**
 * DEMONSTRATION CONTENT — NOT REAL SQUAB TENANTS, OFFERS OR EVENTS.
 *
 * Every business, offer, story and event below is fictional sample content used
 * to make the site feel populated during development. Each record is flagged
 * `isDemo: true` and rendered with a visible "Sample" label. This file is also
 * the source of supabase/seed.sql (npm run seed:generate), after which the same
 * records can be edited or removed in the admin area.
 *
 * Images are intentionally left empty so the UI shows labelled placeholders
 * until genuine Squab photography is supplied.
 */
import type {
  Business,
  Category,
  CommunityEvent,
  HomepageSettings,
  Offer,
  Story,
} from "../../types/content";
import { a, b, cta, doc, h2, i, img, ol, p, quote, ul } from "./rich.ts";

const id = (group: number, n: number) =>
  `00000000-0000-4000-8000-${String(group).padStart(4, "0")}${String(n).padStart(8, "0")}`;

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  // Perk / business categories (shared taxonomy, type distinguishes usage)
  { id: id(1, 1), type: "perk", slug: "health-wellbeing", name: "Health & Wellbeing", tone: "sage", description: "Personal training, fitness, coaching and wellbeing services." },
  { id: id(1, 2), type: "perk", slug: "food-drink", name: "Food & Drink", tone: "rose", description: "Food businesses, drinks producers, catering and hospitality." },
  { id: id(1, 3), type: "perk", slug: "home-lifestyle", name: "Home & Lifestyle", tone: "sand", description: "Home improvements, interiors, furniture and gardening." },
  { id: id(1, 4), type: "perk", slug: "business-services", name: "Business Services", tone: "sky", description: "Accountancy, marketing, IT support, printing and consultancy." },
  { id: id(1, 5), type: "perk", slug: "trades-property", name: "Trades & Property", tone: "teal", description: "Joinery, building, plumbing, electrical and fit-out." },
  { id: id(1, 6), type: "perk", slug: "sport-leisure", name: "Sport & Leisure", tone: "plum", description: "Golf, sports clubs, coaching and leisure activities." },

  { id: id(2, 1), type: "business", slug: "health-wellbeing", name: "Health & Wellbeing", tone: "sage" },
  { id: id(2, 2), type: "business", slug: "food-drink", name: "Food & Drink", tone: "rose" },
  { id: id(2, 3), type: "business", slug: "home-lifestyle", name: "Home & Lifestyle", tone: "sand" },
  { id: id(2, 4), type: "business", slug: "business-services", name: "Business Services", tone: "sky" },
  { id: id(2, 5), type: "business", slug: "trades-property", name: "Trades & Property", tone: "teal" },
  { id: id(2, 6), type: "business", slug: "sport-leisure", name: "Sport & Leisure", tone: "plum" },

  // Editorial categories
  { id: id(3, 1), type: "story", slug: "meet-the-community", name: "Meet the Community", tone: "orange" },
  { id: id(3, 2), type: "story", slug: "business-spotlight", name: "Business Spotlight", tone: "plum" },
  { id: id(3, 3), type: "story", slug: "squab-news", name: "Squab News", tone: "sky" },
  { id: id(3, 4), type: "story", slug: "events", name: "Events", tone: "rose" },
  { id: id(3, 5), type: "story", slug: "business-insights", name: "Business Insights", tone: "teal" },
  { id: id(3, 6), type: "story", slug: "community", name: "Community", tone: "sage" },
  { id: id(3, 7), type: "story", slug: "behind-the-scenes", name: "Behind the Scenes", tone: "sand" },
  { id: id(3, 8), type: "story", slug: "offers-opportunities", name: "Offers & Opportunities", tone: "orange" },
];

const cat = (type: Category["type"], slug: string) => {
  const c = categories.find((x) => x.type === type && x.slug === slug);
  if (!c) throw new Error(`Unknown ${type} category ${slug}`);
  return c.id;
};

/* ------------------------------------------------------------------ */
/* Businesses                                                          */
/* ------------------------------------------------------------------ */

export const businesses: Business[] = [
  {
    id: id(10, 1),
    name: "Forge Personal Training",
    slug: "forge-personal-training",
    tagline: "Strength coaching that fits around real life.",
    description:
      "Forge is a small, private training studio offering one-to-one and small-group strength coaching. Sessions are built around your goals, schedule and starting point — whether that's moving without pain, training for an event or simply feeling stronger day to day.",
    services: ["One-to-one personal training", "Small-group strength classes", "Nutrition coaching", "Pre- and post-natal training"],
    differentiator:
      "No crowded gym floor: every session takes place in a quiet, fully equipped private studio with a coach who knows your plan.",
    email: "hello@example.com",
    phone: "01234 567 890",
    website: "https://example.com",
    social: { instagram: "https://instagram.com/", facebook: "https://facebook.com/" },
    facility: "Sample facility",
    squabConnection: "Runs a private training studio from a ground-floor workshop unit.",
    categoryIds: [cat("business", "health-wellbeing")],
    featured: true,
    status: "active",
    isDemo: true,
  },
  {
    id: id(10, 2),
    name: "The Golf Studio",
    slug: "the-golf-studio",
    tagline: "Indoor coaching, custom fitting and year-round practice.",
    description:
      "The Golf Studio is an indoor coaching and practice facility with launch-monitor technology, offering lessons for complete beginners through to low-handicap players. Weather never cancels a session.",
    services: ["Individual and junior lessons", "Custom club fitting", "Simulator practice bays", "Corporate golf events"],
    differentiator: "Every lesson comes with video and ball-flight data so you can see exactly what changed.",
    email: "coach@example.com",
    phone: "01234 567 891",
    website: "https://example.com",
    social: { instagram: "https://instagram.com/" },
    facility: "Sample facility",
    squabConnection: "Converted a double-height industrial unit into a two-bay indoor studio.",
    categoryIds: [cat("business", "sport-leisure")],
    featured: true,
    status: "active",
    isDemo: true,
  },
  {
    id: id(10, 3),
    name: "Copper Still Gin Co.",
    slug: "copper-still-gin",
    tagline: "Small-batch gin, distilled a few doors down.",
    description:
      "Copper Still is an independent craft distillery producing small-batch gins and seasonal liqueurs. Everything is distilled, bottled and labelled by hand on site.",
    services: ["Signature and seasonal gins", "Gift sets and hampers", "Private tasting sessions", "Corporate and wedding gifts"],
    differentiator: "Botanicals are sourced locally wherever possible and every batch is numbered by hand.",
    email: "orders@example.com",
    website: "https://example.com",
    social: { instagram: "https://instagram.com/", facebook: "https://facebook.com/" },
    facility: "Sample facility",
    squabConnection: "Stores bottling stock and dry goods across two storage units.",
    categoryIds: [cat("business", "food-drink")],
    featured: true,
    status: "active",
    isDemo: true,
  },
  {
    id: id(10, 4),
    name: "Fieldwork Fit-Out",
    slug: "fieldwork-fit-out",
    tagline: "Workspaces designed around the way your team works.",
    description:
      "Fieldwork designs and delivers office and commercial fit-outs for small and growing businesses — from a single meeting room refresh to complete workspace refurbishments.",
    services: ["Space planning and design", "Office refurbishment", "Partitioning and ceilings", "Furniture supply"],
    differentiator: "One point of contact from first sketch to final snag list.",
    email: "projects@example.com",
    phone: "01234 567 893",
    website: "https://example.com",
    social: { linkedin: "https://linkedin.com/" },
    facility: "Sample facility",
    squabConnection: "Operates from a first-floor office suite with materials storage below.",
    categoryIds: [cat("business", "trades-property"), cat("business", "business-services")],
    featured: true,
    status: "active",
    isDemo: true,
  },
  {
    id: id(10, 5),
    name: "Grain & Joint Joinery",
    slug: "grain-and-joint-joinery",
    tagline: "Bespoke joinery, made by hand in our workshop.",
    description:
      "Grain & Joint is a two-person joinery workshop making bespoke furniture, fitted storage, staircases and doors for homes and businesses.",
    services: ["Fitted wardrobes and alcoves", "Bespoke furniture", "Staircases and doors", "Commercial joinery"],
    differentiator: "Every piece is designed with you and built in our own workshop — never outsourced.",
    email: "workshop@example.com",
    phone: "01234 567 894",
    social: { instagram: "https://instagram.com/" },
    facility: "Sample facility",
    squabConnection: "Runs a full joinery workshop from a light-industrial unit.",
    categoryIds: [cat("business", "trades-property"), cat("business", "home-lifestyle")],
    featured: false,
    status: "active",
    isDemo: true,
  },
  {
    id: id(10, 6),
    name: "Hearth Kitchens",
    slug: "hearth-kitchens",
    tagline: "Kitchen design and fitting, start to finish.",
    description:
      "Hearth Kitchens designs, supplies and fits kitchens and utility rooms, with a small showroom of door styles, worktops and finishes to browse.",
    services: ["Kitchen design", "Supply and installation", "Worktop replacement", "Utility rooms"],
    differentiator: "Our own fitters handle every installation, so the team that measures is the team that fits.",
    email: "design@example.com",
    phone: "01234 567 895",
    website: "https://example.com",
    social: { instagram: "https://instagram.com/", facebook: "https://facebook.com/" },
    facility: "Sample facility",
    squabConnection: "Uses a showroom unit and stores stock between installations.",
    categoryIds: [cat("business", "home-lifestyle"), cat("business", "trades-property")],
    featured: false,
    status: "active",
    isDemo: true,
  },
];

const biz = (slug: string) => {
  const found = businesses.find((x) => x.slug === slug);
  if (!found) throw new Error(`Unknown business ${slug}`);
  return found.id;
};

/* ------------------------------------------------------------------ */
/* Offers                                                              */
/* ------------------------------------------------------------------ */

export const offers: Offer[] = [
  {
    id: id(20, 1),
    businessId: biz("forge-personal-training"),
    title: "Your first session, on us",
    slug: "forge-free-introductory-session",
    shortDescription: "A complimentary 45-minute introductory session for anyone in the Squab community.",
    fullDescription:
      "Not sure whether personal training is for you? Come and try a full session with one of our coaches. We'll talk through your goals, run a movement assessment and take you through a short workout tailored to you — with no obligation to sign up.",
    whatYouGet: ["45-minute one-to-one session", "Movement and mobility assessment", "A simple plan to take away"],
    howToRedeem: "Book online and mention Squab Connect in the notes field, then show this offer when you arrive.",
    rewardType: "introductory",
    rewardLabel: "Free intro session",
    redemptionMethod: "link",
    redemptionUrl: "https://example.com/book",
    terms: "One session per person. New clients only. Subject to availability. Sample offer for demonstration only.",
    startDate: "2026-10-01",
    expiryDate: "2027-03-31",
    status: "published",
    featured: true,
    categoryIds: [cat("perk", "health-wellbeing")],
    createdAt: "2026-10-01T09:00:00Z",
    isDemo: true,
  },
  {
    id: id(20, 2),
    businessId: biz("the-golf-studio"),
    title: "Your Squab golf advantage",
    slug: "golf-studio-exclusive-coaching-rate",
    shortDescription: "Exclusive coaching rates for the Squab community.",
    fullDescription:
      "Squab customers and tenants receive an exclusive rate on individual coaching lessons at The Golf Studio, including full launch-monitor data and video analysis after every session.",
    whatYouGet: ["Exclusive rate on individual lessons", "Launch-monitor data and video", "Personalised practice plan"],
    howToRedeem: "Show this offer on your phone when you book in at the studio.",
    rewardType: "exclusive_rate",
    rewardLabel: "Exclusive offer",
    redemptionMethod: "show",
    terms: "Valid on individual adult lessons only. Cannot be combined with other offers. Sample offer for demonstration only.",
    startDate: "2026-09-15",
    expiryDate: "2027-06-30",
    status: "published",
    featured: true,
    categoryIds: [cat("perk", "sport-leisure")],
    createdAt: "2026-09-15T09:00:00Z",
    isDemo: true,
  },
  {
    id: id(20, 3),
    businessId: biz("copper-still-gin"),
    title: "15% off selected gins",
    slug: "copper-still-15-percent-off",
    shortDescription: "Save 15% on our signature and seasonal gins when you order online.",
    fullDescription:
      "Treat yourself — or someone else — to a bottle of small-batch gin distilled right here in the Squab community. Use the code below at checkout for 15% off selected bottles and gift sets.",
    whatYouGet: ["15% off selected bottles", "Applies to gift sets", "Local collection available"],
    howToRedeem: "Reveal the code and enter it at checkout on our website.",
    rewardType: "code",
    rewardLabel: "15% off",
    redemptionMethod: "code",
    redemptionUrl: "https://example.com/shop",
    redemptionCode: "SQUAB15",
    terms: "Over 18s only. Excludes limited editions. One use per customer. Sample offer for demonstration only.",
    startDate: "2026-10-15",
    expiryDate: "2026-11-30",
    status: "published",
    featured: true,
    categoryIds: [cat("perk", "food-drink")],
    createdAt: "2026-10-15T09:00:00Z",
    isDemo: true,
  },
  {
    id: id(20, 4),
    businessId: biz("fieldwork-fit-out"),
    title: "Complimentary workspace consultation",
    slug: "fieldwork-free-consultation",
    shortDescription: "A free on-site consultation and outline layout for your office or unit.",
    fullDescription:
      "Thinking about refreshing your workspace? We'll visit your unit, talk through how your team works and provide an outline layout with indicative costs — completely free for Squab businesses.",
    whatYouGet: ["On-site visit and measure", "Outline layout drawing", "Indicative budget"],
    howToRedeem: "Get in touch by email or phone and mention Squab Connect.",
    rewardType: "complimentary",
    rewardLabel: "Free consultation",
    redemptionMethod: "contact",
    contactEmail: "projects@example.com",
    contactPhone: "01234 567 893",
    terms: "Available to businesses based at a Squab facility. Sample offer for demonstration only.",
    startDate: "2026-08-01",
    status: "published",
    featured: true,
    categoryIds: [cat("perk", "business-services"), cat("perk", "trades-property")],
    createdAt: "2026-08-01T09:00:00Z",
    isDemo: true,
  },
  {
    id: id(20, 5),
    businessId: biz("grain-and-joint-joinery"),
    title: "£50 off fitted storage",
    slug: "grain-and-joint-50-off-fitted-storage",
    shortDescription: "£50 off any fitted wardrobe or alcove unit commission.",
    fullDescription:
      "Make the most of awkward spaces with handmade fitted storage. Squab customers receive £50 off any fitted wardrobe, alcove unit or under-stairs storage commission.",
    whatYouGet: ["£50 off your commission", "Free design visit", "Handmade in our workshop"],
    howToRedeem: "Mention Squab Connect when you request a quote by email.",
    rewardType: "fixed",
    rewardLabel: "£50 off",
    redemptionMethod: "contact",
    contactEmail: "workshop@example.com",
    terms: "Minimum order value applies. One discount per commission. Sample offer for demonstration only.",
    startDate: "2026-10-20",
    expiryDate: "2027-02-28",
    status: "published",
    featured: false,
    categoryIds: [cat("perk", "home-lifestyle"), cat("perk", "trades-property")],
    createdAt: "2026-10-20T09:00:00Z",
    isDemo: true,
  },
  {
    id: id(20, 6),
    businessId: biz("hearth-kitchens"),
    title: "10% off kitchen installation",
    slug: "hearth-kitchens-10-percent-off-installation",
    shortDescription: "10% off fitting costs when you choose a Hearth kitchen.",
    fullDescription:
      "Planning a new kitchen? Squab customers receive 10% off installation when they order a kitchen through Hearth. Visit the showroom to browse door styles and worktops.",
    whatYouGet: ["10% off installation", "Free design appointment", "Showroom visit"],
    howToRedeem: "Show this offer at your design appointment.",
    rewardType: "percentage",
    rewardLabel: "10% off fitting",
    redemptionMethod: "show",
    terms: "Applies to installation labour only. Sample offer for demonstration only.",
    startDate: "2026-11-01",
    expiryDate: "2027-04-30",
    status: "published",
    featured: false,
    categoryIds: [cat("perk", "home-lifestyle")],
    createdAt: "2026-11-01T09:00:00Z",
    isDemo: true,
  },
];

/* ------------------------------------------------------------------ */
/* Stories                                                             */
/* ------------------------------------------------------------------ */

export const stories: Story[] = [
  {
    id: id(30, 1),
    title: "Meet the businesses making Squab their home",
    slug: "meet-the-businesses-making-squab-their-home",
    standfirst:
      "Behind the roller doors you'll find distillers, joiners, coaches and designers. Here's a first look at the community taking shape.",
    heroImageAlt: "Placeholder: tenants outside their units",
    authorName: "The Squab Connect team",
    categoryId: cat("story", "meet-the-community"),
    format: "standard",
    status: "published",
    featured: true,
    publishedAt: "2026-11-03T08:00:00Z",
    isDemo: true,
    body: doc(
      p("Walk the corridors of any Squab facility and you'll quickly realise it is much more than a place to keep things. It's a place where people ", i("build"), " things — businesses, products, careers and, increasingly, relationships with each other."),
      p("Squab Connect exists to make those relationships easier to find. Over the coming months we'll be introducing the people behind the units, sharing what they do and helping the rest of the community discover them."),
      h2("A surprisingly diverse mix"),
      p("Our (sample) line-up already includes a personal training studio, an indoor golf studio, a small-batch gin distillery, an office fit-out company, a joinery workshop and a kitchen fitter. Each one chose Squab for different reasons — flexible space, room to grow or simply a convenient place to run a business."),
      img("Placeholder: a workshop interior", "Real photography of Squab tenants will replace this placeholder."),
      quote("Good things happen when the businesses around you know what you do.", "The Squab Connect team"),
      h2("How you can take part"),
      ul(
        [b("Browse the directory"), " to see who's based near you."],
        [b("Check Squab Perks"), " for exclusive offers from fellow tenants."],
        [b("Come to an event"), " and meet people face to face."],
      ),
      p("If you run a business from Squab and would like to be featured, ", a("get in touch", "/about"), " — we'd love to hear from you."),
      cta("Explore the directory", "/businesses"),
    ),
  },
  {
    id: id(30, 2),
    title: "Meet Copper Still: the distillery a few doors down",
    slug: "business-spotlight-copper-still-gin",
    standfirst:
      "How a weekend hobby turned into a small-batch distillery — and why the founders chose to grow at Squab.",
    heroImageAlt: "Placeholder: copper still and bottles",
    authorName: "The Squab Connect team",
    categoryId: cat("story", "business-spotlight"),
    format: "spotlight",
    relatedBusinessId: biz("copper-still-gin"),
    status: "published",
    featured: false,
    publishedAt: "2026-10-28T08:00:00Z",
    isDemo: true,
    body: doc(
      p(i("This is a sample business spotlight used to demonstrate the format. The business and quotes are fictional.")),
      h2("What the business does"),
      p("Copper Still produces small-batch gins and seasonal liqueurs, distilled, bottled and labelled by hand. Their range is sold online, at local markets and through a handful of independent shops."),
      h2("How it started"),
      p("Like many good ideas, it began at a kitchen table. A few experimental batches for friends became a market stall, which became a licence, which became a proper still — and suddenly there wasn't room at home any more."),
      quote("We needed somewhere flexible that could grow with us. Starting with one unit and adding a second when we needed it made all the difference.", "Founder, Copper Still (sample quote)"),
      h2("What makes it different"),
      p("Botanicals are sourced locally wherever possible, and every batch is numbered by hand so customers know exactly which run their bottle came from."),
      h2("What's next"),
      ol(["A winter spiced edition"], ["Monthly tasting evenings"], ["A trade range for local hospitality"]),
      cta("View Copper Still's profile", "/businesses/copper-still-gin"),
    ),
  },
  {
    id: id(30, 3),
    title: "What's happening across Squab this month",
    slug: "whats-happening-across-squab-this-month",
    standfirst: "New faces, improvements on site and the date for our next networking evening.",
    heroImageAlt: "Placeholder: Squab facility exterior",
    authorName: "The Squab Connect team",
    categoryId: cat("story", "squab-news"),
    format: "standard",
    status: "published",
    featured: false,
    publishedAt: "2026-11-01T08:00:00Z",
    isDemo: true,
    body: doc(
      p(i("Sample news round-up for demonstration purposes.")),
      h2("Welcome to our newest tenants"),
      p("We've welcomed several new businesses this month. You'll find them in the directory as their profiles go live."),
      h2("On-site improvements"),
      p("Updates to facilities and access will be announced here and in the Squab Connect newsletter."),
      h2("Save the date"),
      p("Our next networking evening is coming up soon — see the events page for details and registration."),
      cta("See upcoming events", "/events"),
    ),
  },
  {
    id: id(30, 4),
    title: "Join us at our next networking evening",
    slug: "join-us-at-our-next-networking-evening",
    standfirst: "Drinks, introductions and a chance to meet the businesses around you — no name-badge awkwardness required.",
    heroImageAlt: "Placeholder: people chatting at an evening event",
    authorName: "The Squab Connect team",
    categoryId: cat("story", "events"),
    format: "standard",
    status: "published",
    featured: false,
    publishedAt: "2026-10-22T08:00:00Z",
    isDemo: true,
    body: doc(
      p("Our networking evenings are relaxed, informal and open to every business and customer in the Squab community."),
      p("Expect short introductions from a few tenant businesses, plenty of time to chat and some (sample) local drinks."),
      cta("Register for the evening", "/events/autumn-networking-evening"),
    ),
  },
  {
    id: id(30, 5),
    title: "Five practical ways to make a small unit work harder",
    slug: "five-ways-to-make-a-small-unit-work-harder",
    standfirst: "Advice from the joiners and fit-out specialists in our community on getting more from every square metre.",
    heroImageAlt: "Placeholder: organised workshop shelving",
    authorName: "The Squab Connect team",
    categoryId: cat("story", "business-insights"),
    format: "standard",
    relatedBusinessId: biz("fieldwork-fit-out"),
    status: "published",
    featured: false,
    publishedAt: "2026-10-15T08:00:00Z",
    isDemo: true,
    body: doc(
      p(i("Sample insight article for demonstration purposes.")),
      ol(
        [b("Go vertical."), " Full-height shelving often doubles usable storage."],
        [b("Zone the space."), " Separate making, storing and admin areas, even with tape on the floor."],
        [b("Light it properly."), " Good task lighting is the cheapest productivity upgrade there is."],
        [b("Plan for deliveries."), " Keep the area nearest the door clear for goods in and out."],
        [b("Review every six months."), " Your needs change — your layout should too."],
      ),
      cta("Book a free workspace consultation", "/perks/fieldwork-free-consultation"),
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

export const events: CommunityEvent[] = [
  {
    id: id(40, 1),
    title: "Autumn Networking Evening",
    slug: "autumn-networking-evening",
    summary: "An informal evening of drinks, introductions and conversation with businesses from across the Squab community.",
    description: [
      "Join us for a relaxed evening designed to help you meet the people and businesses working alongside you.",
      "A few tenant businesses will give short introductions, followed by plenty of time to chat over drinks and light food.",
    ],
    expect: ["Short introductions from tenant businesses", "Drinks and light refreshments", "Time to meet people informally"],
    whoShouldAttend: "Anyone who runs a business from Squab, stores with us, or is curious about the community.",
    startsAt: "2026-11-26T18:00:00Z",
    endsAt: "2026-11-26T20:30:00Z",
    venue: "Sample facility — community space",
    address: "Address to be confirmed",
    registrationUrl: "https://example.com/register",
    contactEmail: "connect@example.com",
    capacity: 60,
    fullyBooked: false,
    status: "published",
    featured: true,
    relatedBusinessIds: [biz("copper-still-gin"), biz("forge-personal-training")],
    isDemo: true,
  },
  {
    id: id(40, 2),
    title: "New Year Business Breakfast",
    slug: "new-year-business-breakfast",
    summary: "Coffee, pastries and practical conversation to start the year — with a short talk on planning for growth.",
    description: [
      "Start the year with an early breakfast and a short, practical talk on planning for growth as a small business.",
    ],
    expect: ["Breakfast and coffee", "A 20-minute practical talk", "Round-table introductions"],
    whoShouldAttend: "Business owners and teams based at Squab facilities.",
    startsAt: "2027-01-21T08:00:00Z",
    endsAt: "2027-01-21T09:30:00Z",
    venue: "Sample facility — meeting room",
    registrationUrl: "https://example.com/register",
    contactEmail: "connect@example.com",
    capacity: 30,
    fullyBooked: false,
    status: "published",
    featured: false,
    relatedBusinessIds: [biz("fieldwork-fit-out")],
    isDemo: true,
  },
  {
    id: id(40, 3),
    title: "Summer Open Day",
    slug: "summer-open-day",
    summary: "Tenant businesses opened their doors for demonstrations, tastings and tours.",
    description: ["A sample past event used to demonstrate the past events archive."],
    expect: ["Open workshops", "Tastings", "Tours"],
    whoShouldAttend: "Everyone.",
    startsAt: "2026-07-18T10:00:00Z",
    endsAt: "2026-07-18T15:00:00Z",
    venue: "Sample facility",
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
  },
  community: {
    headline: "Part of the Squab community? Make yourself known.",
    body: "Whether you have a business to promote, an offer to share or simply want to meet the people around you, Squab Connect is the place to start.",
    cta: { label: "Find out more", href: "/about" },
  },
};
