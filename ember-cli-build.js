/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

// Get Ember config
const environment = process.env.EMBER_ENV || 'development';
const config = require('./config/environment')(environment);

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'ember-composable-helpers': {
      only: ['queue', 'compute', 'invoke'],
    },
    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  const assetTree = new Funnel(`static/${config.brand.name}`, {
    destDir: '/assets'
  });

  return app.toTree([assetTree]);
};
