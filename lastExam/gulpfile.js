var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var connect = require('gulp-connect');

//js 프로젝트 소스파일
var jsfiles = ['js/app.js', 'js/about_modal.js', 'js/pages/**/*.js', 'js/fullScreen.js'];

gulp.task('concat:js', function() {
    return gulp.src(jsfiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy:html', function() {
    return gulp.src('index.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy:img', function() {
    return gulp.src('js/images/*')
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/js/images'));
});

gulp.task('copy:lib', function() {
    return gulp.src('lib/**/*')
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('minify:js', function() {
    return gulp.src('dist/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify:css', function() {
    return gulp.src('css/*.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('**/*', ['build']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 3001
    });
});


gulp.task('copy', ['copy:html', 'copy:lib', 'copy:img']);
gulp.task('build', ['concat:js', 'copy', 'minify:css', 'minify:js']);
gulp.task('server', ['connect']);
gulp.task('default', ['build', 'watch', 'server']);
