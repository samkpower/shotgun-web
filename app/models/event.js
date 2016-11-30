import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  start: DS.attr('utc'),
  end: DS.attr('utc'),
  name: DS.attr('string'),
  title: Ember.computed.alias('name'),
  fullCalendarFormat: Ember.computed('start', 'end', 'name', function() {
    return { title: this.get('name'), start: this.get('start'), end: this.get('end') };
  })
});
