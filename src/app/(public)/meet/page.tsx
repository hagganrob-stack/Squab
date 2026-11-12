import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Coffee,
  CookingPot,
  Footprints,
  Mail,
  MonitorPlay,
  Phone,
  Presentation,
  Users,
  Video,
  Wifi,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Meet at Squab: meeting, conference and interview space in Leamington Spa",
  description:
    "Hire a flexible meeting and conference room at Squab, Harbury Lane, Leamington Spa. Boardroom, classroom, theatre and U-shape layouts for up to 49 people, with presentation and videoconferencing kit.",
  alternates: { canonical: "/meet" },
};

/** Details from the Squab venue brochure (draft, November 2026). */
const PHONE = "01926 88 22 82";
const EMAIL = "enquiries@squab.co.uk";
const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

const layouts = [
  {
    name: "Boardroom",
    capacity: "Up to 24",
    body: "Round-table discussions, team meetings, panel interviews and collaborative sessions.",
    image: "/images/meet/meet-boardroom.webp",
    alt: "The meeting room set up boardroom-style around one long table",
  },
  {
    name: "Classroom",
    capacity: "Up to 16",
    body: "Structured training, courses and note-taking, with everyone facing the screen.",
    image: "/images/meet/meet-classroom.webp",
    alt: "The meeting room set up classroom-style with rows of tables",
  },
  {
    name: "Theatre",
    capacity: "Up to 49",
    note: "Seating arrangements to be confirmed",
    body: "Presentations, talks, launches and audience-led events.",
    image: "/images/meet/meet-theatre.webp",
    alt: "The meeting room set up theatre-style with rows of chairs facing a projected Squab logo",
  },
  {
    name: "U-shape",
    capacity: "Up to 38",
    body: "Interactive workshops and facilitated group sessions where everyone can see each other.",
    image: "/images/meet/meet-u-shape.webp",
    alt: "The meeting room set up as a U-shape of tables facing the screen",
  },
] as const;

const uses = [
  {
    icon: Presentation,
    title: "Conferences & presentations",
    body: "Host a talk, product launch, client briefing or networking event for up to 49 guests in a theatre layout, with a projector and laptop connection ready to go.",
    tip: "Best layout: Theatre",
  },
  {
    icon: Users,
    title: "Meetings & away days",
    body: "Bring the team together for board meetings, planning days or workshops away from the usual desk. Just outside Leamington Spa, with parking on site.",
    tip: "Best layouts: Boardroom or U-shape",
  },
  {
    icon: Footprints,
    title: "Interviews & assessment days",
    body: "A calm, professional setting for panel interviews, recruitment open days and assessment centres. Set the room up boardroom-style for a panel, or classroom-style for group tasks and tests. Candidates can wait over a coffee at The Hide café when it's open.",
    tip: "Best layouts: Boardroom or Classroom",
  },
  {
    icon: MonitorPlay,
    title: "Training & courses",
    body: "Run courses, CPD sessions and hands-on training with space to take notes. Videoconferencing means remote trainers or attendees can join too.",
    tip: "Best layouts: Classroom or U-shape",
  },
] as const;

const facilities = [
  { icon: MonitorPlay, text: "Projector with HDMI and ClickShare laptop connection" },
  { icon: Video, text: "Videoconferencing equipment" },
  { icon: Wifi, text: "Wi-Fi" },
  { icon: Coffee, text: "Refreshment station" },
  { icon: CookingPot, text: "Kitchenette with hot-water tap, dishwasher and oven" },
  { icon: Car, text: "On-site customer parking and overflow parking" },
] as const;

