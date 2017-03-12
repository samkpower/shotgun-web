import Ember from 'ember';
const { computed, Controller, inject: { service } } = Ember;

export default Controller.extend({
  store: service(),
  activeDate: computed.alias('model.activeDate')
});
