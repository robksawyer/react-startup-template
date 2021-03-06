/**
 * clean-pre.js
 * Handles pre-cleaning the distribution folder.
 */
const del = require('del');
const path = require('path');
const pkgpath = require('packpath');
const pkg = require(path.resolve(pkgpath.self(), 'package.json'));
const dirs = pkg.directories;

module.exports = () => {
  return del(
    path.resolve(pkgpath.self(), dirs.dist),
    {
      force: true
    }
  )
};
