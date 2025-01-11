import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals'; // Import standard globals like `module`

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}', 'jest.config.cjs'] },
    {
        languageOptions: {
            globals: {
                ...globals.node, // Use Node.js globals (e.g., `module`, `process`)
            },
        },
    },
    {
        plugins: {
            'unused-imports': pluginUnusedImports,
        },
    },
    { ignores: ['dist/', 'build/', 'coverage/', 'node_modules/'] },
    {
        settings: {
            react: {
                version: 'detect', // Automatically detect React version
            },
        },
    },
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
