const path = require('path');

module.exports = function (context) {
  const {siteConfig} = context;
  const {themeConfig} = siteConfig;
  const {moesif} = themeConfig || {};

  if (!moesif) {
    throw new Error(
      `You need to specify 'moesif' object in 'themeConfig' with 'applicationId' field in it to use docusaurus-plugin-moesif`,
    );
  }

  const {applicationId} = moesif;

  if (!applicationId) {
    throw new Error(
      'You specified the `moesif` object in `themeConfig` but the `applicationId` field was missing. ' +
        'Please ensure this is not a mistake.',
    );
  }

  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus-plugin-moesif',

    getClientModules() {
      return isProd ? [path.resolve(__dirname, './moesif')] : [];
    },

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://unpkg.com',
            },
          },
          {
            tagName: 'script',
            attributes: {
              src: '//unpkg.com/moesif-browser-js@v1/moesif.min.js',
            },
          },
          {
            tagName: 'script',
            innerHTML: `
            window.moesif = moesif.init(${JSON.stringify(moesif)});
            `,
          },
        ],
      };
    },
  };
};
