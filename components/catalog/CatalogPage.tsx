"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppIcon from "@/components/AppIcon";
import { AppRow, AppTile } from "@/components/AppCard";
import { CATALOG } from "@/lib/data";
import { cn, formatDownloads } from "@/lib/helpers";
import type { AppKind, MarketplaceApp } from "@/types";
import CategoryChips, {
  ALL_CATEGORIES,
  type CatalogChip,
} from "./CategoryChips";
import SortControl, { sortApps, type SortMode } from "./SortControl";

/*
  Shared catalog page — drives /apps and /games.

  Layout: page header (plain, or an aurora hero panel when `hero` is set),
  a horizontally scrolling chip rail, a ranked "Charts" list ordered by
  chartRank, and an "All …" tile grid filtered by the active chip and
  re-ordered by the sort toggle.

  Apps filter by `category`; games filter by genre (`tags`), since every
  game shares the umbrella category "Games".
*/

/* Cycles the rise delays across grid columns for a staggered mount. */
const RISE = ["animate-rise", "rise-delay-1", "rise-delay-2"] as const;

/* Positioning for the three podium icons in the hero panel. */
const PODIUM_STYLE = [
  { size: 72, rotate: "-10deg", y: 14, z: 1 },
  { size: 104, rotate: "0deg", y: -10, z: 3 },
  { size: 80, rotate: "9deg", y: 20, z: 2 },
] as const;

interface CatalogPageProps {
  kind: AppKind;
  /** Small caps eyebrow above the title. */
  eyebrow: string;
  /** Heading content — pass a text-gradient span for the accented word. */
  title: ReactNode;
  subtitle: string;
  /** Lowercase plural noun used in counts and labels: "apps" | "games". */
  noun: string;
  /** Render the header as an aurora gradient hero panel with podium icons. */
  hero?: boolean;
}

