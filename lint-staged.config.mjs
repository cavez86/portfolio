/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*': 'bun format',
  '*.?(c|m){j,t}s?(x)': 'bun lint',
  '**/*.?(c|m)ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};

export default config;
