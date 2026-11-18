import type { GooglePlaceReviews } from "@/lib/google-reviews";

/**
 * Google reviews for Squab Workspace, Leamington Spa, copied by hand from the
 * Google Business Profile. Paste reviews word for word, with the reviewer's
 * name as Google shows it. Leave the list empty to show only the review CTA.
 * If the Places API is configured (see lib/google-reviews.ts), live reviews
 * are used instead.
 */
export const manualGoogleReviews: GooglePlaceReviews = {
  // Overall rating and number of reviews shown on the profile, e.g. 4.9 and 32.
  rating: undefined,
  total: undefined,
  // Link to the profile's reviews on Google Maps.
  mapsUrl: undefined,
  reviews: [
    // { author: "Jane D.", rating: 5, when: "2 months ago", text: "…" },
  ],
};
