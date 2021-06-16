/** @type import('jest-playwright-preset').JestPlaywrightConfig */
module.exports = {
  browsers: [process.env.BROWSER],
  serverOptions: {
    command: 'yarn dev',
    port: 8080,
    protocol: 'http',
    launchTimeout: 90_000,
    usedPortAction: 'ask',
  },
};
