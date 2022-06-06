module.exports = {
    parser: '@typescript-eslint/parser',
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    plugins: ['eslint-plugin', '@typescript-eslint', 'jest', 'import', 'eslint-comments'],
    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/prefer-regexp-exec': 0,
        '@typescript-eslint/await-thenable': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/no-unused-vars-experimental': 'error',
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: {
                    memberTypes: [
                        // Index signature
                        'signature',

                        // Fields
                        'public-static-field',
                        'protected-static-field',
                        'private-static-field',

                        'public-decorated-field',
                        'protected-decorated-field',
                        'private-decorated-field',

                        'public-instance-field',
                        'protected-instance-field',
                        'private-instance-field',

                        'public-abstract-field',
                        'protected-abstract-field',
                        'private-abstract-field',

                        'public-field',
                        'protected-field',
                        'private-field',

                        'static-field',
                        'instance-field',
                        'abstract-field',

                        'decorated-field',

                        'field',

                        // Constructors
                        'public-constructor',
                        'protected-constructor',
                        'private-constructor',

                        'constructor',

                        // Methods
                        'public-static-method',
                        'protected-static-method',
                        'private-static-method',

                        'public-decorated-method',
                        'protected-decorated-method',
                        'private-decorated-method',

                        'public-instance-method',
                        'protected-instance-method',
                        'private-instance-method',

                        'public-abstract-method',
                        'protected-abstract-method',
                        'private-abstract-method',

                        'public-method',
                        'protected-method',
                        'private-method',

                        'static-method',
                        'instance-method',
                        'abstract-method',

                        'decorated-method',

                        'method',
                    ],
                    order: 'alphabetically',
                },
            },
        ],
        'arrow-body-style': [2, 'as-needed'],
        'import/first': 'error',
        'import/named': 'error',
        'import/newline-after-import': 'error',
        'import/no-unused-modules': [1, { unusedExports: true }],
        'import/order': [
            'error',
            {
                groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'],
                'newlines-between': 'always-and-inside-groups',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
        'max-lines': ['error', 150],
        'max-params': ['error', 3],
        'no-duplicate-imports': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-var': 'error',
        'no-console': 'error',
        'no-unreachable': 'error',
        'no-return-await': 'error',
        'prettier/prettier': ['error'],
        'require-await': 'error',
    },
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            js: false,
        },
        project: ['./tsconfig.json'],
        createDefaultProgram: true,
    },
};
