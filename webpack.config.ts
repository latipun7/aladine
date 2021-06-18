import { mergeWithCustomize } from 'webpack-merge';
import type { Configuration } from 'webpack';
import type { ICustomizeOptions } from 'webpack-merge/dist/types';

import commonConfig from './configs/webpack.common';
import devConfig from './configs/webpack.dev';
import productionConfig from './configs/webpack.prod';

const custom: ICustomizeOptions = {
  customizeArray(
    common: typeof commonConfig['plugins'],
    merged: Configuration['plugins'],
    key
  ) {
    if (key === 'plugins' && common && merged) {
      const [cleanPlugin, ...restCommon] = common;
      const [miniCSSPlugin, ...restMerged] = merged;

      return [cleanPlugin, ...restMerged, ...restCommon, miniCSSPlugin];
    }

    return undefined;
  },
};

interface CLIOptions {
  mode: Configuration['mode'];
}

const config = async (env: CLIOptions): Promise<Configuration> => {
  switch (env.mode) {
    case 'development':
      return mergeWithCustomize(custom)(commonConfig, await devConfig());

    case 'production':
      return mergeWithCustomize(custom)(commonConfig, await productionConfig());

    default:
      throw new Error('No matching configuration was found!');
  }
};

export default config;
