const clean = require('gulp-clean');
const gulp = require('gulp');
const lint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
// use a tsconfig file

gulp.task('clean', () => gulp
    .src('./dist/*', {read: false})
    .pipe(clean()))

gulp.task('lint', () => gulp
    .src('src/**/*.tsx')
    .pipe(lint({
        formatter: "stylish",
        configuration: 'tslint.json'
    }))
    .pipe(lint.report())
)

// TODO: externalize webpack config
// TODO: fix .d.ts declaration file or set as a separate step
gulp.task('bundle', ['clean', 'lint'], (callback) => {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new Error("webpack", err);
       console.log("[webpack]", stats.toString({
            // output options
        }));
        callback()
    });
});

gulp.task('test', () => gulp
    .src('./test/**/*.ts')
    .pipe(mocha({
        reporter: 'progress',
        require: ['ts-node/register']
    }))
    .on('error', (err) => {
        console.dir(err);
    })
);

gulp.task('tdd', () => {
    return gulp.watch(['src/**/*.tsx', 'tests/**/*.ts'], ['test'])
});


gulp.task('js-watch', () => gulp.watch(['src/**/*.tsx', 'trilithium/*.tsx'], ['bundle']));

gulp.task('dev', ['test', 'bundle']);
gulp.task('dev:watch', ['js-watch']);