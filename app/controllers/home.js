import Ember from 'ember';
import moment from 'moment';
const { computed, Controller } = Ember;

export default Controller.extend({
  activeDate: moment(),
  activeDateSemantic: computed('activeDate', function() {
    return moment(this.get('activeDate')).format('LL');
  }),
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
