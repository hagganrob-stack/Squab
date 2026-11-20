"use client";

/** Deterministic 0–1 pseudo-random value, so renders stay pure. */
const rand = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const COLOURS = ["#F4941E", "#FBBC05", "#1A1A1A", "#FFFFFF", "#F7A443", "#9A5408"];

/** A one-off burst of confetti from the centre of its (relative) parent. Decorative only. */
export function ConfettiBurst({ pieces = 44 }: { pieces?: number }) {
  const bits = Array.from({ length: pieces }, (_, i) => {
    const angle = (i / pieces) * Math.PI * 2 + rand(i, 1) * 0.4;
    const dist = 90 + rand(i, 2) * 120;
    const w = 6 + rand(i, 4) * 6;
    const round = rand(i, 5) < 0.3;
    return {
      dx: `${Math.cos(angle) * dist}px`,
      dy: `${Math.sin(angle) * dist - 40}px`,
      rot: `${rand(i, 3) * 720 - 360}deg`,
      colour: COLOURS[i % COLOURS.length],
      w,
      round,
      delay: rand(i, 6) * 80,
    };
  });
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-visible motion-reduce:hidden">
      {bits.map((b, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            width: b.w,
            height: b.round ? b.w : b.w * 0.45,
            borderRadius: b.round ? "9999px" : "2px",
            background: b.colour,
            boxShadow: b.colour === "#FFFFFF" ? "0 0 0 1px rgba(0,0,0,0.12)" : undefined,
            animation: `confetti-burst 900ms cubic-bezier(0.15, 0.7, 0.3, 1) ${b.delay}ms both`,
            ["--dx" as string]: b.dx,
            ["--dy" as string]: b.dy,
            ["--rot" as string]: b.rot,
          }}
        />
      ))}
    </span>
  );
}
