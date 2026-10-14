"use client";

import { cn } from "@/lib/helpers";
import type { MarketplaceApp } from "@/types";

/*
  Segmented sort toggle shared by the catalog pages. `sortApps` holds the
  ordering logic so /apps and /games never duplicate it.
*/

export type SortMode = "rated" | "downloads" | "az";

export const SORT_OPTIONS: Array<{ id: SortMode; label: string }> = [
  { id: "rated", label: "Top Rated" },
  { id: "downloads", label: "Most Downloaded" },
  { id: "az", label: "A–Z" },
];

export function sortApps(
  list: MarketplaceApp[],
  mode: SortMode,
): MarketplaceApp[] {
  const sorted = [...list];
  switch (mode) {
    case "downloads":
      return sorted.sort((a, b) => b.downloads - a.downloads);
    case "az":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "rated":
    default:
      return sorted.sort(
        (a, b) => b.rating - a.rating || b.ratingsCount - a.ratingsCount,
      );
  }
}

export default function SortControl({
  value,
  onChange,
}: {
  value: SortMode;
  onChange: (mode: SortMode) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Sort catalog"
      className="glass rounded-full p-1 inline-flex gap-1"
    >
      {SORT_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          aria-pressed={value === opt.id}
          onClick={() => onChange(opt.id)}
          className={cn(
            "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
            value === opt.id
              ? "text-white bg-[linear-gradient(135deg,rgba(124,92,255,0.35),rgba(34,211,238,0.2))]"
              : "text-muted hover:text-text",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
