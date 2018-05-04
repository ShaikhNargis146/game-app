var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var create = require('gulp-cordova-create');
var android = require('gulp-cordova-build-android')


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
  console.log("ssssss");
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('build', function () {
  return gulp.src('dist')
    .pipe(create())
    .pipe(android({
      release: true,
      storeFile: 'wohlig.keystore',
      keyAlias: 'wohlig'
    }))
    .pipe(gulp.dest('apk'));
});

gulp.task('watch', ['sass'], function () {
  gulp.watch(paths.sass, ['sass']);
});

// gulp.watch('www/css/ionic.app.css', ['autoprefixer'])

gulp.task('autoprefixer', function () {
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');
  console.log('adding autoPrefixer to css');
  return gulp.src('www/css/ionic.app.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/css/'));
});
