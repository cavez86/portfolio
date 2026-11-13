import { describe, expect, it } from 'vitest';

import {
  buildSnippet,
  identifierFor,
  type SnippetLine,
  stringLiteral,
} from '../src/components/sections/HeroSection/snippet';

const sourceOf = (lines: readonly SnippetLine[]) =>
  lines.map(({ depth, tokens }) => '  '.repeat(depth) + tokens.map(({ text }) => text).join('')).join('\n');

describe('hero snippet', () => {
  it('renders the CMS facts as a valid TypeScript object literal', () => {
    const lines = buildSnippet('Francesco Caveglia Beatris', [
      { comment: 'since May 2026', key: 'company', section: 'experience', value: 'Prima' },
      { key: 'yearsOfExperience', section: 'experience', value: 15 },
      { key: 'stack', section: 'skills', value: ['React', 'Next.js'] },
      { key: 'education', section: 'education', value: "Master's in Physics" },
    ]);

    expect(sourceOf(lines)).toBe(
      [
        'export const francesco = {',
        '  company: "Prima", // since May 2026',
        '  yearsOfExperience: 15,',
        '  stack: ["React", "Next.js"],',
        '  education: "Master\'s in Physics",',
        '} as const;',
      ].join('\n')
    );
  });

  it('links every property line to the section that documents it', () => {
    const lines = buildSnippet('Ada', [{ key: 'stack', section: 'skills', value: ['C'] }]);
    expect(lines.map(({ section }) => section)).toEqual(['about', 'skills', undefined]);
  });

  it('leaves out facts the CMS does not have', () => {
    const lines = buildSnippet('Ada', [
      { key: 'location', section: 'experience', value: null },
      { key: 'languages', section: 'languages', value: [] },
      { key: 'yearsOfExperience', section: 'experience', value: 0 },
    ]);
    expect(lines.slice(1, -1).map(({ tokens }) => tokens[0]?.text)).toEqual(['yearsOfExperience']);
  });

  it('escapes the double quote and backslash a literal cannot hold', () => {
    expect(stringLiteral(`It's "C:\\dev"`)).toBe(`"It's \\"C:\\\\dev\\""`);
  });

  it('derives a lower-case identifier from the first name', () => {
    expect(identifierFor('  Niccolò De-Rossi ')).toBe('niccolò');
    expect(identifierFor('J.')).toBe('j');
    expect(identifierFor('')).toBe('developer');
  });
});
