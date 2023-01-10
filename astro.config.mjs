/* eslint-disable import/no-unresolved */
import sitemap from '@astrojs/sitemap';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    solid(),
    tailwind(),
  ],
  site: 'https://www.ragofjoes.dev',
});
