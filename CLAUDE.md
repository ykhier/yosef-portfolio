# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend
npm install        # Install dependencies (required before first run)
npm run dev        # Start dev server (uses rolldown-vite on localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run deploy     # Build + deploy to GitHub Pages (gh-pages -d dist)

# Backend (server/)
cd server && npm install   # Install server dependencies
cd server && npm run dev   # Start API server on localhost:3001 (requires nodemon)
cd server && npm start     # Start API server in production
```

No test suite is configured.

## Architecture

Single-page portfolio site built with React 19 + Vite + Tailwind CSS v4.

**Page composition** — `App.jsx` renders sections in order:
```
Header → AboutUs → Skills → Education → Projects → ContactMe
```

Each section is a standalone `<section>` tag with `id` matching the nav links in `Header.jsx`.

**Shared primitives:**
- `Title.jsx` — gradient heading + underline bar, used by every section
- `Line.jsx` — horizontal divider
- `Technology.jsx` — renders a responsive grid of skill cards; accepts `skills` (array of `{ name, icon, color }`) and `title` props

**Skills section pattern** — `Skills.jsx` defines two data arrays (`skills`, `tools`) and passes them to `<Technology>`. Icons come from two sources:
- `react-icons/si` and `react-icons/fa` for standard icons (imported as components)
- `@iconify/react` `<Icon>` for icons not in react-icons (wrapped in small arrow-function components at the top of the file)

**Contact form** — `ContactMe.jsx` uses EmailJS (`@emailjs/browser`) with credentials hard-coded in the file (service ID, template ID, public key). Sends on form submit via `emailjs.sendForm`.

**Dark mode** — `useDarkMode.js` exports a `useDarkMode()` hook that persists preference to `localStorage` and toggles the `dark` class on `<html>`. Called in `Header.jsx`; all dark-mode variants use Tailwind's `dark:` prefix.

**Animations** — `animations.js` exports shared Framer Motion variants (`fadeUp`, `staggerContainer`, `staggerCard`) and pre-wrapped motion components (`MotionDiv`, `MotionUl`, `MotionLi`). Import from this file rather than creating one-off variants.

**Styling** — Tailwind v4 via the `@tailwindcss/vite` plugin; no `tailwind.config.js` needed. Only `@import "tailwindcss"` in `index.css`. All styling is done with utility classes inline in JSX.

**Admin panel** — Lives at `/#/admin` (hash routing, works on static GitHub Pages). Protected by JWT stored in `localStorage`. Routes: `/#/admin/login` → `AdminLogin.jsx`, `/#/admin` → `AdminPanel.jsx` (behind `ProtectedRoute.jsx`). Credentials come from `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars on the server — never hashed, compared directly.

**Backend** — Separate Express server in `server/`. Reads `.env` from the repo root via `dotenv`. Key routes: `POST /api/auth/login`, `GET /api/projects`, `POST /api/projects` (multipart, admin-only), `DELETE /api/projects/:id` (admin-only). Image uploads go to Cloudinary via `multer-storage-cloudinary`; the returned `req.file.path` is the Cloudinary URL stored in the DB. Run DB setup with `server/init.sql` before first use. Copy `.env.example` → `.env` and fill in values.

**Projects data flow** — `Projects.jsx` fetches from `VITE_API_URL/api/projects` on mount (no fake data). Displays category filter tabs (All / Personal / Academic). Each card shows a `category` badge (`personal` = blue, `academic` = purple).

**Deployment** — Vite base path is `/` (GitHub Pages repo path handled by HashRouter). Deployed via `gh-pages` to the `gh-pages` branch. The backend must be deployed separately (e.g., Render, Railway) and `VITE_API_URL` set to its public URL before running `npm run build`.

## Key conventions

- Section wrapper pattern: `<section className="px-4 py-12 scroll-mt-45 md:scroll-mt-28" id="...">` with an inner `<div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-md p-8">`
- Data for sections (projects, education, skills) is defined as plain arrays inside the component, not fetched externally
- `Eduction.jsx` is intentionally spelled this way (typo in filename); the section `id` is correctly `"education"`
