import Ember from 'ember';
// import moment from 'moment';
const { computed, Component, run } = Ember;

export default Component.extend({
  classNames: ['s-input'],
  classNameBindings: ['hasErrors:s-input--has-errors'],
  hasErrors: computed.notEmpty('errors'),

  // hooks
  didInsertElement() {
    run.once('afterRender', () => {
      this._initializeSpecialInputs();
    });
  },

  // private methods
  _initializeSpecialInputs() {
    if (this.get('typeIsTime')) {
      this.$('.id-timepicker').timepicker();
    } else if (this.get('typeIsDate')) {
      this.$('.id-datepicker').pikaday({ defaultDate: this.get('value') });
    }
  },
});
