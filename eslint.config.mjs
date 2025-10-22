// @ts-check

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  globalIgnores(['node_modules', 'build', 'coverage', '.next', 'next-env.d.ts']),
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'prefer-template': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  prettier,
]);

export default eslintConfig;
