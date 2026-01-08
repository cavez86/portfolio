# Portfolio Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/59264e8f-6ddd-4c40-8262-ccf476aa6ec4/deploy-status)](https://app.netlify.com/projects/cavez-portfolio/deploys)

A modern, feature-rich portfolio website built with Next.js 16, PayloadCMS, and TypeScript. Includes
internationalization (English/Italian), server-side rendering, and PDF generation capabilities.

## Tech Stack

- **Runtime:** Node.js >= 24
- **Framework:** Next.js 16 with App Router & React 19
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

### Using pnpm

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Netlify CLI

Alternatively, run the project using Netlify CLI:

```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Run the development server
netlify dev
```

The dev server will start on [http://localhost:3000](http://localhost:3000) by default.

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

**Note:** The build may fail in sandboxed environments due to Google Fonts access. Use `pnpm type-check` to validate
TypeScript without building.

## Project Structure

### Collections (Data Models)

- Users, Contacts, Education, Experience, Languages, Media, PersonalInfo, Skills, SoftSkills, SummaryInfo

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
