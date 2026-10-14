# Nova Market

A dark-first, aurora-themed marketplace for discovering standout apps and
games. Built with Next.js 15 (App Router), Tailwind CSS v4, TypeScript, and
Firebase.

## Features

- **Today** — editorial featured picks (App of the Day, Game of the Day)
- **Top charts** — ranked lists for apps and games, plus category browsing
- **Search** — instant search across the catalog by name, developer, category, and tags
- **Submit an app** — signed-in users can upload listings (artwork goes to
  Cloud Storage; the listing lands in Firestore as `pending` review)
- **Accounts** — Firebase Auth sign-in/sign-up, profile, purchases, and settings pages
- Dark glass design system (violet → cyan accents) defined in `app/globals.css`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev script is
`next dev --turbopack`; pass `--port <n>` to use a different port.

## Firebase setup (optional)

The catalog is fully browsable **without** Firebase — the app renders from
local data and only auth + app submissions are disabled. To enable them:

1. Create a Firebase project and enable **Authentication**, **Cloud Firestore**,
   and **Cloud Storage**.
2. Create `.env.local` in the repo root:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

3. Restart the dev server.

## Scripts

| Command           | What it does                        |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Dev server with Turbopack           |
| `npm run build`   | Production build                    |
| `npm run start`   | Serve the production build          |
| `npm run lint`    | Lint with `eslint-config-next`      |

## Deploy

Deploys cleanly to [Vercel](https://vercel.com/new) — add the
`NEXT_PUBLIC_FIREBASE_*` env vars in the project settings.
