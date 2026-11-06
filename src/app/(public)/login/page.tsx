import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default function Page() {
  return <ComingSoon title="Sign in to Squab Connect" intro="Squab Connect accounts are launching shortly." features={["Save your favourite offers, businesses and stories","Manage your profile and newsletter preferences","Business owners: manage your profile and submit offers"]} />;
}
