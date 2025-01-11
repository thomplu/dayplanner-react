import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginUnusedImports from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}', 'jest.config.cjs'] },
    {
        languageOptions: {
            globals: { module: 'readonly' },
            env: {
                node: true,
            },
        },
    },
    {
        plugins: {
            'unused-imports': pluginUnusedImports,
        },
    },
    { ignores: ['dist/', 'build/', 'coverage/', 'node_modules/'] },
    // { languageOptions: { globals: globals.browser } },

    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
            'unused-imports/no-unused-imports': 'warn',
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
];
