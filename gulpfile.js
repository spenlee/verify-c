'use strict';

var gulp = require('gulp');

gulp.paths = {
  app: 'app',
  dist: 'dist',
  e2e: 'e2e',
  static: 'static',
  style: 'style',
  tasks: 'tasks'
};

gulp.plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

require('require-dir')('./' + gulp.paths.tasks);

gulp.task('default', function(done) {
  gulp.start('build');
});

gulp.task('build', ['clean'], function() {
  gulp.start('static');
  gulp.start('scripts');
  gulp.start('style');
});

gulp.task('build:prod', ['clean'], function() {
  gulp.start('static');
  gulp.start('scripts:prod');
  gulp.start('style:prod');
});