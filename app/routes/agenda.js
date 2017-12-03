import Ember from 'ember';
const { inject: { service }, RSVP } = Ember;

export default Ember.Route.extend({
  session: service('session'),

  beforeModel() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('login');
    }
  },

  model() {
    return RSVP.hash({
      eventsFromApi: this.store.query('event', { filter: { user_id: this.get('session.currentUser.id') } }).then(function(events) {
        return events;
      }),
      events: this.store.peekAll('event')
      // querying doesn't return a live store array
    });
  }
});
