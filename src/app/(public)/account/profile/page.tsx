import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata: Metadata = { title: "Profile", robots: { index: false } };

export default function Page() {
  return <ComingSoon title="Profile settings" intro="Profile and newsletter preferences are coming soon." features={["Save your favourite offers, businesses and stories","Manage your profile and newsletter preferences","Business owners: manage your profile and submit offers"]} />;
}
