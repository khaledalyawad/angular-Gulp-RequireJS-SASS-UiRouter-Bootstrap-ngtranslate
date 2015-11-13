var gulp = require('gulp');
var es = require('event-stream');


module.exports = function(params) {
  var config = params
  return function () {
      return es.concat(
        // copy vendor files
        gulp.src(['source/'+config.proj+'/_global-resources/vendor/requirejs/require.js'])
          .pipe(gulp.dest(config.buildTarget + '/'+config.proj+'/vendor/requirejs')),
        // copy locale files
        gulp.src(['source/'+config.proj+'/_global-resources/vendor/angular-i18n/*.js'])
          .pipe(gulp.dest(config.buildTarget + '/'+config.proj+'/vendor/angular-i18n/'))
      );
  }
}
