// @ts-check

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  $schema: 'http://json.schemastore.org/prettierrc',
  printWidth: 120,
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'es5',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
