const { pathsToModuleNameMapper } = require('ts-jest/utils');
/**
 * @type {import('./tsconfig.json')}
 */
const { compilerOptions } = require('./tsconfig.json');

const tsconfigPaths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
});

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/test.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/files-mock.ts',
    ...tsconfigPaths,
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$',
    '\\.(css|sass|scss)$',
  ],
  globals: {
    'ts-jest': {},
  },
};
