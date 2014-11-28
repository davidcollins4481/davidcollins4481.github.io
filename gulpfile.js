var gulp = require('gulp');

// Include Our Plugins
var concat     = require('gulp-concat');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
var minifycss  = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

var themebasedir = '';
var jsbasedir = themebasedir + 'javascripts/';
var cssbasedir = themebasedir + 'stylesheets/';

var paths = {
    scripts: [],
    stylesheets: [
        cssbasedir + 'src/font-awesome.css',
        cssbasedir + 'src/styles.scss'
    ]
};

gulp.task('lint', function() {
    return gulp.src(jsbasedir + 'src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(jsbasedir + 'dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsbasedir + 'dist'));
});

gulp.task('sassminify', function () {
    gulp.src(paths.stylesheets)
        .pipe(sass())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest(cssbasedir + 'dist/'))
        .pipe(minifycss())
        .pipe(gulp.dest(cssbasedir + 'dist/'));
});

gulp.task('sass', function() {
    gulp.src(paths.stylesheets)
        .pipe(sass())
        .pipe(gulp.dest(cssbasedir + 'dist/'))
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch([cssbasedir + 'src/*.scss'], ['sassminify']);
    gulp.watch([jsbasedir  + 'src/*.js'], ['scripts']);
});

gulp.task('livereload-listen', function() {
    livereload.listen();
    gulp.watch([cssbasedir + 'dist/**', jsbasedir + 'dist/**', '*.html'])
        .on('change', livereload.changed);
});

// Default Task
gulp.task('default', ['scripts', 'sassminify', 'watch', 'livereload-listen']);
