import "server-only";
import { cacheLife, cacheTag } from "next/cache";

export const INSTAGRAM_HANDLE = "squabworkspace";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export interface InstagramPost {
  id: string;
  caption: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
  isVideo: boolean;
}

interface GraphMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

/**
 * Latest posts from @squabworkspace via the official Instagram API
 * (Instagram API with Instagram Login, professional accounts).
 *
 * Needs INSTAGRAM_ACCESS_TOKEN (server-only). Without it, or if the API
 * fails, this returns [] and the UI shows a "Follow us" panel instead —
 * we never show placeholder posts.
 */
export async function getInstagramPosts(limit = 8): Promise<InstagramPost[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("instagram");

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      console.error(`Instagram API error ${res.status}`);
      return [];
    }
    const json = (await res.json()) as { data?: GraphMedia[] };
    return (json.data ?? []).flatMap((m) => {
      const imageUrl = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
      if (!imageUrl) return [];
      return [
        {
          id: m.id,
          caption: m.caption ?? "",
          imageUrl,
          permalink: m.permalink,
          timestamp: m.timestamp,
          isVideo: m.media_type === "VIDEO",
        },
      ];
    });
  } catch (err) {
    console.error("Instagram fetch failed", err);
    return [];
  }
}
