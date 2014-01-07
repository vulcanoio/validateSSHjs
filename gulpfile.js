// Generated by CoffeeScript 1.6.2
(function() {
  var coffee, concat, gulp, gutil, mocha, uglify, wrap;

  gulp = require('gulp');

  coffee = require('gulp-coffee');

  concat = require('gulp-concat');

  gutil = require('gulp-util');

  mocha = require('gulp-mocha');

  uglify = require('gulp-uglify');

  wrap = require('gulp-wrap-umd');

  gulp.task('caffeinate', function() {
    gulp.src('src/*.coffee').pipe(coffee({
      bare: true
    })).on('error', gutil.log).pipe(gulp.dest('./tmp/build'));
    return gulp.src('test/*.coffee').pipe(coffee()).on('error', gutil.log).pipe(gulp.dest('./tmp'));
  });

  gulp.task('build', ['caffeinate'], function() {
    return gulp.src(['lib/*.js', 'tmp/build/*.js']).pipe(concat('main.js')).pipe(wrap({
      exports: 'validate'
    })).pipe(uglify()).pipe(gulp.dest('./dist/'));
  });

  gulp.task('test', ['build'], function() {
    return gulp.src('tmp/*.js').pipe(mocha());
  });

  gulp.task('default', function() {
    gulp.run('build');
    return gulp.watch(['lib/base64-binary.js', 'src/validateSSH.coffee'], function(event) {
      return gulp.run('build');
    });
  });

}).call(this);
