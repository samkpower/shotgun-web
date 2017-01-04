import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import Ember from 'ember';
import ENV from '../config/environment';
const { $ } = Ember;

export default DeviseAuthenticator.extend({
  invalidate(session) {
    return $.ajax({
      url:  `${ENV.APP.apiHost}/users/sign_out`,
      type: 'DELETE',
      beforeSend(request) {
        request.setRequestHeader( 'uid', session.uid );
        request.setRequestHeader( 'client', session.client );
        request.setRequestHeader( 'access-token', session.accessToken );
      }
    });
  }
});
