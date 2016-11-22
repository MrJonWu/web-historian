var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, statusCode, callback) {
  var statusCode = statusCode || 200;
  var index;
  fs.readFile(asset, function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(404, headers);
      res.end();
    } else {
      res.writeHead(statusCode, headers);
      res.end(data);
    }
  });
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

exports.collectData = function(res, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    callback(JSON.parse(data));
  });
};

// As you progress, keep thinking about what helper functions you can put here!
exports.makeActionHandler = function(actionMap) {
  return function(req, res) {
    var action = actionMap[req.method];
    if (action) {
      action(req, res);
    } else {
      exports.serveAssets(res, '', 404);
    }
  };
};

exports.headers = headers;