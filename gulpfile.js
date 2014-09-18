'use strict';

var gulp = require('gulp');

var demoPath = './demo/';
var distPath = './dist/';

var compileLess = function(isDemo) {
    var less = require('gulp-less');
    var prefix = require('gulp-autoprefixer');
    var sourcemap = require('gulp-sourcemaps');

    var dest = isDemo ? demoPath : distPath;

    return gulp.src('./src/angular-slider-easy.less')
        .pipe(sourcemap.init())
        .pipe(less({
            compress: !isDemo
        }))
        .pipe(sourcemap.write())
        .pipe(prefix({
            browsers: ['last 5 versions'],
            cascade: isDemo
        }))
        .pipe(gulp.dest(dest));
};

var copyjs = function(isDemo) {
    var dest = isDemo ? demoPath : distPath;

    var copySrc = gulp.src('./src/angular-slider-easy.js').pipe(gulp.dest(dest));
    if (isDemo) {
        return copySrc;
    }

    var merge = require('merge-stream');
    var rename = require('gulp-rename');
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');

    var ugSrc = gulp.src('./src/angular-slider-easy.js')
        .pipe(sourcemaps.init())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: './src'
        }))
        .pipe(rename(function(path) {
            if (path.extname.indexOf('map') > -1) {
                path.basename = 'angular-slider-easy.min';
            }
        }))
        .pipe(gulp.dest('./dist'));

    return merge(copySrc, ugSrc);
};

gulp.task('demoless', function() {
    return compileLess(true);
});

gulp.task('distless', function() {
    return compileLess(false);
});

gulp.task('democopyjs', function() {
    return copyjs(true);
});

gulp.task('distcopyjs', function() {
    return copyjs(false);
});

gulp.task('default', ['demoless', 'democopyjs'], function(cons) {
    var webserver = require('gulp-webserver');
    var stream = gulp.src('./demo')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8080,
            livereload: true,
            directoryListing: false,
            fallback: 'demo.html'
        }));

    stream.on('error', function(err) {
        cons(err);
    });

    stream.on('close', function() {
        cons();
    });

    stream.on('finish', function() {
        cons();
    });

    gulp.watch('./src/*.*', function() {
        compileLess('./demo/');
        copyjs(true);
    });
});

gulp.task('dist', ['distless', 'distcopyjs']);