import Ember from 'ember';
const { inject, Controller, computed } = Ember;

export default Controller.extend({
  session: inject.service('session'),
  currentUserService: inject.service('current-user'),
  currentUser: computed(function() {
    return this.get('currentUserService').get('user');
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
