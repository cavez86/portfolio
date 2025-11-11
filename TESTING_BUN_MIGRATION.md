# Testing the Bun Migration

This document provides a testing checklist for verifying the migration from pnpm to Bun.

## Prerequisites

1. Install Bun on your system:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. Verify Bun installation:
   ```bash
   bun --version
   # Should show 1.1.38 or compatible version
   ```

## Local Testing Checklist

### 1. Dependency Installation

- [ ] Clone the repository
- [ ] Run `bun install`
- [ ] Verify that `bun.lockb` is generated
- [ ] Verify that `node_modules` is populated
- [ ] Check for any installation errors or warnings

### 2. Development Server

- [ ] Run `bun dev`
- [ ] Verify the server starts on http://localhost:3000
- [ ] Check that hot reload works when editing files
- [ ] Stop the server (Ctrl+C)

### 3. Code Quality Tools

- [ ] Run `bun run lint`
  - Should execute ESLint with auto-fix
  - Should complete without errors (existing errors are OK if they were there before)

- [ ] Run `bun run format`
  - Should execute Prettier
  - Should format all files

- [ ] Run `bun run type-check`
  - Should run TypeScript compiler without emitting files
  - Note: Errors in `.next/types/validator.ts` are expected and OK

- [ ] Run `bun test`
  - Should execute Vitest
  - Should pass with `--passWithNoTests` since there are no test files yet

### 4. Build Process

- [ ] Run `bun run build`
  - May fail in sandboxed environments (Google Fonts issue)
  - Should work on systems with internet access to fonts.googleapis.com

- [ ] If build succeeds, run `bun start`
  - Should start the production server
  - Should serve the built application

### 5. Git Hooks

- [ ] Make a small change to a file
- [ ] Run `git add .`
- [ ] Run `git commit -m "test"`
  - Pre-commit hook should run
  - Should execute lint-staged with bun commands
  - Commit should succeed if files are properly formatted

### 6. VSCode Integration (if using VSCode)

- [ ] Open the project in VSCode
- [ ] Check that launch configurations work (F5 or Debug panel)
- [ ] Verify "Next.js: debug server-side" configuration uses bun

### 7. PayloadCMS

- [ ] Run `bun run payload --help`
  - Should show Payload CLI options
  - Note: Requires `PAYLOAD_CONFIG_PATH` env var to be set

## CI/CD Testing Checklist

### 1. GitHub Actions Workflow

- [ ] Create a PR to main branch
- [ ] Verify the PR workflow runs
- [ ] Check that "Setup Bun" step succeeds
- [ ] Verify dependencies install correctly
- [ ] Check if `bun.lockb` was generated (warning should appear if yes)
- [ ] Verify all quality checks pass:
  - [ ] ESLint
  - [ ] TypeScript type checking
  - [ ] Prettier
  - [ ] Tests

### 2. Lockfile Handling

- [ ] If `bun.lockb` was generated in CI, pull it locally
- [ ] Commit and push the lockfile
- [ ] Verify subsequent CI runs use `--frozen-lockfile`

## Performance Comparison (Optional)

Compare the performance of bun vs the previous pnpm setup:

### Installation Speed
- [ ] Time `bun install` (after clearing node_modules)
- [ ] Compare with previous pnpm install time (~40-50s)
- [ ] Expected: ~20-30s with bun (2x faster)

### Dev Server Startup
- [ ] Time `bun dev` startup
- [ ] Compare with previous startup time
- [ ] Note any differences in memory usage

## Troubleshooting

### Common Issues

1. **Bun not found**: Make sure Bun is installed and in your PATH
2. **Permission errors**: Run `chmod +x ~/.bun/bin/bun`
3. **Platform compatibility**: Bun works on macOS, Linux, and WSL. Windows support is improving.
4. **Native modules**: Some packages may need rebuilding. Run `bun rebuild`

### Reporting Issues

If you encounter issues:

1. Check Bun version: `bun --version`
2. Check the error message carefully
3. Look for similar issues: https://github.com/oven-sh/bun/issues
4. Document the issue with reproduction steps

## Rollback Procedure

If critical issues are found:

1. Checkout the commit before the migration
2. Restore `pnpm-lock.yaml`
3. Run `pnpm install`
4. Create a new branch documenting the issues

## Success Criteria

The migration is successful if:

- ✅ All dependencies install without errors
- ✅ Development server runs correctly
- ✅ All code quality tools work (lint, format, type-check, test)
- ✅ Git hooks function properly
- ✅ CI/CD pipeline passes
- ✅ Build process works (when fonts are accessible)
- ✅ No regression in functionality
- ✅ Performance is same or better

## Additional Notes

- The `bun.lockb` file is binary and will be smaller than `pnpm-lock.yaml`
- Bun has built-in support for many Node.js APIs
- Some packages may behave differently; test thoroughly
- Bun's package resolution is compatible with npm/pnpm but may resolve differently in edge cases
