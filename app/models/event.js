import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  start: DS.attr('date'),
  end: DS.attr('date'),
  name: DS.attr('string'),
  fullCalendarFormat: Ember.computed('start', 'end', 'name', function() {
    return { title: this.get('name'), start: this.get('start'), end: this.get('end') };
  })
});
