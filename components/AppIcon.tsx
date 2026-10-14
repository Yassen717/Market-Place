import { hash01 } from "@/lib/helpers";
import type { MarketplaceApp } from "@/types";

/*
  Generated app icon — a rounded gradient tile with an orbital ring
  and the app's initial. Deterministic per app, so no image assets
  are needed. Drop-in replacement for the old /assets/*.png files.
*/
export default function AppIcon({
  app,
  size = 56,
  radius = "22%",
}: {
  app: MarketplaceApp;
  size?: number;
  radius?: string;
}) {
  const [c1, c2] = app.accent;
  const gid = `ic-${app.slug}-${size}`;
  const rot = Math.floor(hash01(app.slug) * 360);
  const initial = app.name.charAt(0).toUpperCase();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={app.name}
      style={{ borderRadius: radius, flexShrink: 0 }}
      className="shadow-lg"
    >
      <defs>
        <linearGradient
          id={gid}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientTransform={`rotate(${rot} 48 48)`}
        >
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="22" fill={`url(#${gid})`} />
      <circle
        cx="48"
        cy="48"
        r="26"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <circle cx="48" cy="48" r="17" fill="rgba(0,0,0,0.22)" />
      <text
        x="48"
        y="55"
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
        fontWeight="700"
        fontSize="26"
        fill="#ffffff"
      >
        {initial}
      </text>
    </svg>
  );
}
