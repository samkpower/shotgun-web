import Ember from 'ember';
const { computed, Component } = Ember;

export default Component.extend({
  tagName: 'time-quote',
  classNames: ['s-quote'],

  quotes: [
    {
      text: 'A journey of a thousand miles begins with a single step.',
      author: 'Lao Tzu'
    },
    {
      text: 'It does not matter how slowly you go as long as you do not stop.',
      author: 'Confucius'
    },
    {
      text: 'Start where you are. Use what you have. Do what you can.',
      author: 'Arthur Ashe'
    },
    {
      text: 'What you do today can improve all your tomorrows.',
      author: 'Ralph Marston'
    },
    {
      text: 'Do... or do not! There is no try.',
      author: 'Yoda'
    },
    {
      text: 'Life is a dirty game. You gotta play dirty to win.',
      author: 'Harris'
    },
    {
      text: 'Four for you, Glen Coco. You GO, Glen Coco!',
      author: 'Santa Damien'
    }
  ],

  randomQuote: computed(function(){
    let randomInt = Math.floor(Math.random() * (this.get('quotes.length')));
    return this.get('quotes')[randomInt];
  })
});
