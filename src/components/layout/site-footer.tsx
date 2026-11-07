import Link from "next/link";
import { Wordmark } from "./wordmark";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/perks", label: "Squab Perks" },
      { href: "/businesses", label: "Business directory" },
      { href: "/news", label: "News & Stories" },
      { href: "/events", label: "Events" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { href: "/about", label: "About Squab Connect" },
      { href: "/about#businesses", label: "List your business" },
      { href: "/register", label: "Create an account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/about#privacy", label: "Privacy" },
      { href: "/about#terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep pb-24 text-white/80 lg:pb-0">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Wordmark inverted />
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            The digital home of the Squab community — offers, businesses, stories and events from the people around you.
          </p>
          <a
            href="https://www.instagram.com/squabworkspace/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-squab-300"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            @squabworkspace
          </a>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-white/50">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© Squab Storage. Squab Connect is a community platform for Squab customers and tenants.</p>
          <p>Content marked “Sample” is demonstration content.</p>
        </div>
      </div>
    </footer>
  );
}
