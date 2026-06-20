import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    name: 'global-ignores',
    ignores: [
      '**/.next/**',
      '**/node_modules/**',
      '**/out/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/public/**',
      '**/next-env.d.ts',
    ],
  },

  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-unused-modules': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
];

export default eslintConfig;
