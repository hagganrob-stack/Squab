export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/perks", label: "Perks" },
  { href: "/businesses", label: "Businesses" },
  { href: "/news", label: "News & Stories" },
  { href: "/events", label: "Events" },
  { href: "/the-hide", label: "The Hide" },
  { href: "/about", label: "About" },
] as const;

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
