var gulp = require('gulp');
var es = require('event-stream');

module.exports =  function(params) {
  var config = params
  return function () {
      return es.concat(
        gulp.src(['source/'+params.proj+'/config-require.js'])
          .pipe(gulp.dest(params.buildTarget + '/'+params.proj+'/'))
      );
  }
}
