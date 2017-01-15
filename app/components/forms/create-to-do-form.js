import Ember from 'ember';
const { computed, Component, inject: { service }, run } = Ember;

export default Component.extend({
  store: service(),
  session: service(),
  currentUser: computed.oneWay('session.currentUser'),

  inputField: computed(function() {
    return this.$('input');
  }),

  // computed properties
  errors: {},

  // hooks
  init() {
    this._super(...arguments);
    run.once('afterRender', () => {
      this.get('inputField').keyup((event) => {
        if (event.keyCode === 13) {
          this.get('inputField').attr('disabled', 'disabled');
          this.send('createToDo');
        }
      });
    });
  },

  actions: {
    resetInput() {
      this.get('inputField').val('');
      this.get('inputField').removeAttr('disabled');
    },
    createToDo() {
      let user = this.get('store').peekRecord('user', this.get('currentUser.id'));
      let name = this.get('name');
      let toDo = this.get('store').createRecord('toDo', {
        name: this.get('name'),
        user: user
      });
      this.get('inputField').val('');

      toDo.save().then(() => {
        // alert('Great success');
        this.send('resetInput');
      }).catch((reason) => {
        try {
          let errorsHash = {};
          reason.errors.map(function(error) {
            let errorKey = error.source.pointer.split('/').pop();
            let errorMessage = error.detail;
            return errorsHash[errorKey] = errorMessage;
          });
          this.get('inputField').val(name);
          this.set('errors', errorsHash);
        } catch(err) {
          alert(`Error: ${reason.errors[0].title}`);
        }
      });
    }
  }
});
