const path = require('path');;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./src'),
            'node_modules',
        ],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    /node_modules/,
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader',
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                }],
            },
        ],
    },

    plugins: [
        new webpack.NamedModulesPlugin(),

        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:9005'),
            'process.env.SOCKET_URL': JSON.stringify(process.env.SOCKET_URL || 'http://localhost:9006'),
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].[hash].js',
        }),

        new HtmlWebpackPlugin({
            title: 'Overwatch Pug',
        }),
    ],
};
