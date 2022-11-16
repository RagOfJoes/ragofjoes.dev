/* eslint-disable import/no-extraneous-dependencies */
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react(), tailwind()],
  // Fixes build errors
  // Ref: https://github.com/radix-ui/primitives/discussions/1360#discussioncomment-3895387
  vite: {
    ssr: {
      noExternal: [
        '@radix-ui/primitive',
        '@radix-ui/react-compose-refs',
        '@radix-ui/react-context',
        '@radix-ui/react-dismissable-layer',
        '@radix-ui/react-focus-guards',
        '@radix-ui/react-focus-scope',
        '@radix-ui/react-id',
        '@radix-ui/react-popover',
        '@radix-ui/react-popper',
        '@radix-ui/react-portal',
        '@radix-ui/react-presence',
        '@radix-ui/react-primitive',
        '@radix-ui/react-slot',
        '@radix-ui/react-use-callback-ref',
        '@radix-ui/react-use-controllable-state',
        '@radix-ui/react-use-escape-keydown',
        '@radix-ui/react-use-layout-effect',
        '@radix-ui/react-use-size',
      ],
    },
  },
});
