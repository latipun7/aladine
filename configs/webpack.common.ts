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
      title: 'à la Dine',
      meta: {
        viewport: 'width=device-width, initial-scale=1',
        title: 'à la Dine',
        'application-name': 'à la Dine',
        'theme-color': '#08d9d6',
        description: 'Dine in the restaurant made easy 🍽😋',
        robots: 'index, follow',
        googlebot: 'index, follow',
        language: 'English',
        author: 'Latif Sulistyo (https://latipun7.github.io/)',
        'twitter:card': 'summary_large_image',
        'twitter:site': '@_latipun7',
        'twitter:creator': '@_latipun7',
        'twitter:url': 'https://latipun7.github.io/aladine/',
        'twitter:title': 'à la Dine',
        'twitter:description': 'Dine in the restaurant made easy 🍽😋',
        'twitter:image':
          'https://latipun7.github.io/aladine/assets/android-chrome-512x512.png',
        'twitter:image:alt': 'à la Dine logo',
        ogURL: {
          property: 'og:url',
          content: 'https://latipun7.github.io/aladine/',
        },
        ogType: { property: 'og:type', content: 'website' },
        ogTitle: { property: 'og:title', content: 'à la Dine' },
        ogImage: {
          property: 'og:image',
          content:
            'https://latipun7.github.io/aladine/assets/android-chrome-512x512.png',
        },
        ogImageAlt: { property: 'og:image:alt', content: 'à la Dine logo' },
        ogDesc: {
          property: 'og:description',
          content: 'Dine in the restaurant made easy 🍽😋',
        },
        ogSiteName: { property: 'og:site_name', content: 'à la Dine' },
        ogLocale: { property: 'og:locale', content: 'en_US' },
      },
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
        start_url: 'https://latipun7.github.io/aladine/',
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
