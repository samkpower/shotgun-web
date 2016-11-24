import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  activeDate: moment(),
  events: Ember.computed.alias('model.events'),

  actions: {
    setActiveDate(newActiveDate) {
      this.set('activeDate', newActiveDate);
    }
  }
});
