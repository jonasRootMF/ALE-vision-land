# ALE Visión Landing Page — Claude Code Guide

## Project Overview
Marketing landing page for **ALE Visión**, an AI-powered visual monitoring platform that analyses security camera footage in real time and emits an *Índice de Apego General* (IAG) score.

## Tech Stack
| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 + CSS variables (oklch) |
| Components | shadcn/ui (new-york) + Radix UI primitives |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Package manager | pnpm |

## Commands
```bash
pnpm dev      # start development server (localhost:3000)
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # ESLint (Next.js defaults)
```

## Project Structure
```
app/
  layout.tsx              # root layout + metadata
  page.tsx                # assembles all landing sections
components/
  landing/                # one file per landing section
    navbar.tsx
    hero.tsx
    what-is.tsx
    how-it-works.tsx
    use-cases.tsx
    comparison.tsx
    features.tsx
    faq.tsx
    final-cta.tsx
  ui/                     # shadcn/ui generated components (CLI-managed)
  theme-provider.tsx      # next-themes wrapper
hooks/
  use-mobile.ts           # useIsMobile() — breakpoint 768 px
  use-toast.ts            # toast state management
lib/
  utils.ts                # cn() — clsx + tailwind-merge
styles/
  globals.css             # Tailwind base, CSS vars, custom utilities
```

## Conventions

### Language
All visible UI text is in **Spanish**. Keep it consistent.

### Naming
- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Variables/functions: `camelCase`

### Styling
- Use `cn()` from `lib/utils.ts` for every `className` composition.
- Do not add inline `style` props unless Tailwind cannot express the value.
- Custom utilities defined in `styles/globals.css`:
  - `btn-glow` — glow effect for primary buttons
  - `iag-glow-green`, `iag-glow-yellow`, `iag-glow-red` — IAG status indicators
  - Color tokens: `iag-green`, `iag-yellow`, `iag-red`

### Components
- Add `'use client'` at the top of any component that uses hooks, event listeners, or Framer Motion.
- Add new shadcn/ui components via CLI — never hand-edit files in `components/ui/`:
  ```bash
  pnpm dlx shadcn@latest add <component-name>
  ```

### Animations
- Use Framer Motion (`motion.*`, `AnimatePresence`).
- Site-wide pattern: **fade-in + y-offset slide-up** on section reveal.
- Standard easing: `[0.16, 1, 0.3, 1]`

### Build config (do not change)
`next.config.mjs` intentionally sets:
- `typescript.ignoreBuildErrors: true` — type errors don't block deploys
- `images.unoptimized: true` — static image serving
- `output: 'export'` — fully static build, outputs to `out/`

## Contact

All contact CTAs point to WhatsApp: `https://wa.me/5212222067664`

Pre-filled message used in main CTA buttons:
```
https://wa.me/5212222067664?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20demo%20de%20ALE%20Visi%C3%B3n
```

There is no backend or email form — all leads go through WhatsApp.

## Deployment

### Heroku (primary)
The app is hosted on Heroku under the existing app **`www-vision-theia-com-mx`**.

To deploy:
```bash
heroku git:remote -a www-vision-theia-com-mx   # one-time setup
git push heroku main
```

How it works:
- `heroku-postbuild` script runs `next build` → generates `out/`
- `Procfile` starts `serve out -p $PORT` to serve the static files
- `NPM_CONFIG_PRODUCTION=false` must be set on the Heroku app so devDependencies install during build

### Surge (legacy)
The `deploy` script in `package.json` still deploys to Surge at `www.vision.theia.com.mx`. This was the previous deployment method.
