import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  tagName: 'create-event-modal',

  // passed variables
  showModal: null,
  newEvent: null,

  actions: {
    closeModal() {
      this.toggleProperty('showModal');
    }
  }
});
