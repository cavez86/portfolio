# Migration to Bun

This project has been migrated from Node.js/pnpm to Bun.

## What Changed

- **Runtime & Package Manager**: Switched from Node.js 24.11.0 + pnpm 10.19.0 to Bun 1.1.38
- **Lock File**: Replaced `pnpm-lock.yaml` with `bun.lockb`
- **CI/CD**: Updated GitHub Actions workflows to use Bun
- **Development Tools**: Updated VSCode launch configs, lint-staged, and pre-commit hooks

## Installing Bun

To install Bun globally on your system:

```bash
curl -fsSL https://bun.sh/install | bash
```

Or visit https://bun.sh for other installation methods.

## Getting Started

After installing Bun:

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Run linting
bun run lint

# Run type checking
bun run type-check

# Run tests
bun test
```

## Why Bun?

Bun is an all-in-one toolkit that provides:

1. **Faster package installation**: 2-3x faster than pnpm
2. **Built-in test runner**: Compatible with Jest/Vitest APIs
3. **Native TypeScript support**: No need for ts-node
4. **Improved performance**: Faster startup times and execution
5. **All-in-one solution**: Runtime, package manager, bundler, and test runner in one tool

## Generating the Lock File

The `bun.lockb` file is a binary lock file that ensures reproducible builds. It's automatically generated/updated when you run:

```bash
bun install
```

**Important**: The lock file must be committed to the repository to ensure all developers and CI/CD pipelines use the same dependency versions.

## CI/CD

The GitHub Actions workflow (`.github/workflows/pr.yml`) now uses the `oven-sh/setup-bun@v2` action to install Bun in the CI environment.

## Compatibility

Bun is compatible with most Node.js APIs and npm packages. However, if you encounter any compatibility issues:

1. Check the Bun documentation: https://bun.sh/docs
2. Report issues to the Bun team: https://github.com/oven-sh/bun/issues
3. Some native Node.js modules may require rebuilding

## Rollback

If you need to rollback to pnpm, restore these files from the previous commit:

- `package.json`
- `pnpm-lock.yaml`
- `.github/workflows/pr.yml`
- All other modified configuration files

Then run `pnpm install` to restore dependencies.
