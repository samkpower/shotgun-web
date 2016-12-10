import Ember from 'ember';
import moment from 'moment';
const { observer, computed, Component, inject, $ } = Ember;

export default Component.extend({
  store: inject.service(),
  tagName: 'day-calendar',

  // passed variables
  activeDate: null,
  events: null,
  minTime: '08:00:00',
  maxTime: '24:00:00',

  // computed properties
  dayCalendarElem: computed(function() {
    return this.$();
  }),

  // observers
  updateAgendaDay: observer('activeDate', function() {
    this._goToDate();
  }),

  eventObserver: observer('events.[]', 'events.@each.start', 'events.@each.end', 'events.@each.name', function() {
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
      header: false,
      footer: false,
      allDaySlot: false,
      height: 'parent',
      events: events,
      defaultDate: activeDate,
      minTime: this.get('minTime'),
      maxTime: this.get('maxTime'),
      selectable: true,
      select: (start, end) => {
        this.get('openEventModal')({ start: start, end: end });
      },
      editable: true,
      eventDrop: (event) => {
        this.get('updateEvent')(event.id, { start: event.start, end: event.end });
      },
      eventResize: (event) => {
        this.get('updateEvent')(event.id, { start: event.start, end: event.end });
      },
      eventRender: (event, element) => {
        element.find('.fc-time').append("<i class='fa fa-pencil-square-o u-float-right fc-edit-icon'/>");
      },
      eventClick: (event, jsEvent) => {
        if ($('.fc-edit-icon').is(jsEvent.target)) {
          this.get('openEventModal')({ id: event.id, start: event.start, end: event.end, name: event.title });
        }
      }
    });
  },

  // event hooks
  didInsertElement() {
    this._super(...arguments);
    this._renderAgendaView();
  }
});
