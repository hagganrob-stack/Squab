import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata: Metadata = { title: "Your account", robots: { index: false } };

export default function Page() {
  return <ComingSoon title="Your Squab Connect account" intro="Your account area is being built." features={["Save your favourite offers, businesses and stories","Manage your profile and newsletter preferences","Business owners: manage your profile and submit offers"]} />;
}
