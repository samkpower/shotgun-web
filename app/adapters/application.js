import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';
const { computed } = Ember;

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',
  headers: computed(() => {
    return {
      'accept': 'application/json',
      'content-type': 'application/json',
    };
  }),
  host: ENV.APP.host
});
