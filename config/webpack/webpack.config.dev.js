// webpack.config.dev.js

const data = require('../data');
const paths = require('../paths');
const webpack = require('webpack');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const getClientEnvironment = require('../env');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
    mode: 'development',

    entry: paths.appIndexJs,

    output: {
        filename: 'bundle.js',
        path: __dirname,
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('source-map-loader'),
                include: paths.appSrc,
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(ts|tsx)$/,
                        include: paths.appSrc,
                        use: [
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    configFileName: paths.appTsConfig,
                                    useBabel: true,
                                    babelOptions: {
                                        babelrc: false, /* Important line */
                                        presets: [
                                            ["@babel/preset-env", {
                                                "targets": "last 2 versions, ie 11",
                                                "modules": false
                                            }]
                                        ]
                                    },
                                    babelCore: "@babel/core"
                                },
                            }
                        ]
                    },
                    {
                        test: /\.css$/,
                        include: paths.appSrc,
                        use: [
                            {loader: "style-loader"},
                            {loader: "css-loader"}
                        ]
                    },
                    {
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: publicUrl
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin(env.stringified),
        new webpack.HotModuleReplacementPlugin({})
    ]
};