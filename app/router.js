import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('users');
  this.route('to-dos');

  this.route('home', { path: '/' });
  this.route('login', { path: '/login' });
  this.route('logout', { path: '/logout' });

  if (config.environment === 'development') {
    this.route('playground', { path: '/playground' });
  }
});

export default Router;
