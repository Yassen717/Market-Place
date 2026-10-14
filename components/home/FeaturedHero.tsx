import Link from "next/link";
import { GetButton, Stars } from "@/components/AppCard";
import AppIcon from "@/components/AppIcon";
import { CATALOG } from "@/lib/data";
import { cn, formatDownloads, formatPrice, formatSize } from "@/lib/helpers";
import type { MarketplaceApp } from "@/types";

/*
  Featured row — an oversized "App of the Day" hero card with a
  gradient border + aurora glow, beside stacked spotlight cards for
  the remaining editorial badges.
*/

const SPOTLIGHT_BADGES = ["Game of the Day", "App of the Week"];

export default function FeaturedHero() {
  const hero = CATALOG.find((a) => a.badge === "App of the Day");
  const spotlights = SPOTLIGHT_BADGES.map((badge) =>
    CATALOG.find((a) => a.badge === badge),
  ).filter((a): a is MarketplaceApp => Boolean(a));

  if (!hero && spotlights.length === 0) return null;

  return (
    <section aria-label="Featured" className="animate-rise">
      <div className="grid gap-5 lg:grid-cols-3">
        {hero && <HeroCard app={hero} />}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
          {spotlights.map((app) => (
            <SpotlightCard key={app.slug} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Oversized App of the Day card — gradient ring + accent glow. */
function HeroCard({ app }: { app: MarketplaceApp }) {
  return (
    <div className="rounded-[1.75rem] bg-gradient-to-br from-accent/80 via-accent-2/50 to-accent-3/40 p-px shadow-[0_24px_80px_-24px_rgba(124,92,255,0.55)] lg:col-span-2">
      <div className="relative h-full overflow-hidden rounded-[1.7rem] bg-surface-solid">
        {/* aurora glow driven by the app's own accent colors */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 -right-20 h-80 w-80 rounded-full opacity-25 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${app.accent[0]}, transparent 70%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${app.accent[1]}, transparent 70%)`,
          }}
        />

        <div className="relative flex h-full flex-col gap-7 p-7 sm:flex-row md:p-9">
          <Link
            href={`/app/${app.slug}`}
            aria-label={app.name}
            className="shrink-0 self-start transition-transform duration-200 hover:-translate-y-1"
          >
            <AppIcon app={app} size={120} radius="26%" />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_18px_rgba(124,92,255,0.45)]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
              </svg>
              {app.badge}
            </span>

            <Link href={`/app/${app.slug}`} className="group mt-3 block">
              <h2 className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-accent-2 md:text-4xl">
                {app.name}
              </h2>
              <p className="mt-1.5 text-base text-muted">{app.tagline}</p>
            </Link>

            <div className="mt-2 text-sm text-faint">
              {app.developer} · {app.category}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Stars rating={app.rating} size={14} />
              <span className="text-sm font-medium">
                {app.rating.toFixed(1)}
              </span>
              <span className="text-xs text-faint">
                · {formatDownloads(app.ratingsCount)} ratings
              </span>
            </div>

            <p className="mt-4 hidden text-sm leading-relaxed text-muted line-clamp-2 md:block">
              {app.description}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
              <Link href={`/app/${app.slug}`} className="btn-primary">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 21h16" />
                </svg>
                Get
              </Link>
              <span className="text-xs text-faint">
                {app.price === 0 ? "Free" : formatPrice(app.price)} ·{" "}
                {formatSize(app.sizeMb)} · {formatDownloads(app.downloads)}{" "}
                downloads
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Smaller editorial spotlight card for secondary badges. */
function SpotlightCard({ app }: { app: MarketplaceApp }) {
  const isGame = app.kind === "game";
  return (
    <Link
      href={`/app/${app.slug}`}
      className="group glass card-hover relative flex flex-col justify-between gap-5 overflow-hidden rounded-2xl p-5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-15 blur-3xl transition-opacity duration-300 group-hover:opacity-30"
        style={{ background: app.accent[0] }}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div
            className={cn(
              "text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
              isGame ? "text-accent-3" : "text-accent-2",
            )}
          >
            {app.badge}
          </div>
          <div className="mt-2 font-display text-lg font-bold transition-colors group-hover:text-accent-2">
            {app.name}
          </div>
          <div className="mt-1 text-sm text-muted line-clamp-2">
            {app.tagline}
          </div>
        </div>
        <AppIcon app={app} size={64} />
      </div>
      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Stars rating={app.rating} />
            <span className="text-xs text-faint">{app.rating.toFixed(1)}</span>
          </div>
          <div className="mt-1 truncate text-[11px] text-faint">
            {app.developer}
          </div>
        </div>
        <GetButton app={app} />
      </div>
    </Link>
  );
}
