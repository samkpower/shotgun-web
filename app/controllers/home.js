import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  activeDate: moment(),
  showCreateEventModal: false,
  newEvent: Ember.computed(function() {
    return this.store.createRecord('event', { name: 'New Event!' });
  }),
  events: Ember.computed('model.events.[]', function() {
    return this.get('model.events').map((event) => {
      return event.get('fullCalendarFormat');
    });
  }),

  actions: {
    setActiveDate(newActiveDate) {
      this.set('activeDate', newActiveDate);
    },
    openCreateEventModal() {
      this.toggleProperty('showCreateEventModal');
    }
  }
});
