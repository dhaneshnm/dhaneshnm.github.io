# dneelamana.com

Personal site for Dhanesh Neela Mana. A profile page plus a Reports section, static, built with [Astro](https://astro.build), deployed to GitHub Pages on push to `main`.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
npm run preview  # serve dist/ locally
```

Requires Node 22.12 or newer.

## Where things live

| What | File |
|---|---|
| Page content (hero, Now, Reports, Work, links) | `src/pages/index.astro` |
| Layout, `<head>` metadata, all CSS and design tokens | `src/layouts/Base.astro` |
| Site header and footer | `src/components/Header.astro`, `src/components/Footer.astro` |
| Report list (title, date, summary) | `src/data/reports.ts` |
| Reports index page (`/reports/`) | `src/pages/reports/index.astro` |
| Report pages, with their images and social cards | `public/reports/<slug>/` |
| Portrait, favicon, social card image | `public/` |
| Redirects for old blog URLs | `astro.config.mjs` |
| Social card source | `scripts/og.html` |

## Updating the Now section

Edit `nowUpdated` and the `now` array at the top of `src/pages/index.astro`. Keep it to three lines. Update the date whenever the lines change.

## Adding a report

A report is a self-contained HTML page with its own styles. It is copied to the site without changes.

1. Put the page at `public/reports/<slug>/index.html`, with its images beside it. Use absolute paths
   (`/reports/<slug>/...`) for images, so the page works with or without a trailing slash.
2. Give it a 1200x630 social card at `public/reports/<slug>/og.png`, and point `og:image` at it.
3. Add an entry at the top of `reports` in `src/data/reports.ts`. The home page shows the newest entry, and
   `/reports/` lists all of them.

`/blog` redirects to Substack (see `astro.config.mjs`), so reports live under `/reports/`.

## Regenerating the social card

`public/og.png` is a 1200x630 screenshot of `scripts/og.html`. After editing the HTML:

```sh
npm i -D playwright        # one-off; uses the Google Chrome already installed
node scripts/og-shot.mjs
```

Commit the new `public/og.png`.

## Design

"Red Pen": a printed textbook page marked up by a teacher. Spectral for print, Shantell Sans for the red margin notes. Single light look. Tokens are at the top of `src/layouts/Base.astro`. Report pages keep their own design.

`_archive/` holds old blog posts (now redirected to Substack). `_reference/` is the previous site. Neither is built.
