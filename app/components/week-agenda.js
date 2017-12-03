import Ember from 'ember';
import moment from 'moment';
const { observer, computed, Component, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  tagName: 'week-agenda',

  // passed variables
  activeDate: null,
  events: null,

  // user config (eventually)
  firstDay: 1, // Sunday = 0
  minTime: '08:00:00',
  maxTime: '24:00:00',

  // computed properties
  weekAgendaElem: computed(function() {
    return this.$('.week-agenda__fc');
  }),
  // activeMonth: computed.alias('activeDate'),
  // nextMonth: computed('activeMonth', function() {
  //   return this.get('activeMonth').clone().add(1, 'months');
  // }),
  // prevMonth: computed('activeMonth', function() {
  //   return this.get('activeMonth').clone().subtract(1, 'months');
  // }),

  // observers
  eventObserver: observer('events.[]', 'events.@each.start', 'events.@each.end', 'events.@each.name', function() {
    let weekAgendaElem  = this.get('weekAgendaElem');
    weekAgendaElem.fullCalendar('removeEvents');
    weekAgendaElem.fullCalendar('addEventSource', this.get('events'));
  }),

  // private methods
  _renderCalendarView() {
    this.get('weekAgendaElem').fullCalendar({
      allDaySlot: false,
      defaultView: 'agendaWeek',
      firstDay: this.get('firstDay'),
      height: 'parent',
      header: false,
      footer: false,
      events: this.get('events'),
      editable: true,
      minTime: this.get('minTime'),
      maxTime: this.get('maxTime'),
      dayNamesShort: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      select: (start, end) => {
        this.get('openEventModal')({ start: start, end: end });
      },
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
    this.$('.fc-day, .fc-today').removeClass('week-agenda__active-day');
    this.$(`*[data-date="${dateFormatted}"]`).addClass('week-agenda__active-day');
  },

  // event hooks
  didInsertElement() {
    this._super(...arguments);
    this._renderCalendarView();
    this._displayActiveDay(this.get('activeDate').valueOf());
  },

  actions: {
    goToMonth(moment) {
      this.get('weekAgendaElem').fullCalendar('gotoDate', moment.startOf('month'));
      this.get('setActiveDate')(moment.startOf('month'));
      this._displayActiveDay(moment.startOf('month'));
    }
  }
});
