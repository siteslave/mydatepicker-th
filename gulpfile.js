var gulp = require('gulp');
var exec = require('child_process').exec;
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var sequence = require('run-sequence');

var str1 = '//webpack1';
var str2 = '//webpack2';
var str3 = '/*';
var str4 = '*/';

var systemjs1 = 'declare var __moduleName: string;';
var systemjs2 = 'moduleId: __moduleName,\n\tstyleUrls: [\'my-date-picker.component.css\'],\n\ttemplateUrl: \'my-date-picker.component.html\',\n';

var tsc = './node_modules/typescript/bin/tsc';
var uglify = './node_modules/uglifyjs/bin/uglifyjs';

/*
*
* Gulp tasks to build dist version.
*
 */

gulp.task('tsc.compile.dist', function (cb) {
    exec(tsc + ' -p ./tsconfig.dist.json', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('tsc.compile.bundle', function (cb) {
    exec(tsc + ' -p ./tsconfig.bundle.json && ' + uglify + ' dist/mydatepicker.bundle.js --screw-ie8 --compress --mangle --output dist/mydatepicker.bundle.min.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('delete.unnecessary.files', function () {
    return gulp.src([
        './dist/interfaces',
        './dist/services',
        './dist/index.*',
        ], {read: false}).pipe(clean());
});

gulp.task('copy.styles.template.dist', function() {
    return gulp.src('./src/my-date-picker/my-date-picker.component.{html,css}').pipe(gulp.dest('./dist'));
});

gulp.task('backup.component.tmp', function() {
    return gulp.src('./src/my-date-picker/my-date-picker.component.ts').pipe(gulp.dest('./tmp'));
});

gulp.task('prepare.system.compile', function(){
    return gulp.src(['./src/my-date-picker/my-date-picker.component.ts'])
        .pipe(replace(str1, str3))
        .pipe(replace(str2, str4))
        .pipe(replace('//systemjs1', systemjs1))
        .pipe(replace('//systemjs2', systemjs2))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

gulp.task('delete.modified.component', function () {
    return gulp.src(['./src/my-date-picker/my-date-picker.component.ts'], {read: false}).pipe(clean());
});

gulp.task('restore.original.component', function() {
    return gulp.src('./tmp/my-date-picker.component.ts').pipe(gulp.dest('./src/my-date-picker/'));
});

gulp.task('delete.tmp', function () {
    return gulp.src(['./tmp'], {read: false}).pipe(clean());
});

gulp.task('clean', function () {
    return gulp.src(['./build', './tmp'], {read: false}).pipe(clean());
});

gulp.task('all', function(cb) {
    sequence(
        'clean',
        'backup.component.tmp',
        'prepare.system.compile',
        'tsc.compile.dist',
        //'delete.unnecessary.files',
        'copy.styles.template.dist',
        //'tsc.compile.bundle',
        'delete.modified.component',
        'restore.original.component',
        'delete.tmp',
        cb);
});
