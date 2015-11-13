var gulp = require('gulp');
var prompt = require('gulp-prompt');
var replace = require('gulp-replace');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');

var taskConfigObj ={};
var projectname = '';
var angularappname = '';
var mainstateName = '';
var mainControllerName = '';
var statesCount = '';
var statesName = '';


var handleError =  function (err) {
  console.log(err.name, ' in ', err.plugin, ': ', err.message);
  console.log(err.getStack());
  process.exit(1);
};

// gulp
gulp.task('default', function () {
  gulp.src('source')
  .pipe(prompt.prompt([{
    type: 'input',
    name: 'first',
    message: 'Which project would you want to run?'
  }],
  function(res){
    console.log("You chose " + res.first);
    projectname = res.first;
    gulp.start('run-project');
  }
));
});

//gulp release
gulp.task('release', function () {
  //still need work this is just a POC
  gulp.src('source')
  .pipe(prompt.prompt([{
    type: 'input',
    name: 'first',
    message: 'Which project you want to release? type ecm'
  }],
  function(res){
    //value is in res.first and res.second
    console.log("You chose " + res.first);
    projectname = res.first;
    taskConfigObj = {
      'buildTarget' : 'release',
      'forRelease'  : true,
      'proj' : projectname,
      'handleError' : handleError
    };
    require('gulp-task-loader-with-params')('gulp-tasks' ,  taskConfigObj);
    gulp.run('releaseStart');
  }
));
});

gulp.task('serve', ['requireJsTask' , 'copyAssets' , 'sass', 'copyjsDev', 'copyjsVendor', 'copyHtml','copyJson'], function () {

  gulp.run('browser-sync');

  gulp.watch([
    'source/'+taskConfigObj.proj+'/_global-resources/sass/**/*.scss'
    ],
    ['sass']);

    gulp.watch([
      'source/'+taskConfigObj.proj+'/_global-resources/assets/**/*'
    ],['copyAssets','bs-reload']);


    gulp.watch([
      'source/'+taskConfigObj.proj+'/**/*.json' ,
      '!source/'+taskConfigObj.proj+'/_global-resources/vendor/**/*.json'
    ],['copyJson', 'bs-reload']);

    gulp.watch([
      'source/'+taskConfigObj.proj+'/**/*.js',
      '!source/'+taskConfigObj.proj+'/**/*.r.js',
      '!source/'+taskConfigObj.proj+'/*.js',
      '!source/'+taskConfigObj.proj+'/_global-resources/vendor/**/*.js'
    ],['copyjsDev', 'bs-reload']);

    gulp.watch([
      'source/'+taskConfigObj.proj+'/config-require.js'
    ],['copyConfig','requireJsTask', 'bs-reload']);

    gulp.watch([
      'source/'+taskConfigObj.proj+'/*.js' ,
      'source/'+taskConfigObj.proj+'/**/*.r.js'
    ],['requireJsTask', 'bs-reload']);

    gulp.watch([
      'source/index.html',
      'source/'+taskConfigObj.proj+'/**/*.html',
      '!source/'+taskConfigObj.proj+'/_global-resources/vendor/**/*.html'
    ],['copyHtml', 'bs-reload']);

  });

  gulp.task('releaseStart', ['copyAssets' , 'sass', 'requireJsTask', 'copyjsDev', 'copyjsVendor', 'copyHtml','copyJson'], function () {
    //releasing here
  });



gulp.task('run-project', function () {
  taskConfigObj = {
    'buildTarget' : 'build',
    'forRelease'  : false,
    'proj' : projectname,
    'handleError' : handleError
  };
  require('gulp-task-loader-with-params')('gulp-tasks' ,  taskConfigObj);
  gulp.run('serve');
});
