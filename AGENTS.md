# SUMExXx.github.io

Suman Debnath's profile and blog. Next.js App Router, TypeScript, Tailwind v4,
MUI icons. Served by **GitHub Pages**, so the whole site is a static export.

## The things that bite

1. **There is no server.** `next.config.ts` sets `output: 'export'`; `next build`
   writes plain files to `out/`. Route handlers (`src/app/api`), `proxy.ts`,
   `cookies()`/`headers()`, ISR and the image optimiser do not exist here. A
   feature that needs a backend needs a different host.
2. **Dynamic routes must list their params.** `blog/[slug]` exports
   `generateStaticParams` from `src/lib/blogData/blogs.tsx`; a blog missing from
   that array is a 404. Metadata routes (`robots.ts`, `sitemap.ts`) need
   `export const dynamic = 'force-static'`.
3. **The contact form is `mailto:`**, not an email API — there is nothing to
   send from.
4. **The built site is committed in the repo root.** `npm run build` runs
   `next build` then `scripts/publish-root.mjs`, which merges the CSS chunks into
   `/index.css`, points every page at it, and copies `out/` over the root
   (`index.html`, `_next/`, `blog/`, `projects/`, `images/`, ...). Never hand-edit
   those; edit `src/` or `public/` and rebuild. Pages serves `main` / root. A page
   removed from the app is deleted from the root on the next build (`.published`
   lists what the last build copied).
5. `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BLOG_URL` default to
   `https://sumexxx.github.io` in `next.config.ts`; `.env.local` overrides them
   for local dev.

## Before saying it works

```bash
npm run typecheck && npm run lint && npm run build
```

## House style

Prettier (tabs, single quotes, 120 cols) enforced through ESLint; husky runs
lint-staged and the typecheck on commit; commit messages follow Conventional
Commits (commitlint). Comments explain *why*, never *what*. Deliberate shortcuts
are marked `ponytail:` with their ceiling.
