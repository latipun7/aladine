import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import svgToMiniDataURI from 'mini-svg-data-uri';
import postcssPresetEnv from 'postcss-preset-env';
import type { Configuration } from 'webpack';

import { buildDir, srcDir, resolvePath } from './paths';

const dev = async (): Promise<Configuration> => ({
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: buildDir,
    filename: 'scripts/[name].js',
  },
  devServer: {
    open: false,
    hot: true,
    contentBase: resolvePath('public'),
    watchContentBase: true,
    historyApiFallback: true,
    overlay: { errors: true, warnings: true },
    writeToDisk: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [srcDir],
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
          ],
          plugins: ['react-refresh/babel'],
        },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: (content: string) =>
                svgToMiniDataURI(content.toString()),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|webp|gif|bmp)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: require.resolve('responsive-loader'),
          name: 'assets/images/[name]-[width].[ext]',
          adapter: (await import('responsive-loader/sharp')).default,
          sizes: [320, 640, 960, 1200, 1800, 2400],
          placeholder: true,
          esModule: true,
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
