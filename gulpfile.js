'use strict';

var gulp = require('gulp');

gulp.paths = {
  app: 'app',
  e2e: 'e2e',
  style: 'style',
  tasks: 'tasks'
};

require('require-dir')('./' + gulp.paths.tasks);
