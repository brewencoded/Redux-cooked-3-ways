const DeclarationBundlerPlugin = require('./DeclarationBundlerPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.tsx'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new DeclarationBundlerPlugin({
            moduleName: 'app',
            out: 'bundle.d.ts'
        }),
        new HtmlWebpackPlugin({
            title: 'Redux App',
            template: 'src/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    target: 'web'
};
