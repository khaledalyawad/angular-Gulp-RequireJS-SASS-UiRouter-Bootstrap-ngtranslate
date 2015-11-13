var gulp = require('gulp');
var es = require('event-stream');


module.exports =  function(params) {
  var config = params
  return function () {
      return es.concat(
        gulp.src(['source/'+config.proj+'/_global-resources/assets/**/*'])
          .pipe(gulp.dest(config.buildTarget+'/'+config.proj+'/assets')),
        gulp.src(['source/'+config.proj+'/_global-resources/vendor/bootstrap/dist/fonts/**/*.{ttf,woff,woff2,eof,svg}'])
          .pipe(gulp.dest(config.buildTarget+'/'+config.proj+'/assets/fonts')),
        gulp.src(['source/'+config.proj+'/_global-resources/vendor/bootstrap/dist/css/bootstrap.css'])
          .pipe(gulp.dest(config.buildTarget+'/'+config.proj+'/assets/css/'))
      )
  }
}
