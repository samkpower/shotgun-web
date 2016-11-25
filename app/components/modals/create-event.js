import Ember from 'ember';

export default Ember.Component.extend({
  // passed variables
  showModal: null,
  newEvent: Ember.computed.alias('model'),

  actions: {
    saveEvent() {
      this.get('newEvent').save().then(function() {
        // should append to events
      }).catch(function() {
        this.send('closeModal');
        // reset newEvent
      });
    },
    closeModal() {
      this.toggleProperty('showModal');
    }
  }
});
