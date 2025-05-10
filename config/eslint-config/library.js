/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['simple-import-sort', 'react-hooks'],
  extends: ['@rocketseat/eslint-config/react', 'plugin:react-hooks/recommended'],
  rules: {
    camelcase: 'off',
    'no-case-declarations': 'off',
    'no-shadow-restricted-names': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unsafe-declaration-merging': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'simple-import-sort/imports': 'error',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
        trailingComma: 'none',
        endOfLine: 'auto',
        printWidth: 120,
        tabWidth: 2
      }
    ]
  }
}
