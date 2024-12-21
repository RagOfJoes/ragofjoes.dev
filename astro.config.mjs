/* eslint-disable import/no-unresolved */
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "astro/config";

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
			priority: 0.7,
			lastmod: new Date(),
		}),
		solid(),
		tailwind(),
	],
	site: "https://www.ragofjoes.dev/",
});
