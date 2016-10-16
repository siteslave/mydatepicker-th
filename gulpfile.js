var gulp = require('gulp');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var sequence = require('run-sequence');
var cleancss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var fs = require('fs');
var ts = require('gulp-typescript');
var merge = require('merge2');
var sourcemaps = require('gulp-sourcemaps');

var str1 = '//webpack1_';
var str2 = '//webpack2_';
var str3 = '/*';
var str4 = '*/';

var tsDistProject = ts.createProject('tsconfig.dist.json');

/*
*
* Gulp tasks to build dist and bundle versions.
*  - Minifies the css file.
*  - Minifies the html template file.
*  - Add html template and styles as inline templates to the my-date-picker.component.
*  - Creates dist folder - contain javascript files of the component.
*
*/

gulp.task('tsc.compile.dist', function () {
    var tsResult = tsDistProject.src().pipe(sourcemaps.init()).pipe(tsDistProject());
    return merge([
        tsResult.js.pipe(gulp.dest('dist')),
        tsResult.js.pipe(sourcemaps.write('./', {includeContent: false})).pipe(gulp.dest('dist')),
        tsResult.dts.pipe(gulp.dest('dist'))
    ]);
});

gulp.task('backup.component.tmp', function() {
    return gulp.src('./src/my-date-picker/my-date-picker.component.ts').pipe(gulp.dest('./tmp'));
});

gulp.task('minify.css', function() {
    return gulp.src('./src/my-date-picker/my-date-picker.component.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./tmp'));
});

gulp.task('minify.html', function() {
    return gulp.src('./src/my-date-picker/my-date-picker.component.html')
        .pipe(htmlmin({collapseWhitespace: true, caseSensitive: true}))
        .pipe(gulp.dest('./tmp'));
});

gulp.task('prepare.system.compile', function() {
    var styles = fs.readFileSync('./tmp/my-date-picker.component.css', 'utf-8');
    var htmlTpl = fs.readFileSync('./tmp/my-date-picker.component.html', 'utf-8');

    styles = styles.split('\\e').join('\\\\e');

    return gulp.src(['./src/my-date-picker/my-date-picker.component.ts'])
        .pipe(replace(str1, str3))
        .pipe(replace(str2, str4))
        .pipe(replace('styles: [myDpStyles],', 'styles: [' + '`' + styles + '`' + '],'))
        .pipe(replace('template: myDpTpl,', 'template: `' + htmlTpl + '`' + ','))
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
    return gulp.src(['./build', './tmp', './test-output'], {read: false}).pipe(clean());
});

gulp.task('all', function(cb) {
    sequence(
        'clean',
        'backup.component.tmp',
        'minify.css',
        'minify.html',
        'prepare.system.compile',
        'tsc.compile.dist',
        'delete.modified.component',
        'restore.original.component',
        'delete.tmp',
        cb);
});
