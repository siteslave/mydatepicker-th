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
var tslint = require('gulp-tslint');

var str1 = '// webpack1_';
var str2 = '// webpack2_';
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
*  - Creates npmdist folder - contain files needed to publish to npm.
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

gulp.task('copy.src.to.npmdist.dir', function() {
    return gulp.src(['./src/**/*.ts', '!./src/**/*spec.ts']).pipe(gulp.dest('./npmdist/src'));
});

gulp.task('copy.dist.to.npmdist.dir', function() {
    return gulp.src('./dist/**/*.*').pipe(gulp.dest('./npmdist/dist'));
});

gulp.task('copy.root.files.to.npmdist.dir', function() {
    return gulp.src(
        [
            './index.ts',
            './index.js',
            './LICENSE',
            './package.json',
            './README.md'
        ]).pipe(gulp.dest('./npmdist'));
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

gulp.task('inline.template.and.styles.to.component', function() {
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
    return gulp.src(['./build', './tmp', './test-output', './npmdist'], {read: false}).pipe(clean());
});

gulp.task('tslint', function () {
    return gulp.src([
        "src/my-date-picker/directives/*.ts",
        "src/my-date-picker/interfaces/*.ts",
        "src/my-date-picker/services/*.ts",
        "src/my-date-picker/index.ts",
        "src/my-date-picker/my-date-picker.component.ts",
        "src/my-date-picker/my-date-picker.module.ts"])
        .pipe(tslint({
            configuration: "tslint.json"
        }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task('all', function(cb) {
    sequence(
        'clean',
        'backup.component.tmp',
        'minify.css',
        'minify.html',
        'inline.template.and.styles.to.component',
        'tsc.compile.dist',
        'copy.src.to.npmdist.dir',
        'copy.dist.to.npmdist.dir',
        'copy.root.files.to.npmdist.dir',
        'delete.modified.component',
        'restore.original.component',
        'delete.tmp',
        'tslint',
        cb);
});

gulp.task('build', function(cb) {
    sequence(
        'backup.component.tmp',
        'minify.css',
        'minify.html',
        'inline.template.and.styles.to.component',
        'tsc.compile.dist',
        'delete.modified.component',
        'restore.original.component',
        'delete.tmp',
        'tslint',
        cb);
});