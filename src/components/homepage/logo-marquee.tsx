import Link from "next/link";
import { Logo } from "@/components/ui/media";

type Item = { slug: string; name: string; logoUrl: string; dark: boolean };

/** Endless, pausable strip of business logos. The list is duplicated so the loop is seamless. */
export function LogoMarquee({ items }: { items: Item[] }) {
  if (items.length < 6) return null;
  const loop = [...items, ...items];
  return (
    <section aria-labelledby="marquee-heading" className="marquee-pause overflow-hidden border-y border-line bg-white py-6">
      <h2 id="marquee-heading" className="sr-only">Businesses based at Squab</h2>
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />
        <ul className="marquee flex w-max items-center gap-10 sm:gap-14" style={{ ["--marquee-duration" as string]: `${items.length * 3.5}s` }}>
          {loop.map((b, i) => (
            <li key={`${b.slug}-${i}`} aria-hidden={i >= items.length ? true : undefined}>
              <Link
                href={`/businesses/${b.slug}`}
                tabIndex={i >= items.length ? -1 : undefined}
                className="flex items-center gap-3 transition duration-300 hover:-translate-y-0.5 hover:drop-shadow-md"
              >
                <Logo src={b.logoUrl} name={b.name} size={48} width={96} dark={b.dark} />
                <span className="sr-only">{b.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
