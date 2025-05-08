/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*': 'pnpm format',
  '*.?(c|m){j,t}s?(x)': 'pnpm lint',
  '**/*.?(c|m)ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};

export default config;
