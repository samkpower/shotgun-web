import Ember from 'ember';
const { Component, inject: { service } } = Ember;

export default Component.extend({
  session: service('session'),

  actions: {
    submitForm() {
      let { email, password } = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:devise', email, password)
      .catch((reason) => {
        this.set('errorMessage', reason.error || reason);
        alert(reason.error || reason);
      });
    },
    loginWithGoogle() {
      this.get('session').authenticate('authenticator:torii', 'google-oauth2')
      .catch((reason) => {
        this.set('errorMessage', reason.error || reason);
        alert(reason.error || reason);
      });
    }
  }
});
