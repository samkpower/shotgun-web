import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service('session'),

  beforeModel() {
    this.get('session').invalidate();
  }
});
