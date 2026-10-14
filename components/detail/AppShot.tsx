import { cn, hash01 } from "@/lib/helpers";
import type { MarketplaceApp } from "@/types";

/*
  Generated preview artwork — an abstract "screenshot" panel rendered
  from the app's accent gradient plus deterministic orbital shapes and
  a mock UI card. No image assets exist; everything is derived from
  the app slug + panel index, so each of the three shots looks
  different but stays stable across renders.
*/
export default function AppShot({
  app,
  index,
  className,
}: {
  app: MarketplaceApp;
  index: number;
  className?: string;
}) {
  const seed = (k: string) => hash01(`${app.slug}:shot:${index}:${k}`);
  const [c1, c2] = app.accent;
  const gid = `shotg-${app.slug}-${index}`;
  const vid = `shotv-${app.slug}-${index}`;
  const rot = Math.floor(seed("rot") * 360);
  const initial = app.name.charAt(0).toUpperCase();

  const orbitCx = 55 + seed("ocx") * 70;
  const orbitCy = 85 + seed("ocy") * 75;
  const orbitR = 52 + seed("or") * 32;
  const emblemX = 90;
  const emblemY = 112 + seed("ey") * 36;

  const planets = [0, 1, 2].map((i) => {
    const a = seed(`pa${i}`) * Math.PI * 2;
    return {
      x: orbitCx + Math.cos(a) * orbitR,
      y: orbitCy + Math.sin(a) * orbitR,
      r: 2 + seed(`pr${i}`) * 3,
    };
  });

  const stars = [0, 1, 2, 3, 4, 5].map((i) => ({
    x: 8 + seed(`sx${i}`) * 164,
    y: 8 + seed(`sy${i}`) * 200,
    r: 0.7 + seed(`sr${i}`) * 1.1,
  }));

  return (
    <div
      className={cn(
        "relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-surface-solid",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 180 320"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`${app.name} preview ${index + 1}`}
      >
        <defs>
          <linearGradient
            id={gid}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            gradientTransform={`rotate(${rot} 0.5 0.5)`}
          >
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <radialGradient id={vid} cx="50%" cy="36%" r="78%">
            <stop offset="52%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
          </radialGradient>
        </defs>

        <rect width="180" height="320" fill={`url(#${gid})`} />
        <rect width="180" height="320" fill={`url(#${vid})`} />

        {/* Star field */}
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="rgba(255,255,255,0.55)" />
        ))}

        {/* Orbit rings + planets */}
        <circle
          cx={orbitCx}
          cy={orbitCy}
          r={orbitR}
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <circle
          cx={orbitCx}
          cy={orbitCy}
          r={orbitR * 0.62}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
        />
        {planets.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="rgba(255,255,255,0.85)" />
        ))}

        {/* App emblem */}
        <circle
          cx={emblemX}
          cy={emblemY}
          r="27"
          fill="rgba(0,0,0,0.32)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
        />
        <text
          x={emblemX}
          y={emblemY + 8}
          textAnchor="middle"
          fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
          fontWeight="700"
          fontSize="24"
          fill="#ffffff"
        >
          {initial}
        </text>

        {/* Mock UI chrome */}
        <rect x="16" y="18" width="44" height="7" rx="3.5" fill="rgba(255,255,255,0.28)" />
        <circle cx="152" cy="21" r="8" fill="rgba(255,255,255,0.24)" />
        <rect
          x="16"
          y="238"
          width="148"
          height="66"
          rx="12"
          fill="rgba(7,8,13,0.38)"
          stroke="rgba(255,255,255,0.14)"
        />
        <rect
          x="28"
          y="252"
          width={58 + seed("b1") * 26}
          height="7"
          rx="3.5"
          fill="rgba(255,255,255,0.5)"
        />
        <rect
          x="28"
          y="267"
          width={92 + seed("b2") * 26}
          height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.22)"
        />
        <rect
          x="28"
          y="279"
          width={70 + seed("b3") * 26}
          height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.22)"
        />
        <rect x="126" y="282" width="26" height="12" rx="6" fill="rgba(255,255,255,0.28)" />
      </svg>
    </div>
  );
}
