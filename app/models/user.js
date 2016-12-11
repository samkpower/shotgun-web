import DS from 'ember-data';
let { attr } = DS;

export default DS.Model.extend({
  email: attr('string'),
  firstName: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string')
});
