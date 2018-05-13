const gulp = require('gulp')
const less = require('gulp-less')
const mini = require('gulp-minify-css')

const task = gulp.task.bind(gulp)
const dest = gulp.dest.bind(gulp)



task('less', ()=>{
   return gulp.src('themes/*.less')
      .pipe(less())
      .pipe(mini())
      .pipe(dest('dist'))
})