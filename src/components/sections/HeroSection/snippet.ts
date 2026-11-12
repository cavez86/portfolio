// Builds the hero's TypeScript snippet from CMS data as syntax tokens, so the page can colour it without a highlighter.

export type SectionId = 'about' | 'experience' | 'skills' | 'languages' | 'education';

type TokenKind = 'keyword' | 'variable' | 'property' | 'string' | 'number' | 'punctuation' | 'comment';
export type Token = { kind: TokenKind; text: string };
export type SnippetLine = { depth: 0 | 1; section?: SectionId; tokens: Token[] };

type Value = string | number | readonly string[];
/** A fact the CMS may not have: properties without a value are left out of the snippet. */
export type SnippetProperty = { comment?: string; key: string; section: SectionId; value?: Value | null };

const hasValue = (property: SnippetProperty): property is SnippetProperty & { value: Value } =>
  property.value != null && property.value !== '' && !(Array.isArray(property.value) && property.value.length === 0);

const token = (kind: TokenKind, text: string): Token => ({ kind, text });
const punctuation = (text: string) => token('punctuation', text);

/** A string literal as Prettier writes it by default: always double quotes, so apostrophes need no escaping. */
export const stringLiteral = (text: string) => JSON.stringify(text);

const valueTokens = (value: Value): Token[] => {
  if (typeof value === 'number') return [token('number', String(value))];
  if (typeof value === 'string') return [token('string', stringLiteral(value))];
  return [
    punctuation('['),
    ...value.flatMap((item, index) => [
      ...(index > 0 ? [punctuation(', ')] : []),
      token('string', stringLiteral(item)),
    ]),
    punctuation(']'),
  ];
};

/** `Francesco Caveglia Beatris` becomes `francesco`. */
export const identifierFor = (name: string) =>
  (name.trim().split(/\s+/)[0] ?? '').toLowerCase().replaceAll(/[^\p{L}\p{N}_$]/gu, '') || 'developer';

export const buildSnippet = (name: string, properties: readonly SnippetProperty[]): SnippetLine[] => [
  {
    depth: 0,
    section: 'about',
    tokens: [token('keyword', 'export const '), token('variable', identifierFor(name)), punctuation(' = {')],
  },
  ...properties.filter(hasValue).map(
    ({ comment, key, section, value }): SnippetLine => ({
      depth: 1,
      section,
      tokens: [
        token('property', key),
        punctuation(': '),
        ...valueTokens(value),
        punctuation(','),
        ...(comment ? [token('comment', ` // ${comment}`)] : []),
      ],
    })
  ),
  { depth: 0, tokens: [punctuation('} '), token('keyword', 'as const'), punctuation(';')] },
];
