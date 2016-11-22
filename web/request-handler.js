var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helper = require('./http-helpers');
var url = require('url');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};

var actions = {
  'GET': function(req, res) {
    if (req.url === '/') {
      helper.serveAssets(res, archive.paths.siteAssets + '/index.html');      
    } else {
      helper.serveAssets(res, archive.paths.archivedSites + req.url);
    }

  },

  'POST': function(req, res) {
    helper.collectData(req, function(url) {
      archive.isUrlInList(url, function(inList) {
        archive.isUrlArchived(url, function(inArchive) {
          //Check sites.txt if it's on the list
          if ( !inList && (url.indexOf('=') === -1 )) {
            fs.appendFile(archive.paths.list, url + '\n', 'utf8', function(err) {
              if (err) {
                return console.log(err);
              }
            });
            helper.serveAssets(res, archive.paths.siteAssets + '/loading.html', 302);
            //else if it is on the list but not in the archive
          } else if (inList && !inArchive) {
            //show the loading html page
            helper.serveAssets(res, archive.paths.siteAssets + '/loading.html', 302);
            // Else if it is in the archive 
          } else if (inList && inArchive) {
            // Load the website that is in the archive
            helper.serveAssets(res, archive.paths.archivedSites + '/' + url, 302);
          }
        });
      });
    });
  },

  'OPTIONS': function(req, res) {
    helper.serveAssets(res, null);
  }
};

exports.handleRequest = helper.makeActionHandler(actions);