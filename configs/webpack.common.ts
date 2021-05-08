import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';

import { buildDir, publicDir, resolvePath } from './paths';

const common: Configuration = {
  entry: {
    index: resolvePath('src', 'index.tsx'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', '.js', '.mjs', '.json', '.wasm'],
    plugins: [new TsconfigPathsPlugin()],
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicDir,
          to: buildDir,
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: resolvePath('public', 'index.html'),
      inject: 'head',
      scriptLoading: 'defer',
      cache: false,
    }),
    new FaviconsWebpackPlugin({
      logo: resolvePath('src', 'assets', 'logo-icons.png'),
      prefix: 'assets/',
      inject: true,
      manifest: resolvePath('src', 'assets', 'app.webmanifest'),
      favicons: {
        appName: 'BrandTitle',
        appShortName: 'BrandTitle',
        appDescription: 'Description of the BrandTitle',
        theme_color: '#009688',
        background: '#36393f',
        start_url: '/',
        display: 'standalone',
      },
    }),
  ],
  module: {
    rules: [],
  },
};

export default common;
