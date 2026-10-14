import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppRow, Stars } from "@/components/AppCard";
import AppIcon from "@/components/AppIcon";
import AppShot from "@/components/detail/AppShot";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CATALOG, appsByCategory, getAppBySlug } from "@/lib/data";
import {
  formatDate,
  formatDownloads,
  formatPrice,
  formatSize,
} from "@/lib/helpers";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return CATALOG.map((app) => ({ id: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const app = getAppBySlug(id);
  if (!app) return { title: "App not found" };
  return { title: app.name, description: app.description };
}

const CHEVRON = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    className="shrink-0 text-faint"
    aria-hidden="true"
  >
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function MetaIcon({ path }: { path: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-faint"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = {
  downloads: "M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16",
  size: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM4 7.5l8 4.5 8-4.5M12 12v9",
  age: "M12 3l7 3v5c0 4.4-3 7.8-7 9.2-4-1.4-7-4.8-7-9.2V6l7-3z",
  version: "M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8zM7.5 7.5h.01",
  updated: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.5 2",
};

export default async function AppDetailPage({ params }: PageProps) {
  const { id } = await params;
  const app = getAppBySlug(id);
  if (!app) notFound();

  const related = appsByCategory(app.category)
    .filter((a) => a.slug !== app.slug)
    .slice(0, 3);

  const meta = [
    {
      label: "Downloads",
      value: formatDownloads(app.downloads),
      icon: ICONS.downloads,
    },
    { label: "Size", value: formatSize(app.sizeMb), icon: ICONS.size },
    { label: "Age", value: app.ageRating, icon: ICONS.age },
    { label: "Version", value: `v${app.version}`, icon: ICONS.version },
    { label: "Updated", value: formatDate(app.updatedAt), icon: ICONS.updated },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="page-shell flex-1 py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="animate-rise mb-8 flex items-center gap-2 text-sm"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Discover
          </Link>
          {CHEVRON}
          <Link
            href={`/search?q=${encodeURIComponent(app.category)}`}
            className="text-muted transition-colors hover:text-text"
          >
            {app.category}
          </Link>
          {CHEVRON}
          <span className="truncate text-text">{app.name}</span>
        </nav>

        {/* Hero */}
        <section className="animate-rise glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <AppIcon app={app} size={120} />
            <div className="min-w-0 flex-1">
              {app.badge && (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.08)] px-3 py-1 text-xs font-semibold text-accent-2">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.5L12 17.4l-5.9 3.2 1.3-6.5-4.9-4.6 6.6-.8z" />
                  </svg>
                  {app.badge}
                </span>
              )}
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {app.name}
              </h1>
              <p className="mt-1.5 text-muted">{app.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/search?q=${encodeURIComponent(app.developer)}`}
                  className="chip"
                >
                  {app.developer}
                </Link>
                <Link
                  href={`/search?q=${encodeURIComponent(app.category)}`}
                  className="chip"
                >
                  {app.category}
                </Link>
                <span className="chip cursor-default">
                  {app.kind === "game" ? "Game" : "App"}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <Stars rating={app.rating} size={15} />
                <span className="font-semibold">{app.rating.toFixed(1)}</span>
                <span className="text-faint">
                  · {formatDownloads(app.ratingsCount)} ratings
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:justify-center sm:border-l sm:border-border sm:pl-8">
              <button type="button" className="btn-primary">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {app.price === 0 ? "Get" : `Get · ${formatPrice(app.price)}`}
              </button>
              <button type="button" className="btn-ghost">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 20.5s-8-4.9-8-10.5A4.5 4.5 0 0112 7a4.5 4.5 0 018 3c0 5.6-8 10.5-8 10.5z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                Wishlist
              </button>
            </div>
          </div>
        </section>

        {/* Metadata strip */}
        <section className="rise-delay-1 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {meta.map((m) => (
            <div key={m.label} className="glass rounded-2xl px-4 py-4">
              <div className="flex items-center gap-1.5">
                <MetaIcon path={m.icon} />
                <span className="label-caps">{m.label}</span>
              </div>
              <div className="font-display mt-2 text-lg font-semibold">
                {m.value}
              </div>
            </div>
          ))}
        </section>

        {/* Preview */}
        <section className="rise-delay-2 mt-10">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="section-title">Preview</h2>
            <span className="text-xs text-faint">Generated artwork</span>
          </div>
          <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
            {[0, 1, 2].map((i) => (
              <AppShot
                key={i}
                app={app}
                index={i}
                className="w-44 shrink-0 sm:w-52"
              />
            ))}
          </div>
        </section>

        {/* About + tags */}
        <section className="rise-delay-3 mt-10">
          <h2 className="section-title mb-4">
            About this {app.kind === "game" ? "game" : "app"}
          </h2>
          <div className="glass rounded-2xl p-6">
            <p className="leading-relaxed text-muted">{app.description}</p>
            <hr className="divider my-5" />
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <div className="label-caps">Developer</div>
                <div className="mt-1 text-sm font-medium text-accent-2">
                  {app.developer}
                </div>
              </div>
              <div>
                <div className="label-caps">Category</div>
                <div className="mt-1 text-sm font-medium">{app.category}</div>
              </div>
              <div>
                <div className="label-caps">Age rating</div>
                <div className="mt-1 text-sm font-medium">{app.ageRating}</div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {app.tags.map((t) => (
              <Link
                key={t}
                href={`/search?q=${encodeURIComponent(t)}`}
                className="chip"
              >
                #{t}
              </Link>
            ))}
          </div>
        </section>

        {/* More like this */}
        {related.length > 0 && (
          <section className="rise-delay-3 mt-12">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 className="section-title">More like this</h2>
              <Link
                href={`/search?q=${encodeURIComponent(app.category)}`}
                className="text-sm font-medium text-accent-2 transition-colors hover:text-text"
              >
                See all
              </Link>
            </div>
            <div className="space-y-3">
              {related.map((a) => (
                <AppRow key={a.slug} app={a} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
