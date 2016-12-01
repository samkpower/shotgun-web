import Ember from 'ember';
const { observer, computed, Component } = Ember;

export default Component.extend({
  // passed variables
  activeDate: null,
  events: null,
  minTime: '08:00:00',
  maxTime: '18:00:00',

  // computed properties
  dayCalendarElem: computed(function() {
    return this.$();
  }),

  // observers
  updateAgendaDay: observer('activeDate', function() {
    this._goToDate();
  }),

  eventObserver: observer('events.[]', function() {
    let dayCalendarElem  = this.get('dayCalendarElem');
    dayCalendarElem.fullCalendar('removeEvents');
    dayCalendarElem.fullCalendar('addEventSource', this.get('events'));
  }),

  // private methods
  _goToDate() {
    this.get('dayCalendarElem').fullCalendar('gotoDate', this.get('activeDate'));
  },

  _renderAgendaView() {
    let events = this.get('events');
    let activeDate = this.get('activeDate');

    this.$().fullCalendar({
      defaultView: 'agendaDay',
      height: 'auto',
      events: events,
      defaultDate: activeDate,
      minTime: this.get('minTime'),
      maxTime: this.get('maxTime'),
      selectable: true,
      select: (start, end) => {
        this.get('openCreateEventModal')({ start: start, end: end });
      }
    });
  },

  // event hooks
  didInsertElement() {
    this._super(...arguments);
    this._renderAgendaView();
  }
});
