import Link from "next/link";
import AppIcon from "./AppIcon";
import { cn, formatDownloads, formatPrice } from "@/lib/helpers";
import type { MarketplaceApp } from "@/types";

export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < full ? "var(--warn)" : "none"}
          stroke={i < full ? "var(--warn)" : "var(--faint)"}
          strokeWidth="1.6"
        >
          <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.5L12 17.4l-5.9 3.2 1.3-6.5-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function GetButton({ app }: { app: MarketplaceApp }) {
  return (
    <span className="btn-get">{formatPrice(app.price)}</span>
  );
}

/** Row variant — ranked chart list item. */
export function AppRow({
  app,
  rank,
  className,
}: {
  app: MarketplaceApp;
  rank?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/app/${app.slug}`}
      className={cn(
        "glass card-hover rounded-2xl flex items-center gap-4 p-3.5 group",
        className,
      )}
    >
      {typeof rank === "number" && (
        <span className="rank-num">{String(rank).padStart(2, "0")}</span>
      )}
      <AppIcon app={app} size={56} />
      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate group-hover:text-accent-2 transition-colors">
          {app.name}
        </div>
        <div className="text-xs text-muted truncate">
          {app.developer} · {app.category}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <Stars rating={app.rating} />
          <span className="text-xs text-faint">{app.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <GetButton app={app} />
        <span className="text-[10px] text-faint">
          {formatDownloads(app.downloads)} downloads
        </span>
      </div>
    </Link>
  );
}

/** Tile variant — grid card. */
export function AppTile({
  app,
  className,
}: {
  app: MarketplaceApp;
  className?: string;
}) {
  return (
    <Link
      href={`/app/${app.slug}`}
      className={cn(
        "glass card-hover rounded-2xl p-4 flex flex-col items-center text-center group",
        className,
      )}
    >
      <AppIcon app={app} size={64} />
      <div className="font-semibold mt-3 truncate w-full group-hover:text-accent-2 transition-colors">
        {app.name}
      </div>
      <div className="text-xs text-muted truncate w-full">{app.category}</div>
      <div className="flex items-center gap-1.5 mt-1.5">
        <Stars rating={app.rating} />
      </div>
      <div className="mt-3">
        <GetButton app={app} />
      </div>
    </Link>
  );
}
