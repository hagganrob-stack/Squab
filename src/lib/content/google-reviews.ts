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
  rating: 5.0,
  total: 4,
  // Link to the profile's reviews on Google Maps.
  mapsUrl: undefined,
  reviews: [
    // Copied from Google on 18 Nov 2026 (each posted "4 months ago").
    { author: "Barnaby Galiffe", rating: 5, when: "2026", text: "Squab WorkSpace have been brilliant! They’ve allowed me to grow my business. I came to them nearly 3 years ago and found a new home for my small private gym (Project 23 Coaching). The staff are nothing but amazing and have helped me multiple times when I’m in need of help. The unit they provided me has been perfect and I have managed to grow my business significantly. We’ve even been able to win national awards and was shortlisted for boutique facility of the year at the National Fitness Awards.\n\nThey are currently assisting me with moving to a bigger premises. We wouldn’t have had the success we’ve had without them. They also keep the site so clean and tidy. I really couldn’t recommend them enough." },
    { author: "Tim King", rating: 5, when: "2026", text: "A friendly, helpful and efficient workspace with a really positive atmosphere. The breakout areas are great for taking a break or working away from the main office, and additional office space is available when needed. The Hive café is also very convenient for lunch or a change of scene during the day. Overall, an excellent place to work." },
    { author: "Joanna Rhodes", rating: 5, when: "2026", text: "Squab Workspace is a great working environment in a beautiful countryside setting. The new meeting rooms are a great addition. The Squab team are always super helpful and friendly." },
  ],
};
