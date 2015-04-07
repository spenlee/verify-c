'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var plugins = gulp.plugins;

gulp.task('scripts', ['jscs', 'jshint'], function(done) {
  return gulp.src(paths.app + '/**/*.js')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('app.js'))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('scripts:prod', ['jscs', 'jshint'], function(done) {
  return gulp.src(paths.app + '/**/*.js')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('app.js'))
      .pipe(plugins.uglify())
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist + '/js'));
});
