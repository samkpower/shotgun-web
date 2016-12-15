import Ember from 'ember';
const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  session: service(),
  tagName: 'top-bar',
  classNames: ['top-bar'],

  currentUser: computed('session.currentUser', function() {
    return this.get('session.currentUser');
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
