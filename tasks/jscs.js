'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var plugins = gulp.plugins;

function runJscs(paths, done) {
  var tasks = [];
  paths.forEach(function(path) {
    gulp.task(path, function() {
      return gulp.src(path + '/**/*.js')
        .pipe(plugins.jscs({
          configPath: '.jscsrc'
        }));
    });
  });
  return plugins.sequence(paths, done);
}

gulp.task('jscs', [], function(done) {
  return runJscs([paths.app, paths.e2e, paths.tasks], done);
});
gulp.task('jscs:app', [], function(done) {
  return runJscs([paths.app], done);
});
gulp.task('jscs:e2e', [], function(done) {
  return runJscs([paths.e2e], done);
});
gulp.task('jscs:tasks', [], function(done) {
  return runJscs([paths.tasks], done);
});
