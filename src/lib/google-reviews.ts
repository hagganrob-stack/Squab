import { cacheLife, cacheTag } from "next/cache";

/**
 * Google reviews for the Squab Workspace (Leamington Spa) Business Profile,
 * fetched from the official Google Places API (New). Nothing is shown — and
 * nothing is invented — until GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set.
 *
 *   GOOGLE_PLACES_API_KEY  server-only key with the Places API (New) enabled
 *   GOOGLE_PLACE_ID        the Business Profile's place ID (starts "ChIJ…")
 *   GOOGLE_REVIEW_URL      optional: the profile's "Ask for reviews" link
 */

export interface GoogleReview {
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  when: string;
  url?: string;
}

export interface GooglePlaceReviews {
  rating?: number;
  total?: number;
  mapsUrl?: string;
  reviews: GoogleReview[];
}

const placeId = () => process.env.GOOGLE_PLACE_ID?.trim() ?? "";

/** Where the "Leave a review" button goes. */
export function googleReviewUrl() {
  const custom = process.env.GOOGLE_REVIEW_URL?.trim();
  if (custom) return custom;
  const id = placeId();
  if (id) return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(id)}`;
  return "https://www.google.com/search?q=Squab+Workspace+Leamington+Spa+reviews";
}

interface PlacesResponse {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
    googleMapsUri?: string;
  }[];
}

export async function getGoogleReviews(): Promise<GooglePlaceReviews | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("google-reviews");

  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const id = placeId();
  if (!key || !id) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}?languageCode=en-GB`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
    });
    if (!res.ok) {
      console.error(`Google Places request failed: ${res.status}`);
      return null;
    }
    const data = (await res.json()) as PlacesResponse;
    const reviews = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        authorUrl: r.authorAttribution?.uri,
        authorPhoto: r.authorAttribution?.photoUri,
        rating: r.rating ?? 0,
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        when: r.relativePublishTimeDescription ?? "",
        url: r.googleMapsUri,
      }))
      .filter((r) => r.text.length > 0);
    return { rating: data.rating, total: data.userRatingCount, mapsUrl: data.googleMapsUri, reviews };
  } catch (error) {
    console.error("Google Places request failed", error);
    return null;
  }
}
