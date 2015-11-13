var gulp = require('gulp');
var es = require('event-stream');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

module.exports = function(params) {
  var config = params
  return function () {
      return es.concat(
        gulp.src(['source/'+config.proj+'/**/*.js', '!source/'+config.proj+'/**/*.r.js', '!source/'+config.proj+'/*.js' , '!source/'+config.proj+'/_global-resources/vendor/**/*.js' ])
          .pipe(gulp.dest(config.buildTarget + '/'+config.proj+'/')),
        gulp.src(['source/'+config.proj+'/config-require.js'])
          .pipe(gulpif(config.forRelease, uglify().on('error', config.handleError) ) )
          .pipe(gulp.dest(config.buildTarget + '/' + config.proj))
      );
  }
};
