module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
    },
    parserOptions: {
        sourceType: "module",
    },
    extends: [
        'eslint:recommended',
    ],
    rules: {
        'indent': ['error', 2],
        'semi': ['error', 'never'],
        'comma-dangle': ['error', 'always-multiline'],
        'eol-last': ['error', 'always'],
        'no-trailing-spaces': 2,
    },
}
