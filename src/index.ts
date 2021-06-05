import 'styles/index.scss';

import app from './app';

window.addEventListener('DOMContentLoaded', () => {
  app();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await navigator.serviceWorker.register('/service-worker.js');
  });
}
