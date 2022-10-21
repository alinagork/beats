const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS } = require('./gulp.config');

task( 'clean', () => {
  return src( `${DIST_PATH}/**/*`, { read: false })
    .pipe( rm() )
});

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

task('copy:img', () => {
  return src(`${SRC_PATH}/img/**/*`)
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

task('copy:video', () => {
  return src(`${SRC_PATH}/video/*mp4`)
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

task("styles", () => {
  return src([...STYLES_LIBS, 'src/styles/main.scss'])
  .pipe(gulpif(env === "dev", sourcemaps.init())) 
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulpif(env === "prod", cleanCSS({compatibility: 'ie8'})))
  .pipe(gulpif(env === "dev", sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(reload({stream: true}))
});

task("script", () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js', {newLine: ";"}))
  .pipe(
    babel({
    presets: ['@babel/env']
    })
    )
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(reload({stream: true}))
});

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      }
  });
});

task('watch', () => {
  watch('./src/styles/**/*.scss', series('styles'));
  watch('src/*.html', series('copy:html'));
  watch('src/scripts/*.js', series('script'));
});

task('default', series(
  "clean", "copy:html", 'copy:img', "copy:video", "styles", "script", "server", "watch", "server")
);

task('build', series(
  "clean", "copy:html", 'copy:img', "copy:video", "styles", "script", "server")
);


