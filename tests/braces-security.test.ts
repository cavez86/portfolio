import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

// Exercise the transitive package used by shadcn's glob matching.
const require = createRequire(import.meta.url);
const shadcnRequire = createRequire(require.resolve('shadcn'));
const globRequire = createRequire(shadcnRequire.resolve('fast-glob'));
const micromatchRequire = createRequire(globRequire.resolve('micromatch'));
const braces = micromatchRequire('braces');

describe('braces security patch', () => {
  it.each(['compile', 'expand', 'stringify', 'parse'])(
    '%s rejects deeply nested patterns before walking the AST',
    (method) => {
      for (const [open, close] of [
        ['{', '}'],
        ['(', ')'],
        ['{(', ')}'],
      ]) {
        const pattern = `${open.repeat(4000)}a${close.repeat(4000)}`;
        // Keep every payload below braces' existing 10,000-character limit.
        const boundedPattern = pattern.length > 10000 ? `${open.repeat(2000)}a${close.repeat(2000)}` : pattern;
        expect(() => braces[method](boundedPattern)).toThrow(new SyntaxError('Input nesting exceeds max depth (100)'));
      }
    }
  );

  it('enforces the depth boundary', () => {
    const pattern = (depth: number) => `${'{'.repeat(depth)}a${'}'.repeat(depth)}`;
    expect(() => braces.compile(pattern(100))).not.toThrow();
    expect(() => braces.compile(pattern(101))).toThrow(SyntaxError);
  });

  it('preserves normal brace expansion and compilation', () => {
    expect(braces.expand('src/{app,components}/file.{ts,tsx}')).toEqual([
      'src/app/file.ts',
      'src/app/file.tsx',
      'src/components/file.ts',
      'src/components/file.tsx',
    ]);
    expect(braces.compile('src/{app,components}')).toBe('src/(app|components)');
    expect(braces.expand('{1..3}')).toEqual(['1', '2', '3']);
  });

  it('does not count quoted, escaped, or bracketed literals as nesting', () => {
    for (const pattern of [`"${'{'.repeat(200)}"`, '\\{'.repeat(200), `[${'{'.repeat(200)}]`]) {
      expect(() => braces.compile(pattern)).not.toThrow();
    }
  });
});
