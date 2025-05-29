// @ts-check

import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['node_modules', 'build', 'coverage', '.next'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettier,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prefer-template': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
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
];

export default eslintConfig;
