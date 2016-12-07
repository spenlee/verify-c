'use strict';

angular.module('app.work', [])
  .component('messagesView', {
    controllerAs: 'messages',
    bindings: {},
    controller: MessagesViewController,
    templateUrl: 'work/messagesView.html'
  });

MessagesViewController.$inject = ['RestService', 'ConstantsService'];
function MessagesViewController(RestService, ConstantsService) {
  var vm = this;

  //var sock = new SockJS(ConstantsService.getUrl());
  var sock = new SockJS(ConstantsService.getUrl() + '/messages');
  sock.onopen = function() {
    console.log('open');
  };
  sock.onmessage = function(e) {
    console.log(e.data);
  };
  sock.onclose = function() {
    console.log('close');
  };

  vm.send = function() {
    sock.send('hello');
  };
}
