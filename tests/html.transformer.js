/** @type import('@jest/transform').SyncTransformer */
module.exports = {
  process(sourceText) {
    return `module.exports = \`${sourceText}\`;`;
  },
};
