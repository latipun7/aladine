import { jsWithBabel as tsJestPreset } from 'ts-jest/presets';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

import { compilerOptions } from './tsconfig.json';

const tsconfigPaths = pathsToModuleNameMapper(compilerOptions.paths);

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFiles: ['fake-indexeddb/auto'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
    ...tsconfigPaths,
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  transform: {
    ...tsJestPreset.transform,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/files.transformer.js',
    '\\.(html|svg)$': '<rootDir>/tests/html.transformer.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$',
    '\\.(css|sass|scss)$',
  ],
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: [
          [
            '@babel/preset-env',
            { modules: 'commonjs', targets: { node: 'current' } },
          ],
        ],
      },
    },
  },
};

export default config;
