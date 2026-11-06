import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata: Metadata = { title: "Saved", robots: { index: false } };

export default function Page() {
  return <ComingSoon title="Saved offers and businesses" intro="Soon you'll be able to save offers, businesses and stories to come back to." features={["Save your favourite offers, businesses and stories","Manage your profile and newsletter preferences","Business owners: manage your profile and submit offers"]} />;
}
