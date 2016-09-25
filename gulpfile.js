var gulp = require('gulp');
var exec = require('child_process').exec;
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var sequence = require('run-sequence');

var str1 = 'declare var require: any;'
var str2 = 'const myDpStyles: string = require(\'./my-date-picker.component.css\');';
var str3 = 'const myDpTpl: string = require(\'./my-date-picker.component.html\')';
var str4 = 'styles: [myDpStyles],';
var str5 = 'template: myDpTpl,';

var str6 = 'moduleId: __moduleName,';
var str7 = 'styleUrls: [\'my-date-picker.component.css\'],';
var str8 = 'templateUrl: \'my-date-picker.component.html\',';

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
        .pipe(replace(str1, '//' + str1))
        .pipe(replace(str2, '//' + str2))
        .pipe(replace(str3, '//' + str3))
        .pipe(replace(str4, '//' + str4))
        .pipe(replace(str5, '//' + str5))
        .pipe(replace('//' + str6, str6))
        .pipe(replace('//' + str7, str7))
        .pipe(replace('//' + str8, str8))
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
    return gulp.src(['./build', './tmp', './src/my-date-picker/*.js', './src/my-date-picker/*.js.map', './src/my-date-picker/services/*.js', './src/my-date-picker/services/*.js.map'], {read: false}).pipe(clean());
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
