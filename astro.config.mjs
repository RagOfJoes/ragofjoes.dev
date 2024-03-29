/* eslint-disable import/no-unresolved */
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel/static";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	adapter: vercelStatic({
		analytics: true,
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
	vite: {
		define: {
			"import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID": JSON.stringify(
				process.env.VERCEL_ANALYTICS_ID
			),
		},
	},
	site: "https://www.ragofjoes.dev/",
});
