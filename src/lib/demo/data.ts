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
    location: "Unit 13, Squab Hall Farm (Leamington studio)",
    squabConnection: "Rise and Reform’s Leamington Spa studio is at Unit 13, Squab Hall Farm. It also has studios in Rugby, Stratford-upon-Avon and Kenilworth.",
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
    location: "Unit 8, Squab Hall",
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
    location: "Squab Hall Farm",
    featured: true,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 5),
    name: "The Hide Cafe",
    slug: "the-hide-cafe",
    kind: "Café",
    tagline: "Tucked away. Worth finding.",
    description:
      "A friendly independent café at Squab Hall Farm, serving freshly prepared breakfasts, lunches, homemade treats and great coffee in peaceful rural surroundings.",
    services: ["Breakfast and lunch", "Coffee, cakes and treats", "Catering", "The Hideaway private room"],
    logoUrl: img("the-hide-logo.png"),
    coverImageUrl: img("the-hide-cafe-cover.webp"),
    website: "https://squabhallfarm.co.uk/services/cafe/",
    email: "thehide@squab.co.uk",
    phone: "07939 411269",
    social: {},
    location: "Squab Hall Farm, Harbury Lane, Leamington Spa",
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
    location: "Squab Hall",
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
  {
    id: id(10, 8),
    name: "YouNeek Productions",
    slug: "youneek-productions",
    kind: "Video production",
    tagline: "Video, photography and animation for brands.",
    description:
      "YouNeek Productions creates video, photography and animation for brands, from its purpose-built production studio at Squab Hall Farm.",
    services: ["Video production", "Photography", "Animation", "Studio hire"],
    differentiator: "Winner of Videography Studio of the Year at the My Local Awards West Midlands 2026.",
    website: "https://www.youneekproductions.co.uk/",
    social: {},
    location: "Unit 12, Squab Hall",
    featured: false,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 9),
    name: "Apex Connected",
    slug: "apex-connected",
    kind: "Managed print services",
    tagline: "Managed print and document solutions.",
    description:
      "Apex Connected delivers managed print services and document solutions that help businesses reduce costs, improve efficiency and take control of their printing.",
    services: ["Managed print services", "Printers and copiers", "Document solutions"],
    website: "https://www.apexconnected.com/",
    social: {},
    location: "Squab Hall",
    featured: false,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 10),
    name: "Bio-Vent Systems",
    slug: "bio-vent-systems",
    kind: "Duct cleaning",
    tagline: "Duct cleaning and grease management.",
    description: "Bio-Vent Systems provides duct cleaning and grease management services. Its office is at Squab Hall.",
    services: ["Duct cleaning", "Grease management"],
    website: "https://bioventsystems.com/",
    social: {},
    location: "Squab Hall",
    featured: false,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 11),
    name: "Young People First",
    slug: "young-people-first",
    kind: "Youth charity",
    tagline: "Clubs, cafés and mentoring for young people.",
    description:
      "Young People First (Midlands) is a charity working with disadvantaged young people aged 8–18 and their families in Leamington, through clubs, cafés and mentoring.",
    services: ["Youth clubs", "Cafés", "Mentoring"],
    website: "https://www.youngpeoplefirst.org.uk/",
    social: {},
    location: "Container 10, Squab Hall",
    featured: false,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 12),
    name: "Squab Removals",
    slug: "squab-removals",
    kind: "Removals",
    tagline: "Removals from the Squab Group.",
    description: "Squab Removals is part of the Squab Group, providing removals from its base at Squab Hall.",
    services: ["Removals"],
    website: "https://squab.co.uk/",
    social: {},
    location: "Squab Hall",
    featured: false,
    status: "active",
    isDemo: false,
  },
  {
    id: id(10, 13),
    name: "Pigeon Enterprises",
    slug: "pigeon-enterprises",
    kind: "",
    tagline: "",
    description: "",
    services: [],
    social: {},
    location: "Squab Hall",
    featured: false,
    status: "active",
    isDemo: false,
    listingOnly: true,
  },
  // Businesses based at Squab (list supplied by Squab). Names only until
  // details are verified — see listingOnly.
  { id: id(10, 20), name: "GENEO Software", slug: "geneo-software", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 21), name: "Peter Staunton Design", slug: "peter-staunton-design", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 22), name: "Croco Print", slug: "croco-print", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 23), name: "Tycoonita", slug: "tycoonita", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 24), name: "Playground Games", slug: "playground-games", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 25), name: "Karabo", slug: "karabo", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 26), name: "The Myton Hospices", slug: "the-myton-hospices", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 27), name: "Guy's Gift", slug: "guys-gift", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 28), name: "Rochester Sensors UK", slug: "rochester-sensors-uk", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 29), name: "Warwickshire Hearts", slug: "warwickshire-hearts", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 30), name: "The Luca Foundation", slug: "the-luca-foundation", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 31), name: "Argo Nautical", slug: "argo-nautical", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 32), name: "Coda Security", slug: "coda-security", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 33), name: "Links Therapy Company", slug: "links-therapy-company", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 34), name: "Dragos Security UK", slug: "dragos-security-uk", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 35), name: "Warwick Lanterne Rouge Cycling", slug: "warwick-lanterne-rouge-cycling", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 36), name: "The Cycling GK", slug: "the-cycling-gk", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 37), name: "Leamington and County Golf Club", slug: "leamington-and-county-golf-club", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 38), name: "The Bed Factory", slug: "the-bed-factory", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 39), name: "JP Personal Training", slug: "jp-personal-training", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 40), name: "Blue Diamond", slug: "blue-diamond", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 41), name: "Firesafetysolutions UK", slug: "firesafetysolutions-uk", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 42), name: "Entrust Care Partnership", slug: "entrust-care-partnership", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 43), name: "Protoform Industries", slug: "protoform-industries", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 44), name: "Four Walls Building Company", slug: "four-walls-building-company", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 45), name: "Ghost Design Consultants", slug: "ghost-design-consultants", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 46), name: "PAWS Therapy Dog Training", slug: "paws-therapy-dog-training", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 47), name: "HWD Solutions", slug: "hwd-solutions", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 48), name: "Silverleaf Advisory", slug: "silverleaf-advisory", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 49), name: "Warwickshire Gin Company", slug: "warwickshire-gin-company", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 50), name: "Helion & Co", slug: "helion-and-co", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 51), name: "Inconosis", slug: "inconosis", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 52), name: "Parkinsons", slug: "parkinsons", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 53), name: "Raising Robots", slug: "raising-robots", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 54), name: "Salvo Digital Print", slug: "salvo-digital-print", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 55), name: "The Complete Camera Company", slug: "the-complete-camera-company", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 56), name: "The Warwickshire Kitchen Company", slug: "the-warwickshire-kitchen-company", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 57), name: "Medic To Medics", slug: "medic-to-medics", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 58), name: "Central England Training", slug: "central-england-training", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 59), name: "Wet Lab", slug: "wet-lab", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 60), name: "Reach", slug: "reach", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 61), name: "Kidvelo Bikes", slug: "kidvelo-bikes", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 62), name: "Smart Image Furniture", slug: "smart-image-furniture", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 63), name: "Scenariio", slug: "scenariio", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
  { id: id(10, 64), name: "Rug Repair Company", slug: "rug-repair-company", kind: "", tagline: "", description: "", services: [], social: {}, featured: false, status: "active", isDemo: false, listingOnly: true },
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
    id: id(30, 6),
    title: "Squab is sponsoring the Leamington Christmas Tree Festival",
    slug: "squab-sponsors-leamington-christmas-tree-festival",
    standfirst: "We’re decorating a tree and you’ll find us in the programme at this year’s festival at All Saints’ Parish Church, 28 November – 6 December.",
    heroImageUrl: "/images/events/leamington-tree-festival-2026.webp",
    heroImageAlt: "Squab is sponsoring the Leamington Christmas Tree Festival 2026, Saturday 28 November to Sunday 6 December at All Saints’ Parish Church",
    authorName: "The Squab Connect team",
    categoryId: cat("events"),
    format: "standard",
    status: "published",
    featured: false,
    publishedAt: "2026-11-07T09:00:00Z",
    isDemo: false,
    body: doc(
      p("We’re delighted to be sponsoring the ", b("Leamington Christmas Tree Festival 2026"), ". Now in its fifth year, the festival fills All Saints’ Parish Church with more than 60 decorated trees from local organisations, schools, charities and families — and last year it welcomed more than 4,600 visitors."),
      h2("Find the Squab tree"),
      p("We’re decorating our very own tree this year, and you’ll find Squab in the festival programme too. Come along, see what we’ve created and vote for your favourite in the People’s Choice — the winners are announced on Sunday 6 December."),
      h2("What’s on"),
      ul(
        [b("Nine days of trees"), ", Saturday 28 November to Sunday 6 December"],
        ["Live music and performances, with the official opening hosted by the BBC’s Mary Rhodes"],
        ["Free family decoration workshops on the opening weekend — just drop in"],
        ["A pop-up Christmas Gift Festival on Saturday 5 December"],
        ["Late opening until 8pm on Thursday 3 December, with mulled wine and mince pies"],
      ),
      h2("Supporting ARC"),
      p("This year’s charity partner is ARC (Achieving Results in Communities), which has spent 15 years improving health and wellbeing across Warwick District through a connection with nature."),
      h2("Plan your visit"),
      p("All Saints’ Parish Church, Victoria Terrace, Leamington Spa CV31 1AA — a 5–10 minute walk from Leamington station, with buses stopping outside. The church is accessible apart from one small display area, and there’s Blue Badge parking on Priory Terrace."),
      p("Full details and the festival programme are on the ", a("organiser’s website", "https://www.whittleproductions.co.uk/leam-tree-fest-202679c9a72a"), "."),
      cta("Opening times & event details", "/events/leamington-christmas-tree-festival-2026"),
    ),
  },
  {
    id: id(30, 5),
    title: "Padel is coming to Squab",
    slug: "padel-is-coming-to-squab",
    standfirst: "Plans for three indoor padel courts, changing rooms and a café at Squab Hall Farm have been approved. Watch this space.",
    heroImageUrl: "/images/squab/aerial.webp",
    heroImageAlt: "Aerial view of the Squab site",
    authorName: "The Squab Connect team",
    categoryId: cat("squab-news"),
    format: "standard",
    status: "published",
    featured: true,
    publishedAt: "2026-11-07T10:00:00Z",
    isDemo: false,
    body: doc(
      p(b("Big news: padel is coming to Squab.")),
      p("Warwick District Council’s planning committee has approved plans for a new indoor padel centre at Squab Hall Farm, off Harbury Lane near Leamington Spa. Councillors backed the scheme for the local jobs and the community health and sport it will bring, and Bishop’s Tachbrook Parish Council supported it too."),
      h2("What’s planned"),
      ul(
        [b("Three indoor padel courts"), " — play whatever the weather"],
        ["Changing rooms"],
        ["A café"],
        ["Open 7am to 11pm, seven days a week"],
        ["Around six new local jobs"],
      ),
      p("The courts will be created inside an existing building on the site, right alongside the businesses, tenants and customers who already make Squab their base."),
      h2("What is padel?"),
      p("Padel is one of the fastest-growing sports in the UK. It’s played in doubles on an enclosed court, a little like a mix of tennis and squash: easy to pick up, very sociable and great fun at any level."),
      h2("Watch this space"),
      p("We’ll share opening dates, booking details and first-look photos here on Squab Connect as soon as we have them."),
      p("Read the local coverage from ", a("Warwick Nub News", "https://warwick.nub.news/news/local-news/padel-courts-to-be-built-against-officers-recommendation-311625"), " and ", a("Insider Media", "https://www.insidermedia.com/news/midlands/warwickshire-padel-centre-green-lit-contrary-to-officers-recommendation"), "."),
      cta("See what’s on at Squab", "/events"),
    ),
  },
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
    featured: false,
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
    id: id(40, 5),
    title: "Leamington Christmas Tree Festival 2026",
    slug: "leamington-christmas-tree-festival-2026",
    summary: "More than 60 decorated trees, live music and festive fun at All Saints’ Parish Church — including a tree from Squab, proud sponsor of this year’s festival.",
    description: [
      "The Leamington Christmas Tree Festival returns to All Saints’ Parish Church for nine days of trees, live music, festive entertainment and family activities.",
      "Squab is proud to sponsor this year’s festival. We’re decorating our own tree and you’ll find us in the festival programme — come and find the Squab tree, and vote for your favourite in the People’s Choice.",
    ],
    expect: [
      "More than 60 trees decorated by local organisations, schools, charities and families",
      "Live music and performances, with the official opening hosted by the BBC’s Mary Rhodes",
      "Free family decoration workshops on the opening weekend",
      "A pop-up Christmas Gift Festival on Saturday 5 December",
      "Late opening until 8pm on Thursday 3 December, with mulled wine and mince pies",
      "People’s Choice Awards on Sunday 6 December",
    ],
    whoShouldAttend: "Everyone — families, friends and anyone who loves Christmas.",
    imageUrl: "/images/events/leamington-tree-festival-2026.webp",
    startsAt: "2026-11-28T10:00:00Z",
    endsAt: "2026-12-06T17:00:00Z",
    schedule: [
      { day: "Saturday 28 Nov", time: "10am–5pm", note: "Free family decoration workshops, 1–5pm" },
      { day: "Sunday 29 Nov", time: "12–5pm", note: "Free family decoration workshops, 1–5pm · Advent Service, 6.30pm" },
      { day: "Monday 30 Nov", time: "10am–5pm" },
      { day: "Tuesday 1 Dec", time: "10am–5pm" },
      { day: "Wednesday 2 Dec", time: "10am–5pm" },
      { day: "Thursday 3 Dec", time: "10am–8pm", note: "Late opening · mulled wine and mince pies, 5–8pm" },
      { day: "Friday 4 Dec", time: "10am–5pm" },
      { day: "Saturday 5 Dec", time: "10am–5pm", note: "Pop-up Christmas Gift Festival · Charity Concert, 6.30pm" },
      { day: "Sunday 6 Dec", time: "12–5pm", note: "Raffle draw and People’s Choice Awards, 3pm" },
    ],
    venue: "All Saints’ Parish Church",
    address: "Victoria Terrace, Leamington Spa CV31 1AA",
    registrationUrl: "https://www.whittleproductions.co.uk/leam-tree-fest-202679c9a72a",
    registrationLabel: "Festival details & programme",
    fullyBooked: false,
    status: "published",
    featured: true,
    relatedBusinessIds: [],
    isDemo: false,
  },
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
    highlight: "we connect.",
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
