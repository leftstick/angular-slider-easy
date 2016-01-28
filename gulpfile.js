'use strict';

var gulp = require('gulp');

var demoPath = './demo/';
var distPath = './dist/';

var compileLess = function(isDemo) {
    var less = require('gulp-less');
    var prefix = require('gulp-autoprefixer');
    var rename = require('gulp-rename');
    var merge = require('merge-stream');

    var dest = isDemo ? demoPath : distPath;
    var css = gulp.src('./src/angular-slider-easy.less')
        .pipe(less())
        .pipe(prefix({
            browsers: [
                'last 5 versions'
            ],
            cascade: true
        }))
        .pipe(gulp.dest(dest));
    if (isDemo) {
        return css;
    }

    var mincss = gulp.src('./src/angular-slider-easy.less')
        .pipe(rename({extname: '.min.css'}))
        .pipe(less({compress: true}))
        .pipe(prefix({
            browsers: [
                'last 5 versions'
            ],
            cascade: false
        }))
        .pipe(gulp.dest(dest));
    return merge(css, mincss);
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

    var ugSrc = gulp.src('./src/angular-slider-easy.js')
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify())
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
