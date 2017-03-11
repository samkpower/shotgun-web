import Ember from 'ember';
const { computed, Component, run } = Ember;

export default Component.extend({
  classNames: ['to-do'],
  classNameBindings: ['isComplete:to-do--completed'],
  isComplete: computed.alias('toDo.complete'),
  checkboxElement: computed(function() {
    return this.$('.to-do__checkbox');
  }),

  // hooks
  didInsertElement() {
    this._super(...arguments);
    run.once('afterRender', () => {
      this._initCheckbox();
    });
  },

  // private methods
  _initCheckbox() {
    this.get('checkboxElement').on('click', () => {
      this.toggleProperty('toDo.complete');
      this.send('saveToDo');
    });
  },

  actions: {
    saveToDo() {
      this.get('toDo').save().then(() => {
        return;
      }).catch((errors) => {
        alert(errors);
      });
    }
  }
});
