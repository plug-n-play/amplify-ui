module.exports = {
  plugins: ['import'],
  extends: ['@aws-amplify/amplify-ui/react'],
  ignorePatterns: ['.eslintrc.js', 'dist', 'rollup.config.ts'],
  overrides: [
    {
      extends: ['@aws-amplify/amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
  // point to local tsconfig
  parserOptions: { project: ['tsconfig.json'], tsconfigRootDir: __dirname },
  rules: {
    'import/no-extraneous-dependencies': 'error',
  },
};
