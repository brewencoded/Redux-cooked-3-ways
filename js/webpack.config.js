const DeclarationBundlerPlugin = require('./DeclarationBundlerPlugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map.js'
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
    plugins: [
        new DeclarationBundlerPlugin({
            moduleName: 'app',
            out: 'bundle.d.ts'
        })
    ],
    devtool: 'source-map',
    target: 'web'
};
