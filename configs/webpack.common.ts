import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';

import { buildDir, publicDir, resolvePath } from './paths';

const common: Configuration = {
  entry: {
    index: resolvePath('src', 'index.ts'),
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
        {
          context: 'node_modules/@webcomponents/webcomponentsjs',
          from: '**/*.js',
          globOptions: {
            ignore: ['**/src/**/*'],
          },
          to: buildDir,
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
      logo: resolvePath('src', 'assets', 'lamp.svg'),
      prefix: 'assets/',
      inject: true,
      manifest: resolvePath('src', 'assets', 'app.webmanifest'),
      favicons: {
        appName: 'à la Dine',
        appShortName: 'à la Dine',
        appDescription: 'Dine in the restaurant made easy 🍽😋',
        theme_color: '#08d9d6',
        background: '#eaeaea',
        start_url: '/',
        display: 'standalone',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(html|svg)$/,
        loader: 'html-loader',
        options: { sources: false, minimize: { collapseWhitespace: true } },
      },
    ],
  },
};

export default common;