export default function MeetPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src="/images/meet/meet-boardroom.webp"
          alt="Squab's meeting room set up boardroom-style"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/65 to-black/30 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/65 lg:to-black/10" />
        <div className="container-page flex min-h-[32rem] flex-col justify-end py-14 lg:min-h-[36rem] lg:justify-center lg:py-20">
          <div className="max-w-2xl">
            <span aria-hidden className="mb-4 block h-1 w-12 rounded-full bg-squab-500" />
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-squab-300">Meet at Squab • Leamington Spa</p>
            <h1 className="text-display font-extrabold">
              Meet. Present. <span className="text-squab-400">Connect.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              A flexible meeting and conference room at Squab, Harbury Lane, for business meetings, training, workshops, interviews and presentations. Choose the layout that suits your event, with presentation kit, videoconferencing and a refreshment area on hand.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#enquire" size="lg">
                Enquire about your event <ArrowRight aria-hidden />
              </ButtonLink>
              <ButtonLink href="#layouts" size="lg" variant="onDark">
                See room layouts
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Key numbers */}
      <section aria-label="At a glance" className="bg-squab-500 text-ink">
        <dl className="container-page grid grid-cols-2 gap-4 py-6 sm:grid-cols-4">
          {[
            ["Up to 49", "guests, theatre-style"],
            ["4", "room layouts"],
            ["ClickShare", "& videoconferencing"],
            ["On-site", "& overflow parking"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-2xl font-extrabold sm:text-3xl">{value}</dd>
              <dd className="text-sm font-semibold text-ink/75">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Uses */}
      <Section aria-labelledby="uses">
        <SectionHeader
          id="uses"
          eyebrow="What's it for?"
          title="Conferences, meetings and interviews"
          description="One adaptable room, set up the way your day needs it."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {uses.map(({ icon: Icon, title, body, tip }) => (
            <article key={title} className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line sm:p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-squab-50 text-squab-700"><Icon aria-hidden className="size-5" /></span>
              <h3 className="mt-5 text-xl font-extrabold">{title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-stone-muted">{body}</p>
              <p className="mt-4 text-sm font-bold text-squab-700">{tip}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Layouts */}
      <Section id="layouts" aria-labelledby="layouts-heading" className="bg-white">
        <SectionHeader
          id="layouts-heading"
          eyebrow="Choose your room layout"
          title="Four ways to set up the room"
          description="Tell us your numbers and the feel you're after, and we'll have the room ready for you."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {layouts.map((l) => (
            <figure key={l.name} className="min-w-0">
              <div className="relative">
                <Media src={l.image} alt={l.alt} ratio="4/3" sizes="(min-width: 640px) 50vw, 100vw" />
                <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">
                  {l.capacity} people
                </span>
              </div>
              <figcaption className="mt-4">
                <h3 className="text-xl font-extrabold">{l.name}</h3>
                <p className="mt-1 text-stone-muted">{l.body}</p>
                {"note" in l && <p className="mt-1 text-sm italic text-stone-muted">{l.note}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Facilities */}
      <Section aria-labelledby="facilities">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeader id="facilities" eyebrow="Facilities at a glance" title="Everything you need on the day" className="mb-0" />
            <Link href="/the-hide" className="group mt-8 flex items-center gap-4 rounded-[var(--radius-card)] bg-ink p-5 text-white">
              <Image src="/images/partners/the-hide-logo.png" alt="" width={56} height={56} className="shrink-0 rounded-full bg-white" />
              <span>
                <span className="block font-display font-extrabold">The Hide café is on site</span>
                <span className="text-sm text-white/75">Coffee, breakfasts and lunches nearby, subject to opening hours →</span>
              </span>
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {facilities.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 rounded-[var(--radius-card)] bg-white p-4 ring-1 ring-line">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-squab-700" />
                <span className="font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Visit */}
      <Section aria-labelledby="visit" className="bg-cream">
        <SectionHeader id="visit" eyebrow="Planning your visit" title="Getting here" />
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[var(--radius-card)] bg-white p-6">
            <h3 className="font-extrabold">Where</h3>
            <p className="mt-2 text-stone-muted">Squab Leamington Spa, Harbury Lane, Bishops Tachbrook, Leamington Spa CV33 9QB.</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-6">
            <h3 className="font-extrabold">Parking</h3>
            <p className="mt-2 text-stone-muted">Please park only in the designated customer spaces or the overflow car park. The property beside reception is a private residence, so please don&rsquo;t park there.</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-6">
            <h3 className="font-extrabold">On site</h3>
            <p className="mt-2 text-stone-muted">Squab is a working site. Follow the marked pedestrian routes and look out for vehicles.</p>
          </div>
        </div>
      </Section>

      {/* Enquire */}
      <Section id="enquire" aria-labelledby="enquire-heading">
        <div className="overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white lg:grid lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-12">
            <span aria-hidden className="mb-4 block h-1 w-12 rounded-full bg-squab-500" />
            <h2 id="enquire-heading" className="text-headline font-extrabold">Enquire about your event</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Tell us your preferred date, timings, guest numbers and layout. We&rsquo;ll confirm availability, pricing, access arrangements and the facilities included before you book.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={mailto("Meeting room enquiry")} size="lg">
                <Mail aria-hidden /> Email the team
              </ButtonLink>
              <ButtonLink href={`tel:${PHONE.replace(/\s/g, "")}`} size="lg" variant="onDark">
                <Phone aria-hidden /> {PHONE}
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-white/65">
              Choose option 2 when you call, or email <a className="font-semibold text-white underline underline-offset-4" href={mailto("Meeting room enquiry")}>{EMAIL}</a>.
            </p>
          </div>
          <div className="relative hidden min-h-[20rem] lg:block">
            <Image src="/images/meet/meet-u-shape.webp" alt="" fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </Section>
    </>
  );
}
