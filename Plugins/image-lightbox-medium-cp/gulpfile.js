var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    concat = require('gulp-concat');


gulp.task("js", function () {
    return gulp.src([
        './dist/cp-lightimg.js',
    ])
        .pipe(concat('cp-lightimg.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
});


gulp.task("default", gulp.series(["js"]));