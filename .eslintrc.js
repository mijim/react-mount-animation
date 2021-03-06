module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
    },
    plugins: ['@typescript-eslint', 'promise', 'import', 'jest'],
    extends: [
        'airbnb',
        'airbnb/hooks',
        'prettier/@typescript-eslint',
        'prettier-react',
        'plugin:prettier/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:node/recommended',
        'plugin:jest/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    env: {
        node: true,
        browser: true,
        es6: true,
        commonjs: true,
        jest: true,
    },
    rules: {
        'no-unused-vars': 'off',
        'explicit-function-return-type': 0,
        'class-methods-use-this': 0,
        'global-require': [0],
        'comma-dangle': 0,
        'prefer-destructuring': 0,
        'promise/always-return': 'error',
        'promise/param-names': 'error',
        'promise/catch-or-return': 'error',
        'promise/no-native': 'off',
        'promise/no-nesting': 'off',
        'promise/no-callback-in-promise': [
            'error',
            {
                exceptions: ['next'],
            },
        ],
        'promise/no-new-statics': 'error',
        'promise/no-return-in-finally': 'warn',
        'import/no-unresolved': [
            2,
            {
                commonjs: true,
                amd: true,
            },
        ],
        'import/namespace': 2,
        'import/default': 2,
        'import/export': 2,
        'node/exports-style': ['error', 'module.exports'],
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/console': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
        'node/prefer-global/url-search-params': ['error', 'always'],
        'node/prefer-global/url': ['error', 'always'],
        'node/no-unsupported-features/es-syntax': [0],
        'node/no-missing-import': [0],
        'react/jsx-uses-react': 'off',
        'react/jsx-uses-vars': 'error',
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/static-property-placement': 'off',
        'react/jsx-fragments': [2, 'syntax'],
        'react/prop-types': [2, { skipUndeclared: true }],
        'react/react-in-jsx-scope': 'off',
        'import/no-extraneous-dependencies': [0],
        'import/named': [0],
        '@typescript-eslint/prefer-optional-chain': ['error'],
        '@typescript-eslint/explicit-function-return-type': [0],
        // rules for https://github.com/prettier/eslint-plugin-prettier
        'prettier/prettier': [
            'error',
            {
                bracketSpacing: true,
                jsxBracketSameLine: true,
                printWidth: 120,
                semi: true,
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'es5',
            },
        ],
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            // use <root>/tsconfig.json
            typescript: {},
        },
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    overrides: [
        {
            files: ["test/**/*.js"],
            rules: {
                "node/no-unpublished-require": "off"
        }
        },
        {
            files: ['webpack.config.*.js'],
            rules: {'@typescript-eslint/no-var-requires': 'off'},
        }
    ],
    ignorePatterns: ["node_modules/", "dist/"],
};