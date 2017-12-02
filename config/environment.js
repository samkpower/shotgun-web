/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'shotgun-web',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute:         'login',
    routeAfterAuthentication:    'home',
    routeIfAlreadyAuthenticated: 'home'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.host = 'http://localhost:4200';
    ENV.APP.apiHost = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.host = 'http://find-flow.com';
    ENV.APP.apiHost = 'https://skp-shotgun-api.herokuapp.com';
  }

  ENV.torii = {
    providers: {
      'google-oauth2': {
        apiKey: process.env['FLOW_GOOG_API_CLIENT_ID'],
        redirectUri: `${ENV.APP.host}/login`,
        scopes: 'profile,email'
      }
    }
  };

  return ENV;
};
