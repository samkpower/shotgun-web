import Ember from 'ember';

export default Ember.Component.extend({
  // passed variables
  activeDate: null,
  events: null,
  agenda: Ember.computed(function() {
    return this.$('.js-calendar');
  }),

  // observers
  updateAgendaDay: Ember.observer('activeDate', function() {
    console.log('date change');
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
      defaultDate: activeDate
    });
  },

  // event hooks
  didInsertElement() {
    this._super(...arguments);
    this._renderAgendaView();
  }
});
