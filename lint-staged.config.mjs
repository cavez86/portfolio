/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*': 'pnpm format',
  '*.{js,jsx,ts,tsx}': 'pnpm lint',
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};

export default config;
