module.exports = {
  extends: ['ruppy-node', 'ruppy-ts', 'ruppy-jest'],
  env: { serviceworker: true },
  rules: {
    'import/no-cycle': ['error', { maxDepth: 3 }],
  },
};
