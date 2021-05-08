import { customizeArray, mergeWithCustomize } from 'webpack-merge';
import { CustomizeRule } from 'webpack-merge/dist/types';
import type { Configuration } from 'webpack';
import type { ICustomizeOptions } from 'webpack-merge/dist/types';

import commonConfig from './configs/webpack.common';
import devConfig from './configs/webpack.dev';
import productionConfig from './configs/webpack.prod';

const custom: ICustomizeOptions = {
  customizeArray: customizeArray({ plugins: CustomizeRule.Prepend }),
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
