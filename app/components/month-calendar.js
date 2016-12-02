import Ember from 'ember';
const { observer, computed, Component } = Ember;

export default Component.extend({
  // passed variables
  activeDate: null,
  events: null,

  // computed properties
  monthCalendarElem: computed(function() {
    return this.$();
  }),

  // observers
  eventObserver: observer('events.[]', function() {
    let monthCalendarElem  = this.get('monthCalendarElem');
    monthCalendarElem.fullCalendar('removeEvents');
    monthCalendarElem.fullCalendar('addEventSource', this.get('events'));
  }),

  // private methods
  _renderCalendarView() {
    this.get('monthCalendarElem').fullCalendar({
      height: 'auto',
      events: this.get('events'),
      dayClick: (date) => {
        this.get('setActiveDate')(date.valueOf());
      }
    });
  },

  // event hooks
  didRender() {
    this._super(...arguments);
    this._renderCalendarView();
  }
});
