var gulp = require('gulp');
var gulpif = require('gulp-if');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var _ = require('underscore');

module.exports = function(params) {
  var config = params
  return function () {
      var configRequire = require('../source/'+config.proj+'/config-require.js');
      var configBuild = {
        baseUrl: 'source',
        insertRequire: [config.proj+'/main'],
        name: config.proj+'/main',
        optimize: 'none',
        wrap: true
      };
      var configRequireExt = _(configRequire).extend(configBuild);

      return gulp.src(['source/'+config.proj+'/main.js'])
        .pipe(rjs(configRequireExt).on('error', config.handleError))
        .pipe(gulpif( config.forRelease, ngAnnotate())  )
        .pipe(  gulpif(config.forRelease, uglify().on('error', config.handleError) ) )
        .pipe(gulp.dest(config.buildTarget + '/'+config.proj+'/'));
  }
}
