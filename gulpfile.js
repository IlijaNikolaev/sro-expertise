var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var server = require('browser-sync').create();
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var imagemin = require("gulp-imagemin");

sass.compiler = require("node-sass");


gulp.task("html", function () {
    return gulp.src("source/*.html ")
         .pipe(posthtml([ include() ]))
         .pipe(gulp.dest("build"));
      });


gulp.task("images", function () {
    return gulp.src("source/images/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.mozjpeg({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/images"));
});

gulp.task("style",function () {
     return gulp.src("source/scss/main.scss")
         .pipe(sourcemaps.init())
         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
         .pipe(sourcemaps.write('/maps'))
         .pipe(gulp.dest("build/css/"))
         .pipe(server.stream());});

gulp.task("pack",function () {
    gulp.watch("source/scss/main.scss", gulp.series('style'));
    gulp.watch("source/*.html", gulp.series('html'));
});

gulp.task("dev",  function() {

     server.init({
          server: "build"
     });
     gulp.watch("source/scss/main.scss", gulp.series('style'));
     gulp.watch("source/*.html", gulp.series('html'));
     gulp.watch("source/*.html").on('change', server.reload);
     gulp.watch("build/**/*.js").on('change', server.reload);

});



