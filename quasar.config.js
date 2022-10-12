/* eslint-env node */
/* eslint func-names: 0 */
/* eslint global-require: 0 */

const { configure } = require('quasar/wrappers');
const path = require('path');

module.exports = configure((/* ctx */) => ({
  eslint: {
    fix: true,
    warnings: true,
    errors: true,
  },
  preFetch: true,
  boot: [
    'i18n',
  ],
  css: [
    'app.scss',
  ],
  extras: [
    'mdi-v5',
    'roboto-font',
  ],
  build: {
    target: {
      browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
      node: 'node16',
    },
    vueRouterMode: 'hash',
    rebuildCache: true,
    vitePlugins: [
      ['@intlify/vite-plugin-vue-i18n', {
        include: path.resolve(__dirname, './src/i18n/**'),
      }],
    ],
  },
  devServer: {
    open: false,
  },
  framework: {
    config: {},
    iconSet: 'mdi-v5',
    lang: 'en-US',
    plugins: [
      'LocalStorage',
      'Dialog',
      'Notify',
    ],
  },
  animations: [],
}));
