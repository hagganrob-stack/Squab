"use client";

import { useEffect } from "react";

/** Fires a single, anonymous view beacon for an offer or business page. */
export function TrackView({ kind, id }: { kind: "offer" | "business"; id: string }) {
  useEffect(() => {
    const key = `viewed:${kind}:${id}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage may be unavailable */
    }
    const body = JSON.stringify(kind === "offer" ? { offerId: id, event: "view" } : { businessId: id, event: "profile_view" });
    navigator.sendBeacon?.("/api/analytics", body);
  }, [kind, id]);
  return null;
}
