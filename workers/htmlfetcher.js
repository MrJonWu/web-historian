// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var cron = require('cron');

// Cron script
// * * * * * /usr/local/bin/node /Users/student/Desktop/hrsf50-web-historian/workers/htmlfetcher.js

archive.readListOfUrls(function(urlArray) {
  // call downloadUrls to create empty web file
  archive.downloadUrls(urlArray);
  urlArray.forEach(function(url) {
    archive.isUrlArchived(url, function(exists) {
      if (!exists) {
        // use request to create html file -> writeFile
        request('http://' + url, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            fs.writeFile(archive.paths.archivedSites + '/' + url, body);
          }
        });
      }
    });
  });
});