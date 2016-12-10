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
  errors: computed(function() {
    return {};
  }),
  hasErrors: computed.equal('errors', {}),

  formData: computed('newEvent.start', 'newEvent.end', 'newEvent.name', function() {
    return {
      name: this.get('newEvent.name'),
      date: this.get('newEvent.start').format('YYYY-MM-DD'),
      startTime: this.get('newEvent.start').format('h:mma'),
      endTime: this.get('newEvent.end').format('h:mma')
    };
  }),

  formEventStart: computed('formData.startTime', 'formData.date', function() {
    return moment(`${this.get('formData.date')}${this.get('formData.startTime')}`, 'YYYY-MM-DDh:ma');
  }),
  formEventEnd: computed('formData.endTime', 'formData.date', function() {
    return moment(`${this.get('formData.date')}${this.get('formData.endTime')}`, 'YYYY-MM-DDh:ma');
  }),

  // hooks
  didInsertElement() {
    this._super(...arguments);

    run.once('afterRender', () => {
      this._setAutofocus();
    });
  },

  // private methods
  _setAutofocus() {
    this.$('.id-event-name').focus();
  },

  _runClientValidations() {
    this.set('errors', {});

    if (!this.get('formData.name')) {
      this.set('errors.name', "can't be blank");
    }

    if (!this.get('formData.date')) {
      this.set('errors.date', "can't be blank");
    }

    if (!this.get('formData.startTime')) {
      this.set('errors.startTime', "can't be blank");
    }

    if (!this.get('formData.endTime')) {
      this.set('errors.endTime', "can't be blank");
    }

    if (this.get('hasErrors')) {
      return false;
    } else {
      return true;
    }
  },

  actions: {
    saveEvent() {
      if (this._runClientValidations()) {
        let newEvent = this.get('store').createRecord('event', {
          name: this.get('formData.name'),
          start: new Date(this.get('formEventStart')),
          end: new Date(this.get('formEventEnd'))
        });

        newEvent.save().then(() => {
          this.get('closeModal')();
        }).catch((formEvent) => {
          this.set('errors', formEvent.errors);
        });
      }
    },
  }
});
