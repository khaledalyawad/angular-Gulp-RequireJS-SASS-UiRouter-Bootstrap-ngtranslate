var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports =  function(params) {
  var config = params
  return function () {

      browserSync.reload();
  }
}
