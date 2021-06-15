import type { InitialOptionsTsJest } from 'ts-jest/dist/types';
import type { JestPlaywrightConfig } from 'jest-playwright-preset';

import config from './jest.config';

interface E2EConfig
  extends Omit<InitialOptionsTsJest, 'testEnvironmentOptions'> {
  testEnvironmentOptions: { 'jest-playwright': JestPlaywrightConfig };
}

const { testEnvironment, ...restConfig } = config;

const e2eConfig: E2EConfig = {
  ...restConfig,
  preset: 'jest-playwright-jsdom',
  testMatch: ['**/e2e/**/*.[jt]s?(x)'],
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium', 'firefox', 'webkit'],
      serverOptions: {
        command: 'yarn dev',
        port: 8080,
        usedPortAction: 'ask',
      },
    },
  },
  setupFilesAfterEnv: [
    ...(config.setupFilesAfterEnv ? config.setupFilesAfterEnv : []),
    'expect-playwright',
    'jest-playwright-preset/lib/extends.js',
  ],
};

export default e2eConfig;
