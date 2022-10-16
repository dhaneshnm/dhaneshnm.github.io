import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "http://dhaneshnm.github.io",
  base: "/personal-website",
  integrations: [mdx(), sitemap()],
});
