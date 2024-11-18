import js from '@eslint/js';
import ts from 'typescript-eslint';

export default ts.config(
  js.configs.recommended,
  ts.configs.strict,
  ts.configs.stylistic,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: ts.parser,
    },
    plugins: {
      typescript: ts.plugin,
    },
    ignores: [
      '.idea/',
      '.nx/',
      'node_modules/',
    ],
    rules: {
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-extra-semi': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
    }
  }
);