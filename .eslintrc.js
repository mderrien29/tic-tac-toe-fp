module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'fp'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:fp/recommended',
  ],
  overrides: [
    {
      files: ["features/**/*", "*InMem.ts", "test/*", "*.spec.ts"],
      rules: {
        "fp/no-class": 0,
        "fp/no-this": 0,
        "fp/no-unused-expression": 0,
        "fp/no-nil": 0,
        "fp/no-let": 0,
        "fp/no-mutation": 0,
        "fp/no-mutating-methods": 0,
        "fp/no-throw": 0,
      },
    },
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 'error',
    'import/no-unused-modules': 'error',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/domain',
            from: './src/driven',
            message: "Domain components can't import driven components.",
          },
          {
            target: './src/domain',
            from: './src/usecase',
            message: "Domain components can't import usecase components.",
          },
          {
            target: './src/domain',
            from: './src/driving',
            message: "Domain components can't import driving components.",
          },
          {
            target: './src/usecase',
            from: './src/driven',
            message: "Usecase components can't import driven components.",
          },
          {
            target: './src/usecase',
            from: './src/driving',
            message: "Usecase components can't import driving components.",
          },
          {
            target: './src/driven',
            from: './src/driving',
            message: "Driven components can't import driving components.",
          },
        ],
      },
    ],
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['**/domain/**', '!@app/domain/**'],
            message: "Import from '@app/domain' instead.",
          },
          {
            group: ['**/driven/**', '!@app/driven/**'],
            message: "Import from '@app/driven' instead.",
          },
          {
            group: ['**/usecase/**', '!@app/usecase/**'],
            message: "Import from '@app/usecase' instead.",
          },
          {
            group: ['**/driving/**', '!@app/driving/**'],
            message: "Import from '@app/driving' instead.",
          },
          {
            group: ['**/test/**'],
            message: "Import from '@app/testing' instead.",
          },
        ],
      },
    ],
    '@typescript-eslint/no-namespace': 'off',
  },
};
