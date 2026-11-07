import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import type { HomepageSettings } from "@/types/content";

/** Full-bleed hero over the Squab site photograph (set in homepage settings). */
export function Hero({ hero }: { hero: HomepageSettings["hero"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
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
      {/* Darken the left/bottom so text stays readable over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/20 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/55 lg:to-transparent"
      />
      <div className="container-page flex min-h-[34rem] flex-col justify-end py-14 sm:min-h-[38rem] lg:min-h-[42rem] lg:justify-center lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-squab-300 backdrop-blur-sm">
            <span aria-hidden className="size-1.5 rounded-full bg-squab-500" />
            {hero.eyebrow}
          </p>
          <h1 className="text-display font-extrabold text-white">{hero.headline}</h1>
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
