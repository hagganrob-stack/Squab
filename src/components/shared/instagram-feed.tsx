import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { getInstagramPosts, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/instagram";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export async function InstagramFeed() {
  const posts = await getInstagramPosts(8);

  return (
    <Section aria-labelledby="instagram-heading" className="bg-white">
      <SectionHeader
        id="instagram-heading"
        eyebrow="On Instagram"
        title={`@${INSTAGRAM_HANDLE}`}
        description="Behind the scenes, new faces and what’s happening across Squab."
        action={posts.length > 0 ? { label: "Follow us", href: INSTAGRAM_URL } : undefined}
      />
      {posts.length > 0 ? (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {posts.map((post) => (
            <li key={post.id}>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-[var(--radius-control)] bg-mist"
              >
                <Image
                  src={post.imageUrl}
                  alt={post.caption ? post.caption.slice(0, 120) : `Instagram post from @${INSTAGRAM_HANDLE}`}
                  fill
                  unoptimized // Instagram CDN URLs are signed and expire; serve as-is
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {post.isVideo && (
                  <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-ink/70 text-white">
                    <Play aria-hidden className="size-3.5 fill-current" />
                  </span>
                )}
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="line-clamp-3 text-xs font-medium text-white">{post.caption}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-5 rounded-[var(--radius-panel)] bg-ink p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-squab-500 text-ink">
              <InstagramGlyph className="size-7" />
            </span>
            <div>
              <p className="font-display text-2xl font-extrabold">@{INSTAGRAM_HANDLE}</p>
              <p className="text-white/75">Follow Squab Workspace on Instagram.</p>
            </div>
          </div>
          <ButtonLink href={INSTAGRAM_URL} external size="lg">
            Follow on Instagram <ArrowUpRight aria-hidden />
          </ButtonLink>
        </div>
      )}
    </Section>
  );
}

export { InstagramGlyph };
