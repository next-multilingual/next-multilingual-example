// const { getConfig } = require('next-multilingual/config');

// const config = getConfig('exampleApp', ['en-US', 'fr-CA'], {
//   poweredByHeader: false,
//   // debug: true,
// });

// console.dir(config, { depth: null });

// module.exports = config;

const { Config } = require('next-multilingual/config');

const config = new Config('exampleApp', ['en-US', 'fr-CA']);

module.exports = {
  i18n: {
    locales: config.getUrlLocalePrefixes(),
    defaultLocale: config.getDefaultUrlLocalePrefix(),
    localeDetection: false,
  },
  poweredByHeader: false,
  webpack(config, { isServer }) {
    if (isServer) {
      config.resolve.alias['next-multilingual/link$'] = require.resolve(
        'next-multilingual/link/ssr'
      );
      config.resolve.alias['next-multilingual/head$'] = require.resolve(
        'next-multilingual/head/ssr'
      );
    }
    return config;
  },
  async rewrites() {
    return config.getRewrites();
  },
  async redirects() {
    return config.getRedirects();
  },
};
