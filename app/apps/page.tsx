"use client";

import CatalogPage from "@/components/catalog/CatalogPage";

export default function AppsPage() {
  return (
    <CatalogPage
      kind="app"
      eyebrow="The Catalog"
      title={
        <>
          Top <span className="text-gradient">Apps</span>
        </>
      }
      subtitle="Hand-picked software worth your home screen — every title reviewed, ranked, and ready to install."
      noun="apps"
    />
  );
}
