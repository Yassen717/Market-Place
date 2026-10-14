"use client";

import CatalogPage from "@/components/catalog/CatalogPage";

export default function GamesPage() {
  return (
    <CatalogPage
      kind="game"
      hero
      eyebrow="Nova Arcade"
      title={
        <>
          Top <span className="text-gradient">Games</span>
        </>
      }
      subtitle="The standouts, the time-sinks, the instant classics — every game here fought its way onto the chart."
      noun="games"
    />
  );
}
