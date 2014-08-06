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

var paths = {
    scripts: [
        'bower_components/jquery/dist/jquery.js',
        'js/src/myscript.js'
    ],
    stylesheets: [
        'css/src/styles.scss',
        'css/src/styles2.scss'
    ]
};

gulp.task('lint', function() {
    return gulp.src('js/src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/dist'));
});

/*
    This takes every .scss file in css/src, combines them in
    runs it through sass and pipes all of the output to a since
    css file all.min.css then minifies it
*/
gulp.task('sassminify', function () {
    gulp.src(paths.stylesheets)
        .pipe(sass())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('css/dist/'))
        .pipe(minifycss())
        .pipe(gulp.dest('css/dist/'));
});

/*
    This will compile individual .scss files the individual
    css files of the same name. css/src/style.scss -> css/dist/style.css
*/
gulp.task('sass', function() {
    gulp.src(paths.stylesheets)
        .pipe(sass())
        .pipe(gulp.dest('css/dist/'))
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['css/src/*.scss'], ['sassminify']);
    gulp.watch(['js/src/*.js'], ['scripts']);
});

/*
    NOTE: this will only work when used with the Chrome LiveReload plugin
    over HTTP - not loading a page as a local file ex: file://path/index.html
*/
gulp.task('livereload-listen', function() {
    livereload.listen();
    gulp.watch(['css/dist/**', 'js/dist/**', '*.html'])
        .on('change', livereload.changed);
});

gulp.task('livereload-localserver', function() {
    livereload.listen();
    gulp.watch(['css/dist/**', 'js/dist/**', '*.html'])
        .on('change', livereload.changed);

    connect.server();
});

gulp.task('connect', function() {
    connect.server();
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'sassminify', 'watch', 'livereload-listen']);
