'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var plugins = gulp.plugins;

gulp.task('style', ['clean'], function(done) {
  return gulp.src(paths.style + '/**/*.scss')
      .pipe(plugins.sass({outputStyle: 'nested'}).on('error', plugins.sass.logError))
      .pipe(plugins.concat('app.css'))
      .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('style:prod', ['clean'], function(done) {
  return gulp.src(paths.style + '/**/*.scss')
      .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
      .pipe(plugins.concat('app.css'))
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(paths.dist + '/css'));
});
