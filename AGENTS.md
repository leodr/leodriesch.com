# leodriesch.com

Personal website for Leo Driesch. Static HTML site served with Vite, monospace/monochrome aesthetic using a custom Iosevka font.

## Tech stack

- Plain HTML + CSS, no framework
- Vite for dev server and build
- Custom Iosevka web font (woff2 files in `fonts/`)
- Node with native TypeScript for scripts

## File structure

```
index.html              Landing page
about.html              About page
work/                   Project detail pages
writing/                Blog posts
css/style.css           All styles (single file)
fonts/                  Iosevka Custom woff2 files + @font-face CSS
assets/                 Images (portrait, project screenshots)
scripts/                Node scripts (TypeScript, run with `node`)
  to-markdown.ts        Extracts rendered text from index.html into index.md
```

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `node scripts/to-markdown.ts` — generate `index.md` from `index.html`
