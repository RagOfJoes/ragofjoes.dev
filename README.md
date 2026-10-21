# ragofjoes.dev

Portfolio. Single package, no workspaces.

- [React](https://react.dev) + TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Plus](https://viteplus.dev/) + [Nitro](https://nitro.build/)

```sh
src/
├── components/     # shared components
├── lib/            # helpers
├── routes/         # file-based routes
│   └── _index/     # route-local pieces for `/`, `-` prefixed so they never become routes
├── styles/         # base.css holds every design token
└── router.tsx
```

Route-local components live in a `_<route>/` folder beside their route file and are
named `-<route>-<part>.tsx`. The `_` keeps the folder out of the URL and the `-`
keeps the file out of route generation, so a route's pieces sit next to it without
ever becoming routes themselves. Only genuinely shared components go up into
`src/components/`.

## Getting started

```sh
pnpm install
cp .env.example .env
pnpm dev
```

## Scripts

| Script        | Description               |
| ------------- | ------------------------- |
| `pnpm dev`    | Dev server on :3000       |
| `pnpm build`  | Production build          |
| `pnpm lint`   | oxlint, type-aware        |
| `pnpm format` | oxfmt                     |
| `pnpm check`  | Lint + format + typecheck |
| `pnpm test`   | Vitest                    |

Linting and formatting are [oxlint](https://oxc.rs/docs/guide/usage/linter) and
[oxfmt](https://oxc.rs/docs/guide/usage/formatter), configured under the `lint` and
`fmt` keys of `vite.config.ts`. Deploy with `pnpm build` (`vp run build`), not `vp build`.
