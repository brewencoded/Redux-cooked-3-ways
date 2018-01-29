const clean = require('gulp-clean');
const gulp = require('gulp');
const lint = require('gulp-tslint');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const PORT = 8080;

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
        if (err) throw new Error('webpack', err);
        console.log('[webpack]', stats.toString({
            // output options
        }));
        callback()
    });
});

gulp.task('webpack-dev-server', (cb) => {
    const options = {
        contentBase: './dist',
        hot: true,
        host: 'localhost'
    };

    WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, options);
    
    server.listen(PORT, 'localhost', (err) => {
        if (err) throw new Error('webpack', err);
        console.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
        cb();
    });
});

gulp.task('js-watch', () => gulp.watch(['src/**/*.tsx', 'trilithium/*.tsx'], ['bundle']));

gulp.task('dev', ['bundle']);
gulp.task('dev:watch', ['webpack-dev-server']);