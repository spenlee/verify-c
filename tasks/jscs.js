'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var plugins = gulp.plugins;

function runJscs(paths) {
  var tasks = [];
  paths.forEach(function(path) {
    var task = gulp.src(path)
      .pipe(plugins.jscs());
    tasks.push(task);
  });
  return plugins.sequence(tasks);
}

gulp.task('jscs', [], function(done) {
  runJscs([paths.app, paths.e2e, paths.tasks]);
});
