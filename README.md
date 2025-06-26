# App Marketplace

A modern marketplace for discovering and downloading apps, built with Next.js and Tailwind CSS.

## Features
- **Home Screen**: 
  - Header with search bar and user avatar
  - Featured section (App of the Day, Game of the Day, App of the Week)
  - Top Charts (Apps/Games tabs, app list with GET buttons)
  - Browse Categories (grid of app categories)
  - Footer with links and social icons
- Responsive, clean UI inspired by leading app stores

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the Home screen by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Image Assets
Add the following images to your `public/` or `public/assets/` directory as needed:
- `/logo.svg` (App Marketplace logo)
- `/avatar.png` (User avatar)
- `/assets/featured-app-1.png`, `/assets/featured-app-2.png`, `/assets/featured-app-3.png` (Featured section)
- `/assets/app-connect.png`, `/assets/app-capture.png`, etc. (Top charts)

You can use your own images or download placeholders.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
