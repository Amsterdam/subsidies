// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2020 - 2021 Gemeente Amsterdam

module.exports = {
    env: {
      es6: true,
      browser: true,
      jest: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:promise/recommended',
      'prettier',
    ],
    globals: {
      L: true,
    },
    overrides: [
      {
        files: ['**/*.test.*'],
        rules: {},
      },
      {
        extends: ['plugin:@typescript-eslint/recommended'],
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
          'react/prop-types': 'off',
          '@typescript-eslint/ban-ts-comment': 'off',
          '@typescript-eslint/no-explicit-any': 'off',
          '@typescript-eslint/no-non-null-assertion': 'off',
          '@typescript-eslint/explicit-module-boundary-types': 'off'
        },
      },
      {
        files: ['**/*.js', '**/*.jsx'],
        rules: {},
      },
    ],
    parser: '@typescript-eslint/parser',
    root: true,
    rules: {
      'no-debugger': 1,
      'no-console': 1,
      'no-redeclare': 'off',
      'promise/always-return': 'off',
      'promise/catch-or-return': 'off',
      'promise/no-callback-in-promise': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'import/no-webpack-loader-syntax': 'off',
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  