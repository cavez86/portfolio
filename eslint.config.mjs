// @ts-check
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig(
  {
    ignores: ['node_modules', 'build', 'coverage', '.next', 'next-env.d.ts'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
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
  prettier
);

export default eslintConfig;
