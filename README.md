# dneelamana.com

Personal site for Dhanesh Neela Mana. Single page, static, built with [Astro](https://astro.build), deployed to GitHub Pages on push to `main`.

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
| Page content (hero, Now, About timeline, links) | `src/pages/index.astro` |
| Layout, `<head>` metadata, all CSS and design tokens | `src/layouts/Base.astro` |
| Portrait, favicon, social card image | `public/` |
| Redirects for old blog URLs | `astro.config.mjs` |
| Social card source | `scripts/og.html` |

## Updating the Now section

Edit `nowUpdated` and the `now` array at the top of `src/pages/index.astro`. Keep it to three lines. Update the date whenever the lines change.

## Regenerating the social card

`public/og.png` is a 1200x630 screenshot of `scripts/og.html`. After editing the HTML:

```sh
npm i -D playwright        # one-off; uses the Google Chrome already installed
node scripts/og-shot.mjs
```

Commit the new `public/og.png`.

## Design

"Chalkboard": dark slate-green with one chalk-yellow accent. Fraunces for the headline, Source Sans 3 for body text, JetBrains Mono for labels. Single dark look; no light variant. Tokens are at the top of `src/layouts/Base.astro`.

`_archive/` holds old blog posts (now redirected to Substack). `_reference/` is the previous site. Neither is built.
