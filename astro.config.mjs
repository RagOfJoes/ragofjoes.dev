/* eslint-disable import/no-extraneous-dependencies */
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [solid(), tailwind()],
  site: 'https://www.ragofjoes.dev',
});
