import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from '../config/environment';

const { inject: { service }, $, RSVP } = Ember;

export default Torii.extend({
  torii: service('torii'),
  session: service('session'),
  store: service('store'),

  authenticate(options) {
    return this._super(options).then((providerData) => {
      return $.ajax({
        type: "POST",
        url: `${ENV.APP.apiHost}/users/auth/google_oauth2/callback?code=${providerData.authorizationCode}`,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ code: providerData.authorizationCode }),
        dataType: "json",
        headers: { 'Accept': 'application/json' }
      });
    }).then((internalData) => {
      // TODO: fix this workaround used to invalidate session
      internalData.provider = this._provider;
      return internalData;
    });
  },

  restore(data) {
    var resolveData = data || {};
    this._provider = resolveData.provider;
    return new RSVP.Promise(function(resolve) { resolve(resolveData); });
  }
});
