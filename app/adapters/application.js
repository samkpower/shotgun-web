import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',
  headers: Ember.computed(function() {
    return {
      'accept': 'application/json',
      'content-type': 'application/json',
    };
  }),
  host: 'https://skp-shotgun-api.herokuapp.com'
});
