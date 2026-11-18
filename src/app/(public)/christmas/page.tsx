import type { Metadata } from "next";
import Image from "next/image";
import { KeyRound, Mail, Phone } from "lucide-react";
import { Snowfall } from "@/components/shared/snowfall";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Christmas opening times 2026 at Squab",
  description:
    "Squab Christmas and New Year 2026: customer access 8am–8pm every day; office open 9am–3pm on 24, 29, 30 and 31 December, closed 25–28 December and New Year's Day.",
  alternates: { canonical: "/christmas" },
};

const PHONE = "01926 88 22 82";
const EMAIL = "enquiries@squab.co.uk";

type Day = { weekday: string; day: string; month: string; label?: string; open: boolean };

const days: Day[] = [
  { weekday: "Thu", day: "24", month: "Dec", label: "Christmas Eve", open: true },
  { weekday: "Fri", day: "25", month: "Dec", label: "Christmas Day", open: false },
  { weekday: "Sat", day: "26", month: "Dec", label: "Boxing Day", open: false },
  { weekday: "Sun", day: "27", month: "Dec", open: false },
  { weekday: "Mon", day: "28", month: "Dec", label: "Bank holiday", open: false },
  { weekday: "Tue", day: "29", month: "Dec", open: true },
  { weekday: "Wed", day: "30", month: "Dec", open: true },
  { weekday: "Thu", day: "31", month: "Dec", label: "New Year's Eve", open: true },
  { weekday: "Fri", day: "1", month: "Jan", label: "New Year's Day", open: false },
];

export default function ChristmasPage() {
  return (
    <>
      <Snowfall />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src="/images/squab/christmas-lights.webp"
          alt="Colourful Christmas fairy lights glowing on a wooden floor"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/30 lg:bg-gradient-to-r lg:from-black/85 lg:via-black/50 lg:to-black/10" />
        <div className="container-page flex min-h-[30rem] flex-col justify-end py-14 lg:min-h-[34rem] lg:justify-center lg:py-20">
          <div className="max-w-2xl">
            <span aria-hidden className="mb-4 block h-1 w-12 rounded-full bg-squab-500" />
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-squab-300">Christmas &amp; New Year 2026</p>
            <h1 className="text-display font-extrabold">
              Festive <span className="text-squab-400">opening times</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Here&rsquo;s when the Squab office is open over Christmas and New Year. Customer access to your unit stays 8am to 8pm, seven days a week, right through the holidays. From all of us at Squab, thank you for a brilliant year, and have a very merry Christmas.
            </p>
          </div>
        </div>
      </section>

      {/* Summary strip */}
      <section aria-label="At a glance" className="bg-squab-500 text-ink">
        <div className="container-page grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
          {[
            ["8am – 8pm", "Customer access, 7 days a week"],
            ["9am – 3pm", "Office: 24, 29, 30 & 31 December"],
            ["Office closed", "25–28 December & 1 January"],
            ["Back to normal", "from Saturday 2 January"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-2xl font-extrabold">{value}</p>
              <p className="text-sm font-semibold text-ink/75">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer access */}
      <section aria-labelledby="access" className="container-page pt-10 sm:pt-14">
        <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line sm:flex-row sm:items-center sm:p-8">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-squab-500 text-ink">
            <KeyRound aria-hidden className="size-7" />
          </span>
          <div>
            <h2 id="access" className="text-2xl font-extrabold">Customer access stays 8am – 8pm, 7 days a week</h2>
            <p className="mt-1 text-stone-muted">
              You can still get to your unit as normal throughout Christmas and New Year, including on days when the office is closed.
            </p>
          </div>
        </div>
      </section>

      {/* Day by day */}
      <Section aria-labelledby="days" className="pt-10 sm:pt-12">
        <SectionHeader id="days" eyebrow="Day by day" title="Office opening times" description="Times are for the Squab office at Harbury Lane, Leamington Spa. Customer access is unaffected." />
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {days.map((d) => (
            <li
              key={`${d.month}-${d.day}`}
              className={cn(
                "flex flex-col rounded-[var(--radius-card)] p-5 ring-1",
                d.open ? "bg-white ring-line" : "bg-ink/[0.04] ring-line/70",
              )}
            >
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-stone-muted">{d.weekday}</span>
              <span className="mt-1 font-display text-3xl font-extrabold leading-none">
                {d.day} <span className="text-lg text-stone-muted">{d.month}</span>
              </span>
              <span className="mt-1 min-h-5 text-sm text-stone-muted">{d.label ?? ""}</span>
              <span
                className={cn(
                  "mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-bold",
                  d.open ? "bg-squab-500 text-ink" : "bg-ink text-white",
                )}
              >
                {d.open ? "9am – 3pm" : "Closed"}
              </span>
            </li>
          ))}
          <li className="col-span-2 flex flex-col justify-center rounded-[var(--radius-card)] bg-squab-50 p-5 ring-1 ring-squab-200 sm:col-span-3 lg:col-span-5">
            <span className="font-display text-xl font-extrabold">Back to normal from Saturday 2 January</span>
            <span className="mt-1 text-stone-muted">Our usual opening hours return after New Year&rsquo;s Day.</span>
          </li>
        </ol>
      </Section>

      {/* Contact */}
      <Section aria-labelledby="contact" className="bg-white">
        <div className="rounded-[var(--radius-panel)] bg-ink p-8 text-white sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <h2 id="contact" className="text-headline font-extrabold">Need us before the break?</h2>
            <p className="mt-3 text-lg text-white/80">
              Get in touch while the office is open, or drop us an email and we&rsquo;ll reply as soon as we&rsquo;re back.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <ButtonLink href={`mailto:${EMAIL}`} size="lg">
              <Mail aria-hidden /> Email us
            </ButtonLink>
            <ButtonLink href={`tel:${PHONE.replace(/\s/g, "")}`} size="lg" variant="onDark">
              <Phone aria-hidden /> {PHONE}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
