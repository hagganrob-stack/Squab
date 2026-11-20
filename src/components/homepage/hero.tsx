import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import type { HomepageSettings } from "@/types/content";
import { CountUp } from "./count-up";

/** Splits the headline so the configured phrase can be picked out in orange. */
function Headline({ text, highlight }: { text: string; highlight?: string }) {
  const at = highlight ? text.lastIndexOf(highlight) : -1;
  if (!highlight || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-squab-500">{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  );
}

/** Full-bleed hero over the Squab site photograph, with a black wash as on The Hide page. */
export function Hero({ hero, stats = [] }: { hero: HomepageSettings["hero"]; stats?: { value: number; label: string; suffix?: string }[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {hero.imageUrl && (
        <Image
          src={hero.imageUrl}
          alt="Aerial view of a Squab site among the fields"
          fill
          priority
          sizes="100vw"
          className="ken-burns -z-20 object-cover object-[60%_center]"
        />
      )}
      {/* Black wash keeps the text readable over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/15 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/55 lg:to-transparent"
      />
      <div className="container-page flex min-h-[34rem] flex-col justify-end py-14 sm:min-h-[38rem] lg:min-h-[42rem] lg:justify-center lg:py-24">
        <div className="max-w-2xl">
          <span aria-hidden className="rise-in mb-5 block h-1 w-12 rounded-full bg-squab-500" />
          <p className="rise-in mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/80" style={{ ["--i" as string]: 1 }}>{hero.eyebrow}</p>
          <h1 className="rise-in text-display font-extrabold text-white" style={{ ["--i" as string]: 2 }}>
            <Headline text={hero.headline} highlight={hero.highlight} />
          </h1>
          <p className="rise-in mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl" style={{ ["--i" as string]: 3 }}>{hero.subheading}</p>
          <div className="rise-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--i" as string]: 4 }}>
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label} <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="onDark">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          {stats.length > 0 && (
            <dl className="rise-in mt-12 grid max-w-sm grid-cols-2 gap-4 border-t border-white/20 pt-6" style={{ ["--i" as string]: 5 }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-extrabold text-squab-500 sm:text-4xl">
                    <CountUp value={s.value} />
                    {s.suffix}
                  </dd>
                  <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
