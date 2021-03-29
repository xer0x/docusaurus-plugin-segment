const path = require('path');
const snippet = require('@segment/snippet');

module.exports = function (context) {
  const {siteConfig} = context;
  const {themeConfig} = siteConfig;
  const {segment} = themeConfig || {};

  if (!segment) {
    throw new Error(
      `You need to specify 'segment' object in 'themeConfig' with 'applicationId' field in it to use docusaurus-plugin-segment`,
    );
  }

  const {apiKey} = segment;

  if (!apiKey) {
    throw new Error('You specified the `segment` object in `themeConfig` but the `apiKey` field was missing.');
  }

  const isProd = process.env.NODE_ENV === 'production';

  const contents = snippet.min(segment);

  return {
    name: 'docusaurus-plugin-segment',

    getClientModules() {
      return isProd ? [path.resolve(__dirname, './segment')] : [];
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
              href: 'https://cdn.segment.io',
            },
          },
          {
            tagName: 'script',
            innerHTML: contents,
          },
        ],
      };
    },
  };
};
