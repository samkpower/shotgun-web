import Ember from 'ember';
import moment from 'moment';
const { computed, Component, run } = Ember;

export default Component.extend({
  store: Ember.inject.service(),
  tagName: 'create-event-form',

  // passed variables
  showModal: null,
  newEvent: null,

  // computed properties
  newEventName: computed.alias('newEvent.name'),
  newEventDate: computed('newEvent.start', function() {
    return this.get('newEvent.start').format('YYYY-MM-DD');
  }),
  newEventStartTime: computed('newEvent.start', function() {
    return this.get('newEvent.start').format('h:mma');
  }),
  newEventEndTime: computed('newEvent.end', function() {
    return this.get('newEvent.end').format('h:mma');
  }),
  newEventStart: computed('newEventStartTime', 'newEventDate', function() {
    return moment(`${this.get('newEventDate')}${this.get('newEventStartTime')}` ,'YYYY-MM-DDh:ma');
  }),
  newEventEnd: computed('newEventStartTime', 'newEventDate', function() {
    return moment(`${this.get('newEventDate')}${this.get('newEventEndTime')}` ,'YYYY-MM-DDh:ma');
  }),

  // private methods
  _setAutofocus() {
    this.$('.id-event-name').focus();
  },

  _initializeTimepickers() {
    this.$('.id-event-start-time').timepicker();
    this.$('.id-event-start-end').timepicker();
    this.$('.id-event-date').pikaday({ defaultDate: this.get('newEventdate') });
  },

  // hooks
  didInsertElement() {
    this._super(...arguments);

    run.once('afterRender', () => {
      this._initializeTimepickers();
      this._setAutofocus();
    });
  },

  actions: {
    saveEvent() {
      let newEvent = this.get('store').createRecord('event', {
        name: this.get('newEvent.name'),
        start: new Date(this.get('newEventStart')),
        end: new Date(this.get('newEventEnd'))
      });

      newEvent.save().then(() => {
        this.get('closeModal')();
      }).catch(() => {
        this.get('closeModal')();
      });
    },
  }
});
