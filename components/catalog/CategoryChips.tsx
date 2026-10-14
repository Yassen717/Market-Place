"use client";

/*
  Shared horizontal chip rail used by the catalog pages (/apps, /games).
  Renders an "All" chip plus the provided chips; the selected chip is
  marked with data-active="true" (styled in globals.css) + aria-pressed.
  The rail scrolls horizontally on small screens with the scrollbar hidden.
*/

export const ALL_CATEGORIES = "all";

export interface CatalogChip {
  key: string;
  label: string;
}

export default function CategoryChips({
  chips,
  active,
  onChange,
  ariaLabel = "Filter by category",
}: {
  chips: CatalogChip[];
  active: string;
  onChange: (key: string) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <button
        type="button"
        className="chip"
        data-active={active === ALL_CATEGORIES}
        aria-pressed={active === ALL_CATEGORIES}
        onClick={() => onChange(ALL_CATEGORIES)}
      >
        All
      </button>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          className="chip"
          data-active={active === chip.key}
          aria-pressed={active === chip.key}
          onClick={() => onChange(chip.key)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
