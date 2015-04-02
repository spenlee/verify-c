'use strict';

var gulp = require('gulp');

gulp.paths = {
  app: 'app',
  dist: 'dist',
  e2e: 'e2e',
  style: 'style',
  tasks: 'tasks'
};

gulp.plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

require('require-dir')('./' + gulp.paths.tasks);
