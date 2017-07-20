var gulp   = require('gulp');
var config = require('../config');

gulp.task('copy:fonts', function() {
  return gulp
    .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
    .pipe(gulp.dest(config.dest.fonts));
});


gulp.task('copy', [
  // 'copy:rootfiles',
  'copy:fonts'
]);

gulp.task('copy:watch', function() {
  gulp.watch(config.src.fonts + '/*.{ttf,eot,woff,woff2}', ['copy:fonts'])  
});
