export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/perks", label: "Perks" },
  { href: "/businesses", label: "Businesses" },
  { href: "/news", label: "News & Stories" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About Connect" },
] as const;

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
