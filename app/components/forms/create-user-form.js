import Ember from 'ember';
const { computed, Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  session: service('session'),
  tagName: 'create-user-form',

  // properties
  newUser: {},
  errors: {},
  hasErrors: computed.equal('errors', {}),
  shouldShowEmailForm: false,

  // private methods
  _createUser() {
    let newUser = this.get('store').createRecord('user', {
      email: this.get('newUser.email'),
      password: this.get('newUser.password'),
      passwordConfirmation: this.get('newUser.password'),
      firstName: this.get('newUser.firstName')
    });

    newUser.save().then((user) => {
      this.set('newUser', {});
      this._signInUser(user.get('email'), user.get('password'));
    }).catch((reason) => {
      try {
        let errorsHash = {};
        reason.errors.map(function(error) {
          let errorKey = error.source.pointer.split('/').pop();
          let errorMessage = error.detail;
          return errorsHash[errorKey] = errorMessage;
        });
        this.set('errors', errorsHash);
      } catch(err) {
        alert(`Error: ${reason.errors[0].title}`);
      }
    });
  },

  _signInUser(email, password) {
    this.get('session').authenticate('authenticator:devise', email, password)
    .catch((reason) => {
      this.set('errorMessage', reason.error || reason);
      alert(reason.error || reason);
    });
  },

  actions: {
    submitForm() {
      this._createUser();
    },

    signUpWithGoogle() {
      this.get('session').authenticate('authenticator:torii', 'google-oauth2')
      .catch((reason) => {
        this.set('errorMessage', reason.error || reason);
        alert(reason.error || reason);
      });
    },

    toggleShowEmailForm() {
      this.toggleProperty('showEmailForm');
    }
  }
});
