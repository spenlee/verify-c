'use strict';

angular.module('app.services')
  .factory('RestService', RestService);

RestService.$inject = ['$http', 'ConstantsService'];
function RestService($http, ConstantsService) {

  var getUsers = function(config) {
    return $http.get(ConstantsService.getUrl() + '/users', config);
  };
  var postUsers = function(data) {
    return $http.post(ConstantsService.getUrl() + '/users', data);
  };
  var getUsersById = function(id) {
    return $http.get(ConstantsService.getUrl() + '/users/' + id);
  };
  var putUsersById = function(id, data) {
    return $http.put(ConstantsService.getUrl() + '/users/' + id, data);
  };
  var deleteUsersById = function(id) {
    return $http.delete(ConstantsService.getUrl() + '/users/' + id);
  };
  var postSignUp = function(user) {
    return $http.post(ConstantsService.getUrl() + '/sign-up', user);
  };
  var postLogin = function(user) {
    return $http.post(ConstantsService.getUrl() + '/login', user);
  };
  var getLogout = function() {
    return $http.get(ConstantsService.getUrl() + '/logout');
  };

  return {
    'getUsers': getUsers,
    'postUsers': postUsers,
    'getUsersById': getUsersById,
    'putUsersById': putUsersById,
    'deleteUsersById': deleteUsersById,
    'postSignUp': postSignUp,
    'postLogin': postLogin,
    'getLogout': getLogout
  };
}
