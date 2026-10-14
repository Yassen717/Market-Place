export type AppKind = "app" | "game";

export interface MarketplaceApp {
  /** URL slug, used for /app/[id] routes */
  slug: string;
  name: string;
  developer: string;
  kind: AppKind;
  category: string;
  tagline: string;
  description: string;
  rating: number;
  ratingsCount: number;
  downloads: number;
  /** 0 = Free */
  price: number;
  ageRating: string;
  version: string;
  sizeMb: number;
  updatedAt: string;
  /** Two CSS colors used to render the app's generated icon/art */
  accent: [string, string];
  /** Optional editorial badge, e.g. "App of the Day" */
  badge?: string;
  /** Position in the top charts (1-based), if charted */
  chartRank?: number;
  tags: string[];
}

export const APP_CATEGORIES = [
  "Games",
  "Business",
  "Education",
  "Entertainment",
  "Finance",
  "Food & Drink",
  "Health & Fitness",
  "Lifestyle",
  "Medical",
  "Music",
  "Navigation",
  "News",
  "Photo & Video",
  "Productivity",
  "Reference",
  "Shopping",
  "Social Networking",
  "Sports",
  "Travel",
  "Utilities",
] as const;

export type AppCategory = (typeof APP_CATEGORIES)[number];
