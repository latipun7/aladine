import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import { EnvironmentPlugin } from 'webpack';
import type { Configuration } from 'webpack';

import AppConfig from './app.config';
import { buildDir, publicDir, resolvePath, srcDir } from './paths';

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [['@babel/preset-typescript', { onlyRemoveTypeImports: true }]],
  },
};

const dev = async (): Promise<Configuration> => ({
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: buildDir,
    filename: 'scripts/[name].js',
    publicPath: AppConfig.developmentPublicPath,
    assetModuleFilename: 'assets/[name][ext][query]',
  },
  devServer: {
    hot: true,
    open: false,
    writeToDisk: true,
    contentBase: publicDir,
    watchContentBase: true,
    historyApiFallback: true,
    overlay: { errors: true, warnings: false },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new EnvironmentPlugin({ JEST_TEST: null }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicDir,
          to: buildDir,
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      issue: { include: { severity: 'warning' } },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [srcDir, resolvePath('tests')],
        use: [babelLoader],
      },
      {
        test: /\.(png|jpe?g|webp|gif|bmp)$/i,
        loader: 'responsive-loader',
        options: {
          name: 'assets/[name]-[width].[ext]',
          adapter: (await import('responsive-loader/sharp')).default,
          sizes: [320, 640, 960, 1200, 1800, 2400],
          placeholder: true,
          esModule: true,
          format: 'webp',
        },
      },
      {
        test: /\.s[ac]ss$/,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 3,
              modules: { auto: true, localIdentName: '[path][name]__[local]' },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
});

export default dev;
