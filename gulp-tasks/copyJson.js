var gulp = require('gulp');
var es = require('event-stream');

module.exports =  function(params) {
  var config = params
  return function () {
      return es.concat(
        // copy json
        gulp.src(['source/'+config.proj+'/**/*.json' , '!source/'+config.proj+'/_global-resources/vendor/**/*.json' ])
          .pipe(gulp.dest(config.buildTarget + '/'+config.proj))
      );
  }
}
