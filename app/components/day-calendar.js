import Ember from 'ember';

export default Ember.Component.extend({
  // passed variables
  activeDate: null,
  events: null,
  minTime: '08:00:00',
  maxTime: '18:00:00',
  newEvent: null,

  // computed properties
  agenda: Ember.computed(function() {
    return this.$('.js-calendar');
  }),

  // observers
  updateAgendaDay: Ember.observer('activeDate', function() {
    this._goToDate();
  }),

  // private methods
  _goToDate() {
    this.get('agenda').fullCalendar('gotoDate', this.get('activeDate'));
  },

  _renderAgendaView() {
    let events = this.get('events');
    let activeDate = this.get('activeDate');

    this.$('.js-calendar').fullCalendar({
      defaultView: 'agendaDay',
      height: 'auto',
      events: events,
      defaultDate: activeDate,
      minTime: this.get('minTime'),
      maxTime: this.get('maxTime'),
      selectable: true,
      select: (start, end) => {
        this.set('newEvent.start', new Date(start));
        this.set('newEvent.end', new Date(end));
        this.get('openCreateEventModal')();
      }
    });
  },

  // event hooks
  didInsertElement() {
    this._super(...arguments);
    this._renderAgendaView();
  }
});
