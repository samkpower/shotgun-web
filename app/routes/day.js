import Ember from 'ember';
import moment from 'moment';
const { inject: { service }, RSVP } = Ember;

export default Ember.Route.extend({
  session: service('session'),

  beforeModel() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('login');
    }
  },

  model(params) {
    return RSVP.hash({
      activeDate: moment(params.date, "YYYY-MM-DD"),
      toDosFromApi: this.store.query('to-do', { filter: { user_id: this.get('session.currentUser.id') } }).then((toDos) => {
        return toDos;
      }),
      toDos: this.store.peekAll('to-do'),
      eventsFromApi: this.store.query('event', { filter: { user_id: this.get('session.currentUser.id') } }).then(function(events) {
        return events;
      }),
      events: this.store.peekAll('event')
    });
  }
});
