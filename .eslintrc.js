module.exports = {
  extends: ['ruppy-node', 'ruppy-ts', 'ruppy-jest'],
  overrides: [
    {
      files: ['**/e2e/**/*'],
      extends: ['plugin:jest-playwright/recommended'],
    },
  ],
  env: { serviceworker: true },
  rules: {
    'import/no-cycle': ['error', { maxDepth: 3 }],
  },
};
