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
  RestService.getMessages()
    .then(function(resp) {
      vm.messages = resp.data.data;
    });

  // vm.user = ConstantsService.getCurrentUser();

  vm.post = function() {
    RestService.postMessages({'content': vm.input, 'email': ConstantsService.getCurrentUser().email})
      .then(function(resp) {
        vm.input = ''; // clear input
      });
  };

  //var sock = new SockJS(ConstantsService.getUrl());
  var sock = new SockJS(ConstantsService.getUrl() + '/web-socket');
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
