import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

import { sitemapCopier } from "./sitemap-copier";

// https://astro.build/config
export default defineConfig({
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	integrations: [
		sitemap({
			changefreq: "weekly",
			customPages: ["https://www.ragofjoes.dev/Resume.pdf"],
			priority: 0.7,
			lastmod: new Date(),
		}),
		sitemapCopier(),
		solid(),
		tailwind(),
	],
	site: "https://www.ragofjoes.dev/",
});
