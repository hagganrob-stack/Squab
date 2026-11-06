import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata: Metadata = { title: "Create an account", robots: { index: false } };

export default function Page() {
  return <ComingSoon title="Join Squab Connect" intro="Registration for customers and Squab businesses is launching shortly." features={["Save your favourite offers, businesses and stories","Manage your profile and newsletter preferences","Business owners: manage your profile and submit offers"]} />;
}
