import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Seasonal homepage notice linking to /christmas. Shown until CHRISTMAS_ENDS. */
export function ChristmasBanner() {
  return (
    <section aria-labelledby="christmas-heading" className="container-page pt-10 sm:pt-14">
      <Link
        href="/christmas"
        className="group grid overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white shadow-lift sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      >
        <div className="relative min-h-44 sm:min-h-full">
          <Image
            src="/images/squab/christmas-lights.webp"
            alt=""
            fill
            sizes="(min-width: 640px) 40vw, 100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-squab-300">
            <span aria-hidden>❄ </span>Christmas &amp; New Year
          </p>
          <h2 id="christmas-heading" className="mt-3 text-headline font-extrabold">Christmas opening times</h2>
          <ul className="mt-4 space-y-1.5 text-white/85">
            <li><strong className="text-white">Customer access:</strong> 8am – 8pm, 7 days a week as normal</li>
            <li><strong className="text-white">Office:</strong> 9am – 3pm on 24, 29, 30 &amp; 31 December</li>
            <li><strong className="text-white">Office closed:</strong> 25–28 December &amp; New Year&rsquo;s Day</li>
          </ul>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-squab-500 px-5 py-3 font-bold text-ink transition-colors group-hover:bg-squab-400">
            See all the dates <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </section>
  );
}
