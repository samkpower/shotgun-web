import Ember from 'ember';
const { computed, Component } = Ember;

export default Component.extend({
  toDos: computed.alias('model')
});
