const path = require('path');
const pkgpath = require('packpath');
const minimist = require('minimist');
const scaffoldComponent = require('./scaffolding/scaffold-form-component');

const pkg = require(path.resolve(pkgpath.self(), 'package.json'));
const dirs = pkg.directories;

module.exports = () => {
  const argv = minimist(process.argv.slice(2));
  return scaffoldComponent({
    name: argv.name,
    route: argv.route || argv.name.toLowerCase().replace(/form/gi, ''),
    src: path.resolve(__dirname, 'scaffolding/form-component'),
    dest: path.resolve(pkgpath.self(), dirs.src, 'components', 'forms', argv.name)
  });
}
