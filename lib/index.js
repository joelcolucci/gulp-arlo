'use strict';


const gulpUtil = require('gulp-util');
const through = require('through');


module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    // TODO: Write your code!
    callback(null, doSomethingWithTheFile(file));
  });
};
