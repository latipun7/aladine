import purgeCss from '@fullhuman/postcss-purgecss';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import cssnano from 'cssnano';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { EnvironmentPlugin } from 'webpack';
import type { Configuration } from 'webpack';

import { buildDir, srcDir } from './paths';

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3.12,
        },
      ],
      ['@babel/preset-react', { runtime: 'automatic' }],
      ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
    ],
  },
};

const prod = async (): Promise<Configuration> => ({
  mode: 'production',
  devtool: 'nosources-source-map',
  bail: true,
  target: 'browserslist',
  output: {
    path: buildDir,
    filename: 'scripts/[name]-[contenthash:8].js',
    publicPath: '/aladine/',
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: { files: './src/**/*.{ts,tsx,js,jsx}', options: { cache: true } },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name]-[contenthash:8].css',
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [srcDir],
        use: [babelLoader],
      },
      {
        test: /\.svg$/i,
        use: [
          babelLoader,
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              filenameCase: 'kebab',
              svgoConfig: { plugins: [{ removeViewBox: false }] },
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
          name: 'assets/images/[name]-[contenthash:8]-[width].[ext]',
          adapter: (await import('responsive-loader/sharp')).default,
          sizes: [320, 640, 960, 1200, 1800, 2400],
          format: 'webp',
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
              sourceMap: false,
              importLoaders: 3,
              modules: { auto: true, localIdentName: '[hash:base64]' },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              postcssOptions: {
                plugins: [
                  postcssPresetEnv(),
                  cssnano({
                    preset: [
                      'default',
                      {
                        discardComments: { removeAll: true },
                        convertValues: { precision: 2 },
                      },
                    ],
                  }),
                  purgeCss({
                    content: ['{public,src}/**/*.{js,jsx,ts,tsx,html,scss}'],
                    defaultExtractor: (content) =>
                      content.match(/[\w-/:]+(?<!:)/g) || [],
                  }),
                ],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: false },
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

export default prod;
