import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';

const { inject: { service }, $ } = Ember;

export default Torii.extend({
  torii: service('torii'),
  session: service('session'),
  store: service('store'),

  authenticate(options) {
    return this._super(options).then((data) => {
      return $.ajax({
        type: "POST",
        // TODO: code as http param as temporary fix for issues with Omniauth middleware
        url: `http://localhost:3000/users/auth/google_oauth2/callback?code=${data.authorizationCode}`,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ code: data.authorizationCode }),
        dataType: "json",
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
    });
  }
});
