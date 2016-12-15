import Ember from 'ember';
const { inject, Controller, computed } = Ember;

export default Controller.extend({
  session: inject.service('session'),
  currentUser: computed.oneWay('session.currentUser'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
