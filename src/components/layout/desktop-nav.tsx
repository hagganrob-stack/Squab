"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Clock, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/media";
import { cn } from "@/lib/utils";
import type { MegaMenuData } from "./mega-menu-data";
import { isActive, primaryNav } from "./nav-items";

type Href = (typeof primaryNav)[number]["href"];
const PANELS: Partial<Record<Href, true>> = {
  "/perks": true,
  "/businesses": true,
  "/news": true,
  "/events": true,
  "/meet": true,
  "/the-hide": true,
  "/about": true,
};

export function DesktopNav({ menu }: { menu: MegaMenuData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Href | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const openSoon = (href: Href) => {
    clear();
    timer.current = setTimeout(() => setOpen(href), open ? 0 : 90);
  };
  const closeSoon = () => {
    clear();
    timer.current = setTimeout(() => setOpen(null), 160);
  };
  const close = useCallback(() => {
    clear();
    setOpen(null);
  }, []);

  // Close on navigation (adjusting state during render, as React recommends) and on Escape.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const link = navRef.current?.querySelector<HTMLAnchorElement>(`a[data-top="${open}"]`);
      close();
      link?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);
  useEffect(() => clear, []);

  return (
    <nav ref={navRef} aria-label="Main" className="hidden lg:block" onPointerLeave={closeSoon}>
      <ul className="flex items-center gap-0.5 xl:gap-1">
        {primaryNav.map((item) => {
          const active = isActive(pathname, item.href);
          const hasPanel = !!PANELS[item.href];
          const isOpen = open === item.href;
          return (
            <li
              key={item.href}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                if (hasPanel) openSoon(item.href);
                else closeSoon();
              }}
              onFocus={() => (hasPanel ? (clear(), setOpen(item.href)) : close())}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeSoon();
              }}
            >
              <Link
                href={item.href}
                data-top={item.href}
                aria-current={active ? "page" : undefined}
                aria-expanded={hasPanel ? isOpen : undefined}
                onClick={close}
                className={cn(
                  "relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors xl:px-3.5 xl:text-[0.9375rem]",
                  active || isOpen ? "text-ink" : "text-stone-muted hover:text-ink",
                  isOpen && "bg-white shadow-card ring-1 ring-line",
                )}
              >
                {item.label}
                {hasPanel && (
                  <ChevronDown
                    aria-hidden
                    className={cn("size-3.5 opacity-60 transition-transform duration-200", isOpen && "rotate-180 opacity-100")}
                  />
                )}
                {active && !isOpen && (
                  <span aria-hidden className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-squab-500 xl:inset-x-3.5" />
                )}
              </Link>
              {hasPanel && (
                <Panel open={isOpen}>
                  <PanelContent href={item.href} menu={menu} onNavigate={close} />
                </Panel>
              )}
            </li>
          );
        })}
      </ul>
      {/* Dim the page behind an open panel. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-full -z-10 h-screen bg-ink/25 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
    </nav>
  );
}

function Panel({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      inert={!open}
      className={cn(
        "absolute inset-x-0 top-full border-t border-line bg-paper shadow-[0_30px_60px_-20px_rgba(26,26,26,0.35)] transition-[opacity,transform,visibility] duration-200 ease-out",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
      )}
    >
      <div aria-hidden className="h-1 bg-gradient-to-r from-squab-500 via-squab-400 to-squab-600" />
      <div className="container-page grid grid-cols-12 gap-8 py-8">{children}</div>
    </div>
  );
}

function Intro({
  eyebrow,
  title,
  body,
  cta,
  href,
  image,
  onNavigate,
  external,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image?: string;
  onNavigate: () => void;
  external?: boolean;
}) {
  const className =
    "group relative isolate col-span-4 flex min-h-64 flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-ink p-6 text-white";
  const inner = (
    <>
      {image && (
        <>
          <Image src={image} alt="" fill sizes="30vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
        </>
      )}
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-squab-300">{eyebrow}</p>
      <p className="mt-2 font-display text-2xl font-extrabold leading-tight">{title}</p>
      <p className="mt-2 text-sm text-white/80">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-squab-300 group-hover:text-white">
        {cta} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </>
  );
  return external ? (
    <a href={href} className={className} onClick={onNavigate}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className} onClick={onNavigate}>
      {inner}
    </Link>
  );
}

const tile =
  "group flex min-w-0 rounded-[var(--radius-card)] bg-white ring-1 ring-line transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift hover:ring-squab-300";

function PanelContent({ href, menu, onNavigate }: { href: Href; menu: MegaMenuData; onNavigate: () => void }) {
  switch (href) {
    case "/perks":
      return (
        <>
          <Intro
            eyebrow="Squab Perks"
            title="A little extra from your Squab community"
            body="Exclusive offers from businesses based at Squab. Show your code or use it when you book."
            cta="Browse all perks"
            href="/perks"
            image="/images/squab/lounge.webp"
            onNavigate={onNavigate}
          />
          <div className="col-span-8 grid grid-cols-2 gap-3">
            {menu.perks.map((p) => (
              <Link key={p.slug} href={`/perks/${p.slug}`} onClick={onNavigate} className={cn(tile, "overflow-hidden")}>
                <span className="flex w-24 shrink-0 flex-col items-center justify-center bg-squab-500 px-2 text-center text-ink">
                  <span className="font-display text-2xl font-extrabold leading-none">{p.value}</span>
                  {p.caption && <span className="mt-1 text-[0.65rem] font-bold uppercase leading-tight tracking-wide">{p.caption}</span>}
                </span>
                <span className="relative flex min-w-0 flex-1 items-center gap-3 border-l-2 border-dashed border-squab-200 p-4">
                  <Logo src={p.logoUrl} name={p.business} size={40} dark={p.logoDark} />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-stone-muted">{p.business}</span>
                    <span className="line-clamp-2 font-bold leading-snug group-hover:text-squab-700">{p.title}</span>
                  </span>
                </span>
              </Link>
            ))}
            <a
              href="mailto:enquiries@squab.co.uk?subject=Squab%20Connect%20offer"
              onClick={onNavigate}
              className="col-span-2 inline-flex items-center gap-2 text-sm font-semibold text-stone-muted hover:text-ink"
            >
              <Mail aria-hidden className="size-4 text-squab-700" /> Run a business at Squab? Email us to promote an offer
            </a>
          </div>
        </>
      );

    case "/businesses":
      return (
        <>
          <Intro
            eyebrow="The Network"
            title="Meet the businesses around you"
            body={`${menu.businessCount} businesses, makers, studios and clubs are based at Squab.`}
            cta="Explore the network"
            href="/businesses"
            image="/images/squab/aerial.webp"
            onNavigate={onNavigate}
          />
          <div className="col-span-8 grid grid-cols-3 content-start gap-3">
            {menu.businesses.map((b) => (
              <Link key={b.slug} href={`/businesses/${b.slug}`} onClick={onNavigate} className={cn(tile, "items-center gap-3 p-4")}>
                <Logo src={b.logoUrl} name={b.name} size={44} dark={b.logoDark} />
                <span className="min-w-0">
                  <span className="block truncate font-bold group-hover:text-squab-700">{b.name}</span>
                  <span className="block truncate text-sm text-stone-muted">{b.kind}</span>
                </span>
              </Link>
            ))}
          </div>
        </>
      );

    case "/news":
      return (
        <>
          <Intro
            eyebrow="Squab News"
            title="What's happening at Squab"
            body="Big announcements, business spotlights and community news from across Squab."
            cta="All news"
            href="/news"
            image="/images/padel/padel-net.webp"
            onNavigate={onNavigate}
          />
          <div className="col-span-8 grid grid-cols-3 gap-4">
            {menu.stories.map((s) => (
              <Link key={s.slug} href={`/news/${s.slug}`} onClick={onNavigate} className={cn(tile, "flex-col overflow-hidden")}>
                <span className="relative block aspect-[16/10] overflow-hidden bg-mist">
                  {s.image && (
                    <Image src={s.image} alt="" fill sizes="22vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                </span>
                <span className="flex flex-1 flex-col p-4">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-squab-700">{s.category}</span>
                  <span className="mt-1 line-clamp-3 font-bold leading-snug">{s.title}</span>
                  <span className="mt-auto pt-2 text-xs text-stone-muted">{s.date}</span>
                </span>
              </Link>
            ))}
          </div>
        </>
      );

    case "/events":
      return (
        <>
          <Intro
            eyebrow="Events"
            title="Meet the people around you"
            body="Squab Networking, community events and days out. Free to book for Squab Networking."
            cta="All events"
            href="/events"
            image="/images/squab/networking-room.webp"
            onNavigate={onNavigate}
          />
          <ul className="col-span-8 grid grid-cols-1 content-start gap-3">
            {menu.events.map((e) => (
              <li key={e.slug}>
                <Link href={`/events/${e.slug}`} onClick={onNavigate} className={cn(tile, "items-center gap-4 p-3 pr-5")}>
                  <span className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-ink text-white">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-squab-300">{e.month}</span>
                    <span className="font-display text-xl font-extrabold leading-none">{e.day}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold group-hover:text-squab-700">{e.title}</span>
                    <span className="mt-0.5 flex flex-wrap gap-x-4 text-sm text-stone-muted">
                      <span className="inline-flex items-center gap-1"><Clock aria-hidden className="size-3.5" /> {e.when}</span>
                      <span className="inline-flex items-center gap-1"><MapPin aria-hidden className="size-3.5" /> {e.venue}</span>
                    </span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-stone-muted transition-transform group-hover:translate-x-1 group-hover:text-squab-700" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      );

    case "/meet":
      return (
        <>
          <Intro
            eyebrow="Meet at Squab"
            title="Meet. Present. Connect."
            body="A flexible meeting and conference room for meetings, training, interviews and events of up to 49 people."
            cta="Explore the room"
            href="/meet"
            image="/images/meet/meet-boardroom.webp"
            onNavigate={onNavigate}
          />
          <div className="col-span-8 grid grid-cols-4 gap-3">
            {[
              ["Boardroom", "Up to 24", "meet-boardroom"],
              ["Classroom", "Up to 16", "meet-classroom"],
              ["Theatre", "Up to 49", "meet-theatre"],
              ["U-shape", "Up to 38", "meet-u-shape"],
            ].map(([name, cap, img]) => (
              <Link key={name} href="/meet#layouts" onClick={onNavigate} className={cn(tile, "flex-col overflow-hidden")}>
                <span className="relative block aspect-[4/3] overflow-hidden bg-mist">
                  <Image src={`/images/meet/${img}.webp`} alt="" fill sizes="16vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </span>
                <span className="p-3">
                  <span className="block font-bold group-hover:text-squab-700">{name}</span>
                  <span className="text-sm text-stone-muted">{cap} people</span>
                </span>
              </Link>
            ))}
            <Link
              href="/meet#enquire"
              onClick={onNavigate}
              className="col-span-4 inline-flex items-center gap-2 text-sm font-semibold text-stone-muted hover:text-ink"
            >
              <Mail aria-hidden className="size-4 text-squab-700" /> Enquire about conferences, meetings and interviews
            </Link>
          </div>
        </>
      );

    case "/the-hide":
      return (
        <>
          <Intro
            eyebrow="The Hide by Squab"
            title="Tucked away. Worth finding."
            body="Fresh breakfasts, lunches, homemade treats and great coffee at Squab Hall Farm."
            cta="Visit The Hide"
            href="/the-hide"
            image="/images/partners/the-hide-cafe-cover.webp"
            onNavigate={onNavigate}
          />
          <div className="col-span-8 grid grid-cols-2 gap-4">
            <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line">
              <p className="flex items-center gap-2 font-display text-lg font-extrabold"><Clock aria-hidden className="size-5 text-squab-700" /> Opening hours</p>
              <dl className="mt-4 divide-y divide-line">
                {menu.hideHours.map((h) => (
                  <div key={h.when} className="flex justify-between py-2 text-sm">
                    <dt className="text-stone-muted">{h.when}</dt>
                    <dd className="font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {menu.hidePerk && (
              <Link href={`/perks/${menu.hidePerk.slug}`} onClick={onNavigate} className={cn(tile, "flex-col justify-between bg-squab-500 p-6 ring-squab-500")}>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink/70">Squab Perk</span>
                <span className="font-display text-3xl font-extrabold leading-tight">{menu.hidePerk.title}</span>
                <span className="font-semibold">For Squab customers: show your code at the counter</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold">
                  Get the code <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )}
          </div>
        </>
      );

    case "/about":
      return (
        <>
          <Intro
            eyebrow="About Squab"
            title="One family. Four businesses."
            body="From a Warwickshire farm in 1933 to six sites across the country."
            cta="Our story"
            href="/about"
            image="/images/squab/farm-harvest.webp"
            onNavigate={onNavigate}
          />
          <div className="col-span-8 grid grid-cols-4 gap-3">
            {[
              ["Squab Workspace", "Flexible space to grow", "/images/squab/workspace-office.webp", "https://squabworkspace.co.uk"],
              ["Squab Storage", "Award-winning self storage", "/images/squab/storage-welcome.webp", "https://squabstorage.co.uk"],
              ["Squab Removals", "Home and office moves", "/images/squab/removals-lorry.webp", "https://squabremovals.co.uk"],
              ["Squab Hall Farm", "Where it all started", "/images/squab/farm-harvest.webp", "https://squabhallfarm.co.uk"],
            ].map(([name, strap, img, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className={cn(tile, "flex-col overflow-hidden")}
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-mist">
                  <Image src={img!} alt="" fill sizes="16vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </span>
                <span className="p-3">
                  <span className="flex items-center gap-1 font-bold group-hover:text-squab-700">
                    {name} <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                  <span className="text-sm text-stone-muted">{strap}</span>
                </span>
              </a>
            ))}
            <div className="col-span-4 flex gap-6 text-sm font-semibold text-stone-muted">
              <Link href="/about#businesses" onClick={onNavigate} className="hover:text-ink">For Squab businesses</Link>
              <Link href="/about#privacy" onClick={onNavigate} className="hover:text-ink">Privacy &amp; terms</Link>
            </div>
          </div>
        </>
      );

    default:
      return null;
  }
}
