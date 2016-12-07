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

  var getMessages = function(config) {
    return $http.get(ConstantsService.getUrl() + '/messages', config);
  };
  var postMessages = function(data) {
    return $http.post(ConstantsService.getUrl() + '/messages', data);
  };
  var getMessagesById = function(id) {
    return $http.get(ConstantsService.getUrl() + '/messages/' + id);
  };
  // var putMessagesById = function(id, data) {
  //   return $http.put(ConstantsService.getUrl() + '/messages/' + id, data);
  // };
  var deleteMessagesById = function(id) {
    return $http.delete(ConstantsService.getUrl() + '/messages/' + id);
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

  var getFiles = function(config) {
    return $http.get(ConstantsService.getUrl() + '/files', config);
  };
  var postFiles = function(data) {
    return $http.post(ConstantsService.getUrl() + '/files', data);
  };
  var getFilesById = function(id) {
    return $http.get(ConstantsService.getUrl() + '/files/' + id);
  };
  // var putFilesById = function(id, data) {
  //   return $http.put(ConstantsService.getUrl() + '/files/' + id, data);
  // };
  var deleteFilesById = function(id) {
    return $http.delete(ConstantsService.getUrl() + '/files/' + id);
  };

  return {
    'getUsers': getUsers,
    'postUsers': postUsers,
    'getUsersById': getUsersById,
    'putUsersById': putUsersById,
    'deleteUsersById': deleteUsersById,
    'postSignUp': postSignUp,
    'postLogin': postLogin,
    'getLogout': getLogout,
    'getMessages': getMessages,
    'postMessages': postMessages,
    'getMessagesById': getMessagesById,
    // 'putMessagesById': putMessagesById,
    'deleteMessagesById': deleteMessagesById,
    'getFiles': getFiles,
    'postFiles': postFiles,
    'getFilesById': getFilesById,
    // 'putFilesById': putFilesById,
    'deleteFilesById': deleteFilesById
  };
}
