import { getPublicPath } from 'lib/aladine-utils';
import 'styles/index.scss';

import app from './app';

const isTest = process.env.JEST_TEST === 'e2e';

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      const publicPath = getPublicPath();

      await navigator.serviceWorker.register(`${publicPath}service-worker.js`);
    });
  }
}

function startApp() {
  window.addEventListener('DOMContentLoaded', () => {
    app();
  });
}

if (isTest) {
  const worker = import('tests/mocks/service');

  worker.then(
    async ({ default: mockWorker }) => {
      await mockWorker.start();
      app();
    },
    () => {}
  );
} else {
  registerServiceWorker();
  startApp();
}
