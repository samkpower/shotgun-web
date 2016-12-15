import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import Ember from 'ember';
const { $ } = Ember;

export default DeviseAuthenticator.extend({
  invalidate: function(session) {
    return $.ajax({
      url:  '/users/sign_out',
      type: 'DELETE',
      beforeSend(request) {
        request.setRequestHeader( 'uid', session.uid );
        request.setRequestHeader( 'client', session.client );
        request.setRequestHeader( 'access-token', session.accessToken );
      }
    });
  }
});
