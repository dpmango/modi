var gulp     = require('gulp');
var cache    = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var util     = require('gulp-util');
var config   = require('../config.js');


gulp.task('images', function(){
  return gulp
    .src([
      config.src.img + '**/*.{jpg,png,jpeg,svg,gif}',
      '!' + config.src.img + '/svgo/**/*.*'
    ])
    // .pipe(config.production ? imagemin([
    //   imagemin.gifsicle({interlaced: true}),
    // 	imagemin.jpegtran({progressive: true}),
    // 	imagemin.optipng({optimizationLevel: 3}),
    // 	imagemin.svgo({plugins: [{removeViewBox: true}]})
    // ]) : util.noop())
    .pipe(gulp.dest(config.dest.img))
});

gulp.task('images:watch', function() {
  gulp.watch(config.src.img + '**/*.{jpg,png,jpeg,svg,gif}', ['images']);
});
