import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['out/**', 'dist/**', 'node_modules/**', 'resources/**'],
  },
  {
    // Build/setup scripts and config files: base JS recommended rules with Node globals.
    // `.cjs`/`.mjs` get their module kind auto-detected; bare `.js` is CommonJS here
    // (package.json has no "type": "module").
    files: ['**/*.{js,cjs,mjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importX.flatConfigs.recommended,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      // Replicates the old `plugin:import/electron` (treat `electron` as a core module) and
      // `plugin:import/typescript` resolution, using import-x v4's modern resolver interface so
      // import-x/no-unresolved understands .ts paths and type-only packages.
      'import-x/core-modules': ['electron'],
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: ['tsconfig.node.json', 'tsconfig.web.json'],
        }),
      ],
    },
    rules: {
      // Preserve the pre-upgrade effective rule surface so the ESLint 8→10 / typescript-eslint
      // 5→8 bump does not force source changes:
      '@typescript-eslint/no-explicit-any': 'warn', // was a warning under ts-eslint v5 recommended
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }], // v5 ignored unused catch bindings
      '@typescript-eslint/no-unused-expressions': 'off', // not enforced pre-upgrade
      'preserve-caught-error': 'off', // new ESLint 10 core rule
      // Replicates `plugin:import/typescript`, which turned this off because TypeScript itself
      // already verifies named imports. (The full importX.flatConfigs.typescript preset is not
      // used: it re-adds the legacy resolver and its settings break winston's CJS default import.)
      'import-x/named': 'off',
    },
  },
);
