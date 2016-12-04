'use strict';

angular.module('app.services')
  .factory('ConstantsService', ConstantsService);

ConstantsService.$inject = ['$window', '$mdToast'];
function ConstantsService($window, $mdToast) {

  var baseUrl = 'http://fa16-cs498rk-088.cs.illinois.edu:3000/api';
  if (!$window.sessionStorage.baseurl) {
    $window.sessionStorage.baseurl = baseUrl;
  }

  var getUrl = function() {
    return $window.sessionStorage.baseurl;
  };

  var setUrl = function(url) {
    $window.sessionStorage.baseurl = url;
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

  return {
    'setUrl': setUrl,
    'getUrl': getUrl,
    'toast': toast
  };
}
