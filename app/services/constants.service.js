'use strict';

angular.module('app.services')
  .factory('ConstantsService', ConstantsService);

ConstantsService.$inject = ['$window', '$mdToast', '$location'];
function ConstantsService($window, $mdToast, $location) {

  var baseUrl = 'http://162.243.78.205:3000/api';
  if (!$window.sessionStorage.baseurl) {
    $window.sessionStorage.baseurl = baseUrl;
  }

  var getUrl = function() {
    return $window.sessionStorage.baseurl;
  };

  var setUrl = function(url) {
    $window.sessionStorage.baseurl = url;
  };

  var getCurrentUser = function() {
    return JSON.parse($window.sessionStorage.getItem('currentUser'));
  };

  var setCurrentUser = function(user) {
    $window.sessionStorage.setItem('currentUser', JSON.stringify(user));
  };

  var removeCurrentUser = function() {
    $window.sessionStorage.removeItem('currentUser');
  };

  var toast = function(message, position) {
    // https://material.angularjs.org/latest/demo/toast -- demo
    var toast = $mdToast.simple()
      .textContent(message) // toast message
      .action('OK')
      .highlightAction(true)
      .position(position); // toast position

    $mdToast.show(toast).then(function(response) { // hide on click
      if (response === 'ok') {
        $mdToast.hide();
      }
    });
  };

  var displayError = function(err, position) {
    if (err && err.data) {
      toast(err.data.message, position);
    }
  };

  var redirectUrl = function(path) {
    $location.path(path);
  };

  var reloadUrlToPath = function(path) {
    $window.location.href = path;
  };

  return {
    'setUrl': setUrl,
    'getUrl': getUrl,
    'setCurrentUser': setCurrentUser,
    'getCurrentUser': getCurrentUser,
    'removeCurrentUser': removeCurrentUser,
    'toast': toast,
    'displayError': displayError,
    'redirectUrl': redirectUrl,
    'reloadUrlToPath': reloadUrlToPath
  };
}
