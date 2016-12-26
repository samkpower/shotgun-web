import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';
const { computed, on, inject: { service }, isEmpty, RSVP, observer } = Ember;

export default SessionService.extend({
  store: service(),
  currentUserData: computed.oneWay('data.authenticated'),
  currentUserToken: computed.oneWay('currentUserData.token'),
  currentUserFromStore: null,

  currentUser: computed('currentUserData', 'currentUserFromStore', function() {
    return this.get('currentUserFromStore') || this.get('currentUserData');
  }),

  initCurrentUser: observer('currentUserData', function() {
    if (this.get('currentUserData.id')) {
      this.loadCurrentUserFromStore();
    }
  }),

  onSuccessfulAuth: on('authenticationSucceeded', function() {
    this.loadCurrentUserFromStore();
  }),

  onSuccessfulLogout: on('invalidationSuceeded', function() {
    this.clearCurrentUserFromStore();
  }),

  loadCurrentUserFromStore() {
    if (this.get('currentUserFromStore')) { return true; }

    return new RSVP.Promise((resolve, reject) => {
      let userId = this.get('currentUserData.id');
      if (!isEmpty(userId)) {
          this.get('store').find('user', userId).then((user) => {
          this.set('currentUserFromStore', user);
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  },

  clearCurrentUserFromStore() {
    this.set('currentUserFromStore', null);
    this.get('store').unloadAll();
  }
});
