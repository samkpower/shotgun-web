import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONSerializer.extend({
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }
});
