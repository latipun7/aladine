import type { InitialOptionsTsJest } from 'ts-jest/dist/types';
import type { JestPlaywrightConfig } from 'jest-playwright-preset';

import config from './jest.config';

interface E2EConfig
  extends Omit<InitialOptionsTsJest, 'testEnvironmentOptions'> {
  testEnvironmentOptions?: { 'jest-playwright'?: JestPlaywrightConfig };
}

const { testEnvironment, setupFiles, setupFilesAfterEnv, ...restConfig } =
  config;

const e2eConfig: E2EConfig = {
  ...restConfig,
  preset: 'jest-playwright-preset',
  testMatch: ['**/e2e/**/*.[jt]s?(x)'],
  testTimeout: 60_000,
};

export default e2eConfig;
