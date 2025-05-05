// @ts-check

import eslintJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import-x';
import prettier from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import * as reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import eslintTs from 'typescript-eslint';

export default eslintTs.config(
  {
    ignores: ['**/node_modules', '**/dist', 'pages.gen.ts'],
  },
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs['recommended-latest'],
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      vitest: {
        typecheck: true,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-console': 'warn',
      'no-async-promise-executor': 'off',
      'no-prototype-builtins': 'off',
      'require-await': 'warn',
      'require-atomic-updates': 'off',
      eqeqeq: ['warn', 'smart'],
      'prefer-template': 'warn',
      'import-x/no-unresolved': 'error',
      'import-x/named': 'error',
      'import-x/namespace': 'error',
      'import-x/default': 'error',
      'import-x/export': 'error',
      'import-x/no-cycle': 'error',
      'import-x/order': [
        'warn',
        {
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '{.,..}/**/*.{less,css,scss}',
              patternOptions: {
                dot: true,
                nocomment: true,
              },
              group: 'unknown',
              position: 'after',
            },
          ],
        },
      ],
      'import-x/consistent-type-specifier-style': 'error',
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/button-has-type': 'error',
      'react/display-name': 'warn',
      'react/jsx-boolean-value': 'warn',
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          propElementValues: 'always',
        },
      ],
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      'react/jsx-no-script-url': 'error',
      'react/jsx-no-target-blank': 'off',
      'react/jsx-no-useless-fragment': [
        'warn',
        {
          allowExpressions: true,
        },
      ],
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-pascal-case': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'warn',
      'react/no-typos': 'warn',
      'react/no-unknown-property': 'error',
      'react/no-unstable-nested-components': [
        'error',
        {
          allowAsProps: true,
        },
      ],
      'react/prefer-stateless-function': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'warn',
      'prettier/prettier': 'warn',
      'implicit-arrow-linebreak': 'off',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-restricted-globals': 'off',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
    rules: {
      'no-const-assign': 'error',
      'no-undef': 'error',
      'no-unreachable': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',
    },
  }
);
