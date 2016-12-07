'use strict';

angular.module('app.work', [])
  .component('workView', {
    controllerAs: 'files',
    bindings: {},
    controller: FilesViewController,
    templateUrl: 'work/work.html'
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
      $scope.$apply();
    } else if (data.type === 'remove-file') {
      _.remove(vm.list, {'_id': data.data});
      if (vm.currentFile._id === data.data) {
      	delete vm.currentFile;
      	$scope.subSource = '';
      }
      $scope.$apply();
    } else if (data.type === 'update-file') {
      _.remove(vm.list, {'_id': data.data._id});
      vm.list.push(data.data);
      if (vm.currentFile._id === data.data._id) {
      	vm.currentFile = data.data;
      	$scope.subSource = data.data.content;
      }
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
      	sock.send(JSON.stringify({'type': 'remove-file', 'data': id}));
      });
  };

  vm.changeView = function(file) {
    $scope.subSource = file.content;
    vm.currentFile = file;
  };

  vm.save = function() {
  	updateContent();
  };

  function updateContent() {
  	if (!vm.currentFile) {
      ConstantsService.toast('Not currently viewing a file!', 'top center');
    } else {
      RestService.putFilesById(vm.currentFile._id, {'name': vm.currentFile.name, 'content': $scope.subSource})
        .then(function(resp) {
          vm.currentFile = resp.data.data;
          sock.send(JSON.stringify({'type': 'update-file', 'data': vm.currentFile}));
          ConstantsService.toast('Save Success!', 'top center');
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }

  vm.opts = {
    'lineWrapping': true,
    'lineNumbers': true,
    'mode': 'python',
    'theme': 'monokai'
  };

  // $scope.$watch('subSource', function(oldContent, newContent) {
  // 	console.log("change");
  //   updateContent();
  // });

}
