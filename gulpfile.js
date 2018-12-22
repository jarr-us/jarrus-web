/* eslint-disable */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const KarmaServer = require('karma').Server;

gulp.task('validate', ['lint','test'], (done) => {
  done();
});

gulp.task('test', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function(exitCode) {
    exitCode ? process.exit(exitCode) : done();
  }).start();
});

gulp.task('tdd', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, function(exitCode) {
    exitCode ? process.exit(exitCode) : done();
  }).start();
});
gulp.task('linter', function() {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['lint']);
});
gulp.task('lint', () => gulp.src(['src/**/*.js', 'test/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  );
