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
      title: 'à La Dine',
      meta: {
        viewport: 'width=device-width, initial-scale=1',
        title: 'à La Dine',
        'application-name': 'à La Dine',
        'theme-color': '#08d9d6',
        description: 'Dine away the easy way 🍽😋',
        robots: 'index, follow',
        googlebot: 'index, follow',
        language: 'English',
        author: 'Latif Sulistyo (https://latipun7.github.io/)',
        'twitter:card': 'summary_large_image',
        'twitter:site': '@_latipun7',
        'twitter:creator': '@_latipun7',
        'twitter:url': 'https://latipun7.github.io/aladine/',
        'twitter:title': 'à La Dine',
        'twitter:description': 'Dine away the easy way 🍽😋',
        'twitter:image':
          'https://latipun7.github.io/aladine/assets/android-chrome-512x512.png',
        'twitter:image:alt': 'à La Dine logo',
        ogURL: {
          property: 'og:url',
          content: 'https://latipun7.github.io/aladine/',
        },
        ogType: { property: 'og:type', content: 'website' },
        ogTitle: { property: 'og:title', content: 'à La Dine' },
        ogImage: {
          property: 'og:image',
          content:
            'https://latipun7.github.io/aladine/assets/android-chrome-512x512.png',
        },
        ogImageAlt: { property: 'og:image:alt', content: 'à La Dine logo' },
        ogDesc: {
          property: 'og:description',
          content: 'Dine away the easy way 🍽😋',
        },
        ogSiteName: { property: 'og:site_name', content: 'à La Dine' },
        ogLocale: { property: 'og:locale', content: 'en_US' },
      },
    }),
    new FaviconsWebpackPlugin({
      logo: resolvePath('src', 'assets', 'lamp.svg'),
      prefix: 'assets/',
      inject: true,
      manifest: resolvePath('src', 'assets', 'app.webmanifest'),
      favicons: {
        appName: 'à La Dine',
        appShortName: 'à La Dine',
        appDescription: 'Dine away the easy way 🍽😋',
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
