var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer-core');
var gulpif = require('gulp-if');
var postcss = require('gulp-postcss');
var assets = require('postcss-assets');

module.exports =  function(params) {
  var config = params
  return function () {
      var processors = [
        assets({
          basePath: 'source/'+config.proj+'/_global-resources/',
          loadPaths: ['assets/fonts/', 'assets/images/']
        }),
        autoprefixer
      ];

      return gulp.src(['source/'+config.proj+'/_global-resources/sass/*.scss', '!source/'+config.proj+'/_global-resources/sass/_*.scss'])
        .pipe(gulpif( config.forRelease,  sass({
          outputStyle: 'compressed'
        }).on('error', config.handleError)) )
        .pipe(gulpif( !config.forRelease, sass()) )
        .pipe(postcss(processors).on('error', config.handleError))
        .pipe(gulp.dest('source/'+config.proj+'/_global-resources/assets/css'));
  }
}
