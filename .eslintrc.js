/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // path to your tsconfig.json
  },
  extends: [
    'next',
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-typescript',
    'plugin:unicorn/recommended',
    'plugin:jsdoc/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'no-secrets', 'simple-import-sort', 'import', 'prettier'],
  rules: {
    //react
    '@next/next/no-html-link-for-pages': 'off',

    // typescript
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',

    // react
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    // react hooks
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

    // no secrets
    'no-secrets/no-secrets': 'error',

    // simple import sort
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // import
    'import/no-extraneous-dependencies': 'off',

    'unicorn/consistent-function-scoping': 'off',

    // prettier
    'prettier/prettier': [
      'off',
      {
        semi: true,
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        jsxSingleQuote: true,
        trailingComma: 'all',
      },
    ],

    // unicorn
    'unicorn/no-null': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: { kebabCase: true, camelCase: true },
        ignore: [
          'App.tsx',
          'next-env.d.ts',
          'next.config.js',
          'jest.config.js',
          'babel.config.js',
          'metro.config.js',
          'use[A-Z][a-z]+',
        ],
      },
    ],

    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          param: {
            parameter: false,
          },
          params: {
            parameters: false,
          },
          env: {
            environment: false,
          },
          prop: {
            property: false,
          },
          props: {
            properties: false,
          },
        },
        ignore: [/[a-z].d.ts/],
      },
    ],
    'unicorn/expiring-todo-comments': 'off',

    // jsdoc
    'jsdoc/require-returns': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-type': 'off',
  },
  ignorePatterns: [
    '*.json',
    '*.js',
    '.eslintrc.js',
    '*.config.js',
    '**/coverage/*',
    '**/queries/type-policies.ts',
    '**/queries/__generated__/*.ts',
  ],
};
