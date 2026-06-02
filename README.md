# Impal Food — Next.js

Next.js (App Router) version of the Impal Food website. Migrated from a Vite + React single-page app.

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v3
- lucide-react icons

## Project structure

```
impal-food-next/
  app/
    globals.css      # Tailwind directives
    layout.jsx       # Root layout + metadata
    page.jsx         # Home route — renders <App />
  components/
    App.jsx          # The full app (client component)
  public/
    favicon.svg
    icons.svg
  next.config.mjs
  tailwind.config.js
  postcss.config.mjs
  jsconfig.json
  package.json
```

The original app uses internal state-based navigation (`currentPage`), so the entire UI lives inside one client component (`components/App.jsx`). If you later want true Next.js routes (e.g. `/products`, `/admin`), each page can be split into its own file under `app/`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Notes about the migration

- `App.jsx` is a `"use client"` component because it uses `useState`, `useEffect`, and a `window.scrollTo` call (inside `useEffect`).
- External images load from `images.unsplash.com`. The host is whitelisted in `next.config.mjs` for future `next/image` usage; current code uses plain `<img>` tags, which work without extra config.
- Hard-coded admin credentials (`admin` / `impal2026`) exist in the source — replace these with proper authentication before going to production.
