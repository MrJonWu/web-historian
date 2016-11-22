var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helper = require('./http-helpers');
var url = require('url');

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};

var actions = {
  'GET': function(req, res) {
    if (req.url === '/') {
      helper.serveAssets(res, archive.paths.siteAssets + '/index.html');      
    } else {
      helper.serveAssets(res, archive.paths.archivedSites + '/' + req.url);
    }

  },

  'POST': function(req, res) {
    helper.collectData(req, function() {
    // Check if url is in list
      // If so add to list
      // Check if url is archived
        // If so serveAssets on archived html
        // If not serveAssets on loading.html
      // serveAssets again
    });
  },

  'OPTIONS': function(req, res) {
    helper.serveAssets(res, null);
  }
};

exports.handleRequest = helper.makeActionHandler(actions);