import Ember from 'ember';
const { computed, Component } = Ember;

export default Component.extend({
  store: Ember.inject.service(),
  tagName: 'create-user-form',

  // properties
  newUser: {},
  errors: {},
  hasErrors: computed.equal('errors', {}),

  // private methods
  _createUser() {
    let newUser = this.get('store').createRecord('user', {
      email: this.get('newUser.email'),
      password: this.get('newUser.password'),
      passwordConfirmation: this.get('newUser.password'),
      firstName: this.get('newUser.firstName')
    });

    newUser.save().then(() => {
      this.set('newUser', {});
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

  actions: {
    submitForm() {
      this._createUser();
    }
  }
});
