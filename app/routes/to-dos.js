import Ember from 'ember';
const { inject: { service }, RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      toDosFromApi: this.store.query('to-do', { filter: { user_id: this.get('session.currentUser.id') } }).then((toDos) => {
        return toDos;
      }),
      toDos: this.store.peekAll('to-do')
      // querying doesn't return a live store array
    });
  }
});
