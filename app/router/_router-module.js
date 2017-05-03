'use strict';

angular.module('app.router', ['ui.router'])
.config(Config);

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login-view></login-view>',
      data: {
        'requireLogin': false
      }
    })
    .state('sign-up', {
      url: '/sign-up',
      template: '<sign-up-view></sign-up-view>',
      data: {
        'requireLogin': false
      }
    })
    .state('app', { // apply login to all children
      abstract: true,
      template: '<ui-view></ui-view>', // necessary for abstract
      data: {
        'requireLogin': true
      }
    })
    .state('app.work', {
      url: '/',
      template: '<work-view></work-view>'
    })
    .state('app.settings', {
      url: '/settings',
      template: '<settings-view></settings-view>'
    });
}
