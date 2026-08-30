/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*': 'biome check --write --no-errors-on-unmatched',
  '**/*.?(c|m)ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};

export default config;
