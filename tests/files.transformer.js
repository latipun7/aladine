const path = require('path');

/** @type import('@jest/transform').SyncTransformer */
module.exports = {
  process(_, sourcePath) {
    return `module.exports = ${JSON.stringify(path.basename(sourcePath))};`;
  },
};
