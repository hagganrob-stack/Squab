import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import type { HomepageSettings } from "@/types/content";

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

/** Full-bleed hero over the Squab site photograph, in the navy-over-photo style of Squab's social posts. */
export function Hero({ hero }: { hero: HomepageSettings["hero"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {hero.imageUrl && (
        <Image
          src={hero.imageUrl}
          alt="Aerial view of a Squab site among the fields"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[60%_center]"
        />
      )}
      {/* Navy wash keeps the text readable over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/95 via-navy/60 to-navy/15 lg:bg-gradient-to-r lg:from-navy-deep/95 lg:via-navy/60 lg:to-transparent"
      />
      <div className="container-page flex min-h-[34rem] flex-col justify-end py-14 sm:min-h-[38rem] lg:min-h-[42rem] lg:justify-center lg:py-24">
        <div className="max-w-2xl">
          <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-squab-500" />
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/80">{hero.eyebrow}</p>
          <h1 className="text-display font-extrabold text-white">
            <Headline text={hero.headline} highlight={hero.highlight} />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{hero.subheading}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label} <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="onDark">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
