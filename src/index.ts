import { getPublicPath } from 'lib/aladine-utils';
import 'styles/index.scss';

import app from './app';

window.addEventListener('DOMContentLoaded', () => {
  app();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const publicPath = getPublicPath();

    await navigator.serviceWorker.register(`${publicPath}service-worker.js`);
  });
}
