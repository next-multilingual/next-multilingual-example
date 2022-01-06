/**
 * 11.1.3-canary.69 (https://github.com/vercel/next.js/releases/tag/v11.1.3-canary.69)
 * with ESM (https://github.com/vercel/next.js/pull/29878) is causing config issues.
 *
 * These version will trigger the SSR issue:
 *
 * eslint                        7.32.0
 * eslint-config-next  11.1.3-canary.69
 * next                11.1.3-canary.69
 */
const { getConfig } = require('next-multilingual/config');

const config = getConfig('exampleApp', ['en-US', 'fr-CA'], {
  experimental: { esmExternals: false },
  poweredByHeader: false,
  debug: true,
});

module.exports = config;

// const webpack = require('webpack');

// const { Config } = require('next-multilingual/config');

// const config = new Config('exampleApp', ['en-US', 'fr-CA'], true);

// module.exports = {
//   debug: true,
//   i18n: {
//     locales: config.getUrlLocalePrefixes(),
//     defaultLocale: config.getDefaultUrlLocalePrefix(),
//     localeDetection: false,
//   },
//   poweredByHeader: false,
//   // experimental: { esmExternals: false },
//   webpack(config, { isServer }) {
//     if (isServer) {
//       config.resolve.alias['next-multilingual/link$'] = require.resolve(
//         'next-multilingual/link/ssr'
//       );
//       config.resolve.alias['next-multilingual/head$'] = require.resolve(
//         'next-multilingual/head/ssr'
//       );

//       // if (process.platform !== 'darwin') {
//       //   config.plugins.push(
//       //     new webpack.IgnorePlugin({
//       //       resourceRegExp: /^fsevents$/,
//       //     })
//       //   );
//       // }
//     }
//     return config;
//   },
//   async rewrites() {
//     return config.getRewrites();
//   },
//   async redirects() {
//     return config.getRedirects();
//   },
// };
