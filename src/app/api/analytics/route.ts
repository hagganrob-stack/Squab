import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/env";
import { getPublicClient } from "@/lib/supabase/public";

/**
 * Anonymous engagement beacons (offer views, redemption clicks, code reveals,
 * business profile views). Inserts go through the anon key; RLS only permits
 * these event types, so the endpoint cannot be used to forge redemptions.
 */
const Body = z.union([
  z.object({ offerId: z.uuid(), event: z.enum(["view", "redeem_click", "code_reveal"]) }),
  z.object({ businessId: z.uuid(), event: z.enum(["profile_view", "website_click", "contact_click"]) }),
]);

export async function POST(req: NextRequest) {
  const text = await req.text();
  if (text.length > 512) return new NextResponse(null, { status: 413 });
  let parsed;
  try {
    parsed = Body.safeParse(JSON.parse(text));
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (!parsed.success) return new NextResponse(null, { status: 400 });
  if (!isSupabaseConfigured) return new NextResponse(null, { status: 204 });

  const db = getPublicClient();
  const data = parsed.data;
  const { error } =
    "offerId" in data
      ? await db.from("offer_analytics").insert({ offer_id: data.offerId, event_type: data.event })
      : await db.from("business_analytics").insert({ business_id: data.businessId, event_type: data.event });
  if (error) console.error("analytics insert failed", error.message);
  return new NextResponse(null, { status: 204 });
}
