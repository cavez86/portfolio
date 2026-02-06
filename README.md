# Portfolio Website

A modern, feature-rich portfolio website built with Next.js 16, PayloadCMS, and TypeScript. Includes
internationalization (English/Italian), server-side rendering, PDF generation capabilities, and **6 unique design
themes** showcasing different visual identities.

## Features

- 🎨 **6 Design Themes**: Switch between Terminal, Brutalist, Glassmorphic, Editorial, Kinetic, and Accessible designs
- 🌍 **Internationalization**: Full support for English and Italian
- 📄 **PDF Export**: Generate and download portfolio as PDF
- 🎯 **User Customization**: Adjustable color hues and theme preferences
- ♿ **Accessibility**: Includes WCAG AAA compliant theme option

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

## Documentation

- **[DESIGN_REVIEW.md](./DESIGN_REVIEW.md)** - Comprehensive design review with detailed specifications for all 5
  alternatives
- **[THEME_SYSTEM.md](./THEME_SYSTEM.md)** - Theme system documentation and usage guide
