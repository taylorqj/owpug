const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseWebConfig = require('./webpack.base');

const port = process.env.PORT || 8080;
const publicPath = `http://localhost:${port}`;

module.exports = merge.smart(baseWebConfig, {
    devtool: 'eval',

    output: {
        path: path.join(__dirname, '../../dist/web'),
        filename: '[name].[hash].js',
    },

    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${port}/`,
            'webpack/hot/only-dev-server',
            'babel-polyfill',
            './src/index',
        ],
        vendor: [
            'react',
            'react-dom',
            'socket.io-client',
            'redux',
            'redux-saga',
            'react-redux',
            'react-router',
            'react-router-dom',
        ],
    },

    target: 'web',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
    ],

    devServer: {
        port,
        publicPath,
        overlay: true,
        inline: true,
        lazy: false,
        hot: true,
    },
});
