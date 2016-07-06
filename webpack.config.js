var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './example/demo.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'angular-slider-easy.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?presets[]=es2015',
                exclude: /(node_modules)/
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            }
        ]
    },
    postcss: function() {
        return [
            autoprefixer({browsers: ['last 5 versions']})
        ];
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'example/index.html_vm',
            hash: false
        })
    ]
};
