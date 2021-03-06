var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var Promise = require('bluebird');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

var readListOfUrls = function(callback) {
  fs.readFile(paths.list, 'utf8', function(err, data) {
    callback(data.split('\n'));
  });
};

var readListOfUrlsAsync = Promise.promisify(readListOfUrls);

var isUrlInList = function(url, callback) {
  fs.readFile(paths.list, 'utf8', function(err, data) {
    var urlArray = data.split('\n');
    callback(urlArray.indexOf(url) > -1);
  });
};

var isUrlInListAsync = Promise.promisify(isUrlInList);

var addUrlToList = function(url, callback) {
  fs.appendFile(paths.list, url, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    callback();
  });
};

var addUrlToListAsync = Promise.promisify(addUrlToList);

var isUrlArchived = function(url, callback) {
  var query = paths.archivedSites + '/' + url;
  fs.access(query, fs.F_OK, function(err) {
    callback(!err);
  });
};

var isUrlArchivedAsync = Promise.promisify(isUrlArchived);

var downloadUrls = function(urlArray) {
  urlArray.forEach(function(url) {
    isUrlArchived(url, function(exists) {
      if (!exists) {
        fs.appendFile(paths.archivedSites + '/' + url);
      }
    });
  });
};

var downloadUrlsAsync = Promise.promisify(downloadUrls);

exports.paths = paths;

exports.readListOfUrls = readListOfUrls;
exports.isUrlInList = isUrlInList;
exports.addUrlToList = addUrlToList;
exports.isUrlArchived = isUrlArchived;
exports.downloadUrls = downloadUrls;

exports.readListOfUrlsAsync = readListOfUrlsAsync;
exports.isUrlInListAsync = isUrlInListAsync;
exports.addUrlToListAsync = addUrlToListAsync;
exports.isUrlArchivedAsync = isUrlArchivedAsync;
exports.downloadUrlsAsync = downloadUrlsAsync;