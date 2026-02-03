# Portfolio Website

A modern, feature-rich portfolio website built with Next.js 16, PayloadCMS, and TypeScript. Deployed on **Cloudflare
Workers** using OpenNext.js. Includes internationalization (English/Italian), server-side rendering, and PDF generation
capabilities.

## Tech Stack

- **Runtime:** Node.js >= 24 (local dev) / Cloudflare Workers (production)
- **Framework:** Next.js 16 with App Router & React 19
- **Deployment:** Cloudflare Workers via OpenNext.js
- **CMS:** PayloadCMS with Vercel Postgres adapter
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI)
- **API:** tRPC 11 with React Query
- **Internationalization:** next-intl (English, Italian)
- **Testing:** Vitest
- **Code Quality:** ESLint, Prettier, TypeScript

## Prerequisites

- Node.js >= 24
- pnpm (required - install globally: `npm install -g pnpm`)

## Installation

```bash
pnpm install --frozen-lockfile --strict-peer-dependencies
```

This must be run first before any other commands.

## Development

Start the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Preview in Cloudflare Workers Runtime

To test your app locally in the Cloudflare Workers runtime (instead of Node.js):

```bash
pnpm preview
```

This builds your app and serves it locally using the Workers runtime, allowing you to test exactly how it will behave in
production.

## Code Quality Commands

```bash
pnpm lint              # Run ESLint with auto-fix
pnpm format            # Format code with Prettier
pnpm type-check        # TypeScript validation (no build)
pnpm test              # Run Vitest tests
```

Run these commands locally before committing to ensure CI passes.

## Building

```bash
pnpm build             # Build for production
```

\*\*NDeployment

### Deploy to Cloudflare Workers

Deploy your app to Cloudflare:

```bash
pnpm deploy            # Build and deploy in one command
```

Or upload a new version without immediate deployment:

```bash
pnpm upload            # Build and upload new version
```

### Building Only

```bash
### Local Development (.dev.vars)

For local development, add variables to `.dev.vars`:

```

NEXTJS_ENV=development DATABASE_URL=your_postgres_url PAYLOAD_SECRET=your_secret RESEND_API_KEY=your_api_key

```

### Production (Cloudflare Dashboard)

Set production environment variables in the [Cloudflare Dashboard](https://dash.cloudflare.com) under your Worker's settings.

Common variables:

- `DATABASE_URL` - Vercel Postgres connection
- `PAYLOAD_SECRET` - Payload admin authentication
- `RESEND_API_KEY` - Email service API key
- `NEXTJS_ENV` - Environment for loading .env files (defaults to "production"
### Cloudflare Configuration

- **wrangler.jsonc** - Worker configuration (bindings, compatibility flags)
- **open-next.config.ts** - OpenNext.js configuration with R2 incremental cache
- **.dev.vars** - Local environment variables (not committed)

To enable R2 caching, uncomment the R2 bucket configuration in `wrangler.jsonc` and create a bucket in the Cloudflare dashboardn, Experience, Languages, Media, PersonalInfo, Skills, SoftSkills, SummaryInfo

### Key Directories

- `src/app/` - Next.js App Router with i18n routing
- `src/components/` - React components and sections
- `src/server/trpc/` - tRPC backend routers
- `src/collections/` - PayloadCMS data models
- `messages/` - Translation files (en.json, it.json)

## Environment Variables

Optional for development:

- `DATABASE_URL` - Vercel Postgres connection
- `PAYLOAD_SECRET` - Payload admin authentication
- `RESEND_API_KEY` - Email service API key
- `PORT` - Development server port (default: 3000)

## Path Aliases

TypeScript aliases (defined in `tsconfig.json`):

- `@/*` → `./src/*`
- `@payload-config` → `./src/payload.config.ts`
```
