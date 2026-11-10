import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  ["3", "indoor courts"],
  ["7am–11pm", "seven days a week"],
  ["Café", "& changing rooms"],
] as const;

/** Big-news announcement for the approved padel centre at Squab Hall Farm. */
export function PadelBanner() {
  return (
    <section aria-labelledby="padel-heading" className="container-page pt-10 sm:pt-14">
      <Link
        href="/news/padel-is-coming-to-squab"
        className="group relative isolate block overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white shadow-lift"
      >
        <Image
          src="/images/padel/padel-player.webp"
          alt=""
          fill
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="-z-10 object-cover object-[70%_40%] transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/10" />
        <div className="max-w-2xl px-6 py-10 sm:px-10 sm:py-14 lg:py-16">
          <p className="inline-flex items-center gap-2 rounded-full bg-squab-500 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-ink">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
            Big news
          </p>
          <h2 id="padel-heading" className="mt-4 text-display font-extrabold leading-[1.02]">
            Game on. <span className="text-squab-400">Padel</span> is coming to Squab.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Plans for an indoor padel centre at Squab Hall Farm have been approved, bringing the UK’s fastest-growing sport right to your doorstep.
          </p>
          <dl className="mt-7 grid max-w-xl grid-cols-3 gap-3 sm:gap-5">
            {stats.map(([value, label]) => (
              <div key={label} className="border-l-2 border-squab-500 pl-3">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-xl font-extrabold sm:text-2xl">{value}</dd>
                <dd className="text-xs text-white/70 sm:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-ink transition-colors group-hover:bg-squab-500">
            Read the news <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </section>
  );
}
