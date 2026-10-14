import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedHero from "@/components/home/FeaturedHero";
import NewUpdated from "@/components/home/NewUpdated";
import TopCharts from "@/components/home/TopCharts";

export const metadata: Metadata = {
  title: "Today",
  description:
    "Editor's picks, top charts, and fresh releases — curated daily by Nova Market.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="page-shell flex-1 py-10">
        <div className="animate-rise">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Today
          </h1>
          <p className="mt-2 max-w-lg text-muted">
            Hand-picked apps and games, refreshed daily by our editors.
          </p>
        </div>

        <div className="mt-8 space-y-14">
          <FeaturedHero />
          <TopCharts />
          <CategoryGrid />
          <NewUpdated />
        </div>
      </main>
      <Footer />
    </div>
  );
}
