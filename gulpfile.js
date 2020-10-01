const { src, dest, series, parallel, watch } = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  notify = require('gulp-notify'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  browserSync = require('browser-sync').create();


function pugToHTML(cb) {
  src('./src/pug/*.pug')
    .pipe(pug())
    .pipe(dest('./src'))
    .pipe(browserSync.reload({ stream: true }));
  cb();
}

function sassToCSS(cb) {
  src('./src/sass/*.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./src/css'))
    .pipe(browserSync.reload({ stream: true }));
  cb();
}

function script(cb) {
  src(`./src/js/modules/*.js`)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./src/js'))
    .pipe(browserSync.reload({ stream: true }));
  cb();
}

function clean(cb) {
  del('./build/**');
  cb();
}

function server() {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    notify: false
  });

  watch('./src/pug/**/*.pug', pugToHTML);
  watch('./src/sass/**/*.{sass,scss}', sassToCSS);
  watch(['./src/js/**/*.js', '!./src/js/**/*.min.js'], script);
}

function buildHTML(cb) {
  src('./src/*.html')
    .pipe(dest('./build'));
  cb();
}

function buildCSS(cb) {
  src('./src/css/**/*.min.css')
    .pipe(dest('./build/css'));
  cb();
}

function buildScript(cb) {
  src('./src/js/**/*.min.js')
    .pipe(dest('./build/js'));
  cb();
}

function buildFonts(cb) {
  src('./src/fonts/**/*')
    .pipe(dest('./build/fonts'));
  cb();
}

function buildImages(cb) {
  src('./src/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('./build/img'));
  cb();
}

function buildPHP(cb) {
  src('./src/php/**/*.php')
    .pipe(dest('./build/php'));
  cb();
}


exports.default = series(parallel(pugToHTML, sassToCSS, script), server);
exports.build = series(clean, parallel(pugToHTML, sassToCSS, script),
  parallel(buildHTML, buildCSS, buildScript, buildFonts, buildImages, buildPHP));
