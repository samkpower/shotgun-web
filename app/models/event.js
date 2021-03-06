import DS from 'ember-data';
import Ember from 'ember';
const { attr, belongsTo } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  start: attr('utc'),
  end: attr('utc'),
  name: attr('string'),
  user: belongsTo('user'),
  title: computed.alias('name'),
  date: computed('start', function() {
    return this.get('start').format('YYYY-MM-DD');
  }),
  startTime: computed('start', function() {
    return this.get('start').format('h:mma');
  }),
  endTime: computed('end', function() {
    return this.get('end').format('h:mma');
  }),
  fullCalendarFormat: computed('start', 'end', 'name', 'id', function() {
    return {
      title: this.get('name'),
      start: this.get('start'),
      end: this.get('end'),
      id: this.get('id')
    };
  })
});
