import Link from "next/link";
import { appsByCategory } from "@/lib/data";
import type { AppCategory } from "@/types";

/*
  Browse Categories — every storefront category as a glass tile.
  ALL_CATEGORIES mirrors APP_CATEGORIES from @/types: that module is
  a .d.ts, which the bundler can't resolve as a runtime value, so the
  list is duplicated here and kept honest by the AppCategory type —
  a typo'd or non-catalog category name fails typecheck.
*/

const ALL_CATEGORIES: readonly AppCategory[] = [
  "Games",
  "Business",
  "Education",
  "Entertainment",
  "Finance",
  "Food & Drink",
  "Health & Fitness",
  "Lifestyle",
  "Medical",
  "Music",
  "Navigation",
  "News",
  "Photo & Video",
  "Productivity",
  "Reference",
  "Shopping",
  "Social Networking",
  "Sports",
  "Travel",
  "Utilities",
];

// Token-based dot gradients, cycled deterministically per category.
const DOTS = [
  "linear-gradient(135deg, var(--accent), var(--accent-2))",
  "linear-gradient(135deg, var(--accent-3), var(--accent))",
  "linear-gradient(135deg, var(--good), var(--accent-2))",
  "linear-gradient(135deg, var(--warn), var(--accent-3))",
  "linear-gradient(135deg, var(--accent-2), var(--good))",
  "linear-gradient(135deg, var(--bad), var(--warn))",
];

export default function CategoryGrid() {
  return (
    <section aria-label="Categories" className="animate-rise rise-delay-2">
      <div className="mb-5">
        <h2 className="section-title">Browse Categories</h2>
        <p className="mt-1 text-sm text-muted">
          Twenty aisles to wander — find your next obsession.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {ALL_CATEGORIES.map((cat, i) => {
          const count = appsByCategory(cat).length;
          return (
            <Link
              key={cat}
              href={`/search?q=${encodeURIComponent(cat)}`}
              className="group glass card-hover flex items-center gap-3 rounded-2xl p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: DOTS[i % DOTS.length] }}
                />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold transition-colors group-hover:text-accent-2">
                  {cat}
                </span>
                <span className="block text-xs text-faint">
                  {count > 0
                    ? `${count} app${count === 1 ? "" : "s"}`
                    : "No apps yet"}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
