'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var plugins = gulp.plugins;

gulp.task('style', [], function(done) {
  return gulp.src(paths.style + '/**/*.scss')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({outputStyle: 'nested'}).on('error', plugins.sass.logError))
      .pipe(plugins.concat('app.css'))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('style:prod', [], function(done) {
  return gulp.src(paths.style + '/**/*.scss')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
      .pipe(plugins.concat('app.css'))
      .pipe(plugins.minifyCss())
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist + '/css'));
});
