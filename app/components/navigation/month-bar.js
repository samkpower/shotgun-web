import Ember from 'ember';
import moment from 'moment';
const { Component, inject: { service }, computed, observer, run } = Ember;

export default Component.extend({
  tagName: 'month-bar',
  classNames: ['month-bar'],

  // passed variables
  activeDate: null,

  // computed variables
  listOfMonths: computed(() => {
    var count = 0;
    var months = [];
    while (count < 12) {
      months.push(moment().month(count++));
    }
  }),
  listOfMonthsPartial: computed(() => {
    this.get('listOfMonths').map((month) => {

    });
  }),

  //

  init() {
    this._super(...arguments);
    run.once('afterRender', () => {

    });
  },

  actions: {

  }

  // sync the activeDate with the month displayed
});
