# Tasteless Media AI Studio

A dark-mode, technical-brutalist marketing surface for Tasteless Media's AI studio. The project now runs as a modern Vite + React + Tailwind application, which means it can be deployed on any static host—including [Cloudflare Pages](https://developers.cloudflare.com/pages/).

## Prerequisites

- Node.js 18+
- npm 9+

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to preview the experience.

## Production build

```bash
npm run build
```

The optimized assets will be emitted to `dist/`. Preview them locally with `npm run preview`.

## Deploying to Cloudflare Pages

1. Push this repository to GitHub/GitLab and connect it to a new Pages project.
2. Use the following build configuration:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `18` (or newer)
3. (Optional) Set `NODE_VERSION=18` in the Pages project settings to match local builds.

Each commit will now automatically produce a production build on Cloudflare's global edge.
