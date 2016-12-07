'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var plugins = gulp.plugins;

function packageJsDependencies(min) {
  gulp.src([
    (min) ? 'bower_components/jquery/dist/jquery.min.js' :
      'bower_components/jquery/dist/jquery.js',
    (min) ? 'bower_components/angular/angular.min.js' :
      'bower_components/angular/angular.js',
    (min) ? 'bower_components/angular-animate/angular-animate.min.js' :
      'bower_components/angular-animate/angular-animate.js',
    (min) ? 'bower_components/angular-ui-router/release/angular-ui-router.min.js' :
      'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/modernizer/modernizr.js',
    (min) ? 'bower_components/angular-messages/angular-messages.min.js' :
      'bower_components/angular-messages/angular-messages.js',
    (min) ? 'bower_components/angular-aria/angular-aria.min.js' :
      'bower_components/angular-aria/angular-aria.js',
    (min) ? 'bower_components/angular-material/angular-material.min.js' :
      'bower_components/angular-material/angular-material.js',
    (min) ? 'bower_components/sockjs-client/dist/sockjs.min.js' :
      'bower_components/sockjs-client/dist/sockjs.js',
    (min) ? 'bower_components/what-input/what-input.min.js' :
      'bower_components/what-input/what-input.js',
    'bower_components/foundation-sites/dist/js/foundation.core.js',
    (min) ? 'bower_components/foundation-sites/dist/foundation.min.js' :
      'bower_components/foundation-sites/dist/foundation.js',
    (min) ? 'bower_components/angular-ui-layout/ui-layout.min.js' :
      'bower_components/angular-ui-layout/src/ui-layout.js',
    (min) ? 'bower_components/lodash/dist/lodash.min.js' :
      'bower_components/lodash/dist/lodash.js',
    'bower_components/angular-lodash-module/angular-lodash-module.js'
  ])
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.concat('vendor.js'))
  .pipe(plugins.sourcemaps.write('.'))
  .pipe(gulp.dest(paths.dist + '/js'));
}

gulp.task('scripts', ['jscs', 'jshint', 'templates'], function(done) {
  packageJsDependencies(false);
  return gulp.src([paths.app + '/**/*.js', '!' + paths.app + '/**/*-test.js'])
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('app.js'))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('scripts:prod', ['jscs', 'jshint', 'templates'], function(done) {
  packageJsDependencies(true);
  return gulp.src([paths.app + '/**/*.js', '!' + paths.app + '/**/*-test.js'])
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('app.js'))
      .pipe(plugins.uglify())
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist + '/js'));
});
