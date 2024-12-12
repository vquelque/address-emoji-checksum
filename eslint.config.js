const { ESLint } = require('eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['node_modules', 'dist'], // Ignore common folders
  },
  {
    files: ['**/*.{ts,tsx}'], // Apply rules to TypeScript files
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser, // Use TypeScript parser
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules, // Prettier rules
      ...typescriptPlugin.configs.recommended.rules, // TypeScript rules
      'prettier/prettier': 'error',
    },
  },
];
