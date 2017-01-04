import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';
const { computed, inject: { service } } = Ember;

export default DS.JSONAPIAdapter.extend({
  session: service('session'),
  currentUser: computed.alias('session.currentUser'),
  namespace: 'api/v1',
  headers: computed('session.currentUserToken', 'currentUser.email', function() {
    return {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authorization-token': this.get('session.currentUserToken') || '',
      'requestor-email': this.get('currentUser.email') || ''
    };
  }),
  host: ENV.APP.apiHost
});
