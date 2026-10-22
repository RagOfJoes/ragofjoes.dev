# ragofjoes.dev

Portfolio at [www.ragofjoes.dev](https://www.ragofjoes.dev). Single package, no workspaces.

- [React](https://react.dev) + TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest)
- [Tailwind CSS](https://tailwindcss.com/), [Base UI](https://base-ui.com/) and [Motion](https://motion.dev/)
- [Vite Plus](https://viteplus.dev/) + [Nitro](https://nitro.build/), deployed on [Vercel](https://vercel.com/)

```sh
scripts/
└── images.ts           # placeholders and thumbnails for images in public/
src/
├── components/         # shared components (windows, dialog, image viewer, …)
├── lib/
│   └── constants.ts    # site details, the resume, shared animation settings
├── routes/             # file-based routes
│   ├── _index/         # pieces of `/`
│   ├── _resume/        # pieces of `/resume`
│   └── projects/       # `/projects` and its child routes, with their pieces
├── styles/             # base.css holds every design token
└── router.tsx
```

Route-local components live beside their route and are named `-<route>-<part>.tsx`:
in a `_<route>/` folder when the route has no children (the `_` keeps the folder out
of the URL), or in the route's own folder when it does. The `-` keeps the file out of
route generation, so a route's pieces sit next to it without ever becoming routes
themselves. Only genuinely shared components go up into `src/components/`.

## Getting started

```sh
pnpm install
pnpm dev
```

## Scripts

| Script                | Description                                       |
| --------------------- | ------------------------------------------------- |
| `pnpm dev`            | Dev server on :3000                               |
| `pnpm build`          | Production build                                  |
| `pnpm start`          | Serve the production build                        |
| `pnpm lint`           | oxlint, type-aware                                |
| `pnpm format`         | oxfmt                                             |
| `pnpm check`          | Lint + format + typecheck                         |
| `pnpm test`           | Vitest                                            |
| `pnpm images <files>` | Placeholders and thumbnails for images in public/ |

Linting and formatting are [oxlint](https://oxc.rs/docs/guide/usage/linter) and
[oxfmt](https://oxc.rs/docs/guide/usage/formatter), configured under the `lint` and
`fmt` keys of `vite.config.ts`. Deploy with `pnpm build` (`vp run build`), not `vp build`.

## Updating content

- **Resume:** edit `RESUME` in `src/lib/constants.ts` (the `/resume` page and the home
  page's Experience window both read it), replace `public/Victor-Ragojos-Resume.pdf`, and
  bump `updated`. The PDF is still made by hand, so keep the two in step.
- **Images:** after adding one to `public/`, run `pnpm images public/path/to/image.jpg`.
  `Image` finds the generated copies by path: a blurry placeholder in
  `public/placeholders/` and thumbnails in `public/thumbnails/<width>/`, offered through
  `srcset` wherever it's given `sizes`. Without them an image still works, just with no
  placeholder and always at full size.

## Deploying

Pushes to `main` deploy to production on Vercel; other branches get preview deploys. Nitro
detects Vercel and builds for it, so there's no Vercel config in the repo. Security
headers (CSP and friends, production only) and the `/resume.pdf` redirect are Nitro route
rules in `vite.config.ts`; the `ragofjoes.dev` → `www` redirect lives in Vercel's domain
settings.
