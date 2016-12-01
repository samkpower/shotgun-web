import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  // passed variables
  showModal: null,
  newEvent: null,

  actions: {
    saveEvent() {
      let newEvent = this.get('store').createRecord('event', {
        name: this.get('newEvent.name'),
        start: this.get('newEvent.start'),
        end: this.get('newEvent.end')
      });

      newEvent.save().then(() => {
        this.send('closeModal');
      }).catch(() => {
        this.send('closeModal');
      });
    },
    closeModal() {
      this.toggleProperty('showModal');
    }
  }
});
