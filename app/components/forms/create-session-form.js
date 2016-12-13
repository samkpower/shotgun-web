import Ember from 'ember';
const { Component, inject } = Ember;

export default Component.extend({
  session: inject.service('session'),

  actions: {
    submitForm() {
      let { email, password } = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:devise', email, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
        alert(reason.error || reason);
      });
    }
  }
});
