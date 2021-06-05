import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import type { Configuration } from 'webpack';

import AppConfig from './app.config';
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
      inject: false,
      scriptLoading: 'defer',
      cache: false,
      title: AppConfig.name,
      meta: {
        viewport: 'width=device-width, initial-scale=1',
        title: AppConfig.name,
        'application-name': AppConfig.name,
        'theme-color': '#08d9d6',
        description: AppConfig.description,
        robots: 'index, follow',
        googlebot: 'index, follow',
        language: 'English',
        author: 'Latif Sulistyo (https://latipun7.github.io/)',
        'twitter:card': 'summary_large_image',
        'twitter:site': '@_latipun7',
        'twitter:creator': '@_latipun7',
        'twitter:url': 'https://latipun7.github.io/aladine/',
        'twitter:title': AppConfig.name,
        'twitter:description': AppConfig.description,
        'twitter:image':
          'https://latipun7.github.io/aladine/assets/android-chrome-512x512.png',
        'twitter:image:alt': `${AppConfig.name} logo`,
        ogURL: {
          property: 'og:url',
          content: 'https://latipun7.github.io/aladine/',
        },
        ogType: { property: 'og:type', content: 'website' },
        ogTitle: { property: 'og:title', content: AppConfig.name },
        ogImage: {
          property: 'og:image',
          content:
            'https://latipun7.github.io/aladine/assets/android-chrome-512x512.png',
        },
        ogImageAlt: {
          property: 'og:image:alt',
          content: `${AppConfig.name} logo`,
        },
        ogDesc: {
          property: 'og:description',
          content: AppConfig.description,
        },
        ogSiteName: { property: 'og:site_name', content: AppConfig.name },
        ogLocale: { property: 'og:locale', content: 'en_US' },
      },
    }),
    new FaviconsWebpackPlugin({
      logo: resolvePath('src', 'assets', 'lamp.svg'),
      prefix: 'assets/',
      inject: true,
      manifest: resolvePath('src', 'assets', 'app.webmanifest'),
      favicons: {
        appName: AppConfig.name,
        appShortName: AppConfig.name,
        appDescription: AppConfig.description,
        theme_color: '#08d9d6',
        background: '#eaeaea',
        start_url: 'https://latipun7.github.io/aladine/',
        display: 'standalone',
      },
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /https:\/\/restaurant-api\.dicoding\.dev/i,
          handler: 'NetworkFirst',
        },
        {
          urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com/i,
          handler: 'StaleWhileRevalidate',
        },
      ],
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
