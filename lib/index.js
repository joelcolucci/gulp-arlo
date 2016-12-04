'use strict';


const gulpUtil = require('gulp-util');
const through = require('through2');
const path = require('path');


function schema(routingMap) {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

		if (file.isStream()) {
			callback(new gulpUtil.PluginError('gulp-arlo', 'Streaming not supported'));
			return;
		}

    let fileName = path.basename(file.path);
    let directoryName = path.dirname(file.path);

    let route;
    try {
      route = routingMap[fileName];
    } catch (error) {
      callback(new gulpUtil.PluginError('gulp-arlo', error, 'No route found for file'));
    }

    // TODO: Review if we should be converting all to index.html
    file.path = path.join(directoryName, route, 'index.html');

    this.push(file);

    callback();
  });
};


module.exports.schema = schema;


// Question -> What does nunjucks.compile() return?
// Question -> How to access argument passed to plugin?

// Looks like we may HAVE to return a file. This means we can build up one big JSON object but rather transform each file to json?
// Maybe it's even easier than that. Maybe it's just a matter of chaning the file.path and passing on to gulp.dest!
// gulp.dest takes care of mkdirp
