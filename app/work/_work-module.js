'use strict';

angular.module('app.work', [])
  .component('workView', {
    controllerAs: 'files',
    bindings: {},
    controller: FilesViewController,
    templateUrl: 'work/work.html'
  })
  .directive('highlight', function($interpolate, $window) {
    return {
      restrict: 'EA',
      scope: true,
      compile: function(tElem, tAttrs) {
        var interpolateFn = $interpolate(tElem.html(), true);
        tElem.html(''); // disable automatic intepolation bindings
                    
        return function(scope, elem, attrs) {
          scope.$watch(interpolateFn, function(value) {
            elem.html(hljs.highlight('sql',value).value);
          });
        };
      }
    };
  });

FilesViewController.$inject = ['RestService', 'ConstantsService', '$scope', '_'];
function FilesViewController(RestService, ConstantsService, $scope, _) {
  var vm = this;

  var sock = new SockJS(ConstantsService.getUrl() + '/web-socket');
  sock.onopen = function() {
    console.log('open');
  };
  sock.onmessage = function(e) {
    var data = JSON.parse(e.data);
    if (data.type === 'file') {
      vm.list.push(data.data);
      console.log(data.data);
      //loadMessages();
      $scope.$apply();
    }
  };
  sock.onclose = function() {
    console.log('close');
  };

  loadFiles();

  function loadFiles() {
    RestService.getFiles()
    .then(function(resp) {
      console.log(resp.data.data);
      vm.list = resp.data.data;
    });
  }

  vm.post = function() {
    if (vm.fileName !== '') {
      var content = {'content': '', 'name': vm.fileName};
      RestService.postFiles(content)
        .then(function(resp) {
          vm.fileName = ''; // clear input
          sock.send(JSON.stringify({'type': 'file', 'data': resp.data.data}));
        });
    } else {
      ConstantsService.toast('Please enter a file name!', 'bottom center');
    }
  };

  vm.delete = function(id) {
    console.log(id);
    RestService.deleteFilesById(id)
      .then(function(resp) {
        _.remove(vm.list, {'_id': id});
      });
  };

  vm.changeView = function(file) {
    $scope.subSource = file.content;
    vm.currentFile = file;
  };

  vm.save = function() {
    console.log(vm.currentFile);
    if (!vm.currentFile) {
      ConstantsService.toast('Not currently viewing a file!', 'top center');
    } else {
      RestService.putFilesById(vm.currentFile._id, {'name': vm.currentFile.name, 'content': $scope.subSource})
        .then(function(resp) {
          vm.currentFile = resp.data.data;
          _.remove(vm.list, {'_id': vm.currentFile._id});
          vm.list.push(vm.currentFile);
          ConstantsService.toast('Save Success!', 'top center');
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };

}
