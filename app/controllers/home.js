import Ember from 'ember';
import moment from 'moment';
const { computed, Controller, inject: { service } } = Ember;

export default Controller.extend({
  store: service(),
  activeDate: moment(),
  showCreateEventModal: false,
  formEvent: {},
  events: computed('model.events.[]', 'model.events.@each.start', 'model.events.@each.end', 'model.events.@each.name', function() {
    return this.get('model.events').map((event) => {
      return event.get('fullCalendarFormat');
    });
  }),

  actions: {
    setActiveDate(newActiveDate) {
      this.set('activeDate', newActiveDate);
    },
    openEventModal(eventObject) {
      this.set('formEvent', eventObject);
      this.toggleProperty('showCreateEventModal');
    },
    updateEvent(eventId, eventProperties) {
      let editEvent = this.get('store').peekRecord('event', eventId);
      editEvent.setProperties(eventProperties);
      editEvent.save();
    },
  }
});
