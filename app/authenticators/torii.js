import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';

const { inject: { service }, $, merge, RSVP } = Ember;

export default Torii.extend({
  torii: service('torii'),
  session: service('session'),
  store: service('store'),

  authenticate(options) {
    return this._super(options).then((providerData) => {
      return $.ajax({
        type: "POST",
        // TODO: code as http param as temporary fix for issues with Omniauth middleware
        url: `http://localhost:3000/users/auth/google_oauth2/callback?code=${providerData.authorizationCode}`,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ code: providerData.authorizationCode }),
        dataType: "json",
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
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
