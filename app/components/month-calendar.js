import Ember from 'ember';
const { observer, computed, Component, inject } = Ember;

export default Component.extend({
  store: inject.service(),

  // passed variables
  activeDate: null,
  events: null,

  // computed properties
  monthCalendarElem: computed(function() {
    return this.$();
  }),

  // observers
  eventObserver: observer('events.[]', 'events.@each.start', 'events.@each.end', 'events.@each.name', function() {
    let monthCalendarElem  = this.get('monthCalendarElem');
    monthCalendarElem.fullCalendar('removeEvents');
    monthCalendarElem.fullCalendar('addEventSource', this.get('events'));
  }),

  // private methods
  _renderCalendarView() {
    this.get('monthCalendarElem').fullCalendar({
      height: 'auto',
      events: this.get('events'),
      editable: true,
      dayClick: (date) => {
        this.get('setActiveDate')(date.valueOf());
      },
      eventDrop: (event) => {
        this.get('updateEvent')(event.id, { start: event.start, end: event.end });
      },
      eventResize: (event) => {
        this.get('updateEvent')(event.id, { start: event.start, end: event.end });
      }
    });
  },

  // event hooks
  didRender() {
    this._super(...arguments);
    this._renderCalendarView();
  }
});
