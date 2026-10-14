"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { AppRow, AppTile } from "@/components/AppCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CATALOG, searchCatalog, topApps, topGames } from "@/lib/data";

const ALL = "All";
const CATEGORIES = Array.from(new Set(CATALOG.map((a) => a.category))).sort();
const TRENDING = ["music", "racing", "puzzle", "maps"];

function SearchBody() {
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(qParam);
  const [category, setCategory] = useState(ALL);

  // Keep the field in sync when arriving via a link such as /search?q=tag.
  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const results = useMemo(() => {
    const matches = searchCatalog(query);
    return category === ALL
      ? matches
      : matches.filter((a) => a.category === category);
  }, [query, category]);

  const q = query.trim();
  const browsing = !q && category === ALL;
  const filtering = !browsing;

  const reset = () => {
    setQuery("");
    setCategory(ALL);
  };

  return (
    <>
      <section className="mx-auto max-w-2xl text-center animate-rise">
        <div className="label-caps">Search the catalog</div>
        <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
          Find your next <span className="text-gradient">favorite app</span>
        </h1>

        <div className="relative mt-7">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="M20 20l-3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps, games, developers…"
            aria-label="Search the catalog"
            className="input-dark"
            style={{ paddingLeft: "2.75rem", paddingRight: "2.75rem" }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-faint transition-colors hover:bg-surface-2 hover:text-text"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {[ALL, ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              data-active={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {!q && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-faint">
            <span>Trending:</span>
            {TRENDING.map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                onClick={() => setQuery(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </section>

      {filtering && (
        <div className="mt-10 mb-4 flex items-center justify-between gap-4 animate-rise">
          <p className="text-sm text-muted">
            <span className="font-semibold text-text">{results.length}</span>{" "}
            {results.length === 1 ? "result" : "results"}
            {q && (
              <>
                {" "}
                for <span className="text-text">“{q}”</span>
              </>
            )}
            {category !== ALL && (
              <>
                {" "}
                in <span className="text-text">{category}</span>
              </>
            )}
          </p>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 text-xs font-medium text-accent-2 transition-colors hover:text-text"
          >
            Clear
          </button>
        </div>
      )}

      {browsing ? (
        <>
          <section className="mt-10 rise-delay-1">
            <h2 className="section-title mb-4">Top charts</h2>
            <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
              <div>
                <div className="label-caps mb-3">Apps</div>
                <div className="space-y-3">
                  {topApps()
                    .slice(0, 3)
                    .map((a) => (
                      <AppRow key={a.slug} app={a} rank={a.chartRank} />
                    ))}
                </div>
              </div>
              <div>
                <div className="label-caps mb-3">Games</div>
                <div className="space-y-3">
                  {topGames()
                    .slice(0, 3)
                    .map((a) => (
                      <AppRow key={a.slug} app={a} rank={a.chartRank} />
                    ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12 rise-delay-2">
            <h2 className="section-title mb-4">Browse everything</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {CATALOG.map((a, i) => (
                <div
                  key={a.slug}
                  className="animate-rise"
                  style={{ animationDelay: `${Math.min(i * 40, 320)}ms` }}
                >
                  <AppTile app={a} className="h-full" />
                </div>
              ))}
            </div>
          </section>
        </>
      ) : results.length === 0 ? (
        <div className="glass mt-4 rounded-2xl px-6 py-16 text-center animate-rise">
          <div className="glass-solid mx-auto flex h-16 w-16 items-center justify-center rounded-full text-faint">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M8.5 11h5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="font-display mt-5 text-lg font-semibold">
            No apps match {q ? `“${q}”` : "this filter"}
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Try a different search, or clear the filters to browse everything.
          </p>
          <button type="button" onClick={reset} className="btn-ghost mt-6">
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((a, i) => (
            <div
              key={a.slug}
              className="animate-rise"
              style={{ animationDelay: `${Math.min(i * 40, 320)}ms` }}
            >
              <AppTile app={a} className="h-full" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="page-shell flex-1 py-10">
        <Suspense
          fallback={
            <div className="py-24 text-center text-sm text-faint">
              Loading search…
            </div>
          }
        >
          <SearchBody />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
