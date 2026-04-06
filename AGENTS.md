# leodriesch.com

Personal website for Leo Driesch, now built with React Router v7 in framework mode and statically prerendered at build time. The visual language is still monochrome/monospace and uses a custom Iosevka web font.

## Tech stack

- React 19
- React Router v7 framework mode
- Static site generation via `react-router.config.ts` prerendering
- React Three Fiber for the interactive homepage portrait
- Vite under the React Router toolchain
- Custom Iosevka web font served from `public/fonts/`
- Node with native TypeScript for scripts

## File structure

```text
app/
  root.tsx                     Root document/layout
  app.css                      Global site styles
  routes.ts                    React Router route definitions
  components/
    coin-portrait.tsx          Homepage React Three Fiber scene
    site-footer.tsx            Shared footer/signature component
  routes/
    home.tsx                   Landing page
    about.tsx                  About page
    work.*.tsx                 Individual work pages
    writing.*.tsx              Individual writing pages
public/
  assets/                      Images, PDFs, project screenshots
  fonts/                       Iosevka Custom woff2 files + @font-face CSS
react-router.config.ts         SSG/prerender configuration
vite.config.ts                 Vite + React Router plugin config
wrangler.toml                  Cloudflare static asset output target
```

## Routing

- `/` prerenders the homepage
- `/about` prerenders the about page
- `/work/*` uses explicit route modules for each project page
- `/writing/*` uses explicit route modules for each article page

When adding a new work entry or post, create a new route module, add it to `app/routes.ts`, and add its URL to `react-router.config.ts`.

## Commands

- `npm run dev` — start the React Router dev server
- `npm run build` — generate the statically prerendered site into `build/client`
- `npm run typecheck` — run React Router typegen and TypeScript checks
- `npm run markdown` — generate `index.md` from the homepage content snapshot

## Notes

- Keep page content in route components as JSX. This repo no longer uses a shared data-object layer for articles or project pages.
- Keep global visual styling in `app/app.css`; there is no longer a live `css/style.css`.
- The old imperative `js/metal.ts` setup is legacy and not used by the app. The active 3D portrait implementation lives in `app/components/coin-portrait.tsx`.
- Deployable static output lives in `build/client`, which matches the current `wrangler.toml` configuration.