export default function CatalogPage({
  kind,
  eyebrow,
  title,
  subtitle,
  noun,
  hero = false,
}: CatalogPageProps) {
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [sort, setSort] = useState<SortMode>("rated");

  const items = useMemo(() => CATALOG.filter((a) => a.kind === kind), [kind]);

  const charted = useMemo(
    () =>
      items
        .filter((a) => a.chartRank)
        .sort((a, b) => (a.chartRank ?? 0) - (b.chartRank ?? 0)),
    [items],
  );

  const chips = useMemo<CatalogChip[]>(() => {
    if (kind === "game") {
      // Genres come from tags, ordered by how many games carry each.
      const freq = new Map<string, number>();
      for (const game of items) {
        for (const tag of game.tags) {
          freq.set(tag, (freq.get(tag) ?? 0) + 1);
        }
      }
      return [...freq.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([tag]) => ({
          key: tag,
          label: tag.charAt(0).toUpperCase() + tag.slice(1),
        }));
    }
    return [...new Set(items.map((a) => a.category))]
      .sort((a, b) => a.localeCompare(b))
      .map((c) => ({ key: c, label: c }));
  }, [items, kind]);

  const activeLabel =
    category === ALL_CATEGORIES
      ? null
      : (chips.find((c) => c.key === category)?.label ?? category);

  const visible = useMemo(() => {
    const filtered =
      category === ALL_CATEGORIES
        ? items
        : items.filter((a) =>
            kind === "game"
              ? a.tags.includes(category)
              : a.category === category,
          );
    return sortApps(filtered, sort);
  }, [items, category, sort, kind]);

  const nounCap = noun.charAt(0).toUpperCase() + noun.slice(1);
  const totalDownloads = items.reduce((sum, a) => sum + a.downloads, 0);
  const avgRating = items.length
    ? items.reduce((sum, a) => sum + a.rating, 0) / items.length
    : 0;

  // Podium order: silver - gold - bronze, gold elevated in the middle.
  const podium: MarketplaceApp[] = [charted[1], charted[0], charted[2]].filter(
    (g): g is MarketplaceApp => Boolean(g),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="page-shell flex-1 py-10">
        {hero ? (
          <section className="relative overflow-hidden glass rounded-3xl px-6 py-10 sm:px-10 sm:py-12 mb-8 animate-rise">
            {/* Aurora wash */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-20 h-80 w-80 rounded-full blur-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-3), transparent 65%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-36 -left-16 h-96 w-96 rounded-full blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle, var(--accent), transparent 65%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-1/3 h-64 w-64 rounded-full blur-3xl opacity-20"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-2), transparent 65%)",
              }}
            />

            <div className="relative flex items-center justify-between gap-8">
              <div className="min-w-0">
                <p className="label-caps text-accent-2!">{eyebrow}</p>
                <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mt-3">
                  {title}
                </h1>
                <p className="mt-3 max-w-md text-muted">{subtitle}</p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="glass-solid rounded-full px-3.5 py-1.5 text-xs font-mono text-muted">
                    <span className="text-text">{items.length}</span> titles
                  </span>
                  <span className="glass-solid rounded-full px-3.5 py-1.5 text-xs font-mono text-muted">
                    <span className="text-text">
                      {formatDownloads(totalDownloads)}
                    </span>{" "}
                    installs
                  </span>
                  <span className="glass-solid rounded-full px-3.5 py-1.5 text-xs font-mono text-muted">
                    <span className="text-text">{avgRating.toFixed(1)}</span>{" "}
                    avg rating
                  </span>
                </div>
              </div>

              {podium.length > 0 && (
                <div className="hidden md:flex items-start shrink-0 pr-2 pt-4">
                  {podium.map((game, i) => {
                    const s = PODIUM_STYLE[i];
                    return (
                      <Link
                        key={game.slug}
                        href={`/app/${game.slug}`}
                        aria-label={game.name}
                        className={cn(
                          "relative transition-transform duration-200 hover:scale-110",
                          i > 0 && "-ml-9",
                        )}
                        style={{
                          transform: `rotate(${s.rotate}) translateY(${s.y}px)`,
                          zIndex: s.z,
                        }}
                      >
                        <AppIcon app={game} size={s.size} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        ) : (
          <header className="mb-8 animate-rise">
            <p className="label-caps mb-3">{eyebrow}</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="mt-3 max-w-xl text-muted">{subtitle}</p>
            <p className="mt-4 font-mono text-xs text-faint">
              {items.length} {noun} · {charted.length} charted
            </p>
          </header>
        )}

        <div className="rise-delay-1">
          <CategoryChips
            chips={chips}
            active={category}
            onChange={setCategory}
            ariaLabel={
              kind === "game" ? "Filter by genre" : "Filter by category"
            }
          />
        </div>

        <section className="mt-10 rise-delay-2">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="label-caps mb-1.5">Ranked daily</p>
              <h2 className="section-title">Charts</h2>
            </div>
            <span className="font-mono text-xs text-faint">
              Top {charted.length}
            </span>
          </div>
          <ol className="grid gap-3 md:grid-cols-2">
            {charted.map((app, i) => (
              <li key={app.slug}>
                <AppRow
                  app={app}
                  rank={app.chartRank}
                  className={RISE[i % RISE.length]}
                />
              </li>
            ))}
          </ol>
        </section>

        <hr className="divider my-12" />

        <section className="rise-delay-3">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="section-title">All {nounCap}</h2>
              <p className="mt-1 text-sm text-muted">
                Showing {visible.length} of {items.length} {noun}
                {activeLabel ? ` in ${activeLabel}` : ""}
              </p>
            </div>
            <SortControl value={sort} onChange={setSort} />
          </div>

          {visible.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((app, i) => (
                <AppTile
                  key={app.slug}
                  app={app}
                  className={RISE[i % RISE.length]}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl px-6 py-14 text-center">
              <p className="font-semibold">No {noun} here yet</p>
              <p className="mt-1 text-sm text-muted">
                Try a different category — new picks land every week.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
