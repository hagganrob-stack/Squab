import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/London",
});

const shortDateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "Europe/London",
});

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Europe/London",
});

const weekdayFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  timeZone: "Europe/London",
});

export function formatDate(iso: string) {
  return dateFmt.format(new Date(iso));
}

export function formatShortDate(iso: string) {
  return shortDateFmt.format(new Date(iso));
}

export function formatTime(iso: string) {
  return timeFmt.format(new Date(iso)).replace(":00", "").replace(" ", "");
}

export function formatWeekday(iso: string) {
  return weekdayFmt.format(new Date(iso));
}

export function formatTimeRange(startIso: string, endIso: string) {
  return `${formatTime(startIso)} – ${formatTime(endIso)}`;
}

export function dateParts(iso: string) {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "numeric", timeZone: "Europe/London" }).format(d),
    month: new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "Europe/London" }).format(d),
  };
}

export function siteUrl(path = "") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return `${base}${path}`;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function normalise(text: string) {
  return text.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

export function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
