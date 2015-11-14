var gulp = require('gulp');
var es = require('event-stream');

module.exports =  function(params) {
  var config = params
  return function () {
      return es.concat(
        // copy template files
        gulp.src(['source/'+config.proj+'/**/*.html' , '!source/'+config.proj+'/_global-resources/vendor/**/*.html'])
          .pipe(gulp.dest(config.buildTarget + '/'+config.proj))
      )
  }
}
