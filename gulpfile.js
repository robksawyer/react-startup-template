const gulp = require('gulp');
const sequence = require('run-sequence');


// define build tasks
gulp.task('clean:pre', require('./build/clean-pre'));
gulp.task('clean:post', require('./build/clean-post'));
gulp.task('webpack:build', require('./build/webpack-build'));
gulp.task('webpack:production', require('./build/webpack-production'));
gulp.task('webpack:server', require('./build/webpack-watch'));
gulp.task('webpack:watch:integration', require('./build/webpack-watch-integration'));


// define workflows
gulp.task('build', done => {
  sequence('clean:pre', 'webpack:build', 'clean:post', done);
});

gulp.task('production', done => {
  sequence('clean:pre', 'webpack:production', 'clean:post', done);
});

gulp.task('watch', done => {
  sequence('clean:pre', 'webpack:watch:integration', done);
});

gulp.task('server', done => {
  sequence('clean:pre', 'webpack:server', done);
});

// Task stubs to support LP
gulp.task('test', done => {
  console.log(`The test task is empty in ${__filename}`);
  done();
});

gulp.task('setup', done => {
  console.log(`The setup task is empty in ${__filename}`);
  done();
});


gulp.task('remove', done => {
  console.log(`The remove task is empty in ${__filename}`);
  done();
});


// scaffolding tasks
// tasks here require cli arguments

// gulp scaffold:tag --name [name]
gulp.task('scaffold:tag', require('./build/scaffold-tag'));

// gulp scaffold:component --name [name]
gulp.task('scaffold:component', require('./build/scaffold-component'));

// gulp scaffold:mobx-component --name [name]
gulp.task('scaffold:mobx-component', require('./build/scaffold-mobx-component'));

// gulp scaffold:page-component --name [name]
gulp.task('scaffold:page-component', require('./build/scaffold-page-component'));

// gulp scaffold:form-component --name [name] --route [route-to-the-form]
gulp.task('scaffold:form-component', require('./build/scaffold-form-component'));
