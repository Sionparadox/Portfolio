import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/.next',
    '**/out',
    '**/node_modules',
    '**/*.config.js',
    '**/next-env.d.ts',
  ]),

  // 기존 .eslintrc.json의 extends를 FlatCompat로 변환
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),

  {
    plugins: {
      react,
      prettier,
    },

    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],

      'no-multiple-empty-lines': [
        'warn',
        {
          max: 1,
          maxEOF: 0,
        },
      ],

      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
]);
