'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var plugins = gulp.plugins;

gulp.task('scripts', ['clean', 'jscs', 'jshint'], function(done) {
  return gulp.src(paths.app + '/**/*.js')
      .pipe(plugins.concat('app.js'))
      .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('scripts:prod', ['clean', 'jscs', 'jshint'], function(done) {
  return gulp.src(paths.app + '/**/*.js')
      .pipe(plugins.concat('app.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(paths.dist + '/js'));
});
