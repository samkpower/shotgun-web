import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('login');
  this.route('logout');

  this.route('day', { path: 'day/:date' });

  // playground routes

  if (config.environment === 'development') {
    this.route('users');
    this.route('to-dos');
    this.route('playground');
  }
});

export default Router;
