"use client";

import { useState } from "react";
import { AppRow } from "@/components/AppCard";
import { topApps, topGames } from "@/lib/data";

/*
  Top Charts — client-side Apps / Games tab switcher. The list is
  keyed by the active tab so rows remount and replay their
  staggered rise animation on every switch.
*/

const TABS = [
  { id: "apps", label: "Apps" },
  { id: "games", label: "Games" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function TopCharts() {
  const [tab, setTab] = useState<TabId>("apps");
  const apps = tab === "apps" ? topApps() : topGames();

  return (
    <section aria-label="Top charts" className="animate-rise rise-delay-1">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Top Charts</h2>
          <p className="mt-1 text-sm text-muted">
            The most-downloaded {tab === "apps" ? "apps" : "games"} right
            now.
          </p>
        </div>
        <div className="flex gap-2" role="tablist" aria-label="Chart type">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              data-active={tab === t.id}
              onClick={() => setTab(t.id)}
              className="chip"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <ul key={tab} role="tabpanel" className="grid gap-3 md:grid-cols-2">
        {apps.map((app, i) => (
          <li
            key={app.slug}
            className="animate-rise"
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <AppRow app={app} rank={i + 1} />
          </li>
        ))}
      </ul>
    </section>
  );
}
