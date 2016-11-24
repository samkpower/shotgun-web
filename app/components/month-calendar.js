import Ember from 'ember';

export default Ember.Component.extend({
  // passed variables
  activeDate: null,
  events: null,

  // private methods
  _renderCalendarView() {
    this.$('.js-calendar').fullCalendar({
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
