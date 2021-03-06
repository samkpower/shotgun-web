import Ember from 'ember';
import moment from 'moment';
const { observer, computed, Component, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  tagName: 'month-calendar',

  // passed variables
  activeDate: null,
  events: null,

  // computed properties
  monthCalendarElem: computed(function() {
    return this.$('.month-calendar__fc');
  }),
  activeMonth: computed.alias('activeDate'),
  nextMonth: computed('activeMonth', function() {
    return this.get('activeMonth').clone().add(1, 'months');
  }),
  prevMonth: computed('activeMonth', function() {
    return this.get('activeMonth').clone().subtract(1, 'months');
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
      height: 'parent',
      header: false,
      events: this.get('events'),
      editable: true,
      dayNamesShort: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayClick: (date) => {
        this.get('setActiveDate')(date);
        this._displayActiveDay(date);
      },
      eventClick: (event) => {
        this.get('setActiveDate')(event.start);
        this._displayActiveDay(event.start);
      },
      eventDrop: (event) => {
        this.get('updateEvent')(event.id, { start: event.start, end: event.end });
      }
    });
  },

  _displayActiveDay(date) {
    let dateFormatted = moment(date).format('YYYY-MM-DD');
    this.$('.fc-day, .fc-today').removeClass('month-calendar__active-day');
    this.$(`*[data-date="${dateFormatted}"]`).addClass('month-calendar__active-day');
  },

  // event hooks
  didInsertElement() {
    this._super(...arguments);
    this._renderCalendarView();
    this._displayActiveDay(this.get('activeDate').valueOf());
  },

  actions: {
    goToMonth(moment) {
      this.get('monthCalendarElem').fullCalendar('gotoDate', moment.startOf('month'));
      this.get('setActiveDate')(moment.startOf('month'));
      this._displayActiveDay(moment.startOf('month'));
    }
  }
});
