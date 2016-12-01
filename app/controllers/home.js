import Ember from 'ember';
import moment from 'moment';
const { computed, Controller } = Ember;

export default Controller.extend({
  activeDate: moment(),
  showCreateEventModal: false,
  newEvent: computed(() => { return {}; }),
  events: computed('model.events.[]', function() {
    return this.get('model.events').map((event) => {
      return event.get('fullCalendarFormat');
    });
  }),

  actions: {
    setActiveDate(newActiveDate) {
      this.set('activeDate', newActiveDate);
    },
    openCreateEventModal(eventObject) {
      this.set('newEvent.start', eventObject.start);
      this.set('newEvent.end', eventObject.end);
      this.toggleProperty('showCreateEventModal');
    }
  }
});
