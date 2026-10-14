import { AppTile } from "@/components/AppCard";
import { CATALOG } from "@/lib/data";
import { formatDate } from "@/lib/helpers";

/*
  New & Updated — horizontal snap-scrolling strip of apps updated in
  October 2026 (the catalog's current month), freshest first. The
  strip bleeds into the page-shell padding so tiles scroll
  edge-to-edge on mobile.
*/

const CURRENT_MONTH = "2026-10";

export default function NewUpdated() {
  const fresh = CATALOG.filter((a) => a.updatedAt.startsWith(CURRENT_MONTH))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  if (fresh.length === 0) return null;

  return (
    <section
      aria-label="New and updated"
      className="animate-rise rise-delay-3"
    >
      <div className="mb-5">
        <h2 className="section-title">New &amp; Updated</h2>
        <p className="mt-1 text-sm text-muted">
          Fresh releases and updates from this month.
        </p>
      </div>
      <div className="-mx-6 snap-x snap-proximity overflow-x-auto px-6 pb-3 md:-mx-8 md:px-8">
        <div className="flex gap-4">
          {fresh.map((app) => (
            <div key={app.slug} className="w-40 shrink-0 snap-start">
              <AppTile app={app} className="h-full" />
              <div className="mt-2 text-center text-[11px] text-faint">
                Updated {formatDate(app.updatedAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
