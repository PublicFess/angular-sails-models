var gulp = require('gulp');

var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , watch = require('gulp-watch')
  , batch = require('gulp-batch')
  , runSequence = require('run-sequence')
  , server = require('browser-sync').create()
  , mocha = require('gulp-mocha')
  , errorHandler = function (err) {
    console.log(err);
    this.emit('end')
  };

gulp.task('html', function() {
  gulp.src(['./client/src/index.html'])
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('html:watch', function() {
  gulp.start('html');
  watch(['client/src/*.html'], batch(function (events, done) {
    gulp.start('html', done);
  }));
});

gulp.task('js', function() {
  gulp.src(['./client/src/app.js'])
    .pipe(browserify())
    .on('error', errorHandler)
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('js:watch', function() {
  gulp.start('js');
  watch(['client/src/*.js', 'src/*.js'], batch(function (events, done) {
    gulp.start('js', done);
  }));
});

gulp.task('jsLibs', function() {
  gulp.src('./client/bower/**/*.js')
    .pipe(gulp.dest('./client/dist/static/js'));
});

gulp.task('jsLibs:watch', function() {
  gulp.start('jsLibs');
  watch(['client/src/bower/*.js'], batch(function (events, done) {
    gulp.start('jsLibs', done);
  }));
});

gulp.task('watcher', function () {
  watch(['client/dist/**'], batch({
    limit: 100
  }, function (events, done) {
    events.on('data', server.reload).on('end', done);
  }));
});

gulp.task('server', function() {
  server.init({
    server: {
      baseDir: "./client/dist"
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    }
  });
});

gulp.task('test', function() {
  return gulp.src('./test/test.js', {read: false})
        .pipe(mocha({}));
})

gulp.task('default', function(cb) {
  runSequence(
    'html:watch',
    'js:watch',
    'jsLibs:watch',
    'watcher',
    'server',
    cb)
});
