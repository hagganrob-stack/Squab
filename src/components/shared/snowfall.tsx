"use client";

import { useEffect, useState } from "react";

type Flake = { left: number; size: number; duration: number; delay: number; drift: number; opacity: number; glyph: boolean };

/**
 * Gentle falling snow for seasonal pages. Purely decorative: hidden from
 * assistive tech, ignores clicks, skipped for people who prefer reduced
 * motion, and each flake falls twice before the snow stops.
 */
export function Snowfall({ count = 120 }: { count?: number }) {
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const n = window.innerWidth < 640 ? Math.round(count * 0.55) : count;
    const id = requestAnimationFrame(() =>
      setFlakes(
        Array.from({ length: n }, () => ({
          left: Math.random() * 100,
          size: 8 + Math.random() * 14,
          duration: 9 + Math.random() * 9,
          delay: Math.random() * 10,
          drift: (Math.random() - 0.5) * 160,
          opacity: 0.75 + Math.random() * 0.25,
          glyph: Math.random() < 0.85,
        })),
      ),
    );
    return () => cancelAnimationFrame(id);
  }, [count]);

  if (!flakes.length) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="absolute top-0 block select-none leading-none text-[#a9cbe6] [filter:drop-shadow(0_0_1px_rgba(22,48,82,0.55))_drop-shadow(0_1px_3px_rgba(22,48,82,0.3))]"
          style={{
            left: `${f.left}%`,
            fontSize: f.glyph ? f.size * 1.4 : undefined,
            width: f.glyph ? undefined : f.size * 0.6,
            height: f.glyph ? undefined : f.size * 0.6,
            borderRadius: f.glyph ? undefined : "9999px",
            background: f.glyph ? undefined : "radial-gradient(circle at 35% 35%, #ffffff 0%, #d6e8f7 55%, #a9cbe6 100%)",
            animation: `snowfall ${f.duration}s linear ${f.delay}s 2 both`,
            ["--flake-drift" as string]: `${f.drift}px`,
            ["--flake-opacity" as string]: f.opacity,
          }}
        >
          {f.glyph ? "❄" : null}
        </span>
      ))}
    </div>
  );
}
