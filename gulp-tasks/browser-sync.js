var gulp = require('gulp');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');

module.exports =  function(params) {
  var config = params
  return function () {
        browserSync({
          open: gutil.env.open === 'true',
          port: 9955,
          server: {
            baseDir: config.buildTarget+'/'+config.proj
          }
        });
  }
}
