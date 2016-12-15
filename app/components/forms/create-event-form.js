import Ember from 'ember';
import moment from 'moment';
const { computed, Component, run, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  session: service(),
  currentUser: computed.oneWay('session.currentUser'),
  tagName: 'create-event-form',

  // passed variables
  showModal: null,
  formEvent: null,

  // computed properties
  errors: {},
  hasErrors: computed.equal('errors', {}),
  eventIsNew: computed.empty('formEvent.id'),
  formData: computed('formEvent.start', 'formEvent.end', 'formEvent.name', function() {
    return {
      name: this.get('formEvent.name'),
      date: this.get('formEvent.start').format('YYYY-MM-DD'),
      startTime: this.get('formEvent.start').format('h:mma'),
      endTime: this.get('formEvent.end').format('h:mma'),
    };
  }),
  formDataStart: computed('formData.startTime', 'formData.date', function() {
    let parseableDatetime = `${this.get('formData.date')} ${this.get('formData.startTime')}`;
    return moment.parseZone(parseableDatetime, 'YYYY-MM-DD hh:ma');
  }),
  formDataEnd: computed('formData.endTime', 'formData.date', function() {
    let parseableDatetime = `${this.get('formData.date')} ${this.get('formData.endTime')}`;
    return moment.parseZone(parseableDatetime, 'YYYY-MM-DD hh:mma');
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
    this.$('.event-form__name input').focus();
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

    if (!this.get('hasErrors')) {
      return true;
    } else {
      return false;
    }
  },

  _updateEvent() {
    this.get('store').findRecord('event', this.get('formEvent.id')).then((event) => {
      event.set('name', this.get('formData.name'));
      event.set('start', this.get('formDataStart'));
      event.set('end', this.get('formDataEnd'));
      event.save().then(() => {
        this.get('closeModal')();
      }).catch((formEvent) => {
        this.set('errors', formEvent.errors);
      });
    });
  },

  _createEvent() {
    this.get('store').findRecord('user', this.get('currentUser.id')).then((user) => {
      let formEvent = this.get('store').createRecord('event', {
        name: this.get('formData.name'),
        start: this.get('formDataStart'),
        end: this.get('formDataEnd'),
        user: user
      });

      formEvent.save().then(() => {
        this.get('closeModal')();
      }).catch((formEvent) => {
        this.set('errors', formEvent.errors);
      });
    });
  },

  actions: {
    submitForm() {
      if (this._runClientValidations()) {
        if (this.get('eventIsNew')) {
          this._createEvent();
        } else {
          this._updateEvent();
        }
      }
    },

    deleteEvent() {
      this.get('store').findRecord('event', this.get('formEvent.id'), { backgroundReload: false }).then((event) => {
        event.destroyRecord().then(() => {
          this.get('closeModal')();
        }).catch((formEvent) => {
          this.set('errors', formEvent.errors);
        });
      });
    }
  }
});
