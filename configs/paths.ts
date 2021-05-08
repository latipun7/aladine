import { resolve } from 'path';

const root = resolve(__dirname, '..');

const resolvePath = (...relativePath: string[]) =>
  resolve(root, ...relativePath);

// Pre-Resolved Paths
const buildDir = resolvePath('dist');
const configsDir = resolvePath('configs');
const globalStyleDir = resolvePath('src', 'styles');
const libDir = resolvePath('src', 'lib');
const publicDir = resolvePath('public');
const rootDir = resolvePath('.');
const srcDir = resolvePath('src');

export {
  buildDir,
  configsDir,
  globalStyleDir,
  libDir,
  publicDir,
  rootDir,
  srcDir,
  resolvePath,
};
