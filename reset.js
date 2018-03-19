/**
 * Handles cleaning the public (distribution) folder.
 * @see https://stackoverflow.com/questions/34387114/how-to-remove-everything-with-rimraf-except-few-exceptions
 *
 * @see globby: User-friendly glob matching / https://github.com/sindresorhus/globby
 * @see rimraf: A `rm -rf` util for nodejs / https://github.com/isaacs/rimraf
 */
var globby = require('globby');
var rimraf = require('rimraf');

console.log('Resetting and emptying the distribution folder...');
globby(['./public/*', '!./public/.gitkeep', '!./public/.git'])
  .then(function then(paths) {
    paths.map(function map(item) {
      rimraf.sync(item);
    });
  });
