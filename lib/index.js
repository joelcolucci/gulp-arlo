'use strict';


const gulpUtil = require('gulp-util');
const through = require('through2');
const path = require('path');


const PLUGIN_NAME = 'gulp-arlo';


function mapRoutes(routingMap) {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

		if (file.isStream()) {
			callback(new gulpUtil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return;
		}

    let fileName = path.basename(file.path);
    let directoryName = path.dirname(file.path);

    let route;
    try {
      route = routingMap[fileName];
    } catch (error) {
      callback(new gulpUtil.PluginError(PLUGIN_NAME, 'No route found for file'));
    }

    // TODO: Review if we should be converting all to index.html
    file.path = path.join(directoryName, route, 'index.html');

    this.push(file);

    callback();
  });
};


module.exports.mapRoutes = mapRoutes;
