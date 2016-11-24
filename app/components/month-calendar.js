import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    this.$('.js-calendar').fullCalendar({
      events: [
        {
          title: 'Bungeejumping',
          start: '2016-11-22T12:30:00',
          end: '2016-11-22T14:30:00'
        },
        {
          title: 'Get a tattoo',
          start: '2016-11-29T09:30:00',
          end: '2016-11-29T14:30:00'
        }
      ]
    });
  }
});
