import { getAppBySlug } from "@/lib/data";
import type { MarketplaceApp } from "@/types";

export interface Purchase {
  app: MarketplaceApp;
  /** ISO date (YYYY-MM-DD) the app was added to the member's library. */
  purchasedOn: string;
}

const MOCK: Array<[slug: string, purchasedOn: string]> = [
  ["pulse", "2026-09-30"],
  ["lumen", "2026-08-12"],
  ["ember-tactics", "2026-07-22"],
  ["glyph", "2026-06-15"],
];

/**
 * Fake purchase history drawn from the catalog until real order data
 * exists. Exported as a constant so the profile stats and the purchases
 * page always agree.
 */
export const PURCHASES: Purchase[] = MOCK.flatMap(([slug, purchasedOn]) => {
  const app = getAppBySlug(slug);
  return app ? [{ app, purchasedOn }] : [];
});
