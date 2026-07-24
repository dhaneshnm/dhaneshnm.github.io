import { defineConfig } from "astro/config";

// https://astro.build/config
// Custom domain (dneelamana.com) served at root — no `base`.
export default defineConfig({
  site: "https://dneelamana.com",
  redirects: {
    "/blog": "https://dhaneshneelamana.substack.com",
    "/about": "/",
    "/social": "/",
    "/resume": "https://www.linkedin.com/in/dhanesh-neela-mana-ab63a01a/",
    // Old per-post blog URLs (/blog/<slug>) → Substack root.
    // Explicit slugs (not `/blog/[...slug]`): a spread source can't interpolate
    // into an external destination in static output, so we enumerate the
    // 14 archived posts in _archive/posts/ for guaranteed static redirect pages.
    "/blog/aI-extreme-proramming": "https://dhaneshneelamana.substack.com",
    "/blog/an-app-with-gpt": "https://dhaneshneelamana.substack.com",
    "/blog/big-ball-of-mud": "https://dhaneshneelamana.substack.com",
    "/blog/hydration": "https://dhaneshneelamana.substack.com",
    "/blog/island-architecture": "https://dhaneshneelamana.substack.com",
    "/blog/microtasks-explainer": "https://dhaneshneelamana.substack.com",
    "/blog/observables": "https://dhaneshneelamana.substack.com",
    "/blog/proxy-identity-paper": "https://dhaneshneelamana.substack.com",
    "/blog/reflect-apply": "https://dhaneshneelamana.substack.com",
    "/blog/revocable-proxy": "https://dhaneshneelamana.substack.com",
    "/blog/second-brain": "https://dhaneshneelamana.substack.com",
    "/blog/second-post": "https://dhaneshneelamana.substack.com",
    "/blog/source-code-rejuvenation": "https://dhaneshneelamana.substack.com",
    "/blog/top-level-await": "https://dhaneshneelamana.substack.com",
  },
});
